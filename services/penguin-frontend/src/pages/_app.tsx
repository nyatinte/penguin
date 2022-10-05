import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '@auth0/nextjs-auth0'
import Header from '../components/Header'
import { ApolloProvider } from '@apollo/client'
import { client } from '../clients/apollo'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ChakraProvider>
        <ApolloProvider client={client}>
          <Header />
          <Component {...pageProps} />
        </ApolloProvider>
      </ChakraProvider>
    </UserProvider>
  )
}

export default MyApp
