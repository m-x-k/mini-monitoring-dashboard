class ServiceMeasurement extends React.Component {
  constructor(props) {
    super(props);
    Object.entries(this.props.measurement).map(([key, value]) => {
      this.state = {
        'key': key,
        'value': value
      };
    });
  }
  render() {
    return React.createElement(
      'div',
      { className: 'measurement' },
      React.createElement(
        'span',
        { className: 'measureName' },
        this.state.key,
        ':'
      ),
      React.createElement(
        'span',
        { className: 'measureValue' },
        this.state.value
      )
    );
  }
}
class Service extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.service;
  }
  render() {
    return React.createElement(
      'div',
      { className: 'service' },
      React.createElement(
        'h3',
        null,
        this.props.service.name
      ),
      this.state.measurements.map((measurement, index) => React.createElement(ServiceMeasurement, { key: index, measurement: measurement }))
    );
  }
}
class MonitorDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.services;
  }
  render() {
    return React.createElement(
      'div',
      { className: 'canvas' },
      this.state.services.map((row, index) => React.createElement(Service, { key: index, service: row }))
    );
  }
}

var services = {
  "services": [{
    "name": "Service A",
    "measurements": [{ "Hits": "100" }, { "CPU": "99%" }]
  }, {
    "name": "Service B",
    "measurements": [{ "Hits": "200" }, { "Disk Usage": "80%" }]
  }, {
    "name": "Service C",
    "measurements": [{ "Hits": "300" }, { "CPU": "50%" }]
  }, {
    "name": "Service D",
    "measurements": [{ "Hits": "400" }]
  }]
};

ReactDOM.render(React.createElement(MonitorDisplay, { services: services }), document.getElementById('root'));
