/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var Gallery = (function (_super) {
    __extends(Gallery, _super);
    function Gallery() {
        var _this = _super.call(this) || this;
        _this.state = {
            containerWidth: 0
        };
        _this.handleResize = _this.handleResize.bind(_this);
        return _this;
    }
    Gallery.prototype.componentDidMount = function () {
        this.setState({
            containerWidth: Math.floor(ReactDOM.findDOMNode(this).getBoundingClientRect().width)
        });
        window.addEventListener('resize', this.handleResize);
    };
    Gallery.prototype.componentDidUpdate = function () {
        var clientWidth = ReactDOM.findDOMNode(this).getBoundingClientRect().width;
        if (clientWidth !== this.state.containerWidth) {
            this.setState({ containerWidth: Math.floor(clientWidth) });
        }
    };
    Gallery.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.handleResize, false);
    };
    Gallery.prototype.handleResize = function (e) {
        this.setState({
            containerWidth: Math.floor(ReactDOM.findDOMNode(this).getBoundingClientRect().width)
        });
    };
    Gallery.prototype.render = function () {
        var _this = this;
        var cols = this.props.cols, photoPreviewNodes = [], contWidth = this.state.containerWidth - (cols * (this.props.margin * 2));
        contWidth = Math.floor(contWidth); // add some padding to prevent layout prob
        var remainder = this.props.photos.length % cols;
        if (remainder) {
            var lastRowWidth = Math.floor(((this.state.containerWidth / cols) * remainder) - (remainder * (this.props.margin * 2)));
            var lastRowIndex = this.props.photos.length - remainder;
        }
        // loop thru each set of  cols num
        // eg. if cols is 3 it will  loop thru 0,1,2, then 3,4,5 to perform calculations for the particular set
        for (var i = 0; i < this.props.photos.length; i += cols) {
            var totalAr = 0, commonHeight = 0;
            var aspectRatio = [];
            // get the total aspect ratio of the row
            for (var j = i; j < i + cols; j++) {
                if (j == this.props.photos.length) {
                    break;
                }
                aspectRatio[j] = this.props.photos[j].width / this.props.photos[j].height;
                totalAr += aspectRatio[j];
            }
            if (i === lastRowIndex) {
                commonHeight = lastRowWidth / totalAr;
            }
            else {
                commonHeight = contWidth / totalAr;
            }
            var _loop_1 = function (k) {
                if (k == this_1.props.photos.length) {
                    return "break";
                }
                var src = this_1.props.photos[k].src, srcset = void 0, sizes = void 0;
                if (this_1.props.photos[k].srcset) {
                    srcset = this_1.props.photos[k].srcset.join();
                }
                if (this_1.props.photos[k].sizes) {
                    sizes = this_1.props.photos[k].sizes.join();
                }
                style.margin = this_1.props.margin;
                photoPreviewNodes.push(React.createElement("div", { key: k, style: style },
                    React.createElement("a", { href: "#", className: String(k), onClick: function (e) { return _this.props.onClickPhoto(k, e); } },
                        React.createElement("img", { src: src, srcSet: srcset, sizes: sizes, style: { display: 'block', border: 0 }, height: commonHeight, width: commonHeight * aspectRatio[k], alt: this_1.props.photos[k].alt }))));
            };
            var this_1 = this;
            // run thru the same set of items again to give the width and common height
            for (var k = i; k < i + cols; k++) {
                var state_1 = _loop_1(k);
                if (state_1 === "break")
                    break;
            }
        }
        return (this.renderGallery(photoPreviewNodes));
    };
    Gallery.prototype.renderGallery = function (photoPreviewNodes) {
        return (React.createElement("div", { id: "Gallery", className: "clearfix" }, photoPreviewNodes));
    };
    return Gallery;
}(React.Component));
Gallery.defaultProps = {
    cols: 3,
    onClickPhoto: function (k, e) {
        e.preventDefault();
    },
    margin: 2
};
exports.Gallery = Gallery;
;
// Gallery image style
var style = {
    display: 'block',
    backgroundColor: '#e3e3e3',
    float: 'left',
    margin: 0
};


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map