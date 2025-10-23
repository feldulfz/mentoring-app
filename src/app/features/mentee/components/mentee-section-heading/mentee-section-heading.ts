import { Component, input } from '@angular/core';

@Component({
  selector: 'app-mentee-section-heading',
  imports: [],
  templateUrl: './mentee-section-heading.html',
  styleUrl: './mentee-section-heading.scss'
})
export class MenteeSectionHeading {

  title = input<string>();

}
