import React, { useEffect, useState } from "react";
import GenericTable from "./GenericTable";
import { ScopeProps } from "../data/types";
import { getAll } from "../data/api";

const Scope = () => {
  
  const [scope, setScope] = useState<ScopeProps[] | null>(null);
  const [loading, setLoading] = useState(true);

    useEffect(()=>{
        getAll("scope").then((data)=>{
            setScope(data);
            setLoading(false);
        })
    },[])

    const handleEditScope = (id: number) => {
        console.log('Editar categoría con id:', id);
      };
      
      const handleDeleteScope = (id: number) => {
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
        {scope &&
            <GenericTable
            items={scope}
            handleEdit={handleEditScope}
            handleDelete={handleDeleteScope}
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

export default Scope;
