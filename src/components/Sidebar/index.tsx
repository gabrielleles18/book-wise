import Image from "next/image";
import {Avatar, Flex, Text, Wrap} from "@chakra-ui/react";
import logoImage from '../../../public/images/logo.png';
import {PiBinoculars, PiChartLineUp, PiSignOut, PiUser} from "react-icons/pi";
import {SidebarLink} from "@/components/SidebarLink";
import React from "react";
import Link from "next/link";
import {theme} from "@/styles/themes/default";

export function Sidebar() {
    const isLogin = false;

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
                priority
                quality={100}
            />

            <Flex as={'nav'} mt={'20'} gap={12} flexDirection={'column'} flex={'1'}>
                <SidebarLink
                    href={'/'}
                    text={'Início'}
                    icon={<PiChartLineUp size={24}/>}
                />
                <SidebarLink
                    href={'/explore'}
                    text={'Explorar'}
                    icon={<PiBinoculars size={24}/>}
                />

                {isLogin && (
                    <SidebarLink
                        href={'/profile'}
                        text={'Perfil'}
                        icon={<PiUser size={24}/>}
                    />
                )}
            </Flex>

            <Link href={'/login'}>
                <Flex alignItems={'center'} gap={'10px'}>
                    {isLogin && (
                        <Wrap>
                            <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size={'md'}/>
                        </Wrap>
                    )}
                    <Text
                        fontSize={'xl'}
                        color={'gray.200'}
                        fontWeight={'600'}
                        transition={'color 0.2s'}
                        _hover={{color: 'gray.50'}}
                    >
                        {isLogin ? 'Gabriel' : 'Fazer login'}
                    </Text>
                    <PiSignOut size={24} color={isLogin ? theme.colors.red['600'] : theme.colors.green['500']}/>
                </Flex>
            </Link>
        </Flex>
    )
}
