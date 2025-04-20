import { toNByteInteger, hexStringToNumber, numberToHexString } from './Utils'


export default class Uint32BIType {

    m_Value;
    m_StringValue;
    m_StringRaw;
    #m_Signed = true
    static cNAME = "Signed integer 32 bits big endian"
    static cMaxLengthBytes = 4;

    constructor(value, bytelength = 2) {
        
        this.m_Value = toNByteInteger(value, this.constructor.cMaxLengthBytes, this.#m_Signed);
        this.m_StringValue = this.toString();
    }

    static filter(strval) {
        let strtemp = strval.replace(/[^0-9-]/g, '')
        let minus = strval.search('-')
        if (minus != -1) {
            strtemp = strtemp.replace(/[^0-9]/g, '')
            strtemp = '-' + strtemp;
        }
        return strtemp;
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