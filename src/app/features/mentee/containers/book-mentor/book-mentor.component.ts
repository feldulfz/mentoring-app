import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { CalendarComponent } from '../../../../shared/components/calendar/calendar.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MentorService } from '../../../../core/services/mentee-service/mentor.service';
import { SwalService } from '../../../../core/services/toast-service/swal.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-book-mentor',
  imports: [CommonModule, CalendarComponent, ReactiveFormsModule, DialogModule, ButtonModule],
  templateUrl: './book-mentor.component.html',
  styleUrl: './book-mentor.component.scss'
})
export class BookMentorComponent {
  private activatedRoute = inject(ActivatedRoute);
  private mentorService = inject(MentorService);

  swal = inject(SwalService);

  // get the user from the route (which is injected by the UserResolver)
  user = this.activatedRoute.parent?.snapshot.data['user'];  

  bookingForm!: FormGroup;
  formSubmitted = signal(false);
  errorMessage = signal<string>('');
  isSubmissionInProgress = signal(false);

  isOpen = signal(false);

  selectedDate = signal<string | null>(null);
  selectedSlotId = signal<string | null>(null);
  selectedDateSlots = signal<{ id: string; startAt: string; endAt: string }[]>([]);

  currentStep = 1;

  mentorId = toSignal(
    this.activatedRoute.params.pipe(switchMap(params => [params['uid']])),
    { initialValue: '' }
  );

  availableSlots = toSignal(
    toObservable(this.mentorId).pipe(
      switchMap(uid => this.mentorService.getAllAvailability(uid))
    ),
    { initialValue: [] }
  );

  constructor() {
    this.initForm();
  }

  initForm() {
    this.bookingForm = new FormGroup({
      goal: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      attachments: new FormControl('')
    });
  }

  get goal() {
    return this.bookingForm.get('goal');
  }

  get message() {
    return this.bookingForm.get('message');
  }

  openModal() {
    this.isOpen.set(true);

    // Reset selections
    this.selectedDate.set(null);
    this.selectedSlotId.set(null);
    this.selectedDateSlots.set([]);

    // Reset calendar selection (if available)
    setTimeout(() => {
      const calendarComponent = document.querySelector('app-calendar');
      const flatpickrInstance = (calendarComponent as any)?._flatpickr;
      if (flatpickrInstance) {
        flatpickrInstance.clear();
      }
    });    
  }

  closeModal() {
    this.isOpen.set(false);
  }

  nextStep() {
    if (!this.selectedSlotId()) {
      this.errorMessage.set('Date & time is required.');
      return;
    }

    if (this.currentStep == 1) {
      this.errorMessage.set('');
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep == 2) this.currentStep--;
  }

  // Called when user selects a date from the calendar
  onDateSelected(date: string) {
    this.selectedDate.set(date);
    // Filter slots that match the selected date
    const slots = this.availableSlots()
      .filter(s => s.startAt.startsWith(date))
      .map(s => ({
        id: s.id,
        startAt: s.startAt,
        endAt: s.endAt,
      }));

    this.selectedDateSlots.set(slots);
  }

  // Called when user selects a specific time slot
  selectSlot(slotId: string) {
    this.selectedSlotId.set(slotId);
  }

  async onSubmit() {
    this.formSubmitted.set(true);

    if (this.bookingForm.invalid) return;

    this.isSubmissionInProgress.set(true);

    let formValue: any = {};

    formValue = {
      ...this.bookingForm.value,
      menteeId: this.user.uid,
      mentorId: this.mentorId(),
      slotId: this.selectedSlotId()
    }

    try {
      await this.mentorService.bookSlot(formValue);
      this.swal.success('Request sent!');
      this.closeModal();

      // Reset form and selections
      this.bookingForm.reset();
      this.formSubmitted.set(false);
      this.selectedDate.set(null);
      this.selectedSlotId.set(null);
      this.selectedDateSlots.set([]);
      this.currentStep = 1;
      this.errorMessage.set('');
    } catch (error: any) {
      console.error('error:', error);
      this.errorMessage.set("An unexpected error occurred. Please try again.");
    } finally {
      this.isSubmissionInProgress.set(false);
    }
  }

}
