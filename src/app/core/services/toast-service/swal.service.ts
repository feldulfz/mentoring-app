import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  // General fire
  fire(title: string, text?: string, icon: SweetAlertIcon = 'info') {
    return Swal.fire({
      title,
      text,
      icon,
      position: 'top-end',
      toast: true,
      showConfirmButton: false,
      timer: 3000
    });
  }

  // Success message
  success(message: string) {
    return Swal.fire({
      title: 'Success',
      text: message,
      icon: 'success',
      position: 'top-end',
      toast: true,
      showConfirmButton: false,
      timer: 3000
    });
  }

  // Error message
  error(message: string) {
    return Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      position: 'top-end',
      toast: true,
      showConfirmButton: false,
      timer: 3000
    });
  }

  // Confirmation dialog (not toast, centered)
  confirm(
    title: string,
    text: string,
    confirmButtonText: string = 'Yes',
    cancelButtonText: string = 'Cancel'
  ): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      reverseButtons: true // optional: swaps Yes/Cancel positions
    });
  }
}
