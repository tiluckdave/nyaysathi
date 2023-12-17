import LawyerDashboardWrapper from "@/components/LawyerDashboardWrapper";
import { Heading } from "@chakra-ui/react";
import { UserAuth } from "@/lib/auth";

export default function Dashboard() {
    const { user } = UserAuth();

    return (
        <LawyerDashboardWrapper page="dashboard">
            <Heading fontSize="3xl">Lawyer Dashboard</Heading>
        </LawyerDashboardWrapper>
    )
}