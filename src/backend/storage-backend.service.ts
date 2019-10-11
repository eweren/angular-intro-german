import {Observable, of, timer} from 'rxjs';
import {take} from 'rxjs/operators';
import {Injectable, Inject} from '@angular/core';
import {WebStorageService, LOCAL_STORAGE} from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class StorageBackendService {
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {}

  async saveNote(...items): Promise<any> {
    const notes = [...JSON.parse(this.storage.get('notes')), ...items];
    this.storage.set('notes', JSON.stringify(notes));
    await setTimeout(() => {}, 300);
    const status = {status: 200};
    return of(status).toPromise();
  }

  /**
   * Returns the notes from the mock-server.
   */
  async getNotes(): Promise<Array<string>> {
    console.time('x');
    console.log(1);
    await of(
      timer(20000)
        .pipe(take(2))
        .toPromise()
    );
    console.timeEnd('x');
    console.log(2);
    return of(JSON.parse(this.storage.get('notes'))).toPromise();
  }
}
