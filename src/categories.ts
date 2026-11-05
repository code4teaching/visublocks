/**
 * VisuBlocks: Kategorien der Block-Paletten.
 * VisuBlocks wird entwickelt von Christian Klein und Holger Sebastiao (MIT-Lizenz).
 *
 * Reihenfolge wie die Palette in Scratch, mit eigenen Namen: Bewegung, Aussehen, Ton, Ereignisse,
 * Steuerung, Sensoren, Operatoren, Variablen, Eigene Blöcke. Farben und Zeichnen bleiben im Projekt;
 * hier stehen nur Kennung, Reihenfolge, Namen (de/en/pt) und die Zuordnung der Bauteile.
 */

export type Category = 'motion' | 'looks' | 'sound' | 'events' | 'control' | 'sensing' | 'operators' | 'variables' | 'myBlocks'

export type Lang = 'de' | 'en' | 'pt'

/** Alle Kategorien in der Reihenfolge der Palette */
export const categories: readonly Category[] = ['motion', 'looks', 'sound', 'events', 'control', 'sensing', 'operators', 'variables', 'myBlocks']

/** Namen, wie sie Kinder in der Palette sehen */
export const categoryNames: Record<Category, Record<Lang, string>> = {
  motion: { de: 'Bewegung', en: 'Motion', pt: 'Movimento' },
  looks: { de: 'Aussehen', en: 'Looks', pt: 'Aparência' },
  sound: { de: 'Ton', en: 'Sound', pt: 'Som' },
  events: { de: 'Ereignisse', en: 'Events', pt: 'Eventos' },
  control: { de: 'Steuerung', en: 'Control', pt: 'Controlo' },
  sensing: { de: 'Sensoren', en: 'Sensors', pt: 'Sensores' },
  operators: { de: 'Operatoren', en: 'Operators', pt: 'Operadores' },
  variables: { de: 'Variablen', en: 'Variables', pt: 'Variáveis' },
  myBlocks: { de: 'Eigene Blöcke', en: 'Own blocks', pt: 'Blocos próprios' },
}

/** Name einer Kategorie; unbekannte Sprache → Englisch */
export const categoryName = (c: Category, lang: string): string => categoryNames[c][lang as Lang] ?? categoryNames[c].en

/** Position in der Palette (zum Sortieren); unbekannt → ganz hinten */
export const categoryRank = (c: string): number => {
  const i = categories.indexOf(c as Category)
  return i < 0 ? categories.length : i
}

/**
 * Bauteile → Kategorie, nach dem englischen Klassennamen der Bibliothek. Befehle an ein Bauteil
 * (led.turnOn()) bekommen dessen Kategorie: Bewegung bewegt etwas, Aussehen leuchtet oder zeigt an,
 * Ton macht Geräusche, Sensoren messen. Gilt für VisuMicro (Maker Pi Pico); weitere Welten ergänzen.
 */
export const partCategories: Readonly<Record<string, Category>> = {
  // Bewegung
  Servo: 'motion',
  Fan: 'motion',
  // Aussehen
  Led: 'looks',
  DimmableLed: 'looks',
  RgbLed: 'looks',
  Relay: 'looks',
  Lcd: 'looks',
  // Ton
  Buzzer: 'sound',
  Tone: 'sound',
  // Sensoren
  Button: 'sensing',
  MotionSensor: 'sensing',
  LightSensor: 'sensing',
  SoundSensor: 'sensing',
  RotarySensor: 'sensing',
  ClimateSensor: 'sensing',
  UltrasonicSensor: 'sensing',
  Co2Sensor: 'sensing',
  RfidReader: 'sensing',
  DigitalSensor: 'sensing',
  AnalogSensor: 'sensing',
}

/** Kategorie eines Bauteils nach englischem Klassennamen; `undefined`, wenn es keins ist */
export const partCategory = (className: string): Category | undefined =>
  Object.hasOwn(partCategories, className) ? partCategories[className] : undefined
