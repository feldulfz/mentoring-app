import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Rating } from "primeng/rating";
import { Fieldset } from "primeng/fieldset";
import { Avatar } from "primeng/avatar";
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-session-rating-to-mentor-info-form',
  imports: [Rating, ReactiveFormsModule, Fieldset, Avatar, TextareaModule],
  templateUrl: './session-rating-to-mentor-info-form.html',
  styleUrl: './session-rating-to-mentor-info-form.scss'
})
export class SessionRatingToMentorInfoForm {

  form = input.required<FormGroup>();

}
