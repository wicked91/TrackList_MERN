import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as shopActions from '../modules/shop';

import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import TrackList from '../components/TrackList';

import '../style/pageStyle.css';
import '../style/ShopPageStyle.css';

class ShopPage extends Component {

    render() {
        const { handleChange, handleSearch } = this;
        const { selected_shopname } = this.props;

        return (
            <div className="ShopPageMain">
                <div className = "tagStyle">
                    <h5>{selected_shopname} 추천 List</h5>
                </div>
                <div className="Header">
                    <SearchBar onChange={handleChange}
                        onSearch={handleSearch} />
                </div>
                <div className="Body">
                    <div className="SearchStyle">
                        <SearchResults />
                    </div>
                    <div className="ListStyle">
                        <TrackList />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        selected_shopname: state.shop.selected_shopname
    }),
    (dispatch) => ({
        ShopActions: bindActionCreators(shopActions, dispatch)
    })
)(ShopPage);
