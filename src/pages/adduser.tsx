import React from 'react'
// import axios from 'axios';
import {
    Button,
    Heading,
    FormControl,
    Input,
    Text,
    Box,
    Center,
    FormLabel,
    Stack
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react';
import BackButton from '../components/BackButton';
import TopNavBar from '../layouts/TopNavBar';

const api_url = process.env.REACT_APP_API_URL;

function AddUser() {
    const toast = useToast();
    function Toast() {
        return (
            toast({
                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        )
    }
    const createUser = async (e: any) => {
        e.preventDefault();
        const data: any = {
            firstname: e.target[0].value,
            lastname: e.target[1].value,
            email: e.target[2].value
        }
        // const response = await axios.post(`${api_url}/adduser`, data)
        // if (response.status === 200) {
        //     Toast();
        //     // Clear inputs after successful add
        //     e.target[0].value = '';
        //     e.target[1].value = '';
        //     e.target[2].value = '';
        // }
    }
    return (
        <>
            <TopNavBar />
            <Heading mt={5} textAlign="center">Post Example</Heading>
            <Center paddingTop="10">
                <Box
                    minW='100'
                    padding={5}
                    borderRadius='lg'
                    overflow='hidden'
                    role={'group'}
                    p={6}
                    maxW={'600px'}
                    w={'full'}
                    borderWidth='1px'
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}
                    mb={3}
                >
                    <BackButton />
                    <Text mt={10} mb={5} fontSize='4xl'>Add user (to MongoDB)</Text>
                    <form onSubmit={createUser}>
                        <Stack spacing={4}>
                            <FormControl id="first-name" isRequired>
                                <FormLabel htmlFor='first-name'>First Name</FormLabel>
                                <Input type="text" />
                            </FormControl>
                            <FormControl id="last-name" isRequired>
                                <FormLabel htmlFor='last-name'>Last Name</FormLabel>
                                <Input type="text" />
                            </FormControl>
                            <FormControl id="email" isRequired>
                                <FormLabel htmlFor='email'>Email Address</FormLabel>
                                <Input type="email" />
                            </FormControl>
                            <FormControl>
                                <Button
                                    fontWeight={'normal'}
                                    px={6}
                                    mt={4}
                                    type='submit'
                                    colorScheme='green'
                                    boxShadow={
                                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                                    }
                                    rightIcon={<AddIcon h={4} w={4} />}>
                                    Add
                                </Button>
                            </FormControl>
                        </ Stack>
                    </form>
                </Box>
            </Center>
        </>
    )
}

export default AddUser;