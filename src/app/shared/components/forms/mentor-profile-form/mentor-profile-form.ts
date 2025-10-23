import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AutoComplete } from "primeng/autocomplete";
import { TextareaModule } from 'primeng/textarea';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-mentor-profile-form',
  imports: [AutoComplete, ReactiveFormsModule, TextareaModule, InputTextModule],
  templateUrl: './mentor-profile-form.html',
  styleUrl: './mentor-profile-form.scss'
})
export class MentorProfileForm {

  form = input.required<FormGroup>();

}
