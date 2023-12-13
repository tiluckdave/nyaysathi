import { ChakraProvider, Flex, Box, Icon, Image, Button, Text, Heading, Divider } from '@chakra-ui/react'
import Link from 'next/link'
import { AiOutlineFileSearch } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { LuNewspaper } from "react-icons/lu";
import { RiContactsBookLine } from "react-icons/ri";
import { HiOutlineHome } from "react-icons/hi";
import { TbCloudUpload } from "react-icons/tb";


export default function DashBoardWrapper({ children, page }) {
    const dashboard = page === "dashboard" ? true : false;
    const file = page === "file" ? true : false
    const news = page === "news" ? true : false
    const aid = page === "aid" ? true : false
    const profile = page === "profile" ? true : false
    const storage = page === "storage" ? true : false

    return (
        <Flex
            flexDirection={{ base: "column-reverse", lg: "row" }}
            minHeight="100vh"

        >
            <Flex zIndex={10} width={{ base: "100%", lg: "250px" }} backgroundColor="gray.100" flexDirection={{ base: "row", lg: "column" }} justifyContent={{ base: "center", lg: "space-between" }} alignItems={"center"} padding={{ base: 2, lg: 6 }} gap={{base:2, lg: 4}} minHeight={{ base: "60px", lg: "100vh" }} position={"fixed"} bottom={0}>
                <Flex flexDirection={{ base: "row", lg: "column" }} gap={{base:2, lg: 4}} width={{base:"80%", lg:"auto"}} justifyContent={"space-evenly"}>
                    <Flex justifyContent="center" alignItems="center" display={{ base: "none", lg: "block" }} >
                        <Image src="/logo.svg" alt="Nyay Sathi" width={"100%"} />
                    </Flex>
                    <Divider display={{ base: "none", lg: "block" }} />
                    <Link href="/dashboard">
                        <Button colorScheme='gray' bg={dashboard && "gray.200"} padding={2} rounded={{base: "full", lg:4}} alignItems={"center"} justifyContent="flex-start" width="100%">
                            <Icon boxSize={{base:7, lg:5}} as={HiOutlineHome} />
                            <Text display={{ base: "none", lg: "block" }} marginLeft={{ base: 0, lg: 3 }}>Home</Text>
                        </Button>
                    </Link>
                    <Link href="/file-summarize" width="100%">
                        <Button colorScheme='gray' bg={file && "gray.200"} padding={2} rounded={{base: "full", lg:4}} alignItems={"center"} justifyContent="flex-start" width="100%">
                            <Icon boxSize={{base:7, lg:5}} as={AiOutlineFileSearch} />
                            <Text display={{ base: "none", lg: "block" }} marginLeft={{ base: 0, lg: 3 }}>Case Summarize</Text>
                        </Button>
                    </Link>
                    <Link href="/storage" width="100%">
                        <Button colorScheme='gray' bg={storage && "gray.200"} padding={2} rounded={{base: "full", lg:4}} alignItems={"center"} justifyContent="flex-start" width="100%">
                            <Icon boxSize={{base:7, lg:5}} as={TbCloudUpload} />
                            <Text display={{ base: "none", lg: "block" }} marginLeft={{ base: 0, lg: 3 }}>Secure Storage</Text>
                        </Button>
                    </Link>
                    <Link href="/aid-directory" width="100%">
                        <Button colorScheme='gray' bg={aid && "gray.200"} padding={2} rounded={{base: "full", lg:4}} alignItems={"center"} justifyContent="flex-start" width="100%">
                            <Icon boxSize={{base:7, lg:5}} as={RiContactsBookLine} />
                            <Text display={{ base: "none", lg: "block" }} marginLeft={{ base: 0, lg: 3 }}>Aid Directory</Text>
                        </Button>
                    </Link>
                    {/* <Link href="/news" width="100%">
                        <Button colorScheme='gray' bg={news && "gray.200"} padding={2} rounded={{base: "full", lg:4}} alignItems={"center"} justifyContent="flex-start" width="100%" size={{base:"lg", lg: "md"}}>
                            <Icon boxSize={{base:7, lg:5}} as={LuNewspaper} />
                            <Text display={{ base: "none", lg: "block" }} marginLeft={{ base: 0, lg: 3 }}>New & Updates</Text>
                        </Button>
                    </Link> */}
                </Flex>

                <Flex flexDirection={{base:"row", lg: "column"}} gap={4} width={{base:"20%", lg:"100%"}}>
                    <Link href="/profile" width={{base: "0", lg: "100%"}}>
                        <Button colorScheme='gray' bg={profile && "gray.200"} padding={2} rounded={{base: "full", lg:4}} alignItems={"center"} justifyContent="flex-start" width={{base: "auto", lg: "100%"}} >
                            <Icon boxSize={{base:7, lg:5}} as={FiUser} />
                            <Text display={{ base: "none", lg: "block" }} marginLeft={{ base: 0, lg: 3 }}>Profile</Text>
                        </Button>
                    </Link>
                </Flex>
            </Flex>
            <Flex flexDirection={"column"} marginLeft={{ base: "0", lg: "250px" }} marginBottom={{ base: "50px", lg: "0" }} width={"100%"} minHeight={"100vh"} padding={{base: 6, lg:8}}>
                {children}
            </Flex>
        </Flex>
    )
}