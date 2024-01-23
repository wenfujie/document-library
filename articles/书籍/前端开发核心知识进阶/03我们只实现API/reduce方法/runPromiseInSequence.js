// runPromiseInSequence: 利用reduce顺序执行多个Promise
function runPromiseInSequence(array) {
  array.reduce((p, nextP) => {
    return p.then(nextP);
  }, Promise.resolve());
}

// test
const p1 = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log(1);
      resolve(1);
    }, 1000)
  );
const p2 = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log(2);
      resolve(2);
    }, 2000)
  );
const list = [p1, p2];
runPromiseInSequence(list); // 异步输出 1 2
