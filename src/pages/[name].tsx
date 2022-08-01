import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { trpc } from "../utils/trpc";
import Footer from '../components/Footer';
import PreviewCard from '../components/PreviewCard';
import QuestionCardSmall from '../components/QuestionCardSmall';
import TopNavBar from '../layouts/TopNavBar';
import {
    Box,
    Text,
    Container,
    Heading,
    SimpleGrid,
    Spinner,
    useDisclosure
} from '@chakra-ui/react';

const CategoryQuestions = () => {
    const router = useRouter();
    const { data, isLoading } = trpc.useQuery(["question.getQuestionsByCategory", { categoryName: router.query.name as string }]);
    const [selectedPost, setSelectedPost] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const view = (question: any) => {
        setSelectedPost(question);
        onOpen();
    };
    return (
        <>
            {isLoading ? <div className="flex items-center justify-center h-screen"><Spinner /></div> :
                <Box minHeight="100vh" display="flex" flexDir="column">
                    <TopNavBar />
                    <Container maxW="4xl" mt="95px" flex={1}>
                        <Box textAlign="center">
                            <Heading as="h1" size="4xl">
                                <Text as={'span'} color={'#DB1C70'}>
                                    {router.query.name + " "}
                                </Text>
                                Questions
                            </Heading>
                            <Text fontSize="lg" fontWeight="semibold" mt={2}>
                                Tending questions are waiting for your answers!
                            </Text>
                        </Box>
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} mt={6}>
                            {data?.map((question: any) =>
                                <QuestionCardSmall
                                    key={question.title}
                                    onImageClick={view}
                                    question={question}
                                    title={question.title}
                                    subtitle={question.content}
                                    name={question.author.name}
                                    avatarImg={question.author.image}
                                    img={question.imageUrl}
                                    createdAt={`${question.createdAt.toLocaleString("en-US", { month: "short" })} ${question.createdAt.getDate()}, ${question.createdAt.getFullYear()}`}
                                />
                            )}
                        </SimpleGrid>
                    </Container>
                    {selectedPost && <PreviewCard isOpen={isOpen} onClose={onClose} question={selectedPost} />}
                    <Footer />
                </Box>
            }
        </>
    )
}

export default CategoryQuestions