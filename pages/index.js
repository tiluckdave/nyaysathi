import { Flex, Heading, Text, Button } from '@chakra-ui/react'

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
    
      <Button
        variant="solid"
        size="md"
        colorScheme="yellow"
        mt={6}
        fontWeight="bold"
        // onClick={() => signIn()}
      >
        Get Started
      </Button>
  
      <Button
        variant="solid"
        size="md"
        colorScheme="yellow"
        mt={6}
        fontWeight="bold"
        // onClick={() => signOut()}
      >
        Sign Out
      </Button>
   
  </Flex>
}