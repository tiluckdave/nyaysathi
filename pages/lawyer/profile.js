import LawyerDashboardWrapper from "@/components/LawyerDashboardWrapper";
import { UserAuth } from "@/lib/auth";
import { useState,useEffect } from "react";
import states from '@/data/states.json';
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
    Icon,
    useStatStyles
} from '@chakra-ui/react'
import Select from 'react-select';
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import { updateLawyerDetailsDB } from "@/lib/db";

export default function profile({ challenge }) {
const { user } = UserAuth();
const [ fname, setFname ] = useState("");
const [ lname, setLname ] = useState("");
const [lawyerNo ,setLawyerNo] = useState("");
const[phone,setPhone] = useState("");
const[state,setState] = useState("")
const[city,setCity] = useState("");
const [cities,setCities] = useState("");
const [age,setAge] = useState("");
const [gender,setGender] = useState("");
const[degree,setDegree] = useState("");
const[description,setDescription] = useState("");
const[specialization,setSpecialization] = useState("");
const[experience,setExperience] = useState("");
const[fees,setFees] = useState("");

const toast = useToast();

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

const updateProfile = () => {
    const name = fname + " " + lname;
    updateLawyerDetailsDB(user?.uid + user?.email, name, phone, state, city, age, gender,lawyerNo,degree,description,experience,fees );
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
    if (user) {
        console.log('user.uid : ',user.uid)
        setFname((user?.name)?.split(" ")[ 0 ])
        setLname((user?.name)?.split(" ")[ 1 ])
    }
}, [ setFname, setLname, user ]);

useEffect(() => {
    setAge(user?.age)
    setState(user?.state)
    setCity(user?.city)
    setPhone(user?.phone)
    setGender(user?.gender)
    setLawyerNo(user?.lawyerNumber)
    setDegree(user?.degree)
    setDescription(user?.description);
    setSpecialization(user?.specialization);
    setExperience(user?.experience);
    setFees(user?.fees);
    setFname((user?.name)?.split(" ")[ 0 ])
    setLname((user?.name)?.split(" ")[ 1 ])
}, [ setFname, setLname, user ]);

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
  return (
    <LawyerDashboardWrapper page="profile">
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
                            src={user?.photoURL}
                        >
                        </Avatar>
                        <VStack spacing={1}>
                            <Heading as="h3" fontSize="xl" color="brand.dark">
                                {user?.name}
                            </Heading>
                            <Text color="brand.gray" fontSize="sm">
                                {user?.email}
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
                                    <FormControl id="lawyerNo">
                                        <FormLabel>Lawyer Registration Number</FormLabel>
                                        <Input
                                            borderColor='yellow.500'
                                            focusBorderColor="brand.blue"
                                            type="text"
                                            value={lawyerNo}
                                            onChange={e => setLawyerNo(e.target.value)}
                                        />
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
                                            value={user?.email}
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
                                    <FormControl id="degree">
                                        <FormLabel>Degree</FormLabel>
                                        <Input
                                            borderColor='yellow.500'
                                            focusBorderColor="brand.blue"
                                            type="text"
                                            value={degree}
                                            onChange={e => setDegree(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl id="description">
                                        <FormLabel>Description</FormLabel>
                                        <Input
                                            borderColor='yellow.500'
                                            focusBorderColor="brand.blue"
                                            type="text"
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl id="specialization">
                                        <FormLabel>Specialization</FormLabel>
                                        <Input
                                            borderColor='yellow.500'
                                            focusBorderColor="brand.blue"
                                            type="text"
                                            value={specialization}
                                            onChange={e => setSpecialization(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl id="experience">
                                        <FormLabel>Experience</FormLabel>
                                        <Input
                                            borderColor='yellow.500'
                                            focusBorderColor="brand.blue"
                                            type="text"
                                            value={experience}
                                            onChange={e => setExperience(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl id="fees">
                                        <FormLabel>Fees</FormLabel>
                                        <Input
                                            borderColor='yellow.500'
                                            focusBorderColor="brand.blue"
                                            type="text"
                                            value={fees}
                                            onChange={e => setFees(e.target.value)}
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
                            {/* {support && (
                                <Button colorScheme="yellow" leftIcon={<PiFingerprintSimpleBold />} onClick={handleRegister}>
                                    Add Biometric
                                </Button>
                            )} */}
                        </HStack>
                    </Box>
                </Box>
                {/* <Flex flexDirection={"column"} mt="6" display={{ base: "flex", lg: "none" }} gap="3">
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
                </Flex> */}
            </Flex>
    </LawyerDashboardWrapper>
  )
}
