'use client'
import type { Metadata } from "next";
import { Inter, Lexend_Deca, Roboto } from "next/font/google";
import "../globals.css";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["italic", "normal"],
});
const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  variable: "--font-lexendDeca",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()

  useEffect(() => {
    if (!auth.currentUser) {
        router.push('/login')
    }
  }, [auth.currentUser]);

  return (
    <html lang="en">
      <body
        className={`${inter.className} ${roboto.variable} ${lexendDeca.variable}`}
      >
        <link
          rel="icon"
          href="/taytayan-logo.svg"
          sizes="any"
        />
        {children}
      </body>
    </html>
  );
}
