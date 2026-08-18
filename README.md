# Uni-Planung: KI & Kognitive Informatik (B.Sc.) - Universität Bielefeld

Full-Stack Studienplaner gebaut mit **Vue 3 + Vuetify 3** (Frontend) und **Java 21 / Spring Boot** (Backend).

---

## 🚀 Schnellstart (Entwicklung)

### 1. Frontend starten (Vue 3 + Vuetify + Vite)
```powershell
cd frontend
npm install
npm run dev
```
👉 Öffne [http://localhost:5173](http://localhost:5173) im Browser.

### 2. Backend starten (Java 21 Spring Boot REST API)
```powershell
cd backend
# Mit Maven oder Wrapper kompilieren und ausführen:
mvn spring-boot:run
```
👉 REST API läuft auf [http://localhost:8080](http://localhost:8080).

---

## 🛠️ Features

- **Pflichtbereich (120 LP)**: Übersicht nach Fachsemestern (1.–6. Semester) mit Master-Checkboxen („Alle auswählen“) pro Semester und Noteneingabe mit LP-gewichteter Durchschnittsberechnung.
- **Wahlpflichtbereich (20 LP)**, **MiKE (10 LP)** & **Strukturierte Ergänzung (30 LP)**: Dynamische Modul-Slots für Schwerpunkte (10 LP) und Basismodule (5 LP).
- **Lehrveranstaltungen & Zuordnungen**:
  - `v-autocomplete` Modulsuche mit Multi-Tag-Auswahl.
  - Fachsemester-Auswahl bis zu 10 Semestern.
  - **1-Klick Modul-Zuordnung**: Schnelles Umschalten der Zuordnung über interaktive Badges.
- **Datenschutz**: Keine Speicherung auf Servern oder im Browser (reiner In-Memory-Betrieb).
- **Excel-Export & Import**: Speichern und Laden als formatierte `.csv`-Datei.
