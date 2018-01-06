/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*********************!*\
  !*** ./jsx/app.jsx ***!
  \*********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("const SymbolTrend = ({ value, symbol }) => React.createElement(\n    \"div\",\n    { className: \"trend service-item\" },\n    value,\n    \" \",\n    React.createElement(\"i\", { className: \"fa \" + symbol })\n);\n\nconst symbol = key => {\n    if (key == \"UP\") {\n        return \"fa-arrow-circle-up trend-green\";\n    } else if (key == \"DOWN\") {\n        return \"fa-arrow-circle-down trend-red\";\n    }\n    return \"\";\n};\n\nconst Trend = ({ trend }) => React.createElement(\n    \"div\",\n    null,\n    Object.entries(trend).map(([key, value]) => React.createElement(SymbolTrend, { key: \"Trend:\" + key, value: value, symbol: symbol(key) }))\n);\n\nconst ServiceMeasurement = ({ measurement }) => React.createElement(\n    \"div\",\n    { className: \"measurement service-item\" },\n    Object.entries(measurement).map(([key, value]) => React.createElement(\n        \"div\",\n        { key: \"ServiceMeasurement:name:\" + key, className: \"measureName\" },\n        key,\n        \":\"\n    )),\n    Object.entries(measurement).map(([key, value]) => React.createElement(\n        \"div\",\n        { key: \"ServiceMeasurement:value:\" + key, className: \"measureValue\" },\n        value\n    ))\n);\n\nconst Service = ({ service }) => React.createElement(\n    \"div\",\n    { className: \"service\" },\n    React.createElement(\n        \"h3\",\n        null,\n        service.name\n    ),\n    React.createElement(\n        \"div\",\n        { className: \"trends\" },\n        service.trends.map((trend, index) => React.createElement(Trend, { key: \"Service:\" + index, trend: trend }))\n    ),\n    React.createElement(\n        \"div\",\n        { className: \"measurements\" },\n        service.measurements.map((measurement, index) => React.createElement(ServiceMeasurement, { key: \"Service:\" + index, measurement: measurement }))\n    )\n);\n\nconst Dashboard = ({ services, currenttime }) => React.createElement(\n    \"div\",\n    { className: \"container\" },\n    React.createElement(\n        \"h2\",\n        null,\n        \"Mini Monitoring Dashboard\"\n    ),\n    React.createElement(\n        \"div\",\n        { className: \"canvas\" },\n        services.map((service, index) => React.createElement(Service, { key: \"MonitorDisplay:\" + index, service: service }))\n    ),\n    React.createElement(\n        \"div\",\n        { className: \"lastUpdated\" },\n        \"Last Updated: \",\n        React.createElement(\n            \"span\",\n            { className: \"lastUpdatedDateTime\" },\n            currenttime\n        )\n    )\n);\n\nclass MonitorDisplay extends React.Component {\n    constructor(props) {\n        super(props);\n        this.fetchData = this.fetchData.bind(this);\n        this.updateDateTime = this.updateDateTime.bind(this);\n    }\n\n    componentDidMount() {\n        this.fetchData();\n    }\n\n    componentWillMount() {\n        const id = setInterval(this.fetchData, 10000);\n        this.setState({ intervalId: id });\n    }\n\n    componentWillUnmount() {\n        clearInterval(this.state.intervalId);\n    }\n\n    fetchData() {\n        axios.get('/example').then(({ data }) => {\n            this.setState({ services: data.services });\n        }).catch(function (error) {\n            console.log(error);\n        });\n\n        this.updateDateTime();\n    }\n\n    updateDateTime() {\n        var today = new Date();\n        var currenttime = today.toDateString() + \" \" + today.toTimeString();\n        this.setState({\n            currenttime: currenttime\n        });\n    }\n\n    render() {\n        if (!this.state || !this.state.services) return null;\n        return React.createElement(Dashboard, { services: this.state.services, currenttime: this.state.currenttime });\n    }\n}\n\nReactDOM.render(React.createElement(MonitorDisplay, null), document.getElementById('root'));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9qc3gvYXBwLmpzeD8yYmI3Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFN5bWJvbFRyZW5kID0gKHt2YWx1ZSwgc3ltYm9sfSkgPT4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwidHJlbmQgc2VydmljZS1pdGVtXCI+XG4gICAgICAgIHt2YWx1ZX0gPGkgY2xhc3NOYW1lPXtcImZhIFwiICsgc3ltYm9sfS8+XG4gICAgPC9kaXY+XG4pXG5cbmNvbnN0IHN5bWJvbCA9IChrZXkpID0+IHtcbiAgICBpZiAoa2V5ID09IFwiVVBcIikge1xuICAgICAgICByZXR1cm4gXCJmYS1hcnJvdy1jaXJjbGUtdXAgdHJlbmQtZ3JlZW5cIjtcbiAgICB9IGVsc2UgaWYoa2V5ID09IFwiRE9XTlwiKSB7XG4gICAgICAgIHJldHVybiBcImZhLWFycm93LWNpcmNsZS1kb3duIHRyZW5kLXJlZFwiO1xuICAgIH1cbiAgICByZXR1cm4gXCJcIjtcbn1cblxuY29uc3QgVHJlbmQgPSAoe3RyZW5kfSkgPT4gKFxuICAgIDxkaXY+XG4gICAgICAgIHtPYmplY3QuZW50cmllcyh0cmVuZCkubWFwKChba2V5LCB2YWx1ZV0pID0+XG4gICAgICAgICAgICA8U3ltYm9sVHJlbmQga2V5PXtcIlRyZW5kOlwiK2tleX0gdmFsdWU9e3ZhbHVlfSBzeW1ib2w9e3N5bWJvbChrZXkpfSAvPlxuICAgICAgICApfVxuICAgIDwvZGl2PlxuKVxuXG5jb25zdCBTZXJ2aWNlTWVhc3VyZW1lbnQgPSAoe21lYXN1cmVtZW50fSkgPT4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWVhc3VyZW1lbnQgc2VydmljZS1pdGVtXCI+XG4gICAgICAgIHtPYmplY3QuZW50cmllcyhtZWFzdXJlbWVudCkubWFwKChba2V5LCB2YWx1ZV0pID0+XG4gICAgICAgICAgICA8ZGl2IGtleT17XCJTZXJ2aWNlTWVhc3VyZW1lbnQ6bmFtZTpcIiArIGtleX0gY2xhc3NOYW1lPVwibWVhc3VyZU5hbWVcIj57a2V5fTo8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAge09iamVjdC5lbnRyaWVzKG1lYXN1cmVtZW50KS5tYXAoKFtrZXksIHZhbHVlXSkgPT5cbiAgICAgICAgICAgIDxkaXYga2V5PXtcIlNlcnZpY2VNZWFzdXJlbWVudDp2YWx1ZTpcIiArIGtleX0gY2xhc3NOYW1lPVwibWVhc3VyZVZhbHVlXCI+e3ZhbHVlfTwvZGl2PlxuICAgICAgICApfVxuICAgIDwvZGl2PlxuKVxuXG5jb25zdCBTZXJ2aWNlID0gKHtzZXJ2aWNlfSkgPT4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic2VydmljZVwiPlxuICAgICAgICA8aDM+e3NlcnZpY2UubmFtZX08L2gzPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyZW5kc1wiPlxuICAgICAgICAgICAge3NlcnZpY2UudHJlbmRzLm1hcCgodHJlbmQsIGluZGV4KSA9PlxuICAgICAgICAgICAgICAgIDxUcmVuZCBrZXk9e1wiU2VydmljZTpcIitpbmRleH0gdHJlbmQ9e3RyZW5kfSAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVhc3VyZW1lbnRzXCI+XG4gICAgICAgICAgICB7c2VydmljZS5tZWFzdXJlbWVudHMubWFwKChtZWFzdXJlbWVudCwgaW5kZXgpID0+XG4gICAgICAgICAgICAgICAgPFNlcnZpY2VNZWFzdXJlbWVudCBrZXk9e1wiU2VydmljZTpcIitpbmRleH0gbWVhc3VyZW1lbnQ9e21lYXN1cmVtZW50fSAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4pXG5cbmNvbnN0IERhc2hib2FyZCA9ICh7c2VydmljZXMsIGN1cnJlbnR0aW1lfSkgPT4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICA8aDI+TWluaSBNb25pdG9yaW5nIERhc2hib2FyZDwvaDI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhbnZhc1wiPlxuICAgICAgICB7c2VydmljZXMubWFwKChzZXJ2aWNlLCBpbmRleCkgPT5cbiAgICAgICAgICAgIDxTZXJ2aWNlIGtleT17XCJNb25pdG9yRGlzcGxheTpcIitpbmRleH0gc2VydmljZT17c2VydmljZX0gLz5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXN0VXBkYXRlZFwiPkxhc3QgVXBkYXRlZDogPHNwYW4gY2xhc3NOYW1lPVwibGFzdFVwZGF0ZWREYXRlVGltZVwiPntjdXJyZW50dGltZX08L3NwYW4+PC9kaXY+XG4gICAgPC9kaXY+XG4pXG5cbmNsYXNzIE1vbml0b3JEaXNwbGF5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5mZXRjaERhdGE9dGhpcy5mZXRjaERhdGEuYmluZCh0aGlzKTtcbiAgICB0aGlzLnVwZGF0ZURhdGVUaW1lPXRoaXMudXBkYXRlRGF0ZVRpbWUuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgdGhpcy5mZXRjaERhdGEoKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgIGNvbnN0IGlkID0gc2V0SW50ZXJ2YWwodGhpcy5mZXRjaERhdGEsIDEwMDAwKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2ludGVydmFsSWQ6IGlkfSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5pbnRlcnZhbElkKTtcbiAgfVxuXG4gIGZldGNoRGF0YSgpIHtcbiAgICAgIGF4aW9zLmdldCgnL2V4YW1wbGUnKVxuICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgICAgICAgIHtzZXJ2aWNlczogZGF0YS5zZXJ2aWNlc31cbiAgICAgICAgICApO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy51cGRhdGVEYXRlVGltZSgpO1xuICB9XG5cbiAgdXBkYXRlRGF0ZVRpbWUoKSB7XG4gICAgdmFyIHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICB2YXIgY3VycmVudHRpbWUgPSB0b2RheS50b0RhdGVTdHJpbmcoKSArIFwiIFwiICsgdG9kYXkudG9UaW1lU3RyaW5nKCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGN1cnJlbnR0aW1lOiBjdXJyZW50dGltZVxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgICAgaWYgKCF0aGlzLnN0YXRlIHx8ICF0aGlzLnN0YXRlLnNlcnZpY2VzKSByZXR1cm4gbnVsbDtcbiAgICAgIHJldHVybihcbiAgICAgICAgPERhc2hib2FyZCBzZXJ2aWNlcz17dGhpcy5zdGF0ZS5zZXJ2aWNlc30gY3VycmVudHRpbWU9e3RoaXMuc3RhdGUuY3VycmVudHRpbWV9IC8+XG4gICAgICApO1xuICB9XG59XG5cblJlYWN0RE9NLnJlbmRlcihcbiAgIDxNb25pdG9yRGlzcGxheSAvPixcbiAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290Jylcbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8ganN4L2FwcC5qc3giXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQURBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFNQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBTEE7QUFDQTtBQVNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQVBBO0FBQ0E7QUFjQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUEE7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQS9DQTtBQUNBO0FBaURBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///0\n");

/***/ })
/******/ ]);