import Navbar from "@/components/Navbar";
import SolanaProvider from "@/components/providers/solanaProvider";
import { ThemeProvider } from "@/components/providers/themeProvider";
import "@/styles/globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import type { AppProps } from "next/app";
import { Toaster } from "@/components/ui/sonner";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SolanaProvider>
        <Navbar />
        <Component {...pageProps} />
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20 -z-10"
        >
          <div className="blur-[106px] h-56 bg-gradient-to-br to-purple-400 from-blue-700"></div>
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-indigo-600"></div>
        </div>
      </SolanaProvider>
      <Toaster />
    </ThemeProvider>
  );
}
