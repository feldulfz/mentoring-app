import { Component, input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePicker } from "primeng/datepicker";
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-request-info-form',
  imports: [DatePicker, ReactiveFormsModule, InputTextModule, TextareaModule],
  templateUrl: './request-info-form.html',
  styleUrl: './request-info-form.scss'
})
export class RequestInfoForm {


  form = input.required<FormGroup>();

}
