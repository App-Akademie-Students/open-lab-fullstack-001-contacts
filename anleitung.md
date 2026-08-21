# Anleitung zur Contacts Web App

Diese Anleitung beschreibt, wie die Anwendung lokal eingerichtet, gestartet und benutzt wird.

## Voraussetzungen

- Python 3 ist installiert.
- Das Projekt wurde heruntergeladen oder geklont.
- Ein Terminal (zum Beispiel PowerShell, Windows Terminal oder die Konsole in VS Code) ist geöffnet.

Alle folgenden Befehle werden zunächst im Hauptordner des Projekts ausgeführt – dort, wo sich auch die Datei `requirements.txt` befindet.

## 1. Virtuelle Umgebung einrichten

Eine virtuelle Python-Umgebung sorgt dafür, dass die benötigten Pakete nur für dieses Projekt installiert werden.

```bash
python -m venv .venv
```

Unter Windows aktivieren:

```powershell
.venv\Scripts\activate
```

Unter macOS oder Linux aktivieren:

```bash
source .venv/bin/activate
```

Anschließend die benötigten Pakete installieren:

```bash
pip install -r requirements.txt
```

Die Einrichtung ist normalerweise nur beim ersten Start erforderlich. Bei späteren Starts muss die virtuelle Umgebung lediglich erneut aktiviert werden.

## 2. Backend starten

Das Backend stellt die REST-API bereit. Im ersten Terminal:

```powershell
cd solution/backend
python main.py
```

Nach dem Start ist das Backend unter folgender Adresse erreichbar:

- API: <http://127.0.0.1:8000>
- Interaktive API-Dokumentation: <http://127.0.0.1:8000/docs>

Das Terminal muss während der Benutzung geöffnet bleiben.

## 3. Frontend starten

Ein zweites Terminal im Hauptordner des Projekts öffnen und dort ebenfalls die virtuelle Umgebung aktivieren. Danach:

```powershell
cd solution/frontend
python main.py
```

Das Frontend ist anschließend im Browser unter <http://127.0.0.1:5500> erreichbar.

Backend und Frontend müssen gleichzeitig laufen. Die Anwendung sollte über die genannte Adresse geöffnet werden und nicht durch direktes Öffnen der Datei `index.html`.

## Anwendung benutzen

### Kontakte anzeigen

Beim Öffnen der Seite werden alle vorhandenen Kontakte automatisch vom Backend geladen. Oben in der Kontaktliste wird die aktuelle Anzahl angezeigt.

### Kontakt anlegen

1. Im Feld **Name** den vollständigen Namen eingeben.
2. Im Feld **E-Mail** eine gültige E-Mail-Adresse eingeben.
3. Im Feld **Telefon** eine Telefonnummer eingeben.
4. Auf **Kontakt anlegen** klicken.

Der neue Kontakt erscheint anschließend in der Liste. Alle drei Felder sind Pflichtfelder.

### Kontakt löschen

Beim gewünschten Kontakt auf **Löschen** klicken. Der Kontakt wird aus der Liste entfernt.

### E-Mail-Adresse und Telefonnummer verwenden

Die E-Mail-Adresse und die Telefonnummer eines Kontakts sind anklickbar. Je nach Gerät und Konfiguration öffnet sich dadurch das eingerichtete E-Mail- beziehungsweise Telefonprogramm.

## Anwendung beenden

Backend und Frontend werden jeweils im zugehörigen Terminal mit `Strg + C` beendet.

Die Kontakte werden nur im Arbeitsspeicher des Backends gehalten. Eigene Änderungen gehen deshalb verloren, sobald das Backend beendet oder durch die automatische Entwicklungsfunktion neu gestartet wird. Beim nächsten Start sind wieder die im Programmcode hinterlegten Beispielkontakte vorhanden.

## Häufige Probleme

### `python` wird nicht gefunden

Prüfen, ob Python installiert und in der Umgebungsvariable `PATH` eingetragen ist. Auf manchen Systemen funktioniert stattdessen der Befehl `python3` oder unter Windows `py`.

### Ein benötigtes Modul fehlt

Die virtuelle Umgebung aktivieren und die Abhängigkeiten erneut installieren:

```bash
pip install -r requirements.txt
```

### Die Seite zeigt keine Kontakte an

Prüfen, ob das Backend weiterhin im ersten Terminal läuft und unter <http://127.0.0.1:8000/docs> erreichbar ist. Danach die Frontend-Seite neu laden.

### Port 8000 oder 5500 ist bereits belegt

Andere Programme oder ältere Instanzen der Anwendung schließen, die denselben Port verwenden. Anschließend den jeweiligen Server erneut starten.

## Optional: API direkt testen

Unter <http://127.0.0.1:8000/docs> können die API-Endpunkte direkt im Browser ausprobiert werden. Dazu einen Endpunkt öffnen, **Try it out** auswählen, gegebenenfalls Daten eingeben und anschließend **Execute** anklicken.

