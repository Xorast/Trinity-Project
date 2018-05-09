// CHARTS_SERIE_1

// QUEUEING --------------------------------------------------------------------
queue()
    .defer(d3.csv, "assets/data/input_data_example_a.csv")
    .await(makeGraph);

// CHARTS ----------------------------------------------------------------------
function makeGraph(error, inputData) {

    let ndx = crossfilter(inputData);

    // FORMAT - STRING TO DATE & NUMBERS ---------------------------------------
    let parseDate = d3.time.format("%Y-%m-%d").parse;

    inputData.forEach(function(d) {
        d.date = parseDate(d.date);
        d.q = +d.q;
        d.rain = +d.rain;
        d.temp = +d.temp;
        d.ETP_dint = +d.ETP_dint;
        d.peff = +d.peff;
    });

    // Maximum data to be processed. Create an alert / write it cleary somewhere for the user to see.
    inputData = inputData.slice(0, 1095);
    
    // DISPLAY & LAYOUT
    
    let layoutChartMainHeight = 400;
    let layoutChartMainWidth = 1000;

    // CHART I.A1 - BASE FLOW LINECHART ------------------------------------------

    let dimDate = ndx.dimension(dc.pluck("date"));

    var minDate = dimDate.bottom(1)[0].date;
    var maxDate = dimDate.top(1)[0].date;

    let dimTotalFlow = dimDate.group().reduceSum(dc.pluck("q"));

    let chart_I_A1 = dc.compositeChart("#chart_I_A");

    // TO BE SOLVED : BRUSH ON NOT WORKING
    chart_I_A1
        .width(layoutChartMainWidth)
        .height(layoutChartMainHeight)
        .dimension(dimDate)
        .elasticX(true)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .y(d3.scale.linear().domain([0, 2]))
        .yAxisLabel("Flow (M3/DAY)")
        .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .brushOn(true)
        .mouseZoomable(true)
        .compose([
            dc.lineChart(chart_I_A1)
                .colors("blue")
                .group(dimTotalFlow, "Flow - Total"),
        ])
        .render()
    
    // CHART I.B1 - RAIN & ETP ---------------------------------------------------
    
    let dimDateII = ndx.dimension(dc.pluck("date"));
    
        var minDateII = dimDateII.bottom(1)[0].date;
        var maxDateII = dimDateII.top(1)[0].date;
        
    let dimETP = dimDateII.group().reduceSum(dc.pluck("ETP_dint"));
    
    let dimRain = dimDateII.group().reduceSum(dc.pluck("rain"));
    
    let chart_I_B1 = dc.compositeChart("#chart_I_B1");

    // TO BE SOLVED : BRUSH ON NOT WORKING
    chart_I_B1
        .width(layoutChartMainWidth)
        .height(layoutChartMainHeight/2)
        .dimension(dimDateII)
        .elasticX(true)
        .x(d3.time.scale().domain([minDateII, maxDateII]))
        .yAxisLabel("RAIN (MM)")
        .y(d3.scale.linear().domain([0, 50]))
        .rightYAxisLabel("ETP (Units)")
        .rightY(d3.scale.linear().domain([0, 10]))
        .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
        .brushOn(true)
        .mouseZoomable(true)
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .compose([
            dc.barChart(chart_I_B1)
                .colors("purple")
                .group(dimRain, "Rain"),
            dc.lineChart(chart_I_B1)
                .colors("red")
                .group(dimETP, "ETP dint")
                .useRightYAxis(true)
        ])
        .render()
    

    // CHART II.A1 - BASE FLOW BOX PLOT ----------------------------------------    

    let dimFlowNameTotal = ndx.dimension(function(d) { return "Flow - Total" });
    
    let groupFlowBoxTotal = dimFlowNameTotal.group().reduce(
        function(p, v) {
            p.push(v.q);
            return p;
        },
        function(p, v) {
            p.splice(p.indexOf(v.q), 1);
            return p;
        },
        function() {
            return [];
        }
    );

    let chart_II_A1 = dc.boxPlot("#chart_II_A1");

    chart_II_A1
        .width(250)
        .height(500)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .y(d3.scale.linear().domain([-0.1, +1.5]))
        .yAxisLabel("Flow (M3/DAY)")
        .dimension(dimFlowNameTotal)
        .group(groupFlowBoxTotal);
    
        
    // CHART II.B1 - VOLUME - CUMULATIVE RAIN ----------------------------------  
    
    let groupVolumeRain = dimFlowNameTotal.group().reduceSum(dc.pluck("rain"));
    
    let chart_II_B1 = dc.barChart("#chart_II_B1");
    
    chart_II_B1
        .width(250)
        .height(250)
        .dimension(dimFlowNameTotal)
        .group(groupVolumeRain)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Volume (M3)");
    

    // CHART III.A1 - SEASONS PIE CHART ----------------------------------------    

    let dimSeason = ndx.dimension(function(d) { 
        
        switch (true) {
            
            case (d.date.getMonth() === 1 || d.date.getMonth() === 2 || d.date.getMonth() === 3 ):
                
                return "SPRING"; break;  
            
            
            case (d.date.getMonth() === 4 || d.date.getMonth() === 5 || d.date.getMonth() === 6 ):
                
                return "SUMMER"; break;
            
            case (d.date.getMonth() === 7 || d.date.getMonth() === 8 || d.date.getMonth() === 9 ):
                
                return "AUTUMN"; break;  
                
            case (d.date.getMonth() === 10 || d.date.getMonth() === 11 || d.date.getMonth() === 0 ):
                
                return "WINTER"; break;  
                
            default:
                
                return "ERROR SEASON";
        }
    
    });

    let groupSeason = dimSeason.group().reduceCount();
    
    let chart_III_A1 = dc.pieChart("#chart_III_A1");
    
    
    chart_III_A1
        .height(330)
        .radius(100)
        .dimension(dimSeason)
        .group(groupSeason);
        
    // -------------------------------------------------------------------------
    // END OF MAKEGRAPH
    dc.renderAll();
};