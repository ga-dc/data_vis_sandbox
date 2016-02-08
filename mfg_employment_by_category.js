function graph(data) {
  var newData = [];
  for(var i = 2005; i <= 2013; i++) {
    newData.push([data[i][3], data[i][1]]);
  }
  g = new Dygraph($(".naics.graph")[0], newData,
  {
    labels: [ "Year", "Employment" ]
  });


}

function graphNAICSCode(naicsCode) {
  var counter = 0;
  var data = {};

  for(var i = 2005; i <= 2013; i++) {
    $.getJSON("http://api.census.gov/data/timeseries/asm/industry?get=NAICS_TTL,EMP,GEO_TTL&for=us:*&time=" + i + "&NAICS=" + naicsCode)
    .then(function(results) {
      var result = results[1];
      var year = parseInt(result[3]);
      console.log(result);
      data[year] = result;
      counter++;

      if (counter === 9) {
        $("h1").text(result[2]);
        console.log(data);
        graph(data);
      }
    });

  }
}

function buildNaicsSelect() {
  $.getJSON("naics.json", function(naics) {
    naics.forEach(function(naicsCode){
      $(".naics").append($("<option value='" + naicsCode.code + "'>" + naicsCode.description + "</option>"));
    });
    $('.naics').on("change", function() {
      graphNAICSCode($(this).val());
    });
  });
}



function sortedKeyArray(obj){
  keys = Object.keys(obj);
  return(keys.sort());
}
