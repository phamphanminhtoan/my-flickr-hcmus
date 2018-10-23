import * as types from './../constants/ActionType';

var initialState = 
    {
        isActive: true,
        search: ""
    }
;

const searchKeys = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_SEARCH_KEY:
            return state;
        default: return state;
    }
}

export default searchKeys;