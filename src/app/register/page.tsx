"use client";

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getAll, registerUser } from '../data/api'; // Asume que tienes una función registerUser para registrar al usuario
import { useRouter } from 'next/navigation';
import { UserProps } from '../data/types';
import { fireToast } from '../utils/alerts';

// Define el esquema de validación con Zod
const registerSchema = z.object({
  name: z.string().min(1, { message: 'El nombre es requerido' }),
  lastName: z.string().min(1, { message: 'El apellido es requerido' }),
  email: z
    .string()
    .min(1, { message: 'El correo es requerido' })
    .email({ message: 'Ingrese un correo válido' }),
  business: z.string().optional(),
  address: z.string().min(1, { message: 'La dirección es requerida' }),
  document: z.string().min(1, { message: 'El número de documento es requerido' }),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
  townId: z.number().min(1, { message: 'La localidad es requerida' }),
  typeDocumentId: z.number().min(1, { message: 'El tipo de documento es requerido' })
});

type RegisterFormData = z.infer<typeof registerSchema>;


const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
} = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
});

  const router = useRouter();

  const [towns, setTowns] = useState<any[]>([]); // Para almacenar las localidades
  const [typesDocument, setTypesDocument] = useState<any[]>([]); // Para almacenar los tipos de documento

  // Cargar localidades y tipos de documento desde la API
  useEffect(() => {
    const fetchTownsAndTypes = async () => {
        getAll("town").then((data)=>{
            setTowns(data);
        });
        getAll("typedocument").then((data)=>{
            setTypesDocument(data);
        })
    };

    fetchTownsAndTypes();
  }, []);

  const onSubmit = (data: RegisterFormData) => {
    console.log("hola")
    const user : UserProps = {
        "name": data.name,
        "lastName": data.lastName,
        "email": data.email,
        "address": data.address,
        "document": data.document,
        "password": data.password,
        "isAutenticated": false,
        "town": {
            "id": data.townId
        },
        "typeDocument": {
            "id": data.typeDocumentId
        }
    }
    if(data.business &&data.business.length > 0){
        user.business = data.business;
    }
    registerUser(user).then((response)=>{
      if(response != null){
        fireToast("success", "Usuario creado");
        router.push("/login")
      }
    });
  };

  return (
    <div className="max-w-4xl my-[10vh] mx-auto p-8 border border-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Crear Cuenta</h2>
      <form onSubmit={handleSubmit(onSubmit, (formErrors) => console.log("Errores de formulario:", formErrors))}>
        {/* Campos de texto */}
        <div>
          <label className="block text-sm font-medium text-main">Nombre</label>
          <input
            type="text"
            {...register('name')}
            className={`mt-1 p-2 w-full border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-main mt-0">Apellido</label>
          <input
            type="text"
            {...register('lastName')}
            className={`mt-1 p-2 w-full border ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-main">Correo Electrónico</label>
          <input
            type="email"
            {...register('email')}
            className={`mt-1 p-2 w-full border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-main">Nombre del Negocio</label>
          <input
            type="text"
            {...register('business')}
            className={`mt-1 p-2 w-full border ${
              errors.business ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500`}
          />
          {errors.business && (
            <p className="text-red-500 text-sm mt-1">{errors.business.message}</p>
          )}
        </div>

        {/* Campos de lista desplegable */}
        <div>
          <label className="block text-sm font-medium text-main">Localidad</label>
          <select
            {...register('townId', {valueAsNumber: true})}
            className={`mt-1 p-2 w-full border ${
              errors.townId ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Selecciona una localidad</option>
            {towns.map((town) => (
              <option key={town.id} value={town.id}>
                {town.name}
              </option>
            ))}
          </select>
          {errors.townId && (
            <p className="text-red-500 text-sm mt-1">{errors.townId.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-main">Tipo de Documento</label>
          <select
            {...register('typeDocumentId',{ valueAsNumber: true})}
            className={`mt-1 p-2 w-full border ${
              errors.typeDocumentId ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Selecciona un tipo de documento</option>
            {typesDocument.map((typeDoc) => (
              <option key={typeDoc.id} value={typeDoc.id}>
                {typeDoc.name}
              </option>
            ))}
          </select>
          {errors.typeDocumentId && (
            <p className="text-red-500 text-sm mt-1">{errors.typeDocumentId.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-main">Dirección</label>
          <input
            type="text"
            {...register('address')}
            className={`mt-1 p-2 w-full border ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500`}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-main">Número de Documento</label>
          <input
            type="text"
            {...register('document')}
            className={`mt-1 p-2 w-full border ${
              errors.document ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500`}
          />
          {errors.document && (
            <p className="text-red-500 text-sm mt-1">{errors.document.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-main">Contraseña</label>
          <input
            type="password"
            {...register('password')}
            className={`mt-1 p-2 w-full border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Crear Cuenta
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
