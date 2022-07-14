// import 'react-responsive-carousel/lib/styles/carousel.min.css';

import {
    Avatar,
    Box,
    Button,
    Heading,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Stack,
    Text,
    useBreakpointValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function PreviewImage(props: any) {

    const MotionImg = motion(Button);
    const route = useRouter();
    const size = useBreakpointValue({ base: 'sm', md: 'sm' });
    const IMAGE = 'https://random.imagecdn.app/445/320';
    return (
        <Modal
            isOpen={props.isOpen}
            onClose={props.onClose}
            size={size}
            isCentered
            motionPreset="slideInBottom"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalBody>
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
                            alt={props.question.title}
                            objectFit={'cover'}
                            src={IMAGE}
                        />
                    </Box>
                    <Stack spacing={4}>
                        <Heading
                            lineHeight={1.1}
                            fontSize={{ base: '1xl', sm: '2xl', md: '3xl' }}
                        >
                            {props.question.title}
                            <Text
                                as={'span'}
                                bgGradient="linear(to-r, red.400,pink.400)"
                                bgClip="text"
                            >
                                ?
                            </Text>
                        </Heading>
                        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                            {props.question.content}
                        </Text>
                    </Stack>
                    <Box as={'form'} mt={10}>
                        <Stack mt={8} direction={'row'} spacing={4}>
                            <MotionImg
                                flex={1}
                                transition={{ type: "spring", stiffness: 100 }}
                                whileHover={{ scale: 1.1 }}
                                mr={2}
                            >
                                Yes
                            </MotionImg>
                            <MotionImg
                                flex={1}
                                transition={{ type: "spring", stiffness: 100 }}
                                whileHover={{ scale: 1.1 }}
                                mr={2}
                            >
                                No
                            </MotionImg>
                        </Stack>
                    </Box>
                    <Stack mt={8} direction={'row'} spacing={4} align={'center'}>
                        <Avatar
                            src={props.question.author.image ?? 'https://1.bp.blogspot.com/-ssJSWVoznXM/Xl1mCmu921I/AAAAAAAAnp0/eCbQVoaBfKcZaSBL2UJ5tvNMzmSpBwXtwCLcBGAsYHQ/s2560/anonymous_background-wallpaper-120x120.jpg'}
                        />
                        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                            <Text fontWeight={600}>{props.question.author.name ?? 'Anonymous'}</Text>
                            <Text color={'gray.500'}>{props.question.createdAt.toLocaleString()}</Text>
                        </Stack>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}