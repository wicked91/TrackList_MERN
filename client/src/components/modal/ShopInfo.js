import React,{Component} from 'react';
import { Button } from 'reactstrap';
import './modalStyle.css';

class ShopInfo extends Component{
    onClickHandler = () =>{
        const {dataKey, submitHandler} = this.props;
        submitHandler(dataKey);
    }

    render(){
        const {shopname} = this.props;
        return(
            <div className="ShopInfoStyle">
                <Button color="link" onClick={this.onClickHandler.bind(this)}>{shopname}</Button>
            </div>
        );
    }
}

export default ShopInfo;