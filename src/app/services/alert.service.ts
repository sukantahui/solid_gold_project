import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AlertService {

  // Success message
  success(title: string, message?: string, timer = 3000) {
    return Swal.fire({
      title,
      text: message,
      icon: 'success',
      timer,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
      background: '#f0fdf4',
      color: '#166534'
    });
  }

  // Error message
  error(title: string, message?: string) {
    return Swal.fire({
      title,
      text: message,
      icon: 'error',
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'OK'
    });
  }

  // Confirmation dialog
  confirm(title: string, message: string) {
    return Swal.fire({
      title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    });
  }

  // Custom popup
  custom(options: SweetAlertOptions) {
    return Swal.fire({
      heightAuto: false, // Prevent page jumping
      scrollbarPadding: false, // Prevent scrollbar changes
      ...options
    });
  }
}

