// CHARTS_SERIE_1

// QUEUEING --------------------------------------------------------------------
queue()
    .defer(d3.csv, "assets/data/input_data_example_a.csv")
    .await(makeGraph);

// CHARTS ----------------------------------------------------------------------

function makeGraph(error, inputData) {

    let ndx         = crossfilter(inputData);

    // FORMAT - STRING TO DATE & NUMBERS ---------------------------------------
    
    let parseDate   = d3.time.format("%Y-%m-%d").parse;

    inputData.forEach(function(d) {
        d.date      = parseDate(d.date);
        d.q         = +d.q;
        d.rain      = +d.rain;
        d.temp      = +d.temp;
        d.ETP_dint  = +d.ETP_dint;
        d.peff      = +d.peff;
    });

    // Maximum data to be processed. Create an alert / write it cleary somewhere for the user to see.
    inputData       = inputData.slice(0, 1095);
    
    // FUNCTIONS ---------------------------------------------------------------
    
    // Enables ElasticX to work when zooming in another chart
    // https://stackoverflow.com/questions/36494956/elasticxtrue-doesnt-work-dc-js
    function remove_empty_bins(source_group) {
        return {
            all: function() {
                return source_group.all().filter(function(d) {
                    return d.value != 0;
                });
            }
        };}
    
    // CHART I.A1 - BASE FLOW LINECHART ----------------------------------------

    let dimDate         = ndx.dimension(dc.pluck("date"));
    var minDate         = dimDate.bottom(1)[0].date;
    var maxDate         = dimDate.top(1)[0].date;

    let groupTotalFlow  = dimDate.group().reduceSum(dc.pluck("q"));
    let groupFilteredTotalFlow = remove_empty_bins(groupTotalFlow);

    let chart_I_A1      = dc.compositeChart("#chart_I_A");

    // TO BE SOLVED : BRUSH / ZOOM NOT WORKING
    chart_I_A1
        .dimension(dimDate)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .y(d3.scale.linear().domain([0, 1.5]))
        
        .yAxisLabel("Flow (M3/DAY)")
        .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .mouseZoomable(true)
        .brushOn(false)
        .compose([
            dc.lineChart(chart_I_A1)
                .colors("blue")
                .group(groupFilteredTotalFlow, "Flow - Total"),
        ])
        .render()
        .renderLabel(true)
        .xAxis().tickFormat(d3.time.format("%d-%B-%y"));
    
    // CHART I.B1 - RAIN & ETP -------------------------------------------------
    
    let dimDateII         = ndx.dimension(dc.pluck("date"));
    var minDateII         = dimDateII.bottom(1)[0].date;
    var maxDateII         = dimDateII.top(1)[0].date;
        
    let groupRain         = dimDateII.group().reduceSum(dc.pluck("rain"));
    let groupFilteredRain = remove_empty_bins(groupRain);

    let groupETP          = dimDateII.group().reduceSum(dc.pluck("ETP_dint"));
    let groupFilteredETP  = remove_empty_bins(groupETP);
    
    let chart_I_B1 = dc.compositeChart("#chart_I_B1");

    // TO BE SOLVED : BRUSH / ZOOM NOT WORKING
    // TO BE SOLVED : REVERSED BARCHART : Look into D3 : height of the bar VS y of the "attr"
    chart_I_B1
        .dimension(dimDateII)
        .x(d3.time.scale().domain([minDateII, maxDateII]))
        .yAxisLabel("RAIN (MM)")
        .y(d3.scale.linear().domain([0, 50]))
        .elasticX(true)
        .rightYAxisLabel("ETP (Units)")
        .rightY(d3.scale.linear().domain([0, 10]))
        .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .mouseZoomable(false)
        .brushOn(false)
        .compose([
            dc.barChart(chart_I_B1)
                .colors("purple")
                .group(groupFilteredRain, "Rain"),
            dc.lineChart(chart_I_B1)
                .colors("red")
                .group(groupFilteredETP, "ETP dint")
                .useRightYAxis(true)
        ])
        .render()
        .renderLabel(true)
        .xAxis().tickFormat(d3.time.format("%d-%B-%y"));

    // CHART II.A1 - FLOW BOX PLOT TOTAL ---------------------------------------    

    let dimFlowTotal        = ndx.dimension(function(d) { return "Flow - Total" });
    
    let groupFlowBoxTotal   = dimFlowTotal.group().reduce(
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

    let chart_II_A1         = dc.boxPlot("#chart_II_A1");

    chart_II_A1
        .y(d3.scale.linear().domain([-0.1, +1.5]))
        .yAxisLabel("FLOW (M3/DAY)")
        .dimension(dimFlowTotal)
        .group(groupFlowBoxTotal);
        
    // CHART II.A2 - FLOW BOX PLOT - METHOD 1 ----------------------------------
    
    let dimFlow1        = ndx.dimension(function(d) { return "Base Flow Method 1" });
    
    let groupFlowBox1   = dimFlow1.group().reduce(
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

    let chart_II_A2         = dc.boxPlot("#chart_II_A2");

    chart_II_A2
        .y(d3.scale.linear().domain([-0.1, +1.5]))
        .yAxisLabel("METHOD 1 - FLOW (M3/DAY)")
        .dimension(dimFlow1)
        .group(groupFlowBox1);
    
    // CHART II.A3 - FLOW BOX PLOT - METHOD 2 ----------------------------------
    
    let dimFlow2        = ndx.dimension(function(d) { return "Base Flow Method 2" });
    
    let groupFlowBox2   = dimFlow2.group().reduce(
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

    let chart_II_A3     = dc.boxPlot("#chart_II_A3");

    chart_II_A3
        .y(d3.scale.linear().domain([-0.1, +1.5]))
        .yAxisLabel("METHOD 2 - FLOW (M3/DAY)")
        .dimension(dimFlow2)
        .group(groupFlowBox2);
    
    
    // CHART II.A4 - FLOW BOX PLOT - METHOD 3 ----------------------------------
        
    let dimFlow3        = ndx.dimension(function(d) { return "Base Flow Method 3" });
    
    let groupFlowBox3   = dimFlow3.group().reduce(
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

    let chart_II_A4     = dc.boxPlot("#chart_II_A4");

    chart_II_A4
        .y(d3.scale.linear().domain([-0.1, +1.5]))
        .yAxisLabel("METHOD 3 - FLOW (M3/DAY)")
        .dimension(dimFlow3)
        .group(groupFlowBox3);
        
    // CHART II.B1 - VOLUME - CUMULATIVE RAIN ----------------------------------  
    
    let groupVolumeRain     = dimFlowTotal.group().reduceSum(dc.pluck("rain"));
    let chart_II_B1         = dc.barChart("#chart_II_B1");
    
    chart_II_B1
        .width(250)
        .height(250)
        .dimension(dimFlowTotal)
        .group(groupVolumeRain)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Cumulated Rain (MM)");
    
   

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

    let groupSeason     = dimSeason.group().reduceCount();
    
    let chart_III_A1    = dc.pieChart("#chart_III_A1");
    
    chart_III_A1
        .height(330)
        .radius(100)
        .dimension(dimSeason)
        .group(groupSeason);
        
     
    // DISPLAY & LAYOUT --------------------------------------------------------
    // CHART - SERIE I ---------------------------------------------------------
    
    let arrayChart_I = [chart_I_A1,chart_I_B1];
    
    function layoutChart_I (chartName) {
        return chartName    .width(1200)
                            .height(400);
    }

    for (let i in arrayChart_I) {
        var taille = layoutChart_I(arrayChart_I[i]);
    };
    
    // CHART - SERIE II --------------------------------------------------------
    let arrayChart_II = [chart_II_A1,chart_II_A2,chart_II_A3,chart_II_A4];
    
    function layoutChart_II (chartName) {
        return chartName    .width(250)
                            .height(250)
                            .margins({ top: 10, right: 50, bottom: 30, left: 50 });
    }

    for (let i in arrayChart_II) {
        var taille = layoutChart_II(arrayChart_II[i]);
    };

    
    // END OF MAKEGRAPH --------------------------------------------------------
    dc.renderAll();
};