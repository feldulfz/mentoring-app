import { Injectable, inject } from '@angular/core';
import { Firestore, doc, setDoc, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreSeederService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  async seedMentorAccounts() {
    const mentors = [
      {
        first_name: 'Alicia',
        last_name: 'Torres',
        email: 'alicia.torres@example.com',
        password: 'password123',
        country: 'Philippines',
        role: 'mentor',
        current_job: 'Senior Full-Stack Software Engineer',
        company: 'NextWave Technologies',
        professional_years_experience: 8,
        expertise: ['Angular', 'Node.js', 'Azure', 'REST API Design', 'Microservices'],
        industries: ['Software Development', 'Cloud Computing', 'Web Applications'],
        skills: ['Leadership', 'Mentoring', 'Problem Solving', 'Clean Code', 'Team Collaboration'],
        education: 'Bachelor of Science in Computer Science',
        school: 'University of the Philippines',
        linkedIn: 'https://www.linkedin.com/in/aliciatorres/',
        website: 'https://aliciatorres.dev',
        bio: 'Full-stack engineer with 8+ years of experience developing cloud-based and scalable web solutions.',
        // 👇 Updated availability with full timestamps (UTC+8)
        availability: [
          { startAt: '2025-10-15T09:00:00+08:00', endAt: '2025-10-15T10:00:00+08:00' },
          { startAt: '2025-10-16T14:00:00+08:00', endAt: '2025-10-16T15:00:00+08:00' }
        ]
      },
      {
        first_name: 'Brandon',
        last_name: 'Lee',
        email: 'brandon.lee@example.com',
        password: 'password123',
        country: 'United States',
        role: 'mentor',
        current_job: 'Frontend Architect',
        company: 'Skyline Digital',
        professional_years_experience: 10,
        expertise: ['Angular', 'TypeScript', 'Tailwind CSS', 'UI/UX', 'Responsive Design'],
        industries: ['Web Design', 'E-commerce', 'SaaS Platforms'],
        skills: ['Creative Direction', 'Design Systems', 'Accessibility', 'Performance Optimization'],
        education: 'Bachelor of Science in Information Technology',
        school: 'Stanford University',
        linkedIn: 'https://www.linkedin.com/in/brandonlee/',
        website: 'https://brandonlee.dev',
        bio: 'Creative frontend architect passionate about building accessible, high-performance interfaces.',
        availability: [
          { startAt: '2025-10-18T10:00:00-07:00', endAt: '2025-10-18T11:30:00-07:00' },
          { startAt: '2025-10-19T13:00:00-07:00', endAt: '2025-10-19T14:00:00-07:00' }
        ]
      }
    ];

    for (const mentor of mentors) {
      try {
        // Step 1: Create Firebase Auth account
        const userCredential = await createUserWithEmailAndPassword(this.auth, mentor.email, mentor.password);
        const user: User = userCredential.user;
        const uidToUse = user.uid;

        // Step 2: users collection
        const userData = {
          uid: uidToUse,
          first_name: mentor.first_name,
          last_name: mentor.last_name,
          country: mentor.country,
          roles: [mentor.role],
          email: user.email,
          emailIsVerified: user.emailVerified,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };

        // Step 3: mentorProfiles collection
        const mentorData = {
          uid: uidToUse,
          first_name: mentor.first_name,
          last_name: mentor.last_name,
          country: mentor.country,
          current_job: mentor.current_job,
          company: mentor.company,
          professional_years_experience: mentor.professional_years_experience,
          expertise: mentor.expertise,
          industries: mentor.industries,
          skills: mentor.skills,
          education: mentor.education,
          school: mentor.school,
          linkedIn: mentor.linkedIn,
          website: mentor.website,
          bio: mentor.bio,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };

        // Step 4: Write main documents
        await setDoc(doc(this.firestore, `users/${uidToUse}`), userData);
        await setDoc(doc(this.firestore, `mentorProfiles/${uidToUse}`), mentorData);

        // Step 5: 👇 Add availability slots in a subcollection
        const availabilityRef = collection(this.firestore, `mentorProfiles/${uidToUse}/availability`);

        for (const slot of mentor.availability) {
          await addDoc(availabilityRef, {
            startAt: new Date(slot.startAt), // Firestore auto-converts to Timestamp
            endAt: new Date(slot.endAt),
            status: 'available',
            bookedBy: null,
            sessionId: null,
            createdAt: serverTimestamp()
          });
        }

        console.log(`✅ Created mentor and availability for: ${mentor.first_name} ${mentor.last_name}`);
      } catch (err) {
        console.error(`❌ Failed for ${mentor.email}:`, err);
      }
    }

    console.log('✅ Seeder finished executing.');
  }
}
