import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { RiTwitterXFill } from "react-icons/ri";

import { UserAuth } from "@/lib/auth";
import { useRouter } from "next/router";
import { Button, Divider, Flex, FormControl, FormLabel, Input, Stack, Text, Image, Heading } from "@chakra-ui/react";

export default function Login() {
    const router = useRouter();
    const [ email, setEmail ] = useState("");
    const { user, googleSignIn, sendSignInLink, signInWithEmail, twitterSignIn } = UserAuth();

    function handleSignIn() {
        try {
            googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    function handleTwitterSignIn() {
        try {
            twitterSignIn();
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
        signInWithEmail();
    }, [ signInWithEmail ]);

    if (user) {
        router.push("/dashboard");
    }

    return (
        <Flex bg={"gray.100"} height={"100vh"} >
            <Flex display={{base: "none", lg: "flex"}} justifyContent={"space-between"} width={"40%"} bg="gray.700" padding="30px" flexDirection={"column"}>
                <Image src="/icon-black.svg" alt="Logo" width="100px"  />
                <Heading fontSize={"5xl"} color={"white"} mb="20">We&apos;re Here to Simplify the Complexities of Law</Heading>
                <Text color={"gray.200"}>© 2023 Nyay Sathi. All rights reserved.</Text>
            </Flex>
            <Flex width={{ base: "100%", lg: "60%" }} justifyContent={"center"} alignItems={"center"} padding={{base: "20px", lg: "none"}}>
                <Flex flexDirection={"column"} width={{ base: "100%", lg: "50%" }} justifyContent={"center"} alignItems={"center"} padding={"40px"} gap="4" bg={"white"} boxShadow='xl' rounded={"10"}>
                    <Stack spacing={8} align="center" mb="8">
                        <Image src="/logo.svg" alt="Logo" width="256px" />
                        <Heading fontSize={"3xl"} textAlign={"center"}>
                            Log in to your account
                        </Heading>
                    </Stack>
                    <Input placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} width={"100%"} />
                    <Button onClick={handleEmailSignIn} colorScheme={"yellow"} size='md' width={"100%"} >
                        Continue with Email
                    </Button>

                    <Divider margin={"4"} />
                    {/* <HStack>
                        <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                            OR
                        </Text>
                        <Divider />
                    </HStack> */}

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