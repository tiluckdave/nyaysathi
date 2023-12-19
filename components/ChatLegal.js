import { Box, Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";

export default function ChatLegal() {
    const messagesEndRef = useRef(null)
    const [ loading, setLoading ] = useState(false)
    const [ userInput, setUserInput ] = useState(null)
    const [ act, setAct ] = useState(null)
    const [ messages, setMessages ] = useState([ "Hi, I am NyaySathi. I can help you with your legal queries. Ask me anything. I can talk in English and Hindi." ])

    const addMessage = () => {
        setMessages([ ...messages, userInput, "NyaySathi is Thinking..." ])
        setUserInput("")
        setLoading(true)
        // const base = 'https://nyaysathi.replit.app/';
        const base = 'http://localhost:5000/chatask'
        if (messages.length === 1) {
            const endpoint = base + 'ask';
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
                setAct(responseData.act)
                setMessages([ ...messages, userInput, responseData.answer ])
                setLoading(false)
            }).catch(error => {
                console.error('Error:', error.message);
            });
        }
        else {
            const endpoint = base + 'chat';
            const requestData = {
                act: act,
                question: userInput,
                context: messages[ messages.length - 2 ]
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
                setMessages([ ...messages, userInput, responseData.answer ])
                setLoading(false)
            }).catch(error => {
                console.error('Error:', error.message);
            });
        }
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [ messages ]);

    return (
        <Flex flexDirection={"column"} gap={3} paddingBottom={"65px"}>
            {messages.map((message, index) => {
                if (index % 2 === 0) {
                    return (
                        <Box key={index} padding={3} rounded={10} maxWidth={{ base: "90%", lg: "65%" }} bgGradient='linear(to-r,  yellow.50, pink.50, purple.50)' boxShadow={"sm"} alignSelf={"flex-start"} border='1px' borderColor='gray.100'>
                            {message}
                        </Box>
                    )
                } else {
                    return (
                        <Box key={index} padding={3} rounded={10} bg='gray.100' maxWidth={{ base: "90%", lg: "65%" }} boxShadow={"sm"} alignSelf={"flex-end"}>
                            {message}
                        </Box>
                    )
                }
            })}

            <div ref={messagesEndRef} />

            <Flex flexDirection={"column"} gap={1} position={"fixed"} bottom={{ base: "60px", lg: 0 }} width={{ base: "calc(100% - 30px)", lg: "calc(100% - 312px)" }} marginLeft={{ base: "-10px", lg: "0" }} bg={"white"}>
                <Flex gap={2} flexDirection={"column"} position={"relative"} >
                    <Input placeholder="Type your query here" bg={"gray.50"} focusBorderColor='yellow.400' disabled={loading} paddingRight={12} value={userInput} rounded={"full"}
                        onChange={(e) => setUserInput(e.target.value)} />
                    <Button colorScheme='yellow' size={"sm"} rounded="full" position={"absolute"} bottom={1} right={1} isLoading={loading} zIndex={2} ><Icon as={IoSend} color={"gray.50"} onClick={addMessage} /></Button>
                </Flex>
                <Text fontSize={{ base: "2xs", lg: "sm" }} width={"100%"} textAlign={"center"} paddingBottom={{ base: 1, lg: 2 }}>NyaySathi can make mistakes. Consider checking important information.</Text>
            </Flex>
        </Flex>
    )
}