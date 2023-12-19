import { Flex, Heading, Text, Button, Image, Stack, useBreakpointValue, background } from '@chakra-ui/react'

import Link from 'next/link';

export default function Home() {

  return (<Stack minH={'100vh'} direction={{ base: 'column-reverse', md: 'row' }}>
    <Flex p={8} flex={1} align={'center'} justify={'center'}>
      <Stack spacing={6} w={'full'} maxW={'lg'}>
        <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
          <Text
            as={'span'}
            position={'relative'}
            _after={{
              content: "''",
              width: 'full',
              height: useBreakpointValue({ base: '20%', md: '30%' }),
              position: 'absolute',
              bottom: 1,
              left: 0,
              bg: 'yellow.400',
              zIndex: -1,

            }}>
            NyaySathi
          </Text>
          <br />{' '}
          <Text color={'black'} as={'span'} >
            Your Trusted Digital Legal Companion.
          </Text>{' '}
        </Heading>
        <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'} >
          Empowering You with Legal Wisdom: NyaySathi -
          Unlock the doors to legal enlightenment with NyaySathi. Navigate the intricate web of laws effortlessly and empower yourself with legal wisdom at your fingertips. From understanding your rights to decoding legal jargon, NyaySathi is your go-to source for clarity in the complex world of law.
        </Text>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
          <Link href="/login">
            <Button
            size={'lg'}
              rounded={'full'}
              bg={'yellow.400'}
              color={'black'}
            >
              Login
            </Button>
          </Link>
          <Link href="/lawyer/login">
            <Button rounded={'full'} bg={'gray.200'} color={'black'} size={'lg'}>Login As Lawyer</Button>
          </Link>
        </Stack>
      </Stack>
    </Flex>
    <Flex flex={1} p={8}>
      <div style={{ display:'flex',justifyContent:'center',alignItems:'center'}}>
    <Image 
  alt={'Login Image'} 
  objectFit={'cover'} 
  src='g20.png'
  style={{ 
    borderRadius: '10px', // Add rounded corners
   
     // Add a subtle background color
    overflow: 'hidden', // Hide overflow content
   
    
  }}
/>
</div>
  </Flex>
  </Stack >)

  // return <Flex
  // Empowering You with Legal Wisdom: NyaySathi - Your Trusted Digital Legal Companion.
  //   flexDirection="column"
  //   justifyContent="center"
  //   alignItems="center"
  //   minHeight="100vh"
  // >
  //   <Heading size="2xl" fontWeight="bold" textAlign="center">
  //     Nyay Sathi
  //   </Heading>
  //   <Text mt={6}>
  //     Empowering You with Legal Wisdom: NyaySathi - Your Trusted Digital Legal
  //     Companion.
  //   </Text>
  //   <Link href="/login">
  //     <Button
  //       variant="solid"
  //       size="md"
  //       colorScheme="yellow"
  //       mt={6}
  //       fontWeight="bold"
  //     >
  //       Login
  //     </Button>
  //   </Link>
  //   <Link href="/lawyer/login">
  //     <Button
  //       variant="solid"
  //       size="md"
  //       colorScheme="yellow"
  //       mt={6}
  //       fontWeight="bold"
  //     >
  //       Login as Lawyer
  //     </Button>
  //   </Link>
  // </Flex>
}