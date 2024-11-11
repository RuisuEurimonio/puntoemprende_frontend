// components/Header.tsx
import Link from "next/link";
import Image from "next/image";
import React from "react";

type HeaderProps = {
  logoSrc: string;
  pageTitle: string;
};

const Header: React.FC<HeaderProps> = ({ logoSrc, pageTitle }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center space-x-2">
        <Image src={logoSrc} alt="Logo" width={32} height={32} />
        <span className="text-xl font-semibold">{pageTitle}</span>
      </div>
      <nav className="hidden md:flex space-x-6">
        <Link href="/" className="hover:text-gray-300">
          Inicio
        </Link>
        <Link href="/about" className="hover:text-gray-300">
          Acerca de
        </Link>
        <Link href="/services" className="hover:text-gray-300">
          Servicios
        </Link>
      </nav>

      <div>
        <Link href="/login" className="bg-main px-4 py-2 rounded hover:bg-secondary">
            Iniciar Sesión
        </Link>
      </div>
      
    </header>
  );
};

export default Header;
