// 递归数组扁平化
function flat(arr) {
  return arr.reduce((list,item)=>{
    return list.concat(Array.isArray(item)?flat(item):item)
  },[])
}

// console.log(flat([1,2,['a',['d',['e']]]]))

// 对象深拷贝
function deepCopy(obj) {
  let result = obj instanceof Array ? [] : {}
  for (let key in obj) {
    const item = obj[key];
    if(item && typeof item === 'object') {
      result[key] = deepCopy(item)
    } else {
      result[key] = item
    }
  }
  return result
}

// console.log(deepCopy({
//   a:{b:1},
//   c:[],
//   d:null,
//   e:undefined,
//   f: ()=>{}
// }));

/**
 * 继承相关
 */
// 1.组合寄生式
function Parent(name) {
  
}
function Child() {
  Parent.call(this)
}
Child.prototype = new Parent()

/**
 * new 做了什么
 * 1.创建一个对象
 * 2.该对象__proto__属性 = 构造函数的prototype属性
 * 3.使用该对象调用构造函数
 * 4.判断第3步返回结果是否为object，是则直接返回该结果，否则返回创建的对象
 */

/**
 * 溢出隐藏
 * 1.overflow:hidden;
 * 2.text-overflow:elip
 */