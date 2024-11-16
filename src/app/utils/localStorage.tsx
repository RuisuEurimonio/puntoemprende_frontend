import { UserProps } from "../data/types";

export function getUserFromLocal() : UserProps{
    const userStorage = localStorage.getItem("U");
    const userJson = userStorage ? JSON.parse(userStorage) : null;
    if(userJson == null){
        throw new Error("Ha sucedido un error con el usuario");
    }
    return userJson;
}
