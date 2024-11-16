"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserProps } from "../data/types";

type HeaderProps = {
  logoSrc: string;
  pageTitle: string;
};

const Header: React.FC<HeaderProps> = ({ logoSrc, pageTitle }) => {
  // Estado para verificar si el usuario está logueado
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  const [email, setEmail] = useState<string>();

  // Verificamos el estado de autenticación al cargar el componente
  useEffect(() => {
    const user = localStorage.getItem("U"); // O donde tengas guardada la info del usuario
    const userJson = user ? JSON.parse(user) : null;
    if (user ) {
      setIsLoggedIn(true);
      setEmail(userJson.email);
    }
  }, []);

  const handleLogout = () => {
    // Elimina la información del usuario del localStorage (o contexto global)
    localStorage.removeItem("U");
    localStorage.removeItem("T");
    setIsLoggedIn(false); 
    router.push("/");
  };

  return (
    <header className="flex justify-between flex-col gap-4 items-center p-4 bg-gray-800 text-white w-full sm:flex-row">
      <Link href={"/"} className="flex items-center space-x-2">
        <Image src={logoSrc} alt="Logo" width={32} height={32} />
        <span className="text-xl font-semibold">{pageTitle}</span>
      </Link>
      <nav className="hidden sm:flex space-x-6">
        <Link href="/" className="hover:text-gray-300">
          Inicio
        </Link>
        <Link href="/business" className="hover:text-gray-300">
          Emprendimientos
        </Link>
        <Link href="/about" className="hover:text-gray-300">
          Acerca de
        </Link>
      </nav>

      <div>
        <Link href="/my-account" className="pr-5"> {email} </Link>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-main px-4 py-2 rounded hover:bg-secondary"
          >
            Cerrar Sesión
          </button>
        ) : (
          <Link href="/login" className="bg-main px-4 py-2 rounded hover:bg-secondary">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
