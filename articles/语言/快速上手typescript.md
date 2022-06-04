- [学习 typescript](#学习-typescript)
  - [指令](#指令)
  - [语法](#语法)
    - [基础语法](#基础语法)
    - [函数类型](#函数类型)
    - [类型推断、字面量类型](#类型推断字面量类型)
    - [类型断言](#类型断言)
    - [interface 接口类型](#interface-接口类型)
    - [type 类型别名](#type-类型别名)
    - [keyof 类型索引](#keyof-类型索引)
    - [| & 高级类型：联合、交叉、合并接口类型](#--高级类型联合交叉合并接口类型)
    - [枚举类型](#枚举类型)
    - [泛型](#泛型)
      - [语法](#语法-1)
      - [多种类型泛型的使用](#多种类型泛型的使用)
      - [泛型工具](#泛型工具)
      - [泛型约束](#泛型约束)
      - [默认类型](#默认类型)
  - [Vue 项目中使用 ts](#vue-项目中使用-ts)
    - [配置 Vue.prototype.xxx 属性](#配置-vueprototypexxx-属性)
    - [使用 ts 后 vue2 组件的写法](#使用-ts-后-vue2-组件的写法)
  - [declare](#declare)
    - [语法： declare (var|let|const) 变量名称: 变量类型](#语法-declare-varletconst-变量名称-变量类型)
    - [declare namespace](#declare-namespace)

# 学习 typescript

学习资料

[TypeScript 入门实战笔记](https://kaiwu.lagou.com/course/courseInfo.htm?courseId=885#/content)

[TypeScript 速成教程](https://github.com/joye61/typescript-tutorial)

## 指令

```bash

# 安装
npm i -g typescript@3.9

# 初始化配置文件 tsconfig.json
tsc --init

# 将 ts 文件解析为 js
tsc core.ts

# 监听代码变动，实时转换
tsc core.ts --strict --alwaysStrict false --watch

```

## 语法

### 基础语法

```ts
/** 原始类型包含：number、string、boolean、null、undefined、symbol */
let num: number = 1;

/** 数组 */

let arrayOfNumber: number[] = [1, 2, 3];
let arrayOfString: string[] = ["x", "y", "z"];

// 泛型写法
let arrayOfNumber2: Array<number> = [1, 2, 3];
let arrayOfString2: Array<string> = ["x", "y", "z"];

/** any */
let anything: any = {};
anything = 1; // 不会提示错误
anything = "x"; // 不会提示错误
// 需要明白且记住：Any is Hell（Any 是地狱）。

/** 元组类型 */
// 表示一个已知元素数量和类型的数组，各元素的类型不必相同
let arr: [string, number] = ["hello", 0];

/** unknown */
let result: unknown;

// unknown 类型仅能赋值给 unknown 或 any 类型
let num1: number = result; // 提示 ts(2322)
let anything1: any = result; // 不会提示错误

// unknown 类型 无法直接调用方法
result.toFixed(); // 提示 ts(2571)
// 需缩小类型范围后才能调用方法
if (typeof result === "number") {
  result.toFixed(); // 此处 hover result 提示类型是 number，不会提示错误
}

/** 类型断言 */
// 在运行代码前，ts仅知道结果可能是 number 或 undefined，所以就报错了
const arrayNumber: number[] = [1, 2, 3, 4];
const greaterThan2: number = arrayNumber.find((num) => num > 2); // 提示 ts(2322)

// 我们可以这样写
const greaterThan3: number = arrayNumber.find((num) => num > 2) as number;
```

### 函数类型

指定函数的参数类型和返回值类型：

```js
const add = (a: number, b: number): number => {
  return a + b;
};
```

ts 的 => 用来定义一个函数，而 es6 的 => 是用来实现一个函数，两者结合使用：

```js
type Adder = (a: number, b: number) => number; // TypeScript 函数类型定义
const add: Adder = (a, b) => a + b; // ES6 箭头函数
```

`?:` 表示可选参数：

```js
function test(param?: string) {
  console.log(param);
}
test(); // undefined
```

函数参数支持多类型：

```js
function log3(x: number | string = "hello") {
  console.log(x);
}
```

剩余参数：

```js
function sum(...nums: number[]) {
  return nums.reduce((a, b) => a + b, 0);
}

sum(1, 2); // => 3
sum(1, 2, 3); // => 6
sum(1, "2"); // ts(2345) Argument of type 'string' is not assignable to parameter of type 'number'
```

### 类型推断、字面量类型

啥是类型推断？ts 会自动判断变量或返回值的类型。

```js
let num: number = 1;
// 等价于
let num = 1;
```

初始化变量值、函数参数默认值、函数返回值等都会自动类型推断。

```js
/** 推断参数 num 的类型是数字或者 undefined，返回值的类型也是数字 */
function getNum(num = 1) {
  return num;
}
```

**字面量类型**
ts 支持 `字符串、数字、布尔值` 三种字面量类型，来看个例子：

```js
{
  let specifiedStr: "this is string" = "this is string";
  let specifiedNum: 1 = 1;
  let specifiedBoolean: true = true;
}
```

字面量类型时集合类型的子集。

字面量类型能赋值给集合类型，但是反之是不可行的：

```js
let hello: "hello" = "hello";
let hello2: string = hello; // ok
hello = "hi"; // ts(2322) Type '"hi"' is not assignable to type '"hello"'
```

通常会结合联合类型使用：

```js
type Direction = "up" | "down";
function move(dir: Direction) {
  // ...
}

move("up"); // ok
move("right"); // ts(2345) Argument of type '"right"' is not assignable to parameter of type 'Direction'
```

数字字面量和布尔值字面量也是类似用法：

```js
interface config {
  size: "small" | "big";
  margin: 0 | 10;
  isEnable: false | true;
}
```

**let、const 定义变量值相同但类型不一致问题**

```js
let str = "hello"; // str: string
const str2 = "hello"; // str2: 'hello'
```

这是由于 const 定义变量值不会改变，这样就缩小了变量的类型范围。

### 类型断言

语法

```ts
// 1、尖括号语法
<类型表达式>值;

// 2、as语法
值 as 类型表达式;
```

为了避免和 `JSX` 语法产生冲突，尖括号语法只能在 `tsx` 文件中使用

```ts
let someValue: any = "this is a string";

// 1、尖括号语法
let strLength: number = (<string>someValue).length;
// 2、as语法
let strLength: number = (someValue as string).length;
```

### interface 接口类型

`interface` 通常用来定义对象类型和函数类型。

**使用 `interface` 约束变量、函数入参结构**

```js
interface ProgramLanguage {
  /** 语言名称 */
  name: string;
  /** 使用年限 */
  age: () => number;
}

// 约束变量结构
let TypeScript: ProgramLanguage;

// 约束函数入参结构
function NewStudy(language: ProgramLanguage) {
  console.log(
    `ProgramLanguage ${language.name} created ${language.age()} years ago.`
  );
}
```

**使用 `?:` 定义可缺省属性**

```js
/** 关键字 接口名称 */
interface OptionalProgramLanguage {
  /** 语言名称 */
  name: string;
  /** 使用年限 */
  age?: () => number;
}
let OptionalTypeScript: OptionalProgramLanguage = {
  name: "TypeScript"
}; // ok
```

**使用 `readonly` 定义只读属性**

```js
interface data {
  readonly name: string;
}
let obj: data = {
  name: "张三",
};
/** ts(2540)错误，name 只读 */
data.name = "李四";
```

**定义函数类型接口**

```js
interface StudyLanguage {
  (language: ProgramLanguage): void;
}

/** 单独的函数实践 */
let StudyInterface: StudyLanguage = (language) =>
  console.log(`${language.name} ${language.age()}`);
```

**索引签名**

`索引签名` 就是为对象 key 约束类型（支持 number 和 string）。

```js
interface LanguageRankInterface {
  [rank: number]: string;
}
interface LanguageYearInterface {
  [name: string]: number;
}

{
  let LanguageRankMap: LanguageRankInterface = {
    1: "TypeScript", // ok
    2: "JavaScript", // ok
    WrongINdex: "2012" // ts(2322) 不存在的属性名
  };

  let LanguageMap: LanguageYearInterface = {
    TypeScript: 2012, // ok
    JavaScript: 1995, // ok
    1: 1970 // ok
  };
}
```

### type 类型别名

别名不会创建一个新的类型，它只是原类型的一个引用，和原类型**完全等价**，它的定义方式有点类似 let 。

语法： `type 别名 = 类型` 。

合法的类型别名声明：

```ts
// 数字类型别名
type myNumber = number;
// 布尔类型别名
type myBoolean = boolean;
// 联合类型别名
type transition = "EASE" | "EASEIN" | "EASEOUT";
// 联合类型别名
type StringOrNumber = string | number;
// 联合类型别名
type Text = string | { text: string };
// 泛型的实际类型别名
type NameLookup = Dictionary<string, Person>;
// 通过类型查询定义别名
type ObjectStatics = typeof Object;
// 泛型函数别名
type Callback<T> = (data: T) => void;
// 元组泛型别名
type Pair<T> = [T, T];
// 泛型的实际类型别名
type Coordinates = Pair<number>;
// 联合类型别名
type Tree<T> = T | { left: Tree<T>; right: Tree<T> };
```

声明了别名以后，别名就相当于是一个**类型的标识符**，可以用于注解语法中：

```ts
// 声明transition为联合类型的别名
type transition = "EASE" | "EASEIN" | "EASEOUT";

// transition此时是一个类型标识符
const boxTransition: transition = "EASE";
```

### keyof 类型索引

```ts
interface A {
  a: string;
  b: number;
}
// 等效于 'a' | 'b'
type customType = keyof A;
let param: customType = "a";
```

### | & 高级类型：联合、交叉、合并接口类型

`联合类型` ，`|` 表示或。

`交叉类型`， `&` 表示且。

```js
type test = string | number;
// 没啥意义，一般在合并接口时才用 &
type test = string & number;

// 具体值的联合类型
type girlName = "张胜男" | "王建国";
type boyName = "王建国" | "李世平";

type nameGroup = girlName | boyName;

let newName: nameGroup = "张胜男"; // ok , '王建国'、'李世平'也可以

type nameGroup2 = girlName & boyName;
let newName2: nameGroup2 = "王建国"; // ok , 其他值都报错
```

**联合、交叉组合**

`联合操作符 | 的优先级低于交叉操作符 &` 。

```js
type UnionIntersectionA =
  | ({ id: number } & { name: string })
  | ({ id: string } & { name: number }); // 交叉操作符优先级高于联合操作符

type UnionIntersectionB =
  | ("px" | "em" | "rem" | "%")
  | ("vh" | "em" | "rem" | "pt"); // 调整优先级
```

**合并接口类型**

```js
type IntersectionType = { id: number, name: string } & { age: number };
const mixed: IntersectionType = {
  id: 1,
  name: "name",
  age: 18
};
```

### 枚举类型

通常使用枚举来定义 `常量集合` 。

```js
enum Day {
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
}
```

js 中是没有枚举类型的，ts 会将枚举转化为如下 js ，属性为常量、命名值从 0 开始递增数字映射的对象：

```js
var Day = void 0;
(function (Day) {
  Day[(Day["SUNDAY"] = 0)] = "SUNDAY";
  Day[(Day["MONDAY"] = 1)] = "MONDAY";
  Day[(Day["TUESDAY"] = 2)] = "TUESDAY";
  Day[(Day["WEDNESDAY"] = 3)] = "WEDNESDAY";
  Day[(Day["THURSDAY"] = 4)] = "THURSDAY";
  Day[(Day["FRIDAY"] = 5)] = "FRIDAY";
  Day[(Day["SATURDAY"] = 6)] = "SATURDAY";
})(Day || (Day = {}));
```

**7 种常见的枚举类型**

- 数字类型
- 字符串类型
- 异构类型
- 常量成员和计算（值）成员、枚举成员类型
- 联合枚举
- 常量枚举
- 外部枚举

**数字类型**

可以给指定成员赋值（不建议对数字类型枚举执行该操作）：

```js
enum Day {
    FRIDAY,
    SATURDAY = 5
  }
```

**字符串枚举**

```js
enum Day {
    SUNDAY = 'SUNDAY',
    MONDAY = 'MONDAY',
    ...
}
```

**异构枚举**

`异构枚举` 就是支持数字、字符串类型同时使用的枚举。感觉很鸡肋。

```js
enum Day {
    SUNDAY = 'SUNDAY',
    MONDAY = 2,
    ...
  }
```

**常量成员和计算成员**

```js
enum FileAccess {
    // 常量成员
    None,
    Read = 1 << 1,
    Write = 1 << 2,
    ReadWrite = Read | Write,
    // 计算成员
    G = "123".length,
  }
```

我们只需记住缺省值（从 0 递增）、数字字面量、字符串字面量肯定是常量成员

**常量枚举**

```js
const enum Day {
    SUNDAY,
    MONDAY
  }
  const work = (d: Day) => {
    switch (d) {
      case Day.SUNDAY:
        return 'take a rest';
      case Day.MONDAY:
        return 'work hard';
    }
  }
}
```

**外部枚举**

使用 declare 描述一个在其他地方已经定义过的枚举类型，通过这种方式定义出来的枚举类型，被称之为外部枚举：

```js
declare enum Day {
  SUNDAY,
  MONDAY,
}
const work = (x: Day) => {
  if (x === Day.SUNDAY) {
    x; // 类型是 Day
  }
}
```

### 泛型

#### 语法

```typescript
名字<T1, T2, ...>
```

`名字`一般表示**函数名、接口名、类名**，`T1, T2, ...` 表示一个或多个**名字任意**的**类型变量**，实际开发中常常以**首字母大写**的标识符作为类型变量名。泛型在使用时**必须以真实类型替换类型变量**

多类型写法

```ts
function reflectExtraParams<P, Q>(p1: P, p2: Q): [P, Q] {
  return [p1, p2];
}
```

举个 🌰，使用泛型**解决输入输出一致问题**

定义一个 `print` 函数用于打印数据：

```typescript
function print(arg: string): string {
  console.log(arg);
  return arg;
}
```

这样写会导致打印其他类型时会报错，使用泛型解决：

```ts
function print<T>(arg: T): T {
  console.log(arg);
  return arg;
}
```

#### 多种类型泛型的使用

**泛型数组**

语法

```ts
Array<T>

// 简写
number[]
```

```ts
// 定义数字数组
let arr: number[] = [1, 2, 3];

// 完全等价于
let arr: Array<number> = [1, 2, 3];
```

```js
function reflectArray<P>(param: P[]) {
  return param;
}
const reflectArr = reflectArray([1, "1"]); // reflectArr 是 (string | number)[]
```

**泛型函数**

```ts
function identity<T>(m: T): T {
  // T 注解了函数内部的变量定义
  let n: T = m;
  return n;
}

// 调用泛型函数，此时用string类型替换类型变量 T
// identity<string> 作为一个整体相当于一个函数名
let m: string = identity<string>("hello world");
```

**泛型类**

```ts
// 定义泛型类，包含两个类型变量
class Identity<T1, T2> {
  attr1: T1;
  attr2: T2;
  show(m: T1, n: T2): T2 {
    return n;
  }
}

// 用真实类型替换泛型类的类型变量
// Identity<string, number>作为一个整体相当于一个类名
let a: Identity<string, number>;
// 初始化变量a
a = new Identity<string, number>();
a.attr1 = "hello";
a.attr2 = 99;

// error TS2322: Type '"good"' is not assignable to type 'number'
a.attr2 = "good";
```

**泛型接口**

```ts
// 定义泛型接口
interface Identity<T> {
  attr: T;
}

// 用真实类型替换泛型接口的类型变量
// Identity<number>作为一个整体相当于一个接口名
let a: Identity<number> = { attr: 10 };
// Identity<string>作为一个整体相当于一个接口名
let b: Identity<string> = { attr: "hello" };

// 错误，类型不匹配，数字10是数字类型，而类型变量为布尔类型
// error TS2322: Type 'number' is not assignable to type 'boolean'.
let c: Identity<boolean> = { attr: 10 };

// 一个复杂点的例子
function fn() {}
let c: Identity<typeof fn> = {
  attr() {}
};
```

#### 泛型工具

`Partial` 用于将一个接口的所有属性设置为可选状态，反之，`Required` 则是将所有属性改为必须状态。

```js
type Person = {
  id: string,
  age: number,
  name: string
};
// 等价{ id?:string, age?:number, name?:string }
type NewPerson = Partial<Person>;
```

`Pick` 主要用于提取接口的某几个属性，反之，`Omit` 用于剔除部分属性。

```typescript
// 等价 {id: string, age: number }
type NewPickPerson = Pick<Person, "id" | "age">;
```

#### 泛型约束

**使用未知属性报错问题**

```ts
// 定义泛型函数
function getLength<T>(arg: T): number {
  // 错误，编译器不知道类型变量T是否包含属性length，默认为不存在
  // error TS2339: Property 'length' does not exist on type 'T'
  return arg.length;
}
```

例子中，并没有明文约束 `arg` 存在 `length` 属性，从而 `arg.length` 导致了异常。

泛型约束就是用来解决该问题。

**泛型约束语法**

```ts
<T extends xx类型>
```

类型约束关键字为 `extends`，和继承关键字一样。实际上，类型约束**跟继承同义，类型变量继承了被约束类型的所有成员**

**使用泛型约束解决未知属性问题**

```ts
// 声明接口
interface WithLength {
  length: number;
}

// 正确，T现在被接口类型WithLength约束，包含属性 length
function getLength<T extends WithLength>(arg: T): number {
  return arg.length;
}
```

#### 默认类型

**语法**

```
<T = string>
```

**举例**

```ts
interface MyType<T = string> {
  value: T;
}

// 正确，在类型参数没有显示指定的情况下，采用了默认类型 string
let x1: MyType = {
  value: "hello world"
};
// 等价于
let x1: MyType<string> = {
  value: "hello world"
};

// 错误， error TS2322: Type 'number' is not assignable to type 'string'
let x2: MyType = {
  value: 123
};

// 正确，覆盖默认的 string 类型
let x3: MyType<number> = {
  value: 123
};
```

## Vue 项目中使用 ts

生成项目方式：

1. 使用 vue-cli 动态生成 ts + vue 项目
2. [vue-typescript-admin (管理后台模板)](https://armour.github.io/vue-typescript-admin-docs/zh/)

### 配置 Vue.prototype.xxx 属性

增加 `Vue.prototype.xxx` 属性后，若直接如下使用：

```js
// src/main.ts  添加属性
Vue.prototype.$EventBus = new Vue();

// src/components/HelloWorld.vue
this.$EventBus.$emit("change");
```

`$EventBus` 会标红，这是由于 ts 类型判断导致，使用 vue 实例属性时，ts 会判断 `node_modules/vue/types/vue` 下的 vue interface 是否具有该属性，若无则标红。

解决：在 `src/shims-vue.d.ts` 添加如下代码：

```js
declare module "vue/types/vue" {
  // 声明为 Vue 补充的东西
  interface Vue {
    $EventBus: any;
  }
}
```

利用了重复声明的 interface 会合并的性质。

### 使用 ts 后 vue2 组件的写法

[Vue 结合 ts 组件写法](src/components/HelloWorld.vue)

## declare

在 ts 中使用 js 的 npm 库，ts 校验会不通过。可以使用 `declare` 关键字声明全局的变量、方法、类、对象。

### 语法： declare (var|let|const) 变量名称: 变量类型

```js
// 变量
declare let amount: number;
// 函数
declare function toString(x: number): string;
// 类
declare class Person {
  public name: string;
  private age: number;
  constructor(name: string);
  getAge(): number;
}
// 枚举
declare enum Direction {
  Up,
  Down,
  Left,
  Right,
}

amount = 1
```

**注意**：使用 declare 关键字时，我们不需要编写声明的变量、函数、类的具体实现（因为变量、函数、类在其他库中已经实现了），只需要声明其类型即可

```js
// TS1183: An implementation cannot be declared in ambient contexts.

declare function toString(x: number) {
  return String(x);
};
```

### declare namespace

命名空间用于描述复杂的全局对象。

```js
declare namespace $ {
  const version: number;

  function ajax(settings?: any): void;
}

$.version; // => number
$.ajax();
```

该例子声明了全局导入的 JQuery 变量 `$` 。
