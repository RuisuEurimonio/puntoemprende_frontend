import { UserProps } from "../data/types";
import { fireToast } from "./alerts";

export function getUserFromLocal() : UserProps{
    const userStorage = localStorage.getItem("U");
    const userJson = userStorage ? JSON.parse(userStorage) : null;
    if(userJson == null){
        fireToast("error","Ha sucedido un error con el usuario");
    }
    return userJson;
}
