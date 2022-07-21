import React, { useState } from 'react'
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import {
    Button,
    Heading,
    FormControl,
    Input,
    Text,
    Box,
    Center,
    FormLabel,
    Stack,
    Select,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import BackButton from '../components/BackButton';
import TopNavBar from '../layouts/TopNavBar';
import { useRouter } from 'next/router';
import Categories from '../components/Categories';
import Footer from '../components/Footer';

interface Question {
    title: String,
    content: String,
    category: String,
    email: String
}

function AddQuestion(props: any) {
    const question = trpc.useMutation(["question.question"]);
    const route = useRouter();
    const toast = useToast();
    const { data: session } = useSession();
    const [category, setCategory] = useState('');
    const handleCategoryChange = (data: any) => {
        setCategory(data)
    }

    function Toast() {
        return (
            toast({
                title: 'Your question has added... 🎉',
                description: "Now sit back and let people answer it.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        )
    }
    const addQuestion = async (e: any) => {
        e.preventDefault();
        const data = {
            title: e.target[0].value,
            content: e.target[1].value,
            category: category,
            email: session?.user?.email || '' // Fix me
        }

        const response = await question.mutateAsync(data, {
            onError: (error) => {
                console.log(error);

            }
        });
        console.log(response)
        // if ((await response).success) {
        //     route.push('/dailyquestions');
        //     Toast();
        //     // Clear inputs after successful add
        //     // e.target[0].value = '';
        //     // e.target[1].value = '';
        // }
    }

    return (
        <>
            <TopNavBar />
            <Box textAlign="center">
                <Heading as="h1" pt={20} size="3xl">
                    <Text as={'span'} color={'#DB1C70'}>
                        Ask{' '}
                    </Text>
                    Your Question
                </Heading>
                <Text fontSize="lg" fontWeight="semibold" mt={2}>
                    and get a worldwide answer!
                </Text>
            </Box>
            <Center paddingTop="10">
                <Box
                    minW='100'
                    borderWidth='1px'
                    padding={5}
                    borderRadius='lg'
                    overflow='hidden'
                    mb={3}
                    maxW="lr"
                    rounded="lg"
                    shadow="lg"
                >
                    <BackButton />
                    <Text mt={10} color={'gray.400'} mb={5} fontSize={{ base: 'sm', sm: 'md' }}>Make sure that your question is clear and only has yes or no answer!</Text>
                    <form onSubmit={addQuestion}>
                        <Stack spacing={4}>
                            <FormControl id="title" isRequired>
                                <FormLabel htmlFor='title'>Title</FormLabel>
                                <Input type="text" autoFocus />
                            </FormControl>
                            <FormControl id="content" isRequired>
                                <FormLabel htmlFor='content'>Content</FormLabel>
                                <Input type="text" />
                            </FormControl>
                            <FormControl id="category" isRequired>
                                <FormLabel htmlFor='category'>Category</FormLabel>
                                {/* <Input type="text" /> */}
                                <Categories category={handleCategoryChange} />
                            </FormControl>
                            <FormControl>
                                <Button
                                    fontWeight={'normal'}
                                    px={6}
                                    mt={4}
                                    type='submit'
                                    bg={'#DB1C70'}
                                    color={'white'}
                                    _hover={{
                                        bg: '#B5175C',
                                    }}
                                    _focus={{
                                        bg: '#B5175C',
                                    }}
                                >
                                    Send
                                </Button>
                            </FormControl>
                        </ Stack>
                    </form>
                </Box>
            </Center>
            <Footer />
        </>
    )
}


export default AddQuestion;