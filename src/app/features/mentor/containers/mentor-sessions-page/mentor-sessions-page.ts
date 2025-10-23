import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { BadgeModule } from 'primeng/badge';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwalService } from '../../../../core/services/toast-service/swal.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from "primeng/toast";
import { Rating } from "primeng/rating";
import { AvatarModule } from 'primeng/avatar';
import { SessionsAndRequestService } from '../../../../core/services/sessions-and-request-service';
import { SessionInfoForm } from "../../../../shared/components/forms/session-info-form/session-info-form";
import { RequestInfoForm } from "../../../../shared/components/forms/request-info-form/request-info-form";
import { SessionRatingToMenteeInfoForm } from "../../../../shared/components/forms/session-rating-to-mentee-info-form/session-rating-to-mentee-info-form";
import { MentorSessionsAndRequest } from '../../../../core/services/mentor-service/mentor-sessions-and-request';
import { MentorRequestInterface } from '../../../../shared/interfaces/mentor-interfaces/mentor-request-interface';
import { MentorSessionsInterface } from '../../../../shared/interfaces/mentor-interfaces/mentor-sessions-interface';

@Component({
  selector: 'app-mentor-sessions-page',
  imports: [
    TableModule,
    ReactiveFormsModule,
    DatePipe,
    DividerModule,
    TabsModule,
    InputTextModule,
    BadgeModule,
    IconFieldModule,
    InputIcon,
    TagModule,
    MenuModule,
    ButtonModule,
    Dialog,
    ConfirmDialog,
    ConfirmDialogModule,
    Toast,
    Rating,
    AvatarModule,
    FormsModule,
    SessionInfoForm,
    RequestInfoForm,
    SessionRatingToMenteeInfoForm
],
  templateUrl: './mentor-sessions-page.html',
  styleUrl: './mentor-sessions-page.scss',
})
export class MentorSessionsPage {
  private activatedRoute = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private swal = inject(SwalService);
  private confirmationService = inject(ConfirmationService);
  private sessionsAndRequestService = inject(SessionsAndRequestService);
  private mentorsSessionsAndRequestService = inject(MentorSessionsAndRequest)

  user = this.activatedRoute.snapshot.parent?.data['user'];

  // DIALOG
  SessionInfoDialogue = signal(false);
  RequestInfoEdit = signal(false);
  SessionRatingDialogue = signal(false);

  //CUURENTLY EDITING
  currentlyEditingRequestId: string | null = null;
  currentlyEditingSessionsId: string | null = null;





  //FORMS
  requestForm: FormGroup = this.fb.group({
    menteeName: [{ value: '', disabled: true }],
    goal: [{ value: '', disabled: true }],
    message: [{ value: '', disabled: true }],
    date: [{ value: '', disabled: true }],
    startAt: [{ value: '', disabled: true }],
    endAt: [{ value: '', disabled: true }],
    status: ['pending'],
  });

  sessionForm: FormGroup = this.fb.group({
    menteeName: [{ value: '', disabled: true }],
    mentorName: [{ value: '', disabled: true }],
    topic: [{ value: '', disabled: true }],
    message: [{ value: '', disabled: true }],
    date: [{ value: '', disabled: true }],
    startAt: [{ value: '', disabled: true }],
    endAt: [{ value: '', disabled: true }],
    meetinglink: [''],
    sharedNotes: [''],
  });

  sessionRatingForm: FormGroup = this.fb.group({
    menteeName: [''],
    mentorName: [''],
    feedbackToMentee: [''],
    ratingToMentee: [''],
    feedbackToMentor: [''],
    ratingToMentor: [''],
  });




  //REQUEST DATA
  mentorsAllPendingRequest = toSignal(
    this.mentorsSessionsAndRequestService.getAllMentorsRequestByStatus(
      this.user.id,
      'pending'
    ),
    { initialValue: [] as MentorRequestInterface[]}
  );
  mentorsAllDeclinedRequest = toSignal(
    this.mentorsSessionsAndRequestService.getAllMentorsRequestByStatus(
      this.user.id,
      'declined'
    ),
    { initialValue: [] as MentorRequestInterface[]}
  );

