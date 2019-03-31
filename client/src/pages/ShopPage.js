import React, { Component } from 'react';
import axios from 'axios';
import update from 'react-addons-update';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as keywordActions from '../modules/keyword';
import * as usersActions from '../modules/users';
import * as updateActions from '../modules/update';

import SearchBar from '../components/SearchBar';
import ScrollBox from '../components/ScrollBox';
import ListBox from '../components/ListBox';

import '../style/pageStyle.css';
import '../style/ShopPageStyle.css';

class ShopPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listResult: []
        }
    }

    handleSearch = async () => {
        const { title } = this.props;
        console.log("search Keyword : " + title);
        try {
            this.setState({
                listResult: update(this.state.listResult, {
                    $splice: [[0, 20]]
                })
            });

            const response = await axios.get(`/process/search/${title}`);

            for (let index in response.data) {
                const title = response.data[index].title[0];
                const artist = response.data[index]["maniadb:artist"][0].name[0];
                const img = response.data[index]["maniadb:album"][0].image[0];

                this.setState({
                    listResult: update(this.state.listResult, {
                        $push: [{ "title": title, "artist": artist, "img": img }]
                    })
                });
            }

            console.log(this.state.listResult);
        } catch (e) {
            console.log(e);
        }
    }

    handleChange = (e) => {
        const { KeywordActions } = this.props;
        KeywordActions.search(e.target.value);
    }

    render() {
        const { handleChange, handleSearch } = this;
        const { nickname, shopname, shopid } = this.props;

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
                        <ScrollBox listResult={this.state.listResult}
                            shopid={shopid} />
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
        title: state.keyword.title,
        nickname: state.users.nickname,
        age: state.users.age,
        gender: state.users.gender,
        shopname: state.users.shopname,
        shopid: state.users.shopid,
        tracklist: state.update.tracklist
    }),
    (dispatch) => ({
        KeywordActions: bindActionCreators(keywordActions, dispatch),
        UsersActions: bindActionCreators(usersActions, dispatch),
        UpdateActions: bindActionCreators(updateActions, dispatch)
    })
)(ShopPage);
