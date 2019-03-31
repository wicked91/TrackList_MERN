import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as updateActions from '../modules/update';

import axios from 'axios';
import ListInfo from './ListInfo';
import './componentsStyle.css';

class ListBox extends Component {

    onRemoveList = async (key) => {
        const { UpdateActions, tracklist, shopid } = this.props;
        console.log('Selected Song : ' + tracklist[key].title + ' ' + tracklist[key].artist + ' ' + tracklist[key].img);

        await axios.post('/process/removeSong', {
            title: tracklist[key].title,
            artist: tracklist[key].artist,
            img: tracklist[key].img,
            id: shopid
        });

        const response = await axios.get(`/process/showList/${shopid}`);
        UpdateActions.updatelist(response);
    }

    render() {
        return (
            <div className="outerStyle">
                <div className="innerStyle">
                    {this.props.tracklist.map((data, i) => {
                         return (
                            <ListInfo title={data.title}
                                artist={data.artist}
                                img={data.img}
                                key={i}
                                dataKey={i}
                                onRemoveList={this.onRemoveList.bind(this)} />
                         );
                    })}
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        tracklist: state.update.tracklist
    }),
    (dispatch) => ({
        UpdateActions: bindActionCreators(updateActions, dispatch)
    })
)(ListBox);