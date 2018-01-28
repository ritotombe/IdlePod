import React, { Component } from 'react'

import LandingQuestion from '../containers/landing-question'
import Link from 'react-router-dom/Link';

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

        // Introduction Page
        if (num == 0){
            return (
            <div className="landing-question-container col-xs-12">
                 <div className="landing-question vertical-center col-xs-12">
                    <div className='text-xl-center'>
                        <h5>There are <b>
                                10 questions
                            </b>
                            . <br/>Please choose option that <b> 
                                 most suitable 
                            </b> for you in question <b>1 to 9</b>. <br/>For the <b>last question</b>, you can choose <b> more than one</b>. 
                        </h5> 
                    </div>
                    <div className="prev-next-wrapper btn center-block">
                    <Link to={`/q/1`} className="btn btn-default text-centered">
                        Start..
                    </Link>
                </div>
                </div>
            </div>
            )
        }

        return (
            <div className="landing-question-container col-xs-12">
                <LandingQuestion  num={num} />
            </div>
        )
    }
}

export default Question