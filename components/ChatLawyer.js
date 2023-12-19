import { Box, Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { findChatByUserId, createChat, addMessage } from "@/lib/db";
import { UserAuth } from "@/lib/auth";

export default function ChatLawyer() {
    const { user } = UserAuth();
    const messagesEndRef = useRef(null)
    const [ loading, setLoading ] = useState(false)
    const [ userInput, setUserInput ] = useState(null)
    const [ chatId, setChatId ] = useState(null)
    const [ messages, setMessages ] = useState([ "Ask your query, this will be shown to lawyers and anyone can answer your question." ])

    const addStateMessage = async () => {
        setMessages([ ...messages, userInput, "Active lawyers will get back to you as soon as possible." ])
        setUserInput("")
        setLoading(true)
        console.log(chatId)
        // if (chatId) {
        //     await addMessage(chatId, userInput)
        // }
        addMessage(chatId, userInput)
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [ messages ]);

    useEffect(() => {
        const fetchData = async () => {
            if (user?.uid) {
                const chat = await findChatByUserId(user?.uid)
                if (chat) {
                    // console.log(chat)
                    setChatId(chat.id)
                    setMessages(chat.messages)
                    if (chat.messages.length % 2 === 1) {
                        setLoading(false)
                    } else {
                        setLoading(true)
                    }
                } else {
                    const newChat = await createChat(user.uid, messages)
                    setChatId(newChat)
                }
            }
        }
        fetchData()
    }, [ messages, user ])

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
                <Flex gap={2} flexDirection={"column"} position={"relative"} paddingBottom={{ base: 1, lg: 2 }}>
                    <Input placeholder="Type your query here" bg={"gray.50"} focusBorderColor='yellow.400' disabled={loading} paddingRight={12} value={userInput} rounded={"full"}
                        onChange={(e) => setUserInput(e.target.value)} />
                    <Button colorScheme='yellow' size={"sm"} rounded="full" position={"absolute"} bottom={{ base: 2, lg: 3 }} right={1} isLoading={loading} zIndex={2} ><Icon as={IoSend} color={"gray.50"} onClick={addStateMessage} /></Button>
                </Flex>
            </Flex>
        </Flex>
    )
}