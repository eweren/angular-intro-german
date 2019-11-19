## Aufbau

Der Aufbau dieses Projekts richtet sich nach den Lektionen. Die Lektionen starten bei einem Schwierigkeitsgrad, der für absolute Anfänger geeignet ist und steigert sich dann, bis der Schüler auch `async/await`, `Observables` und das `Facade Design Pattern` versteht.

# Lektionen

- [Lektion 1 - Aufbau](#lektion-1---aufbau)
  - [Root](#root)
  - [.gitignore](#.gitignore)
  - [angular.json](#angular.json)
  - [package-lock.json](#package-lock.json)
  - [package.json](#package.json)
  - [README.md](#README.md)
  - [tsconfig.json](#tsconfig.json)
  - [tslint.json](#tslint.json)
  - [src](#src)
- [Lektion 2 - Die Angular App](#lektion-2---die-angular-app)
  - [Module](#Module)
  - [declarations](#declarations)
  - [imports](#imports)
  - [entryComponents](#entryComponents)
  - [providers](#providers)
  - [Komponenten](#Komponenten)
  - [Aufbau](#Aufbau)
- [Lektion 3 - TypeScript](#lektion-3---typescript)
  - [Datentypen](#Primitive-Datentypen)

## Lektion 1 - Aufbau

Angular Projekte sind zum Start immer gleich aufgebaut. Es werden einige Dateien, auf die im Folgenden eingegangen wird, direkt im Hauptverzeichnis angelegt. Im **_src_**-Order findet sich der Quellcode der Anwendung, Medien (**_assets_**), Umgebungsvariablen (**_environments_**) und diverse andere Dateien.

Zusätzlich befinden sich die Order **_node_modules_** und **_e2e_** im Hauptverzeichnis.

### Root

Als **_root_** wird immer das Hauptverzeichnis angesprochen. Hier befinden sich meist nur Konfigurations- und Lizenzdateien. Die wichtigen werden nun näher erläutert:

#### .gitignore

Wenn du schon mal mit dem Versionsverwaltungstool GIT gearbeitet haben solltest, kennst du die **_.gitignore_** bestimmt. Sie dient dazu, bestimmte Dateien und/oder Ordner von GIT nicht mittracken zu lassen. Wird beispielsweise in die **_.gitignore_** folgende Zeile eingefügt

> app/

würde GIT alle Änderungen, die irgendwo innerhalb des Verzeichnisses **_app/_** liegen nicht mit in das Remote-Repository auf welchem Server auch immer übernehmen.

Nach der Initialisierung der App durch die Angular-CLI ist die **_.gitignore_** bereits vorkonfiguriert. Sie trackt dann beispielsweise die node*modules nicht. Das im speziellen hat den Grund, dass die Größe des Repositories dadurch stark erhöht werden würde (abhängig von der Menge der externen \*\*\_node_modules*\*\*). Zudem können andere Nutzer entsprechende Pakete auch über den Befehl

```
npm i
```

nachinstallieren.

#### angular.json

Die **_angular.json_** enthält die grundlegende Konfiguration eines Angular-Projekts.

Beispielhaft an der Datei hier wird nun erklärt, wie der Aufbau zustande kommt.

Wenn ein Angular-Projekt angelegt wird, wird abgefragt, ob und wenn ja, welches Testframeworks genutzt wird. Hier wurden `protractor` für End-to-End Tests und `karma` als Test-Runner angegeben.

Da Protractor ausgewählt wurde, wurde einerseits das Verzeichnis **_e2e_** angelegt und andererseits auch in der **_angular.json_** unter `projects` das Projekt `angular-intro-e2e` aufgeführt. Das hat uns im Moment allerdings nicht weiter zu interessieren, daher überspringen wir weitere Details hierzu erst einmal.

---

Was uns interessiert ist das Projekt `angular-intro` das hier konfiguriert wird.

Unter `root` wird angegeben, von welchem Pfad aus nach der `sourceRoot` gesucht werden soll.

---

`projectType` gibt an, um welche Art von Projekt es sich handelt. Nicht alle Angular-Projekte sind Applikationen. Die andere Möglichkeit wäre, dass der Typ `library` angegeben wird. Der Unterschied liegt darin, dass eine `application` innerhalb und unabhängig in einem Browser laufen kann, während das bei einer `library` nicht so ist.

---

Mit dem `prefix` gibt man an, wie der `selector` der Komponenten starten soll. Hier ist standardmäßig `app` angegeben.
So würde beispielsweise aus dem selector `app-root` der **_app.component.ts_** ein `test-root` bei Neugenerierung werden, wenn der `selector`auf `test`gesetzt werden würde.

---

Die `schematics` sind für die Generierung von Komponenten wichtig. Hier wurde beispielsweise angegeben, dass `sass` als 'css-Alternative' genutzt werden soll.

---

Unter `architect` werden die Projektbefehle spezifiziert. Wie du vielleicht bereits weißt, kann ein Angular-Projekt mehr als nur

```javascript
 ng serve //Testumgebung hochfahren
```

denn es gibt unter anderem auch die Befehle

```javascript
ng build; // Wirkliches Erstellen der Anwendung
```

oder

```javascript
ng test // Ausführen der definierten Tests
```

Beispielsweise wird unter `options` spezifiziert, welche globalen Styles verwendet werden sollen:

```javascript
"styles": [
    "src/styles.scss",
    // Hinzufügen der bootstrap.css
    "node_modules/bootstrap/dist/css/bootstrap.min.css"
],
```

Oder unter den `configurations`, welche `environment`-Datei für welchen Befehl verwendet wird:

```javascript
"fileReplacements": [
    {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.prod.ts"
    }
],
```

Das soll erst einmal reichen. Für den Anfang werden wir die anderen Einstellungen nicht anfassen.

---

#### package-lock.json

Eine **_package-lock.json_** gibt es immer in Projekten, die auch über eine package.json verfügen.

Die **_package-lock.json_** hält aktuell installierte Abhängigkeiten fest. Wird ein `npm i` ausgeführt, so aktualisiert die **_package-lock.json_** die Versionen der aktuell installierten Pakete.

#### package.json

Die **_package.json_** enthält alle zu installierenden Pakete inklusive der Versionsnummern.

Wird beispielsweise ein

> npm i moment

ausgeführt, so wird die Bibliothek moment als Abhängigkeit in der neuesten Version zu package.json hinzugefügt. Das stellt sicher, dass wenn Entwickler A ein Paket zusätzlich installiert, Entwickler B es mit einem einfachen

> npm i

nachinstallieren kann.

Für spezielle Fälle (bspw. Continuous Development) ist die **_package-lock.json_** wichtig, die widerum sicherstellt, dass der "Installateur" auch genau die gewollte Version installiert und nicht einfach die neueste.

#### README.md

In dieser Datei befindest du dich gerade. Hier werden in der Regel Informationen darüber reingeschrieben, wie das Projekt gebaut wird, oder um was für ein Projekt es sich handelt.

#### tsconfig.json

In der **_tsconfig.json_** stehen Informationen darüber, wie typescript in diesem Projekt konfiguriert wird. Da hier meist keine EInstellungen vorgenommen werden, lassen wir die Datei außen vor.

#### tslint.json

In der **_tslint.json_** werden Konfigurationen für `tsLint`aufgeführt. Ein Linter durchläuft stetig das Projekt und prüft, ob die Regeln eingehalten werden. Beispielsweise dass eine Zeile nicht über 140 Zeichen haben soll.

### src

Im **_src_** Ordner befinden sich die richtig wichtigen Dateien.

**_favicon.ico_** ist unser Icon, das oben im Tab angezeigt wird.

**_karma.conf.js_** stellt Konfigurationen für das Testframework karma.

**_main.ts_** enthält absolut grundlegende App-Konfigurationen. Beispielsweise ob der ProdMode aktiviert wird. Dieser würde alle Entwicklungsumgebungs-Aufgaben von Angular einschränken so z.B. auch:

> One important assertion this disables verifies that a change detection pass does not result in additional changes to any bindings (also known as unidirectional data flow).

**_polyfills.ts_** enthält standardmäßig nur zone.js, kann aber erweitert werden um spezielle polyfills (also Kompensationen für neue Funktionen in JavaScript für alte, diese Funktionen nicht unterstützende, Browser) zu aktivieren

**_styles.scss_** ist eine Datei um globale Styles zu definieren, die in der gesamten Anwendung greifen.

**_test.ts_** ist essenziell für Karma und lädt alle zu karma gehörenden Dateien (Dateien die auf `.spec.ts` enden)

## Lektion 2 - Die Angular App

In dieser Lektion wird du lernen, wie eine Komponente aufgebaut wird, wie sie sich von Modulen unterscheidet und was Routing ist.

### Module

Module sind die Knotenpunkte einer Angular-App. Sie bündeln Pakete von außen, um diese für die inneren Komponenten nutzbar zu machen und exportieren innere Komponenten, um diese für äußere Module, die jenes Modul importieren, nutzbar zu machen.

#### declarations

Möchtest du also eine Komponente entwickeln, dann führt kein Weg daran vorbei, diese auch in einer Angular App zu deklarieren.
So ist beispielsweise in der **_app.module.ts_** zu Beginn:

> declarations: [AppComponent]

die `AppComponent` deklariert. Sie ist demnach nun Angular bekannt und wird vom Compiler erfasst und verarbeitet.

Diesen Schritt musst du für jede Komponente machen. In der Regel suchst du dir dafür das im Baum nächstliegendste Modul und fügst deine Komponenten-Klasse hinzu.

#### imports

Wie bereits angesprochen enthält der `imports`-Array nahezu alle Abhängigkeiten, die von den dort deklarierten Komponenten, aber auch teilweise den untergeordneten Modulen genutzt werden.

Beispielsweise wurde das `StorageServiceModule` in der **_app.module.ts_** importiert, damit in der **_custom-http-client.service.ts_** der `WebStorageService` genutzt werden kann.

Normalerweise wirken diese Imports nur für Kind-Komponenten des entprechenden Moduls. Das `AppModule` hat allerdings die Besonderheit, dass die dort importierten Pakete global verfügbar sind.

#### entryComponents

Entry components sind all jene Komponenten, die nicht ausschließlich per `selector` in die App eingebunden werden, sondern dynamisch in die Seiten geladen werden. Hierfür erstellt Angular dann jeweils eine Factory, die die Komponente dynamisch zu jeder Zeit über den ViewContainerRef einbinden kann.

#### providers

Der Providers-Array enthält Services, die für die Komponenten zu Verfügung stehen sollen. Die dort angegebenen Services können von allen Kindkomponenten `injected`, also eingebunden werden.

Oft werden die benötigten Services bereits über die Module eingebunden.

### Komponenten

Komponenten sind in der Angular-Welt alle UI-Pakete. Sie sind Kernstück der Anwendung und haben primär den Zweck, eine Wiederverwendung und Vereinheitlichung zu schaffen.

Angenommen wir bauen eine App, in der User miteinander chatten können, so wäre das `Profilbild`, eine `Chat-Blase` und die `Optionen` Komponenten, die ganz oft angezeigt, aber nur ein mal programmiert wurden.

Komponenten sind aber nicht nur die wiederverwendbaren Elemente. Auch einzelne _Seiten_ der Anwendung sind Komponenten, die viele kleinere, wieder in sich geschachtelte Komponenten enthalten können.

#### Aufbau

Komponenten sind definiert als normale JavaScript-Klassen mit dem @Component decorator. Dieser Decorator sagt der Anwendung, dass es sich bei der folgenden Klasse um eine Komponente handelt.

Bei der "Deklaration" als Komponente, können Optionen mitgegeben werden. Im Fall der **_app.componten.ts_** ist das:

> selector: 'app-root',
> templateUrl: './app.component.html',
> styleUrls: ['./app.component.scss']

Der `selector` ist der string, über den eine Komponente (sofern richtig im Modul importiert/deklariert) in eine andere Komponente geladen wird. Angewendet würde das bei der genannten Komponente irgendwo in einer HTML so aussehen:

> <app-root></app-root>

Die Option `templateUrl` definiert, welche Datei als Template für diese Komponente genommen werden soll. Als Alternative könnte man auch nur `template` angeben und einen string innerhalb von _backticks_ (`) als Template verwenden.

Die Option `styleUrls` erwartet ein Array mit dem Pfad zu den zu nutzenden (in diesem Fall) scss-Dateien, die das Styling bestimmen.
Auch hier gibt es wieder die Alternative, einfach nur `styles` anzugeben und dahinter die Styles innerhalb von Backticks anzugeben.

Weitere wichtige Optionen, die allerdings nicht allzu wichtig zu Beginn sind, wären:

- changeDetection: Gibt an, welche Strategie der Änderungserkennung genommen werden soll: [OnPush: wenn InputVariablen oder Observables innerhalb der Komponente geändert werden] oder [default: immer, wenn irgendwo in der App eine Änderung passiert]

- animations: Hierüber können AngularAnimations importiert werden

- encapsulation: Gibt an, wie die Styles behandelt werden. Bei `ViewEncapsulation.None` wird der Code aus der angebenenen scss-Datei für alle Dateien im Projekt verwendet. Bei `ViewEncapsulation.Emulated` werden die dort angegebenen Styles ausschließlich für diese Komponente verwendet.

In der Regel enthält eine Komponente einen Konstruktor, in dem abhängige Services und evtl. andere Parameter eingebunden werden. Im Falle unserer **_app.component.ts_** wäre das der CustomHttpClient, der der Variable httpClient innerhalb dieser Komponente zugeordnet wird.

Innerhalb eines Konstruktors ist ein Scope für die angegebenen Parameter Pflicht. `private` lässt jede Funktion innerhalb der Klasse auf den Service/Parameter zugreifen. `public` lässt auch von der HTML aus oder noch weiter darauf zugreifen. Kein Scope definiert nur eine Verfügbarkeit innerhalb des Konstruktors.

Eine Komponente kann von anderen Komponenten erben, oder diese Erweitern/Implementieren.

Die `AppComponent`beispielsweise implementiert `OnInit` und muss daher die **Schnittstelle** `ngOnInit()` implementieren. Diese Funktion wird beim Initialisieren der Komponente aufgerufen. Es gibt viele Schnittstellen, die Angular dem Entwickler an die Hand gibt, um Aufgaben an verschiedenen LifeCycleHooks auszuführen.
Andere oft gebrauchte sind `OnDestroy` on `AfterViewInit`.

## Lektion 3 - Typescript

TypeScript ist die Programmiersprache, die für die Logik der Angular-App zuständig ist. Im Vergleich zu JavaScript - der Programmiersprache zu der TypeScript ein Superset ist und compiliert wird - bietet TypeScript einige Vorteile.

Der wichtigste Unterschied zwischen TypeScript und JavaScript ist, dass TypeScript starke Typisierung bietet. Während in JavaScript jede Variable zur Laufzeit ihren Typ ändern kann, können in TypeScript Variablen (sofern nicht als any deklariert) nicht einen neuen Typ annehmen.

Dennoch teilen sich beide Sprachen viele Konzepte. Alles was JavaScript (abhängig von der ECMAScript Version) kann, kann auch TypeScript (der mindestens gleichen ECMAScript Version).

### Primitive Datentypen

TypeScript gibt dem Nutzer folgende primitive Datentypen an die Hand:

- Object - Ein Object ist ein formatiert wie ein JSON-Objekt.
  Die `properties` stehen innerhalb geschweifter Klammern und sind als `key-value`-Paare angegeben. Beispiel:

```javascript
let user = {
  firstname: 'Max',
  lastname: 'Mustermann',
  address: {
    street: 'Musterstraße 1',
    city: 'Musterstadt',
    zip: '12345'
  }
};
```

- String - Ein String ist eine Abfolge von Zeichen (Beispielsweise Sätze oder Wörter). Anders als beispielsweise in Java gibt es nicht auch noch den Typ `char`. Strings lassen sich leicht manipulieren. Einige der häufigsten Methoden, die auf einem String ausgefphrt werden sind im Folgenden dargestellt:

```javascript
let message = 'This is a simple string        ';
console.log(message.substr(0, 4)); // Gibt einen Teil des Strings zurück. Geht dabei vom index (erster Parameter) aus und nimmt die nächsten x (zweiter Paramter) Zeichen. Ergebnis hier: 'This'

console.log(message.trim()); // Entfernt vorangestellte oder nachgestellte Leerzeichen aus einem String. Ergebnis hier: 'This is a simple string'

console.log(message.split('i')); // Gibt ein Array zurück bestehend aus den Strings, die durch Auftrennen des Originalstrings mit dem Seperator (hier i) entstehen. Ergebnis hier: ['Th', 's ', 's a s', 'mple str', 'ng       '];
```

- Number - Eine Variable vom Typ `number` enthält Zahlen jeder Art. Diese können sowohl "einfache" `Integer` (ganzzahlige Werte), als auch `Floats` sein. Mit ihnen lassen sich Rechenoperationen jeglicher Art durchführen.
- Boolean - Boolsche Werte sind als binärer Typ zu verstehen. Sie nehmen entweder `True` oder `False` an.
- Array - Ein Array ist eine Liste von Objekten eines beliebigen Typs. Sie können in ihren enthaltenen Werten _eingeschränkt_ werden und bieten eine Reihe von Methoden, die die enthaltene Liste manipulieren. Im Folgenden das Wichtigste:
```javascript
const stringArray: Array<string> = ['String1', 'Str2']; // Alternativ kann auch : [string] als Schreibweise für die Typdefinition genutzt werden.
// .length gibt die Länge eines Arrays zurück.
console.log(stringArray.length);
// Ergebnis: 2

// Der Zugriff auf die Werte in dem Array erfolgt über die Syntax array[index] (Wichtig: Der index startet bei 0)
console.log(stringArray[0]);
// Ergebnis: 'String1'

// .sort(sortFnct) sortiert die Werte innerhalb eines Arrays um und gibt das sortierte Array zurück.
console.log(stringArray.sort((a, b) => a.length - b.length));
// Ergebnis: ['Str2', 'String1]

// .concat(zweitesArray) fügt die beiden beteiligten Arrays zusammen.
console.log(stringArray.concat(stringArray));
// Ergebnis: ['Str2', 'String1', 'Str2', 'String1']

// .slice(startIndex, endIndex) extracts a section of an array and returns that. Can also be used for copying an array.
console.log(stringArray.slice(0, 1));
// Ergebnis: ['Str2']
console.log(stringArray.slice());
// Ergebnis: ['Str2', 'String1]
```
Für weitere Funktionen, die Arrays bieten, bietet [diese Seite](https://www.tutorialspoint.com/typescript/typescript_arrays.htm) einen sehr guten Überblick.

- Null/Undefined
- Void
- Any
- Enum
- Never
- Tuple
