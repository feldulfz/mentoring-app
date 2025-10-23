import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, User, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { Firestore, addDoc, collection, doc, serverTimestamp, setDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  // init the google auth provider
  googleAuthProvider = new GoogleAuthProvider();  

  async signInUser(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (err) {
      console.error("Error signing in user:", err);
      throw err; 
    }
  }  

  async signInWithGoogle(): Promise<{ user: User, roles: string[] }> {
    try {
      const result = await signInWithPopup(this.auth, this.googleAuthProvider);
      const user = result.user;

      const roles = await this.getUserRoles(user.uid);
      // console.log("User roles:", roles);
      return { user, roles };
    } catch (err) {
      console.error("Google sign in error:", err);
      throw err;
    }
  }

  async registerUser(formValue: any): Promise<void> {
    try {

      if (formValue.role === 'mentee') {

        let userData: any = {}; 
        const { first_name, last_name, email, password, role, uid } = formValue;
        let uidToUse: string = '';

        if (formValue.uid) {
          uidToUse = uid; 

          userData = {
            uid: uidToUse,
            first_name: first_name,
            last_name: last_name,  
            roles: [role],      
            email: email,     
            emailIsVerified: false, // next time for email verification     
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          };            

        } else {
          // Create user in Firebase Auth
          const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
          const user: User = userCredential.user;
          uidToUse = user.uid; 

          userData = {
            uid: uidToUse,
            first_name: first_name,
            last_name: last_name,  
            roles: [role],      
            email: user.email,     
            emailIsVerified: user.emailVerified, // next time for email verification        
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          };            
        }

        await setDoc(doc(this.firestore, `users/${uidToUse}`), userData);           
      }

      if (formValue.role === 'mentor') {

        let userData: any = {}; 
        let meentorData: any = {}; 
        const { first_name, last_name, email, password, country, role, 
          current_job, company, professional_years_experience, expertise, industries, skills, education, school,
          linkedIn, website, bio, uid } = formValue;
        let uidToUse: string = '';                  

        if (formValue.uid) {
          uidToUse = uid;

          userData = {
            uid: uidToUse,
            first_name: first_name,
            last_name: last_name,
            country: country,
            roles: [role],
            email: email,     
            emailIsVerified: false,     
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          };

          meentorData = {
            uid: uidToUse,
            first_name: first_name,
            last_name: last_name,
            country: country,            
            current_job: current_job,
            company: company,
            professional_years_experience: professional_years_experience,
            expertise: expertise,
            industries: industries,
            skills: skills,
            education: education,
            school: school,
            linkedIn: linkedIn,
            website: website,
            bio: bio,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          };            
        }  
        else { 
          // Create user in Firebase Auth
          const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
          const user: User = userCredential.user;
          uidToUse = user.uid;
          
          userData = {
            uid: uidToUse,
            first_name: first_name,
            last_name: last_name,
            country: country,
            roles: [role],
            email: user.email,     
            emailIsVerified: user.emailVerified,     
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          };

          meentorData = {
            uid: uidToUse,
            first_name: first_name,
            last_name: last_name,
            country: country,              
            current_job: current_job,
            company: company,
            professional_years_experience: professional_years_experience,
            expertise: expertise,
            industries: industries,
            skills: skills,
            education: education,
            school: school,
            linkedIn: linkedIn,
            website: website,
            bio: bio,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          };                 
        }          
        
        await setDoc(doc(this.firestore, `users/${uidToUse}`), userData);
        await setDoc(doc(this.firestore, `mentorProfiles/${uidToUse}`), meentorData);        

      }

    } catch (err) {
      console.error("Error creating user:", err);
      throw err;
    }
  }

  async getUserRoles(uid: string): Promise<string[]> {
    const userRef = doc(this.firestore, `users/${uid}`);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      // return snap.data()['roles'] ?? []; 
      return snap.data()['roles'] ?? []; 
    }
    return [];
  }  

  async completeGoogleProfile(data: any) {
    const userDoc = doc(this.firestore, `users/${data.uid}`);
    await setDoc(userDoc, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }, { merge: true });
  }
 }
