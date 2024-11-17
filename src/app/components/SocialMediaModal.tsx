import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SocialMediaProps } from '../data/types';
import { updateApi } from '../data/api';

// Definir el esquema Zod para la validación
const socialSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  description: z.string().min(1, { message: "La descripción es obligatoria" }),
  link: z.string().url({ message: "El enlace debe ser válido" }),
});

// Tipo basado en el esquema Zod
type SocialMediaModalType = z.infer<typeof socialSchema>;

interface SocialMediaModalProps {
  socialToEdit?: SocialMediaProps;
  onClose: () => void;
  onUpdate: () => void;
  idUser: number;
}

const SocialMediaModal: React.FC<SocialMediaModalProps> = ({
  socialToEdit,
  onClose,
  onUpdate,
  idUser
}) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<SocialMediaModalType>({
    resolver: zodResolver(socialSchema),
  });

  useEffect(() => {
    if (socialToEdit) {
      setValue('name', socialToEdit.name);
      setValue('description', socialToEdit.description);
      setValue('link', socialToEdit.link);
    }
  }, [socialToEdit, setValue]);

  const onSubmit = async (data: SocialMediaModalType) => {
    const social = {
        "name": data.name,
        "description": data.description,
        "link": data.link
    }
    const userUpdate = {
        "id": idUser,
        "socialMedia": [social]
    }
      if (socialToEdit) {
        const socialWithId = {
            ...social,
            "id": socialToEdit.id
        }
        updateApi("social-media", socialWithId);
      }else{
        updateApi("user", userUpdate);
      }
      reset(); 
      onUpdate();
      onClose(); 
    
  };

  return (
    
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-main">
              {socialToEdit ? 'Actualizar Red Social' : 'Crear Red Social'}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-main">
                  Nombre
                </label>
                <input
                  {...register('name')}
                  id="name"
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-main">
                  Descripción
                </label>
                <textarea
                  {...register('description')}
                  id="description"
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="link" className="block text-sm font-semibold text-main">
                  Enlace
                </label>
                <input
                  {...register('link')}
                  id="link"
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                />
                {errors.link && <p className="text-red-500 text-xs">{errors.link.message}</p>}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-red-600 text-white p-2 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  {socialToEdit ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
  );
};

export default SocialMediaModal;
