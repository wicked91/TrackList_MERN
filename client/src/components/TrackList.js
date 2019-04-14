import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as shopAction from '../modules/shop';

import TrackInfo from './TrackInfo';
import '../style/componentsStyle.css';

class TrackList extends Component {

    onRemoveList = async (key) => {
        const { ShopAction, tracklist, selected_shopid } = this.props;
        
        const songInfo = {
            shopid : selected_shopid,
            songid : tracklist[key]._id
        }

        try{
            await ShopAction.tracklistRemove(songInfo);            
        } catch (e){
            console.log(e);
        }
    }

    render() {
        return (
            <div className="outerStyle">
                <div className="innerStyle">
                    { 
                        this.props.tracklist.map((data, i) => {
                            return (
                                <TrackInfo title={data.title}
                                    artist={data.artist}
                                    img={data.img}
                                    key={i}
                                    dataKey={i}
                                    onRemoveList={this.onRemoveList.bind(this)} />
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        selected_shopid : state.shop.selected_shopid,
        tracklist: state.shop.tracklist
    }),
    (dispatch) => ({
        ShopAction: bindActionCreators(shopAction, dispatch)
    })
)(TrackList);