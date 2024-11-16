"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '../data/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'El correo es requerido' })  
    .email({ message: 'Ingrese un correo válido' }),
  password: z
    .string()
    .min(1, { message: 'La contraseña es requerida' })  
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

// Define el tipo de los datos del formulario
type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const onSubmit = (data: LoginFormData) => {
     login(data.email, data.password).then((data)=>{
      localStorage.setItem("T", data.Token);
      localStorage.setItem("U", JSON.stringify(data.User));
      router.push("/")
     })
  };

  return (
    <div className="max-w-md my-[20vh] mx-auto p-8 border border-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          className="w-full bg-main text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Iniciar Sesión
        </button>
      </form>
      <p className='text-right mt-2'> ¿No tienes una cuenta?, <Link href="/register" className="underline text-main"> registrate aqui. </Link> </p>
    </div>
  );
};

export default LoginForm;
