import DashBoardWrapper from "@/components/DashBoardWrapper";
import { Button, Flex, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Text, Icon, Box, FormControl, FormLabel, Switch, Input } from "@chakra-ui/react";
import { PiUploadSimpleBold } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import Files from 'react-files'
import { useState } from "react";

export default function Storage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ file, setFile ] = useState(null);
    const [ name, setName ] = useState('');
    const [ isPrivate, setIsPrivate ] = useState(false);

    function RemoveFile() {
        setFile(null);
    }

    const handleChange = (files) => {
        setFile(files[ 0 ]);
        console.log(files[ 0 ]);
    }

    const handleError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    }

    const handleUpload = () => {
        console.log(file);
        console.log(name);
        console.log(isPrivate);
    }

    return (
        <DashBoardWrapper page="storage">
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Upload File</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {file ? (
                            <Flex flexDirection={"column"} gap="6">
                                <Input placeholder='Name' size='md' onChange={(e) => setName(e.target.value)} value={name} />
                                <Flex width="100%" bg="gray.200" rounded="10" padding="3" flexDirection="row" justifyContent="space-between" alignItems={"center"}>
                                    <Flex flexDirection="column">
                                        <Text fontSize={"md"} fontWeight={"bold"}>{file.name}</Text>
                                        <Text>{file.sizeReadable}</Text>
                                    </Flex>

                                    <Button colorScheme="red" onClick={RemoveFile} rounded={"full"} padding={"2"}>
                                        <Icon as={RxCross2} boxSize={6} />
                                    </Button>
                                </Flex>
                                <Flex flexDirection={"column"} gap={2}>
                                    <Flex flexDirection={"row"} alignItems='center' gap={2}>
                                        <Switch colorScheme='yellow' onChange={(e) => setIsPrivate(e.target.checked)} />
                                        <Text>
                                            Contains sensitive data or evidence?
                                        </Text>
                                    </Flex>
                                    {isPrivate && (
                                        <Text bg={"yellow.100"} fontWeight={"bold"} padding={2} rounded={10} fontSize={"sm"}>
                                            Private files are uploaded on Blockchain IPFS storage. Requires your polygon wallet to be connected.
                                        </Text>
                                    )}
                                </Flex>
                            </Flex>
                        ) : (<Files
                            style={{ height: '100px', width: '100%', border: '2px dashed gray', borderRadius: '10px', textAlign: 'center', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            className='files-dropzone'
                            onChange={handleChange}
                            onError={handleError}
                            accepts={[ 'image/png', 'image/jpg', 'image/jpeg', '.pdf', ]}
                            maxFileSize={100000000}
                            minFileSize={0}
                            clickable>
                            Drop files here or click to upload
                        </Files>)}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='yellow' onClick={handleUpload} >
                            Upload
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Flex justifyContent={"space-between"} mb={{ base: 6, lg: "10" }} gap="4" alignItems={{ base: "flex-start", lg: "center" }} flexDirection={{ base: "column", lg: "row" }}>
                <Heading fontSize="3xl">Secure Storage</Heading>
                <Button colorScheme="yellow" leftIcon={<PiUploadSimpleBold />} onClick={onOpen}>Upload File</Button>
            </Flex>
        </DashBoardWrapper>
    )
}