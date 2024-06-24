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
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    Textarea,
    useDisclosure
} from "@chakra-ui/react";
import React, {useEffect} from "react";
import Image from "next/image";
import {StarRating} from "@/components/StarRating";
import {useQuery} from "react-query";
import {api} from "@/lib/axios";
import {BookProps, CategoryProps, RatingProps, UserProps} from "@/@types/global";
import {IoBookmarkOutline, IoBookOutline} from "react-icons/io5";
import {theme} from "@/styles/themes/default";
import {CheckIcon, CloseIcon} from "@chakra-ui/icons";
import {getRelativeTime} from "@/lib/dayjs";
import {signIn, useSession} from "next-auth/react";
import {SocialButton} from "@/components/SocialButton";
import googleIcon from "../../../public/icon/google.svg";

interface DrawerExploreProps {
    finalFocusRef: React.RefObject<HTMLDivElement>;
    isOpenD: boolean;
    onCloseD: () => void;
    bookId: string | null;
}

interface BookCRProps extends BookProps {
    categories: CategoryProps,
    ratings: RatingProps,
}

export function DrawerExplore({finalFocusRef, isOpenD, onCloseD, bookId}: DrawerExploreProps) {
    const [medRate, setMedRate] = React.useState<number>(0);
    const [isComment, setIsComment] = React.useState<boolean>(false);
    const [isRatingCreated, setIsRatingCreated] = React.useState<boolean>(false);
    const {isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal} = useDisclosure();

    const [userRate, setUserRate] = React.useState<number>(0);
    const [userComment, setUserComment] = React.useState<string>('');

    const session = useSession();
    const user = session.data?.user;

    const {data: book} = useQuery({
        queryKey: ['book', bookId, isRatingCreated],
        queryFn: async () => {
            const response = await api.get(`/books/${bookId}`)

            return response.data
        },
        enabled: isOpenD && bookId !== null
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
    const rating = book?.ratings ?? [];

    React.useEffect(() => {
        if (Array.isArray(rating)) {
            const newMedRate = rating.reduce((acc, curr) => acc + curr.rate, 0) / rating.length;
            setMedRate(newMedRate);
        } else if (rating && typeof rating === 'object' && 'rate' in rating) {
            setMedRate((rating as { rate: number }).rate);
        }
    }, [rating]);

    const categoriesName = book?.categories.map((category) => category.category.name).join(', ');

    function handleAvaliar() {
        if (user) {
            setIsComment(!isComment);
        } else {
            onOpenModal();
        }
    }

    function handleCreateRating() {
        if (user && bookId) {
            api.post('/rating/create', {
                rate: userRate,
                description: userComment ?? '',
                book_id: bookId,
                user_id: user.id
            }).then(() => {
                setUserRate(0);
                setUserComment('');
                setIsComment(false);
                setIsRatingCreated(true);
            });
        }
    }

    const existUser = rating?.find((rate) => rate.user_id === user?.id);

    useEffect(() => {
        if (existUser) {
            setUserRate(existUser.rate ?? 0);
            setUserComment(existUser?.description ?? '');
        }
    }, [existUser]);

    return (
        <>
            <Modal isOpen={isOpenModal} onClose={onCloseModal} isCentered>
                <ModalOverlay/>
                <ModalContent bg={'gray.800'} width={'520px'} p={9} alignItems={'center'}>
                    <ModalCloseButton/>
                    <Text size={'md'} mt={6}>Faça login para deixar sua avaliação</Text>

                    <Flex mt={'40px'} gap={'16px'} flexDirection={'column'} width={'100%'}>
                        <SocialButton
                            icon={googleIcon}
                            text={'Entrar com Google'}
                            onClick={() => signIn('google')}
                        />

                        {/*<SocialButton*/}
                        {/*    icon={githubIcon}*/}
                        {/*    text={'Entrar com Github'}*/}
                        {/*    onClick={() => signIn('github')}*/}
                        {/*/>*/}
                    </Flex>
                </ModalContent>
            </Modal>
            <Drawer
                isOpen={isOpenD}
                placement='right'
                onClose={onCloseD}
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
                            onClick={handleAvaliar}
                        >
                            Avaliar
                        </Text>
                    </Flex>

                    {isComment && (
                        <Flex bg={'gray.700'} borderRadius={8} p={5} mt={4} flexDirection={'column'} gap={6}>
                            <Flex alignItems={'center'} flex={1}>
                                <Avatar
                                    name={user?.name}
                                    src={user?.avatar_url}
                                    size={'md'}
                                />

                                <Text flex={1} px={4}>{user?.name}</Text>

                                <StarRating
                                    rate={userRate}
                                    isDisabled={false}
                                    onRateChange={(newRate) => setUserRate(newRate)}
                                />
                            </Flex>

                            <Textarea
                                color={'green.50'}
                                placeholder='Seu comentario aqui'
                                _placeholder={{color: 'green.100'}}
                                borderColor={'green.700'}
                                bg={'gray.800'}
                                resize={'none'}
                                h={'150px'}
                                value={userComment}
                                onChange={(e) => setUserComment(e.target.value)}
                            />

                            <Flex justifyContent={'flex-end'} gap={3}>
                                <IconButton
                                    bg={'gray.600'}
                                    color={'purple.300'}
                                    aria-label='Search database'
                                    icon={<CloseIcon/>}
                                    onClick={() => {
                                        setIsComment(false);
                                        setUserComment('');
                                        setUserRate(0);
                                    }}
                                />

                                <IconButton
                                    bg={'gray.600'}
                                    color={'green.400'}
                                    aria-label='Search database'
                                    icon={<CheckIcon fontSize={20}/>}
                                    onClick={handleCreateRating}
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
        </>
    );
}
