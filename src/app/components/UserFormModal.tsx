import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PermissionProps, TownProps, TypeDocumentProps, UserProps } from "../data/types";
import { getAll } from "../data/api";

// Esquema de validación con Zod
const userSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  lastName: z.string().min(1, { message: "El apellido es obligatorio" }),
  email: z.string().email({ message: "El correo electrónico no es válido" }),
  business: z.string().nullable().optional(),
  address: z.string().optional(),
  document: z.string().min(1, { message: "El documento es obligatorio" }),
  town: z.object({ id: z.number().min(1) }),
  typeDocument: z.object({ id: z.number().min(1), }),
  permission: z.object({ id: z.number().min(1),}).nullable(),
  isisAutenticated: z.boolean()});

type UserModalFormProps = {
    user? : UserProps
    isOpen : boolean,
    handleModal : ()=> void
}
const UserFormModal : React.FC<UserModalFormProps> = ({isOpen, handleModal, user}) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<UserProps>({
    resolver: zodResolver(userSchema),
  });

  const [city, setCity] = useState<TownProps[] | null>(null);
  const [typeDocument, setTypeDocument] = useState<TypeDocumentProps[] | null>(null);
  const [permission, setPermission] = useState<PermissionProps[] | null>(null);

  const onSubmit = (data: UserProps) => {
    console.log(data);
    handleModal();
  };

  const getValues = () => {
    getAll("town").then((data)=>{
      setCity(data);
    })
    getAll("typedocument").then((data)=>{
      setTypeDocument(data);
    })
    getAll("permission").then((data)=>{
      setPermission(data);
    })
  }

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("lastName", user.lastName);
      setValue("email", user.email);
      setValue("business", user.business || "");
      setValue("address", user.address || "");
      setValue("document", user.document);
      setValue("password", user.password);
      setValue("town", user.town);
      setValue("typeDocument", user.typeDocument);
      setValue("permission", user.permission || null);
      setValue("isAutenticated", user.isAutenticated);
    }
    getValues();
  }, [user, setValue]);

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50" onClick={handleModal}>
          <div className="bg-black border-2 border-white p-6 rounded-lg w-full max-w-md" onClick={(e)=> e.stopPropagation()}>
            <button
              onClick={handleModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              X
            </button>
            <h2 className="text-2xl font-semibold mb-4">Formulario de Usuario</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
            <div>
              <label className="text-main" htmlFor="name">Nombre</label>
              <input
                id="name"
                {...register("name")}
                className="w-full p-2 border rounded"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <label className="text-main" htmlFor="lastName">Apellido</label>
              <input
                id="lastName"
                {...register("lastName")}
                className="w-full p-2 border rounded"
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>

            <div>
              <label className="text-main" htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full p-2 border rounded"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-main" htmlFor="business">Negocio</label>
              <input
                id="business"
                {...register("business")}
                className="w-full p-2 border rounded"
              />
              {errors.business && <p className="text-red-500 text-sm">{errors.business.message}</p>}
            </div>

            <div>
              <label className="text-main" htmlFor="address">Dirección</label>
              <input
                id="address"
                {...register("address")}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="text-main" htmlFor="document">Documento</label>
              <input
                id="document"
                {...register("document")}
                className="w-full p-2 border rounded"
              />
              {errors.document && <p className="text-red-500 text-sm">{errors.document.message}</p>}
            </div>

            <div>
              <label className="text-main" htmlFor="isAutenticated">Autenticado</label>
              <input
                id="isAutenticated"
                type="checkbox"
                {...register("isAutenticated")}
                className="w-4 h-4"
              />
            </div>

            <div>
              <label className="text-main" htmlFor="town">Ciudad</label>
              <select
                id="town"
                {...register("town.id")}
                className="w-full p-2 border rounded"
              >
                <option value="">Seleccionar ciudad</option>
                {city && city.map((typeDoc) => (
              <option key={typeDoc.id} value={typeDoc.id}>
                {typeDoc.name}
              </option>
            ))}
                
              </select>
              {errors.town && <p className="text-red-500 text-sm">{errors.town.message}</p>}
            </div>

            <div>
              <label className="text-main" htmlFor="typeDocument">Tipo de Documento</label>
              <select
                id="typeDocument"
                {...register("typeDocument.id")}
                className="w-full p-2 border rounded"
              >
                <option value="">Seleccionar tipo de documento</option>
                {typeDocument && typeDocument.map((typeDoc) => (
              <option key={typeDoc.id} value={typeDoc.id}>
                {typeDoc.name}
              </option>
            ))}
              </select>
              {errors.typeDocument && <p className="text-red-500 text-sm">{errors.typeDocument.message}</p>}
            </div>

            <div>
              <label className="text-main" htmlFor="permission">Permiso</label>
              <select
                id="permission"
                {...register("permission.id")}
                className="w-full p-2 border rounded"
              >
                <option value="">Seleccionar permiso</option>
                {permission && permission.map((typeDoc) => (
              <option key={typeDoc.id} value={typeDoc.id}>
                {typeDoc.name}
              </option>
            ))}
              </select>
              {errors.permission && <p className="text-red-500 text-sm">{errors.permission.message}</p>}
            </div>

              <div>
              <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                  {user ? "Actualizar" : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFormModal;
