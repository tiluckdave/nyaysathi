import { useState } from 'react';
import { Flex, Box, Heading, Text, Stack, Input, Button } from '@chakra-ui/react';

export default function Chat() {
    const [ userInput, setUserInput ] = useState('');
    const [ apiOutput, setApiOutput ] = useState('')
    const [ isGenerating, setIsGenerating ] = useState(false)

    const callGenerateEndpoint = async () => {
        setIsGenerating(true);

        console.log("Calling OpenAI...")
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userInput }),
        });

        const data = await response.json();
        const { output } = data;
        console.log("OpenAI replied...", output.text)

        setApiOutput(`${output.text}`);
        setIsGenerating(false);
    }

    const onUserChangedText = (event) => {
        console.log(event.target.value);
        setUserInput(event.target.value);
    };

    return (
        <Flex flexDirection="column" maxHeight={'100vh'} bg={'#f5f5f5'}>

            <Heading size="2xl" my={4} fontWeight="bold" textAlign="center">
      Nyay Sathi
    </Heading>
        <Flex
        bg={'white'}
            flexDirection="column"
            justifyContent="end"
            alignItems="center"
            height="100vh"
            px={2}
        >
            <Box
                mt={6}
                backgroundColor="#e5e5e5"
                width={'full'}
                maxWidth={600}
                borderRadius={5}
                p={5}
            >
                {isGenerating && <Text fontStyle="italic">NyaySathi is Thinking...</Text>}
                {!isGenerating && apiOutput.length > 0 && <>
                    <Text fontWeight="bold">NyaySathi</Text>
                    <Text>
                        {apiOutput}
                    </Text>
                </>}
                {!isGenerating && apiOutput.length == 0 && <>
                    <Text fontWeight="bold">NyaySathi</Text>
                    <Text>
                        Hi, I am NyaySathi. I can help you with your legal queries. Ask me anything. I can talk in English, Hindi and Marathi.
                    </Text>
                </>}
            </Box>
            <Stack spacing={2} mt={4} mb={4} justifyContent="center" isInline width={'full'} maxWidth={600}>
                <Input
                    placeholder="Enter your query"
                    value={userInput}
                    onChange={onUserChangedText}
                    />
                <Button variant="solid" size="md" colorScheme="yellow"
                    onClick={callGenerateEndpoint}
                    >
                    Ask
                </Button>
            </Stack>
        </Flex>
                    </Flex>
    );
}