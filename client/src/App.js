import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client'
import Home from './pages/Home'
import Auth from './pages/Auth'

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      {/* <Home /> */}
      <Auth />
    </ApolloProvider>
  )
}

export default App
