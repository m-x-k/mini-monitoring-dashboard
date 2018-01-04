class SymbolTrend extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var symbol = "fa " + this.props.symbol;
        return(
            <div>
                {this.props.value} <i className={symbol}/>
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
          <div className="measureName">{this.state.key}:</div>
          <div className="measureValue">{this.state.value}</div>
      </div>
    );
  }
}
class MonitorDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.fetchData=this.fetchData.bind(this);
    this.updateDateTime=this.updateDateTime.bind(this);
  }

  componentDidMount() {
      this.fetchData();
  }

  componentWillMount() {
      const id = setInterval(this.fetchData, 5000);
      this.setState({intervalId: id});
  }

  componentWillUnmount() {
      clearInterval(this.state.intervalId);
  }

  fetchData() {
      axios.get('/example')
      .then(({data}) => {
          this.setState(
              {services: data.services}
          );
      })
      .catch(function (error) {
          console.log(error);
      });

      this.updateDateTime();
  }

  updateDateTime() {
    var today = new Date();
    var currenttime = today.toDateString() + " " + today.toTimeString();
    this.setState({
        currenttime: currenttime
    });
  }

  render() {
      if (!this.state || !this.state.services) return null;
      console.log(this.state);
      return(
      <div className="container">
          <h2>New Foundations Support Dashboard</h2>
          <div className="canvas">
            {this.state.services.map((service, index) =>
              <div key={index} className="service">
                <h3>{service.name}</h3>
                <div className="measurements">
                    {service.measurements.map((measurement, index) =>
                        <ServiceMeasurement key={index} measurement={measurement} />
                    )}
                </div>
                <div className="trends">
                    {service.trends.map((trend, index) =>
                        <Trend key={index} trend={trend} />
                    )}
                </div>
              </div>
            )}
          </div>
          <div className="updated">Last Updated: <span>{this.state.currenttime}</span></div>
      </div>
    );
  }
}

ReactDOM.render(
   <MonitorDisplay />,
   document.getElementById('root')
);
