import { createGlobalStyle } from 'styled-components';
import {defaultTheme} from "@/styles/themes/default";

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
        font-family: ${defaultTheme['font-family']};
    }

    input, button, textarea, select {
        font-family: ${defaultTheme['font-family']};
    }

    a {
        color: inherit;
        text-decoration: none;
    }
`;
