# Frontend Implementierungs-Spezifikation – Prototyp

## Zweck dieses Dokuments

Dieses Dokument ist die **verbindliche Spezifikation** für die Implementierung eines klickbaren Frontend-Prototyps einer Teppichreinigungs-Plattform.

Die Anwendung dient ausschließlich zur Präsentation gegenüber Kunden und Investoren.

Der Fokus liegt auf:

- realistischer Benutzeroberfläche
- vollständiger Navigation
- sauberer Software-Struktur
- Erweiterbarkeit für späteres Backend
- professionellem Look & Feel

Dieses Dokument beschreibt **exakt**, welche Screens, Komponenten, Struktur und Funktionen implementiert werden müssen.

---

# Technologiestack (verbindlich)

Folgender Stack ist fest definiert und darf nicht geändert werden:

- React
- TypeScript
- Next.js (App Router)
- Tailwind CSS
- Zustand (State Management)
- React Hook Form
- Zod (Form Validation)
- Framer Motion (Animationen)
- Lucide Icons

Keine alternativen Frameworks oder Libraries verwenden, außer sie sind absolut notwendig für die Funktionalität.

---

# Projektziel

Implementierung eines **Frontend-Prototyps** für eine Plattform zur Teppichreinigung.

Der Prototyp muss:

- vollständig klickbar sein
- ohne Backend funktionieren
- mit Mock-Daten arbeiten
- wie ein echtes Produkt aussehen
- responsive sein
- strukturell production-ready sein

---

# Wichtige Rahmenbedingungen

## Kein Backend

Folgendes wird nicht implementiert:

- keine Datenbank
- keine API
- keine Authentifizierung
- keine echte Zahlung
- kein Server

Alle Daten werden simuliert.

---

## Mock-Daten

Alle Daten stammen aus lokalen Dateien.

Pfad:

```
/data
```

---

## Navigation

Jeder Button und jeder Link muss funktionieren.

Es dürfen keine toten Buttons existieren.

---

## Design

Die Benutzeroberfläche muss:

- modern
- minimalistisch
- professionell
- klar strukturiert
- responsive

sein.

---

# Projektstruktur (verbindlich)

Folgende Struktur muss exakt erstellt werden:

```
/app

  layout.tsx
  page.tsx

  /login
  /register
  /forgot-password

  /configurator
  /cart
  /checkout
  /success

  /dashboard
      /orders
      /profile
      /settings

/components

  /ui
  /layout
  /forms
  /configurator
  /cart
  /checkout
  /dashboard

/data

  mockUsers.ts
  mockOrders.ts
  mockCarpets.ts

/store

  cartStore.ts
  orderStore.ts
  userStore.ts

/types

  user.ts
  order.ts
  carpet.ts

/styles

  globals.css

/utils

  priceCalculator.ts
  format.ts
```

---

# Global Layout

Datei:

```
layout.tsx
```

Muss enthalten:

- Header
- Navigation
- Footer

---

# Header

Links:

Logo

Navigation:

- Startseite
- Service
- Login

Rechts:

Button:

```
Jetzt reinigen
```

Navigation:

```
/configurator
```

---

# Footer

Muss enthalten:

- AGB
- Datenschutz
- Widerruf
- Kontakt

---

# Screen Spezifikationen

Alle folgenden Screens müssen implementiert werden.

---

# SCREEN 1 — Landing Page

Route:

```
/
```

## Sections

### Hero

Inhalt:

- Headline
- Subheadline
- Button

Button:

```
Teppich reinigen lassen
```

Navigation:

```
/configurator
```

---

### Vorteile

Liste:

- Umweltfreundliche Reinigung
- Kostenloser Versand
- Qualitätsgarantie

---

### Prozess

Darstellung in 3 Schritten:

1) Teppich konfigurieren
2) Versand
3) Reinigung

---

# SCREEN 2 — Login

Route:

```
/login
```

## Features

Formularfelder:

- Email
- Passwort

Buttons:

- Login

Links:

- Passwort vergessen
- Registrieren

Navigation nach Login:

