import * as eventloop from './eventloop.js'
import * as t from './testing.js'
import * as promise from './promise.js'

export const testEventloopOrder = tc => {
  let currI = 0
  for (let i = 0; i < 10; i++) {
    const bi = i
    eventloop.enqueue(() => {
      t.assert(currI++ === bi)
    })
  }
  eventloop.enqueue(() => {
    t.assert(currI === 10)
  })
  t.assert(currI === 0)
  return promise.all([
    promise.create(resolve => eventloop.enqueue(resolve)),
    promise.until(0, () => currI === 10)
  ])
}
