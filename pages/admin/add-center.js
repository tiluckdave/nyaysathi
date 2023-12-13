import AdminDashboardWrapper from '@/components/AdminDashboardWrapper'
import React, { useState } from 'react'
import { Box, TableContainer, Link, Table, Thead, Tr, Th, Td, Tbody, IconButton, Button, Flex, Heading, Icon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter } from '@chakra-ui/react'
import { IoAdd } from "react-icons/io5";
import { FaEdit, FaTrash } from 'react-icons/fa'


export default function AddCenter() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [title, setTitle] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [locationURL, setLocationURL] = useState('');

    const data = [
        {
            title: 'Amity Legal Aid Cell',
            city: 'Pune',
            state: 'Maharashtra',
            address: 'Maharshi Nagar Near Datta Mandir',
            phone: '123456789',
            locationURL: 'https://www.google.com/maps/place/ILS+Law+College/@18.5171271,73.8254709,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2bf9ac57f49eb:0xc6624739e732732!8m2!3d18.5171271!4d73.8280512!16s%2Fm%2F026jtd3?authuser=0&entry=ttu'
        }
    ]

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = () => {
        // Add your logic to handle the submission of the form
        console.log('Submitted:', { title, city, state, address, phone, locationURL });
        handleCloseModal();
    };

    const handleEdit = (index) => {
        const rowData = data[index];
        // You can now use the rowData for further actions (e.g., open a modal with editable fields)
        console.log('Edit Row Data:', rowData);
        // onEdit(index);
    };
    const handleDelete = (index) => {
        const rowData = data[index];
        // You can now use the rowData for further actions (e.g., confirm deletion)
        console.log('Delete Row Data:', rowData);
        // onDelete(index);
    };


    return (
        <AdminDashboardWrapper page={"legalCenter"}>
            <Flex flexDirection={{ base: "column", lg: "row" }} gap={4} alignItems={"flex-start"} justifyContent="space-between">
                <Heading fontSize="3xl">Add Legal Center</Heading>
                <Button
                    colorScheme="yellow"
                    mr={3}
                    leftIcon={<Icon as={IoAdd} />}
                    onClick={handleOpenModal}
                >
                    Add Center
                </Button>
            </Flex>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="2xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Legal Aid Center</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl mb={4}>
                            <FormLabel>Center Name</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter Legal Aid Center Name"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel>City</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel>State</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel>Address</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel>Location</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter Location URL"
                                value={locationURL}
                                onChange={(e) => setLocationURL(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel>phone</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </FormControl>

                        <ModalFooter>
                            <Button colorScheme={"yellow"} onClick={handleSubmit}>
                                Submit
                            </Button>
                        </ModalFooter>


                    </ModalBody>
                </ModalContent>
            </Modal>

            <Box mt={10} boxShadow={"lg"} rounded="md" borderWidth={2} borderColor="brand.light" bg={"gray.100"}>
                <TableContainer mt={20}>
                    <Table variant='simple'>
                        <Thead >
                            <Tr>
                                <Th fontSize={"md"}>Center Name</Th>
                                <Th fontSize={"md"}>City</Th>
                                <Th fontSize={"md"}>State</Th>
                                <Th fontSize={"md"}>Address</Th>
                                <Th fontSize={"md"}>Location</Th>
                                <Th fontSize={"md"}>Phone</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((d, index) => {
                                return (
                                    <Tr key={index}>
                                    <Td>{d.title}</Td>
                                    <Td>{d.city}</Td>
                                    <Td>{d.state}</Td>
                                    <Td>{d.address}</Td>
                                    <Td><Link href={d.locationURL} isExternal>Get Directions</Link></Td>
                                    <Td>{d.phone}</Td>
                                    <Td>
                                <Flex flexDirection={"row"} gap={3}>
                                    <IconButton
                                        colorScheme="yellow"
                                        variant="solid"
                                        size="sm"
                                        icon={<Icon as={FaEdit} />}
                                        onClick={() => handleEdit(index)}
                                    >
                                        Edit
                                    </IconButton>
                                    <IconButton
                                        colorScheme="red"
                                        variant="solid"
                                        size="sm"
                                        icon={<Icon as={FaTrash} />}
                                        onClick={() => handleDelete(index)}
                                    />
                                </Flex>
                            </Td>
                                    </Tr>
                                )
                            })}
                            
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>

        </AdminDashboardWrapper>

    )
}
