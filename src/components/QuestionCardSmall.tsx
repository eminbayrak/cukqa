import {
    Heading,
    Avatar,
    Box,
    Image,
    Text,
    Img,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue,
    Flex,
    AspectRatio,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function QuestionCardSmall(props: any) {
    const route = useRouter();
    const MotionBtn = motion(Img);
    const cardColor = useColorModeValue('gray.100', 'gray.700');
    const cardColorBg = useColorModeValue('whiteAlpha.700', 'blackAlpha.700');
    return (
        <Box backgroundColor={cardColor} borderRadius={['sm', null, 'md']} overflow="hidden">
            <Box
                onClick={() => props.onImageClick(props.question)}
                cursor="pointer"
                h="240px"
                position="relative"
                overflow="hidden">
                <MotionBtn
                    // animate={{ y: 100 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    whileHover={{ scale: 1.1 }}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    src={props.img}
                />
                <Box
                    padding={1}
                    minW={'240px'}
                    borderRadius={3}
                    transform={'translate(-50%, -50%)'}
                    top={'10%'} left={'50%'}
                    backgroundColor={cardColorBg}
                    position={'absolute'}
                >
                    <Text
                        fontWeight="semibold"
                        align="center"
                        fontSize={['sm', null, 'md']}
                    >{props.title}</Text>
                </Box>
            </Box>
            <Flex px="4" py="2" align="center" justify="space-between" w="100%">
                <Text fontSize={['xs', null, 'sm']}>
                    Posted by{' '}
                    <Link
                        fontWeight="semibold"
                        // href={''}
                        isExternal>
                        u/{props.name ?? 'Anonymous'}
                    </Link>
                </Text>
                <Flex align="center">
                    <Text ml={1} fontSize={['xs', null, 'xs']}>
                        {props.createdAt.toLocaleString()}
                    </Text>
                </Flex>
            </Flex>
        </Box >
    );
}