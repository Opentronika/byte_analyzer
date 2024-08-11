function toNByteInteger(num, nBytes, signed = true) {
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


export {toNByteInteger}