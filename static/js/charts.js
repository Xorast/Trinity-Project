// JAVASCRIPT
// CHARTS
// Scripts generating the charts (DC / D3 / Crossfilter)
        

queue()
    .defer(d3.csv, data_source)
    .await(makeGraph);


// Maximum data to be processed (If changed, update info in "upload.html")
var maxDataRow = 1095;

var chart_I_A1 = dc.compositeChart("#chart_I_A");
var chart_I_B1 = dc.compositeChart("#chart_I_B1");

function makeGraph(error, inputData) {

    inputData = inputData.slice(0, maxDataRow);
    let ndx = crossfilter(inputData);
    

    // FORMAT - STRING TO DATE & NUMBERS ---------------------------------------

    let parseDate = d3.time.format("%Y-%m-%d").parse;

    inputData.forEach(function(d) {
        d.date      = parseDate(d.date);
        d.q         = +d.q;
        d.rain      = +d.rain;
        d.temp      = +d.temp;
        d.ETP_dint  = +d.ETP_dint;
        d.peff      = +d.peff;
    });
    
    
    // UTILS ------------------------------------------------------------------
    // Enables ElasticX to work when zooming in another chart.
    function remove_empty_bins(source_group) {
        return {
            all: function() {
                return source_group.all().filter(function(d) {
                    return d.value != 0;
                });
            }
        };
    }
    
    // CHARTS ------------------------------------------------------------------

    // CHART I.A1 - BASE FLOW LINECHART

    let dimDate = ndx.dimension(dc.pluck("date")); // v["date"]
    var minDate = dimDate.bottom(1)[0].date;
    var maxDate = dimDate.top(1)[0].date;

    let groupTotalFlow = dimDate.group().reduceSum(dc.pluck("q"));
    let groupFilteredTotalFlow  = remove_empty_bins(groupTotalFlow);
    
    let groupBaseFlow = dimDate.group().reduceSum(dc.pluck("baseflow_1"));
    let groupFilteredBaseFlow = remove_empty_bins(groupBaseFlow);

    // let chart_I_A1           = dc.compositeChart("#chart_I_A");

    chart_I_A1
        .dimension(dimDate)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .y(d3.scale.linear().domain([0, 1.5]))
        .yAxisLabel("FLOW (M3/DAY)", 20)
        .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .mouseZoomable(true)
        .brushOn(true)
        .compose([
            dc.lineChart(chart_I_A1)
                .colors("#fd7e14")
                .group(groupFilteredTotalFlow, "Flow - Total"),
            dc.lineChart(chart_I_A1)
                .colors("#6610f2")
                .group(groupFilteredBaseFlow, "Flow - Baseflow 1")
        ])
        .render()
        .renderLabel(true)
        .xAxis().tickFormat(d3.time.format("%d-%B-%y"));
    
    // CHART I.B1 - RAIN & ETP 
    
    let dimDateII = ndx.dimension(dc.pluck("date"));
    var minDateII = dimDateII.bottom(1)[0].date;
    var maxDateII = dimDateII.top(1)[0].date;
        
    let groupRain = dimDateII.group().reduceSum(dc.pluck("rain"));
    let groupFilteredRain = remove_empty_bins(groupRain);

    let groupETP = dimDateII.group().reduceSum(dc.pluck("ETP_dint"));
    let groupFilteredETP = remove_empty_bins(groupETP);
    
    // let chart_I_B1         = dc.compositeChart("#chart_I_B1");

    chart_I_B1
        .dimension(dimDateII)
        .x(d3.time.scale().domain([minDateII, maxDateII]))
        .y(d3.scale.linear().domain([0, 50]))
        .yAxisLabel("RAIN (MM)", 20)
        .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
        .elasticX(true)
        .rightYAxisLabel("ETP (Units)", 20)
        .rightY(d3.scale.linear().domain([0, 10]))
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .mouseZoomable(false)
        .brushOn(false)
        .compose([
            dc.barChart(chart_I_B1)
                .colors("#6f42c1")
                .group(groupFilteredRain, "Rain"),
            dc.lineChart(chart_I_B1)
                .colors("#CC0000")
                .group(groupFilteredETP, "ETP dint")
                .useRightYAxis(true)
        ])
        .render()
        .renderLabel(true)
        .xAxis().tickFormat(d3.time.format("%d-%B-%y"));

    // CHART II.A1 - FLOW BOX PLOT TOTAL  

    let dimFlowTotal = ndx.dimension(function(d) { return "Flow - Total" });
    
    let groupFlowBoxTotal = dimFlowTotal.group().reduce(
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
        .y(d3.scale.linear().domain([-0.1, +1.2]))
        .yAxisLabel("FLOW (M3/DAY)", 20)
        .dimension(dimFlowTotal)
        .group(groupFlowBoxTotal);
    
    // CHART II.A2 - FLOW BOX PLOT - METHOD 1 
    
    let dimFlow1 = ndx.dimension(function(d) { return "Base Flow Method 1" });
    
    let groupFlowBox1 = dimFlow1.group().reduce(
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

    let chart_II_A2 = dc.boxPlot("#chart_II_A2");

    chart_II_A2
        .y(d3.scale.linear().domain([-0.1, +1.2]))
        .yAxisLabel("METHOD 1 - FLOW (M3/DAY)", 20)
        .dimension(dimFlow1)
        .group(groupFlowBox1);
    
    // CHART II.A3 - FLOW BOX PLOT - METHOD 2 
    
    let dimFlow2 = ndx.dimension(function(d) { return "Base Flow Method 2" });
    
    let groupFlowBox2 = dimFlow2.group().reduce(
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

    let chart_II_A3 = dc.boxPlot("#chart_II_A3");

    chart_II_A3
        .y(d3.scale.linear().domain([-0.1, +1.2]))
        .yAxisLabel("METHOD 2 - FLOW (M3/DAY)", 20)
        .dimension(dimFlow2)
        .group(groupFlowBox2);
    
    // CHART II.A4 - FLOW BOX PLOT - METHOD 3 
        
    let dimFlow3 = ndx.dimension(function(d) { return "Base Flow Method 3" });
    
    let groupFlowBox3 = dimFlow3.group().reduce(
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

    let chart_II_A4 = dc.boxPlot("#chart_II_A4");

    chart_II_A4
        .y(d3.scale.linear().domain([-0.1, +1.2]))
        .yAxisLabel("METHOD 3 - FLOW (M3/DAY)", 20)
        .dimension(dimFlow3)
        .group(groupFlowBox3);

    // CHART II.B1 - VOLUME - CUMULATIVE RAIN 

    let groupVolumeRain = dimFlowTotal.group().reduceSum(dc.pluck("rain"));
    let chart_II_B1 = dc.barChart("#chart_II_B1");
    
    chart_II_B1
        .dimension(dimFlowTotal)
        .group(groupVolumeRain)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Cumulated Rain (MM)", 10)
        .margins({ top: 10, right: 50, bottom: 50, left: 50 });

    // CHART III.A1 - SEASONS PIE CHART     

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
        .dimension(dimSeason)
        .group(groupSeason);
        
     
    // DISPLAY & LAYOUT  -------------------------------------------------------
    
    // CHARTS - SERIE I
    // Empty.
    
    // CHARTS - SERIE II
    
    let arrayChart_II = [chart_II_A1,chart_II_A2,chart_II_A3,chart_II_A4];
    
    function layoutChart_II (chart) {
        return chart.margins({ top: 50, right: 50, bottom: 50, left: 50 });
    }

    for (let i in arrayChart_II) {
        var taille = layoutChart_II(arrayChart_II[i]);
    };

    // CHARTS - SERIE III
    // Empty.
    
    // RENDERING
    dc.renderAll();
    
    // CHARTS - ALL SERIES
    d3.selectAll("svg").classed("svg-content", true);
    
};

function resetAll() {
    dc.filterAll();
    dc.renderAll();
}