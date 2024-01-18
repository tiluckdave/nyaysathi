import { UserAuth } from "@/lib/auth"
import { Button, Divider, Flex, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircleIcon } from '@chakra-ui/icons'

export default function KYR() {
    const { user } = UserAuth();
    const [ loading, setLoading ] = useState(false)
    const [ age, setAge ] = useState("");
    const [ gender, setGender ] = useState("");
    const [ state, setState ] = useState("");
    const [ city, setCity ] = useState("");
    const [ profession, setProfession ] = useState("");
    const [ rights, setRights ] = useState([]);

    function handleKYR() {
        setLoading(true)
        const endpoint = 'http://nyaysathi.replit.app/kyr';

        const requestData = {
            age: age,
            gender: gender,
            state: state,
            city: city,
            profession: profession
        };

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        }).then(responseData => {
            console.log(responseData);
            setRights(responseData.rights)
            setLoading(false)
        }).catch(error => {
            console.error('Error:', error.message);
        });
    }


    useEffect(() => {
        setAge(user?.age);
        setCity(user?.city);
        setGender(user?.gender);
        setProfession(user?.profession);
        setState(user?.state);
    }, [ user ]);

    return (
        <Flex gap="6" flexDirection={"column"} mb="4">
            {(age && gender && state && city && profession) ? (
                <Flex flexDirection={"column"} gap={4} padding={4} rounded={10} boxShadow={"lg"} bgGradient='linear(to-r,  yellow.50, pink.50, purple.50)' border='1px' borderColor='gray.100'>
                    {rights.length > 0 ? (<Text>
                        <List spacing={3}>
                            {rights.map((right, index) => (
                                <Flex key={index} gap="4" flexDir={"column"} justifyContent={"flex-start"}>
                                    <Flex gap="4" padding={{base: "0", lg: "1"}} justifyContent={"flex-start"} alignItems={{base: "flex-start", lg: "center"}}>
                                        <ListIcon as={CheckCircleIcon} color="green.500" boxSize={{base: "5", lg: "5"}} mt={{base: "2", lg: 0}} />
                                        <ListItem fontSize={{base: "md", lg:"lg"}}>
                                            {right}
                                        </ListItem>
                                    </Flex>
                                    <Divider />
                                </Flex>
                            ))}
                        </List>
                    </Text>) : (
                        <Flex flexDirection={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} gap="4">
                            <Text>Your rights are curated by using your profile data such as your age, gender, cisty and state you live in and your profession.</Text>
                            <Button colorScheme="yellow" size="md"  onClick={handleKYR} isLoading={loading}>
                                Know Your Rights
                            </Button>
                        </Flex>
                    )}
                </Flex>
            ) : (
                <Flex flexDirection={"column"} gap={4} padding={4} rounded={10} boxShadow={"lg"} bgGradient='linear(to-r,  yellow.50, pink.50, purple.50)' border='1px' borderColor='gray.100'>
                    <Text>Please update age, gender, state, city, profession in your profile to Know Your Rights</Text>
                    <Link href="/profile">
                        <Button colorScheme="yellow" size="sm">
                            Update Profile
                        </Button>
                    </Link>
                </Flex>
            )}
        </Flex>
    )
}