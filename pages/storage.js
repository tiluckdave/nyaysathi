import DashBoardWrapper from "@/components/DashBoardWrapper";
import { Button, Flex, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Text, Icon, Switch, Input, useToast, SimpleGrid, Box, Link } from "@chakra-ui/react";
import { PiUploadSimpleBold, PiFilePdf, PiFileJpg, PiFilePng } from "react-icons/pi";
import { HiOutlineExternalLink } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import Files from 'react-files'
import { useState, useEffect } from "react";
import { saveFile, getUserFiles } from "@/lib/db";
import { UserAuth } from "@/lib/auth";
import axios from "axios";

const JWT = `Bearer ${process.env.NEXT_PUBLIC_IPFS_API_KEY}`

export default function Storage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();
    const { user } = UserAuth();
    const [ file, setFile ] = useState(null);
    const [ name, setName ] = useState('');
    const [ url, setUrl ] = useState('');
    const [ uploading, setUploading ] = useState(false);
    const [ uploaded, setUploaded ] = useState(false);
    const [ isPrivate, setIsPrivate ] = useState(false);
    const [ userFiles, setUserFiles ] = useState([]);

    const iconMap = {
        'application/pdf': PiFilePdf,
        'image/jpg': PiFileJpg,
        'image/png': PiFilePng,
        'image/jpeg': PiFileJpg,
    }

    function RemoveFile() {
        setFile(null);
        setUploaded(false);
        setName('');
        setUrl('');
        setIsPrivate(false);
    }

    const handleChange = (files) => {
        setFile(files[ 0 ]);
        console.log(files[ 0 ]);
    }

    const handleError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    }

    const handleUpload = () => {
        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        fetch("http://nyaysathi.replit.app/upload", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((result) => {
                setUrl(result.url);
                setUploaded(true);
                setUploading(false);
                toast({
                    title: "Success",
                    description: "File uploaded successfully. Please save the file to your secure storage.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    const handleIpfsUpload = async () => {
        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        const metadata = JSON.stringify({
            name: file.name,
        });
        formData.append('pinataMetadata', metadata);

        const options = JSON.stringify({
            cidVersion: 0,
        })
        formData.append('pinataOptions', options);

        try {
            const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                maxBodyLength: "Infinity",
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    Authorization: JWT
                }
            });
            console.log(res.data);
            setUrl(`${process.env.NEXT_PUBLIC_IPFS_GATEWAY}${res.data.IpfsHash}?pinataGatewayToken=${process.env.NEXT_PUBLIC_IPFS_ACCESS_TOKEN}`);
            setUploaded(true);
            setUploading(false);
            toast({
                title: "Success",
                description: "File uploaded successfully. Please save the file to your secure storage.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handleSave = () => {
        if (name === '') {
            toast({
                title: "Error",
                description: "Please enter a name for the file.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
            return;
        }
        saveFile(user.uid, name, url, file.sizeReadable, isPrivate, file.type);
        toast({
            title: "Success",
            description: "File saved successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: 'top',
        });
        onClose();
        setUserFiles([ ...userFiles, { name: name, url: url, size: file.sizeReadable, isPrivate: isPrivate, type: file.type } ]);
        RemoveFile();
    }

    useEffect(() => {
        const getMyFiles = async (uid) => {
            const files = await getUserFiles(uid);
            setUserFiles(files);
        }
        if (user?.uid) {
            getMyFiles(user?.uid);
        }
    }, [ user?.uid ])

    if (!user) {
        return (
            <DashBoardWrapper page="storage">
                loading...
            </DashBoardWrapper>
        )
    }

    return (
        <DashBoardWrapper page="storage">
            <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", lg: "lg" }} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Upload File</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {file ? (
                            <Flex flexDirection={"column"} gap="6">
                                <Flex width="100%" bg="gray.200" rounded="10" padding="3" flexDirection="row" justifyContent="space-between" alignItems={"center"}>
                                    <Flex flexDirection="column">
                                        <Text fontSize={"md"} fontWeight={"bold"}>{file.name}</Text>
                                        <Text>{file.sizeReadable}</Text>
                                    </Flex>

                                    <Button colorScheme="red" onClick={RemoveFile} rounded={"full"} padding={"2"}>
                                        <Icon as={RxCross2} boxSize={6} />
                                    </Button>
                                </Flex>
                                {uploaded && <Input placeholder='Name' size='md' onChange={(e) => setName(e.target.value)} value={name} />}
                                <Flex flexDirection={"column"} gap={2}>
                                    <Flex flexDirection={"row"} alignItems='center' gap={2}>
                                        <Switch colorScheme='yellow' onChange={(e) => setIsPrivate(e.target.checked)} />
                                        <Text>
                                            Contains sensitive data or evidence?
                                        </Text>
                                    </Flex>
                                    {isPrivate && (
                                        <Text bg={"yellow.100"} fontWeight={"bold"} padding={2} rounded={10} fontSize={"sm"}>
                                            Private files are uploaded on Blockchain IPFS storage. They cannot be changed by anyone, hence recommended for sensitive data & evidences.
                                        </Text>
                                    )}
                                </Flex>
                                {uploaded ? (
                                    <Button colorScheme='yellow' onClick={handleSave} >
                                        Save
                                    </Button>
                                ) : (
                                    isPrivate ? (<Button colorScheme='yellow' onClick={handleIpfsUpload} isLoading={uploading} >
                                        Upload
                                    </Button>) : (<Button colorScheme='yellow' onClick={handleUpload} isLoading={uploading} >
                                        Upload
                                    </Button>)
                                )}
                            </Flex>
                        ) : (<Files
                            style={{ height: '100px', width: '100%', border: '2px dashed gray', borderRadius: '10px', textAlign: 'center', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            className='files-dropzone'
                            onChange={handleChange}
                            onError={handleError}
                            accepts={[ 'image/png', 'image/jpg', '.pdf' ]}
                            maxFileSize={100000000}
                            minFileSize={0}
                            clickable>
                            Drop files here or click to upload
                        </Files>)}
                    </ModalBody>

                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Flex justifyContent={"space-between"} mb={{ base: 6, lg: "10" }} gap="4" alignItems={{ base: "flex-start", lg: "center" }} flexDirection={{ base: "column", lg: "row" }}>
                <Heading fontSize="3xl">Secure Storage</Heading>
                <Button colorScheme="yellow" leftIcon={<PiUploadSimpleBold />} onClick={onOpen}>Upload File</Button>
            </Flex>
            <Heading fontSize="xl" mb={"4"} mt={"4"}>My Files</Heading>
            <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6} >
                {userFiles.map((file, index) => {
                    if (file.isPrivate) return;
                    return <Flex key={index} width="100%" bg="gray.200" rounded="10" padding="3" flexDirection="column" justifyContent={"center"} gap="4">
                        <Flex flexDirection="row" gap="4">
                            <Flex bg="yellow.400" padding={"2"} rounded={"full"} justifyContent={"center"} alignItems={"center"}>
                                <Icon as={iconMap[ file.type ]} boxSize={8} />
                            </Flex>
                            <Flex flexDirection="column">
                                <Text fontSize={"md"} fontWeight={"bold"}>{file.name}</Text>
                                <Text>{file.size}</Text>
                            </Flex>
                        </Flex>
                        <Link href={file.url} target="_blank" display={"flex"} justifyContent={"flex-end"} alignItems={"center"} gap={"2"} color={"yellow.700"}>
                            View Document <HiOutlineExternalLink />
                        </Link>
                    </Flex>
                })}
            </SimpleGrid>
            <Heading fontSize="xl" mb={"4"} mt={"8"}>Private Files</Heading>
            <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6} >
                {userFiles.map((file, index) => {
                    if (!file.isPrivate) return;
                    return <Flex key={index} width="100%" bg="gray.200" rounded="10" padding="3" flexDirection="column" justifyContent={"center"} gap="4">
                        <Flex flexDirection="row" gap="4">
                            <Flex bg="yellow.400" padding={"2"} rounded={"full"} justifyContent={"center"} alignItems={"center"}>
                                <Icon as={iconMap[ file.type ]} boxSize={8} />
                            </Flex>
                            <Flex flexDirection="column">
                                <Text fontSize={"md"} fontWeight={"bold"}>{file.name}</Text>
                                <Text>{file.size}</Text>
                            </Flex>
                        </Flex>
                        <Link href={file.url} target="_blank" display={"flex"} justifyContent={"flex-end"} alignItems={"center"} gap={"2"} color={"yellow.700"}>
                            View Document <HiOutlineExternalLink />
                        </Link>
                    </Flex>
                })}
            </SimpleGrid>
        </DashBoardWrapper >
    )
}