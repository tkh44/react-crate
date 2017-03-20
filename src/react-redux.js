import connect from 'react-redux/lib/connect/connect'

export default {
  connect(...args) {
    const hoc = connect(...args)
    return this.hoc(hoc)
  }
}
