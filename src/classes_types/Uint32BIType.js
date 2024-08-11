import {toNByteInteger} from './Utils'


export default class Uint32BIType {

    m_Value;
    m_StringValue;
    m_StringRaw;
    #m_MaxLengthBytes = 4;
    #m_Signed = false
    static cNAME = "Unsigned integer 32 bits big endian"

    constructor(value,raw = false) {
        value = raw?parseInt(value, 16):value;
        this.m_Value = toNByteInteger(value,this.#m_MaxLengthBytes,this.#m_Signed);
        console.log(this.m_Value)
        this.m_StringValue = this.toString();
        this.m_StringRaw = this.toRawString();
    }

    static filter(strval) {
        return strval.replace(/[^0-9]/g, '');
    }

    static filterRaw(strval) {
        return strval.replace(/[^0-9a-fA-F]/g, '');
    }

    toString() {
        return `${this.m_Value.toString().padStart(1, '0').toUpperCase()}`;
    }

    toRawString() {
        return `${this.m_Value.toString(16).padStart(2, '0').toUpperCase()}`
        .match(/.{1,2}/g) 
        .join(' ');
    }

    toInt() {
        return parseInt(this.m_StringValue);
    }

}