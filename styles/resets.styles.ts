import { rem } from 'polished';
import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';
import type { CSS, FlexAlignment, FlexDirection, FlexWrap } from '../types/style.types';
import { activeStates, mobile, tablet } from './helpers.styles';

export const GlobalStyles = createGlobalStyle`

  @font-face {
    font-family: 'gotham-book';
    src: url('http://localhost:4000/fonts/gotham_book-webfont.eot');
    src: url('http://localhost:4000/fonts/gotham_book-webfont.eot?#iefix') format('embedded-opentype'),
      url('http://localhost:4000/fonts/gotham_book-webfont.woff2') format('woff2'),
      url('http://localhost:4000/fonts/gotham_book-webfont.woff') format('woff'),
      url('http://localhost:4000/fonts/gotham_book-webfont.ttf') format('truetype');
    font-weight: 100;
    font-style: normal;
  }

  @font-face {
    font-family: 'gotham-medium';
    src: url('http://localhost:4000/fonts/gotham-medium-webfont.eot');
    src: url('http://localhost:4000/fonts/gotham-medium-webfont.eot?#iefix') format('embedded-opentype'),
      url('http://localhost:4000/fonts/gotham-medium-webfont.woff2') format('woff2'),
      url('http://localhost:4000/fonts/gotham-medium-webfont.woff') format('woff'),
      url('http://localhost:4000/fonts/gotham-medium-webfont.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'gotham-bold';
    src: url('http://localhost:4000/fonts/gotham-bold-webfont.eot');
    src: url('http://localhost:4000/fonts/gotham-bold-webfont.eot?#iefix') format('embedded-opentype'),
      url('http://localhost:4000/fonts/gotham-bold-webfont.woff2') format('woff2'),
      url('http://localhost:4000/fonts/gotham-bold-webfont.woff') format('woff'),
      url('http://localhost:4000/fonts/gotham-bold-webfont.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }

  :root {
    --gotham: 'gotham-book', sans-serif;
    --gotham-medium: 'gotham-medium', sans-serif;
    --gotham-bold: 'gotham-bold', sans-serif;

    --red: #E50914;
    --red-hover: #7F0000;
    --gray: #757575;

    --transition-fast: .175s ease-in-out;

    --square: 5px;
  }

  ${reset};

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  button,
  a,
  input[type="submit"] {
    border: none;
    cursor: pointer;
  }

  button,
  a {
    color: inherit;
    text-decoration: none;

    ${activeStates(css`
      color: inherit;
    `)}
  }

  input[type="text"], 
  input[type="email"], 
  input[type="password"] {
    border: ${rem(`1px`)} solid black;
    transition: border var(--transition-fast);

    ${activeStates(css`
      border: ${rem(`1px`)} solid var(--red);
    `)}
  }

  #__next {
    min-height: 100vh;
    width: 100vw;
    position: relative;
    overflow-x: hidden;
    display: grid;  
    grid-template-areas:
      "header"
      "main"
      "footer";
    grid-template-rows: max-content 1fr max-content;
    background-color: black;
    color: white;
    font-family: var(--gotham)
  }

  ${[`header`, `main`, `footer`].map(
    region => css`
      .global-${region} {
        grid-area: ${region};
        padding: 0 7.5%;

        ${tablet(css`
          padding: 0 3%;
        `)}

        ${mobile(css`
          padding: 0 3%;
        `)}
      }
    `
  )}
`;

export const theme = {
  flex: (
    jc: FlexAlignment = `center`,
    ai: FlexAlignment = `center`,
    fd: FlexDirection = `row`,
    fw: FlexWrap = `nowrap`
  ): CSS => css`
    display: flex;
    justify-content: ${jc};
    align-items: ${ai};
    flex-direction: ${fd};
    flex-wrap: ${fw};
  `,
  posCenter: css`
    display: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `
};
