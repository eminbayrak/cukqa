import React from 'react';
import { useRouter } from 'next/router';
import {
    Button,
    Heading,
    Stack,
    Box,
    Center,
    Text,
    ColorModeScript
} from '@chakra-ui/react';
import TopNavBar from '../layouts/TopNavBar';

function Dashboard() {
    const router = useRouter();
    return (
        <>
            <ColorModeScript initialColorMode="dark" />
            <TopNavBar />
            <Center paddingTop={20}>
                <Box minW='480' textAlign="center" borderWidth='1px' padding={10} borderRadius='lg' overflow='hidden'>
                    <br />
                    <Stack spacing={4} direction='column' align='center'>
                        <Box textAlign="center">
                            <Heading as="h1" size="4xl">
                                <Text as={'span'} color={'#DB1C70'}>
                                    Welcome{' '}
                                </Text>
                                to CUKQA
                            </Heading>
                            <Text fontSize="lg" fontWeight="semibold" mt={2}>
                                Tending questions are waiting for your answers!
                            </Text>
                        </Box>
                        <Button
                            size={'lg'}
                            fontWeight={'normal'}
                            px={6}
                            bg={'#DB1C70'}
                            color={'white'}
                            _hover={{
                                bg: '#B5175C',
                            }}
                            _focus={{
                                bg: '#B5175C',
                            }}
                            onClick={() => router.push('/dailyquestions')}>
                            Daily Questions
                        </Button>
                    </Stack>
                </Box>
            </Center>
        </>
    )
}

export default Dashboard;