```
/dashboard
```

---

# SCREEN 3 — Registrierung

Route:

```
/register
```

## Features

Formularfelder:

- Vorname
- Nachname
- Email
- Passwort
- Adresse
- Telefon

Button:

```
Konto erstellen
```

Navigation:

```
/dashboard
```

---

# SCREEN 4 — Passwort vergessen

Route:

```
/forgot-password
```

## Features

Formular:

Email

Button:

```
Reset Link senden
```

---

# SCREEN 5 — Konfigurator

Route:

```
/configurator
```

## Struktur

Multi-Step Formular.

---

## Step 1 — Teppichart

Optionen:

- Orientteppich
- Wollteppich
- Seidenteppich
- Synthetik

---

## Step 2 — Größe

Inputs:

- Länge (cm)
- Breite (cm)

---

## Step 3 — Dicke

Input:

- Dicke

---

## Step 4 — Zustand

Textarea:

Beschreibung

---

## Step 5 — Foto Upload

Simulation:

- Bilder auswählen
- Vorschau anzeigen

Keine Speicherung erforderlich.

---

## Step 6 — Preis

Preisberechnung über:

```
/utils/priceCalculator.ts
```

---

Button:

```
In den Warenkorb
```

---

# SCREEN 6 — Warenkorb

Route:

```
/cart
```

## Features

Liste:

- Produkt
- Preis

Buttons:

- Entfernen

Button:

```
Zur Kasse
```

Navigation:

```
/checkout
```

---

# SCREEN 7 — Checkout

Route:

```
/checkout
```

## Features

### Adresse

Formularfelder:

- Name
- Straße
- Stadt
- PLZ

---

### Versand

Option:

```
DHL
```

---

### Zahlung

Simulation.

Buttons:

- PayPal
- Kreditkarte

Keine echte Zahlung.

---

Checkbox:

```
Ich akzeptiere die AGB
```

---

Button:

```
Jetzt bezahlen
```

Navigation:

```
/success
```

---

# SCREEN 8 — Success

Route:

```
/success
```

## Features

Anzeige:

```
Bestellung erfolgreich
```

Button:

```
Zum Dashboard
```

---

# SCREEN 9 — Dashboard

Route:

```
/dashboard
```

## Features

Anzeige:

- Bestellungen
- Status

Navigation:

- Orders
- Profil
- Einstellungen

---

# SCREEN 10 — Orders

Route:

```
/dashboard/orders
```

## Features

Liste:

- Order Nummer
- Status
- Datum

Button:

```
Details
```

---

# SCREEN 11 — Order Detail

Route:

```
/dashboard/orders/[id]
```

## Features

Timeline:

- Bestellung erstellt
- Versandt
- Eingegangen
- In Reinigung
- Fertig
- Rückversendet

---

## Bilder

Anzeige:

- Vorher
- Nachher

---

# SCREEN 12 — Profil

Route:

```
/dashboard/profile
```

## Features

Formularfelder:

- Name
- Adresse
- Telefon

Button:

```
Speichern
```

---

# SCREEN 13 — Einstellungen

Route:

```
/dashboard/settings
```

## Features

Buttons:

- Passwort ändern
- Account löschen

---

# State Management

Zustand wird verwendet.

## cartStore

Speichert:

- items
- total

## orderStore

Speichert:

- orders

## userStore

Speichert:

- user

---

# Styling Regeln

Tailwind CSS verwenden.

Designprinzipien:

- rounded-2xl
- shadow
- spacing
- klare Typografie
- konsistente Abstände

---

# Animationen

Framer Motion verwenden für:

- Seitenwechsel
- Step-Wechsel im Konfigurator

---

# Mock Daten

Pfad:

```
/data
```

## mockOrders

Muss enthalten:

- id
- status
- price
- date

---

# Definition of Done

Der Prototyp gilt als fertig wenn:

- alle Screens existieren
- Navigation funktioniert
- Mock-Daten angezeigt werden
- UI professionell aussieht
- Anwendung responsive ist
- Projektstruktur eingehalten wurde

