function buildMetadata(sample) {

    // @TODO: Complete the following function that builds the metadata panel
  
    // Use `d3.json` to fetch the metadata for a sample
    var url = "/metadata/{sample}";
    d3.json(url).then(function(sample) {
  
      // Use d3 to select the panel with id of `#sample-metadata`
      var sample_metadata = d3.select('#sample_metadata')

      // Use `.html("") to clear any existing metadata
      sample_metadata.html("");

      // Use `Object.entrie loop, s` to theyou will need  add each key and value pair to the panel
      // Hint: Inside to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(sample).forEach(function([key, value]) {
      
      
        // Log the key and value
        row.text = ('{key}': '{value')};
      });
    };
    
      // BONUS: Build the Gauge Chart
      // buildGauge(data.WFREQ);
  
  
  function buildCharts(sample) {
  
    // @TODO: Use `d3.json` to fetch the sample data for the plots
    var url = '/samples/{sample}';
    d3.json(url).then(function(data) {

  
      // @TODO: Build a Bubble Chart using the sample data
      var x_values = data.otu_ids;
      var y_values = data.sample_values;
      var marker_size = data.sample_values;
      var marker_colors = data.otu_ids;
      var text_values = data.otu_labels;

      var trace = {
        x: x_values
        y: y_values
        text: text_values
        markers:{
          color: marker_colors
          size: marker_size
        }
      }

      var data = [trace];

      ploty.newPlot('bubble', data);
    };

      // // @TODO: Build a Pie Chart
      // // HINT: You will need to use slice() to grab the top 10 sample_values,
      // // otu_ids, and labels (10 each).
      d3.json(url).then(function(data) {
        var pie_values = data.sample_value;
        var pie_labels = data.otu_ids;
        var pie_hovertext = data.otu_labels;

        var data = [{
          value : pie_values,
          labels : pie_labels,
          hovertext : pie_hovertext,
          type : 'pie'
        }];
      
        ploty.newPlot('pie', data)
      });
    });   

  function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initialize the dashboard
  init();
  