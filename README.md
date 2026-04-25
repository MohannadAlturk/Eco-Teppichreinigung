# Eco Teppichreinigung – Frontend

Professionelle Frontend-Anwendung für eine Teppichreinigungs-Plattform mit vollständigem Bestell- und Admin-Workflow.

## Technologie-Stack

| Bereich | Technologie |
|---|---|
| Framework | Next.js 15 (App Router) |
| Sprache | TypeScript |
| Styling | Tailwind CSS |
| State Management | Zustand |
| Animationen | Framer Motion |
| Icons | Lucide React |
| Schrift (Logo) | Dancing Script (Google Fonts, inline SVG) |

> **Hinweis:** Three.js / React Three Fiber wurden entfernt. Die frühere 3D-Vorschau hat auf macOS wiederholt den WindowServer zum Absturz gebracht (GPU-Hang). Sie wurde durch eine leichtgewichtige SVG-Größenvergleichs-Ansicht ersetzt.

---

## Features

### Kunden-Journey

1. **Startseite** – Hero-Video, Vorteile, Prozess-Übersicht, Video-Galerie, FAQ-Accordion, CTA
2. **Konfigurator** – Multi-Step-Formular:
   - Teppichart wählen (Orient, Wolle, Allgemein, Synthetik)
   - Maße & Dicke eingeben
   - SVG-Größenvergleich mit Personensilhouette (170 cm)
   - Zustand beschreiben & Fotos hochladen (UI-Simulation)
   - Live-Preisberechnung
3. **Warenkorb** – Übersicht & Bearbeitung
4. **Checkout** – Adresse, Versandart, 6 Zahlungsmethoden
5. **Success-Page** – Bestätigung mit Hinweis: Zahlung erst nach Admin-Bestätigung

### Admin-Bereich (`/admin`)

Nur für Mitarbeiter – nicht verlinkt, nicht indexiert.

| Route | Funktion |
|---|---|
| `/admin` | Login (admin / admin) |
| `/admin/dashboard` | Auftragsübersicht mit Stats & Filter |
| `/admin/dashboard/orders/[id]` | Auftragsdetail mit Bestätigen/Ablehnen |

**Auftragsablauf:**
- Kunde sendet ab → Status `pending_admin`
- Admin **bestätigt** → Status `created` → Reinigungsprozess startet, Zahlung fällig
- Admin **lehnt ab** → Status `rejected` → keine Kosten für den Kunden

---

## Installation

```bash
npm install
npm run dev       # Development-Server (http://localhost:3000)
npm run build     # Production-Build
npm start         # Production-Server
```

---

## Projektstruktur

```
/app
  /admin
    /dashboard
      /orders/[id]   Admin: Auftragsdetail
    /dashboard        Admin: Auftragsübersicht
    /page.tsx         Admin: Login
  /cart               Warenkorb
  /checkout           Bestellabschluss
  /configurator       Teppich-Konfigurator (Multi-Step)
  /success            Bestellbestätigung
  layout.tsx          Root-Layout (ConditionalLayout)

/components
  /admin
    AdminHeader.tsx   Gemeinsamer Admin-Header (Logo + Abmelden)
  /configurator
    CarpetRoomPreview.tsx   SVG-Größenvergleich (ersetzt 3D-Viewer)
    CarpetDimensionsDisplay.tsx
    Carpet3DViewer.tsx      @deprecated – GPU-Absturzrisiko
    Carpet3DModel.tsx       @deprecated – GPU-Absturzrisiko
  /layout
    Header.tsx              Kunden-Header mit Inline-SVG-Logo
    Footer.tsx
    ConditionalLayout.tsx   Header/Footer nur auf Nicht-Admin-Routen
  /ui
    Button, Card, Input, Select, Textarea
  FAQ.tsx                   Accordion-FAQ-Sektion

/store
  cartStore.ts
  orderStore.ts      inkl. updateOrderStatus (Admin-Aktionen)
  adminStore.ts      Login-State (Zustand + persist)

/types
  carpet.ts
  order.ts           OrderStatus: pending_admin | rejected | created | …
  user.ts

/data
  mockOrders.ts      Demo-Daten: 3 offene, 2 bestätigte, 1 abgelehnte Anfrage

/utils
  priceCalculator.ts
  format.ts
```

---

## Bestellstatus-Übersicht

```
pending_admin  →  Neue Anfrage (wartet auf Admin)
     ↓ bestätigen          ↓ ablehnen
   created               rejected
     ↓
shipped_to_us → received → in_cleaning → completed → shipped_back
```

---

## Zahlungsmethoden (Frontend)

- Kreditkarte · PayPal · Klarna · Sofortüberweisung · Giropay · SEPA

Backend-Integration folgt.

---

## Design

- **Primärfarbe:** `#E8612D` (Orange – Logofarbe)
- **Header / Footer:** `bg-gray-900` (dunkel, unverändert)
- **Admin-Bereich:** Dark-Theme durchgehend (`bg-gray-950`)
- **Logo:** Inline-SVG mit Dancing Script (Google Fonts), transparent, keine Bildabhängigkeit
- Responsive: Mobile-first, Tabelle → Karten-Layout im Admin auf kleinen Bildschirmen

---

## Wichtige Hinweise

- **Kein Backend:** Alle Daten leben im Browser-State (Zustand)
- **Keine Persistenz:** Bei Seiten-Reload gehen Bestellungen verloren (außer Admin-Login via `localStorage`)
- **Admin-Sicherheit:** Login ist rein frontend-seitig (demo). Vor Produktiveinsatz durch echte Backend-Authentifizierung ersetzen.

---

© 2026 Eco Teppichreinigung. Alle Rechte vorbehalten.
