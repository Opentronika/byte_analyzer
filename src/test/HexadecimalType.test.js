import { expect, test } from 'vitest'
import HexadecimalType from '../classes_types/HexadecimalType';


test('from signed', () => {
  expect(new HexadecimalType(-1n).m_Value).toBe(-1n)
})

test('to string signed', () => {
    const valueclass = new HexadecimalType(-1n)
    console.log(valueclass.m_StringValue)
    expect(valueclass.m_StringValue).toBe("FF FF FF FF")
  })