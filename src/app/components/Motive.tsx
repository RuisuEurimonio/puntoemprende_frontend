import React, { useEffect, useState } from "react";
import GenericTable from "./GenericTable";
import { MotiveProps } from "../data/types";
import { getAll } from "../data/api";

const Motive = () => {
  
  const [motive, setMotive] = useState<MotiveProps[] | null>(null);
  const [loading, setLoading] = useState(true);

    useEffect(()=>{
        getAll("motive").then((data)=>{
            setMotive(data);
            setLoading(false);
        })
    },[])

    const handleEditMotive = (id: number) => {
        console.log('Editar categoría con id:', id);
      };
      
      const handleDeleteMotive = (id: number) => {
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
        {motive &&
            <GenericTable
            items={motive}
            handleEdit={handleEditMotive}
            handleDelete={handleDeleteMotive}
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

export default Motive;
