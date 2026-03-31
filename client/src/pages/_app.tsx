import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { BookingProvider } from "./page/context/BookingContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Navbar />
    <BookingProvider>
      <Component {...pageProps} />;
    </BookingProvider>
    <Footer />
    </>
  );
}
