import {Button, Flex, FormControl, Heading, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import {Sidebar} from "@/components/Sidebar";
import {PiBinoculars} from "react-icons/pi";
import {theme} from "@/styles/themes/default";
import React from "react";
import {SearchIcon} from "@chakra-ui/icons";
import {useQuery} from "react-query";
import {api} from "@/lib/axios";
import {CardPopular} from "@/components/CardPopular";

interface CategoryProps {
    id: number;
    name: string;
}

interface CardPopularProps {
    ratings: {
        book_id: string
        created_at: Date
        description: string
        id: string
        rate: number
        user_id: string
    },
    cover_url: string
    name: string
    author: string
    withCont?: string
}

export default function explore() {
    const [categorySelected, setCategorySelected] = React.useState<string | null>(null);
    const [search, setSearch] = React.useState<string | null>(null);

    const {data: category} = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const response = await api.get(`/category`)

            return response.data
        },
    });

    const {data: books} = useQuery({
        queryKey: ['books', categorySelected, search],
        queryFn: async () => {
            const response = await api.get(`/books`, {
                params: {
                    categoryId: categorySelected,
                    search
                }
            })

            return response.data
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

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
                            <Input
                                size='lg'
                                type='search'
                                color={'green.50'}
                                placeholder='Buscar livro ou autor'
                                _placeholder={{color: 'green.100'}}
                                borderColor={'green.700'}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Flex>
                    <Flex gap={'12px'} flexWrap={'wrap'} marginBottom={'48px'}>
                        <Button
                            borderRadius={'999'}
                            variant={categorySelected == null ? 'solid' : 'outline'}
                            style={!categorySelected == null ? {color: 'white'} : {}}
                            colorScheme={'green'}
                            borderColor={'green.400'}
                            _hover={{bg: 'green.400', textColor: 'white'}}
                            onClick={() => setCategorySelected(null)}
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
                        {books?.map((book: CardPopularProps) => (
                            <CardPopular
                                withCont={'calc(33.333% - 1rem)'}
                                rate={book.ratings}
                                coverUrl={book.cover_url}
                                name={book.name}
                                author={book.author}
                            />
                        ))}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
