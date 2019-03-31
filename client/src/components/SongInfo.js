import React, { Component } from 'react';
import {Button } from 'reactstrap';
import '../style/componentsStyle.css';

class SongInfo extends Component {

    onClickhandler = () => {
        const { dataKey, onAddList } = this.props;
        onAddList(dataKey);
    }

    render() {
        const imgStyle = {
            height: '50px',
            width: '50px'
        };
        return (
            <tr>
                <td>{<img src={this.props.img} style={imgStyle} alt={"No Img"} />}</td>
                <td>{this.props.title}</td>
                <td>{this.props.artist}</td>
                <td>           
                    <Button color="primary" onClick={this.onClickhandler.bind(this)}>+</Button>
                </td>
            </tr>
        );
    }
}

export default SongInfo;