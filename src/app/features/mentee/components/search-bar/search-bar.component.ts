import { Component, HostListener, inject, input, Input, output, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { SelectModule } from 'primeng/select';

export interface IQueryParam {
  query: string
  skill: string
  jobTitle: string
}

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, SelectModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  private route = inject(ActivatedRoute);

  searchSubmit = output<IQueryParam>();
  syncWithParams = input<boolean>(false);

  dropdownOpen = signal<boolean>(false);
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
    if (this.syncWithParams()) {
      this.route.queryParams.subscribe((params) => {
        this.searchTerm = params['q'] || '';
        this.selectedSkill = params['skill'] || '';
        this.selectedJobTitle = params['job'] || '';
      });
    }
  }

  toggleDropdown() {
    this.dropdownOpen.update(v => !v);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.dropdownOpen.set(false);
    }
  }

  applyFilters(event: Event) {
    event.preventDefault();
    this.dropdownOpen.set(false);
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
