import { expect, test } from 'vitest'
import HexadecimalType from '../classes_types/HexadecimalType';

test('to string signed', () => {
    const valueclass = new HexadecimalType("FF FF FF FF")
    console.log(valueclass.m_StringValue)
    expect(valueclass.m_StringValue).toBe("FF FF FF FF")
  })

  test('to raw string 16 bit', () => {
    const valueclass = new HexadecimalType("FF FF")
    console.log(valueclass.toRawString(16))
    expect(valueclass.toRawString(16)).toBe("FF FF")
    // expect(valueclass.m_StringValue).toBe("FF FF FF FF")
  })