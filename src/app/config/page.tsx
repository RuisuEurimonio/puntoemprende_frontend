"use client"

import React, { useEffect, useState } from 'react';
import Category from '../components/Category';
import Motive from '../components/Motive';
import Scope from '../components/Scope';
import TableUser from '../components/TableUsers';
import { getUserFromLocal } from '../utils/localStorage';
import { useRouter } from 'next/navigation';

// Importa los componentes para cada sección

const SettingsPage: React.FC = () => {
  // Estado para rastrear la sección activa
  const [activeSection, setActiveSection] = useState<string>('profile');
    const router = useRouter();
  // Función para renderizar el componente correcto
  const renderSection = () => {
    switch (activeSection) {
      case 'users':
        return <TableUser />;
      case 'category':
        return <Category/>;
      case 'motive':
        return <Motive/>;
      case 'scope':
        return <Scope/>;
      default:
        return <p className="text-gray-600">Selecciona una opción del menú para comenzar.</p>;
    }
  };

  useEffect(()=>{
    const user = getUserFromLocal();
    if(user && user.permission?.id == 2){
        return;
    }
    router.push("/")
  },[])

  return (
    <div className="min-h-screen">
      {/* Encabezado */}
      <header className="bg-black border-white border-y-2 shadow">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-secondary">Configuración</h1>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Menú lateral */}
          <aside className="bg-white p-4 shadow rounded-lg">
            <nav>
              <ul>
                <li className="mb-4">
                  <button
                    onClick={() => setActiveSection('users')}
                    className={`text-blue-600 hover:underline ${
                      activeSection === 'users' ? 'font-bold' : ''
                    }`}
                  >
                    Usuarios.
                  </button>
                </li>
                <li className="mb-4">
                  <button
                    onClick={() => setActiveSection('category')}
                    className={`text-blue-600 hover:underline ${
                      activeSection === 'category' ? 'font-bold' : ''
                    }`}
                  >
                    Categorias.
                  </button>
                </li>
                <li className="mb-4">
                  <button
                    onClick={() => setActiveSection('motive')}
                    className={`text-blue-600 hover:underline ${
                      activeSection === 'motive' ? 'font-bold' : ''
                    }`}
                  >
                    Motivos de reporte.
                  </button>
                </li>
                <li className="mb-4">
                  <button
                    onClick={() => setActiveSection('scope')}
                    className={`text-blue-600 hover:underline ${
                      activeSection === 'scope' ? 'font-bold' : ''
                    }`}
                  >
                    Alcance de publicaciones.
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Contenido de configuración */}
          <section className="col-span-3 bg-white p-6 shadow rounded-lg">
            {renderSection()}
          </section>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
