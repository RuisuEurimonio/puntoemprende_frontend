
"use client"
import { usePathname } from "next/navigation";
import Header from "./Header";



const HeaderWrapper = () => {
    const path = usePathname();

  return (
    <>
      <Header logoSrc="/Logo y slogan Black.png" pageTitle="PuntoEmprende" key={path}/>
    </>
  );
};

export default HeaderWrapper;
