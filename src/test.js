import React, { Component } from 'react';



class Test extends Component {
    
    componentWillMount() {
                this.fetchData();
    }
    
    render() {
        return (
            <div>
                
            </div>
        );
    }
    fetchData() {
                fetch('http://localhost:3000/test')
            .then(({ results }) => this.setState({ person: results }));
    }

}



export default Test;