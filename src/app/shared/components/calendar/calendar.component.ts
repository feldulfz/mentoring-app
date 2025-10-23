import { Component, ElementRef, AfterViewInit, ViewChild, input, output, signal, effect, OnDestroy } from '@angular/core';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('calendar', { static: true }) calendarEl!: ElementRef<HTMLDivElement>;

  availability = input<{ id: string; startAt: string; status: string }[]>([]);

  dateSelected = output<string>();

  private highlightDates = signal<string[]>([]);
  private sheet = new CSSStyleSheet();
  private fp: flatpickr.Instance | null = null;

  constructor() {
    // Watch for availability changes → compute highlight dates
    effect(() => {
      const slots = this.availability();
      const dates = Array.from(new Set(slots.map(s => s.startAt.split('T')[0])));
      this.highlightDates.set(dates);

      if (this.fp && dates.length) {
        this.fp.set('enable', dates);
        this.updateHighlight(this.fp);
      }
    });
  }

  ngAfterViewInit() {
    document.adoptedStyleSheets.push(this.sheet);
    this.initCalendar();
  }

  private initCalendar() {
    this.fp = flatpickr(this.calendarEl.nativeElement, {
      inline: true,
      dateFormat: 'Y-m-d',
      enable: this.highlightDates(),
      onReady: (_, __, fp) => this.updateHighlight(fp),
      onChange: (selectedDates, dateStr, fp) => {
        this.updateHighlight(fp);
        this.dateSelected.emit(dateStr);
      },
    });
  }

  private updateHighlight(fp: any) {
    const ariaLabels = this.highlightDates().map((d) =>
      fp.formatDate(new Date(d), fp.config.ariaDateFormat)
    );
    const selectors = ariaLabels.map((l) => `[aria-label="${l}"]`).join(',');

    this.sheet.replaceSync(`
    /* Highlight available dates (green) */
    .flatpickr-calendar :is(${selectors}) {
      background-color: #10b981 !important;
      color: white !important;
      border-radius: 20px;
      border: none;
    }

    /* Highlight selected date (orange) */
    .flatpickr-calendar .flatpickr-day.selected,
    .flatpickr-calendar .flatpickr-day.startRange,
    .flatpickr-calendar .flatpickr-day.endRange {
      background-color: #0ea5e9 !important; /* orange-500 */
      color: white !important;
      border-radius: 20px;
      border: none;
    }
  `);
  }

  ngOnDestroy() {
    // Proper cleanup
    if (this.fp) {
      this.fp.destroy();
      this.fp = null;
    }

    // Remove the stylesheet from document
    const index = document.adoptedStyleSheets.indexOf(this.sheet);
    if (index > -1) {
      const sheets = [...document.adoptedStyleSheets];
      sheets.splice(index, 1);
      document.adoptedStyleSheets = sheets;
    }
  }
}
