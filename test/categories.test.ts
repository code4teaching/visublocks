import { describe, expect, it } from 'vitest'
import { categories, categoryName, categoryRank, partCategory } from '../src'

describe('VisuBlocks: Kategorien', () => {
  it('stehen in der Reihenfolge der Scratch-Palette, mit eigenen Namen', () => {
    expect(categories.map((c) => categoryName(c, 'de'))).toEqual([
      'Bewegung', 'Aussehen', 'Ton', 'Ereignisse', 'Steuerung', 'Sensoren', 'Operatoren', 'Variablen', 'Eigene Blöcke',
    ])
    expect(categoryName('myBlocks', 'en')).toBe('Own blocks')
    expect(categoryName('control', 'pt')).toBe('Controlo')
    expect(categoryName('sound', 'fr')).toBe('Sound')
  })

  it('sortiert nach Palette, Unbekanntes ans Ende', () => {
    expect(['variables', 'motion', 'xyz', 'events'].sort((a, b) => categoryRank(a) - categoryRank(b))).toEqual(['motion', 'events', 'variables', 'xyz'])
  })

  it('ordnet Bauteile ihrer Kategorie zu', () => {
    expect(partCategory('Servo')).toBe('motion')
    expect(partCategory('Led')).toBe('looks')
    expect(partCategory('Buzzer')).toBe('sound')
    expect(partCategory('Button')).toBe('sensing')
    expect(partCategory('WiFi')).toBeUndefined()
    expect(partCategory('toString')).toBeUndefined()
  })
})
