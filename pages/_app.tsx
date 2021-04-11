import { ThemeProvider } from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { GlobalStyles, theme } from '../styles/resets.styles';

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}
