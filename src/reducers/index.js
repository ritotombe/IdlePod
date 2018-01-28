import { combineReducers } from 'redux';

import QuestionList from './reducer-question'
import activeQuestion from './reducer-active-question'
import options from './reducer-selected-options'
import specialAnswer from './reducer-special-answer'

const rootReducer = combineReducers({
  questions: QuestionList,
  activeQuestion,
  selectedOptions: options,
  specialAnswer
});

export default rootReducer;
