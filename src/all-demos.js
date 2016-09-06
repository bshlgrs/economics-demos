var giniDemo = require("./gini-demo.js");
var lorenzCurve = require("./lorenz-curve.js");

var React = require("react");
var ReactDom = require("react-dom");
var $ = require("jquery");

const mapping = {
  "gini-demo": giniDemo.GiniDemo,
  "lorenz-curve": lorenzCurve.LorenzCurve
};

// You can't do forEach on the result of this function call, because JavaScript
const demo_targets = document.getElementsByClassName("react-demo");

window.loadAllDemos = function () {
  $(".react-demo").each((idx, div) => {
    const demo = div.attributes["data-demo-name"].value;

    const propsString = div.attributes["data-demo-props"] && div.attributes["data-demo-props"].value;
    var props = propsString ? JSON.parse(propsString) : {};

    if (mapping[demo]) {
      console.log("Trying to render " + demo + " onto page");
      ReactDom.render(React.createElement(mapping[demo], props), div);
    } else {
      console.log("You tried to load a demo called " + demo + ".");
      console.log("No demo with that name exists. I have demos with these names:");
      console.log(Object.keys(mapping).join(", ") + ".");
    }
  });
};

