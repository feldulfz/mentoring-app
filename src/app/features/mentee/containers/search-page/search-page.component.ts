import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Jumbotron } from '../../../../shared/components/jumbotron/jumbotron';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MentorService } from '../../../../core/services/mentee-service/mentor.service';
import { MentorCard } from '../../components/mentor-card/mentor-card';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ Jumbotron, CommonModule, FormsModule, SearchBarComponent, MentorCard],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private mentorService = inject(MentorService);

  filters: any = {};
  results: any[] = [];
  hasInitialSearch = false;
  loading = false;

  ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      this.filters = {
        query: params['q'] || '',
        skill: params['skill'] || '',
        jobTitle: params['job'] || '',
      };

      if (this.filters.query || this.filters.skill || this.filters.jobTitle) {
        this.hasInitialSearch = true;
        await this.performSearch();
      }
    });
  }

  async handleSearch(filters: any) {
    this.filters = filters;
    await this.performSearch();
  }

  async performSearch() {
    this.loading = true;
    try {
      // Firestore search
      const keyword = this.filters.query || this.filters.skill || this.filters.jobTitle;

      console.log("keyword: ", keyword);

      this.results = keyword ? await this.mentorService.searchMentors(keyword) : [];
    } catch (err) {
      console.error('Search error:', err);
      this.results = [];
    } finally {
      this.loading = false;
    }
  }
}
