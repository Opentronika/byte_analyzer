export default class BigEndianIntType {
    m_Value;
    m_StringValue;
    m_StringRaw;
    static m_Signed = false; // Por defecto no es signed
    static cNAME = "Generic Big Endian Integer";
    static cMaxLengthBytes = 4; // Por defecto 4 bytes (32 bits)

    constructor(value) {
        this.byteLength = this.constructor.cMaxLengthBytes;

        // Remove spaces and pad with leading zeros if needed
        const paddedHex = value.padStart(this.byteLength * 2, '0');

        // Convert hex to BigInt
        let bigIntValue = BigInt('0x' + paddedHex);

        // Truncate to byteLength
        const bits = BigInt(this.byteLength * 8);
        const max = 1n << bits;
        bigIntValue = bigIntValue % max;

        // Handle signed interpretation if needed
        if (this.constructor.m_Signed) {
            const signBit = 1n << (bits - 1n);
            if (bigIntValue >= signBit) {
                bigIntValue = bigIntValue - max;
            }
        }

        this.m_Value = bigIntValue;
        this.m_StringRaw = value;
        this.m_StringValue = this.toString();
    }

    static filter(strval) {
        if (strval === "" || strval === "-") {
            return '0';
        }
        let strtemp = strval.replace(/[^0-9-]/g, '');
        let minus = strval.search('-');
        strtemp = strtemp.replace(/[^0-9]/g, '');
        if (minus != -1 && this.m_Signed) {
            strtemp = '-' + strtemp;
        }
        return strtemp;
    }

    static fromString(str, bytelength = null) {
        const filteredString = this.filter(str);
        const value = BigInt(filteredString);

        // Calculate bit width and max value
        const bits = BigInt((bytelength ?? this.cMaxLengthBytes) * 8);
        const max = 1n << bits;

        // Convert to hex, handling negative numbers with two's complement
        const hexString = value < 0n ?
            ((max + value) % max).toString(16).toUpperCase() :
            value.toString(16).toUpperCase();

        return new this(hexString, bytelength ?? this.cMaxLengthBytes);
    }

    toString() {
        // If unsigned and value is negative, show its real uint (parity 2) representation
        return `${this.m_Value.toString().toUpperCase()}`;
    }

    toInt() {
        return this.m_Value;
    }

    toRawString() {
        return this.m_StringRaw;
    }

}

// Clases hijas para signed
export class Int8BE extends BigEndianIntType {
    static cNAME = "Signed integer 8 bits big endian";
    static cMaxLengthBytes = 1;
    static m_Signed = true;
}
export class Int16BE extends BigEndianIntType {
    static cNAME = "Signed integer 16 bits big endian";
    static cMaxLengthBytes = 2;
    static m_Signed = true;
}
export class Int32BE extends BigEndianIntType {
    static cNAME = "Signed integer 32 bits big endian";
    static cMaxLengthBytes = 4;
    static m_Signed = true;
}
export class Int64BE extends BigEndianIntType {
    static cNAME = "Signed integer 64 bits big endian";
    static cMaxLengthBytes = 8;
    static m_Signed = true;
}

// Clases hijas para unsigned
export class Uint8BE extends BigEndianIntType {
    static cNAME = "Unsigned integer 8 bits big endian";
    static cMaxLengthBytes = 1;
}
export class Uint16BE extends BigEndianIntType {
    static cNAME = "Unsigned integer 16 bits big endian";
    static cMaxLengthBytes = 2;
}
export class Uint32BE extends BigEndianIntType {
    static cNAME = "Unsigned integer 32 bits big endian";
    static cMaxLengthBytes = 4;
}
export class Uint64BE extends BigEndianIntType {
    static cNAME = "Unsigned integer 64 bits big endian";
    static cMaxLengthBytes = 8;
}