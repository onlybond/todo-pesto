import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import StoreProvider from "@/providers/StoreProvider";
import Nav from "@/components/Nav";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Nav />
          {children}
          <Toaster richColors />
        </StoreProvider>
      </body>
    </html>
  );
}
