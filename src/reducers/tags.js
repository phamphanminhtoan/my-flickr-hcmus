import * as types from './../constants/ActionType';
import * as api from './../config';

var initialState =
{
    api: api.API_SEARCH,
    images: [],
    hasMore: 0,
    show: true,
    searchTag: "london"
};

const tags = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_SEARCH_KEY:
            var { search } = action.searchKeys;
            state.searchTag = search;
            return state;
        case types.SEARCH_ACTION:
            var newTag =  action.tags;
            return newTag;
        default: return state;
    }
}

export default tags;