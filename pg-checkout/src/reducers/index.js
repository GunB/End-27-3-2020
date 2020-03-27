import { combineReducers } from 'redux';
import themeReducer from './themeReducer';
import detallesCompraReducer from './detallesCompraReducer';
import detallesCompraConfigReducer from './detallesCompraConfigReducer';
import serverAnswerReducer from './serverAnswerReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  detalles: detallesCompraReducer,
  detallesConfig: detallesCompraConfigReducer,
  serverAnswer: serverAnswerReducer
});

export default rootReducer;
