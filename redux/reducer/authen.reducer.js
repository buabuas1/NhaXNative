
import {INCREASE, DECREASE} from '../action/type';

const initialState = {
    num: 0
};

export default function (state = initialState, action) {
    switch (action.type) {
        case INCREASE:
            return {...state, num: 1}

        case DECREASE:
            return {...state, num: 1};

        default:
            return state;
    }
}