  //SESSION DATA
  mentorsAllUpcomingSession = toSignal(
    this.mentorsSessionsAndRequestService.getAllMentorsSessionsByStatus(
      this.user.id,
      'upcoming'
    ),
    { initialValue: [] as MentorSessionsInterface[]}
  );
  mentorsAllMissedSession = toSignal(
    this.mentorsSessionsAndRequestService.getAllMentorsSessionsByStatus(
      this.user.id,
      'missed'
    ),
    { initialValue: [] as MentorSessionsInterface[]}
  );
  mentorsAllCancelledSession = toSignal(
    this.mentorsSessionsAndRequestService.getAllMentorsSessionsByStatus(
      this.user.id,
      'cancelled'
    ),
    { initialValue: [] as MentorSessionsInterface[]}
  );
  mentorsAllCompletedSession = toSignal(
    this.mentorsSessionsAndRequestService.getAllMentorsSessionsByStatus(
      this.user.id,
      'completed'
    ),
    { initialValue: [] as MentorSessionsInterface[]}
  );
  mentorsAllReviewedSession = toSignal(
    this.mentorsSessionsAndRequestService.getAllMentorsSessionsByStatus(
      this.user.id,
      'reviewed'
    ),
    { initialValue: [] as MentorSessionsInterface[]}
  );


  //GET DATA FOR EDIT
  EditRequestData(requestId: string) {
    this.RequestInfoEdit.set(true);
    this.currentlyEditingRequestId = requestId;

    this.sessionsAndRequestService
      .getRequestFullDetailsById(requestId)
      .subscribe({
        next: (data) => {
          this.requestForm.patchValue({
            menteeName: `${data.menteeProfile?.first_name ?? ''} ${
              data.menteeProfile?.last_name ?? ''
            }`,
            goal: data.goal ?? '',
            message: data.message ?? '',
            date: data.slot?.startAt ? new Date(data.slot.startAt) : '',
            startAt: data.slot?.startAt ? new Date(data.slot.startAt) : '',
            endAt: data.slot?.endAt ? new Date(data.slot.endAt) : '',
            status: data.status ?? 'pending',
          });
        },
        error: (err) => this.swal.error(`Fail to load Request info. ${err}`),
      });
  }

  EditSessionData(sessionId: string) {
    this.SessionInfoDialogue.set(true);
    this.currentlyEditingSessionsId = sessionId;

    this.sessionsAndRequestService
      .getSessionFullDetailsById(sessionId)
      .subscribe({
        next: (data) => {
          this.sessionForm.patchValue({
            menteeName: `${data.menteeProfile?.first_name ?? ''} ${
              data.menteeProfile?.last_name ?? ''
            }`,
            mentorName: `${data.mentorProfile?.first_name ?? ''} ${
              data.mentorProfile?.last_name ?? ''
            }`,
            topic: data.about ?? '',
            message: data.message ?? '',
            date: data.slot?.startAt ? new Date(data.slot.startAt) : '',
            startAt: data.slot?.startAt ? new Date(data.slot.startAt) : '',
            endAt: data.slot?.endAt ? new Date(data.slot.endAt) : '',
            meetinglink: data.meetingLink ?? '',
            sharedNotes: data.sharedNotes ?? '',
          })

        },
        error: (err) => this.swal.error(`Fail to load Session info. ${err}`),
      });
  }

