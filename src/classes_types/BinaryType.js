export default class BinaryType {

    m_Value;
    m_StringValue;
    m_StringRaw;
    static cNAME = "Binary"
    static cMaxLengthBytes = 16;

    constructor(value) {
        if (value == "") {
            value = "0"
        }
        this.m_Value = BigInt('0x' + value);
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

    static fromString(binString) {
        let value = 0n;
        if (binString != "") {
            value = BigInt(`0b${binString}`); // Convierte a BigInt
        }
        let hexvalue = value.toString(16).padStart(1, '0').toUpperCase()
        return new BinaryType(hexvalue); // Crea una nueva instancia
    }

    toInt() {
        return parseInt(this.m_StringValue, 2);
    }

}