import { Component, input } from '@angular/core';
import { Tags } from "../../../../shared/components/tags/tags";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mentor-card',
  imports: [Tags, RouterLink],
  templateUrl: './mentor-card.html',
  styleUrl: './mentor-card.scss'
})
export class MentorCard {
  uid = input<string>('');
  firstName = input<string>('');
  lastName = input<string>('');
  currentJob = input<string>('');
  company = input<string>('');
  expertise = input<[]>([]);
  bio = input<string>('');
}
