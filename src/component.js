import React from "react"
import { includes } from "lodash"

const ogCreateElement = React.createElement.bind(React)

let $viewStyle = null

React.createElement = (type, oldProps, ...children) => {
  const props = { ...oldProps }
  if (!includes(["img", "div", "a", "b", "span"], type)) {
    if ((props.className || "").indexOf("flexEl") === -1) {
      props.className = `${props.className || ""} flexEl`
    }
  }

  const labels = [
    type,
    ...Object.keys(props)
      .filter(name => name[0] === "$" && props[name])
      .map(name => name.slice(1))
  ]

  const styles = labels
    .map(label => $viewStyle && $viewStyle[label])
    .filter(i => i)
  const newStyles = Object.assign({}, ...styles)

  const hasProps = Object.keys(newStyles).length > 0

  if (hasProps) {
    props.style = Object.assign({}, newStyles, props.style || {})
  }

  return ogCreateElement(type, props, ...children)
}

window.React = React

window.Component = class extends React.Component {
  render() {
    if (this.styles) {
      $viewStyle = this.styles
    } else {
      $viewStyle = null
    }

    return this.show()
  }
}
