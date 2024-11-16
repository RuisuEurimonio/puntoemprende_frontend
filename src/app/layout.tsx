import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer";
import HeaderWrapper from "./components/HeaderWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PuntoEmprende",
  description: 'Punto Emprende es un espacio diseñado para ser el punto de encuentro virtual de todos los emprendimientos. Aquí, los emprendedores pueden dar visibilidad a sus productos y servicios, alcanzando un público más amplio y mejorando su posicionamiento en el mercado. Al mismo tiempo, los usuarios tienen acceso fácil y rápido a una amplia gama de emprendimientos, desde los más innovadores hasta los más consolidados, todo en un solo lugar. Nuestro lema es claro: "Calidad en un solo lugar", un espacio donde la variedad, la accesibilidad y la calidad convergen para ofrecer lo mejor de cada emprendimiento.',
  icons: {icon: "/public/Logo-y-slogan-White.ico"}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <head>
      <link rel="icon" href="/public/Logo-y-slogan-White.ico" type="image/x-icon" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HeaderWrapper/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
