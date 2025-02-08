import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./Components/Providers";

const inter = localFont({
  src: "./fonts/Inter-VariableFont_opsz,wght.ttf",
  weight: "100 900", // Supports the full weight range
  style: "normal",
  variable: "--font-inter", // Useful for Tailwind
});

const robotoMono = localFont({
  src: "./fonts/RobotoMono-VariableFont_wght.ttf",
  weight: "100 900",
  style: "normal",
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "MyWriter",
  description: "Bring your stories to fruition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased text-black font-robotoMono rounded`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
