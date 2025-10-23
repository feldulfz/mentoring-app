import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-enrolled-mentorship',
  imports: [CommonModule],
  templateUrl: './enrolled-mentorship.html',
  styleUrl: './enrolled-mentorship.scss',
})
export class EnrolledMentorship {

  sessionRequests = input<any[]>([]);
  status = input<'all' | 'accepted' | 'pending' | 'rejected'>('all');

  filteredRequests = computed(() => {
    const requests = this.sessionRequests();
    const status = this.status();
    if (status === 'all') return requests;
    return requests.filter(r => r.status === status);
  });

}
