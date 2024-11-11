"use client"

import React, { useEffect, useState } from 'react';
import { CategoryProps, TownProps } from '../data/types';
import { getAll } from '../data/api';

const Filters = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');

  const [cities, setCities] = useState<TownProps[] | null>(null);
  const [categories, setCategories] = useState<CategoryProps[] | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  useEffect(()=>{
    getAll('category').then((categories) => {
        setCategories(categories);
    })
    getAll('town').then((towns)=>{
        setCities(towns);
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
              id="city"
              value={selectedCity}
              onChange={handleCityChange}
              className="border px-4 text-lg text-background h-7 w-96
                        lg:w-56
              "
            >
              <option value="">Seleccionar ciudad</option>
              {!isLoading && cities && cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name} - {city.country.name}
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
            onClick={()=>{}}
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
