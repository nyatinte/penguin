import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema, loadSchemaSync } from '@graphql-tools/load'
import { join } from 'path'
import { ApolloServer, gql } from 'apollo-server'
import { addResolversToSchema } from '@graphql-tools/schema'

// スキーマ読み込み
const schema = loadSchemaSync(join(__dirname, '..', 'schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
})

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
]

const resolvers = {
  Query: {
    books: () => books,
  },
}

// リゾルバーをスキーマに追加
const schemaWithResolvers = addResolversToSchema({ schema, resolvers })

// サーバー起動
const server = new ApolloServer({ schema: schemaWithResolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
