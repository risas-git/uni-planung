# Uni-Planung: KI & Kognitive Informatik (B.Sc.) - Universität Bielefeld

[![Live Webversion](https://img.shields.io/badge/🌐_Live_Webversion-Hier_klicken-2ea44f?style=for-the-badge)](https://risas-git.github.io/uni-planung/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/risas-git/uni-planung)

Full-Stack Studienplaner gebaut mit **Vue 3 + Vuetify 3** (Frontend) und **Java 21 / Spring Boot** (Backend) für den Bachelorstudiengang *Künstliche Intelligenz und Kognitive Informatik* an der Universität Bielefeld.

---

## 🌐 Live Webversion (Direkt im Browser nutzbar)

Die Anwendung ist als reine Webversion ohne Installation oder Server direkt im Browser erreichbar:

🔗 **[https://risas-git.github.io/uni-planung/](https://risas-git.github.io/uni-planung/)**

- **Keine Installation nötig**: Der Studienplaner kann direkt per Link im Browser geöffnet und genutzt werden.
- **Vollständig Client-seitig**: Noten, Fortschritte und Berechnungen laufen komplett im Speicher des Browsers.
- **Excel Export & Import**: Eingegebene Daten können jederzeit als `.csv` gesichert und wieder geladen werden.
- **Automatisches Deployment**: Änderungen im `main`-Branch werden per GitHub Actions automatisch auf den `gh-pages`-Branch gebaut und aktualisiert.
- **GitHub Repository**: [https://github.com/risas-git/uni-planung](https://github.com/risas-git/uni-planung)
- **Offizielle FSB / eKVV**: [Studieninformation Universität Bielefeld](https://ekvv.uni-bielefeld.de/sinfo/publ/variante/405818172?m#405818181)

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
- **Wahlpflichtbereich (20 LP)**, **MiKE (10 LP)** & **Strukturierte Ergänzung (20 LP)**: Dynamische Modul-Slots für Schwerpunkte (10 LP) und Basismodule (5 LP).
- **Lehrveranstaltungen & Zuordnungen**:
  - `v-autocomplete` Modulsuche mit Multi-Tag-Auswahl.
  - Fachsemester-Auswahl bis zu 10 Semestern.
  - **1-Klick Modul-Zuordnung**: Schnelles Umschalten der Zuordnung über interaktive Badges.
- **Datenschutz**: Keine Speicherung auf Servern oder im Browser (reiner In-Memory-Betrieb).
- **Excel-Export & Import**: Speichern und Laden als formatierte `.csv`-Datei.
