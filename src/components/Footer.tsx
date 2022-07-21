import {
    Container,
    Text,
    Link
} from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
    return (
        <Container as="footer" maxW="xl" textAlign="center" py={10}>
            <Text>
                Made with{' '}
                <span role="img" aria-label="heart emoji">
                    ❤️
                </span>{' '}
                by{' '}
                <Link href="https://github.com/eminbayrak/" isExternal>
                    {'Emin Bayrak'}
                </Link>
            </Text>
            <Text>{(new Date()).getUTCFullYear()}</Text>
        </Container>
    )
}

export default Footer