export default class DecimalType {

    m_Value;
    m_StringValue;
    m_StringRaw;
    static cNAME = "Binary"
    static cMaxLengthBytes = 8;

    constructor(value) {
        this.m_Value = value;
        this.m_StringValue = this.toString();
        this.m_StringRaw = this.toRawString();
    }

    static filter(strval) {
        return strval.replace(/[^0-1]/g, '');
    }

    toString() {
        return `${this.m_Value.toString(2).padStart(1, '0').toUpperCase()}`;
    }

    static filterRaw(strval) {
        return strval.replace(/[^0-9a-fA-F]/g, '');
    }

    toRawString() {
        return `${this.m_Value.toString(16).padStart(1, '0').toUpperCase()}`;
    }

    toInt() {
        return parseInt(this.m_StringValue, 2);
    }

}