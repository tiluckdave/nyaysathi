import DashBoardWrapper from "@/components/DashBoardWrapper";
import AskQuery from "@/components/AskQuery";
import ChatLegal from "@/components/ChatLegal";
import KYR from "@/components/KYR";
import { Flex, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Highlight, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserAuth } from "@/lib/auth";

export default function Home() {
    const [ qotd, setQotd ] = useState(false)
    const { user } = UserAuth();

    useEffect(() => {
        setQotd(user?.qotd);
    }, [ user ]);

    return (
        <DashBoardWrapper page="dashboard">
            {!qotd && <Flex padding="4" mb="4" bgGradient='linear(to-r,  yellow.100, pink.100, purple.100)' border='1px' borderColor='gray.100' rounded="lg" justifyContent={"space-between"} alignItems={"center"}>
                <Text fontSize={"xl"} fontWeight="bold">
                    <Highlight query='#QuestionOfTheDay' styles={{ px: '2', py: '1', rounded: 'full', bg: 'white' }}>
                        Solve the #QuestionOfTheDay
                    </Highlight>
                </Text>
                <Link href="/quiz">
                    <Button colorScheme="yellow" size="md" fontWeight="bold">
                        Solve
                    </Button>
                </Link>
            </Flex>}
            <Tabs variant='soft-rounded' colorScheme='yellow' isFitted >
                <Flex justifyContent={"space-between"} mb={{ base: 6, lg: "10" }} flexDirection={{ base: "column", lg: "row" }}>
                    <Heading fontSize="3xl">AI Legal Assistant</Heading>
                    <TabList width={{ base: "100%", lg: "45%" }} mt={{ base: 4, lg: 0 }} bg={"gray.50"} rounded="full">
                        <Tab>Ask</Tab>
                        <Tab>Chat</Tab>
                    </TabList>
                </Flex>
                <TabPanels>
                    <TabPanel padding={"0"}>
                        <AskQuery />
                    </TabPanel>
                    <TabPanel padding={"0"}>
                        <ChatLegal />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </DashBoardWrapper>
    )
}