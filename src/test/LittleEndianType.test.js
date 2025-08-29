import { describe, it, expect } from 'vitest';
import {
  Int8LE, Int16LE, Int32LE, Int64LE,
  Uint8LE, Uint16LE, Uint32LE, Uint64LE
} from '../classes_types/32LEType';

describe('LittleEndianIntType signed', () => {
  it('should create a 8-bit signed integer', () => {
    const val = new Int8LE("FF");
    expect(val.m_Value).toBe(-1n);
    expect(val.byteLength).toBe(1);
  });

  it('should create a 16-bit signed integer', () => {
    const val = new Int16LE("FFFF");
    expect(val.m_Value).toBe(-1n);
    expect(val.byteLength).toBe(2);

    const val2 = new Int16LE("0080");
    expect(val2.m_Value).toBe(-32768n);
    expect(val2.byteLength).toBe(2);
  });

  it('should create a 32-bit signed integer', () => {
    const val = new Int32LE("FFFFFFFF");
    expect(val.m_Value).toBe(-1n);
    expect(val.byteLength).toBe(4);

    const val2 = new Int32LE("00000080");
    expect(val2.m_Value).toBe(-2147483648n);
    expect(val2.byteLength).toBe(4);
  });

  it('should create a 64-bit signed integer', () => {
    const val = new Int64LE("FFFFFFFFFFFFFFFF");
    expect(val.m_Value).toBe(-1n);
    expect(val.byteLength).toBe(8);

    const val2 = new Int64LE("0000000000000080");
    expect(val2.m_Value).toBe(-9223372036854775808n);
    expect(val2.byteLength).toBe(8);
  });

});

describe('LittleEndianIntType unsigned', () => {
  it('should create a 8-bit unsigned integer', () => {
    const val = new Uint8LE("FF");
    expect(val.m_Value).toBe(255n);
    expect(val.byteLength).toBe(1);
  });

  it('should create a 16-bit unsigned integer', () => {
    const val = new Uint16LE("FFFF");
    expect(val.m_Value).toBe(65535n);
    expect(val.byteLength).toBe(2);

    const val2 = new Uint16LE("0080");
    expect(val2.m_Value).toBe(32768n);
    expect(val2.byteLength).toBe(2);
  });

  it('should create a 32-bit unsigned integer', () => {
    const val = new Uint32LE("FFFFFFFF");
    expect(val.m_Value).toBe(4294967295n);
    expect(val.byteLength).toBe(4);

    const val2 = new Uint32LE("00000080");
    expect(val2.m_Value).toBe(2147483648n);
    expect(val2.byteLength).toBe(4);
  });

  it('should create a 64-bit unsigned integer', () => {
    const val = new Uint64LE("FFFFFFFFFFFFFFFF");
    expect(val.m_Value).toBe(18446744073709551615n);
    expect(val.byteLength).toBe(8);

    const val2 = new Uint64LE("0000000000000080");
    expect(val2.m_Value).toBe(9223372036854775808n);
    expect(val2.byteLength).toBe(8);
  });

  it('should handle fromString for unsigned integers', () => {
    expect(Uint8LE.fromString("255").m_Value).toBe(255n);
    expect(Uint16LE.fromString("65535").m_Value).toBe(65535n);
    expect(Uint32LE.fromString("4294967295").m_Value).toBe(4294967295n);
    expect(Uint64LE.fromString("18446744073709551615").m_Value).toBe(18446744073709551615n);
  });

  it('should handle hex string padding', () => {
    expect(Uint16LE.fromString("1").toRawString()).toBe("0100");
    expect(Uint32LE.fromString("1").toRawString()).toBe("01000000");
    expect(Uint64LE.fromString("1").toRawString()).toBe("0100000000000000");
  });
});