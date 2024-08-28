import { toNByteInteger, hexStringToNumber, numberToHexString } from './Utils'


export default class Uint32BIType {

    m_Value;
    m_StringValue;
    m_StringRaw;
    #m_MaxLengthBytes = 4;
    #m_Signed = true
    static cNAME = "Signed integer 32 bits big endian"

    constructor(value, raw = false) {
        if (raw) {
            this.m_Value = hexStringToNumber(value, 4, true, false);
        }
        else {
            this.m_Value = toNByteInteger(value, this.#m_MaxLengthBytes, this.#m_Signed);
        }
        this.m_StringValue = this.toString();
        this.m_StringRaw = this.toRawString();
    }

    static filter(strval) {
        let strtemp=strval.replace(/[^0-9-]/g, '')
        let minus= strval.search('-')
        if(minus!=-1){
            strtemp=strtemp.replace(/[^0-9]/g, '')
            strtemp='-'+strtemp;
        }
        return strtemp;
    }

    static filterRaw(strval) {
        return strval.replace(/[^0-9a-fA-F]/g, '');
    }

    toString() {
        return `${this.m_Value.toString().toUpperCase()}`;
    }

    toRawString() {
        return numberToHexString(this.m_Value,this.#m_MaxLengthBytes,false).toUpperCase()
        .match(/.{1,2}/g)
        .join(' ');
    }

    toInt() {
        return parseInt(this.m_StringValue);
    }

}