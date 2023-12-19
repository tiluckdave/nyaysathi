import { ChakraLink, Flex, Heading, Text, Button, Image, Stack, useBreakpointValue, background, ChakraProvider } from '@chakra-ui/react'

import Link from 'next/link';

export default function Home() {

  return (
    <>
      <Flex direction={{ base: 'column', md: 'row' }} px={4} bg="white" color="black" align="center" justify="space-between" w="100%">
        {/* Left Section */}
        <Flex align="center">
          <Image src="E.jpg" alt="Banner Image" boxSize="70px" borderRadius="10px" mr={2} bg={'white'} width={'65px'} mt={'38px'}height={'100px'} />
          <Stack>
            <Heading fontSize={{ base: 'sm', md: 'md' }} mt={'25px'} mb={-3} >विधि और न्याय मंत्रालय</Heading>
            <Text fontWeight="bold" textTransform={'uppercase'} fontSize={{ base: 'xl', md: '2xl' }} >Ministry of Law & <br style={{ margin: '-0.7em' }} />Justice</Text>
          </Stack>
        </Flex>

        {/* Right Section */}
        <Flex align="center">
          <Image src="g20.png" alt="Right Image" boxSize="80px" borderRadius="10px" ml={4} mt={4} width={'150px'} />
        </Flex>
      </Flex>

      <Stack direction={{ base: 'column', md: 'row' }}>
        <Flex px={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Image src='/icon.svg' alt="Logo" width="85px" mt={'30px'} mb={'-30px'}></Image>
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
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
            <Image
            mt={'-10px'}
            ml={{base: 0, lg: '185px'}}
              alt={'Login Image'}
              objectFit={'cover'}
              src='Modi.png'
              style={{
                width:'450px',
                borderRadius: '10px', // Add rounded corners
                overflow: 'hidden', // Hide overflow content


              }}
            />
          </div>
        </Flex>
      </Stack >
    </>
  )

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