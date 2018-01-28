import { SELECT_OPTION } from "../actions/index";

export default function options (state = null, action) {
    switch (action.type){
        case SELECT_OPTION:
            var {questionNumber, selectedOption} = action.payload
            if (!state){
                selectedOptions[questionNumber] = selectedOption
                return selectedOptions
            } else {
                return {...state, [questionNumber]: selectedOption}
            }  
    }
    return state
}

var selectedOptions = {
    1:0,
    2:0,
    3:0,
    4:0,
    5:0,
    6:0,
    7:0,
    8:0,
    9:0
}