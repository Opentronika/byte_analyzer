export default class HexadecimalType {

    m_Value;
    m_StringValue;
    m_StringRaw;
    static cNAME = "Raw value Hex"

    constructor(value) {
        this.m_Value = BigInt(value);
        console.log(this.m_Value);
        this.m_StringValue = this.toRawString();
        // this.m_StringRaw=this.toRawString();
    }

    static fromString(hexString) {
        // console.log(hexString);
        const filteredString = this.filter(hexString); // Filtra caracteres no válidos
        const value = BigInt(`0x${filteredString}`); // Convierte a BigInt
        return new HexadecimalType(value); // Crea una nueva instancia
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

    // toRawString() {
    //     const hexString = this.m_Value.toString(16).toUpperCase(); // Convierte BigInt a hexadecimal
    //     const paddedHex = hexString.length % 2 === 0 ? hexString : `0${hexString}`; // Asegura longitud par
    //     return paddedHex.match(/.{1,2}/g).join(' '); // Divide en pares y los une con espacios
    // }

    toRawString() {
        const bitLength = 32; // Longitud en bits (por ejemplo, 32 bits para un entero con signo)
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