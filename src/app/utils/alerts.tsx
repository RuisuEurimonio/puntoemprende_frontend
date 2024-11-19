import Swal from "sweetalert2";
import { SwalIconType, TypeValueProps } from "../data/types";
import { deleteApi } from "../data/api";

const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 7000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });


export function fireToast(icon : SwalIconType, title: string){
Toast.fire({
    icon: icon,
    title: title
  });
}


export function handleAccountDeletion(type : TypeValueProps, idNumber : number){
  Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción es irreversible. ¡Tu cuenta será eliminada permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar cuenta",
      cancelButtonText: "Cancelar",
  }).then((result) => {
      if (result.isConfirmed) {
          deleteApi(type, idNumber).then((response) => {
            if(response){
            Swal.fire(
              "¡Eliminada!",
              "Tu cuenta ha sido eliminada con éxito.",
              "success"
          );
        }else{
          fireToast("error", "Ha sucedido un error, vuelvelo a intetar.")
        }
          })
      }
  });
};

export function handleEntitytDeletion(type : TypeValueProps, idNumber : number, onUpdate : ()=>void, entity? : string, text? : string, token? : string){
  Swal.fire({
      title: "¿Estás seguro?",
      text: text ?? "Esta acción es irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar "+ (entity ?? "entidad"),
      cancelButtonText: "Cancelar",
  }).then((result) => {
      if (result.isConfirmed) {
          deleteApi(type, idNumber, token ? token : undefined).then((response) => {
            if(response){
            Swal.fire(
              "¡Eliminad@!",
              entity + " ha sido eliminad@ con éxito.",
              "success"
          );
          onUpdate();
        }else{
          fireToast("error", "Ha sucedido un error, vuelvelo a intetar.")
        }
          })
      }
  });
};