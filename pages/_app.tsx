import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { MathJaxContext } from "better-react-mathjax";
import { AppProps } from "next/app";
import Head from "next/head";
import theme from "../src/theme/theme";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <AppCacheProvider {...props}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <MathJaxContext>
          <Component {...pageProps} />
        </MathJaxContext>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
