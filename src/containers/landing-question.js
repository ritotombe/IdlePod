import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { ToggleButtonGroup, ToggleButton, Collapse } from 'react-bootstrap'
import _ from 'lodash'

import {selectQuestion, selectOption} from '../actions'
import question from '../components/question';

class LandingQuestion extends Component {

    constructor(props) {
        super(props)
        this.updateDimensions = this.updateDimensions.bind(this)
        this.renderOptions = this.renderOptions.bind(this)
    
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

    //Number 10 Special Questions
    renderOptions (option){
        var {selectedOptions} = this.props
        var selected = []
        if (selectedOptions) {
            selected = selectedOptions[10]
        }
        
        return [
            <ToggleButton key={option.number} bsClass='btn btn-primary checkbox-vertical' value={option.number}>
                {option.text} <br/>
                
            </ToggleButton>,
            <div className='checkbox-vertical btn extra'>
            {(() =>{
                if (option.extra) {
                    return (
                        <Collapse in= {selected.includes(option.number) ? true : false}>
                            <div >
                            <label><small>{option.extra}</small></label>
                            <textarea className="form-control" id="extra" autoFocus="true">
                            </textarea>
                            </div>
                        </Collapse>
                    )
                }
                })()}
             </div>
            ]
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
            <div className={selectedQuestion.number < 10 || this.state.width > 760  ? "landing-question vertical-center col-xs-12" : "landing-question col-xs-12"}>
                <div className='text-xl-center'><h1>{selectedQuestion.number}.</h1></div>
                <div className='text-xl-center'><h3>{selectedQuestion.text}</h3></div>
                <div className="btn-group-wrap">

                    {(() => {
                        
                        if (selectedQuestion.number < 10) {
                            return (
                            
                                <ToggleButtonGroup 
                                    block = {this.state.width > 760 ? false : true}
                                    vertical = {this.state.width > 760 ? false : true}
                                    type='radio'
                                    name='options' 
                                    bsClass = {this.state.width > 760 ? " btn-group" : "btn-group"}
                                    onChange={values => {
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
                            
                            return (
                                <ToggleButtonGroup 
                                    block 
                                    vertical 
                                    type='checkbox'
                                    name='options' 
                                    onChange={values => {
                                                this.props.selectOption({
                                                    selectedOption: values,
                                                    questionNumber: selectedQuestion.number
                                                 })
                                                 this.forceUpdate()
                                            }
                                    }
                                    value={value}>
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