import { Layout } from "@/components/Layout";
import "@/styles/globals.css";

import React from "react";

interface RootLayoutProps {
 children: React.ReactNode;
}

export const metadata = {
 title: "Next.js",
};

export default function RootLayout({ children }: RootLayoutProps) {
 return (
  <html lang="en">
   <body>
    <Layout>{children}</Layout>
   </body>
  </html>
 );
}
