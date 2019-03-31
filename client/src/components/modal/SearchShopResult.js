import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as usersAction from 'modules/users';
import * as updateActions from 'modules/update';
import * as baseActions from 'modules/base';
import axios from 'axios';

import ShopInfo from './ShopInfo';
import { Button, ButtonGroup, Input } from 'reactstrap';
import 'style/modalStyle.css';

class SearchShopResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shoplist: []
        };
    };

    searchShopHandler = async () => {
        const { shopname } = this.state;
        const results = await axios.get(`/process/shopList/${shopname}`);
        console.log(results);
        this.setState({
            shoplist: results.data
        });
        
    }

    submitHandler = async (Key) => {
        const { UsersActions, UpdateActions, BaseActions } = this.props;
        const { shoplist } = this.state;

        const response = await axios.get(`/process/showList/${shoplist[Key]._id}`);
        console.log('This is Modal after onClick shopname');
        console.log(response);

        UpdateActions.updatelist(response);
        UsersActions.shopname(shoplist[Key].shopname);
        UsersActions.shopid(shoplist[Key]._id);
        BaseActions.setModal(false);
    }

    render() {
        return (
            <div>
                <div>
                    <div className="SearchBarStyle">
                        <Input onChange={(e) => {
                            this.setState({
                                shopname: e.target.value
                            });
                        }} />
                    </div>
                    <div>
                        <Button color="primary" onClick={this.searchShopHandler.bind(this)}>Search</Button>
                    </div>
                </div>
                <div>
                    <div className="SearchListStyle">
                        <ButtonGroup vertical>
                            {this.state.shoplist.map((data, i) => {
                                return (
                                    <ShopInfo
                                        shopname={data.shopname}
                                        shopid={data.shopid}
                                        key={i}
                                        dataKey={i}
                                        submitHandler={this.submitHandler.bind(this)}
                                    />
                                );
                            })}
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(
    (state) => ({
        modal: state.base.modal,
        shopname: state.users.shopname,
        shopid: state.users.shopid,
        tracklist: state.update.tracklist
    }),
    (dispatch) => ({
        UsersActions: bindActionCreators(usersAction, dispatch),
        UpdateActions: bindActionCreators(updateActions, dispatch),
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(SearchShopResult);