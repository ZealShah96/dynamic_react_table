import React, { Component } from 'react';
import { Row, Col, Container } from "react-bootstrap";
import { CamelCase,UpperCase  } from "react-lodash"
import {onChangeDataSave} from './datastorage/index'


export default class Zeal extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        ;
        let required_fields = this.props.required_fields;
        let output = [];
        output.push(<br />);
        required_fields.forEach((element) => {
            output.push(<span><UpperCase string={element}/></span>);
            output.push(<span> </span>);
            output.push(<span><input placeholder='enter your value here' value={this.findValues(element)}
            onChange={(e)=>{this.dataChange(this.props.index,element,e)}} onKeyUp={this.props.fetchData}/></span>);
            output.push(<span> </span>);
        })
        return output;
    }

    findValues(key){
        if(this.props.values!=null){
            return this.props.values[key];
        }
    }

    dataChange(index,element,e){
        onChangeDataSave(index,element,e)
     
    }
}