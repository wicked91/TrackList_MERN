import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';

const GET_POST_RESULT = 'GET_POST_RESULT';
const getPostResult = createAction(GET_POST_RESULT);

export const getSearchMusicResult = (keyword) => dispatch => {

    axios.get(`https://itunes.apple.com/search?term=${keyword}&limit=25&entity=song`)
            .then((response) => dispatch(getPostResult(response.data.results)));
}

const initialState = {
    searchResult: []
};

export default handleActions({
    [GET_POST_RESULT]: (state, action) => {
        return {
            ...state,
            searchResult: action.payload
        }
    }
}, initialState);