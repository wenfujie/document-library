/**
 * 递归
 */

// 阶层运算
function recursion(num) {
  if (num === 1) return num
  return num * recursion(num - 1)
}

console.log(recursion(5)) // 120

// 计算1-100的和
function sum(num) {
  if (num === 1) return num
  return num + sum(num - 1)
}

console.log(sum(100)) // 5050

// 计算斐波那契数第n项
function fibonacci(n) {
  return fibonacci(n - 1) + fibonacci(n - 2)
}
