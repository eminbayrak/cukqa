import { useEffect, useState, useMemo } from 'react';
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
    useBreakpointValue,
    useToast,
    useDisclosure,
    HStack,
    Divider
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { BsFillHandThumbsUpFill, BsFillHandThumbsDownFill } from 'react-icons/bs';
import { useSession } from 'next-auth/react';
import { trpc } from "../utils/trpc";

export default function PreviewImage(props: any) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: session } = useSession();
    const mutation = trpc.useMutation('like.addLike');
    const { data, refetch } = trpc.useQuery(["like.getAllLikesById", { questionId: props.question.id }]);
    const toast = useToast();
    const MotionBtn = motion(Button);
    const size = useBreakpointValue({ base: 'sm', md: 'sm' });
    const IMAGE = 'https://random.imagecdn.app/445/320';
    const [yes, setYes] = useState(0);
    const [no, setNo] = useState(0);
    const [canVote, setCanVote] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    function Toast() {
        return (
            toast({
                title: 'Thank you... 🎉',
                description: "We appreciate your answer!",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        )
    }
    async function handleYesButtonClick() {
        const likeData = ({
            email: session?.user?.email!,
            questionId: props.question.id,
            like: true
        });
        const response = mutation.mutateAsync(likeData);
        if ((await response).success) {
            Toast();
            onClose();
            refetch();
        }
    }
    async function handleNoButtonClick() {
        const likeData = ({
            email: session?.user?.email!,
            questionId: props.question.id,
            like: false
        });
        const response = await mutation.mutateAsync(likeData);
        if ((await response).success) {
            Toast();
            onClose();
            refetch();
        }
    }

    useEffect(() => {
        let yesCount = 0;
        let noCount = 0;
        setCanVote(true);
        setIsLoggedIn(false);
        data?.map((obj: any) => {
            obj.like ? yesCount++ : noCount++;
            if (obj.email === session?.user?.email) {
                setCanVote(false)
            }
        });
        setYes(yesCount);
        setNo(noCount);
        session?.user?.email && setIsLoggedIn(true);
    }, [data, session?.user?.email]);

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
                            src={props.question.imageUrl ?? IMAGE}
                        />
                        <Box
                            position="absolute"
                            top={2}
                            right={2}
                            borderRadius={3}
                            bgGradient="linear(to-r, red.400,pink.400)"
                        >
                            <Button
                                bg={'transparent'}
                                _hover={{ backGround: 'transparent' }}
                                leftIcon={<BsFillHandThumbsUpFill />}
                            >
                                {yes}
                            </Button>
                            <Button
                                bg={'transparent'}
                                _hover={{ backGround: 'transparent' }}
                                leftIcon={<BsFillHandThumbsDownFill />}
                            >
                                {no}
                            </Button>
                        </Box>

                    </Box>
                    <Stack spacing={4}>
                        <Heading
                            lineHeight={1.1}
                            fontSize={{ base: '1xl', sm: '2xl', md: '3xl' }}
                        >
                            {
                                props.question.title.charAt(props.question.title.length - 1) == "?"
                                    ? props.question.title.slice(0, props.question.title.length - 1)
                                    : props.question.title
                            }
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
                        {!isLoggedIn ?
                            <HStack>
                                <Text>You need to login to be able to answer this question...</Text>
                                <Image src="https://cdn3.emoji.gg/emojis/1510-tsumikiwow.png" width="32px" height="32px" alt="kappa" />
                            </HStack>
                            : canVote ?
                                <Stack mt={8} direction={'row'} spacing={4}>
                                    <MotionBtn
                                        flex={1}
                                        transition={{ type: "spring", stiffness: 100 }}
                                        whileHover={{ scale: 1.1 }}
                                        mr={2}
                                        leftIcon={<BsFillHandThumbsUpFill />}
                                        onClick={handleYesButtonClick}
                                    >
                                        Yes
                                    </MotionBtn>
                                    <MotionBtn
                                        flex={1}
                                        transition={{ type: "spring", stiffness: 100 }}
                                        whileHover={{ scale: 1.1 }}
                                        mr={2}
                                        leftIcon={<BsFillHandThumbsDownFill />}
                                        onClick={handleNoButtonClick}
                                    >
                                        No
                                    </MotionBtn>
                                </Stack> :
                                <HStack>
                                    <Text>You already answered this question...</Text>
                                    <Image src="https://cdn3.emoji.gg/emojis/6981-kappawink.gif" width="32px" height="32px" alt="kappa" />
                                </HStack>
                        }

                    </Box>
                    <Divider mt={8} />
                    <Stack mt={4} direction={'row'} spacing={4} align={'center'}>
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