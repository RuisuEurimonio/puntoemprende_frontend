// components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      {/* Primera línea: Logo, Texto y Enlaces */}
      <div className="container mx-auto px-4 flex flex-col gap-3 justify-between items-center
                      lg:flex-row lg:gap-0
      ">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image src="/Logo y slogan White.png" alt="Logo" width={200} height={180} />
        </div>

        <p className="text-sm text-gray-400 max-w-xl text-justify">
        Punto Emprende es un espacio diseñado para ser el punto de encuentro virtual de todos los emprendimientos. Aquí, los emprendedores pueden dar visibilidad a sus productos y servicios, alcanzando un público más amplio y mejorando su posicionamiento en el mercado. Al mismo tiempo, los usuarios tienen acceso fácil y rápido a una amplia gama de emprendimientos, desde los más innovadores hasta los más consolidados, todo en un solo lugar. Nuestro lema es claro: "Calidad en un solo lugar", un espacio donde la variedad, la accesibilidad y la calidad convergen para ofrecer lo mejor de cada emprendimiento.
        </p>

        <ul className="flex flex-col md:text-lg list-disc">
          <li><Link href="/about" className="hover:text-gray-300">Acerca de</Link></li>
          <li><Link href="/contact" className="hover:text-gray-300">Contacto</Link></li>
          <li><Link href="/privacy" className="hover:text-gray-300">Privacidad</Link></li>
        </ul>
      </div>

      {/* Segunda línea: Redes sociales y Copyright */}
      <div className="container mx-auto px-4 mt-8 text-center">
        {/* Redes sociales */}
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="https://facebook.com" className="text-gray-400 hover:text-white" target="_blank">Facebook</Link>
          <Link href="https://twitter.com" className="text-gray-400 hover:text-white" target="_blank">Twitter</Link>
          <Link href="https://instagram.com" className="text-gray-400 hover:text-white" target="_blank">Instagram</Link>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-400">
          &copy; 2024 Punto Emprende. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
