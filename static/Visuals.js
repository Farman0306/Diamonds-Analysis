document.addEventListener("DOMContentLoaded", () => {
  // Fetch data for the scatter plot
  fetch("/api/scatterClarityLab")
    .then((response) => response.json())
    .then((data) => {
      // Process data and create scatter plot using Plotly
      var scatterData = {
        x: data.map((item) => item.clarity),
        y: data.map((item) => item.ppc),
        mode: "markers",
        type: "scatter",
        transforms: [
          {
            type: "filter",
            target: data.map((item) => item.type),
            operation: "=",
            value: "Natural",
          },
        ],
      };

      var layoutScatter = {
        title: "Price-per-Carat vs Clarity",
        xaxis: { title: "Clarity" },
        yaxis: { title: "Price-per-Carat ($)" },
        showlegend: false,
      };

      Plotly.newPlot("scatterClarityLab", [scatterData], layoutScatter);
    })
    .catch((error) =>
      console.error("Error fetching scatter plot data:", error)
    );

  // Fetch data for the bar chart
  fetch("/api/scatterCutLab")
    .then((response) => response.json())
    .then((data) => {
      // Process data and create scatter plot using Plotly
      var scatterData = {
        x: data.map((item) => item.cut),
        y: data.map((item) => item.ppc),
        mode: "markers",
        type: "scatter",
        transforms: [
          {
            type: "filter",
            target: data.map((item) => item.type),
            operation: "=",
            value: "Natural",
          },
        ],
      };

      var layoutScatter = {
        title: "Price-per-Carat vs Cut",
        xaxis: { title: "Cut" },
        yaxis: { title: "Price-per-Carat ($)" },
        showlegend: false,
      };

      Plotly.newPlot("scatterCutLab", [scatterData], layoutScatter);
    })
    .catch((error) =>
      console.error("Error fetching scatter plot data:", error)
    );

  // Fetch data for the pie chart
  fetch("/api/scatterColorLab")
    .then((response) => response.json())
    .then((data) => {
      // Process data and create scatter plot using Plotly
      var scatterData = {
        x: data.map((item) => item.color),
        y: data.map((item) => item.ppc),
        mode: "markers",
        type: "scatter",
        transforms: [
          {
            type: "filter",
            target: data.map((item) => item.type),
            operation: "=",
            value: "Natural",
          },
        ],
      };

      var layoutScatter = {
        title: "Price-per-Carat vs Color",
        xaxis: { title: "Color" },
        yaxis: { title: "Price-per-Carat ($)" },
        showlegend: false,
      };

      Plotly.newPlot("scatterColorLab", [scatterData], layoutScatter);
    })
    .catch((error) =>
      console.error("Error fetching scatter plot data:", error)
    );

  //Mined Type
  fetch("/api/scatterClarityMined")
    .then((response) => response.json())
    .then((data) => {
      // Process data and create scatter plot using Plotly
      var scatterData = {
        x: data.map((item) => item.clarity),
        y: data.map((item) => item.ppc),
        mode: "markers",
        type: "scatter",
        transforms: [
          {
            type: "filter",
            target: data.map((item) => item.type),
            operation: "=",
            value: "Natural",
          },
        ],
      };

      var layoutScatter = {
        title: "Price-per-Carat vs Clarity",
        xaxis: { title: "Clarity" },
        yaxis: { title: "Price-per-Carat ($)" },
        showlegend: false,
      };

      Plotly.newPlot("scatterClarityMined", [scatterData], layoutScatter);
    })
    .catch((error) =>
      console.error("Error fetching scatter plot data:", error)
    );

  // Fetch data for the bar chart
  fetch("/api/scatterCutMined")
    .then((response) => response.json())
    .then((data) => {
      // Process data and create scatter plot using Plotly
      var scatterData = {
        x: data.map((item) => item.cut),
        y: data.map((item) => item.ppc),
        mode: "markers",
        type: "scatter",
        transforms: [
          {
            type: "filter",
            target: data.map((item) => item.type),
            operation: "=",
            value: "Natural",
          },
        ],
      };

      var layoutScatter = {
        title: "Price-per-Carat vs Cut",
        xaxis: { title: "Cut" },
        yaxis: { title: "Price-per-Carat ($)" },
        showlegend: false,
      };

      Plotly.newPlot("scatterCutMined", [scatterData], layoutScatter);
    })
    .catch((error) =>
      console.error("Error fetching scatter plot data:", error)
    );

  // Fetch data for the pie chart
  fetch("/api/scatterColorMined")
    .then((response) => response.json())
    .then((data) => {
      // Process data and create scatter plot using Plotly
      var scatterData = {
        x: data.map((item) => item.color),
        y: data.map((item) => item.ppc),
        mode: "markers",
        type: "scatter",
        transforms: [
          {
            type: "filter",
            target: data.map((item) => item.type),
            operation: "=",
            value: "Natural",
          },
        ],
      };

      var layoutScatter = {
        title: "Price-per-Carat vs Color",
        xaxis: { title: "Color" },
        yaxis: { title: "Price-per-Carat ($)" },
        showlegend: false,
      };

      Plotly.newPlot("scatterColorMined", [scatterData], layoutScatter);
    })
    .catch((error) =>
      console.error("Error fetching scatter plot data:", error)
    );
  // Fetch the dropdown element
var countryDropdown = document.getElementById('country-dropdown');

// Fetch mines map data
// Fetch the input element
var countryInput = document.getElementById('country-input');

// Fetch mines map data
fetch('/api/mines_map')
  .then(response => response.json())
  .then(data => {
    // Process data and create map visualization using Plotly
    var lat = data.map(item => item.LAT);
    var lon = data.map(item => item.LONG);
    var countryNames = data.map(item => item.Country);

    // Create a list of unique colors for each country
    var colors = [...new Set(data.map(item => item.Country))].map((country, index) => {
      return {
        country: country,
        color: `rgb(${index * 40}, ${255 - index * 40}, ${index * 40})`
      };
    });

    var scatterData = colors.map(color => {
      var countryData = data.filter(item => item.Country === color.country);
      return {
        type: 'scattergeo',
        lat: countryData.map(item => item.LAT),
        lon: countryData.map(item => item.LONG),
        mode: 'markers',
        marker: {
          size: 5,
          color: color.color
        },
        name: color.country,
        hoverinfo: 'text',
        text: countryData.map(item => item.Country)
      };
    });

    var layout = {
      geo: {
        scope: 'world',
        showland: true,
        landcolor: 'rgb(217, 217, 217)',
        countrycolor: 'rgb(204, 204, 204)',
        showlakes: true,
        lakecolor: 'rgb(255, 255, 255)'
      }
    };

    Plotly.newPlot('map-plot', scatterData, layout);

    // Add event listener to the input box for filtering
    countryInput.addEventListener('input', function () {
      var searchText = countryInput.value.toLowerCase();
      var filteredScatterData = scatterData.filter(item => item.name.toLowerCase().includes(searchText));

      // Update the plot with filtered data
      Plotly.newPlot('map-plot', filteredScatterData, layout);
    });
  })
  .catch(error => console.error('Error fetching map data:', error));





  // Fetch data from the Flask API
  fetch("/api/ranking")
    .then((response) => response.json())
    .then((data) => {
      // Assuming data contains the lab and natural ranking data from the database
      var lab_data_bar = data.lab_data_bar;
      var natural_data_bar = data.natural_data_bar;
      var lab_data_pie = data.lab_data_pie;
      var natural_data_pie = data.natural_data_pie;

      // Create the bar chart for lab diamond ranking
      var figBarLab = {
        data: [
          {
            x: lab_data_bar.map((item) => item["Country"]).slice(0, 10),
            y: lab_data_bar.map((item) => item["Production 2020"]).slice(0, 10),
            type: "bar",
            hoverinfo: "y",
            marker: { color: "rgba(55, 128, 191, 0.6)", width: 1 },
          },
        ],
        layout: {
          title: "Ranking based on Production (2020) - Lab Diamonds",
          xaxis: { title: "Country" },
          yaxis: { title: "Production (carat)" },
          margin: { l: 150, r: 10, t: 40, b: 80 },
          height: 500,
        },
      };

      // Create the bar chart for natural diamond ranking
      var figBarNatural = {
        data: [
          {
            x: natural_data_bar.map((item) => item["Country"]).slice(0, 10),
            y: natural_data_bar
              .map((item) => item["Production 2020"])
              .slice(0, 10),
            type: "bar",
            hoverinfo: "y",
            marker: { color: "rgba(255, 153, 51, 0.6)", width: 1 },
          },
        ],
        layout: {
          title: "Ranking based on Production (2020) - Natural Diamonds",
          xaxis: { title: "Country" },
          yaxis: { title: "Production (carat)" },
          margin: { l: 150, r: 10, t: 40, b: 80 },
          height: 500,
        },
      };

      // Create the pie chart for lab diamond ranking
      var figPieLab = {
        data: [
          {
            values: lab_data_pie.map((item) => item["Share in %"]).slice(0, 10),
            labels: lab_data_pie.map((item) => item["Country"]).slice(0, 10),
            type: "pie",
          },
        ],
        layout: {
          title: "Market Share - Lab Diamonds",
          title_x: 0.4,
          height: 477,
        },
      };

      // Create the pie chart for natural diamond ranking
      var figPieNatural = {
        data: [
          {
            values: natural_data_pie
              .map((item) => item["Share in %"])
              .slice(0, 10),
            labels: natural_data_pie
              .map((item) => item["Country"])
              .slice(0, 10),
            type: "pie",
          },
        ],
        layout: {
          title: "Market Share - Natural Diamonds",
          title_x: 0.4,
          height: 477,
        },
      };

      // Plot the charts
      Plotly.newPlot("bar-chart-lab", figBarLab.data, figBarLab.layout);
      Plotly.newPlot(
        "bar-chart-natural",
        figBarNatural.data,
        figBarNatural.layout
      );
      Plotly.newPlot("pie-chart-lab", figPieLab.data, figPieLab.layout);
      Plotly.newPlot(
        "pie-chart-natural",
        figPieNatural.data,
        figPieNatural.layout
      );
    })
    .catch((error) => console.error("Error fetching ranking data:", error));
});
