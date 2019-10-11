import {Component} from '@angular/core';
import {StorageBackendService} from 'src/backend/storage-backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Intro';

  constructor(private storageBackendService: StorageBackendService) {
    this.storageBackendService.getNotes().then(notes => {
      console.log('notes: ', notes);
    });
  }
}
