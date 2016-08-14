/**
 * This file contains the solution to exercise 3 from chap 4 of Eloquent JavaScript
 * 
 * Write a function arrayToList that builds up a linked-list when given [1, 2, 3] as argument, 
 * and write a listToArray function that produces an array from a linked-list.
 * 
 */

// ARRAY TO LIST
function arrayToList(array) {
	var list = {};
	for (var i = 0, node = list; ; i++, node = node.rest) {
		node.value = array[i];
		if (i == array.length-1) { // on last element
			node.rest = null;
			break;
		} else {
			node.rest = {};
		}
	}

	return list;
}

console.log(arrayToList([10, 20]));
//→ {value: 10, rest: {value: 20, rest: null}}


// LIST TO ARRAY
function listToArray(list) {
  var array = [];
  for (var node = list; node != null; node = node.rest) {
    array.push(node.value);
  }

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


// GET THE NTH ELEMENT OF THE LIST
function nth(list, pos) {
  var elem = undefined;
  for (var i = 0, node = list; node != null ; i++, node = node.rest) {
    if (i == pos) {
      elem = node.value;
      break;
    }
  }

  return elem;
}

console.log(nth(arrayToList([10, 20, 30]), 1));
//→ 20

