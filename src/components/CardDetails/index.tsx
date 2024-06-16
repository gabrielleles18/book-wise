import {Avatar, Flex, Heading, Text, Wrap} from "@chakra-ui/react";
import Image from "next/image";
import '@smastrom/react-rating/style.css'
import {StarRating} from "@/components/StarRating";
import React from "react";

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {BookProps, UserProps} from "@/@types/global";

dayjs.extend(relativeTime);

interface CardDetailsProps {
    user?: UserProps
    book?: BookProps
    rate: number,
    created_at: Date
}

export function CardDetails({user, book, rate, created_at}: CardDetailsProps) {
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

    const dateEvaluation = dayjs(created_at).fromNow();
    const imageSrc = `http://localhost:3000/${book?.cover_url}`;

    return (
        <Flex sx={boxStyles}>
            {showUser && (
                <Flex justifyContent={'space-between'} alignItems={'flex-start'}>
                    <Flex gap={4} alignItems={'center'}>
                        <Wrap>
                            <Avatar name={user?.name} src={user?.avatar_url} size={'md'}/>
                        </Wrap>
                        <Flex flexDirection={'column'}>
                            <Text fontSize={'xl'}>{user?.name}</Text>
                            <Text fontSize={'sm'} color={'gray.300'}>
                                {dateEvaluation}
                            </Text>
                        </Flex>
                    </Flex>

                    <StarRating rate={rate}/>
                </Flex>
            )}
            <Flex gap={'24px'} w={'100%'}>
                <Image
                    src={imageSrc}
                    alt={''}
                    width={108}
                    height={152}
                    objectFit={'contain'}
                />
                <Flex flexDirection={'column'} w={'100%'}>
                    {/*{!showUser && (*/}
                    {/*    <Flex w={'100%'} justifyContent={'space-between'} alignItems={'flex-start'} mb={4}>*/}
                    {/*        <Text color={'gray.50'}>*/}
                    {/*            {dateFromNow}*/}
                    {/*        </Text>*/}
                    {/*        <StarRating/>*/}
                    {/*    </Flex>*/}
                    {/*)}*/}

                    <Heading color={'gray.50'} fontSize={'2xl'} mb={1}>{book?.name}</Heading>
                    <Text color={'gray.200'}>{book?.author}</Text>

                    <Flex flex={1} alignItems={'flex-end'}>
                        <Text>{book?.summary}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
