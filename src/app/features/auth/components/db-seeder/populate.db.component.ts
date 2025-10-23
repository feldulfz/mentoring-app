import { Component, OnInit, inject } from '@angular/core';
import { DeleteService } from '../../../../core/services/seeder-service/delete-seeder.service';
import { FirestoreSeederService } from '../../../../core/services/seeder-service/firestore-seeder.service';

@Component({
  selector: 'app-populate.db.component',
  imports: [],
  templateUrl: './populate.db.component.html',
  styleUrl: './populate.db.component.scss'
})
export class PopulateDbComponent {
  private seeder = inject(FirestoreSeederService);

  
  async populateDb() {
    await this.seeder.seedMentorAccounts();
  }

  //--------------------------------------
  // private firestoreSeederService = inject(DeleteService);

  // isLoading = false;
  // resultMessage = '';

  // ngOnInit(): void {
  //   // Optional: something on init
  // }

  // async deleteNewZealandMentors(): Promise<void> {
  //   this.isLoading = true;
  //   this.resultMessage = '';
  //   const columnValue = '';
  //   const collectionName = '';

  //   try {
  //     await this.firestoreSeederService.deleteMentorsByCountry(columnValue, collectionName);
  //     this.resultMessage = 'Successfully deleted';
  //   } catch (error) {
  //     console.error(error);
  //     this.resultMessage = 'Failed to delete mentors.';
  //   } finally {
  //     this.isLoading = false;
  //   }
  // }  
}
