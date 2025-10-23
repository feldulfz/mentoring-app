import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TableModule } from 'primeng/table';

import { CommonModule, DatePipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ProgressSpinnerModule } from 'primeng/progressspinner'; // optional for loading
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';


import { TabsModule } from 'primeng/tabs';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

import { MenuModule } from 'primeng/menu';

import { Jumbotron } from "../../../../shared/components/jumbotron/jumbotron";
import { SwalService } from '../../../../core/services/toast-service/swal.service';
import { Dialog } from "primeng/dialog";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Toast } from "primeng/toast";
import { ConfirmDialog } from "primeng/confirmdialog";
import { ConfirmationService } from 'primeng/api';
import { Rating } from "primeng/rating";
import { RequestInfoForm } from "../../../../shared/components/forms/request-info-form/request-info-form";
import { SessionInfoForm } from "../../../../shared/components/forms/session-info-form/session-info-form";
import { SessionRatingToMenteeInfoForm } from "../../../../shared/components/forms/session-rating-to-mentee-info-form/session-rating-to-mentee-info-form";
import { MenteeSessionsAndRequestService } from '../../../../core/services/mentee-service/mentee-sessions-and-request-service';
import { MenteeRequestInterface } from '../../../../shared/interfaces/mentee-interfaces/mentee-request-interface';
import { MenteeSessionsInterface } from '../../../../shared/interfaces/mentee-interfaces/mentee-sessions-interface';
import { SessionsAndRequestService } from '../../../../core/services/sessions-and-request-service';
import { SessionRatingToMentorInfoForm } from "../../../../shared/components/forms/session-rating-to-mentor-info-form/session-rating-to-mentor-info-form";

@Component({
  selector: 'app-mylearning',
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    TextareaModule,
    ProgressSpinnerModule,
    ButtonModule,
    TabsModule,
    BadgeModule,
    OverlayBadgeModule,
    MenuModule,
    Jumbotron,
    Dialog,
    FormsModule,
    ReactiveFormsModule,
    Toast,
    ConfirmDialog,
    Rating,
    RequestInfoForm,
    SessionInfoForm,
    SessionRatingToMenteeInfoForm,
    SessionRatingToMentorInfoForm
],
  templateUrl: './mylearning.html',
  styleUrls: ['./mylearning.scss'],
})
export class Mylearning {

  private swal = inject(SwalService);
  private activatedRoute = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private confirmationService = inject(ConfirmationService);
  private menteeSessionsAndRequestService = inject(MenteeSessionsAndRequestService)
  private sessionAndRequestService = inject(SessionsAndRequestService);

  user = this.activatedRoute.parent?.snapshot.data['user'];

  //CURRENTLY SELECTED IDS
  currentlyEditingRequestId: string | null = null;
  currentlyEditingSessionsId: string | null = null;

  //TOGGLE DIALOG
  RequestInfoEditDialog = signal(false);
  SessionInfoDialogue = signal(false);
  SessionRatingDialogue = signal(false);


  //REQUEST DATA
  menteesAllPendingRequest = toSignal(this.menteeSessionsAndRequestService.getAllMentorsRequestByStatus(this.user.id, "pending"), { initialValue: [] as MenteeRequestInterface[]});
  menteesAllDeclinedRequest = toSignal(this.menteeSessionsAndRequestService.getAllMentorsRequestByStatus(this.user.id, "declined"), {initialValue: [] as MenteeRequestInterface[]});

