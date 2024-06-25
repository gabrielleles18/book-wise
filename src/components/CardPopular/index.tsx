import Image from "next/image";
import {Flex, FlexProps, Heading, Text} from "@chakra-ui/react";
import {StarRating} from "@/components/StarRating";
import React from "react";
import {RatingProps} from "@/@types/schema.prisma";

interface CardPopularProps {
    rate: RatingProps[] | number,
    coverUrl: string
    name: string
    author: string
    withCont?: string
    ref?: React.RefObject<HTMLDivElement>;
    onClick?: (() => void) | undefined;
    styles?: FlexProps
}

export function CardPopular({rate, coverUrl, name, author, withCont, ref, onClick, styles}: CardPopularProps) {

    const boxStyles = {
        w: withCont ? withCont : '100%',
        px: 6,
        py: 5,
        bg: 'gray.800',
        borderRadius: '8',
        flexDirection: 'row',
        gap: '24px',
        cursor: 'pointer',
        ':hover': {
            bg: 'gray.700'
        },
        ...styles
    }

    let medRate = 0;
    if (typeof rate !== 'number') {
        if (rate && Array.isArray(rate)) {
            medRate = rate.reduce((acc, curr) => acc + curr.rate, 0) / rate.length;
        }
    } else {
        medRate = rate;
    }

    return (
        <Flex sx={boxStyles} ref={ref} onClick={onClick}>
            <Image
                src={coverUrl}
                alt={''}
                width={64}
                height={94}
                objectFit={'contain'}
            />
            <Flex w={'100%'} flexDirection={'column'}>
                <Heading color={'gray.50'} fontSize={'md'} mb={1}>{name}</Heading>
                <Text color={'gray.200'}>{author}</Text>

                <Flex flex={1} alignItems={'flex-end'}>
                    <StarRating rate={Math.floor(medRate)}/>
                </Flex>
            </Flex>
        </Flex>
    );
}
