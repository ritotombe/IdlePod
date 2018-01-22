import { combineReducers } from 'redux';

import QuestionList from './reducer-question'
import ActiveQuestion from './reducer-active-question'

const rootReducer = combineReducers({
  questions: QuestionList,
  activeQuestion: ActiveQuestion
});

export default rootReducer;
