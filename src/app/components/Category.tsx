import React, { useEffect, useState } from "react";
import GenericTable from "./GenericTable";
import { CategoryProps } from "../data/types";
import { getAll } from "../data/api";

const Category = () => {
  
  const [categories, setCategories] = useState<CategoryProps[] | null>(null);
  const [loading, setLoading] = useState(true);

    useEffect(()=>{
        getAll("category").then((data)=>{
            setCategories(data);
            setLoading(false);
        })
    },[])

    const handleEditCategory = (id: number) => {
        console.log('Editar categoría con id:', id);
      };
      
      const handleDeleteCategory = (id: number) => {
        console.log('Eliminar categoría con id:', id);
      };

    if (loading) {
        return (
          <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-900 h-20 w-20"></div>
          </div>
        );
      }

  return (
    <div>
        {categories &&
            <GenericTable
            items={categories}
            handleEdit={handleEditCategory}
            handleDelete={handleDeleteCategory}
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'name', label: 'Nombre' },
              { key: 'description', label: 'Descripción' },
            ]}
          />
        }
    </div>
  );
};

export default Category;
