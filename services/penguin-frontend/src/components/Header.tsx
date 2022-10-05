import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'
import { Box } from '@chakra-ui/react'

const Header: React.FC = () => {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <Box>Loading...</Box>
  if (error) return <Box>{error.message}</Box>

  if (user) {
    return (
      <Box as="header">
        Welcome {user.name}! <Link href="/api/auth/logout">Logout</Link>
      </Box>
    )
  }

  return (
    <Box as="header">
      <Link href="/api/auth/login">Login</Link>
    </Box>
  )
}

export default Header
