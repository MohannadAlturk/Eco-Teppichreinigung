# 3D Konfigurator Komponenten

Diese Komponenten bilden das interaktive 3D-Visualisierungssystem für den Teppich-Konfigurator.

## Architektur

Das System ist modular aufgebaut und besteht aus drei Hauptkomponenten:

### 1. Carpet3DViewer (Container)
**Datei:** `Carpet3DViewer.tsx`

Die Hauptkomponente, die das Three.js Canvas einrichtet.

**Features:**
- Canvas-Setup mit React Three Fiber
- Kamera-Konfiguration (Perspective Camera)
- Beleuchtungs-Setup (Ambient + Directional + Point Lights)
- Orbit Controls für Benutzerinteraktion
- Environment für realistische Reflexionen
- Responsive Design

**Props:**
```typescript
interface Carpet3DViewerProps {
  length: number;    // Länge in cm
  width: number;     // Breite in cm
  thickness: number; // Dicke in cm
  type: CarpetType;  // Teppichart
}
```

### 2. Carpet3DModel (3D-Objekt)
**Datei:** `Carpet3DModel.tsx`

Die eigentliche 3D-Geometrie des Teppichs.

**Features:**
- Dynamische Geometrie basierend auf Dimensionen
- Automatische Skalierung (cm → 3D-Einheiten)
- Materialien mit unterschiedlichen Farben je Teppichart
- Sanfte Rotation-Animation
- Boden und Gitter als Größenreferenz
- Shadow Casting für Realismus

**Farben nach Teppichart:**
- Orient: Braun (#8B4513)
- Wolle: Beige (#DEB887)
- Seide: Gold (#DAA520)
- Synthetik: Grau (#696969)

**Normalisierung:**
Die Dimensionen werden für die 3D-Darstellung normalisiert:
```typescript
normalizedLength = length / 100   // cm zu Metern
normalizedWidth = width / 100
normalizedThickness = thickness / 100
```

### 3. CarpetDimensionsDisplay (UI-Feedback)
**Datei:** `CarpetDimensionsDisplay.tsx`

Zeigt die aktuellen Dimensionen in farbcodierten Karten an.

**Features:**
- Farbcodierte Anzeige für Länge, Breite, Dicke und Fläche
- Automatische Flächenberechnung (m²)
- Responsive Grid-Layout
- Gradient-Hintergründe für bessere Lesbarkeit

## Integration im Konfigurator

Die Komponenten werden dynamisch geladen für bessere Performance:

```typescript
const Carpet3DViewer = dynamic(
  () => import('@/components/configurator/Carpet3DViewer').then((mod) => mod.Carpet3DViewer),
  {
    ssr: false,  // Nur Client-Side
    loading: () => <LoadingSpinner />
  }
);
```

## Benutzerinteraktion

**Maus/Trackpad:**
- **Linke Maustaste + Ziehen** → Modell drehen
- **Scroll** → Zoomen
- **Rechte Maustaste + Ziehen** → Pan (deaktiviert)

**Touch (Mobile):**
- **Ein Finger + Wischen** → Drehen
- **Zwei Finger Pinch** → Zoomen
- **Zwei Finger + Wischen** → Pan (deaktiviert)

## Performance-Optimierungen

1. **Dynamic Import** - Three.js wird nur bei Bedarf geladen
2. **SSR deaktiviert** - Verhindert Server-Side-Rendering-Fehler
3. **Suspense Boundaries** - Graceful Loading States
4. **Memoization** - Komponenten rendern nur bei Prop-Änderungen
5. **Shadow-Map-Größe** - Optimiert für gute Qualität bei akzeptabler Performance

## Erweiterungsmöglichkeiten

### Texturen hinzufügen
```typescript
const textureLoader = new THREE.TextureLoader();
const carpetTexture = textureLoader.load('/textures/carpet-pattern.jpg');

<meshStandardMaterial
  map={carpetTexture}
  color={carpetColor}
/>
```

### Weitere Teppicharten
Erweitere das `carpetColors` Object in `Carpet3DModel.tsx`:
```typescript
const carpetColors: Record<CarpetType, string> = {
  // ... bestehende Farben
  newType: '#HEXCODE',
};
```

### Animations-Optionen
Passe die Rotation in `useFrame` an:
```typescript
useFrame((state) => {
  if (meshRef.current) {
    // Schnellere Rotation
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;

    // Keine Rotation
    // meshRef.current.rotation.y = 0;
  }
});
```

## Troubleshooting

### 3D-Modell wird nicht angezeigt
- Überprüfe, ob Three.js korrekt installiert ist
- Stelle sicher, dass der Browser WebGL unterstützt
- Prüfe die Browser-Console auf Fehler

### Performance-Probleme
- Reduziere Shadow-Map-Größe
- Deaktiviere Schatten temporär
- Vereinfache die Geometrie

### Mobile-Darstellung
- Das Modell ist für Touch-Interaktion optimiert
- Minimale Höhe: 300px auf Mobile, 400px auf Desktop
- Responsive Grid passt sich automatisch an

## Browser-Kompatibilität

- ✅ Chrome/Edge (WebGL 2.0)
- ✅ Firefox (WebGL 2.0)
- ✅ Safari (WebGL 2.0)
- ⚠️ Ältere Browser ohne WebGL: Fallback-UI

## Dependencies

```json
{
  "three": "^0.183.2",
  "@react-three/fiber": "^9.5.0",
  "@react-three/drei": "^10.7.7"
}
```
