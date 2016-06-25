const LogDemo = React.createClass({
  getInitialState () {
    return {
      base: 2
    }
  },
  changeBase (newBase) {
    this.setState({ base: parseFloat(newBase) });
  },
  componentDidUpdate () {
    this.plotFunction();
  },
  componentDidMount () {
    this.plotFunction();
  },
  plotFunction () {
    const yLimit = Math.log(20) / Math.log(this.state.base)
    const domain = [yLimit, -yLimit].sort()
    functionPlot({
      target: '#demo',
      data: [{
        fn: 'log(x) / log('+this.state.base+")"
      }],
      xAxis: {
        domain: [0, 20]
      },
      yAxis: {
        domain: domain
      },
      height: 500,
      width: 500
    });

  },
  render () {
    return <div>
      <CustomRangeSlider
        sliderMin={0.01}
        sliderMax={10}
        labels={[0.01, 1, 2, ["<i>e</i>", 2.71], 3, 4, 5, 6, 7, 8, 9, 10]}
        value={this.state.base}
        onChange={this.changeBase}
        snapToLabels={false} />

      <div style={{height: 500, width: 500, position: "relative"}}>
        <h2 style={{position: "absolute", left: "40%"}} id="graph-title">
          <i>y</i> = log<sub>{(this.state.base + "").substring(0,4)}</sub>(<i>x</i>)
        </h2>
        <div id="demo"/>
      </div>
    </div>;
  }
});

const CustomRangeSlider = React.createClass({
  // Throughout, the physical slider positions are between 0 and 100.
  // The logical slider positions are between sliderMin and sliderMax.

  // Doesn't work in Firefox. I'll have to make this more manually.
  propTypes: {
    sliderMin: React.PropTypes.number.isRequired,
    sliderMax: React.PropTypes.number.isRequired,
    labels: React.PropTypes.array.isRequired,
    snapToLabels: React.PropTypes.bool,
    value: React.PropTypes.number.isRequired
  },

  logicalTickPositions () {
    return this.props.labels.map((x) => {
      if (Array.isArray(x)) {
        return x[1];
      } else {
        return x;
      }
    })
  },

  tickLabelTexts () {
    return this.props.labels.map((x) => {
      if (Array.isArray(x)) {
        return x[0];
      } else {
        return x;
      }
    })
  },

  physicalTickPositions () {
    return this.logicalTickPositions().map(this.convertLogicalToPhysicalPosition);
  },

  renderLabels() {
    const physicalTickPositions = this.physicalTickPositions();
    const tickLabelTexts = this.tickLabelTexts();

    return tickLabelTexts.map((label, idx) =>
      <span
        key={label}
        style={
          {
            position: "absolute",
            left: (1 + physicalTickPositions[idx] * 0.965 * 100 / 1000)+"%",
            textAlign: "center"
          }
        }
        dangerouslySetInnerHTML={{__html: label}}>
      </span>
    );
  },

  convertLogicalToPhysicalPosition (logicalPosition) {
    const sliderMin = this.props.sliderMin;
    const sliderMax = this.props.sliderMax;

    return (logicalPosition - sliderMin) / (sliderMax - sliderMin) * 1000;
  },

  handleChange (e) {
    const value = parseInt(e.target.value);

    const sliderMin = this.props.sliderMin;
    const sliderMax = this.props.sliderMax;

    const clickedValue = (value / 1000) * (sliderMax - sliderMin) + sliderMin;

    if (this.props.snapToLabels) {
      var closestValue = this.logicalTickPositions()[0];

      this.logicalTickPositions().forEach((pos) => {
        if (Math.abs(pos - clickedValue) < Math.abs(closestValue - clickedValue)) {
          closestValue = pos;
        }
        this.props.onChange(closestValue);
      })
    } else {
      this.props.onChange(clickedValue);
    }
  },

  render () {
    return (
      <div style={{width: "600px", position:'relative'}} >
        <div style={{height: 20}}>{this.renderLabels()}</div>
        <input
          type="range"
          onChange={this.handleChange}
          list="ticks"
          min="0"
          max="1000"
          value={this.convertLogicalToPhysicalPosition(this.props.value)}
          style={{width: "100%"}}
          />
        <datalist id="ticks">
          {this.physicalTickPositions().map((x) => <option key={x}>{parseInt(x)}</option>)}
        </datalist>
      </div>
    );
  }
})

ReactDOM.render(<LogDemo />,
      document.getElementById("log-demo"))



