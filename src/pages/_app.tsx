import type {AppProps} from "next/app";
import Head from "next/head";
import {GlobalStyle} from "@/styles/globals";
import {ChakraProvider} from '@chakra-ui/react';
import {theme} from "@/styles/themes/default";
import {QueryClientProvider} from "react-query";
import {queryClient} from "@/lib/react-query";
import '../lib/dayjs'

export default function App({Component, pageProps}: AppProps) {

    return (
        <>
            <GlobalStyle/>
            <Head>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>

            <ChakraProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                </QueryClientProvider>
            </ChakraProvider>
        </>
    );
}
