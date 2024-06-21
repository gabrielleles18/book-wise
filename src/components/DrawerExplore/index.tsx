import {
    Avatar,
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerOverlay,
    Flex,
    Heading,
    IconButton,
    Text,
    Textarea
} from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import {StarRating} from "@/components/StarRating";
import {useQuery} from "react-query";
import {api} from "@/lib/axios";
import {BookProps, RatingProps, UserProps} from "@/@types/global";
import {IoBookmarkOutline, IoBookOutline} from "react-icons/io5";
import {theme} from "@/styles/themes/default";
import {CheckIcon, CloseIcon} from "@chakra-ui/icons";
import {getRelativeTime} from "@/lib/dayjs";

interface FocusableElement {
    focus(options?: FocusOptions): void;
}

interface DrawerExploreProps {
    finalFocusRef: React.RefObject<HTMLDivElement>;
    isOpen: boolean;
    onClose: () => void;
    bookId: string | null;
}

interface RatingPropsTeste {
    id: string;
    book_id: string;
    created_at: Date;
    rate: number;
    user_id: string;
    user: UserProps;
}

export function DrawerExplore({finalFocusRef, isOpen, onClose, bookId}: DrawerExploreProps) {
    const [medRate, setMedRate] = React.useState<number | undefined>(undefined);
    const [isComment, setIsComment] = React.useState<boolean>(false);

    const {data: book} = useQuery<BookProps>({
        queryKey: ['book', bookId],
        queryFn: async () => {
            const response = await api.get(`/books/${bookId}`)

            return response.data
        },
        enabled: isOpen && bookId !== null
    });

    const boxStyles = {
        w: '100%',
        px: 6,
        py: 5,
        bg: 'gray.700',
        borderRadius: '8',
        flexDirection: 'column',
        mt: 4
    }

    const imageSrc = `http://localhost:3000/${book?.cover_url}`;
    const rating = book?.ratings as RatingPropsTeste[];

    React.useEffect(() => {
        if (Array.isArray(rating)) {
            const newMedRate = rating.reduce((acc, curr) => acc + curr.rate, 0) / rating.length;
            setMedRate(newMedRate);
        } else if (rating && typeof rating === 'object' && 'rate' in rating) {
            setMedRate((rating as { rate: number }).rate);
        }
    }, [rating]);

    const categoriesName = book?.categories.map((category) => category.category.name).join(', ');

    return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={finalFocusRef}
            size={'lg'}
            colorScheme={'blue'}
        >
            <DrawerOverlay/>
            <DrawerContent w={'660px'} bg={'gray.800'} pt={10} px={9} overflow={'auto'}>
                <DrawerCloseButton right={7} top={4} size={'lg'}/>
                <Flex sx={boxStyles} ref={finalFocusRef}>

                    <Flex gap={6}>
                        {book?.cover_url && (
                            <Image src={imageSrc} alt={''} width={170} height={242} objectFit={'contain'}/>
                        )}
                        <Flex w={'100%'} flexDirection={'column'}>
                            <Heading color={'gray.50'} fontSize={'2xl'} mb={1}>{book?.name}</Heading>
                            <Text color={'gray.200'} size={'md'}>{book?.author}</Text>

                            <Flex flex={1} justifyContent={'flex-end'} flexDirection={'column'}>
                                <StarRating rate={medRate ? Math.floor(medRate) : 0}/>
                                {rating?.length && (
                                    <Text size={'sm'} color={'gray.200'}>{rating?.length} avaliações</Text>
                                )}
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex
                        flex={1}
                        marginTop={8}
                        paddingTop={8}
                        gap={10}
                        borderTop={`1px solid ${theme.colors.gray['600']}`}
                    >
                        <Flex alignItems={'center'} gap={4} w={'100%'}>
                            <IoBookOutline size={24} color={theme.colors.green['300']}/>
                            <Flex flexDirection={'column'}>
                                <Text color={'gray.100'}>Categoria</Text>
                                <Text color={'gray.50'} fontWeight={'bold'}>{categoriesName}</Text>
                            </Flex>
                        </Flex>
                        <Flex alignItems={'center'} gap={4} w={'100%'}>
                            <IoBookmarkOutline size={24} color={theme.colors.green['300']}/>
                            <Flex flexDirection={'column'}>
                                <Text color={'gray.100'}>Páginas</Text>
                                <Text color={'gray.50'} fontWeight={'bold'}>{book?.total_pages}</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex justifyContent={'space-between'} mt={10}>
                    <Text color={'gray.50'}>Avaliações</Text>
                    <Text
                        fontWeight={'bold'}
                        color={'gray.400'}
                        cursor={'pointer'}
                        _hover={{textDecoration: 'underline'}}
                        onClick={() => setIsComment(!isComment)}
                    >
                        Avaliar
                    </Text>
                </Flex>

                {isComment && (
                    <Flex bg={'gray.700'} borderRadius={8} p={5} mt={4} flexDirection={'column'} gap={6}>
                        <Flex alignItems={'center'} flex={1}>
                            <Avatar
                                size={'md'}
                            />

                            <Text flex={1} px={4}>Cristofer Rosser</Text>

                            <StarRating rate={0} isDisabled={false}/>
                        </Flex>

                        <Textarea
                            color={'green.50'}
                            placeholder='Seu comentario aqui'
                            _placeholder={{color: 'green.100'}}
                            borderColor={'green.700'}
                            bg={'gray.800'}
                            resize={'none'}
                            h={'150px'}
                        />

                        <Flex justifyContent={'flex-end'} gap={3}>
                            <IconButton
                                bg={'gray.600'}
                                color={'purple.300'}
                                aria-label='Search database'
                                icon={<CloseIcon/>}
                            />

                            <IconButton
                                bg={'gray.600'}
                                color={'green.400'}
                                aria-label='Search database'
                                icon={<CheckIcon fontSize={20}/>}
                            />
                        </Flex>
                    </Flex>
                )}

                {book?.ratings && book.ratings.map((rating: RatingProps) => {
                    const date = rating?.created_at ? getRelativeTime(rating.created_at) : '';
                    return (
                        <Flex sx={boxStyles} key={rating.id} gap={3}>
                            <Flex gap={4} alignItems={'flex-start'}>
                                {rating?.user?.avatar_url && (
                                    <Avatar
                                        name={rating.user.name}
                                        src={rating.user.avatar_url}
                                        size={'md'}
                                    />
                                )}
                                <Flex flexDirection={'column'} flex={1}>
                                    <Text color={'gray.50'} fontWeight={'bold'} size={'md'}>
                                        {rating?.user?.name}
                                    </Text>
                                    <Text color={'gray.200'}>{date}</Text>
                                </Flex>
                                <StarRating rate={rating.rate}/>
                            </Flex>

                            <Text>{rating.description}</Text>
                        </Flex>
                    )
                })}
                <DrawerFooter>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
