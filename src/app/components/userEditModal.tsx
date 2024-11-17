"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserProps } from "../data/types";
import { getById } from "../data/api";

const schema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  lastName: z.string().min(1, "El apellido es obligatorio"),
  business: z.string().optional(),
  address: z.string().optional(),
  document: z.string().min(1, "El documento es obligatorio"),
});

type FormData = z.infer<typeof schema>;

type UserEditModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
};

const UserEditModal: React.FC<UserEditModalProps> = ({
  isModalOpen,
  closeModal,
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    const userStorage = localStorage.getItem("U");
    const userJson: UserProps = userStorage ? JSON.parse(userStorage) : null;
    if (userJson && userJson.id) {
      getById("user", userJson.id).then((data) => {
        setUser(data);
        setValue("name", data.name);
        setValue("lastName", data.lastName);
        setValue("business", data.business || "");
        setValue("address", data.address || "");
        setValue("document", data.document);
      });
      console.log(user);
    }
  }, [setValue]);
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black p-6 rounded-lg shadow-lg max-w-md w-full relative border-white border-2">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
        <h3 className="text-lg font-bold mb-4 text-main">Editar Información</h3>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm text-main font-semibold">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg text-black"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm text-main font-semibold">
              Apellido
            </label>
            <input
              id="lastName"
              type="text"
              {...register("lastName")}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg text-black"
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
          </div>

          <div>
            <label htmlFor="business" className="block text-sm text-main font-semibold">
              Negocio
            </label>
            <input
              id="business"
              type="text"
              {...register("business")}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg text-black"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm text-main font-semibold">
              Dirección
            </label>
            <input
              id="address"
              type="text"
              {...register("address")}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg text-black"
            />
          </div>

          <div>
            <label htmlFor="document" className="block text-sm text-main font-semibold">
              Documento
            </label>
            <input
              id="document"
              type="text"
              {...register("document")}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg text-black"
            />
            {errors.document && (
              <p className="text-red-500 text-xs mt-1">{errors.document.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 px-4 rounded-lg mt-6 hover:bg-green-600"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserEditModal;
