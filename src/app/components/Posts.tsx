"use client";

import React, { useEffect, useState } from 'react';
import { PostProps } from '../data/types';
import { getAll } from '../data/api';
import NotAvaiable from './NotAvailable';
import Filters from './Filters';
import Spinner from './Spinner';
import PostModal from './PostModal';
import ViewPost from './viewPost';

const Post = () => {
  const [posts, setPosts] = useState<PostProps[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [postId, setPostId] = useState<number>();
  const [isModalOpen, setModalOpen] = useState(false);
  const [resetData, setResetData] = useState(true);

  function getAllMethod(){
    getAll('post')
      .then((fetchedPosts) => {
        setPosts(fetchedPosts);
        setLoading(false); // Datos cargados, deja de mostrar el spinner
      })
      .catch(() => {
        setLoading(false); // Si ocurre un error, también deja de mostrar el spinner
      });
  }

  const handleResetData = () => {
    setResetData(true);
  }

  useEffect(() => {
    getAllMethod();
    setResetData(false);
  }, [resetData]);

  function setData(data : PostProps[]){
    if(data.length <= 0){
      getAllMethod();
      return;
    }
    setPosts(data);
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <h1 className='text-center mt-5 text-2xl text-main font-bold'>Ultimas publicaciones.</h1>
      {posts && <Filters updateData={setData} onUpdate={handleResetData}/>}
      {posts ? (
        <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {posts.map((post: PostProps) => (
            <div key={post.id} className="border p-4 rounded-lg shadow-lg cursor-pointer" onClick={() => {setModalOpen(true); setPostId(post.id)}}>
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-2">{post.description}</p>
              <p className="font-bold mb-2">Precio: ${post.price}</p>
              <p className="text-sm text-gray-500">Cantidad disponible: {post.cant}</p>
              <p className="text-sm text-gray-500">Categoría: {post.category.name}</p>
              <div className="mt-4">
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    post.reportedStatus.isAvailable
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {post.reportedStatus.isAvailable
                    ? 'Disponible'
                    : 'No Disponible'}
                </span>
                <p className="text-xs mt-4 text-gray-500">Publicado por: {post.user.business}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NotAvaiable title="Error" description="No se pudo consultar los post, vuelve a intentarlo." />
      )}
      {postId && <ViewPost
        key={postId+"post"}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        idPost={postId}
      />
      }
    </>
  );
};

export default Post;
