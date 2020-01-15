import React, { Component } from 'react';
import { Row, Col, Container } from "react-bootstrap";
import Zeal from './row';
import { getAllData, AddAData, RemoveAData, onChangeDataSave,getData,setData } from './datastorage/index';

export default class Table extends Component {
    constructor(props) {
        super(props)
        this.fetchData = this.fetchData.bind(this);
        this.state = {
            required_fields: this.props.context.required_fields,
            rows: this.props.context.rows,
            intialDataNotSet:true,
            dataUpdate:true
        }
    }

    render() {
        return (
            <Container>
                <div>
                    {
                        this.refreshRows()
                      
                    }
                   
                    <br />
                    <button name='Add' value='Add' onClick={(e) => this.AddARow()}>Add</button>
                </div>
            </Container>
        )
    }

    

    refreshRows() {
        let rows = [];
       
        this.state.rows.map((element, index) => {
            
            if(this.state.intialDataNotSet){
                let str='intialDataNotSet';
                this.setState({intialDataNotSet:false},()=>{
                console.log(`${str} changed to false!!!!`)
                });
                setData(element);
            }
           
            rows.push(
                <div>
                    <Zeal required_fields={this.state.required_fields} values={element.values} index={index} fetchData={this.fetchData}/>
                    <button name="remove" index={index} onClick={() => this.removeRow(index)}  >remove</button>
                </div>
            );
        });
        return rows;
    }

    AddARow() {        
        AddAData();
        this.fetchData();
    }

    fetchData() {
      
        this.setState({ rows: getData() }, () => {
            console.log('Data is set!!!!');
        });
    }


    removeRow(removeIndex) {
        
        let rows = getData();
        RemoveAData(removeIndex);
        this.fetchData();
    }

}