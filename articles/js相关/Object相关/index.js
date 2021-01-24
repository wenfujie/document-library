/**
 * 对象深拷贝
 */

function deepClone(obj) {
  let objClone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      if (obj[key] && typeof obj[key] === 'object') {
        objClone[key] = deepClone(obj[key])
      } else {
        objClone[key] = obj[key]
      }
    }
  }
  return objClone
}

var a = {
  bbb: 132,
  ccc: [1, 2, 3],
  ddd: { dddd: '123' },
  eee: () => {},
  fff: null,
  ggg: undefined,
  hhh: new Date(),
  iii: false
}
console.log(deepClone(a))
