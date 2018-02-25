import React, { Component } from 'react'
import { withAlert } from 'react-alert'
import { Link } from 'react-router-dom'
 
class Alert extends Component  {

    constructor(props){
        super(props)
    }

  render () {
    return (
    <a className="btn disabled pull-md-right" 
        onClick={() => this.props.alert.show(this.props.message)}>
        {this.props.label}
    </a>
    )
  }
}
 
export default withAlert(Alert)