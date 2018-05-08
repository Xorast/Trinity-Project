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
    console.log(dimTotalFlow.top(1)[0]);
    console.log(dimTotalFlow.all())

    let chartBaseFlow = dc.compositeChart("#chart_I_A");
    
    chartBaseFlow
        .width(1000)
        .height(250)
        .dimension(dimDate)
        .x(d3.time.scale().domain([minDate,maxDate]))
        .yAxisLabel("Flow (M3/DAY)")
        .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .compose([
            dc.lineChart(chartBaseFlow)
            .colors("green")
            .group(dimTotalFlow, "Flow - Total")
            ])
        .render()

    // let chartBaseFlow = dc.lineChart("#chart_I_A");
    
    //     chartBaseFlow
    //             .width(1000)
    //             .height(300)
    //             .dimension(dimDate)
    //             .group(dimTotalFlow)
    //             .x(d3.time.scale().domain([minDate,maxDate]))
    //             .xAxisLabel("Date")
    //             .y(d3.scale.linear().domain([0.00,1.50]));


// END OF MAKEGRAPH
      dc.renderAll();
};