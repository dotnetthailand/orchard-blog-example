// Enable GraphQL module
// Edit Role Anonymous, Execute GraphQL to allow
import 'react';
import { render } from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from '@apollo/client';
import DOMPurify from 'dompurify'; // XSS sanitizer

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache()
});

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
  if (error) return <p>Error :(</p>;

  const blogPostList = data.blogPost.map(({ title, body: { html } }) => {
    const cleanHTML = DOMPurify.sanitize(html);
    // https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml

    return (
      <div>
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
      <BlogPost />
    </div>
  );
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
