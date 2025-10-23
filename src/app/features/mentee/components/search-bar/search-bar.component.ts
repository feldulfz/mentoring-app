import { Component, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, SelectModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  private route = inject(ActivatedRoute);

  @Output() searchSubmit = new EventEmitter<any>();
  @Input() syncWithParams = false;

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


  ngOnInit() {
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
      query: this.searchTerm.trim(),
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
