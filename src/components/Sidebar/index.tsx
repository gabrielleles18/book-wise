import Image from "next/image";
import {Avatar, Flex, Text, Wrap} from "@chakra-ui/react";
import logoImage from '../../../public/images/logo.png';
import {PiBinoculars, PiChartLineUp, PiSignOut, PiUser} from "react-icons/pi";
import {SidebarLink} from "@/components/SidebarLink";
import React from "react";
import {theme} from "@/styles/themes/default";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";

export function Sidebar() {
    const session = useSession();
    const user = session?.data?.user ?? null;
    const navigation = useRouter();

    async function handleSocial() {
        if (user) {
            await signOut();
        } else {
            console.log("veve");
            await navigation.push('/login');
        }
    }

    return (
        <Flex
            as={'aside'}
            w={232}
            h={'calc(100% - 2rem)'}
            position={'fixed'}
            borderRadius={'12px'}
            alignItems={'center'}
            flexDirection={'column'}
            py={'10'}
            backgroundImage={'url(./images/sidebar.png)'}
        >
            <Image
                src={logoImage}
                alt={''}
                width={128}
                priority={true}
                quality={100}
            />

            <Flex as={'nav'} mt={'20'} gap={12} flexDirection={'column'} flex={'1'}>
                <SidebarLink
                    href={'/home'}
                    text={'Início'}
                    icon={<PiChartLineUp size={24}/>}
                />
                <SidebarLink
                    href={'/explore'}
                    text={'Explorar'}
                    icon={<PiBinoculars size={24}/>}
                />

                {user && (
                    <SidebarLink
                        href={'/profile'}
                        text={'Perfil'}
                        icon={<PiUser size={24}/>}
                    />
                )}
            </Flex>

            <Flex onClick={handleSocial} _hover={{cursor: 'pointer'}}>
                <Flex alignItems={'center'} gap={'10px'}>
                    {user && (
                        <Wrap>
                            <Avatar
                                name={user.name}
                                src={user.avatar_url}
                                size={'md'}
                            />
                        </Wrap>
                    )}
                    <Text
                        fontSize={'lg'}
                        color={'gray.200'}
                        fontWeight={'600'}
                        transition={'color 0.2s'}
                        _hover={{color: 'gray.50'}}
                    >
                        {user ? user?.name : 'Fazer login'}
                    </Text>
                    <PiSignOut size={24} color={user ? theme.colors.red['600'] : theme.colors.green['500']}/>
                </Flex>
            </Flex>
        </Flex>
    )
}
