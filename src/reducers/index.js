import { combineReducers } from 'redux';

import QuestionList from './reducer-question'
import activeQuestion from './reducer-active-question'
import options from './reducer-selected-options'

const rootReducer = combineReducers({
  questions: QuestionList,
  activeQuestion,
  selectedOptions: options
});

export default rootReducer;
