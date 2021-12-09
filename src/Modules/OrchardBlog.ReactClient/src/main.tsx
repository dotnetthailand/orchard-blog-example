// Enable GraphQL module
// Edit Role Anonymous, Execute GraphQL to allow
import 'react';
import { render } from 'react-dom';
import AuthorizationTestingFlow from './components/AuthorizationTestingFlow';
import AuthorizationCallback from './components/AuthorizationCallback';

// react-router-dom v6 change Switch to Routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  ServerError
} from '@apollo/client';


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

function createClient() {
  const token = localStorage.getItem('access_token') ?? '';
  console.log(`token: ${token}`);

  const client = new ApolloClient({
    uri: '/api/graphql',
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: new InMemoryCache()
  });
  return client;
}

render(
  <ApolloProvider client={createClient()}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);


