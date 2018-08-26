/* (function intro (){
  
  var dataset = ['this', 'is', 'an', 'IIFE', 'test'];

  d3.select('#intro')
    .selectAll('h4')
    .data(dataset)
    // takes data items and performs further operations on it
    .enter()
    .append('h4') // appends paragraph for each data element
    // .text('D3 is awesome!!');
    .text(d => d)
    .style("padding-left", (d, i) => `${i * 20 + 50}px`)
    .attr("class", "text-danger");
})(); */

function generateBarChart(dataset, id, isScaled = false, isAxes = false) {
  var axisYoffset = isAxes ? 30 : 0;
  var axisXoffset = isAxes ? 20 : 0;
  var svgWidth = 500, svgHeight = 300, barPadding = 4;
  var barWidth = (svgWidth - axisYoffset - barPadding) / datasetBarChart.length;

  var svg = d3.select(id)
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // axes
  if (isAxes) {
    var xAxisScale = d3.scaleLinear()
      .domain([0, dataset.length])
      .range([0, svgWidth - axisYoffset]);

    var yAxisScale = d3.scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([svgHeight, 0]);

    var x_axis = d3.axisBottom().scale(xAxisScale);
    var y_axis = d3.axisLeft().scale(yAxisScale);

    svg.append("g")
      .attr("transform", `translate(${axisYoffset}, 10)`)
      .call(y_axis);

    svg.append("g")
      .attr("transform", `translate(${axisYoffset + barPadding}, ${svgHeight - axisXoffset + 2})`)
      .call(x_axis);
  }


  // scaling !!
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, svgHeight * 0.9]);

  svg.selectAll("rect")
    .data(dataset)
    // takes data from waiting state to 
    .enter()
    // below operations get applied to 
    .append("rect")
    .attr("fill", (d, i) => i % 2 === 0 ? "salmon" : "cyan")
    .attr("y", d => isScaled ? svgHeight - yScale(d) - axisXoffset : svgHeight - d - axisXoffset)
    .attr("height", d => isScaled ? yScale(d) : d)
    .attr("width", barWidth - barPadding)
    .attr("transform", (d, i) => {
      var translate = [barWidth * i + axisYoffset + barPadding, 0];
      return `translate(${translate})`;
    });

  svg.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .text(d => d)
    .attr('y', d => isScaled ? svgHeight - 10 : svgHeight - d - 10)
    .attr('x', (d, i) => isScaled ? barWidth * i + barWidth / 2 : barWidth * i)
    .attr('fill', 'black ');

}

function generateSVG (id) {
  var svgWidth = 600, svgHeight = 500;
  var svg = d3.select(id)
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    // .attr("class", "svg-demo")
    .attr("background-color", "yellow");

  var line = svg.append("line")
    .attr("x1", 100)
    .attr("x2", 500)
    .attr("y1", 50)
    .attr("y2", 50)
    .attr("stroke", "magenta")
    .attr("stroke-width", 5);

  var rect0 = svg.append("rect")
    .attr("x", 150)
    .attr("y", 100)
    .attr("width", 100)
    .attr("height", 100)
    .attr("fill", "#9B95FF");

  var rect1 = svg.append("rect")
    .attr("x", 350)
    .attr("y", 100)
    .attr("width", 100)
    .attr("height", 100)
    .attr("fill", "#9B95FF");

  var circle = svg.append("circle")
    .attr("cx", 300)
    .attr("cy", 300)
    .attr("r", 45)
    .attr("fill", "#7CE8D5"); 

  var line = svg.append("line")
    .attr("x1", 250)
    .attr("x2", 350)
    .attr("y1", 450)
    .attr("y2", 450)
    .attr("stroke", "magenta")
    .attr("stroke-width", 5);

}


var datasetBarChart = [80, 100, 56, 120, 180, 30, 40, 120, 160];
var scalingDatasetBarChart = [1, 4, 6, 7, 7, 7, 7, 7, 7, 7, 7];
generateBarChart(datasetBarChart, '#svg0');
generateBarChart(scalingDatasetBarChart, '#svg1', true);
generateBarChart(datasetBarChart, '#svg2', false, true);
generateSVG('#svg3');