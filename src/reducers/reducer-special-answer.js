import { UPDATE_SPECIAL_ANSWERS } from "../actions/index";

export default function specialAnswer (state = null, action) {

    switch (action.type) {
        case UPDATE_SPECIAL_ANSWERS:
            var {optionNum, answer} = action.payload
            return {...state, [optionNum]: answer}
    } 
    return state
}