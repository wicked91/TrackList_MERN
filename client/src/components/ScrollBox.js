import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as updateActions from '../modules/update';
import SongInfo from './SongInfo';
import axios from 'axios';
import {Table} from 'reactstrap';
import './componentsStyle.css'

class ScrollBox extends Component {

    onAddList = async (key) => {
        const { UpdateActions, listResult, shopid } = this.props;
        console.log('Selected Song : ' + listResult[key].title + ' ' + listResult[key].artist + ' ' + listResult[key].img);

        await axios.post('/process/addSong', {
            title: listResult[key].title,
            artist: listResult[key].artist,
            img: listResult[key].img,
            id: shopid
        });

        const response = await axios.get(`/process/showList/${shopid}`);
        UpdateActions.updatelist(response);
    }

    render() {

        return (
            <div className="outerStyle">
                <div className="innerStyle">
                    <Table striped>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Artist</th>
                                <th>Add</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.listResult.map((data, i) => {
                                return (
                                    <SongInfo title={data.title}
                                        artist={data.artist}
                                        img={data.img}
                                        key={i}
                                        dataKey={i}
                                        flag={true}
                                        onAddList={this.onAddList.bind(this)} />
                                );   
                            })}
                        </tbody>                
                    </Table>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) =>({
        tracklist:state.update.tracklist
    }),
    (dispatch)=>({
        UpdateActions: bindActionCreators(updateActions, dispatch)
    })
)(ScrollBox);