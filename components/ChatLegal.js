import { Box, Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { IoSend } from "react-icons/io5";

export default function ChatLegal() {
    const [ loading, setLoading ] = useState(false)
    const [ userInput, setUserInput ] = useState(null)
    const [ userMessages, setUserMessages ] = useState(["Hello", "I am A good User", "Love You"])

    const addUserMessage = () => {
        setUserMessages([...userMessages, userInput])
    }

    return (
        <Flex flexDirection={"column"}>
            <Flex flexDirection={"column"} gap={1} position={"fixed"} bottom={{base: 16, lg: 4}} width={{base: "calc(100% - 40px)", lg: "calc(100% - 322px)"}} marginLeft={{base: "-10px", lg: "0"}}>
                <Flex gap={2} flexDirection={"column"} position={"relative"} >
                    <Input placeholder="Type your query here" bg={"gray.50"} focusBorderColor='yellow.400' disabled={loading} paddingRight={12} value={userInput} rounded={"full"}
                        onChange={(e) => setUserInput(e.target.value)} />
                    <Button colorScheme='yellow' size={"sm"} rounded="full" position={"absolute"} bottom={1} right={1} isLoading={loading} zIndex={2} ><Icon as={IoSend} color={"gray.50"} onClick={addUserMessage} /></Button>
                </Flex>
                <Text fontSize={{base: "2xs", lg:"sm"}} width={"100%"} textAlign={"center"}>NyaySathi can make mistakes. Consider checking important information.</Text>
            </Flex>
        </Flex>
    )
}