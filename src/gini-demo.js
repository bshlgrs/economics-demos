const React = require("react");
const ReactDom = require("react-dom");
const css = require("./gini-demo.css");
const Textarea = require('react-textarea-autosize').default;
const CommaSeparatedNumberTextarea = require('./comma-separated-number-textarea').CommaSeparatedNumberTextarea;
const IncomeData = require("./income-data").IncomeData;

const GiniDemo = React.createClass({
  getInitialState () {
    return {
      incomeData: new IncomeData([1, 1, 2, 2])
    }
  },
  renderIncomesGraph () {
    var maxHeight = this.state.incomeData.maxIncome() || 1;

    return <svg xmlns="http://www.w3.org/2000/svg"
           width="350" height="350" viewBox="-0.07 -0.05 1.1 1.2">
      {this.state.incomeData.incomes.map((income, idx) =>
        <rect
          width={1/this.state.incomeData.length}
          height={income / maxHeight}
          x={idx/this.state.incomeData.length}
          y={1 -income / maxHeight}
          fill={["#ccc", "#bbb"][idx%2]}
          key={idx} />)}
      <path d="M 0,0 L 0,1 L 1,1 L 1,0" stroke="black" strokeWidth="0.005" fill="none" />
      <text x="0.05" y="-0.85" fontSize="0.06" writingMode="tb-rl" transform="rotate(180)">income</text>
      <text x="0.2" y="1.1" fontSize="0.06" ></text>

    </svg>
  },

  renderLorenzCurveGraph () {
    var incomeData = this.state.incomeData;
    var incomes = incomeData.incomes;
    var cumulativeIncomes = incomeData.cumulativeIncomes;
    var numIncomes = cumulativeIncomes.length;
    var totalIncome = cumulativeIncomes[numIncomes - 1] || 1;

    var numberToY = (n) => 1 - n / totalIncome;
    var ys = cumulativeIncomes.map(numberToY);

    var trianglePath = "M 0,1 " + incomes.map((income, idx) => {
      var x = (idx + 1)/numIncomes;
      var y = cumulativeIncomes[idx];
      return " L " + x + "," + numberToY(y);
    }).join(" ") + " L 1,1 L 0,1";

    var giniCoefficient = incomeData.giniCoefficient();

    return <svg xmlns="http://www.w3.org/2000/svg"
           width="350" height="350" viewBox="-0.07 -0.05 1.1 1.2">
      <path d="M 0,1 L 1,0 L 1,1" fill="lightgrey" stroke="black" strokeWidth="0.005" />
      <path d="M 0,0 L 0,1" stroke="black" strokeWidth="0.005" fill="none" />
      <path d={trianglePath} fill="pink" stroke="black" strokeWidth="0.005"/>

      {incomes.length < 100 && ys.map((y, idx) =>
        <circle
          cx={(idx + 1)/cumulativeIncomes.length}
          cy={y}
          r={Math.max(Math.min(0.02, 0.2/(incomeData.length || 1)), 0.005)}
          style={{stroke: "none", fill: "black"}}
          key={idx} />
      )}
      <text x="0.05" y="-0.85" fontSize="0.06" writingMode="tb-rl" transform="rotate(180)">cumulative share of income</text>
      <text x="0.2" y="1.1" fontSize="0.06" >fraction of population</text>

      {giniCoefficient &&
        <text x="0.1" y="0.15" fontSize="0.1" >G = {giniCoefficient.toFixed(3)}</text>}
    </svg>
  },
  render () {
    var incomeData = this.state.incomeData
    var empty = incomeData.length == 0;


    return <div>
      <div className="row">
        <div className="col-md-12">
          <p>Enter a comma-separated list of incomes.</p>
          <CommaSeparatedNumberTextarea
            defaultStringValue={"1, 1, 2, 2"}
            onChange={(incomes) => this.setState({incomeData: new IncomeData(incomes)})} />
          <hr />
          <div className="row">
            <div className="col-md-6">
              <p>Here's a graph of the income distribution:</p>
              {this.renderIncomesGraph()}
            </div>
            <div className="col-md-6">
              <p>Here's your <a href="https://en.wikipedia.org/wiki/Lorenz_curve">Lorenz curve</a>:</p>
              {this.renderLorenzCurveGraph()}
            </div>
          </div>
          <p>The Gini coefficient <i>G</i> is the area of the grey section of the Lorenz curve divided by the sum of the red and grey areas.
          If everyone has the same income, then it will be 0. If one person has all the money, it will be 1.</p>
          <h4>Other summary statistics:</h4>
          <p>Population size: {incomeData.length}</p>
          <p>Average income: {empty ? "undefined" : incomeData.meanIncome().toFixed(3)}</p>
          {false && <p>Mean log income over log mean income: {empty ? "undefined" : incomeData.meanLogIncomeOverLogMeanIncome().toFixed(3)}</p>}
        </div>
      </div>
    </div>;
  }
});

exports.GiniDemo = GiniDemo;
