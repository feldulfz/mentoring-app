import { Component, input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.html',
  styleUrls: ['./input.scss'],
})
export class InputComponent {
  label = input<string>('Label');
  type = input<'text' | 'email' | 'number' | 'password'>('text');
  placeholder = input<string>('');
  required = input<boolean>(false);

  // ✅ Accept AbstractControl for maximum flexibility
  control = input.required<AbstractControl>();
}
