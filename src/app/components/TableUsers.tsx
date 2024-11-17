"use client"

import React, { useEffect, useState } from 'react';
import { UserProps } from '../data/types';
import { getAll } from '../data/api';
import UserFormModal from './UserFormModal';

type TableUserProps = {
  
}

const TableUser: React.FC<TableUserProps> = () => {

    const [users, setUser] = useState<UserProps[] | null>(null);
    const [modalOpenClose, setModalOpenClose] = useState<boolean>(false);
    const [userForUpdate, setUserForUpdate] = useState<UserProps | undefined>(undefined);

  const handleModal = () => {
    setModalOpenClose(!modalOpenClose);
  }

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
                onClick={() => {setModalOpenClose(true); setUserForUpdate(item)}}
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
      <button
        onClick={() => {setModalOpenClose(true); setUserForUpdate(undefined)}}
        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded"
      >
        Abrir Modal
      </button>

      <UserFormModal isOpen={modalOpenClose} handleModal={handleModal} user={userForUpdate}/>
    </div>
  );
};

export default TableUser;
