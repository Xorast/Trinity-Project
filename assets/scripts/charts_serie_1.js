// CHARTS_SERIE_1

// QUEUEING
queue()
    .defer(d3.csv, "assets/data/input_data_example_a.csv")
    .await(makeGraph);

// CHARTS
function makeGraph(error, inputData) {
    
    let ndx = crossfilter(inputData);

    // FORMAT - STRING TO DATE & NUMBERS
    let parseDate = d3.time.format("%Y-%m-%d").parse;
    
    inputData.forEach(function(d) {
        d.date = parseDate(d.date);
    });
    
    inputData.forEach(function(d) {
        d.q = parseFloat(d.q);
    });
    
    inputData.forEach(function(d) {
        d.rain = parseFloat(d.rain);
    });
    
    inputData.forEach(function(d) {
        d.temp = parseFloat(d.temp);
    });
    
    inputData.forEach(function(d) {
        d.ETP_dint = parseFloat(d.ETP_dint);
    });
    
    inputData.forEach(function(d) {
        d.peff = parseFloat(d.peff);
    });
    
    
    // CHART I.A - BASE FLOW 
    
    let dimDate = ndx.dimension(dc.pluck("date"));
    
        var minDate = dimDate.bottom(1)[0].date;
        var maxDate = dimDate.top(1)[0].date;
        
    let dimTotalFlow = dimDate.group().reduceSum(dc.pluck("q"));
    
    let dimRain = dimDate.group().reduceSum(dc.pluck("rain"));

    let chartBaseFlow  = dc.compositeChart("#chart_I_A");
    
    chartBaseFlow
        .width(1000)
        .height(400)
        .dimension(dimDate)
        .x(d3.time.scale().domain([minDate,maxDate]))
        .y(d3.scale.linear().domain([0,2]))
        .yAxisLabel("Flow (M3/DAY)")
        .rightY(d3.scale.linear().domain([200,0]))
        .rightYAxisLabel("Rain")
        .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .mouseZoomable(true)
        .compose([
            dc.lineChart(chartBaseFlow)
                .colors("blue")
                .group(dimTotalFlow, "Flow - Total")
                .colors("blue")
                .group(dimTotalFlow, "Flow - Total")
                .colors("blue")
                .group(dimTotalFlow, "Flow - Total")
                .colors("blue")
                .group(dimTotalFlow, "Flow - Total"),
            dc.lineChart(chartBaseFlow)
                .colors("red")
                .group(dimRain, "Rain")
                .useRightYAxis(true)
            ])
        .render()

// -----------------------------------------------------------------------------------------
// var chart = dc.boxPlot("#box-test"),
//     pie = dc.pieChart("#pie-chart");
// d3.csv("morley.csv").then(function(experiments) {
//   experiments.forEach(function(x) {
//     x.Speed = +x.Speed;
//   });
//   var ndx                 = crossfilter(experiments),
//       runDimension        = ndx.dimension(function(d) {return +d.Run;}),
//       runGroup            = runDimension.group(),
//       experimentDimension = ndx.dimension(function(d) {return "exp-" + d.Expt;}),
//       speedArrayGroup     = experimentDimension.group().reduce(
//         function(p,v) {
//           p.push(v.Speed);
//           return p;
//         },
//         function(p,v) {
//           p.splice(p.indexOf(v.Speed), 1);
//           return p;
//         },
//         function() {
//           return [];
//         }
//       );
//   chart
//     .width(768)
//     .height(480)
//     .margins({top: 10, right: 50, bottom: 30, left: 50})
//     .dimension(experimentDimension)
//     .group(speedArrayGroup)
//     .elasticY(true)
//     .elasticX(true);


// END OF MAKEGRAPH
      dc.renderAll();
};