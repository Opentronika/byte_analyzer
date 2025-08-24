import { describe, it, expect } from 'vitest';
import BigEndianIntType, {
  Int8BE, Int16BE, Int32BE, Int64BE,
  Uint8BE, Uint16BE, Uint32BE, Uint64BE
} from '../classes_types/32BEType';

describe('BigEndianIntType signed', () => {
  it('should create a 8-bit signed integer', () => {
    const val = new Int8BE("FF");
    expect(val.m_Value).toBe(-1n);
    expect(val.byteLength).toBe(1);
  });

  it('should create a 16-bit signed integer', () => {
    const val = new Int16BE("FFFF");
    expect(val.m_Value).toBe(-1n);
    expect(val.byteLength).toBe(2);

    const val2 = new Int16BE("8000");
    expect(val2.m_Value).toBe(-32768n);
    expect(val2.byteLength).toBe(2);
  });

  it('should create a 32-bit signed integer', () => {
    const val = new Int32BE("FFFFFFFF");
    expect(val.m_Value).toBe(-1n);
    expect(val.byteLength).toBe(4);

    const val2 = new Int32BE("80000000");
    expect(val2.m_Value).toBe(-2147483648n);
    expect(val2.byteLength).toBe(4);
  });

  it('should create a 64-bit signed integer', () => {
    const val = new Int64BE("FFFFFFFFFFFFFFFF");
    expect(val.m_Value).toBe(-1n);
    expect(val.byteLength).toBe(8);

    const val2 = new Int64BE("8000000000000000");
    expect(val2.m_Value).toBe(-9223372036854775808n);
    expect(val2.byteLength).toBe(8);
  });

  it('should handle fromString for signed integers', () => {
    expect(Int8BE.fromString("-1").m_Value).toBe(-1n);
    expect(Int16BE.fromString("-32768").m_Value).toBe(-32768n);
    expect(Int32BE.fromString("-2147483648").m_Value).toBe(-2147483648n);
    expect(Int64BE.fromString("-9223372036854775808").m_Value).toBe(-9223372036854775808n);
  });
});

describe('BigEndianIntType unsigned', () => {
  it('should create a 8-bit unsigned integer', () => {
    const val = new Uint8BE("FF");
    expect(val.m_Value).toBe(255n);
    expect(val.byteLength).toBe(1);
  });

  it('should create a 16-bit unsigned integer', () => {
    const val = new Uint16BE("FFFF");
    expect(val.m_Value).toBe(65535n);
    expect(val.byteLength).toBe(2);

    const val2 = new Uint16BE("8000");
    expect(val2.m_Value).toBe(32768n);
    expect(val2.byteLength).toBe(2);
  });

  it('should create a 32-bit unsigned integer', () => {
    const val = new Uint32BE("FFFFFFFF");
    expect(val.m_Value).toBe(4294967295n);
    expect(val.byteLength).toBe(4);

    const val2 = new Uint32BE("80000000");
    expect(val2.m_Value).toBe(2147483648n);
    expect(val2.byteLength).toBe(4);
  });

  it('should create a 64-bit unsigned integer', () => {
    const val = new Uint64BE("FFFFFFFFFFFFFFFF");
    expect(val.m_Value).toBe(18446744073709551615n);
    expect(val.byteLength).toBe(8);

    const val2 = new Uint64BE("8000000000000000");
    expect(val2.m_Value).toBe(9223372036854775808n);
    expect(val2.byteLength).toBe(8);
  });

  it('should handle fromString for unsigned integers', () => {
    expect(Uint8BE.fromString("255").m_Value).toBe(255n);
    expect(Uint16BE.fromString("65535").m_Value).toBe(65535n);
    expect(Uint32BE.fromString("4294967295").m_Value).toBe(4294967295n);
    expect(Uint64BE.fromString("18446744073709551615").m_Value).toBe(18446744073709551615n);
  });

  it('should handle hex string padding', () => {
    expect(Uint16BE.fromString("1").toRawString()).toBe("1");
    expect(Uint32BE.fromString("1").toRawString()).toBe("1");
    expect(Uint64BE.fromString("1").toRawString()).toBe("1");
  });
});