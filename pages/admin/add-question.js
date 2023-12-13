import AdminDashboardWrapper from "@/components/AdminDashboardWrapper";
import { Button, Flex, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Table, Thead, Tbody, Tr, Th, Td, IconButton, Icon, TableContainer, Box, useToast, Text, Editable, } from "@chakra-ui/react";
import { IoMdAddCircle } from "react-icons/io";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from "react";
import { createQuestion, getAllQuestions, deleteQuestion } from "@/lib/db";



export default function AddQuestion() {
    const toast = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctOption, setCorrectOption] = useState('');
    const [data, setData] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editData, setEditData] = useState({});

    // const data = [
    //     {
    //         question: 'What is the capital of France?',
    //         options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
    //         correctAnswer: 'Paris',
    //     },
    //     {
    //         question: 'Who is the author of "To Kill a Mockingbird"?',
    //         options: ['Harper Lee', 'J.K. Rowling', 'Ernest Hemingway', 'F. Scott Fitzgerald'],
    //         correctAnswer: 'Harper Lee',
    //     },
    // ];

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = () => {
        // Add your logic to handle the submission of the form
        console.log('Submitted:', { question, options, correctOption });
        createQuestion(question, options, correctOption);
        toast({
            title: "Question Added!",
            description: "Daily question is added Successfully..!!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: 'top',

        });
        handleCloseModal();
    };

    const handleEdit = (index) => {
        const rowData = data[index];
        setIsEditModalOpen(true);
        setEditData(rowData);

        // You can now use the rowData for further actions (e.g., open a modal with editable fields)
        console.log('Edit Row Data:', rowData);
        // onEdit(index);   
    };
    const handleDelete = (index) => {
        const rowData = data[index];
        deleteQuestion(rowData.uid);
        toast({
            title: "Question dELETED!",
            description: "Daily question is Deleted Successfully..!!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: 'top',

        });

        // You can now use the rowData for further actions (e.g., confirm deletion)
        console.log('Delete Row Data:', rowData);
        // onDelete(index);
    };
    const updateQuestion = () => {
        console.log('Updated values:', { question, options, correctOption });
        const updatedQuestion = updateQuestionDB(editData.uid, question, options, correctOption);
        if (editData.uid === updatedQuestion.uid) {

            toast({
                title: "Question Updated!",
                description: "Daily question is Updated Successfully..!!",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: 'top',

            });
        }

        isEditModalOpen(false);
    }
    const questionList = async () => {
        const questionDb = await getAllQuestions();
        setData(questionDb);
    }
    useEffect(() => {
        questionList();
    }, [])


    return (
        <AdminDashboardWrapper>
            <Flex flexDirection={{ base: "column", lg: "row" }} justifyContent={"space-between"} gap={"3"} alignItems={"flex-start"}>
                <Heading fontSize="3xl" id="heading">Daily Questions</Heading>
                <Button onClick={handleOpenModal} colorScheme="yellow" leftIcon={<IoMdAddCircle />}>
                    Add
                </Button>
            </Flex>
            {/* <div>add-question</div> */}

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="2xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Daily Question</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl mb={4}>
                            <FormLabel>Question</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter your question"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                        </FormControl>

                        {[0, 1, 2, 3].map((index) => (
                            <FormControl key={index} mb={4}>
                                <FormLabel>{`Option ${index + 1}`}</FormLabel>
                                <Input
                                    type="text"
                                    placeholder={`Enter option ${index + 1}`}
                                    value={options[index]}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                />
                            </FormControl>
                        ))}

                        <FormControl mb={4}>
                            <FormLabel>Correct Option</FormLabel>
                            <Select

                                value={correctOption}
                                onChange={(e) => setCorrectOption(e.target.value)}
                            >
                                {options.map((option, index) => (
                                    <option key={index} value={option}>
                                        {/* {`Option ${index + 1}`} */}
                                        {options[index]}
                                    </option>
                                ))}
                            </Select>
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
                    <Table maxW={"100%"} variant='simple'>
                        <Thead >
                            <Tr>
                                <Th fontSize={"md"}>Question Text</Th>
                                <Th fontSize={"md"}>Options</Th>
                                <Th fontSize={"md"}>Correct Answer</Th>
                                <Th fontSize={"md"}>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data?.map((row, index) => (
                                <Tr key={index}>
                                    {/* Question Text */}
                                    <Td>
                                       {row.question}
                                    </Td>

                                    {/* Options */}
                                    <Td>
                                       
                                            <ul>
                                                {row.options.map((option, optionIndex) => (
                                                    <li key={optionIndex}>{option}</li>
                                                ))}
                                            </ul>
                                     
                                    </Td>

                                    {/* Correct Answer */}
                                    <Td>
                                        {row.correct}
                                    </Td>

                                    {/* Edit and Delete Buttons */}
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
                                            >
                                                Delete
                                            </IconButton>
                                        </Flex>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Edit Modal */}
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Question</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl mb={4}>
                            <FormLabel>Question</FormLabel>
                            <Input
                                type="text"
                                value={editData.question}
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel>Options</FormLabel>
                            {editData?.options?.map((option, optionIndex) => (
                                <Input
                                    key={optionIndex}
                                    type="text"
                                    value={option}
                                    onChange={(e) => {
                                        const newOptions = [...editData.options];
                                        options[optionIndex] = e.target.value;
                                        setOptions(newOptions);
                                    }}
                                    mb={2}
                                />
                            ))}
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel>Correct Answer</FormLabel>
                            <Input
                                type="text"
                                value={editData.correct}
                                onChange={(e) => setCorrectOption(e.target.value)}
                            />
                        </FormControl>
                        <ModalFooter>
                            <Button colorScheme="yellow" onClick={updateQuestion}>
                                Update
                            </Button>
                        </ModalFooter>
                    </ModalBody>
                </ModalContent>
            </Modal>



        </AdminDashboardWrapper>

    )
}
