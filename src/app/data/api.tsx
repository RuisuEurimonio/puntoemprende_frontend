import Swal from "sweetalert2";
import { PostProps, TypeValueProps, UserProps } from "./types";
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

export async function login(email : String, password : String){
    try{
        const res = await fetch(HOST+ "user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });
        if(res.status === 202){
            const resJson = await res.json();
            return resJson;
        }else if(res.status === 403){
            fireToast("error", "Credenciales invalidas.")
        }
        return null;
    } catch(e){
        fireToast("error", "Ha sucedido un error, vuelvelo a intentar.\n");
    }
}

export async function registerUser<T extends UserProps>(data : T){
    try{
        const res = await fetch(HOST+ "user/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(data)
        });
        if(res.status === 201){
            const resJson = await res.json();
            return resJson;
        }else if(res.status === 400){
            console.log(res);
            throw new Error(await res.text());
        }
        
        return null;
    } catch(e){
        fireToast("error", e+"\n");
        
    }
}