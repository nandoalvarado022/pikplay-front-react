import ApolloClient from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import { setContext } from "@apollo/client/link/context"
import fetch from "node-fetch"
import VARS from "../lib/variables"

// Used server and client side - can't use react hooks
const httpLink = createHttpLink({
  uri: VARS.API_URL,
  fetch: fetch,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token') ? localStorage.getItem('token') : null
  const token = 1234
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      // ...headers,
      authorization: token
    }
  }
});

const graphqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  // link: new HttpLink({
  //   uri: VARS.API_URL,
  // }),
  // ssrMode: typeof window === 'undefined',
});

export default graphqlClient