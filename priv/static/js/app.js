(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("web/static/js/bootstrap.js", function(exports, require, module) {
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Bootstrap v4.0.0-alpha.5 (https://getbootstrap.com)
 * Copyright 2011-2016 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery');
}

+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.');
  if (version[0] < 2 && version[1] < 9 || version[0] == 1 && version[1] == 9 && version[2] < 1 || version[0] >= 4) {
    throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
  }
}(jQuery);

+function () {

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
  };

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.5): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Util = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */

    var transition = false;

    var MAX_UID = 1000000;

    var TransitionEndEvent = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    };

    // shoutout AngusCroll (https://goo.gl/pxwQGp)
    function toType(obj) {
      return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }

    function isElement(obj) {
      return (obj[0] || obj).nodeType;
    }

    function getSpecialTransitionEndEvent() {
      return {
        bindType: transition.end,
        delegateType: transition.end,
        handle: function handle(event) {
          if ($(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
          }
          return undefined;
        }
      };
    }

    function transitionEndTest() {
      if (window.QUnit) {
        return false;
      }

      var el = document.createElement('bootstrap');

      for (var name in TransitionEndEvent) {
        if (el.style[name] !== undefined) {
          return { end: TransitionEndEvent[name] };
        }
      }

      return false;
    }

    function transitionEndEmulator(duration) {
      var _this = this;

      var called = false;

      $(this).one(Util.TRANSITION_END, function () {
        called = true;
      });

      setTimeout(function () {
        if (!called) {
          Util.triggerTransitionEnd(_this);
        }
      }, duration);

      return this;
    }

    function setTransitionEndSupport() {
      transition = transitionEndTest();

      $.fn.emulateTransitionEnd = transitionEndEmulator;

      if (Util.supportsTransitionEnd()) {
        $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
      }
    }

    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */

    var Util = {

      TRANSITION_END: 'bsTransitionEnd',

      getUID: function getUID(prefix) {
        do {
          /* eslint-disable no-bitwise */
          prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
          /* eslint-enable no-bitwise */
        } while (document.getElementById(prefix));
        return prefix;
      },
      getSelectorFromElement: function getSelectorFromElement(element) {
        var selector = element.getAttribute('data-target');

        if (!selector) {
          selector = element.getAttribute('href') || '';
          selector = /^#[a-z]/i.test(selector) ? selector : null;
        }

        return selector;
      },
      reflow: function reflow(element) {
        new Function('bs', 'return bs')(element.offsetHeight);
      },
      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $(element).trigger(transition.end);
      },
      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(transition);
      },
      typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
        for (var property in configTypes) {
          if (configTypes.hasOwnProperty(property)) {
            var expectedTypes = configTypes[property];
            var value = config[property];
            var valueType = void 0;

            if (value && isElement(value)) {
              valueType = 'element';
            } else {
              valueType = toType(value);
            }

            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
            }
          }
        }
      }
    };

    setTransitionEndSupport();

    return Util;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.5): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Alert = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'alert';
    var VERSION = '4.0.0-alpha.5';
    var DATA_KEY = 'bs.alert';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 150;

    var Selector = {
      DISMISS: '[data-dismiss="alert"]'
    };

    var Event = {
      CLOSE: 'close' + EVENT_KEY,
      CLOSED: 'closed' + EVENT_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      ALERT: 'alert',
      FADE: 'fade',
      IN: 'in'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Alert = function () {
      function Alert(element) {
        _classCallCheck(this, Alert);

        this._element = element;
      }

      // getters

      // public

      Alert.prototype.close = function close(element) {
        element = element || this._element;

        var rootElement = this._getRootElement(element);
        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) {
          return;
        }

        this._removeElement(rootElement);
      };

      Alert.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      };

      // private

      Alert.prototype._getRootElement = function _getRootElement(element) {
        var selector = Util.getSelectorFromElement(element);
        var parent = false;

        if (selector) {
          parent = $(selector)[0];
        }

        if (!parent) {
          parent = $(element).closest('.' + ClassName.ALERT)[0];
        }

        return parent;
      };

      Alert.prototype._triggerCloseEvent = function _triggerCloseEvent(element) {
        var closeEvent = $.Event(Event.CLOSE);

        $(element).trigger(closeEvent);
        return closeEvent;
      };

      Alert.prototype._removeElement = function _removeElement(element) {
        $(element).removeClass(ClassName.IN);

        if (!Util.supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
          this._destroyElement(element);
          return;
        }

        $(element).one(Util.TRANSITION_END, $.proxy(this._destroyElement, this, element)).emulateTransitionEnd(TRANSITION_DURATION);
      };

      Alert.prototype._destroyElement = function _destroyElement(element) {
        $(element).detach().trigger(Event.CLOSED).remove();
      };

      // static

      Alert._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Alert(this);
            $element.data(DATA_KEY, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      };

      Alert._handleDismiss = function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      };

      _createClass(Alert, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }]);

      return Alert;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Alert._jQueryInterface;
    $.fn[NAME].Constructor = Alert;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert._jQueryInterface;
    };

    return Alert;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.5): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Button = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'button';
    var VERSION = '4.0.0-alpha.5';
    var DATA_KEY = 'bs.button';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];

    var ClassName = {
      ACTIVE: 'active',
      BUTTON: 'btn',
      FOCUS: 'focus'
    };

    var Selector = {
      DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
      DATA_TOGGLE: '[data-toggle="buttons"]',
      INPUT: 'input',
      ACTIVE: '.active',
      BUTTON: '.btn'
    };

    var Event = {
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
      FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Button = function () {
      function Button(element) {
        _classCallCheck(this, Button);

        this._element = element;
      }

      // getters

      // public

      Button.prototype.toggle = function toggle() {
        var triggerChangeEvent = true;
        var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

        if (rootElement) {
          var input = $(this._element).find(Selector.INPUT)[0];

          if (input) {
            if (input.type === 'radio') {
              if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

                if (activeElement) {
                  $(activeElement).removeClass(ClassName.ACTIVE);
                }
              }
            }

            if (triggerChangeEvent) {
              input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
              $(this._element).trigger('change');
            }

            input.focus();
          }
        } else {
          this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));
        }

        if (triggerChangeEvent) {
          $(this._element).toggleClass(ClassName.ACTIVE);
        }
      };

      Button.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      };

      // static

      Button._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          if (!data) {
            data = new Button(this);
            $(this).data(DATA_KEY, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      };

      _createClass(Button, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }]);

      return Button;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      event.preventDefault();

      var button = event.target;

      if (!$(button).hasClass(ClassName.BUTTON)) {
        button = $(button).closest(Selector.BUTTON);
      }

      Button._jQueryInterface.call($(button), 'toggle');
    }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      var button = $(event.target).closest(Selector.BUTTON)[0];
      $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Button._jQueryInterface;
    $.fn[NAME].Constructor = Button;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Button._jQueryInterface;
    };

    return Button;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.5): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Carousel = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'carousel';
    var VERSION = '4.0.0-alpha.5';
    var DATA_KEY = 'bs.carousel';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 600;
    var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
    var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

    var Default = {
      interval: 5000,
      keyboard: true,
      slide: false,
      pause: 'hover',
      wrap: true
    };

    var DefaultType = {
      interval: '(number|boolean)',
      keyboard: 'boolean',
      slide: '(boolean|string)',
      pause: '(string|boolean)',
      wrap: 'boolean'
    };

    var Direction = {
      NEXT: 'next',
      PREVIOUS: 'prev'
    };

    var Event = {
      SLIDE: 'slide' + EVENT_KEY,
      SLID: 'slid' + EVENT_KEY,
      KEYDOWN: 'keydown' + EVENT_KEY,
      MOUSEENTER: 'mouseenter' + EVENT_KEY,
      MOUSELEAVE: 'mouseleave' + EVENT_KEY,
      LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      CAROUSEL: 'carousel',
      ACTIVE: 'active',
      SLIDE: 'slide',
      RIGHT: 'right',
      LEFT: 'left',
      ITEM: 'carousel-item'
    };

    var Selector = {
      ACTIVE: '.active',
      ACTIVE_ITEM: '.active.carousel-item',
      ITEM: '.carousel-item',
      NEXT_PREV: '.next, .prev',
      INDICATORS: '.carousel-indicators',
      DATA_SLIDE: '[data-slide], [data-slide-to]',
      DATA_RIDE: '[data-ride="carousel"]'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Carousel = function () {
      function Carousel(element, config) {
        _classCallCheck(this, Carousel);

        this._items = null;
        this._interval = null;
        this._activeElement = null;

        this._isPaused = false;
        this._isSliding = false;

        this._config = this._getConfig(config);
        this._element = $(element)[0];
        this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

        this._addEventListeners();
      }

      // getters

      // public

      Carousel.prototype.next = function next() {
        if (!this._isSliding) {
          this._slide(Direction.NEXT);
        }
      };

      Carousel.prototype.nextWhenVisible = function nextWhenVisible() {
        // Don't call next when the page isn't visible
        if (!document.hidden) {
          this.next();
        }
      };

      Carousel.prototype.prev = function prev() {
        if (!this._isSliding) {
          this._slide(Direction.PREVIOUS);
        }
      };

      Carousel.prototype.pause = function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if ($(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      };

      Carousel.prototype.cycle = function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval($.proxy(document.visibilityState ? this.nextWhenVisible : this.next, this), this._config.interval);
        }
      };

      Carousel.prototype.to = function to(index) {
        var _this2 = this;

        this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          $(this._element).one(Event.SLID, function () {
            return _this2.to(index);
          });
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var direction = index > activeIndex ? Direction.NEXT : Direction.PREVIOUS;

        this._slide(direction, this._items[index]);
      };

      Carousel.prototype.dispose = function dispose() {
        $(this._element).off(EVENT_KEY);
        $.removeData(this._element, DATA_KEY);

        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      };

      // private

      Carousel.prototype._getConfig = function _getConfig(config) {
        config = $.extend({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      Carousel.prototype._addEventListeners = function _addEventListeners() {
        if (this._config.keyboard) {
          $(this._element).on(Event.KEYDOWN, $.proxy(this._keydown, this));
        }

        if (this._config.pause === 'hover' && !('ontouchstart' in document.documentElement)) {
          $(this._element).on(Event.MOUSEENTER, $.proxy(this.pause, this)).on(Event.MOUSELEAVE, $.proxy(this.cycle, this));
        }
      };

      Carousel.prototype._keydown = function _keydown(event) {
        event.preventDefault();

        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        switch (event.which) {
          case ARROW_LEFT_KEYCODE:
            this.prev();
            break;
          case ARROW_RIGHT_KEYCODE:
            this.next();
            break;
          default:
            return;
        }
      };

      Carousel.prototype._getItemIndex = function _getItemIndex(element) {
        this._items = $.makeArray($(element).parent().find(Selector.ITEM));
        return this._items.indexOf(element);
      };

      Carousel.prototype._getItemByDirection = function _getItemByDirection(direction, activeElement) {
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREVIOUS;
        var activeIndex = this._getItemIndex(activeElement);
        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }

        var delta = direction === Direction.PREVIOUS ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;

        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
      };

      Carousel.prototype._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, directionalClassname) {
        var slideEvent = $.Event(Event.SLIDE, {
          relatedTarget: relatedTarget,
          direction: directionalClassname
        });

        $(this._element).trigger(slideEvent);

        return slideEvent;
      };

      Carousel.prototype._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

          if (nextIndicator) {
            $(nextIndicator).addClass(ClassName.ACTIVE);
          }
        }
      };

      Carousel.prototype._slide = function _slide(direction, element) {
        var _this3 = this;

        var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];
        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

        var isCycling = Boolean(this._interval);

        var directionalClassName = direction === Direction.NEXT ? ClassName.LEFT : ClassName.RIGHT;

        if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
          this._isSliding = false;
          return;
        }

        var slideEvent = this._triggerSlideEvent(nextElement, directionalClassName);
        if (slideEvent.isDefaultPrevented()) {
          return;
        }

        if (!activeElement || !nextElement) {
          // some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        var slidEvent = $.Event(Event.SLID, {
          relatedTarget: nextElement,
          direction: directionalClassName
        });

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {

          $(nextElement).addClass(direction);

          Util.reflow(nextElement);

          $(activeElement).addClass(directionalClassName);
          $(nextElement).addClass(directionalClassName);

          $(activeElement).one(Util.TRANSITION_END, function () {
            $(nextElement).removeClass(directionalClassName).removeClass(direction);

            $(nextElement).addClass(ClassName.ACTIVE);

            $(activeElement).removeClass(ClassName.ACTIVE).removeClass(direction).removeClass(directionalClassName);

            _this3._isSliding = false;

            setTimeout(function () {
              return $(_this3._element).trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          $(activeElement).removeClass(ClassName.ACTIVE);
          $(nextElement).addClass(ClassName.ACTIVE);

          this._isSliding = false;
          $(this._element).trigger(slidEvent);
        }

        if (isCycling) {
          this.cycle();
        }
      };

      // static

      Carousel._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = $.extend({}, Default, $(this).data());

          if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
            $.extend(_config, config);
          }

          var action = typeof config === 'string' ? config : _config.slide;

          if (!data) {
            data = new Carousel(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (data[action] === undefined) {
              throw new Error('No method named "' + action + '"');
            }
            data[action]();
          } else if (_config.interval) {
            data.pause();
            data.cycle();
          }
        });
      };

      Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
        var selector = Util.getSelectorFromElement(this);

        if (!selector) {
          return;
        }

        var target = $(selector)[0];

        if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
          return;
        }

        var config = $.extend({}, $(target).data(), $(this).data());
        var slideIndex = this.getAttribute('data-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel._jQueryInterface.call($(target), config);

        if (slideIndex) {
          $(target).data(DATA_KEY).to(slideIndex);
        }

        event.preventDefault();
      };

      _createClass(Carousel, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }]);

      return Carousel;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);

    $(window).on(Event.LOAD_DATA_API, function () {
      $(Selector.DATA_RIDE).each(function () {
        var $carousel = $(this);
        Carousel._jQueryInterface.call($carousel, $carousel.data());
      });
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Carousel._jQueryInterface;
    $.fn[NAME].Constructor = Carousel;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Carousel._jQueryInterface;
    };

    return Carousel;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.5): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Collapse = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'collapse';
    var VERSION = '4.0.0-alpha.5';
    var DATA_KEY = 'bs.collapse';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 600;

    var Default = {
      toggle: true,
      parent: ''
    };

    var DefaultType = {
      toggle: 'boolean',
      parent: 'string'
    };

    var Event = {
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      IN: 'in',
      COLLAPSE: 'collapse',
      COLLAPSING: 'collapsing',
      COLLAPSED: 'collapsed'
    };

    var Dimension = {
      WIDTH: 'width',
      HEIGHT: 'height'
    };

    var Selector = {
      ACTIVES: '.card > .in, .card > .collapsing',
      DATA_TOGGLE: '[data-toggle="collapse"]'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Collapse = function () {
      function Collapse(element, config) {
        _classCallCheck(this, Collapse);

        this._isTransitioning = false;
        this._element = element;
        this._config = this._getConfig(config);
        this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));

        this._parent = this._config.parent ? this._getParent() : null;

        if (!this._config.parent) {
          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
        }

        if (this._config.toggle) {
          this.toggle();
        }
      }

      // getters

      // public

      Collapse.prototype.toggle = function toggle() {
        if ($(this._element).hasClass(ClassName.IN)) {
          this.hide();
        } else {
          this.show();
        }
      };

      Collapse.prototype.show = function show() {
        var _this4 = this;

        if (this._isTransitioning || $(this._element).hasClass(ClassName.IN)) {
          return;
        }

        var actives = void 0;
        var activesData = void 0;

        if (this._parent) {
          actives = $.makeArray($(Selector.ACTIVES));
          if (!actives.length) {
            actives = null;
          }
        }

        if (actives) {
          activesData = $(actives).data(DATA_KEY);
          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = $.Event(Event.SHOW);
        $(this._element).trigger(startEvent);
        if (startEvent.isDefaultPrevented()) {
          return;
        }

        if (actives) {
          Collapse._jQueryInterface.call($(actives), 'hide');
          if (!activesData) {
            $(actives).data(DATA_KEY, null);
          }
        }

        var dimension = this._getDimension();

        $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

        this._element.style[dimension] = 0;
        this._element.setAttribute('aria-expanded', true);

        if (this._triggerArray.length) {
          $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          $(_this4._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.IN);

          _this4._element.style[dimension] = '';

          _this4.setTransitioning(false);

          $(_this4._element).trigger(Event.SHOWN);
        };

        if (!Util.supportsTransitionEnd()) {
          complete();
          return;
        }

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = 'scroll' + capitalizedDimension;

        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

        this._element.style[dimension] = this._element[scrollSize] + 'px';
      };

      Collapse.prototype.hide = function hide() {
        var _this5 = this;

        if (this._isTransitioning || !$(this._element).hasClass(ClassName.IN)) {
          return;
        }

        var startEvent = $.Event(Event.HIDE);
        $(this._element).trigger(startEvent);
        if (startEvent.isDefaultPrevented()) {
          return;
        }

        var dimension = this._getDimension();
        var offsetDimension = dimension === Dimension.WIDTH ? 'offsetWidth' : 'offsetHeight';

        this._element.style[dimension] = this._element[offsetDimension] + 'px';

        Util.reflow(this._element);

        $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.IN);

        this._element.setAttribute('aria-expanded', false);

        if (this._triggerArray.length) {
          $(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this5.setTransitioning(false);
          $(_this5._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
        };

        this._element.style[dimension] = '';

        if (!Util.supportsTransitionEnd()) {
          complete();
          return;
        }

        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      };

      Collapse.prototype.setTransitioning = function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      };

      Collapse.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);

        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      };

      // private

      Collapse.prototype._getConfig = function _getConfig(config) {
        config = $.extend({}, Default, config);
        config.toggle = Boolean(config.toggle); // coerce string values
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      Collapse.prototype._getDimension = function _getDimension() {
        var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      };

      Collapse.prototype._getParent = function _getParent() {
        var _this6 = this;

        var parent = $(this._config.parent)[0];
        var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

        $(parent).find(selector).each(function (i, element) {
          _this6._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });

        return parent;
      };

      Collapse.prototype._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
        if (element) {
          var isOpen = $(element).hasClass(ClassName.IN);
          element.setAttribute('aria-expanded', isOpen);

          if (triggerArray.length) {
            $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
          }
        }
      };

      // static

      Collapse._getTargetFromElement = function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? $(selector)[0] : null;
      };

      Collapse._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY);
          var _config = $.extend({}, Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          if (!data) {
            data = new Collapse(this, _config);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      };

      _createClass(Collapse, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }]);

      return Collapse;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();

      var target = Collapse._getTargetFromElement(this);
      var data = $(target).data(DATA_KEY);
      var config = data ? 'toggle' : $(this).data();

      Collapse._jQueryInterface.call($(target), config);
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Collapse._jQueryInterface;
    $.fn[NAME].Constructor = Collapse;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Collapse._jQueryInterface;
    };

    return Collapse;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.5): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Dropdown = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'dropdown';
    var VERSION = '4.0.0-alpha.5';
    var DATA_KEY = 'bs.dropdown';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
    var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
    var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
    var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

    var Event = {
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      CLICK: 'click' + EVENT_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
      KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      BACKDROP: 'dropdown-backdrop',
      DISABLED: 'disabled',
      OPEN: 'open'
    };

    var Selector = {
      BACKDROP: '.dropdown-backdrop',
      DATA_TOGGLE: '[data-toggle="dropdown"]',
      FORM_CHILD: '.dropdown form',
      ROLE_MENU: '[role="menu"]',
      ROLE_LISTBOX: '[role="listbox"]',
      NAVBAR_NAV: '.navbar-nav',
      VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, ' + '[role="listbox"] li:not(.disabled) a'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Dropdown = function () {
      function Dropdown(element) {
        _classCallCheck(this, Dropdown);

        this._element = element;

        this._addEventListeners();
      }

      // getters

      // public

      Dropdown.prototype.toggle = function toggle() {
        if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
          return false;
        }

        var parent = Dropdown._getParentFromElement(this);
        var isActive = $(parent).hasClass(ClassName.OPEN);

        Dropdown._clearMenus();

        if (isActive) {
          return false;
        }

        if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {

          // if mobile we use a backdrop because click events don't delegate
          var dropdown = document.createElement('div');
          dropdown.className = ClassName.BACKDROP;
          $(dropdown).insertBefore(this);
          $(dropdown).on('click', Dropdown._clearMenus);
        }

        var relatedTarget = { relatedTarget: this };
        var showEvent = $.Event(Event.SHOW, relatedTarget);

        $(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return false;
        }

        this.focus();
        this.setAttribute('aria-expanded', 'true');

        $(parent).toggleClass(ClassName.OPEN);
        $(parent).trigger($.Event(Event.SHOWN, relatedTarget));

        return false;
      };

      Dropdown.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);
        $(this._element).off(EVENT_KEY);
        this._element = null;
      };

      // private

      Dropdown.prototype._addEventListeners = function _addEventListeners() {
        $(this._element).on(Event.CLICK, this.toggle);
      };

      // static

      Dropdown._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          if (!data) {
            $(this).data(DATA_KEY, data = new Dropdown(this));
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config].call(this);
          }
        });
      };

      Dropdown._clearMenus = function _clearMenus(event) {
        if (event && event.which === RIGHT_MOUSE_BUTTON_WHICH) {
          return;
        }

        var backdrop = $(Selector.BACKDROP)[0];
        if (backdrop) {
          backdrop.parentNode.removeChild(backdrop);
        }

        var toggles = $.makeArray($(Selector.DATA_TOGGLE));

        for (var i = 0; i < toggles.length; i++) {
          var parent = Dropdown._getParentFromElement(toggles[i]);
          var relatedTarget = { relatedTarget: toggles[i] };

          if (!$(parent).hasClass(ClassName.OPEN)) {
            continue;
          }

          if (event && event.type === 'click' && /input|textarea/i.test(event.target.tagName) && $.contains(parent, event.target)) {
            continue;
          }

          var hideEvent = $.Event(Event.HIDE, relatedTarget);
          $(parent).trigger(hideEvent);
          if (hideEvent.isDefaultPrevented()) {
            continue;
          }

          toggles[i].setAttribute('aria-expanded', 'false');

          $(parent).removeClass(ClassName.OPEN).trigger($.Event(Event.HIDDEN, relatedTarget));
        }
      };

      Dropdown._getParentFromElement = function _getParentFromElement(element) {
        var parent = void 0;
        var selector = Util.getSelectorFromElement(element);

        if (selector) {
          parent = $(selector)[0];
        }

        return parent || element.parentNode;
      };

      Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
        if (!/(38|40|27|32)/.test(event.which) || /input|textarea/i.test(event.target.tagName)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this);
        var isActive = $(parent).hasClass(ClassName.OPEN);

        if (!isActive && event.which !== ESCAPE_KEYCODE || isActive && event.which === ESCAPE_KEYCODE) {

          if (event.which === ESCAPE_KEYCODE) {
            var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
            $(toggle).trigger('focus');
          }

          $(this).trigger('click');
          return;
        }

        var items = $.makeArray($(Selector.VISIBLE_ITEMS));

        items = items.filter(function (item) {
          return item.offsetWidth || item.offsetHeight;
        });

        if (!items.length) {
          return;
        }

        var index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // up
          index--;
        }

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // down
          index++;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      };

      _createClass(Dropdown, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }]);

      return Dropdown;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_MENU, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_LISTBOX, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, Dropdown.prototype.toggle).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
      e.stopPropagation();
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Dropdown._jQueryInterface;
    $.fn[NAME].Constructor = Dropdown;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Dropdown._jQueryInterface;
    };

    return Dropdown;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.5): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Modal = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'modal';
    var VERSION = '4.0.0-alpha.5';
    var DATA_KEY = 'bs.modal';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 300;
    var BACKDROP_TRANSITION_DURATION = 150;
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var Default = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true
    };

    var DefaultType = {
      backdrop: '(boolean|string)',
      keyboard: 'boolean',
      focus: 'boolean',
      show: 'boolean'
    };

    var Event = {
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      FOCUSIN: 'focusin' + EVENT_KEY,
      RESIZE: 'resize' + EVENT_KEY,
      CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
      KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
      MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
      MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
      BACKDROP: 'modal-backdrop',
      OPEN: 'modal-open',
      FADE: 'fade',
      IN: 'in'
    };

    var Selector = {
      DIALOG: '.modal-dialog',
      DATA_TOGGLE: '[data-toggle="modal"]',
      DATA_DISMISS: '[data-dismiss="modal"]',
      FIXED_CONTENT: '.navbar-fixed-top, .navbar-fixed-bottom, .is-fixed'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Modal = function () {
      function Modal(element, config) {
        _classCallCheck(this, Modal);

        this._config = this._getConfig(config);
        this._element = element;
        this._dialog = $(element).find(Selector.DIALOG)[0];
        this._backdrop = null;
        this._isShown = false;
        this._isBodyOverflowing = false;
        this._ignoreBackdropClick = false;
        this._originalBodyPadding = 0;
        this._scrollbarWidth = 0;
      }

      // getters

      // public

      Modal.prototype.toggle = function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      };

      Modal.prototype.show = function show(relatedTarget) {
        var _this7 = this;

        var showEvent = $.Event(Event.SHOW, {
          relatedTarget: relatedTarget
        });

        $(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = true;

        this._checkScrollbar();
        this._setScrollbar();

        $(document.body).addClass(ClassName.OPEN);

        this._setEscapeEvent();
        this._setResizeEvent();

        $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, $.proxy(this.hide, this));

        $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
          $(_this7._element).one(Event.MOUSEUP_DISMISS, function (event) {
            if ($(event.target).is(_this7._element)) {
              _this7._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop($.proxy(this._showElement, this, relatedTarget));
      };

      Modal.prototype.hide = function hide(event) {
        if (event) {
          event.preventDefault();
        }

        var hideEvent = $.Event(Event.HIDE);

        $(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = false;

        this._setEscapeEvent();
        this._setResizeEvent();

        $(document).off(Event.FOCUSIN);

        $(this._element).removeClass(ClassName.IN);

        $(this._element).off(Event.CLICK_DISMISS);
        $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {

          $(this._element).one(Util.TRANSITION_END, $.proxy(this._hideModal, this)).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          this._hideModal();
        }
      };

      Modal.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);

        $(window).off(EVENT_KEY);
        $(document).off(EVENT_KEY);
        $(this._element).off(EVENT_KEY);
        $(this._backdrop).off(EVENT_KEY);

        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._originalBodyPadding = null;
        this._scrollbarWidth = null;
      };

      // private

      Modal.prototype._getConfig = function _getConfig(config) {
        config = $.extend({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      Modal.prototype._showElement = function _showElement(relatedTarget) {
        var _this8 = this;

        var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // don't move modals dom position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';
        this._element.removeAttribute('aria-hidden');
        this._element.scrollTop = 0;

        if (transition) {
          Util.reflow(this._element);
        }

        $(this._element).addClass(ClassName.IN);

        if (this._config.focus) {
          this._enforceFocus();
        }

        var shownEvent = $.Event(Event.SHOWN, {
          relatedTarget: relatedTarget
        });

        var transitionComplete = function transitionComplete() {
          if (_this8._config.focus) {
            _this8._element.focus();
          }
          $(_this8._element).trigger(shownEvent);
        };

        if (transition) {
          $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          transitionComplete();
        }
      };

      Modal.prototype._enforceFocus = function _enforceFocus() {
        var _this9 = this;

        $(document).off(Event.FOCUSIN) // guard against infinite focus loop
        .on(Event.FOCUSIN, function (event) {
          if (document !== event.target && _this9._element !== event.target && !$(_this9._element).has(event.target).length) {
            _this9._element.focus();
          }
        });
      };

      Modal.prototype._setEscapeEvent = function _setEscapeEvent() {
        var _this10 = this;

        if (this._isShown && this._config.keyboard) {
          $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
            if (event.which === ESCAPE_KEYCODE) {
              _this10.hide();
            }
          });
        } else if (!this._isShown) {
          $(this._element).off(Event.KEYDOWN_DISMISS);
        }
      };

      Modal.prototype._setResizeEvent = function _setResizeEvent() {
        if (this._isShown) {
          $(window).on(Event.RESIZE, $.proxy(this._handleUpdate, this));
        } else {
          $(window).off(Event.RESIZE);
        }
      };

      Modal.prototype._hideModal = function _hideModal() {
        var _this11 = this;

        this._element.style.display = 'none';
        this._element.setAttribute('aria-hidden', 'true');
        this._showBackdrop(function () {
          $(document.body).removeClass(ClassName.OPEN);
          _this11._resetAdjustments();
          _this11._resetScrollbar();
          $(_this11._element).trigger(Event.HIDDEN);
        });
      };

      Modal.prototype._removeBackdrop = function _removeBackdrop() {
        if (this._backdrop) {
          $(this._backdrop).remove();
          this._backdrop = null;
        }
      };

      Modal.prototype._showBackdrop = function _showBackdrop(callback) {
        var _this12 = this;

        var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

        if (this._isShown && this._config.backdrop) {
          var doAnimate = Util.supportsTransitionEnd() && animate;

          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassName.BACKDROP;

          if (animate) {
            $(this._backdrop).addClass(animate);
          }

          $(this._backdrop).appendTo(document.body);

          $(this._element).on(Event.CLICK_DISMISS, function (event) {
            if (_this12._ignoreBackdropClick) {
              _this12._ignoreBackdropClick = false;
              return;
            }
            if (event.target !== event.currentTarget) {
              return;
            }
            if (_this12._config.backdrop === 'static') {
              _this12._element.focus();
            } else {
              _this12.hide();
            }
          });

          if (doAnimate) {
            Util.reflow(this._backdrop);
          }

          $(this._backdrop).addClass(ClassName.IN);

          if (!callback) {
            return;
          }

          if (!doAnimate) {
            callback();
            return;
          }

          $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
        } else if (!this._isShown && this._backdrop) {
          $(this._backdrop).removeClass(ClassName.IN);

          var callbackRemove = function callbackRemove() {
            _this12._removeBackdrop();
            if (callback) {
              callback();
            }
          };

          if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
            $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
          } else {
            callbackRemove();
          }
        } else if (callback) {
          callback();
        }
      };

      // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------

      Modal.prototype._handleUpdate = function _handleUpdate() {
        this._adjustDialog();
      };

      Modal.prototype._adjustDialog = function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = this._scrollbarWidth + 'px';
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = this._scrollbarWidth + 'px';
        }
      };

      Modal.prototype._resetAdjustments = function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      };

      Modal.prototype._checkScrollbar = function _checkScrollbar() {
        this._isBodyOverflowing = document.body.clientWidth < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      };

      Modal.prototype._setScrollbar = function _setScrollbar() {
        var bodyPadding = parseInt($(Selector.FIXED_CONTENT).css('padding-right') || 0, 10);

        this._originalBodyPadding = document.body.style.paddingRight || '';

        if (this._isBodyOverflowing) {
          document.body.style.paddingRight = bodyPadding + this._scrollbarWidth + 'px';
        }
      };

      Modal.prototype._resetScrollbar = function _resetScrollbar() {
        document.body.style.paddingRight = this._originalBodyPadding;
      };

      Modal.prototype._getScrollbarWidth = function _getScrollbarWidth() {
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      };

      // static

      Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = $.extend({}, Modal.Default, $(this).data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

          if (!data) {
            data = new Modal(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      };

      _createClass(Modal, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }]);

      return Modal;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      var _this13 = this;

      var target = void 0;
      var selector = Util.getSelectorFromElement(this);

      if (selector) {
        target = $(selector)[0];
      }

      var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

      if (this.tagName === 'A') {
        event.preventDefault();
      }

      var $target = $(target).one(Event.SHOW, function (showEvent) {
        if (showEvent.isDefaultPrevented()) {
          // only register focus restorer if modal will actually get shown
          return;
        }

        $target.one(Event.HIDDEN, function () {
          if ($(_this13).is(':visible')) {
            _this13.focus();
          }
        });
      });

      Modal._jQueryInterface.call($(target), config, this);
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Modal._jQueryInterface;
    $.fn[NAME].Constructor = Modal;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Modal._jQueryInterface;
    };

    return Modal;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.5): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var ScrollSpy = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'scrollspy';
    var VERSION = '4.0.0-alpha.5';
    var DATA_KEY = 'bs.scrollspy';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];

    var Default = {
      offset: 10,
      method: 'auto',
      target: ''
    };

    var DefaultType = {
      offset: 'number',
      method: 'string',
      target: '(string|element)'
    };

    var Event = {
      ACTIVATE: 'activate' + EVENT_KEY,
      SCROLL: 'scroll' + EVENT_KEY,
      LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      DROPDOWN_ITEM: 'dropdown-item',
      DROPDOWN_MENU: 'dropdown-menu',
      NAV_LINK: 'nav-link',
      NAV: 'nav',
      ACTIVE: 'active'
    };

    var Selector = {
      DATA_SPY: '[data-spy="scroll"]',
      ACTIVE: '.active',
      LIST_ITEM: '.list-item',
      LI: 'li',
      LI_DROPDOWN: 'li.dropdown',
      NAV_LINKS: '.nav-link',
      DROPDOWN: '.dropdown',
      DROPDOWN_ITEMS: '.dropdown-item',
      DROPDOWN_TOGGLE: '.dropdown-toggle'
    };

    var OffsetMethod = {
      OFFSET: 'offset',
      POSITION: 'position'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var ScrollSpy = function () {
      function ScrollSpy(element, config) {
        _classCallCheck(this, ScrollSpy);

        this._element = element;
        this._scrollElement = element.tagName === 'BODY' ? window : element;
        this._config = this._getConfig(config);
        this._selector = this._config.target + ' ' + Selector.NAV_LINKS + ',' + (this._config.target + ' ' + Selector.DROPDOWN_ITEMS);
        this._offsets = [];
        this._targets = [];
        this._activeTarget = null;
        this._scrollHeight = 0;

        $(this._scrollElement).on(Event.SCROLL, $.proxy(this._process, this));

        this.refresh();
        this._process();
      }

      // getters

      // public

      ScrollSpy.prototype.refresh = function refresh() {
        var _this14 = this;

        var autoMethod = this._scrollElement !== this._scrollElement.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;

        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;

        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;

        this._offsets = [];
        this._targets = [];

        this._scrollHeight = this._getScrollHeight();

        var targets = $.makeArray($(this._selector));

        targets.map(function (element) {
          var target = void 0;
          var targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) {
            target = $(targetSelector)[0];
          }

          if (target && (target.offsetWidth || target.offsetHeight)) {
            // todo (fat): remove sketch reliance on jQuery position/offset
            return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
          }
          return null;
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this14._offsets.push(item[0]);
          _this14._targets.push(item[1]);
        });
      };

      ScrollSpy.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);
        $(this._scrollElement).off(EVENT_KEY);

        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
      };

      // private

      ScrollSpy.prototype._getConfig = function _getConfig(config) {
        config = $.extend({}, Default, config);

        if (typeof config.target !== 'string') {
          var id = $(config.target).attr('id');
          if (!id) {
            id = Util.getUID(NAME);
            $(config.target).attr('id', id);
          }
          config.target = '#' + id;
        }

        Util.typeCheckConfig(NAME, config, DefaultType);

        return config;
      };

      ScrollSpy.prototype._getScrollTop = function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.scrollY : this._scrollElement.scrollTop;
      };

      ScrollSpy.prototype._getScrollHeight = function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      };

      ScrollSpy.prototype._process = function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;
        var scrollHeight = this._getScrollHeight();
        var maxScroll = this._config.offset + scrollHeight - this._scrollElement.offsetHeight;

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }
        }

        if (this._activeTarget && scrollTop < this._offsets[0]) {
          this._activeTarget = null;
          this._clear();
          return;
        }

        for (var i = this._offsets.length; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (this._offsets[i + 1] === undefined || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      };

      ScrollSpy.prototype._activate = function _activate(target) {
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(',');
        queries = queries.map(function (selector) {
          return selector + '[data-target="' + target + '"],' + (selector + '[href="' + target + '"]');
        });

        var $link = $(queries.join(','));

        if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
          $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          $link.addClass(ClassName.ACTIVE);
        } else {
          // todo (fat) this is kinda sus...
          // recursively add actives to tested nav-links
          $link.parents(Selector.LI).find(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
        }

        $(this._scrollElement).trigger(Event.ACTIVATE, {
          relatedTarget: target
        });
      };

      ScrollSpy.prototype._clear = function _clear() {
        $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
      };

      // static

      ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config || null;

          if (!data) {
            data = new ScrollSpy(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      };

      _createClass(ScrollSpy, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }]);

      return ScrollSpy;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(window).on(Event.LOAD_DATA_API, function () {
      var scrollSpys = $.makeArray($(Selector.DATA_SPY));

      for (var i = scrollSpys.length; i--;) {
        var $spy = $(scrollSpys[i]);
        ScrollSpy._jQueryInterface.call($spy, $spy.data());
      }
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = ScrollSpy._jQueryInterface;
    $.fn[NAME].Constructor = ScrollSpy;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return ScrollSpy._jQueryInterface;
    };

    return ScrollSpy;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.5): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tab = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'tab';
    var VERSION = '4.0.0-alpha.5';
    var DATA_KEY = 'bs.tab';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 150;

    var Event = {
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active',
      FADE: 'fade',
      IN: 'in'
    };

    var Selector = {
      A: 'a',
      LI: 'li',
      DROPDOWN: '.dropdown',
      UL: 'ul:not(.dropdown-menu)',
      FADE_CHILD: '> .nav-item .fade, > .fade',
      ACTIVE: '.active',
      ACTIVE_CHILD: '> .nav-item > .active, > .active',
      DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
      DROPDOWN_TOGGLE: '.dropdown-toggle',
      DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Tab = function () {
      function Tab(element) {
        _classCallCheck(this, Tab);

        this._element = element;
      }

      // getters

      // public

      Tab.prototype.show = function show() {
        var _this15 = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE)) {
          return;
        }

        var target = void 0;
        var previous = void 0;
        var ulElement = $(this._element).closest(Selector.UL)[0];
        var selector = Util.getSelectorFromElement(this._element);

        if (ulElement) {
          previous = $.makeArray($(ulElement).find(Selector.ACTIVE));
          previous = previous[previous.length - 1];
        }

        var hideEvent = $.Event(Event.HIDE, {
          relatedTarget: this._element
        });

        var showEvent = $.Event(Event.SHOW, {
          relatedTarget: previous
        });

        if (previous) {
          $(previous).trigger(hideEvent);
        }

        $(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return;
        }

        if (selector) {
          target = $(selector)[0];
        }

        this._activate(this._element, ulElement);

        var complete = function complete() {
          var hiddenEvent = $.Event(Event.HIDDEN, {
            relatedTarget: _this15._element
          });

          var shownEvent = $.Event(Event.SHOWN, {
            relatedTarget: previous
          });

          $(previous).trigger(hiddenEvent);
          $(_this15._element).trigger(shownEvent);
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      };

      Tab.prototype.dispose = function dispose() {
        $.removeClass(this._element, DATA_KEY);
        this._element = null;
      };

      // private

      Tab.prototype._activate = function _activate(element, container, callback) {
        var active = $(container).find(Selector.ACTIVE_CHILD)[0];
        var isTransitioning = callback && Util.supportsTransitionEnd() && (active && $(active).hasClass(ClassName.FADE) || Boolean($(container).find(Selector.FADE_CHILD)[0]));

        var complete = $.proxy(this._transitionComplete, this, element, active, isTransitioning, callback);

        if (active && isTransitioning) {
          $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          complete();
        }

        if (active) {
          $(active).removeClass(ClassName.IN);
        }
      };

      Tab.prototype._transitionComplete = function _transitionComplete(element, active, isTransitioning, callback) {
        if (active) {
          $(active).removeClass(ClassName.ACTIVE);

          var dropdownChild = $(active).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

          if (dropdownChild) {
            $(dropdownChild).removeClass(ClassName.ACTIVE);
          }

          active.setAttribute('aria-expanded', false);
        }

        $(element).addClass(ClassName.ACTIVE);
        element.setAttribute('aria-expanded', true);

        if (isTransitioning) {
          Util.reflow(element);
          $(element).addClass(ClassName.IN);
        } else {
          $(element).removeClass(ClassName.FADE);
        }

        if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

          var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
          if (dropdownElement) {
            $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      };

      // static

      Tab._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY);

          if (!data) {
            data = data = new Tab(this);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      };

      _createClass(Tab, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }]);

      return Tab;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();
      Tab._jQueryInterface.call($(this), 'show');
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Tab._jQueryInterface;
    $.fn[NAME].Constructor = Tab;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tab._jQueryInterface;
    };

    return Tab;
  }(jQuery);

  /* global Tether */

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.5): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tooltip = function ($) {

    /**
     * Check for Tether dependency
     * Tether - http://tether.io/
     */
    if (window.Tether === undefined) {
      throw new Error('Bootstrap tooltips require Tether (http://tether.io/)');
    }

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'tooltip';
    var VERSION = '4.0.0-alpha.5';
    var DATA_KEY = 'bs.tooltip';
    var EVENT_KEY = '.' + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 150;
    var CLASS_PREFIX = 'bs-tether';

    var Default = {
      animation: true,
      template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-inner"></div></div>',
      trigger: 'hover focus',
      title: '',
      delay: 0,
      html: false,
      selector: false,
      placement: 'top',
      offset: '0 0',
      constraints: []
    };

    var DefaultType = {
      animation: 'boolean',
      template: 'string',
      title: '(string|element|function)',
      trigger: 'string',
      delay: '(number|object)',
      html: 'boolean',
      selector: '(string|boolean)',
      placement: '(string|function)',
      offset: 'string',
      constraints: 'array'
    };

    var AttachmentMap = {
      TOP: 'bottom center',
      RIGHT: 'middle left',
      BOTTOM: 'top center',
      LEFT: 'middle right'
    };

    var HoverState = {
      IN: 'in',
      OUT: 'out'
    };

    var Event = {
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      INSERTED: 'inserted' + EVENT_KEY,
      CLICK: 'click' + EVENT_KEY,
      FOCUSIN: 'focusin' + EVENT_KEY,
      FOCUSOUT: 'focusout' + EVENT_KEY,
      MOUSEENTER: 'mouseenter' + EVENT_KEY,
      MOUSELEAVE: 'mouseleave' + EVENT_KEY
    };

    var ClassName = {
      FADE: 'fade',
      IN: 'in'
    };

    var Selector = {
      TOOLTIP: '.tooltip',
      TOOLTIP_INNER: '.tooltip-inner'
    };

    var TetherClass = {
      element: false,
      enabled: false
    };

    var Trigger = {
      HOVER: 'hover',
      FOCUS: 'focus',
      CLICK: 'click',
      MANUAL: 'manual'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Tooltip = function () {
      function Tooltip(element, config) {
        _classCallCheck(this, Tooltip);

        // private
        this._isEnabled = true;
        this._timeout = 0;
        this._hoverState = '';
        this._activeTrigger = {};
        this._tether = null;

        // protected
        this.element = element;
        this.config = this._getConfig(config);
        this.tip = null;

        this._setListeners();
      }

      // getters

      // public

      Tooltip.prototype.enable = function enable() {
        this._isEnabled = true;
      };

      Tooltip.prototype.disable = function disable() {
        this._isEnabled = false;
      };

      Tooltip.prototype.toggleEnabled = function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      };

      Tooltip.prototype.toggle = function toggle(event) {
        if (event) {
          var dataKey = this.constructor.DATA_KEY;
          var context = $(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $(event.currentTarget).data(dataKey, context);
          }

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {

          if ($(this.getTipElement()).hasClass(ClassName.IN)) {
            this._leave(null, this);
            return;
          }

          this._enter(null, this);
        }
      };

      Tooltip.prototype.dispose = function dispose() {
        clearTimeout(this._timeout);

        this.cleanupTether();

        $.removeData(this.element, this.constructor.DATA_KEY);

        $(this.element).off(this.constructor.EVENT_KEY);

        if (this.tip) {
          $(this.tip).remove();
        }

        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;
        this._tether = null;

        this.element = null;
        this.config = null;
        this.tip = null;
      };

      Tooltip.prototype.show = function show() {
        var _this16 = this;

        var showEvent = $.Event(this.constructor.Event.SHOW);

        if (this.isWithContent() && this._isEnabled) {
          $(this.element).trigger(showEvent);

          var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

          if (showEvent.isDefaultPrevented() || !isInTheDom) {
            return;
          }

          var tip = this.getTipElement();
          var tipId = Util.getUID(this.constructor.NAME);

          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);

          this.setContent();

          if (this.config.animation) {
            $(tip).addClass(ClassName.FADE);
          }

          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

          var attachment = this._getAttachment(placement);

          $(tip).data(this.constructor.DATA_KEY, this).appendTo(document.body);

          $(this.element).trigger(this.constructor.Event.INSERTED);

          this._tether = new Tether({
            attachment: attachment,
            element: tip,
            target: this.element,
            classes: TetherClass,
            classPrefix: CLASS_PREFIX,
            offset: this.config.offset,
            constraints: this.config.constraints,
            addTargetClasses: false
          });

          Util.reflow(tip);
          this._tether.position();

          $(tip).addClass(ClassName.IN);

          var complete = function complete() {
            var prevHoverState = _this16._hoverState;
            _this16._hoverState = null;

            $(_this16.element).trigger(_this16.constructor.Event.SHOWN);

            if (prevHoverState === HoverState.OUT) {
              _this16._leave(null, _this16);
            }
          };

          if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
            $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
            return;
          }

          complete();
        }
      };

      Tooltip.prototype.hide = function hide(callback) {
        var _this17 = this;

        var tip = this.getTipElement();
        var hideEvent = $.Event(this.constructor.Event.HIDE);
        var complete = function complete() {
          if (_this17._hoverState !== HoverState.IN && tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }

          _this17.element.removeAttribute('aria-describedby');
          $(_this17.element).trigger(_this17.constructor.Event.HIDDEN);
          _this17.cleanupTether();

          if (callback) {
            callback();
          }
        };

        $(this.element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        $(tip).removeClass(ClassName.IN);

        if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {

          $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          complete();
        }

        this._hoverState = '';
      };

      // protected

      Tooltip.prototype.isWithContent = function isWithContent() {
        return Boolean(this.getTitle());
      };

      Tooltip.prototype.getTipElement = function getTipElement() {
        return this.tip = this.tip || $(this.config.template)[0];
      };

      Tooltip.prototype.setContent = function setContent() {
        var $tip = $(this.getTipElement());

        this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());

        $tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);

        this.cleanupTether();
      };

      Tooltip.prototype.setElementContent = function setElementContent($element, content) {
        var html = this.config.html;
        if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) === 'object' && (content.nodeType || content.jquery)) {
          // content is a DOM node or a jQuery
          if (html) {
            if (!$(content).parent().is($element)) {
              $element.empty().append(content);
            }
          } else {
            $element.text($(content).text());
          }
        } else {
          $element[html ? 'html' : 'text'](content);
        }
      };

      Tooltip.prototype.getTitle = function getTitle() {
        var title = this.element.getAttribute('data-original-title');

        if (!title) {
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
        }

        return title;
      };

      Tooltip.prototype.cleanupTether = function cleanupTether() {
        if (this._tether) {
          this._tether.destroy();
        }
      };

      // private

      Tooltip.prototype._getAttachment = function _getAttachment(placement) {
        return AttachmentMap[placement.toUpperCase()];
      };

      Tooltip.prototype._setListeners = function _setListeners() {
        var _this18 = this;

        var triggers = this.config.trigger.split(' ');

        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            $(_this18.element).on(_this18.constructor.Event.CLICK, _this18.config.selector, $.proxy(_this18.toggle, _this18));
          } else if (trigger !== Trigger.MANUAL) {
            var eventIn = trigger === Trigger.HOVER ? _this18.constructor.Event.MOUSEENTER : _this18.constructor.Event.FOCUSIN;
            var eventOut = trigger === Trigger.HOVER ? _this18.constructor.Event.MOUSELEAVE : _this18.constructor.Event.FOCUSOUT;

            $(_this18.element).on(eventIn, _this18.config.selector, $.proxy(_this18._enter, _this18)).on(eventOut, _this18.config.selector, $.proxy(_this18._leave, _this18));
          }
        });

        if (this.config.selector) {
          this.config = $.extend({}, this.config, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      };

      Tooltip.prototype._fixTitle = function _fixTitle() {
        var titleType = _typeof(this.element.getAttribute('data-original-title'));
        if (this.element.getAttribute('title') || titleType !== 'string') {
          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
          this.element.setAttribute('title', '');
        }
      };

      Tooltip.prototype._enter = function _enter(event, context) {
        var dataKey = this.constructor.DATA_KEY;

        context = context || $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
        }

        if ($(context.getTipElement()).hasClass(ClassName.IN) || context._hoverState === HoverState.IN) {
          context._hoverState = HoverState.IN;
          return;
        }

        clearTimeout(context._timeout);

        context._hoverState = HoverState.IN;

        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.IN) {
            context.show();
          }
        }, context.config.delay.show);
      };

      Tooltip.prototype._leave = function _leave(event, context) {
        var dataKey = this.constructor.DATA_KEY;

        context = context || $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);

        context._hoverState = HoverState.OUT;

        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.OUT) {
            context.hide();
          }
        }, context.config.delay.hide);
      };

      Tooltip.prototype._isWithActiveTrigger = function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      };

      Tooltip.prototype._getConfig = function _getConfig(config) {
        config = $.extend({}, this.constructor.Default, $(this.element).data(), config);

        if (config.delay && typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

        return config;
      };

      Tooltip.prototype._getDelegateConfig = function _getDelegateConfig() {
        var config = {};

        if (this.config) {
          for (var key in this.config) {
            if (this.constructor.Default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }

        return config;
      };

      // static

      Tooltip._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

          if (!data && /dispose|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Tooltip(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      };

      _createClass(Tooltip, null, [{
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }, {
        key: 'NAME',
        get: function get() {
          return NAME;
        }
      }, {
        key: 'DATA_KEY',
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: 'Event',
        get: function get() {
          return Event;
        }
      }, {
        key: 'EVENT_KEY',
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: 'DefaultType',
        get: function get() {
          return DefaultType;
        }
      }]);

      return Tooltip;
    }();

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Tooltip._jQueryInterface;
    $.fn[NAME].Constructor = Tooltip;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tooltip._jQueryInterface;
    };

    return Tooltip;
  }(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.5): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Popover = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'popover';
    var VERSION = '4.0.0-alpha.5';
    var DATA_KEY = 'bs.popover';
    var EVENT_KEY = '.' + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];

    var Default = $.extend({}, Tooltip.Default, {
      placement: 'right',
      trigger: 'click',
      content: '',
      template: '<div class="popover" role="tooltip">' + '<h3 class="popover-title"></h3>' + '<div class="popover-content"></div></div>'
    });

    var DefaultType = $.extend({}, Tooltip.DefaultType, {
      content: '(string|element|function)'
    });

    var ClassName = {
      FADE: 'fade',
      IN: 'in'
    };

    var Selector = {
      TITLE: '.popover-title',
      CONTENT: '.popover-content'
    };

    var Event = {
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      INSERTED: 'inserted' + EVENT_KEY,
      CLICK: 'click' + EVENT_KEY,
      FOCUSIN: 'focusin' + EVENT_KEY,
      FOCUSOUT: 'focusout' + EVENT_KEY,
      MOUSEENTER: 'mouseenter' + EVENT_KEY,
      MOUSELEAVE: 'mouseleave' + EVENT_KEY
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Popover = function (_Tooltip) {
      _inherits(Popover, _Tooltip);

      function Popover() {
        _classCallCheck(this, Popover);

        return _possibleConstructorReturn(this, _Tooltip.apply(this, arguments));
      }

      // overrides

      Popover.prototype.isWithContent = function isWithContent() {
        return this.getTitle() || this._getContent();
      };

      Popover.prototype.getTipElement = function getTipElement() {
        return this.tip = this.tip || $(this.config.template)[0];
      };

      Popover.prototype.setContent = function setContent() {
        var $tip = $(this.getTipElement());

        // we use append for html objects to maintain js events
        this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
        this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

        $tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);

        this.cleanupTether();
      };

      // private

      Popover.prototype._getContent = function _getContent() {
        return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
      };

      // static

      Popover._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Popover(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      };

      _createClass(Popover, null, [{
        key: 'VERSION',

        // getters

        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }, {
        key: 'NAME',
        get: function get() {
          return NAME;
        }
      }, {
        key: 'DATA_KEY',
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: 'Event',
        get: function get() {
          return Event;
        }
      }, {
        key: 'EVENT_KEY',
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: 'DefaultType',
        get: function get() {
          return DefaultType;
        }
      }]);

      return Popover;
    }(Tooltip);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Popover._jQueryInterface;
    $.fn[NAME].Constructor = Popover;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Popover._jQueryInterface;
    };

    return Popover;
  }(jQuery);
}();
});

require.register("web/static/js/bootstrap.min.js", function(exports, require, module) {
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Bootstrap v4.0.0-alpha.5 (https://getbootstrap.com)
 * Copyright 2011-2016 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");+function (a) {
  var b = a.fn.jquery.split(" ")[0].split(".");if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0");
}(jQuery), +function () {
  function a(a, b) {
    if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
  }function b(a, b) {
    if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
  }function c(a, b) {
    if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
  }var d = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (a) {
    return typeof a === "undefined" ? "undefined" : _typeof(a);
  } : function (a) {
    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a === "undefined" ? "undefined" : _typeof(a);
  },
      e = function () {
    function a(a, b) {
      for (var c = 0; c < b.length; c++) {
        var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
      }
    }return function (b, c, d) {
      return c && a(b.prototype, c), d && a(b, d), b;
    };
  }(),
      f = function (a) {
    function b(a) {
      return {}.toString.call(a).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }function c(a) {
      return (a[0] || a).nodeType;
    }function d() {
      return { bindType: h.end, delegateType: h.end, handle: function handle(b) {
          if (a(b.target).is(this)) return b.handleObj.handler.apply(this, arguments);
        } };
    }function e() {
      if (window.QUnit) return !1;var a = document.createElement("bootstrap");for (var b in j) {
        if (void 0 !== a.style[b]) return { end: j[b] };
      }return !1;
    }function f(b) {
      var c = this,
          d = !1;return a(this).one(k.TRANSITION_END, function () {
        d = !0;
      }), setTimeout(function () {
        d || k.triggerTransitionEnd(c);
      }, b), this;
    }function g() {
      h = e(), a.fn.emulateTransitionEnd = f, k.supportsTransitionEnd() && (a.event.special[k.TRANSITION_END] = d());
    }var h = !1,
        i = 1e6,
        j = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" },
        k = { TRANSITION_END: "bsTransitionEnd", getUID: function getUID(a) {
        do {
          a += ~~(Math.random() * i);
        } while (document.getElementById(a));return a;
      }, getSelectorFromElement: function getSelectorFromElement(a) {
        var b = a.getAttribute("data-target");return b || (b = a.getAttribute("href") || "", b = /^#[a-z]/i.test(b) ? b : null), b;
      }, reflow: function reflow(a) {
        new Function("bs", "return bs")(a.offsetHeight);
      }, triggerTransitionEnd: function triggerTransitionEnd(b) {
        a(b).trigger(h.end);
      }, supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(h);
      }, typeCheckConfig: function typeCheckConfig(a, d, e) {
        for (var f in e) {
          if (e.hasOwnProperty(f)) {
            var g = e[f],
                h = d[f],
                i = void 0;if (i = h && c(h) ? "element" : b(h), !new RegExp(g).test(i)) throw new Error(a.toUpperCase() + ": " + ('Option "' + f + '" provided type "' + i + '" ') + ('but expected type "' + g + '".'));
          }
        }
      } };return g(), k;
  }(jQuery),
      g = (function (a) {
    var b = "alert",
        d = "4.0.0-alpha.5",
        g = "bs.alert",
        h = "." + g,
        i = ".data-api",
        j = a.fn[b],
        k = 150,
        l = { DISMISS: '[data-dismiss="alert"]' },
        m = { CLOSE: "close" + h, CLOSED: "closed" + h, CLICK_DATA_API: "click" + h + i },
        n = { ALERT: "alert", FADE: "fade", IN: "in" },
        o = function () {
      function b(a) {
        c(this, b), this._element = a;
      }return b.prototype.close = function (a) {
        a = a || this._element;var b = this._getRootElement(a),
            c = this._triggerCloseEvent(b);c.isDefaultPrevented() || this._removeElement(b);
      }, b.prototype.dispose = function () {
        a.removeData(this._element, g), this._element = null;
      }, b.prototype._getRootElement = function (b) {
        var c = f.getSelectorFromElement(b),
            d = !1;return c && (d = a(c)[0]), d || (d = a(b).closest("." + n.ALERT)[0]), d;
      }, b.prototype._triggerCloseEvent = function (b) {
        var c = a.Event(m.CLOSE);return a(b).trigger(c), c;
      }, b.prototype._removeElement = function (b) {
        return a(b).removeClass(n.IN), f.supportsTransitionEnd() && a(b).hasClass(n.FADE) ? void a(b).one(f.TRANSITION_END, a.proxy(this._destroyElement, this, b)).emulateTransitionEnd(k) : void this._destroyElement(b);
      }, b.prototype._destroyElement = function (b) {
        a(b).detach().trigger(m.CLOSED).remove();
      }, b._jQueryInterface = function (c) {
        return this.each(function () {
          var d = a(this),
              e = d.data(g);e || (e = new b(this), d.data(g, e)), "close" === c && e[c](this);
        });
      }, b._handleDismiss = function (a) {
        return function (b) {
          b && b.preventDefault(), a.close(this);
        };
      }, e(b, null, [{ key: "VERSION", get: function get() {
          return d;
        } }]), b;
    }();return a(document).on(m.CLICK_DATA_API, l.DISMISS, o._handleDismiss(new o())), a.fn[b] = o._jQueryInterface, a.fn[b].Constructor = o, a.fn[b].noConflict = function () {
      return a.fn[b] = j, o._jQueryInterface;
    }, o;
  }(jQuery), function (a) {
    var b = "button",
        d = "4.0.0-alpha.5",
        f = "bs.button",
        g = "." + f,
        h = ".data-api",
        i = a.fn[b],
        j = { ACTIVE: "active", BUTTON: "btn", FOCUS: "focus" },
        k = { DATA_TOGGLE_CARROT: '[data-toggle^="button"]', DATA_TOGGLE: '[data-toggle="buttons"]', INPUT: "input", ACTIVE: ".active", BUTTON: ".btn" },
        l = { CLICK_DATA_API: "click" + g + h, FOCUS_BLUR_DATA_API: "focus" + g + h + " " + ("blur" + g + h) },
        m = function () {
      function b(a) {
        c(this, b), this._element = a;
      }return b.prototype.toggle = function () {
        var b = !0,
            c = a(this._element).closest(k.DATA_TOGGLE)[0];if (c) {
          var d = a(this._element).find(k.INPUT)[0];if (d) {
            if ("radio" === d.type) if (d.checked && a(this._element).hasClass(j.ACTIVE)) b = !1;else {
              var e = a(c).find(k.ACTIVE)[0];e && a(e).removeClass(j.ACTIVE);
            }b && (d.checked = !a(this._element).hasClass(j.ACTIVE), a(this._element).trigger("change")), d.focus();
          }
        } else this._element.setAttribute("aria-pressed", !a(this._element).hasClass(j.ACTIVE));b && a(this._element).toggleClass(j.ACTIVE);
      }, b.prototype.dispose = function () {
        a.removeData(this._element, f), this._element = null;
      }, b._jQueryInterface = function (c) {
        return this.each(function () {
          var d = a(this).data(f);d || (d = new b(this), a(this).data(f, d)), "toggle" === c && d[c]();
        });
      }, e(b, null, [{ key: "VERSION", get: function get() {
          return d;
        } }]), b;
    }();return a(document).on(l.CLICK_DATA_API, k.DATA_TOGGLE_CARROT, function (b) {
      b.preventDefault();var c = b.target;a(c).hasClass(j.BUTTON) || (c = a(c).closest(k.BUTTON)), m._jQueryInterface.call(a(c), "toggle");
    }).on(l.FOCUS_BLUR_DATA_API, k.DATA_TOGGLE_CARROT, function (b) {
      var c = a(b.target).closest(k.BUTTON)[0];a(c).toggleClass(j.FOCUS, /^focus(in)?$/.test(b.type));
    }), a.fn[b] = m._jQueryInterface, a.fn[b].Constructor = m, a.fn[b].noConflict = function () {
      return a.fn[b] = i, m._jQueryInterface;
    }, m;
  }(jQuery), function (a) {
    var b = "carousel",
        g = "4.0.0-alpha.5",
        h = "bs.carousel",
        i = "." + h,
        j = ".data-api",
        k = a.fn[b],
        l = 600,
        m = 37,
        n = 39,
        o = { interval: 5e3, keyboard: !0, slide: !1, pause: "hover", wrap: !0 },
        p = { interval: "(number|boolean)", keyboard: "boolean", slide: "(boolean|string)", pause: "(string|boolean)", wrap: "boolean" },
        q = { NEXT: "next", PREVIOUS: "prev" },
        r = { SLIDE: "slide" + i, SLID: "slid" + i, KEYDOWN: "keydown" + i, MOUSEENTER: "mouseenter" + i, MOUSELEAVE: "mouseleave" + i, LOAD_DATA_API: "load" + i + j, CLICK_DATA_API: "click" + i + j },
        s = { CAROUSEL: "carousel", ACTIVE: "active", SLIDE: "slide", RIGHT: "right", LEFT: "left", ITEM: "carousel-item" },
        t = { ACTIVE: ".active", ACTIVE_ITEM: ".active.carousel-item", ITEM: ".carousel-item", NEXT_PREV: ".next, .prev", INDICATORS: ".carousel-indicators", DATA_SLIDE: "[data-slide], [data-slide-to]", DATA_RIDE: '[data-ride="carousel"]' },
        u = function () {
      function j(b, d) {
        c(this, j), this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this._config = this._getConfig(d), this._element = a(b)[0], this._indicatorsElement = a(this._element).find(t.INDICATORS)[0], this._addEventListeners();
      }return j.prototype.next = function () {
        this._isSliding || this._slide(q.NEXT);
      }, j.prototype.nextWhenVisible = function () {
        document.hidden || this.next();
      }, j.prototype.prev = function () {
        this._isSliding || this._slide(q.PREVIOUS);
      }, j.prototype.pause = function (b) {
        b || (this._isPaused = !0), a(this._element).find(t.NEXT_PREV)[0] && f.supportsTransitionEnd() && (f.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null;
      }, j.prototype.cycle = function (b) {
        b || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval(a.proxy(document.visibilityState ? this.nextWhenVisible : this.next, this), this._config.interval));
      }, j.prototype.to = function (b) {
        var c = this;this._activeElement = a(this._element).find(t.ACTIVE_ITEM)[0];var d = this._getItemIndex(this._activeElement);if (!(b > this._items.length - 1 || b < 0)) {
          if (this._isSliding) return void a(this._element).one(r.SLID, function () {
            return c.to(b);
          });if (d === b) return this.pause(), void this.cycle();var e = b > d ? q.NEXT : q.PREVIOUS;this._slide(e, this._items[b]);
        }
      }, j.prototype.dispose = function () {
        a(this._element).off(i), a.removeData(this._element, h), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null;
      }, j.prototype._getConfig = function (c) {
        return c = a.extend({}, o, c), f.typeCheckConfig(b, c, p), c;
      }, j.prototype._addEventListeners = function () {
        this._config.keyboard && a(this._element).on(r.KEYDOWN, a.proxy(this._keydown, this)), "hover" !== this._config.pause || "ontouchstart" in document.documentElement || a(this._element).on(r.MOUSEENTER, a.proxy(this.pause, this)).on(r.MOUSELEAVE, a.proxy(this.cycle, this));
      }, j.prototype._keydown = function (a) {
        if (a.preventDefault(), !/input|textarea/i.test(a.target.tagName)) switch (a.which) {case m:
            this.prev();break;case n:
            this.next();break;default:
            return;}
      }, j.prototype._getItemIndex = function (b) {
        return this._items = a.makeArray(a(b).parent().find(t.ITEM)), this._items.indexOf(b);
      }, j.prototype._getItemByDirection = function (a, b) {
        var c = a === q.NEXT,
            d = a === q.PREVIOUS,
            e = this._getItemIndex(b),
            f = this._items.length - 1,
            g = d && 0 === e || c && e === f;if (g && !this._config.wrap) return b;var h = a === q.PREVIOUS ? -1 : 1,
            i = (e + h) % this._items.length;return i === -1 ? this._items[this._items.length - 1] : this._items[i];
      }, j.prototype._triggerSlideEvent = function (b, c) {
        var d = a.Event(r.SLIDE, { relatedTarget: b, direction: c });return a(this._element).trigger(d), d;
      }, j.prototype._setActiveIndicatorElement = function (b) {
        if (this._indicatorsElement) {
          a(this._indicatorsElement).find(t.ACTIVE).removeClass(s.ACTIVE);var c = this._indicatorsElement.children[this._getItemIndex(b)];c && a(c).addClass(s.ACTIVE);
        }
      }, j.prototype._slide = function (b, c) {
        var d = this,
            e = a(this._element).find(t.ACTIVE_ITEM)[0],
            g = c || e && this._getItemByDirection(b, e),
            h = Boolean(this._interval),
            i = b === q.NEXT ? s.LEFT : s.RIGHT;if (g && a(g).hasClass(s.ACTIVE)) return void (this._isSliding = !1);var j = this._triggerSlideEvent(g, i);if (!j.isDefaultPrevented() && e && g) {
          this._isSliding = !0, h && this.pause(), this._setActiveIndicatorElement(g);var k = a.Event(r.SLID, { relatedTarget: g, direction: i });f.supportsTransitionEnd() && a(this._element).hasClass(s.SLIDE) ? (a(g).addClass(b), f.reflow(g), a(e).addClass(i), a(g).addClass(i), a(e).one(f.TRANSITION_END, function () {
            a(g).removeClass(i).removeClass(b), a(g).addClass(s.ACTIVE), a(e).removeClass(s.ACTIVE).removeClass(b).removeClass(i), d._isSliding = !1, setTimeout(function () {
              return a(d._element).trigger(k);
            }, 0);
          }).emulateTransitionEnd(l)) : (a(e).removeClass(s.ACTIVE), a(g).addClass(s.ACTIVE), this._isSliding = !1, a(this._element).trigger(k)), h && this.cycle();
        }
      }, j._jQueryInterface = function (b) {
        return this.each(function () {
          var c = a(this).data(h),
              e = a.extend({}, o, a(this).data());"object" === ("undefined" == typeof b ? "undefined" : d(b)) && a.extend(e, b);var f = "string" == typeof b ? b : e.slide;if (c || (c = new j(this, e), a(this).data(h, c)), "number" == typeof b) c.to(b);else if ("string" == typeof f) {
            if (void 0 === c[f]) throw new Error('No method named "' + f + '"');c[f]();
          } else e.interval && (c.pause(), c.cycle());
        });
      }, j._dataApiClickHandler = function (b) {
        var c = f.getSelectorFromElement(this);if (c) {
          var d = a(c)[0];if (d && a(d).hasClass(s.CAROUSEL)) {
            var e = a.extend({}, a(d).data(), a(this).data()),
                g = this.getAttribute("data-slide-to");g && (e.interval = !1), j._jQueryInterface.call(a(d), e), g && a(d).data(h).to(g), b.preventDefault();
          }
        }
      }, e(j, null, [{ key: "VERSION", get: function get() {
          return g;
        } }, { key: "Default", get: function get() {
          return o;
        } }]), j;
    }();return a(document).on(r.CLICK_DATA_API, t.DATA_SLIDE, u._dataApiClickHandler), a(window).on(r.LOAD_DATA_API, function () {
      a(t.DATA_RIDE).each(function () {
        var b = a(this);u._jQueryInterface.call(b, b.data());
      });
    }), a.fn[b] = u._jQueryInterface, a.fn[b].Constructor = u, a.fn[b].noConflict = function () {
      return a.fn[b] = k, u._jQueryInterface;
    }, u;
  }(jQuery), function (a) {
    var b = "collapse",
        g = "4.0.0-alpha.5",
        h = "bs.collapse",
        i = "." + h,
        j = ".data-api",
        k = a.fn[b],
        l = 600,
        m = { toggle: !0, parent: "" },
        n = { toggle: "boolean", parent: "string" },
        o = { SHOW: "show" + i, SHOWN: "shown" + i, HIDE: "hide" + i, HIDDEN: "hidden" + i, CLICK_DATA_API: "click" + i + j },
        p = { IN: "in", COLLAPSE: "collapse", COLLAPSING: "collapsing", COLLAPSED: "collapsed" },
        q = { WIDTH: "width", HEIGHT: "height" },
        r = { ACTIVES: ".card > .in, .card > .collapsing", DATA_TOGGLE: '[data-toggle="collapse"]' },
        s = function () {
      function i(b, d) {
        c(this, i), this._isTransitioning = !1, this._element = b, this._config = this._getConfig(d), this._triggerArray = a.makeArray(a('[data-toggle="collapse"][href="#' + b.id + '"],' + ('[data-toggle="collapse"][data-target="#' + b.id + '"]'))), this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle();
      }return i.prototype.toggle = function () {
        a(this._element).hasClass(p.IN) ? this.hide() : this.show();
      }, i.prototype.show = function () {
        var b = this;if (!this._isTransitioning && !a(this._element).hasClass(p.IN)) {
          var c = void 0,
              d = void 0;if (this._parent && (c = a.makeArray(a(r.ACTIVES)), c.length || (c = null)), !(c && (d = a(c).data(h), d && d._isTransitioning))) {
            var e = a.Event(o.SHOW);if (a(this._element).trigger(e), !e.isDefaultPrevented()) {
              c && (i._jQueryInterface.call(a(c), "hide"), d || a(c).data(h, null));var g = this._getDimension();a(this._element).removeClass(p.COLLAPSE).addClass(p.COLLAPSING), this._element.style[g] = 0, this._element.setAttribute("aria-expanded", !0), this._triggerArray.length && a(this._triggerArray).removeClass(p.COLLAPSED).attr("aria-expanded", !0), this.setTransitioning(!0);var j = function j() {
                a(b._element).removeClass(p.COLLAPSING).addClass(p.COLLAPSE).addClass(p.IN), b._element.style[g] = "", b.setTransitioning(!1), a(b._element).trigger(o.SHOWN);
              };if (!f.supportsTransitionEnd()) return void j();var k = g[0].toUpperCase() + g.slice(1),
                  m = "scroll" + k;a(this._element).one(f.TRANSITION_END, j).emulateTransitionEnd(l), this._element.style[g] = this._element[m] + "px";
            }
          }
        }
      }, i.prototype.hide = function () {
        var b = this;if (!this._isTransitioning && a(this._element).hasClass(p.IN)) {
          var c = a.Event(o.HIDE);if (a(this._element).trigger(c), !c.isDefaultPrevented()) {
            var d = this._getDimension(),
                e = d === q.WIDTH ? "offsetWidth" : "offsetHeight";this._element.style[d] = this._element[e] + "px", f.reflow(this._element), a(this._element).addClass(p.COLLAPSING).removeClass(p.COLLAPSE).removeClass(p.IN), this._element.setAttribute("aria-expanded", !1), this._triggerArray.length && a(this._triggerArray).addClass(p.COLLAPSED).attr("aria-expanded", !1), this.setTransitioning(!0);var g = function g() {
              b.setTransitioning(!1), a(b._element).removeClass(p.COLLAPSING).addClass(p.COLLAPSE).trigger(o.HIDDEN);
            };return this._element.style[d] = "", f.supportsTransitionEnd() ? void a(this._element).one(f.TRANSITION_END, g).emulateTransitionEnd(l) : void g();
          }
        }
      }, i.prototype.setTransitioning = function (a) {
        this._isTransitioning = a;
      }, i.prototype.dispose = function () {
        a.removeData(this._element, h), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null;
      }, i.prototype._getConfig = function (c) {
        return c = a.extend({}, m, c), c.toggle = Boolean(c.toggle), f.typeCheckConfig(b, c, n), c;
      }, i.prototype._getDimension = function () {
        var b = a(this._element).hasClass(q.WIDTH);return b ? q.WIDTH : q.HEIGHT;
      }, i.prototype._getParent = function () {
        var b = this,
            c = a(this._config.parent)[0],
            d = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';return a(c).find(d).each(function (a, c) {
          b._addAriaAndCollapsedClass(i._getTargetFromElement(c), [c]);
        }), c;
      }, i.prototype._addAriaAndCollapsedClass = function (b, c) {
        if (b) {
          var d = a(b).hasClass(p.IN);b.setAttribute("aria-expanded", d), c.length && a(c).toggleClass(p.COLLAPSED, !d).attr("aria-expanded", d);
        }
      }, i._getTargetFromElement = function (b) {
        var c = f.getSelectorFromElement(b);return c ? a(c)[0] : null;
      }, i._jQueryInterface = function (b) {
        return this.each(function () {
          var c = a(this),
              e = c.data(h),
              f = a.extend({}, m, c.data(), "object" === ("undefined" == typeof b ? "undefined" : d(b)) && b);if (!e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || (e = new i(this, f), c.data(h, e)), "string" == typeof b) {
            if (void 0 === e[b]) throw new Error('No method named "' + b + '"');e[b]();
          }
        });
      }, e(i, null, [{ key: "VERSION", get: function get() {
          return g;
        } }, { key: "Default", get: function get() {
          return m;
        } }]), i;
    }();return a(document).on(o.CLICK_DATA_API, r.DATA_TOGGLE, function (b) {
      b.preventDefault();var c = s._getTargetFromElement(this),
          d = a(c).data(h),
          e = d ? "toggle" : a(this).data();s._jQueryInterface.call(a(c), e);
    }), a.fn[b] = s._jQueryInterface, a.fn[b].Constructor = s, a.fn[b].noConflict = function () {
      return a.fn[b] = k, s._jQueryInterface;
    }, s;
  }(jQuery), function (a) {
    var b = "dropdown",
        d = "4.0.0-alpha.5",
        g = "bs.dropdown",
        h = "." + g,
        i = ".data-api",
        j = a.fn[b],
        k = 27,
        l = 38,
        m = 40,
        n = 3,
        o = { HIDE: "hide" + h, HIDDEN: "hidden" + h, SHOW: "show" + h, SHOWN: "shown" + h, CLICK: "click" + h, CLICK_DATA_API: "click" + h + i, KEYDOWN_DATA_API: "keydown" + h + i },
        p = { BACKDROP: "dropdown-backdrop", DISABLED: "disabled", OPEN: "open" },
        q = { BACKDROP: ".dropdown-backdrop", DATA_TOGGLE: '[data-toggle="dropdown"]', FORM_CHILD: ".dropdown form", ROLE_MENU: '[role="menu"]', ROLE_LISTBOX: '[role="listbox"]', NAVBAR_NAV: ".navbar-nav", VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, [role="listbox"] li:not(.disabled) a' },
        r = function () {
      function b(a) {
        c(this, b), this._element = a, this._addEventListeners();
      }return b.prototype.toggle = function () {
        if (this.disabled || a(this).hasClass(p.DISABLED)) return !1;var c = b._getParentFromElement(this),
            d = a(c).hasClass(p.OPEN);if (b._clearMenus(), d) return !1;if ("ontouchstart" in document.documentElement && !a(c).closest(q.NAVBAR_NAV).length) {
          var e = document.createElement("div");e.className = p.BACKDROP, a(e).insertBefore(this), a(e).on("click", b._clearMenus);
        }var f = { relatedTarget: this },
            g = a.Event(o.SHOW, f);return a(c).trigger(g), !g.isDefaultPrevented() && (this.focus(), this.setAttribute("aria-expanded", "true"), a(c).toggleClass(p.OPEN), a(c).trigger(a.Event(o.SHOWN, f)), !1);
      }, b.prototype.dispose = function () {
        a.removeData(this._element, g), a(this._element).off(h), this._element = null;
      }, b.prototype._addEventListeners = function () {
        a(this._element).on(o.CLICK, this.toggle);
      }, b._jQueryInterface = function (c) {
        return this.each(function () {
          var d = a(this).data(g);if (d || a(this).data(g, d = new b(this)), "string" == typeof c) {
            if (void 0 === d[c]) throw new Error('No method named "' + c + '"');d[c].call(this);
          }
        });
      }, b._clearMenus = function (c) {
        if (!c || c.which !== n) {
          var d = a(q.BACKDROP)[0];d && d.parentNode.removeChild(d);for (var e = a.makeArray(a(q.DATA_TOGGLE)), f = 0; f < e.length; f++) {
            var g = b._getParentFromElement(e[f]),
                h = { relatedTarget: e[f] };if (a(g).hasClass(p.OPEN) && !(c && "click" === c.type && /input|textarea/i.test(c.target.tagName) && a.contains(g, c.target))) {
              var i = a.Event(o.HIDE, h);a(g).trigger(i), i.isDefaultPrevented() || (e[f].setAttribute("aria-expanded", "false"), a(g).removeClass(p.OPEN).trigger(a.Event(o.HIDDEN, h)));
            }
          }
        }
      }, b._getParentFromElement = function (b) {
        var c = void 0,
            d = f.getSelectorFromElement(b);return d && (c = a(d)[0]), c || b.parentNode;
      }, b._dataApiKeydownHandler = function (c) {
        if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName) && (c.preventDefault(), c.stopPropagation(), !this.disabled && !a(this).hasClass(p.DISABLED))) {
          var d = b._getParentFromElement(this),
              e = a(d).hasClass(p.OPEN);if (!e && c.which !== k || e && c.which === k) {
            if (c.which === k) {
              var f = a(d).find(q.DATA_TOGGLE)[0];a(f).trigger("focus");
            }return void a(this).trigger("click");
          }var g = a.makeArray(a(q.VISIBLE_ITEMS));if (g = g.filter(function (a) {
            return a.offsetWidth || a.offsetHeight;
          }), g.length) {
            var h = g.indexOf(c.target);c.which === l && h > 0 && h--, c.which === m && h < g.length - 1 && h++, h < 0 && (h = 0), g[h].focus();
          }
        }
      }, e(b, null, [{ key: "VERSION", get: function get() {
          return d;
        } }]), b;
    }();return a(document).on(o.KEYDOWN_DATA_API, q.DATA_TOGGLE, r._dataApiKeydownHandler).on(o.KEYDOWN_DATA_API, q.ROLE_MENU, r._dataApiKeydownHandler).on(o.KEYDOWN_DATA_API, q.ROLE_LISTBOX, r._dataApiKeydownHandler).on(o.CLICK_DATA_API, r._clearMenus).on(o.CLICK_DATA_API, q.DATA_TOGGLE, r.prototype.toggle).on(o.CLICK_DATA_API, q.FORM_CHILD, function (a) {
      a.stopPropagation();
    }), a.fn[b] = r._jQueryInterface, a.fn[b].Constructor = r, a.fn[b].noConflict = function () {
      return a.fn[b] = j, r._jQueryInterface;
    }, r;
  }(jQuery), function (a) {
    var b = "modal",
        g = "4.0.0-alpha.5",
        h = "bs.modal",
        i = "." + h,
        j = ".data-api",
        k = a.fn[b],
        l = 300,
        m = 150,
        n = 27,
        o = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
        p = { backdrop: "(boolean|string)", keyboard: "boolean", focus: "boolean", show: "boolean" },
        q = { HIDE: "hide" + i, HIDDEN: "hidden" + i, SHOW: "show" + i, SHOWN: "shown" + i, FOCUSIN: "focusin" + i, RESIZE: "resize" + i, CLICK_DISMISS: "click.dismiss" + i, KEYDOWN_DISMISS: "keydown.dismiss" + i, MOUSEUP_DISMISS: "mouseup.dismiss" + i, MOUSEDOWN_DISMISS: "mousedown.dismiss" + i, CLICK_DATA_API: "click" + i + j },
        r = { SCROLLBAR_MEASURER: "modal-scrollbar-measure", BACKDROP: "modal-backdrop", OPEN: "modal-open", FADE: "fade", IN: "in" },
        s = { DIALOG: ".modal-dialog", DATA_TOGGLE: '[data-toggle="modal"]', DATA_DISMISS: '[data-dismiss="modal"]', FIXED_CONTENT: ".navbar-fixed-top, .navbar-fixed-bottom, .is-fixed" },
        t = function () {
      function j(b, d) {
        c(this, j), this._config = this._getConfig(d), this._element = b, this._dialog = a(b).find(s.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0;
      }return j.prototype.toggle = function (a) {
        return this._isShown ? this.hide() : this.show(a);
      }, j.prototype.show = function (b) {
        var c = this,
            d = a.Event(q.SHOW, { relatedTarget: b });a(this._element).trigger(d), this._isShown || d.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), a(document.body).addClass(r.OPEN), this._setEscapeEvent(), this._setResizeEvent(), a(this._element).on(q.CLICK_DISMISS, s.DATA_DISMISS, a.proxy(this.hide, this)), a(this._dialog).on(q.MOUSEDOWN_DISMISS, function () {
          a(c._element).one(q.MOUSEUP_DISMISS, function (b) {
            a(b.target).is(c._element) && (c._ignoreBackdropClick = !0);
          });
        }), this._showBackdrop(a.proxy(this._showElement, this, b)));
      }, j.prototype.hide = function (b) {
        b && b.preventDefault();var c = a.Event(q.HIDE);a(this._element).trigger(c), this._isShown && !c.isDefaultPrevented() && (this._isShown = !1, this._setEscapeEvent(), this._setResizeEvent(), a(document).off(q.FOCUSIN), a(this._element).removeClass(r.IN), a(this._element).off(q.CLICK_DISMISS), a(this._dialog).off(q.MOUSEDOWN_DISMISS), f.supportsTransitionEnd() && a(this._element).hasClass(r.FADE) ? a(this._element).one(f.TRANSITION_END, a.proxy(this._hideModal, this)).emulateTransitionEnd(l) : this._hideModal());
      }, j.prototype.dispose = function () {
        a.removeData(this._element, h), a(window).off(i), a(document).off(i), a(this._element).off(i), a(this._backdrop).off(i), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._originalBodyPadding = null, this._scrollbarWidth = null;
      }, j.prototype._getConfig = function (c) {
        return c = a.extend({}, o, c), f.typeCheckConfig(b, c, p), c;
      }, j.prototype._showElement = function (b) {
        var c = this,
            d = f.supportsTransitionEnd() && a(this._element).hasClass(r.FADE);this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, d && f.reflow(this._element), a(this._element).addClass(r.IN), this._config.focus && this._enforceFocus();var e = a.Event(q.SHOWN, { relatedTarget: b }),
            g = function g() {
          c._config.focus && c._element.focus(), a(c._element).trigger(e);
        };d ? a(this._dialog).one(f.TRANSITION_END, g).emulateTransitionEnd(l) : g();
      }, j.prototype._enforceFocus = function () {
        var b = this;a(document).off(q.FOCUSIN).on(q.FOCUSIN, function (c) {
          document === c.target || b._element === c.target || a(b._element).has(c.target).length || b._element.focus();
        });
      }, j.prototype._setEscapeEvent = function () {
        var b = this;this._isShown && this._config.keyboard ? a(this._element).on(q.KEYDOWN_DISMISS, function (a) {
          a.which === n && b.hide();
        }) : this._isShown || a(this._element).off(q.KEYDOWN_DISMISS);
      }, j.prototype._setResizeEvent = function () {
        this._isShown ? a(window).on(q.RESIZE, a.proxy(this._handleUpdate, this)) : a(window).off(q.RESIZE);
      }, j.prototype._hideModal = function () {
        var b = this;this._element.style.display = "none", this._element.setAttribute("aria-hidden", "true"), this._showBackdrop(function () {
          a(document.body).removeClass(r.OPEN), b._resetAdjustments(), b._resetScrollbar(), a(b._element).trigger(q.HIDDEN);
        });
      }, j.prototype._removeBackdrop = function () {
        this._backdrop && (a(this._backdrop).remove(), this._backdrop = null);
      }, j.prototype._showBackdrop = function (b) {
        var c = this,
            d = a(this._element).hasClass(r.FADE) ? r.FADE : "";if (this._isShown && this._config.backdrop) {
          var e = f.supportsTransitionEnd() && d;if (this._backdrop = document.createElement("div"), this._backdrop.className = r.BACKDROP, d && a(this._backdrop).addClass(d), a(this._backdrop).appendTo(document.body), a(this._element).on(q.CLICK_DISMISS, function (a) {
            return c._ignoreBackdropClick ? void (c._ignoreBackdropClick = !1) : void (a.target === a.currentTarget && ("static" === c._config.backdrop ? c._element.focus() : c.hide()));
          }), e && f.reflow(this._backdrop), a(this._backdrop).addClass(r.IN), !b) return;if (!e) return void b();a(this._backdrop).one(f.TRANSITION_END, b).emulateTransitionEnd(m);
        } else if (!this._isShown && this._backdrop) {
          a(this._backdrop).removeClass(r.IN);var g = function g() {
            c._removeBackdrop(), b && b();
          };f.supportsTransitionEnd() && a(this._element).hasClass(r.FADE) ? a(this._backdrop).one(f.TRANSITION_END, g).emulateTransitionEnd(m) : g();
        } else b && b();
      }, j.prototype._handleUpdate = function () {
        this._adjustDialog();
      }, j.prototype._adjustDialog = function () {
        var a = this._element.scrollHeight > document.documentElement.clientHeight;!this._isBodyOverflowing && a && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !a && (this._element.style.paddingRight = this._scrollbarWidth + "px");
      }, j.prototype._resetAdjustments = function () {
        this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
      }, j.prototype._checkScrollbar = function () {
        this._isBodyOverflowing = document.body.clientWidth < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth();
      }, j.prototype._setScrollbar = function () {
        var b = parseInt(a(s.FIXED_CONTENT).css("padding-right") || 0, 10);this._originalBodyPadding = document.body.style.paddingRight || "", this._isBodyOverflowing && (document.body.style.paddingRight = b + this._scrollbarWidth + "px");
      }, j.prototype._resetScrollbar = function () {
        document.body.style.paddingRight = this._originalBodyPadding;
      }, j.prototype._getScrollbarWidth = function () {
        var a = document.createElement("div");a.className = r.SCROLLBAR_MEASURER, document.body.appendChild(a);var b = a.offsetWidth - a.clientWidth;return document.body.removeChild(a), b;
      }, j._jQueryInterface = function (b, c) {
        return this.each(function () {
          var e = a(this).data(h),
              f = a.extend({}, j.Default, a(this).data(), "object" === ("undefined" == typeof b ? "undefined" : d(b)) && b);if (e || (e = new j(this, f), a(this).data(h, e)), "string" == typeof b) {
            if (void 0 === e[b]) throw new Error('No method named "' + b + '"');e[b](c);
          } else f.show && e.show(c);
        });
      }, e(j, null, [{ key: "VERSION", get: function get() {
          return g;
        } }, { key: "Default", get: function get() {
          return o;
        } }]), j;
    }();return a(document).on(q.CLICK_DATA_API, s.DATA_TOGGLE, function (b) {
      var c = this,
          d = void 0,
          e = f.getSelectorFromElement(this);e && (d = a(e)[0]);var g = a(d).data(h) ? "toggle" : a.extend({}, a(d).data(), a(this).data());"A" === this.tagName && b.preventDefault();var i = a(d).one(q.SHOW, function (b) {
        b.isDefaultPrevented() || i.one(q.HIDDEN, function () {
          a(c).is(":visible") && c.focus();
        });
      });t._jQueryInterface.call(a(d), g, this);
    }), a.fn[b] = t._jQueryInterface, a.fn[b].Constructor = t, a.fn[b].noConflict = function () {
      return a.fn[b] = k, t._jQueryInterface;
    }, t;
  }(jQuery), function (a) {
    var b = "scrollspy",
        g = "4.0.0-alpha.5",
        h = "bs.scrollspy",
        i = "." + h,
        j = ".data-api",
        k = a.fn[b],
        l = { offset: 10, method: "auto", target: "" },
        m = { offset: "number", method: "string", target: "(string|element)" },
        n = { ACTIVATE: "activate" + i, SCROLL: "scroll" + i, LOAD_DATA_API: "load" + i + j },
        o = { DROPDOWN_ITEM: "dropdown-item", DROPDOWN_MENU: "dropdown-menu", NAV_LINK: "nav-link", NAV: "nav", ACTIVE: "active" },
        p = { DATA_SPY: '[data-spy="scroll"]', ACTIVE: ".active", LIST_ITEM: ".list-item", LI: "li", LI_DROPDOWN: "li.dropdown", NAV_LINKS: ".nav-link", DROPDOWN: ".dropdown", DROPDOWN_ITEMS: ".dropdown-item", DROPDOWN_TOGGLE: ".dropdown-toggle" },
        q = { OFFSET: "offset", POSITION: "position" },
        r = function () {
      function j(b, d) {
        c(this, j), this._element = b, this._scrollElement = "BODY" === b.tagName ? window : b, this._config = this._getConfig(d), this._selector = this._config.target + " " + p.NAV_LINKS + "," + (this._config.target + " " + p.DROPDOWN_ITEMS), this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, a(this._scrollElement).on(n.SCROLL, a.proxy(this._process, this)), this.refresh(), this._process();
      }return j.prototype.refresh = function () {
        var b = this,
            c = this._scrollElement !== this._scrollElement.window ? q.POSITION : q.OFFSET,
            d = "auto" === this._config.method ? c : this._config.method,
            e = d === q.POSITION ? this._getScrollTop() : 0;this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight();var g = a.makeArray(a(this._selector));g.map(function (b) {
          var c = void 0,
              g = f.getSelectorFromElement(b);return g && (c = a(g)[0]), c && (c.offsetWidth || c.offsetHeight) ? [a(c)[d]().top + e, g] : null;
        }).filter(function (a) {
          return a;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (a) {
          b._offsets.push(a[0]), b._targets.push(a[1]);
        });
      }, j.prototype.dispose = function () {
        a.removeData(this._element, h), a(this._scrollElement).off(i), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null;
      }, j.prototype._getConfig = function (c) {
        if (c = a.extend({}, l, c), "string" != typeof c.target) {
          var d = a(c.target).attr("id");d || (d = f.getUID(b), a(c.target).attr("id", d)), c.target = "#" + d;
        }return f.typeCheckConfig(b, c, m), c;
      }, j.prototype._getScrollTop = function () {
        return this._scrollElement === window ? this._scrollElement.scrollY : this._scrollElement.scrollTop;
      }, j.prototype._getScrollHeight = function () {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      }, j.prototype._process = function () {
        var a = this._getScrollTop() + this._config.offset,
            b = this._getScrollHeight(),
            c = this._config.offset + b - this._scrollElement.offsetHeight;if (this._scrollHeight !== b && this.refresh(), a >= c) {
          var d = this._targets[this._targets.length - 1];this._activeTarget !== d && this._activate(d);
        }if (this._activeTarget && a < this._offsets[0]) return this._activeTarget = null, void this._clear();for (var e = this._offsets.length; e--;) {
          var f = this._activeTarget !== this._targets[e] && a >= this._offsets[e] && (void 0 === this._offsets[e + 1] || a < this._offsets[e + 1]);f && this._activate(this._targets[e]);
        }
      }, j.prototype._activate = function (b) {
        this._activeTarget = b, this._clear();var c = this._selector.split(",");c = c.map(function (a) {
          return a + '[data-target="' + b + '"],' + (a + '[href="' + b + '"]');
        });var d = a(c.join(","));d.hasClass(o.DROPDOWN_ITEM) ? (d.closest(p.DROPDOWN).find(p.DROPDOWN_TOGGLE).addClass(o.ACTIVE), d.addClass(o.ACTIVE)) : d.parents(p.LI).find(p.NAV_LINKS).addClass(o.ACTIVE), a(this._scrollElement).trigger(n.ACTIVATE, { relatedTarget: b });
      }, j.prototype._clear = function () {
        a(this._selector).filter(p.ACTIVE).removeClass(o.ACTIVE);
      }, j._jQueryInterface = function (b) {
        return this.each(function () {
          var c = a(this).data(h),
              e = "object" === ("undefined" == typeof b ? "undefined" : d(b)) && b || null;if (c || (c = new j(this, e), a(this).data(h, c)), "string" == typeof b) {
            if (void 0 === c[b]) throw new Error('No method named "' + b + '"');c[b]();
          }
        });
      }, e(j, null, [{ key: "VERSION", get: function get() {
          return g;
        } }, { key: "Default", get: function get() {
          return l;
        } }]), j;
    }();return a(window).on(n.LOAD_DATA_API, function () {
      for (var b = a.makeArray(a(p.DATA_SPY)), c = b.length; c--;) {
        var d = a(b[c]);r._jQueryInterface.call(d, d.data());
      }
    }), a.fn[b] = r._jQueryInterface, a.fn[b].Constructor = r, a.fn[b].noConflict = function () {
      return a.fn[b] = k, r._jQueryInterface;
    }, r;
  }(jQuery), function (a) {
    var b = "tab",
        d = "4.0.0-alpha.5",
        g = "bs.tab",
        h = "." + g,
        i = ".data-api",
        j = a.fn[b],
        k = 150,
        l = { HIDE: "hide" + h, HIDDEN: "hidden" + h, SHOW: "show" + h, SHOWN: "shown" + h, CLICK_DATA_API: "click" + h + i },
        m = { DROPDOWN_MENU: "dropdown-menu", ACTIVE: "active", FADE: "fade", IN: "in" },
        n = { A: "a", LI: "li", DROPDOWN: ".dropdown", UL: "ul:not(.dropdown-menu)", FADE_CHILD: "> .nav-item .fade, > .fade", ACTIVE: ".active", ACTIVE_CHILD: "> .nav-item > .active, > .active", DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
      DROPDOWN_TOGGLE: ".dropdown-toggle", DROPDOWN_ACTIVE_CHILD: "> .dropdown-menu .active" },
        o = function () {
      function b(a) {
        c(this, b), this._element = a;
      }return b.prototype.show = function () {
        var b = this;if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE || !a(this._element).hasClass(m.ACTIVE)) {
          var c = void 0,
              d = void 0,
              e = a(this._element).closest(n.UL)[0],
              g = f.getSelectorFromElement(this._element);e && (d = a.makeArray(a(e).find(n.ACTIVE)), d = d[d.length - 1]);var h = a.Event(l.HIDE, { relatedTarget: this._element }),
              i = a.Event(l.SHOW, { relatedTarget: d });if (d && a(d).trigger(h), a(this._element).trigger(i), !i.isDefaultPrevented() && !h.isDefaultPrevented()) {
            g && (c = a(g)[0]), this._activate(this._element, e);var j = function j() {
              var c = a.Event(l.HIDDEN, { relatedTarget: b._element }),
                  e = a.Event(l.SHOWN, { relatedTarget: d });a(d).trigger(c), a(b._element).trigger(e);
            };c ? this._activate(c, c.parentNode, j) : j();
          }
        }
      }, b.prototype.dispose = function () {
        a.removeClass(this._element, g), this._element = null;
      }, b.prototype._activate = function (b, c, d) {
        var e = a(c).find(n.ACTIVE_CHILD)[0],
            g = d && f.supportsTransitionEnd() && (e && a(e).hasClass(m.FADE) || Boolean(a(c).find(n.FADE_CHILD)[0])),
            h = a.proxy(this._transitionComplete, this, b, e, g, d);e && g ? a(e).one(f.TRANSITION_END, h).emulateTransitionEnd(k) : h(), e && a(e).removeClass(m.IN);
      }, b.prototype._transitionComplete = function (b, c, d, e) {
        if (c) {
          a(c).removeClass(m.ACTIVE);var g = a(c).find(n.DROPDOWN_ACTIVE_CHILD)[0];g && a(g).removeClass(m.ACTIVE), c.setAttribute("aria-expanded", !1);
        }if (a(b).addClass(m.ACTIVE), b.setAttribute("aria-expanded", !0), d ? (f.reflow(b), a(b).addClass(m.IN)) : a(b).removeClass(m.FADE), b.parentNode && a(b.parentNode).hasClass(m.DROPDOWN_MENU)) {
          var h = a(b).closest(n.DROPDOWN)[0];h && a(h).find(n.DROPDOWN_TOGGLE).addClass(m.ACTIVE), b.setAttribute("aria-expanded", !0);
        }e && e();
      }, b._jQueryInterface = function (c) {
        return this.each(function () {
          var d = a(this),
              e = d.data(g);if (e || (e = e = new b(this), d.data(g, e)), "string" == typeof c) {
            if (void 0 === e[c]) throw new Error('No method named "' + c + '"');e[c]();
          }
        });
      }, e(b, null, [{ key: "VERSION", get: function get() {
          return d;
        } }]), b;
    }();return a(document).on(l.CLICK_DATA_API, n.DATA_TOGGLE, function (b) {
      b.preventDefault(), o._jQueryInterface.call(a(this), "show");
    }), a.fn[b] = o._jQueryInterface, a.fn[b].Constructor = o, a.fn[b].noConflict = function () {
      return a.fn[b] = j, o._jQueryInterface;
    }, o;
  }(jQuery), function (a) {
    if (void 0 === window.Tether) throw new Error("Bootstrap tooltips require Tether (http://tether.io/)");var b = "tooltip",
        g = "4.0.0-alpha.5",
        h = "bs.tooltip",
        i = "." + h,
        j = a.fn[b],
        k = 150,
        l = "bs-tether",
        m = { animation: !0, template: '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, selector: !1, placement: "top", offset: "0 0", constraints: [] },
        n = { animation: "boolean", template: "string", title: "(string|element|function)", trigger: "string", delay: "(number|object)", html: "boolean", selector: "(string|boolean)", placement: "(string|function)", offset: "string", constraints: "array" },
        o = { TOP: "bottom center", RIGHT: "middle left", BOTTOM: "top center", LEFT: "middle right" },
        p = { IN: "in", OUT: "out" },
        q = { HIDE: "hide" + i, HIDDEN: "hidden" + i, SHOW: "show" + i, SHOWN: "shown" + i, INSERTED: "inserted" + i, CLICK: "click" + i, FOCUSIN: "focusin" + i, FOCUSOUT: "focusout" + i, MOUSEENTER: "mouseenter" + i, MOUSELEAVE: "mouseleave" + i },
        r = { FADE: "fade", IN: "in" },
        s = { TOOLTIP: ".tooltip", TOOLTIP_INNER: ".tooltip-inner" },
        t = { element: !1, enabled: !1 },
        u = { HOVER: "hover", FOCUS: "focus", CLICK: "click", MANUAL: "manual" },
        v = function () {
      function j(a, b) {
        c(this, j), this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._tether = null, this.element = a, this.config = this._getConfig(b), this.tip = null, this._setListeners();
      }return j.prototype.enable = function () {
        this._isEnabled = !0;
      }, j.prototype.disable = function () {
        this._isEnabled = !1;
      }, j.prototype.toggleEnabled = function () {
        this._isEnabled = !this._isEnabled;
      }, j.prototype.toggle = function (b) {
        if (b) {
          var c = this.constructor.DATA_KEY,
              d = a(b.currentTarget).data(c);d || (d = new this.constructor(b.currentTarget, this._getDelegateConfig()), a(b.currentTarget).data(c, d)), d._activeTrigger.click = !d._activeTrigger.click, d._isWithActiveTrigger() ? d._enter(null, d) : d._leave(null, d);
        } else {
          if (a(this.getTipElement()).hasClass(r.IN)) return void this._leave(null, this);this._enter(null, this);
        }
      }, j.prototype.dispose = function () {
        clearTimeout(this._timeout), this.cleanupTether(), a.removeData(this.element, this.constructor.DATA_KEY), a(this.element).off(this.constructor.EVENT_KEY), this.tip && a(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._tether = null, this.element = null, this.config = null, this.tip = null;
      }, j.prototype.show = function () {
        var b = this,
            c = a.Event(this.constructor.Event.SHOW);if (this.isWithContent() && this._isEnabled) {
          a(this.element).trigger(c);var d = a.contains(this.element.ownerDocument.documentElement, this.element);if (c.isDefaultPrevented() || !d) return;var e = this.getTipElement(),
              g = f.getUID(this.constructor.NAME);e.setAttribute("id", g), this.element.setAttribute("aria-describedby", g), this.setContent(), this.config.animation && a(e).addClass(r.FADE);var h = "function" == typeof this.config.placement ? this.config.placement.call(this, e, this.element) : this.config.placement,
              i = this._getAttachment(h);a(e).data(this.constructor.DATA_KEY, this).appendTo(document.body), a(this.element).trigger(this.constructor.Event.INSERTED), this._tether = new Tether({ attachment: i, element: e, target: this.element, classes: t, classPrefix: l, offset: this.config.offset, constraints: this.config.constraints, addTargetClasses: !1 }), f.reflow(e), this._tether.position(), a(e).addClass(r.IN);var k = function k() {
            var c = b._hoverState;b._hoverState = null, a(b.element).trigger(b.constructor.Event.SHOWN), c === p.OUT && b._leave(null, b);
          };if (f.supportsTransitionEnd() && a(this.tip).hasClass(r.FADE)) return void a(this.tip).one(f.TRANSITION_END, k).emulateTransitionEnd(j._TRANSITION_DURATION);k();
        }
      }, j.prototype.hide = function (b) {
        var c = this,
            d = this.getTipElement(),
            e = a.Event(this.constructor.Event.HIDE),
            g = function g() {
          c._hoverState !== p.IN && d.parentNode && d.parentNode.removeChild(d), c.element.removeAttribute("aria-describedby"), a(c.element).trigger(c.constructor.Event.HIDDEN), c.cleanupTether(), b && b();
        };a(this.element).trigger(e), e.isDefaultPrevented() || (a(d).removeClass(r.IN), f.supportsTransitionEnd() && a(this.tip).hasClass(r.FADE) ? a(d).one(f.TRANSITION_END, g).emulateTransitionEnd(k) : g(), this._hoverState = "");
      }, j.prototype.isWithContent = function () {
        return Boolean(this.getTitle());
      }, j.prototype.getTipElement = function () {
        return this.tip = this.tip || a(this.config.template)[0];
      }, j.prototype.setContent = function () {
        var b = a(this.getTipElement());this.setElementContent(b.find(s.TOOLTIP_INNER), this.getTitle()), b.removeClass(r.FADE).removeClass(r.IN), this.cleanupTether();
      }, j.prototype.setElementContent = function (b, c) {
        var e = this.config.html;"object" === ("undefined" == typeof c ? "undefined" : d(c)) && (c.nodeType || c.jquery) ? e ? a(c).parent().is(b) || b.empty().append(c) : b.text(a(c).text()) : b[e ? "html" : "text"](c);
      }, j.prototype.getTitle = function () {
        var a = this.element.getAttribute("data-original-title");return a || (a = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), a;
      }, j.prototype.cleanupTether = function () {
        this._tether && this._tether.destroy();
      }, j.prototype._getAttachment = function (a) {
        return o[a.toUpperCase()];
      }, j.prototype._setListeners = function () {
        var b = this,
            c = this.config.trigger.split(" ");c.forEach(function (c) {
          if ("click" === c) a(b.element).on(b.constructor.Event.CLICK, b.config.selector, a.proxy(b.toggle, b));else if (c !== u.MANUAL) {
            var d = c === u.HOVER ? b.constructor.Event.MOUSEENTER : b.constructor.Event.FOCUSIN,
                e = c === u.HOVER ? b.constructor.Event.MOUSELEAVE : b.constructor.Event.FOCUSOUT;a(b.element).on(d, b.config.selector, a.proxy(b._enter, b)).on(e, b.config.selector, a.proxy(b._leave, b));
          }
        }), this.config.selector ? this.config = a.extend({}, this.config, { trigger: "manual", selector: "" }) : this._fixTitle();
      }, j.prototype._fixTitle = function () {
        var a = d(this.element.getAttribute("data-original-title"));(this.element.getAttribute("title") || "string" !== a) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""));
      }, j.prototype._enter = function (b, c) {
        var d = this.constructor.DATA_KEY;return c = c || a(b.currentTarget).data(d), c || (c = new this.constructor(b.currentTarget, this._getDelegateConfig()), a(b.currentTarget).data(d, c)), b && (c._activeTrigger["focusin" === b.type ? u.FOCUS : u.HOVER] = !0), a(c.getTipElement()).hasClass(r.IN) || c._hoverState === p.IN ? void (c._hoverState = p.IN) : (clearTimeout(c._timeout), c._hoverState = p.IN, c.config.delay && c.config.delay.show ? void (c._timeout = setTimeout(function () {
          c._hoverState === p.IN && c.show();
        }, c.config.delay.show)) : void c.show());
      }, j.prototype._leave = function (b, c) {
        var d = this.constructor.DATA_KEY;if (c = c || a(b.currentTarget).data(d), c || (c = new this.constructor(b.currentTarget, this._getDelegateConfig()), a(b.currentTarget).data(d, c)), b && (c._activeTrigger["focusout" === b.type ? u.FOCUS : u.HOVER] = !1), !c._isWithActiveTrigger()) return clearTimeout(c._timeout), c._hoverState = p.OUT, c.config.delay && c.config.delay.hide ? void (c._timeout = setTimeout(function () {
          c._hoverState === p.OUT && c.hide();
        }, c.config.delay.hide)) : void c.hide();
      }, j.prototype._isWithActiveTrigger = function () {
        for (var a in this._activeTrigger) {
          if (this._activeTrigger[a]) return !0;
        }return !1;
      }, j.prototype._getConfig = function (c) {
        return c = a.extend({}, this.constructor.Default, a(this.element).data(), c), c.delay && "number" == typeof c.delay && (c.delay = { show: c.delay, hide: c.delay }), f.typeCheckConfig(b, c, this.constructor.DefaultType), c;
      }, j.prototype._getDelegateConfig = function () {
        var a = {};if (this.config) for (var b in this.config) {
          this.constructor.Default[b] !== this.config[b] && (a[b] = this.config[b]);
        }return a;
      }, j._jQueryInterface = function (b) {
        return this.each(function () {
          var c = a(this).data(h),
              e = "object" === ("undefined" == typeof b ? "undefined" : d(b)) ? b : null;if ((c || !/dispose|hide/.test(b)) && (c || (c = new j(this, e), a(this).data(h, c)), "string" == typeof b)) {
            if (void 0 === c[b]) throw new Error('No method named "' + b + '"');c[b]();
          }
        });
      }, e(j, null, [{ key: "VERSION", get: function get() {
          return g;
        } }, { key: "Default", get: function get() {
          return m;
        } }, { key: "NAME", get: function get() {
          return b;
        } }, { key: "DATA_KEY", get: function get() {
          return h;
        } }, { key: "Event", get: function get() {
          return q;
        } }, { key: "EVENT_KEY", get: function get() {
          return i;
        } }, { key: "DefaultType", get: function get() {
          return n;
        } }]), j;
    }();return a.fn[b] = v._jQueryInterface, a.fn[b].Constructor = v, a.fn[b].noConflict = function () {
      return a.fn[b] = j, v._jQueryInterface;
    }, v;
  }(jQuery));(function (f) {
    var h = "popover",
        i = "4.0.0-alpha.5",
        j = "bs.popover",
        k = "." + j,
        l = f.fn[h],
        m = f.extend({}, g.Default, { placement: "right", trigger: "click", content: "", template: '<div class="popover" role="tooltip"><h3 class="popover-title"></h3><div class="popover-content"></div></div>' }),
        n = f.extend({}, g.DefaultType, { content: "(string|element|function)" }),
        o = { FADE: "fade", IN: "in" },
        p = { TITLE: ".popover-title", CONTENT: ".popover-content" },
        q = { HIDE: "hide" + k, HIDDEN: "hidden" + k, SHOW: "show" + k, SHOWN: "shown" + k, INSERTED: "inserted" + k, CLICK: "click" + k, FOCUSIN: "focusin" + k, FOCUSOUT: "focusout" + k, MOUSEENTER: "mouseenter" + k, MOUSELEAVE: "mouseleave" + k },
        r = function (g) {
      function l() {
        return c(this, l), a(this, g.apply(this, arguments));
      }return b(l, g), l.prototype.isWithContent = function () {
        return this.getTitle() || this._getContent();
      }, l.prototype.getTipElement = function () {
        return this.tip = this.tip || f(this.config.template)[0];
      }, l.prototype.setContent = function () {
        var a = f(this.getTipElement());this.setElementContent(a.find(p.TITLE), this.getTitle()), this.setElementContent(a.find(p.CONTENT), this._getContent()), a.removeClass(o.FADE).removeClass(o.IN), this.cleanupTether();
      }, l.prototype._getContent = function () {
        return this.element.getAttribute("data-content") || ("function" == typeof this.config.content ? this.config.content.call(this.element) : this.config.content);
      }, l._jQueryInterface = function (a) {
        return this.each(function () {
          var b = f(this).data(j),
              c = "object" === ("undefined" == typeof a ? "undefined" : d(a)) ? a : null;if ((b || !/destroy|hide/.test(a)) && (b || (b = new l(this, c), f(this).data(j, b)), "string" == typeof a)) {
            if (void 0 === b[a]) throw new Error('No method named "' + a + '"');b[a]();
          }
        });
      }, e(l, null, [{ key: "VERSION", get: function get() {
          return i;
        } }, { key: "Default", get: function get() {
          return m;
        } }, { key: "NAME", get: function get() {
          return h;
        } }, { key: "DATA_KEY", get: function get() {
          return j;
        } }, { key: "Event", get: function get() {
          return q;
        } }, { key: "EVENT_KEY", get: function get() {
          return k;
        } }, { key: "DefaultType", get: function get() {
          return n;
        } }]), l;
    }(g);return f.fn[h] = r._jQueryInterface, f.fn[h].Constructor = r, f.fn[h].noConflict = function () {
      return f.fn[h] = l, r._jQueryInterface;
    }, r;
  })(jQuery);
}();
});

require.register("web/static/js/db/read_json.js", function(exports, require, module) {
'use strict';

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '/js/db/prayers.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

var actual_JSON;

function init() {
    loadJSON(function (response) {
        // Parse JSON string into object
        actual_JSON = JSON.parse(response);
        // console.log(actual_JSON);
        return actual_JSON;
    });
    console.log(actual_JSON);
};

init();
// actual_JSON = init();
// console.log(actual_JSON);
});

require.register("web/static/js/db/timetable.js", function(exports, require, module) {
"use strict";

var timetable = {
	1: ["06:43", "08:37", "12:30", "14:01", "16:18", "18:07"],
	2: ["06:43", "08:37", "12:31", "14:03", "16:19", "18:07"],
	3: ["06:43", "08:37", "12:31", "14:03", "16:21", "18:07"],
	4: ["06:43", "08:37", "12:31", "14:05", "16:22", "18:08"],
	5: ["06:43", "08:35", "12:31", "14:05", "16:23", "18:10"],
	6: ["06:43", "08:35", "12:31", "14:07", "16:25", "18:11"],
	7: ["06:43", "08:35", "12:33", "14:07", "16:26", "18:12"],
	8: ["06:42", "08:35", "12:33", "14:09", "16:26", "18:14"],
	9: ["06:42", "08:33", "12:33", "14:09", "16:29", "18:15"],
	10: ["06:41", "08:33", "12:33", "14:11", "16:30", "18:15"],
	11: ["06:41", "08:33", "12:33", "14:13", "16:32", "18:17"],
	12: ["06:41", "08:31", "12:35", "14:13", "16:33", "18:18"],
	13: ["06:40", "08:31", "12:35", "14:15", "16:34", "18:19"],
	14: ["06:39", "08:31", "12:35", "14:16", "16:36", "18:21"],
	15: ["06:39", "08:30", "12:35", "14:18", "16:37", "18:22"],
	16: ["06:38", "08:28", "12:35", "14:18", "16:38", "18:23"],
	17: ["06:36", "08:28", "12:35", "14:20", "16:41", "18:25"],
	18: ["06:36", "08:26", "12:37", "14:22", "16:42", "18:26"],
	19: ["06:35", "08:26", "12:37", "14:22", "16:44", "18:27"],
	20: ["06:34", "08:24", "12:37", "14:24", "16:45", "18:30"],
	21: ["06:33", "08:22", "12:37", "14:26", "16:48", "18:30"],
	22: ["06:32", "08:22", "12:37", "14:26", "16:49", "18:33"],
	23: ["06:31", "08:20", "12:37", "14:28", "16:52", "18:33"],
	24: ["06:30", "08:20", "12:37", "14:30", "16:52", "18:36"],
	25: ["06:30", "08:18", "12:39", "14:31", "16:55", "18:37"],
	26: ["06:29", "08:16", "12:39", "14:33", "16:56", "18:38"],
	27: ["06:28", "08:15", "12:39", "14:35", "16:59", "18:40"],
	28: ["06:27", "08:13", "12:39", "14:35", "17:00", "18:41"],
	29: ["06:26", "08:11", "12:39", "14:37", "17:03", "18:42"],
	30: ["06:24", "08:11", "12:39", "14:39", "17:04", "18:45"],
	31: ["06:23", "08:09", "12:39", "14:41", "17:07", "18:47"],
	32: ["06:21", "08:07", "12:39", "14:43", "17:07", "18:48"],
	33: ["06:19", "08:05", "12:39", "14:43", "17:10", "18:49"],
	34: ["06:18", "08:03", "12:39", "14:46", "17:11", "18:52"],
	35: ["06:17", "08:03", "12:39", "14:46", "17:14", "18:52"],
	36: ["06:15", "08:01", "12:41", "14:48", "17:15", "18:55"],
	37: ["06:15", "07:59", "12:41", "14:50", "17:18", "18:56"],
	38: ["06:13", "07:57", "12:41", "14:52", "17:19", "18:57"],
	39: ["06:12", "07:55", "12:41", "14:52", "17:22", "19:00"],
	40: ["06:10", "07:54", "12:41", "14:54", "17:23", "19:02"],
	41: ["06:08", "07:51", "12:41", "14:56", "17:26", "19:03"],
	42: ["06:06", "07:49", "12:41", "14:58", "17:27", "19:04"],
	43: ["06:04", "07:47", "12:41", "15:00", "17:30", "19:07"],
	44: ["06:02", "07:46", "12:41", "15:01", "17:32", "19:08"],
	45: ["06:01", "07:44", "12:41", "15:03", "17:33", "19:10"],
	46: ["06:00", "07:42", "12:41", "15:03", "17:36", "19:11"],
	47: ["05:58", "07:40", "12:41", "15:05", "17:37", "19:14"],
	48: ["05:56", "07:38", "12:41", "15:07", "17:40", "19:15"],
	49: ["05:55", "07:35", "12:41", "15:09", "17:41", "19:17"],
	50: ["05:53", "07:33", "12:41", "15:09", "17:44", "19:18"],
	51: ["05:50", "07:31", "12:41", "15:11", "17:45", "19:21"],
	52: ["05:48", "07:29", "12:41", "15:13", "17:48", "19:22"],
	53: ["05:46", "07:27", "12:41", "15:15", "17:49", "19:23"],
	54: ["05:45", "07:25", "12:39", "15:16", "17:52", "19:26"],
	55: ["05:43", "07:23", "12:39", "15:18", "17:53", "19:27"],
	56: ["05:41", "07:20", "12:39", "15:18", "17:56", "19:30"],
	57: ["05:39", "07:17", "12:39", "15:20", "17:57", "19:30"],
	58: ["05:36", "07:15", "12:39", "15:22", "18:00", "19:33"],
	59: ["05:34", "07:14", "12:39", "15:22", "18:02", "19:34"],
	60: ["05:34", "07:14", "12:39", "15:22", "18:02", "19:34"],
	61: ["05:32", "07:12", "12:39", "15:24", "18:03", "19:37"],
	62: ["05:30", "07:09", "12:39", "15:26", "18:04", "19:37"],
	63: ["05:28", "07:06", "12:39", "15:26", "18:07", "19:40"],
	64: ["05:26", "07:04", "12:39", "15:28", "18:08", "19:41"],
	65: ["05:24", "07:01", "12:39", "15:30", "18:11", "19:44"],
	66: ["05:21", "07:00", "12:39", "15:31", "18:12", "19:45"],
	67: ["05:19", "06:58", "12:37", "15:33", "18:15", "19:47"],
	68: ["05:16", "06:55", "12:37", "15:33", "18:17", "19:48"],
	69: ["05:15", "06:53", "12:37", "15:35", "18:18", "19:51"],
	70: ["05:13", "06:50", "12:37", "15:37", "18:21", "19:52"],
	71: ["05:10", "06:47", "12:37", "15:37", "18:22", "19:55"],
	72: ["05:08", "06:46", "12:37", "15:39", "18:23", "19:56"],
	73: ["05:05", "06:44", "12:37", "15:39", "18:26", "19:57"],
	74: ["05:02", "06:41", "12:37", "15:41", "18:27", "20:00"],
	75: ["05:00", "06:39", "12:35", "15:43", "18:30", "20:02"],
	76: ["04:59", "06:35", "12:35", "15:43", "18:32", "20:03"],
	77: ["04:56", "06:33", "12:35", "15:45", "18:33", "20:04"],
	78: ["04:54", "06:31", "12:35", "15:46", "18:34", "20:07"],
	79: ["04:50", "06:29", "12:35", "15:48", "18:37", "20:08"],
	80: ["04:48", "06:27", "12:35", "15:48", "18:38", "20:11"],
	81: ["04:46", "06:24", "12:35", "15:50", "18:41", "20:12"],
	82: ["04:44", "06:21", "12:33", "15:50", "18:42", "20:14"],
	83: ["04:42", "06:18", "12:33", "15:52", "18:44", "20:15"],
	84: ["04:39", "06:16", "12:33", "15:52", "18:45", "20:18"],
	85: ["04:36", "06:14", "12:33", "15:53", "18:48", "20:19"],
	86: ["04:33", "06:12", "12:33", "15:55", "18:49", "20:22"],
	87: ["04:31", "06:10", "12:33", "15:56", "18:52", "20:23"],
	88: ["04:29", "06:06", "12:31", "15:56", "18:53", "20:26"],
	89: ["04:27", "06:04", "12:31", "15:57", "18:55", "20:26"],
	90: ["04:24", "06:01", "12:31", "15:59", "18:56", "20:29"],
	91: ["04:20", "06:00", "12:31", "16:00", "18:59", "20:30"],
	92: ["05:18", "06:57", "13:31", "17:00", "20:00", "21:33"],
	93: ["05:15", "06:55", "13:31", "17:02", "20:03", "21:34"],
	94: ["05:14", "06:53", "13:30", "17:03", "20:03", "21:37"],
	95: ["05:11", "06:49", "13:30", "17:03", "20:06", "21:38"],
	96: ["05:09", "06:47", "13:30", "17:04", "20:07", "21:41"],
	97: ["05:05", "06:45", "13:30", "17:06", "20:10", "21:42"],
	98: ["05:02", "06:43", "13:28", "17:07", "20:11", "21:45"],
	99: ["05:00", "06:40", "13:28", "17:07", "20:12", "21:47"],
	100: ["04:58", "06:38", "13:28", "17:08", "20:15", "21:48"],
	101: ["04:56", "06:35", "13:28", "17:10", "20:17", "21:51"],
	102: ["04:53", "06:32", "13:28", "17:11", "20:18", "21:52"],
	103: ["04:50", "06:30", "13:28", "17:11", "20:21", "21:55"],
	104: ["04:47", "06:29", "13:26", "17:12", "20:22", "21:56"],
	105: ["04:45", "06:26", "13:26", "17:12", "20:23", "21:59"],
	106: ["04:43", "06:24", "13:26", "17:14", "20:26", "22:00"],
	107: ["04:40", "06:21", "13:26", "17:15", "20:27", "22:03"],
	108: ["04:38", "06:18", "13:26", "17:15", "20:30", "22:04"],
	109: ["04:34", "06:16", "13:26", "17:17", "20:30", "22:07"],
	110: ["04:31", "06:15", "13:26", "17:18", "20:33", "22:08"],
	111: ["04:30", "06:12", "13:26", "17:18", "20:34", "22:11"],
	112: ["04:27", "06:10", "13:26", "17:18", "20:37", "22:12"],
	113: ["04:25", "06:08", "13:24", "17:19", "20:38", "22:15"],
	114: ["04:21", "06:05", "13:24", "17:21", "20:40", "22:17"],
	115: ["04:19", "06:03", "13:24", "17:22", "20:41", "22:18"],
	116: ["04:16", "06:00", "13:24", "17:22", "20:44", "22:21"],
	117: ["04:15", "05:59", "13:24", "17:22", "20:45", "22:22"],
	118: ["04:12", "05:57", "13:24", "17:23", "20:48", "22:26"],
	119: ["04:10", "05:55", "13:24", "17:25", "20:48", "22:27"],
	120: ["04:06", "05:53", "13:24", "17:26", "20:51", "22:30"],
	121: ["04:04", "05:50", "13:24", "17:26", "20:52", "22:32"],
	122: ["04:01", "05:48", "13:24", "17:26", "20:55", "22:33"],
	123: ["04:00", "05:46", "13:24", "17:27", "20:56", "22:36"],
	124: ["03:57", "05:45", "13:24", "17:29", "20:57", "22:37"],
	125: ["03:54", "05:43", "13:22", "17:30", "21:00", "22:40"],
	126: ["03:53", "05:41", "13:22", "17:30", "21:02", "22:42"],
	127: ["03:50", "05:39", "13:22", "17:30", "21:03", "22:45"],
	128: ["03:47", "05:36", "13:22", "17:32", "21:06", "22:47"],
	129: ["03:46", "05:34", "13:22", "17:32", "21:07", "22:48"],
	130: ["03:43", "05:32", "13:22", "17:33", "21:08", "22:51"],
	131: ["03:40", "05:30", "13:22", "17:33", "21:11", "22:52"],
	132: ["03:38", "05:30", "13:22", "17:34", "21:12", "22:55"],
	133: ["03:37", "05:28", "13:22", "17:34", "21:14", "22:57"],
	134: ["03:34", "05:26", "13:22", "17:36", "21:15", "23:00"],
	135: ["03:31", "05:24", "13:22", "17:37", "21:18", "23:02"],
	136: ["03:30", "05:23", "13:22", "17:37", "21:18", "23:03"],
	137: ["03:28", "05:20", "13:22", "17:37", "21:21", "23:03"],
	138: ["03:25", "05:19", "13:22", "17:38", "21:22", "23:04"],
	139: ["03:23", "05:17", "13:22", "17:38", "21:23", "23:05"],
	140: ["03:22", "05:15", "13:22", "17:40", "21:26", "23:06"],
	141: ["03:20", "05:15", "13:22", "17:41", "21:27", "23:07"],
	142: ["03:17", "05:14", "13:22", "17:41", "21:29", "23:08"],
	143: ["03:15", "05:12", "13:22", "17:41", "21:30", "23:09"],
	144: ["03:14", "05:11", "13:24", "17:42", "21:32", "23:10"],
	145: ["03:12", "05:09", "13:24", "17:42", "21:33", "23:11"],
	146: ["03:10", "05:08", "13:24", "17:44", "21:34", "23:11"],
	147: ["03:08", "05:06", "13:24", "17:44", "21:37", "23:12"],
	148: ["03:07", "05:05", "13:24", "17:45", "21:37", "23:12"],
	149: ["03:06", "05:04", "13:24", "17:45", "21:40", "23:13"],
	150: ["03:04", "05:03", "13:24", "17:45", "21:41", "23:13"],
	151: ["03:01", "05:02", "13:24", "17:47", "21:41", "23:14"],
	152: ["03:00", "05:00", "13:24", "17:47", "21:44", "23:14"],
	153: ["03:00", "05:00", "13:24", "17:48", "21:45", "23:15"],
	154: ["02:58", "05:00", "13:24", "17:48", "21:45", "23:15"],
	155: ["02:57", "04:59", "13:24", "17:48", "21:47", "23:17"],
	156: ["02:55", "04:58", "13:24", "17:48", "21:48", "23:18"],
	157: ["02:54", "04:57", "13:24", "17:49", "21:48", "23:18"],
	158: ["02:53", "04:57", "13:26", "17:49", "21:51", "23:21"],
	159: ["02:52", "04:56", "13:26", "17:51", "21:52", "23:22"],
	160: ["02:51", "04:55", "13:26", "17:51", "21:52", "23:22"],
	161: ["02:51", "04:55", "13:26", "17:51", "21:52", "23:22"],
	162: ["02:50", "04:54", "13:26", "17:52", "21:53", "23:23"],
	163: ["02:49", "04:54", "13:26", "17:52", "21:55", "23:25"],
	164: ["02:47", "04:53", "13:26", "17:52", "21:56", "23:26"],
	165: ["02:47", "04:53", "13:26", "17:52", "21:56", "23:26"],
	166: ["02:46", "04:53", "13:26", "17:52", "21:56", "23:26"],
	167: ["02:46", "04:53", "13:26", "17:53", "21:57", "23:27"],
	168: ["02:46", "04:51", "13:26", "17:53", "21:57", "23:27"],
	169: ["02:46", "04:51", "13:28", "17:53", "21:59", "23:29"],
	170: ["02:46", "04:51", "13:28", "17:55", "21:59", "23:29"],
	171: ["02:46", "04:51", "13:28", "17:55", "22:00", "23:30"],
	172: ["02:46", "04:51", "13:28", "17:55", "22:00", "23:30"],
	173: ["02:46", "04:53", "13:28", "17:55", "22:00", "23:30"],
	174: ["02:46", "04:53", "13:28", "17:56", "22:00", "23:30"],
	175: ["02:46", "04:53", "13:28", "17:56", "22:00", "23:30"],
	176: ["02:46", "04:53", "13:28", "17:56", "22:00", "23:30"],
	177: ["02:46", "04:54", "13:28", "17:56", "22:00", "23:30"],
	178: ["02:47", "04:54", "13:30", "17:56", "22:00", "23:30"],
	179: ["02:47", "04:54", "13:30", "17:56", "22:00", "23:30"],
	180: ["02:49", "04:55", "13:30", "17:56", "22:00", "23:30"],
	181: ["02:50", "04:55", "13:30", "17:56", "22:00", "23:30"],
	182: ["02:50", "04:56", "13:30", "17:56", "22:00", "23:30"],
	183: ["02:51", "04:57", "13:30", "17:56", "22:00", "23:30"],
	184: ["02:52", "04:57", "13:31", "17:56", "22:00", "23:30"],
	185: ["02:53", "04:58", "13:31", "17:56", "21:59", "23:29"],
	186: ["02:53", "04:59", "13:31", "17:56", "21:59", "23:29"],
	187: ["02:55", "05:00", "13:31", "17:56", "21:57", "23:27"],
	188: ["02:57", "05:00", "13:31", "17:56", "21:57", "23:27"],
	189: ["02:58", "05:01", "13:31", "17:56", "21:56", "23:27"],
	190: ["03:00", "05:02", "13:31", "17:56", "21:56", "23:26"],
	191: ["03:00", "05:03", "13:31", "17:56", "21:56", "23:26"],
	192: ["03:01", "05:04", "13:31", "17:56", "21:55", "23:26"],
	193: ["03:04", "05:05", "13:31", "17:56", "21:53", "23:26"],
	194: ["03:06", "05:06", "13:31", "17:55", "21:52", "23:25"],
	195: ["03:07", "05:08", "13:31", "17:55", "21:52", "23:25"],
	196: ["03:08", "05:09", "13:31", "17:55", "21:51", "23:25"],
	197: ["03:10", "05:11", "13:31", "17:55", "21:49", "23:25"],
	198: ["03:12", "05:12", "13:33", "17:53", "21:48", "23:24"],
	199: ["03:14", "05:13", "13:33", "17:53", "21:48", "23:24"],
	200: ["03:15", "05:14", "13:33", "17:53", "21:47", "23:24"],
	201: ["03:17", "05:15", "13:33", "17:52", "21:45", "23:24"],
	202: ["03:20", "05:16", "13:33", "17:52", "21:44", "23:23"],
	203: ["03:22", "05:18", "13:33", "17:52", "21:42", "23:23"],
	204: ["03:23", "05:19", "13:33", "17:52", "21:41", "23:23"],
	205: ["03:25", "05:21", "13:33", "17:51", "21:40", "23:22"],
	206: ["03:27", "05:23", "13:33", "17:51", "21:38", "23:22"],
	207: ["03:30", "05:25", "13:33", "17:49", "21:37", "23:22"],
	208: ["03:31", "05:26", "13:33", "17:49", "21:36", "23:22"],
	209: ["03:34", "05:28", "13:33", "17:48", "21:33", "23:19"],
	210: ["03:36", "05:29", "13:33", "17:48", "21:33", "23:18"],
	211: ["03:38", "05:30", "13:33", "17:48", "21:30", "23:15"],
	212: ["03:39", "05:32", "13:33", "17:47", "21:29", "23:14"],
	213: ["03:42", "05:33", "13:33", "17:47", "21:27", "23:11"],
	214: ["03:44", "05:35", "13:33", "17:45", "21:26", "23:10"],
	215: ["03:46", "05:36", "13:33", "17:45", "21:23", "23:07"],
	216: ["03:47", "05:39", "13:33", "17:44", "21:22", "23:04"],
	217: ["03:50", "05:41", "13:33", "17:44", "21:21", "23:03"],
	218: ["03:53", "05:42", "13:33", "17:42", "21:18", "23:00"],
	219: ["03:54", "05:44", "13:33", "17:41", "21:17", "22:59"],
	220: ["03:57", "05:46", "13:33", "17:41", "21:15", "22:56"],
	221: ["03:59", "05:47", "13:31", "17:40", "21:12", "22:53"],
	222: ["04:00", "05:48", "13:31", "17:38", "21:11", "22:52"],
	223: ["04:02", "05:50", "13:31", "17:37", "21:08", "22:49"],
	224: ["04:04", "05:53", "13:31", "17:37", "21:07", "22:47"],
	225: ["04:08", "05:55", "13:31", "17:36", "21:04", "22:45"],
	226: ["04:10", "05:56", "13:31", "17:34", "21:03", "22:42"],
	227: ["04:12", "05:58", "13:31", "17:33", "21:00", "22:40"],
	228: ["04:14", "06:00", "13:31", "17:33", "20:59", "22:37"],
	229: ["04:15", "06:01", "13:31", "17:32", "20:56", "22:34"],
	230: ["04:17", "06:02", "13:31", "17:30", "20:55", "22:33"],
	231: ["04:19", "06:04", "13:31", "17:30", "20:52", "22:30"],
	232: ["04:23", "06:06", "13:31", "17:29", "20:51", "22:27"],
	233: ["04:25", "06:09", "13:31", "17:27", "20:48", "22:26"],
	234: ["04:27", "06:10", "13:30", "17:26", "20:45", "22:22"],
	235: ["04:29", "06:12", "13:30", "17:25", "20:44", "22:21"],
	236: ["04:30", "06:14", "13:30", "17:23", "20:41", "22:18"],
	237: ["04:32", "06:15", "13:30", "17:22", "20:40", "22:15"],
	238: ["04:34", "06:16", "13:28", "17:22", "20:37", "22:12"],
	239: ["04:36", "06:18", "13:28", "17:19", "20:34", "22:11"],
	240: ["04:39", "06:20", "13:28", "17:18", "20:33", "22:07"],
	241: ["04:41", "06:23", "13:28", "17:18", "20:30", "22:04"],
	242: ["04:43", "06:24", "13:28", "17:15", "20:27", "22:03"],
	243: ["04:45", "06:26", "13:28", "17:15", "20:26", "22:00"],
	244: ["04:46", "06:28", "13:28", "17:12", "20:23", "21:57"],
	245: ["04:48", "06:30", "13:26", "17:11", "20:21", "21:55"],
	246: ["04:50", "06:30", "13:26", "17:10", "20:18", "21:52"],
	247: ["04:53", "06:32", "13:26", "17:08", "20:15", "21:49"],
	248: ["04:55", "06:34", "13:26", "17:07", "20:14", "21:48"],
	249: ["04:57", "06:36", "13:26", "17:06", "20:11", "21:45"],
	250: ["04:59", "06:38", "13:26", "17:03", "20:08", "21:42"],
	251: ["05:00", "06:40", "13:26", "17:03", "20:07", "21:40"],
	252: ["05:02", "06:42", "13:24", "17:00", "20:03", "21:37"],
	253: ["05:04", "06:44", "13:24", "17:00", "20:02", "21:34"],
	254: ["05:05", "06:45", "13:24", "16:57", "20:00", "21:32"],
	255: ["05:08", "06:46", "13:24", "16:56", "19:56", "21:30"],
	256: ["05:10", "06:48", "13:24", "16:55", "19:55", "21:26"],
	257: ["05:12", "06:50", "13:22", "16:52", "19:52", "21:25"],
	258: ["05:14", "06:51", "13:22", "16:52", "19:49", "21:22"],
	259: ["05:15", "06:54", "13:22", "16:49", "19:47", "21:19"],
	260: ["05:17", "06:56", "13:22", "16:48", "19:45", "21:17"],
	261: ["05:18", "06:57", "13:22", "16:47", "19:42", "21:15"],
	262: ["05:20", "06:59", "13:22", "16:45", "19:40", "21:11"],
	263: ["05:23", "07:00", "13:20", "16:42", "19:37", "21:08"],
	264: ["05:25", "07:02", "13:20", "16:41", "19:34", "21:07"],
	265: ["05:27", "07:03", "13:20", "16:40", "19:33", "21:03"],
	266: ["05:28", "07:05", "13:20", "16:37", "19:30", "21:02"],
	267: ["05:30", "07:08", "13:20", "16:36", "19:27", "20:59"],
	268: ["05:31", "07:09", "13:18", "16:33", "19:25", "20:56"],
	269: ["05:33", "07:11", "13:18", "16:33", "19:22", "20:55"],
	270: ["05:34", "07:13", "13:18", "16:30", "19:19", "20:52"],
	271: ["05:36", "07:15", "13:18", "16:29", "19:18", "20:49"],
	272: ["05:39", "07:15", "13:18", "16:26", "19:15", "20:47"],
	273: ["05:40", "07:17", "13:18", "16:25", "19:12", "20:45"],
	274: ["05:42", "07:19", "13:16", "16:23", "19:10", "20:41"],
	275: ["05:44", "07:21", "13:16", "16:22", "19:07", "20:40"],
	276: ["05:46", "07:23", "13:16", "16:19", "19:06", "20:37"],
	277: ["05:46", "07:25", "13:16", "16:18", "19:03", "20:34"],
	278: ["05:48", "07:27", "13:16", "16:15", "19:00", "20:33"],
	279: ["05:50", "07:29", "13:15", "16:14", "18:57", "20:30"],
	280: ["05:51", "07:30", "13:15", "16:12", "18:56", "20:27"],
	281: ["05:54", "07:31", "13:15", "16:11", "18:52", "20:26"],
	282: ["05:56", "07:33", "13:15", "16:08", "18:51", "20:23"],
	283: ["05:57", "07:35", "13:13", "16:07", "18:48", "20:21"],
	284: ["05:59", "07:38", "13:13", "16:04", "18:45", "20:18"],
	285: ["06:00", "07:39", "13:13", "16:03", "18:44", "20:17"],
	286: ["06:01", "07:41", "13:13", "16:02", "18:41", "20:14"],
	287: ["06:03", "07:43", "13:13", "16:00", "18:38", "20:11"],
	288: ["06:05", "07:45", "13:13", "15:58", "18:37", "20:10"],
	289: ["06:06", "07:46", "13:13", "15:56", "18:34", "20:07"],
	290: ["06:09", "07:47", "13:11", "15:54", "18:32", "20:06"],
	291: ["06:11", "07:49", "13:11", "15:52", "18:30", "20:03"],
	292: ["06:12", "07:51", "13:11", "15:50", "18:27", "20:02"],
	293: ["06:14", "07:54", "13:11", "15:48", "18:25", "19:59"],
	294: ["06:15", "07:56", "13:11", "15:46", "18:22", "19:56"],
	295: ["06:16", "07:58", "13:11", "15:46", "18:21", "19:55"],
	296: ["06:18", "07:59", "13:11", "15:43", "18:18", "19:52"],
	297: ["06:20", "08:01", "13:11", "15:41", "18:17", "19:51"],
	298: ["06:21", "08:03", "13:11", "15:41", "18:14", "19:48"],
	299: ["06:24", "08:05", "13:11", "15:39", "18:11", "19:48"],
	300: ["06:26", "08:07", "13:11", "15:37", "18:10", "19:45"],
	301: ["06:27", "08:09", "13:09", "15:35", "18:07", "19:44"],
	302: ["06:29", "08:11", "13:09", "15:33", "18:06", "19:41"],
	303: ["06:30", "08:13", "13:09", "15:31", "18:03", "19:40"],
	304: ["05:31", "07:15", "12:09", "14:31", "17:02", "18:37"],
	305: ["05:33", "07:15", "12:09", "14:28", "17:00", "18:37"],
	306: ["05:34", "07:17", "12:09", "14:28", "16:57", "18:34"],
	307: ["05:36", "07:19", "12:09", "14:26", "16:56", "18:33"],
	308: ["05:39", "07:21", "12:09", "14:24", "16:53", "18:32"],
	309: ["05:40", "07:24", "12:09", "14:22", "16:52", "18:30"],
	310: ["05:42", "07:26", "12:09", "14:22", "16:49", "18:27"],
	311: ["05:44", "07:28", "12:09", "14:20", "16:48", "18:26"],
	312: ["05:45", "07:30", "12:09", "14:18", "16:47", "18:25"],
	313: ["05:46", "07:31", "12:09", "14:18", "16:45", "18:23"],
	314: ["05:47", "07:33", "12:09", "14:16", "16:42", "18:22"],
	315: ["05:49", "07:35", "12:09", "14:15", "16:41", "18:21"],
	316: ["05:51", "07:36", "12:11", "14:13", "16:40", "18:18"],
	317: ["05:53", "07:39", "12:11", "14:11", "16:37", "18:18"],
	318: ["05:55", "07:41", "12:11", "14:11", "16:36", "18:17"],
	319: ["05:56", "07:43", "12:11", "14:09", "16:34", "18:15"],
	320: ["05:58", "07:45", "12:11", "14:09", "16:33", "18:14"],
	321: ["06:00", "07:46", "12:11", "14:07", "16:32", "18:12"],
	322: ["06:00", "07:48", "12:11", "14:07", "16:30", "18:11"],
	323: ["06:02", "07:50", "12:11", "14:05", "16:29", "18:11"],
	324: ["06:03", "07:51", "12:11", "14:05", "16:27", "18:10"],
	325: ["06:05", "07:54", "12:11", "14:03", "16:26", "18:08"],
	326: ["06:06", "07:56", "12:13", "14:03", "16:25", "18:07"],
	327: ["06:09", "07:58", "12:13", "14:01", "16:23", "18:07"],
	328: ["06:10", "08:00", "12:13", "14:01", "16:22", "18:06"],
	329: ["06:12", "08:01", "12:13", "14:00", "16:22", "18:04"],
	330: ["06:13", "08:03", "12:13", "13:58", "16:19", "18:03"],
	331: ["06:14", "08:05", "12:13", "13:58", "16:18", "18:03"],
	332: ["06:15", "08:05", "12:13", "13:58", "16:18", "18:03"],
	333: ["06:16", "08:07", "12:15", "13:56", "16:17", "18:02"],
	334: ["06:18", "08:09", "12:15", "13:56", "16:17", "18:00"],
	335: ["06:19", "08:11", "12:15", "13:56", "16:15", "18:00"],
	336: ["06:20", "08:13", "12:16", "13:56", "16:15", "18:00"],
	337: ["06:21", "08:13", "12:16", "13:54", "16:14", "18:00"],
	338: ["06:24", "08:16", "12:16", "13:54", "16:12", "17:59"],
	339: ["06:25", "08:16", "12:16", "13:54", "16:12", "17:59"],
	340: ["06:26", "08:18", "12:16", "13:54", "16:11", "17:59"],
	341: ["06:27", "08:20", "12:18", "13:54", "16:11", "17:57"],
	342: ["06:28", "08:20", "12:18", "13:52", "16:11", "17:57"],
	343: ["06:29", "08:22", "12:18", "13:52", "16:11", "17:57"],
	344: ["06:30", "08:24", "12:18", "13:52", "16:10", "17:57"],
	345: ["06:31", "08:24", "12:20", "13:52", "16:10", "17:56"],
	346: ["06:32", "08:26", "12:20", "13:52", "16:10", "17:56"],
	347: ["06:32", "08:26", "12:20", "13:52", "16:10", "17:56"],
	348: ["06:33", "08:28", "12:20", "13:52", "16:10", "17:56"],
	349: ["06:34", "08:28", "12:20", "13:52", "16:10", "17:56"],
	350: ["06:35", "08:30", "12:22", "13:52", "16:10", "17:56"],
	351: ["06:36", "08:31", "12:22", "13:52", "16:10", "17:57"],
	352: ["06:38", "08:31", "12:22", "13:52", "16:10", "17:57"],
	353: ["06:38", "08:33", "12:22", "13:54", "16:10", "17:57"],
	354: ["06:39", "08:33", "12:24", "13:54", "16:10", "17:57"],
	355: ["06:40", "08:33", "12:24", "13:54", "16:11", "17:59"],
	356: ["06:40", "08:35", "12:24", "13:54", "16:11", "17:59"],
	357: ["06:41", "08:35", "12:24", "13:54", "16:11", "18:00"],
	358: ["06:41", "08:35", "12:26", "13:56", "16:11", "18:00"],
	359: ["06:42", "08:35", "12:26", "13:56", "16:11", "18:00"],
	360: ["06:42", "08:37", "12:26", "13:56", "16:12", "18:00"],
	361: ["06:42", "08:37", "12:26", "13:56", "16:14", "18:02"],
	362: ["06:43", "08:37", "12:28", "13:58", "16:14", "18:02"],
	363: ["06:43", "08:37", "12:28", "13:58", "16:15", "18:03"],
	364: ["06:43", "08:37", "12:28", "13:58", "16:15", "18:03"],
	365: ["06:43", "08:37", "12:28", "14:00", "16:17", "18:04"],
	366: ["06:43", "08:37", "12:30", "14:01", "16:18", "18:06"]
};
});

;require.register("web/static/js/jquery.slim.min.js", function(exports, require, module) {
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! jQuery v3.1.1 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-effects,-effects/animatedSelector,-effects/Tween,-deprecated | (c) jQuery Foundation | jquery.org/license */
!function (a, b) {
  "use strict";
  "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = a.document ? b(a, !0) : function (a) {
    if (!a.document) throw new Error("jQuery requires a window with a document");return b(a);
  } : b(a);
}("undefined" != typeof window ? window : undefined, function (a, b) {
  "use strict";
  var c = [],
      d = a.document,
      e = Object.getPrototypeOf,
      f = c.slice,
      g = c.concat,
      h = c.push,
      i = c.indexOf,
      j = {},
      k = j.toString,
      l = j.hasOwnProperty,
      m = l.toString,
      n = m.call(Object),
      o = {};function p(a, b) {
    b = b || d;var c = b.createElement("script");c.text = a, b.head.appendChild(c).parentNode.removeChild(c);
  }var q = "3.1.1 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-effects,-effects/animatedSelector,-effects/Tween,-deprecated",
      r = function r(a, b) {
    return new r.fn.init(a, b);
  },
      s = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      t = /^-ms-/,
      u = /-([a-z])/g,
      v = function v(a, b) {
    return b.toUpperCase();
  };r.fn = r.prototype = { jquery: q, constructor: r, length: 0, toArray: function toArray() {
      return f.call(this);
    }, get: function get(a) {
      return null == a ? f.call(this) : a < 0 ? this[a + this.length] : this[a];
    }, pushStack: function pushStack(a) {
      var b = r.merge(this.constructor(), a);return b.prevObject = this, b;
    }, each: function each(a) {
      return r.each(this, a);
    }, map: function map(a) {
      return this.pushStack(r.map(this, function (b, c) {
        return a.call(b, c, b);
      }));
    }, slice: function slice() {
      return this.pushStack(f.apply(this, arguments));
    }, first: function first() {
      return this.eq(0);
    }, last: function last() {
      return this.eq(-1);
    }, eq: function eq(a) {
      var b = this.length,
          c = +a + (a < 0 ? b : 0);return this.pushStack(c >= 0 && c < b ? [this[c]] : []);
    }, end: function end() {
      return this.prevObject || this.constructor();
    }, push: h, sort: c.sort, splice: c.splice }, r.extend = r.fn.extend = function () {
    var a,
        b,
        c,
        d,
        e,
        f,
        g = arguments[0] || {},
        h = 1,
        i = arguments.length,
        j = !1;for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == (typeof g === "undefined" ? "undefined" : _typeof(g)) || r.isFunction(g) || (g = {}), h === i && (g = this, h--); h < i; h++) {
      if (null != (a = arguments[h])) for (b in a) {
        c = g[b], d = a[b], g !== d && (j && d && (r.isPlainObject(d) || (e = r.isArray(d))) ? (e ? (e = !1, f = c && r.isArray(c) ? c : []) : f = c && r.isPlainObject(c) ? c : {}, g[b] = r.extend(j, f, d)) : void 0 !== d && (g[b] = d));
      }
    }return g;
  }, r.extend({ expando: "jQuery" + (q + Math.random()).replace(/\D/g, ""), isReady: !0, error: function error(a) {
      throw new Error(a);
    }, noop: function noop() {}, isFunction: function isFunction(a) {
      return "function" === r.type(a);
    }, isArray: Array.isArray, isWindow: function isWindow(a) {
      return null != a && a === a.window;
    }, isNumeric: function isNumeric(a) {
      var b = r.type(a);return ("number" === b || "string" === b) && !isNaN(a - parseFloat(a));
    }, isPlainObject: function isPlainObject(a) {
      var b, c;return !(!a || "[object Object]" !== k.call(a)) && (!(b = e(a)) || (c = l.call(b, "constructor") && b.constructor, "function" == typeof c && m.call(c) === n));
    }, isEmptyObject: function isEmptyObject(a) {
      var b;for (b in a) {
        return !1;
      }return !0;
    }, type: function type(a) {
      return null == a ? a + "" : "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) || "function" == typeof a ? j[k.call(a)] || "object" : typeof a === "undefined" ? "undefined" : _typeof(a);
    }, globalEval: function globalEval(a) {
      p(a);
    }, camelCase: function camelCase(a) {
      return a.replace(t, "ms-").replace(u, v);
    }, nodeName: function nodeName(a, b) {
      return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
    }, each: function each(a, b) {
      var c,
          d = 0;if (w(a)) {
        for (c = a.length; d < c; d++) {
          if (b.call(a[d], d, a[d]) === !1) break;
        }
      } else for (d in a) {
        if (b.call(a[d], d, a[d]) === !1) break;
      }return a;
    }, trim: function trim(a) {
      return null == a ? "" : (a + "").replace(s, "");
    }, makeArray: function makeArray(a, b) {
      var c = b || [];return null != a && (w(Object(a)) ? r.merge(c, "string" == typeof a ? [a] : a) : h.call(c, a)), c;
    }, inArray: function inArray(a, b, c) {
      return null == b ? -1 : i.call(b, a, c);
    }, merge: function merge(a, b) {
      for (var c = +b.length, d = 0, e = a.length; d < c; d++) {
        a[e++] = b[d];
      }return a.length = e, a;
    }, grep: function grep(a, b, c) {
      for (var d, e = [], f = 0, g = a.length, h = !c; f < g; f++) {
        d = !b(a[f], f), d !== h && e.push(a[f]);
      }return e;
    }, map: function map(a, b, c) {
      var d,
          e,
          f = 0,
          h = [];if (w(a)) for (d = a.length; f < d; f++) {
        e = b(a[f], f, c), null != e && h.push(e);
      } else for (f in a) {
        e = b(a[f], f, c), null != e && h.push(e);
      }return g.apply([], h);
    }, guid: 1, proxy: function proxy(a, b) {
      var c, d, e;if ("string" == typeof b && (c = a[b], b = a, a = c), r.isFunction(a)) return d = f.call(arguments, 2), e = function e() {
        return a.apply(b || this, d.concat(f.call(arguments)));
      }, e.guid = a.guid = a.guid || r.guid++, e;
    }, now: Date.now, support: o }), "function" == typeof Symbol && (r.fn[Symbol.iterator] = c[Symbol.iterator]), r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (a, b) {
    j["[object " + b + "]"] = b.toLowerCase();
  });function w(a) {
    var b = !!a && "length" in a && a.length,
        c = r.type(a);return "function" !== c && !r.isWindow(a) && ("array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a);
  }var x = function (a) {
    var b,
        c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t,
        u = "sizzle" + 1 * new Date(),
        v = a.document,
        w = 0,
        x = 0,
        y = ha(),
        z = ha(),
        A = ha(),
        B = function B(a, b) {
      return a === b && (l = !0), 0;
    },
        C = {}.hasOwnProperty,
        D = [],
        E = D.pop,
        F = D.push,
        G = D.push,
        H = D.slice,
        I = function I(a, b) {
      for (var c = 0, d = a.length; c < d; c++) {
        if (a[c] === b) return c;
      }return -1;
    },
        J = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        K = "[\\x20\\t\\r\\n\\f]",
        L = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
        M = "\\[" + K + "*(" + L + ")(?:" + K + "*([*^$|!~]?=)" + K + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + L + "))|)" + K + "*\\]",
        N = ":(" + L + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + M + ")*)|.*)\\)|)",
        O = new RegExp(K + "+", "g"),
        P = new RegExp("^" + K + "+|((?:^|[^\\\\])(?:\\\\.)*)" + K + "+$", "g"),
        Q = new RegExp("^" + K + "*," + K + "*"),
        R = new RegExp("^" + K + "*([>+~]|" + K + ")" + K + "*"),
        S = new RegExp("=" + K + "*([^\\]'\"]*?)" + K + "*\\]", "g"),
        T = new RegExp(N),
        U = new RegExp("^" + L + "$"),
        V = { ID: new RegExp("^#(" + L + ")"), CLASS: new RegExp("^\\.(" + L + ")"), TAG: new RegExp("^(" + L + "|[*])"), ATTR: new RegExp("^" + M), PSEUDO: new RegExp("^" + N), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + K + "*(even|odd|(([+-]|)(\\d*)n|)" + K + "*(?:([+-]|)" + K + "*(\\d+)|))" + K + "*\\)|)", "i"), bool: new RegExp("^(?:" + J + ")$", "i"), needsContext: new RegExp("^" + K + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + K + "*((?:-\\d)?\\d*)" + K + "*\\)|)(?=[^-]|$)", "i") },
        W = /^(?:input|select|textarea|button)$/i,
        X = /^h\d$/i,
        Y = /^[^{]+\{\s*\[native \w/,
        Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        $ = /[+~]/,
        _ = new RegExp("\\\\([\\da-f]{1,6}" + K + "?|(" + K + ")|.)", "ig"),
        aa = function aa(a, b, c) {
      var d = "0x" + b - 65536;return d !== d || c ? b : d < 0 ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320);
    },
        ba = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        ca = function ca(a, b) {
      return b ? "\0" === a ? "\uFFFD" : a.slice(0, -1) + "\\" + a.charCodeAt(a.length - 1).toString(16) + " " : "\\" + a;
    },
        da = function da() {
      m();
    },
        ea = ta(function (a) {
      return a.disabled === !0 && ("form" in a || "label" in a);
    }, { dir: "parentNode", next: "legend" });try {
      G.apply(D = H.call(v.childNodes), v.childNodes), D[v.childNodes.length].nodeType;
    } catch (fa) {
      G = { apply: D.length ? function (a, b) {
          F.apply(a, H.call(b));
        } : function (a, b) {
          var c = a.length,
              d = 0;while (a[c++] = b[d++]) {}a.length = c - 1;
        } };
    }function ga(a, b, d, e) {
      var f,
          h,
          j,
          k,
          l,
          o,
          r,
          s = b && b.ownerDocument,
          w = b ? b.nodeType : 9;if (d = d || [], "string" != typeof a || !a || 1 !== w && 9 !== w && 11 !== w) return d;if (!e && ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, p)) {
        if (11 !== w && (l = Z.exec(a))) if (f = l[1]) {
          if (9 === w) {
            if (!(j = b.getElementById(f))) return d;if (j.id === f) return d.push(j), d;
          } else if (s && (j = s.getElementById(f)) && t(b, j) && j.id === f) return d.push(j), d;
        } else {
          if (l[2]) return G.apply(d, b.getElementsByTagName(a)), d;if ((f = l[3]) && c.getElementsByClassName && b.getElementsByClassName) return G.apply(d, b.getElementsByClassName(f)), d;
        }if (c.qsa && !A[a + " "] && (!q || !q.test(a))) {
          if (1 !== w) s = b, r = a;else if ("object" !== b.nodeName.toLowerCase()) {
            (k = b.getAttribute("id")) ? k = k.replace(ba, ca) : b.setAttribute("id", k = u), o = g(a), h = o.length;while (h--) {
              o[h] = "#" + k + " " + sa(o[h]);
            }r = o.join(","), s = $.test(a) && qa(b.parentNode) || b;
          }if (r) try {
            return G.apply(d, s.querySelectorAll(r)), d;
          } catch (x) {} finally {
            k === u && b.removeAttribute("id");
          }
        }
      }return i(a.replace(P, "$1"), b, d, e);
    }function ha() {
      var a = [];function b(c, e) {
        return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e;
      }return b;
    }function ia(a) {
      return a[u] = !0, a;
    }function ja(a) {
      var b = n.createElement("fieldset");try {
        return !!a(b);
      } catch (c) {
        return !1;
      } finally {
        b.parentNode && b.parentNode.removeChild(b), b = null;
      }
    }function ka(a, b) {
      var c = a.split("|"),
          e = c.length;while (e--) {
        d.attrHandle[c[e]] = b;
      }
    }function la(a, b) {
      var c = b && a,
          d = c && 1 === a.nodeType && 1 === b.nodeType && a.sourceIndex - b.sourceIndex;if (d) return d;if (c) while (c = c.nextSibling) {
        if (c === b) return -1;
      }return a ? 1 : -1;
    }function ma(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();return "input" === c && b.type === a;
      };
    }function na(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();return ("input" === c || "button" === c) && b.type === a;
      };
    }function oa(a) {
      return function (b) {
        return "form" in b ? b.parentNode && b.disabled === !1 ? "label" in b ? "label" in b.parentNode ? b.parentNode.disabled === a : b.disabled === a : b.isDisabled === a || b.isDisabled !== !a && ea(b) === a : b.disabled === a : "label" in b && b.disabled === a;
      };
    }function pa(a) {
      return ia(function (b) {
        return b = +b, ia(function (c, d) {
          var e,
              f = a([], c.length, b),
              g = f.length;while (g--) {
            c[e = f[g]] && (c[e] = !(d[e] = c[e]));
          }
        });
      });
    }function qa(a) {
      return a && "undefined" != typeof a.getElementsByTagName && a;
    }c = ga.support = {}, f = ga.isXML = function (a) {
      var b = a && (a.ownerDocument || a).documentElement;return !!b && "HTML" !== b.nodeName;
    }, m = ga.setDocument = function (a) {
      var b,
          e,
          g = a ? a.ownerDocument || a : v;return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = n.documentElement, p = !f(n), v !== n && (e = n.defaultView) && e.top !== e && (e.addEventListener ? e.addEventListener("unload", da, !1) : e.attachEvent && e.attachEvent("onunload", da)), c.attributes = ja(function (a) {
        return a.className = "i", !a.getAttribute("className");
      }), c.getElementsByTagName = ja(function (a) {
        return a.appendChild(n.createComment("")), !a.getElementsByTagName("*").length;
      }), c.getElementsByClassName = Y.test(n.getElementsByClassName), c.getById = ja(function (a) {
        return o.appendChild(a).id = u, !n.getElementsByName || !n.getElementsByName(u).length;
      }), c.getById ? (d.filter.ID = function (a) {
        var b = a.replace(_, aa);return function (a) {
          return a.getAttribute("id") === b;
        };
      }, d.find.ID = function (a, b) {
        if ("undefined" != typeof b.getElementById && p) {
          var c = b.getElementById(a);return c ? [c] : [];
        }
      }) : (d.filter.ID = function (a) {
        var b = a.replace(_, aa);return function (a) {
          var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");return c && c.value === b;
        };
      }, d.find.ID = function (a, b) {
        if ("undefined" != typeof b.getElementById && p) {
          var c,
              d,
              e,
              f = b.getElementById(a);if (f) {
            if (c = f.getAttributeNode("id"), c && c.value === a) return [f];e = b.getElementsByName(a), d = 0;while (f = e[d++]) {
              if (c = f.getAttributeNode("id"), c && c.value === a) return [f];
            }
          }return [];
        }
      }), d.find.TAG = c.getElementsByTagName ? function (a, b) {
        return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0;
      } : function (a, b) {
        var c,
            d = [],
            e = 0,
            f = b.getElementsByTagName(a);if ("*" === a) {
          while (c = f[e++]) {
            1 === c.nodeType && d.push(c);
          }return d;
        }return f;
      }, d.find.CLASS = c.getElementsByClassName && function (a, b) {
        if ("undefined" != typeof b.getElementsByClassName && p) return b.getElementsByClassName(a);
      }, r = [], q = [], (c.qsa = Y.test(n.querySelectorAll)) && (ja(function (a) {
        o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\r\\' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + K + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + K + "*(?:value|" + J + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]");
      }), ja(function (a) {
        a.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var b = n.createElement("input");b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + K + "*[*^$|!~]?="), 2 !== a.querySelectorAll(":enabled").length && q.push(":enabled", ":disabled"), o.appendChild(a).disabled = !0, 2 !== a.querySelectorAll(":disabled").length && q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:");
      })), (c.matchesSelector = Y.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ja(function (a) {
        c.disconnectedMatch = s.call(a, "*"), s.call(a, "[s!='']:x"), r.push("!=", N);
      }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = Y.test(o.compareDocumentPosition), t = b || Y.test(o.contains) ? function (a, b) {
        var c = 9 === a.nodeType ? a.documentElement : a,
            d = b && b.parentNode;return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
      } : function (a, b) {
        if (b) while (b = b.parentNode) {
          if (b === a) return !0;
        }return !1;
      }, B = b ? function (a, b) {
        if (a === b) return l = !0, 0;var d = !a.compareDocumentPosition - !b.compareDocumentPosition;return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === n || a.ownerDocument === v && t(v, a) ? -1 : b === n || b.ownerDocument === v && t(v, b) ? 1 : k ? I(k, a) - I(k, b) : 0 : 4 & d ? -1 : 1);
      } : function (a, b) {
        if (a === b) return l = !0, 0;var c,
            d = 0,
            e = a.parentNode,
            f = b.parentNode,
            g = [a],
            h = [b];if (!e || !f) return a === n ? -1 : b === n ? 1 : e ? -1 : f ? 1 : k ? I(k, a) - I(k, b) : 0;if (e === f) return la(a, b);c = a;while (c = c.parentNode) {
          g.unshift(c);
        }c = b;while (c = c.parentNode) {
          h.unshift(c);
        }while (g[d] === h[d]) {
          d++;
        }return d ? la(g[d], h[d]) : g[d] === v ? -1 : h[d] === v ? 1 : 0;
      }, n) : n;
    }, ga.matches = function (a, b) {
      return ga(a, null, null, b);
    }, ga.matchesSelector = function (a, b) {
      if ((a.ownerDocument || a) !== n && m(a), b = b.replace(S, "='$1']"), c.matchesSelector && p && !A[b + " "] && (!r || !r.test(b)) && (!q || !q.test(b))) try {
        var d = s.call(a, b);if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d;
      } catch (e) {}return ga(b, n, null, [a]).length > 0;
    }, ga.contains = function (a, b) {
      return (a.ownerDocument || a) !== n && m(a), t(a, b);
    }, ga.attr = function (a, b) {
      (a.ownerDocument || a) !== n && m(a);var e = d.attrHandle[b.toLowerCase()],
          f = e && C.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null;
    }, ga.escape = function (a) {
      return (a + "").replace(ba, ca);
    }, ga.error = function (a) {
      throw new Error("Syntax error, unrecognized expression: " + a);
    }, ga.uniqueSort = function (a) {
      var b,
          d = [],
          e = 0,
          f = 0;if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
        while (b = a[f++]) {
          b === a[f] && (e = d.push(f));
        }while (e--) {
          a.splice(d[e], 1);
        }
      }return k = null, a;
    }, e = ga.getText = function (a) {
      var b,
          c = "",
          d = 0,
          f = a.nodeType;if (f) {
        if (1 === f || 9 === f || 11 === f) {
          if ("string" == typeof a.textContent) return a.textContent;for (a = a.firstChild; a; a = a.nextSibling) {
            c += e(a);
          }
        } else if (3 === f || 4 === f) return a.nodeValue;
      } else while (b = a[d++]) {
        c += e(b);
      }return c;
    }, d = ga.selectors = { cacheLength: 50, createPseudo: ia, match: V, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function ATTR(a) {
          return a[1] = a[1].replace(_, aa), a[3] = (a[3] || a[4] || a[5] || "").replace(_, aa), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4);
        }, CHILD: function CHILD(a) {
          return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || ga.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && ga.error(a[0]), a;
        }, PSEUDO: function PSEUDO(a) {
          var b,
              c = !a[6] && a[2];return V.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && T.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3));
        } }, filter: { TAG: function TAG(a) {
          var b = a.replace(_, aa).toLowerCase();return "*" === a ? function () {
            return !0;
          } : function (a) {
            return a.nodeName && a.nodeName.toLowerCase() === b;
          };
        }, CLASS: function CLASS(a) {
          var b = y[a + " "];return b || (b = new RegExp("(^|" + K + ")" + a + "(" + K + "|$)")) && y(a, function (a) {
            return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "");
          });
        }, ATTR: function ATTR(a, b, c) {
          return function (d) {
            var e = ga.attr(d, a);return null == e ? "!=" === b : !b || (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(O, " ") + " ").indexOf(c) > -1 : "|=" === b && (e === c || e.slice(0, c.length + 1) === c + "-"));
          };
        }, CHILD: function CHILD(a, b, c, d, e) {
          var f = "nth" !== a.slice(0, 3),
              g = "last" !== a.slice(-4),
              h = "of-type" === b;return 1 === d && 0 === e ? function (a) {
            return !!a.parentNode;
          } : function (b, c, i) {
            var j,
                k,
                l,
                m,
                n,
                o,
                p = f !== g ? "nextSibling" : "previousSibling",
                q = b.parentNode,
                r = h && b.nodeName.toLowerCase(),
                s = !i && !h,
                t = !1;if (q) {
              if (f) {
                while (p) {
                  m = b;while (m = m[p]) {
                    if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
                  }o = p = "only" === a && !o && "nextSibling";
                }return !0;
              }if (o = [g ? q.firstChild : q.lastChild], g && s) {
                m = q, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n && j[2], m = n && q.childNodes[n];while (m = ++n && m && m[p] || (t = n = 0) || o.pop()) {
                  if (1 === m.nodeType && ++t && m === b) {
                    k[a] = [w, n, t];break;
                  }
                }
              } else if (s && (m = b, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n), t === !1) while (m = ++n && m && m[p] || (t = n = 0) || o.pop()) {
                if ((h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) && ++t && (s && (l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [w, t]), m === b)) break;
              }return t -= e, t === d || t % d === 0 && t / d >= 0;
            }
          };
        }, PSEUDO: function PSEUDO(a, b) {
          var c,
              e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || ga.error("unsupported pseudo: " + a);return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ia(function (a, c) {
            var d,
                f = e(a, b),
                g = f.length;while (g--) {
              d = I(a, f[g]), a[d] = !(c[d] = f[g]);
            }
          }) : function (a) {
            return e(a, 0, c);
          }) : e;
        } }, pseudos: { not: ia(function (a) {
          var b = [],
              c = [],
              d = h(a.replace(P, "$1"));return d[u] ? ia(function (a, b, c, e) {
            var f,
                g = d(a, null, e, []),
                h = a.length;while (h--) {
              (f = g[h]) && (a[h] = !(b[h] = f));
            }
          }) : function (a, e, f) {
            return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop();
          };
        }), has: ia(function (a) {
          return function (b) {
            return ga(a, b).length > 0;
          };
        }), contains: ia(function (a) {
          return a = a.replace(_, aa), function (b) {
            return (b.textContent || b.innerText || e(b)).indexOf(a) > -1;
          };
        }), lang: ia(function (a) {
          return U.test(a || "") || ga.error("unsupported lang: " + a), a = a.replace(_, aa).toLowerCase(), function (b) {
            var c;do {
              if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
            } while ((b = b.parentNode) && 1 === b.nodeType);return !1;
          };
        }), target: function target(b) {
          var c = a.location && a.location.hash;return c && c.slice(1) === b.id;
        }, root: function root(a) {
          return a === o;
        }, focus: function focus(a) {
          return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
        }, enabled: oa(!1), disabled: oa(!0), checked: function checked(a) {
          var b = a.nodeName.toLowerCase();return "input" === b && !!a.checked || "option" === b && !!a.selected;
        }, selected: function selected(a) {
          return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
        }, empty: function empty(a) {
          for (a = a.firstChild; a; a = a.nextSibling) {
            if (a.nodeType < 6) return !1;
          }return !0;
        }, parent: function parent(a) {
          return !d.pseudos.empty(a);
        }, header: function header(a) {
          return X.test(a.nodeName);
        }, input: function input(a) {
          return W.test(a.nodeName);
        }, button: function button(a) {
          var b = a.nodeName.toLowerCase();return "input" === b && "button" === a.type || "button" === b;
        }, text: function text(a) {
          var b;return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase());
        }, first: pa(function () {
          return [0];
        }), last: pa(function (a, b) {
          return [b - 1];
        }), eq: pa(function (a, b, c) {
          return [c < 0 ? c + b : c];
        }), even: pa(function (a, b) {
          for (var c = 0; c < b; c += 2) {
            a.push(c);
          }return a;
        }), odd: pa(function (a, b) {
          for (var c = 1; c < b; c += 2) {
            a.push(c);
          }return a;
        }), lt: pa(function (a, b, c) {
          for (var d = c < 0 ? c + b : c; --d >= 0;) {
            a.push(d);
          }return a;
        }), gt: pa(function (a, b, c) {
          for (var d = c < 0 ? c + b : c; ++d < b;) {
            a.push(d);
          }return a;
        }) } }, d.pseudos.nth = d.pseudos.eq;for (b in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) {
      d.pseudos[b] = ma(b);
    }for (b in { submit: !0, reset: !0 }) {
      d.pseudos[b] = na(b);
    }function ra() {}ra.prototype = d.filters = d.pseudos, d.setFilters = new ra(), g = ga.tokenize = function (a, b) {
      var c,
          e,
          f,
          g,
          h,
          i,
          j,
          k = z[a + " "];if (k) return b ? 0 : k.slice(0);h = a, i = [], j = d.preFilter;while (h) {
        c && !(e = Q.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = R.exec(h)) && (c = e.shift(), f.push({ value: c, type: e[0].replace(P, " ") }), h = h.slice(c.length));for (g in d.filter) {
          !(e = V[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({ value: c, type: g, matches: e }), h = h.slice(c.length));
        }if (!c) break;
      }return b ? h.length : h ? ga.error(a) : z(a, i).slice(0);
    };function sa(a) {
      for (var b = 0, c = a.length, d = ""; b < c; b++) {
        d += a[b].value;
      }return d;
    }function ta(a, b, c) {
      var d = b.dir,
          e = b.next,
          f = e || d,
          g = c && "parentNode" === f,
          h = x++;return b.first ? function (b, c, e) {
        while (b = b[d]) {
          if (1 === b.nodeType || g) return a(b, c, e);
        }return !1;
      } : function (b, c, i) {
        var j,
            k,
            l,
            m = [w, h];if (i) {
          while (b = b[d]) {
            if ((1 === b.nodeType || g) && a(b, c, i)) return !0;
          }
        } else while (b = b[d]) {
          if (1 === b.nodeType || g) if (l = b[u] || (b[u] = {}), k = l[b.uniqueID] || (l[b.uniqueID] = {}), e && e === b.nodeName.toLowerCase()) b = b[d] || b;else {
            if ((j = k[f]) && j[0] === w && j[1] === h) return m[2] = j[2];if (k[f] = m, m[2] = a(b, c, i)) return !0;
          }
        }return !1;
      };
    }function ua(a) {
      return a.length > 1 ? function (b, c, d) {
        var e = a.length;while (e--) {
          if (!a[e](b, c, d)) return !1;
        }return !0;
      } : a[0];
    }function va(a, b, c) {
      for (var d = 0, e = b.length; d < e; d++) {
        ga(a, b[d], c);
      }return c;
    }function wa(a, b, c, d, e) {
      for (var f, g = [], h = 0, i = a.length, j = null != b; h < i; h++) {
        (f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
      }return g;
    }function xa(a, b, c, d, e, f) {
      return d && !d[u] && (d = xa(d)), e && !e[u] && (e = xa(e, f)), ia(function (f, g, h, i) {
        var j,
            k,
            l,
            m = [],
            n = [],
            o = g.length,
            p = f || va(b || "*", h.nodeType ? [h] : h, []),
            q = !a || !f && b ? p : wa(p, m, a, h, i),
            r = c ? e || (f ? a : o || d) ? [] : g : q;if (c && c(q, r, h, i), d) {
          j = wa(r, n), d(j, [], h, i), k = j.length;while (k--) {
            (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
          }
        }if (f) {
          if (e || a) {
            if (e) {
              j = [], k = r.length;while (k--) {
                (l = r[k]) && j.push(q[k] = l);
              }e(null, r = [], j, i);
            }k = r.length;while (k--) {
              (l = r[k]) && (j = e ? I(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l));
            }
          }
        } else r = wa(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : G.apply(g, r);
      });
    }function ya(a) {
      for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = ta(function (a) {
        return a === b;
      }, h, !0), l = ta(function (a) {
        return I(b, a) > -1;
      }, h, !0), m = [function (a, c, d) {
        var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));return b = null, e;
      }]; i < f; i++) {
        if (c = d.relative[a[i].type]) m = [ta(ua(m), c)];else {
          if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
            for (e = ++i; e < f; e++) {
              if (d.relative[a[e].type]) break;
            }return xa(i > 1 && ua(m), i > 1 && sa(a.slice(0, i - 1).concat({ value: " " === a[i - 2].type ? "*" : "" })).replace(P, "$1"), c, i < e && ya(a.slice(i, e)), e < f && ya(a = a.slice(e)), e < f && sa(a));
          }m.push(c);
        }
      }return ua(m);
    }function za(a, b) {
      var c = b.length > 0,
          e = a.length > 0,
          f = function f(_f, g, h, i, k) {
        var l,
            o,
            q,
            r = 0,
            s = "0",
            t = _f && [],
            u = [],
            v = j,
            x = _f || e && d.find.TAG("*", k),
            y = w += null == v ? 1 : Math.random() || .1,
            z = x.length;for (k && (j = g === n || g || k); s !== z && null != (l = x[s]); s++) {
          if (e && l) {
            o = 0, g || l.ownerDocument === n || (m(l), h = !p);while (q = a[o++]) {
              if (q(l, g || n, h)) {
                i.push(l);break;
              }
            }k && (w = y);
          }c && ((l = !q && l) && r--, _f && t.push(l));
        }if (r += s, c && s !== r) {
          o = 0;while (q = b[o++]) {
            q(t, u, g, h);
          }if (_f) {
            if (r > 0) while (s--) {
              t[s] || u[s] || (u[s] = E.call(i));
            }u = wa(u);
          }G.apply(i, u), k && !_f && u.length > 0 && r + b.length > 1 && ga.uniqueSort(i);
        }return k && (w = y, j = v), t;
      };return c ? ia(f) : f;
    }return h = ga.compile = function (a, b) {
      var c,
          d = [],
          e = [],
          f = A[a + " "];if (!f) {
        b || (b = g(a)), c = b.length;while (c--) {
          f = ya(b[c]), f[u] ? d.push(f) : e.push(f);
        }f = A(a, za(e, d)), f.selector = a;
      }return f;
    }, i = ga.select = function (a, b, c, e) {
      var f,
          i,
          j,
          k,
          l,
          m = "function" == typeof a && a,
          n = !e && g(a = m.selector || a);if (c = c || [], 1 === n.length) {
        if (i = n[0] = n[0].slice(0), i.length > 2 && "ID" === (j = i[0]).type && 9 === b.nodeType && p && d.relative[i[1].type]) {
          if (b = (d.find.ID(j.matches[0].replace(_, aa), b) || [])[0], !b) return c;m && (b = b.parentNode), a = a.slice(i.shift().value.length);
        }f = V.needsContext.test(a) ? 0 : i.length;while (f--) {
          if (j = i[f], d.relative[k = j.type]) break;if ((l = d.find[k]) && (e = l(j.matches[0].replace(_, aa), $.test(i[0].type) && qa(b.parentNode) || b))) {
            if (i.splice(f, 1), a = e.length && sa(i), !a) return G.apply(c, e), c;break;
          }
        }
      }return (m || h(a, n))(e, b, !p, c, !b || $.test(a) && qa(b.parentNode) || b), c;
    }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ja(function (a) {
      return 1 & a.compareDocumentPosition(n.createElement("fieldset"));
    }), ja(function (a) {
      return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href");
    }) || ka("type|href|height|width", function (a, b, c) {
      if (!c) return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
    }), c.attributes && ja(function (a) {
      return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value");
    }) || ka("value", function (a, b, c) {
      if (!c && "input" === a.nodeName.toLowerCase()) return a.defaultValue;
    }), ja(function (a) {
      return null == a.getAttribute("disabled");
    }) || ka(J, function (a, b, c) {
      var d;if (!c) return a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
    }), ga;
  }(a);r.find = x, r.expr = x.selectors, r.expr[":"] = r.expr.pseudos, r.uniqueSort = r.unique = x.uniqueSort, r.text = x.getText, r.isXMLDoc = x.isXML, r.contains = x.contains, r.escapeSelector = x.escape;var y = function y(a, b, c) {
    var d = [],
        e = void 0 !== c;while ((a = a[b]) && 9 !== a.nodeType) {
      if (1 === a.nodeType) {
        if (e && r(a).is(c)) break;d.push(a);
      }
    }return d;
  },
      z = function z(a, b) {
    for (var c = []; a; a = a.nextSibling) {
      1 === a.nodeType && a !== b && c.push(a);
    }return c;
  },
      A = r.expr.match.needsContext,
      B = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
      C = /^.[^:#\[\.,]*$/;function D(a, b, c) {
    return r.isFunction(b) ? r.grep(a, function (a, d) {
      return !!b.call(a, d, a) !== c;
    }) : b.nodeType ? r.grep(a, function (a) {
      return a === b !== c;
    }) : "string" != typeof b ? r.grep(a, function (a) {
      return i.call(b, a) > -1 !== c;
    }) : C.test(b) ? r.filter(b, a, c) : (b = r.filter(b, a), r.grep(a, function (a) {
      return i.call(b, a) > -1 !== c && 1 === a.nodeType;
    }));
  }r.filter = function (a, b, c) {
    var d = b[0];return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? r.find.matchesSelector(d, a) ? [d] : [] : r.find.matches(a, r.grep(b, function (a) {
      return 1 === a.nodeType;
    }));
  }, r.fn.extend({ find: function find(a) {
      var b,
          c,
          d = this.length,
          e = this;if ("string" != typeof a) return this.pushStack(r(a).filter(function () {
        for (b = 0; b < d; b++) {
          if (r.contains(e[b], this)) return !0;
        }
      }));for (c = this.pushStack([]), b = 0; b < d; b++) {
        r.find(a, e[b], c);
      }return d > 1 ? r.uniqueSort(c) : c;
    }, filter: function filter(a) {
      return this.pushStack(D(this, a || [], !1));
    }, not: function not(a) {
      return this.pushStack(D(this, a || [], !0));
    }, is: function is(a) {
      return !!D(this, "string" == typeof a && A.test(a) ? r(a) : a || [], !1).length;
    } });var E,
      F = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
      G = r.fn.init = function (a, b, c) {
    var e, f;if (!a) return this;if (c = c || E, "string" == typeof a) {
      if (e = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : F.exec(a), !e || !e[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);if (e[1]) {
        if (b = b instanceof r ? b[0] : b, r.merge(this, r.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : d, !0)), B.test(e[1]) && r.isPlainObject(b)) for (e in b) {
          r.isFunction(this[e]) ? this[e](b[e]) : this.attr(e, b[e]);
        }return this;
      }return f = d.getElementById(e[2]), f && (this[0] = f, this.length = 1), this;
    }return a.nodeType ? (this[0] = a, this.length = 1, this) : r.isFunction(a) ? void 0 !== c.ready ? c.ready(a) : a(r) : r.makeArray(a, this);
  };G.prototype = r.fn, E = r(d);var H = /^(?:parents|prev(?:Until|All))/,
      I = { children: !0, contents: !0, next: !0, prev: !0 };r.fn.extend({ has: function has(a) {
      var b = r(a, this),
          c = b.length;return this.filter(function () {
        for (var a = 0; a < c; a++) {
          if (r.contains(this, b[a])) return !0;
        }
      });
    }, closest: function closest(a, b) {
      var c,
          d = 0,
          e = this.length,
          f = [],
          g = "string" != typeof a && r(a);if (!A.test(a)) for (; d < e; d++) {
        for (c = this[d]; c && c !== b; c = c.parentNode) {
          if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && r.find.matchesSelector(c, a))) {
            f.push(c);break;
          }
        }
      }return this.pushStack(f.length > 1 ? r.uniqueSort(f) : f);
    }, index: function index(a) {
      return a ? "string" == typeof a ? i.call(r(a), this[0]) : i.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    }, add: function add(a, b) {
      return this.pushStack(r.uniqueSort(r.merge(this.get(), r(a, b))));
    }, addBack: function addBack(a) {
      return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
    } });function J(a, b) {
    while ((a = a[b]) && 1 !== a.nodeType) {}return a;
  }r.each({ parent: function parent(a) {
      var b = a.parentNode;return b && 11 !== b.nodeType ? b : null;
    }, parents: function parents(a) {
      return y(a, "parentNode");
    }, parentsUntil: function parentsUntil(a, b, c) {
      return y(a, "parentNode", c);
    }, next: function next(a) {
      return J(a, "nextSibling");
    }, prev: function prev(a) {
      return J(a, "previousSibling");
    }, nextAll: function nextAll(a) {
      return y(a, "nextSibling");
    }, prevAll: function prevAll(a) {
      return y(a, "previousSibling");
    }, nextUntil: function nextUntil(a, b, c) {
      return y(a, "nextSibling", c);
    }, prevUntil: function prevUntil(a, b, c) {
      return y(a, "previousSibling", c);
    }, siblings: function siblings(a) {
      return z((a.parentNode || {}).firstChild, a);
    }, children: function children(a) {
      return z(a.firstChild);
    }, contents: function contents(a) {
      return a.contentDocument || r.merge([], a.childNodes);
    } }, function (a, b) {
    r.fn[a] = function (c, d) {
      var e = r.map(this, b, c);return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = r.filter(d, e)), this.length > 1 && (I[a] || r.uniqueSort(e), H.test(a) && e.reverse()), this.pushStack(e);
    };
  });var K = /[^\x20\t\r\n\f]+/g;function L(a) {
    var b = {};return r.each(a.match(K) || [], function (a, c) {
      b[c] = !0;
    }), b;
  }r.Callbacks = function (a) {
    a = "string" == typeof a ? L(a) : r.extend({}, a);var b,
        c,
        d,
        e,
        f = [],
        g = [],
        h = -1,
        i = function i() {
      for (e = a.once, d = b = !0; g.length; h = -1) {
        c = g.shift();while (++h < f.length) {
          f[h].apply(c[0], c[1]) === !1 && a.stopOnFalse && (h = f.length, c = !1);
        }
      }a.memory || (c = !1), b = !1, e && (f = c ? [] : "");
    },
        j = { add: function add() {
        return f && (c && !b && (h = f.length - 1, g.push(c)), function d(b) {
          r.each(b, function (b, c) {
            r.isFunction(c) ? a.unique && j.has(c) || f.push(c) : c && c.length && "string" !== r.type(c) && d(c);
          });
        }(arguments), c && !b && i()), this;
      }, remove: function remove() {
        return r.each(arguments, function (a, b) {
          var c;while ((c = r.inArray(b, f, c)) > -1) {
            f.splice(c, 1), c <= h && h--;
          }
        }), this;
      }, has: function has(a) {
        return a ? r.inArray(a, f) > -1 : f.length > 0;
      }, empty: function empty() {
        return f && (f = []), this;
      }, disable: function disable() {
        return e = g = [], f = c = "", this;
      }, disabled: function disabled() {
        return !f;
      }, lock: function lock() {
        return e = g = [], c || b || (f = c = ""), this;
      }, locked: function locked() {
        return !!e;
      }, fireWith: function fireWith(a, c) {
        return e || (c = c || [], c = [a, c.slice ? c.slice() : c], g.push(c), b || i()), this;
      }, fire: function fire() {
        return j.fireWith(this, arguments), this;
      }, fired: function fired() {
        return !!d;
      } };return j;
  };function M(a) {
    return a;
  }function N(a) {
    throw a;
  }function O(a, b, c) {
    var d;try {
      a && r.isFunction(d = a.promise) ? d.call(a).done(b).fail(c) : a && r.isFunction(d = a.then) ? d.call(a, b, c) : b.call(void 0, a);
    } catch (a) {
      c.call(void 0, a);
    }
  }r.extend({ Deferred: function Deferred(b) {
      var c = [["notify", "progress", r.Callbacks("memory"), r.Callbacks("memory"), 2], ["resolve", "done", r.Callbacks("once memory"), r.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", r.Callbacks("once memory"), r.Callbacks("once memory"), 1, "rejected"]],
          d = "pending",
          e = { state: function state() {
          return d;
        }, always: function always() {
          return f.done(arguments).fail(arguments), this;
        }, "catch": function _catch(a) {
          return e.then(null, a);
        }, pipe: function pipe() {
          var a = arguments;return r.Deferred(function (b) {
            r.each(c, function (c, d) {
              var e = r.isFunction(a[d[4]]) && a[d[4]];f[d[1]](function () {
                var a = e && e.apply(this, arguments);a && r.isFunction(a.promise) ? a.promise().progress(b.notify).done(b.resolve).fail(b.reject) : b[d[0] + "With"](this, e ? [a] : arguments);
              });
            }), a = null;
          }).promise();
        }, then: function then(b, d, e) {
          var f = 0;function g(b, c, d, e) {
            return function () {
              var h = this,
                  i = arguments,
                  j = function j() {
                var a, j;if (!(b < f)) {
                  if (a = d.apply(h, i), a === c.promise()) throw new TypeError("Thenable self-resolution");j = a && ("object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) || "function" == typeof a) && a.then, r.isFunction(j) ? e ? j.call(a, g(f, c, M, e), g(f, c, N, e)) : (f++, j.call(a, g(f, c, M, e), g(f, c, N, e), g(f, c, M, c.notifyWith))) : (d !== M && (h = void 0, i = [a]), (e || c.resolveWith)(h, i));
                }
              },
                  k = e ? j : function () {
                try {
                  j();
                } catch (a) {
                  r.Deferred.exceptionHook && r.Deferred.exceptionHook(a, k.stackTrace), b + 1 >= f && (d !== N && (h = void 0, i = [a]), c.rejectWith(h, i));
                }
              };b ? k() : (r.Deferred.getStackHook && (k.stackTrace = r.Deferred.getStackHook()), a.setTimeout(k));
            };
          }return r.Deferred(function (a) {
            c[0][3].add(g(0, a, r.isFunction(e) ? e : M, a.notifyWith)), c[1][3].add(g(0, a, r.isFunction(b) ? b : M)), c[2][3].add(g(0, a, r.isFunction(d) ? d : N));
          }).promise();
        }, promise: function promise(a) {
          return null != a ? r.extend(a, e) : e;
        } },
          f = {};return r.each(c, function (a, b) {
        var g = b[2],
            h = b[5];e[b[1]] = g.add, h && g.add(function () {
          d = h;
        }, c[3 - a][2].disable, c[0][2].lock), g.add(b[3].fire), f[b[0]] = function () {
          return f[b[0] + "With"](this === f ? void 0 : this, arguments), this;
        }, f[b[0] + "With"] = g.fireWith;
      }), e.promise(f), b && b.call(f, f), f;
    }, when: function when(a) {
      var b = arguments.length,
          c = b,
          d = Array(c),
          e = f.call(arguments),
          g = r.Deferred(),
          h = function h(a) {
        return function (c) {
          d[a] = this, e[a] = arguments.length > 1 ? f.call(arguments) : c, --b || g.resolveWith(d, e);
        };
      };if (b <= 1 && (O(a, g.done(h(c)).resolve, g.reject), "pending" === g.state() || r.isFunction(e[c] && e[c].then))) return g.then();while (c--) {
        O(e[c], h(c), g.reject);
      }return g.promise();
    } });var P = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;r.Deferred.exceptionHook = function (b, c) {
    a.console && a.console.warn && b && P.test(b.name) && a.console.warn("jQuery.Deferred exception: " + b.message, b.stack, c);
  }, r.readyException = function (b) {
    a.setTimeout(function () {
      throw b;
    });
  };var Q = r.Deferred();r.fn.ready = function (a) {
    return Q.then(a)["catch"](function (a) {
      r.readyException(a);
    }), this;
  }, r.extend({ isReady: !1, readyWait: 1,
    holdReady: function holdReady(a) {
      a ? r.readyWait++ : r.ready(!0);
    }, ready: function ready(a) {
      (a === !0 ? --r.readyWait : r.isReady) || (r.isReady = !0, a !== !0 && --r.readyWait > 0 || Q.resolveWith(d, [r]));
    } }), r.ready.then = Q.then;function R() {
    d.removeEventListener("DOMContentLoaded", R), a.removeEventListener("load", R), r.ready();
  }"complete" === d.readyState || "loading" !== d.readyState && !d.documentElement.doScroll ? a.setTimeout(r.ready) : (d.addEventListener("DOMContentLoaded", R), a.addEventListener("load", R));var S = function S(a, b, c, d, e, f, g) {
    var h = 0,
        i = a.length,
        j = null == c;if ("object" === r.type(c)) {
      e = !0;for (h in c) {
        S(a, b, h, c[h], !0, f, g);
      }
    } else if (void 0 !== d && (e = !0, r.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function b(a, _b, c) {
      return j.call(r(a), c);
    })), b)) for (; h < i; h++) {
      b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
    }return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
  },
      T = function T(a) {
    return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType;
  };function U() {
    this.expando = r.expando + U.uid++;
  }U.uid = 1, U.prototype = { cache: function cache(a) {
      var b = a[this.expando];return b || (b = {}, T(a) && (a.nodeType ? a[this.expando] = b : Object.defineProperty(a, this.expando, { value: b, configurable: !0 }))), b;
    }, set: function set(a, b, c) {
      var d,
          e = this.cache(a);if ("string" == typeof b) e[r.camelCase(b)] = c;else for (d in b) {
        e[r.camelCase(d)] = b[d];
      }return e;
    }, get: function get(a, b) {
      return void 0 === b ? this.cache(a) : a[this.expando] && a[this.expando][r.camelCase(b)];
    }, access: function access(a, b, c) {
      return void 0 === b || b && "string" == typeof b && void 0 === c ? this.get(a, b) : (this.set(a, b, c), void 0 !== c ? c : b);
    }, remove: function remove(a, b) {
      var c,
          d = a[this.expando];if (void 0 !== d) {
        if (void 0 !== b) {
          r.isArray(b) ? b = b.map(r.camelCase) : (b = r.camelCase(b), b = b in d ? [b] : b.match(K) || []), c = b.length;while (c--) {
            delete d[b[c]];
          }
        }(void 0 === b || r.isEmptyObject(d)) && (a.nodeType ? a[this.expando] = void 0 : delete a[this.expando]);
      }
    }, hasData: function hasData(a) {
      var b = a[this.expando];return void 0 !== b && !r.isEmptyObject(b);
    } };var V = new U(),
      W = new U(),
      X = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      Y = /[A-Z]/g;function Z(a) {
    return "true" === a || "false" !== a && ("null" === a ? null : a === +a + "" ? +a : X.test(a) ? JSON.parse(a) : a);
  }function $(a, b, c) {
    var d;if (void 0 === c && 1 === a.nodeType) if (d = "data-" + b.replace(Y, "-$&").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
      try {
        c = Z(c);
      } catch (e) {}W.set(a, b, c);
    } else c = void 0;return c;
  }r.extend({ hasData: function hasData(a) {
      return W.hasData(a) || V.hasData(a);
    }, data: function data(a, b, c) {
      return W.access(a, b, c);
    }, removeData: function removeData(a, b) {
      W.remove(a, b);
    }, _data: function _data(a, b, c) {
      return V.access(a, b, c);
    }, _removeData: function _removeData(a, b) {
      V.remove(a, b);
    } }), r.fn.extend({ data: function data(a, b) {
      var c,
          d,
          e,
          f = this[0],
          g = f && f.attributes;if (void 0 === a) {
        if (this.length && (e = W.get(f), 1 === f.nodeType && !V.get(f, "hasDataAttrs"))) {
          c = g.length;while (c--) {
            g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = r.camelCase(d.slice(5)), $(f, d, e[d])));
          }V.set(f, "hasDataAttrs", !0);
        }return e;
      }return "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) ? this.each(function () {
        W.set(this, a);
      }) : S(this, function (b) {
        var c;if (f && void 0 === b) {
          if (c = W.get(f, a), void 0 !== c) return c;if (c = $(f, a), void 0 !== c) return c;
        } else this.each(function () {
          W.set(this, a, b);
        });
      }, null, b, arguments.length > 1, null, !0);
    }, removeData: function removeData(a) {
      return this.each(function () {
        W.remove(this, a);
      });
    } }), r.extend({ queue: function queue(a, b, c) {
      var d;if (a) return b = (b || "fx") + "queue", d = V.get(a, b), c && (!d || r.isArray(c) ? d = V.access(a, b, r.makeArray(c)) : d.push(c)), d || [];
    }, dequeue: function dequeue(a, b) {
      b = b || "fx";var c = r.queue(a, b),
          d = c.length,
          e = c.shift(),
          f = r._queueHooks(a, b),
          g = function g() {
        r.dequeue(a, b);
      };"inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
    }, _queueHooks: function _queueHooks(a, b) {
      var c = b + "queueHooks";return V.get(a, c) || V.access(a, c, { empty: r.Callbacks("once memory").add(function () {
          V.remove(a, [b + "queue", c]);
        }) });
    } }), r.fn.extend({ queue: function queue(a, b) {
      var c = 2;return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? r.queue(this[0], a) : void 0 === b ? this : this.each(function () {
        var c = r.queue(this, a, b);r._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && r.dequeue(this, a);
      });
    }, dequeue: function dequeue(a) {
      return this.each(function () {
        r.dequeue(this, a);
      });
    }, clearQueue: function clearQueue(a) {
      return this.queue(a || "fx", []);
    }, promise: function promise(a, b) {
      var c,
          d = 1,
          e = r.Deferred(),
          f = this,
          g = this.length,
          h = function h() {
        --d || e.resolveWith(f, [f]);
      };"string" != typeof a && (b = a, a = void 0), a = a || "fx";while (g--) {
        c = V.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
      }return h(), e.promise(b);
    } });var _ = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      aa = new RegExp("^(?:([+-])=|)(" + _ + ")([a-z%]*)$", "i"),
      ba = ["Top", "Right", "Bottom", "Left"],
      ca = function ca(a, b) {
    return a = b || a, "none" === a.style.display || "" === a.style.display && r.contains(a.ownerDocument, a) && "none" === r.css(a, "display");
  },
      da = function da(a, b, c, d) {
    var e,
        f,
        g = {};for (f in b) {
      g[f] = a.style[f], a.style[f] = b[f];
    }e = c.apply(a, d || []);for (f in b) {
      a.style[f] = g[f];
    }return e;
  };function ea(a, b, c, d) {
    var e,
        f = 1,
        g = 20,
        h = d ? function () {
      return d.cur();
    } : function () {
      return r.css(a, b, "");
    },
        i = h(),
        j = c && c[3] || (r.cssNumber[b] ? "" : "px"),
        k = (r.cssNumber[b] || "px" !== j && +i) && aa.exec(r.css(a, b));if (k && k[3] !== j) {
      j = j || k[3], c = c || [], k = +i || 1;do {
        f = f || ".5", k /= f, r.style(a, b, k + j);
      } while (f !== (f = h() / i) && 1 !== f && --g);
    }return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e;
  }var fa = {};function ga(a) {
    var b,
        c = a.ownerDocument,
        d = a.nodeName,
        e = fa[d];return e ? e : (b = c.body.appendChild(c.createElement(d)), e = r.css(b, "display"), b.parentNode.removeChild(b), "none" === e && (e = "block"), fa[d] = e, e);
  }function ha(a, b) {
    for (var c, d, e = [], f = 0, g = a.length; f < g; f++) {
      d = a[f], d.style && (c = d.style.display, b ? ("none" === c && (e[f] = V.get(d, "display") || null, e[f] || (d.style.display = "")), "" === d.style.display && ca(d) && (e[f] = ga(d))) : "none" !== c && (e[f] = "none", V.set(d, "display", c)));
    }for (f = 0; f < g; f++) {
      null != e[f] && (a[f].style.display = e[f]);
    }return a;
  }r.fn.extend({ show: function show() {
      return ha(this, !0);
    }, hide: function hide() {
      return ha(this);
    }, toggle: function toggle(a) {
      return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
        ca(this) ? r(this).show() : r(this).hide();
      });
    } });var ia = /^(?:checkbox|radio)$/i,
      ja = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
      ka = /^$|\/(?:java|ecma)script/i,
      la = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };la.optgroup = la.option, la.tbody = la.tfoot = la.colgroup = la.caption = la.thead, la.th = la.td;function ma(a, b) {
    var c;return c = "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : [], void 0 === b || b && r.nodeName(a, b) ? r.merge([a], c) : c;
  }function na(a, b) {
    for (var c = 0, d = a.length; c < d; c++) {
      V.set(a[c], "globalEval", !b || V.get(b[c], "globalEval"));
    }
  }var oa = /<|&#?\w+;/;function pa(a, b, c, d, e) {
    for (var f, g, h, i, j, k, l = b.createDocumentFragment(), m = [], n = 0, o = a.length; n < o; n++) {
      if (f = a[n], f || 0 === f) if ("object" === r.type(f)) r.merge(m, f.nodeType ? [f] : f);else if (oa.test(f)) {
        g = g || l.appendChild(b.createElement("div")), h = (ja.exec(f) || ["", ""])[1].toLowerCase(), i = la[h] || la._default, g.innerHTML = i[1] + r.htmlPrefilter(f) + i[2], k = i[0];while (k--) {
          g = g.lastChild;
        }r.merge(m, g.childNodes), g = l.firstChild, g.textContent = "";
      } else m.push(b.createTextNode(f));
    }l.textContent = "", n = 0;while (f = m[n++]) {
      if (d && r.inArray(f, d) > -1) e && e.push(f);else if (j = r.contains(f.ownerDocument, f), g = ma(l.appendChild(f), "script"), j && na(g), c) {
        k = 0;while (f = g[k++]) {
          ka.test(f.type || "") && c.push(f);
        }
      }
    }return l;
  }!function () {
    var a = d.createDocumentFragment(),
        b = a.appendChild(d.createElement("div")),
        c = d.createElement("input");c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), o.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", o.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue;
  }();var qa = d.documentElement,
      ra = /^key/,
      sa = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      ta = /^([^.]*)(?:\.(.+)|)/;function ua() {
    return !0;
  }function va() {
    return !1;
  }function wa() {
    try {
      return d.activeElement;
    } catch (a) {}
  }function xa(a, b, c, d, e, f) {
    var g, h;if ("object" == (typeof b === "undefined" ? "undefined" : _typeof(b))) {
      "string" != typeof c && (d = d || c, c = void 0);for (h in b) {
        xa(a, h, c, d, b[h], f);
      }return a;
    }if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), e === !1) e = va;else if (!e) return a;return 1 === f && (g = e, e = function e(a) {
      return r().off(a), g.apply(this, arguments);
    }, e.guid = g.guid || (g.guid = r.guid++)), a.each(function () {
      r.event.add(this, b, e, d, c);
    });
  }r.event = { global: {}, add: function add(a, b, c, d, e) {
      var f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p,
          q = V.get(a);if (q) {
        c.handler && (f = c, c = f.handler, e = f.selector), e && r.find.matchesSelector(qa, e), c.guid || (c.guid = r.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function (b) {
          return "undefined" != typeof r && r.event.triggered !== b.type ? r.event.dispatch.apply(a, arguments) : void 0;
        }), b = (b || "").match(K) || [""], j = b.length;while (j--) {
          h = ta.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = r.event.special[n] || {}, n = (e ? l.delegateType : l.bindType) || n, l = r.event.special[n] || {}, k = r.extend({ type: n, origType: p, data: d, handler: c, guid: c.guid, selector: e, needsContext: e && r.expr.match.needsContext.test(e), namespace: o.join(".") }, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, o, g) !== !1 || a.addEventListener && a.addEventListener(n, g)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), r.event.global[n] = !0);
        }
      }
    }, remove: function remove(a, b, c, d, e) {
      var f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p,
          q = V.hasData(a) && V.get(a);if (q && (i = q.events)) {
        b = (b || "").match(K) || [""], j = b.length;while (j--) {
          if (h = ta.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
            l = r.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length;while (f--) {
              k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
            }g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || r.removeEvent(a, n, q.handle), delete i[n]);
          } else for (n in i) {
            r.event.remove(a, n + b[j], c, d, !0);
          }
        }r.isEmptyObject(i) && V.remove(a, "handle events");
      }
    }, dispatch: function dispatch(a) {
      var b = r.event.fix(a),
          c,
          d,
          e,
          f,
          g,
          h,
          i = new Array(arguments.length),
          j = (V.get(this, "events") || {})[b.type] || [],
          k = r.event.special[b.type] || {};for (i[0] = b, c = 1; c < arguments.length; c++) {
        i[c] = arguments[c];
      }if (b.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, b) !== !1) {
        h = r.event.handlers.call(this, b, j), c = 0;while ((f = h[c++]) && !b.isPropagationStopped()) {
          b.currentTarget = f.elem, d = 0;while ((g = f.handlers[d++]) && !b.isImmediatePropagationStopped()) {
            b.rnamespace && !b.rnamespace.test(g.namespace) || (b.handleObj = g, b.data = g.data, e = ((r.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== e && (b.result = e) === !1 && (b.preventDefault(), b.stopPropagation()));
          }
        }return k.postDispatch && k.postDispatch.call(this, b), b.result;
      }
    }, handlers: function handlers(a, b) {
      var c,
          d,
          e,
          f,
          g,
          h = [],
          i = b.delegateCount,
          j = a.target;if (i && j.nodeType && !("click" === a.type && a.button >= 1)) for (; j !== this; j = j.parentNode || this) {
        if (1 === j.nodeType && ("click" !== a.type || j.disabled !== !0)) {
          for (f = [], g = {}, c = 0; c < i; c++) {
            d = b[c], e = d.selector + " ", void 0 === g[e] && (g[e] = d.needsContext ? r(e, this).index(j) > -1 : r.find(e, this, null, [j]).length), g[e] && f.push(d);
          }f.length && h.push({ elem: j, handlers: f });
        }
      }return j = this, i < b.length && h.push({ elem: j, handlers: b.slice(i) }), h;
    }, addProp: function addProp(a, b) {
      Object.defineProperty(r.Event.prototype, a, { enumerable: !0, configurable: !0, get: r.isFunction(b) ? function () {
          if (this.originalEvent) return b(this.originalEvent);
        } : function () {
          if (this.originalEvent) return this.originalEvent[a];
        }, set: function set(b) {
          Object.defineProperty(this, a, { enumerable: !0, configurable: !0, writable: !0, value: b });
        } });
    }, fix: function fix(a) {
      return a[r.expando] ? a : new r.Event(a);
    }, special: { load: { noBubble: !0 }, focus: { trigger: function trigger() {
          if (this !== wa() && this.focus) return this.focus(), !1;
        }, delegateType: "focusin" }, blur: { trigger: function trigger() {
          if (this === wa() && this.blur) return this.blur(), !1;
        }, delegateType: "focusout" }, click: { trigger: function trigger() {
          if ("checkbox" === this.type && this.click && r.nodeName(this, "input")) return this.click(), !1;
        }, _default: function _default(a) {
          return r.nodeName(a.target, "a");
        } }, beforeunload: { postDispatch: function postDispatch(a) {
          void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result);
        } } } }, r.removeEvent = function (a, b, c) {
    a.removeEventListener && a.removeEventListener(b, c);
  }, r.Event = function (a, b) {
    return this instanceof r.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? ua : va, this.target = a.target && 3 === a.target.nodeType ? a.target.parentNode : a.target, this.currentTarget = a.currentTarget, this.relatedTarget = a.relatedTarget) : this.type = a, b && r.extend(this, b), this.timeStamp = a && a.timeStamp || r.now(), void (this[r.expando] = !0)) : new r.Event(a, b);
  }, r.Event.prototype = { constructor: r.Event, isDefaultPrevented: va, isPropagationStopped: va, isImmediatePropagationStopped: va, isSimulated: !1, preventDefault: function preventDefault() {
      var a = this.originalEvent;this.isDefaultPrevented = ua, a && !this.isSimulated && a.preventDefault();
    }, stopPropagation: function stopPropagation() {
      var a = this.originalEvent;this.isPropagationStopped = ua, a && !this.isSimulated && a.stopPropagation();
    }, stopImmediatePropagation: function stopImmediatePropagation() {
      var a = this.originalEvent;this.isImmediatePropagationStopped = ua, a && !this.isSimulated && a.stopImmediatePropagation(), this.stopPropagation();
    } }, r.each({ altKey: !0, bubbles: !0, cancelable: !0, changedTouches: !0, ctrlKey: !0, detail: !0, eventPhase: !0, metaKey: !0, pageX: !0, pageY: !0, shiftKey: !0, view: !0, "char": !0, charCode: !0, key: !0, keyCode: !0, button: !0, buttons: !0, clientX: !0, clientY: !0, offsetX: !0, offsetY: !0, pointerId: !0, pointerType: !0, screenX: !0, screenY: !0, targetTouches: !0, toElement: !0, touches: !0, which: function which(a) {
      var b = a.button;return null == a.which && ra.test(a.type) ? null != a.charCode ? a.charCode : a.keyCode : !a.which && void 0 !== b && sa.test(a.type) ? 1 & b ? 1 : 2 & b ? 3 : 4 & b ? 2 : 0 : a.which;
    } }, r.event.addProp), r.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (a, b) {
    r.event.special[a] = { delegateType: b, bindType: b, handle: function handle(a) {
        var c,
            d = this,
            e = a.relatedTarget,
            f = a.handleObj;return e && (e === d || r.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c;
      } };
  }), r.fn.extend({ on: function on(a, b, c, d) {
      return xa(this, a, b, c, d);
    }, one: function one(a, b, c, d) {
      return xa(this, a, b, c, d, 1);
    }, off: function off(a, b, c) {
      var d, e;if (a && a.preventDefault && a.handleObj) return d = a.handleObj, r(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;if ("object" == (typeof a === "undefined" ? "undefined" : _typeof(a))) {
        for (e in a) {
          this.off(e, b, a[e]);
        }return this;
      }return b !== !1 && "function" != typeof b || (c = b, b = void 0), c === !1 && (c = va), this.each(function () {
        r.event.remove(this, a, c, b);
      });
    } });var ya = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
      za = /<script|<style|<link/i,
      Aa = /checked\s*(?:[^=]|=\s*.checked.)/i,
      Ba = /^true\/(.*)/,
      Ca = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Da(a, b) {
    return r.nodeName(a, "table") && r.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a : a;
  }function Ea(a) {
    return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a;
  }function Fa(a) {
    var b = Ba.exec(a.type);return b ? a.type = b[1] : a.removeAttribute("type"), a;
  }function Ga(a, b) {
    var c, d, e, f, g, h, i, j;if (1 === b.nodeType) {
      if (V.hasData(a) && (f = V.access(a), g = V.set(b, f), j = f.events)) {
        delete g.handle, g.events = {};for (e in j) {
          for (c = 0, d = j[e].length; c < d; c++) {
            r.event.add(b, e, j[e][c]);
          }
        }
      }W.hasData(a) && (h = W.access(a), i = r.extend({}, h), W.set(b, i));
    }
  }function Ha(a, b) {
    var c = b.nodeName.toLowerCase();"input" === c && ia.test(a.type) ? b.checked = a.checked : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue);
  }function Ia(a, b, c, d) {
    b = g.apply([], b);var e,
        f,
        h,
        i,
        j,
        k,
        l = 0,
        m = a.length,
        n = m - 1,
        q = b[0],
        s = r.isFunction(q);if (s || m > 1 && "string" == typeof q && !o.checkClone && Aa.test(q)) return a.each(function (e) {
      var f = a.eq(e);s && (b[0] = q.call(this, e, f.html())), Ia(f, b, c, d);
    });if (m && (e = pa(b, a[0].ownerDocument, !1, a, d), f = e.firstChild, 1 === e.childNodes.length && (e = f), f || d)) {
      for (h = r.map(ma(e, "script"), Ea), i = h.length; l < m; l++) {
        j = e, l !== n && (j = r.clone(j, !0, !0), i && r.merge(h, ma(j, "script"))), c.call(a[l], j, l);
      }if (i) for (k = h[h.length - 1].ownerDocument, r.map(h, Fa), l = 0; l < i; l++) {
        j = h[l], ka.test(j.type || "") && !V.access(j, "globalEval") && r.contains(k, j) && (j.src ? r._evalUrl && r._evalUrl(j.src) : p(j.textContent.replace(Ca, ""), k));
      }
    }return a;
  }function Ja(a, b, c) {
    for (var d, e = b ? r.filter(b, a) : a, f = 0; null != (d = e[f]); f++) {
      c || 1 !== d.nodeType || r.cleanData(ma(d)), d.parentNode && (c && r.contains(d.ownerDocument, d) && na(ma(d, "script")), d.parentNode.removeChild(d));
    }return a;
  }r.extend({ htmlPrefilter: function htmlPrefilter(a) {
      return a.replace(ya, "<$1></$2>");
    }, clone: function clone(a, b, c) {
      var d,
          e,
          f,
          g,
          h = a.cloneNode(!0),
          i = r.contains(a.ownerDocument, a);if (!(o.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || r.isXMLDoc(a))) for (g = ma(h), f = ma(a), d = 0, e = f.length; d < e; d++) {
        Ha(f[d], g[d]);
      }if (b) if (c) for (f = f || ma(a), g = g || ma(h), d = 0, e = f.length; d < e; d++) {
        Ga(f[d], g[d]);
      } else Ga(a, h);return g = ma(h, "script"), g.length > 0 && na(g, !i && ma(a, "script")), h;
    }, cleanData: function cleanData(a) {
      for (var b, c, d, e = r.event.special, f = 0; void 0 !== (c = a[f]); f++) {
        if (T(c)) {
          if (b = c[V.expando]) {
            if (b.events) for (d in b.events) {
              e[d] ? r.event.remove(c, d) : r.removeEvent(c, d, b.handle);
            }c[V.expando] = void 0;
          }c[W.expando] && (c[W.expando] = void 0);
        }
      }
    } }), r.fn.extend({ detach: function detach(a) {
      return Ja(this, a, !0);
    }, remove: function remove(a) {
      return Ja(this, a);
    }, text: function text(a) {
      return S(this, function (a) {
        return void 0 === a ? r.text(this) : this.empty().each(function () {
          1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = a);
        });
      }, null, a, arguments.length);
    }, append: function append() {
      return Ia(this, arguments, function (a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = Da(this, a);b.appendChild(a);
        }
      });
    }, prepend: function prepend() {
      return Ia(this, arguments, function (a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = Da(this, a);b.insertBefore(a, b.firstChild);
        }
      });
    }, before: function before() {
      return Ia(this, arguments, function (a) {
        this.parentNode && this.parentNode.insertBefore(a, this);
      });
    }, after: function after() {
      return Ia(this, arguments, function (a) {
        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
      });
    }, empty: function empty() {
      for (var a, b = 0; null != (a = this[b]); b++) {
        1 === a.nodeType && (r.cleanData(ma(a, !1)), a.textContent = "");
      }return this;
    }, clone: function clone(a, b) {
      return a = null != a && a, b = null == b ? a : b, this.map(function () {
        return r.clone(this, a, b);
      });
    }, html: function html(a) {
      return S(this, function (a) {
        var b = this[0] || {},
            c = 0,
            d = this.length;if (void 0 === a && 1 === b.nodeType) return b.innerHTML;if ("string" == typeof a && !za.test(a) && !la[(ja.exec(a) || ["", ""])[1].toLowerCase()]) {
          a = r.htmlPrefilter(a);try {
            for (; c < d; c++) {
              b = this[c] || {}, 1 === b.nodeType && (r.cleanData(ma(b, !1)), b.innerHTML = a);
            }b = 0;
          } catch (e) {}
        }b && this.empty().append(a);
      }, null, a, arguments.length);
    }, replaceWith: function replaceWith() {
      var a = [];return Ia(this, arguments, function (b) {
        var c = this.parentNode;r.inArray(this, a) < 0 && (r.cleanData(ma(this)), c && c.replaceChild(b, this));
      }, a);
    } }), r.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (a, b) {
    r.fn[a] = function (a) {
      for (var c, d = [], e = r(a), f = e.length - 1, g = 0; g <= f; g++) {
        c = g === f ? this : this.clone(!0), r(e[g])[b](c), h.apply(d, c.get());
      }return this.pushStack(d);
    };
  });var Ka = /^margin/,
      La = new RegExp("^(" + _ + ")(?!px)[a-z%]+$", "i"),
      Ma = function Ma(b) {
    var c = b.ownerDocument.defaultView;return c && c.opener || (c = a), c.getComputedStyle(b);
  };!function () {
    function b() {
      if (i) {
        i.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", i.innerHTML = "", qa.appendChild(h);var b = a.getComputedStyle(i);c = "1%" !== b.top, g = "2px" === b.marginLeft, e = "4px" === b.width, i.style.marginRight = "50%", f = "4px" === b.marginRight, qa.removeChild(h), i = null;
      }
    }var c,
        e,
        f,
        g,
        h = d.createElement("div"),
        i = d.createElement("div");i.style && (i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", o.clearCloneStyle = "content-box" === i.style.backgroundClip, h.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", h.appendChild(i), r.extend(o, { pixelPosition: function pixelPosition() {
        return b(), c;
      }, boxSizingReliable: function boxSizingReliable() {
        return b(), e;
      }, pixelMarginRight: function pixelMarginRight() {
        return b(), f;
      }, reliableMarginLeft: function reliableMarginLeft() {
        return b(), g;
      } }));
  }();function Na(a, b, c) {
    var d,
        e,
        f,
        g,
        h = a.style;return c = c || Ma(a), c && (g = c.getPropertyValue(b) || c[b], "" !== g || r.contains(a.ownerDocument, a) || (g = r.style(a, b)), !o.pixelMarginRight() && La.test(g) && Ka.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g;
  }function Oa(a, b) {
    return { get: function get() {
        return a() ? void delete this.get : (this.get = b).apply(this, arguments);
      } };
  }var Pa = /^(none|table(?!-c[ea]).+)/,
      Qa = { position: "absolute", visibility: "hidden", display: "block" },
      Ra = { letterSpacing: "0", fontWeight: "400" },
      Sa = ["Webkit", "Moz", "ms"],
      Ta = d.createElement("div").style;function Ua(a) {
    if (a in Ta) return a;var b = a[0].toUpperCase() + a.slice(1),
        c = Sa.length;while (c--) {
      if (a = Sa[c] + b, a in Ta) return a;
    }
  }function Va(a, b, c) {
    var d = aa.exec(b);return d ? Math.max(0, d[2] - (c || 0)) + (d[3] || "px") : b;
  }function Wa(a, b, c, d, e) {
    var f,
        g = 0;for (f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0; f < 4; f += 2) {
      "margin" === c && (g += r.css(a, c + ba[f], !0, e)), d ? ("content" === c && (g -= r.css(a, "padding" + ba[f], !0, e)), "margin" !== c && (g -= r.css(a, "border" + ba[f] + "Width", !0, e))) : (g += r.css(a, "padding" + ba[f], !0, e), "padding" !== c && (g += r.css(a, "border" + ba[f] + "Width", !0, e)));
    }return g;
  }function Xa(a, b, c) {
    var d,
        e = !0,
        f = Ma(a),
        g = "border-box" === r.css(a, "boxSizing", !1, f);if (a.getClientRects().length && (d = a.getBoundingClientRect()[b]), d <= 0 || null == d) {
      if (d = Na(a, b, f), (d < 0 || null == d) && (d = a.style[b]), La.test(d)) return d;e = g && (o.boxSizingReliable() || d === a.style[b]), d = parseFloat(d) || 0;
    }return d + Wa(a, b, c || (g ? "border" : "content"), e, f) + "px";
  }r.extend({ cssHooks: { opacity: { get: function get(a, b) {
          if (b) {
            var c = Na(a, "opacity");return "" === c ? "1" : c;
          }
        } } }, cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": "cssFloat" }, style: function style(a, b, c, d) {
      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
        var e,
            f,
            g,
            h = r.camelCase(b),
            i = a.style;return b = r.cssProps[h] || (r.cssProps[h] = Ua(h) || h), g = r.cssHooks[b] || r.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c === "undefined" ? "undefined" : _typeof(c), "string" === f && (e = aa.exec(c)) && e[1] && (c = ea(a, b, e), f = "number"), null != c && c === c && ("number" === f && (c += e && e[3] || (r.cssNumber[h] ? "" : "px")), o.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c)), void 0);
      }
    }, css: function css(a, b, c, d) {
      var e,
          f,
          g,
          h = r.camelCase(b);return b = r.cssProps[h] || (r.cssProps[h] = Ua(h) || h), g = r.cssHooks[b] || r.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = Na(a, b, d)), "normal" === e && b in Ra && (e = Ra[b]), "" === c || c ? (f = parseFloat(e), c === !0 || isFinite(f) ? f || 0 : e) : e;
    } }), r.each(["height", "width"], function (a, b) {
    r.cssHooks[b] = { get: function get(a, c, d) {
        if (c) return !Pa.test(r.css(a, "display")) || a.getClientRects().length && a.getBoundingClientRect().width ? Xa(a, b, d) : da(a, Qa, function () {
          return Xa(a, b, d);
        });
      }, set: function set(a, c, d) {
        var e,
            f = d && Ma(a),
            g = d && Wa(a, b, d, "border-box" === r.css(a, "boxSizing", !1, f), f);return g && (e = aa.exec(c)) && "px" !== (e[3] || "px") && (a.style[b] = c, c = r.css(a, b)), Va(a, c, g);
      } };
  }), r.cssHooks.marginLeft = Oa(o.reliableMarginLeft, function (a, b) {
    if (b) return (parseFloat(Na(a, "marginLeft")) || a.getBoundingClientRect().left - da(a, { marginLeft: 0 }, function () {
      return a.getBoundingClientRect().left;
    })) + "px";
  }), r.each({ margin: "", padding: "", border: "Width" }, function (a, b) {
    r.cssHooks[a + b] = { expand: function expand(c) {
        for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; d < 4; d++) {
          e[a + ba[d] + b] = f[d] || f[d - 2] || f[0];
        }return e;
      } }, Ka.test(a) || (r.cssHooks[a + b].set = Va);
  }), r.fn.extend({ css: function css(a, b) {
      return S(this, function (a, b, c) {
        var d,
            e,
            f = {},
            g = 0;if (r.isArray(b)) {
          for (d = Ma(a), e = b.length; g < e; g++) {
            f[b[g]] = r.css(a, b[g], !1, d);
          }return f;
        }return void 0 !== c ? r.style(a, b, c) : r.css(a, b);
      }, a, b, arguments.length > 1);
    } }), r.fn.delay = function (b, c) {
    return b = r.fx ? r.fx.speeds[b] || b : b, c = c || "fx", this.queue(c, function (c, d) {
      var e = a.setTimeout(c, b);d.stop = function () {
        a.clearTimeout(e);
      };
    });
  }, function () {
    var a = d.createElement("input"),
        b = d.createElement("select"),
        c = b.appendChild(d.createElement("option"));a.type = "checkbox", o.checkOn = "" !== a.value, o.optSelected = c.selected, a = d.createElement("input"), a.value = "t", a.type = "radio", o.radioValue = "t" === a.value;
  }();var Ya,
      Za = r.expr.attrHandle;r.fn.extend({ attr: function attr(a, b) {
      return S(this, r.attr, a, b, arguments.length > 1);
    }, removeAttr: function removeAttr(a) {
      return this.each(function () {
        r.removeAttr(this, a);
      });
    } }), r.extend({ attr: function attr(a, b, c) {
      var d,
          e,
          f = a.nodeType;if (3 !== f && 8 !== f && 2 !== f) return "undefined" == typeof a.getAttribute ? r.prop(a, b, c) : (1 === f && r.isXMLDoc(a) || (e = r.attrHooks[b.toLowerCase()] || (r.expr.match.bool.test(b) ? Ya : void 0)), void 0 !== c ? null === c ? void r.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = r.find.attr(a, b), null == d ? void 0 : d));
    }, attrHooks: { type: { set: function set(a, b) {
          if (!o.radioValue && "radio" === b && r.nodeName(a, "input")) {
            var c = a.value;return a.setAttribute("type", b), c && (a.value = c), b;
          }
        } } }, removeAttr: function removeAttr(a, b) {
      var c,
          d = 0,
          e = b && b.match(K);if (e && 1 === a.nodeType) while (c = e[d++]) {
        a.removeAttribute(c);
      }
    } }), Ya = { set: function set(a, b, c) {
      return b === !1 ? r.removeAttr(a, c) : a.setAttribute(c, c), c;
    } }, r.each(r.expr.match.bool.source.match(/\w+/g), function (a, b) {
    var c = Za[b] || r.find.attr;Za[b] = function (a, b, d) {
      var e,
          f,
          g = b.toLowerCase();return d || (f = Za[g], Za[g] = e, e = null != c(a, b, d) ? g : null, Za[g] = f), e;
    };
  });var $a = /^(?:input|select|textarea|button)$/i,
      _a = /^(?:a|area)$/i;r.fn.extend({ prop: function prop(a, b) {
      return S(this, r.prop, a, b, arguments.length > 1);
    }, removeProp: function removeProp(a) {
      return this.each(function () {
        delete this[r.propFix[a] || a];
      });
    } }), r.extend({ prop: function prop(a, b, c) {
      var d,
          e,
          f = a.nodeType;if (3 !== f && 8 !== f && 2 !== f) return 1 === f && r.isXMLDoc(a) || (b = r.propFix[b] || b, e = r.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b];
    }, propHooks: { tabIndex: { get: function get(a) {
          var b = r.find.attr(a, "tabindex");return b ? parseInt(b, 10) : $a.test(a.nodeName) || _a.test(a.nodeName) && a.href ? 0 : -1;
        } } }, propFix: { "for": "htmlFor", "class": "className" } }), o.optSelected || (r.propHooks.selected = { get: function get(a) {
      var b = a.parentNode;return b && b.parentNode && b.parentNode.selectedIndex, null;
    }, set: function set(a) {
      var b = a.parentNode;b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
    } }), r.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    r.propFix[this.toLowerCase()] = this;
  });function ab(a) {
    var b = a.match(K) || [];return b.join(" ");
  }function bb(a) {
    return a.getAttribute && a.getAttribute("class") || "";
  }r.fn.extend({ addClass: function addClass(a) {
      var b,
          c,
          d,
          e,
          f,
          g,
          h,
          i = 0;if (r.isFunction(a)) return this.each(function (b) {
        r(this).addClass(a.call(this, b, bb(this)));
      });if ("string" == typeof a && a) {
        b = a.match(K) || [];while (c = this[i++]) {
          if (e = bb(c), d = 1 === c.nodeType && " " + ab(e) + " ") {
            g = 0;while (f = b[g++]) {
              d.indexOf(" " + f + " ") < 0 && (d += f + " ");
            }h = ab(d), e !== h && c.setAttribute("class", h);
          }
        }
      }return this;
    }, removeClass: function removeClass(a) {
      var b,
          c,
          d,
          e,
          f,
          g,
          h,
          i = 0;if (r.isFunction(a)) return this.each(function (b) {
        r(this).removeClass(a.call(this, b, bb(this)));
      });if (!arguments.length) return this.attr("class", "");if ("string" == typeof a && a) {
        b = a.match(K) || [];while (c = this[i++]) {
          if (e = bb(c), d = 1 === c.nodeType && " " + ab(e) + " ") {
            g = 0;while (f = b[g++]) {
              while (d.indexOf(" " + f + " ") > -1) {
                d = d.replace(" " + f + " ", " ");
              }
            }h = ab(d), e !== h && c.setAttribute("class", h);
          }
        }
      }return this;
    }, toggleClass: function toggleClass(a, b) {
      var c = typeof a === "undefined" ? "undefined" : _typeof(a);return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : r.isFunction(a) ? this.each(function (c) {
        r(this).toggleClass(a.call(this, c, bb(this), b), b);
      }) : this.each(function () {
        var b, d, e, f;if ("string" === c) {
          d = 0, e = r(this), f = a.match(K) || [];while (b = f[d++]) {
            e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
          }
        } else void 0 !== a && "boolean" !== c || (b = bb(this), b && V.set(this, "__className__", b), this.setAttribute && this.setAttribute("class", b || a === !1 ? "" : V.get(this, "__className__") || ""));
      });
    }, hasClass: function hasClass(a) {
      var b,
          c,
          d = 0;b = " " + a + " ";while (c = this[d++]) {
        if (1 === c.nodeType && (" " + ab(bb(c)) + " ").indexOf(b) > -1) return !0;
      }return !1;
    } });var cb = /\r/g;r.fn.extend({ val: function val(a) {
      var b,
          c,
          d,
          e = this[0];{
        if (arguments.length) return d = r.isFunction(a), this.each(function (c) {
          var e;1 === this.nodeType && (e = d ? a.call(this, c, r(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : r.isArray(e) && (e = r.map(e, function (a) {
            return null == a ? "" : a + "";
          })), b = r.valHooks[this.type] || r.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e));
        });if (e) return b = r.valHooks[e.type] || r.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(cb, "") : null == c ? "" : c);
      }
    } }), r.extend({ valHooks: { option: { get: function get(a) {
          var b = r.find.attr(a, "value");return null != b ? b : ab(r.text(a));
        } }, select: { get: function get(a) {
          var b,
              c,
              d,
              e = a.options,
              f = a.selectedIndex,
              g = "select-one" === a.type,
              h = g ? null : [],
              i = g ? f + 1 : e.length;for (d = f < 0 ? i : g ? f : 0; d < i; d++) {
            if (c = e[d], (c.selected || d === f) && !c.disabled && (!c.parentNode.disabled || !r.nodeName(c.parentNode, "optgroup"))) {
              if (b = r(c).val(), g) return b;h.push(b);
            }
          }return h;
        }, set: function set(a, b) {
          var c,
              d,
              e = a.options,
              f = r.makeArray(b),
              g = e.length;while (g--) {
            d = e[g], (d.selected = r.inArray(r.valHooks.option.get(d), f) > -1) && (c = !0);
          }return c || (a.selectedIndex = -1), f;
        } } } }), r.each(["radio", "checkbox"], function () {
    r.valHooks[this] = { set: function set(a, b) {
        if (r.isArray(b)) return a.checked = r.inArray(r(a).val(), b) > -1;
      } }, o.checkOn || (r.valHooks[this].get = function (a) {
      return null === a.getAttribute("value") ? "on" : a.value;
    });
  });var db = /^(?:focusinfocus|focusoutblur)$/;r.extend(r.event, { trigger: function trigger(b, c, e, f) {
      var g,
          h,
          i,
          j,
          k,
          m,
          n,
          o = [e || d],
          p = l.call(b, "type") ? b.type : b,
          q = l.call(b, "namespace") ? b.namespace.split(".") : [];if (h = i = e = e || d, 3 !== e.nodeType && 8 !== e.nodeType && !db.test(p + r.event.triggered) && (p.indexOf(".") > -1 && (q = p.split("."), p = q.shift(), q.sort()), k = p.indexOf(":") < 0 && "on" + p, b = b[r.expando] ? b : new r.Event(p, "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b), b.isTrigger = f ? 2 : 3, b.namespace = q.join("."), b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = e), c = null == c ? [b] : r.makeArray(c, [b]), n = r.event.special[p] || {}, f || !n.trigger || n.trigger.apply(e, c) !== !1)) {
        if (!f && !n.noBubble && !r.isWindow(e)) {
          for (j = n.delegateType || p, db.test(j + p) || (h = h.parentNode); h; h = h.parentNode) {
            o.push(h), i = h;
          }i === (e.ownerDocument || d) && o.push(i.defaultView || i.parentWindow || a);
        }g = 0;while ((h = o[g++]) && !b.isPropagationStopped()) {
          b.type = g > 1 ? j : n.bindType || p, m = (V.get(h, "events") || {})[b.type] && V.get(h, "handle"), m && m.apply(h, c), m = k && h[k], m && m.apply && T(h) && (b.result = m.apply(h, c), b.result === !1 && b.preventDefault());
        }return b.type = p, f || b.isDefaultPrevented() || n._default && n._default.apply(o.pop(), c) !== !1 || !T(e) || k && r.isFunction(e[p]) && !r.isWindow(e) && (i = e[k], i && (e[k] = null), r.event.triggered = p, e[p](), r.event.triggered = void 0, i && (e[k] = i)), b.result;
      }
    }, simulate: function simulate(a, b, c) {
      var d = r.extend(new r.Event(), c, { type: a, isSimulated: !0 });r.event.trigger(d, null, b);
    } }), r.fn.extend({ trigger: function trigger(a, b) {
      return this.each(function () {
        r.event.trigger(a, b, this);
      });
    }, triggerHandler: function triggerHandler(a, b) {
      var c = this[0];if (c) return r.event.trigger(a, b, c, !0);
    } }), r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (a, b) {
    r.fn[b] = function (a, c) {
      return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
    };
  }), r.fn.extend({ hover: function hover(a, b) {
      return this.mouseenter(a).mouseleave(b || a);
    } }), o.focusin = "onfocusin" in a, o.focusin || r.each({ focus: "focusin", blur: "focusout" }, function (a, b) {
    var c = function c(a) {
      r.event.simulate(b, a.target, r.event.fix(a));
    };r.event.special[b] = { setup: function setup() {
        var d = this.ownerDocument || this,
            e = V.access(d, b);e || d.addEventListener(a, c, !0), V.access(d, b, (e || 0) + 1);
      }, teardown: function teardown() {
        var d = this.ownerDocument || this,
            e = V.access(d, b) - 1;e ? V.access(d, b, e) : (d.removeEventListener(a, c, !0), V.remove(d, b));
      } };
  });var eb = /\[\]$/,
      fb = /\r?\n/g,
      gb = /^(?:submit|button|image|reset|file)$/i,
      hb = /^(?:input|select|textarea|keygen)/i;function ib(a, b, c, d) {
    var e;if (r.isArray(b)) r.each(b, function (b, e) {
      c || eb.test(a) ? d(a, e) : ib(a + "[" + ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && null != e ? b : "") + "]", e, c, d);
    });else if (c || "object" !== r.type(b)) d(a, b);else for (e in b) {
      ib(a + "[" + e + "]", b[e], c, d);
    }
  }r.param = function (a, b) {
    var c,
        d = [],
        e = function e(a, b) {
      var c = r.isFunction(b) ? b() : b;d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(null == c ? "" : c);
    };if (r.isArray(a) || a.jquery && !r.isPlainObject(a)) r.each(a, function () {
      e(this.name, this.value);
    });else for (c in a) {
      ib(c, a[c], b, e);
    }return d.join("&");
  }, r.fn.extend({ serialize: function serialize() {
      return r.param(this.serializeArray());
    }, serializeArray: function serializeArray() {
      return this.map(function () {
        var a = r.prop(this, "elements");return a ? r.makeArray(a) : this;
      }).filter(function () {
        var a = this.type;return this.name && !r(this).is(":disabled") && hb.test(this.nodeName) && !gb.test(a) && (this.checked || !ia.test(a));
      }).map(function (a, b) {
        var c = r(this).val();return null == c ? null : r.isArray(c) ? r.map(c, function (a) {
          return { name: b.name, value: a.replace(fb, "\r\n") };
        }) : { name: b.name, value: c.replace(fb, "\r\n") };
      }).get();
    } }), r.fn.extend({ wrapAll: function wrapAll(a) {
      var b;return this[0] && (r.isFunction(a) && (a = a.call(this[0])), b = r(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
        var a = this;while (a.firstElementChild) {
          a = a.firstElementChild;
        }return a;
      }).append(this)), this;
    }, wrapInner: function wrapInner(a) {
      return r.isFunction(a) ? this.each(function (b) {
        r(this).wrapInner(a.call(this, b));
      }) : this.each(function () {
        var b = r(this),
            c = b.contents();c.length ? c.wrapAll(a) : b.append(a);
      });
    }, wrap: function wrap(a) {
      var b = r.isFunction(a);return this.each(function (c) {
        r(this).wrapAll(b ? a.call(this, c) : a);
      });
    }, unwrap: function unwrap(a) {
      return this.parent(a).not("body").each(function () {
        r(this).replaceWith(this.childNodes);
      }), this;
    } }), r.expr.pseudos.hidden = function (a) {
    return !r.expr.pseudos.visible(a);
  }, r.expr.pseudos.visible = function (a) {
    return !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length);
  }, o.createHTMLDocument = function () {
    var a = d.implementation.createHTMLDocument("").body;return a.innerHTML = "<form></form><form></form>", 2 === a.childNodes.length;
  }(), r.parseHTML = function (a, b, c) {
    if ("string" != typeof a) return [];"boolean" == typeof b && (c = b, b = !1);var e, f, g;return b || (o.createHTMLDocument ? (b = d.implementation.createHTMLDocument(""), e = b.createElement("base"), e.href = d.location.href, b.head.appendChild(e)) : b = d), f = B.exec(a), g = !c && [], f ? [b.createElement(f[1])] : (f = pa([a], b, g), g && g.length && r(g).remove(), r.merge([], f.childNodes));
  };function jb(a) {
    return r.isWindow(a) ? a : 9 === a.nodeType && a.defaultView;
  }r.offset = { setOffset: function setOffset(a, b, c) {
      var d,
          e,
          f,
          g,
          h,
          i,
          j,
          k = r.css(a, "position"),
          l = r(a),
          m = {};"static" === k && (a.style.position = "relative"), h = l.offset(), f = r.css(a, "top"), i = r.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), r.isFunction(b) && (b = b.call(a, c, r.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m);
    } }, r.fn.extend({ offset: function offset(a) {
      if (arguments.length) return void 0 === a ? this : this.each(function (b) {
        r.offset.setOffset(this, a, b);
      });var b,
          c,
          d,
          e,
          f = this[0];if (f) return f.getClientRects().length ? (d = f.getBoundingClientRect(), d.width || d.height ? (e = f.ownerDocument, c = jb(e), b = e.documentElement, { top: d.top + c.pageYOffset - b.clientTop, left: d.left + c.pageXOffset - b.clientLeft }) : d) : { top: 0, left: 0 };
    }, position: function position() {
      if (this[0]) {
        var a,
            b,
            c = this[0],
            d = { top: 0, left: 0 };return "fixed" === r.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), r.nodeName(a[0], "html") || (d = a.offset()), d = { top: d.top + r.css(a[0], "borderTopWidth", !0), left: d.left + r.css(a[0], "borderLeftWidth", !0) }), { top: b.top - d.top - r.css(c, "marginTop", !0), left: b.left - d.left - r.css(c, "marginLeft", !0) };
      }
    }, offsetParent: function offsetParent() {
      return this.map(function () {
        var a = this.offsetParent;while (a && "static" === r.css(a, "position")) {
          a = a.offsetParent;
        }return a || qa;
      });
    } }), r.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (a, b) {
    var c = "pageYOffset" === b;r.fn[a] = function (d) {
      return S(this, function (a, d, e) {
        var f = jb(a);return void 0 === e ? f ? f[b] : a[d] : void (f ? f.scrollTo(c ? f.pageXOffset : e, c ? e : f.pageYOffset) : a[d] = e);
      }, a, d, arguments.length);
    };
  }), r.each(["top", "left"], function (a, b) {
    r.cssHooks[b] = Oa(o.pixelPosition, function (a, c) {
      if (c) return c = Na(a, b), La.test(c) ? r(a).position()[b] + "px" : c;
    });
  }), r.each({ Height: "height", Width: "width" }, function (a, b) {
    r.each({ padding: "inner" + a, content: b, "": "outer" + a }, function (c, d) {
      r.fn[d] = function (e, f) {
        var g = arguments.length && (c || "boolean" != typeof e),
            h = c || (e === !0 || f === !0 ? "margin" : "border");return S(this, function (b, c, e) {
          var f;return r.isWindow(b) ? 0 === d.indexOf("outer") ? b["inner" + a] : b.document.documentElement["client" + a] : 9 === b.nodeType ? (f = b.documentElement, Math.max(b.body["scroll" + a], f["scroll" + a], b.body["offset" + a], f["offset" + a], f["client" + a])) : void 0 === e ? r.css(b, c, h) : r.style(b, c, e, h);
        }, b, g ? e : void 0, g);
      };
    });
  }), "function" == typeof define && define.amd && define("jquery", [], function () {
    return r;
  });var kb = a.jQuery,
      lb = a.$;return r.noConflict = function (b) {
    return a.$ === r && (a.$ = lb), b && a.jQuery === r && (a.jQuery = kb), r;
  }, b || (a.jQuery = a.$ = r), r;
});
});

require.register("web/static/js/moment.js", function(exports, require, module) {
'use strict';var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};//! moment.js
//! version : 2.17.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
;(function(global,factory){(typeof exports==='undefined'?'undefined':_typeof(exports))==='object'&&typeof module!=='undefined'?module.exports=factory():typeof define==='function'&&define.amd?define(factory):global.moment=factory();})(undefined,function(){'use strict';var hookCallback;function hooks(){return hookCallback.apply(null,arguments);}// This is done to register the method called with moment()
// without creating circular dependencies.
function setHookCallback(callback){hookCallback=callback;}function isArray(input){return input instanceof Array||Object.prototype.toString.call(input)==='[object Array]';}function isObject(input){// IE8 will treat undefined and null as object if it wasn't for
// input != null
return input!=null&&Object.prototype.toString.call(input)==='[object Object]';}function isObjectEmpty(obj){var k;for(k in obj){// even if its not own property I'd still call it non-empty
return false;}return true;}function isNumber(input){return typeof input==='number'||Object.prototype.toString.call(input)==='[object Number]';}function isDate(input){return input instanceof Date||Object.prototype.toString.call(input)==='[object Date]';}function map(arr,fn){var res=[],i;for(i=0;i<arr.length;++i){res.push(fn(arr[i],i));}return res;}function hasOwnProp(a,b){return Object.prototype.hasOwnProperty.call(a,b);}function extend(a,b){for(var i in b){if(hasOwnProp(b,i)){a[i]=b[i];}}if(hasOwnProp(b,'toString')){a.toString=b.toString;}if(hasOwnProp(b,'valueOf')){a.valueOf=b.valueOf;}return a;}function createUTC(input,format,locale,strict){return createLocalOrUTC(input,format,locale,strict,true).utc();}function defaultParsingFlags(){// We need to deep clone this object.
return{empty:false,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:false,invalidMonth:null,invalidFormat:false,userInvalidated:false,iso:false,parsedDateParts:[],meridiem:null};}function getParsingFlags(m){if(m._pf==null){m._pf=defaultParsingFlags();}return m._pf;}var some;if(Array.prototype.some){some=Array.prototype.some;}else{some=function some(fun){var t=Object(this);var len=t.length>>>0;for(var i=0;i<len;i++){if(i in t&&fun.call(this,t[i],i,t)){return true;}}return false;};}var some$1=some;function isValid(m){if(m._isValid==null){var flags=getParsingFlags(m);var parsedParts=some$1.call(flags.parsedDateParts,function(i){return i!=null;});var isNowValid=!isNaN(m._d.getTime())&&flags.overflow<0&&!flags.empty&&!flags.invalidMonth&&!flags.invalidWeekday&&!flags.nullInput&&!flags.invalidFormat&&!flags.userInvalidated&&(!flags.meridiem||flags.meridiem&&parsedParts);if(m._strict){isNowValid=isNowValid&&flags.charsLeftOver===0&&flags.unusedTokens.length===0&&flags.bigHour===undefined;}if(Object.isFrozen==null||!Object.isFrozen(m)){m._isValid=isNowValid;}else{return isNowValid;}}return m._isValid;}function createInvalid(flags){var m=createUTC(NaN);if(flags!=null){extend(getParsingFlags(m),flags);}else{getParsingFlags(m).userInvalidated=true;}return m;}function isUndefined(input){return input===void 0;}// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
var momentProperties=hooks.momentProperties=[];function copyConfig(to,from){var i,prop,val;if(!isUndefined(from._isAMomentObject)){to._isAMomentObject=from._isAMomentObject;}if(!isUndefined(from._i)){to._i=from._i;}if(!isUndefined(from._f)){to._f=from._f;}if(!isUndefined(from._l)){to._l=from._l;}if(!isUndefined(from._strict)){to._strict=from._strict;}if(!isUndefined(from._tzm)){to._tzm=from._tzm;}if(!isUndefined(from._isUTC)){to._isUTC=from._isUTC;}if(!isUndefined(from._offset)){to._offset=from._offset;}if(!isUndefined(from._pf)){to._pf=getParsingFlags(from);}if(!isUndefined(from._locale)){to._locale=from._locale;}if(momentProperties.length>0){for(i in momentProperties){prop=momentProperties[i];val=from[prop];if(!isUndefined(val)){to[prop]=val;}}}return to;}var updateInProgress=false;// Moment prototype object
function Moment(config){copyConfig(this,config);this._d=new Date(config._d!=null?config._d.getTime():NaN);if(!this.isValid()){this._d=new Date(NaN);}// Prevent infinite loop in case updateOffset creates new moment
// objects.
if(updateInProgress===false){updateInProgress=true;hooks.updateOffset(this);updateInProgress=false;}}function isMoment(obj){return obj instanceof Moment||obj!=null&&obj._isAMomentObject!=null;}function absFloor(number){if(number<0){// -0 -> 0
return Math.ceil(number)||0;}else{return Math.floor(number);}}function toInt(argumentForCoercion){var coercedNumber=+argumentForCoercion,value=0;if(coercedNumber!==0&&isFinite(coercedNumber)){value=absFloor(coercedNumber);}return value;}// compare two arrays, return the number of differences
function compareArrays(array1,array2,dontConvert){var len=Math.min(array1.length,array2.length),lengthDiff=Math.abs(array1.length-array2.length),diffs=0,i;for(i=0;i<len;i++){if(dontConvert&&array1[i]!==array2[i]||!dontConvert&&toInt(array1[i])!==toInt(array2[i])){diffs++;}}return diffs+lengthDiff;}function warn(msg){if(hooks.suppressDeprecationWarnings===false&&typeof console!=='undefined'&&console.warn){console.warn('Deprecation warning: '+msg);}}function deprecate(msg,fn){var firstTime=true;return extend(function(){if(hooks.deprecationHandler!=null){hooks.deprecationHandler(null,msg);}if(firstTime){var args=[];var arg;for(var i=0;i<arguments.length;i++){arg='';if(_typeof(arguments[i])==='object'){arg+='\n['+i+'] ';for(var key in arguments[0]){arg+=key+': '+arguments[0][key]+', ';}arg=arg.slice(0,-2);// Remove trailing comma and space
}else{arg=arguments[i];}args.push(arg);}warn(msg+'\nArguments: '+Array.prototype.slice.call(args).join('')+'\n'+new Error().stack);firstTime=false;}return fn.apply(this,arguments);},fn);}var deprecations={};function deprecateSimple(name,msg){if(hooks.deprecationHandler!=null){hooks.deprecationHandler(name,msg);}if(!deprecations[name]){warn(msg);deprecations[name]=true;}}hooks.suppressDeprecationWarnings=false;hooks.deprecationHandler=null;function isFunction(input){return input instanceof Function||Object.prototype.toString.call(input)==='[object Function]';}function set(config){var prop,i;for(i in config){prop=config[i];if(isFunction(prop)){this[i]=prop;}else{this['_'+i]=prop;}}this._config=config;// Lenient ordinal parsing accepts just a number in addition to
// number + (possibly) stuff coming from _ordinalParseLenient.
this._ordinalParseLenient=new RegExp(this._ordinalParse.source+'|'+/\d{1,2}/.source);}function mergeConfigs(parentConfig,childConfig){var res=extend({},parentConfig),prop;for(prop in childConfig){if(hasOwnProp(childConfig,prop)){if(isObject(parentConfig[prop])&&isObject(childConfig[prop])){res[prop]={};extend(res[prop],parentConfig[prop]);extend(res[prop],childConfig[prop]);}else if(childConfig[prop]!=null){res[prop]=childConfig[prop];}else{delete res[prop];}}}for(prop in parentConfig){if(hasOwnProp(parentConfig,prop)&&!hasOwnProp(childConfig,prop)&&isObject(parentConfig[prop])){// make sure changes to properties don't modify parent config
res[prop]=extend({},res[prop]);}}return res;}function Locale(config){if(config!=null){this.set(config);}}var keys;if(Object.keys){keys=Object.keys;}else{keys=function keys(obj){var i,res=[];for(i in obj){if(hasOwnProp(obj,i)){res.push(i);}}return res;};}var keys$1=keys;var defaultCalendar={sameDay:'[Today at] LT',nextDay:'[Tomorrow at] LT',nextWeek:'dddd [at] LT',lastDay:'[Yesterday at] LT',lastWeek:'[Last] dddd [at] LT',sameElse:'L'};function calendar(key,mom,now){var output=this._calendar[key]||this._calendar['sameElse'];return isFunction(output)?output.call(mom,now):output;}var defaultLongDateFormat={LTS:'h:mm:ss A',LT:'h:mm A',L:'MM/DD/YYYY',LL:'MMMM D, YYYY',LLL:'MMMM D, YYYY h:mm A',LLLL:'dddd, MMMM D, YYYY h:mm A'};function longDateFormat(key){var format=this._longDateFormat[key],formatUpper=this._longDateFormat[key.toUpperCase()];if(format||!formatUpper){return format;}this._longDateFormat[key]=formatUpper.replace(/MMMM|MM|DD|dddd/g,function(val){return val.slice(1);});return this._longDateFormat[key];}var defaultInvalidDate='Invalid date';function invalidDate(){return this._invalidDate;}var defaultOrdinal='%d';var defaultOrdinalParse=/\d{1,2}/;function ordinal(number){return this._ordinal.replace('%d',number);}var defaultRelativeTime={future:'in %s',past:'%s ago',s:'a few seconds',m:'a minute',mm:'%d minutes',h:'an hour',hh:'%d hours',d:'a day',dd:'%d days',M:'a month',MM:'%d months',y:'a year',yy:'%d years'};function relativeTime(number,withoutSuffix,string,isFuture){var output=this._relativeTime[string];return isFunction(output)?output(number,withoutSuffix,string,isFuture):output.replace(/%d/i,number);}function pastFuture(diff,output){var format=this._relativeTime[diff>0?'future':'past'];return isFunction(format)?format(output):format.replace(/%s/i,output);}var aliases={};function addUnitAlias(unit,shorthand){var lowerCase=unit.toLowerCase();aliases[lowerCase]=aliases[lowerCase+'s']=aliases[shorthand]=unit;}function normalizeUnits(units){return typeof units==='string'?aliases[units]||aliases[units.toLowerCase()]:undefined;}function normalizeObjectUnits(inputObject){var normalizedInput={},normalizedProp,prop;for(prop in inputObject){if(hasOwnProp(inputObject,prop)){normalizedProp=normalizeUnits(prop);if(normalizedProp){normalizedInput[normalizedProp]=inputObject[prop];}}}return normalizedInput;}var priorities={};function addUnitPriority(unit,priority){priorities[unit]=priority;}function getPrioritizedUnits(unitsObj){var units=[];for(var u in unitsObj){units.push({unit:u,priority:priorities[u]});}units.sort(function(a,b){return a.priority-b.priority;});return units;}function makeGetSet(unit,keepTime){return function(value){if(value!=null){set$1(this,unit,value);hooks.updateOffset(this,keepTime);return this;}else{return get(this,unit);}};}function get(mom,unit){return mom.isValid()?mom._d['get'+(mom._isUTC?'UTC':'')+unit]():NaN;}function set$1(mom,unit,value){if(mom.isValid()){mom._d['set'+(mom._isUTC?'UTC':'')+unit](value);}}// MOMENTS
function stringGet(units){units=normalizeUnits(units);if(isFunction(this[units])){return this[units]();}return this;}function stringSet(units,value){if((typeof units==='undefined'?'undefined':_typeof(units))==='object'){units=normalizeObjectUnits(units);var prioritized=getPrioritizedUnits(units);for(var i=0;i<prioritized.length;i++){this[prioritized[i].unit](units[prioritized[i].unit]);}}else{units=normalizeUnits(units);if(isFunction(this[units])){return this[units](value);}}return this;}function zeroFill(number,targetLength,forceSign){var absNumber=''+Math.abs(number),zerosToFill=targetLength-absNumber.length,sign=number>=0;return(sign?forceSign?'+':'':'-')+Math.pow(10,Math.max(0,zerosToFill)).toString().substr(1)+absNumber;}var formattingTokens=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;var localFormattingTokens=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;var formatFunctions={};var formatTokenFunctions={};// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
function addFormatToken(token,padded,ordinal,callback){var func=callback;if(typeof callback==='string'){func=function func(){return this[callback]();};}if(token){formatTokenFunctions[token]=func;}if(padded){formatTokenFunctions[padded[0]]=function(){return zeroFill(func.apply(this,arguments),padded[1],padded[2]);};}if(ordinal){formatTokenFunctions[ordinal]=function(){return this.localeData().ordinal(func.apply(this,arguments),token);};}}function removeFormattingTokens(input){if(input.match(/\[[\s\S]/)){return input.replace(/^\[|\]$/g,'');}return input.replace(/\\/g,'');}function makeFormatFunction(format){var array=format.match(formattingTokens),i,length;for(i=0,length=array.length;i<length;i++){if(formatTokenFunctions[array[i]]){array[i]=formatTokenFunctions[array[i]];}else{array[i]=removeFormattingTokens(array[i]);}}return function(mom){var output='',i;for(i=0;i<length;i++){output+=array[i]instanceof Function?array[i].call(mom,format):array[i];}return output;};}// format date using native date object
function formatMoment(m,format){if(!m.isValid()){return m.localeData().invalidDate();}format=expandFormat(format,m.localeData());formatFunctions[format]=formatFunctions[format]||makeFormatFunction(format);return formatFunctions[format](m);}function expandFormat(format,locale){var i=5;function replaceLongDateFormatTokens(input){return locale.longDateFormat(input)||input;}localFormattingTokens.lastIndex=0;while(i>=0&&localFormattingTokens.test(format)){format=format.replace(localFormattingTokens,replaceLongDateFormatTokens);localFormattingTokens.lastIndex=0;i-=1;}return format;}var match1=/\d/;//       0 - 9
var match2=/\d\d/;//      00 - 99
var match3=/\d{3}/;//     000 - 999
var match4=/\d{4}/;//    0000 - 9999
var match6=/[+-]?\d{6}/;// -999999 - 999999
var match1to2=/\d\d?/;//       0 - 99
var match3to4=/\d\d\d\d?/;//     999 - 9999
var match5to6=/\d\d\d\d\d\d?/;//   99999 - 999999
var match1to3=/\d{1,3}/;//       0 - 999
var match1to4=/\d{1,4}/;//       0 - 9999
var match1to6=/[+-]?\d{1,6}/;// -999999 - 999999
var matchUnsigned=/\d+/;//       0 - inf
var matchSigned=/[+-]?\d+/;//    -inf - inf
var matchOffset=/Z|[+-]\d\d:?\d\d/gi;// +00:00 -00:00 +0000 -0000 or Z
var matchShortOffset=/Z|[+-]\d\d(?::?\d\d)?/gi;// +00 -00 +00:00 -00:00 +0000 -0000 or Z
var matchTimestamp=/[+-]?\d+(\.\d{1,3})?/;// 123456789 123456789.123
// any word (or two) characters or numbers including two/three word month in arabic.
// includes scottish gaelic two word and hyphenated months
var matchWord=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;var regexes={};function addRegexToken(token,regex,strictRegex){regexes[token]=isFunction(regex)?regex:function(isStrict,localeData){return isStrict&&strictRegex?strictRegex:regex;};}function getParseRegexForToken(token,config){if(!hasOwnProp(regexes,token)){return new RegExp(unescapeFormat(token));}return regexes[token](config._strict,config._locale);}// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function unescapeFormat(s){return regexEscape(s.replace('\\','').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(matched,p1,p2,p3,p4){return p1||p2||p3||p4;}));}function regexEscape(s){return s.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&');}var tokens={};function addParseToken(token,callback){var i,func=callback;if(typeof token==='string'){token=[token];}if(isNumber(callback)){func=function func(input,array){array[callback]=toInt(input);};}for(i=0;i<token.length;i++){tokens[token[i]]=func;}}function addWeekParseToken(token,callback){addParseToken(token,function(input,array,config,token){config._w=config._w||{};callback(input,config._w,config,token);});}function addTimeToArrayFromToken(token,input,config){if(input!=null&&hasOwnProp(tokens,token)){tokens[token](input,config._a,config,token);}}var YEAR=0;var MONTH=1;var DATE=2;var HOUR=3;var MINUTE=4;var SECOND=5;var MILLISECOND=6;var WEEK=7;var WEEKDAY=8;var indexOf;if(Array.prototype.indexOf){indexOf=Array.prototype.indexOf;}else{indexOf=function indexOf(o){// I know
var i;for(i=0;i<this.length;++i){if(this[i]===o){return i;}}return-1;};}var indexOf$1=indexOf;function daysInMonth(year,month){return new Date(Date.UTC(year,month+1,0)).getUTCDate();}// FORMATTING
addFormatToken('M',['MM',2],'Mo',function(){return this.month()+1;});addFormatToken('MMM',0,0,function(format){return this.localeData().monthsShort(this,format);});addFormatToken('MMMM',0,0,function(format){return this.localeData().months(this,format);});// ALIASES
addUnitAlias('month','M');// PRIORITY
addUnitPriority('month',8);// PARSING
addRegexToken('M',match1to2);addRegexToken('MM',match1to2,match2);addRegexToken('MMM',function(isStrict,locale){return locale.monthsShortRegex(isStrict);});addRegexToken('MMMM',function(isStrict,locale){return locale.monthsRegex(isStrict);});addParseToken(['M','MM'],function(input,array){array[MONTH]=toInt(input)-1;});addParseToken(['MMM','MMMM'],function(input,array,config,token){var month=config._locale.monthsParse(input,token,config._strict);// if we didn't find a month name, mark the date as invalid.
if(month!=null){array[MONTH]=month;}else{getParsingFlags(config).invalidMonth=input;}});// LOCALES
var MONTHS_IN_FORMAT=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;var defaultLocaleMonths='January_February_March_April_May_June_July_August_September_October_November_December'.split('_');function localeMonths(m,format){if(!m){return this._months;}return isArray(this._months)?this._months[m.month()]:this._months[(this._months.isFormat||MONTHS_IN_FORMAT).test(format)?'format':'standalone'][m.month()];}var defaultLocaleMonthsShort='Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');function localeMonthsShort(m,format){if(!m){return this._monthsShort;}return isArray(this._monthsShort)?this._monthsShort[m.month()]:this._monthsShort[MONTHS_IN_FORMAT.test(format)?'format':'standalone'][m.month()];}function handleStrictParse(monthName,format,strict){var i,ii,mom,llc=monthName.toLocaleLowerCase();if(!this._monthsParse){// this is not used
this._monthsParse=[];this._longMonthsParse=[];this._shortMonthsParse=[];for(i=0;i<12;++i){mom=createUTC([2000,i]);this._shortMonthsParse[i]=this.monthsShort(mom,'').toLocaleLowerCase();this._longMonthsParse[i]=this.months(mom,'').toLocaleLowerCase();}}if(strict){if(format==='MMM'){ii=indexOf$1.call(this._shortMonthsParse,llc);return ii!==-1?ii:null;}else{ii=indexOf$1.call(this._longMonthsParse,llc);return ii!==-1?ii:null;}}else{if(format==='MMM'){ii=indexOf$1.call(this._shortMonthsParse,llc);if(ii!==-1){return ii;}ii=indexOf$1.call(this._longMonthsParse,llc);return ii!==-1?ii:null;}else{ii=indexOf$1.call(this._longMonthsParse,llc);if(ii!==-1){return ii;}ii=indexOf$1.call(this._shortMonthsParse,llc);return ii!==-1?ii:null;}}}function localeMonthsParse(monthName,format,strict){var i,mom,regex;if(this._monthsParseExact){return handleStrictParse.call(this,monthName,format,strict);}if(!this._monthsParse){this._monthsParse=[];this._longMonthsParse=[];this._shortMonthsParse=[];}// TODO: add sorting
// Sorting makes sure if one month (or abbr) is a prefix of another
// see sorting in computeMonthsParse
for(i=0;i<12;i++){// make the regex if we don't have it already
mom=createUTC([2000,i]);if(strict&&!this._longMonthsParse[i]){this._longMonthsParse[i]=new RegExp('^'+this.months(mom,'').replace('.','')+'$','i');this._shortMonthsParse[i]=new RegExp('^'+this.monthsShort(mom,'').replace('.','')+'$','i');}if(!strict&&!this._monthsParse[i]){regex='^'+this.months(mom,'')+'|^'+this.monthsShort(mom,'');this._monthsParse[i]=new RegExp(regex.replace('.',''),'i');}// test the regex
if(strict&&format==='MMMM'&&this._longMonthsParse[i].test(monthName)){return i;}else if(strict&&format==='MMM'&&this._shortMonthsParse[i].test(monthName)){return i;}else if(!strict&&this._monthsParse[i].test(monthName)){return i;}}}// MOMENTS
function setMonth(mom,value){var dayOfMonth;if(!mom.isValid()){// No op
return mom;}if(typeof value==='string'){if(/^\d+$/.test(value)){value=toInt(value);}else{value=mom.localeData().monthsParse(value);// TODO: Another silent failure?
if(!isNumber(value)){return mom;}}}dayOfMonth=Math.min(mom.date(),daysInMonth(mom.year(),value));mom._d['set'+(mom._isUTC?'UTC':'')+'Month'](value,dayOfMonth);return mom;}function getSetMonth(value){if(value!=null){setMonth(this,value);hooks.updateOffset(this,true);return this;}else{return get(this,'Month');}}function getDaysInMonth(){return daysInMonth(this.year(),this.month());}var defaultMonthsShortRegex=matchWord;function monthsShortRegex(isStrict){if(this._monthsParseExact){if(!hasOwnProp(this,'_monthsRegex')){computeMonthsParse.call(this);}if(isStrict){return this._monthsShortStrictRegex;}else{return this._monthsShortRegex;}}else{if(!hasOwnProp(this,'_monthsShortRegex')){this._monthsShortRegex=defaultMonthsShortRegex;}return this._monthsShortStrictRegex&&isStrict?this._monthsShortStrictRegex:this._monthsShortRegex;}}var defaultMonthsRegex=matchWord;function monthsRegex(isStrict){if(this._monthsParseExact){if(!hasOwnProp(this,'_monthsRegex')){computeMonthsParse.call(this);}if(isStrict){return this._monthsStrictRegex;}else{return this._monthsRegex;}}else{if(!hasOwnProp(this,'_monthsRegex')){this._monthsRegex=defaultMonthsRegex;}return this._monthsStrictRegex&&isStrict?this._monthsStrictRegex:this._monthsRegex;}}function computeMonthsParse(){function cmpLenRev(a,b){return b.length-a.length;}var shortPieces=[],longPieces=[],mixedPieces=[],i,mom;for(i=0;i<12;i++){// make the regex if we don't have it already
mom=createUTC([2000,i]);shortPieces.push(this.monthsShort(mom,''));longPieces.push(this.months(mom,''));mixedPieces.push(this.months(mom,''));mixedPieces.push(this.monthsShort(mom,''));}// Sorting makes sure if one month (or abbr) is a prefix of another it
// will match the longer piece.
shortPieces.sort(cmpLenRev);longPieces.sort(cmpLenRev);mixedPieces.sort(cmpLenRev);for(i=0;i<12;i++){shortPieces[i]=regexEscape(shortPieces[i]);longPieces[i]=regexEscape(longPieces[i]);}for(i=0;i<24;i++){mixedPieces[i]=regexEscape(mixedPieces[i]);}this._monthsRegex=new RegExp('^('+mixedPieces.join('|')+')','i');this._monthsShortRegex=this._monthsRegex;this._monthsStrictRegex=new RegExp('^('+longPieces.join('|')+')','i');this._monthsShortStrictRegex=new RegExp('^('+shortPieces.join('|')+')','i');}// FORMATTING
addFormatToken('Y',0,0,function(){var y=this.year();return y<=9999?''+y:'+'+y;});addFormatToken(0,['YY',2],0,function(){return this.year()%100;});addFormatToken(0,['YYYY',4],0,'year');addFormatToken(0,['YYYYY',5],0,'year');addFormatToken(0,['YYYYYY',6,true],0,'year');// ALIASES
addUnitAlias('year','y');// PRIORITIES
addUnitPriority('year',1);// PARSING
addRegexToken('Y',matchSigned);addRegexToken('YY',match1to2,match2);addRegexToken('YYYY',match1to4,match4);addRegexToken('YYYYY',match1to6,match6);addRegexToken('YYYYYY',match1to6,match6);addParseToken(['YYYYY','YYYYYY'],YEAR);addParseToken('YYYY',function(input,array){array[YEAR]=input.length===2?hooks.parseTwoDigitYear(input):toInt(input);});addParseToken('YY',function(input,array){array[YEAR]=hooks.parseTwoDigitYear(input);});addParseToken('Y',function(input,array){array[YEAR]=parseInt(input,10);});// HELPERS
function daysInYear(year){return isLeapYear(year)?366:365;}function isLeapYear(year){return year%4===0&&year%100!==0||year%400===0;}// HOOKS
hooks.parseTwoDigitYear=function(input){return toInt(input)+(toInt(input)>68?1900:2000);};// MOMENTS
var getSetYear=makeGetSet('FullYear',true);function getIsLeapYear(){return isLeapYear(this.year());}function createDate(y,m,d,h,M,s,ms){//can't just apply() to create a date:
//http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
var date=new Date(y,m,d,h,M,s,ms);//the date constructor remaps years 0-99 to 1900-1999
if(y<100&&y>=0&&isFinite(date.getFullYear())){date.setFullYear(y);}return date;}function createUTCDate(y){var date=new Date(Date.UTC.apply(null,arguments));//the Date.UTC function remaps years 0-99 to 1900-1999
if(y<100&&y>=0&&isFinite(date.getUTCFullYear())){date.setUTCFullYear(y);}return date;}// start-of-first-week - start-of-year
function firstWeekOffset(year,dow,doy){var// first-week day -- which january is always in the first week (4 for iso, 1 for other)
fwd=7+dow-doy,// first-week day local weekday -- which local weekday is fwd
fwdlw=(7+createUTCDate(year,0,fwd).getUTCDay()-dow)%7;return-fwdlw+fwd-1;}//http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
function dayOfYearFromWeeks(year,week,weekday,dow,doy){var localWeekday=(7+weekday-dow)%7,weekOffset=firstWeekOffset(year,dow,doy),dayOfYear=1+7*(week-1)+localWeekday+weekOffset,resYear,resDayOfYear;if(dayOfYear<=0){resYear=year-1;resDayOfYear=daysInYear(resYear)+dayOfYear;}else if(dayOfYear>daysInYear(year)){resYear=year+1;resDayOfYear=dayOfYear-daysInYear(year);}else{resYear=year;resDayOfYear=dayOfYear;}return{year:resYear,dayOfYear:resDayOfYear};}function weekOfYear(mom,dow,doy){var weekOffset=firstWeekOffset(mom.year(),dow,doy),week=Math.floor((mom.dayOfYear()-weekOffset-1)/7)+1,resWeek,resYear;if(week<1){resYear=mom.year()-1;resWeek=week+weeksInYear(resYear,dow,doy);}else if(week>weeksInYear(mom.year(),dow,doy)){resWeek=week-weeksInYear(mom.year(),dow,doy);resYear=mom.year()+1;}else{resYear=mom.year();resWeek=week;}return{week:resWeek,year:resYear};}function weeksInYear(year,dow,doy){var weekOffset=firstWeekOffset(year,dow,doy),weekOffsetNext=firstWeekOffset(year+1,dow,doy);return(daysInYear(year)-weekOffset+weekOffsetNext)/7;}// FORMATTING
addFormatToken('w',['ww',2],'wo','week');addFormatToken('W',['WW',2],'Wo','isoWeek');// ALIASES
addUnitAlias('week','w');addUnitAlias('isoWeek','W');// PRIORITIES
addUnitPriority('week',5);addUnitPriority('isoWeek',5);// PARSING
addRegexToken('w',match1to2);addRegexToken('ww',match1to2,match2);addRegexToken('W',match1to2);addRegexToken('WW',match1to2,match2);addWeekParseToken(['w','ww','W','WW'],function(input,week,config,token){week[token.substr(0,1)]=toInt(input);});// HELPERS
// LOCALES
function localeWeek(mom){return weekOfYear(mom,this._week.dow,this._week.doy).week;}var defaultLocaleWeek={dow:0,// Sunday is the first day of the week.
doy:6// The week that contains Jan 1st is the first week of the year.
};function localeFirstDayOfWeek(){return this._week.dow;}function localeFirstDayOfYear(){return this._week.doy;}// MOMENTS
function getSetWeek(input){var week=this.localeData().week(this);return input==null?week:this.add((input-week)*7,'d');}function getSetISOWeek(input){var week=weekOfYear(this,1,4).week;return input==null?week:this.add((input-week)*7,'d');}// FORMATTING
addFormatToken('d',0,'do','day');addFormatToken('dd',0,0,function(format){return this.localeData().weekdaysMin(this,format);});addFormatToken('ddd',0,0,function(format){return this.localeData().weekdaysShort(this,format);});addFormatToken('dddd',0,0,function(format){return this.localeData().weekdays(this,format);});addFormatToken('e',0,0,'weekday');addFormatToken('E',0,0,'isoWeekday');// ALIASES
addUnitAlias('day','d');addUnitAlias('weekday','e');addUnitAlias('isoWeekday','E');// PRIORITY
addUnitPriority('day',11);addUnitPriority('weekday',11);addUnitPriority('isoWeekday',11);// PARSING
addRegexToken('d',match1to2);addRegexToken('e',match1to2);addRegexToken('E',match1to2);addRegexToken('dd',function(isStrict,locale){return locale.weekdaysMinRegex(isStrict);});addRegexToken('ddd',function(isStrict,locale){return locale.weekdaysShortRegex(isStrict);});addRegexToken('dddd',function(isStrict,locale){return locale.weekdaysRegex(isStrict);});addWeekParseToken(['dd','ddd','dddd'],function(input,week,config,token){var weekday=config._locale.weekdaysParse(input,token,config._strict);// if we didn't get a weekday name, mark the date as invalid
if(weekday!=null){week.d=weekday;}else{getParsingFlags(config).invalidWeekday=input;}});addWeekParseToken(['d','e','E'],function(input,week,config,token){week[token]=toInt(input);});// HELPERS
function parseWeekday(input,locale){if(typeof input!=='string'){return input;}if(!isNaN(input)){return parseInt(input,10);}input=locale.weekdaysParse(input);if(typeof input==='number'){return input;}return null;}function parseIsoWeekday(input,locale){if(typeof input==='string'){return locale.weekdaysParse(input)%7||7;}return isNaN(input)?null:input;}// LOCALES
var defaultLocaleWeekdays='Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');function localeWeekdays(m,format){if(!m){return this._weekdays;}return isArray(this._weekdays)?this._weekdays[m.day()]:this._weekdays[this._weekdays.isFormat.test(format)?'format':'standalone'][m.day()];}var defaultLocaleWeekdaysShort='Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');function localeWeekdaysShort(m){return m?this._weekdaysShort[m.day()]:this._weekdaysShort;}var defaultLocaleWeekdaysMin='Su_Mo_Tu_We_Th_Fr_Sa'.split('_');function localeWeekdaysMin(m){return m?this._weekdaysMin[m.day()]:this._weekdaysMin;}function handleStrictParse$1(weekdayName,format,strict){var i,ii,mom,llc=weekdayName.toLocaleLowerCase();if(!this._weekdaysParse){this._weekdaysParse=[];this._shortWeekdaysParse=[];this._minWeekdaysParse=[];for(i=0;i<7;++i){mom=createUTC([2000,1]).day(i);this._minWeekdaysParse[i]=this.weekdaysMin(mom,'').toLocaleLowerCase();this._shortWeekdaysParse[i]=this.weekdaysShort(mom,'').toLocaleLowerCase();this._weekdaysParse[i]=this.weekdays(mom,'').toLocaleLowerCase();}}if(strict){if(format==='dddd'){ii=indexOf$1.call(this._weekdaysParse,llc);return ii!==-1?ii:null;}else if(format==='ddd'){ii=indexOf$1.call(this._shortWeekdaysParse,llc);return ii!==-1?ii:null;}else{ii=indexOf$1.call(this._minWeekdaysParse,llc);return ii!==-1?ii:null;}}else{if(format==='dddd'){ii=indexOf$1.call(this._weekdaysParse,llc);if(ii!==-1){return ii;}ii=indexOf$1.call(this._shortWeekdaysParse,llc);if(ii!==-1){return ii;}ii=indexOf$1.call(this._minWeekdaysParse,llc);return ii!==-1?ii:null;}else if(format==='ddd'){ii=indexOf$1.call(this._shortWeekdaysParse,llc);if(ii!==-1){return ii;}ii=indexOf$1.call(this._weekdaysParse,llc);if(ii!==-1){return ii;}ii=indexOf$1.call(this._minWeekdaysParse,llc);return ii!==-1?ii:null;}else{ii=indexOf$1.call(this._minWeekdaysParse,llc);if(ii!==-1){return ii;}ii=indexOf$1.call(this._weekdaysParse,llc);if(ii!==-1){return ii;}ii=indexOf$1.call(this._shortWeekdaysParse,llc);return ii!==-1?ii:null;}}}function localeWeekdaysParse(weekdayName,format,strict){var i,mom,regex;if(this._weekdaysParseExact){return handleStrictParse$1.call(this,weekdayName,format,strict);}if(!this._weekdaysParse){this._weekdaysParse=[];this._minWeekdaysParse=[];this._shortWeekdaysParse=[];this._fullWeekdaysParse=[];}for(i=0;i<7;i++){// make the regex if we don't have it already
mom=createUTC([2000,1]).day(i);if(strict&&!this._fullWeekdaysParse[i]){this._fullWeekdaysParse[i]=new RegExp('^'+this.weekdays(mom,'').replace('.','\.?')+'$','i');this._shortWeekdaysParse[i]=new RegExp('^'+this.weekdaysShort(mom,'').replace('.','\.?')+'$','i');this._minWeekdaysParse[i]=new RegExp('^'+this.weekdaysMin(mom,'').replace('.','\.?')+'$','i');}if(!this._weekdaysParse[i]){regex='^'+this.weekdays(mom,'')+'|^'+this.weekdaysShort(mom,'')+'|^'+this.weekdaysMin(mom,'');this._weekdaysParse[i]=new RegExp(regex.replace('.',''),'i');}// test the regex
if(strict&&format==='dddd'&&this._fullWeekdaysParse[i].test(weekdayName)){return i;}else if(strict&&format==='ddd'&&this._shortWeekdaysParse[i].test(weekdayName)){return i;}else if(strict&&format==='dd'&&this._minWeekdaysParse[i].test(weekdayName)){return i;}else if(!strict&&this._weekdaysParse[i].test(weekdayName)){return i;}}}// MOMENTS
function getSetDayOfWeek(input){if(!this.isValid()){return input!=null?this:NaN;}var day=this._isUTC?this._d.getUTCDay():this._d.getDay();if(input!=null){input=parseWeekday(input,this.localeData());return this.add(input-day,'d');}else{return day;}}function getSetLocaleDayOfWeek(input){if(!this.isValid()){return input!=null?this:NaN;}var weekday=(this.day()+7-this.localeData()._week.dow)%7;return input==null?weekday:this.add(input-weekday,'d');}function getSetISODayOfWeek(input){if(!this.isValid()){return input!=null?this:NaN;}// behaves the same as moment#day except
// as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
// as a setter, sunday should belong to the previous week.
if(input!=null){var weekday=parseIsoWeekday(input,this.localeData());return this.day(this.day()%7?weekday:weekday-7);}else{return this.day()||7;}}var defaultWeekdaysRegex=matchWord;function weekdaysRegex(isStrict){if(this._weekdaysParseExact){if(!hasOwnProp(this,'_weekdaysRegex')){computeWeekdaysParse.call(this);}if(isStrict){return this._weekdaysStrictRegex;}else{return this._weekdaysRegex;}}else{if(!hasOwnProp(this,'_weekdaysRegex')){this._weekdaysRegex=defaultWeekdaysRegex;}return this._weekdaysStrictRegex&&isStrict?this._weekdaysStrictRegex:this._weekdaysRegex;}}var defaultWeekdaysShortRegex=matchWord;function weekdaysShortRegex(isStrict){if(this._weekdaysParseExact){if(!hasOwnProp(this,'_weekdaysRegex')){computeWeekdaysParse.call(this);}if(isStrict){return this._weekdaysShortStrictRegex;}else{return this._weekdaysShortRegex;}}else{if(!hasOwnProp(this,'_weekdaysShortRegex')){this._weekdaysShortRegex=defaultWeekdaysShortRegex;}return this._weekdaysShortStrictRegex&&isStrict?this._weekdaysShortStrictRegex:this._weekdaysShortRegex;}}var defaultWeekdaysMinRegex=matchWord;function weekdaysMinRegex(isStrict){if(this._weekdaysParseExact){if(!hasOwnProp(this,'_weekdaysRegex')){computeWeekdaysParse.call(this);}if(isStrict){return this._weekdaysMinStrictRegex;}else{return this._weekdaysMinRegex;}}else{if(!hasOwnProp(this,'_weekdaysMinRegex')){this._weekdaysMinRegex=defaultWeekdaysMinRegex;}return this._weekdaysMinStrictRegex&&isStrict?this._weekdaysMinStrictRegex:this._weekdaysMinRegex;}}function computeWeekdaysParse(){function cmpLenRev(a,b){return b.length-a.length;}var minPieces=[],shortPieces=[],longPieces=[],mixedPieces=[],i,mom,minp,shortp,longp;for(i=0;i<7;i++){// make the regex if we don't have it already
mom=createUTC([2000,1]).day(i);minp=this.weekdaysMin(mom,'');shortp=this.weekdaysShort(mom,'');longp=this.weekdays(mom,'');minPieces.push(minp);shortPieces.push(shortp);longPieces.push(longp);mixedPieces.push(minp);mixedPieces.push(shortp);mixedPieces.push(longp);}// Sorting makes sure if one weekday (or abbr) is a prefix of another it
// will match the longer piece.
minPieces.sort(cmpLenRev);shortPieces.sort(cmpLenRev);longPieces.sort(cmpLenRev);mixedPieces.sort(cmpLenRev);for(i=0;i<7;i++){shortPieces[i]=regexEscape(shortPieces[i]);longPieces[i]=regexEscape(longPieces[i]);mixedPieces[i]=regexEscape(mixedPieces[i]);}this._weekdaysRegex=new RegExp('^('+mixedPieces.join('|')+')','i');this._weekdaysShortRegex=this._weekdaysRegex;this._weekdaysMinRegex=this._weekdaysRegex;this._weekdaysStrictRegex=new RegExp('^('+longPieces.join('|')+')','i');this._weekdaysShortStrictRegex=new RegExp('^('+shortPieces.join('|')+')','i');this._weekdaysMinStrictRegex=new RegExp('^('+minPieces.join('|')+')','i');}// FORMATTING
function hFormat(){return this.hours()%12||12;}function kFormat(){return this.hours()||24;}addFormatToken('H',['HH',2],0,'hour');addFormatToken('h',['hh',2],0,hFormat);addFormatToken('k',['kk',2],0,kFormat);addFormatToken('hmm',0,0,function(){return''+hFormat.apply(this)+zeroFill(this.minutes(),2);});addFormatToken('hmmss',0,0,function(){return''+hFormat.apply(this)+zeroFill(this.minutes(),2)+zeroFill(this.seconds(),2);});addFormatToken('Hmm',0,0,function(){return''+this.hours()+zeroFill(this.minutes(),2);});addFormatToken('Hmmss',0,0,function(){return''+this.hours()+zeroFill(this.minutes(),2)+zeroFill(this.seconds(),2);});function meridiem(token,lowercase){addFormatToken(token,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),lowercase);});}meridiem('a',true);meridiem('A',false);// ALIASES
addUnitAlias('hour','h');// PRIORITY
addUnitPriority('hour',13);// PARSING
function matchMeridiem(isStrict,locale){return locale._meridiemParse;}addRegexToken('a',matchMeridiem);addRegexToken('A',matchMeridiem);addRegexToken('H',match1to2);addRegexToken('h',match1to2);addRegexToken('HH',match1to2,match2);addRegexToken('hh',match1to2,match2);addRegexToken('hmm',match3to4);addRegexToken('hmmss',match5to6);addRegexToken('Hmm',match3to4);addRegexToken('Hmmss',match5to6);addParseToken(['H','HH'],HOUR);addParseToken(['a','A'],function(input,array,config){config._isPm=config._locale.isPM(input);config._meridiem=input;});addParseToken(['h','hh'],function(input,array,config){array[HOUR]=toInt(input);getParsingFlags(config).bigHour=true;});addParseToken('hmm',function(input,array,config){var pos=input.length-2;array[HOUR]=toInt(input.substr(0,pos));array[MINUTE]=toInt(input.substr(pos));getParsingFlags(config).bigHour=true;});addParseToken('hmmss',function(input,array,config){var pos1=input.length-4;var pos2=input.length-2;array[HOUR]=toInt(input.substr(0,pos1));array[MINUTE]=toInt(input.substr(pos1,2));array[SECOND]=toInt(input.substr(pos2));getParsingFlags(config).bigHour=true;});addParseToken('Hmm',function(input,array,config){var pos=input.length-2;array[HOUR]=toInt(input.substr(0,pos));array[MINUTE]=toInt(input.substr(pos));});addParseToken('Hmmss',function(input,array,config){var pos1=input.length-4;var pos2=input.length-2;array[HOUR]=toInt(input.substr(0,pos1));array[MINUTE]=toInt(input.substr(pos1,2));array[SECOND]=toInt(input.substr(pos2));});// LOCALES
function localeIsPM(input){// IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
// Using charAt should be more compatible.
return(input+'').toLowerCase().charAt(0)==='p';}var defaultLocaleMeridiemParse=/[ap]\.?m?\.?/i;function localeMeridiem(hours,minutes,isLower){if(hours>11){return isLower?'pm':'PM';}else{return isLower?'am':'AM';}}// MOMENTS
// Setting the hour should keep the time, because the user explicitly
// specified which hour he wants. So trying to maintain the same hour (in
// a new timezone) makes sense. Adding/subtracting hours does not follow
// this rule.
var getSetHour=makeGetSet('Hours',true);// months
// week
// weekdays
// meridiem
var baseConfig={calendar:defaultCalendar,longDateFormat:defaultLongDateFormat,invalidDate:defaultInvalidDate,ordinal:defaultOrdinal,ordinalParse:defaultOrdinalParse,relativeTime:defaultRelativeTime,months:defaultLocaleMonths,monthsShort:defaultLocaleMonthsShort,week:defaultLocaleWeek,weekdays:defaultLocaleWeekdays,weekdaysMin:defaultLocaleWeekdaysMin,weekdaysShort:defaultLocaleWeekdaysShort,meridiemParse:defaultLocaleMeridiemParse};// internal storage for locale config files
var locales={};var localeFamilies={};var globalLocale;function normalizeLocale(key){return key?key.toLowerCase().replace('_','-'):key;}// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
function chooseLocale(names){var i=0,j,next,locale,split;while(i<names.length){split=normalizeLocale(names[i]).split('-');j=split.length;next=normalizeLocale(names[i+1]);next=next?next.split('-'):null;while(j>0){locale=loadLocale(split.slice(0,j).join('-'));if(locale){return locale;}if(next&&next.length>=j&&compareArrays(split,next,true)>=j-1){//the next array item is better than a shallower substring of this one
break;}j--;}i++;}return null;}function loadLocale(name){var oldLocale=null;// TODO: Find a better way to register and load all the locales in Node
if(!locales[name]&&typeof module!=='undefined'&&module&&module.exports){try{oldLocale=globalLocale._abbr;require('./locale/'+name);// because defineLocale currently also sets the global locale, we
// want to undo that for lazy loaded locales
getSetGlobalLocale(oldLocale);}catch(e){}}return locales[name];}// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
function getSetGlobalLocale(key,values){var data;if(key){if(isUndefined(values)){data=getLocale(key);}else{data=defineLocale(key,values);}if(data){// moment.duration._locale = moment._locale = data;
globalLocale=data;}}return globalLocale._abbr;}function defineLocale(name,config){if(config!==null){var parentConfig=baseConfig;config.abbr=name;if(locales[name]!=null){deprecateSimple('defineLocaleOverride','use moment.updateLocale(localeName, config) to change '+'an existing locale. moment.defineLocale(localeName, '+'config) should only be used for creating a new locale '+'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');parentConfig=locales[name]._config;}else if(config.parentLocale!=null){if(locales[config.parentLocale]!=null){parentConfig=locales[config.parentLocale]._config;}else{if(!localeFamilies[config.parentLocale]){localeFamilies[config.parentLocale]=[];}localeFamilies[config.parentLocale].push({name:name,config:config});return null;}}locales[name]=new Locale(mergeConfigs(parentConfig,config));if(localeFamilies[name]){localeFamilies[name].forEach(function(x){defineLocale(x.name,x.config);});}// backwards compat for now: also set the locale
// make sure we set the locale AFTER all child locales have been
// created, so we won't end up with the child locale set.
getSetGlobalLocale(name);return locales[name];}else{// useful for testing
delete locales[name];return null;}}function updateLocale(name,config){if(config!=null){var locale,parentConfig=baseConfig;// MERGE
if(locales[name]!=null){parentConfig=locales[name]._config;}config=mergeConfigs(parentConfig,config);locale=new Locale(config);locale.parentLocale=locales[name];locales[name]=locale;// backwards compat for now: also set the locale
getSetGlobalLocale(name);}else{// pass null for config to unupdate, useful for tests
if(locales[name]!=null){if(locales[name].parentLocale!=null){locales[name]=locales[name].parentLocale;}else if(locales[name]!=null){delete locales[name];}}}return locales[name];}// returns locale data
function getLocale(key){var locale;if(key&&key._locale&&key._locale._abbr){key=key._locale._abbr;}if(!key){return globalLocale;}if(!isArray(key)){//short-circuit everything else
locale=loadLocale(key);if(locale){return locale;}key=[key];}return chooseLocale(key);}function listLocales(){return keys$1(locales);}function checkOverflow(m){var overflow;var a=m._a;if(a&&getParsingFlags(m).overflow===-2){overflow=a[MONTH]<0||a[MONTH]>11?MONTH:a[DATE]<1||a[DATE]>daysInMonth(a[YEAR],a[MONTH])?DATE:a[HOUR]<0||a[HOUR]>24||a[HOUR]===24&&(a[MINUTE]!==0||a[SECOND]!==0||a[MILLISECOND]!==0)?HOUR:a[MINUTE]<0||a[MINUTE]>59?MINUTE:a[SECOND]<0||a[SECOND]>59?SECOND:a[MILLISECOND]<0||a[MILLISECOND]>999?MILLISECOND:-1;if(getParsingFlags(m)._overflowDayOfYear&&(overflow<YEAR||overflow>DATE)){overflow=DATE;}if(getParsingFlags(m)._overflowWeeks&&overflow===-1){overflow=WEEK;}if(getParsingFlags(m)._overflowWeekday&&overflow===-1){overflow=WEEKDAY;}getParsingFlags(m).overflow=overflow;}return m;}// iso 8601 regex
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
var extendedIsoRegex=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;var basicIsoRegex=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;var tzRegex=/Z|[+-]\d\d(?::?\d\d)?/;var isoDates=[['YYYYYY-MM-DD',/[+-]\d{6}-\d\d-\d\d/],['YYYY-MM-DD',/\d{4}-\d\d-\d\d/],['GGGG-[W]WW-E',/\d{4}-W\d\d-\d/],['GGGG-[W]WW',/\d{4}-W\d\d/,false],['YYYY-DDD',/\d{4}-\d{3}/],['YYYY-MM',/\d{4}-\d\d/,false],['YYYYYYMMDD',/[+-]\d{10}/],['YYYYMMDD',/\d{8}/],// YYYYMM is NOT allowed by the standard
['GGGG[W]WWE',/\d{4}W\d{3}/],['GGGG[W]WW',/\d{4}W\d{2}/,false],['YYYYDDD',/\d{7}/]];// iso time formats and regexes
var isoTimes=[['HH:mm:ss.SSSS',/\d\d:\d\d:\d\d\.\d+/],['HH:mm:ss,SSSS',/\d\d:\d\d:\d\d,\d+/],['HH:mm:ss',/\d\d:\d\d:\d\d/],['HH:mm',/\d\d:\d\d/],['HHmmss.SSSS',/\d\d\d\d\d\d\.\d+/],['HHmmss,SSSS',/\d\d\d\d\d\d,\d+/],['HHmmss',/\d\d\d\d\d\d/],['HHmm',/\d\d\d\d/],['HH',/\d\d/]];var aspNetJsonRegex=/^\/?Date\((\-?\d+)/i;// date from iso format
function configFromISO(config){var i,l,string=config._i,match=extendedIsoRegex.exec(string)||basicIsoRegex.exec(string),allowTime,dateFormat,timeFormat,tzFormat;if(match){getParsingFlags(config).iso=true;for(i=0,l=isoDates.length;i<l;i++){if(isoDates[i][1].exec(match[1])){dateFormat=isoDates[i][0];allowTime=isoDates[i][2]!==false;break;}}if(dateFormat==null){config._isValid=false;return;}if(match[3]){for(i=0,l=isoTimes.length;i<l;i++){if(isoTimes[i][1].exec(match[3])){// match[2] should be 'T' or space
timeFormat=(match[2]||' ')+isoTimes[i][0];break;}}if(timeFormat==null){config._isValid=false;return;}}if(!allowTime&&timeFormat!=null){config._isValid=false;return;}if(match[4]){if(tzRegex.exec(match[4])){tzFormat='Z';}else{config._isValid=false;return;}}config._f=dateFormat+(timeFormat||'')+(tzFormat||'');configFromStringAndFormat(config);}else{config._isValid=false;}}// date from iso format or fallback
function configFromString(config){var matched=aspNetJsonRegex.exec(config._i);if(matched!==null){config._d=new Date(+matched[1]);return;}configFromISO(config);if(config._isValid===false){delete config._isValid;hooks.createFromInputFallback(config);}}hooks.createFromInputFallback=deprecate('value provided is not in a recognized ISO format. moment construction falls back to js Date(), '+'which is not reliable across all browsers and versions. Non ISO date formats are '+'discouraged and will be removed in an upcoming major release. Please refer to '+'http://momentjs.com/guides/#/warnings/js-date/ for more info.',function(config){config._d=new Date(config._i+(config._useUTC?' UTC':''));});// Pick the first defined of two or three arguments.
function defaults(a,b,c){if(a!=null){return a;}if(b!=null){return b;}return c;}function currentDateArray(config){// hooks is actually the exported moment object
var nowValue=new Date(hooks.now());if(config._useUTC){return[nowValue.getUTCFullYear(),nowValue.getUTCMonth(),nowValue.getUTCDate()];}return[nowValue.getFullYear(),nowValue.getMonth(),nowValue.getDate()];}// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
function configFromArray(config){var i,date,input=[],currentDate,yearToUse;if(config._d){return;}currentDate=currentDateArray(config);//compute day of the year from weeks and weekdays
if(config._w&&config._a[DATE]==null&&config._a[MONTH]==null){dayOfYearFromWeekInfo(config);}//if the day of the year is set, figure out what it is
if(config._dayOfYear){yearToUse=defaults(config._a[YEAR],currentDate[YEAR]);if(config._dayOfYear>daysInYear(yearToUse)){getParsingFlags(config)._overflowDayOfYear=true;}date=createUTCDate(yearToUse,0,config._dayOfYear);config._a[MONTH]=date.getUTCMonth();config._a[DATE]=date.getUTCDate();}// Default to current date.
// * if no year, month, day of month are given, default to today
// * if day of month is given, default month and year
// * if month is given, default only year
// * if year is given, don't default anything
for(i=0;i<3&&config._a[i]==null;++i){config._a[i]=input[i]=currentDate[i];}// Zero out whatever was not defaulted, including time
for(;i<7;i++){config._a[i]=input[i]=config._a[i]==null?i===2?1:0:config._a[i];}// Check for 24:00:00.000
if(config._a[HOUR]===24&&config._a[MINUTE]===0&&config._a[SECOND]===0&&config._a[MILLISECOND]===0){config._nextDay=true;config._a[HOUR]=0;}config._d=(config._useUTC?createUTCDate:createDate).apply(null,input);// Apply timezone offset from input. The actual utcOffset can be changed
// with parseZone.
if(config._tzm!=null){config._d.setUTCMinutes(config._d.getUTCMinutes()-config._tzm);}if(config._nextDay){config._a[HOUR]=24;}}function dayOfYearFromWeekInfo(config){var w,weekYear,week,weekday,dow,doy,temp,weekdayOverflow;w=config._w;if(w.GG!=null||w.W!=null||w.E!=null){dow=1;doy=4;// TODO: We need to take the current isoWeekYear, but that depends on
// how we interpret now (local, utc, fixed offset). So create
// a now version of current config (take local/utc/offset flags, and
// create now).
weekYear=defaults(w.GG,config._a[YEAR],weekOfYear(createLocal(),1,4).year);week=defaults(w.W,1);weekday=defaults(w.E,1);if(weekday<1||weekday>7){weekdayOverflow=true;}}else{dow=config._locale._week.dow;doy=config._locale._week.doy;var curWeek=weekOfYear(createLocal(),dow,doy);weekYear=defaults(w.gg,config._a[YEAR],curWeek.year);// Default to current week.
week=defaults(w.w,curWeek.week);if(w.d!=null){// weekday -- low day numbers are considered next week
weekday=w.d;if(weekday<0||weekday>6){weekdayOverflow=true;}}else if(w.e!=null){// local weekday -- counting starts from begining of week
weekday=w.e+dow;if(w.e<0||w.e>6){weekdayOverflow=true;}}else{// default to begining of week
weekday=dow;}}if(week<1||week>weeksInYear(weekYear,dow,doy)){getParsingFlags(config)._overflowWeeks=true;}else if(weekdayOverflow!=null){getParsingFlags(config)._overflowWeekday=true;}else{temp=dayOfYearFromWeeks(weekYear,week,weekday,dow,doy);config._a[YEAR]=temp.year;config._dayOfYear=temp.dayOfYear;}}// constant that refers to the ISO standard
hooks.ISO_8601=function(){};// date from string and format string
function configFromStringAndFormat(config){// TODO: Move this to another part of the creation flow to prevent circular deps
if(config._f===hooks.ISO_8601){configFromISO(config);return;}config._a=[];getParsingFlags(config).empty=true;// This array is used to make a Date, either with `new Date` or `Date.UTC`
var string=''+config._i,i,parsedInput,tokens,token,skipped,stringLength=string.length,totalParsedInputLength=0;tokens=expandFormat(config._f,config._locale).match(formattingTokens)||[];for(i=0;i<tokens.length;i++){token=tokens[i];parsedInput=(string.match(getParseRegexForToken(token,config))||[])[0];// console.log('token', token, 'parsedInput', parsedInput,
//         'regex', getParseRegexForToken(token, config));
if(parsedInput){skipped=string.substr(0,string.indexOf(parsedInput));if(skipped.length>0){getParsingFlags(config).unusedInput.push(skipped);}string=string.slice(string.indexOf(parsedInput)+parsedInput.length);totalParsedInputLength+=parsedInput.length;}// don't parse if it's not a known token
if(formatTokenFunctions[token]){if(parsedInput){getParsingFlags(config).empty=false;}else{getParsingFlags(config).unusedTokens.push(token);}addTimeToArrayFromToken(token,parsedInput,config);}else if(config._strict&&!parsedInput){getParsingFlags(config).unusedTokens.push(token);}}// add remaining unparsed input length to the string
getParsingFlags(config).charsLeftOver=stringLength-totalParsedInputLength;if(string.length>0){getParsingFlags(config).unusedInput.push(string);}// clear _12h flag if hour is <= 12
if(config._a[HOUR]<=12&&getParsingFlags(config).bigHour===true&&config._a[HOUR]>0){getParsingFlags(config).bigHour=undefined;}getParsingFlags(config).parsedDateParts=config._a.slice(0);getParsingFlags(config).meridiem=config._meridiem;// handle meridiem
config._a[HOUR]=meridiemFixWrap(config._locale,config._a[HOUR],config._meridiem);configFromArray(config);checkOverflow(config);}function meridiemFixWrap(locale,hour,meridiem){var isPm;if(meridiem==null){// nothing to do
return hour;}if(locale.meridiemHour!=null){return locale.meridiemHour(hour,meridiem);}else if(locale.isPM!=null){// Fallback
isPm=locale.isPM(meridiem);if(isPm&&hour<12){hour+=12;}if(!isPm&&hour===12){hour=0;}return hour;}else{// this is not supposed to happen
return hour;}}// date from string and array of format strings
function configFromStringAndArray(config){var tempConfig,bestMoment,scoreToBeat,i,currentScore;if(config._f.length===0){getParsingFlags(config).invalidFormat=true;config._d=new Date(NaN);return;}for(i=0;i<config._f.length;i++){currentScore=0;tempConfig=copyConfig({},config);if(config._useUTC!=null){tempConfig._useUTC=config._useUTC;}tempConfig._f=config._f[i];configFromStringAndFormat(tempConfig);if(!isValid(tempConfig)){continue;}// if there is any input that was not parsed add a penalty for that format
currentScore+=getParsingFlags(tempConfig).charsLeftOver;//or tokens
currentScore+=getParsingFlags(tempConfig).unusedTokens.length*10;getParsingFlags(tempConfig).score=currentScore;if(scoreToBeat==null||currentScore<scoreToBeat){scoreToBeat=currentScore;bestMoment=tempConfig;}}extend(config,bestMoment||tempConfig);}function configFromObject(config){if(config._d){return;}var i=normalizeObjectUnits(config._i);config._a=map([i.year,i.month,i.day||i.date,i.hour,i.minute,i.second,i.millisecond],function(obj){return obj&&parseInt(obj,10);});configFromArray(config);}function createFromConfig(config){var res=new Moment(checkOverflow(prepareConfig(config)));if(res._nextDay){// Adding is smart enough around DST
res.add(1,'d');res._nextDay=undefined;}return res;}function prepareConfig(config){var input=config._i,format=config._f;config._locale=config._locale||getLocale(config._l);if(input===null||format===undefined&&input===''){return createInvalid({nullInput:true});}if(typeof input==='string'){config._i=input=config._locale.preparse(input);}if(isMoment(input)){return new Moment(checkOverflow(input));}else if(isDate(input)){config._d=input;}else if(isArray(format)){configFromStringAndArray(config);}else if(format){configFromStringAndFormat(config);}else{configFromInput(config);}if(!isValid(config)){config._d=null;}return config;}function configFromInput(config){var input=config._i;if(input===undefined){config._d=new Date(hooks.now());}else if(isDate(input)){config._d=new Date(input.valueOf());}else if(typeof input==='string'){configFromString(config);}else if(isArray(input)){config._a=map(input.slice(0),function(obj){return parseInt(obj,10);});configFromArray(config);}else if((typeof input==='undefined'?'undefined':_typeof(input))==='object'){configFromObject(config);}else if(isNumber(input)){// from milliseconds
config._d=new Date(input);}else{hooks.createFromInputFallback(config);}}function createLocalOrUTC(input,format,locale,strict,isUTC){var c={};if(locale===true||locale===false){strict=locale;locale=undefined;}if(isObject(input)&&isObjectEmpty(input)||isArray(input)&&input.length===0){input=undefined;}// object construction must be done this way.
// https://github.com/moment/moment/issues/1423
c._isAMomentObject=true;c._useUTC=c._isUTC=isUTC;c._l=locale;c._i=input;c._f=format;c._strict=strict;return createFromConfig(c);}function createLocal(input,format,locale,strict){return createLocalOrUTC(input,format,locale,strict,false);}var prototypeMin=deprecate('moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',function(){var other=createLocal.apply(null,arguments);if(this.isValid()&&other.isValid()){return other<this?this:other;}else{return createInvalid();}});var prototypeMax=deprecate('moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',function(){var other=createLocal.apply(null,arguments);if(this.isValid()&&other.isValid()){return other>this?this:other;}else{return createInvalid();}});// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
function pickBy(fn,moments){var res,i;if(moments.length===1&&isArray(moments[0])){moments=moments[0];}if(!moments.length){return createLocal();}res=moments[0];for(i=1;i<moments.length;++i){if(!moments[i].isValid()||moments[i][fn](res)){res=moments[i];}}return res;}// TODO: Use [].sort instead?
function min(){var args=[].slice.call(arguments,0);return pickBy('isBefore',args);}function max(){var args=[].slice.call(arguments,0);return pickBy('isAfter',args);}var now=function now(){return Date.now?Date.now():+new Date();};function Duration(duration){var normalizedInput=normalizeObjectUnits(duration),years=normalizedInput.year||0,quarters=normalizedInput.quarter||0,months=normalizedInput.month||0,weeks=normalizedInput.week||0,days=normalizedInput.day||0,hours=normalizedInput.hour||0,minutes=normalizedInput.minute||0,seconds=normalizedInput.second||0,milliseconds=normalizedInput.millisecond||0;// representation for dateAddRemove
this._milliseconds=+milliseconds+seconds*1e3+// 1000
minutes*6e4+// 1000 * 60
hours*1000*60*60;//using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
// Because of dateAddRemove treats 24 hours as different from a
// day when working around DST, we need to store them separately
this._days=+days+weeks*7;// It is impossible translate months into days without knowing
// which months you are are talking about, so we have to store
// it separately.
this._months=+months+quarters*3+years*12;this._data={};this._locale=getLocale();this._bubble();}function isDuration(obj){return obj instanceof Duration;}function absRound(number){if(number<0){return Math.round(-1*number)*-1;}else{return Math.round(number);}}// FORMATTING
function offset(token,separator){addFormatToken(token,0,0,function(){var offset=this.utcOffset();var sign='+';if(offset<0){offset=-offset;sign='-';}return sign+zeroFill(~~(offset/60),2)+separator+zeroFill(~~offset%60,2);});}offset('Z',':');offset('ZZ','');// PARSING
addRegexToken('Z',matchShortOffset);addRegexToken('ZZ',matchShortOffset);addParseToken(['Z','ZZ'],function(input,array,config){config._useUTC=true;config._tzm=offsetFromString(matchShortOffset,input);});// HELPERS
// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
var chunkOffset=/([\+\-]|\d\d)/gi;function offsetFromString(matcher,string){var matches=(string||'').match(matcher);if(matches===null){return null;}var chunk=matches[matches.length-1]||[];var parts=(chunk+'').match(chunkOffset)||['-',0,0];var minutes=+(parts[1]*60)+toInt(parts[2]);return minutes===0?0:parts[0]==='+'?minutes:-minutes;}// Return a moment from input, that is local/utc/zone equivalent to model.
function cloneWithOffset(input,model){var res,diff;if(model._isUTC){res=model.clone();diff=(isMoment(input)||isDate(input)?input.valueOf():createLocal(input).valueOf())-res.valueOf();// Use low-level api, because this fn is low-level api.
res._d.setTime(res._d.valueOf()+diff);hooks.updateOffset(res,false);return res;}else{return createLocal(input).local();}}function getDateOffset(m){// On Firefox.24 Date#getTimezoneOffset returns a floating point.
// https://github.com/moment/moment/pull/1871
return-Math.round(m._d.getTimezoneOffset()/15)*15;}// HOOKS
// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
hooks.updateOffset=function(){};// MOMENTS
// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
function getSetOffset(input,keepLocalTime){var offset=this._offset||0,localAdjust;if(!this.isValid()){return input!=null?this:NaN;}if(input!=null){if(typeof input==='string'){input=offsetFromString(matchShortOffset,input);if(input===null){return this;}}else if(Math.abs(input)<16){input=input*60;}if(!this._isUTC&&keepLocalTime){localAdjust=getDateOffset(this);}this._offset=input;this._isUTC=true;if(localAdjust!=null){this.add(localAdjust,'m');}if(offset!==input){if(!keepLocalTime||this._changeInProgress){addSubtract(this,createDuration(input-offset,'m'),1,false);}else if(!this._changeInProgress){this._changeInProgress=true;hooks.updateOffset(this,true);this._changeInProgress=null;}}return this;}else{return this._isUTC?offset:getDateOffset(this);}}function getSetZone(input,keepLocalTime){if(input!=null){if(typeof input!=='string'){input=-input;}this.utcOffset(input,keepLocalTime);return this;}else{return-this.utcOffset();}}function setOffsetToUTC(keepLocalTime){return this.utcOffset(0,keepLocalTime);}function setOffsetToLocal(keepLocalTime){if(this._isUTC){this.utcOffset(0,keepLocalTime);this._isUTC=false;if(keepLocalTime){this.subtract(getDateOffset(this),'m');}}return this;}function setOffsetToParsedOffset(){if(this._tzm!=null){this.utcOffset(this._tzm);}else if(typeof this._i==='string'){var tZone=offsetFromString(matchOffset,this._i);if(tZone!=null){this.utcOffset(tZone);}else{this.utcOffset(0,true);}}return this;}function hasAlignedHourOffset(input){if(!this.isValid()){return false;}input=input?createLocal(input).utcOffset():0;return(this.utcOffset()-input)%60===0;}function isDaylightSavingTime(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset();}function isDaylightSavingTimeShifted(){if(!isUndefined(this._isDSTShifted)){return this._isDSTShifted;}var c={};copyConfig(c,this);c=prepareConfig(c);if(c._a){var other=c._isUTC?createUTC(c._a):createLocal(c._a);this._isDSTShifted=this.isValid()&&compareArrays(c._a,other.toArray())>0;}else{this._isDSTShifted=false;}return this._isDSTShifted;}function isLocal(){return this.isValid()?!this._isUTC:false;}function isUtcOffset(){return this.isValid()?this._isUTC:false;}function isUtc(){return this.isValid()?this._isUTC&&this._offset===0:false;}// ASP.NET json date format regex
var aspNetRegex=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
// and further modified to allow for strings containing both week and day
var isoRegex=/^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;function createDuration(input,key){var duration=input,// matching against regexp is expensive, do it on demand
match=null,sign,ret,diffRes;if(isDuration(input)){duration={ms:input._milliseconds,d:input._days,M:input._months};}else if(isNumber(input)){duration={};if(key){duration[key]=input;}else{duration.milliseconds=input;}}else if(!!(match=aspNetRegex.exec(input))){sign=match[1]==='-'?-1:1;duration={y:0,d:toInt(match[DATE])*sign,h:toInt(match[HOUR])*sign,m:toInt(match[MINUTE])*sign,s:toInt(match[SECOND])*sign,ms:toInt(absRound(match[MILLISECOND]*1000))*sign// the millisecond decimal point is included in the match
};}else if(!!(match=isoRegex.exec(input))){sign=match[1]==='-'?-1:1;duration={y:parseIso(match[2],sign),M:parseIso(match[3],sign),w:parseIso(match[4],sign),d:parseIso(match[5],sign),h:parseIso(match[6],sign),m:parseIso(match[7],sign),s:parseIso(match[8],sign)};}else if(duration==null){// checks for null or undefined
duration={};}else if((typeof duration==='undefined'?'undefined':_typeof(duration))==='object'&&('from'in duration||'to'in duration)){diffRes=momentsDifference(createLocal(duration.from),createLocal(duration.to));duration={};duration.ms=diffRes.milliseconds;duration.M=diffRes.months;}ret=new Duration(duration);if(isDuration(input)&&hasOwnProp(input,'_locale')){ret._locale=input._locale;}return ret;}createDuration.fn=Duration.prototype;function parseIso(inp,sign){// We'd normally use ~~inp for this, but unfortunately it also
// converts floats to ints.
// inp may be undefined, so careful calling replace on it.
var res=inp&&parseFloat(inp.replace(',','.'));// apply sign while we're at it
return(isNaN(res)?0:res)*sign;}function positiveMomentsDifference(base,other){var res={milliseconds:0,months:0};res.months=other.month()-base.month()+(other.year()-base.year())*12;if(base.clone().add(res.months,'M').isAfter(other)){--res.months;}res.milliseconds=+other-+base.clone().add(res.months,'M');return res;}function momentsDifference(base,other){var res;if(!(base.isValid()&&other.isValid())){return{milliseconds:0,months:0};}other=cloneWithOffset(other,base);if(base.isBefore(other)){res=positiveMomentsDifference(base,other);}else{res=positiveMomentsDifference(other,base);res.milliseconds=-res.milliseconds;res.months=-res.months;}return res;}// TODO: remove 'name' arg after deprecation is removed
function createAdder(direction,name){return function(val,period){var dur,tmp;//invert the arguments, but complain about it
if(period!==null&&!isNaN(+period)){deprecateSimple(name,'moment().'+name+'(period, number) is deprecated. Please use moment().'+name+'(number, period). '+'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');tmp=val;val=period;period=tmp;}val=typeof val==='string'?+val:val;dur=createDuration(val,period);addSubtract(this,dur,direction);return this;};}function addSubtract(mom,duration,isAdding,updateOffset){var milliseconds=duration._milliseconds,days=absRound(duration._days),months=absRound(duration._months);if(!mom.isValid()){// No op
return;}updateOffset=updateOffset==null?true:updateOffset;if(milliseconds){mom._d.setTime(mom._d.valueOf()+milliseconds*isAdding);}if(days){set$1(mom,'Date',get(mom,'Date')+days*isAdding);}if(months){setMonth(mom,get(mom,'Month')+months*isAdding);}if(updateOffset){hooks.updateOffset(mom,days||months);}}var add=createAdder(1,'add');var subtract=createAdder(-1,'subtract');function getCalendarFormat(myMoment,now){var diff=myMoment.diff(now,'days',true);return diff<-6?'sameElse':diff<-1?'lastWeek':diff<0?'lastDay':diff<1?'sameDay':diff<2?'nextDay':diff<7?'nextWeek':'sameElse';}function calendar$1(time,formats){// We want to compare the start of today, vs this.
// Getting start-of-today depends on whether we're local/utc/offset or not.
var now=time||createLocal(),sod=cloneWithOffset(now,this).startOf('day'),format=hooks.calendarFormat(this,sod)||'sameElse';var output=formats&&(isFunction(formats[format])?formats[format].call(this,now):formats[format]);return this.format(output||this.localeData().calendar(format,this,createLocal(now)));}function clone(){return new Moment(this);}function isAfter(input,units){var localInput=isMoment(input)?input:createLocal(input);if(!(this.isValid()&&localInput.isValid())){return false;}units=normalizeUnits(!isUndefined(units)?units:'millisecond');if(units==='millisecond'){return this.valueOf()>localInput.valueOf();}else{return localInput.valueOf()<this.clone().startOf(units).valueOf();}}function isBefore(input,units){var localInput=isMoment(input)?input:createLocal(input);if(!(this.isValid()&&localInput.isValid())){return false;}units=normalizeUnits(!isUndefined(units)?units:'millisecond');if(units==='millisecond'){return this.valueOf()<localInput.valueOf();}else{return this.clone().endOf(units).valueOf()<localInput.valueOf();}}function isBetween(from,to,units,inclusivity){inclusivity=inclusivity||'()';return(inclusivity[0]==='('?this.isAfter(from,units):!this.isBefore(from,units))&&(inclusivity[1]===')'?this.isBefore(to,units):!this.isAfter(to,units));}function isSame(input,units){var localInput=isMoment(input)?input:createLocal(input),inputMs;if(!(this.isValid()&&localInput.isValid())){return false;}units=normalizeUnits(units||'millisecond');if(units==='millisecond'){return this.valueOf()===localInput.valueOf();}else{inputMs=localInput.valueOf();return this.clone().startOf(units).valueOf()<=inputMs&&inputMs<=this.clone().endOf(units).valueOf();}}function isSameOrAfter(input,units){return this.isSame(input,units)||this.isAfter(input,units);}function isSameOrBefore(input,units){return this.isSame(input,units)||this.isBefore(input,units);}function diff(input,units,asFloat){var that,zoneDelta,delta,output;if(!this.isValid()){return NaN;}that=cloneWithOffset(input,this);if(!that.isValid()){return NaN;}zoneDelta=(that.utcOffset()-this.utcOffset())*6e4;units=normalizeUnits(units);if(units==='year'||units==='month'||units==='quarter'){output=monthDiff(this,that);if(units==='quarter'){output=output/3;}else if(units==='year'){output=output/12;}}else{delta=this-that;output=units==='second'?delta/1e3:// 1000
units==='minute'?delta/6e4:// 1000 * 60
units==='hour'?delta/36e5:// 1000 * 60 * 60
units==='day'?(delta-zoneDelta)/864e5:// 1000 * 60 * 60 * 24, negate dst
units==='week'?(delta-zoneDelta)/6048e5:// 1000 * 60 * 60 * 24 * 7, negate dst
delta;}return asFloat?output:absFloor(output);}function monthDiff(a,b){// difference in months
var wholeMonthDiff=(b.year()-a.year())*12+(b.month()-a.month()),// b is in (anchor - 1 month, anchor + 1 month)
anchor=a.clone().add(wholeMonthDiff,'months'),anchor2,adjust;if(b-anchor<0){anchor2=a.clone().add(wholeMonthDiff-1,'months');// linear across the month
adjust=(b-anchor)/(anchor-anchor2);}else{anchor2=a.clone().add(wholeMonthDiff+1,'months');// linear across the month
adjust=(b-anchor)/(anchor2-anchor);}//check for negative zero, return zero if negative zero
return-(wholeMonthDiff+adjust)||0;}hooks.defaultFormat='YYYY-MM-DDTHH:mm:ssZ';hooks.defaultFormatUtc='YYYY-MM-DDTHH:mm:ss[Z]';function toString(){return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');}function toISOString(){var m=this.clone().utc();if(0<m.year()&&m.year()<=9999){if(isFunction(Date.prototype.toISOString)){// native implementation is ~50x faster, use it when we can
return this.toDate().toISOString();}else{return formatMoment(m,'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');}}else{return formatMoment(m,'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');}}/**
 * Return a human readable representation of a moment that can
 * also be evaluated to get a new moment which is the same
 *
 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
 */function inspect(){if(!this.isValid()){return'moment.invalid(/* '+this._i+' */)';}var func='moment';var zone='';if(!this.isLocal()){func=this.utcOffset()===0?'moment.utc':'moment.parseZone';zone='Z';}var prefix='['+func+'("]';var year=0<this.year()&&this.year()<=9999?'YYYY':'YYYYYY';var datetime='-MM-DD[T]HH:mm:ss.SSS';var suffix=zone+'[")]';return this.format(prefix+year+datetime+suffix);}function format(inputString){if(!inputString){inputString=this.isUtc()?hooks.defaultFormatUtc:hooks.defaultFormat;}var output=formatMoment(this,inputString);return this.localeData().postformat(output);}function from(time,withoutSuffix){if(this.isValid()&&(isMoment(time)&&time.isValid()||createLocal(time).isValid())){return createDuration({to:this,from:time}).locale(this.locale()).humanize(!withoutSuffix);}else{return this.localeData().invalidDate();}}function fromNow(withoutSuffix){return this.from(createLocal(),withoutSuffix);}function to(time,withoutSuffix){if(this.isValid()&&(isMoment(time)&&time.isValid()||createLocal(time).isValid())){return createDuration({from:this,to:time}).locale(this.locale()).humanize(!withoutSuffix);}else{return this.localeData().invalidDate();}}function toNow(withoutSuffix){return this.to(createLocal(),withoutSuffix);}// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
function locale(key){var newLocaleData;if(key===undefined){return this._locale._abbr;}else{newLocaleData=getLocale(key);if(newLocaleData!=null){this._locale=newLocaleData;}return this;}}var lang=deprecate('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',function(key){if(key===undefined){return this.localeData();}else{return this.locale(key);}});function localeData(){return this._locale;}function startOf(units){units=normalizeUnits(units);// the following switch intentionally omits break keywords
// to utilize falling through the cases.
switch(units){case'year':this.month(0);/* falls through */case'quarter':case'month':this.date(1);/* falls through */case'week':case'isoWeek':case'day':case'date':this.hours(0);/* falls through */case'hour':this.minutes(0);/* falls through */case'minute':this.seconds(0);/* falls through */case'second':this.milliseconds(0);}// weeks are a special case
if(units==='week'){this.weekday(0);}if(units==='isoWeek'){this.isoWeekday(1);}// quarters are also special
if(units==='quarter'){this.month(Math.floor(this.month()/3)*3);}return this;}function endOf(units){units=normalizeUnits(units);if(units===undefined||units==='millisecond'){return this;}// 'date' is an alias for 'day', so it should be considered as such.
if(units==='date'){units='day';}return this.startOf(units).add(1,units==='isoWeek'?'week':units).subtract(1,'ms');}function valueOf(){return this._d.valueOf()-(this._offset||0)*60000;}function unix(){return Math.floor(this.valueOf()/1000);}function toDate(){return new Date(this.valueOf());}function toArray(){var m=this;return[m.year(),m.month(),m.date(),m.hour(),m.minute(),m.second(),m.millisecond()];}function toObject(){var m=this;return{years:m.year(),months:m.month(),date:m.date(),hours:m.hours(),minutes:m.minutes(),seconds:m.seconds(),milliseconds:m.milliseconds()};}function toJSON(){// new Date(NaN).toJSON() === null
return this.isValid()?this.toISOString():null;}function isValid$1(){return isValid(this);}function parsingFlags(){return extend({},getParsingFlags(this));}function invalidAt(){return getParsingFlags(this).overflow;}function creationData(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict};}// FORMATTING
addFormatToken(0,['gg',2],0,function(){return this.weekYear()%100;});addFormatToken(0,['GG',2],0,function(){return this.isoWeekYear()%100;});function addWeekYearFormatToken(token,getter){addFormatToken(0,[token,token.length],0,getter);}addWeekYearFormatToken('gggg','weekYear');addWeekYearFormatToken('ggggg','weekYear');addWeekYearFormatToken('GGGG','isoWeekYear');addWeekYearFormatToken('GGGGG','isoWeekYear');// ALIASES
addUnitAlias('weekYear','gg');addUnitAlias('isoWeekYear','GG');// PRIORITY
addUnitPriority('weekYear',1);addUnitPriority('isoWeekYear',1);// PARSING
addRegexToken('G',matchSigned);addRegexToken('g',matchSigned);addRegexToken('GG',match1to2,match2);addRegexToken('gg',match1to2,match2);addRegexToken('GGGG',match1to4,match4);addRegexToken('gggg',match1to4,match4);addRegexToken('GGGGG',match1to6,match6);addRegexToken('ggggg',match1to6,match6);addWeekParseToken(['gggg','ggggg','GGGG','GGGGG'],function(input,week,config,token){week[token.substr(0,2)]=toInt(input);});addWeekParseToken(['gg','GG'],function(input,week,config,token){week[token]=hooks.parseTwoDigitYear(input);});// MOMENTS
function getSetWeekYear(input){return getSetWeekYearHelper.call(this,input,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy);}function getSetISOWeekYear(input){return getSetWeekYearHelper.call(this,input,this.isoWeek(),this.isoWeekday(),1,4);}function getISOWeeksInYear(){return weeksInYear(this.year(),1,4);}function getWeeksInYear(){var weekInfo=this.localeData()._week;return weeksInYear(this.year(),weekInfo.dow,weekInfo.doy);}function getSetWeekYearHelper(input,week,weekday,dow,doy){var weeksTarget;if(input==null){return weekOfYear(this,dow,doy).year;}else{weeksTarget=weeksInYear(input,dow,doy);if(week>weeksTarget){week=weeksTarget;}return setWeekAll.call(this,input,week,weekday,dow,doy);}}function setWeekAll(weekYear,week,weekday,dow,doy){var dayOfYearData=dayOfYearFromWeeks(weekYear,week,weekday,dow,doy),date=createUTCDate(dayOfYearData.year,0,dayOfYearData.dayOfYear);this.year(date.getUTCFullYear());this.month(date.getUTCMonth());this.date(date.getUTCDate());return this;}// FORMATTING
addFormatToken('Q',0,'Qo','quarter');// ALIASES
addUnitAlias('quarter','Q');// PRIORITY
addUnitPriority('quarter',7);// PARSING
addRegexToken('Q',match1);addParseToken('Q',function(input,array){array[MONTH]=(toInt(input)-1)*3;});// MOMENTS
function getSetQuarter(input){return input==null?Math.ceil((this.month()+1)/3):this.month((input-1)*3+this.month()%3);}// FORMATTING
addFormatToken('D',['DD',2],'Do','date');// ALIASES
addUnitAlias('date','D');// PRIOROITY
addUnitPriority('date',9);// PARSING
addRegexToken('D',match1to2);addRegexToken('DD',match1to2,match2);addRegexToken('Do',function(isStrict,locale){return isStrict?locale._ordinalParse:locale._ordinalParseLenient;});addParseToken(['D','DD'],DATE);addParseToken('Do',function(input,array){array[DATE]=toInt(input.match(match1to2)[0],10);});// MOMENTS
var getSetDayOfMonth=makeGetSet('Date',true);// FORMATTING
addFormatToken('DDD',['DDDD',3],'DDDo','dayOfYear');// ALIASES
addUnitAlias('dayOfYear','DDD');// PRIORITY
addUnitPriority('dayOfYear',4);// PARSING
addRegexToken('DDD',match1to3);addRegexToken('DDDD',match3);addParseToken(['DDD','DDDD'],function(input,array,config){config._dayOfYear=toInt(input);});// HELPERS
// MOMENTS
function getSetDayOfYear(input){var dayOfYear=Math.round((this.clone().startOf('day')-this.clone().startOf('year'))/864e5)+1;return input==null?dayOfYear:this.add(input-dayOfYear,'d');}// FORMATTING
addFormatToken('m',['mm',2],0,'minute');// ALIASES
addUnitAlias('minute','m');// PRIORITY
addUnitPriority('minute',14);// PARSING
addRegexToken('m',match1to2);addRegexToken('mm',match1to2,match2);addParseToken(['m','mm'],MINUTE);// MOMENTS
var getSetMinute=makeGetSet('Minutes',false);// FORMATTING
addFormatToken('s',['ss',2],0,'second');// ALIASES
addUnitAlias('second','s');// PRIORITY
addUnitPriority('second',15);// PARSING
addRegexToken('s',match1to2);addRegexToken('ss',match1to2,match2);addParseToken(['s','ss'],SECOND);// MOMENTS
var getSetSecond=makeGetSet('Seconds',false);// FORMATTING
addFormatToken('S',0,0,function(){return~~(this.millisecond()/100);});addFormatToken(0,['SS',2],0,function(){return~~(this.millisecond()/10);});addFormatToken(0,['SSS',3],0,'millisecond');addFormatToken(0,['SSSS',4],0,function(){return this.millisecond()*10;});addFormatToken(0,['SSSSS',5],0,function(){return this.millisecond()*100;});addFormatToken(0,['SSSSSS',6],0,function(){return this.millisecond()*1000;});addFormatToken(0,['SSSSSSS',7],0,function(){return this.millisecond()*10000;});addFormatToken(0,['SSSSSSSS',8],0,function(){return this.millisecond()*100000;});addFormatToken(0,['SSSSSSSSS',9],0,function(){return this.millisecond()*1000000;});// ALIASES
addUnitAlias('millisecond','ms');// PRIORITY
addUnitPriority('millisecond',16);// PARSING
addRegexToken('S',match1to3,match1);addRegexToken('SS',match1to3,match2);addRegexToken('SSS',match1to3,match3);var token;for(token='SSSS';token.length<=9;token+='S'){addRegexToken(token,matchUnsigned);}function parseMs(input,array){array[MILLISECOND]=toInt(('0.'+input)*1000);}for(token='S';token.length<=9;token+='S'){addParseToken(token,parseMs);}// MOMENTS
var getSetMillisecond=makeGetSet('Milliseconds',false);// FORMATTING
addFormatToken('z',0,0,'zoneAbbr');addFormatToken('zz',0,0,'zoneName');// MOMENTS
function getZoneAbbr(){return this._isUTC?'UTC':'';}function getZoneName(){return this._isUTC?'Coordinated Universal Time':'';}var proto=Moment.prototype;proto.add=add;proto.calendar=calendar$1;proto.clone=clone;proto.diff=diff;proto.endOf=endOf;proto.format=format;proto.from=from;proto.fromNow=fromNow;proto.to=to;proto.toNow=toNow;proto.get=stringGet;proto.invalidAt=invalidAt;proto.isAfter=isAfter;proto.isBefore=isBefore;proto.isBetween=isBetween;proto.isSame=isSame;proto.isSameOrAfter=isSameOrAfter;proto.isSameOrBefore=isSameOrBefore;proto.isValid=isValid$1;proto.lang=lang;proto.locale=locale;proto.localeData=localeData;proto.max=prototypeMax;proto.min=prototypeMin;proto.parsingFlags=parsingFlags;proto.set=stringSet;proto.startOf=startOf;proto.subtract=subtract;proto.toArray=toArray;proto.toObject=toObject;proto.toDate=toDate;proto.toISOString=toISOString;proto.inspect=inspect;proto.toJSON=toJSON;proto.toString=toString;proto.unix=unix;proto.valueOf=valueOf;proto.creationData=creationData;// Year
proto.year=getSetYear;proto.isLeapYear=getIsLeapYear;// Week Year
proto.weekYear=getSetWeekYear;proto.isoWeekYear=getSetISOWeekYear;// Quarter
proto.quarter=proto.quarters=getSetQuarter;// Month
proto.month=getSetMonth;proto.daysInMonth=getDaysInMonth;// Week
proto.week=proto.weeks=getSetWeek;proto.isoWeek=proto.isoWeeks=getSetISOWeek;proto.weeksInYear=getWeeksInYear;proto.isoWeeksInYear=getISOWeeksInYear;// Day
proto.date=getSetDayOfMonth;proto.day=proto.days=getSetDayOfWeek;proto.weekday=getSetLocaleDayOfWeek;proto.isoWeekday=getSetISODayOfWeek;proto.dayOfYear=getSetDayOfYear;// Hour
proto.hour=proto.hours=getSetHour;// Minute
proto.minute=proto.minutes=getSetMinute;// Second
proto.second=proto.seconds=getSetSecond;// Millisecond
proto.millisecond=proto.milliseconds=getSetMillisecond;// Offset
proto.utcOffset=getSetOffset;proto.utc=setOffsetToUTC;proto.local=setOffsetToLocal;proto.parseZone=setOffsetToParsedOffset;proto.hasAlignedHourOffset=hasAlignedHourOffset;proto.isDST=isDaylightSavingTime;proto.isLocal=isLocal;proto.isUtcOffset=isUtcOffset;proto.isUtc=isUtc;proto.isUTC=isUtc;// Timezone
proto.zoneAbbr=getZoneAbbr;proto.zoneName=getZoneName;// Deprecations
proto.dates=deprecate('dates accessor is deprecated. Use date instead.',getSetDayOfMonth);proto.months=deprecate('months accessor is deprecated. Use month instead',getSetMonth);proto.years=deprecate('years accessor is deprecated. Use year instead',getSetYear);proto.zone=deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/',getSetZone);proto.isDSTShifted=deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information',isDaylightSavingTimeShifted);function createUnix(input){return createLocal(input*1000);}function createInZone(){return createLocal.apply(null,arguments).parseZone();}function preParsePostFormat(string){return string;}var proto$1=Locale.prototype;proto$1.calendar=calendar;proto$1.longDateFormat=longDateFormat;proto$1.invalidDate=invalidDate;proto$1.ordinal=ordinal;proto$1.preparse=preParsePostFormat;proto$1.postformat=preParsePostFormat;proto$1.relativeTime=relativeTime;proto$1.pastFuture=pastFuture;proto$1.set=set;// Month
proto$1.months=localeMonths;proto$1.monthsShort=localeMonthsShort;proto$1.monthsParse=localeMonthsParse;proto$1.monthsRegex=monthsRegex;proto$1.monthsShortRegex=monthsShortRegex;// Week
proto$1.week=localeWeek;proto$1.firstDayOfYear=localeFirstDayOfYear;proto$1.firstDayOfWeek=localeFirstDayOfWeek;// Day of Week
proto$1.weekdays=localeWeekdays;proto$1.weekdaysMin=localeWeekdaysMin;proto$1.weekdaysShort=localeWeekdaysShort;proto$1.weekdaysParse=localeWeekdaysParse;proto$1.weekdaysRegex=weekdaysRegex;proto$1.weekdaysShortRegex=weekdaysShortRegex;proto$1.weekdaysMinRegex=weekdaysMinRegex;// Hours
proto$1.isPM=localeIsPM;proto$1.meridiem=localeMeridiem;function get$1(format,index,field,setter){var locale=getLocale();var utc=createUTC().set(setter,index);return locale[field](utc,format);}function listMonthsImpl(format,index,field){if(isNumber(format)){index=format;format=undefined;}format=format||'';if(index!=null){return get$1(format,index,field,'month');}var i;var out=[];for(i=0;i<12;i++){out[i]=get$1(format,i,field,'month');}return out;}// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
function listWeekdaysImpl(localeSorted,format,index,field){if(typeof localeSorted==='boolean'){if(isNumber(format)){index=format;format=undefined;}format=format||'';}else{format=localeSorted;index=format;localeSorted=false;if(isNumber(format)){index=format;format=undefined;}format=format||'';}var locale=getLocale(),shift=localeSorted?locale._week.dow:0;if(index!=null){return get$1(format,(index+shift)%7,field,'day');}var i;var out=[];for(i=0;i<7;i++){out[i]=get$1(format,(i+shift)%7,field,'day');}return out;}function listMonths(format,index){return listMonthsImpl(format,index,'months');}function listMonthsShort(format,index){return listMonthsImpl(format,index,'monthsShort');}function listWeekdays(localeSorted,format,index){return listWeekdaysImpl(localeSorted,format,index,'weekdays');}function listWeekdaysShort(localeSorted,format,index){return listWeekdaysImpl(localeSorted,format,index,'weekdaysShort');}function listWeekdaysMin(localeSorted,format,index){return listWeekdaysImpl(localeSorted,format,index,'weekdaysMin');}getSetGlobalLocale('en',{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function ordinal(number){var b=number%10,output=toInt(number%100/10)===1?'th':b===1?'st':b===2?'nd':b===3?'rd':'th';return number+output;}});// Side effect imports
hooks.lang=deprecate('moment.lang is deprecated. Use moment.locale instead.',getSetGlobalLocale);hooks.langData=deprecate('moment.langData is deprecated. Use moment.localeData instead.',getLocale);var mathAbs=Math.abs;function abs(){var data=this._data;this._milliseconds=mathAbs(this._milliseconds);this._days=mathAbs(this._days);this._months=mathAbs(this._months);data.milliseconds=mathAbs(data.milliseconds);data.seconds=mathAbs(data.seconds);data.minutes=mathAbs(data.minutes);data.hours=mathAbs(data.hours);data.months=mathAbs(data.months);data.years=mathAbs(data.years);return this;}function addSubtract$1(duration,input,value,direction){var other=createDuration(input,value);duration._milliseconds+=direction*other._milliseconds;duration._days+=direction*other._days;duration._months+=direction*other._months;return duration._bubble();}// supports only 2.0-style add(1, 's') or add(duration)
function add$1(input,value){return addSubtract$1(this,input,value,1);}// supports only 2.0-style subtract(1, 's') or subtract(duration)
function subtract$1(input,value){return addSubtract$1(this,input,value,-1);}function absCeil(number){if(number<0){return Math.floor(number);}else{return Math.ceil(number);}}function bubble(){var milliseconds=this._milliseconds;var days=this._days;var months=this._months;var data=this._data;var seconds,minutes,hours,years,monthsFromDays;// if we have a mix of positive and negative values, bubble down first
// check: https://github.com/moment/moment/issues/2166
if(!(milliseconds>=0&&days>=0&&months>=0||milliseconds<=0&&days<=0&&months<=0)){milliseconds+=absCeil(monthsToDays(months)+days)*864e5;days=0;months=0;}// The following code bubbles up values, see the tests for
// examples of what that means.
data.milliseconds=milliseconds%1000;seconds=absFloor(milliseconds/1000);data.seconds=seconds%60;minutes=absFloor(seconds/60);data.minutes=minutes%60;hours=absFloor(minutes/60);data.hours=hours%24;days+=absFloor(hours/24);// convert days to months
monthsFromDays=absFloor(daysToMonths(days));months+=monthsFromDays;days-=absCeil(monthsToDays(monthsFromDays));// 12 months -> 1 year
years=absFloor(months/12);months%=12;data.days=days;data.months=months;data.years=years;return this;}function daysToMonths(days){// 400 years have 146097 days (taking into account leap year rules)
// 400 years have 12 months === 4800
return days*4800/146097;}function monthsToDays(months){// the reverse of daysToMonths
return months*146097/4800;}function as(units){var days;var months;var milliseconds=this._milliseconds;units=normalizeUnits(units);if(units==='month'||units==='year'){days=this._days+milliseconds/864e5;months=this._months+daysToMonths(days);return units==='month'?months:months/12;}else{// handle milliseconds separately because of floating point math errors (issue #1867)
days=this._days+Math.round(monthsToDays(this._months));switch(units){case'week':return days/7+milliseconds/6048e5;case'day':return days+milliseconds/864e5;case'hour':return days*24+milliseconds/36e5;case'minute':return days*1440+milliseconds/6e4;case'second':return days*86400+milliseconds/1000;// Math.floor prevents floating point math errors here
case'millisecond':return Math.floor(days*864e5)+milliseconds;default:throw new Error('Unknown unit '+units);}}}// TODO: Use this.as('ms')?
function valueOf$1(){return this._milliseconds+this._days*864e5+this._months%12*2592e6+toInt(this._months/12)*31536e6;}function makeAs(alias){return function(){return this.as(alias);};}var asMilliseconds=makeAs('ms');var asSeconds=makeAs('s');var asMinutes=makeAs('m');var asHours=makeAs('h');var asDays=makeAs('d');var asWeeks=makeAs('w');var asMonths=makeAs('M');var asYears=makeAs('y');function get$2(units){units=normalizeUnits(units);return this[units+'s']();}function makeGetter(name){return function(){return this._data[name];};}var milliseconds=makeGetter('milliseconds');var seconds=makeGetter('seconds');var minutes=makeGetter('minutes');var hours=makeGetter('hours');var days=makeGetter('days');var months=makeGetter('months');var years=makeGetter('years');function weeks(){return absFloor(this.days()/7);}var round=Math.round;var thresholds={s:45,// seconds to minute
m:45,// minutes to hour
h:22,// hours to day
d:26,// days to month
M:11// months to year
};// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function substituteTimeAgo(string,number,withoutSuffix,isFuture,locale){return locale.relativeTime(number||1,!!withoutSuffix,string,isFuture);}function relativeTime$1(posNegDuration,withoutSuffix,locale){var duration=createDuration(posNegDuration).abs();var seconds=round(duration.as('s'));var minutes=round(duration.as('m'));var hours=round(duration.as('h'));var days=round(duration.as('d'));var months=round(duration.as('M'));var years=round(duration.as('y'));var a=seconds<thresholds.s&&['s',seconds]||minutes<=1&&['m']||minutes<thresholds.m&&['mm',minutes]||hours<=1&&['h']||hours<thresholds.h&&['hh',hours]||days<=1&&['d']||days<thresholds.d&&['dd',days]||months<=1&&['M']||months<thresholds.M&&['MM',months]||years<=1&&['y']||['yy',years];a[2]=withoutSuffix;a[3]=+posNegDuration>0;a[4]=locale;return substituteTimeAgo.apply(null,a);}// This function allows you to set the rounding function for relative time strings
function getSetRelativeTimeRounding(roundingFunction){if(roundingFunction===undefined){return round;}if(typeof roundingFunction==='function'){round=roundingFunction;return true;}return false;}// This function allows you to set a threshold for relative time strings
function getSetRelativeTimeThreshold(threshold,limit){if(thresholds[threshold]===undefined){return false;}if(limit===undefined){return thresholds[threshold];}thresholds[threshold]=limit;return true;}function humanize(withSuffix){var locale=this.localeData();var output=relativeTime$1(this,!withSuffix,locale);if(withSuffix){output=locale.pastFuture(+this,output);}return locale.postformat(output);}var abs$1=Math.abs;function toISOString$1(){// for ISO strings we do not use the normal bubbling rules:
//  * milliseconds bubble up until they become hours
//  * days do not bubble at all
//  * months bubble up until they become years
// This is because there is no context-free conversion between hours and days
// (think of clock changes)
// and also not between days and months (28-31 days per month)
var seconds=abs$1(this._milliseconds)/1000;var days=abs$1(this._days);var months=abs$1(this._months);var minutes,hours,years;// 3600 seconds -> 60 minutes -> 1 hour
minutes=absFloor(seconds/60);hours=absFloor(minutes/60);seconds%=60;minutes%=60;// 12 months -> 1 year
years=absFloor(months/12);months%=12;// inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
var Y=years;var M=months;var D=days;var h=hours;var m=minutes;var s=seconds;var total=this.asSeconds();if(!total){// this is the same as C#'s (Noda) and python (isodate)...
// but not other JS (goog.date)
return'P0D';}return(total<0?'-':'')+'P'+(Y?Y+'Y':'')+(M?M+'M':'')+(D?D+'D':'')+(h||m||s?'T':'')+(h?h+'H':'')+(m?m+'M':'')+(s?s+'S':'');}var proto$2=Duration.prototype;proto$2.abs=abs;proto$2.add=add$1;proto$2.subtract=subtract$1;proto$2.as=as;proto$2.asMilliseconds=asMilliseconds;proto$2.asSeconds=asSeconds;proto$2.asMinutes=asMinutes;proto$2.asHours=asHours;proto$2.asDays=asDays;proto$2.asWeeks=asWeeks;proto$2.asMonths=asMonths;proto$2.asYears=asYears;proto$2.valueOf=valueOf$1;proto$2._bubble=bubble;proto$2.get=get$2;proto$2.milliseconds=milliseconds;proto$2.seconds=seconds;proto$2.minutes=minutes;proto$2.hours=hours;proto$2.days=days;proto$2.weeks=weeks;proto$2.months=months;proto$2.years=years;proto$2.humanize=humanize;proto$2.toISOString=toISOString$1;proto$2.toString=toISOString$1;proto$2.toJSON=toISOString$1;proto$2.locale=locale;proto$2.localeData=localeData;// Deprecations
proto$2.toIsoString=deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',toISOString$1);proto$2.lang=lang;// Side effect imports
// FORMATTING
addFormatToken('X',0,0,'unix');addFormatToken('x',0,0,'valueOf');// PARSING
addRegexToken('x',matchSigned);addRegexToken('X',matchTimestamp);addParseToken('X',function(input,array,config){config._d=new Date(parseFloat(input,10)*1000);});addParseToken('x',function(input,array,config){config._d=new Date(toInt(input));});// Side effect imports
hooks.version='2.17.0';setHookCallback(createLocal);hooks.fn=proto;hooks.min=min;hooks.max=max;hooks.now=now;hooks.utc=createUTC;hooks.unix=createUnix;hooks.months=listMonths;hooks.isDate=isDate;hooks.locale=getSetGlobalLocale;hooks.invalid=createInvalid;hooks.duration=createDuration;hooks.isMoment=isMoment;hooks.weekdays=listWeekdays;hooks.parseZone=createInZone;hooks.localeData=getLocale;hooks.isDuration=isDuration;hooks.monthsShort=listMonthsShort;hooks.weekdaysMin=listWeekdaysMin;hooks.defineLocale=defineLocale;hooks.updateLocale=updateLocale;hooks.locales=listLocales;hooks.weekdaysShort=listWeekdaysShort;hooks.normalizeUnits=normalizeUnits;hooks.relativeTimeRounding=getSetRelativeTimeRounding;hooks.relativeTimeThreshold=getSetRelativeTimeThreshold;hooks.calendarFormat=getCalendarFormat;hooks.prototype=proto;return hooks;});
});

require.register("web/static/js/moment.min.js", function(exports, require, module) {
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js
//! version : 2.13.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function (a, b) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : a.moment = b();
}(undefined, function () {
  "use strict";
  function a() {
    return fd.apply(null, arguments);
  }function b(a) {
    fd = a;
  }function c(a) {
    return a instanceof Array || "[object Array]" === Object.prototype.toString.call(a);
  }function d(a) {
    return a instanceof Date || "[object Date]" === Object.prototype.toString.call(a);
  }function e(a, b) {
    var c,
        d = [];for (c = 0; c < a.length; ++c) {
      d.push(b(a[c], c));
    }return d;
  }function f(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }function g(a, b) {
    for (var c in b) {
      f(b, c) && (a[c] = b[c]);
    }return f(b, "toString") && (a.toString = b.toString), f(b, "valueOf") && (a.valueOf = b.valueOf), a;
  }function h(a, b, c, d) {
    return Ja(a, b, c, d, !0).utc();
  }function i() {
    return { empty: !1, unusedTokens: [], unusedInput: [], overflow: -2, charsLeftOver: 0, nullInput: !1, invalidMonth: null, invalidFormat: !1, userInvalidated: !1, iso: !1, parsedDateParts: [], meridiem: null };
  }function j(a) {
    return null == a._pf && (a._pf = i()), a._pf;
  }function k(a) {
    if (null == a._isValid) {
      var b = j(a),
          c = gd.call(b.parsedDateParts, function (a) {
        return null != a;
      });a._isValid = !isNaN(a._d.getTime()) && b.overflow < 0 && !b.empty && !b.invalidMonth && !b.invalidWeekday && !b.nullInput && !b.invalidFormat && !b.userInvalidated && (!b.meridiem || b.meridiem && c), a._strict && (a._isValid = a._isValid && 0 === b.charsLeftOver && 0 === b.unusedTokens.length && void 0 === b.bigHour);
    }return a._isValid;
  }function l(a) {
    var b = h(NaN);return null != a ? g(j(b), a) : j(b).userInvalidated = !0, b;
  }function m(a) {
    return void 0 === a;
  }function n(a, b) {
    var c, d, e;if (m(b._isAMomentObject) || (a._isAMomentObject = b._isAMomentObject), m(b._i) || (a._i = b._i), m(b._f) || (a._f = b._f), m(b._l) || (a._l = b._l), m(b._strict) || (a._strict = b._strict), m(b._tzm) || (a._tzm = b._tzm), m(b._isUTC) || (a._isUTC = b._isUTC), m(b._offset) || (a._offset = b._offset), m(b._pf) || (a._pf = j(b)), m(b._locale) || (a._locale = b._locale), hd.length > 0) for (c in hd) {
      d = hd[c], e = b[d], m(e) || (a[d] = e);
    }return a;
  }function o(b) {
    n(this, b), this._d = new Date(null != b._d ? b._d.getTime() : NaN), id === !1 && (id = !0, a.updateOffset(this), id = !1);
  }function p(a) {
    return a instanceof o || null != a && null != a._isAMomentObject;
  }function q(a) {
    return 0 > a ? Math.ceil(a) : Math.floor(a);
  }function r(a) {
    var b = +a,
        c = 0;return 0 !== b && isFinite(b) && (c = q(b)), c;
  }function s(a, b, c) {
    var d,
        e = Math.min(a.length, b.length),
        f = Math.abs(a.length - b.length),
        g = 0;for (d = 0; e > d; d++) {
      (c && a[d] !== b[d] || !c && r(a[d]) !== r(b[d])) && g++;
    }return g + f;
  }function t(b) {
    a.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + b);
  }function u(b, c) {
    var d = !0;return g(function () {
      return null != a.deprecationHandler && a.deprecationHandler(null, b), d && (t(b + "\nArguments: " + Array.prototype.slice.call(arguments).join(", ") + "\n" + new Error().stack), d = !1), c.apply(this, arguments);
    }, c);
  }function v(b, c) {
    null != a.deprecationHandler && a.deprecationHandler(b, c), jd[b] || (t(c), jd[b] = !0);
  }function w(a) {
    return a instanceof Function || "[object Function]" === Object.prototype.toString.call(a);
  }function x(a) {
    return "[object Object]" === Object.prototype.toString.call(a);
  }function y(a) {
    var b, c;for (c in a) {
      b = a[c], w(b) ? this[c] = b : this["_" + c] = b;
    }this._config = a, this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source);
  }function z(a, b) {
    var c,
        d = g({}, a);for (c in b) {
      f(b, c) && (x(a[c]) && x(b[c]) ? (d[c] = {}, g(d[c], a[c]), g(d[c], b[c])) : null != b[c] ? d[c] = b[c] : delete d[c]);
    }return d;
  }function A(a) {
    null != a && this.set(a);
  }function B(a) {
    return a ? a.toLowerCase().replace("_", "-") : a;
  }function C(a) {
    for (var b, c, d, e, f = 0; f < a.length;) {
      for (e = B(a[f]).split("-"), b = e.length, c = B(a[f + 1]), c = c ? c.split("-") : null; b > 0;) {
        if (d = D(e.slice(0, b).join("-"))) return d;if (c && c.length >= b && s(e, c, !0) >= b - 1) break;b--;
      }f++;
    }return null;
  }function D(a) {
    var b = null;if (!nd[a] && "undefined" != typeof module && module && module.exports) try {
      b = ld._abbr, require("./locale/" + a), E(b);
    } catch (c) {}return nd[a];
  }function E(a, b) {
    var c;return a && (c = m(b) ? H(a) : F(a, b), c && (ld = c)), ld._abbr;
  }function F(a, b) {
    return null !== b ? (b.abbr = a, null != nd[a] ? (v("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale"), b = z(nd[a]._config, b)) : null != b.parentLocale && (null != nd[b.parentLocale] ? b = z(nd[b.parentLocale]._config, b) : v("parentLocaleUndefined", "specified parentLocale is not defined yet")), nd[a] = new A(b), E(a), nd[a]) : (delete nd[a], null);
  }function G(a, b) {
    if (null != b) {
      var c;null != nd[a] && (b = z(nd[a]._config, b)), c = new A(b), c.parentLocale = nd[a], nd[a] = c, E(a);
    } else null != nd[a] && (null != nd[a].parentLocale ? nd[a] = nd[a].parentLocale : null != nd[a] && delete nd[a]);return nd[a];
  }function H(a) {
    var b;if (a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a) return ld;if (!c(a)) {
      if (b = D(a)) return b;a = [a];
    }return C(a);
  }function I() {
    return kd(nd);
  }function J(a, b) {
    var c = a.toLowerCase();od[c] = od[c + "s"] = od[b] = a;
  }function K(a) {
    return "string" == typeof a ? od[a] || od[a.toLowerCase()] : void 0;
  }function L(a) {
    var b,
        c,
        d = {};for (c in a) {
      f(a, c) && (b = K(c), b && (d[b] = a[c]));
    }return d;
  }function M(b, c) {
    return function (d) {
      return null != d ? (O(this, b, d), a.updateOffset(this, c), this) : N(this, b);
    };
  }function N(a, b) {
    return a.isValid() ? a._d["get" + (a._isUTC ? "UTC" : "") + b]() : NaN;
  }function O(a, b, c) {
    a.isValid() && a._d["set" + (a._isUTC ? "UTC" : "") + b](c);
  }function P(a, b) {
    var c;if ("object" == (typeof a === "undefined" ? "undefined" : _typeof(a))) for (c in a) {
      this.set(c, a[c]);
    } else if (a = K(a), w(this[a])) return this[a](b);return this;
  }function Q(a, b, c) {
    var d = "" + Math.abs(a),
        e = b - d.length,
        f = a >= 0;return (f ? c ? "+" : "" : "-") + Math.pow(10, Math.max(0, e)).toString().substr(1) + d;
  }function R(a, b, c, d) {
    var e = d;"string" == typeof d && (e = function e() {
      return this[d]();
    }), a && (sd[a] = e), b && (sd[b[0]] = function () {
      return Q(e.apply(this, arguments), b[1], b[2]);
    }), c && (sd[c] = function () {
      return this.localeData().ordinal(e.apply(this, arguments), a);
    });
  }function S(a) {
    return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "");
  }function T(a) {
    var b,
        c,
        d = a.match(pd);for (b = 0, c = d.length; c > b; b++) {
      sd[d[b]] ? d[b] = sd[d[b]] : d[b] = S(d[b]);
    }return function (b) {
      var e,
          f = "";for (e = 0; c > e; e++) {
        f += d[e] instanceof Function ? d[e].call(b, a) : d[e];
      }return f;
    };
  }function U(a, b) {
    return a.isValid() ? (b = V(b, a.localeData()), rd[b] = rd[b] || T(b), rd[b](a)) : a.localeData().invalidDate();
  }function V(a, b) {
    function c(a) {
      return b.longDateFormat(a) || a;
    }var d = 5;for (qd.lastIndex = 0; d >= 0 && qd.test(a);) {
      a = a.replace(qd, c), qd.lastIndex = 0, d -= 1;
    }return a;
  }function W(a, b, c) {
    Kd[a] = w(b) ? b : function (a, d) {
      return a && c ? c : b;
    };
  }function X(a, b) {
    return f(Kd, a) ? Kd[a](b._strict, b._locale) : new RegExp(Y(a));
  }function Y(a) {
    return Z(a.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (a, b, c, d, e) {
      return b || c || d || e;
    }));
  }function Z(a) {
    return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }function $(a, b) {
    var c,
        d = b;for ("string" == typeof a && (a = [a]), "number" == typeof b && (d = function d(a, c) {
      c[b] = r(a);
    }), c = 0; c < a.length; c++) {
      Ld[a[c]] = d;
    }
  }function _(a, b) {
    $(a, function (a, c, d, e) {
      d._w = d._w || {}, b(a, d._w, d, e);
    });
  }function aa(a, b, c) {
    null != b && f(Ld, a) && Ld[a](b, c._a, c, a);
  }function ba(a, b) {
    return new Date(Date.UTC(a, b + 1, 0)).getUTCDate();
  }function ca(a, b) {
    return c(this._months) ? this._months[a.month()] : this._months[Vd.test(b) ? "format" : "standalone"][a.month()];
  }function da(a, b) {
    return c(this._monthsShort) ? this._monthsShort[a.month()] : this._monthsShort[Vd.test(b) ? "format" : "standalone"][a.month()];
  }function ea(a, b, c) {
    var d,
        e,
        f,
        g = a.toLocaleLowerCase();if (!this._monthsParse) for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], d = 0; 12 > d; ++d) {
      f = h([2e3, d]), this._shortMonthsParse[d] = this.monthsShort(f, "").toLocaleLowerCase(), this._longMonthsParse[d] = this.months(f, "").toLocaleLowerCase();
    }return c ? "MMM" === b ? (e = md.call(this._shortMonthsParse, g), -1 !== e ? e : null) : (e = md.call(this._longMonthsParse, g), -1 !== e ? e : null) : "MMM" === b ? (e = md.call(this._shortMonthsParse, g), -1 !== e ? e : (e = md.call(this._longMonthsParse, g), -1 !== e ? e : null)) : (e = md.call(this._longMonthsParse, g), -1 !== e ? e : (e = md.call(this._shortMonthsParse, g), -1 !== e ? e : null));
  }function fa(a, b, c) {
    var d, e, f;if (this._monthsParseExact) return ea.call(this, a, b, c);for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), d = 0; 12 > d; d++) {
      if (e = h([2e3, d]), c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$", "i"), this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$", "i")), c || this._monthsParse[d] || (f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""), this._monthsParse[d] = new RegExp(f.replace(".", ""), "i")), c && "MMMM" === b && this._longMonthsParse[d].test(a)) return d;if (c && "MMM" === b && this._shortMonthsParse[d].test(a)) return d;if (!c && this._monthsParse[d].test(a)) return d;
    }
  }function ga(a, b) {
    var c;if (!a.isValid()) return a;if ("string" == typeof b) if (/^\d+$/.test(b)) b = r(b);else if (b = a.localeData().monthsParse(b), "number" != typeof b) return a;return c = Math.min(a.date(), ba(a.year(), b)), a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c), a;
  }function ha(b) {
    return null != b ? (ga(this, b), a.updateOffset(this, !0), this) : N(this, "Month");
  }function ia() {
    return ba(this.year(), this.month());
  }function ja(a) {
    return this._monthsParseExact ? (f(this, "_monthsRegex") || la.call(this), a ? this._monthsShortStrictRegex : this._monthsShortRegex) : this._monthsShortStrictRegex && a ? this._monthsShortStrictRegex : this._monthsShortRegex;
  }function ka(a) {
    return this._monthsParseExact ? (f(this, "_monthsRegex") || la.call(this), a ? this._monthsStrictRegex : this._monthsRegex) : this._monthsStrictRegex && a ? this._monthsStrictRegex : this._monthsRegex;
  }function la() {
    function a(a, b) {
      return b.length - a.length;
    }var b,
        c,
        d = [],
        e = [],
        f = [];for (b = 0; 12 > b; b++) {
      c = h([2e3, b]), d.push(this.monthsShort(c, "")), e.push(this.months(c, "")), f.push(this.months(c, "")), f.push(this.monthsShort(c, ""));
    }for (d.sort(a), e.sort(a), f.sort(a), b = 0; 12 > b; b++) {
      d[b] = Z(d[b]), e[b] = Z(e[b]), f[b] = Z(f[b]);
    }this._monthsRegex = new RegExp("^(" + f.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + d.join("|") + ")", "i");
  }function ma(a) {
    var b,
        c = a._a;return c && -2 === j(a).overflow && (b = c[Nd] < 0 || c[Nd] > 11 ? Nd : c[Od] < 1 || c[Od] > ba(c[Md], c[Nd]) ? Od : c[Pd] < 0 || c[Pd] > 24 || 24 === c[Pd] && (0 !== c[Qd] || 0 !== c[Rd] || 0 !== c[Sd]) ? Pd : c[Qd] < 0 || c[Qd] > 59 ? Qd : c[Rd] < 0 || c[Rd] > 59 ? Rd : c[Sd] < 0 || c[Sd] > 999 ? Sd : -1, j(a)._overflowDayOfYear && (Md > b || b > Od) && (b = Od), j(a)._overflowWeeks && -1 === b && (b = Td), j(a)._overflowWeekday && -1 === b && (b = Ud), j(a).overflow = b), a;
  }function na(a) {
    var b,
        c,
        d,
        e,
        f,
        g,
        h = a._i,
        i = $d.exec(h) || _d.exec(h);if (i) {
      for (j(a).iso = !0, b = 0, c = be.length; c > b; b++) {
        if (be[b][1].exec(i[1])) {
          e = be[b][0], d = be[b][2] !== !1;break;
        }
      }if (null == e) return void (a._isValid = !1);if (i[3]) {
        for (b = 0, c = ce.length; c > b; b++) {
          if (ce[b][1].exec(i[3])) {
            f = (i[2] || " ") + ce[b][0];break;
          }
        }if (null == f) return void (a._isValid = !1);
      }if (!d && null != f) return void (a._isValid = !1);if (i[4]) {
        if (!ae.exec(i[4])) return void (a._isValid = !1);g = "Z";
      }a._f = e + (f || "") + (g || ""), Ca(a);
    } else a._isValid = !1;
  }function oa(b) {
    var c = de.exec(b._i);return null !== c ? void (b._d = new Date(+c[1])) : (na(b), void (b._isValid === !1 && (delete b._isValid, a.createFromInputFallback(b))));
  }function pa(a, b, c, d, e, f, g) {
    var h = new Date(a, b, c, d, e, f, g);return 100 > a && a >= 0 && isFinite(h.getFullYear()) && h.setFullYear(a), h;
  }function qa(a) {
    var b = new Date(Date.UTC.apply(null, arguments));return 100 > a && a >= 0 && isFinite(b.getUTCFullYear()) && b.setUTCFullYear(a), b;
  }function ra(a) {
    return sa(a) ? 366 : 365;
  }function sa(a) {
    return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0;
  }function ta() {
    return sa(this.year());
  }function ua(a, b, c) {
    var d = 7 + b - c,
        e = (7 + qa(a, 0, d).getUTCDay() - b) % 7;return -e + d - 1;
  }function va(a, b, c, d, e) {
    var f,
        g,
        h = (7 + c - d) % 7,
        i = ua(a, d, e),
        j = 1 + 7 * (b - 1) + h + i;return 0 >= j ? (f = a - 1, g = ra(f) + j) : j > ra(a) ? (f = a + 1, g = j - ra(a)) : (f = a, g = j), { year: f, dayOfYear: g };
  }function wa(a, b, c) {
    var d,
        e,
        f = ua(a.year(), b, c),
        g = Math.floor((a.dayOfYear() - f - 1) / 7) + 1;return 1 > g ? (e = a.year() - 1, d = g + xa(e, b, c)) : g > xa(a.year(), b, c) ? (d = g - xa(a.year(), b, c), e = a.year() + 1) : (e = a.year(), d = g), { week: d, year: e };
  }function xa(a, b, c) {
    var d = ua(a, b, c),
        e = ua(a + 1, b, c);return (ra(a) - d + e) / 7;
  }function ya(a, b, c) {
    return null != a ? a : null != b ? b : c;
  }function za(b) {
    var c = new Date(a.now());return b._useUTC ? [c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate()] : [c.getFullYear(), c.getMonth(), c.getDate()];
  }function Aa(a) {
    var b,
        c,
        d,
        e,
        f = [];if (!a._d) {
      for (d = za(a), a._w && null == a._a[Od] && null == a._a[Nd] && Ba(a), a._dayOfYear && (e = ya(a._a[Md], d[Md]), a._dayOfYear > ra(e) && (j(a)._overflowDayOfYear = !0), c = qa(e, 0, a._dayOfYear), a._a[Nd] = c.getUTCMonth(), a._a[Od] = c.getUTCDate()), b = 0; 3 > b && null == a._a[b]; ++b) {
        a._a[b] = f[b] = d[b];
      }for (; 7 > b; b++) {
        a._a[b] = f[b] = null == a._a[b] ? 2 === b ? 1 : 0 : a._a[b];
      }24 === a._a[Pd] && 0 === a._a[Qd] && 0 === a._a[Rd] && 0 === a._a[Sd] && (a._nextDay = !0, a._a[Pd] = 0), a._d = (a._useUTC ? qa : pa).apply(null, f), null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm), a._nextDay && (a._a[Pd] = 24);
    }
  }function Ba(a) {
    var b, c, d, e, f, g, h, i;b = a._w, null != b.GG || null != b.W || null != b.E ? (f = 1, g = 4, c = ya(b.GG, a._a[Md], wa(Ka(), 1, 4).year), d = ya(b.W, 1), e = ya(b.E, 1), (1 > e || e > 7) && (i = !0)) : (f = a._locale._week.dow, g = a._locale._week.doy, c = ya(b.gg, a._a[Md], wa(Ka(), f, g).year), d = ya(b.w, 1), null != b.d ? (e = b.d, (0 > e || e > 6) && (i = !0)) : null != b.e ? (e = b.e + f, (b.e < 0 || b.e > 6) && (i = !0)) : e = f), 1 > d || d > xa(c, f, g) ? j(a)._overflowWeeks = !0 : null != i ? j(a)._overflowWeekday = !0 : (h = va(c, d, e, f, g), a._a[Md] = h.year, a._dayOfYear = h.dayOfYear);
  }function Ca(b) {
    if (b._f === a.ISO_8601) return void na(b);b._a = [], j(b).empty = !0;var c,
        d,
        e,
        f,
        g,
        h = "" + b._i,
        i = h.length,
        k = 0;for (e = V(b._f, b._locale).match(pd) || [], c = 0; c < e.length; c++) {
      f = e[c], d = (h.match(X(f, b)) || [])[0], d && (g = h.substr(0, h.indexOf(d)), g.length > 0 && j(b).unusedInput.push(g), h = h.slice(h.indexOf(d) + d.length), k += d.length), sd[f] ? (d ? j(b).empty = !1 : j(b).unusedTokens.push(f), aa(f, d, b)) : b._strict && !d && j(b).unusedTokens.push(f);
    }j(b).charsLeftOver = i - k, h.length > 0 && j(b).unusedInput.push(h), j(b).bigHour === !0 && b._a[Pd] <= 12 && b._a[Pd] > 0 && (j(b).bigHour = void 0), j(b).parsedDateParts = b._a.slice(0), j(b).meridiem = b._meridiem, b._a[Pd] = Da(b._locale, b._a[Pd], b._meridiem), Aa(b), ma(b);
  }function Da(a, b, c) {
    var d;return null == c ? b : null != a.meridiemHour ? a.meridiemHour(b, c) : null != a.isPM ? (d = a.isPM(c), d && 12 > b && (b += 12), d || 12 !== b || (b = 0), b) : b;
  }function Ea(a) {
    var b, c, d, e, f;if (0 === a._f.length) return j(a).invalidFormat = !0, void (a._d = new Date(NaN));for (e = 0; e < a._f.length; e++) {
      f = 0, b = n({}, a), null != a._useUTC && (b._useUTC = a._useUTC), b._f = a._f[e], Ca(b), k(b) && (f += j(b).charsLeftOver, f += 10 * j(b).unusedTokens.length, j(b).score = f, (null == d || d > f) && (d = f, c = b));
    }g(a, c || b);
  }function Fa(a) {
    if (!a._d) {
      var b = L(a._i);a._a = e([b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond], function (a) {
        return a && parseInt(a, 10);
      }), Aa(a);
    }
  }function Ga(a) {
    var b = new o(ma(Ha(a)));return b._nextDay && (b.add(1, "d"), b._nextDay = void 0), b;
  }function Ha(a) {
    var b = a._i,
        e = a._f;return a._locale = a._locale || H(a._l), null === b || void 0 === e && "" === b ? l({ nullInput: !0 }) : ("string" == typeof b && (a._i = b = a._locale.preparse(b)), p(b) ? new o(ma(b)) : (c(e) ? Ea(a) : e ? Ca(a) : d(b) ? a._d = b : Ia(a), k(a) || (a._d = null), a));
  }function Ia(b) {
    var f = b._i;void 0 === f ? b._d = new Date(a.now()) : d(f) ? b._d = new Date(f.valueOf()) : "string" == typeof f ? oa(b) : c(f) ? (b._a = e(f.slice(0), function (a) {
      return parseInt(a, 10);
    }), Aa(b)) : "object" == (typeof f === "undefined" ? "undefined" : _typeof(f)) ? Fa(b) : "number" == typeof f ? b._d = new Date(f) : a.createFromInputFallback(b);
  }function Ja(a, b, c, d, e) {
    var f = {};return "boolean" == typeof c && (d = c, c = void 0), f._isAMomentObject = !0, f._useUTC = f._isUTC = e, f._l = c, f._i = a, f._f = b, f._strict = d, Ga(f);
  }function Ka(a, b, c, d) {
    return Ja(a, b, c, d, !1);
  }function La(a, b) {
    var d, e;if (1 === b.length && c(b[0]) && (b = b[0]), !b.length) return Ka();for (d = b[0], e = 1; e < b.length; ++e) {
      (!b[e].isValid() || b[e][a](d)) && (d = b[e]);
    }return d;
  }function Ma() {
    var a = [].slice.call(arguments, 0);return La("isBefore", a);
  }function Na() {
    var a = [].slice.call(arguments, 0);return La("isAfter", a);
  }function Oa(a) {
    var b = L(a),
        c = b.year || 0,
        d = b.quarter || 0,
        e = b.month || 0,
        f = b.week || 0,
        g = b.day || 0,
        h = b.hour || 0,
        i = b.minute || 0,
        j = b.second || 0,
        k = b.millisecond || 0;this._milliseconds = +k + 1e3 * j + 6e4 * i + 1e3 * h * 60 * 60, this._days = +g + 7 * f, this._months = +e + 3 * d + 12 * c, this._data = {}, this._locale = H(), this._bubble();
  }function Pa(a) {
    return a instanceof Oa;
  }function Qa(a, b) {
    R(a, 0, 0, function () {
      var a = this.utcOffset(),
          c = "+";return 0 > a && (a = -a, c = "-"), c + Q(~~(a / 60), 2) + b + Q(~~a % 60, 2);
    });
  }function Ra(a, b) {
    var c = (b || "").match(a) || [],
        d = c[c.length - 1] || [],
        e = (d + "").match(ie) || ["-", 0, 0],
        f = +(60 * e[1]) + r(e[2]);return "+" === e[0] ? f : -f;
  }function Sa(b, c) {
    var e, f;return c._isUTC ? (e = c.clone(), f = (p(b) || d(b) ? b.valueOf() : Ka(b).valueOf()) - e.valueOf(), e._d.setTime(e._d.valueOf() + f), a.updateOffset(e, !1), e) : Ka(b).local();
  }function Ta(a) {
    return 15 * -Math.round(a._d.getTimezoneOffset() / 15);
  }function Ua(b, c) {
    var d,
        e = this._offset || 0;return this.isValid() ? null != b ? ("string" == typeof b ? b = Ra(Hd, b) : Math.abs(b) < 16 && (b = 60 * b), !this._isUTC && c && (d = Ta(this)), this._offset = b, this._isUTC = !0, null != d && this.add(d, "m"), e !== b && (!c || this._changeInProgress ? jb(this, db(b - e, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, a.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? e : Ta(this) : null != b ? this : NaN;
  }function Va(a, b) {
    return null != a ? ("string" != typeof a && (a = -a), this.utcOffset(a, b), this) : -this.utcOffset();
  }function Wa(a) {
    return this.utcOffset(0, a);
  }function Xa(a) {
    return this._isUTC && (this.utcOffset(0, a), this._isUTC = !1, a && this.subtract(Ta(this), "m")), this;
  }function Ya() {
    return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(Ra(Gd, this._i)), this;
  }function Za(a) {
    return this.isValid() ? (a = a ? Ka(a).utcOffset() : 0, (this.utcOffset() - a) % 60 === 0) : !1;
  }function $a() {
    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
  }function _a() {
    if (!m(this._isDSTShifted)) return this._isDSTShifted;var a = {};if (n(a, this), a = Ha(a), a._a) {
      var b = a._isUTC ? h(a._a) : Ka(a._a);this._isDSTShifted = this.isValid() && s(a._a, b.toArray()) > 0;
    } else this._isDSTShifted = !1;return this._isDSTShifted;
  }function ab() {
    return this.isValid() ? !this._isUTC : !1;
  }function bb() {
    return this.isValid() ? this._isUTC : !1;
  }function cb() {
    return this.isValid() ? this._isUTC && 0 === this._offset : !1;
  }function db(a, b) {
    var c,
        d,
        e,
        g = a,
        h = null;return Pa(a) ? g = { ms: a._milliseconds, d: a._days, M: a._months } : "number" == typeof a ? (g = {}, b ? g[b] = a : g.milliseconds = a) : (h = je.exec(a)) ? (c = "-" === h[1] ? -1 : 1, g = { y: 0, d: r(h[Od]) * c, h: r(h[Pd]) * c, m: r(h[Qd]) * c, s: r(h[Rd]) * c, ms: r(h[Sd]) * c }) : (h = ke.exec(a)) ? (c = "-" === h[1] ? -1 : 1, g = { y: eb(h[2], c), M: eb(h[3], c), w: eb(h[4], c), d: eb(h[5], c), h: eb(h[6], c), m: eb(h[7], c), s: eb(h[8], c) }) : null == g ? g = {} : "object" == (typeof g === "undefined" ? "undefined" : _typeof(g)) && ("from" in g || "to" in g) && (e = gb(Ka(g.from), Ka(g.to)), g = {}, g.ms = e.milliseconds, g.M = e.months), d = new Oa(g), Pa(a) && f(a, "_locale") && (d._locale = a._locale), d;
  }function eb(a, b) {
    var c = a && parseFloat(a.replace(",", "."));return (isNaN(c) ? 0 : c) * b;
  }function fb(a, b) {
    var c = { milliseconds: 0, months: 0 };return c.months = b.month() - a.month() + 12 * (b.year() - a.year()), a.clone().add(c.months, "M").isAfter(b) && --c.months, c.milliseconds = +b - +a.clone().add(c.months, "M"), c;
  }function gb(a, b) {
    var c;return a.isValid() && b.isValid() ? (b = Sa(b, a), a.isBefore(b) ? c = fb(a, b) : (c = fb(b, a), c.milliseconds = -c.milliseconds, c.months = -c.months), c) : { milliseconds: 0, months: 0 };
  }function hb(a) {
    return 0 > a ? -1 * Math.round(-1 * a) : Math.round(a);
  }function ib(a, b) {
    return function (c, d) {
      var e, f;return null === d || isNaN(+d) || (v(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period)."), f = c, c = d, d = f), c = "string" == typeof c ? +c : c, e = db(c, d), jb(this, e, a), this;
    };
  }function jb(b, c, d, e) {
    var f = c._milliseconds,
        g = hb(c._days),
        h = hb(c._months);b.isValid() && (e = null == e ? !0 : e, f && b._d.setTime(b._d.valueOf() + f * d), g && O(b, "Date", N(b, "Date") + g * d), h && ga(b, N(b, "Month") + h * d), e && a.updateOffset(b, g || h));
  }function kb(a, b) {
    var c = a || Ka(),
        d = Sa(c, this).startOf("day"),
        e = this.diff(d, "days", !0),
        f = -6 > e ? "sameElse" : -1 > e ? "lastWeek" : 0 > e ? "lastDay" : 1 > e ? "sameDay" : 2 > e ? "nextDay" : 7 > e ? "nextWeek" : "sameElse",
        g = b && (w(b[f]) ? b[f]() : b[f]);return this.format(g || this.localeData().calendar(f, this, Ka(c)));
  }function lb() {
    return new o(this);
  }function mb(a, b) {
    var c = p(a) ? a : Ka(a);return this.isValid() && c.isValid() ? (b = K(m(b) ? "millisecond" : b), "millisecond" === b ? this.valueOf() > c.valueOf() : c.valueOf() < this.clone().startOf(b).valueOf()) : !1;
  }function nb(a, b) {
    var c = p(a) ? a : Ka(a);return this.isValid() && c.isValid() ? (b = K(m(b) ? "millisecond" : b), "millisecond" === b ? this.valueOf() < c.valueOf() : this.clone().endOf(b).valueOf() < c.valueOf()) : !1;
  }function ob(a, b, c, d) {
    return d = d || "()", ("(" === d[0] ? this.isAfter(a, c) : !this.isBefore(a, c)) && (")" === d[1] ? this.isBefore(b, c) : !this.isAfter(b, c));
  }function pb(a, b) {
    var c,
        d = p(a) ? a : Ka(a);return this.isValid() && d.isValid() ? (b = K(b || "millisecond"), "millisecond" === b ? this.valueOf() === d.valueOf() : (c = d.valueOf(), this.clone().startOf(b).valueOf() <= c && c <= this.clone().endOf(b).valueOf())) : !1;
  }function qb(a, b) {
    return this.isSame(a, b) || this.isAfter(a, b);
  }function rb(a, b) {
    return this.isSame(a, b) || this.isBefore(a, b);
  }function sb(a, b, c) {
    var d, e, f, g;return this.isValid() ? (d = Sa(a, this), d.isValid() ? (e = 6e4 * (d.utcOffset() - this.utcOffset()), b = K(b), "year" === b || "month" === b || "quarter" === b ? (g = tb(this, d), "quarter" === b ? g /= 3 : "year" === b && (g /= 12)) : (f = this - d, g = "second" === b ? f / 1e3 : "minute" === b ? f / 6e4 : "hour" === b ? f / 36e5 : "day" === b ? (f - e) / 864e5 : "week" === b ? (f - e) / 6048e5 : f), c ? g : q(g)) : NaN) : NaN;
  }function tb(a, b) {
    var c,
        d,
        e = 12 * (b.year() - a.year()) + (b.month() - a.month()),
        f = a.clone().add(e, "months");return 0 > b - f ? (c = a.clone().add(e - 1, "months"), d = (b - f) / (f - c)) : (c = a.clone().add(e + 1, "months"), d = (b - f) / (c - f)), -(e + d) || 0;
  }function ub() {
    return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
  }function vb() {
    var a = this.clone().utc();return 0 < a.year() && a.year() <= 9999 ? w(Date.prototype.toISOString) ? this.toDate().toISOString() : U(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : U(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
  }function wb(b) {
    b || (b = this.isUtc() ? a.defaultFormatUtc : a.defaultFormat);var c = U(this, b);return this.localeData().postformat(c);
  }function xb(a, b) {
    return this.isValid() && (p(a) && a.isValid() || Ka(a).isValid()) ? db({ to: this, from: a }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate();
  }function yb(a) {
    return this.from(Ka(), a);
  }function zb(a, b) {
    return this.isValid() && (p(a) && a.isValid() || Ka(a).isValid()) ? db({ from: this, to: a }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate();
  }function Ab(a) {
    return this.to(Ka(), a);
  }function Bb(a) {
    var b;return void 0 === a ? this._locale._abbr : (b = H(a), null != b && (this._locale = b), this);
  }function Cb() {
    return this._locale;
  }function Db(a) {
    switch (a = K(a)) {case "year":
        this.month(0);case "quarter":case "month":
        this.date(1);case "week":case "isoWeek":case "day":case "date":
        this.hours(0);case "hour":
        this.minutes(0);case "minute":
        this.seconds(0);case "second":
        this.milliseconds(0);}return "week" === a && this.weekday(0), "isoWeek" === a && this.isoWeekday(1), "quarter" === a && this.month(3 * Math.floor(this.month() / 3)), this;
  }function Eb(a) {
    return a = K(a), void 0 === a || "millisecond" === a ? this : ("date" === a && (a = "day"), this.startOf(a).add(1, "isoWeek" === a ? "week" : a).subtract(1, "ms"));
  }function Fb() {
    return this._d.valueOf() - 6e4 * (this._offset || 0);
  }function Gb() {
    return Math.floor(this.valueOf() / 1e3);
  }function Hb() {
    return this._offset ? new Date(this.valueOf()) : this._d;
  }function Ib() {
    var a = this;return [a.year(), a.month(), a.date(), a.hour(), a.minute(), a.second(), a.millisecond()];
  }function Jb() {
    var a = this;return { years: a.year(), months: a.month(), date: a.date(), hours: a.hours(), minutes: a.minutes(), seconds: a.seconds(), milliseconds: a.milliseconds() };
  }function Kb() {
    return this.isValid() ? this.toISOString() : null;
  }function Lb() {
    return k(this);
  }function Mb() {
    return g({}, j(this));
  }function Nb() {
    return j(this).overflow;
  }function Ob() {
    return { input: this._i, format: this._f, locale: this._locale, isUTC: this._isUTC, strict: this._strict };
  }function Pb(a, b) {
    R(0, [a, a.length], 0, b);
  }function Qb(a) {
    return Ub.call(this, a, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
  }function Rb(a) {
    return Ub.call(this, a, this.isoWeek(), this.isoWeekday(), 1, 4);
  }function Sb() {
    return xa(this.year(), 1, 4);
  }function Tb() {
    var a = this.localeData()._week;return xa(this.year(), a.dow, a.doy);
  }function Ub(a, b, c, d, e) {
    var f;return null == a ? wa(this, d, e).year : (f = xa(a, d, e), b > f && (b = f), Vb.call(this, a, b, c, d, e));
  }function Vb(a, b, c, d, e) {
    var f = va(a, b, c, d, e),
        g = qa(f.year, 0, f.dayOfYear);return this.year(g.getUTCFullYear()), this.month(g.getUTCMonth()), this.date(g.getUTCDate()), this;
  }function Wb(a) {
    return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3);
  }function Xb(a) {
    return wa(a, this._week.dow, this._week.doy).week;
  }function Yb() {
    return this._week.dow;
  }function Zb() {
    return this._week.doy;
  }function $b(a) {
    var b = this.localeData().week(this);return null == a ? b : this.add(7 * (a - b), "d");
  }function _b(a) {
    var b = wa(this, 1, 4).week;return null == a ? b : this.add(7 * (a - b), "d");
  }function ac(a, b) {
    return "string" != typeof a ? a : isNaN(a) ? (a = b.weekdaysParse(a), "number" == typeof a ? a : null) : parseInt(a, 10);
  }function bc(a, b) {
    return c(this._weekdays) ? this._weekdays[a.day()] : this._weekdays[this._weekdays.isFormat.test(b) ? "format" : "standalone"][a.day()];
  }function cc(a) {
    return this._weekdaysShort[a.day()];
  }function dc(a) {
    return this._weekdaysMin[a.day()];
  }function ec(a, b, c) {
    var d,
        e,
        f,
        g = a.toLocaleLowerCase();if (!this._weekdaysParse) for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], d = 0; 7 > d; ++d) {
      f = h([2e3, 1]).day(d), this._minWeekdaysParse[d] = this.weekdaysMin(f, "").toLocaleLowerCase(), this._shortWeekdaysParse[d] = this.weekdaysShort(f, "").toLocaleLowerCase(), this._weekdaysParse[d] = this.weekdays(f, "").toLocaleLowerCase();
    }return c ? "dddd" === b ? (e = md.call(this._weekdaysParse, g), -1 !== e ? e : null) : "ddd" === b ? (e = md.call(this._shortWeekdaysParse, g), -1 !== e ? e : null) : (e = md.call(this._minWeekdaysParse, g), -1 !== e ? e : null) : "dddd" === b ? (e = md.call(this._weekdaysParse, g), -1 !== e ? e : (e = md.call(this._shortWeekdaysParse, g), -1 !== e ? e : (e = md.call(this._minWeekdaysParse, g), -1 !== e ? e : null))) : "ddd" === b ? (e = md.call(this._shortWeekdaysParse, g), -1 !== e ? e : (e = md.call(this._weekdaysParse, g), -1 !== e ? e : (e = md.call(this._minWeekdaysParse, g), -1 !== e ? e : null))) : (e = md.call(this._minWeekdaysParse, g), -1 !== e ? e : (e = md.call(this._weekdaysParse, g), -1 !== e ? e : (e = md.call(this._shortWeekdaysParse, g), -1 !== e ? e : null)));
  }function fc(a, b, c) {
    var d, e, f;if (this._weekdaysParseExact) return ec.call(this, a, b, c);for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), d = 0; 7 > d; d++) {
      if (e = h([2e3, 1]).day(d), c && !this._fullWeekdaysParse[d] && (this._fullWeekdaysParse[d] = new RegExp("^" + this.weekdays(e, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[d] = new RegExp("^" + this.weekdaysShort(e, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[d] = new RegExp("^" + this.weekdaysMin(e, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[d] || (f = "^" + this.weekdays(e, "") + "|^" + this.weekdaysShort(e, "") + "|^" + this.weekdaysMin(e, ""), this._weekdaysParse[d] = new RegExp(f.replace(".", ""), "i")), c && "dddd" === b && this._fullWeekdaysParse[d].test(a)) return d;if (c && "ddd" === b && this._shortWeekdaysParse[d].test(a)) return d;if (c && "dd" === b && this._minWeekdaysParse[d].test(a)) return d;if (!c && this._weekdaysParse[d].test(a)) return d;
    }
  }function gc(a) {
    if (!this.isValid()) return null != a ? this : NaN;var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();return null != a ? (a = ac(a, this.localeData()), this.add(a - b, "d")) : b;
  }function hc(a) {
    if (!this.isValid()) return null != a ? this : NaN;var b = (this.day() + 7 - this.localeData()._week.dow) % 7;return null == a ? b : this.add(a - b, "d");
  }function ic(a) {
    return this.isValid() ? null == a ? this.day() || 7 : this.day(this.day() % 7 ? a : a - 7) : null != a ? this : NaN;
  }function jc(a) {
    return this._weekdaysParseExact ? (f(this, "_weekdaysRegex") || mc.call(this), a ? this._weekdaysStrictRegex : this._weekdaysRegex) : this._weekdaysStrictRegex && a ? this._weekdaysStrictRegex : this._weekdaysRegex;
  }function kc(a) {
    return this._weekdaysParseExact ? (f(this, "_weekdaysRegex") || mc.call(this), a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : this._weekdaysShortStrictRegex && a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
  }function lc(a) {
    return this._weekdaysParseExact ? (f(this, "_weekdaysRegex") || mc.call(this), a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : this._weekdaysMinStrictRegex && a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
  }function mc() {
    function a(a, b) {
      return b.length - a.length;
    }var b,
        c,
        d,
        e,
        f,
        g = [],
        i = [],
        j = [],
        k = [];for (b = 0; 7 > b; b++) {
      c = h([2e3, 1]).day(b), d = this.weekdaysMin(c, ""), e = this.weekdaysShort(c, ""), f = this.weekdays(c, ""), g.push(d), i.push(e), j.push(f), k.push(d), k.push(e), k.push(f);
    }for (g.sort(a), i.sort(a), j.sort(a), k.sort(a), b = 0; 7 > b; b++) {
      i[b] = Z(i[b]), j[b] = Z(j[b]), k[b] = Z(k[b]);
    }this._weekdaysRegex = new RegExp("^(" + k.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + j.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + i.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + g.join("|") + ")", "i");
  }function nc(a) {
    var b = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;return null == a ? b : this.add(a - b, "d");
  }function oc() {
    return this.hours() % 12 || 12;
  }function pc() {
    return this.hours() || 24;
  }function qc(a, b) {
    R(a, 0, 0, function () {
      return this.localeData().meridiem(this.hours(), this.minutes(), b);
    });
  }function rc(a, b) {
    return b._meridiemParse;
  }function sc(a) {
    return "p" === (a + "").toLowerCase().charAt(0);
  }function tc(a, b, c) {
    return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM";
  }function uc(a, b) {
    b[Sd] = r(1e3 * ("0." + a));
  }function vc() {
    return this._isUTC ? "UTC" : "";
  }function wc() {
    return this._isUTC ? "Coordinated Universal Time" : "";
  }function xc(a) {
    return Ka(1e3 * a);
  }function yc() {
    return Ka.apply(null, arguments).parseZone();
  }function zc(a, b, c) {
    var d = this._calendar[a];return w(d) ? d.call(b, c) : d;
  }function Ac(a) {
    var b = this._longDateFormat[a],
        c = this._longDateFormat[a.toUpperCase()];return b || !c ? b : (this._longDateFormat[a] = c.replace(/MMMM|MM|DD|dddd/g, function (a) {
      return a.slice(1);
    }), this._longDateFormat[a]);
  }function Bc() {
    return this._invalidDate;
  }function Cc(a) {
    return this._ordinal.replace("%d", a);
  }function Dc(a) {
    return a;
  }function Ec(a, b, c, d) {
    var e = this._relativeTime[c];return w(e) ? e(a, b, c, d) : e.replace(/%d/i, a);
  }function Fc(a, b) {
    var c = this._relativeTime[a > 0 ? "future" : "past"];return w(c) ? c(b) : c.replace(/%s/i, b);
  }function Gc(a, b, c, d) {
    var e = H(),
        f = h().set(d, b);return e[c](f, a);
  }function Hc(a, b, c) {
    if ("number" == typeof a && (b = a, a = void 0), a = a || "", null != b) return Gc(a, b, c, "month");var d,
        e = [];for (d = 0; 12 > d; d++) {
      e[d] = Gc(a, d, c, "month");
    }return e;
  }function Ic(a, b, c, d) {
    "boolean" == typeof a ? ("number" == typeof b && (c = b, b = void 0), b = b || "") : (b = a, c = b, a = !1, "number" == typeof b && (c = b, b = void 0), b = b || "");var e = H(),
        f = a ? e._week.dow : 0;if (null != c) return Gc(b, (c + f) % 7, d, "day");var g,
        h = [];for (g = 0; 7 > g; g++) {
      h[g] = Gc(b, (g + f) % 7, d, "day");
    }return h;
  }function Jc(a, b) {
    return Hc(a, b, "months");
  }function Kc(a, b) {
    return Hc(a, b, "monthsShort");
  }function Lc(a, b, c) {
    return Ic(a, b, c, "weekdays");
  }function Mc(a, b, c) {
    return Ic(a, b, c, "weekdaysShort");
  }function Nc(a, b, c) {
    return Ic(a, b, c, "weekdaysMin");
  }function Oc() {
    var a = this._data;return this._milliseconds = Le(this._milliseconds), this._days = Le(this._days), this._months = Le(this._months), a.milliseconds = Le(a.milliseconds), a.seconds = Le(a.seconds), a.minutes = Le(a.minutes), a.hours = Le(a.hours), a.months = Le(a.months), a.years = Le(a.years), this;
  }function Pc(a, b, c, d) {
    var e = db(b, c);return a._milliseconds += d * e._milliseconds, a._days += d * e._days, a._months += d * e._months, a._bubble();
  }function Qc(a, b) {
    return Pc(this, a, b, 1);
  }function Rc(a, b) {
    return Pc(this, a, b, -1);
  }function Sc(a) {
    return 0 > a ? Math.floor(a) : Math.ceil(a);
  }function Tc() {
    var a,
        b,
        c,
        d,
        e,
        f = this._milliseconds,
        g = this._days,
        h = this._months,
        i = this._data;return f >= 0 && g >= 0 && h >= 0 || 0 >= f && 0 >= g && 0 >= h || (f += 864e5 * Sc(Vc(h) + g), g = 0, h = 0), i.milliseconds = f % 1e3, a = q(f / 1e3), i.seconds = a % 60, b = q(a / 60), i.minutes = b % 60, c = q(b / 60), i.hours = c % 24, g += q(c / 24), e = q(Uc(g)), h += e, g -= Sc(Vc(e)), d = q(h / 12), h %= 12, i.days = g, i.months = h, i.years = d, this;
  }function Uc(a) {
    return 4800 * a / 146097;
  }function Vc(a) {
    return 146097 * a / 4800;
  }function Wc(a) {
    var b,
        c,
        d = this._milliseconds;if (a = K(a), "month" === a || "year" === a) return b = this._days + d / 864e5, c = this._months + Uc(b), "month" === a ? c : c / 12;switch (b = this._days + Math.round(Vc(this._months)), a) {case "week":
        return b / 7 + d / 6048e5;case "day":
        return b + d / 864e5;case "hour":
        return 24 * b + d / 36e5;case "minute":
        return 1440 * b + d / 6e4;case "second":
        return 86400 * b + d / 1e3;case "millisecond":
        return Math.floor(864e5 * b) + d;default:
        throw new Error("Unknown unit " + a);}
  }function Xc() {
    return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * r(this._months / 12);
  }function Yc(a) {
    return function () {
      return this.as(a);
    };
  }function Zc(a) {
    return a = K(a), this[a + "s"]();
  }function $c(a) {
    return function () {
      return this._data[a];
    };
  }function _c() {
    return q(this.days() / 7);
  }function ad(a, b, c, d, e) {
    return e.relativeTime(b || 1, !!c, a, d);
  }function bd(a, b, c) {
    var d = db(a).abs(),
        e = _e(d.as("s")),
        f = _e(d.as("m")),
        g = _e(d.as("h")),
        h = _e(d.as("d")),
        i = _e(d.as("M")),
        j = _e(d.as("y")),
        k = e < af.s && ["s", e] || 1 >= f && ["m"] || f < af.m && ["mm", f] || 1 >= g && ["h"] || g < af.h && ["hh", g] || 1 >= h && ["d"] || h < af.d && ["dd", h] || 1 >= i && ["M"] || i < af.M && ["MM", i] || 1 >= j && ["y"] || ["yy", j];return k[2] = b, k[3] = +a > 0, k[4] = c, ad.apply(null, k);
  }function cd(a, b) {
    return void 0 === af[a] ? !1 : void 0 === b ? af[a] : (af[a] = b, !0);
  }function dd(a) {
    var b = this.localeData(),
        c = bd(this, !a, b);return a && (c = b.pastFuture(+this, c)), b.postformat(c);
  }function ed() {
    var a,
        b,
        c,
        d = bf(this._milliseconds) / 1e3,
        e = bf(this._days),
        f = bf(this._months);a = q(d / 60), b = q(a / 60), d %= 60, a %= 60, c = q(f / 12), f %= 12;var g = c,
        h = f,
        i = e,
        j = b,
        k = a,
        l = d,
        m = this.asSeconds();return m ? (0 > m ? "-" : "") + "P" + (g ? g + "Y" : "") + (h ? h + "M" : "") + (i ? i + "D" : "") + (j || k || l ? "T" : "") + (j ? j + "H" : "") + (k ? k + "M" : "") + (l ? l + "S" : "") : "P0D";
  }var fd, gd;gd = Array.prototype.some ? Array.prototype.some : function (a) {
    for (var b = Object(this), c = b.length >>> 0, d = 0; c > d; d++) {
      if (d in b && a.call(this, b[d], d, b)) return !0;
    }return !1;
  };var hd = a.momentProperties = [],
      id = !1,
      jd = {};a.suppressDeprecationWarnings = !1, a.deprecationHandler = null;var kd;kd = Object.keys ? Object.keys : function (a) {
    var b,
        c = [];for (b in a) {
      f(a, b) && c.push(b);
    }return c;
  };var ld,
      md,
      nd = {},
      od = {},
      pd = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
      qd = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
      rd = {},
      sd = {},
      td = /\d/,
      ud = /\d\d/,
      vd = /\d{3}/,
      wd = /\d{4}/,
      xd = /[+-]?\d{6}/,
      yd = /\d\d?/,
      zd = /\d\d\d\d?/,
      Ad = /\d\d\d\d\d\d?/,
      Bd = /\d{1,3}/,
      Cd = /\d{1,4}/,
      Dd = /[+-]?\d{1,6}/,
      Ed = /\d+/,
      Fd = /[+-]?\d+/,
      Gd = /Z|[+-]\d\d:?\d\d/gi,
      Hd = /Z|[+-]\d\d(?::?\d\d)?/gi,
      Id = /[+-]?\d+(\.\d{1,3})?/,
      Jd = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
      Kd = {},
      Ld = {},
      Md = 0,
      Nd = 1,
      Od = 2,
      Pd = 3,
      Qd = 4,
      Rd = 5,
      Sd = 6,
      Td = 7,
      Ud = 8;md = Array.prototype.indexOf ? Array.prototype.indexOf : function (a) {
    var b;for (b = 0; b < this.length; ++b) {
      if (this[b] === a) return b;
    }return -1;
  }, R("M", ["MM", 2], "Mo", function () {
    return this.month() + 1;
  }), R("MMM", 0, 0, function (a) {
    return this.localeData().monthsShort(this, a);
  }), R("MMMM", 0, 0, function (a) {
    return this.localeData().months(this, a);
  }), J("month", "M"), W("M", yd), W("MM", yd, ud), W("MMM", function (a, b) {
    return b.monthsShortRegex(a);
  }), W("MMMM", function (a, b) {
    return b.monthsRegex(a);
  }), $(["M", "MM"], function (a, b) {
    b[Nd] = r(a) - 1;
  }), $(["MMM", "MMMM"], function (a, b, c, d) {
    var e = c._locale.monthsParse(a, d, c._strict);null != e ? b[Nd] = e : j(c).invalidMonth = a;
  });var Vd = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,
      Wd = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      Xd = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
      Yd = Jd,
      Zd = Jd,
      $d = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
      _d = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
      ae = /Z|[+-]\d\d(?::?\d\d)?/,
      be = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]],
      ce = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]],
      de = /^\/?Date\((\-?\d+)/i;a.createFromInputFallback = u("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function (a) {
    a._d = new Date(a._i + (a._useUTC ? " UTC" : ""));
  }), R("Y", 0, 0, function () {
    var a = this.year();return 9999 >= a ? "" + a : "+" + a;
  }), R(0, ["YY", 2], 0, function () {
    return this.year() % 100;
  }), R(0, ["YYYY", 4], 0, "year"), R(0, ["YYYYY", 5], 0, "year"), R(0, ["YYYYYY", 6, !0], 0, "year"), J("year", "y"), W("Y", Fd), W("YY", yd, ud), W("YYYY", Cd, wd), W("YYYYY", Dd, xd), W("YYYYYY", Dd, xd), $(["YYYYY", "YYYYYY"], Md), $("YYYY", function (b, c) {
    c[Md] = 2 === b.length ? a.parseTwoDigitYear(b) : r(b);
  }), $("YY", function (b, c) {
    c[Md] = a.parseTwoDigitYear(b);
  }), $("Y", function (a, b) {
    b[Md] = parseInt(a, 10);
  }), a.parseTwoDigitYear = function (a) {
    return r(a) + (r(a) > 68 ? 1900 : 2e3);
  };var ee = M("FullYear", !0);a.ISO_8601 = function () {};var fe = u("moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function () {
    var a = Ka.apply(null, arguments);return this.isValid() && a.isValid() ? this > a ? this : a : l();
  }),
      ge = u("moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function () {
    var a = Ka.apply(null, arguments);return this.isValid() && a.isValid() ? a > this ? this : a : l();
  }),
      he = function he() {
    return Date.now ? Date.now() : +new Date();
  };Qa("Z", ":"), Qa("ZZ", ""), W("Z", Hd), W("ZZ", Hd), $(["Z", "ZZ"], function (a, b, c) {
    c._useUTC = !0, c._tzm = Ra(Hd, a);
  });var ie = /([\+\-]|\d\d)/gi;a.updateOffset = function () {};var je = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,
      ke = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;db.fn = Oa.prototype;var le = ib(1, "add"),
      me = ib(-1, "subtract");a.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", a.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";var ne = u("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (a) {
    return void 0 === a ? this.localeData() : this.locale(a);
  });R(0, ["gg", 2], 0, function () {
    return this.weekYear() % 100;
  }), R(0, ["GG", 2], 0, function () {
    return this.isoWeekYear() % 100;
  }), Pb("gggg", "weekYear"), Pb("ggggg", "weekYear"), Pb("GGGG", "isoWeekYear"), Pb("GGGGG", "isoWeekYear"), J("weekYear", "gg"), J("isoWeekYear", "GG"), W("G", Fd), W("g", Fd), W("GG", yd, ud), W("gg", yd, ud), W("GGGG", Cd, wd), W("gggg", Cd, wd), W("GGGGG", Dd, xd), W("ggggg", Dd, xd), _(["gggg", "ggggg", "GGGG", "GGGGG"], function (a, b, c, d) {
    b[d.substr(0, 2)] = r(a);
  }), _(["gg", "GG"], function (b, c, d, e) {
    c[e] = a.parseTwoDigitYear(b);
  }), R("Q", 0, "Qo", "quarter"), J("quarter", "Q"), W("Q", td), $("Q", function (a, b) {
    b[Nd] = 3 * (r(a) - 1);
  }), R("w", ["ww", 2], "wo", "week"), R("W", ["WW", 2], "Wo", "isoWeek"), J("week", "w"), J("isoWeek", "W"), W("w", yd), W("ww", yd, ud), W("W", yd), W("WW", yd, ud), _(["w", "ww", "W", "WW"], function (a, b, c, d) {
    b[d.substr(0, 1)] = r(a);
  });var oe = { dow: 0, doy: 6 };R("D", ["DD", 2], "Do", "date"), J("date", "D"), W("D", yd), W("DD", yd, ud), W("Do", function (a, b) {
    return a ? b._ordinalParse : b._ordinalParseLenient;
  }), $(["D", "DD"], Od), $("Do", function (a, b) {
    b[Od] = r(a.match(yd)[0], 10);
  });var pe = M("Date", !0);R("d", 0, "do", "day"), R("dd", 0, 0, function (a) {
    return this.localeData().weekdaysMin(this, a);
  }), R("ddd", 0, 0, function (a) {
    return this.localeData().weekdaysShort(this, a);
  }), R("dddd", 0, 0, function (a) {
    return this.localeData().weekdays(this, a);
  }), R("e", 0, 0, "weekday"), R("E", 0, 0, "isoWeekday"), J("day", "d"), J("weekday", "e"), J("isoWeekday", "E"), W("d", yd), W("e", yd), W("E", yd), W("dd", function (a, b) {
    return b.weekdaysMinRegex(a);
  }), W("ddd", function (a, b) {
    return b.weekdaysShortRegex(a);
  }), W("dddd", function (a, b) {
    return b.weekdaysRegex(a);
  }), _(["dd", "ddd", "dddd"], function (a, b, c, d) {
    var e = c._locale.weekdaysParse(a, d, c._strict);null != e ? b.d = e : j(c).invalidWeekday = a;
  }), _(["d", "e", "E"], function (a, b, c, d) {
    b[d] = r(a);
  });var qe = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      re = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
      se = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
      te = Jd,
      ue = Jd,
      ve = Jd;R("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), J("dayOfYear", "DDD"), W("DDD", Bd), W("DDDD", vd), $(["DDD", "DDDD"], function (a, b, c) {
    c._dayOfYear = r(a);
  }), R("H", ["HH", 2], 0, "hour"), R("h", ["hh", 2], 0, oc), R("k", ["kk", 2], 0, pc), R("hmm", 0, 0, function () {
    return "" + oc.apply(this) + Q(this.minutes(), 2);
  }), R("hmmss", 0, 0, function () {
    return "" + oc.apply(this) + Q(this.minutes(), 2) + Q(this.seconds(), 2);
  }), R("Hmm", 0, 0, function () {
    return "" + this.hours() + Q(this.minutes(), 2);
  }), R("Hmmss", 0, 0, function () {
    return "" + this.hours() + Q(this.minutes(), 2) + Q(this.seconds(), 2);
  }), qc("a", !0), qc("A", !1), J("hour", "h"), W("a", rc), W("A", rc), W("H", yd), W("h", yd), W("HH", yd, ud), W("hh", yd, ud), W("hmm", zd), W("hmmss", Ad), W("Hmm", zd), W("Hmmss", Ad), $(["H", "HH"], Pd), $(["a", "A"], function (a, b, c) {
    c._isPm = c._locale.isPM(a), c._meridiem = a;
  }), $(["h", "hh"], function (a, b, c) {
    b[Pd] = r(a), j(c).bigHour = !0;
  }), $("hmm", function (a, b, c) {
    var d = a.length - 2;b[Pd] = r(a.substr(0, d)), b[Qd] = r(a.substr(d)), j(c).bigHour = !0;
  }), $("hmmss", function (a, b, c) {
    var d = a.length - 4,
        e = a.length - 2;b[Pd] = r(a.substr(0, d)), b[Qd] = r(a.substr(d, 2)), b[Rd] = r(a.substr(e)), j(c).bigHour = !0;
  }), $("Hmm", function (a, b, c) {
    var d = a.length - 2;b[Pd] = r(a.substr(0, d)), b[Qd] = r(a.substr(d));
  }), $("Hmmss", function (a, b, c) {
    var d = a.length - 4,
        e = a.length - 2;b[Pd] = r(a.substr(0, d)), b[Qd] = r(a.substr(d, 2)), b[Rd] = r(a.substr(e));
  });var we = /[ap]\.?m?\.?/i,
      xe = M("Hours", !0);R("m", ["mm", 2], 0, "minute"), J("minute", "m"), W("m", yd), W("mm", yd, ud), $(["m", "mm"], Qd);var ye = M("Minutes", !1);R("s", ["ss", 2], 0, "second"), J("second", "s"), W("s", yd), W("ss", yd, ud), $(["s", "ss"], Rd);var ze = M("Seconds", !1);R("S", 0, 0, function () {
    return ~~(this.millisecond() / 100);
  }), R(0, ["SS", 2], 0, function () {
    return ~~(this.millisecond() / 10);
  }), R(0, ["SSS", 3], 0, "millisecond"), R(0, ["SSSS", 4], 0, function () {
    return 10 * this.millisecond();
  }), R(0, ["SSSSS", 5], 0, function () {
    return 100 * this.millisecond();
  }), R(0, ["SSSSSS", 6], 0, function () {
    return 1e3 * this.millisecond();
  }), R(0, ["SSSSSSS", 7], 0, function () {
    return 1e4 * this.millisecond();
  }), R(0, ["SSSSSSSS", 8], 0, function () {
    return 1e5 * this.millisecond();
  }), R(0, ["SSSSSSSSS", 9], 0, function () {
    return 1e6 * this.millisecond();
  }), J("millisecond", "ms"), W("S", Bd, td), W("SS", Bd, ud), W("SSS", Bd, vd);var Ae;for (Ae = "SSSS"; Ae.length <= 9; Ae += "S") {
    W(Ae, Ed);
  }for (Ae = "S"; Ae.length <= 9; Ae += "S") {
    $(Ae, uc);
  }var Be = M("Milliseconds", !1);R("z", 0, 0, "zoneAbbr"), R("zz", 0, 0, "zoneName");var Ce = o.prototype;Ce.add = le, Ce.calendar = kb, Ce.clone = lb, Ce.diff = sb, Ce.endOf = Eb, Ce.format = wb, Ce.from = xb, Ce.fromNow = yb, Ce.to = zb, Ce.toNow = Ab, Ce.get = P, Ce.invalidAt = Nb, Ce.isAfter = mb, Ce.isBefore = nb, Ce.isBetween = ob, Ce.isSame = pb, Ce.isSameOrAfter = qb, Ce.isSameOrBefore = rb, Ce.isValid = Lb, Ce.lang = ne, Ce.locale = Bb, Ce.localeData = Cb, Ce.max = ge, Ce.min = fe, Ce.parsingFlags = Mb, Ce.set = P, Ce.startOf = Db, Ce.subtract = me, Ce.toArray = Ib, Ce.toObject = Jb, Ce.toDate = Hb, Ce.toISOString = vb, Ce.toJSON = Kb, Ce.toString = ub, Ce.unix = Gb, Ce.valueOf = Fb, Ce.creationData = Ob, Ce.year = ee, Ce.isLeapYear = ta, Ce.weekYear = Qb, Ce.isoWeekYear = Rb, Ce.quarter = Ce.quarters = Wb, Ce.month = ha, Ce.daysInMonth = ia, Ce.week = Ce.weeks = $b, Ce.isoWeek = Ce.isoWeeks = _b, Ce.weeksInYear = Tb, Ce.isoWeeksInYear = Sb, Ce.date = pe, Ce.day = Ce.days = gc, Ce.weekday = hc, Ce.isoWeekday = ic, Ce.dayOfYear = nc, Ce.hour = Ce.hours = xe, Ce.minute = Ce.minutes = ye, Ce.second = Ce.seconds = ze, Ce.millisecond = Ce.milliseconds = Be, Ce.utcOffset = Ua, Ce.utc = Wa, Ce.local = Xa, Ce.parseZone = Ya, Ce.hasAlignedHourOffset = Za, Ce.isDST = $a, Ce.isDSTShifted = _a, Ce.isLocal = ab, Ce.isUtcOffset = bb, Ce.isUtc = cb, Ce.isUTC = cb, Ce.zoneAbbr = vc, Ce.zoneName = wc, Ce.dates = u("dates accessor is deprecated. Use date instead.", pe), Ce.months = u("months accessor is deprecated. Use month instead", ha), Ce.years = u("years accessor is deprecated. Use year instead", ee), Ce.zone = u("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", Va);var De = Ce,
      Ee = { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" },
      Fe = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" },
      Ge = "Invalid date",
      He = "%d",
      Ie = /\d{1,2}/,
      Je = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" },
      Ke = A.prototype;Ke._calendar = Ee, Ke.calendar = zc, Ke._longDateFormat = Fe, Ke.longDateFormat = Ac, Ke._invalidDate = Ge, Ke.invalidDate = Bc, Ke._ordinal = He, Ke.ordinal = Cc, Ke._ordinalParse = Ie, Ke.preparse = Dc, Ke.postformat = Dc, Ke._relativeTime = Je, Ke.relativeTime = Ec, Ke.pastFuture = Fc, Ke.set = y, Ke.months = ca, Ke._months = Wd, Ke.monthsShort = da, Ke._monthsShort = Xd, Ke.monthsParse = fa, Ke._monthsRegex = Zd, Ke.monthsRegex = ka, Ke._monthsShortRegex = Yd, Ke.monthsShortRegex = ja, Ke.week = Xb, Ke._week = oe, Ke.firstDayOfYear = Zb, Ke.firstDayOfWeek = Yb, Ke.weekdays = bc, Ke._weekdays = qe, Ke.weekdaysMin = dc, Ke._weekdaysMin = se, Ke.weekdaysShort = cc, Ke._weekdaysShort = re, Ke.weekdaysParse = fc, Ke._weekdaysRegex = te, Ke.weekdaysRegex = jc, Ke._weekdaysShortRegex = ue, Ke.weekdaysShortRegex = kc, Ke._weekdaysMinRegex = ve, Ke.weekdaysMinRegex = lc, Ke.isPM = sc, Ke._meridiemParse = we, Ke.meridiem = tc, E("en", { ordinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function ordinal(a) {
      var b = a % 10,
          c = 1 === r(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";return a + c;
    } }), a.lang = u("moment.lang is deprecated. Use moment.locale instead.", E), a.langData = u("moment.langData is deprecated. Use moment.localeData instead.", H);var Le = Math.abs,
      Me = Yc("ms"),
      Ne = Yc("s"),
      Oe = Yc("m"),
      Pe = Yc("h"),
      Qe = Yc("d"),
      Re = Yc("w"),
      Se = Yc("M"),
      Te = Yc("y"),
      Ue = $c("milliseconds"),
      Ve = $c("seconds"),
      We = $c("minutes"),
      Xe = $c("hours"),
      Ye = $c("days"),
      Ze = $c("months"),
      $e = $c("years"),
      _e = Math.round,
      af = { s: 45, m: 45, h: 22, d: 26, M: 11 },
      bf = Math.abs,
      cf = Oa.prototype;cf.abs = Oc, cf.add = Qc, cf.subtract = Rc, cf.as = Wc, cf.asMilliseconds = Me, cf.asSeconds = Ne, cf.asMinutes = Oe, cf.asHours = Pe, cf.asDays = Qe, cf.asWeeks = Re, cf.asMonths = Se, cf.asYears = Te, cf.valueOf = Xc, cf._bubble = Tc, cf.get = Zc, cf.milliseconds = Ue, cf.seconds = Ve, cf.minutes = We, cf.hours = Xe, cf.days = Ye, cf.weeks = _c, cf.months = Ze, cf.years = $e, cf.humanize = dd, cf.toISOString = ed, cf.toString = ed, cf.toJSON = ed, cf.locale = Bb, cf.localeData = Cb, cf.toIsoString = u("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", ed), cf.lang = ne, R("X", 0, 0, "unix"), R("x", 0, 0, "valueOf"), W("x", Fd), W("X", Id), $("X", function (a, b, c) {
    c._d = new Date(1e3 * parseFloat(a, 10));
  }), $("x", function (a, b, c) {
    c._d = new Date(r(a));
  }), a.version = "2.13.0", b(Ka), a.fn = De, a.min = Ma, a.max = Na, a.now = he, a.utc = h, a.unix = xc, a.months = Jc, a.isDate = d, a.locale = E, a.invalid = l, a.duration = db, a.isMoment = p, a.weekdays = Lc, a.parseZone = yc, a.localeData = H, a.isDuration = Pa, a.monthsShort = Kc, a.weekdaysMin = Nc, a.defineLocale = F, a.updateLocale = G, a.locales = I, a.weekdaysShort = Mc, a.normalizeUnits = K, a.relativeTimeThreshold = cd, a.prototype = De;var df = a;return df;
});
});

require.register("web/static/js/time.js", function(exports, require, module) {
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @file Prayer Timetable
 * @author Ensar ensar@farend.net
 * @copyright Ensar ensar@farend.net
 * @license Used momentjs library for time manipulation, rest of code free for distribution provided this info is included.
 */

(function () {

	function timeDef(nextDay) {
		var _ref;

		// 

		var nextDay = nextDay;

		var now = moment().tz("Europe/Dublin").add(nextDay, 'd');;
		if (now.year() % 4 == 0) var leap = true;else var leap = false;
		// console.log(leap);

		var dayOfYear = now.dayOfYear();
		if (leap == true) daysInYear = 366;else daysInYear = 365;
		// console.log(dayOfYear);
		if (leap == false) dayOfYear += 1;
		var prayerTimes = timetable[dayOfYear];

		var fajrTimeStr = now.year() + '-' + (now.month() + 1) + '-' + now.date() + ' ' + prayerTimes[0];
		var shurooqTimeStr = now.year() + '-' + (now.month() + 1) + '-' + now.date() + ' ' + prayerTimes[1];
		var dhuhrTimeStr = now.year() + '-' + (now.month() + 1) + '-' + now.date() + ' ' + prayerTimes[2];
		var asrTimeStr = now.year() + '-' + (now.month() + 1) + '-' + now.date() + ' ' + prayerTimes[3];
		var maghribTimeStr = now.year() + '-' + (now.month() + 1) + '-' + now.date() + ' ' + prayerTimes[4];
		var ishaTimeStr = now.year() + '-' + (now.month() + 1) + '-' + now.date() + ' ' + prayerTimes[5];

		var fajrTime = moment(fajrTimeStr, "YYYY-M-D hh:mm");
		var shurooqTime = moment(shurooqTimeStr, "YYYY-M-D hh:mm");
		var dhuhrTime = moment(dhuhrTimeStr, "YYYY-M-D hh:mm");
		var asrTime = moment(asrTimeStr, "YYYY-M-D hh:mm");
		var maghribTime = moment(maghribTimeStr, "YYYY-M-D hh:mm");
		var ishaTime = moment(ishaTimeStr, "YYYY-M-D hh:mm");
		var midnightTimePass = now.clone().startOf('day');
		var midnightTimeNext = now.clone().endOf('day');

		/********** Next Prayer **********/
		var checkBeforeFajr = moment(now).isBefore(fajrTime);
		var checkBeforeShurooq = moment(now).isBefore(shurooqTime);
		var checkBeforeDhuhr = moment(now).isBefore(dhuhrTime);
		var checkBeforeAsr = moment(now).isBefore(asrTime);
		var checkBeforeMaghrib = moment(now).isBefore(maghribTime);
		var checkBeforeIsha = moment(now).isBefore(ishaTime);
		var checkBeforeMidnight = moment(now).isBefore(midnightTimeNext);

		if (checkBeforeMidnight == true) {
			var nextPrayerName = "fajr";
			var nextPrayerTime = fajrTime;
			var currentPrayerName = "isha";
			var nextDay = 1;
		}
		if (checkBeforeIsha == true) {
			var nextPrayerName = "isha";
			var nextPrayerTime = ishaTime;
			var currentPrayerName = "maghrib";
			var nextDay = 0;
		}
		if (checkBeforeMaghrib == true) {
			var nextPrayerName = "maghrib";
			var nextPrayerTime = maghribTime;
			var currentPrayerName = "asr";
			var nextDay = 0;
		}
		if (checkBeforeAsr == true) {
			var nextPrayerName = "asr";
			var nextPrayerTime = asrTime;
			var currentPrayerName = "dhuhr";
			var nextDay = 0;
		}
		if (checkBeforeDhuhr == true) {
			var nextPrayerName = "dhuhr";
			var nextPrayerTime = dhuhrTime;
			var currentPrayerName = "duha";
			var nextDay = 0;
		}
		if (checkBeforeShurooq == true) {
			var nextPrayerName = "dhuhr";
			var nextPrayerTime = dhuhrTime;
			var currentPrayerName = "fajr";
			var nextDay = 0;
		}
		if (checkBeforeFajr == true) {
			var nextPrayerName = "fajr";
			var nextPrayerTime = fajrTime;
			var currentPrayerName = "night prayer";
			var nextDay = 0;
		}

		/********** Ramadan **********/
		if (checkBeforeFajr == true) {
			var fastingTime = fajrTime;
			var fastingTimeName = "fasting";
		} else if (checkBeforeMaghrib == true) {
			var fastingTime = maghribTime;
			var fastingTimeName = "iftar";
		} else {
			var fastingTime = fajrTime.add(1, 'd');
			var fastingTimeName = "fasting";
		}

		/********** Countdown **********/
		var countNextPrayerTime = moment.utc(moment(nextPrayerTime).diff(moment(now))).endOf('second').add(1, 's').format("HH:mm:ss");
		var countFastingTime = moment.utc(moment(fastingTime).diff(moment(now))).add(1, 's').format("HH:mm:ss");

		// jama'ah times: fixed, afterthis, beforenext - getting innerText from spans
		// var fajrJammahType = [document.getElementById("fajr-method").innerText, document.getElementById("fajr-number").innerText]

		// var dhuhrJamaahType = [document.getElementById("dhuhr-method").innerText, document.getElementById("dhuhr-number").innerText]
		// var asrJamaahType = [document.getElementById("asr-method").innerText, document.getElementById("asr-number").innerText]
		// var maghribJamaahType = [document.getElementById("maghrib-method").innerText, document.getElementById("maghrib-number").innerText]
		// var ishaJamaahType = [document.getElementById("isha-method").innerText, document.getElementById("isha-number").innerText]


		// var fajrJamaah = moment(shurooqTime).subtract(fajrJammahType[1], 'minutes');

		// var dhuhrJamaahStr = now.year()+'-'+(now.month()+1)+'-'+now.date()+' '+dhuhrJamaahType[1];
		// var dhuhrJamaah = moment(dhuhrJamaahStr,"YYYY-M-D hh:mm");

		// var asrJamaah = moment(asrTime).add(asrJamaahType[1], 'minutes');

		// var maghribJamaah = moment(maghribTime).add(maghribJamaahType[1], 'minutes');

		// var ishaJamaahStr = now.year()+'-'+(now.month()+1)+'-'+now.date()+' '+ishaJamaahType[1];
		// var ishaJamaah = moment(ishaJamaahStr,"YYYY-M-D hh:mm");

		var fajrJamaahOffset = document.getElementById("fajr-method").innerText;

		var fajrJamaah = "";
		var dhuhrJamaah = "";
		var asrJamaah = "";
		var maghribJamaah = "";
		var ishaJamaah = "";
		// // console.log(fajrJamaah.format('HH:mm'))
		// console.log(shurooqTime.format('HH:mm'))
		// console.log(dhuhrJamaah.format('HH:mm'))


		return _ref = { now: now, countNextPrayerTime: countNextPrayerTime, nextDay: nextDay, nextPrayerName: nextPrayerName,
			fajrTime: fajrTime, shurooqTime: shurooqTime, dhuhrTime: dhuhrTime, asrTime: asrTime, maghribTime: maghribTime, ishaTime: ishaTime
		}, _defineProperty(_ref, 'nextPrayerName', nextPrayerName), _defineProperty(_ref, 'countNextPrayerTime', countNextPrayerTime), _defineProperty(_ref, 'fastingTimeName', fastingTimeName), _defineProperty(_ref, 'countFastingTime', countFastingTime), _defineProperty(_ref, 'dayOfYear', dayOfYear), _defineProperty(_ref, 'daysInYear', daysInYear), _defineProperty(_ref, 'fajrJamaah', fajrJamaah), _defineProperty(_ref, 'dhuhrJamaah', dhuhrJamaah), _defineProperty(_ref, 'asrJamaah', asrJamaah), _defineProperty(_ref, 'maghribJamaah', maghribJamaah), _defineProperty(_ref, 'ishaJamaah', ishaJamaah), _ref;
	};

	if (!nextDay) var nextDay = 0; //if nextDay is not defined


	(function timeDisplay(nextDay) {

		var def = timeDef(nextDay);

		var nextDay = def.nextDay;

		/********** Parse to HTML **********/
		document.getElementById("time").innerHTML = def.now.format('HH:mm:ss');
		//document.getElementById("date").innerHTML = def.now.format('[<div>]dddd [</div><div>] D MMMM YYYY [</div>]');//without hijri
		document.getElementById("date").innerHTML = def.now.format('[<div>]dddd [</div><div>] iD iMMMM iYYYY [</div><div>] D MMMM YYYY [</div>]');

		// Prayer time display
		document.getElementById("prayer-time-fajr").innerHTML = def.fajrTime.format('HH:mm');
		document.getElementById("prayer-time-shurooq").innerHTML = def.shurooqTime.format('HH:mm');
		document.getElementById("prayer-time-dhuhr").innerHTML = def.dhuhrTime.format('HH:mm');
		document.getElementById("prayer-time-asr").innerHTML = def.asrTime.format('HH:mm');
		document.getElementById("prayer-time-maghrib").innerHTML = def.maghribTime.format('HH:mm');
		document.getElementById("prayer-time-isha").innerHTML = def.ishaTime.format('HH:mm');
		// Jamaah time display
		document.getElementById("jamaah-time-fajr").innerHTML = def.fajrJamaah.format('HH:mm');
		document.getElementById("jamaah-time-dhuhr").innerHTML = def.dhuhrJamaah.format('HH:mm');
		document.getElementById("jamaah-time-asr").innerHTML = def.asrJamaah.format('HH:mm');
		document.getElementById("jamaah-time-maghrib").innerHTML = def.maghribJamaah.format('HH:mm');
		document.getElementById("jamaah-time-isha").innerHTML = def.ishaJamaah.format('HH:mm');

		document.getElementById("days-year").innerHTML = def.dayOfYear + "/" + def.daysInYear;

		document.getElementById("pending-name").innerHTML = def.nextPrayerName;
		document.getElementById("timetoprayer").innerHTML = def.countNextPrayerTime;
		//document.getElementById("timetofast").innerHTML = def.countFastingTime;
		//document.getElementById("next-fast").innerHTML = def.fastingTimeName;

		setTimeout(function () {
			timeDisplay(nextDay);
		}, 1000);

		document.getElementById("fajr").className = "";document.getElementById("shurooq").className = "";document.getElementById("dhuhr").className = "";
		document.getElementById("asr").className = "";document.getElementById("maghrib").className = "";document.getElementById("isha").className = "";
		document.getElementById(def.nextPrayerName).className = "next";

		return nextDay;
	})(nextDay);
})();
});

require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

require('web/static/js/app');
//# sourceMappingURL=app.js.map