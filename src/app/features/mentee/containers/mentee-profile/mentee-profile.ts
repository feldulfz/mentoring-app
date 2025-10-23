import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from "../../../../shared/components/forms/button/button";

@Component({
  selector: 'app-mentee-profile',
  imports: [ReactiveFormsModule, Button],
  templateUrl: './mentee-profile.html',
  styleUrl: './mentee-profile.scss'
})
export class MenteeProfile {

  private fb = inject(FormBuilder);

  profileForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required]
  });

  onSubmit() {

    if (this.profileForm.valid) {
      const newProfileData = this.profileForm.getRawValue();
      console.log('Valid Form Data' + newProfileData);
    } else {
      console.log("Form is not valid");
    }
  }

}
