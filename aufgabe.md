# Aufgabe: Kontakte nach Namen suchen

## Ausgangssituation

Die Contacts Web App kann Kontakte anzeigen, anlegen und löschen. Erweitere die Anwendung um eine Suchfunktion, mit der Kontakte anhand ihres Namens gefunden werden können.

## Ziel

Benutzerinnen und Benutzer sollen im Frontend einen Namen oder einen Teil eines Namens eingeben können. Anschließend sollen nur die passenden Kontakte angezeigt werden.

Die Suche soll über das Backend erfolgen. Das Frontend übermittelt den Suchbegriff an die REST-API und zeigt das Ergebnis an.

## Aufgabenstellung

### 1. Backend erweitern

Erweitere den vorhandenen Endpunkt zum Abrufen der Kontakte:

```http
GET /api/contacts
```

Der Endpunkt soll den optionalen Query-Parameter `search` akzeptieren.

Beispiel:

```http
GET /api/contacts?search=anna
```

Anforderungen an die Suche:

- Ohne `search` werden weiterhin alle Kontakte zurückgegeben.
- Mit `search` werden nur Kontakte zurückgegeben, deren Name den Suchbegriff enthält.
- Groß- und Kleinschreibung sollen keine Rolle spielen.
- Auch ein Teil des Namens soll genügen.
- Vorangestellte und nachgestellte Leerzeichen im Suchbegriff sollen ignoriert werden.
- Wenn kein Kontakt passt, wird eine leere Liste zurückgegeben.
- Eine erfolglose Suche ist kein Fehler und soll daher keinen Statuscode `404` erzeugen.

Beispiele bei einem vorhandenen Kontakt namens `Anna Müller`:

| Suchbegriff | Erwartetes Ergebnis |
| --- | --- |
| `Anna` | Anna Müller wird gefunden |
| `anna` | Anna Müller wird gefunden |
| `Müll` | Anna Müller wird gefunden |
| `  anna  ` | Anna Müller wird gefunden |
| `Peter` | Leere Liste |

### 2. Frontend erweitern

Ergänze oberhalb der Kontaktliste ein Suchfeld.

Das Frontend soll:

- den eingegebenen Suchbegriff an das Backend senden,
- das Ergebnis in der vorhandenen Kontaktliste anzeigen,
- bei einem leeren Suchfeld wieder alle Kontakte anzeigen,
- bei keinem Treffer einen verständlichen Hinweis anzeigen,
- mögliche Netzwerk- oder API-Fehler weiterhin im Fehlerbereich ausgeben.

Für die Anfrage soll der Suchbegriff als Query-Parameter übertragen werden:

```text
http://127.0.0.1:8000/api/contacts?search=anna
```

Achte darauf, den Suchbegriff für eine URL korrekt zu kodieren.

## Hinweise

- FastAPI kann Query-Parameter direkt als Funktionsparameter entgegennehmen.
- In Python können Strings für einen Vergleich ohne Beachtung der Groß- und Kleinschreibung vereinheitlicht werden.
- In JavaScript kann `URLSearchParams` beim Erstellen eines Query-Parameters helfen.
- Verändere die vorhandenen Funktionen zum Anlegen und Löschen von Kontakten nicht unnötig.
- Halte den Code verständlich und vermeide doppelte Logik.

## Akzeptanzkriterien

Die Aufgabe ist erfüllt, wenn:

1. `GET /api/contacts` weiterhin alle Kontakte liefert.
2. `GET /api/contacts?search=anna` passende Kontakte liefert.
3. Die Suche unabhängig von Groß- und Kleinschreibung funktioniert.
4. Teilstrings im Namen gefunden werden.
5. Überflüssige Leerzeichen um den Suchbegriff ignoriert werden.
6. Bei keinem Treffer der Statuscode `200 OK` mit einer leeren JSON-Liste zurückgegeben wird.
7. Das Frontend ein Suchfeld besitzt und die gefilterten Kontakte anzeigt.
8. Das Leeren des Suchfeldes wieder die vollständige Kontaktliste anzeigt.
9. Bereits vorhandene Funktionen zum Anzeigen, Anlegen und Löschen weiterhin funktionieren.

