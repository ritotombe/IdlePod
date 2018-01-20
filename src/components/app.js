import React, { Component } from 'react'
import SVGInline from "react-svg-inline"

import {IDLE_POD_ICON} from "../../images/idle_pod.js"

import Scroller from "./scroll_handler.js"

export default class App extends Component {
  render() {
    return (
    <div>

      <SVGInline className="landing-logo" svg={ IDLE_POD_ICON } />
      <Scroller />
    </div>
    );
  }
}
