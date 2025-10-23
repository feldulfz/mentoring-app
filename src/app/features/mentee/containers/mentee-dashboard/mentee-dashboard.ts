import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MenteeSectionHeading } from "../../components/mentee-section-heading/mentee-section-heading";
import { MentorCard } from "../../components/mentor-card/mentor-card";
import { Tags } from "../../components/tags/tags";
import { MentorCardWide } from "../../components/mentor-card-wide/mentor-card-wide";
import { MentorCard2 } from "../../components/mentor-card-2/mentor-card-2";
import { Jumbotron } from "../../../../shared/components/jumbotron/jumbotron";
import { MentorService } from '../../../../core/services/mentee-service/mentor.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";

@Component({
  selector: 'app-mentee-dashboard',
  imports: [MenteeSectionHeading, MentorCard, Tags, MentorCardWide, MentorCard2, Jumbotron, CommonModule, FormsModule, SearchBarComponent],
  templateUrl: './mentee-dashboard.html',
  styleUrl: './mentee-dashboard.scss'
})
export class MenteeDashboard {
  private mentorService = inject(MentorService);
  private router = inject(Router); 

  stopScroll = signal(false);
  animationDuration = '50000ms';
  listOfMentors = toSignal(this.mentorService.getItems(), { initialValue: [] });

  handleSearch(filters: any) {
    const params = {
      q: filters.query || '',
      skill: filters.skill || '',
      job: filters.jobTitle || '',
    };

    this.router.navigate(['mentee/search-page'], { queryParams: params });
  }
}