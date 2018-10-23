import * as types from './../constants/ActionType';

export const actSearchTags = (tags) => {
    return {
        type: types.SEARCH_ACTION,
        tags
    }
};

export const actGetSearchKeys = (searchKeys) => {
    return {
        type: types.GET_SEARCH_KEY,
        searchKeys
    }
}