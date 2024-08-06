const TypeSoported = {
    HEXADECIMAL: "HEXADECIMAL"
};


function getFormatFromValue(value, typeval) {
    switch (typeval) {
        case TypeSoported.HEXADECIMAL:
            return `0x${value.toString(16).padStart(2, '0').toUpperCase()}`;
            break;

        default:
            break;
    }
}
function getValueFromFormat(value) {

}
export { getFormatFromValue, getValueFromFormat, TypeSoported }