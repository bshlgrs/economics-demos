const React = require("react");
const ReactDom = require("react-dom");
const css = require("./gini-demo.css");
const Textarea = require('react-textarea-autosize').default;

const GiniDemo = React.createClass({
  getInitialState () {
    return {
      incomes: [1, 1, 2, 2]
    }
  },
  renderIncomesGraph () {
    var maxHeight = Math.max.apply(null, this.state.incomes) || 1;

    return <svg xmlns="http://www.w3.org/2000/svg"
           width="350" height="350" viewBox="-0.07 -0.05 1.1 1.2">
      {this.state.incomes.sort((a,b) => a-b).map((income, idx) =>
        <rect
          width={1/this.state.incomes.length}
          height={income / maxHeight}
          x={idx/this.state.incomes.length}
          y={1 -income / maxHeight}
          fill={["#ccc", "#bbb"][idx%2]}
          key={idx} />)}
      <path d="M 0,0 L 0,1 L 1,1 L 1,0" stroke="black" strokeWidth="0.005" fill="none" />
      <text x="0.05" y="-0.85" fontSize="0.06" writingMode="tb-rl" transform="rotate(180)">income</text>
      <text x="0.2" y="1.1" fontSize="0.06" ></text>

    </svg>
  },
  cumulativeIncomes () {
    if (this.state.incomes.length == 0) {
      return [];
    }
    var cumulativeIncomes = [this.sortedIncomes()[0]];
    this.sortedIncomes().forEach((x, idx) => {
      if (idx > 0) {
        cumulativeIncomes.push(x + cumulativeIncomes[idx - 1]);
      }
    });
    return cumulativeIncomes;
  },
  sortedIncomes () {
    return this.state.incomes.sort((a,b) => a-b);
  },
  giniCoefficient () {
    // From Wikipedia (https://en.wikipedia.org/wiki/Gini_coefficient):

    // An alternative approach would be to consider the Gini coefficient as
    // half of the relative mean absolute difference, which is a mathematical
    // equivalence.[15] The mean absolute difference is the average absolute
    // difference of all pairs of items of the population, and the relative
    // mean absolute difference is the mean absolute difference divided by
    // the average, to normalize for scale.

    // The key ingredient here is the sum of all absolute differences between
    // incomes.

    // I'm going to do this fast eventually, but for now I'll hack it out fast.

    var totalAbsoluteDifference = 0;
    var incomes = this.state.incomes;

    if (incomes.length == 0) {
      return null;
    }

    for (var i = 0; i < incomes.length; i++) {
      for (var j = 0; j < incomes.length; j++) {
        totalAbsoluteDifference += Math.abs(incomes[i] - incomes[j]);
      }
    }

    var mean = incomes.reduce((x, y) => x + y) / incomes.length;

    if (mean == 0) {
      return null;
    } else {
      return totalAbsoluteDifference / (2 * incomes.length * incomes.length * mean);
    }
  },
  renderCumulativeIncomesGraph () {
    var incomes = this.sortedIncomes();
    var cumulativeIncomes = this.cumulativeIncomes();
    var numIncomes = cumulativeIncomes.length
    var totalIncome = cumulativeIncomes[numIncomes - 1] || 1;

    var numberToY = (n) => 1 - n / totalIncome;
    var ys = cumulativeIncomes.map(numberToY);

    var trianglePath = "M 0,1 " + incomes.map((income, idx) => {
      var x = (idx + 1)/numIncomes;
      var y1 = (idx == 0 ? incomes[0] : cumulativeIncomes[idx - 1] + incomes[idx - 1]);
      var y2 = cumulativeIncomes[idx];
      console.log(idx, y1, y2);
      // return "L " + x + "," + numberToY(y1) +
      //        " L " + x + "," + numberToY(y2);
      return " L " + x + "," + numberToY(y2);
    }).join(" ") + " L 1,1 L 0,1";

    return <svg xmlns="http://www.w3.org/2000/svg"
           width="350" height="350" viewBox="-0.07 -0.05 1.1 1.2">
      <path d="M 0,1 L 1,0 L 1,1" fill="lightgrey" stroke="black" strokeWidth="0.005" />
      <path d="M 0,0 L 0,1" stroke="black" strokeWidth="0.005" fill="none" />
      <text x="0.05" y="-0.85" fontSize="0.06" writingMode="tb-rl" transform="rotate(180)">cumulative share of income</text>
      <text x="0.2" y="1.1" fontSize="0.06" >fraction of population</text>
      <path d={trianglePath} fill="pink" stroke="black" strokeWidth="0.005"/>

      {this.state.incomes.length < 100 && ys.map((y, idx) =>
        <circle
          cx={(idx + 1)/cumulativeIncomes.length}
          cy={y}
          r={Math.max(Math.min(0.02, 0.2/(this.state.incomes.length || 1)), 0.005)}
          style={{stroke: "none", fill: "black"}}
          key={idx} />
      )}
    </svg>
  },
  render () {
    return <div>
      <div className="row">
        <div className="col-md-6">
          <div style={{position: "fixed"}}>
            <div className="panel panel-default">
              <div className="panel-body">
                <p>Enter a comma-separated list of incomes.</p>
                <CommaSeparatedNumberTextarea
                  defaultStringValue={"1, 1, 2, 2"}
                  onChange={(incomes) => this.setState({incomes: incomes})} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <p>Your Gini coefficient is <strong>{this.giniCoefficient() || "undefined"}</strong>.</p>
          <hr />
          <p>Here's a graph of the income distribution.</p>
          {this.renderIncomesGraph()}
          <p>Now here's a graph of the cumulative income distribution.</p>
          {this.renderCumulativeIncomesGraph()}
          <p>The Gini coefficient is the area of the grey section of the cumulative income graph divided by the sum of the red and grey areas.
          If everyone has the same income, then it will be 0. If one person has all the money, it will be 1.</p>
          <h4>Other summary statistics:</h4>
          <p>Population size: {this.state.incomes.length}</p>
        </div>
      </div>
    </div>;
  }
});

const CommaSeparatedNumberTextarea = React.createClass({
  getInitialState () {
    return {
      textareaValue: this.props.defaultStringValue,
      legit: true,
      focused: false
    }
  },
  handleChange (e) {
    var legit = false;
    try {
      var list = JSON.parse("[" + e.target.value + "]");
      this.setState({ textareaValue: e.target.value, legit: true });
      this.props.onChange(list);
      console.log(list);
    } catch (exception) {
      this.setState({ textareaValue: e.target.value, legit: false });
      console.log("exception")
    }
  },
  render () {
    return <Textarea
      value={this.state.textareaValue}
      style={{backgroundColor: (this.state.legit || this.state.focused) ? "white" : "pink"}}
      onChange={(e) => this.handleChange(e)}
      onBlur={() => this.setState({focused: false})}
      onFocus={() => this.setState({focused: true})}
      />
  }
})

exports.GiniDemo = GiniDemo;
