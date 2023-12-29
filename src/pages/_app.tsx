import SolanaProvider from "@/components/providers/solanaProvider";
import { ThemeProvider } from "@/components/providers/themeProvider";
import "@/styles/globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SolanaProvider>
        <Component {...pageProps} />
      </SolanaProvider>
    </ThemeProvider>
  );
}
