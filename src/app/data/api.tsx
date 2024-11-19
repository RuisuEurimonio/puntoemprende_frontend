import {TypeValueProps, UserProps } from "./types";
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
        console.log(e);
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
        console.log(e);
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
        console.log(e);
    }
}

export async function login(email : string, password : string){
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
            fireToast("error", "Correo o contraseña invalidos.")
        }
        return;
    } catch(e){
        fireToast("error", e+"");
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

export async function createApi<T>(type : TypeValueProps, data : T, token? : string){
    let headersContent = {};
    if (token != null) {
        headersContent = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }else{
        headersContent = {
            "Content-Type": "application/json"
        }
    }
    try{
        const res = await fetch(HOST+ type+"/create",{
            method: "POST",
            body: JSON.stringify(data),
            headers: headersContent
        });
        if(res.status === 201){
            const resJson = await res.json();
            return resJson;
        } else if (res.status === 403){
            throw new Error("Verifica tus permisos.")
        }
        throw new Error(await res.text());
    } catch(e ){
        fireToast("error", e+"");
    }
}

export async function getById(type : TypeValueProps, id : number){
    try{
        const res = await fetch(HOST+ type+ "/id/"+id);
        if(res.status === 200){
            const resJson = await res.json();
            return resJson;
        }
        return null;
    } catch(e){
        fireToast("error", "Ha sucedido un error, vuelvelo a intentar.\n");
        console.log(e);
    }
}

export async function updateApi<T>(type : TypeValueProps, data : T, token?: string){
    let headersContent = {};
    if (token != null) {
        headersContent = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }else{
        headersContent = {
            "Content-Type": "application/json"
        }
    }
    try{
        const res = await fetch(HOST+ type+"/update",{
            method: "PUT",
            body: JSON.stringify(data),
            headers: headersContent
        });
        if(res.status === 201){
            const resJson = await res.json();
            return resJson;
        }else if (res.status === 403){
            throw new Error("Verifica tus permisos.")
        }
        throw new Error(await res.text());
    } catch(e ){
        fireToast("error", e+"");
    }
}

export async function deleteApi(type : TypeValueProps, idEntity : number, token ?: string){
    let headersContent = {};
    if (token != null) {
        headersContent = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }else{
        headersContent = {
            "Content-Type": "application/json"
        }
    }
    try{
        const res = await fetch(HOST+ type+"/delete/"+idEntity,{
            method: "DELETE",
            headers: headersContent
        });
        if(res.status === 204){
            return true;
        }else if (res.status === 403){
            throw new Error("Verifica tus permisos.")
        }
        throw new Error(await res.text());
    } catch(e ){
        fireToast("error", e+"");
    }
}

export async function getBusiness(){
    try{
        const res = await fetch(HOST+ "user/business");
        if(res.status === 200){
            const resJson = await res.json();
            return resJson;
        }
        return null;
    } catch(e){
        fireToast("error", "Ha sucedido un error, vuelvelo a intentar.\n");
        console.log(e);
    }
}