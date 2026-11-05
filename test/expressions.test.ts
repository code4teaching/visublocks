import { describe, expect, it } from 'vitest'
import { declaredVariables, freshVariable, insertExpression, isBoolExpression, isRepeatLoop, needsParens, randomJava, readCountLoop, readRandom, repeatLoopLines, usesVariable } from '../src'

describe('VisuBlocks: Operatoren', () => {
  it('setzt Klammern nur, wenn nötig', () => {
    const line = 'mbot.forward(50)'
    expect(insertExpression(line, 13, 15, '0 + 0')).toBe('mbot.forward(0 + 0)')
    expect(insertExpression('x = 5 * 2', 4, 5, '1 + 1')).toBe('x = (1 + 1) * 2')
    expect(insertExpression('x = 5', 4, 5, '1 + 1')).toBe('x = 1 + 1')
    expect(insertExpression('a == 5', 5, 6, '1 + 1')).toBe('a == (1 + 1)')
    expect(needsParens('', '', '0 < 10')).toBe(false)
    expect(needsParens('mbot.pause(', ')', '7')).toBe(false)
  })

  it('Zufallszahl hin und zurück', () => {
    expect(randomJava(1, 6)).toBe('(int) (Math.random() * 6) + 1')
    expect(readRandom('(int) (Math.random() * 6) + 1')).toEqual({ from: 1, to: 6 })
    expect(readRandom(randomJava(10, 3))).toEqual({ from: 3, to: 10 })
    expect(readRandom('Math.random()')).toBeUndefined()
  })

  it('erkennt Ja/Nein-Ausdrücke', () => {
    expect(isBoolExpression('0 < 10')).toBe(true)
    expect(isBoolExpression('!true')).toBe(true)
    expect(isBoolExpression('0 + 0')).toBe(false)
  })
})

describe('VisuBlocks: Variablen', () => {
  it('findet angelegte Variablen und freie Namen', () => {
    expect(declaredVariables(['int zahl = 0', 'String name = "Ada"', 'zahl = zahl + 1', 'int i = 0; i < 3; i++'])).toEqual(['zahl', 'name', 'i'])
    expect(freshVariable(['zahl', 'zahl2'])).toBe('zahl3')
    expect(usesVariable(['mbot.forward(i)'], 'i')).toBe(true)
    expect(usesVariable(['mbot.showText("i")', 'mbot.pause(100)'], 'i')).toBe(false)
  })

  it('wiederhole n-mal', () => {
    expect(repeatLoopLines(5)).toEqual(['int i = 0', 'i < 5', 'i++'])
    expect(isRepeatLoop(readCountLoop(repeatLoopLines())!)).toBe(true)
    expect(isRepeatLoop(readCountLoop(['int i = 1', 'i <= 5', 'i++'])!)).toBe(false)
  })
})
