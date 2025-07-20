import { toNByteInteger, hexStringToNumber, numberToHexString } from './Utils'
import BigEndianIntType from './32BEType'

// Clase base para little endian
class LittleEndianIntType extends BigEndianIntType {
    toHexString() {
        let val;
        if (this.isSigned) {
            const bits = BigInt(this.byteLength * 8);
            const max = 1n << bits;
            val = this.m_Value < 0n ? max + this.m_Value : this.m_Value;
            val = val & (max - 1n);
        } else {
            val = BigInt(this.m_Value);
            const bits = BigInt(this.byteLength * 8);
            const max = 1n << bits;
            val = val & (max - 1n);
        }
        let hex = val.toString(16).toUpperCase().padStart(this.byteLength * 2, '0');
        // Invertir los bytes para little endian
        return hex.match(/.{1,2}/g).reverse().join(' ');
    }
}

// Clases hijas para signed
export class Int8LE extends LittleEndianIntType {
    static cNAME = "Signed integer 8 bits little endian";
    static cMaxLengthBytes = 1;
}
export class Int16LE extends LittleEndianIntType {
    static cNAME = "Signed integer 16 bits little endian";
    static cMaxLengthBytes = 2;
}
export class Int32LE extends LittleEndianIntType {
    static cNAME = "Signed integer 32 bits little endian";
    static cMaxLengthBytes = 4;
}
export class Int64LE extends LittleEndianIntType {
    static cNAME = "Signed integer 64 bits little endian";
    static cMaxLengthBytes = 8;
}

// Clases hijas para unsigned
export class Uint8LE extends LittleEndianIntType {
    static cNAME = "Unsigned integer 8 bits little endian";
    static cMaxLengthBytes = 1;
    constructor(value) { super(value, 1, false); }
}
export class Uint16LE extends LittleEndianIntType {
    static cNAME = "Unsigned integer 16 bits little endian";
    static cMaxLengthBytes = 2;
    constructor(value) { super(value, 2, false); }
}
export class Uint32LE extends LittleEndianIntType {
    static cNAME = "Unsigned integer 32 bits little endian";
    static cMaxLengthBytes = 4;
    constructor(value) { super(value, 4, false); }
}
export class Uint64LE extends LittleEndianIntType {
    static cNAME = "Unsigned integer 64 bits little endian";
    static cMaxLengthBytes = 8;
    constructor(value) { super(value, 8, false); }
}