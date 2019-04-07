import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as searchAction from '../modules/search';
import * as usersActions from '../modules/users';
import * as updateActions from '../modules/update';

import SearchBar from '../components/SearchBar';
import ScrollBox from '../components/ScrollBox';
import ListBox from '../components/ListBox';

import '../style/pageStyle.css';
import '../style/ShopPageStyle.css';

class ShopPage extends Component {

    render() {
        const { handleChange, handleSearch } = this;
        const { shopname, shopid } = this.props;

        return (
            <div className="ShopPageMain">
                <div className = "tagStyle">
                    <h5>{shopname} 추천 List</h5>
                </div>
                <div className="Header">
                    <SearchBar onChange={handleChange}
                        onSearch={handleSearch} />
                </div>
                <div className="Body">
                    <div className="SearchStyle">
                        <ScrollBox shopid={shopid} />
                    </div>
                    <div className="ListStyle">
                        <ListBox shopid={shopid} />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        shopname: state.users.shopname,
        shopid: state.users.shopid,
    }),
    (dispatch) => ({
        SearchActions: bindActionCreators(searchAction, dispatch),
        UsersActions: bindActionCreators(usersActions, dispatch),
        UpdateActions: bindActionCreators(updateActions, dispatch)
    })
)(ShopPage);
