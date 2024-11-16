"use client";

import React, { useEffect, useState } from "react";
import { UserProps } from "../data/types";
import { getById } from "../data/api";
import UserEditModal from "../components/userEditModal";
import Link from "next/link";
import { getUserFromLocal } from "../utils/localStorage";
import PublicationPerUser from "../components/PublicationsPerUser";

const MyAccountPage: React.FC = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const userJson : UserProps = getUserFromLocal();
    if(userJson && userJson.id){
      getById("user", userJson.id).then((data)=>{
        setUser(data);
        setIsLoading(false);
      })
    }
  }, []);

  const handleModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  const handleDeleteAccount = () => {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar tu cuenta?");
    if (confirmDelete) {
      console.log("Cuenta eliminada");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        {!isLoading && user ? (
          <>
            <div className="flex items-center space-x-4">
              <div className="bg-main text-white w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold uppercase">
                {user.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                  {user.name} {user.lastName}
                </h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-black">
              <p>
                <strong className="text-main">Negocio:</strong> {user.business || "No especificado"}
              </p>
              <p>
                <strong className="text-main">Dirección:</strong> {user.address || "No especificada"}
              </p>
              <p>
                <strong className="text-main">Documento:</strong> {user.document}
              </p>
              <p>
                <strong className="text-main">Ciudad:</strong> {user.town?.name || "No especificada"}
              </p>
              <p>
                <strong className="text-main">País:</strong> {user.town?.country?.name || "No especificado"}
              </p>
              <p>
                <strong className="text-main">Prefijo País:</strong> {user.town?.country?.prefix || "No especificado"}
              </p>
              <p>
                <strong className="text-main">Tipo de Documento:</strong> {user.typeDocument?.name || "No especificado"}
              </p>
              <p>
                <strong className="text-main">Prefijo Documento:</strong> {user.typeDocument?.prefix || "No especificado"}
              </p>
              <p>
                <strong className="text-main">Descripción del Documento:</strong> {user.typeDocument?.description || "No especificada"}
              </p>
              <p>
                <strong className="text-main">Permiso:</strong> {user.permission?.name || "No especificado"}
              </p>
              <p>
                <strong className="text-main">Autenticado:</strong> {user.isAutenticated ? "Sí" : "No"}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-800">Redes Sociales</h2>
              <div className="mt-4 space-y-2">
                {user && user.socialMedia?.map((social) => (
                  <div key={social.id} className="flex items-center flex-col justify-between bg-gray-100 p-2 rounded-md text-black
                                                  md:flex-row
                  ">
                    <h3 className="font-bold">{social.name}</h3>
                    <p>{social.description}</p>
                    <Link href={social.link} target="_blank" rel="noopener noreferrer">
                      {social.link}
                    </Link>
                    <button className="text-red-500 hover:underline">Eliminar</button>
                  </div>
                ))}
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Agregar Red Social</button>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={handleModalVisible}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Editar Información
              </button>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Eliminar Cuenta
              </button>
            </div>
            {user && user.id && <PublicationPerUser idUser={user.id} />}
          </>
        ) : (
          <p>Cargando información del usuario...</p>
        )}
      </div>

      {/* Modal */}
      <UserEditModal isModalOpen={modalVisible} closeModal={handleModalVisible} />
    </div>
  );
};

export default MyAccountPage;
