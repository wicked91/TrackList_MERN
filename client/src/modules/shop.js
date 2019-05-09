import { handleActions, createAction } from "redux-actions";
import axios from "axios";

const SELECTED_SHOP_INFO ="SELECTED_SHOP_INFO";
const UPDATE_TRACK_LIST = "UPDATE_TRACK_LIST";
const selectedShopInfo = createAction("SELECTED_SHOP_INFO");
const updateTrackList = createAction("UPDATE_TRACK_LIST");


export const tracklistRead = (shopInfo) => dispatch => {
    dispatch(selectedShopInfo(shopInfo));

    axios
        .get(`/songs/${shopInfo.selected_shopid}`)
        .then(response => {
            dispatch(updateTrackList(response.data.songs));
        });
};

export const tracklistAdd = songInfo => dispatch => {
    axios
        .post("/songs", songInfo)
        .then(response => {
            dispatch(updateTrackList(response.data.songs));
        });
};

export const tracklistRemove = songInfo => dispatch => {
    axios
        .delete(`/songs/${songInfo.shopid}/${songInfo.songid}`)
        .then(response => {
            dispatch(updateTrackList(response.data.songs));
        });
};

const initialState = {
    selected_shopid : "",
    selected_shopname : "",
    tracklist: []
};

export default handleActions(
    {
        [SELECTED_SHOP_INFO]: (state, action) => {
            const {selected_shopid, selected_shopname} = action.payload            
            return {
                ...state,
                selected_shopid,
                selected_shopname
            };
        },

        [UPDATE_TRACK_LIST]: (state, action) => {
            return {
                ...state,
                tracklist: action.payload
            };
        }
    },
    initialState
);
