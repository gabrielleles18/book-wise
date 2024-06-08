import {Box, Flex, Text} from '@chakra-ui/react';
import Image from "next/image";
import homeImage from '../../assets/image/home.png';
import googleIcon from '../../assets/icon/google.svg';
import githubIcon from '../../assets/icon/github.svg';
import rocketIcon from '../../assets/icon/rocket.svg';

import {defaultTheme} from "@/styles/themes/default";
import Link from "next/link";
import {SocialButton} from "@/components/SocialButton";

export default function Login() {
    console.log(defaultTheme);
    return (
        <Flex p={4} h="100vh">
            <Flex w={'33%'} h={'100%'} position={'relative'}>
                <Image
                    src={homeImage}
                    alt={''}
                    quality={100}
                    priority={true}
                    objectFit={'cover'}
                    layout={'fill'}
                    style={{borderRadius: defaultTheme.radii.lg, position: 'absolute'}}
                />
            </Flex>

            <Flex flex={1} alignItems={'center'} justifyContent={'center'}>
                <Flex flexDirection={'column'} gap={'3px'}>
                    <Text fontSize={'3xl'} color={'gray.50'} fontWeight={'bold'}>Boas vindas!</Text>
                    <Text fontSize={'xl'} color={'gray.50'}>Faça seu login ou acesse como visitante.</Text>

                    <Flex mt={'40px'} gap={'16px'} flexDirection={'column'}>
                        <SocialButton
                            icon={googleIcon}
                            text={'Entrar com Google'}
                            href={'https://google.com'}
                        />

                        <SocialButton
                            icon={githubIcon}
                            text={'Entrar com Github'}
                            href={'https://google.com'}
                        />

                        <SocialButton
                            icon={rocketIcon}
                            text={'Acessar como visitante'}
                            href={'https://google.com'}
                        />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