  //SESSION DATA
  menteesAllUpcomingSession = toSignal(this.menteeSessionsAndRequestService.getAllMenteeSessionsByStatus(this.user.id, "upcoming"), {initialValue: [] as MenteeSessionsInterface[]});
  menteesAllCompletedSession = toSignal(this.menteeSessionsAndRequestService.getAllMenteeSessionsByStatus(this.user.id, "completed"), {initialValue: [] as MenteeSessionsInterface[]});
  menteesAllReviewedSession = toSignal(this.menteeSessionsAndRequestService.getAllMenteeSessionsByStatus(this.user.id, "reviewed"), {initialValue: [] as MenteeSessionsInterface[]});
  menteesAllCancelledSession = toSignal(this.menteeSessionsAndRequestService.getAllMenteeSessionsByStatus(this.user.id, "cancelled"), {initialValue: [] as MenteeSessionsInterface[]});
  menteesAllMissedSession = toSignal(this.menteeSessionsAndRequestService.getAllMenteeSessionsByStatus(this.user.id, "missed"), {initialValue: [] as MenteeSessionsInterface[]});



  //REACTIVE FORMS
  requestForm: FormGroup = this.fb.group({
    menteeName: [{ value: '', disabled: true }],
    goal: [''],
    message: [''],
    date: [{ value: '', disabled: true }],
    startAt: [{ value: '', disabled: true }],
    endAt: [{ value: '', disabled: true }],
    status: ['pending'],
  });

  sessionForm: FormGroup = this.fb.group({
    menteeName: [{ value: '', disabled: true }],
    mentorName: [{ value: '', disabled: true }],
    topic: [''],
    message: [''],
    date: [{ value: '', disabled: true }],
    startAt: [{ value: '', disabled: true }],
    endAt: [{ value: '', disabled: true }],
    meetinglink: [{ value: '', disabled: true }],
    sharedNotes: [{ value: '', disabled: true }],
  });

  sessionRatingForm: FormGroup = this.fb.group({
    menteeName: [''],
    mentorName: [''],
    feedbackToMentee: [''],
    ratingToMentee: [''],
    feedbackToMentor: [''],
    ratingToMentor: [''],
  });


  //SHOW DIALOG WITH EDIT FORM
  showRequestInfoEdit(requestId: string) {
    this.RequestInfoEditDialog.set(true);
    this.currentlyEditingRequestId = requestId;

     this.sessionAndRequestService.getRequestFullDetailsById(requestId).subscribe({
      next: (data) => {
        this.requestForm.patchValue({
          menteeName: `${data.menteeProfile?.first_name ?? ''} ${data.menteeProfile?.last_name ?? ''
            }`,
          goal: data.goal ?? '',
          message: data.message ?? '',
          date: data.slot?.startAt ? new Date(data.slot.startAt) : '',
          startAt: data.slot?.startAt ? new Date(data.slot.startAt) : '',
          endAt: data.slot?.endAt ? new Date(data.slot.endAt) : '',
          status: data.status ?? 'pending',
        });
      },
      error: (err) => console.error('Failed to load request:', err),
    });

  }

  //SHOW ACCEPTED SESSION WITH EDIT FORM
  showSessionInfoEdit(sessionId: string) {
    this.SessionInfoDialogue.set(true);
    this.currentlyEditingSessionsId = sessionId;

    this.sessionAndRequestService.getSessionFullDetailsById(sessionId).subscribe({
      next: (data) => {
        this.sessionForm.patchValue({
          menteeName: `${data.menteeProfile?.first_name ?? ''} ${data.menteeProfile?.last_name ?? ''
            } `,
          mentorName: `${data.mentorProfile?.first_name ?? ''} ${data.mentorProfile?.last_name ?? ''
            }`,
          topic: `${data.about}`,
          message: `${data.message ?? ''}`,
          sharedNotes: `${data.sharedNotes ?? ''}`,
          meetinglink: `${data.meetingLink ?? 'NA'}`,
          date: data.slot?.startAt ? new Date(data.slot.startAt) : '',
          startAt: data.slot?.startAt ? new Date(data.slot.startAt) : '',
          endAt: data.slot?.endAt ? new Date(data.slot.endAt) : '',
        });
      },
    });
  }

