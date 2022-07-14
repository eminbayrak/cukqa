import { useSession, signIn, signOut } from "next-auth/react"
import {
    Avatar,
    Button,
    Center,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Stack,
    Text,
    useColorMode
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function LoginButton() {
    const { data: session } = useSession();
    const { push, asPath } = useRouter();
    const { colorMode, toggleColorMode } = useColorMode();
    const handleSignOut = async () => {
        const data = await signOut({
            redirect: false,
            callbackUrl: '/dailyquestions'
        });
        push(data.url);
    }
    const handleSignIn = async () => await push(`/auth/signin?callbackUrl=${asPath}`);

    if (session) {
        return (
            <Menu>
                <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <Avatar
                        size={'sm'}
                        src={session.user?.image!}
                    />
                </MenuButton>
                <MenuList alignItems={'center'}>
                    <br />
                    <Center>
                        <Avatar
                            src={session.user?.image!}
                        />
                    </Center>
                    <br />
                    <Center>
                        <Stack align={'center'}>
                            <Text>{session.user?.name}</Text>
                            <Text>{session.user?.email}</Text>
                        </Stack>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Questions</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={handleSignOut} color={'#DB1C70'}>Sign out</MenuItem>
                </MenuList>
            </Menu>
        )
    }
    return (
        <>
            <Button background={'transparent'} onClick={handleSignIn}> Sign in </Button>
        </>
    )
}