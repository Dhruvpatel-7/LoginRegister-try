import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {

  }

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true
    } else {
      this.router.navigate(['login'])
      Swal.fire({
        icon: 'warning',
        title: " You have to login First!",
        iconColor: 'black',
        background: 'yellow',
        color: 'black',
        timer: 3000,
        timerProgressBar: true,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
      return false;
    }
  }
}
