import React, { Component } from 'react'
import SVGInline from "react-svg-inline"
import {Link} from 'react-router-dom'

import {IDLE_POD_ICON} from "../../images/idle_pod.js"

import Scroller from "./scroll_handler.js"

export default class Landing extends Component {
  render() {
    return (
    <div className="inner">
      <SVGInline className="landing-logo" svg={ IDLE_POD_ICON } />
      <Scroller />
      <Link to='/q/1' id="finish-landing" className="btn btn-default">
         check your procrastination  <br/>level here
      </Link>
    </div>
    );
  }
}
