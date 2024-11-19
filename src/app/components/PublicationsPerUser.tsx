"use client"

import React, { useState, useEffect } from 'react';
import { PostProps } from '../data/types';
import { findByEntity } from '../data/api';
import PostModal from './PostModal';
import { handleEntitytDeletion } from '../utils/alerts';

type userPostsProps = {
    idUser : number
}
const PublicationPerUser : React.FC<userPostsProps> = ({idUser}) => {
    const [posts, setPosts] = useState<PostProps[]>([]);
    const [selectedPost, setSelectedPost] = useState<PostProps | undefined>(undefined);
    const [modalOpen, setModalOpen] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        findByEntity("post", "user", idUser).then((data)=>{
            setPosts(data);
        })
        const tokenStorage = localStorage.getItem("T");
        const token: string = tokenStorage ? tokenStorage : "";
        if(token != ""){
            setToken(token);
        }
        setUpdateData(false);
    }, [updateData]);

    const handleUpdateData = () =>{
        setUpdateData(true);
    }

    const handleDelete = (id: number) => {
        handleEntitytDeletion("post", id, handleUpdateData, "publicación", "Eliminar publicación seleccionada.", token ? token : undefined)
    };

    const handleOpenCloseModal = () => {
        setModalOpen(!modalOpen);
    }

    return (
        <div className="mt-5 px-4">
    <h1 className="text-lg font-semibold text-gray-800">Tus publicaciones</h1>
    <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-lg">
            <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Título</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Precio</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Cantidad</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Descripción</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Imagen</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post, index) => (
                    <tr key={post.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-2 text-sm text-gray-800 border-b">{post.title}</td>
                        <td className="px-4 py-2 text-sm text-gray-800 border-b">${post.price.toFixed(2)}</td>
                        <td className="px-4 py-2 text-sm text-gray-800 border-b">{post.cant}</td>
                        <td className="px-4 py-2 text-sm text-gray-800 border-b truncate max-w-xs">{post.description}</td>
                        <td className="px-4 py-2 text-sm text-gray-800 border-b">
                            <img src={post.image} alt={post.title} className="h-16 w-16 object-cover rounded-md shadow-sm" />
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800 border-b gap-2">
                            <button
                                onClick={() => {
                                    setSelectedPost(post);
                                    setModalOpen(true);
                                }}
                                className="px-3 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md mx-1"
                            >
                                Actualizar
                            </button>
                            <button
                                onClick={() => handleDelete(post.id)}
                                className="px-3 py-1 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-md mx-1"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button
            onClick={() => {
            setSelectedPost(undefined);
            setModalOpen(true);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-5"
            >
                Crear publicación.
            </button>
    </div>
    <PostModal key={"post-"+selectedPost?.id} isOpen={modalOpen} post={selectedPost} onUpdate={handleUpdateData} onClose={handleOpenCloseModal}/>
</div>

    );
};

export default PublicationPerUser;
