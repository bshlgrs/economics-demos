const React = require("react");
const css = require("./gini-demo.css");
const Textarea = require('react-textarea-autosize').default;
const CommaSeparatedNumberTextarea = require('./comma-separated-number-textarea').CommaSeparatedNumberTextarea;
const IncomeData = require("./income-data").IncomeData;
const LorenzCurve = require("./lorenz-curve").LorenzCurve;

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
            <div className="col-lg-6">
              <p>Here's a graph of the income distribution:</p>
              {this.renderIncomesGraph()}
            </div>
            <div className="col-lg-6">
              <p>Here's your <a href="https://en.wikipedia.org/wiki/Lorenz_curve">Lorenz curve</a>:</p>
              <LorenzCurve incomeData={incomeData} />
            </div>
          </div>
          <p>The Gini coefficient <i>G</i> is the area of the grey section of the Lorenz curve divided by the sum of the red and grey areas.
          If everyone has the same income, then it will be 0. If one person has all the money, it will be 1.</p>
          {false && <div><h4>Other summary statistics:</h4>
          <p>Population size: {incomeData.length}</p>
          <p>Average income: {empty ? "undefined" : incomeData.meanIncome().toFixed(3)}</p></div>}
          {false && <p>Mean log income over log mean income: {empty ? "undefined" : incomeData.meanLogIncomeOverLogMeanIncome().toFixed(3)}</p>}
        </div>
      </div>
    </div>;
  }
});

exports.GiniDemo = GiniDemo;
