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
    Flex,
} from '@chakra-ui/react'
import { getPendingLawyers, VerifyLawyer, deleteLawyer } from "@/lib/db";
import { useEffect, useState } from "react";

export default function VerifyLawyers() {
    const [ lawyers, setLawyers ] = useState([]);
    const toast = useToast();

    function handleApprove(index) {
       const rowData = lawyers[index]
       console.log(rowData);
       VerifyLawyer(rowData.uid);
       toast({
        title: "Lawyer Approved!",
        description: "Lawyer approved Successfully..!!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: 'top',

    });
    }

    function handleReject(index) {
        const rowData = lawyers[index]
        console.log(rowData);
        deleteLawyer(rowData.uid);
        toast({
            title: "Lawyer Rejcted!",
            description: "Lawyer Rejcted Successfully..!!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: 'top',
    
        });

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
                                <Flex flexDirection={"row"} gap={3}>
                                    <Button colorScheme='green'onClick={() => handleApprove(index)}>Approve</Button>
                                    <Button colorScheme='red'onClick={() => handleReject(index)} >Reject</Button>
                                </Flex>
                                </Td> 
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </AdminDashboardWrapper>
    )
}