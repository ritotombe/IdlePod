import React, { Component } from 'react'

import LandingQuestion from '../containers/landing-question'

class Question extends Component {
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
            <div className="landing-question-container col-xs-12">
            {/* {num}. */}
                <LandingQuestion  num={num} />
            </div>
        )
    }
}

export default Question