import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { join } from 'path'
import { ApolloServer } from 'apollo-server'
import { addResolversToSchema } from '@graphql-tools/schema'
import jwt, { JwtPayload } from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import { AUTH0_AUDIENCE, AUTH0_DOMAIN } from '../config/constants'
import { Context } from './context'
import resolvers from './resolvers'

// スキーマ読み込み
const schema = loadSchemaSync(join(__dirname, '..', 'schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
})

// リゾルバーをスキーマに追加
const schemaWithResolvers = addResolversToSchema({ schema, resolvers })

// サーバー起動
const server = new ApolloServer({
  schema: schemaWithResolvers,
  cors: true,
  context: async (ctx) => {
    // リクエストヘッダーからトークンを取得
    const token = ctx.req.headers.authorization?.replace('Bearer ', '')
    // トークンがなければ空のコンテキストを返す
    if (!token) {
      return {
        user: undefined,
      }
    }
    // トークンを検証
    try {
      // トークンを検証するためのクライアントを作成
      const user = await new Promise<JwtPayload>((resolve, reject) => {
        // jwks-rsaを使ってトークンを検証
        const client = jwksClient({
          jwksUri: `${AUTH0_DOMAIN}/.well-known/jwks.json`,
        })
        jwt.verify(
          token,
          (header, callback) => {
            client.getSigningKey(header.kid, (_err, key) => {
              // keyがなければエラー
              if (!key) {
                callback(new Error('key not found'))
                return
              }
              const signingKey = key.getPublicKey()
              callback(null, signingKey)
            })
          },
          {
            audience: `${AUTH0_AUDIENCE}`,
            issuer: `${AUTH0_DOMAIN}/`,
            algorithms: ['RS256'],
          },
          (err, decoded) => {
            if (err) {
              return reject(err)
            }
            if (!decoded) {
              return reject('decoded is invalid.')
            }
            resolve(decoded as JwtPayload)
          },
        )
      })

      const userInfo = await fetch(`${AUTH0_DOMAIN}/userinfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())

      return {
        user: {
          id: user.sub,
          name: userInfo.nickname,
          email: userInfo.email,
        },
      } as Context
    } catch (error) {
      return {
        user: undefined,
      }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
