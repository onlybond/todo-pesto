import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({weight:["100","200","300","400","500","600","700","800","900",],subsets:["latin"]})
export const metadata: Metadata = {
  title: "Todo-Pesto",
  description: "an assisnment given by pesto for profile completion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        {children}
        <ToastContainer theme="colored" stacked/>
        </body>
    </html>
  );
}
