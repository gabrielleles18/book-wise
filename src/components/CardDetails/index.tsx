import {Avatar, Flex, Heading, Text, Wrap} from "@chakra-ui/react";
import Image from "next/image";
import bookImage from '../../../public/book.png';

import '@smastrom/react-rating/style.css'
import {StarRating} from "@/components/StarRating";
import React from "react";

export function CardDetails() {
    const showUser = true;
    const boxStyles = {
        px: 7,
        py: 6,
        bg: 'gray.800',
        borderRadius: '8',
        flexDirection: 'column',
        gap: '32px',
        w: '100%',
        transition: 'background-color 0.2s',
        cursor: 'pointer',
        ':hover': {
            bg: 'gray.700'
        }
    }

    return (
        <Flex sx={boxStyles}>
            {showUser && (
                <Flex justifyContent={'space-between'} alignItems={'flex-start'}>
                    <Flex gap={4} alignItems={'center'}>
                        <Wrap>
                            <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size={'md'}/>
                        </Wrap>
                        <Flex flexDirection={'column'}>
                            <Text fontSize={'xl'}>Jaxson Dias</Text>
                            <Text fontSize={'sm'} color={'gray.300'}>Hoje</Text>
                        </Flex>
                    </Flex>

                    <StarRating/>
                </Flex>
            )}
            <Flex gap={'24px'} w={'100%'}>
                <Image src={bookImage} alt={''} width={108} height={152} objectFit={'contain'}/>
                <Flex flexDirection={'column'} w={'100%'}>
                    {!showUser && (
                        <Flex w={'100%'} justifyContent={'space-between'} alignItems={'flex-start'} mb={4}>
                            <Text color={'gray.50'}>Hoje</Text>
                            <StarRating/>
                        </Flex>
                    )}

                    <Heading color={'gray.50'} fontSize={'2xl'} mb={1}>O Poder do Hábito</Heading>
                    <Text color={'gray.200'}>Aditya Bhargava</Text>

                    <Flex flex={1} alignItems={'flex-end'}>
                        <Text>
                            Nec tempor nunc in egestas. Euismod nisi eleifend
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
