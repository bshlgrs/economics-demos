const LogDemo = React.createClass({
  getInitialState () {
    return {
      base: 2,
      snapToNearestBase: false
    }
  },
  changeBase (newBase) {
    this.setState({ base: parseFloat(newBase) });
  },
  toggleSnapToNearestBase () {
    this.setState({ snapToNearestBase: !this.state.snapToNearestBase });
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
        snapToLabels={this.state.snapToNearestBase} />

      <div style={{height: 520, width: 500, position: "relative"}}>
        <h2 style={{position: "absolute", left: "40%"}} id="graph-title">
          <i>y</i> = log<sub>{(this.state.base + "").substring(0,4)}</sub>(<i>x</i>)
        </h2>
        <div id="demo" style={{paddingTop: 20}}/>
      </div>

      <div className="panel panel-default">
        <div className="panel-body">
          <h3>Meta controls</h3>
          <p>These are controls which I'm giving you to change how this demo works.</p>
          <p>You can tell me which value you want and I'll hard code it.</p>

          <p>
            <label>
              Snap to nearest <i>b</i>
              <input type="checkbox" value={this.state.snapToNearestBase} onChange={this.toggleSnapToNearestBase} />
            </label>
            (This breaks if you snap to 1. If you want this to be on, we can decide on what happens if you set b==1)
          </p>
        </div>
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
        <div style={{height: 20, margin: 0}}>{this.renderLabels()}</div>
        <input
          type="range"
          onChange={this.handleChange}
          list="ticks"
          min="0"
          max="1000"
          value={this.convertLogicalToPhysicalPosition(this.props.value)}
          style={{width: "100%", margin: 0}}
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



