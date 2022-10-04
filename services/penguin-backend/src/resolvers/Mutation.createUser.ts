import { prisma } from '../lib/prisma'
import { MutationResolvers } from '../generates/graphql'

export const createUserResolver: MutationResolvers['createUser'] = async (
  _,
  { input },
  context,
) => {
  const userId = context.user?.id
  console.log('userId', userId)
  if (!userId) {
    throw new Error('User not found')
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  console.log('user', user)

  if (user) {
    throw new Error('User already exists')
  }

  const createdUser = await prisma.user.create({
    data: {
      id: userId,
      name: input.name,
    },
  })
  console.log('createdUser', createdUser)

  return createdUser
}
