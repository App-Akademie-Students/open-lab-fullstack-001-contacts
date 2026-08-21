# Contacts Web App


## Version 0.1

### virtuelle Umgebung erstellen – Windows / macOS / Linux
    python -m venv .venv

win
    .venv\Scripts\activate
mac/linux
    source .venv/bin/activate

### Requirements
    pip install -r requirements.txt


### Projekt starten

Backend und Frontend laufen in zwei separaten Terminals.

Backend (aus `solution/backend/` heraus):

    python main.py

Server läuft danach auf http://127.0.0.1:8000, die interaktive API-Doku (Swagger UI) unter http://127.0.0.1:8000/docs.

Frontend (in einem zweiten Terminal aus `solution/frontend/` heraus):

    python main.py

Das Frontend läuft danach auf http://127.0.0.1:5500. Alle API-Endpunkte liegen unter dem Präfix `/api`, z. B. `http://127.0.0.1:8000/api/contacts`. Das Backend erlaubt Zugriffe des separaten Frontend-Servers per CORS.

### Projektstruktur

    ├── requirements.txt
    ├── starter/            # leere Vorlage für eigene Bearbeitung
    └── solution/
        ├── backend/
        │   ├── main.py       # FastAPI-App mit API-Router und CORS-Konfiguration
        │   ├── routers.py    # Endpunkte + In-Memory-Kontaktliste
        │   ├── models.py     # Contact-Dataclass (später ggf. SQLAlchemy)
        │   └── schemas.py    # Pydantic-Schemas für Request/Response
        └── frontend/
            ├── main.py       # eigener Webserver für das Frontend (Port 5500)
            ├── index.html    # Formular + Kontaktliste
            ├── style.css
            └── app.js        # Logik: Kontakte laden, anlegen, löschen


## Was kann die Anwendung?

Für das erste Projekt würde ich nur vier Funktionen nehmen:

| Funktion          | HTTP   | Endpoint              | Status                |
| ------------------ | ------ | ---------------------- | ---------------------- |
| Kontakte anzeigen | GET    | `/api/contacts`      | ✅ umgesetzt           |
| Kontakt anzeigen  | GET    | `/api/contacts/{id}` | ✅ umgesetzt           |
| Kontakt anlegen   | POST   | `/api/contacts`      | ✅ umgesetzt           |
| Kontakt löschen   | DELETE | `/api/contacts/{id}` | ✅ umgesetzt           |


### Kontakt als Json
```json
{
    "id": 1,
    "name": "Anna Müller",
    "email": "anna@example.com",
    "phone": "030 123456"
}
```

## Gesamtzusammenhang
    Frontend
    ↓
    HTTP Request
    ↓
    REST API / FastAPI
    ↓
    Python
    ↓
    JSON Response
    ↓
    Frontend


### Technischer Rahmen

| Technik                 | Einsatz                                                                                 |
| ----------------------- | --------------------------------------------------------------------------------------- |
| Python                  | Backend-Sprache                                                                         |
| FastAPI                 | REST API                                                                                |
| Pydantic                | Schemas und Validierung in schema.py                                                    |
| Uvicorn                 | lokaler Webserver                                                                       |
| OpenAPI / Swagger UI    | API testen und dokumentieren                                                            |
| Python list / dict      | temporäre In-Memory-Datenhaltung                                                        |
| HTML / CSS / JavaScript | Frontend (`solution/frontend/`) mit eigenem Python-Webserver                            |
| fetch()                 | Aufruf der REST API aus dem Frontend                                                    |
| Git / GitHub            | Ein Projekt-Repository mit Startvorlage, optionalen Zwischenständen und fertiger Lösung |


## Offene Punkte

- [ ] Update-Endpoint (`PUT`/`PATCH`) für bestehende Kontakte ergänzen
- [ ] Persistente Datenhaltung (aktuell nur In-Memory-Liste, Daten gehen beim Neustart verloren)

