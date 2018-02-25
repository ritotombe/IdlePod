import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { ToggleButtonGroup, ToggleButton, Collapse } from 'react-bootstrap'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import _ from 'lodash'

import {selectQuestion, selectOption, updateSpecialAnswers} from '../actions'
import question from '../components/question';
import specialAnswer from '../reducers/reducer-special-answer';
import Alert from '../components/alert'

class LandingQuestion extends Component {

    constructor(props) {
        super(props)
        this.updateDimensions = this.updateDimensions.bind(this)
        this.renderOptions = this.renderOptions.bind(this)
        this.shake = this.shake.bind(this)
        this.allFinished = this.allFinished.bind(this)
        this.countUnfinished = this.countUnfinished.bind(this)
    
        this.state = {
          width: window.innerWidth,
          unfinishedClicked: false
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

    shake(message){
        document.getElementById("q-group").classList.add("shake")
        this.setState({
            unfinishedClicked: true
        })
        setTimeout(() => {
            document.getElementById("q-group").classList.remove("shake")
            this.setState({
                unfinishedClicked: false
            })
        }, 500) 

        document.getElementById("q-group").appendChild(<p>{message}</p>)
    }

    allFinished(){
        var {selectedOptions} = this.props

        if (!selectedOptions) {
            return false
        }

        for (var i in selectedOptions){
            if (selectedOptions[i] == "0"){
                return false
            }
        }

        return true
    }

    countUnfinished(){
        var {selectedOptions} = this.props

        var missed = []

        if (!selectedOptions) {
            missed = ['1','2','3','4','5','6','7','8','9']
        }

        for (var i in selectedOptions){
            if (selectedOptions[i] == "0"){
                missed.push(i)
            }
        }

        return missed
    }

    //Number 10 Special Questions
    renderOptions (option){
        var {selectedOptions, specialAnswer} = this.props
        var selected = []
        var answer = ""
        if (selectedOptions && selectedOptions[10]) {
            selected = selectedOptions[10]
        }

        

        if (specialAnswer && specialAnswer[option.number]){
            answer = specialAnswer[option.number]
        }
        
        return [
            <ToggleButton key={option.number} bsClass='btn btn-primary nohover checkbox-vertical' value={option.number}>
                {option.text} <br/>
                
            </ToggleButton>,
            <div className='checkbox-vertical extra'>
            {(() =>{
                if (option.extra) {
                    return (
                        <Collapse in= {selected.includes(option.number) ? true : false}>
                            <div >
                            <label><small>{option.extra}</small></label>
                            <textarea 
                                onChange = {(event) => {
                                    this.props.updateSpecialAnswers({
                                        optionNum: option.number,
                                        answer: event.target.value
                                    })
                                }} 
                                className="form-control extra" 
                                id="extra" 
                                autoFocus="true"
                                value={answer}>
                            </textarea>
                            <hr/>
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
        

        // optional cofiguration
        const options = {
            position: 'bottom center',
            timeout: 5000,
            offset: '30px',
            transition: 'scale'
        }

        var value = undefined

        if (selectedOptions) {
            value = selectedOptions[selectedQuestion.number]
        }

        return (
            <div className={selectedQuestion.number < 10 || this.state.width > 760  ? "landing-question vertical-center col-xs-12" : "landing-question col-xs-12"}>
                <div className='text-xl-center'><h1>{selectedQuestion.number}.</h1></div>
                <div className='text-xl-center'><h3>{selectedQuestion.text}</h3></div>
                <div className="btn-group-wrap">

                    {(() => {
                        // Since number 10 is a special question, then the template has to be different
                        if (selectedQuestion.number < 10) {
                            return (
                            
                                <ToggleButtonGroup 
                                    block = {this.state.width > 760 ? false : true}
                                    vertical = {this.state.width > 760 ? false : true}
                                    type='radio'
                                    name='options' 
                                    bsClass = {this.state.width > 760 ? " btn-group" : "btn-group"}
                                    id = 'q-group'
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
                                    id = 'q-group'
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
                    {(()=>{
                        if (selectedQuestion.number < 10){
                            if (value){
                                return (
                                    <Link to={`/q/${parseInt(selectedQuestion.number)+1}`} className="btn btn-default pull-md-right">
                                        Next..
                                    </Link>
                                )
                            } else {
                                return (
                                    <Link to={`/q/${parseInt(selectedQuestion.number)}`} className="btn disabled pull-md-right"  onClick={() => this.shake()}>
                                        Next..
                                    </Link>
                                )
                            }
                        } else {
                           
                            if (!this.allFinished()){
                                var missed = this.countUnfinished()
                                var message = ""
                                

                                if (missed.length > 1){
                                    message = `You missed these numbers: ${missed}`
                                } else {
                                    message = `You missed this number: ${missed}`
                                }
                                return (
                                    <Link to={`/q/${parseInt(selectedQuestion.number)}`} className="btn disabled pull-md-right" onClick={() => this.shake(message)}>
                                        Finish
                                    </Link>
                                )
                            } else if (value){
                                return (
                                    <Link to={`/q/${parseInt(selectedQuestion.number)+1}`} className="btn btn-default pull-md-right">
                                        Finish
                                    </Link>
                                )
                            } else {
                                return (
                                    <Link to={`/q/${parseInt(selectedQuestion.number)}`} className="btn disabled pull-md-right" onClick={() => this.shake()}>
                                        Finish
                                    </Link>
                                )
                            }
                        }
                    })()}
                </div>
            </div>
            
        )
    }
}

function mapStateToProps(state){
    return {
        selectedQuestion: state.activeQuestion,
        selectedOptions: state.selectedOptions,
        specialAnswer: state.specialAnswer
    }
}

export default connect(mapStateToProps, {selectQuestion, selectOption, updateSpecialAnswers})(LandingQuestion)