import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';

import { CommonModule, DatePipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ProgressSpinnerModule } from 'primeng/progressspinner'; // optional for loading
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'guide' | 'file' | 'link';
  uploadedBy: {
    name: string;
    image: string;
  };
  date: Date;
  content?: string;   // for guides
  fileUrl?: string;   // for files
  url?: string;       // for links
  recommended: boolean;
}

@Component({
  selector: 'app-resources.component',
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    ProgressSpinnerModule,
    ButtonModule,
    TabsModule,
    BadgeModule,
    OverlayBadgeModule
  ],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss'
})
export class ResourcesComponent {
  resources = signal<Resource[]>([
    {
      id: 2,
      title: 'Resume Template.pdf',
      description: 'Editable resume template for job applications.',
      type: 'file',
      uploadedBy: { name: 'Admin', image: 'admin.png' },
      date: new Date('2025-10-08'),
      fileUrl: 'assets/files/resume-template.pdf',
      recommended: false,
    },
    {
      id: 4,
      title: 'Soft Skills Course',
      description: 'An online course to improve communication and teamwork skills.',
      type: 'link',
      uploadedBy: { name: 'Mentor Jane Cruz', image: 'janecruz.png' },
      date: new Date('2025-10-05'),
      url: 'https://example.com/soft-skills-course',
      recommended: true,
    },
    {
      id: 6,
      title: 'Career Planning Checklist.docx',
      description: 'Checklist to help you plan your short- and long-term career steps.',
      type: 'file',
      uploadedBy: { name: 'Admin', image: 'admin.png' },
      date: new Date('2025-10-02'),
      fileUrl: 'assets/files/career-planning.docx',
      recommended: true,
    },
    {
      id: 7,
      title: 'LinkedIn Optimization Tips',
      description: 'External resource for improving your LinkedIn profile.',
      type: 'link',
      uploadedBy: { name: 'Mentor Sarah Johnson', image: 'sarahjohnson.png' },
      date: new Date('2025-09-29'),
      url: 'https://example.com/linkedin-tips',
      recommended: false,
    }
  ]);
}
