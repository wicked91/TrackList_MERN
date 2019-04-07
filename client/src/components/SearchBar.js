import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as searchAction from '../modules/search';
import '../style/componentsStyle.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ""
        }
    }

    onSubmitHandler = async () => {
        const { SearchActions } = this.props;
        try {
            await SearchActions.getSearchMusicResult(this.state.keyword);
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div className="layout">
                <div className="SearchBarInput">
                    <Input onChange={(e) => {
                        this.setState({
                            keyword: e.target.value
                        });
                    }}
                        placeholder="Search Song" />
                </div>
                <div className="SearchBarButton">
                    <Button color="primary" onClick={this.onSubmitHandler.bind()}>Search</Button>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        SearchActions: bindActionCreators(searchAction, dispatch)
    })
)(SearchBar);