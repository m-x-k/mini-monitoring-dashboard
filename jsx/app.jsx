const SymbolTrend = ({value, symbol}) => (
    <div className="trend service-item">
        {value} <i className={"fa " + symbol}/>
    </div>
)

const symbol = (key) => {
    if (key == "UP") {
        return "fa-arrow-circle-up trend-green";
    } else if(key == "DOWN") {
        return "fa-arrow-circle-down trend-red";
    }
    return "";
}

const Trend = ({trend}) => (
    <div>
        {Object.entries(trend).map(([key, value]) =>
            <SymbolTrend key={"Trend:"+key} value={value} symbol={symbol(key)} />
        )}
    </div>
)

const ServiceMeasurement = ({measurement}) => (
    <div className="measurement service-item">
        {Object.entries(measurement).map(([key, value]) =>
            <div key={"ServiceMeasurement:name:" + key} className="measureName">{key}:</div>
        )}
        {Object.entries(measurement).map(([key, value]) =>
            <div key={"ServiceMeasurement:value:" + key} className="measureValue">{value}</div>
        )}
    </div>
)

const Service = ({service}) => (
    <div className="service">
        <h3>{service.name}</h3>
        <div className="trends">
            {service.trends.map((trend, index) =>
                <Trend key={"Service:"+index} trend={trend} />
            )}
        </div>
        <div className="measurements">
            {service.measurements.map((measurement, index) =>
                <ServiceMeasurement key={"Service:"+index} measurement={measurement} />
            )}
        </div>
    </div>
)

const Dashboard = ({services, currenttime}) => (
    <div className="container">
      <h2>Mini Monitoring Dashboard</h2>
      <div className="canvas">
        {services.map((service, index) =>
            <Service key={"MonitorDisplay:"+index} service={service} />
        )}
      </div>
      <div className="lastUpdated">Last Updated: <span className="lastUpdatedDateTime">{currenttime}</span></div>
    </div>
)

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
      const id = setInterval(this.fetchData, 10000);
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
      return(
        <Dashboard services={this.state.services} currenttime={this.state.currenttime} />
      );
  }
}

ReactDOM.render(
   <MonitorDisplay />,
   document.getElementById('root')
);
