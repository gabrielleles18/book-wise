import {
    Flex,
    Heading,
    FormControl,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Button
} from "@chakra-ui/react";
import {Sidebar} from "@/components/Sidebar";
import {PiBinoculars} from "react-icons/pi";
import {theme} from "@/styles/themes/default";
import React from "react";
import {SearchIcon} from "@chakra-ui/icons";
import {useQuery} from "react-query";
import {api} from "@/lib/axios";
import {BookProps, BooksProps} from "@/@types/global";
import {CardPopular} from "@/components/CardPopular";

interface CategoryProps {
    id: number;
    name: string;
}

export default function explore() {
    const [categorySelected, setCategorySelected] = React.useState<string>('0');

    const {data: category} = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const response = await api.get(`/category`)

            return response.data
        },
    });

    const {data: books} = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const response = await api.get(`/rating`)

            return response.data
        },
    });
    console.log(books);

    return (
        <Flex p={4} h="100vh">
            <Sidebar/>

            <Flex marginLeft={'calc(232px + 1rem)'} w={'100%'} alignItems={'flex-start'} flexDirection={'column'}>

                <Flex w={'100%'} maxW={'1100px'} flexDirection={'column'} m={'0 auto'} pb={4}>
                    <Flex mt={14} mb={10} justifyContent={'space-between'}>
                        <Flex gap={'10px'} alignItems={'center'}>
                            <PiBinoculars size={34} color={theme.colors.green['400']}/>
                            <Heading size={'lg'}>Explorar</Heading>
                        </Flex>

                        <FormControl w={'430px'}>
                            <InputGroup>
                                <Input
                                    type='search'
                                    placeholder='Buscar livro ou autor'
                                    color={'gray.500'}
                                    border={'1px'}
                                    borderColor={'gray.600'}
                                />
                                <InputRightElement pointerEvents='none'>
                                    <SearchIcon color='gray.300'/>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    </Flex>
                    <Flex gap={'12px'} flexWrap={'wrap'} marginBottom={'48px'}>
                        <Button
                            borderRadius={'999'}
                            variant={categorySelected == '0' ? 'solid' : 'outline'}
                            style={categorySelected == '0' ? {color: 'white'} : {}}
                            colorScheme={'green'}
                            borderColor={'green.400'}
                            _hover={{bg: 'green.400', textColor: 'white'}}
                            onClick={() => setCategorySelected('0')}
                        >
                            Tudo
                        </Button>

                        {category?.map((cat: CategoryProps) => (
                            <Button
                                key={cat.id}
                                borderRadius={'999'}
                                variant={cat.id.toString() == categorySelected ? 'solid' : 'outline'}
                                style={cat.id.toString() == categorySelected ? {color: 'white'} : {}}
                                colorScheme={'green'}
                                borderColor={'green.400'}
                                _hover={{bg: 'green.400', textColor: 'white'}}
                                onClick={() => setCategorySelected(cat.id.toString())}
                            >
                                {cat.name}
                            </Button>
                        ))}
                    </Flex>

                    <Flex flexWrap={'wrap'} gap={4}>
                        {books?.map((book: BooksProps) => (
                            <CardPopular
                                withCont={'calc(33.333% - 1rem)'}
                                rate={book.rate}
                                book={book.book}
                            />
                        ))}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
