import { AppProps } from "next/app";

import "../styles/main.css";
import { AppContextProvider } from "../context/AppContext";
// import { Provider as OpenTokProvider } from "../context/OpenTokContext";
import dynamic from "next/dynamic";

const OpenTokProvider = dynamic(
  // @ts-ignore
  () => import("../context/OpenTokContext").then((f) => f.Provider),
  {
    ssr: false,
  }
);

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AppContextProvider>
    <OpenTokProvider>
      <Component {...pageProps} />
    </OpenTokProvider>
  </AppContextProvider>
);

export default MyApp;
