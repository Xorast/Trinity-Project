    // CHART I.A - BASE FLOW 
    
    // let dimDate = ndx.dimension(dc.pluck("date"));
    
    //     var minDate = dimDate.bottom(1)[0].date;
    //     var maxDate = dimDate.top(1)[0].date;
        
    // let dimTotalFlow = dimDate.group().reduceSum(dc.pluck("q"));
    
    // let dimRain = dimDate.group().reduceSum(dc.pluck("rain"));

    // let chartBaseFlow  = dc.compositeChart("#chart_I_A");
    
    // chartBaseFlow
    //     .width(1000)
    //     .height(400)
    //     .dimension(dimDate)
    //     .x(d3.time.scale().domain([minDate,maxDate]))
    //     .y(d3.scale.linear().domain([0,2]))
    //     .yAxisLabel("Flow (M3/DAY)")
    //     .rightY(d3.scale.linear().domain([0,200]))
    //     .rightYAxisLabel("Rain")
    //     .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
    //     .renderHorizontalGridLines(true)
    //     .renderVerticalGridLines(true)
    //     .mouseZoomable(true)
    //     .compose([
    //         dc.lineChart(chartBaseFlow)
    //             .colors("blue")
    //             .group(dimTotalFlow, "Flow - Total")
    //             .colors("blue")
    //             .group(dimTotalFlow, "Flow - Total")
    //             .colors("blue")
    //             .group(dimTotalFlow, "Flow - Total")
    //             .colors("blue")
    //             .group(dimTotalFlow, "Flow - Total"),
    //         dc.barChart(chartBaseFlow)
    //             .colors("red")
    //             .group(dimRain, "Rain")
    //             .useRightYAxis(true)
    //         ])
    //     .render()
        
    // CHART I.A1 - BASE FLOW LINECHART ------------------------------------------

    // let dimDate = ndx.dimension(dc.pluck("date"));

    // var minDate = dimDate.bottom(1)[0].date;
    // var maxDate = dimDate.top(1)[0].date;

    // let dimTotalFlow = dimDate.group().reduceSum(dc.pluck("q"));

    // let dimRain = dimDate.group().reduceSum(dc.pluck("rain"));

    // let chart_I_A = dc.compositeChart("#chart_I_A");

    // // TO BE SOLVED : BRUSH ON NOT WORKING
    // chart_I_A
    //     .width(1000)
    //     .height(400)
    //     .dimension(dimDate)
    //     .x(d3.time.scale().domain([minDate, maxDate]))
    //     .y(d3.scale.linear().domain([0, 2]))
    //     .yAxisLabel("Flow (M3/DAY)")
    //     .rightY(d3.scale.linear().domain([200, 0]))
    //     .rightYAxisLabel("Rain")
    //     .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
    //     .renderHorizontalGridLines(true)
    //     .renderVerticalGridLines(true)
    //     .mouseZoomable(true)
    //     .brushOn(true)
    //     .compose([
    //         dc.lineChart(chart_I_A)
    //             .colors("blue")
    //             .group(dimTotalFlow, "Flow - Total")
    //             .colors("blue")
    //             .group(dimTotalFlow, "Flow - Total")
    //             .colors("blue")
    //             .group(dimTotalFlow, "Flow - Total")
    //             .colors("blue")
    //             .group(dimTotalFlow, "Flow - Total"),
    //         dc.lineChart(chart_I_A)
    //             .colors("red")
    //             .group(dimRain, "Rain")
    //             .useRightYAxis(true)
    //     ])
    //     .render()
    
            // .renderlet(function(chart) {
            //     chart.selectAll("g.x text")
            //         .attr('transform', "rotate(+20)");