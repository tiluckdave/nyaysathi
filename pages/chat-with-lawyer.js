import DashBoardWrapper from "@/components/DashBoardWrapper";
import { Flex, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Highlight, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserAuth } from "@/lib/auth";
import ChatLawyer from "@/components/ChatLawyer";

export default function Home() {
    const { user } = UserAuth();

    return (
        <DashBoardWrapper page="chatLawyer">
            <Flex justifyContent={"space-between"} mb={{ base: 6, lg: "10" }} flexDirection={{ base: "column", lg: "row" }}>
                <Heading fontSize="3xl">Chat with Lawyers</Heading>
            </Flex>
            <ChatLawyer />
        </DashBoardWrapper>
    )
}