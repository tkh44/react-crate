import React from 'react'

const pp = obj => JSON.stringify(obj, null, 2)

export default props => {
  return (
    <div style={props.style}>
      <h1 style={props.theme.Heading.alt}>{'react-crate'}</h1>
      <hr />
      <pre
        style={{
          padding: 8,
          border: `1px solid ${props.theme.borderColor}`,
          borderRadius: props.theme.borderRadius
        }}
      >
        {pp(props)}
      </pre>
    </div>
  )
}
