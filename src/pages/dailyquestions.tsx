import React, { useState } from 'react';
import TopNavBar from '../layouts/TopNavBar';
import {
    Heading,
    Spinner,
    Text,
    SimpleGrid,
    Box,
    Container,
    Link,
    useDisclosure
} from '@chakra-ui/react';
import { trpc } from "../utils/trpc";
import QuestionCardSmall from '../components/QuestionCardSmall';
import PreviewCard from '../components/PreviewCard';

export default function DailyQuestions() {
    const { data, isLoading, isError } = trpc.useQuery(["question.getAllQuestions"]);
    const [selectedPost, setSelectedPost] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const view = (question: any) => {
        setSelectedPost(question);
        onOpen();
    };
    const IMAGE = 'https://random.imagecdn.app/445/320';

    return (
        <Box minHeight="100vh" display="flex" flexDir="column">
            <TopNavBar />
            <Container maxW="4xl" mt="95px" flex={1}>
                <Box textAlign="center">
                    <Heading as="h1" size="4xl">
                        <Text as={'span'} color={'#DB1C70'}>
                            Hot{' '}
                        </Text>
                        Questions
                    </Heading>
                    <Text fontSize="lg" fontWeight="semibold" mt={2}>
                        Tending questions are waiting for your answers!
                    </Text>
                </Box>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} mt={6}>
                    {data?.map((question: any) =>
                        isLoading
                            ? <Spinner />
                            : <QuestionCardSmall
                                key={question.title}
                                onImageClick={view}
                                question={question}
                                title={question.title}
                                subtitle={question.content}
                                name={question.author.name}
                                avatarImg={question.author.image}
                                img={IMAGE}
                                createdAt={`${question.createdAt.toLocaleString("en-US", { month: "short" })} ${question.createdAt.getDate()}, ${question.createdAt.getFullYear()}`}
                            />
                    )}
                </SimpleGrid>
            </Container>
            {selectedPost && <PreviewCard isOpen={isOpen} onClose={onClose} question={selectedPost} />}
            <Container as="footer" maxW="xl" textAlign="center" py={10}>
                <Text>
                    Made with{' '}
                    <span role="img" aria-label="heart emoji">
                        ❤️
                    </span>{' '}
                    by{' '}
                    <Link href="https://github.com/eminbayrak/" isExternal>
                        {'Emin Bayrak'}
                    </Link>
                </Text>
                <Text>{(new Date()).getUTCFullYear()}</Text>
            </Container>
        </Box>
    );
}
