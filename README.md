# Eco Teppichreinigung - Frontend

Eine vollständig funktionsfähige Frontend-Anwendung für eine umweltfreundliche Teppichreinigungs-Plattform.

## Technologie-Stack

- **Framework:** Next.js 15 (App Router)
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Formulare:** React Hook Form + Zod
- **Animationen:** Framer Motion
- **Icons:** Lucide React
- **3D-Rendering:** Three.js + React Three Fiber + Drei

## Features

### Vollständige User Journey

1. **Landing Page** - Übersicht über Service und Vorteile
2. **Konfigurator mit 3D-Visualisierung** - Multi-Step-Formular zur Teppichkonfiguration
   - Teppichart auswählen
   - **Live 3D-Modell** - Interaktives 3D-Modell des Teppichs
   - Größe angeben (Live-Update im 3D-Modell)
   - Dicke eingeben (Live-Update im 3D-Modell)
   - Zustand beschreiben
   - Fotos hochladen (UI-Simulation)
   - Preisberechnung
   - **Interaktive 3D-Vorschau:**
     - Drehen mit Maus/Touch
     - Zoomen mit Scroll/Pinch
     - Echtzeit-Updates bei Dimensionsänderungen
     - Unterschiedliche Farben je Teppichart
     - Gitter für Größenreferenz
3. **Warenkorb** - Übersicht der konfigurierten Teppiche
4. **Checkout** - Adresseingabe, Versandart, Zahlungsmethode
5. **Success-Page** - Bestellbestätigung
6. **Dashboard** - Kundenbereich mit:
   - Übersicht der Bestellungen
   - Detailansicht mit Timeline
   - Profilverwaltung
   - Einstellungen

### Bestellprozess ohne Registrierung

- Direkter Checkout ohne Login
- Email-basierte Identifizierung
- Streamlined User Experience

## Installation

```bash
# Dependencies installieren
npm install

# Development-Server starten
npm run dev

# Production-Build erstellen
npm run build

# Production-Server starten
npm start
```

## Projektstruktur

```
/app                    # Next.js App Router Pages
  /configurator        # Multi-Step-Formular mit 3D-Visualisierung
  /cart                # Warenkorb
  /checkout            # Bestellabschluss mit Zahlungsoptionen
  /success             # Bestellbestätigung
  /login               # deprecated - Auth-System entfernt
  /register            # deprecated - Auth-System entfernt
  /dashboard           # deprecated - Auth-System entfernt

/components
  /ui                   # Wiederverwendbare UI-Komponenten
  /layout              # Header, Footer
  /configurator        # 3D-Teppich-Viewer & Dimensions-Display

/store                  # Zustand State Management
  cartStore.ts
  orderStore.ts

/types                  # TypeScript Type Definitionen
  carpet.ts
  order.ts

/utils                  # Utility-Funktionen
  priceCalculator.ts   # Preisberechnung basierend auf Preisliste
  format.ts

/styles                 # Globale Styles
  globals.css
```

## Zahlungsmethoden

Die Anwendung unterstützt folgende Zahlungsoptionen (Frontend-seitig):

- **Kreditkarte** (Visa, Mastercard)
- **PayPal**
- **Klarna** (Rechnung / Ratenkauf)
- **Sofortüberweisung**
- **Giropay**
- **SEPA Lastschrift**

Die Integration der Payment-Provider erfolgt später im Backend.

## Wichtige Hinweise

- **Kein Backend:** Alle Daten werden nur im Browser gespeichert (Zustand)
- **Keine Persistenz:** Bei Seiten-Reload gehen die Daten verloren
- **Production-Ready Frontend:** Bereit für Backend-Integration

## Design-Prinzipien

- Modern und minimalistisch
- Konsistente Abstände und Rundungen (rounded-2xl)
- Schatten für Tiefe
- Animationen für bessere UX
- Vollständig responsive
- Klare Typografie

## Farben

- **Primary:** Grün-Töne (für umweltfreundliches Branding)
- **Secondary:** Grau-Töne
- **Accent:** Verwendet für Status und Highlights

## Browser-Unterstützung

- Chrome (neueste Version)
- Firefox (neueste Version)
- Safari (neueste Version)
- Edge (neueste Version)


## Features Highlights

### 3D-Teppich-Visualisierung
- Interaktives 3D-Modell mit Three.js
- Live-Updates bei Größen-/Dickenänderungen
- Zoom, Rotation, Touch-Support
- Unterschiedliche Farben je Teppichart

### Preisberechnung
- Automatische Berechnung basierend auf offizieller Preisliste
- Live-Update im Preis-Kasten
- Berücksichtigung von Teppichart, Größe und Dicke

### User Experience
- Smooth Scroll Navigation
- Kein Login erforderlich
- Email-basierte Bestellung
- 6 verschiedene Zahlungsmethoden
- Vollständig responsive Design

## License

© 2026 Eco Teppichreinigung. Alle Rechte vorbehalten.
