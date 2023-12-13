import { Button, Flex, Icon, Text, Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { RiAiGenerate } from "react-icons/ri";

export default function AskQuery() {
    const [ loading, setLoading ] = useState(false)
    const [ userInput, setUserInput ] = useState(null)
    const [ apiOutput, setApiOutput ] = useState(null)

    const askSathi = () => {
        setLoading(true)
        const endpoint = 'https://nyaysathi.replit.app/ask';
        const requestData = {
            question: userInput
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
            setApiOutput(responseData.answer)
            setLoading(false)
        }).catch(error => {
            console.error('Error:', error.message);
        });
    }


    return (
        <Flex flexDirection={"column"} gap={6}>
            <Flex gap={2} position={"relative"} >
                <Textarea placeholder='Ask your legal queries...' bg={"gray.50"} rows={3} resize="none" focusBorderColor='yellow.400' disabled={loading} paddingRight={12} value={userInput}
                    onChange={(e) => setUserInput(e.target.value)} />
                <Button colorScheme='yellow' size={{ base: "sm", lg: "md" }} rounded="full" position={"absolute"} bottom={{ base: 2, lg: 3 }} right={{ base: 2, lg: 3 }} isLoading={loading} zIndex={2} onClick={askSathi}><Icon as={IoSend} color={"gray.50"} /></Button>
            </Flex>

            <Flex flexDirection={"column"} gap={2} padding={6} rounded={10} boxShadow={"lg"} bgGradient='linear(to-r, yellow.100, pink.100, purple.100)'>
                {!loading && !apiOutput && <Text>Hi, I am NyaySathi. I can help you with your legal queries. Ask me anything. I can talk in English and Hindi.</Text>}
                {loading && <Text fontStyle={"italic"} fontWeight={"bold"}>NyaySathi is Thinking...</Text>}
                {!loading && apiOutput && <Flex flexDirection={"column"}>
                    <Text fontWeight={"bold"}>NyaySathi</Text>
                    <Text>{apiOutput}</Text>
                </Flex>}
            </Flex>

        </Flex>
    )
}