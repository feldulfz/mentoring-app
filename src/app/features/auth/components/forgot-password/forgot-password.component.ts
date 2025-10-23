import { Component, inject, signal } from '@angular/core';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SwalService } from '../../../../core/services/toast-service/swal.service';
import { ToastService } from '../../../../core/services/toast-service/toast.service';
import { Navbar } from '../../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-forgot-password.component',
  imports: [
    RouterModule,  
    ReactiveFormsModule,
    Navbar
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  // inject the auth service
  auth = inject(Auth);
  router = inject(Router);
  
  swal = inject(SwalService);
  toast = inject(ToastService);  

  form!: FormGroup;

  errorMessage = signal('');
  isSubmissionInProgress = signal(false);
  isPasswordResetEmailSent = signal(false);
  formSubmitted = signal(false);

  constructor() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  get email() {
    return this.form.get('email');
  }  

  test() {
    // this.swal.success('Reset link sent to email!'); 
    // this.toast.show('Message sent successfully.', 'success');    
  }

  onSubmit() {
    this.formSubmitted.set(true);

    if (this.form.invalid) return;

    this.isSubmissionInProgress.set(true);
    // resent the password by sending a reset password link:
    sendPasswordResetEmail(this.auth, this.form.value.email)
      .then(response => {                
        this.isPasswordResetEmailSent.set(true);
        this.swal.success('Reset link sent to email!');        
        // console.log('password reset response: ');
        // console.log(response);
      })
      .catch(error => {
        this.isSubmissionInProgress.set(false);
        this.errorMessage.set("An unexpected error occurred. Please try again.");

        switch (error.code) {
          case 'auth/invalid-email':
            this.errorMessage.set("The email address is invalid.");
            break;

          case 'auth/user-not-found':
            this.errorMessage.set("No account found with this email address.");
            break;

          default:
            this.errorMessage.set("An unexpected error occurred. Please try again.");
        }

      })
      .finally(() => {
        this.isSubmissionInProgress.set(false);
      });
  }
}
