/* 
* @param {boolean array} LCD characters array
* @returns {String} Returns the code in string. 
*/

import defaultCharsA03 from '../data/charsA03.json';
import defaultCharsA04 from '../data/charsA04.json';

function isCharValid(charitem) {
    if(!Array.isArray(charitem)) return 0;//check if char
    if(!charitem.flat().some(item => item !== 0)) return 0;//check if blank char
    if(defaultCharsA03[charitem.flat().join('')]!= undefined) return 0
    if(defaultCharsA04[charitem.flat().join('')]!= undefined) return 0
    return 1
}


function getCodeString(characters){
    var linetext='';
    var Charsvalids={};
    var Charcount=0;
    for(let LCDcolum=0; LCDcolum<characters.length;LCDcolum++){
        for(let LCDrow=0; LCDrow<characters[LCDcolum].length;LCDrow++){
            if(!isCharValid(characters[LCDcolum][LCDrow])) continue
            Charsvalids[characters[LCDcolum][LCDrow].toString()]=characters[LCDcolum][LCDrow];
            //console.log(Charsvalids);
        }
    }

    for (let i in Charsvalids){
        //console.log(Charsvalids[i])
        linetext=linetext.concat('byte customChar',Charcount,'[] = {\n')
        Charcount++;
        Charsvalids[i].forEach(line=>{
        linetext=linetext.concat('B',line.join(''));
        linetext=linetext.concat(',\n');
        })
        linetext=linetext.concat('},\n');   
    }
    return [linetext,Object.keys(Charsvalids).length];
}

export default getCodeString
