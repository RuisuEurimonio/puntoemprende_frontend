
"use client"
import { usePathname, useRouter } from "next/navigation";
import Header from "./Header"; // Importamos el Header original

type HeaderWrapperProps = {
};

const HeaderWrapper: React.FC<HeaderWrapperProps> = () => {
    const path = usePathname();
    console.log(path);

  return (
    <>
      <Header logoSrc="/Logo y slogan Black.png" pageTitle="PuntoEmprende" key={path}/>
    </>
  );
};

export default HeaderWrapper;
