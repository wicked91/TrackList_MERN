import React from 'react';
import { Button, Input } from 'reactstrap';
import './componentsStyle.css'

const SearchBar = ({onChange, onSearch}) => {
    return(
        <div className="layout">
            <div className="SearchBarInput">
                <Input onChange ={onChange} placeholder="Search Song"/>        
            </div>
            <div className="SearchBarButton">
                <Button color="primary" onClick={onSearch}>Search</Button>
            </div>
        </div>
    );
};

export default SearchBar;