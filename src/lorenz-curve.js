const React = require("react");
const IncomeData = require("./income-data").IncomeData;

const LorenzCurve = React.createClass({
  incomeData () {
    return this.props.incomeData || new IncomeData(this.props.incomes);
  },
  render () {
    var incomeData = this.incomeData();
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
})

exports.LorenzCurve = LorenzCurve;
