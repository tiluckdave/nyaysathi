import AdminDashboardWrapper from "@/components/AdminDashboardWrapper";
import { Button, Heading } from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { getPendingLawyers, VerifyLawyer, deleteLawyer } from "@/lib/db";
import { useEffect, useState } from "react";

export default function VerifyLawyers() {
    const [ lawyers, setLawyers ] = useState([]);

    const handleApprove = async (lawyerUid) => {
        await VerifyLawyer(lawyerUid);
        getAllLawyers();
    }

    const handleReject = async (lawyerUid) => {
        await deleteLawyer(lawyerUid);
        getAllLawyers();
    }

    const getAllLawyers = async () => {
        const lawyers = await getPendingLawyers();
        setLawyers(lawyers);
        console.log(lawyers);
    }

    useEffect(() => {
        getAllLawyers();
    }, []);

    return (
        <AdminDashboardWrapper>
            <Heading>
                Verify Lawyers
            </Heading>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Lawyer Number</Th>
                            <Th>Lawyer Name</Th>
                            <Th>Lawyer Degree</Th>
                            <Th>Lawyer Experience</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {lawyers && lawyers.map((lawyer) => (
                            <Tr key={lawyer.uid}>
                                <Td>{lawyer.lawyerNumber}</Td>
                                <Td>{lawyer.name}</Td>
                                <Td>{lawyer.degree}</Td>
                                <Td>{lawyer.experience}</Td>
                                <Td>
                                    <Button colorScheme='green' onClick={handleApprove(lawyer.uid)}>Approve</Button>
                                    <Button colorScheme='red' onClick={handleReject(lawyer.uid)}>Reject</Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </AdminDashboardWrapper>
    )
}