  EditRatingData(sessionId: string) {
    this.SessionRatingDialogue.set(true);
    this.currentlyEditingSessionsId = sessionId;

    this.sessionsAndRequestService
      .getSessionFullDetailsById(sessionId)
      .subscribe({
        next: (data) => {
          this.sessionRatingForm.patchValue({
            menteeName: `${data.menteeProfile?.first_name ?? ''} ${
              data.menteeProfile?.last_name ?? ''
            } `,
            mentorName: `${data.mentorProfile?.first_name ?? ''} ${
              data.mentorProfile?.last_name ?? ''
            }`,
            ratingToMentee: `${data.ratingToMentee}`,
            feedbackToMentee: `${data.feedbackToMentee ?? ''}`,
            ratingToMentor: `${data.ratingToMentor}`,
            feedbackToMentor: `${data.feedbackToMentor ?? ''}`,
          });
        },
        error: (err) => this.swal.error(`Fail to load Rating info. ${err}`),
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

    this.sessionsAndRequestService.updateRequestInfo(
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
      meetingLink: formValue.meetinglink,
      sharedNotes: formValue.sharedNotes,
      updatedAt: new Date(),
    };

    this.sessionsAndRequestService.updateSessionInfo(
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
  updateRatingAndFeedback(sessionId: string) {
    if (this.sessionRatingForm.invalid) return;

    const formValue = this.sessionRatingForm.getRawValue();

    const updateData = {
      ratingToMentee: formValue.ratingToMentee,
      feedbackToMentee: formValue.feedbackToMentee,
      updatedAt: new Date(),
      status: 'completed',
    };

    this.sessionsAndRequestService.updateSessionInfo(
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



  //UPDATE REQUEST STATUS
  declineRequest(requestId: string) {
    if (!requestId) {
      this.swal.error('No selected request.');
    }

    this.sessionsAndRequestService.declineMentorshipRequest(requestId).subscribe({
      next: () => {
        this.swal.success('Request Successfully declined.');
        this.hideRequestInfoEdit();
      },
      error: (err) => {
        this.swal.error(err);
      },
    });
  }

  acceptRequest(requestId: string) {
    if (!requestId) {
      this.swal.error('No selected request.');
      return;
    }

    this.sessionsAndRequestService.acceptMentorshipRequest(requestId).subscribe({
      next: () => {
        this.swal.success('Request successfully accepted. Session created!');
        this.hideRequestInfoEdit();
      },
      error: (err) => {
        console.error(err);
        this.swal.error('Failed to accept the request.');
      },
    });
  }

  //UPDATE SESSION STATUS
  markAsSessionAsCompleted(sessiontId: string) {
    if (!sessiontId) {
      this.swal.error('No selected session.');
    }

    this.sessionsAndRequestService
      .markAsCompletedSession(sessiontId)
      .subscribe({
        next: () => {
          this.swal.success('Session Successfully Marked as Completed.');
        },
        error: (err) => {
          this.swal.error(err);
        },
      });
  }

  markAsMissedSession(sessiontId: string) {
    if (!sessiontId) {
      this.swal.error('No selected session.');
    }

    this.sessionsAndRequestService.markAsMissedSession(sessiontId).subscribe({
      next: () => {
        this.swal.success('Session Successfully Marked as Missed.');
      },
      error: (err) => {
        this.swal.error(err);
      },
    });
  }

  markAsCancelledSession(sessionId: string) {
    if (!sessionId) {
      this.swal.error('No selected request.');
    }

    this.sessionsAndRequestService.markAsCancelledSession(sessionId).subscribe({
      next: () => {
        this.swal.success('Session Successfully cancelled.');
        this.hideSessionInfoDialogue();
      },
      error: (err) => {
        this.swal.error(err);
      },
    });
  }



  //CONFIRMATION DIALOG
  markCompletedConfirmation(event: Event, sessionId: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to mark this session?',
      header: 'Mark as Completed',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Mark as Completed',
      },
      accept: () => {
        this.markAsSessionAsCompleted(sessionId);
        this.swal.success('Session marked as completed.');
      },
      reject: () => {
        // this.markAsMissedSession(sessionId);
        // this.swal.success('Session marked as Missed.');
      },
    });
  }
  markCancelledConfirmation(event: Event, sessionId: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to cancel this Booking?',
      header: 'Cancel Booking',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Confirm',
        severity: 'danger',
      },

      accept: () => {
        this.markAsCancelledSession(sessionId);
        this.swal.success('Success');
      },
      reject: () => {},
    });
  }
  cancelBooking(event: Event, requestId: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to decline this Booking?',
      header: 'Cancel Booking',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Confirm',
        severity: 'danger',
      },

      accept: () => {
        this.declineRequest(requestId);
        this.swal.success('Success');
      },
      reject: () => {},
    });
  }
  markAsMissedlBooking(event: Event, sessiontId: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to mark this as Missed Booking?',
      header: 'Missed Booking ',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Confirm',
        severity: 'danger',
      },

      accept: () => {
        this.markAsMissedSession(sessiontId);
        this.swal.success('Success');
      },
      reject: () => {},
    });
  }
  acceptBookingConfirmation(event: Event, requestId: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to accept this Booking?',
      header: 'Accept Booking',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Accepted Session Booking',
      },
      accept: () => {
        this.acceptRequest(requestId);
        this.swal.success('Session marked as completed.');
      },
      reject: () => {},
    });
  }




  //HIDE DIALOG
  hideRequestInfoEdit() {
    this.RequestInfoEdit.set(false);
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

  //STATUS TAGS COLOR
  TagStatus(
    status: string
  ): 'success' | 'info' | 'warn' | 'danger' | 'contrast' | undefined {
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
}
