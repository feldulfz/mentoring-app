import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute} from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';


import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ProgressSpinnerModule } from 'primeng/progressspinner'; // optional for loading
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { MenuModule } from 'primeng/menu';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatePickerModule } from 'primeng/datepicker';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { FormsModule } from '@angular/forms';
import { MentorSchedule } from '../../../../core/services/mentor-service/mentor-schedule';
import { Slot } from '../../../../shared/interfaces/mentor-interfaces/slot-interface';





@Component({
  selector: 'app-mentor-schedule-page',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    ProgressSpinnerModule,
    ButtonModule,
    TabsModule,
    BadgeModule,
    OverlayBadgeModule,
    MenuModule,
    ToolbarModule,
    DialogModule,
    SelectModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    DatePickerModule,
    ToastModule,
    ButtonModule,
    TooltipModule,
    ConfirmPopupModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './mentor-schedule-page.html',
  styleUrl: './mentor-schedule-page.scss'
})
export class MentorSchedulePage {
  private mentorScheduleService = inject(MentorSchedule);
  private activatedRoute = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  user = this.activatedRoute.parent?.snapshot.data['user'];

  mentorSchedule = toSignal(this.mentorScheduleService.getAllSlotById(this.user.uid), { initialValue: [] });

  formSubmitted = signal(false);
  isSubmitting = signal(false);
  invalidTime = signal(false);

  mentorAvailableSched = computed<Slot[]>(() =>
    this.mentorSchedule().filter(req => req.status === 'available')
  );

  mentorCancelledSched = computed<Slot[]>(() =>
    this.mentorSchedule().filter(req => req.status === 'cancelled')
  );

  mentorBookedSched = computed<Slot[]>(() =>
    this.mentorSchedule().filter(req => req.status === 'booked')
  );

  mentorCompletedSched = computed<Slot[]>(() =>
    this.mentorSchedule().filter(req => req.status === 'completed')
  );

  mentorExpiredSched = computed<Slot[]>(() =>
    this.mentorSchedule().filter(req => req.status === 'expired')
  );

  constructor() {

  }

  newSlot = signal<Slot>({
    id: '',
    startAt: new Date(),
    endAt: new Date(),
    createdAt: '',
    status: '',
    bookedBy: '',
    sessionId: '',
    updatedAt: '',
    recurring: false,
  });

  addNewSched = signal(false);

  openNew() {
    this.formSubmitted.set(false);
    this.newSlot.set({
      id: '',
      startAt: new Date(),
      endAt: new Date(),
      createdAt: '',
      status: 'available',
      bookedBy: '',
      sessionId: '',
      updatedAt: '',
      recurring: false,
    });
    this.addNewSched.set(true);
  }

  onDateChange(newDate: Date) {
    const current = this.newSlot();

    // Reset time when date changes
    const resetStart = new Date(newDate);
    resetStart.setHours(0, 0, 0, 0);

    const resetEnd = new Date(newDate);
    resetEnd.setHours(0, 0, 0, 0);

    this.newSlot.set({
      ...current,
      startAt: resetStart,
      endAt: resetEnd,
    });
  }

  hideDialog() {
    this.addNewSched.set(false);
    this.formSubmitted.set(false);
  }

  editSlot(slot: Slot) {
    this.newSlot.set({ ...slot });
    this.addNewSched.set(true);
    this.formSubmitted.set(false);
  }

  get slotForm() {
    return this.newSlot();
  }

  set slotForm(value: Slot) {
    this.newSlot.set(value);
  }

  confirmToggle(slot: Slot) {
    const newStatus = slot.status === 'available' ? 'cancelled' : 'available';

    this.confirmationService.confirm({
      message: `Are you sure you want to mark this slot as ${newStatus}?`,
      header: 'Confirm Status Change',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: {
        label: this.isSubmitting() ? 'Saving...' : 'Yes',
        disabled: this.isSubmitting(),
      },
      rejectButtonProps: {
        label: 'No',
        icon: 'pi pi-times',
        severity: 'secondary',
        disabled: this.isSubmitting(),
      },
      accept: async () => {
        this.isSubmitting.set(true);
        try {
          await this.mentorScheduleService.updateSlot(this.user.uid, slot.id!, {
            ...slot,
            status: newStatus
          });

          this.messageService.add({
            severity: 'success',
            summary: 'Status Updated',
            detail: `Slot marked as ${newStatus}.`,
            life: 3000,
          });
        } catch (error) {
          console.error('Error updating status:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Update Failed',
            detail: 'Could not change slot status.',
            life: 4000,
          });
        } finally {
          this.isSubmitting.set(false);
        }
      },
    });
  }

  deleteSlot(slot: Slot) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this schedule?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: {
        label: this.isSubmitting() ? 'Deleting...' : 'Yes',
        disabled: this.isSubmitting(),
      },
      rejectButtonProps: {
        label: 'No',
        icon: 'pi pi-times',
        severity: 'secondary',
        disabled: this.isSubmitting(),
      },
      accept: async () => {
        this.isSubmitting.set(true);
        try {
          await this.mentorScheduleService.deleteSlot(this.user.uid, slot.id!);
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted',
            detail: 'Schedule successfully deleted.',
            life: 3000,
          });
        } catch (error) {
          console.error('Delete error:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Delete Failed',
            detail: 'Unable to delete this schedule.',
            life: 4000,
          });
        } finally {
          this.isSubmitting.set(false);
        }
      },
    });
  }

  async saveProduct() {
    this.formSubmitted.set(true);

    const slot = this.newSlot();

    console.log("slot to create: ", slot);

    if (!slot.startAt || !slot.endAt) return;

    const start = new Date(slot.startAt);
    const end = new Date(slot.endAt);

    if (end.getTime() <= start.getTime()) {
      this.invalidTime.set(true);

      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid Time Range',
        detail: 'Start time must be before end time when both are on the same day.',
        life: 6000,
      });
      return;
    }

    this.invalidTime.set(false);
    this.isSubmitting.set(true);

    try {
      if (slot.id) {
        await this.mentorScheduleService.updateSlot(this.user.uid, slot.id, slot);

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Schedule successfully updated.',
          life: 3000,
        });
      } else {
        await this.mentorScheduleService.createSlot(this.user.uid, slot);

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Schedule successfully added.',
          life: 3000,
        });
      }

      // Success: clear form + reset validation
      this.newSlot.set({
        id: '',
        startAt: new Date(),
        endAt: new Date(),
        createdAt: '',
        status: '',
        bookedBy: '',
        sessionId: '',
        updatedAt: '',
        recurring: false,
      });

      this.addNewSched.set(false);
      this.formSubmitted.set(false);
    } catch (error: any) {
      console.error('error:', error);

      this.messageService.add({
        severity: 'error',
        summary: 'Save Failed',
        detail: 'There was an error saving the schedule.',
        life: 4000,
      });
    }
    finally {
      this.isSubmitting.set(false);
    }
  }

  slotStatus(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | undefined {
    switch (status) {
      case 'available':
        return 'success';
      case 'completed':
        return 'info';
      case 'booked':
        return 'secondary';
      case 'cancelled':
        return 'warn';
      case 'expired':
        return 'danger';
      default:
        return undefined;
    }
  }
}
