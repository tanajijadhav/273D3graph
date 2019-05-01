import React, { Component } from 'react';
import * as d3 from "d3";

class LineChart extends React.Component {

  drawChart = (dataset,margin,maxY) => {
    // console.log("maxY",maxY)
    let paddingForText = 15
    var margin = {top: 150, right: 150, bottom: 150, left: 150}
    let width = window.innerWidth - margin.left - margin.right  
    let height = window.innerHeight - margin.top - margin.bottom;
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    
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
      .style("font-size","15px"); 

    // y axis component createdxScale
    svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yScale))
      .style("font-size","15px"); 

      svg.append("text")
    .style("font-size", "34px")
    .style("fill", "#000000")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("class","legend")
    .attr("x", width-750)
    .attr("y", height+75)
    .attr("fill","black")
    .text("Year");
    
    svg.append("text")
    .style("font-size", "34px")
    .style("fill", "#000000")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("class","legend")
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
      .attr("class", "dot")
      .attr("cx", function(d, i) { return xScale(d.x) })
      .attr("cy", function(d) { return yScale(d.y) })
      .attr("r", 5)
      .attr("x", function(d) {
        // console.log(x(d.x) - paddingForText)
        return x(d.x) - paddingForText
    })
    .attr("y", function(d) {
        // console.log(y(d.y) + paddingForText)
        return y(d.y) + paddingForText
    })
    .text(function(d) {
        console.log(d.x+" "+d.y)
        return d.x+" "+d.y
    });

    //title
    svg.append("text")
    .attr("x", width / 2 )
    .attr("y", -10)
    .attr("class", "title")
    .style("text-anchor", "middle")
    .style("font-size", "200%")
    .text("USA GDP Projection")
    .style("fill", "black")
     
    //label
    svg.append("g").selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .attr("x", function(d) {
        return x(d.x) - paddingForText
    })
    .attr("y", function(d) {
        return y(d.y) + paddingForText
    })
    .attr("fill", "red")
    .text(function(d) {
        return d.x
    })
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")") 


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
