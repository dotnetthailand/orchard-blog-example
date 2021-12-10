// Enable GraphQL module
// Edit Role Anonymous, Execute GraphQL to allow
import 'react';
import { render } from 'react-dom';
import AuthorizationTestingFlow from './components/AuthorizationTestingFlow';
import AuthorizationCallback from './components/AuthorizationCallback';
import Configuration from './components/Configuration';
import axios from 'axios';

// react-router-dom v6 change Switch to Routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  ServerError,
  from,
  HttpLink,
  Observable
} from '@apollo/client';

import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

import DOMPurify from 'dompurify'; // XSS sanitizer

const BLOG_POST_QUERY = gql`
  query blogPostQuery {
    blogPost {
      title: displayText,
      body: markdownBody {
        html
      }
    }
  }
`;

function BlogPost() {
  const { loading, error, data } = useQuery(BLOG_POST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) {
    const { networkError } = error as { networkError: ServerError };
    return <p>Error, status code: {networkError.statusCode} :(</p>;
  }

  const blogPostList = data.blogPost.map(({ title, body: { html } }) => {
    const cleanHTML = DOMPurify.sanitize(html as string, {});
    // https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml

    return (
      <div key={title}>
        <h2>{title}</h2>
        <p dangerouslySetInnerHTML={{ __html: cleanHTML }} />
      </div>
    );
  });

  return blogPostList;
}

// https://www.apollographql.com/docs/react/api/link/apollo-link-context/
const contextLink = setContext(async (request, previousContext) => ({
  headers: { authorization: `Bearer ${getToken()}` },
}));

// Sometimes getting a new token or other data needed to perform a retry is an asynchronous task. 
// In this case you need to return an `Observable` so that `apollo-link-error` can subscribe to its changes 
// and call `forward` when the observable is completed.
const promiseToObservable = (promise) => {
  return new Observable((subscriber) => {
    promise.then(
      (value) => {
        if (subscriber.closed) {
          return;
        }
        subscriber.next(value);
        subscriber.complete();
      },
      (err) => {
        subscriber.error(err);
      },
    );
  });
};

// https://www.apollographql.com/docs/react/data/error-handling/#retrying-operations
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  const { statusCode } = networkError as ServerError;
  if (statusCode === 401) {

    return promiseToObservable(getNewToken()).flatMap((newToken) => {
      alert(newToken);
      // Modify the operation context with a new token
      const previousHeaders = operation.getContext().headers;
      operation.setContext({
        headers: {
          ...previousHeaders,
          authorization: `Bearer ${newToken}`,
        },
      });

      // retry the request, returning the new observable
      return forward(operation);
    });
  }
});

// https://www.apollographql.com/docs/react/api/link/apollo-link-http/
const httpLink = new HttpLink({
  uri: '/api/graphql',
  // Additional options
});

function createClient() {
  const client = new ApolloClient({
    link: from([
      contextLink,
      errorLink,
      httpLink, // terminated link
    ]),
    cache: new InMemoryCache()
  });
  return client;
}

function getToken() {
  return localStorage.getItem('access_token') ?? '';
}

async function getNewToken() {
  // Axios is able to accept a URLSearchParams instance which also set the appropriate Content-type header to application/x-www-form-urlencoded
  const refreshToken = localStorage.getItem('refresh_token') as string;
  const parameters: Record<string, string> = {
    grant_type: 'refresh_token', // Token endpoint but with refresh_token grant type
    client_id: Configuration.REACT_APP_CLIENT_ID as string,
    refresh_token: refreshToken,
  };

  const config = {
    headers: {
      // We need to use form-url encode https://github.com/openiddict/openiddict-core/issues/437
      // https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.3
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  // Request token
  const response = await axios.post(
    Configuration.REACT_APP_TOKEN_ENDPOINT as string,
    new URLSearchParams(parameters),
    config,
  );

  // Set new tokens to a local storage
  localStorage.setItem('access_token', response.data.access_token);
  localStorage.setItem('refresh_token', response.data.refresh_token);
  //alert('Got token and set to local storage');
  return response.data.access_token;
};

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/authorization" element={
            <div>
              <BlogPost />
              <AuthorizationTestingFlow />
            </div>
          } />
          <Route path="/authorization/callback" element={<AuthorizationCallback />} />
        </Routes>
      </Router>
    </div>
  )
}

render(
  <ApolloProvider client={createClient()}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
