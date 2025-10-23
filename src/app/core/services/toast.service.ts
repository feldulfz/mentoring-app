import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // makes it globally injectable
})
export class ToastService {

  show(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success', duration = 3000): void {
    const container = document.createElement('div');
    container.className = 'toast toast-top toast-center z-50'; // z-50 to ensure on top
    container.innerHTML = `
      <div class="alert alert-${type}">
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(container);

    setTimeout(() => container.remove(), duration);
  }
}