import DashBoardWrapper from "@/components/DashBoardWrapper";
import { Heading } from "@chakra-ui/react";

export default function Home() {
    return (
        <DashBoardWrapper page="dashboard">
            <Heading fontSize="3xl">Legal Assistant</Heading>
        </DashBoardWrapper>
    )
}