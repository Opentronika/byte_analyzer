import { toNByteInteger, hexStringToNumber, numberToHexString } from './Utils'

function toUnsignedBigEndian(value, byteLength) {
    // Convierte el valor a BigInt y lo limita al rango permitido
    let bigVal = BigInt(value);
    const bits = BigInt(byteLength * 8);
    const max = 1n << bits;
    // Si es negativo, lo ajusta al rango positivo (opcional: puedes lanzar error si no quieres permitir negativos)
    if (bigVal < 0n) {
        bigVal = max + bigVal;
    }
    return bigVal & (max - 1n);
}

export default class BigEndianIntType {
    m_Value;
    m_StringValue;
    m_StringRaw;
    #m_Signed;
    static cNAME = "Generic Big Endian Integer";
    static cMaxLengthBytes = 4; // Por defecto 4 bytes (32 bits)

    constructor(value, bytelength = null, signed = true) {
        this.#m_Signed = signed;
        this.byteLength = bytelength ?? this.constructor.cMaxLengthBytes;
        this.m_Value = BigInt(value);
        this.m_StringRaw = this.toHexString();
        this.m_StringValue = this.toString();
    }

    static filter(strval) {
        let strtemp = strval.replace(/[^0-9-]/g, '');
        let minus = strval.search('-');
        if (minus != -1) {
            strtemp = strtemp.replace(/[^0-9]/g, '');
            strtemp = '-' + strtemp;
        }
        return strtemp;
    }

    static fromString(str, bytelength = null, signed = true) {
        const filteredString = this.filter(str);
        return new this(filteredString, bytelength ?? this.cMaxLengthBytes, signed);
    }

    toString() {
        return `${this.m_Value.toString().toUpperCase()}`;
    }

    toInt() {
        return this.m_Value;
    }

    // Representación hexadecimal big endian
    toHexString() {
        let val;
        if (this.#m_Signed) {
            // Complemento a dos para negativos
            const bits = BigInt(this.byteLength * 8);
            const max = 1n << bits;
            val = this.m_Value < 0n ? max + this.m_Value : this.m_Value;
            val = val & (max - 1n);
        } else {
            // Solo limitar al rango permitido
            val = toUnsignedBigEndian(this.m_Value, this.byteLength);
        }
        let hex = val.toString(16).toUpperCase().padStart(this.byteLength * 2, '0');
        return hex.match(/.{1,2}/g).join(' ');
    }
}

// Clases hijas para signed
export class Int8BE extends BigEndianIntType {
    static cNAME = "Signed integer 8 bits big endian";
    static cMaxLengthBytes = 1;
}
export class Int16BE extends BigEndianIntType {
    static cNAME = "Signed integer 16 bits big endian";
    static cMaxLengthBytes = 2;
}
export class Int32BE extends BigEndianIntType {
    static cNAME = "Signed integer 32 bits big endian";
    static cMaxLengthBytes = 4;
}
export class Int64BE extends BigEndianIntType {
    static cNAME = "Signed integer 64 bits big endian";
    static cMaxLengthBytes = 8;
}

// Clases hijas para unsigned
export class Uint8BE extends BigEndianIntType {
    static cNAME = "Unsigned integer 8 bits big endian";
    static cMaxLengthBytes = 1;
    constructor(value) { super(value, 1, false); }
}
export class Uint16BE extends BigEndianIntType {
    static cNAME = "Unsigned integer 16 bits big endian";
    static cMaxLengthBytes = 2;
    constructor(value) { super(value, 2, false); }
}
export class Uint32BE extends BigEndianIntType {
    static cNAME = "Unsigned integer 32 bits big endian";
    static cMaxLengthBytes = 4;
    constructor(value) { super(value, 4, false); }
}
export class Uint64BE extends BigEndianIntType {
    static cNAME = "Unsigned integer 64 bits big endian";
    static cMaxLengthBytes = 8;
    constructor(value) { super(value, 8, false); }
}