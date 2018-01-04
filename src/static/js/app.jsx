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
        <h3>{this.props.service.name}</h3>
        {this.state.measurements.map((measurement, index) =>
            <ServiceMeasurement key={index} measurement={measurement} />
        )}
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

var services = {
  "services": [
    {
      "name": "Service A",
      "measurements": [
        {"Hits": "100"},
        {"CPU": "99%"}
      ]
    },
    {
      "name": "Service B",
      "measurements": [
        {"Hits": "200"},
        {"Disk Usage": "80%"}
      ]
    },
    {
      "name": "Service C",
      "measurements": [
        {"Hits": "300"},
        {"CPU": "50%"}
      ]
    },
    {
      "name": "Service D",
      "measurements": [
        {"Hits": "400"}
      ]
    }
  ]
}

ReactDOM.render(
   <MonitorDisplay services={services} />,
   document.getElementById('root')
);
