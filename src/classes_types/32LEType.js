import BigEndianIntType from './32BEType'

// Base class for little endian
class LittleEndianIntType extends BigEndianIntType {

    static BytePairReverse(value) {
        // Split into character pairs (bytes)
        const bytePairs = value.match(/.{1,2}/g) || [];
        // Reverse the byte order
        const reversedBytePairs = bytePairs.reverse();
        // Join the reversed bytes into a single string
        return reversedBytePairs.join('');
    }

    constructor(value){
       // First call super with a temporary value
        super('00');
        
        // Now we can access this.constructor
        const length = this.constructor.cMaxLengthBytes;
        
        // Pad the input hex string
        const paddedHex = value.padStart(length * 2, '0');
        
        // Reverse bytes for little endian
        const reversedHex = LittleEndianIntType.BytePairReverse(paddedHex);
        
        // Convert hex to BigInt
        let bigIntValue = BigInt('0x' + reversedHex);

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
        this.m_StringRaw = reversedHex;
        this.m_StringValue = this.toString();
    }

    static fromString(str, bytelength = null) {
        const filteredString = this.filter(str);
        const value = BigInt(filteredString);

        // Calculate bit width and max value
        const bits = BigInt((bytelength ?? this.cMaxLengthBytes) * 8);
        const max = 1n << bits;

        // Convert to hex, handling negative numbers with two's complement
        let hexString = value < 0n ?
            ((max + value) % max).toString(16).toUpperCase() :
            value.toString(16).toUpperCase();

        // Pad with leading zeros to ensure even length
        hexString = hexString.padStart((bytelength ?? this.cMaxLengthBytes) * 2, '0');

        return new this(hexString); 
    }

}

// Clases hijas para signed
export class Int8LE extends LittleEndianIntType {
    static cNAME = "Signed integer 8 bits little endian";
    static cMaxLengthBytes = 1;
    static m_Signed = true;
}
export class Int16LE extends LittleEndianIntType {
    static cNAME = "Signed integer 16 bits little endian";
    static cMaxLengthBytes = 2;
    static m_Signed = true;
}
export class Int32LE extends LittleEndianIntType {
    static cNAME = "Signed integer 32 bits little endian";
    static cMaxLengthBytes = 4;
    static m_Signed = true;
}
export class Int64LE extends LittleEndianIntType {
    static cNAME = "Signed integer 64 bits little endian";
    static cMaxLengthBytes = 8;
    static m_Signed = true;
}

// Clases hijas para unsigned
export class Uint8LE extends LittleEndianIntType {
    static cNAME = "Unsigned integer 8 bits little endian";
    static cMaxLengthBytes = 1;
}
export class Uint16LE extends LittleEndianIntType {
    static cNAME = "Unsigned integer 16 bits little endian";
    static cMaxLengthBytes = 2;
}
export class Uint32LE extends LittleEndianIntType {
    static cNAME = "Unsigned integer 32 bits little endian";
    static cMaxLengthBytes = 4;
}
export class Uint64LE extends LittleEndianIntType {
    static cNAME = "Unsigned integer 64 bits little endian";
    static cMaxLengthBytes = 8;
}