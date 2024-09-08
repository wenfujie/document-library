class Application {
  constructor() {
    this.middlewares = []
    this.context = {}
  }
  use(middleware) {
    this.middlewares.push(middleware)
  }

  compose(middlewares) {
    return async function (ctx, lastNext) {
      function createNext(middleware, oldNext) {
        return async () => {
          await middleware(ctx, oldNext)
        }
      }

      let len = middlewares.length
      let next = lastNext
      if (!next)
        next = () => {
          return Promise.resolve()
        }
      for (let i = len - 1; i >= 0; i--) {
        let currentMiddleware = middlewares[i]
        next = createNext(currentMiddleware, next)
      }

      await next()
    }
  }

  callback() {
    const fn = this.compose(this.middlewares)
    fn(this.context)
  }
}

const app = new Application()

app.use(async (ctx, next) => {
  console.log('%c 1 start', 'color:#0f0;')
  await next()
  console.log('%c 1 end', 'color:#0f0;')
})

app.use(async (ctx, next) => {
  console.log('%c 2 start', 'color:#0f0;')
  await next()
  console.log('%c 2 end', 'color:#0f0;')
})

app.use(async (ctx, next) => {
  console.log('%c final', 'color:#0f0;')
})

app.callback()
//  1 start
//  2 start
//  final
//  2 end
//  1 end
