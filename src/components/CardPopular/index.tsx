import Image from "next/image";
import bookImage from "../../../public/book.png";
import {Flex, Heading, Text} from "@chakra-ui/react";
import '@smastrom/react-rating/style.css'
import {StarRating} from "@/components/StarRating";

export function CardPopular() {

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

    return (
        <Flex sx={boxStyles}>
            <Image src={bookImage} alt={''} width={64} height={94} objectFit={'contain'}/>
            <Flex w={'100%'} flexDirection={'column'}>
                <Heading color={'gray.50'} fontSize={'md'} mb={1}>O Poder do Hábito</Heading>
                <Text color={'gray.200'}>Aditya Bhargava</Text>

                <Flex flex={1} alignItems={'flex-end'}>
                    <StarRating/>
                </Flex>
            </Flex>
        </Flex>
    );
}
