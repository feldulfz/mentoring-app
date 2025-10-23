import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AccountManagementService } from '../../../../core/services/account-management-service/account-management-service';
import { SwalService } from '../../../../core/services/toast-service/swal.service';
import { ActivatedRoute } from '@angular/router';
import { Navbar } from '../../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-sign-up-mentee.components',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    Navbar
  ],
  templateUrl: './sign-up-mentee.components.html',
  styleUrl: './sign-up-mentee.components.scss'
})
export class SignUpMenteeComponents {
  authForm!: FormGroup;

  private router = inject(Router);
  private authService = inject(AccountManagementService);

  swal = inject(SwalService);
  route = inject(ActivatedRoute);

  isSubmissionInProgress = signal(false);
  formSubmitted = signal(false);
  errorMessage = signal('');

  uidSignInWithGoogle = signal(this.route.snapshot.queryParams['uid']);
  emailSignInWithGoogle = signal(this.route.snapshot.queryParams['email']);

  constructor() {
    this.initForm();
  }

  initForm() {
    if (this.uidSignInWithGoogle() && this.emailSignInWithGoogle()) {
      this.authForm = new FormGroup({
        first_name: new FormControl('', Validators.required),
        last_name: new FormControl('', Validators.required),
      })
    } else {
      this.authForm = new FormGroup({
        first_name: new FormControl('', Validators.required),
        last_name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
      })
    }
  }

  get first_name() {
    return this.authForm.get('first_name');
  }

  get last_name() {
    return this.authForm.get('last_name');
  }

  get email() {
    return this.authForm.get('email');
  }

  get password() {
    return this.authForm.get('password');
  }

  async onSubmit() {

    this.formSubmitted.set(true);

    if (this.authForm.invalid) return;

    this.isSubmissionInProgress.set(true);

    let formValue: any = {};

    if (this.uidSignInWithGoogle() && this.emailSignInWithGoogle()) {
      formValue = {
        ...this.authForm.value,
        role: 'mentee',
        uid: this.uidSignInWithGoogle(),
        email: this.emailSignInWithGoogle()        
      }    
    } else {
      formValue = {
        ...this.authForm.value,
        role: 'mentee'  
      }   
    }    
    
    try {
      await this.authService.registerUser(formValue);

      this.swal.success('Mentee signup complete!');
      this.router.navigate(['/mentee']);
    } catch (error: any) {
      console.error('error:', error);

      switch (error.code) {
        case 'auth/email-already-in-use':
          this.errorMessage.set("This email is already in use. Please use a different email or sign in.");
          break;

        case 'auth/invalid-email':
          this.errorMessage.set("The email address is invalid.");
          break;

        case 'auth/operation-not-allowed':
          this.errorMessage.set("Email/password sign-up is currently disabled. Please contact support.");
          break;

        case 'auth/weak-password':
          this.errorMessage.set("The password is too weak. Please choose a stronger password.");
          break;

        default:
          this.errorMessage.set("An unexpected error occurred. Please try again.");
      }
    } finally {
      this.isSubmissionInProgress.set(false);
    }

  }

}