import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as updateActions from '../modules/update';
import SongInfo from './SongInfo';
import axios from 'axios';
import { Table } from 'reactstrap';
import '../style/componentsStyle.css';

class ScrollBox extends Component {

    onAddList = async (key) => {
        const { UpdateActions, listResult, shopid } = this.props;
        console.log('Selected Song : ' + listResult[key].trackName + ' ' + listResult[key].artistName + ' ' + listResult[key].artworkUrl100);

        try{
            await axios.post('/process/addSong', {
                title: listResult[key].trackName,
                artist: listResult[key].artistName,
                img: listResult[key].artworkUrl100,
                id: shopid
            });
            const response = await axios.get(`/process/showList/${shopid}`);
            UpdateActions.updatelist(response);
        } catch(e){
            console.log(e);
        }
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
                                    <SongInfo title={data.trackName}
                                        artist={data.artistName}
                                        img={data.artworkUrl100}
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
    (state) => ({
        tracklist: state.update.tracklist
    }),
    (dispatch) => ({
        UpdateActions: bindActionCreators(updateActions, dispatch)
    })
)(ScrollBox);