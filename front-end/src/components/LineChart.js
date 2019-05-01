import React, { Component } from 'react';
import * as d3 from "d3";

let drawChart = (dataset,margin) => {
    // var margin = {top: 200, right: 100, bottom: 100, left: 100}
    let width = window.innerWidth - margin.left - margin.right  
    let height = window.innerHeight - margin.top - margin.bottom;
    
    var n = dataset.length;

    var xScale = d3.scaleLinear()
    .domain([0, n-1])
    .range([0, width]);

    var yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([height, 0]);

    // line generator called
    var line = d3.line()
    .x(function(d, i) { return xScale(i); })
    .y(function(d) { return yScale(d.y); })
    .curve(d3.curveMonotoneX)

    var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })
    console.log("----dataset-----\n",dataset)

    //svg created
    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // x axis component created
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

    // y axis component created
    svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yScale));
    
    // line generated
    svg.append("path")
      .datum(dataset)
      .attr("class", "line")
      .attr("d", line);
    
    // circle shown on line
    svg.selectAll(".dot")
      .data(dataset)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", function(d, i) { return xScale(i) })
      .attr("cy", function(d) { return yScale(d.y) })
      .attr("r", 5);
}

class LineChart extends React.Component {
  constructor(){
      super();

      this.state = {
        index : 0
      }
    }

  render() { 

    return (    
      <div>
        {drawChart(this.props.data,this.props.margin)}
      </div>  
    )
  }
}

export default LineChart;