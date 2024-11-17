"use client"

import React, { useEffect, useState } from 'react';
import { UserProps } from '../data/types';
import { getAll } from '../data/api';

type TableUserProps = {
  
}

const TableUser: React.FC<TableUserProps> = () => {

    const [users, setUser] = useState<UserProps[] | null>(null);

  const handleEdit = () => {

  }

  const handleDelete = () => {
    
  }

    useEffect(()=>{
        getAll("user").then((data)=>{
            setUser(data);
        })
    },[])

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="text-black bg-main">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Business</th>
            <th className="py-2 px-4 border-b">Permission</th>
            <th className="py-2 px-4 border-b">Authenticated</th>
            <th className="py-2 px-4 border-b">Editar</th>
            <th className="py-2 px-4 border-b">Actualizar</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((item) => (
            <tr key={item.id} className="odd:bg-gray-200 even:bg-gray-50 hover:bg-gray-200 text-black">
              <td className="py-2 px-4 border-b">{item.id}</td>
              <td className="py-2 px-4 border-b">{item.name}</td>
              <td className="py-2 px-4 border-b">{item.lastName}</td>
              <td className="py-2 px-4 border-b">{item.email}</td>
              <td className="py-2 px-4 border-b">{item.business}</td>
              <td className="py-2 px-4 border-b">{item.permission?.name}</td>
              <td className="py-2 px-4 border-b">{item.isAutenticated ? 'Yes' : 'No'}</td>
              <td className="py-2 px-6 border-b text-center">
              <button
                onClick={() => handleEdit()}
                className="text-blue-500 hover:text-blue-700"
              >
                Editar
              </button>
            </td>
            <td className="py-2 px-6 border-b text-center">
              <button
                onClick={() => handleDelete()}
                className="text-red-500 hover:text-red-700"
              >
                Eliminar
              </button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUser;
