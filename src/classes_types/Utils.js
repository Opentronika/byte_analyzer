function toNByteInteger(num, nBytes, signed = false) {
    // Convertir el número a BigInt
    let bigIntNum = BigInt(num);

    // Calcular el número máximo de bits para los n bytes (8 bits por byte)
    const bits = BigInt(nBytes) * 8n;

    if (signed) {
        // Para números con signo, normaliza el número al rango permitido
        const max = (1n << (bits - 1n)) - 1n;
        const min = -(1n << (bits - 1n));

        // Aplicar la máscara para cortar la parte más significativa y mantener el signo
        if (bigIntNum > max) bigIntNum = max;
        if (bigIntNum < min) bigIntNum = min;
    } else {
        // Para números sin signo, simplemente aplica la máscara
        const mask = (1n << bits) - 1n;
        bigIntNum = bigIntNum & mask;
    }

    return bigIntNum;
}

function hexStringToNumber(hexString, byteLength, signed = true, littleEndian = true) {
    // Eliminar espacios en blanco
    let cleanedHexString = hexString.replace(/\s+/g, '');

    // Calcular cuántos dígitos hexadecimales deberían haber para el número de bytes especificado
    const requiredLength = byteLength * 2;

    // Completar con ceros a la izquierda si el string es más corto de lo necesario
    cleanedHexString = cleanedHexString.padStart(requiredLength, '0');

    // Convertir la cadena hexadecimal en un array de bytes
    const byteArray = [];
    for (let i = 0; i < cleanedHexString.length; i += 2) {
        byteArray.push(parseInt(cleanedHexString.substr(i, 2), 16));
    }

    // Si es little endian y el sistema debe interpretarse como big endian, invertir el array
    if (littleEndian) {
        byteArray.reverse();
    }

    // Convertir el array de bytes en un número BigInt
    let number = BigInt(0);
    for (let i = 0; i < byteLength; i++) {
        number = (number << BigInt(8)) | BigInt(byteArray[i] || 0);
    }

    // Si es con signo y el número es negativo
    if (signed && (byteArray[byteLength - 1] & 0x80)) {
        // Crear una máscara para el número negativo
        const mask = BigInt(1) << BigInt(byteLength * 8);
        number = number - mask;
    }

    return number;
}


export {toNByteInteger, hexStringToNumber}