"use client"

import React, { useEffect, useState } from 'react';
import { PostProps } from '../data/types';
import { getPost } from '../data/api';

const Post = () => {
  const [posts, setPosts] = useState<PostProps[]|null>(null);

  useEffect(() => {
    getPost().then((posts) => {
        setPosts(posts);
    })
  }, []);

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {posts ? (
        posts.map((post: PostProps) => (
          <div key={post.id} className="border p-4 rounded-lg shadow-lg">
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
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {post.reportedStatus.isAvailable
                  ? "Disponible"
                  : "No Disponible"}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div>No posts available</div>
      )}
    </div>
  );
};

export default Post;