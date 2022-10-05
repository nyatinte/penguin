import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: '../penguin-backend/schema.graphql',
  documents: 'src/**/*.graphql',
  generates: {
    'src/generates/graphql.ts': {
      preset: 'near-operation-file',
      plugins: [],
    },
  },
  config: {
    scalars: {
      Date: 'string',
    },
  },
}

export default config
