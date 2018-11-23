import React from "react"
import ReactDOM from "react-dom"
import "babel-polyfill"
import "./index.css"

require("./component")
const App = require("./app").default

ReactDOM.render(<App />, document.getElementById("root"))
