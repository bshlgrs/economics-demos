const React = require("react");
const ReactDom = require("react-dom");
const css = require("./gini-demo.css");
const Textarea = require('react-textarea-autosize').default;

const GiniDemo = React.createClass({
  getInitialState () {
    return {
      incomes: [1, 2, 3]
    }
  },
  render () {
    return <div>
      <p>Gini!</p>
      <CommaSeparatedNumberTextarea
        defaultStringValue="1, 2, 3"
        onChange={(incomes) => this.setState({incomes: incomes})} />
      {this.renderIncomesGraph()}
      {this.renderCumulativeIncomesGraph()}
    </div>;
  },
  renderIncomesGraph () {
    var maxHeight = Math.max.apply(null, this.state.incomes);

    return <svg xmlns="http://www.w3.org/2000/svg"
           width="400" height="300" viewBox="0 0 1 1" style={{border: "solid"}}>

        {this.state.incomes.sort((a,b) => a-b).map((income, idx) =>
          <rect
            width={1/this.state.incomes.length}
            height={income / maxHeight}
            x={idx/this.state.incomes.length}
            y={1 -income / maxHeight}
            fill={["#ccc", "#bbb"][idx%2]}
            key={idx} />)}
      </svg>
  },
  renderCumulativeIncomesGraph () {

    var cumulativeIncomes = [this.state.incomes[0]];
    this.state.incomes.forEach((x, idx) => {
      if (idx > 0) {
        cumulativeIncomes.push(x + cumulativeIncomes[idx - 1]);
      }
    });

    var maxHeight = Math.max.apply(null, cumulativeIncomes);

    var ys = cumulativeIncomes.map((income) => 1 - income / maxHeight)

    var trianglePath = "M 0,1 " + ys.map((y, idx) => "L " + (idx + 1)/cumulativeIncomes.length + "," + y).join(" ") + " L 1,1 L 0,1";

    return <svg xmlns="http://www.w3.org/2000/svg"
           width="400" height="300" viewBox="-0.05 -0.05 1.1 1.1" style={{border: "solid"}}>
      <path d="M 1,0 L 0,1 L 1,1" fill="lightgrey" stroke="none" />
      <path d="M 1,0 L 0,1" stroke="black" strokeWidth="0.005" />
      <path d={trianglePath} fill="pink" stroke="black" strokeWidth="0.005"/>


      {ys.map((y, idx) =>
        <circle
          cx={(idx + 1)/cumulativeIncomes.length}
          cy={y}
          r={Math.max(Math.min(0.02, 0.2/this.state.incomes.length), 0.005)}
          style={{stroke: "none", fill: "black"}}
          key={idx} />
      )}
    </svg>
  }
});

const CommaSeparatedNumberTextarea = React.createClass({
  getInitialState () {
    return {
      textareaValue: this.props.defaultStringValue
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
      onChange={(e) => this.handleChange(e)}
      />
  }
})

exports.GiniDemo = GiniDemo;

//
