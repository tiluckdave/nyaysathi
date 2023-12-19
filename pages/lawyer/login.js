import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { RiTwitterXFill } from "react-icons/ri";
import { UserAuth } from "@/lib/auth";
import { useRouter } from "next/router";
import { Button, Divider, Flex, Input, Stack, Text, Image, Heading } from "@chakra-ui/react";

export default function Login() {
    const [ email, setEmail ] = useState("");
    const router = useRouter();
    const { user, googleSignIn, sendSignInLink, signInWithEmail, twitterSignIn } = UserAuth();

    function handleSignIn() {
        try {
            googleSignIn("lawyer");
        } catch (error) {
            console.log(error);
        }
    };

    function handleTwitterSignIn() {
        try {
            twitterSignIn("lawyer");
        }
        catch (error) {
            console.log(error);
        }
    }

    function handleEmailSignIn() {
        try {
            sendSignInLink(email);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        signInWithEmail("lawyer");
    }, [ signInWithEmail ]);

  

    return (
        <Flex bg={"gray.100"} height={"100vh"} >
            <Flex display={{ base: "none", lg: "flex" }} justifyContent={"space-between"} width={"40%"} bg="gray.700" padding="30px" flexDirection={"column"}>
                <Flex flexDirection={"row"} justifyContent={"space-between"} alignItems={"flex-start"} gap="4">
                    <Image src="/icon-black.svg" alt="Logo" width="100px" />
                    <Image src="/india.svg" alt="India" width="50px" />
                </Flex>
                <Heading fontSize={"5xl"} color={"white"} mb="20">Join & Contribute to NyaySathi as a Lawyer</Heading>
                <Text color={"gray.200"}>© 2023 Nyay Sathi. All rights reserved.</Text>
            </Flex>
            <Flex width={{ base: "100%", lg: "60%" }} justifyContent={"center"} alignItems={"center"} padding={{ base: "20px", lg: "none" }}>
                <Flex flexDirection={"column"} width={{ base: "100%", lg: "50%" }} justifyContent={"center"} alignItems={"center"} padding={"40px"} gap="4" bg={"white"} boxShadow='xl' rounded={"10"}>
                    <Stack spacing={8} align="center" mb="8">
                        <Image src="/logo.svg" alt="Logo" width="256px" />
                        <Heading fontSize={"3xl"} textAlign={"center"}>
                            Login as Lawyer
                        </Heading>
                    </Stack>
                    <Input placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} width={"100%"} />
                    <Button onClick={handleEmailSignIn} colorScheme={"yellow"} size='md' width={"100%"} >
                        Continue with Email
                    </Button>

                    <Divider margin={"4"} />

                    <Button leftIcon={<FcGoogle />} onClick={handleSignIn} size='md' width={"100%"} >
                        Continue with Google
                    </Button>
                    <Button leftIcon={<RiTwitterXFill />} onClick={handleTwitterSignIn} size='md' width={"100%"} >
                        Continue with Twitter
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}