# VisuBlocks

Gemeinsame Block-Bibliothek der VisuCode-Projekte (VisuBot, VisuMicro …): kinderfreundliche Blöcke, aus denen Java-Code entsteht.

Entwickelt von Christian Klein und Holger Sebastiao. MIT-Lizenz.

## Idee

Kinder tippen in einen Block nur Werte (Zahlen, Texte) oder ziehen Sensoren und Variablen hinein. Das Java schreibt der Block selbst und liest es auch wieder zurück. Für jeden Block steht hier genau einmal fest:

- was das Kind sieht (z. B. „zähle mit i von [0] bis unter [10] in Schritten von [1]“),
- welche Felder es gibt und was darin erlaubt ist,
- welcher Java-Code daraus entsteht und wie er zurückgelesen wird.

Die Dateien kennen kein DOM und kein Struktogramm. Zeichnen und Ziehen bleibt in jedem Projekt, nur die Regeln sind gemeinsam.

## Kategorien

Reihenfolge wie bei Scratch, mit eigenen Namen: Bewegung, Aussehen, Ton, Ereignisse, Steuerung, Sensoren, Operatoren, Variablen, Eigene Blöcke.

`src/categories.ts`: Kennungen und Reihenfolge (`categories`, `categoryRank`), Namen auf Deutsch, Englisch und Portugiesisch (`categoryName`) und welche Bauteile wohin gehören (`partCategory('Servo')` → `motion`). Farben legt jedes Projekt selbst fest.

## Bausteine

| Datei | Block | Java |
|---|---|---|
| `src/countLoop.ts` | zähle mit i von [0] bis unter [10] in Schritten von [1] | `for (int i = 0; i < 10; i++)` |

## Einbinden

In `package.json` des Projekts, mit fester Version (Commit oder, sobald es Releases gibt, ein Tag wie `v0.1.0`):

```json
"dependencies": { "visublocks": "github:code4teaching/visublocks#<commit>" }
```

Neue Version holen: Commit in `package.json` ändern und `npm install`.

```ts
import { readCountLoop, countLoopLines } from 'visublocks'
```

Die Quellen sind TypeScript; Vite und Vitest übersetzen sie direkt.

## Entwickeln

```sh
npm install
npm test
npm run check
```
