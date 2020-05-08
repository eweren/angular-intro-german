import {of} from 'rxjs';
import {Injectable, Inject} from '@angular/core';
import {WebStorageService, LOCAL_STORAGE} from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpClient {
  /**
   * Innerhalb eines Konstruktors können abhängige Klassen importiert werden.
   * Meistens sind das eigene oder von anderen Paketen genutzte Services.
   * Der WebStorageService hat hier zudem die Besonderheit, dass eine weitere
   * Abhängigkeit injected, also eingespeist werden muss.
   */
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {}

  /**
   * Imitates a put-http-request.
   * Therefore all items will be added to the mock-db.
   * @param path the path to write the elements to.
   * @param items the items that should be written to the mock-db.
   * Der Spread operator '...' vor einem Parameter gibt an, dass beliebig viele Werte übergeben werden können.
   * Das bedeutet, dass diese Funktion folgende (und mehr) Aufrufmöglichkeiten haben kann:
   *    httpClient.put('path', 'item') oder
   *    httpClient.put('path', 'item', 'item2') oder
   *    httpClient.put('path', ['item']).
   */
  async put(path: string, ...items: Array<any>): Promise<any> {
    /**
     * Die syntax 'var = xy || []' gibt an,
     * dass wenn der erste Wert vor dem '||' null oder undefined ist,
     * der Wert nach dem '||' der Variablen zugeordet wird.
     */
    const preValue = JSON.parse(this.storage.get(path)) || [];

    /**
     * Mit 'Array.concat(Array2)' kann ein Array erweitert werden.
     */
    const notes = preValue.concat(...items);
    this.storage.set(path, JSON.stringify(notes));
    /**
     * Mit der delay Funktion (siehe unten eigene Implementierung) kann die Ausführung des nachfolgenden Codes verzögert werden.
     */
    await delay(300);
    const status = {status: 200};

    /**
     * Mit dem 'of'-Operator von RxJs kann aus allem ein Observable erzeugt werden.
     * Was das bedeutet, kommt später.
     * Nur kurz: Observables sind unverzichtbar für asynchrone Programmierung - also die Ausführung von
     * nebeneinander und parallel ausgeführen Aufgaben.
     * Das wird im späteren Verlauf sehr wichtig, wenn Serverabfragen gemacht werden (wie hier gemockt),
     * oder auch verschiedene Komponenten über Änderungen der Daten informiert werden müssen.
     */
    return of(status).toPromise();
  }

  /**
   * Imitates a push-http-request.
   * Therefore all items will be written to the mock-db by REPLACING.
   * We limit the datatype to an Array.
   * @param path the path to write the elements to.
   * @param item the items that should be written to the mock-db.
   */
  async push(path: string, ...items: Array<any>): Promise<any> {
    /**
     * Workaround da durch den spreadOperator unser übergebenes Array nicht aufgelöst wird.
     */
    const arrayToAdd = [].concat(...items);
    this.storage.set(path, JSON.stringify(arrayToAdd));
    await delay(500);
    const status = {status: 200};
    return of(status).toPromise();
  }

  /**
   * Imitates a patch-http-request.
   * Therefore it searches for the item in the saved items of the path and replaces the item with the newly patched one.
   * @param path the path to find the item to patch.
   * @param patch the Patch that should be applied.
   */
  async patch(path: string, patch: any): Promise<any> {
    /**
     * Mit JSON.parse können einfache Strings wieder in Native Javascript-Objekte umgewandelt werden.
     *
     * Beispielsweise würde aus dem String '{_id: 123, title: 'test'}' das Object
     * {
     *  _id: 123,
     *  title: 'test'
     * }
     *
     * Umgekehrt können Objekte mit der Hilfe von JSON.stringify in einen String umgewandelt werden.
     */
    const notes = [...JSON.parse(this.storage.get(path))];
    /**
     * Da wir nicht wissen, wie die Daten aussehen, habe ich einfach mal die
     * Property _id als Identifikator genommen (in Anlehnung an MongoDB).
     *
     * Mit findIndex kann man ein Objekt in einem Array nach einer Bedingung suchen und bekommt den
     * ersten Index des Objekts, auf das diese Bedingung zutrifft.
     *
     * Die Funktion find auf einem Array liefert entprechendes Element zurück.
     */
    const itemIndex = notes.findIndex(obj => obj._id === patch._id);
    if (itemIndex > -1) {
      /**
       * Mit Object.assign kann ein beliebiges JavaScript-Objekt erweitert werden.
       * Dafür ist der erste Parameter das Objekt, das erweitert wird und
       * der zweite Parameter ein Objekt mit Properties, die auf das erste kopiert werden.
       */
      Object.assign(notes[itemIndex], patch);
      this.storage.set(path, JSON.stringify(notes));
      await delay(300);
      const status = {status: 200};
      return of(status).toPromise();
    } else {
      await delay(300);
      const status = {status: 500};
      return of(status).toPromise();
    }
  }

  /**
   * Returns the notes from the mock-server.
   * Therefore it parses the elements from the storage at the given path.
   * @param path the elemnts of this path will be returned.
   */
  async get(path: string): Promise<Array<string>> {
    await delay(300);
    return of(JSON.parse(this.storage.get(path))).toPromise();
  }
}

/**
 * Helper function to delay an operation in an async function.
 * @param ms the delay in miliseconds.
 */
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