  showSessionRatingDialog(sessionId: string) {
    this.SessionRatingDialogue.set(true);
    this.currentlyEditingSessionsId = sessionId;

    this.sessionAndRequestService.getSessionFullDetailsById(sessionId).subscribe({
      next: (data) => {
        this.sessionRatingForm.patchValue({
          menteeName: `${data.menteeProfile?.first_name ?? ''} ${data.menteeProfile?.last_name ?? ''
            } `,
          mentorName: `${data.mentorProfile?.first_name ?? ''} ${data.mentorProfile?.last_name ?? ''
            }`,
          ratingToMentee: `${data.ratingToMentee}`,
          feedbackToMentee: `${data.feedbackToMentee ?? ''}`,
          ratingToMentor: `${data.ratingToMentor}`,
          feedbackToMentor: `${data.feedbackToMentor ?? ''}`,
        });
      },
    });
  }

  //UPDATE REQUEST DATA
  saveRequestUpdate(requestId: string) {
    if (this.requestForm.invalid) return;

    const formValue = this.requestForm.getRawValue();

    const updateData = {
      goal: formValue.goal,
      message: formValue.message,
      status: formValue.status,
      updatedAt: new Date(),
    };

    this.sessionAndRequestService.updateRequestInfo(
      requestId,
      updateData
    ).subscribe({
      next: () => {
        this.swal.success('Session Updated Successfully');
        this.hideRequestInfoEdit();
      },
      error: (err) => this.swal.error(err),
    });
  }

  //UPDATE SESSION DATA
  saveSessionUpdate(sessionId: string) {
    if (this.sessionForm.invalid) return;

    const formValue = this.sessionForm.getRawValue();

    const updateData = {
      about: formValue.topic,
      message: formValue.message,
      updatedAt: new Date(),
    };

    this.sessionAndRequestService.updateSessionInfo(
      sessionId,
      updateData
    ).subscribe({
      next: () => {
        this.swal.success('Session Data Updated Succesfully.');
        this.hideSessionInfoDialogue();
      },
      error: (err) => this.swal.error(err),
    });
  }

  //CONFIRMATION DIALOG
  cancelBooking(event: Event, requestId: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this Booking?',
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.sessionAndRequestService.deleteMentorshipRequest(requestId);
        this.swal.success('Booking Deleted Successfully');
      },
      reject: () => { },
    });
  }

  //UPDATE REVIEW TO MENTOR
  updateRatingAndFeedback(sessionId: string) {
    if (this.sessionRatingForm.invalid) return;

    // alert(sessionId);
    const formValue = this.sessionRatingForm.getRawValue();

    const updateData = {
      ratingToMentor: formValue.ratingToMentor,
      feedbackToMentor: formValue.feedbackToMentor,
      updatedAt: new Date(),
      status: 'completed',
    };

    this.sessionAndRequestService.updateSessionInfo(
      sessionId,
      updateData
    ).subscribe({
      next: () => {
        this.swal.success('Ratings and Feedback Submitted.');
        this.hideSessionRatingDialog();
      },
      error: (err) => this.swal.error(err),
    });
  }

  //STATUS TAG COLOR
  TagStatus(status: string): 'success' | 'info' | 'warn' | 'danger' | 'contrast' | undefined {
    switch (status) {
      case 'upcoming':
        return 'success';
      case 'completed':
        return 'info';
      case 'pending':
        return 'success';
      case 'reviewed':
        return 'contrast';
      case 'cancelled':
        return 'warn';
      case 'missed':
        return 'danger';
      case 'declined':
        return 'warn';
      default:
        return undefined;
    }
  }



  //HIDE DIALOG
  hideRequestInfoEdit() {
    this.RequestInfoEditDialog.set(false);
    this.requestForm.reset();
  }
  hideSessionInfoDialogue() {
    this.SessionInfoDialogue.set(false);
    this.sessionForm.reset();
  }
  hideSessionRatingDialog() {
    this.SessionRatingDialogue.set(false);
    this.sessionRatingForm.reset();
  }


}
