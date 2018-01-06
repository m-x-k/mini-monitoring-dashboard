"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SymbolTrend = function SymbolTrend(_ref) {
    var value = _ref.value,
        symbol = _ref.symbol;
    return React.createElement(
        "div",
        { className: "trend service-item" },
        value,
        " ",
        React.createElement("i", { className: "fa " + symbol })
    );
};

var symbol = function symbol(key) {
    if (key == "UP") {
        return "fa-arrow-circle-up trend-green";
    } else if (key == "DOWN") {
        return "fa-arrow-circle-down trend-red";
    }
    return "";
};

var Trend = function Trend(_ref2) {
    var trend = _ref2.trend;
    return React.createElement(
        "div",
        null,
        Object.entries(trend).map(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                key = _ref4[0],
                value = _ref4[1];

            return React.createElement(SymbolTrend, { key: "Trend:" + key, value: value, symbol: symbol(key) });
        })
    );
};

var ServiceMeasurement = function ServiceMeasurement(_ref5) {
    var measurement = _ref5.measurement;
    return React.createElement(
        "div",
        { className: "measurement service-item" },
        Object.entries(measurement).map(function (_ref6) {
            var _ref7 = _slicedToArray(_ref6, 2),
                key = _ref7[0],
                value = _ref7[1];

            return React.createElement(
                "div",
                { key: "ServiceMeasurement:name:" + key, className: "measureName" },
                key,
                ":"
            );
        }),
        Object.entries(measurement).map(function (_ref8) {
            var _ref9 = _slicedToArray(_ref8, 2),
                key = _ref9[0],
                value = _ref9[1];

            return React.createElement(
                "div",
                { key: "ServiceMeasurement:value:" + key, className: "measureValue" },
                value
            );
        })
    );
};

var Service = function Service(_ref10) {
    var service = _ref10.service;
    return React.createElement(
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
            service.trends.map(function (trend, index) {
                return React.createElement(Trend, { key: "Service:" + index, trend: trend });
            })
        ),
        React.createElement(
            "div",
            { className: "measurements" },
            service.measurements.map(function (measurement, index) {
                return React.createElement(ServiceMeasurement, { key: "Service:" + index, measurement: measurement });
            })
        )
    );
};

var Dashboard = function Dashboard(_ref11) {
    var services = _ref11.services,
        currenttime = _ref11.currenttime;
    return React.createElement(
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
            services.map(function (service, index) {
                return React.createElement(Service, { key: "MonitorDisplay:" + index, service: service });
            })
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
};

var MonitorDisplay = function (_React$Component) {
    _inherits(MonitorDisplay, _React$Component);

    function MonitorDisplay(props) {
        _classCallCheck(this, MonitorDisplay);

        var _this = _possibleConstructorReturn(this, (MonitorDisplay.__proto__ || Object.getPrototypeOf(MonitorDisplay)).call(this, props));

        _this.fetchData = _this.fetchData.bind(_this);
        _this.updateDateTime = _this.updateDateTime.bind(_this);
        return _this;
    }

    _createClass(MonitorDisplay, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.fetchData();
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            var id = setInterval(this.fetchData, 10000);
            this.setState({ intervalId: id });
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            clearInterval(this.state.intervalId);
        }
    }, {
        key: "fetchData",
        value: function fetchData() {
            var _this2 = this;

            axios.get('/example').then(function (_ref12) {
                var data = _ref12.data;

                _this2.setState({ services: data.services });
            }).catch(function (error) {
                console.log(error);
            });

            this.updateDateTime();
        }
    }, {
        key: "updateDateTime",
        value: function updateDateTime() {
            var today = new Date();
            var currenttime = today.toDateString() + " " + today.toTimeString();
            this.setState({
                currenttime: currenttime
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (!this.state || !this.state.services) return null;
            return React.createElement(Dashboard, { services: this.state.services, currenttime: this.state.currenttime });
        }
    }]);

    return MonitorDisplay;
}(React.Component);

ReactDOM.render(React.createElement(MonitorDisplay, null), document.getElementById('root'));
