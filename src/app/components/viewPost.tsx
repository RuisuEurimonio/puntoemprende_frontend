import React, { useEffect, useState } from "react";
import { PostProps } from "../data/types";
import { getById } from "../data/api";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    idPost: number | null;
};

const ViewPost: React.FC<ModalProps> = ({ isOpen, onClose, idPost }) => {
    const [data, setData] = useState<PostProps | null>(null);
    const [isSocialMenuOpen, setIsSocialMenuOpen] = useState(false);

    const toggleSocialMenu = () => setIsSocialMenuOpen(!isSocialMenuOpen);

    useEffect(() => {
        idPost &&
            getById("post", idPost).then((data) => {
                setData(data);
            });
    }, []);

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-black p-6 rounded-lg w-11/12">
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 bg-gray-400 text-white rounded-full p-2"
                        >
                            X
                        </button>

                        <h2 className="text-xl font-bold mb-4 text-main">
                            {data?.title ?? "error"}
                        </h2>

                        <img
                            src={data?.image ?? "error"}
                            alt={data?.title ?? "error"}
                            className="w-full h-56 object-cover mb-4"
                        />

                        <p className="mb-2">
                            <strong className="text-main">Descripción:</strong>{" "}
                            {data?.description ?? "error"}
                        </p>
                        <p className="mb-2">
                            <strong className="text-main">Precio:</strong> $
                            {data?.price.toFixed(2) ?? "error"}
                        </p>
                        <p className="mb-2">
                            <strong className="text-main">
                                Cantidad disponible:
                            </strong>{" "}
                            {data?.cant ?? "error"}
                        </p>

                        <div className="mb-4">
                            <p>
                                <strong className="text-main">
                                    Creado por:
                                </strong>{" "}
                                {data?.user?.name ?? "error"}{" "}
                                {data?.user?.lastName ?? "error"}
                            </p>
                            <p>
                                <strong className="text-main">Correo:</strong>{" "}
                                {data?.user?.email ?? "error"}
                            </p>
                            <p>
                                <strong className="text-main">
                                    Dirección:
                                </strong>{" "}
                                {data?.user?.address ?? "error"}
                            </p>
                        </div>

                        <div className="mb-4 flex flex-wrap gap-2 justify-center">
                            <button
                                type="button"
                                className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
                            >
                                <strong>Alcance:</strong>{" "}
                                {data?.scope?.name ?? "error"} -{" "}
                                {data?.scope?.description ?? "error"}
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded"
                            >
                                <strong>Categoría:</strong>{" "}
                                {data?.category?.name ?? "error"} -{" "}
                                {data?.category?.description ?? "error"}
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 text-white bg-purple-500 hover:bg-purple-600 rounded"
                            >
                                <strong>Motive:</strong>{" "}
                                {data?.motive?.name ?? "error"} -{" "}
                                {data?.motive?.description ?? "error"}
                            </button>
                        </div>

                        <div className="relative">
                            <button
                                type="button"
                                onClick={toggleSocialMenu}
                                className="px-4 py-2 text-white bg-main hover:bg-secondary rounded"
                            >
                                Comunícate con {data?.user?.name ?? "el usuario"}
                            </button>

                            {/* Menú desplegable */}
                            {isSocialMenuOpen && (
                                <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded shadow-lg">
                                    {data && data.user.socialMedia && data?.user?.socialMedia?.length > 0 ? (
                                        <ul className="py-2 w-full">
                                            {data.user.socialMedia.map((social: any) => (
                                                <li
                                                    key={social.id}
                                                    className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                                                >
                                                    <span className="font-medium text-black">{social.name}:</span>
                                                    <a
                                                        href={social.link ?? "#"}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-500 hover:underline break-words min-w-max"
                                                    >
                                                        {social.link}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="px-4 py-2 text-sm text-gray-500">
                                            No hay redes sociales disponibles.
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="mt-4 text-right">
                            <button
                                onClick={onClose}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewPost;
