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

  /**
   * A function is marked as async, when the operations it does will be asynchronous,
   * but used in some kind of synchronous way.
   *
   * For example here we first make the async saveMockData() request. We will await the response.
   * Therefore the codeexcecution of the code after this line will be delayed until we have saved the mock data.
   * --> That is like synchronous programming. Do this, then this, then this.
   *
   * If we would not set the await before the async functions, all four functions will be excecuted at the same time.
   * Therefore the ssaveMockData will probably save the mock data after we made the getMochData request.
   */
  async ngOnInit(): Promise<void> {
    await this.saveMockData();
    await this.getMockData();
    await this.addOneMockData();
    await this.getMockData();
  }

  /**
   * Demo for saving mock data to the mock-db.
   */
  async saveMockData(): Promise<void> {
    await this.httpClient.push('/notes', ['eins', 'zwei', 'drei']);
  }

  /**
   * Demo for adding one mockdata to the mock-db.
   */
  async addOneMockData(): Promise<void> {
    await this.httpClient.put('/notes', 'vier');
  }

  /**
   * Demo for getting the mockdata from the mock-server.
   */
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
