import { describe, it, expect } from 'vitest';
import BigEndianIntType, {
  Int8BE, Int16BE, Int32BE, Int64BE,
  Uint8BE, Uint16BE, Uint32BE, Uint64BE
} from '../classes_types/32BEType';

describe('BigEndianIntType signed', () => {
  it('should create a 32-bit signed integer', () => {
    const val = new Int32BE(123456789);
    expect(val.m_Value).toBe(123456789n);
    expect(val.byteLength).toBe(4);
    expect(val.toHexString()).toBe('07 5B CD 15');
  });

  it('should create a negative 32-bit signed integer', () => {
    const val = new Int32BE(-1);
    expect(val.m_Value).toBe(-1n);
    expect(val.byteLength).toBe(4);
    expect(val.toHexString()).toBe('FF FF FF FF');
  });

  it('should create a negative 16-bit signed integer', () => {
    const val = new Int16BE(-2);
    expect(val.m_Value).toBe(-2n);
    expect(val.byteLength).toBe(2);
    expect(val.toHexString()).toBe('FF FE');
  });

  it('should create a negative 8-bit signed integer', () => {
    const val = new Int8BE(-128);
    expect(val.m_Value).toBe(-128n);
    expect(val.byteLength).toBe(1);
    expect(val.toHexString()).toBe('80');
  });

  it('should create a 64-bit signed integer', () => {
    const val = new Int64BE(9007199254740991n);
    expect(val.m_Value).toBe(9007199254740991n);
    expect(val.byteLength).toBe(8);
    expect(val.toHexString()).toBe('00 1F FF FF FF FF FF FF');
  });
});

describe('BigEndianIntType unsigned', () => {
  it('should create a 32-bit unsigned integer', () => {
    const val = new Uint32BE(4294967295);
    expect(val.m_Value).toBe(4294967295n);
    expect(val.byteLength).toBe(4);
    expect(val.toHexString()).toBe('FF FF FF FF');
  });

  it('should create a 16-bit unsigned integer', () => {
    const val = new Uint16BE(65535);
    expect(val.m_Value).toBe(65535n);
    expect(val.byteLength).toBe(2);
    expect(val.toHexString()).toBe('FF FF');
  });

  it('should create an 8-bit unsigned integer', () => {
    const val = new Uint8BE(255);
    expect(val.m_Value).toBe(255n);
    expect(val.byteLength).toBe(1);
    expect(val.toHexString()).toBe('FF');
  });

  it('should wrap negative values for unsigned', () => {
    const val = new Uint8BE(-1);
    expect(val.m_Value).toBe(-1n);
    expect(val.toHexString()).toBe('FF');
  });

  it('should create a 64-bit unsigned integer', () => {
    const val = new Uint64BE(18446744073709551615n);
    expect(val.m_Value).toBe(18446744073709551615n);
    expect(val.byteLength).toBe(8);
    expect(val.toHexString()).toBe('FF FF FF FF FF FF FF FF');
  });
});