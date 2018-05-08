// CHARTS_SERIE_1

// QUEUEING
queue()
    .defer(d3.csv, "assets/data/input_data_example_a.csv")
    .await(makeGraph);

// CHARTS
function makeGraph(error, inputData) {
    
    let ndx = crossfilter(inputData);

    // FORMAT
    let parseDate = d3.time.format("%Y/%m/%d").parse;
    
    inputData.forEach(function(d) {
        d.date = parseDate(d.date);
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
    
    let dateDim = ndx.dimension(dc.pluck("date"));


// END OF MAKEGRAPH
    dc.renderAll();
};