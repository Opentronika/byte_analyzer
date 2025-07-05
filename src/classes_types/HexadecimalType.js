export default class HexadecimalType {

    m_Value;
    m_StringValue;
    m_StringRaw;
    static cNAME = "Raw value Hex"
    static cMaxLengthBytes = 4;

    constructor(value, bytLength = 4) {
        this.m_Value = BigInt(value);
        console.log(this.m_Value,bytLength);
        this.m_StringValue = this.toRawString(bytLength*8);
        // this.m_StringRaw=this.toRawString();
    }

    static fromString(hexString, bitLength = 32) {
        const filteredString = this.filter(hexString); // Filtra caracteres no válidos
        const value = BigInt(`0x${filteredString}`); // Convierte a BigInt
        return new HexadecimalType(value, bitLength); // Crea una nueva instancia
    }

    static filter(strval) {
        return strval.replace(/[^0-9a-fA-F]/g, '');
    }

    static filterRaw(strval) {
        return strval.replace(/[^0-9a-fA-F]/g, '');
    }

    toString() {
        return `${this.m_Value.toString(16).padStart(1, '0').toUpperCase()}`;
    }

    toRawString(bitLength = 32) {
        const maxValue = BigInt(2 ** bitLength); // Valor máximo para el tamaño de bits
        const signedValue = this.m_Value < 0n ? maxValue + this.m_Value : this.m_Value; // Ajusta el valor para incluir el bit de signo

        const hexString = signedValue.toString(16).toUpperCase(); // Convierte BigInt a hexadecimal
        const paddedHex = hexString.padStart(bitLength / 4, '0'); // Asegura longitud adecuada (4 bits por dígito hexadecimal)
        return paddedHex.match(/.{1,2}/g).join(' '); // Divide en pares y los une con espacios
    }

    toInt() {
        return this.m_Value;
    }

}