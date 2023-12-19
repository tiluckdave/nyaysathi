import DashBoardWrapper from "@/components/DashBoardWrapper";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { SimpleGrid, Image, Heading, Text, Link, VStack, Card, CardBody, Stack, Divider, CardFooter, ButtonGroup, Button, Flex } from '@chakra-ui/react';


export default function News() {
    const [ news, setNews ] = useState([]);
    const [ page, setPage ] = useState(1);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(
                    'https://newsapi.org/v2/everything', // Replace with the actual News API endpoint
                    {
                        params: {
                            q: 'court',
                            sources: 'google-news-in,the-hindu,the-times-of-india',
                            language: 'en',
                            sortBy: 'relevancy',
                            page: page,
                            pageSize: 21,
                            apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY, // Replace with your News API key
                        },
                    }
                );
                setNews(response.data.articles);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        // scroll  to id #heading
        const element = document.getElementById("heading");
        element.scrollIntoView({ behavior: "smooth" });

        fetchNews();
        // function fetchData() {
        //     axios.get(`https://cors-anywhere.herokuapp.com/https://gnews.io/api/v4/search/?q=court&sources=google-news-in,the-hindu,the-times-of-india&language=en&country=in&sortBy=relevance&page=${page}&apikey=5df47c351514a303ef0b60e7516f9bf6`)
        //         .then((response) => {
        //             setNews(response.data.articles);
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // }

        // fetchData();
    }, [ page ]);


    return (
        <DashBoardWrapper page="news">
            <Heading fontSize="3xl" id="heading">News & updates</Heading>
            <VStack spacing={8} align="stretch" mt="6">
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                    {news.map((article) => (
                        <Card key={article.title} maxW='sm'>
                            <CardBody>
                                <Image
                                    src={article.urlToImage}
                                    alt={article.title}
                                    borderRadius='lg'
                                />
                                <Stack mt='6' spacing='3'>
                                    <Heading size='md'>{article.title}</Heading>
                                    <Text>
                                        {article.description}
                                    </Text>
                                </Stack>
                            </CardBody>
                            <Divider />
                            <CardFooter>
                                <Link href={article.url} isExternal>
                                    <ButtonGroup spacing='2'>
                                        <Button variant='solid' colorScheme='yellow'>
                                            Read More
                                        </Button>
                                    </ButtonGroup>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </SimpleGrid>
            </VStack>

            <Flex justifyContent="center" alignItems="center" mt={6}>
                <Button colorScheme="yellow" onClick={() => setPage(page + 1)}>Load More</Button>
            </Flex>
        </DashBoardWrapper>
    )
}