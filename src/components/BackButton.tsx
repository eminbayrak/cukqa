import React from 'react'
import { Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

function BackButton() {
    const router = useRouter();
    return (
        <Button
            rounded={'full'}
            size={'md'}
            fontWeight={'normal'}
            px={6}
            leftIcon={<ArrowBackIcon h={4} w={4} />}
            onClick={() => router.back()}
        >
            Back
        </Button>
    )
}

export default BackButton;