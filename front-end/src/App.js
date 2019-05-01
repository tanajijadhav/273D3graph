//3rd libs
import React, { Component } from 'react';
import axios from 'axios';
import * as d3 from "d3";
import './App.css';
import LineChart from "./components/LineChart"

class App extends Component {
    constructor(){
        super();

        this.state = {
          data: [],
          margin : {top: 200, right: 200, bottom: 200, left: 200}
        }
    }

    componentDidMount(){
      axios.get("http://localhost:3001/api/graph")
          .then((response) => {
            let graphData = []
            response.data.data.map(elem => {
              let temp = {};
              temp["x"] = parseInt(elem.date)
              temp["y"] = parseInt(elem.value || 0) / 1000000000;
              graphData.push(temp);
            })
            this.setState({
              data:graphData
            })
        });
    }

    render() {
      let output_div = null
        if (this.state.data.length > 0){
          output_div = <LineChart data={this.state.data} margin={this.state.margin} />
        }
        else{
          output_div = <p>No Data</p>
        }
        return (
            <div>
              {output_div}
            </div>
        );
    }
}

export default App;