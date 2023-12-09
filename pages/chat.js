import { useState } from 'react';
import { Flex, Box, Heading, Text, Stack, Input, Button } from '@chakra-ui/react';

export default function Chat() {
    const [ userInput, setUserInput ] = useState('');
    const [ apiOutput, setApiOutput ] = useState('')
    const [ isGenerating, setIsGenerating ] = useState(false)

    const callGenerateEndpoint = () => {
        setIsGenerating(true)
        const endpoint = 'https://nyaysathi.replit.app/ask'; // Replace with your actual endpoint URL
        const requestData = {
          question: userInput
        };
      
        return fetch(endpoint, {
          method: 'POST', // or 'GET' depending on your API
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers if required
          },
          body: JSON.stringify(requestData),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
          })
          .then(responseData => {
            // Process the responseData as needed
            console.log(responseData);
            setApiOutput(responseData.answer)
            setIsGenerating(false)
          })
          .catch(error => { 
            console.error('Error:', error.message);
            // Handle the error
          });
          
      };
      

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