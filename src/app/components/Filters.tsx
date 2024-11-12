"use client"

import React, { useEffect, useState } from 'react';
import { CategoryProps, PostProps, ScopeProps, TownProps } from '../data/types';
import { findByEntity, getAll, searchEntity } from '../data/api';

type FiltersProps = {
  updateData: (data : PostProps[]) => void;
}



const Filters : React.FC<FiltersProps> = ( {updateData} ) => {
  const [selectedScope, setSelectedScope] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');

  const [scope, setScope] = useState<ScopeProps[] | null>(null);
  const [categories, setCategories] = useState<CategoryProps[] | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const handleScopeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = event.target.value;
    setSelectedScope(id);
    findByEntity("post", "scope", parseInt(id)).then((data)=>{
      updateData(data);
    })
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = event.target.value;
    setSelectedCategory(event.target.value);
    findByEntity("post", "category", parseInt(id)).then((data)=>{
      updateData(data);
    })
  };

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleClick = () => {
    const input = searchText;
    if(input.length <= 0){
      updateData([]);
      return;
    }
    searchEntity("post", input).then((data)=>{
      updateData(data);
      setSearchText("");
    })
  }

  useEffect(()=>{
    getAll('category').then((categories) => {
        setCategories(categories);
    })
    getAll('scope').then((scope)=>{
        setScope(scope);
    })
    setIsLoading(false);
  },[])

  return (
    <div className="p-5">
      <div className="flex flex-col justify-between items-center mb-5
                    lg:flex-row
      ">
        {/* Botón para agregar publicación */}
        <button className="bg-main text-white px-4 text-lg hover:bg-secondary transition h-7 w-96 mb-5
                            lg:w-auto lg:mb-0
        ">
          Agregar Publicación
        </button>

        {/* Filtros en la parte derecha */}
        <div className="flex items-center flex-col
                        lg:flex-row
                        ">
          {/* Filtro por ciudad */}
          <div className="flex flex-col">
            <select
              id="scope"
              value={selectedScope}
              onChange={handleScopeChange}
              className="border px-4 text-lg text-background h-7 w-96
                        lg:w-56
              "
            >
              <option value="">Seleccionar alcance</option>
              {!isLoading && scope && scope.map((scope) => (
                <option key={scope.id} value={scope.id}>
                  {scope.name}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por categoría */}
          <div className="flex flex-col">
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border px-4 text-lg text-background h-7 w-96
                        lg:w-56
              "
            >
              <option value="">Seleccionar categoría</option>
              {!isLoading && categories &&categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="">
            <input
              id="searchText"
              value={searchText}
              onChange={handleSearchTextChange}
              type="text"
              placeholder="Buscar por texto"
              className="border px-4 text-lg text-background h-7 w-96
                            lg:w-56
              "
            />
          </div>

          <button
            className="bg-main text-foreground px-4 text-lg hover:bg-secondary transition h-7 w-96
                        lg:w-auto
            "
            onClick={handleClick}
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
