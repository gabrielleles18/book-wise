import { createGlobalStyle } from 'styled-components';
import {theme} from "@/styles/themes/default";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    html,
    body {
        max-width: 100vw;
        overflow-x: hidden;
        font-family: ${theme.fonts.body};
        color: ${theme.colors.gray['50']};
        background-color: ${theme.colors.gray['900']};
    }

    input, button, textarea, select {
        font-family: ${theme.fonts.body};
    }

    a {
        color: inherit;
        text-decoration: none;
    }
`;
