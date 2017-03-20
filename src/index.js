const isFn = test => typeof test === 'function'
const id = Component => Component

export class Crate {
  constructor (fn) {
    this.fn = fn || id
    return this
  }

  map (fn) {
    return new this.constructor(fn(this.fn))
  }

  fold (fn) {
    return fn(this.fn)
  }

  compile (Component = 'div') {
    return this.fold(hoc => hoc(Component))
  }

  hoc (fn) {
    return this.map(hoc => Wrapped => hoc(fn(Wrapped)))
  }

  static of (fnMap) {
    const self = this
    class CustomCrate extends self.prototype.constructor {
      constructor (fn) {
        super(fn)
        return this
      }
    }

    Object.keys(fnMap).forEach(function (key) {
      const fn = fnMap[key]
      console.log(self.prototype.constructor)
      if (typeof fn === 'object') {
        Object.assign(CustomCrate.prototype, fn)
      } else {
        CustomCrate.prototype[key] = fn
      }
    })

    return new CustomCrate()
  }
}
