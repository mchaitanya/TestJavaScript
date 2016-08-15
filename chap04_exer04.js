/**
 * This file contains the solution to exercise 3 from chap 4 of Eloquent JavaScript
 * 
 * Write a function arrayToList that builds up a linked-list when given [1, 2, 3] as argument, 
 * and write a listToArray function that produces an array from a linked-list.
 * 
 */

// WHAT'S THE SPEC?
// it's much better to let [] -> {} rather than [] -> null; 
// otherwise must listToArray(null) must give back []; then what about listToArray({})??
//   any null input must raise something like a NullPointerException or result in null output

// this reads better - the check for the end of the list becomes ("value" in list)
// also takes advantage of JS features like adding fields to objects, checking if fields exist etc.
// in Java, you can't have an empty object of a certain type
//   nulls are required to signify the object's "emptiness"

// ARRAY TO LIST
function arrayToList(array) {
  var list = {};
  for (var i = 0, node = list; i < array.length; i++, node = node.rest) {
    node.value = array[i];
    node.rest = {};
  }

  return list;
}

//recursive
function arrayToList2(array) {
//you can recursively process sub-arrays that get smaller with every pass
  function convert(array, list) {
    if (array.length > 0) {
      list.value = array[0];
      list.rest = {};
      convert(array.slice(1), list.rest); // recursion
    }
  }

  var list = {};
  convert(array, list);

  return list;
}

// another recursive implementation - more concise, no sub-function
function arrayToList3(array) {
  if (array.length == 0) {
    return {};
  } else {
    return {value : array[0], rest : arrayToList2(array.slice(1))};
  }
}

// start from the end of the array
function arrayToList4(array) {
  var list = {};
  for (var i = array.length-1; i >= 0; i--) {
    list = {value:array[i], rest:list}; // this is like a = a+2
  }
  
  return list;
}

//console.log(arrayToList([10, 20, 30]));
//→ {value: 10, rest: {value: 20, rest: {}}}


// LIST TO ARRAY
function listToArray(list) {
  var array = [];
  for (var node = list; "value" in node; node = node.rest) {
    array.push(node.value);
  }

  return array;
}

//recursive
function listToArray2(list) {
  var array = [];
  // you can recursively process the tail of sub-lists that get smaller with every pass
  function convert(list) {
    // if list is null, then we'll get the Exception: ReferenceError: value is not defined
    // that's all right, the function has the right to assume list is non-null
    if ("value" in list) {
      array.push(list.value);
      convert(list.rest); // recursion
    }
  }
  convert(list);
  
  return array;
}

//console.log(listToArray2(arrayToList([10, 20, 30])));
//→ [10, 20, 30]


// ADD ELEMENT AT THE FRONT OF THE LIST
function prepend(elem, list) {
  return {value: elem, rest: list};
}

//console.log(prepend(10, prepend(20, null)));
//→ {value: 10, rest: {value: 20, rest: null}}


// ADD ELEMENT AT THE END OF THE LIST
function append(elem, list) {
  for (var node = list; ; node = node.rest) {
    if (!("value" in node)) {
      node.value = elem;
      node.rest = {};
      break; // without the break, we'll be in an infinite loop
    }
  }
  
  return list;
}

//console.log(append(2, append(1, {})));
//→ {value: 1, rest: {value: 2, rest: {}}}


// GET THE NTH ELEMENT OF THE LIST
function nth(list, pos) {
  for (var i = 0, node = list; "value" in node ; i++, node = node.rest) {
    if (i == pos) {
      return node.value;
    }
  }

  return undefined;
}

//recursive
function nth2(list, pos) {
if (!("value" in list)) 
  return undefined;
else if (pos == 0)
  return list.value;
else 
  return nth2(list.rest, pos-1);
}

console.log(nth2(arrayToList([10, 20, 30]), 1));
//→ 20

