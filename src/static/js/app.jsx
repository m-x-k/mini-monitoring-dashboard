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
      "name": "ANS",
      "measurements": [
        {"Submitted": "49"},
        {"Stuck": "4"},
        {"Completed": "45"}
      ]
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
        {"Acknologements": "59"},
        {"Submission confirmations": "50"}
      ]
    },
    {
      "name": "PlanGen",
      "measurements": [
        {"PrintRequests": "80"}
      ]
    }
  ]
}

ReactDOM.render(
   <MonitorDisplay services={services} />,
   document.getElementById('root')
);
