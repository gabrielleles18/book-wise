import {Avatar, Flex, Heading, Text, Wrap} from "@chakra-ui/react";
import Image from "next/image";
import '@smastrom/react-rating/style.css'
import {StarRating} from "@/components/StarRating";
import React from "react";

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface CardDetailsProps {
    title: string;
    author: string;
    image: string;
    rating: number;
    user: string;
    date: string;
    description: string;
}

export function CardDetails({title, author, image, rating, user, date, description}: CardDetailsProps) {
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

    // const dateFromNow = dayjs('1999-01-01').fromNow();
    const dateFromNow = dayjs(date).fromNow();

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
                            <Text fontSize={'sm'} color={'gray.300'}>
                                {dateFromNow}
                            </Text>
                        </Flex>
                    </Flex>

                    <StarRating/>
                </Flex>
            )}
            <Flex gap={'24px'} w={'100%'}>
                <Image src={image} alt={''} width={108} height={152} objectFit={'contain'}/>
                <Flex flexDirection={'column'} w={'100%'}>
                    {!showUser && (
                        <Flex w={'100%'} justifyContent={'space-between'} alignItems={'flex-start'} mb={4}>
                            <Text color={'gray.50'}>
                                {dateFromNow}
                            </Text>
                            <StarRating/>
                        </Flex>
                    )}

                    <Heading color={'gray.50'} fontSize={'2xl'} mb={1}>{title}</Heading>
                    <Text color={'gray.200'}>{author}</Text>

                    <Flex flex={1} alignItems={'flex-end'}>
                        <Text>{description}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
