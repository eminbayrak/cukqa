import React, { useState, useMemo, useCallback } from 'react'
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
    useToast,
    Image,
    FormHelperText,
    FormErrorMessage
} from '@chakra-ui/react';
import BackButton from '../components/BackButton';
import TopNavBar from '../layouts/TopNavBar';
import { useRouter } from 'next/router';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Dropzone, { useDropzone } from 'react-dropzone';

interface Question {
    title: String,
    content: String,
    category: String,
    email: String
}

const AddQuestion: React.FC<Question> = (props: any) => {
    const question = trpc.useMutation(["question.question"]);
    const route = useRouter();
    const toast = useToast();
    const { data: session } = useSession();
    const [category, setCategory] = useState('');
    const handleCategoryChange = (data: any) => {
        setCategory(data)
    }
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState('');
    const [isImgUrl, setIsImgUrl] = useState<Boolean>(true);
    const handleImgUrlChange = (e: any) => setIsImgUrl(e.target.value.match(/\.(jpeg|jpg|gif|png)$/) != null);

    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderStyle: 'dashed',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    };

    const focusedStyle = {
        borderColor: '#2196f3'
    };

    const acceptStyle = {
        borderColor: '#00e676'
    };

    const rejectStyle = {
        borderColor: '#ff1744'
    };

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
            category: e.target[2].value,
            imageUrl: e.target[3].value,
            email: session?.user?.email || '',
        }
        const response = await question.mutateAsync(data);
        if ((await response).success) {
            route.push('/dailyquestions');
            Toast();
            // Clear inputs after successful add
            // e.target[0].value = '';
            // e.target[1].value = '';
        }
    }

    const onDrop = useCallback((acceptedFiles: any) => {
        setLoading(true);
        uploadImage(acceptedFiles[0])
            .then((json: any) => setImage(json.url))
            .finally(() => setLoading(false));
    }, []);

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({ onDrop, multiple: false, accept: { 'image/*': [] } });

    const style: any = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [baseStyle, isFocused, focusedStyle, isDragAccept, acceptStyle, isDragReject, rejectStyle]);

    const acceptedFileItems = acceptedFiles.map((file: any) => {
        return (<li key={file.path}>
            {file.path} - {file.size} bytes
        </li>);
    });

    const uploadImage = (image: any) => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'grmenu_photos');
        return fetch('https://cloudinary-react-dropzone.vercel.app/api/upload', {
            method: 'POST',
            body: formData,
        }).then((response: any) => {
            console.log(response)
            return response.json()
        })
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
                    {/* <BackButton /> */}
                    <Text color={'gray.400'} mb={5} fontSize={{ base: 'sm', sm: 'md' }}>Make sure that your question is clear and only has yes or no answer!</Text>
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
                                <Categories category={handleCategoryChange} />
                            </FormControl>
                            {/* <FormControl id="uploadImg" isRequired>
                                <FormLabel htmlFor='uploadImg'>Image</FormLabel>
                                <div className="container">
                                    <div {...getRootProps({ style })}>
                                        <input {...getInputProps()} />
                                        {
                                            image ? (
                                                <Image src={image} alt={"Upload image"} />
                                            ) :
                                                loading ? (
                                                    <p>Preparing...</p>
                                                ) : (
                                                    <Text as='em'>{`Drag 'n' drop your image here, or click to select`}</Text>
                                                )
                                        }
                                    </div>
                                    <aside>
                                        <Text ml={4}>{acceptedFileItems}</Text>
                                    </aside>
                                </div>
                                <Input type="text" placeholder={'Enter URL of image'} />
                            </FormControl> */}
                            <FormControl isInvalid={!isImgUrl} isRequired>
                                <FormLabel>Image URL</FormLabel>
                                <Input
                                    type='text'
                                    onBlur={handleImgUrlChange}
                                />
                                {isImgUrl ? (
                                    <FormHelperText>
                                        {''}
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>Please enter a correct image url</FormErrorMessage>
                                )}
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