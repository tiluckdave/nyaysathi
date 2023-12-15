import { Flex, Heading, Text, Button } from '@chakra-ui/react'
import Link from 'next/link';

export default function Home() {

  return <Flex
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <Heading size="2xl" fontWeight="bold" textAlign="center">
      Nyay Sathi
    </Heading>
    <Text mt={6}>
      Empowering You with Legal Wisdom: NyaySathi - Your Trusted Digital Legal
      Companion.
    </Text>
    <Link href="/login">
      <Button
        variant="solid"
        size="md"
        colorScheme="yellow"
        mt={6}
        fontWeight="bold"
      >
        Login
      </Button>
    </Link>
    <Link href="/lawyer/login">
      <Button
        variant="solid"
        size="md"
        colorScheme="yellow"
        mt={6}
        fontWeight="bold"
      >
        Login as Lawyer
      </Button>
    </Link>
  </Flex>
}