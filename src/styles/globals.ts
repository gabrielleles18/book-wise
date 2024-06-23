import { createGlobalStyle } from 'styled-components';
import {theme} from "@/styles/themes/default";

export const GlobalStyle = createGlobalStyle`
    /* Estilizando a barra de rolagem */
    ::-webkit-scrollbar {
        width: 6px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #181C2A;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #252D4A;
        border-radius: 4px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #252D4A;
    }
    
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
