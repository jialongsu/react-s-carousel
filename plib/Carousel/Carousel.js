"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _iscroll = _interopRequireDefault(require("./lib/iscroll"));

var _Carousel = _interopRequireDefault(require("./Carousel.scss"));

var Carousel =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(Carousel, _PureComponent);

  function Carousel(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Carousel);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(Carousel).call(this, props));

    _this.handlerTouchmove = function (e) {
      e.preventDefault();
    };

    _this._bindScrollEvent = function () {
      var iscroll = _this.iscroll;
      iscroll.on('scrollEnd', _this._onScrollEnd);
    };

    _this._onScrollEnd = function () {
      _this._loopScroll();
    };

    _this.onTouchStart = function () {
      _this.auto_timer && clearInterval(_this.auto_timer);
    };

    _this.onTouchEnd = function () {
      var _this$props = _this.props,
          auto = _this$props.auto,
          children = _this$props.children;
      children.length > 1 && auto && _this._auto();
    };

    _this.refresh = function () {
      _this.iscroll.refresh();
    };

    _this.getPagePosition = function () {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var horizontal = _this.props.horizontal;
      var goToPageX = horizontal ? index : 0;
      var goToPageY = !horizontal ? index : 0;
      return {
        goToPageX: goToPageX,
        goToPageY: goToPageY
      };
    };

    _this._auto = function () {
      var iscroll = _this.iscroll;
      _this.auto_timer && clearInterval(_this.auto_timer);
      _this.auto_timer = setInterval(function () {
        iscroll.next();
      }, _this.props.autoplayTime);
    };

    _this._stopAuto = function () {
      _this.auto_timer && clearInterval(_this.auto_timer);
    };

    _this.goToPage = function (index) {
      var _this$getPagePosition = _this.getPagePosition(index),
          goToPageX = _this$getPagePosition.goToPageX,
          goToPageY = _this$getPagePosition.goToPageY;

      _this.iscroll.goToPage(goToPageX, goToPageY, 250);
    };

    _this.getIndicator = function (view) {
      _this.indicator = view;
    };

    _this.getWrapper = function (view) {
      _this.wrapper = view;
    };

    _this.getScroller = function (view) {
      _this.scroller = view;
    };

    _this.getCarouselItem = function (view) {
      _this.carouselItem = view;
    };

    var randomId = _this.rand();

    _this.state = {
      wrapperId: 'wrapper_' + randomId,
      scrollerId: 'scroll_' + randomId
    };
    _this.itemWidth = 0;
    _this.itemHeight = 0;
    return _this;
  }
  /**
   * 获取scroller随机id
   * @returns {string}
   */


  (0, _createClass2.default)(Carousel, [{
    key: "rand",
    value: function rand() {
      var pre = 0;
      var inc = 2;
      pre += inc;
      var randNum = pre + Math.random() * inc;
      randNum = randNum.toString();
      var length = randNum.length;
      var randNums = randNum.substring(length - 3, length);
      var time = new Date().getTime();
      time = time.toString();
      var timeLen = time.length;
      time = time.substring(timeLen - 3, timeLen);
      randNums += time;
      return randNums;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var children = this.props.children;

      if (children && children.length > 0) {
        this.initIscroll();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(nextProps) {
      if (this.props.children.length != nextProps.children.length) {
        this.initIscroll();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.auto_timer && clearInterval(this.auto_timer);

      if (this.iscroll) {
        this.iscroll.destroy();
        this.iscroll = null;
      }

      document.removeEventListener('touchmove', this.handlerTouchmove);
    }
  }, {
    key: "initIscroll",
    value: function initIscroll() {
      this.initStyle();
      var _this$props2 = this.props,
          loop = _this$props2.loop,
          auto = _this$props2.auto,
          children = _this$props2.children,
          bounce = _this$props2.bounce,
          initItem = _this$props2.initItem,
          horizontal = _this$props2.horizontal,
          disable = _this$props2.disable,
          wrapperId = this.state.wrapperId;
      var initItem_ = loop ? 1 : initItem;
      var startX = -(this.itemWidth * initItem_);
      var startY = -(this.itemHeight * initItem_);
      var options = {
        scrollX: horizontal,
        scrollY: !horizontal,
        //在用户快速触摸屏幕时，你可以开/关势能动画。关闭此功能将大幅度提升性能
        momentum: false,
        //对齐到固定的位置和元素
        snap: true,
        snapSpeed: 400,
        //支持键盘控制
        keyBindings: false,
        //默认初始位置
        startX: startX,
        startY: startY,
        // 默认iscroll会拦截元素的默认事件处理函数，我们需要响应onClick，因此要配置
        preventDefault: false,
        useTransition: false,
        useTransform: false,
        bounce: bounce
      };
      this.iscroll = new _iscroll.default("#".concat(wrapperId), options);
      disable && this.iscroll.disable();
      this.iscroll.currentPage.pageX = initItem_;
      this.currentPageIndex = initItem_;
      this.maxLeng = children.length; // 修复iscroll在新版chrome和其他新版浏览器(Android 7.0)无法滚动bug

      document.addEventListener('touchmove', this.handlerTouchmove, this.isPassive() ? {
        capture: false,
        passive: false
      } : false);

      this._bindScrollEvent(); //初始化位置


      if (loop && auto && children.length > 1) {
        var _this$getPagePosition2 = this.getPagePosition(),
            goToPageX = _this$getPagePosition2.goToPageX,
            goToPageY = _this$getPagePosition2.goToPageY;

        this.iscroll.goToPage(goToPageX, goToPageY, 0);
      } else {
        var _this$getPagePosition3 = this.getPagePosition(initItem),
            _goToPageX = _this$getPagePosition3.goToPageX,
            _goToPageY = _this$getPagePosition3.goToPageY;

        this.iscroll.goToPage(_goToPageX, _goToPageY, 0);
      } //是否自动滚动


      if (auto && children.length > 1) {
        this._auto();
      } else {
        this._stopAuto();
      }
    }
  }, {
    key: "isPassive",
    value: function isPassive() {
      var supportsPassiveOption = false;

      try {
        addEventListener('test', null, Object.defineProperty({}, 'passive', {
          get: function get() {
            supportsPassiveOption = true;
          }
        }));
      } catch (e) {}

      return supportsPassiveOption;
    }
  }, {
    key: "_loopScroll",

    /**
     * 循环滚动
     * @private
     */
    value: function _loopScroll() {
      var _this$props3 = this.props,
          loop = _this$props3.loop,
          children = _this$props3.children,
          pageScrollEnd = _this$props3.pageScrollEnd,
          horizontal = _this$props3.horizontal,
          indicator = this.indicator,
          _changIndicator = indicator ? indicator._changIndicator : '',
          _this$iscroll$current = this.iscroll.currentPage,
          pageX = _this$iscroll$current.pageX,
          pageY = _this$iscroll$current.pageY,
          pageIndex = this.iscroll && (horizontal ? pageX : pageY);

      var scrollPageIndex = -1;

      if (loop && children.length > 1) {
        var length = this.loopChildrenLength || children.length;
        var maxLength = length - 1;
        var resetVal = 0;
        var index = pageIndex - 1;

        if (pageIndex == maxLength) {
          var _this$getPagePosition4 = this.getPagePosition(),
              goToPageX = _this$getPagePosition4.goToPageX,
              goToPageY = _this$getPagePosition4.goToPageY;

          this.iscroll.goToPage(goToPageX, goToPageY, 0);
          index = 0;
        } else if (pageIndex == resetVal) {
          var val = length - 2;

          var _this$getPagePosition5 = this.getPagePosition(val),
              _goToPageX2 = _this$getPagePosition5.goToPageX,
              _goToPageY2 = _this$getPagePosition5.goToPageY;

          this.iscroll.goToPage(_goToPageX2, _goToPageY2, 0);
          index = val - 1;
        }

        scrollPageIndex = index;
      } else {
        scrollPageIndex = pageIndex;
      }

      this.currentPageIndex = scrollPageIndex;
      _changIndicator && _changIndicator(scrollPageIndex);
      pageScrollEnd && pageScrollEnd(scrollPageIndex, this.iscroll);
    }
  }, {
    key: "initStyle",

    /**
        * 初始化布局
        */
    value: function initStyle() {
      var itemEl = this.carouselItem;
      if (!itemEl) return;
      var wrapperEl = this.wrapper,
          horizontal = this.props.horizontal,
          scrollerEl = this.scroller,
          length = this.loopChildrenLength || this.props.children.length;
      var wrapperAtres = '',
          scrollerAtres = '';

      if (horizontal) {
        var itemWidth = itemEl.clientWidth || itemEl.offsetWidth;
        var itemTotalWidth = itemWidth * length;
        wrapperAtres = 'width:' + itemWidth + 'px';
        scrollerAtres = 'width:' + itemTotalWidth + 'px';
        this.itemWidth = itemWidth;
      } else {
        var itemHeight = itemEl.clientHeight || itemEl.offsetHeight;
        var itemTotalHeight = itemHeight * length;
        wrapperAtres = 'height:' + itemHeight + 'px';
        scrollerAtres = 'height:' + itemTotalHeight + 'px';
        this.itemHeight = itemHeight;
      }

      wrapperEl.setAttribute('style', wrapperAtres);
      scrollerEl.setAttribute('style', scrollerAtres);
    }
    /**
        * 创建循环布局
        * @returns {Array}
        * @private
        */

  }, {
    key: "_createLoopLayout",
    value: function _createLoopLayout() {
      var _this2 = this;

      var _this$props4 = this.props,
          children = _this$props4.children,
          loop = _this$props4.loop,
          itemCls = _this$props4.itemCls,
          itemStyle = _this$props4.itemStyle,
          horizontal = _this$props4.horizontal;
      var childrenLength = children ? children.length : 0;
      var rightItem = '';
      var leftItem = '';
      var childrenAry = [];
      var className = horizontal ? _Carousel.default.carousel_item_h : _Carousel.default.carousel_item_v;

      _react.default.Children.map(children, function (item, i) {
        item = _react.default.createElement("div", {
          key: i,
          ref: _this2.getCarouselItem,
          style: itemStyle,
          className: "".concat(className, " ").concat(itemCls)
        }, item);
        childrenAry.push(item);

        if (loop && children.length > 1) {
          var newItem = _react.default.createElement("div", {
            key: i === 0 ? childrenLength + 2 : -1,
            ref: _this2.getCarouselItem,
            style: itemStyle,
            className: "".concat(className, " ").concat(itemCls)
          }, item);

          if (i === 0) {
            leftItem = newItem;
          } else if (i === childrenLength - 1) {
            rightItem = newItem;
          }
        }
      });

      if (loop && children && children.length > 1) {
        childrenAry.push(leftItem);
        childrenAry.unshift(rightItem);
        this.loopChildrenLength = childrenAry.length;
      }

      return childrenAry;
    }
    /**
        * 自动滚动
        * @private
        */

  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          style = _this$props5.style,
          className = _this$props5.className,
          children = _this$props5.children,
          indicator = _this$props5.indicator,
          indicatorDef = _this$props5.indicatorDef,
          indicatorActive = _this$props5.indicatorActive,
          indicatorStyle = _this$props5.indicatorStyle,
          _this$state = this.state,
          wrapperId = _this$state.wrapperId,
          scrollerId = _this$state.scrollerId;

      var childrenAry = this._createLoopLayout();

      return _react.default.createElement("div", {
        id: "viewport",
        className: "".concat(_Carousel.default.viewport, " ").concat(className),
        style: style,
        onMouseDown: this.onTouchStart,
        onMouseUp: this.onTouchEnd,
        onTouchStart: this.onTouchStart,
        onTouchEnd: this.onTouchEnd
      }, _react.default.createElement("div", {
        id: wrapperId,
        ref: this.getWrapper,
        className: _Carousel.default.wrapper
      }, _react.default.createElement("div", {
        id: scrollerId,
        ref: this.getScroller,
        className: _Carousel.default.scroller
      }, childrenAry)), indicator ? _react.default.createElement(Indicator, {
        ref: this.getIndicator,
        itemAry: children,
        indicatorStyle: indicatorStyle,
        indicatorDef: indicatorDef,
        indicatorActive: indicatorActive
      }) : null);
    }
  }]);
  return Carousel;
}(_react.PureComponent);

exports.default = Carousel;
Carousel.propTypes = {
  initItem: _propTypes.default.number,
  //初始化显示item
  loop: _propTypes.default.bool,
  //是否循环滚动
  auto: _propTypes.default.bool,
  //是否自动滚动
  autoplayTime: _propTypes.default.number,
  //自动滚动间隔
  indicator: _propTypes.default.bool,
  //是否显示指示器
  indicatorCls: _propTypes.default.object,
  //指示器容器样式
  indicatorStyle: _propTypes.default.object,
  //指示器样式
  indicatorDef: _propTypes.default.object,
  //指示器默认布局
  indicatorActive: _propTypes.default.object,
  //指示器选中布局
  bounce: _propTypes.default.bool,
  pageScrollEnd: _propTypes.default.func,
  //滑动结束回调
  itemCls: _propTypes.default.any,
  itemStyle: _propTypes.default.object,
  horizontal: _propTypes.default.bool,
  disable: _propTypes.default.bool //是否禁用手势

};
Carousel.defaultProps = {
  initItem: 0,
  loop: true,
  auto: true,
  autoplayTime: 3000,
  indicator: true,
  bounce: false,
  horizontal: true,
  disable: false,
  itemCls: '',
  itemStyle: {}
};

var Indicator =
/*#__PURE__*/
function (_PureComponent2) {
  (0, _inherits2.default)(Indicator, _PureComponent2);

  function Indicator() {
    var _getPrototypeOf2;

    var _this3;

    (0, _classCallCheck2.default)(this, Indicator);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this3 = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Indicator)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this3.state = {
      currentPageIndex: 0
    };

    _this3._changIndicator = function (index) {
      if (index != _this3.state.currentPageIndex) {
        _this3.setState({
          currentPageIndex: index
        });
      }
    };

    return _this3;
  }

  (0, _createClass2.default)(Indicator, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props6 = this.props,
          itemAry = _this$props6.itemAry,
          _this$props6$indicato = _this$props6.indicatorCls,
          indicatorCls = _this$props6$indicato === void 0 ? '' : _this$props6$indicato,
          indicatorDef = _this$props6.indicatorDef,
          indicatorActive = _this$props6.indicatorActive,
          indicatorStyle = _this$props6.indicatorStyle;
      return _react.default.createElement("div", {
        className: "".concat(_Carousel.default.indicator, " ").concat(indicatorCls),
        style: indicatorStyle
      }, itemAry && itemAry.map(function (item, i) {
        var indicatorItem = '';

        if (i === _this4.state.currentPageIndex) {
          indicatorItem = indicatorActive ? indicatorActive : _react.default.createElement("div", {
            key: i,
            className: _Carousel.default.item_active
          });
        } else {
          indicatorItem = indicatorDef ? indicatorDef : _react.default.createElement("div", {
            key: i,
            className: _Carousel.default.item_def
          });
        }

        return indicatorItem;
      }));
    }
  }]);
  return Indicator;
}(_react.PureComponent);