/**
 * This file contains the solution to exercise 3 from chap 4 of Eloquent JavaScript
 * 
 * Write a function arrayToList that builds up a linked-list when given [1, 2, 3] as argument, 
 * and write a listToArray function that produces an array from a linked-list.
 * 
 */

// ARRAY TO LIST
//function arrayToList(array) {
//	var list = {};
//	for (var i = 0, node = list; ; i++, node = node.rest) {
//		node.value = array[i];
//		if (i == array.length-1) { // on last element
//			node.rest = null;
//			break;
//		} else {
//			node.rest = {};
//		}
//	}
//
//	return list;
//}

//recursive
function arrayToList(array) {
var list = {};
// you can recursively process sub-arrays that get smaller with every pass
function convert(array, list) {
  if (array.length > 0) {
    list.value = array[0];
    if (array.length > 1) {
      list.rest = {};
      convert(array.slice(1), list.rest); // recursion
    } else {
      list.rest = null;
    }
  }
}
convert(array, list);

return list;
}

console.log(arrayToList([10, 20]));
//→ {value: 10, rest: {value: 20, rest: null}}


// LIST TO ARRAY
//function listToArray(list) {
//  var array = [];
//  for (var node = list; node != null; node = node.rest) {
//    array.push(node.value);
//  }
//
//  return array;
//}

//recursive
function listToArray(list) {
  var array = [];
  // you can recursively process the tail of sub-lists that get smaller with every pass
  function convert(list) {
    if (list != null) {
      array.push(list.value);
      convert(list.rest); // recursion
    }
  }
  convert(list);
  
  return array;
}

console.log(listToArray(arrayToList([10, 20, 30])));
//→ [10, 20, 30]


// ADD ELEMENT AT THE FRONT OF THE LIST
function prepend(elem, list) {
  return {value: elem, rest: list};
}

console.log(prepend(10, prepend(20, null)));
//→ {value: 10, rest: {value: 20, rest: null}}


// ADD ELEMENT AT THE END OF THE LIST
function append(elem, list) {
  if (list == null) {
    list = {value:elem, rest:null};
  } else {
    for (var node = list; node != null; node = node.rest) {
      if (node.rest == null) {
        node.rest = {value:elem, rest:null};
        break; // without the break, we'll be in an infinite loop
      }
    }
  }
  
  return list;
}

console.log(append(2, append(1, null)));
//→ {value: 1, rest: {value: 2, rest: null}}


// GET THE NTH ELEMENT OF THE LIST
//function nth(list, pos) {
//  var elem = undefined;
//  for (var i = 0, node = list; node != null ; i++, node = node.rest) {
//    if (i == pos) {
//      elem = node.value;
//      break;
//    }
//  }
//
//  return elem;
//}

//recursive
function nth(list, pos) {
if (list == null) 
  return undefined;
else if (pos == 0)
  return list.value;
else 
  return nth(list.rest, pos-1);
}

console.log(nth(arrayToList([10, 20, 30]), 1));
//→ 20

