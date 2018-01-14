'use strict';

function numString (num){
  const all_num_strings = [['','one', 'two', 'three', 'four','five', 'six','seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen' ], ['', '' ,'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'], ['hundred'], ['thousand'],['million'], ['billion']];

  //set max limit based on all_num_strings array
  if (`${num}`.length > (all_num_strings.length - 2) * 3 ) return `Please enter a number less then 999 ${all_num_strings[all_num_strings.length -1][0]}`;

  //immediately return zero for 0
  if (!num) return 'zero';

  //coerce the number into a string, split it into an array of characters, then reverse it
  //use .reduce() to rebuild the string adding a comma after every fourth character, starting from the end
  //split the return of .reduce() on the comma into an array
  //123456789 => ['9', '8', '7', '6', '5', '4', '3', '2', '1'] => 123,456,789 => ['123', '456', '789']
  let num_parse_threes = Array.from(`${num}`).reverse().reduce((acc, cur, i) => (i  % 3) ?  `${cur}${acc}` : `${cur},${acc}` ).split(",")

  //loop through each number group in the num_parse_threes array
  let number_name = num_parse_threes.map((num_group_str, i) => { 

    //split the number group into an array of place values
    let [onesPlace, tensPlace, hundredsPlace] = num_group_str.split('').reverse();

    //when there is more than one number group,  a place value is needed i.e. thousands, millions, billions
    let groupPlaceValue = (num_parse_threes.length -1 - i) ? all_num_strings[num_parse_threes.length + 1 - i ][0] : '';

    //if hundredsValue is not undefined, set is value i.e 1 => one + hundred
    let hundredsValue = (hundredsPlace) ? `${all_num_strings[0][parseInt(hundredsPlace)]} ${all_num_strings[2][0]}` : '';

    //coerce an instance of undefined to and empty string
    tensPlace = tensPlace || '';

    // if tensValue is greater than 2,  meaning the last two digits is greater than 19, then set tensValue to corresponding name
    //i.e 30 => thirty or set its value to '' for the onesPlace to handle i.e. 17 => ''
    let tensValue =  parseInt(tensPlace) > 1 ?  all_num_strings[1][parseInt(tensPlace)] : '';

    // if  tensValue is empty, meaning the last two digits are less than 20, set the onesValue to the corresponding value for tensPlace + onesPlace in all_num_strings[0]
    //else if tensValue has value, meaning greater than 19, set just set the ones place
    // '1' + '7' => seventeen, 1 => one
    let onesValue = !tensValue ? all_num_strings[0][parseInt(tensPlace + onesPlace)] : all_num_strings[0][parseInt(onesPlace)];

    //create ann array of the values, using filter, remove any empty values before joining with a space
    return [hundredsValue, tensValue, onesValue, groupPlaceValue].filter(val => val).join(' ');
  });

  //return the array created with map, joined with a space
  return number_name.join(' ');
}
