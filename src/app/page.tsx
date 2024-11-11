import Footer from "./components/Footer";
import Header from "./components/Header";


export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen pb-20 font-[family-name:var(--font-geist-sans)]">
      <Header logoSrc="/Logo y slogan Black.png" pageTitle="PuntoEmprende"/>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      </main>
      <Footer/>
    </div>
  );
}
