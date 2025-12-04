```markdown
# Mentoring Application

![Angular](https://img.shields.io/badge/Angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PrimeNG](https://img.shields.io/badge/PrimeNG-000000?style=for-the-badge&logo=primeng&logoColor=white)

A comprehensive mentoring platform built with Angular and Firebase, designed to connect mentees with expert mentors for professional growth and knowledge sharing.

## Features

### Core Functionality
- **User Roles**: Distinct roles for mentees, mentors, and administrators
- **Mentor Profiles**: Detailed mentor profiles with expertise, experience, and availability
- **Session Booking**: Easy scheduling of mentoring sessions
- **Calendar Integration**: Google Calendar integration for seamless scheduling
- **Feedback System**: Rating and feedback mechanism for mentoring sessions

### Advanced Features
- **Search & Discovery**: Advanced search functionality to find the right mentor
- **Availability Management**: Mentors can manage their availability slots
- **Session Tracking**: Track all mentoring sessions and requests
- **Data Analytics**: Dashboard for mentors to track their performance
- **Responsive UI**: Modern, responsive interface using TailwindCSS and PrimeNG

### Technical Highlights
- **Firebase Integration**: Authentication, Firestore database, and storage
- **Real-time Updates**: Live updates for mentorship requests and sessions
- **Custom UI Components**: Custom loader, navigation, and toast notifications
- **Data Seeding**: Built-in database seeding for development

## Tech Stack

### Primary Technologies
- **Frontend**: Angular 20.3.6
- **Styling**: TailwindCSS, DaisyUI, PrimeNG
- **Backend Services**: Firebase (Auth, Firestore, Storage)
- **State Management**: RxJS Observables
- **Build Tools**: Angular CLI, Webpack

### Additional Libraries
- **UI Components**: Material UI, PrimeIcons
- **Date Picker**: Flatpickr
- **Notifications**: SweetAlert2
- **Data Visualization**: Chart.js (via PrimeNG)
- **Testing**: Jasmine, Karma

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Angular CLI
- Firebase account

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/mentoring-app.git
   cd mentoring-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Firebase**:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Add your Firebase configuration to `src/environments/environment.ts` and `src/environments/environment.prod.ts`
   - Enable Authentication, Firestore Database, and Storage services

4. **Run the development server**:
   ```bash
   ng serve
   ```

5. **Access the application**:
   Open your browser to `http://localhost:4200`

### Development Setup

For a complete development environment:

```bash
# Install all dependencies including dev tools
npm install --save-dev

# Set up environment variables
cp .env.example .env

# Run tests
ng test

# Build for production
ng build --prod
```

## Usage

### Basic Navigation

The application features a role-based navigation system:

```typescript
// Example route configuration from app.routes.ts
{
  path: 'mentee',
  loadChildren: () => import('../app/features/mentee/mentee-routing-module').then(m => m.MENTEE_ROUTES),
  canActivate: [AuthGuard, RoleGuard],
  data: { authGuardPipe: redirectToLogin, roles: ['mentee'] }
}
```

### Key Components

#### Authentication Flow
1. **Sign In**: Users can sign in with email/password or Google
2. **Role Selection**: New users select their role (mentee/mentor)
3. **Profile Completion**: Users complete their profile based on their role

#### Mentor Dashboard
```typescript
// Example service method to get mentor profile
getFullMentorProfileById(mentorId: string): Observable<any> {
  // Implementation using Firestore
}
```

#### Mentee Experience
- Search for mentors by expertise, location, or availability
- View mentor profiles and availability
- Book sessions with preferred mentors

### API Examples

**Searching for Mentors**:
```typescript
// Using the MentorService
async searchMentors(keyword: string): Promise<any[]> {
  // Implementation using Firestore query
}
```

**Booking a Session**:
```typescript
// Using the MentorService
async bookSlot(formValue: any): Promise<void> {
  // Implementation using Firestore
}
```

## Project Structure

```
mentoring-app/
├── src/
│   ├── app/
│   │   ├── core/                  # Core services, guards, and utilities
│   │   ├── features/              # Feature modules (auth, mentor, mentee, admin)
│   │   ├── shared/                # Shared components and interfaces
│   │   ├── app.component.ts       # Main application component
│   │   ├── app.routes.ts          # Routing configuration
│   │   └── app.config.ts          # Application configuration
│   ├── assets/                   # Static assets
│   ├── environments/              # Environment configuration
│   └── index.html                # Main HTML template
├── public/                       # Public assets
├── .editorconfig                 # Editor configuration
├── .gitignore                    # Git ignore rules
├── angular.json                  # Angular configuration
├── package.json                  # Project dependencies
├── tsconfig.json                # TypeScript configuration
└── README.md                     # Project documentation
```

## Configuration

### Environment Variables

Create a `.env` file in your project root with the following variables:

```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

### Firebase Configuration

Update your environment files:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};
```

---

## Visuals

### WelcomePage

![mentor_1](ReadMeImages/mentor_1.png 'mentor_1')

### Register As Mentor

![mentor_2](ReadMeImages/mentor_2.png 'mentor_2')

![mentor_3](ReadMeImages/mentor_3.png 'mentor_3')

![mentor_4](ReadMeImages/mentor_4.png 'mentor_4')

![mentor_5](ReadMeImages/mentor_5.png 'mentor_5')

![mentor_6](ReadMeImages/mentor_6.png 'mentor_6')

![mentor_8](ReadMeImages/mentor_8.png 'mentor_8')

### Mentor Dashbord

![mentor_9](ReadMeImages/mentor_9.png 'mentor_9')

### Mentor Profile

![mentor_10](ReadMeImages/mentor_10.png 'mentor_10')

### Mentor Sessions Dashboard

![mentor_11](ReadMeImages/mentor_11.png 'mentor_11')

### Mentor Schedule's Dashboard

![mentor_12](ReadMeImages/mentor_12.png 'mentor_12')

### Mentor Meente Feedback Dashboard

![mentor_13](ReadMeImages/mentor_13.png 'mentor_13')

### Mentor Create Schedule

![mentor_14](ReadMeImages/mentor_14.png 'mentor_14')

![mentor_15](ReadMeImages/mentor_15.png 'mentor_15')

![mentor_16](ReadMeImages/mentor_16.png 'mentor_16')

