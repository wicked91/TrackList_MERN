import { handleActions, createAction } from 'redux-actions';

const GET_SHOP_INFO = "GET_SHOP_INFO";
const GET_SHOP_LIST = "GET_SHOP_LIST";
const UPDATE_TRACK_LIST = 'UPDATE_TRACK_LIST';

export const getShopInfo = createAction("GET_SHOP_INFO");
export const getShopList = createAction('GET_SHOP_LIST');
export const updateTrackList = createAction('UPDATE_TRACK_LIST');

const initialState = {
    shopname: "",
    shopid: "",
    shoplist: [],
    tracklist: []
}

export default handleActions({
    [GET_SHOP_INFO]: (state, action) => {
        const {shopname, shopid}= action.payload.data;
        return{
            ...state,
            shopname,
            shopid
        };
    },
    [GET_SHOP_LIST]:(state,action)=>{
        return{
            ...state,
            shoplist: action.payload.data
        }
    },
    [UPDATE_TRACK_LIST]: (state, action) => {
        return {
            ...state,
            tracklist: action.payload.data
        };
    }
}, initialState);