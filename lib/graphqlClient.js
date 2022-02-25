import { InMemoryCache, ApolloClient } from '@apollo/client'
import { createHttpLink } from "apollo-link-http"
import VARS from "../lib/variables"

let token = null
if (typeof localStorage != 'undefined' && localStorage.getItem('persist:user')) {
  token = JSON.parse(JSON.parse(localStorage.getItem('persist:user')).user).token
}

const httpLink = createHttpLink({
  uri: VARS.API_URL,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

const graphqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});

export default graphqlClient
