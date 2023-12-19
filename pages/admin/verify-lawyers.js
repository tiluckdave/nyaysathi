import AdminDashboardWrapper from "@/components/AdminDashboardWrapper";
import { Box, Button, Heading, Icon, IconButton } from "@chakra-ui/react";
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
import { MdDone  } from "react-icons/md";
import { ImCross } from "react-icons/im";



export default function VerifyLawyers() {
    const [lawyers, setLawyers] = useState([]);
    const toast = useToast();

    function handleApprove(index) {
        const updatedLawyers = [...lawyers]; 
        const rowData = updatedLawyers[index]
        console.log(rowData);
        VerifyLawyer(rowData.uid);
        updatedLawyers.splice(index, 1); // Remove the approved lawyer from the array
        setLawyers(updatedLawyers);
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
        const updatedLawyers = [...lawyers];
        const rowData = updatedLawyers[index]
        console.log(rowData);
        deleteLawyer(rowData.uid);
        updatedLawyers.splice(index, 1); // Remove the rejected lawyer from the array
        setLawyers(updatedLawyers);
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
           
            <Box mt={10} boxShadow={"lg"} rounded="md" borderWidth={2} borderColor="brand.light" bg={"gray.100"} overflowX="auto" overflowY="auto" maxWidth="100%">
                <TableContainer>
                    <Table  maxW={"100%"} variant='simple' >
                        <Thead  position="sticky" top={0} >
                            <Tr paddingTop={0}>
                                <Th fontSize={"md"}>Lawyer Number</Th>
                                <Th fontSize={"md"}>Lawyer Name</Th>
                                <Th fontSize={"md"}>Lawyer Degree</Th>
                                <Th fontSize={"md"}>Lawyer Experience</Th>
                                <Th fontSize={"md"}>Actions</Th>
                            </Tr>
                        </Thead>
                        {lawyers && lawyers.map((lawyer, index) => (
                            <Tr key={index}>
                                <Td>{lawyer.lawyerNumber}</Td>
                                <Td>{lawyer.name}</Td>
                                <Td>{lawyer.degree}</Td>
                                <Td>{lawyer.experience}</Td>
                                <Td>
                                <Flex flexDirection={"row"} gap={3}>
                                <IconButton
                                                colorScheme="yellow"
                                                variant="solid"
                                                size="sm"
                                                icon={<Icon as={MdDone } />}
                                                onClick={() => handleApprove(index)}
                                            >
                                                Approve
                                            </IconButton>
                                            <IconButton
                                                colorScheme="red"
                                                variant="solid"
                                                size="sm"
                                                icon={<Icon as={ImCross} />}
                                                onClick={() => handleReject(index)}
                                            >
                                                Delete
                                            </IconButton>
                                </Flex>
                                </Td> 
                            </Tr>
                        ))}
                    </Table>
                </TableContainer>

            </Box>
        </AdminDashboardWrapper>
    )
}