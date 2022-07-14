import React from 'react';
import { useRouter } from 'next/router';
import {
    Box,
    Stack,
    Heading,
    Text,
    Button,
    Image,
    Circle,
    Tooltip,
    IconButton,
    useColorModeValue,
    Avatar
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const QuestionCard: any = (props: any) => {
    const router = useRouter()
    const IMAGE = 'https://random.imagecdn.app/445/320';
    return (
        <Box
            maxW={'445px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            borderWidth='1px'
            boxShadow={'2xl'}
            rounded={'md'}
            p={6}
            overflow={'hidden'}
        >
            <Box
                bg={'gray.100'}
                mt={-6}
                mx={-6}
                mb={6}
                pos={'relative'}
            >
                <Image
                    height={230}
                    width={'100%'}
                    alt={'image'}
                    objectFit={'cover'}
                    src={IMAGE}
                />
            </Box>
            <Stack spacing={4}>
                <Box
                    rounded={'lg'}
                    pos={'relative'}
                >
                    <Tooltip
                        width='100%'
                        label='Post your own question'
                        placement='bottom'
                        rounded={'md'}
                        bg={'gray.600'}
                        color={'gray.200'}
                    >
                        <IconButton
                            position="absolute"
                            fontSize={'sm'}
                            rounded={'full'}
                            size={'lg'}
                            colorScheme='pink'
                            top={-50}
                            right={1}
                            aria-label='Post your own question'
                            boxShadow={
                                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                            }
                            bgGradient="linear(to-r, red.400,pink.400)"
                            icon={<AddIcon />}
                            onClick={() => router.push('/addquestion')}
                        />
                    </Tooltip>
                </Box>
                <Heading
                    lineHeight={1.1}
                    fontSize={{ base: '1xl', sm: '2xl', md: '3xl' }}
                >
                    {props.title}
                    <Text
                        as={'span'}
                        bgGradient="linear(to-r, red.400,pink.400)"
                        bgClip="text"
                    >
                        ?
                    </Text>
                </Heading>
                <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                    {props.subtitle}
                </Text>
            </Stack>
            <Box as={'form'} mt={10}>
                <Stack mt={8} direction={'row'} spacing={4}>
                    <Button
                        flex={1}
                        fontSize={'sm'}
                        bg={'green.400'}
                        _hover={{
                            bg: 'green.500',
                        }}
                        _focus={{
                            bg: 'green.500',
                        }}
                        color={'white'}
                        bgGradient="linear(to-l, #5D9878,green.400)"
                        boxShadow={
                            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                        }
                    >
                        Yes
                    </Button>
                    <Button
                        flex={1}
                        fontSize={'sm'}
                        bg={'red.400'}
                        _hover={{
                            bg: 'red.500',
                        }}
                        _focus={{
                            bg: 'red.500',
                        }}
                        color={'white'}
                        boxShadow={
                            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                        }
                    >
                        No
                    </Button>
                </Stack>
            </Box>
            <Stack mt={8} direction={'row'} spacing={4} align={'center'}>
                <Avatar
                    src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
                />
                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                    <Text fontWeight={600}>Achim Rolle</Text>
                    <Text color={'gray.500'}>Feb 08, 2021 · 1min read</Text>
                </Stack>
            </Stack>
        </Box>
    )
}

export default QuestionCard