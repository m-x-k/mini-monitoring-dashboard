'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SymbolTrend = function (_React$Component) {
    _inherits(SymbolTrend, _React$Component);

    function SymbolTrend(props) {
        _classCallCheck(this, SymbolTrend);

        return _possibleConstructorReturn(this, (SymbolTrend.__proto__ || Object.getPrototypeOf(SymbolTrend)).call(this, props));
    }

    _createClass(SymbolTrend, [{
        key: 'render',
        value: function render() {
            var symbol = "fa " + this.props.symbol;
            return React.createElement(
                'div',
                null,
                this.props.value,
                ' ',
                React.createElement('i', { className: symbol })
            );
        }
    }]);

    return SymbolTrend;
}(React.Component);

var Trend = function (_React$Component2) {
    _inherits(Trend, _React$Component2);

    function Trend(props) {
        _classCallCheck(this, Trend);

        var _this2 = _possibleConstructorReturn(this, (Trend.__proto__ || Object.getPrototypeOf(Trend)).call(this, props));

        Object.entries(_this2.props.trend).map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                value = _ref2[1];

            _this2.state = {
                'key': key,
                'value': value
            };
        });
        return _this2;
    }

    _createClass(Trend, [{
        key: 'render',
        value: function render() {
            var symbol = "";
            console.log(this.props);
            if (!this.state) return null;else if (this.state.key == "UP") {
                symbol = "fa-arrow-circle-up";
            } else if (this.state.key == "DOWN") {
                symbol = "fa-arrow-circle-down";
            }
            return React.createElement(
                'div',
                { className: 'trend' },
                React.createElement(SymbolTrend, { value: this.state.value, symbol: symbol })
            );
        }
    }]);

    return Trend;
}(React.Component);

var ServiceMeasurement = function (_React$Component3) {
    _inherits(ServiceMeasurement, _React$Component3);

    function ServiceMeasurement(props) {
        _classCallCheck(this, ServiceMeasurement);

        var _this3 = _possibleConstructorReturn(this, (ServiceMeasurement.__proto__ || Object.getPrototypeOf(ServiceMeasurement)).call(this, props));

        Object.entries(_this3.props.measurement).map(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                key = _ref4[0],
                value = _ref4[1];

            _this3.state = {
                'key': key,
                'value': value
            };
        });
        return _this3;
    }

    _createClass(ServiceMeasurement, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'measurement' },
                React.createElement(
                    'div',
                    { className: 'measureName' },
                    this.state.key,
                    ':'
                ),
                React.createElement(
                    'div',
                    { className: 'measureValue' },
                    this.state.value
                )
            );
        }
    }]);

    return ServiceMeasurement;
}(React.Component);

var MonitorDisplay = function (_React$Component4) {
    _inherits(MonitorDisplay, _React$Component4);

    function MonitorDisplay(props) {
        _classCallCheck(this, MonitorDisplay);

        var _this4 = _possibleConstructorReturn(this, (MonitorDisplay.__proto__ || Object.getPrototypeOf(MonitorDisplay)).call(this, props));

        _this4.fetchData = _this4.fetchData.bind(_this4);
        _this4.updateDateTime = _this4.updateDateTime.bind(_this4);
        return _this4;
    }

    _createClass(MonitorDisplay, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fetchData();
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var id = setInterval(this.fetchData, 5000);
            this.setState({ intervalId: id });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearInterval(this.state.intervalId);
        }
    }, {
        key: 'fetchData',
        value: function fetchData() {
            var _this5 = this;

            axios.get('/example').then(function (_ref5) {
                var data = _ref5.data;

                _this5.setState({ services: data.services });
            }).catch(function (error) {
                console.log(error);
            });

            this.updateDateTime();
        }
    }, {
        key: 'updateDateTime',
        value: function updateDateTime() {
            var today = new Date();
            var currenttime = today.toDateString() + " " + today.toTimeString();
            this.setState({
                currenttime: currenttime
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (!this.state || !this.state.services) return null;
            console.log(this.state);
            return React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'h2',
                    null,
                    'New Foundations Support Dashboard'
                ),
                React.createElement(
                    'div',
                    { className: 'canvas' },
                    this.state.services.map(function (service, index) {
                        return React.createElement(
                            'div',
                            { key: index, className: 'service' },
                            React.createElement(
                                'h3',
                                null,
                                service.name
                            ),
                            React.createElement(
                                'div',
                                { className: 'measurements' },
                                service.measurements.map(function (measurement, index) {
                                    return React.createElement(ServiceMeasurement, { key: index, measurement: measurement });
                                })
                            ),
                            React.createElement(
                                'div',
                                { className: 'trends' },
                                service.trends.map(function (trend, index) {
                                    return React.createElement(Trend, { key: index, trend: trend });
                                })
                            )
                        );
                    })
                ),
                React.createElement(
                    'div',
                    { className: 'updated' },
                    'Last Updated: ',
                    React.createElement(
                        'span',
                        null,
                        this.state.currenttime
                    )
                )
            );
        }
    }]);

    return MonitorDisplay;
}(React.Component);

ReactDOM.render(React.createElement(MonitorDisplay, null), document.getElementById('root'));

//# sourceMappingURL=app.js.map