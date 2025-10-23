import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { ConfirmationService, MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({
      projectId: "mentoring-platform-app-2d7d1",
      appId: "1:655054895714:web:2e0689d0dc6e93f52e2f3b",
      storageBucket: "mentoring-platform-app-2d7d1.firebasestorage.app",
      apiKey: "AIzaSyAkRZV53MVkysATJqp9__8f1GpPB3q2r74",
      authDomain: "mentoring-platform-app-2d7d1.firebaseapp.com",
      messagingSenderId: "655054895714"
    })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    ConfirmationService, // ✅ global provider
    MessageService,
  ]
};
