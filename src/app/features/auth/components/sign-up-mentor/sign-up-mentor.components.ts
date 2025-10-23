import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AccountManagementService } from '../../../../core/services/account-management-service/account-management-service';
import { CommonModule } from '@angular/common';
import { SwalService } from '../../../../core/services/toast-service/swal.service';
import { ActivatedRoute } from '@angular/router';
import { Navbar } from '../../../../shared/components/navbar/navbar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sign-up-mentor.components',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    Navbar,
    ButtonModule
  ],
  templateUrl: './sign-up-mentor.components.html',
  styleUrl: './sign-up-mentor.components.scss'
})
export class SignUpMentorComponents {
  authForm!: FormGroup;
  currentStep = 1;

  isSubmissionInProgress = signal(false);
  formSubmitted = signal(false);
  errorMessage = signal('');

  private router = inject(Router);
  private authService = inject(AccountManagementService);
  swal = inject(SwalService);
  route = inject(ActivatedRoute);

  uidSignInWithGoogle = signal(this.route.snapshot.queryParams['uid']);
  emailSignInWithGoogle = signal(this.route.snapshot.queryParams['email']);
  
  expertiseList = signal<string[]>([]); 
  industriesList = signal<string[]>([]); 
  skillsList = signal<string[]>([]); 

  constructor() {
    this.initForm();
  }

  initForm() {

    if (this.uidSignInWithGoogle() && this.emailSignInWithGoogle()) {
      this.authForm = new FormGroup({
        first_name: new FormControl('', Validators.required),
        last_name: new FormControl('', Validators.required),
        country: new FormControl(null, Validators.required),
        current_job: new FormControl(''),
        company: new FormControl(''),
        professional_years_experience: new FormControl(''),
        expertise: new FormControl([]),        
        industries: new FormControl([], Validators.required),        
        skills: new FormControl([], Validators.required),        
        education: new FormControl(''),
        school: new FormControl(''),
        linkedIn: new FormControl(''),
        website: new FormControl(''),
        bio: new FormControl('', [Validators.required, Validators.maxLength(600)])
      })
    }
    else {
      this.authForm = new FormGroup({
        first_name: new FormControl('', Validators.required),
        last_name: new FormControl('', Validators.required),
        country: new FormControl(null, Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        current_job: new FormControl(''),
        company: new FormControl(''),
        professional_years_experience: new FormControl(''),
        expertise: new FormControl([]),                
        industries: new FormControl([], Validators.required),        
        skills: new FormControl([], Validators.required),         
        education: new FormControl(''),
        school: new FormControl(''),
        linkedIn: new FormControl(''),
        website: new FormControl(''),
        bio: new FormControl('', [Validators.required, Validators.maxLength(600)])
      })
    }
  }

  get first_name() {
    return this.authForm.get('first_name');
  }

  get last_name() {
    return this.authForm.get('last_name');
  }

  get country() {
    return this.authForm.get('country');
  }

  get email() {
    return this.authForm.get('email');
  }

  get password() {
    return this.authForm.get('password');
  }

  get industries() {
    return this.authForm.get('industries');
  }

  get skills() {
    return this.authForm.get('skills');
  }

  get linkedIn() {
    return this.authForm.get('linkedIn');
  }

  get bio() {
    return this.authForm.get('bio');
  }

  nextStep() {
    if (this.currentStep < 3) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  //------------------------------------------------------
  addExpertiseFromInput(event: any) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();

    if (value && !this.expertiseList().includes(value)) {
      this.expertiseList.update(expertise => [...expertise, value]);
      this.authForm.get('expertise')?.setValue(this.expertiseList());
    }

    input.value = '';
    event.preventDefault();
  }

  removeExpertise(experty: string) {
    this.expertiseList.update(expertise => expertise.filter(e => e !== experty));
    this.authForm.get('expertise')?.setValue(this.expertiseList());
  }    
  //------------------------------------------------------  

  //------------------------------------------------------
  addIndustriesFromInput(event: any) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();

    if (value && !this.industriesList().includes(value)) {
      this.industriesList.update(industries => [...industries, value]);
      this.authForm.get('industries')?.setValue(this.industriesList());
      this.authForm.get('industries')?.markAsDirty();
      this.authForm.get('industries')?.markAsTouched();      
    }

    input.value = '';
    event.preventDefault();
  }

  removeIndustries(industry: string) {
    this.industriesList.update(industries => industries.filter(i => i !== industry));
    this.authForm.get('industries')?.setValue(this.industriesList());
    this.authForm.get('industries')?.markAsDirty();
    this.authForm.get('industries')?.markAsTouched();      
  }    

  markIndustriesTouched() {
    this.authForm.get('industries')?.markAsTouched();
  }   
  //------------------------------------------------------    

  //------------------------------------------------------
  addSkillFromInput(event: any) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();

    if (value && !this.skillsList().includes(value)) {
      this.skillsList.update(skills => [...skills, value]);
      this.authForm.get('skills')?.setValue(this.skillsList());
      this.authForm.get('skills')?.markAsDirty();
      this.authForm.get('skills')?.markAsTouched();
    }

    input.value = '';
    event.preventDefault();
  }

  removeSkill(skill: string) {
    this.skillsList.update(skills => skills.filter(s => s !== skill));
    this.authForm.get('skills')?.setValue(this.skillsList());
    this.authForm.get('skills')?.markAsDirty();
    this.authForm.get('skills')?.markAsTouched();
  }      

  markSkillsTouched() {
    this.authForm.get('skills')?.markAsTouched();
  }  
  //------------------------------------------------------

  async onSubmit() {
    this.formSubmitted.set(true);

    if (this.authForm.invalid && this.currentStep != 3) return;  

    // console.log('Form Value:', this.authForm.value);
    // return;    

    this.isSubmissionInProgress.set(true);

    let formValue: any = {};

    if (this.uidSignInWithGoogle() && this.emailSignInWithGoogle()) {
      formValue = {
        ...this.authForm.value,
        role: 'mentor',
        uid: this.uidSignInWithGoogle(),
        email: this.emailSignInWithGoogle()
      }
    } else {
      formValue = {
        ...this.authForm.value,
        role: 'mentor'
      }
    }

    try {
      await this.authService.registerUser(formValue);
      this.swal.success('Mentor signup complete!');
      this.router.navigate(['/mentor']);
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
    }
    finally {
      this.isSubmissionInProgress.set(false);
    }
  }
}

