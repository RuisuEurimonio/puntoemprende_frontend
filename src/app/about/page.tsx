"use client"

import React, { useEffect, useState } from "react";
import { SystemProps } from "../data/types";
import { getAll } from "../data/api";

const AboutUs = () => {

  const [systemInfo, setSystemInfo] = useState<SystemProps[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAll("system")
      .then((response) => {
        setSystemInfo(response);
        
      })
    setLoading(false);
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto px-6 lg:px-20">
        <h1 className="text-4xl font-bold text-center text-main mb-8">
          Sobre Nosotros
        </h1>
        <div className="text-lg text-gray-300 space-y-6">
          <p>
            En <span className="font-semibold text-main">PuntoEmprende</span>, 
            trabajamos para apoyar el crecimiento y la visibilidad de los emprendedores locales. 
            Entendemos que cada negocio tiene una historia única, y nuestra misión es darle un lugar 
            en el mundo digital donde pueda ser descubierto por quienes más lo necesitan.
          </p>
          <p>
            Nuestro equipo se dedica a crear una plataforma que simplifique la conexión entre 
            usuarios y emprendedores, garantizando una experiencia amigable y efectiva para ambas partes. 
            Creemos que los pequeños negocios son el corazón de las comunidades, y estamos comprometidos a 
            ayudarlos a prosperar.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-main mb-4">Visión</h2>
            <p className="text-gray-700">
              En *PuntoEmprende*, soñamos con un mundo en el que los emprendedores locales no solo 
              sobrevivan, sino que prosperen, impulsados por la tecnología y el apoyo comunitario.  
              Aspiramos a ser la plataforma líder en el descubrimiento de negocios locales, donde cualquier 
              persona pueda encontrar soluciones innovadoras y personalizadas cerca de su hogar.
            </p>
            <p className="text-gray-700 mt-4">
              Queremos inspirar una nueva cultura de consumo consciente, fomentando el desarrollo de 
              economías locales, conectando a las personas con productos y servicios que reflejen la 
              creatividad, el esfuerzo y la dedicación de los emprendedores.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-main mb-4">Misión</h2>
            <p className="text-gray-700">
              Nuestra misión es proporcionar una plataforma inclusiva y accesible donde los emprendedores 
              puedan mostrar su talento, sus productos y servicios, sin barreras ni complicaciones. Queremos 
              ofrecer a los usuarios una experiencia personalizada que les permita descubrir y apoyar negocios 
              locales que realmente marquen la diferencia.
            </p>
            <p className="text-gray-700 mt-4">
              Nos comprometemos a empoderar a los emprendedores con herramientas digitales que les permitan 
              alcanzar su máximo potencial, mientras ayudamos a los usuarios a tomar decisiones de compra más 
              informadas y conectadas con sus valores. En *PuntoEmprende*, construimos un puente sólido entre 
              las necesidades de las personas y las soluciones que los emprendedores tienen para ofrecer.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-12">
          <h2 className="text-3xl font-bold text-center text-main mb-6">
            Sobre el Sistema
          </h2>
          {loading ? (
            <p className="text-center text-gray-500">Cargando información del sistema...</p>
          ) : systemInfo && systemInfo.length > 0 ? (
            <div className="space-y-6">
              {systemInfo.map((system) => (
                <div
                  key={system.id}
                  className="p-6 rounded-lg shadow-md text-center"
                >
                  <h3 className="text-xl font-bold text-gray-300 mb-2">
                    {system.name}
                  </h3>
                  <p className="text-gray-400">{system.description}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Nota: {system.note}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No hay información disponible sobre el sistema.
            </p>
          )}
        </div>
    </section>
  );
};

export default AboutUs;
