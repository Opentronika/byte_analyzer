import { expect, test } from 'vitest'
import HexadecimalType from '../classes_types/HexadecimalType';

test('to string signed', () => {
    const valueclass = new HexadecimalType("FF FF FF FF")
    expect(valueclass.m_StringValue).toBe("FF FF FF FF")
  })

  test('to raw string 16 bit', () => {
    const valueclass = new HexadecimalType("FF FF")
    expect(valueclass.toRawString(16)).toBe("FF FF")
    // expect(valueclass.m_StringValue).toBe("FF FF FF FF")
  })