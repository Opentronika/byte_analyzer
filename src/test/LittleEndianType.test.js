// import { describe, it, expect } from 'vitest';
// import {
//   Int8LE, Int16LE, Int32LE, Int64LE,
//   Uint8LE, Uint16LE, Uint32LE, Uint64LE
// } from '../classes_types/32LEType';

// describe('LittleEndianIntType signed', () => {
//   it('should create a 32-bit signed integer', () => {
//     const val = new Int32LE(123456789);
//     expect(val.m_Value).toBe(123456789n);
//     expect(val.byteLength).toBe(4);
//     expect(val.toHexString()).toBe('15 CD 5B 07');
//   });

//   it('should create a negative 32-bit signed integer', () => {
//     const val = new Int32LE(-1);
//     expect(val.m_Value).toBe(-1n);
//     expect(val.byteLength).toBe(4);
//     expect(val.toHexString()).toBe('FF FF FF FF');
//   });

//   it('should create a negative 16-bit signed integer', () => {
//     const val = new Int16LE(-2);
//     expect(val.m_Value).toBe(-2n);
//     expect(val.byteLength).toBe(2);
//     expect(val.toHexString()).toBe('FE FF');
//   });

//   it('should create a negative 8-bit signed integer', () => {
//     const val = new Int8LE(-128);
//     expect(val.m_Value).toBe(-128n);
//     expect(val.byteLength).toBe(1);
//     expect(val.toHexString()).toBe('80');
//   });

//   it('should create a 64-bit signed integer', () => {
//     const val = new Int64LE(9007199254740991n);
//     expect(val.m_Value).toBe(9007199254740991n);
//     expect(val.byteLength).toBe(8);
//     expect(val.toHexString()).toBe('FF FF FF FF FF FF 1F 00');
//   });
// });

// describe('LittleEndianIntType unsigned', () => {
//   it('should create a 32-bit unsigned integer', () => {
//     const val = new Uint32LE(4294967295);
//     expect(val.m_Value).toBe(4294967295n);
//     expect(val.byteLength).toBe(4);
//     expect(val.toHexString()).toBe('FF FF FF FF');
//   });

//   it('should create a 16-bit unsigned integer', () => {
//     const val = new Uint16LE(65535);
//     expect(val.m_Value).toBe(65535n);
//     expect(val.byteLength).toBe(2);
//     expect(val.toHexString()).toBe('FF FF');
//   });

//   it('should create an 8-bit unsigned integer', () => {
//     const val = new Uint8LE(255);
//     expect(val.m_Value).toBe(255n);
//     expect(val.byteLength).toBe(1);
//     expect(val.toHexString()).toBe('FF');
//   });

//   it('should wrap negative values for unsigned', () => {
//     const val = new Uint8LE(-1);
//     expect(val.m_Value).toBe(-1n);
//     expect(val.toHexString()).toBe('FF');
//   });

//   it('should create a 64-bit unsigned integer', () => {
//     const val = new Uint64LE(18446744073709551615n);
//     expect(val.m_Value).toBe(18446744073709551615n);
//     expect(val.byteLength).toBe(8);
//     expect(val.toHexString()).toBe('FF FF FF FF FF FF FF FF');
//   });
// });