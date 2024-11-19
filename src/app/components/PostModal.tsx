"use client"

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryProps, ScopeProps, UserProps, PostProps } from "../data/types";
import { createApi, updateApi, getAll} from "../data/api";

type PostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  post?: PostProps; 
  onUpdate : ()=> void;
};

const publicationSchema = z.object({
  title: z.string().min(2, "El título es obligatorio"),
  price: z.number().min(1, "El precio debe ser mayor a 0").int("El precio debe ser un número entero"),
  cant: z.number().min(1, "La cantidad debe ser mayor a 0").int("La cantidad debe ser un número entero"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  image: z.string().url("Debe ser una URL válida"),
  haveSend: z.boolean(),
  scopeId: z.number().min(1, { message: 'La localidad es requerida' }),
  categoryId: z.number().min(1, { message: 'El tipo de documento es requerido' })
});

type PublicationFormData = z.infer<typeof publicationSchema>;

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose, onUpdate, post }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PublicationFormData>({
    resolver: zodResolver(publicationSchema),
  });

  const [scopes, setScopes] = useState<ScopeProps[] | null>(null);
  const [categories, setCategories] = useState<ScopeProps[] | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false); // Estado para determinar si estamos editando o creando

  const onSubmit = (data: PublicationFormData) => {
    if (userId == null) {
      throw new Error("Ha sucedido un error con tu usuario, cierra y vuelve a ingresar.");
    }

    const publicationData = {
      title: data.title,
      price: data.price,
      cant: data.cant,
      description: data.description,
      image: data.image,
      haveSend: data.haveSend,
      user: { id: userId },
      reportedStatus: { id: 1 },
      scope: { id: data.scopeId },
      category: { id: data.categoryId },
      motive: { id: 1 },
    };

    if (isEditing && post && publicationData) {
      const postUpdate = {
        "id": post.id,
        ...publicationData
      }
      updateApi("post", postUpdate, token ? token : undefined).then(()=>{
        onUpdate();
      })
    } else {
      createApi("post", publicationData, token ? token : undefined).then(()=>{
        onUpdate();
      })
    }
    onClose(); 
  };

  const getUserData = () => {
    const userStorage = localStorage.getItem("U");
    const tokenStorage = localStorage.getItem("T");
    const user: UserProps = userStorage ? JSON.parse(userStorage) : null;
    const token: string = tokenStorage ? tokenStorage : "";
    if (user && user.id && token != "") {
      setUserId(user.id);
      setToken(token);
    }
  };

  const getDatas = () => {
    getAll("scope").then((data) => {
      setScopes(data);
    });
    getAll("category").then((data) => {
      setCategories(data);
    });
  };

  const setPublicationData = () => {
    if (post) {
        setValue("title", post.title);
        setValue("price", post.price);
        setValue("cant", post.cant);
        setValue("description", post.description);
        setValue("image", post.image);
        setValue("haveSend", post.haveSend);
        setValue("scopeId", post.scope.id);
        setValue("categoryId", post.category.id);
        setIsEditing(true); 
    }
  };

  useEffect(() => {
    setIsEditing(false);
    getDatas();
    getUserData();
    if (post) {
      setPublicationData();
    }
  }, [post]);

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center" onClick={onClose}>
      <div className="bg-black p-6 rounded-lg w-96 border-white border-2 max-h-[90vh] overflow-auto" onClick={(e)=>e.stopPropagation()}>
        <h2 className="text-xl font-semibold mb-4">{isEditing ? "Editar Publicación" : "Crear Publicación"}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-main">Título</label>
            <input
              id="title"
              {...register("title")}
              className="w-full mt-2 p-2 border border-gray-300 rounded text-black"
              placeholder="Ingresa el título"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-main">Precio</label>
            <input
              id="price"
              type="number"
              {...register("price", { valueAsNumber: true })}
              className="w-full mt-2 p-2 border border-gray-300 rounded text-black"
              placeholder="Ingresa el precio"
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="cant" className="block text-sm font-medium text-main">Cantidad</label>
            <input
              id="cant"
              type="number"
              {...register("cant", { valueAsNumber: true })}
              className="w-full mt-2 p-2 border border-gray-300 rounded text-black"
              placeholder="Ingresa la cantidad"
            />
            {errors.cant && <p className="text-red-500 text-xs mt-1">{errors.cant.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-main">Descripción</label>
            <textarea
              id="description"
              {...register("description")}
              className="w-full mt-2 p-2 border border-gray-300 rounded text-black"
              placeholder="Ingresa una descripción"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-main">Imagen URL</label>
            <input
              id="image"
              type="url"
              {...register("image")}
              className="w-full mt-2 p-2 border border-gray-300 rounded text-black"
              placeholder="Ingresa la URL de la imagen"
            />
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-main">Alcance.</label>
            <select
              {...register('scopeId', { valueAsNumber: true })}
              className={`mt-1 p-2 w-full border ${errors.scopeId ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500`}
            >
              <option value="" disabled>Selecciona un tipo de documento</option>
              {scopes && scopes.map((scope: ScopeProps) => (
                <option key={scope.id} value={scope.id}>
                  {scope.name}
                </option>
              ))}
            </select>
            {errors.scopeId && <p className="text-red-500 text-sm mt-1">{errors.scopeId.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-main">Categoria.</label>
            <select
              {...register('categoryId', { valueAsNumber: true })}
              className={`mt-1 p-2 w-full border ${errors.categoryId ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500`}
            >
              <option value="" disabled>Selecciona un tipo de documento</option>
              {categories && categories.map((category: CategoryProps) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>}
          </div>
          <div className="mt-4">
            <label htmlFor="haveSend" className="block text-sm font-medium text-main">¿Realiza envíos?</label>
            <input
              id="haveSend"
              type="checkbox"
              {...register("haveSend")}
              className="mt-2"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 bg-main text-white font-semibold rounded-lg"
            >
              {isEditing ? "Actualizar" : "Publicar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default PostModal;
