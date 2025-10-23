import { Component, effect, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MentorSessionsService } from '../../../../core/services/mentee-service/mentor-sessions-service copy';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwalService } from '../../../../core/services/toast-service/swal.service';
import { TextareaModule } from 'primeng/textarea';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { UserinfoService } from '../../../../core/services/userinfo-service';
import { MentorProfileForm } from "../../../../shared/components/forms/mentor-profile-form/mentor-profile-form";

@Component({
  selector: 'app-mentor-profile-page',
  standalone: true,
  imports: [
    InputTextModule,
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    TextareaModule,
    MentorProfileForm
],
  templateUrl: './mentor-profile-page.html',
  styleUrls: ['./mentor-profile-page.scss'],
})
export class MentorProfilePage {
  private mentorProfileService = inject(MentorSessionsService);
  private userinfoService = inject(UserinfoService);
  private activatedRoute = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private swal = inject(SwalService);

  user = this.activatedRoute.parent?.snapshot.data['user'];

  countries: any[] = [];


  mentorProfile = toSignal(
    this.mentorProfileService.getFullMentorProfileById(this.user.uid),
    { initialValue: null }
  );

  mentorProfileForm = this.fb.group({
    first_name: [''],
    last_name: [''],
    email: [''],
    country: [''],
    linkedIn: [''],
    website: [''],
    company: [''],
    current_job: [''],
    education: [''],
    school: [''],
    bio: [''],
    professional_years_experience: [0],
    industries: [''],
    skills: [''],
    expertise: [''],
  });

  constructor() {
    effect(() => {
      const profile = this.mentorProfile();
      if (profile) {
        this.mentorProfileForm.patchValue(profile);
      }
    });
  }

  SaveProfile() {
    if (this.mentorProfileForm.valid) {
      const updatedData = {
        ...this.mentorProfileForm.value
      };

      this.userinfoService.updateMentorProfile(this.user.uid, updatedData);
      this.swal.success('Profile updated successfully.');
    }
  }
}
