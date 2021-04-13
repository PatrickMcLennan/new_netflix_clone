import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { apolloBrowserClient } from '../clients/browserGraphql.client';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { GlobalStyles, theme } from '../styles/resets.styles';

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloBrowserClient}>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </ApolloProvider>
  );
}
