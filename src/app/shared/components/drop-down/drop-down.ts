import { Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

export interface DropDownOption {
  [key: string]: any;
}

@Component({
  selector: 'app-drop-down',
  imports: [
    ReactiveFormsModule 
  ],
  templateUrl: './drop-down.html',
  styleUrl: './drop-down.css'
})
export class DropDown {
  control = input.required<FormControl>();    
  options = input<DropDownOption[]>([]);
  optionsProps = input<string[]>([]);
  propToBeBinded = input<string>('');  
  placeholder = input<string>('Select...');
  label = input<string>('');  


  selectionChange = output<any>();

  onSelectionChange() {
    const value = this.control().value;
    this.selectionChange.emit(value);
  }
}
