var hw_day = d3.csv("homework-day.csv");
var hw_fre = d3.csv("homework-frequency.csv");
var quiz_day = d3.csv("quizes-day.csv");
var quiz_fre = d3.csv("quizes-frequency.csv");

var w = 300;
var h = 250;
var svg_w = 650;
var padding = 20;

var margin={
  top:20,
  bottom:20,
  left:20,
  right:20
}
var xScale_hw_fre=d3.scaleLinear()
             .domain([0,12])
             .range([0,w-margin.left-margin.right])
var xScale_quiz_fre=d3.scaleLinear()
             .domain([0,4])
             .range([0,w-margin.left-margin.right])
var yScale_hw_fre=d3.scaleLinear()
             .domain([0,5])
             .range([0,h-margin.top-margin.bottom]);
var yScale2=d3.scaleLinear()
              .domain([0,5])
              .range([h-margin.top-margin.bottom,0]);
var yScale_quiz_fre=d3.scaleLinear()
              .domain([0,20])
              .range([0,h-margin.top-margin.bottom]);
var yScale3=d3.scaleLinear()
              .domain([0,20])
              .range([h-margin.top-margin.bottom,0]);
var colorscale=d3.scaleOrdinal(d3.schemePastel1);

// histogram - frequency //
// graph 1 - hw //
var histogram1 = function(data){
  var svg = d3.select(".HWFrequency")
              .append("svg")
              .attr("width", svg_w)
              .attr("height", h);
  svg.selectAll("rect")
               .data(data)
               .enter()
               .append("rect")
               .attr("x", function(d,i){
                 return xScale_hw_fre(i) + 26;
               })
               .attr("y", function(d){
                 return h-yScale_hw_fre(d.frequency)-20;
               })
               .attr("width", 40-padding)
               .attr("height", function(d){
                 return yScale_hw_fre(d.frequency);
               })
               .attr("fill", function(d){
                 return colorscale(d.grade)
               });

  var xAxis=d3.axisBottom()
              .scale(xScale_hw_fre);
  var yAxis=d3.axisLeft()
              .scale(yScale2);
  svg.append("g")
     .call(xAxis)
     .attr("transform","translate("+(margin.left+5)+","+(h-margin.top)+")");
  svg.append("g")
     .call(yAxis)
     .attr("transform","translate("+(margin.left+5)+","+margin.top+")");

     //legend
    svg.append("g")
       .selectAll("rect")
       .data(data)
       .enter()
       .append("rect")
       .attr("x",w+150)
       .attr("y",function(d,i){
         return i*(20)+10
       })
       .attr("width",15)
       .attr("height",15)
       .attr("fill",function(d){
         return colorscale(d.grade);
       })
    svg.append("g")
       .selectAll("text")
       .data(data)
       .enter()
       .append("text")
       .attr("x",w+175)
       .attr("y",function(d,i){
        return i*(20)+23
       })
       .text(function(d){
         return d.grade;
       })
}

// graph 2 - quiz //
var histogram2 = function(data){
  var svg = d3.select(".QuizFrequency")
              .append("svg")
              .attr("width", svg_w)
              .attr("height", h);
  svg.selectAll("rect")
               .data(data)
               .enter()
               .append("rect")
               .attr("x", function(d,i){
                 return xScale_quiz_fre(i) + 26;
               })
               .attr("y", function(d){
                 return h-yScale_quiz_fre(d.frequency)-20;
               })
               .attr("width", 84-padding)
               .attr("height", function(d){
                 return yScale_quiz_fre(d.frequency);
               })
               .attr("fill", function(d){
                 return colorscale(d.grade)
               });

  var xAxis=d3.axisBottom()
              .scale(xScale_quiz_fre);
  var yAxis=d3.axisLeft()
              .scale(yScale3);
  svg.append("g")
     .call(xAxis)
     .attr("transform","translate("+(margin.left+5)+","+(h-margin.top)+")");
  svg.append("g")
     .call(yAxis)
     .attr("transform","translate("+(margin.left+5)+","+margin.top+")");

     //legend
    svg.append("g")
       .selectAll("rect")
       .data(data)
       .enter()
       .append("rect")
       .attr("x",w+150)
       .attr("y",function(d,i){
         return i*(20)+10
       })
       .attr("width",15)
       .attr("height",15)
       .attr("fill",function(d){
         return colorscale(d.grade);
       })
    svg.append("g")
       .selectAll("text")
       .data(data)
       .enter()
       .append("text")
       .attr("x",w+175)
       .attr("y",function(d,i){
        return i*(20)+23
       })
       .text(function(d){
         return d.grade;
       })
}

// line - day //
// graph 3 - hw //
var line1 = function(data){
  var svg = d3.select(".HWLine")
              .append("svg")
              .attr("width",svg_w+30)
              .attr("height",h+50);
  xScale = d3.scaleLinear()
             .domain([0,40])
             .range([10,w]);
  yScale = d3.scaleLinear()
             .domain([0,50])
             .range([h,10]);

  var line = d3.line()
               .x(function(d){return xScale(d.day);})
               .y(function(d){return yScale(d.grade);})
  svg.append("path")
     .datum(data)
     .attr("class", "line")
     .attr("d", line)
  var xAxis=d3.axisBottom()
              .scale(xScale);
  var yAxis=d3.axisLeft()
              .scale(yScale);
  svg.append("g")
     .call(xAxis)
     .attr("transform","translate("+(margin.left-10)+","+(h-margin.top+20)+")");
  svg.append("g")
     .call(yAxis)
     .attr("transform","translate("+(margin.left)+","+(margin.top-20)+")");
}
// graph 4 - quiz //
var line2 = function(data){
  var svg = d3.select(".QuizLine")
              .append("svg")
              .attr("width",svg_w+30)
              .attr("height",h+50);
  xScale = d3.scaleLinear()
             .domain([0,40])
             .range([20,w]);
  yScale = d3.scaleLinear()
             .domain([0,10])
             .range([h,10]);

  var line = d3.line()
               .x(function(d){return xScale(d.day);})
               .y(function(d){return yScale(d.grade);})
  svg.append("path")
     .datum(data)
     .attr("class", "line")
     .attr("d", line)
  var xAxis=d3.axisBottom()
              .scale(xScale);
  var yAxis=d3.axisLeft()
              .scale(yScale);
  svg.append("g")
     .call(xAxis)
     .attr("transform","translate("+(margin.left-15)+","+(h-margin.top+20)+")");
  svg.append("g")
     .call(yAxis)
     .attr("transform","translate("+(margin.left+5)+","+(margin.top-20)+")");
}
////////////////////////////////////////////////
hw_fre.then(function(d){
             histogram1(d);
           },
           function(err){
             console.log(err);
           })

quiz_fre.then(function(d){
              histogram2(d);
           })

hw_day.then(function(d){
              line1(d);
           })

quiz_day.then(function(d){
              line2(d);
           })
//////////////////////////////////////////////
