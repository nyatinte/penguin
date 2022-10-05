import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
};

export type AddTodoInput = {
  description?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTodo?: Maybe<Todo>;
  createUser?: Maybe<User>;
  deleteTodo?: Maybe<Todo>;
  updateTodo?: Maybe<Todo>;
  updateUser?: Maybe<User>;
};


export type MutationAddTodoArgs = {
  input: AddTodoInput;
};


export type MutationCreateUserArgs = {
  id: Scalars['ID'];
  input: UserInput;
};


export type MutationDeleteTodoArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateTodoArgs = {
  id: Scalars['ID'];
  input: UpdateTodoInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input: UserInput;
};

export type Query = {
  __typename?: 'Query';
  getTodoById?: Maybe<Todo>;
  getTodos: Array<Maybe<Todo>>;
  getUser?: Maybe<User>;
};


export type QueryGetTodoByIdArgs = {
  id: Scalars['ID'];
};

export type Todo = {
  __typename?: 'Todo';
  createdAt?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  status: TodoStatus;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
};

export enum TodoStatus {
  Done = 'done',
  Pending = 'pending'
}

export type UpdateTodoInput = {
  description?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<TodoStatus>;
  title?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  todos?: Maybe<Array<Maybe<Todo>>>;
};

export type UserInput = {
  name: Scalars['String'];
};

export type CreateUserMutationVariables = Exact<{
  createUserId: Scalars['ID'];
  createUserInput: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id: string } | null };


export const CreateUserDocument = gql`
    mutation CreateUser($createUserId: ID!, $createUserInput: UserInput!) {
  createUser(id: $createUserId, input: $createUserInput) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserId: // value for 'createUserId'
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;