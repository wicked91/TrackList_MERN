import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as usersAction from '../modules/users';
import * as baseAction from '../modules/base';

import SearchShopResult from '../components/modal/SearchShopResult'
import { Button, Form, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './pageStyle.css';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            age: '',
            gender: '',
            shopname: '',
            shopid: ""
        }
    }

    render() {
        const { BaseActions, history, modal, shopname } = this.props;

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
                        <Input onClick={()=>{BaseActions.setModal(true)}} value={shopname} placeholder="shop name" readOnly/>
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
                    }}>Make Shop</Button>
                    <br />
                    <br />
                    <Button color="primary" onClick={() => {
                        const { nickname, age, gender } = this.state;
                        const { UsersActions } = this.props;

                        UsersActions.nickname(nickname);
                        UsersActions.age(age);
                        UsersActions.gender(gender);

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
        shopname: state.users.shopname,
        shopid: state.users.shopid
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseAction, dispatch),
        UsersActions: bindActionCreators(usersAction, dispatch)
    })
)(Home);