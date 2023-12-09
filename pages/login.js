import React from "react";
import Image from 'next/image'
import { FcGoogle } from "react-icons/fc";
import { UserAuth } from "@/lib/auth";
import { useRouter } from "next/router";
import { Button, Flex, Icon } from "@chakra-ui/react";

export default function Login() {
    const router = useRouter();
    const { user, googleSignIn } = UserAuth();

    function handleSignIn() {
        try {
            googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    if (user) {
        router.push("/");
    }

    return (
        <Flex justifyContent={"center"} alignItems={"center"} height={"100vh"} padding={"20px"}>
            <Button leftIcon={<FcGoogle />} onClick={handleSignIn} size='lg' >
                Continue with Google
            </Button>
        </Flex>
    )
}