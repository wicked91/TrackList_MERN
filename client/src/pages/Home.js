import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as shopAction from '../modules/shop';
import * as usersAction from '../modules/users';
import * as baseAction from '../modules/base';

import SearchShopResult from '../components/modal/SearchShopResult'
import { Button, Form, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import '../style/pageStyle.css';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            age: '',
            gender: ''
        }
    }

    render() {
        const { BaseActions, history, modal, selected_shopname } = this.props;

        return (
            <div className="HomeStyleOuter">
                <h2>Please sign in</h2>
                <br />
                <Form>
                    <FormGroup>
                        <Input onChange={(e) => {
                            this.setState({
                                nickname: e.target.value
                            });
                        }} 
                        placeholder="nick name"/>
                    </FormGroup>
                    <FormGroup>
                        <Input onChange={(e) => {
                            this.setState({
                                age: e.target.value
                            });
                        }} 
                        placeholder="age"/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="select" onChange={(e) => {
                            this.setState({
                                gender: e.target.value
                            });
                        }}
                        defaultValue="gender">
                        {/* <option disabled selected>gender</option> */}
                        <option>Male</option>
                        <option>Female</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Input onClick={()=>{
                            BaseActions.setModal(true);
                            console.log(selected_shopname);
                            }} 
                            value={selected_shopname} 
                            placeholder="shop name" 
                            readOnly/>
                        <Modal isOpen={modal} className={this.props.className}>
                            <ModalHeader>Search Shop</ModalHeader>
                            <ModalBody>
                                <SearchShopResult/>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={()=>{BaseActions.setModal(false)}}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </FormGroup>

                    <Button color="link" onClick={() => {
                        history.push('/makeshop');
                    }}>Add Shop</Button>
                    <br />
                    <br />
                    <Button color="primary" onClick={() => {
                        const { nickname, age, gender } = this.state;
                        const { UsersActions } = this.props;

                        const userInfo = {
                            nickname,
                            age,
                            gender
                        }

                        UsersActions.createUser(userInfo);
                        history.push('/shoppage');
                    }}>Submit</Button>

                </Form>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        modal: state.base.modal,
        nickname: state.users.nickname,
        age: state.users.age,
        gender: state.users.gender,
        selected_shopname : state.shop.selected_shopname
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseAction, dispatch),
        UsersActions: bindActionCreators(usersAction, dispatch),
        ShopAction: bindActionCreators(shopAction, dispatch)
    })
)(Home);