/**
 * VisuBlocks: Variablen als Bausteine.
 * VisuBlocks wird entwickelt von Christian Klein und Holger Sebastiao (MIT-Lizenz).
 *
 * „Variable anlegen“ → `int zahl = 0`, „setze zahl auf 0“ → `zahl = 0`, „ändere zahl um 1“ →
 * `zahl = zahl + 1` (ohne Kurzschreibweise, für Anfänger). Jede angelegte Variable wird ein runder
 * Baustein, den Kinder in ein Wertfeld ziehen.
 */

import type { Lang } from './categories'

export const javaTypes = ['int', 'double', 'boolean', 'String', 'char', 'long', 'float'] as const

const declaration = () => new RegExp(String.raw`\b(?:${javaTypes.join('|')})\s+([A-Za-z_]\w*)\s*(?:=|;|$)`, 'g')

/** Namen aller angelegten Variablen in diesen Zeilen, in der Reihenfolge ihres ersten Auftretens */
export function declaredVariables(lines: readonly string[]): string[] {
  const out: string[] = []
  for (const line of lines) {
    for (const m of line.matchAll(declaration())) if (!out.includes(m[1])) out.push(m[1])
  }
  return out
}

/** Freier Name für eine neue Variable: zahl, zahl2, zahl3 … */
export function freshVariable(existing: readonly string[], base = 'zahl'): string {
  if (!existing.includes(base)) return base
  let n = 2
  while (existing.includes(`${base}${n}`)) n++
  return `${base}${n}`
}

export interface VariableBlock {
  id: 'declare' | 'set' | 'change'
  java: (name: string) => string
  names: Record<Lang, string>
}

export const variableBlocks: readonly VariableBlock[] = [
  { id: 'declare', java: (v) => `int ${v} = 0`, names: { de: 'Variable anlegen', en: 'make a variable', pt: 'criar variável' } },
  { id: 'set', java: (v) => `${v} = 0`, names: { de: 'setze Variable auf', en: 'set variable to', pt: 'definir variável para' } },
  { id: 'change', java: (v) => `${v} = ${v} + 1`, names: { de: 'ändere Variable um', en: 'change variable by', pt: 'alterar variável em' } },
]

export const variableName = (b: VariableBlock, lang: string): string => b.names[lang as Lang] ?? b.names.en

/** Kommt die Variable `name` in diesen Zeilen vor (als ganzes Wort, nicht in Texten)? */
export function usesVariable(lines: readonly string[], name: string): boolean {
  const word = new RegExp(String.raw`\b${name}\b`)
  return lines.some((l) => word.test(l.replace(/"(?:[^"\\]|\\.)*"/g, '""')))
}
