import { Button, Flex, Icon, Text, Textarea } from '@chakra-ui/react'
import Link from 'next/link';
import { useState,useEffect } from 'react'
import { IoSend } from "react-icons/io5";
import { UserAuth } from '@/lib/auth';
import { getLawyer } from '@/lib/db';

export default function AskQuery() {
    const { user } = UserAuth();
    const [ loading, setLoading ] = useState(false)
    const [ userInput, setUserInput ] = useState(null)
    const [ apiOutput, setApiOutput ] = useState(null)
    const [specs, setSpecs] = useState([]);
    const [lawyers, setLawyers] = useState([]);
    const [ idk, setIdk ] = useState(false)

    const askSathi = async () => {
        try {
          setIdk(false);
          setLoading(true);
          const endpoint = 'https://nyaysathi.replit.app/ask';
          const requestData = {
            question: userInput,
          };
      
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
      
          const responseData = await response.json();
          console.log(responseData);
      
          if (responseData.answer.includes("I am not sure about this")) {
            setIdk(true);
          }
      
          setApiOutput(responseData.answer);
          setSpecs(responseData.specs);
          setLoading(false);
        } catch (error) {
          console.error('Error:', error.message);
        }
      };
      
      useEffect(() => {
        console.log("Specs:", specs);
        console.log(user);
        console.log("State:", user.state);
        console.log("City:", user.city);
        const fetchData = async () => {
          try {
            const resultLawyers = await getLawyer(specs, user.state, user.city);
            setLawyers(resultLawyers);
            console.log("Lawyers:", resultLawyers);
          } catch (error) {
            console.error("Error fetching lawyers:", error.message);
          }
        };
    
        fetchData();
      }, [specs]);
      
      


    return (
        <Flex flexDirection={"column"} gap={6}>
            <Flex gap={2} position={"relative"} >
                <Textarea placeholder='Ask your legal queries...' bg={"gray.50"} rows={3} resize="none" focusBorderColor='yellow.400' disabled={loading} paddingRight={12} value={userInput}
                    onChange={(e) => setUserInput(e.target.value)} />
                <Button colorScheme='yellow' size={{ base: "sm", lg: "md" }} rounded="full" position={"absolute"} bottom={{ base: 2, lg: 3 }} right={{ base: 2, lg: 3 }} isLoading={loading} zIndex={2} onClick={askSathi}><Icon as={IoSend} color={"gray.50"} /></Button>
            </Flex>

            <Flex flexDirection={"column"} gap={2} padding={6} rounded={10} boxShadow={"lg"} bgGradient='linear(to-r,  yellow.50, pink.50, purple.50)' border='1px' borderColor='gray.100'>
                {!loading && !apiOutput && <Text>Hi, I am NyaySathi. I can help you with your legal queries. Ask me anything. I can talk in English and Hindi.</Text>}
                {loading && <Text fontStyle={"italic"} fontWeight={"bold"}>NyaySathi is Thinking...</Text>}
                {!loading && apiOutput && <Flex flexDirection={"column"}>
                    <Text fontWeight={"bold"}>NyaySathi</Text>
                    {!idk && <Text>{apiOutput}</Text>}
                    <Text mt={10} fontWeight={"bold"}>In case you need lawyers here are some we recommed based on your case:</Text>
                    {!idk && lawyers.map((lawyer, index) => (
                        <Text key={index}>
                            Name: {lawyer.name}, Email: {lawyer.email}.
                        </Text>
                    ))}
                    {idk && <Flex flexDir={"column"} gap="4">
                        <Text>I am still learning and very sorry to say but I do not have proper knowledge to answer your question. Just to be extra sure can you recheck your question.</Text>
                        <Text>I have a link to the source where you might find information relevant with your query.</Text>
                        <Link href="https://www.indiankanoon.org/" passHref={true}><Button as="a" colorScheme='yellow' size={{ base: "sm", lg: "md" }} rounded="lg" >Indian Kanoon</Button></Link>
                    </Flex>}
                </Flex>}
            </Flex>

        </Flex>
    )
}