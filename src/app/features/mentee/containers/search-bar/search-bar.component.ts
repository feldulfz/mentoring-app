import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  @Output() searchSubmit = new EventEmitter<any>();
  @Input() syncWithParams = false; // used only in search-page to prefill

  dropdownOpen = false;
  searchTerm = '';
  selectedSkill = '';
  selectedJobTitle = '';

  skills = [
    'Frontend Development',
    'Backend Development',
    'UI/UX Design',
    'Data Analysis',
    'Machine Learning',
    'Project Management',
  ];

  jobTitles = [
    'Software Engineer',
    'Web Developer',
    'Product Designer',
    'Data Analyst',
    'AI Engineer',
    'Project Manager',
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Only load from query params when used in search-page
    if (this.syncWithParams) {
      this.route.queryParams.subscribe((params) => {
        this.searchTerm = params['q'] || '';
        this.selectedSkill = params['skill'] || '';
        this.selectedJobTitle = params['job'] || '';
      });
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.dropdownOpen = false;
    }
  }

  applyFilters(event: Event) {
    event.preventDefault();
    this.dropdownOpen = false;
    this.submitSearch();
  }

  onSearch(event: Event) {
    event.preventDefault();
    this.submitSearch();
  }

  submitSearch() {
    const payload = {
      query: this.searchTerm,
      skill: this.selectedSkill,
      jobTitle: this.selectedJobTitle,
    };
    this.searchSubmit.emit(payload);
  }

  resetFilters() {
    this.selectedSkill = '';
    this.selectedJobTitle = '';
  }
}
