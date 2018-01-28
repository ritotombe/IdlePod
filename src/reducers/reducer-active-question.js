
import QuestionList from './reducer-question'
import { SELECT_QUESTION } from '../actions/index';

export default function activeQuestion (state = null, action) {
    switch (action.type){
        case SELECT_QUESTION:
            return QuestionList()[action.payload]
    }

    return state
}