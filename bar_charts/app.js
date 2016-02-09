$(document).ready(function(){
  var ctx = $("#myChart").get(0).getContext("2d");
// This will get the first returned node in the jQuery collection.
  $.getJSON("http://api.census.gov/data/timeseries/asm/state?get=NAICS_TTL,EMP,PAYANN,GEO_TTL&for=state:*&YEAR=2014&NAICS=31-33&key=81cdc733d3ac0f3496a88eebbed0a31478c403c6")
    .then(function(results){
      var dataPoints = []
      for(var i = 1; i < results.length; i++){
        var currentResult = results[i]
        var numEmployees = parseInt(currentResult[1])
        var annPayroll = parseInt(currentResult[2]) * 1000
        var avgSalary = Math.round(annPayroll / numEmployees)
        var dataPoint = {state: currentResult[3], avgSalary: avgSalary}
        if (numEmployees != 0 && annPayroll != 0){
          dataPoints.push(dataPoint)
        }
      }
      dataPoints = _.sortBy(dataPoints, "avgSalary").slice(0,10)
      var data = {
        labels: _.map(dataPoints, function(dataPoint){
          return dataPoint.state
        }),
        datasets: [
          {
            label: "Avg Salaries By State",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data:  _.map(dataPoints, function(dataPoint){
              return dataPoint.avgSalary
            })
          }
        ]
      };
      var myBarChart = new Chart(ctx).Bar(data);
    })
})
// http://api.census.gov/data/timeseries/asm/industry?get=NAICS_TTL,EMP,PAYANN,GEO_TTL&for=us:*&time=2014&NAICS=31-33&key=81cdc733d3ac0f3496a88eebbed0a31478c403c6
//
// http://api.census.gov/data/timeseries/asm/state?get=NAICS_TTL,EMP,PAYANN,GEO_TTL&for=state:*&YEAR=2014&NAICS=31-33&key=81cdc733d3ac0f3496a88eebbed0a31478c403c6
