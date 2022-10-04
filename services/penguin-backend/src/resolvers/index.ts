import { Resolvers } from '../generates/graphql'
import { DateResolver } from 'graphql-scalars'
import { createUserResolver } from './Mutation.createUser'

const resolvers: Resolvers = {
  Date: DateResolver,
  Query: {
    getUser: () => null,
    getTodos: () => [],
    getTodoById: () => null,
  },
  Mutation: {
    addTodo: () => null,
    updateTodo: () => null,
    deleteTodo: () => null,
    createUser: createUserResolver,
    updateUser: () => null,
  },
}

export default resolvers
