# Eco Teppichreinigung - Frontend Prototyp

Ein vollständig funktionsfähiger Frontend-Prototyp für eine umweltfreundliche Teppichreinigungs-Plattform.

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

### Authentifizierung (Mock)

- Login
- Registrierung
- Passwort vergessen

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
  /login
  /register
  /forgot-password
  /configurator        # Mit 3D-Visualisierung
  /cart
  /checkout
  /success
  /dashboard
    /orders
      /[id]
    /profile
    /settings

/components
  /ui                   # Wiederverwendbare UI-Komponenten
  /layout              # Layout-Komponenten (Header, Footer)
  /configurator        # 3D-Teppich-Viewer & Dimensions-Display
  /dashboard           # Dashboard-spezifische Komponenten

/data                   # Mock-Daten
  mockUsers.ts
  mockOrders.ts
  mockCarpets.ts

/store                  # Zustand State Management
  cartStore.ts
  orderStore.ts
  userStore.ts

/types                  # TypeScript Type Definitionen
  user.ts
  order.ts
  carpet.ts

/utils                  # Utility-Funktionen
  priceCalculator.ts
  format.ts

/styles                 # Globale Styles
  globals.css
```

## Mock-Daten

Die Anwendung arbeitet vollständig mit Mock-Daten. Es ist **kein Backend** erforderlich.

### Login

Sie können sich mit beliebigen Daten einloggen - die Authentifizierung ist simuliert.

## Wichtige Hinweise

- **Kein Backend:** Alle Daten werden nur im Browser gespeichert (Zustand)
- **Keine Persistenz:** Bei Seiten-Reload gehen die Daten verloren
- **Prototyp:** Für Demo- und Präsentationszwecke optimiert

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

## Entwickelt mit

Dieses Projekt wurde gemäß der Spezifikation in `frontend_prototype.md` entwickelt.

## License

Dieses Projekt ist ein Prototyp zu Demonstrationszwecken.
