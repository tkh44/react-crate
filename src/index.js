import { Component as ReactComponent, Children, createElement as h } from 'react'
import classnames from 'classnames'
import createEagerFactory from 'recompose/createEagerFactory'
import withState from 'recompose/withState'
import withReducer from 'recompose/withReducer'
import branch from 'recompose/branch'

const isFn = test => typeof test === 'function'
const id = Component => Component
const getDisplayName = C => C.displayName || C.name || 'Component'

class Crate {
  constructor (hoc = id) {
    this.hocFn = hoc
    return this
  }

  map (fn) {
    return new Crate(fn(this.hocFn))
  }

  fold (fn) {
    return fn(this.hocFn)
  }

  compile (Component) {
    return this.fold(hoc => hoc(Component))
  }

  hoc (fn) {
    return this.map(hoc => {
      return Wrapped => {
        return hoc(fn(Wrapped))
      }
    })
  }

  // Inspect your props at a certain point
  inspect () {
    return this.hoc(
      (Wrapped) => {
        const factory = createEagerFactory(Wrapped)
        return props => {
          console.log(`inspect props: ${getDisplayName(Wrapped)}`, props)
          return factory(props)
        }
      }
    )
  }

  // Set prop by key
  prop (key, value) {
    return this.hoc(Wrapped => {
      const factory = createEagerFactory(Wrapped)
      return props => {
        return factory({
          ...props,
          [key]: isFn(value) ? value(props) : value
        })
      }
    })
  }

  // Set className prop
  // accepts anything that `classnames`
  // https://www.npmjs.com/package/classnames
  className (value) {
    return this.prop('className', props => {
      return classnames(props.className, isFn(value) ? value(props) : value)
    })
  }

  // Set style
  style (s) {
    return this.prop('style', props => {
      return ({
        ...props.style,
        ...(isFn(s) ? s(props) : s)
      })
    })
  }

  lifecycle (name, fn) {
    return this.hoc(Wrapped => {
      const factory = createEagerFactory(Wrapped)
      class Lifecycle extends ReactComponent {}
      Lifecycle.prototype.render = function () {
        return factory(this.props)
      }
      Lifecycle.prototype[name] = fn
      return Lifecycle
    })
  }
}

// Lifecycle
const lifecycleMethods = [
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount'
]

lifecycleMethods.forEach(method => {
  Crate.prototype[method] = function (fn) {
    return this.lifecycle(method, fn)
  }
})

// Recompose utils

// https://github.com/acdlite/recompose/blob/master/docs/API.md#withstate
Crate.prototype.state = function state (...args) {
  return this.hoc(withState(...args))
}

// https://github.com/acdlite/recompose/blob/master/docs/API.md#withreducer
Crate.prototype.reducer = function reducer (...args) {
  return this.hoc(withReducer(...args))
}

// https://github.com/acdlite/recompose/blob/master/docs/API.md#branch
Crate.prototype.reducer = function branch (...args) {
  return this.hoc(branch(...args))
}

// factory
export default function crate (...args) {
  return new Crate(...args)
}
