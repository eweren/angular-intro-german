import {Component, OnInit} from '@angular/core';

import {CustomHttpClient} from './../backend/custom-http-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular Intro';
  constructor(/** Unser 'gemockter' httpClient */ private httpClient: CustomHttpClient) {}

  async ngOnInit(): Promise<void> {
    await this.saveMockData();
    await this.getMockData();
    await this.addOneMockData();
    await this.getMockData();
  }
  async saveMockData(): Promise<void> {
    await this.httpClient.push('/notes', ['eins', 'zwei', 'drei']);
  }

  async addOneMockData(): Promise<void> {
    await this.httpClient.put('/notes', 'vier');
  }

  async getMockData(): Promise<Array<any>> {
    // Normalerweise würde ein angular httpClient request ein Observable statt einer Promise zurückgeben.
    // Daher würde im Realfall dieser Syntax ein 'toPromise()' vor dem .then fehlen.
    // Für Demozwecke ist das allerdings ausreichend.
    return this.httpClient.get('/notes').then(notes => {
      console.log('notes: ', notes);
      return notes;
    });
  }
}
