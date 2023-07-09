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
- [函数](#函数)
    - [防抖 —— debounce(func, \[wait=0\], \[options=\])](#防抖--debouncefunc-wait0-options)
    - [节流 throttle(func, \[wait=0\], \[options=\])](#节流-throttlefunc-wait0-options)
    - [限制调用次数 —— before(n, func)](#限制调用次数--beforen-func)
    - [函数柯里化 —— curry(func, \[arity=func.length\])](#函数柯里化--curryfunc-arityfunclength)
    - [限制只能调用一次 —— once(func)](#限制只能调用一次--oncefunc)
- [语言类方法](#语言类方法)
    - [深拷贝 —— cloneDeep(value)](#深拷贝--clonedeepvalue)
    - [深度比较值 —— isEqual(value, other)](#深度比较值--isequalvalue-other)
    - [判断是函数 —— isFunction(value)](#判断是函数--isfunctionvalue)
- [数学](#数学)
    - [根据精度向下、向上舍入 —— floor(number, \[precision=0\])](#根据精度向下向上舍入--floornumber-precision0)
    - [根据精度四舍五入 —— round(number, \[precision=0\])](#根据精度四舍五入--roundnumber-precision0)
    - [查找对象数组指定 key 值最大的项 —— maxBy(array, \[iteratee=\_.identity\])](#查找对象数组指定-key-值最大的项--maxbyarray-iteratee_identity)
    - [计算对象数组指定 key 值的和 —— sumBy(array, \[iteratee=\_.identity\])](#计算对象数组指定-key-值的和--sumbyarray-iteratee_identity)
    - [返回指定范围随机数 —— random(\[lower=0\], \[upper=1\], \[floating\])](#返回指定范围随机数--randomlower0-upper1-floating)
- [字符串](#字符串)
    - [转驼峰写法 —— camelCase(\[string=''\])](#转驼峰写法--camelcasestring)
    - [用正则拆分字符串 —— words(\[string=''\], \[pattern\])](#用正则拆分字符串--wordsstring-pattern)
    - [截断字符串，类似溢出隐藏 —— truncate(\[string=''\], \[options=\])](#截断字符串类似溢出隐藏--truncatestring-options)

> Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。

由于 Lodash 官网 api 描述文字艰深晦涩，本文意旨用通俗的语言概括 `lodash api` 的含义，让刚接触 `lodash` 的开发者快速找到适用的函数（只要看目录就知道如何使用了😎）。

该篇所罗列 api 是经过笔者筛选平日使用频率较高，并剔除 ES6 已实现的函数。

[Lodash 官网](https://www.lodashjs.com/)

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

# 函数

### 防抖 —— debounce(func, [wait=0], [options=])

延迟 `wait` 毫秒后调用 `func` 方法，若延迟期间函数被调用则按 `wait` 重置延迟时间。

1. `func` _(Function)_: 要防抖动的函数。
2. `[wait=0]` _(number)_: 需要延迟的毫秒数。
3. `[options=]` _(Object)_: 选项对象。
4. `[options.leading=false]` _(boolean)_: 指定在延迟开始前调用。
5. `[options.maxWait]` _(number)_: 设置 `func` 允许被延迟的最大值。
6. `[options.trailing=true]` _(boolean)_: 指定在延迟结束后调用。

```js
// 避免窗口在变动时出现昂贵的计算开销。
jQuery(window).on("resize", _.debounce(calculateLayout, 150));

// 当点击时 `sendMail` 随后就被调用。
jQuery(element).on(
  "click",
  _.debounce(sendMail, 300, {
    leading: true,
    trailing: false,
  })
);

// 确保 `batchLog` 调用1次之后，1秒内会被触发。
var debounced = _.debounce(batchLog, 250, { maxWait: 1000 });
var source = new EventSource("/stream");
jQuery(source).on("message", debounced);

// 取消一个 trailing 的防抖动调用
jQuery(window).on("popstate", debounced.cancel);
```

### 节流 throttle(func, [wait=0], [options=])

在 wait 秒内最多执行 `func` 一次的函数。

1. `func` _(Function)_: 要节流的函数。
2. `[wait=0]` _(number)_: 需要节流的毫秒。
3. `[options=]` _(Object)_: 选项对象。
4. `[options.leading=true]` _(boolean)_: 指定调用在节流开始前。
5. `[options.trailing=true]` _(boolean)_: 指定调用在节流结束后。

```js
// 避免在滚动时过分的更新定位
jQuery(window).on("scroll", _.throttle(updatePosition, 100));

// 点击后就调用 `renewToken`，但5分钟内超过1次。
var throttled = _.throttle(renewToken, 300000, { trailing: false });
jQuery(element).on("click", throttled);

// 取消一个 trailing 的节流调用。
jQuery(window).on("popstate", throttled.cancel);
```

### 限制调用次数 —— before(n, func)

创建一个调用`func`的函数，限制调用次数 < n 次。 之后再调用这个函数，将返回一次最后调用`func`的结果。

```js
const fn = before(2, (val) => {
  console.log("called");
  return val;
});
console.log(fn(1));
console.log(fn(2));

// => called, 1, 1
```

### 函数柯里化 —— curry(func, [arity=func.length])

```js
var abc = function (a, b, c) {
  return [a, b, c];
};

var curried = _.curry(abc);

curried(1)(2)(3);
// => [1, 2, 3]

curried(1, 2)(3);
// => [1, 2, 3]

curried(1, 2, 3);
// => [1, 2, 3]

// Curried with placeholders.
curried(1)(_, 3)(2);
// => [1, 2, 3]
```

### 限制只能调用一次 —— once(func)

# 语言类方法

### 深拷贝 —— cloneDeep(value)

### 深度比较值 —— isEqual(value, other)

```js
var object = { a: 1 };
var other = { a: 1 };

_.isEqual(object, other);
// => true

object === other;
// => false
```

### 判断是函数 —— isFunction(value)

# 数学

### 根据精度向下、向上舍入 —— floor(number, [precision=0])

向下舍入 `floor(number, [precision=0])`

```js
_.floor(4.006);
// => 4

_.floor(0.046, 2);
// => 0.04

_.floor(4060, -2);
// => 4000
```

向上舍入 `ceil(number, [precision=0])`

### 根据精度四舍五入 —— round(number, [precision=0])

### 查找对象数组指定 key 值最大的项 —— maxBy(array, [iteratee=_.identity])

```js
var objects = [{ n: 1 }, { n: 2 }];

_.maxBy(objects, function (o) {
  return o.n;
});
// => { 'n': 2 }

// The `_.property` iteratee shorthand.
_.maxBy(objects, "n");
// => { 'n': 2 }
```

### 计算对象数组指定 key 值的和 —— sumBy(array, [iteratee=_.identity])

```js
var objects = [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }];

_.sumBy(objects, function (o) {
  return o.n;
});
// => 20

// The `_.property` iteratee shorthand.
_.sumBy(objects, "n");
// => 20
```

### 返回指定范围随机数 —— random([lower=0], [upper=1], [floating])

```js
_.random(0, 5);
// => an integer between 0 and 5

_.random(5);
// => also an integer between 0 and 5

_.random(5, true);
// => a floating-point number between 0 and 5

_.random(1.2, 5.2);
// => a floating-point number between 1.2 and 5.2
```

# 字符串

### 转驼峰写法 —— camelCase([string=''])

```js
_.camelCase("Foo Bar");
// => 'fooBar'

_.camelCase("--foo-bar--");
// => 'fooBar'

_.camelCase("__FOO_BAR__");
// => 'fooBar'
```

### 用正则拆分字符串 —— words([string=''], [pattern])

```js
_.words("fred, barney, & pebbles");
// => ['fred', 'barney', 'pebbles']

_.words("fred, barney, & pebbles", /[^, ]+/g);
// => ['fred', 'barney', '&', 'pebbles']
```

### 截断字符串，类似溢出隐藏 —— truncate([string=''], [options=])

1. `[string='']` _(string)_: 要截断的字符串。
2. `[options=]` _(Object)_: 选项对象。
3. `[options.length=30]` _(number)_: 允许的最大长度。
4. `[options.omission='...']` _(string)_: 超出后的代替字符。
5. `[options.separator]` _(RegExp|string)_: 截断点。

```js
_.truncate("hi-diddly-ho there, neighborino");
// => 'hi-diddly-ho there, neighbo...'

_.truncate("hi-diddly-ho there, neighborino", {
  length: 24,
  separator: " ",
});
// => 'hi-diddly-ho there,...'

_.truncate("hi-diddly-ho there, neighborino", {
  length: 24,
  separator: /,? +/,
});
// => 'hi-diddly-ho there...'

_.truncate("hi-diddly-ho there, neighborino", {
  omission: " [...]",
});
// => 'hi-diddly-ho there, neig [...]'
```
