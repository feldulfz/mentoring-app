import { Injectable, inject } from '@angular/core';
import { Firestore, doc, setDoc, serverTimestamp } from '@angular/fire/firestore';
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
        first_name: 'Liam',
        last_name: 'Anderson',
        email: 'liam.anderson@example.com',
        password: 'password123',
        country: 'New Zealand',
        role: 'mentor',
        current_job: 'Senior Cloud Solutions Architect',
        company: 'KiwiTech Innovations',
        professional_years_experience: 9,
        expertise: ['AWS', 'Node.js', 'React', 'Serverless Architecture', 'DevOps'],
        industries: ['Cloud Computing', 'Software Development', 'IT Consulting'],
        skills: ['System Design', 'Mentoring', 'Problem Solving', 'Automation', 'Team Leadership'],
        education: 'Bachelor of Science in Computer Science',
        school: 'University of Auckland',
        linkedIn: 'https://www.linkedin.com/in/liamandersonnz/',
        website: 'https://liamanderson.nz',
        bio: 'Cloud architect from New Zealand specializing in scalable serverless applications and AWS infrastructure.'
      },
      {
        first_name: 'Sophie',
        last_name: 'Ngatai',
        email: 'sophie.ngatai@example.com',
        password: 'password123',
        country: 'New Zealand',
        role: 'mentor',
        current_job: 'Lead UI/UX Designer',
        company: 'Aotearoa Digital Studio',
        professional_years_experience: 11,
        expertise: ['Figma', 'Angular', 'TypeScript', 'User Research', 'Design Systems'],
        industries: ['Digital Design', 'E-commerce', 'SaaS Platforms'],
        skills: ['Creative Strategy', 'Accessibility', 'Prototyping', 'Collaboration', 'Design Thinking'],
        education: 'Bachelor of Design Innovation in Interaction Design',
        school: 'Victoria University of Wellington',
        linkedIn: 'https://www.linkedin.com/in/sophiengatai/',
        website: 'https://sophiengatai.nz',
        bio: 'UI/UX designer passionate about creating inclusive, engaging, and user-first digital experiences across web platforms.'
      },
      {
        first_name: 'Ethan',
        last_name: 'Rutherford',
        email: 'ethan.rutherford@example.com',
        password: 'password123',
        country: 'New Zealand',
        role: 'mentor',
        current_job: 'Data Science Lead',
        company: 'Southern Analytics Ltd',
        professional_years_experience: 7,
        expertise: ['Python', 'TensorFlow', 'Data Visualization', 'Machine Learning', 'Big Data'],
        industries: ['Finance', 'Healthcare', 'Data Analytics'],
        skills: ['Statistical Modeling', 'Predictive Analysis', 'Mentoring', 'SQL', 'Presentation'],
        education: 'Master of Data Science',
        school: 'University of Otago',
        linkedIn: 'https://www.linkedin.com/in/ethanrutherfordnz/',
        website: 'https://ethanrutherford.nz',
        bio: 'Data scientist focused on delivering actionable insights through machine learning and data-driven strategies.'
      },
      {
        first_name: 'Amelia',
        last_name: 'Clarke',
        email: 'amelia.clarke@example.com',
        password: 'password123',
        country: 'New Zealand',
        role: 'mentor',
        current_job: 'Product Manager',
        company: 'HarbourTech Solutions',
        professional_years_experience: 10,
        expertise: ['Agile', 'Scrum', 'Product Strategy', 'Roadmapping', 'Stakeholder Management'],
        industries: ['Software Products', 'Fintech', 'Startups'],
        skills: ['Leadership', 'Communication', 'Team Building', 'Customer Research', 'Critical Thinking'],
        education: 'Bachelor of Commerce in Information Systems',
        school: 'University of Canterbury',
        linkedIn: 'https://www.linkedin.com/in/ameliaclarvenz/',
        website: 'https://ameliaclarvenz.co.nz',
        bio: 'Product leader helping cross-functional teams build meaningful, user-focused software solutions.'
      },
      {
        first_name: 'Noah',
        last_name: 'Reid',
        email: 'noah.reid@example.com',
        password: 'password123',
        country: 'New Zealand',
        role: 'mentor',
        current_job: 'Mobile App Developer',
        company: 'AppWorx NZ',
        professional_years_experience: 6,
        expertise: ['React Native', 'Flutter', 'JavaScript', 'iOS', 'Android'],
        industries: ['Mobile Development', 'E-commerce', 'Education Technology'],
        skills: ['Cross-Platform Development', 'UI Design', 'Debugging', 'Performance Tuning', 'Team Collaboration'],
        education: 'Bachelor of Information Technology',
        school: 'Auckland University of Technology',
        linkedIn: 'https://www.linkedin.com/in/noahreidnz/',
        website: 'https://noahreid.nz',
        bio: 'Mobile developer crafting user-friendly, high-performance cross-platform applications.'
      },
      {
        first_name: 'Isla',
        last_name: 'Walker',
        email: 'isla.walker@example.com',
        password: 'password123',
        country: 'New Zealand',
        role: 'mentor',
        current_job: 'Cybersecurity Consultant',
        company: 'SecureAotearoa Ltd',
        professional_years_experience: 12,
        expertise: ['Network Security', 'Ethical Hacking', 'Penetration Testing', 'Risk Assessment', 'Incident Response'],
        industries: ['Cybersecurity', 'Telecommunications', 'Government'],
        skills: ['Threat Analysis', 'Problem Solving', 'Documentation', 'Training', 'Leadership'],
        education: 'Master of Information Security and Digital Forensics',
        school: 'Auckland University of Technology',
        linkedIn: 'https://www.linkedin.com/in/islawalkernz/',
        website: 'https://islawalker.nz',
        bio: 'Cybersecurity expert dedicated to improving digital resilience and mentoring future security professionals.'
      },
      {
        first_name: 'Oliver',
        last_name: 'Te Aho',
        email: 'oliver.teaho@example.com',
        password: 'password123',
        country: 'New Zealand',
        role: 'mentor',
        current_job: 'Backend Engineer',
        company: 'Pacific Cloud Systems',
        professional_years_experience: 8,
        expertise: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'GraphQL'],
        industries: ['Software Development', 'API Design', 'Cloud Infrastructure'],
        skills: ['Clean Code', 'System Architecture', 'Debugging', 'Mentoring', 'Database Optimization'],
        education: 'Bachelor of Engineering in Software Engineering',
        school: 'Massey University',
        linkedIn: 'https://www.linkedin.com/in/oliverteaho/',
        website: 'https://oliverteaho.nz',
        bio: 'Backend engineer with a focus on scalable APIs and cloud-native solutions for modern web ecosystems.'
      }
    ];


    for (const mentor of mentors) {
      const {
        first_name,
        last_name,
        email,
        password,
        country,
        role,
        current_job,
        company,
        professional_years_experience,
        expertise,
        industries,
        skills,
        education,
        school,
        linkedIn,
        website,
        bio
      } = mentor;

      try {
        // Step 1: Create Firebase Auth account
        const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
        const user: User = userCredential.user;
        const uidToUse = user.uid;

        // Step 2: Create user data
        const userData = {
          uid: uidToUse,
          first_name,
          last_name,
          country,
          roles: [role],
          email: user.email,
          emailIsVerified: user.emailVerified,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };

        // Step 3: Create mentor profile data
        const mentorData = {
          uid: uidToUse,
          first_name,
          last_name,
          country,
          current_job,
          company,
          professional_years_experience,
          expertise,
          industries,
          skills,
          education,
          school,
          linkedIn,
          website,
          bio,
          searchTokens: this.generateSearchTokens(
            first_name,
            last_name,
            country,
            current_job,
            company,
            professional_years_experience.toString(),
            expertise,
            industries,
            skills,
            education,
            school,
            linkedIn,
            website,
            bio
          ),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };

        // Step 4: Write to Firestore (no availability subcollection)
        await setDoc(doc(this.firestore, `users/${uidToUse}`), userData);
        await setDoc(doc(this.firestore, `mentorProfiles/${uidToUse}`), mentorData);

        console.log(`Created mentor profile with search tokens: ${first_name} ${last_name}`);
      } catch (err) {
        console.error(`Failed for ${email}:`, err);
      }
    }

    console.log('Seeder finished executing.');
  }

  private generateSearchTokens(...fields: any[]): string[] {
    const tokens = new Set<string>();
    const stopWords = new Set([
      "and", "with", "of", "for", "in", "the", "to", "a", "an", "on", "at", "by"
    ]);

    // keep +, #, ., /, -, and @ since they're used in tech names
    const clean = (text: string) =>
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s\+\#\/\.\-\@]/g, "")
        .replace(/\s{2,}/g, " ")
        .trim();

    const addTokensFromText = (text: string) => {
      const words = clean(text)
        .split(/\s+/)
        .filter((w) => w.length > 1 && !stopWords.has(w));

      words.forEach((word) => {
        tokens.add(word); // base token (e.g. "node.js")

        // split by . / + - # to get individual parts
        const subParts = word.split(/[\/\.\+\-\#]/).filter((p) => p.length > 1);
        subParts.forEach((part) => tokens.add(part)); // add "node" and "js"
      });

      // Add 2–4 word combinations
      for (let i = 0; i < words.length; i++) {
        for (let j = i + 1; j <= Math.min(i + 4, words.length); j++) {
          const phrase = words.slice(i, j).join(" ");
          if (phrase.length > 1) tokens.add(phrase);
        }
      }
    };

    fields.forEach((field) => {
      if (!field) return;
      if (Array.isArray(field)) field.forEach((f) => addTokensFromText(f));
      else if (typeof field === "string") addTokensFromText(field);
    });

    return Array.from(tokens);
  }

}
