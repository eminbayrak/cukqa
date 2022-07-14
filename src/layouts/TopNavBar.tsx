import { ReactNode, useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import {
    Box,
    Text,
    Link,
    Button,
    Modal,
    useDisclosure,
    useColorModeValue,
    useColorMode,
    Container,
    ModalOverlay,
    ModalHeader,
    ModalBody,
    ModalContent,
    ModalFooter,
    Show,
    Hide,
    Avatar,
    Flex,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Stack,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger
} from '@chakra-ui/react';
import { AddIcon, CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import LoginButton from '../components/LoginButton';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export const LoggedIn = (props: any) => {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Uh Oh! You haven't signed in!</ModalHeader>
                <ModalBody>
                    <Text>To be able to register your question, we need to know who you are.</Text>
                </ModalBody>
                <ModalFooter>
                    <LoginButton />
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}



export default function TopNavBar() {
    const route = useRouter();
    const { data: session } = useSession();
    const { colorMode, toggleColorMode } = useColorMode();
    const [components, setComponents] = useState(false);
    const MotionImg = motion(Button);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const bgColor = useColorModeValue('white', 'gray.800');
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const checkLogin = () => {
        session ? route.push('/addquestion') : setComponents(true)
    }

    return (
        <Box position="fixed" w="100%" zIndex={1} backgroundColor={bgColor}>
            <Container
                maxW="5xl"
                py={3}
                display="flex"
                justifyContent="space-between"
                alignItems="center">
                <Box
                    fontSize="xl"
                    onClick={scrollToTop}
                    borderWidth='2px'
                    cursor="pointer"
                    padding={1}
                    borderRadius={'xl'}
                    borderColor='#DB1C70'
                >
                    CUKQA
                </Box>
                <HStack
                    as={'nav'}
                    display={{ base: 'none', md: 'flex' }}>
                    <Box>
                        <MotionImg
                            transition={{ type: "spring", stiffness: 100 }}
                            whileHover={{ scale: 1.1 }}
                            mr={2}
                            bg={'ghost'}
                            onClick={checkLogin}
                        >
                            Add Question
                        </MotionImg>
                        {<LoggedIn isOpen={components} onClose={onClose} />}
                        <Button mr={5} onClick={toggleColorMode} background={'transparent'}>
                            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        </Button>
                        <LoginButton />
                    </Box>
                </HStack>
                <Popover>
                    <PopoverTrigger>
                        <IconButton
                            size={'md'}
                            icon={<HamburgerIcon />}
                            aria-label={'Open Menu'}
                            display={{ md: 'none' }}
                        />
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverBody>
                            <Stack>
                                <LoginButton />
                                <Button mr={5} onClick={checkLogin} background={'transparent'}>
                                    Add Question
                                </Button>
                                {<LoggedIn isOpen={components} onClose={onClose} />}
                                <Button mr={5} onClick={toggleColorMode} background={'transparent'}>
                                    {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
                                </Button>
                            </Stack>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Container>
        </Box>
    );
}