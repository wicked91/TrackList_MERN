import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../style/pageStyle.css'

class MakeShop extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '' };
    }

    render() {
        const { history } = this.props;
        return (
            <div className="MakeShopStyle">
                <Form>
                    <FormGroup>
                        <Label>Shop Name</Label>
                        <Input onChange={(e) => {
                        this.setState({
                            name: e.target.value
                        })
                    }}/>
                    </FormGroup>
                    <Button color="primary" onClick={async () => {
                    try {
                        const response = await axios.get(`/process/addShop/${this.state.name}`);
                        console.log(response);
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

