/**
 * Converts number to character 1 = a z = 26 or to roman
 * @param {number} num Number to be converted
 * @return {string} Character corresponding to number
 */

function int2lower(num){
  if ( (num < 1) || (num > 27) ) { num = 45 - 96; }
  return String.fromCharCode(96+num); 
}
function int2upper(num){
  if ( (num < 1) || (num > 27) ) { num = 45 - 64; }
  return String.fromCharCode(64+num); 
}

function int2roman(num) {
  var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
      roman = '',
      i;
  for ( i in lookup ) {
    while ( num >= lookup[i] ) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

function int2romanlower(num) {
  return int2roman(num).toLowerCase();
}

/**
 * getNumber - get a number based
 */

function getNumber(num,style){
  switch(style){
    case 2:  
      return int2lower(num);
      break;
    case 3:  
      return int2upper(num);
      break;
    case 4:
      return int2romanlower(num);
      break;
    case 5:
      return int2roman(num);
      break;
    case 9:
      return '';
      break;
    default:
      return num+'';
      break;
  }
}

function getDelimiter(type){
  var delimiters = [' ','.','-',':',')',' ',''];
  return delimiters[type];
}

/**
 * getNumbers - get the final txt
 */
function getNumbers(level,numbers,h1,h2,h3,h4,h5,h6,inherit,delimiter,trailing) {
  
  var txt = '';
  var hStyles = [0,h1,h2,h3,h4,h5,h6];
  var del = getDelimiter(delimiter);
  
  if(!inherit) { // Inherit
    if (trailing) {
      txt = getNumber(numbers[level],hStyles[level])+del;
    } else {
      txt = getNumber(numbers[level],hStyles[level]);
    }
  } else { // Inherit
    for (var l = 1; l<level; l++) {
      txt += getNumber(numbers[l],hStyles[l])+del;
    }
    
    if (trailing) {
      txt += getNumber(numbers[level],hStyles[level])+del;
    } else {
      txt += getNumber(numbers[level],hStyles[level]);
    }
  }
  
  return txt;
}
