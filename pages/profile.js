import React, { useEffect, useState } from "react";
import DashBoardWrapper from "@/components/DashBoardWrapper";
import { UserAuth } from "@/lib/auth";
import { useRouter } from "next/router";
// import { Button } from "@chakra-ui/react";
import { PiFingerprintSimpleBold } from "react-icons/pi";
import { FaQ } from "react-icons/fa6";
import { supported, create } from "@github/webauthn-json";
import { generateChallenge } from "@/lib/utils";
import { withSessionSSR } from "@/lib/session";
import { FaUserEdit } from "react-icons/fa";
import { updateDetailsDB } from "@/lib/db";
import states from '@/data/states.json';
import Select from 'react-select';
import axios from "axios";

import {
    Flex,
    Avatar,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack,
    Box,
    HStack,
    Grid,
    Select as ChakraSelect,
    useToast,
    Icon
} from '@chakra-ui/react'
import Link from "next/link";
import { LuNewspaper } from "react-icons/lu";


export default function Profile({ challenge }) {
    const toast = useToast();
    const router = useRouter();
    const { user } = UserAuth();
    const [ User, SetUser ] = useState(null);
    const [ support, setSupport ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ fname, setFname ] = useState("");
    const [ lname, setLname ] = useState("");
    const [ state, setState ] = useState("");
    const [ phone, setPhone ] = useState("");
    const [ city, setCity ] = useState();
    const [ age, setAge ] = useState("");
    const [ gender, setGender ] = useState("");
    const [ profession, setProfession ] = useState("");
    const [ cities, setCities ] = useState([])
    const colourStyles = {
        control: (styles) => ({
            ...styles, width: '480px', '@media (max-width: 992px)': {
                width: '100%',
            }, borderColor: "#D69E2E", lineHeight: "1.65"
        }),
        option: (styles) => ({
            ...styles, width: '480px', '@media (max-width: 992px)': {
                width: '100%',
            },
        }),
        input: (styles) => ({
            ...styles, width: '480px', '@media (max-width: 992px)': {
                width: '100%',
            },
        }),
    };


    async function handleRegister(event) {
        event.preventDefault();

        const cred = await create({
            publicKey: {
                challenge: challenge,
                rp: {
                    name: "WebAuthn Demo",
                    id: router.hostname,
                },
                user: {
                    id: user?.uid,
                    name: user?.email,
                    displayName: user?.displayName,
                },
                pubKeyCredParams: [ { alg: -7, type: "public-key" } ],
                timeout: 60000,
                attestation: "direct",
                authenticatorSelection: {
                    residentKey: "required",
                    userVerification: "required",
                },
            },
        });




        fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: user.uid, name: user.email, displayName: user.displayName, cred }),
        }).then((response) => response.json())
            .then((data) => {
                if (data.userId) {
                    router.push("/dashboard");
                } else {
                    setError(data.message);
                }
            }
            );
    }

    const updateProfile = () => {
        const name = fname + " " + lname;
        updateDetailsDB(user?.uid || User?.uid, name, phone, state, city, age, gender, profession)
        toast({
            title: "Profile Updated.",
            description: "Your profile has been updated successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top"
        })
    }

    useEffect(() => {
        if (localStorage.getItem("user")) {
            SetUser(JSON.parse(localStorage.getItem("user")));
        }
    }, [ SetUser, User ]);

    useEffect(() => {
        const checkAvailability = async () => {
            const available =
                await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
            setSupport(available && supported());
        };
        checkAvailability();
    }, []);

    useEffect(() => {
        if (user || User) {
            setFname((user?.name)?.split(" ")[ 0 ] || (User?.name)?.split(" ")[ 0 ])
            setLname((user?.name)?.split(" ")[ 1 ] || (User?.name)?.split(" ")[ 1 ])
        }
    }, [ User, setFname, setLname, user ]);


    //get cities api


    useEffect(() => {
        setAge(user?.age || User?.age)
        setState(user?.state || User?.state)
        setCity(user?.city || User?.city)
        setPhone(user?.phone || User?.phone)
        setProfession(user?.profession || User?.profession)
        setGender(user?.gender || User?.gender)
        setFname((user?.name)?.split(" ")[ 0 ] || (User?.name)?.split(" ")[ 0 ])
        setLname((user?.name)?.split(" ")[ 1 ] || (User?.name)?.split(" ")[ 1 ])
    }, [ User, setFname, setLname, user ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('https://countriesnow.space/api/v0.1/countries/state/cities', {
                    "country": "India",
                    state,
                });


                let citiesObj = []

                response.data.data.map((city) => {
                    citiesObj.push({ "value": city, "label": city })
                })



                // Assuming the response data has a "data" property containing the city list
                setCities(citiesObj);
                console.log(response.data.data);
            } catch (error) {
                console.error('Error fetching city data:', error);
            }
        };

        fetchData();
    }, [ state ]);



    if (user || User) {
        console.log(user)
    }
    else {
        return (
            <DashBoardWrapper page="profile">
                <h1>Loading...</h1>
            </DashBoardWrapper>
        )
    }

    return (
        <DashBoardWrapper page="profile">
            <Flex gap={2} flexDirection="column" maxW="container.lg">
                <Box
                    flex={1}
                    bg="white"
                    rounded="md"
                    borderWidth={1}
                    borderColor="brand.light"
                    boxShadow={"lg"}
                    width={"100%"}
                >
                    <HStack spacing={2} py={5} justifyContent={"space-around"} flexDirection={{ base: "column", lg: "row" }} borderBottomWidth={1} borderColor="brand.light">
                        <Avatar
                            size="2xl"
                            name="Tim Cook"
                            cursor="pointer"
                            src={user?.photoURL || User?.photoURL}
                        >
                        </Avatar>
                        <VStack spacing={1}>
                            <Heading as="h3" fontSize="xl" color="brand.dark">
                                {user?.name || User?.name}
                            </Heading>
                            <Text color="brand.gray" fontSize="sm">
                                {user?.email || User?.email}
                            </Text>
                        </VStack>
                    </HStack>


                </Box>

                <Box
                    as="main"
                    flex={3}
                    d="flex"
                    flexDir="column"
                    justifyContent="space-between"
                    pt={5}
                    bg="white"
                    rounded="md"
                    borderWidth={1}
                    borderColor="gray.200"
                    boxShadow={"lg"}

                >
                    <Tabs>
                        <TabList px={5}>

                            <Tab
                                key="Account Setting"
                                mx={3}
                                px={0}
                                py={3}
                                fontWeight="semibold"
                                color="cadet"
                                borderBottomWidth={1}
                                _active={{ bg: 'transparent' }}
                                _selected={{ color: 'brand.dark' }}
                            >
                                Account Setting
                            </Tab>

                        </TabList>

                        <TabPanels px={3} mt={5}>
                            <TabPanel>
                                <Grid
                                    templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
                                    gap={6}
                                >
                                    <FormControl id="firstName">
                                        <FormLabel>First Name</FormLabel>
                                        <Input onChange={e => setFname(e.target.value)}
                                            borderColor='yellow.500' focusBorderColor="brand.blue" type="text" value={fname} />
                                    </FormControl>
                                    <FormControl id="lastName">
                                        <FormLabel>Last Name</FormLabel>
                                        <Input onChange={e => setLname(e.target.value)}
                                            borderColor='yellow.500' focusBorderColor="brand.blue" type="text" value={lname} />
                                    </FormControl>
                                    {/* <FormControl id="phoneNumber">
                                        <FormLabel>Phone Number</FormLabel>
                                        <Input
                                            focusBorderColor="brand.blue"
                                            type="tel"
                                            placeholder="Enter Phone"
                                        />
                                    </FormControl> */}
                                    <FormControl id="emailAddress">
                                        <FormLabel>Email Address</FormLabel>
                                        <Input
                                            borderColor='yellow.500'
                                            focusBorderColor="brand.blue"
                                            type="email"
                                            value={user?.email || User?.email}
                                            disabled
                                            _disabled={{ bg: 'gray.100' }}
                                        />
                                    </FormControl>
                                    <FormControl id="phone">
                                        <FormLabel>Phone</FormLabel>
                                        <Input
                                            borderColor='yellow.500'
                                            focusBorderColor="brand.blue"
                                            type="phone"
                                            onChange={e => setPhone(e.target.value)}
                                            value={phone}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>State</FormLabel>
                                        <ChakraSelect
                                            borderColor='yellow.500'
                                            size='md'
                                            width={{ base: "100%", lg: "480px" }}
                                            placeholder="State"
                                            value={state}
                                            color={"black"}
                                            onChange={e => setState(e.target.value)}
                                        >
                                            {states.map((state) => (
                                                <option key={state.name} value={state.name}>{state.name}</option>
                                            ))}
                                        </ChakraSelect>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>City</FormLabel>
                                        <Select
                                            styles={colourStyles}
                                            className="basic-single"
                                            classNamePrefix="select"
                                            isSearchable="true"
                                            defaultValue={{ label: city, value: city }}
                                            options={cities}
                                            name="cities"
                                            onChange={e => setCity(e.value)}
                                        />
                                    </FormControl>
                                    <FormControl id="age">
                                        <FormLabel>Age</FormLabel>
                                        <Input
                                            borderColor='yellow.500'
                                            focusBorderColor="brand.blue"
                                            type="number"
                                            value={age}
                                            onChange={e => setAge(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl id="gender">
                                        <FormLabel>Gender</FormLabel>
                                        <ChakraSelect
                                            borderColor='yellow.500'
                                            size='md'
                                            width={{ base: "100%", lg: "480px" }}
                                            placeholder="Gender"
                                            value={gender}
                                            color={"black"}
                                            onChange={e => setGender(e.target.value)}
                                        >
                                            <option key="Male" value="Male">Male</option>
                                            <option key="Female" value="Female">Female</option>
                                            <option key="Other" value="Other">Other</option>
                                        </ChakraSelect>
                                    </FormControl>
                                    <FormControl id="profession">
                                        <FormLabel>Profession</FormLabel>
                                        <Input
                                            borderColor='yellow.500'
                                            focusBorderColor="brand.blue"
                                            type="text"
                                            value={profession}
                                            onChange={e => setProfession(e.target.value)}
                                        />
                                    </FormControl>
                                    {/* <FormControl id="city">
                                        <FormLabel>City</FormLabel>
                                        <Select focusBorderColor="brand.blue" placeholder="Select city">
                                            <option value="california">California</option>
                                            <option value="washington">Washington</option>
                                            <option value="toronto">Toronto</option>
                                            <option value="newyork" selected>
                                                New York
                                            </option>
                                            <option value="london">London</option>
                                            <option value="netherland">Netherland</option>
                                            <option value="poland">Poland</option>
                                        </Select>
                                    </FormControl>
                                    <FormControl id="country">
                                        <FormLabel>Country</FormLabel>
                                        <Select focusBorderColor="brand.blue" placeholder="Select country">
                                            <option value="america" selected>
                                                America
                                            </option>
                                            <option value="england">England</option>
                                            <option value="poland">Poland</option>
                                        </Select>
                                    </FormControl> */}
                                </Grid>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>

                    <Box mt={5} py={5} px={8} borderTopWidth={1} borderColor="brand.light">
                        <HStack spacing={2}>
                            <Button onClick={updateProfile} colorScheme="yellow" leftIcon={<FaUserEdit />}>
                                Update
                            </Button>
                            {support && (
                                <Button colorScheme="yellow" leftIcon={<PiFingerprintSimpleBold />} onClick={handleRegister}>
                                    Add Biometric
                                </Button>
                            )}
                        </HStack>
                    </Box>
                </Box>
                <Flex flexDirection={"column"} mt="6" display={{ base: "flex", lg: "none" }} gap="3">
                    <Text fontWeight={"bold"} fontSize={"xl"}>Other Pages</Text>
                    <Link href="/news">
                        <Button colorScheme='gray' bg={"gray.200"} padding={2} rounded={4} alignItems={"center"} justifyContent="flex-start" width="100%" size={"lg"}>
                            <Icon boxSize={5} as={LuNewspaper} />
                            <Text marginLeft={3}>New & Updates</Text>
                        </Button>
                    </Link>
                    <Link href="/faqs">
                        <Button colorScheme='gray' bg={"gray.200"} padding={2} rounded={4} alignItems={"center"} justifyContent="flex-start" width="100%" size={"lg"}>
                            <Icon boxSize={5} as={FaQ} />
                            <Text marginLeft={3}>FAQs</Text>
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </DashBoardWrapper>
    )
}

export const getServerSideProps = withSessionSSR(async function ({ req, res }) {
    const challenge = generateChallenge();
    req.session.challenge = challenge;
    await req.session.save();
    return { props: { challenge } };
});