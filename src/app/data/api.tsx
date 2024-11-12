import Swal from "sweetalert2";
import { PostProps, TypeValueProps } from "./types";
import { fireToast } from "../utils/alerts";

const HOST = "http://localhost:8080/api/"
export async function getAll(typeValue : TypeValueProps){
    try{
        const res = await fetch(HOST+ typeValue +"/all")
        if(res.status === 200){
            const resJson = await res.json();
            return resJson;
        }
        return null;
    } catch(e){
        fireToast("error", "Ha sucedido un error, vuelvelo a intentar.\n");
    }
}

export async function findByEntity(typeValue: TypeValueProps, findBy : TypeValueProps , id : number){
    try{
        const res = await fetch(HOST+ typeValue+ "/find/" +findBy+"/"+id);
        if(res.status === 200){
            const resJson = await res.json();
            return resJson;
        }
        return null;
    } catch(e){
        fireToast("error", "Ha sucedido un error, vuelvelo a intentar.\n");
    }
}

export async function searchEntity(typeValue: TypeValueProps, input : string){
    try{
        const res = await fetch(HOST+ typeValue+ "/search/" +input);
        if(res.status === 200){
            const resJson = await res.json();
            return resJson;
        }
        return null;
    } catch(e){
        fireToast("error", "Ha sucedido un error, vuelvelo a intentar.\n");
    }
}