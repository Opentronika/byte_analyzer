import { toNByteInteger, hexStringToNumber } from './Utils'


export default class Uint32BIType {

    m_Value;
    m_StringValue;
    m_StringRaw;
    #m_Signed = false
    static cNAME = "Unsigned integer 32 bits big endian"
    static cMaxLengthBytes = 4; // 4 bytes = 32 bits

    constructor(value, bytelength = 4) {

        this.m_Value = toNByteInteger(value, this.constructor.cMaxLengthBytes, this.#m_Signed);
        this.m_StringValue = this.toString();
    }

    static filter(strval) {
        return strval.replace(/[^0-9]/g, '');
    }

    static fromString(hexString) {
        const filteredString = this.filter(hexString); // Filtra caracteres no válidos
        return new Uint32BIType(filteredString); // Crea una nueva instancia
    }

    toString() {
        return `${this.m_Value.toString().toUpperCase()}`;
    }


    toInt() {
        return this.m_Value;
    }

}