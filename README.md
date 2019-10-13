# angular-intro-german

Dieses Repo enthält eine absolut rudimentäre Angular App, diverse Aufgabenstellung und Erklärungen, um neuen Entwicklern im Umfeld von Angular den Einstieg zu vereinfachen

## Aufbau

Der Aufbau dieses Projekts richtet sich nach den Lektionen. Die Lektionen starten bei einem Schwierigkeitsgrad, der für absolute Anfänger geeignet ist und steigert sich dann, bis der Schüler auch `async/await`, `Observables` und das `Facade Design Pattern` versteht.

# Lektionen

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

###
