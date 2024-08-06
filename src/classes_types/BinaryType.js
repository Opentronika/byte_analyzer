export default class DecimalType {

    m_Value;
    m_StringValue;
    static cNAME = "Binary"

    constructor(value) {
        this.m_Value = value;
        this.m_StringValue = this.toString();
    }

    static filter(strval) {
        return strval.replace(/[^0-1]/g, '');
    }

    toString() {
        return `${this.m_Value.toString(2).padStart(1, '0').toUpperCase()}`;
    }

    toInt() {
        return parseInt(this.m_StringValue, 2);
    }

}