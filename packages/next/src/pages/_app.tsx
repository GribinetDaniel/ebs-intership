import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { Layout } from "@/components/Layout";
import { Container } from "@/components/Container";

export default function App({ Component, pageProps }: AppProps) {
 return (
  <Layout>
   <Container>
    <Component {...pageProps} />
   </Container>
  </Layout>
 );
}
