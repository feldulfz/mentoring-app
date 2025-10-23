import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tags',
  imports: [],
  templateUrl: './tags.html',
  styleUrl: './tags.scss'
})
export class Tags {

  tag = input<string>('Tag');
  size = input<'sm' | 'md' >('md');

}
