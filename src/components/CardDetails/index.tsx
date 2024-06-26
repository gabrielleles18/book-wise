import {Avatar, Flex, FlexProps, Heading, Text, Wrap} from "@chakra-ui/react";
import Image from "next/image";
import '@smastrom/react-rating/style.css'
import {StarRating} from "@/components/StarRating";
import React from "react";
import {BookProps, UserProps} from "@/@types/schema.prisma";
import {getRelativeTime} from "@/lib/dayjs";
import {useSession} from "next-auth/react";

interface CardDetailsProps {
    user?: UserProps
    book?: BookProps
    rate: number,
    created_at: Date,
    styles?: FlexProps
}

export function CardDetails({user, book, rate, created_at, styles}: CardDetailsProps) {
    const session = useSession();
    const userSession = session.data?.user;

    const boxStyles = {
        px: 7,
        py: 6,
        bg: 'gray.800',
        borderRadius: '8',
        flexDirection: 'column',
        gap: '32px',
        w: '100%',
        transition: 'background-color 0.2s',
        ...styles
    }

    // @ts-ignore
    let imageSrc = '';

    if (process.env.NEXT_PUBLIC_IMAGE_URL) {
        imageSrc = process.env.NEXT_PUBLIC_IMAGE_URL + book?.cover_url;
    } else {
        imageSrc = book?.cover_url ?? '';
    }

    return (
        <Flex sx={boxStyles}>
            {userSession && (
                <Flex justifyContent={'space-between'} alignItems={'flex-start'}>
                    <Flex gap={4} alignItems={'center'}>
                        <Wrap>
                            <Avatar name={user?.name} src={user?.avatar_url} size={'md'}/>
                        </Wrap>
                        <Flex flexDirection={'column'}>
                            <Text fontSize={'xl'}>{user?.name}</Text>
                            <Text fontSize={'sm'} color={'gray.300'}>
                                {getRelativeTime(created_at)}
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
                    {!userSession && (
                        <Flex w={'100%'} justifyContent={'space-between'} alignItems={'flex-start'} mb={4}>
                            <Text color={'gray.50'}>
                                {getRelativeTime(created_at)}
                            </Text>
                            <StarRating rate={rate}/>
                        </Flex>
                    )}

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
