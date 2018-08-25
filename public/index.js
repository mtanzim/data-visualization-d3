var dataset = ['this', 'is', 'a', 'test'];

d3.select('#intro')
  .selectAll('h4')
  .data(dataset)
  // takes data items and performs further operations on it
  .enter()
  .append('h4') // appends paragraph for each data element
  // .text('D3 is awesome!!');
  .text(d => d)
  .style("padding-left", (d,i) => `${i*20+50}px`)
  .attr("class","text-danger");

var datasetBarChart = [80, 100, 56, 120, 180, 30, 40, 120, 160];
var svgWidth = 500, svgHeight = 300, barPadding = 5;
var barWidth = (svgWidth / datasetBarChart.length);
console.log(barWidth);

var svg = d3.select('svg')
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var barChart = svg.selectAll("rect")
  .data(datasetBarChart)
  // takes data from waiting state to 
  .enter()
  // below operations get applied to 
  .append("rect")
  .attr("fill", (d,i) => i % 2 === 0 ? "salmon" : "cyan")
  .attr("y", d=> svgHeight - d )
  .attr("height", d=> d )
  .attr("width", barWidth - barPadding )
  .attr("transform", (d,i) =>{
    var translate = [barWidth * i, 0];
    return `translate(${translate})`;
  } )