import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AccountManagementService } from '../../../../core/services/account-management-service/account-management-service';
import { SwalService } from '../../../../core/services/toast-service/swal.service';
import { Navbar } from '../../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-sign-in.component',
  imports: [
    RouterModule,      
    ReactiveFormsModule,
    Navbar
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  private authService = inject(AccountManagementService);

  authForm!: FormGroup;

  swal = inject(SwalService);

  isSubmissionInProgress = signal(false);
  isSubmissionInProgressForGoogleSignIn = signal(false);
  formSubmitted = signal(false);  
  errorMessage = signal('');

  private router = inject(Router);

  constructor() {
    this.initForm();
  }

  initForm() {
    this.authForm = new FormGroup({
      role: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]), // pwede bain waray formcontrol?
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }

  get role() {
    return this.authForm.get('role');
  }     

  get email() {
    return this.authForm.get('email');
  }

  get password() {
    return this.authForm.get('password');
  }    

  async onSignInWithGoogle() {
    try {
      this.isSubmissionInProgressForGoogleSignIn.set(true);

      const { user, roles } = await this.authService.signInWithGoogle();

      if (roles.length === 0) {
        await this.router.navigate(['/auth/select-role'], {
          queryParams: {
            uid: user.uid,
            email: user.email
          }
        });
      } else if (roles.length > 1) {
        // multiple roles → ask user which one they want to use
        await this.router.navigate(['/auth/select-role'], {
          queryParams: { 
            uid: user.uid, 
            email: user.email, 
            roles: roles 
          }
        });
      } else {
        // Existing user redirect to their role dashboard
        this.redirectTo(roles[0]);
        this.swal.success('Welcome back! You’ve signed in successfully.');        
      }
    } catch (error: any) {
      console.error('Google sign-in error:', error);

      switch (error.code) {
        case 'auth/popup-closed-by-user':
          this.errorMessage.set("The sign-in popup was closed before completing.");
          break;
        case 'auth/cancelled-popup-request':
          this.errorMessage.set("Only one popup request is allowed at a time.");
          break;
        case 'auth/popup-blocked':
          this.errorMessage.set("Popup blocked by the browser. Please allow popups and try again.");
          break;
        default:
          this.errorMessage.set("Google sign-in failed. Please try again.");
      }
    } finally {
      this.isSubmissionInProgressForGoogleSignIn.set(false);
    }
  }  

  async onSubmit() {
    this.formSubmitted.set(true);

    if (this.authForm.invalid) return;

    this.isSubmissionInProgress.set(true);

    try {
      await this.authService.signInUser(
        this.authForm.value.email,
        this.authForm.value.password
      );
      
      this.swal.success('Welcome back! You’ve signed in successfully.');
      this.redirectTo(this.authForm.value.role);

    } catch (error: any) {
      this.isSubmissionInProgress.set(false);
      console.error('error:', error);

      switch (error.code) {
        case 'auth/invalid-email':
          this.errorMessage.set("The email address is invalid.");
          break;
        case 'auth/user-disabled':
          this.errorMessage.set("This account has been disabled. Please contact support.");
          break;
        case 'auth/user-not-found':
          this.errorMessage.set("No account found with this email address.");
          break;
        case 'auth/invalid-credential':
          this.errorMessage.set("The email/password is incorrect. Please try again.");
          break;
        case 'auth/too-many-requests':
          this.errorMessage.set("Too many failed attempts. Please try again later.");
          break;
        case 'auth/id-token-expired':
          this.errorMessage.set("Your session has expired. Please sign in again.");
          break;
        case 'auth/id-token-revoked':
          this.errorMessage.set("Your session was revoked. Please sign in again.");
          break;
        default:
          this.errorMessage.set("An unexpected error occurred. Please try again.");
      }
    }
  }  

  redirectTo(role: string) {
    switch (role) {
      case 'mentee':
        this.router.navigate(['/mentee']);
        break;
      case 'mentor':
        this.router.navigate(['/mentor']);
        break;
      case 'admin':
        this.router.navigate(['/admin']);
        break;
      default:
        this.router.navigate(['/unauthorized']);
    }
  }  

}
