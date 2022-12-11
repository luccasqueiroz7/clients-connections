import styled, { createGlobalStyle } from "styled-components";

export const Main = styled.main`
  background-color: var(--black-1);
`;

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
    }
    ul,ol,li{
        list-style: none;
    }
    button {
        outline: none;
        cursor: pointer;
    }
    body {
        min-width: 100vw;
        min-height: 100vh;
        background-color: var(--black-1);
    }
    :root {
        --white:  #fbfcfd;
        --grey-1: #d0d9e0;
        --grey-2: #a4a9ad;
        --grey-3: #666666;
        --grey-4: #343b41;
        --grey-5: #868e96;
        --grey-6: #212529;
        --black:  #000000;
        --black-1: #121214;
        --blue-1: #f6f8f9;
        --blue-2: #f4f4fc;
        --blue-3: #d3e1f1;
        --blue-4: #a1c3ed;
        --blue-5: #6aa0e3;
        --blue-6: #4178bc;
        --pink: #ff577f;
    }
`;
