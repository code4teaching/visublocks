/**
 * VisuBlocks: Operatoren als Bausteine (Rechnen, Vergleichen, Logik, Zufallszahl).
 * VisuBlocks wird entwickelt von Christian Klein und Holger Sebastiao (MIT-Lizenz).
 *
 * Ein Operator ist ein Stück Java mit Platzhaltern (`0 + 0`, `0 < 10`), das Kinder auf ein Wertfeld oder
 * eine Bedingung ziehen; die Platzhalter sind dann wieder Wertfelder. Rund = ergibt eine Zahl,
 * sechseckig (bool) = ergibt wahr oder falsch, wie in Scratch.
 */

import type { Lang } from './categories'

export type ExprShape = 'round' | 'bool'

export interface OperatorBlock {
  id: 'add' | 'sub' | 'mul' | 'div' | 'mod' | 'random' | 'lt' | 'gt' | 'eq' | 'and' | 'or' | 'not'
  /** Java, das beim Ablegen entsteht */
  java: string
  shape: ExprShape
  names: Record<Lang, string>
}

/** Zufallszahl von `from` bis `to` (beide eingeschlossen) als Java */
export function randomJava(from: number, to: number): string {
  const [a, b] = from <= to ? [from, to] : [to, from]
  return `(int) (Math.random() * ${b - a + 1}) + ${a}`
}

/** Operatoren in der Reihenfolge der Palette: Rechnen, Zufall, Vergleichen, Logik */
export const operatorBlocks: readonly OperatorBlock[] = [
  { id: 'add', java: '0 + 0', shape: 'round', names: { de: 'plus', en: 'plus', pt: 'mais' } },
  { id: 'sub', java: '0 - 0', shape: 'round', names: { de: 'minus', en: 'minus', pt: 'menos' } },
  { id: 'mul', java: '0 * 0', shape: 'round', names: { de: 'mal', en: 'times', pt: 'vezes' } },
  { id: 'div', java: '0 / 1', shape: 'round', names: { de: 'geteilt durch', en: 'divided by', pt: 'a dividir por' } },
  { id: 'mod', java: '0 % 2', shape: 'round', names: { de: 'Rest beim Teilen', en: 'remainder', pt: 'resto da divisão' } },
  { id: 'random', java: randomJava(1, 10), shape: 'round', names: { de: 'Zufallszahl', en: 'random number', pt: 'número aleatório' } },
  { id: 'lt', java: '0 < 10', shape: 'bool', names: { de: 'kleiner als', en: 'less than', pt: 'menor que' } },
  { id: 'gt', java: '0 > 10', shape: 'bool', names: { de: 'größer als', en: 'greater than', pt: 'maior que' } },
  { id: 'eq', java: '0 == 10', shape: 'bool', names: { de: 'gleich', en: 'equals', pt: 'igual a' } },
  { id: 'and', java: 'true && true', shape: 'bool', names: { de: 'und', en: 'and', pt: 'e' } },
  { id: 'or', java: 'true || true', shape: 'bool', names: { de: 'oder', en: 'or', pt: 'ou' } },
  { id: 'not', java: '!true', shape: 'bool', names: { de: 'nicht', en: 'not', pt: 'não' } },
]

export const operatorName = (b: OperatorBlock, lang: string): string => b.names[lang as Lang] ?? b.names.en

/** Ergibt dieses Java wahr/falsch (sechseckiger Baustein)? */
export const isBoolExpression = (java: string): boolean => /^!|&&|\|\||[<>]=?|==|!=/.test(java.trim())

/** Zufallszahl im Text finden: `(int) (Math.random() * 10) + 1` → von 1 bis 10 */
export const randomPattern = () => /\(int\)\s*\(\s*Math\.random\(\)\s*\*\s*(\d+)\s*\)\s*\+\s*(-?\d+)/g

export function readRandom(text: string): { from: number; to: number } | undefined {
  const m = [...text.matchAll(randomPattern())][0]
  if (!m || m.index !== 0 || m[0].length !== text.length) return undefined
  const from = Number(m[2])
  return { from, to: from + Number(m[1]) - 1 }
}

/**
 * Braucht `value` Klammern, wenn es zwischen `before` und `after` eingesetzt wird? Nicht, wenn es ein
 * ganzes Argument, eine ganze rechte Seite oder eine ganze Bedingung ist (`mbot.forward(0 + 0)`,
 * `x = 0 + 0`), und nie bei einem einzelnen Wert.
 */
export function needsParens(before: string, after: string, value: string): boolean {
  const v = value.trim()
  if (!/\s(\+|-|\*|\/|%|<|>|<=|>=|==|!=|&&|\|\|)\s/.test(v) && !/^\(int\)/.test(v)) return false
  const b = before.trimEnd()
  const a = after.trimStart()
  const openLeft = b === '' || /(^|[^=!<>])=$/.test(b) || /[(,]$/.test(b) || /^(if|while|for|return)$/.test(b)
  const openRight = a === '' || /^[),;]/.test(a)
  return !(openLeft && openRight)
}

/** `line` mit `value` an Stelle [start, end) – mit Klammern, falls nötig */
export function insertExpression(line: string, start: number, end: number, value: string): string {
  const before = line.slice(0, start)
  const after = line.slice(end)
  const v = needsParens(before, after, value) ? `(${value.trim()})` : value.trim()
  return before + v + after
}
