import Loadable from 'react-loadable'

export default {
  asyncCompile: function (options) {
    const AsyncComponent = Loadable(options)
    return this.fold(hoc => {
      return hoc(AsyncComponent)
    })
  }
}
