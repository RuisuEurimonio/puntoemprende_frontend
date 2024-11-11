import Swal from "sweetalert2";

const HOST = "http://localhost/api/"
export async function getPost(){
    try{
        const res = await fetch(HOST+"post/all")
        console.log(res);
        
    } catch(e){

    }
}