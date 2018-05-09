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

    // CHART I.A - BASE FLOW LINECHART ------------------------------------------

    let dimDate = ndx.dimension(dc.pluck("date"));

    var minDate = dimDate.bottom(1)[0].date;
    var maxDate = dimDate.top(1)[0].date;

    let dimTotalFlow = dimDate.group().reduceSum(dc.pluck("q"));

    let dimRain = dimDate.group().reduceSum(dc.pluck("rain"));

    let chart_I_A = dc.compositeChart("#chart_I_A");

    chart_I_A
        .width(1000)
        .height(400)
        .dimension(dimDate)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .y(d3.scale.linear().domain([0, 2]))
        .yAxisLabel("Flow (M3/DAY)")
        .rightY(d3.scale.linear().domain([200, 0]))
        .rightYAxisLabel("Rain")
        .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .mouseZoomable(true)
        .compose([
            dc.lineChart(chart_I_A)
                .colors("blue")
                .group(dimTotalFlow, "Flow - Total")
                .colors("blue")
                .group(dimTotalFlow, "Flow - Total")
                .colors("blue")
                .group(dimTotalFlow, "Flow - Total")
                .colors("blue")
                .group(dimTotalFlow, "Flow - Total"),
            dc.lineChart(chart_I_A)
                .colors("red")
                .group(dimRain, "Rain")
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
        .dimension(dimFlowNameTotal)
        .group(groupFlowBoxTotal);

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
        .group(groupSeason)


    // -------------------------------------------------------------------------
    // END OF MAKEGRAPH
    dc.renderAll();
};