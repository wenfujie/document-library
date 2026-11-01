

## ESM与CommonJS的区别



|          | 加载时机 | 输出值   |
| -------- | -------- | -------- |
| ESM      | 编译时   | 引用的值 |
| CommonJS | 运行时   | 拷贝的值 |



## ESM 语法

### export、import

export 有以下两种写法，建议底部导出，导出了哪些属性一目了然。

```js
// good
const data = ''
const fn = ()=>{}

export { data, fn }
```

```js
// bad
export const data = ''
export const fn = ()=>{}
```

import 导入的属性为对象时能修改该对象的属性，但不建议直接修改对象属性，这样会难以追溯。

如果直接修改导入的其他类型属性会直接报错。

```js
import { data, fn } from './index.js'

fn()
```

执行模块，不导入属性

```js
import 'src/main.js'
```

### export default

默认输出

```js
const data = {}
export default data 
```

```js
import custData from './index.js'
```

### as 

#### 重命名

```js
const data = {}

export { data as newData }	
```

```js
import { newData as data } from 'index.js'
```

#### 模块整体加载

```js
const data = ''
const fn = ()=>{}

export { data, fn }
```

```js
import * as AModule from './index.js'

console.log(AModule.data)
AModule.fn()
```

### import()

异步加载，返回Promise

```js
if (condition) {
  import('moduleA').then(...);
} else {
  import('moduleB').then(...);
}
```

