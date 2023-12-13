import DashBoardWrapper from "@/components/DashBoardWrapper";
import AskQuery from "@/components/AskQuery";
import ChatLegal from "@/components/ChatLegal";
import { Flex, Heading, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

export default function Home() {
    return (
        <DashBoardWrapper page="dashboard">
            <Tabs variant='soft-rounded' colorScheme='yellow' isFitted >
                <Flex justifyContent={"space-between"} mb={{base: 6, lg:"10"}} flexDirection={{base: "column", lg: "row"}}>
                    <Heading fontSize="3xl">AI Legal Assistant</Heading>
                    <TabList width={{base: "100%", lg: "45%"}} mt={{base: 4, lg: 0}} bg={"gray.50"} rounded="full">
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