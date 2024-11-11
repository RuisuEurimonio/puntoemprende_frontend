import Footer from "./components/Footer";
import Header from "./components/Header";
import Post from "./components/Posts";


export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header logoSrc="/Logo y slogan Black.png" pageTitle="PuntoEmprende"/>
      <main className="">
        <Post />
      </main>
      <Footer/>
    </div>
  );
}
