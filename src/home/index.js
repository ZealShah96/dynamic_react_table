import React, { Component } from 'react';
import { thisExpression } from '@babel/types';
import { Row, Col, Container } from "react-bootstrap";

//var node_env=process.env.ENV_VARIABLE;


export default class Logic extends Component {
    constructor(props) {
        super(props)

        this.state = {
            materialCount: 1,
           url:'https://bin-packing-back-end.herokuapp.com/',
            //url: 'http://localhost:4000/' ,
            arrayOfSizeOfBins: '',
            arrayOfMaterialSizeToFit: '',
            finalSolutionInStatement:''
        }
    }

    render() {
        return (
            <Container>
                {/* {
                    this.createDropDown()
                } */}
                {
                    this.createTextBox()

                }
                
                <button name='submit' value='submit' onClick={(e) => this.createArrays()}>submit</button>
                <hr/>
                <Row>Final answer will be here!!!!</Row>
                {
                    this.state.finalSolutionInStatement
                }
            </Container>
        )
    }

    createArrays() {
        let arrayOfSizeOfBins = this.state.arrayOfSizeOfBins.trimLeft(',').split(',');
        let arrayOfMaterialSizeToFit = this.state.arrayOfMaterialSizeToFit.trimLeft(',').split(',');
        let finalarrayOfSizeOfBins = [];
        let finalarrayOfMaterialSizeToFit = [];
        arrayOfSizeOfBins.map((element, index) => {
            finalarrayOfSizeOfBins.push([index+1, parseInt(element)]);
            console.log(index + '    ' + element);
        });
        arrayOfMaterialSizeToFit.map((element, index) => {
            finalarrayOfMaterialSizeToFit.push([index+1, parseInt(element), 1]);
            console.log(index + '    ' + element + '   ' + 1);
        });
        this.sendPostRequest(finalarrayOfSizeOfBins,finalarrayOfMaterialSizeToFit);
    }

    createDropDown() {
        let listOfOptions = [];
        for (let index = 0; index < 51; index++) {
            listOfOptions.push(<option value={index}>
                {index}
            </option>);
        }
        return (
            <Row>
                <Col>
                    Enter how many different material ypou have?
                </Col>
                <Col>
                    <select name={'dropdownselection'} onChange={(e) => this.chnageBinCount(e)}>
                        {
                            listOfOptions
                        }
                    </select>
                </Col>
            </Row>
        )
    }

    chnageBinCount(e) {
      
        this.setState({ materialCount: e.target.value }, () => {
           // finalAnswers=finalAnswers+`bin counts are change to ${this.state.materialCount}!!!!`;
            console.log(`bin counts are change to ${this.state.materialCount}!!!!`)
            //console.log(finalAnswers);
        })
       
    }

    //Sending a post request.
    sendPostRequest(finalarrayOfSizeOfBins,finalarrayOfMaterialSizeToFit) {
        fetch(`${this.state.url}logic`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                arrayOfSizeOfBins:finalarrayOfSizeOfBins ,
                arrayOfMaterialSizeToFit:finalarrayOfMaterialSizeToFit ,
            })
        }).then(res=>res.json()).then(res=>{
            this.HowBinPackSolution(res);
            console.log(1);
        }).catch(err=>{
            console.log(err);
        })
    }

 HowBinPackSolution(solution) {
     
    let finalAnswers='Please cut material in this sequence';
    let materialsUnFilled='Can\'t fit materials with this size :- ';
    solution.bins.forEach(element => {
      //  console.log(`Bin No:-${element.bin_id} will have ${element.materialsId.join(',')}.`);
        //finalAnswers=finalAnswers+`Bin No:-${element.bin_id} will have ${element.materialsId.join(',')}.\n`;
        element.materials.forEach(element1=>{
            finalAnswers=finalAnswers+` ${element1.size}`;
        })
    });

    
   
    finalAnswers=finalAnswers.padEnd(finalAnswers.length+1,'.');
    alert(finalAnswers);
    if( solution.materialsWhichIsUnfilled.length>0){
        solution.materialsWhichIsUnfilled.forEach(element=>{
            materialsUnFilled=materialsUnFilled+`${element.size}`;
        })
        alert(materialsUnFilled);
        finalAnswers=finalAnswers+'\n'+materialsUnFilled;
    }
    
    this.setState({finalSolutionInStatement:finalAnswers},()=>{
        console.log('answer found!!!!');
    });
}
    chnageValueInState(index, e) {

        switch (e.target.name) {
            case 'mn':
                break;
            case 'ms':
                this.setState({ arrayOfSizeOfBins: e.target.value }, () => {
                    console.log(`bin size  values list ${this.state.arrayOfSizeOfBins}`)
                });
                break;
            case 'lopms':
                this.setState({ arrayOfMaterialSizeToFit: e.target.value }, () => {
                    console.log(`MaterialSizeToFit  values list ${this.state.arrayOfMaterialSizeToFit}`)
                });

                break;
        }



    }

    //Textbox creation.
    createTextBox() {
        let listOfTextBox = [];

        for (let index = 0; index < parseInt(this.state.materialCount); index++) {
            listOfTextBox.push(

                <Row width={100}>

                    <div>
                        <Col>
                            <div>Enter your materials name.</div>
                        </Col>
                        <Col align={'center'}>
                            <input name={`mn`} data-name={`${index}_textBox_material_name`} onChange={(e) => this.chnageValueInState(index, e)} />
                        </Col>
                    </div>
                    <div>
                        <Col>
                            <div>Enter size of material avaiable.</div>
                        </Col>
                        <Col>
                            <input name={`ms`} data-name={`${index}_textBox_size`} onChange={(e) => this.chnageValueInState(index, e)} />
                        </Col>
                    </div>

                    <div>
                        <Col>
                            <div>Enter your materials partition sizes with comma seperate.</div>
                        </Col>
                        <Col>
                            <input name={`lopms`} data-name={`${index}_textBox_list_of_part_of_materials`} onChange={(e) => this.chnageValueInState(index, e)} />
                        </Col>
                    </div>

                </Row>

            )
        }
        return listOfTextBox;
    }
}
