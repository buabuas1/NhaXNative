
import {combineReducers} from 'redux';
import counterReducer from './authen.reducer';

export default combineReducers({
    counter:counterReducer
});