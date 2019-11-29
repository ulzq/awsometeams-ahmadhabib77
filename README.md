# awesomeTeams
Teamgenerator fuer unseren X-Mas-Party-Quiz

## A dus_fbw9 project

Ergebnis des letzten Mentoring-Tages der Fbw9 in Dus. Die App soll Namen der Spieler
annehmen und permanent speichern, und Teams per Zufallsgenrator erzeugen.

## Neues:

### JSON funktionen

Oft muss man Daten irgendwo speichern, z.B. in einer Datenbank. Da eine Datenbank
normalerweise *Strings* speichert, muss man die Werte aus unserer JavaScript app
erstmal in *Strings* konvertieren. Hierzu kann man die **JSON** Funktionen benutzen.

  - **JSON.stringify()** Macht aus einem javascript wert ({},[],'string',123) einen string: '{}', '[]', '"string"', '123'

  - **JSON.parse()** Macht aus einem JSON-String wieder einen javascript wert

### localStorage

Chrome und co. bringen eine eigene kleine, ganz einfache Datenbank mit, die dazu
dient, Daten fuer eine App oder Website zu speichern.

  - **localStorage.setItem(key,value)** Speichert den *string* "value" unter dem Schluessel "key" in der datenbank

  - **localStorage.getItem(key)** Ruft den *String*_ der unter dem Schluessel "key" gespeichert ist wieder ab

### Die Kombination

Um daten in localStorage zu speichern muessen wir zuerst die daten mittels JSON.stringify "verpacken"

Um sie wieder benutzen zu koennen muessen wir sie mittels JSON.parse wieder "entpacken"

Um das ganze zu vereinfachen bereiten wir uns eine 'save' und eine 'load' funktion vor

### Array-Shuffle

Wir missbrauchen die Array-Methode *sort* um einen Array in eine Zufallsreihenfolge
zu bringen. Die Sort-Funktion vergleicht Element in einem Array indem sie einen
Callback aufruft, der zwei parameter (a,b) bekommt. Der Callback soll 0 (fuer gleich)
oder eine positive oder negative Zahl returnen.
Wir returnen **Math.random() - 0.5**; Damit bekommen wir eine zufaellige Reihenfolge.  
