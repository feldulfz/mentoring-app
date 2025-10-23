import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Rating } from "primeng/rating";
import { Avatar } from "primeng/avatar";
import { Fieldset } from "primeng/fieldset";
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-session-rating-to-mentee-info-form',
  imports: [Rating, Avatar, Fieldset, ReactiveFormsModule, TextareaModule],
  templateUrl: './session-rating-to-mentee-info-form.html',
  styleUrl: './session-rating-to-mentee-info-form.scss'
})
export class SessionRatingToMenteeInfoForm {

  form = input.required<FormGroup>();

}
