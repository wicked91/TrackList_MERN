import React, {Component} from 'react';
import {Media, Button, Input } from 'reactstrap';
import './componentsStyle.css'

class ListInfo extends Component {

    onClickhandler = () => {
        const { onRemoveList, dataKey } = this.props;
        onRemoveList(dataKey);
    }

    render(){
        const {title, artist, img} = this.props;
        const imgStyle = {
            height: '50px',
            width: '50px'
        };
        const delStyle = {
            height:'50px'
        }
        return (
            <div className="itemLayout">
                <Media>
                    <Media left top href="#">
                        <div><img src={img} style={imgStyle} alt={"NULL"} /></div>
                    </Media>
                    <Media body>
                        <Media heading>
                            <div className="artistStyle">{artist}</div>
                        </Media>
                            <div className="titleStyle">{title}</div>
                    </Media>
                    <Media>
                        <div><Button color="danger"  style ={delStyle} onClick={this.onClickhandler.bind(this)}>-</Button></div>
                    </Media>
                </Media>
            </div>

        );
    }
}

export default ListInfo;