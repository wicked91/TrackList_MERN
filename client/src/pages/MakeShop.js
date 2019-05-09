import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import '../style/pageStyle.css'

class MakeShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: ''
        };
    }

    render() {
        const { history } = this.props;
        return (
            <div className="MakeShopStyle">
                <h2>Add shop</h2>
                <br />
                <Form>
                    <FormGroup>
                        <Input onChange={(e) => {
                            this.setState({
                                name: e.target.value
                            })
                        }}
                            placeholder="shop name"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input onChange={(e) => {
                            this.setState({
                                address: e.target.value
                            })
                        }}
                            placeholder="shop address"
                        />
                    </FormGroup>
                    <Button color="primary" onClick={async () => {
                        try {
                            const shopinfo = {
                                shopname: this.state.name,
                                address: this.state.address
                            }
                            await axios.post(`/shops`, shopinfo);
                            history.push('/');
                        } catch (e) {
                            console.log(e);
                        }
                    }}>Submit</Button>
                </Form>
            </div>
        );
    }
};

export default MakeShop;

