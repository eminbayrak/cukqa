import { useState } from 'react';
import { useSession } from "next-auth/react";
import {
    Box,
    Text,
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
    HStack,
    IconButton,
    Stack,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger
} from '@chakra-ui/react';
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import LoginButton from '../components/LoginButton';
import { useRouter } from 'next/router';
import DrawerBar from '../components/Drawer';

export const LoggedIn = (props: any) => {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{`Uh Oh! You haven't signed in!`}</ModalHeader>
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
                maxW="6xl"
                py={3}
                display="flex"
                justifyContent="space-between"
                alignItems="center">
                <HStack>
                    <Text
                        fontSize="xl"
                        onClick={scrollToTop}
                        borderWidth='2px'
                        cursor="pointer"
                        padding={1}
                        borderRadius={'xl'}
                        borderColor='#DB1C70'
                    >
                        CUKQA
                    </Text>
                    <DrawerBar />
                </HStack>
                <HStack
                    as={'nav'}
                    display={{ base: 'none', md: 'flex' }}>
                    <Box>
                        <Button
                            mr={2}
                            bg={'ghost'}
                            onClick={checkLogin}
                        >
                            Add Question
                        </Button>
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