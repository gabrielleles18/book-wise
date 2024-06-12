import Image from "next/image";
import {Flex, Heading, Text, withDelay} from "@chakra-ui/react";
import '@smastrom/react-rating/style.css'
import {StarRating} from "@/components/StarRating";
import {BookProps} from "@/@types/global";

interface CardPopularProps {
    rate: {
        book_id: string
        created_at: Date
        description: string
        id: string
        rate: number
        user_id: string
    },
    coverUrl: string
    name: string
    author: string
    withCont?: string
}

export function CardPopular({rate, coverUrl, name, author, withCont}: CardPopularProps) {

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
        }
    }
    const imageSrc = `http://localhost:3000/${coverUrl}`;
    const medRate = rate && Array.isArray(rate) ? rate.reduce((acc, curr) => acc + curr.rate, 0) / rate.length : rate.rate;

    return (
        <Flex sx={boxStyles}>
            <Image src={imageSrc} alt={''} width={64} height={94} objectFit={'contain'}/>
            <Flex w={'100%'} flexDirection={'column'}>
                <Heading color={'gray.50'} fontSize={'md'} mb={1}>{ name}</Heading>
                <Text color={'gray.200'}>{author}</Text>

                <Flex flex={1} alignItems={'flex-end'}>
                    <StarRating rate={Math.floor(medRate)}/>
                </Flex>
            </Flex>
        </Flex>
    );
}
