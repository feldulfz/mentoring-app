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
      apiKey: "AIzaSyDvgLaoC79HkAhhHDergATqqkbOFp0_dsg",
      authDomain: "mentoring-app-d7b12.firebaseapp.com",
      projectId: "mentoring-app-d7b12",
      storageBucket: "mentoring-app-d7b12.firebasestorage.app",
      messagingSenderId: "1082143753631",
      appId: "1:1082143753631:web:31f68c899227885f2269aa"
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
