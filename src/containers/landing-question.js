import React, { Component } from 'react'
import { connect } from 'react-redux'

import {selectQuestion} from '../actions'

class LandingQuestion extends Component {
    componentWillMount(){
        const {num} = this.props
        this.props.selectQuestion(num)
        console.log(num);
    }

    render(){
        var {selectedQuestion} = this.props

        if (!selectedQuestion) {
            return (
                <div>Waiting</div>
            )
        }

        return (
            <div className="landing-question">
                {selectedQuestion.text}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        selectedQuestion: state.activeQuestion
    }
}

export default connect(mapStateToProps, {selectQuestion})(LandingQuestion)