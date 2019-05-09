import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as shopAction from 'modules/shop';
import * as baseActions from 'modules/base';
import axios from 'axios';

import ShopInfo from './ShopInfo';
import { Button, ButtonGroup, Input } from 'reactstrap';
import 'style/modalStyle.css';

class SearchShopResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
            shoplist: []
        };
    };

    searchShopHandler = async () => {
        const { keyword } = this.state;
        const response = await axios.get(`/shops/search/${keyword}`);
        this.setState({
            shoplist: response.data.shops
        });
    }

    submitHandler = async (Key) => {
        const { ShopAction, BaseActions } = this.props;
        const { shoplist } = this.state;

        const shopInfo = {
            selected_shopid: shoplist[Key]._id,
            selected_shopname: shoplist[Key].shopname
        }

        await ShopAction.tracklistRead(shopInfo);
        BaseActions.setModal(false);
    }

    render() {
        return (
            <div>
                <div>
                    <div className="SearchBarStyle">
                        <Input onChange={(e) => {
                            this.setState({
                                keyword: e.target.value
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
        tracklist: state.shop.tracklist
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        ShopAction: bindActionCreators(shopAction, dispatch)
    })
)(SearchShopResult);