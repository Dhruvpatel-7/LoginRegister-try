import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.myForm.valid) {
      const { name, email, phoneNo, password, role, token = "not" } = this.myForm.value;
      const formData = { name, email, phoneNo, password, role, token };

      this.auth.signup(formData)
        .subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: res.message,
              iconColor: 'white',
              background: 'green',
              color: 'white',
              timer: 2000,
              timerProgressBar: true,
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
            }).then(() => {
              this.router.navigate(['/login']); 
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
      
      console.log('Form Submitted!', formData);
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
      console.log('Form is invalid');
    }
  }

  selectPropertyType(type: string) {
    this.myForm.get('role')?.setValue(type);
  }
}
