import { Component as ReactComponent, Children, createElement as h } from 'react'
import classnames from 'classnames'

const isFn = test => typeof test === 'function'
const id = Component => Component

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
    return this.map(hoc => Wrapped => fn(hoc(Wrapped)))
  }

  // Inspect your props at a certain point
  inspect () {
    return this.map(hoc => Wrapped => hoc(props => {
      console.log('=== inspect ===')
      console.log('props', props)
      console.log('this.hocFn', this.hocFn)
      console.log('===============')
      return h(Wrapped, props)
    }))
  }

  // Set prop by key
  prop (key, value) {
    return this.map(hoc => Wrapped => hoc(props => {
      const nextProps = { ...props, [key]: isFn(value) ? value(props) : value }
      return h(Wrapped, nextProps)
    }))
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
    return this.prop('style', props => ({
      ...props.style,
      ...(isFn(s) ? s(props) : s)
    }))
  }
}

export default function crate (...args) {
  return new Crate(...args)
}
