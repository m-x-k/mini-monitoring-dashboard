const SymbolTrend = ({ value, symbol }) => React.createElement(
    "div",
    { className: "trend service-item" },
    value,
    " ",
    React.createElement("i", { className: "fa " + symbol })
);

const symbol = key => {
    if (key == "UP") {
        return "fa-arrow-circle-up trend-green";
    } else if (key == "DOWN") {
        return "fa-arrow-circle-down trend-red";
    }
    return "";
};

const Trend = ({ trend }) => React.createElement(
    "div",
    null,
    Object.entries(trend).map(([key, value]) => React.createElement(SymbolTrend, { key: "Trend:" + key, value: value, symbol: symbol(key) }))
);

const ServiceMeasurement = ({ measurement }) => React.createElement(
    "div",
    { className: "measurement service-item" },
    Object.entries(measurement).map(([key, value]) => React.createElement(
        "div",
        { key: "ServiceMeasurement:name:" + key, className: "measureName" },
        key,
        ":"
    )),
    Object.entries(measurement).map(([key, value]) => React.createElement(
        "div",
        { key: "ServiceMeasurement:value:" + key, className: "measureValue" },
        value
    ))
);

const Service = ({ service }) => React.createElement(
    "div",
    { className: "service" },
    React.createElement(
        "h3",
        null,
        service.name
    ),
    React.createElement(
        "div",
        { className: "trends" },
        service.trends.map((trend, index) => React.createElement(Trend, { key: "Service:" + index, trend: trend }))
    ),
    React.createElement(
        "div",
        { className: "measurements" },
        service.measurements.map((measurement, index) => React.createElement(ServiceMeasurement, { key: "Service:" + index, measurement: measurement }))
    )
);

const Dashboard = ({ services, currenttime }) => React.createElement(
    "div",
    { className: "container" },
    React.createElement(
        "h2",
        null,
        "Mini Monitoring Dashboard"
    ),
    React.createElement(
        "div",
        { className: "canvas" },
        services.map((service, index) => React.createElement(Service, { key: "MonitorDisplay:" + index, service: service }))
    ),
    React.createElement(
        "div",
        { className: "lastUpdated" },
        "Last Updated: ",
        React.createElement(
            "span",
            { className: "lastUpdatedDateTime" },
            currenttime
        )
    )
);

class MonitorDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
        this.updateDateTime = this.updateDateTime.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    componentWillMount() {
        const id = setInterval(this.fetchData, 10000);
        this.setState({ intervalId: id });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    fetchData() {
        axios.get('/example').then(({ data }) => {
            this.setState({ services: data.services });
        }).catch(function (error) {
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
        return React.createElement(Dashboard, { services: this.state.services, currenttime: this.state.currenttime });
    }
}

ReactDOM.render(React.createElement(MonitorDisplay, null), document.getElementById('root'));
