import {Flex, Text} from '@chakra-ui/react';
import Image from "next/image";
import homeImage from '../../../public/images/home.png';
import googleIcon from '../../../public/icon/google.svg';
import githubIcon from '../../../public/icon/github.svg';
import rocketIcon from '../../../public/icon/rocket.svg';

import {theme} from "@/styles/themes/default";
import {SocialButton} from "@/components/SocialButton";
import {getSession, signIn, useSession} from "next-auth/react";
import {useRouter} from "next/router";

export default function Login() {
    const router = useRouter();

    const session = useSession();

    console.log(session);

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
                    style={{borderRadius: theme.radii.lg, position: 'absolute'}}
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
                            onClick={() => signIn('google')}
                        />

                        <SocialButton
                            icon={githubIcon}
                            text={'Entrar com Github'}
                            onClick={() => signIn('github')}
                        />

                        <SocialButton
                            icon={rocketIcon}
                            text={'Acessar como visitante'}
                            onClick={() => router.push('/home')}
                        />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export async function getServerSideProps(context: any) {
    const session = await getSession(context);

    if (!session) {
        return {
            props: {session},
        }
    } else {
        return {
            redirect: {
                destination: '/home',
                permanent: false,
            },
        }
    }
}
