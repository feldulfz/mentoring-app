import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SwalService } from '../../../../core/services/toast-service/swal.service';
import { Navbar } from '../../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-select-role.components',
  imports: [
    RouterModule,  
    ReactiveFormsModule,
    Navbar    
  ],
  templateUrl: './select-role.components.html',
  styleUrl: './select-role.components.scss'
})
export class SelectRoleComponents {
  router = inject(Router);
  route = inject(ActivatedRoute);
  swal = inject(SwalService);

  form!: FormGroup;

  errorMessage = signal('');
  isSubmissionInProgress = signal(false);
  formSubmitted = signal(false);

  constructor() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      role: new FormControl('', Validators.required)    
    })
  }
  get role() {
    return this.form.get('role');
  }  

  async onSubmit() {
    this.formSubmitted.set(true);

    if (this.form.invalid) return;

    this.isSubmissionInProgress.set(true); 
    this.errorMessage.set('');   
    
    try {
      const selectedRole = this.form.value.role;

      const uid = this.route.snapshot.queryParams['uid'];      
      const email = this.route.snapshot.queryParams['email'];      
      const roles = this.route.snapshot.queryParams['roles']; 
      
      if (roles) { 
        this.swal.success('Welcome back! You’ve signed in successfully.');
        this.router.navigate([`/${selectedRole}`]);
      } else {
        this.router.navigate([`/auth/sign-up-${selectedRole}`], {
          queryParams: {
            uid: uid,
            email: email              
          }
        });
      }

    } catch (err: any) {
      console.error('Navigation failed:', err);
      this.errorMessage.set(err.message || 'An unexpected error occurred.');
    } finally {
      this.isSubmissionInProgress.set(false);
    }
  }
}
