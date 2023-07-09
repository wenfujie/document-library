- [Array](#array)
  - [查找](#查找)
    - [返回随机元素 —— sample(collection)](#返回随机元素--samplecollection)
    - [查找并返回索引 —— findIndex(array, \[predicate=\_.identity\], \[fromIndex=0\])](#查找并返回索引--findindexarray-predicate_identity-fromindex0)
  - [修改](#修改)
    - [填充指定位置为指定值 —— fill(array, value, \[start=0\], \[end=array.length\])](#填充指定位置为指定值--fillarray-value-start0-endarraylength)
    - [删除指定的多个元素 —— remove(array, \[predicate=\_.identity\])](#删除指定的多个元素--removearray-predicate_identity)
  - [过滤](#过滤)
    - [过滤数组 —— filter(collection, \[predicate=\_.identity\])](#过滤数组--filtercollection-predicate_identity)
    - [获取到符合条件、不符合条件的元素 —— partition(collection, \[predicate=\_.identity\])](#获取到符合条件不符合条件的元素--partitioncollection-predicate_identity)
    - [获取指定值以外的元素 —— without(array, \[values\])](#获取指定值以外的元素--withoutarray-values)
    - [去重 —— uniqBy(array, \[iteratee=\_.identity\])](#去重--uniqbyarray-iteratee_identity)
    - [返回多个数组的交集 —— intersection(\[arrays\])](#返回多个数组的交集--intersectionarrays)
  - [排序](#排序)
    - [排序 —— orderBy(collection, \[iteratees=\[\_.identity\]\], \[orders\])](#排序--orderbycollection-iteratees_identity-orders)
    - [乱序 —— shuffle(collection)](#乱序--shufflecollection)
  - [转换](#转换)
    - [按指定长度拆分数组 —— chunk(array, \[size=1\])](#按指定长度拆分数组--chunkarray-size1)
    - [将键值对二维数组转为对象 —— fromPairs(pairs)](#将键值对二维数组转为对象--frompairspairs)

[lodash 官网](https://www.lodashjs.com/)

本文意旨用通俗的语言概括 `lodash api` 的含义，让刚接触 `lodash` 的开发者快速找到适用的函数。

# Array

## 查找

### 返回随机元素 —— sample(collection)

单个随机数

```js
_.sample([1, 2, 3, 4]);
// => 2
```

多个随机数 `sampleSize(collection, [n=1])`

```js
_.sampleSize([1, 2, 3], 2);
// => [3, 1]

_.sampleSize([1, 2, 3], 4);
// => [2, 3, 1]
```



### 查找并返回索引 —— findIndex(array, [predicate=_.identity], [fromIndex=0])

从前往后查 findIndex

```js
var users = [
  { user: "barney", active: false },
  { user: "fred", active: false },
  { user: "pebbles", active: true },
];

// 对象指定key值查找
// The `_.matchesProperty` iteratee shorthand.
_.findIndex(users, ["user", "fred"]);
// => 1

// 对象深匹配查找
// The `_.matches` iteratee shorthand.
_.findIndex(users, { user: "fred", active: false });
// => 1

// 指定key查找
// The `_.property` iteratee shorthand.
_.findIndex(users, "active");
// => 2

// 函数查找
_.findIndex(users, function (o) {
  return o.user == "barney";
});
// => 0
```

从尾部往前查 findLastIndex(array, [predicate=_.identity], [fromIndex=array.length-1])

## 修改

### 填充指定位置为指定值 —— fill(array, value, [start=0], [end=array.length])

```js
var array = [1, 2, 3];

_.fill(array, "a");
console.log(array);
// => ['a', 'a', 'a']

_.fill(Array(3), 2);
// => [2, 2, 2]

_.fill([4, 6, 8, 10], "*", 1, 3);
// => [4, '*', '*', 10]
```

### 删除指定的多个元素 —— remove(array, [predicate=_.identity])

**最灵活**

`remove(array, [predicate=_.identity])` 删除迭代函数返回 true 的项，函数返回被删元素数组

```js
var array = [1, 2, 3, 4];
var evens = _.remove(array, function (n) {
  return n % 2 == 0;
});

console.log(array);
// => [1, 3]

console.log(evens);
// => [2, 4]
```

**简单类型**

`pull(array, [values])` 指定多个入参方式

```js
var array = [1, 2, 3, 1, 2, 3];

_.pull(array, 2, 3);
console.log(array);
// => [1, 1]
```

`pullAll(array, values)` 指定数组方式

```js
var array = [1, 2, 3, 1, 2, 3];

_.pullAll(array, [2, 3]);
console.log(array);
// => [1, 1]
```

**复杂类型**

`pullAllBy(array, values, [iteratee=_.identity])` 根据指定条件删除项

```js
var array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];

_.pullAllBy(array, [{ x: 1 }, { x: 3 }], "x");
console.log(array);
// => [{ 'x': 2 }]
```

`pullAllWith(array, values, [comparator])` 根据对象值删除对象

```js
var array = [
  { x: 1, y: 2 },
  { x: 3, y: 4 },
  { x: 5, y: 6 },
];

_.pullAllWith(array, [{ x: 3, y: 4 }], _.isEqual);
console.log(array);
// => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
```

**根据索引删除**

`_.pullAt(array, [indexes])` 根据索引删除，并返回被删除元素组成的数组

```js
var array = [5, 10, 15, 20];
var evens = _.pullAt(array, 1, 3);

console.log(array);
// => [5, 15]

console.log(evens);
// => [10, 20]
```


## 过滤

### 过滤数组 —— filter(collection, [predicate=_.identity])

**过滤返回匹配的元素**

优势：lodash 的 filter 比原生 filter 支持更多简写

```js
var users = [
  { user: "barney", age: 36, active: true },
  { user: "fred", age: 40, active: false },
];

_.filter(users, function (o) {
  return !o.active;
});
// => objects for ['fred']

// The `_.matches` iteratee shorthand.
_.filter(users, { age: 36, active: true });
// => objects for ['barney']

// The `_.matchesProperty` iteratee shorthand.
_.filter(users, ["active", false]);
// => objects for ['fred']

// The `_.property` iteratee shorthand.
_.filter(users, "active");
// => objects for ['barney']
```

**过滤返回未匹配的元素**

`difference(array, [values])`

简单类型

```js
_.difference([3, 2, 1], [4, 2]);
// => [3, 1]
```

复杂类型

`differenceBy(array, [values], [iteratee=_.identity])`

```js
_.differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor);
// => [3.1, 1.3]

// The `_.property` iteratee shorthand.
_.differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], "x");
// => [{ 'x': 2 }]
```

### 获取到符合条件、不符合条件的元素 —— partition(collection, [predicate=_.identity])

```js
var users = [
  { user: "barney", age: 36, active: false },
  { user: "fred", age: 40, active: true },
  { user: "pebbles", age: 1, active: false },
];

_.partition(users, function (o) {
  return o.active;
});
// => objects for [['fred'], ['barney', 'pebbles']]

// The `_.matches` iteratee shorthand.
_.partition(users, { age: 1, active: false });
// => objects for [['pebbles'], ['barney', 'fred']]

// The `_.matchesProperty` iteratee shorthand.
_.partition(users, ["active", false]);
// => objects for [['barney', 'pebbles'], ['fred']]

// The `_.property` iteratee shorthand.
_.partition(users, "active");
// => objects for [['fred'], ['barney', 'pebbles']]
```

### 获取指定值以外的元素 —— without(array, [values])

不会修改原数组

```js
_.without([2, 1, 2, 3], 1, 2);
// => [3]

var array = [
  { c: 6, x: 2 },
  { c: 6, x: 3 },
];

without(array, array[0]);
// => [{ c: 6, x: 3 }]
```


### 去重 —— uniqBy(array, [iteratee=_.identity])

指定对象中的 key 去重

```js
_.uniqBy(
  [
    { x: 1, y: 2 },
    { x: 1, y: 4 },
  ],
  "x"
);
// => [{ x: 1, y: 2 }]
```

`uniqWith(array, [comparator])` 深度比较对象去重

```js
var objects = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  { x: 1, y: 2 },
];

_.uniqWith(objects, _.isEqual);
// => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
```

### 返回多个数组的交集 —— intersection([arrays])

简单类型 intersection([arrays])

```js
_.intersection([2, 1], [4, 2], [1, 2]);
// => [2]
```

复杂类型 intersectionBy([arrays], [iteratee=_.identity])

```js
_.intersectionBy([2.1, 1.2], [4.3, 2.4], Math.floor);
// => [2.1]

// The `_.property` iteratee shorthand.
_.intersectionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], "x");
// => [{ 'x': 1 }]
```


## 排序

### 排序 —— orderBy(collection, [iteratees=[_.identity]], [orders])

```js
var users = [
  { user: "fred", age: 48 },
  { user: "barney", age: 34 },
  { user: "fred", age: 40 },
  { user: "barney", age: 36 },
];

// 以 `user` 升序排序 再  `age` 以降序排序。
_.orderBy(users, ["user", "age"], ["asc", "desc"]);
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
```

### 乱序 —— shuffle(collection)

```js
_.shuffle([1, 2, 3, 4]);
// => [4, 1, 3, 2]
```

## 转换

### 按指定长度拆分数组 —— chunk(array, [size=1])




### 将键值对二维数组转为对象 —— fromPairs(pairs)

```js
_.fromPairs([
  ["fred", 30],
  ["barney", 40],
]);
// => { 'fred': 30, 'barney': 40 }
```



