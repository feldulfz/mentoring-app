import { Component, OnInit, inject } from '@angular/core';
import { FirestoreSeederService } from '../../../../core/services/firestore-seeder.service';

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
}
