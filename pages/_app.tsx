
import { StyleProvider, ThemePicker } from "vcc-ui";
import React from "react";
import { AppProps} from 'next/app'
import "../public/css/styles.css";


function MyApp({ Component, pageProps }: AppProps){
  return (
    <React.StrictMode>
    <StyleProvider>
      <ThemePicker variant="light">
      <Component {...pageProps} />
      </ThemePicker>
    </StyleProvider>
    </React.StrictMode>
  );
}

export default MyApp;
