import LawyerDashboardWrapper from "@/components/LawyerDashboardWrapper";
import { Heading } from "@chakra-ui/react";

export default function Dashboard() {
    return (
        <LawyerDashboardWrapper page="dashboard">
            <Heading fontSize="3xl">Lawyer Dashboard</Heading>
        </LawyerDashboardWrapper>
    )
}