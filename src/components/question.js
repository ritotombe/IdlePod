import React, { Component } from 'react'

import LandingQuestion from '../containers/landing-question'

export default class Question extends Component {
    render(){
        var {num} = this.props.match.params

        if (!num || num > 10) {
            window.location.href = "/q/10"
            return (
                <div className="test">
                    Redirecting..
                </div>
            )
        }

        return (
            <div className="test">
                <LandingQuestion  num={num} />
            </div>
        )
    }
}