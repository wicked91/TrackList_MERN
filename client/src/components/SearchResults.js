import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as shopAction from '../modules/shop';

import SearchResultsInfo from './SearchResultsInfo';
import { Table } from 'reactstrap';
import '../style/componentsStyle.css';

class SearchResults extends Component {

    onAddList = async (key) => {
        const { ShopAction, searchResult, selected_shopid } = this.props;

        const songInfo = {
            shopid: selected_shopid,
            title: searchResult[key].trackName,
            artist: searchResult[key].artistName,
            img: searchResult[key].artworkUrl100
        }

        try {
            await ShopAction.tracklistAdd(songInfo);
        } catch (e) {
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
                            {this.props.searchResult.map((data, i) => {
                                return (
                                    <SearchResultsInfo title={data.trackName}
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
        selected_shopid : state.shop.selected_shopid,
        searchResult: state.search.searchResult
    }),
    (dispatch) => ({
        ShopAction: bindActionCreators(shopAction, dispatch)
    })
)(SearchResults);