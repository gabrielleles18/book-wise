import {CardPopularContainer} from "./styles";
import Image from "next/image";
import bookImage from "../../../public/book.png";
import {Flex, Heading, Text} from "@chakra-ui/react";
import {Rating, RoundedStar} from "@smastrom/react-rating";
import {theme} from "@/styles/themes/default";
import {useState} from "react";
import '@smastrom/react-rating/style.css'

export function CardPopular() {
    const [rating, setRating] = useState(0)

    const boxStyles = {
        px: 6,
        py: 5,
        bg: 'gray.800',
        borderRadius: '8',
        flexDirection: 'row',
        gap: '24px',
        w: '100%'
    }

    return (
        <Flex sx={boxStyles}>
            <Image src={bookImage} alt={''} width={64} height={94} objectFit={'contain'}/>
            <Flex w={'100%'} flexDirection={'column'}>
                <Heading color={'gray.50'} fontSize={'md'} mb={1}>O Poder do Hábito</Heading>
                <Text color={'gray.500'}>Aditya Bhargava</Text>

                <Flex flex={1} alignItems={'flex-end'}>
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
            </Flex>
        </Flex>
    );
}
