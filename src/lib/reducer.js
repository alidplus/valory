export default function reduce(array, iterator, initial) {
  // set initial value of accomulator
  let accomolator = initial || null
  // check arguments validity
  if (!Array.isArray(array)) throw new Error('array is not Array')
  if (typeof iterator !== 'function') throw new Error('iterator is not a Function')
  // handle reduce loginc
  array.forEach((item, i) => {
    accomolator = iterator(accomolator, item, i, array)
  });
  return accomolator
}

reduce([1, 2, 3, 4], (a, b) => a + b, 0)
