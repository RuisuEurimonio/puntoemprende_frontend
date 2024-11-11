import Swal from "sweetalert2";
import { PostProps } from "./types";
import { fireToast } from "../utils/alerts";

const HOST = "http://localhost:8080/api/"
export async function getPost(){
    try{
        const res = await fetch(HOST+"post/all")
        if(res.status === 200){
            const resJson = await res.json();
            return resJson;
        }
        return null;
    } catch(e){
        fireToast("error", "Ha sucedido un error, vuelvelo a intentar.\n");
    }
}