import { Component,  input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Divider } from "primeng/divider";
import { DatePicker } from "primeng/datepicker";
import { InputIcon } from "primeng/inputicon";
import { IconField } from "primeng/iconfield";
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-session-info-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, Divider, DatePicker,InputTextModule,TextareaModule, InputIcon, IconField],
  templateUrl: './session-info-form.html',
  styleUrl: './session-info-form.scss'
})
export class SessionInfoForm {

  form = input.required<FormGroup>();

}
