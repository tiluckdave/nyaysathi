import { Flex, Heading, Text, Button } from '@chakra-ui/react'
import { UserAuth } from "@/lib/auth";

export default function Home() {
  const { user, logOut } = UserAuth();

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
        onClick={logOut}
      >
        Sign Out
      </Button>
  </Flex>
}