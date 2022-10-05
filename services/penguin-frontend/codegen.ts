import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: '../penguin-backend/schema.graphql',
  documents: 'src/**/*.graphql',
  generates: {
    'src/generates/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
  config: {
    scalars: {
      Date: 'string',
    },
  },
}

export default config
