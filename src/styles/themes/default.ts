import {extendTheme, ThemingPropsThunk} from '@chakra-ui/react'

export const theme = extendTheme({
    colors: {
        gray: {
            50: '#edecfd',
            100: '#c9cae9',
            200: '#a6a8d6',
            300: '#8388c7',
            400: '#6068b7',
            500: '#47529d',
            600: '#37427b',
            700: '#273058',
            800: '#171e36',
            900: '#060916',
        },
        green: {
            50: '#e2f1ff',
            100: '#bddbf4',
            200: '#97c7eb',
            300: '#6fb5e3',
            400: '#4ca6da',
            500: '#3892c1',
            600: '#297596',
            700: '#1c566b',
            800: '#0b3642',
            900: '#001119',
        },
        purple: {
            50: '#ebebff',
            100: '#c5c6f0',
            200: '#a19fe0',
            300: '#7b79d3',
            400: '#5653c5',
            500: '#3d39ab',
            600: '#2f2c86',
            700: '#202061',
            800: '#13133c',
            900: '#070519',
        },
    },
    fonts: {
        body: "Nunito Sans, sans-serif",
    },
});
