import React, { Component } from 'react';
import * as d3 from "d3";

class LineChart extends React.Component {

  drawChart = (dataset,margin,maxY) => {
    // console.log("maxY",maxY)
    var margin = {top: 150, right: 150, bottom: 150, left: 150}
    let width = window.innerWidth - margin.left - margin.right  
    let height = window.innerHeight - margin.top - margin.bottom;
    
    var n = dataset.length;

    var xScale = d3.scaleLinear()
    .domain(d3.extent(dataset, function(d) { 
      return new Date(d.x); 
    }))
    .range([0, width]);

    var yScale = d3.scaleLinear()
    .domain([0, maxY])
    .range([height, 0]);

    // line generator called
    var line = d3.line()
    .x(function(d, i) { return xScale(d.x); })
    .y(function(d) { return yScale(d.y); })
    .curve(d3.curveMonotoneX)

    // var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })
    // console.log("----dataset-----\n",dataset)

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
      .call(d3.axisBottom(xScale))
    // y axis component createdxScale
    svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yScale));

      svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width-700)
    .attr("y", height+50)
    .attr("fill","black")
    .text("Year");

    
    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -70)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)") 
    .attr("fill","black")
    .text("Billion");
    
    // line generated
    svg.append("path")
      .datum(dataset)
      .attr("class", "line")
      .attr("d", line);
    
    // circle shown on line
    svg.selectAll(".dot")
      .data(dataset)
      .enter().append("circle")
      .attr("x", (function(d) { return d.x }  ))
      .attr("y", function(d) { return d.y})
      .attr("class", "dot")
      .attr("cx", function(d, i) { return xScale(d.x) })
      .attr("cy", function(d) { return yScale(d.y) })
      .attr("r", 5)

    }

  render() { 

    return (    
      <div>
        {this.drawChart(this.props.data,this.props.margin,this.props.maxY)}
      </div>  
    )
  }
}

export default LineChart;
