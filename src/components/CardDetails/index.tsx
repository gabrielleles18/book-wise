import {Box, Flex, Heading, Text} from "@chakra-ui/react";
import Image from "next/image";
import bookImage from '../../../public/book.png';
import {useState} from "react";
import {Rating, RoundedStar} from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import {theme} from "@/styles/themes/default";

export function CardDetails() {
    const [rating, setRating] = useState(0)

    const boxStyles = {
        px: 7,
        py: 6,
        bg: 'gray.700',
        borderRadius: '8',
        flexDirection: 'row',
        gap: '24px',
        w: '100%'
    }

    return (
        <Flex sx={boxStyles}>
            <Image src={bookImage} alt={''} width={108} height={152} objectFit={'contain'}/>
            <Flex w={'100%'} flexDirection={'column'}>
                <Flex w={'100%'} justifyContent={'space-between'} alignItems={'flex-start'} mb={4}>
                    <Text color={'gray.50'}>Hoje</Text>
                    <Rating
                        style={{maxWidth: 96}}
                        value={rating}
                        onChange={setRating}
                        itemStyles={{
                            itemShapes: RoundedStar,
                            activeFillColor: theme.colors.gray['300'],
                            inactiveFillColor: theme.colors.gray['700'],
                        }}
                    />
                </Flex>

                <Heading color={'gray.50'} fontSize={'2xl'} mb={1}>O Poder do Hábito</Heading>
                <Text color={'gray.500'}>Aditya Bhargava</Text>

                <Flex flex={1} alignItems={'flex-end'}>
                    <Text>
                        Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis. Penatibus id vestibulum
                        imperdiet a at imperdiet lectu...
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
}
