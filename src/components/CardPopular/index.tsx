import Image from "next/image";
import {Flex, Heading, Text} from "@chakra-ui/react";
import '@smastrom/react-rating/style.css'
import {StarRating} from "@/components/StarRating";
import {BookProps} from "@/@types/global";

interface CardPopularProps {
    rate: number,
    book: BookProps
}

export function CardPopular({rate, book}: CardPopularProps) {

    const boxStyles = {
        px: 6,
        py: 5,
        bg: 'gray.800',
        borderRadius: '8',
        flexDirection: 'row',
        gap: '24px',
        w: '100%',
        cursor: 'pointer',
        ':hover': {
            bg: 'gray.700'
        }
    }
    const imageSrc = `http://localhost:3000/${book.cover_url}`;
    console.log(rate);
    return (
        <Flex sx={boxStyles}>
            <Image src={imageSrc} alt={''} width={64} height={94} objectFit={'contain'}/>
            <Flex w={'100%'} flexDirection={'column'}>
                <Heading color={'gray.50'} fontSize={'md'} mb={1}>{book.name}</Heading>
                <Text color={'gray.200'}>{book.author}</Text>

                <Flex flex={1} alignItems={'flex-end'}>
                    <StarRating rate={rate}/>
                </Flex>
            </Flex>
        </Flex>
    );
}
