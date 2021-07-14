import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client'
import Home from './pages/Home'

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  )
}

export default App
