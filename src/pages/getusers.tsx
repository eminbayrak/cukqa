import React, { useState } from 'react';
// import axios from 'axios';
import {
    Button,
    Heading,
    Box,
    Center,
    Avatar,
    Text,
    Stack,
    HStack,
    VStack,
    Badge,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import BackButton from '../components/BackButton';
import TopNavBar from '../layouts/TopNavBar';

const api_url = process.env.REACT_APP_API_URL;

function GetUsers() {
    const toast = useToast();
    function Toast() {
        return (
            toast({
                title: 'Success.',
                description: "We've got all of the users from MongoDB.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        )
    }
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        // const response = await axios.get(`${api_url}/users`)
        // setUsers(response.data);
        // if (response.status === 200) {
        //     Toast();
        // }
    }
    return (
        <>
            <TopNavBar />
            <Heading mt={10} textAlign="center">Get Example</Heading>
            <Center paddingTop="10">
                <Box
                    minW='100'
                    padding={5}
                    borderRadius='lg'
                    borderWidth='1px'
                    overflow='hidden'
                    role={'group'}
                    p={6}
                    maxW={'600px'}
                    w={'full'}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}
                    mb={3}
                >
                    <BackButton />
                    <Text mt={10} mb={5} fontSize='4xl'>Get all users (from MongoDB)</Text>
                    <br />
                    <Button
                        mb={4}
                        // rounded={'full'}
                        // size={'lg'}
                        fontWeight={'normal'}
                        px={6}
                        colorScheme='purple'
                        boxShadow={
                            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                        }
                        onClick={getUsers}
                    >
                        Get
                    </Button>
                    {users.map((user: any) =>
                        <div key={user._id}>
                            <Box
                                minW='100'
                                borderWidth='1px'
                                padding={5}
                                borderRadius='lg'
                                overflow='hidden'
                                mb={3}
                                maxW="sm"
                                rounded="lg"
                                shadow="lg"
                            >
                                <HStack>
                                    <Avatar
                                        size={'lg'}
                                        src={`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 100)}`}
                                    />
                                    <VStack
                                        display={{ base: 'none', md: 'flex' }}
                                        alignItems="flex-start"
                                        spacing="1px"
                                        ml="2">
                                        <Text fontSize="lg">{`${user.firstname} ${user.lastname}`}</Text>
                                        <Text fontSize="sm" color="gray.500">{`${user.email}`}</Text>
                                        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                                            <Badge
                                                px={2}
                                                py={1}
                                                fontWeight={'400'}>
                                                #art
                                            </Badge>
                                            <Badge
                                                px={2}
                                                py={1}
                                                fontWeight={'400'}>
                                                #photography
                                            </Badge>
                                            <Badge
                                                px={2}
                                                py={1}
                                                fontWeight={'400'}>
                                                #music
                                            </Badge>
                                        </Stack>
                                    </VStack>
                                </HStack>
                            </Box>
                        </div>
                    )}
                </Box>
            </Center>
        </>
    )
}

export default GetUsers;