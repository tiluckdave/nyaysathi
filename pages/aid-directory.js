import DashBoardWrapper from "@/components/DashBoardWrapper";
import { Heading, CardHeader, Stack, Divider, ButtonGroup, CardBody, Button, Text, CardFooter, SimpleGrid, Card, Select as ChakraSelect, Flex, Center } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import states from '@/data/states.json';
import axios from "axios";
import Select from 'react-select';
import { getCentersDb } from "@/lib/db";
import Link from "next/link";
import { LuMapPin } from "react-icons/lu";
import { MdPhoneInTalk } from "react-icons/md";
export default function AidDirectory() {




    const [state, setState] = useState("");
    const [cities, setCities] = useState([]);
    const [centers, setCenters] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");

    const colourStyles = {
        control: (styles) => ({
            ...styles, width: '270px', '@media (max-width: 992px)': {
                width: '100%',
            }, borderColor: "#D69E2E", lineHeight: "1.65"
        }),
        option: (styles) => ({
            ...styles, width: '270px', '@media (max-width: 992px)': {
                width: '100%',
            },
        }),
        input: (styles) => ({
            ...styles, width: '270px', '@media (max-width: 992px)': {
                width: '100%',
            },
        }),
    };

    console.log(states)
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
    }, [state]);


    const getCenters = async () => {
        console.log("Inside Get Centers")
        const centersList = await getCentersDb(state, selectedCity)
        console.log(centersList)
        setCenters(centersList);
        console.log(centersList[0])
    };

    return (
        <DashBoardWrapper page="aid">
            <Heading fontSize="3xl">Legal Aid Center</Heading>
            <Flex gap={4} mt={10} flexDirection={{ base: "column", lg: "row" }} >


                <ChakraSelect
                    borderColor='yellow.500'
                    size='md'
                    width={{ base: "100%", lg: "270px" }}
                    placeholder="State"
                    color={"black"}
                    onChange={e => setState(e.target.value)}
                >
                    {states.map((state) => (
                        <option value={state.name}>{state.name}</option>
                    ))}
                </ChakraSelect>
                <Select
                    styles={colourStyles}
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue="city"
                    isSearchable="true"
                    options={cities}
                    name="cities"
                    onChange={e => setSelectedCity(e.value)}
                />
                <Button colorScheme='yellow' onClick={getCenters}>Search</Button>

            </Flex>
            <Flex gap={4} mt={10} flexDirection={{ base: "column", lg: "row" }} >
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    {centers?.map((center) => (
                        <Card maxW='m'>
                            <CardBody backgroundColor={"gray.100"} rounded={10} dropShadow={"lg"}>

                                <Stack  spacing='3'>
                                    <Heading size='md'>{center.title}</Heading>
                                    <Text>
                                        {center.address}
                                    </Text>
                                </Stack>
                            </CardBody>
                            <Divider />
                            <CardFooter backgroundColor={"gray.100"} >
                               
                                    <ButtonGroup spacing='2' >
                                    <Link href={center.locationURL} target="blank">
                                        <Button variant='solid' colorScheme='yellow' leftIcon={<LuMapPin />}>
                                            Location
                                        </Button>
                                    </Link>
                                        <Button variant='ghost' colorScheme='black' leftIcon={<MdPhoneInTalk />}>
                                           {center.phone}
                                        </Button>


                                    </ButtonGroup>
                              
                            </CardFooter>
                        </Card>
                    ))}


                </SimpleGrid>
            </Flex>


        </DashBoardWrapper >
    )
}