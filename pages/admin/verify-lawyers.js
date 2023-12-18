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
    useToast,
} from '@chakra-ui/react'
import { getPendingLawyers, VerifyLawyer, deleteLawyer } from "@/lib/db";
import { useEffect, useState } from "react";

export default function VerifyLawyers() {
    const [ lawyers, setLawyers ] = useState([]);
    const toast = useToast();

    function handleApprove(index) {
        console.log(index)
    }

    function handleReject(index) {
        console.log(index)
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
                        {lawyers && lawyers.map((lawyer, index) => (
                            <Tr key={index}>
                                <Td>{lawyer.lawyerNumber}</Td>
                                <Td>{lawyer.name}</Td>
                                <Td>{lawyer.degree}</Td>
                                <Td>{lawyer.experience}</Td>
                                <Td>
                                    <Button colorScheme='green'>Approve</Button>
                                    <Button colorScheme='red'>Reject</Button>
                                </Td> 
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </AdminDashboardWrapper>
    )
}