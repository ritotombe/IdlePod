export const SELECT_QUESTION = "SELECT_QUESTION"
export const SELECT_OPTION = "SELECT_OPTION"
export const UPDATE_SPECIAL_ANSWERS = "UPDATE_SPECIAL_ANSWERS"


export function selectQuestion (question) {
    return {
        type: SELECT_QUESTION,
        payload:question
    }
}


export function selectOption (option) {
// option = {
//     selectedOption: int,
//     questionNumber: int
// }
    return {
        type: SELECT_OPTION,
        payload: option
    }
}

export function updateSpecialAnswers (answer) {
// answer = {
//     optionNum: int,
//     answer: int
// }
    return {
        type: UPDATE_SPECIAL_ANSWERS,
        payload: answer
    }
}