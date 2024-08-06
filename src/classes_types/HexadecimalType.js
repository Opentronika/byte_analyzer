export default class HexadecimalType{

    m_Value;
    m_StringValue;
    static cNAME = "Hexadecimal"

    constructor(value){
        this.m_Value=value;
        this.m_StringValue=this.toString();
    }

    static filter(strval)
    {
        return strval.replace(/[^0-9a-fA-F]/g, '');
    }

    toString(){
        return `${this.m_Value.toString(16).padStart(1, '0').toUpperCase()}`;
    }

    toInt(){
        return parseInt(this.m_StringValue, 16);
    }

}