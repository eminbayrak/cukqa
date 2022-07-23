import React from 'react';
import { useRouter } from 'next/router';
import {
    Button,
    Heading,
    Stack,
    Box,
    Center,
    Text,
    Divider
} from '@chakra-ui/react';
import { BsGoogle, BsTwitch, BsTwitter } from 'react-icons/bs';
import { signIn, useSession } from 'next-auth/react';

function SignIn() {
    // const question = trpc.useQuery(["question.question", { title: "from tRPC", content: "from tRPC"}]);
    // console.log(question.data);
    const { data: session, status } = useSession()
    const { push } = useRouter();
    const router = useRouter();
    if (status === 'loading') {
        return (
            <Heading mt={100} textAlign="center">Checking Authentication...</Heading>
        )
    }
    if (session) {
        push('/')
    }
    const handleOAuthSignIn = (provider: any) => () => signIn(provider)
    return (
        <>
            <Heading mt={100} textAlign="center">CUKQA</Heading>
            <Center padding={10}>
                <Box minW='480' textAlign="center" borderWidth='1px' padding={10} borderRadius='lg' overflow='hidden'>
                    <Text>Continue with</Text>
                    <br />
                    <Stack spacing={4} direction='column' align='center'>
                        <Button
                            size={'lg'}
                            px={6}
                            variant='outline'
                            leftIcon={<BsGoogle />}
                            onClick={handleOAuthSignIn('google')}
                        >
                            Google
                        </Button>
                        <Button
                            size={'lg'}
                            px={6}
                            variant='outline'
                            leftIcon={<BsTwitch />}
                            onClick={handleOAuthSignIn('twitch')}
                        >
                            Twitch
                        </Button>
                        <br />
                        <Divider />
                        <Text
                            fontSize={'sm'}
                        >
                            By signing in, you agree to our Terms of Service and Privacy Policy.
                        </Text>
                    </Stack>
                </Box>
            </Center>
        </>
    )
}

export default SignIn;