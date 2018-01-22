import QuestionList from './reducer-question'

export  default function (state = null, action) {
    switch (action.type){
        case "SELECT_QUESTION":
            return QuestionList()[action.payload]
    }

    return state
}