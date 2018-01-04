class SymbolTrend extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var symbol = "fa " + this.props.symbol;
        return(
            <div>
                {this.props.value} <i className={symbol}></i>
            </div>
        );
    }
}
class Trend extends React.Component {
    constructor(props) {
        super(props);
        Object.entries(this.props.trend).map(([key, value]) =>{
            this.state = {
                'key': key,
                'value': value
            };
        });
    }
    render() {
        var symbol = "";
        console.log(this.props);
        if (!this.state) return null;
        else if (this.state.key == "UP") {
            symbol = "fa-arrow-circle-up";
        } else if(this.state.key == "DOWN") {
            symbol = "fa-arrow-circle-down";
        }
        return(
            <div className="trend">
                <SymbolTrend value={this.state.value} symbol={symbol} />
            </div>
        );
    }
}
class ServiceMeasurement extends React.Component {
  constructor(props) {
    super(props);
    Object.entries(this.props.measurement).map(([key,value]) =>{
      this.state = {
        'key': key,
        'value': value
      };
    });
  }
  render() {
    return(
      <div className="measurement">
          <span className="measureName">{this.state.key}:</span>
          <span className="measureValue">{this.state.value}</span>
      </div>
    );
  }
}
class Service extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.service;
  }
  render() {
    return(
      <div className="service">
        <h3>{this.state.name}</h3>
        <div className="measurements">
            {this.state.measurements.map((measurement, index) =>
                <ServiceMeasurement key={index} measurement={measurement} />
            )}
        </div>
        <div className="trends">
            {this.state.trends.map((trend, index) =>
                <Trend key={index} trend={trend} />
            )}
        </div>
      </div>
    );
  }
}
class MonitorDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.services;
  }
  render() {
    return(
      <div className="canvas">
        {this.state.services.map((row, index) =>
           <Service key={index} service={row} />
        )}
      </div>
    );
  }
}

// TODO use axios to get this from our python app
var services = {
  "services": [
    {
      "name": "ANS",
      "measurements": [
        {"Submitted": "49"},
        {"Stuck": "4"},
        {"Completed": "45"}
      ],
      "trends": []
    },
    {
      "name": "Discharges",
      "measurements": [
        {"Submitted": "10"},
        {"Completed": "10"}
      ],
      "trends": [
        {"UP": "20%"}
      ]
    },
    {
      "name": "Notifications",
      "measurements": [
        {"Acknowledgements": "59"},
        {"Submission confirmations": "50"}
      ],
      "trends": [
        {"DOWN": "50%"}
      ]
    },
    {
      "name": "PlanGen",
      "measurements": [
        {"PrintRequests": "80"}
      ],
      "trends": []
    }
  ]
}

ReactDOM.render(
   <MonitorDisplay services={services} />,
   document.getElementById('root')
);
