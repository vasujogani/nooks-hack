import { AppProps } from "next/app";

import "../styles/main.css";
import { AppContextProvider } from "../context/AppContext";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AppContextProvider>
    <Component {...pageProps} />
  </AppContextProvider>
);

export default MyApp;
