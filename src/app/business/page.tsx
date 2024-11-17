"use client";

import React, { useEffect, useState } from "react";
import { getBusiness } from "../data/api";
import Spinner from "../components/Spinner";
import { UserProps } from "../data/types";
import NotAvaiable from "../components/NotAvailable";

const UserProfile = () => {
    const [business, setBusiness] = useState<UserProps[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    function getUserData() {
        getBusiness()
            .then((fetchedUserData) => {
                setBusiness(fetchedUserData);
                setLoading(false); // Datos cargados, deja de mostrar el spinner
            })
            .catch(() => {
                setLoading(false); // Si ocurre un error, también deja de mostrar el spinner
            });
    }

    useEffect(() => {
        getUserData();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <h1 className="text-center mt-5 text-2xl text-main font-bold">
                Emprendimientos:
            </h1>
            <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {business ?
                    business.map((user: UserProps) => (
                        <div
                            key={user.id}
                            className="border p-4 rounded-lg shadow-lg"
                        >
                            <div className="h-[4rem] w-[4rem] text-center m-auto flex items-center justify-center bg-secondary rounded-full mb-4">
                                <span className="text-4xl font-bold text-white">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                            </div>

                            <div className="mt-4">
                                <p className="font-bold mb-2">
                                    Business: {user.business}
                                </p>
                                <p className="text-sm mb-2">
                                    Nombre: {user.name} {user.lastName}
                                </p>
                                <p className="text-sm mb-2">
                                    Ciudad: {user.town.name}
                                </p>
                                <p className="text-sm mb-2">
                                    País: {user.town.country?.name}
                                </p>
                            </div>

                            <div className="mt-2">
                                <h4 className="font-semibold">
                                    Redes Sociales:
                                </h4>
                                <ul>
                                    {user.socialMedia && user.socialMedia.length > 0 ? (
                                        user.socialMedia.map(
                                            (social, index) => (
                                                <li
                                                    key={index}
                                                    className="text-sm text-blue-600"
                                                >
                                                    <a
                                                        href={social.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {social.name}
                                                    </a>
                                                </li>
                                            )
                                        )
                                    ) : (
                                        <li
                                            key={"donthave"}
                                            className="text-sm text-red-600"
                                        >
                                            <p>
                                                {" "}
                                                No tiene redes sociales
                                                asociadas.{" "}
                                            </p>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    ))
                    :
                    <NotAvaiable title="Error" description="No se pudo consultar los emprendimientos, vuelve a intentarlo." />
                }
            </div>
        </>
    );
};

export default UserProfile;
