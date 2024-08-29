import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserStoreService } from '../services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private userStore: UserStoreService ,private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      console.log('Login Submitted!', loginData);

      this.auth.login(loginData)
        .subscribe({
          next: (res) => {
            this.loginForm.reset();
            this.auth.storeToken(res.accessToken);
            this.auth.storeRefreshToken(res.refreshToken);
            const tokenPayLoad = this.auth.decodeToken();
            this.userStore.setFullNameFromStore(tokenPayLoad.unique_name);
            this.userStore.setRoleFromStore(tokenPayLoad.role);
            Swal.fire({
              icon: 'success',
              title: "Login success",
              iconColor: 'white',
              background: 'green',
              color: 'white',
              timer: 900,
              timerProgressBar: true,
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
            }).then(() => {
              this.router.navigate(['/dashboard']); 
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: err.error.message,
              iconColor: 'white',
              background: 'red',
              color: 'white',
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
          }
        });

    } else {
      Swal.fire({
        icon: 'error',
        title: "You Missing Something! Kindly Check Form again!",
        iconColor: 'white',
        background: 'red',
        color: 'white',
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
    }
  }
}
