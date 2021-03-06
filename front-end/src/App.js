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
          maxY : 0,
          margin : {top: 200, right: 200, bottom: 200, left: 200}
        }
    }

    componentDidMount(){
      axios.get("http://localhost:3001/api/graph")
          .then((response) => {
            let graphData = []
            let max = this.state.maxY
            let scaleDownValue = 1000000000000;
            response.data.data.map(elem => {
              if(elem.country.value="United States"){
                let temp = {};
                temp["x"] = parseInt(elem.date)
                let valueY = parseInt(elem.value || 0) / scaleDownValue;
                temp["y"] = valueY;
                if (max < valueY){
                  max = valueY
                } 
                graphData.push(temp);
              }
            })

            this.setState({
              data:graphData,
              maxY : max
            })
        })
        .catch(err => {
          this.setState({
            data:[]
          })
        })
    }

    render() {
      let output_div = null
        if (this.state.data.length > 0){
          output_div = <LineChart data={this.state.data} margin={this.state.margin} maxY={this.state.maxY} />
        }
        else{
          output_div = <p style={{marginLeft:"47%","marginTop":"18%",fontSize:"3pc",color:"grey"}}>No Data</p>
        }
        return (
            <div>
              {/* <h2 style={{marginLeft:"41%",color:"darkslategrey"}}>
                USA GDP Projection
              </h2> */}
              {output_div}
            </div>
        );
    }
}

export default App;