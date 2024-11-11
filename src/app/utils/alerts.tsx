import Swal from "sweetalert2";
import { SwalIconType } from "../data/types";

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