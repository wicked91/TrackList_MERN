import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';

const GET_POST_RESULT = 'GET_POST_RESULT';
const getPostResult = createAction(GET_POST_RESULT);

export const getSearchMusicResult = (keyword) => dispatch => {
    console.log("getSearchMusicResult " + keyword);

    axios.get(`/process/search/${keyword}`)
            .then((response)=>{
                dispatch(getPostResult(response.data.results));
            });
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