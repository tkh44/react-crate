import React from 'react'
import colorsJson from 'open-color/open-color.json'



const pp = obj => JSON.stringify(obj, null, 2)

export default function ColorDisplay (props) {
  return <pre {...props}>{pp(props)}</pre>
}
