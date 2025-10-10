export default class HexadecimalType {

    m_Value;
    m_StringValue;
    m_StringRaw;
    static cNAME = "Raw value Hex"
    static cMaxLengthBytes = 8;

    constructor(value, bytLength = 4) {
        this.m_Value = 0;
        this.m_StringValue = value;
    }

    static fromString(hexString, bitLength = 32) {
        const filteredString = this.filter(hexString); // Filtra caracteres no válidos
        return new HexadecimalType(filteredString, bitLength); // Crea una nueva instancia
    }

    static filter(strval) {
        return strval.replace(/[^0-9a-fA-F]/g, '');
    }

    toString() {
        return this.m_StringRaw;
    }

    toInt() {
        return this.m_Value;
    }

    toRawString() {
        return this.m_StringValue;
    }

}