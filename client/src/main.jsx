import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App.jsx';
import './index.css';

const client = new ApolloClient({
  // In sandboxes (and most hosted environments), "localhost" from the browser
  // does NOT point to the container. Default to same-origin `/graphql` and let
  // Vite proxy it in dev. Override with `VITE_GRAPHQL_URL` when needed.
  uri: import.meta.env.VITE_GRAPHQL_URL ?? '/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
