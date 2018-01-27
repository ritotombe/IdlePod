import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import _ from 'lodash'

import {selectQuestion, selectOption} from '../actions'
import question from '../components/question';

class LandingQuestion extends Component {

    constructor(props) {
        super(props)
        this.updateDimensions = this.updateDimensions.bind(this)
    
        this.state = {
          width: window.innerWidth,
        }
      }

    // This will rerender the screen if screen size changes
    updateDimensions () {
        this.setState({width: window.innerWidth});
    }

    componentDidMount(){
        const {num} = this.props
        this.props.selectQuestion(num)
        window.addEventListener("resize", this.updateDimensions)
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.num != this.props.num){
            this.props.selectQuestion(nextProps.num)
        }
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions)
    }

    renderOptions (option){
        return (
            <ToggleButton key={option.number} bsClass='checkbox col-sm-12' value={option.number}>
                {option.text}
            </ToggleButton>
        )
    }
    
    render(){
        var {selectedQuestion, selectedOptions} = this.props

        if (!selectedQuestion) {
            return (
                <div>Waiting</div>
            )
        }
        
        var value = []

        if (selectedOptions) {
            value = selectedOptions[selectedQuestion.number]
        }

        return (
            <div className="landing-question vertical-center col-xs-12">
                <div className='text-xl-center'><h1>{selectedQuestion.number}</h1></div>
                <div className='text-xl-center'><h3>{selectedQuestion.text}</h3></div>
                <div className="btn-group-wrap">

                    {(() => {
                        
                        if (selectedQuestion.number < 10) {
                            return (
                            
                                <ToggleButtonGroup 
                                    block = {this.state.width > 500 ? false : true}
                                    vertical = {this.state.width > 500 ? false : true}
                                    type='radio'
                                    name='options' 
                                    bsClass = {this.state.width > 500 ? " btn-group" : "btn-group"}
                                    onChange={values => {
                                            this.forceUpdate()
                                            this.props.selectOption({
                                            selectedOption: values,
                                            questionNumber: selectedQuestion.number
                                            })
                                        }
                                    }
                                    value={value}>
                                        <ToggleButton bsClass='btn btn-primary' value={1}>
                                            Very Rare
                                        </ToggleButton>
                                        <ToggleButton bsClass='btn btn-primary' value={2}>
                                            Rarely
                                        </ToggleButton>
                                        <ToggleButton bsClass='btn btn-primary' value={3}>
                                            Occasionally
                                        </ToggleButton>
                                        <ToggleButton bsClass='btn btn-primary' value={4}>
                                            Often
                                        </ToggleButton>
                                        <ToggleButton bsClass='btn btn-primary' value={5}>
                                            Very Often
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                
                            )
                        } else {
                            var options = _.map(selectedQuestion.options, this.renderOptions)
                            console.log(value);
                            
                            return (
                                
                                <ToggleButtonGroup 
                                    block 
                                    vertical 
                                    type='checkbox'
                                    name='options' 
                                    onChange={values => {
                                                this.forceUpdate()
                                                this.props.selectOption({
                                                selectedOption: values,
                                                questionNumber: selectedQuestion.number
                                            })
                                        }
                                    }
                                    value={value}>
                                    <small className='text-sm-center btn-block'>
                                        You may choose more than one
                                    </small>
                                        {options}
                                    </ToggleButtonGroup>
                            )
                        }
                    })()}
                </div>

                <div className="prev-next-wrapper center-block">
                    <Link to={`/q/${parseInt(selectedQuestion.number)-1}`} className="btn btn-default">
                        ..Previous
                    </Link>
                    <Link to={`/q/${parseInt(selectedQuestion.number)+1}`} className="btn btn-default pull-md-right">
                        Next..
                    </Link>
                </div>
            </div>
            
        )
    }
}

function mapStateToProps(state){
    return {
        selectedQuestion: state.activeQuestion,
        selectedOptions: state.selectedOptions
    }
}

export default connect(mapStateToProps, {selectQuestion, selectOption})(LandingQuestion)