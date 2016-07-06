var logGraphDemo = require("./log-graph-demo.jsx");
var logLengthDemo = require("./log-length-demo.jsx");
var logLengthAnimation = require("./log-length-animation.jsx");
var React = require("react");
var ReactDom = require("react-dom");
var $ = require("jquery");

mapping = {
  "log-graph-demo": logGraphDemo.LogGraphDemo,
  "log-length-demo": logLengthDemo.LogLengthDemo,
  "log-length-animation": logLengthAnimation.LogLengthAnimation,
};

// You can't do forEach on the result of this function call, because JavaScript
const demo_targets = document.getElementsByClassName("react-demo");

$(".react-demo").each((idx, div) => {
  const demo = div.attributes["data-demo-name"].value;

  if (mapping[demo]) {
    console.log("Trying to render " + demo + " onto page");
    ReactDom.render(React.createElement(mapping[demo]), div);
  } else {
    console.log("You tried to load a demo called " + demo + ".");
    console.log("No demo with that name exists. I have demos with these names:");
    console.log(Object.keys(mapping).join(", ") + ".");
  }
});

