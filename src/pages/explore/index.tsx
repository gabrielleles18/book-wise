import {Button, Flex, FormControl, Heading, Input, useBreakpoint, useDisclosure} from "@chakra-ui/react";
import {Sidebar} from "@/components/Sidebar";
import {PiBinoculars} from "react-icons/pi";
import {theme} from "@/styles/themes/default";
import React from "react";
import {useQuery} from "react-query";
import {api} from "@/lib/axios";
import {CardPopular} from "@/components/CardPopular";
import {DrawerExplore} from "@/components/DrawerExplore";
import {NextSeo} from "next-seo";
import {MenuMobile} from "@/components/MenuMobile";
import {BookProps, CategoryProps, RatingProps} from "@/@types/global";

interface BooksRProps extends BookProps {
    ratings: RatingProps[] | number
}

export default function explore() {
    const cardPopularRef = React.useRef<any>();
    const [categorySelected, setCategorySelected] = React.useState<string | null>(null);
    const [search, setSearch] = React.useState<string | null>(null);
    const [bookIdClicked, setBookIdClicked] = React.useState<string | null>(null);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const breakpoint = useBreakpoint();

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
        <>
            <NextSeo
                title="Explorar | Book Wise"
                description="Acompanhe suas avaliações e estatísticas de leitura."
            />

            <Flex p={4} h="100vh">

                {breakpoint != 'base' && breakpoint !== 'sm' && breakpoint !== 'md' && (
                    <Sidebar/>
                )}

                <Flex
                    marginLeft={{base: '0', lg: 'calc(232px + 1rem)'}}
                    w={'100%'}
                    alignItems={'flex-start'}
                    flexDirection={'column'}
                >
                    <MenuMobile/>
                    <Flex w={'100%'} maxW={'1100px'} flexDirection={'column'} m={'0 auto'} pb={4}>
                        <Flex
                            mt={{base: 4, lg: 14}}
                            mb={10}
                            justifyContent={'space-between'}
                            gap={6}
                            flexWrap={'wrap'}
                            alignItems={'center'}
                        >
                            <Flex gap={'10px'} alignItems={'center'}>
                                <PiBinoculars size={34} color={theme.colors.green['400']}/>
                                <Heading size={'lg'}>Explorar</Heading>
                            </Flex>

                            <FormControl w={'430px'}>
                                <Input
                                    size='lg'
                                    type='search'
                                    color={'green.50'}
                                    placeholder='Buscar por livro'
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

                        <Flex
                            flexWrap={'wrap'}
                            gap={4}
                            gridTemplateColumns={{base: '1fr', md: '1fr 1fr 1fr'}}
                            display={'grid'}
                        >
                            {books?.map((book: BooksRProps) => (
                                <CardPopular
                                    key={book.id}
                                    rate={book.ratings}
                                    coverUrl={book.cover_url}
                                    name={book.name}
                                    author={book.author}
                                    ref={cardPopularRef}
                                    onClick={() => {
                                        onOpen();
                                        if (book.id !== null) {
                                            setBookIdClicked(book.id)
                                        }
                                    }}
                                />
                            ))}
                        </Flex>
                        <DrawerExplore
                            finalFocusRef={cardPopularRef}
                            isOpenD={isOpen}
                            onCloseD={onClose}
                            bookId={bookIdClicked}
                        />
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}
