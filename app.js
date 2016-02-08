$(document).ready(function() {
  buildStateSelect();
  $('.states').on("change", function() {
    graphState($(this).val());
  });
});

function graph(data) {
  var newData = [];
  console.log(data);
  for(var i = 2005; i <= 2013; i++) {
    newData.push([data[i][3], data[i][1]]);
  }
  console.log(newData);
  g = new Dygraph($(".graph")[0], newData,
    {
      labels: [ "Year", "Employment" ]
    });
}

function graphState(id) {
  var reqs = [];

  for(var i = 2005; i <= 2013; i++) {
    request = $.getJSON("http://api.census.gov/data/timeseries/asm/state?get=NAICS_TTL,EMP,GEO_TTL&for=state:" + id + "&time=" + i + "&NAICS=31-33");
    reqs.push(request);
  }

  $.when.apply(undefined, reqs).then(function(data) {
    graph(collectResults(arguments));
  });
}

function collectResults(results) {

  var collectedResults = {};
  for(var i = 0; i < results.length; i++) {
    var currentResult = results[i][0][1]; // ignore header
    var year = parseInt(currentResult[3]);
    collectedResults[year] = currentResult;
  }

  return collectedResults;
}

function buildStateSelect() {
  var states = fipsCodes();
  sortedStatesArray = sortedKeyArray(states)
  sortedStatesArray.forEach(function(id){
    $(".states").append($("<option value='" + id + "'>" + states[id] + "</option>"))
  })
}

function fipsCodes() {
  return {
    "01": "Alabama",
    "02": "Alaska",
    "04": "Arizona",
    "05": "Arkansas",
    "06": "California",
    "08": "Colorado",
    "09": "Connecticut",
    "10": "Delaware",
    "11": "District of Columbia",
    "12": "Florida",
    "13": "Geogia",
    "15": "Hawaii",
    "16": "Idaho",
    "17": "Illinois",
    "18": "Indiana",
    "19": "Iowa",
    "20": "Kansas",
    "21": "Kentucky",
    "22": "Louisiana",
    "23": "Maine",
    "24": "Maryland",
    "25": "Massachusetts",
    "26": "Michigan",
    "27": "Minnesota",
    "28": "Mississippi",
    "29": "Missouri",
    "30": "Montana",
    "31": "Nebraska",
    "32": "Nevada",
    "33": "New Hampshire",
    "34": "New Jersey",
    "35": "New Mexico",
    "36": "New York",
    "37": "North Carolina",
    "38": "North Dakota",
    "39": "Ohio",
    "40": "Oklahoma",
    "41": "Oregon",
    "42": "Pennsylvania",
    "44": "Rhode Island",
    "45": "South Carolina",
    "46": "South Dakota",
    "47": "Tennessee",
    "48": "Texas",
    "49": "Utah",
    "50": "Vermont",
    "51": "Virginia",
    "53": "Washington",
    "54": "West Virginia",
    "55": "Wisconsin",
    "56": "Wyoming"
  };
}

function sortedKeyArray(obj){
  keys = Object.keys(obj)
  return(keys.sort())
}
