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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="modules/ctrl/loginctrl.js" />
	/// <reference path="modules/services/symbolservice.js" />
	/// <reference path="modules/ctrl/symbolctrl.js" />
	/// <reference path="../../../node_modules/redux/dist/redux.js"/>
	/// <reference path="modules/ctrl/reduxAction.js"/>
	var avalon = __webpack_require__(1);
	var symbolService = __webpack_require__(2);
	var Redux = __webpack_require__(5);
	var ReduxActionDefined = __webpack_require__(6);
	
	var modules = {
	    symbol: null,
	    order: null
	};
	function CreateGlobalStore(inverstmentCtrl) {
	    //http://cn.redux.js.org/docs/introduction/ThreePrinciples.html
	    var globalState = {
	        currentSymbolId: 0,
	        isLogin: false
	    };
	    function globalReduce(state, action) {
	        if (typeof state === 'undefined') {
	            state = globalState;
	        }
	        switch (action.type) {
	            case ReduxActionDefined.DEFINED.ChangeSymbol:
	                console.log('change to ', action.symbol);
	                inverstmentCtrl.setSymbol(action.symbol);
	                break;
	            case ReduxActionDefined.DEFINED.Login:
	                console.log("start quotation substribe.");
	                modules.symol.StartQuotationProvider();
	                modules.order.Start();
	                break;
	            case ReduxActionDefined.DEFINED.Logout:
	                break;
	            default:
	                return state;
	        }
	    }
	    var symbolStore = Redux.createStore(globalReduce);
	    return symbolStore;
	}
	function init() {
	
	    //初始化购买面版
	    var inverstmentCtrl = __webpack_require__(7).createCtrl();
	    var symbolStore = CreateGlobalStore(inverstmentCtrl);
	
	    //品种面版，
	    modules.symol = __webpack_require__(9);
	    modules.symol.CreateCtrl("ws://localhost:5000/quote", symbolStore);
	
	    //orders
	    modules.order = __webpack_require__(12);
	    modules.order.CreateCtrl("ws://localhost:5000/notify/order", symbolStore);
	
	    //登录
	    var loginCtrl = __webpack_require__(14).init(symbolStore);
	
	}
	
	init();

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = avalon;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../webapi.js" />
	var webApi=__webpack_require__(3).create("/api/symbols");
	
	module.exports = {
	    list: function () {
	        return webApi.Get();
	    }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(4);
	
	function WepApi(url) {
	    this.opts = {
	        url: url,
	        contentType: "application/json; charset=utf-8"
	    };
	
	    this.Put = function (data) {
	        /// <summary>
	        /// 
	        /// </summary>
	        /// <param name="data"></param>
	        /// <param name="func"></param>
	
	        var opts = this.ext.call(this, "PUT", data);
	
	        return $.ajax(opts);
	    };
	
	    this.Delete = function (data) {
	        /// <summary>
	        /// 
	        /// </summary>
	        /// <param name="data"></param>
	        /// <param name="func"></param>
	        var opts = this.ext.call(this, "DELETE", data);
	        if (data.id) {
	            opts.url += "/" + data.id;
	        }
	        return $.ajax(opts);
	    };
	    this.Post = function (data) {
	        /// <summary>
	        /// 
	        /// </summary>
	        /// <param name="data"></param>
	        /// <param name="func"></param>
	        var opts = this.ext.call(this, "POST", data);
	        return $.ajax(opts);
	    };
	    this.Get = function (data) {
	        /// <summary>
	        /// 
	        /// </summary>
	        /// <param name="data"></param>
	        /// <param name="func"></param>
	        var opts = this.ext.call(this, "GET", data);
	        return $.ajax(opts);
	    };
	
	
	    this.ext = function (method, data) {
	
	        var a = $.extend({}, this.opts, { type: method });
	
	        a.data = method !== "GET" ? JSON.stringify(data) : data;
	
	        return a;
	    };
	}
	
	
	module.exports = {
	    create: function (url) {
	        return new WepApi(url);
	    }
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["Redux"] = factory();
		else
			root["Redux"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	
	
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		exports.__esModule = true;
		exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;
	
		var _createStore = __webpack_require__(2);
	
		var _createStore2 = _interopRequireDefault(_createStore);
	
		var _combineReducers = __webpack_require__(7);
	
		var _combineReducers2 = _interopRequireDefault(_combineReducers);
	
		var _bindActionCreators = __webpack_require__(6);
	
		var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);
	
		var _applyMiddleware = __webpack_require__(5);
	
		var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);
	
		var _compose = __webpack_require__(1);
	
		var _compose2 = _interopRequireDefault(_compose);
	
		var _warning = __webpack_require__(3);
	
		var _warning2 = _interopRequireDefault(_warning);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		/*
		* This is a dummy function to check if the function name has been altered by minification.
		* If the function has been minified and NODE_ENV !== 'production', warn the user.
		*/
		function isCrushed() {}
	
		if (("development") !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
		  (0, _warning2['default'])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
		}
	
		exports.createStore = _createStore2['default'];
		exports.combineReducers = _combineReducers2['default'];
		exports.bindActionCreators = _bindActionCreators2['default'];
		exports.applyMiddleware = _applyMiddleware2['default'];
		exports.compose = _compose2['default'];
	
	/***/ },
	/* 1 */
	/***/ function(module, exports) {
	
		"use strict";
	
		exports.__esModule = true;
		exports["default"] = compose;
		/**
		 * Composes single-argument functions from right to left. The rightmost
		 * function can take multiple arguments as it provides the signature for
		 * the resulting composite function.
		 *
		 * @param {...Function} funcs The functions to compose.
		 * @returns {Function} A function obtained by composing the argument functions
		 * from right to left. For example, compose(f, g, h) is identical to doing
		 * (...args) => f(g(h(...args))).
		 */
	
		function compose() {
		  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
		    funcs[_key] = arguments[_key];
		  }
	
		  if (funcs.length === 0) {
		    return function (arg) {
		      return arg;
		    };
		  }
	
		  if (funcs.length === 1) {
		    return funcs[0];
		  }
	
		  var last = funcs[funcs.length - 1];
		  var rest = funcs.slice(0, -1);
		  return function () {
		    return rest.reduceRight(function (composed, f) {
		      return f(composed);
		    }, last.apply(undefined, arguments));
		  };
		}
	
	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		exports.__esModule = true;
		exports.ActionTypes = undefined;
		exports['default'] = createStore;
	
		var _isPlainObject = __webpack_require__(4);
	
		var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
		var _symbolObservable = __webpack_require__(12);
	
		var _symbolObservable2 = _interopRequireDefault(_symbolObservable);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		/**
		 * These are private action types reserved by Redux.
		 * For any unknown actions, you must return the current state.
		 * If the current state is undefined, you must return the initial state.
		 * Do not reference these action types directly in your code.
		 */
		var ActionTypes = exports.ActionTypes = {
		  INIT: '@@redux/INIT'
		};
	
		/**
		 * Creates a Redux store that holds the state tree.
		 * The only way to change the data in the store is to call `dispatch()` on it.
		 *
		 * There should only be a single store in your app. To specify how different
		 * parts of the state tree respond to actions, you may combine several reducers
		 * into a single reducer function by using `combineReducers`.
		 *
		 * @param {Function} reducer A function that returns the next state tree, given
		 * the current state tree and the action to handle.
		 *
		 * @param {any} [preloadedState] The initial state. You may optionally specify it
		 * to hydrate the state from the server in universal apps, or to restore a
		 * previously serialized user session.
		 * If you use `combineReducers` to produce the root reducer function, this must be
		 * an object with the same shape as `combineReducers` keys.
		 *
		 * @param {Function} enhancer The store enhancer. You may optionally specify it
		 * to enhance the store with third-party capabilities such as middleware,
		 * time travel, persistence, etc. The only store enhancer that ships with Redux
		 * is `applyMiddleware()`.
		 *
		 * @returns {Store} A Redux store that lets you read the state, dispatch actions
		 * and subscribe to changes.
		 */
		function createStore(reducer, preloadedState, enhancer) {
		  var _ref2;
	
		  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
		    enhancer = preloadedState;
		    preloadedState = undefined;
		  }
	
		  if (typeof enhancer !== 'undefined') {
		    if (typeof enhancer !== 'function') {
		      throw new Error('Expected the enhancer to be a function.');
		    }
	
		    return enhancer(createStore)(reducer, preloadedState);
		  }
	
		  if (typeof reducer !== 'function') {
		    throw new Error('Expected the reducer to be a function.');
		  }
	
		  var currentReducer = reducer;
		  var currentState = preloadedState;
		  var currentListeners = [];
		  var nextListeners = currentListeners;
		  var isDispatching = false;
	
		  function ensureCanMutateNextListeners() {
		    if (nextListeners === currentListeners) {
		      nextListeners = currentListeners.slice();
		    }
		  }
	
		  /**
		   * Reads the state tree managed by the store.
		   *
		   * @returns {any} The current state tree of your application.
		   */
		  function getState() {
		    return currentState;
		  }
	
		  /**
		   * Adds a change listener. It will be called any time an action is dispatched,
		   * and some part of the state tree may potentially have changed. You may then
		   * call `getState()` to read the current state tree inside the callback.
		   *
		   * You may call `dispatch()` from a change listener, with the following
		   * caveats:
		   *
		   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
		   * If you subscribe or unsubscribe while the listeners are being invoked, this
		   * will not have any effect on the `dispatch()` that is currently in progress.
		   * However, the next `dispatch()` call, whether nested or not, will use a more
		   * recent snapshot of the subscription list.
		   *
		   * 2. The listener should not expect to see all state changes, as the state
		   * might have been updated multiple times during a nested `dispatch()` before
		   * the listener is called. It is, however, guaranteed that all subscribers
		   * registered before the `dispatch()` started will be called with the latest
		   * state by the time it exits.
		   *
		   * @param {Function} listener A callback to be invoked on every dispatch.
		   * @returns {Function} A function to remove this change listener.
		   */
		  function subscribe(listener) {
		    if (typeof listener !== 'function') {
		      throw new Error('Expected listener to be a function.');
		    }
	
		    var isSubscribed = true;
	
		    ensureCanMutateNextListeners();
		    nextListeners.push(listener);
	
		    return function unsubscribe() {
		      if (!isSubscribed) {
		        return;
		      }
	
		      isSubscribed = false;
	
		      ensureCanMutateNextListeners();
		      var index = nextListeners.indexOf(listener);
		      nextListeners.splice(index, 1);
		    };
		  }
	
		  /**
		   * Dispatches an action. It is the only way to trigger a state change.
		   *
		   * The `reducer` function, used to create the store, will be called with the
		   * current state tree and the given `action`. Its return value will
		   * be considered the **next** state of the tree, and the change listeners
		   * will be notified.
		   *
		   * The base implementation only supports plain object actions. If you want to
		   * dispatch a Promise, an Observable, a thunk, or something else, you need to
		   * wrap your store creating function into the corresponding middleware. For
		   * example, see the documentation for the `redux-thunk` package. Even the
		   * middleware will eventually dispatch plain object actions using this method.
		   *
		   * @param {Object} action A plain object representing “what changed”. It is
		   * a good idea to keep actions serializable so you can record and replay user
		   * sessions, or use the time travelling `redux-devtools`. An action must have
		   * a `type` property which may not be `undefined`. It is a good idea to use
		   * string constants for action types.
		   *
		   * @returns {Object} For convenience, the same action object you dispatched.
		   *
		   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
		   * return something else (for example, a Promise you can await).
		   */
		  function dispatch(action) {
		    if (!(0, _isPlainObject2['default'])(action)) {
		      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
		    }
	
		    if (typeof action.type === 'undefined') {
		      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
		    }
	
		    if (isDispatching) {
		      throw new Error('Reducers may not dispatch actions.');
		    }
	
		    try {
		      isDispatching = true;
		      currentState = currentReducer(currentState, action);
		    } finally {
		      isDispatching = false;
		    }
	
		    var listeners = currentListeners = nextListeners;
		    for (var i = 0; i < listeners.length; i++) {
		      listeners[i]();
		    }
	
		    return action;
		  }
	
		  /**
		   * Replaces the reducer currently used by the store to calculate the state.
		   *
		   * You might need this if your app implements code splitting and you want to
		   * load some of the reducers dynamically. You might also need this if you
		   * implement a hot reloading mechanism for Redux.
		   *
		   * @param {Function} nextReducer The reducer for the store to use instead.
		   * @returns {void}
		   */
		  function replaceReducer(nextReducer) {
		    if (typeof nextReducer !== 'function') {
		      throw new Error('Expected the nextReducer to be a function.');
		    }
	
		    currentReducer = nextReducer;
		    dispatch({ type: ActionTypes.INIT });
		  }
	
		  /**
		   * Interoperability point for observable/reactive libraries.
		   * @returns {observable} A minimal observable of state changes.
		   * For more information, see the observable proposal:
		   * https://github.com/zenparsing/es-observable
		   */
		  function observable() {
		    var _ref;
	
		    var outerSubscribe = subscribe;
		    return _ref = {
		      /**
		       * The minimal observable subscription method.
		       * @param {Object} observer Any object that can be used as an observer.
		       * The observer object should have a `next` method.
		       * @returns {subscription} An object with an `unsubscribe` method that can
		       * be used to unsubscribe the observable from the store, and prevent further
		       * emission of values from the observable.
		       */
		      subscribe: function subscribe(observer) {
		        if (typeof observer !== 'object') {
		          throw new TypeError('Expected the observer to be an object.');
		        }
	
		        function observeState() {
		          if (observer.next) {
		            observer.next(getState());
		          }
		        }
	
		        observeState();
		        var unsubscribe = outerSubscribe(observeState);
		        return { unsubscribe: unsubscribe };
		      }
		    }, _ref[_symbolObservable2['default']] = function () {
		      return this;
		    }, _ref;
		  }
	
		  // When a store is created, an "INIT" action is dispatched so that every
		  // reducer returns their initial state. This effectively populates
		  // the initial state tree.
		  dispatch({ type: ActionTypes.INIT });
	
		  return _ref2 = {
		    dispatch: dispatch,
		    subscribe: subscribe,
		    getState: getState,
		    replaceReducer: replaceReducer
		  }, _ref2[_symbolObservable2['default']] = observable, _ref2;
		}
	
	/***/ },
	/* 3 */
	/***/ function(module, exports) {
	
		'use strict';
	
		exports.__esModule = true;
		exports['default'] = warning;
		/**
		 * Prints a warning in the console if it exists.
		 *
		 * @param {String} message The warning message.
		 * @returns {void}
		 */
		function warning(message) {
		  /* eslint-disable no-console */
		  if (typeof console !== 'undefined' && typeof console.error === 'function') {
		    console.error(message);
		  }
		  /* eslint-enable no-console */
		  try {
		    // This error was thrown as a convenience so that if you enable
		    // "break on all exceptions" in your console,
		    // it would pause the execution at this line.
		    throw new Error(message);
		    /* eslint-disable no-empty */
		  } catch (e) {}
		  /* eslint-enable no-empty */
		}
	
	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {
	
		var getPrototype = __webpack_require__(8),
		    isHostObject = __webpack_require__(9),
		    isObjectLike = __webpack_require__(11);
	
		/** `Object#toString` result references. */
		var objectTag = '[object Object]';
	
		/** Used for built-in method references. */
		var funcProto = Function.prototype,
		    objectProto = Object.prototype;
	
		/** Used to resolve the decompiled source of functions. */
		var funcToString = funcProto.toString;
	
		/** Used to check objects for own properties. */
		var hasOwnProperty = objectProto.hasOwnProperty;
	
		/** Used to infer the `Object` constructor. */
		var objectCtorString = funcToString.call(Object);
	
		/**
		 * Used to resolve the
		 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
		 * of values.
		 */
		var objectToString = objectProto.toString;
	
		/**
		 * Checks if `value` is a plain object, that is, an object created by the
		 * `Object` constructor or one with a `[[Prototype]]` of `null`.
		 *
		 * @static
		 * @memberOf _
		 * @since 0.8.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
		 * @example
		 *
		 * function Foo() {
		 *   this.a = 1;
		 * }
		 *
		 * _.isPlainObject(new Foo);
		 * // => false
		 *
		 * _.isPlainObject([1, 2, 3]);
		 * // => false
		 *
		 * _.isPlainObject({ 'x': 0, 'y': 0 });
		 * // => true
		 *
		 * _.isPlainObject(Object.create(null));
		 * // => true
		 */
		function isPlainObject(value) {
		  if (!isObjectLike(value) ||
		      objectToString.call(value) != objectTag || isHostObject(value)) {
		    return false;
		  }
		  var proto = getPrototype(value);
		  if (proto === null) {
		    return true;
		  }
		  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
		  return (typeof Ctor == 'function' &&
		    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
		}
	
		module.exports = isPlainObject;
	
	
	/***/ },
	/* 5 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		exports.__esModule = true;
	
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
		exports['default'] = applyMiddleware;
	
		var _compose = __webpack_require__(1);
	
		var _compose2 = _interopRequireDefault(_compose);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		/**
		 * Creates a store enhancer that applies middleware to the dispatch method
		 * of the Redux store. This is handy for a variety of tasks, such as expressing
		 * asynchronous actions in a concise manner, or logging every action payload.
		 *
		 * See `redux-thunk` package as an example of the Redux middleware.
		 *
		 * Because middleware is potentially asynchronous, this should be the first
		 * store enhancer in the composition chain.
		 *
		 * Note that each middleware will be given the `dispatch` and `getState` functions
		 * as named arguments.
		 *
		 * @param {...Function} middlewares The middleware chain to be applied.
		 * @returns {Function} A store enhancer applying the middleware.
		 */
		function applyMiddleware() {
		  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
		    middlewares[_key] = arguments[_key];
		  }
	
		  return function (createStore) {
		    return function (reducer, preloadedState, enhancer) {
		      var store = createStore(reducer, preloadedState, enhancer);
		      var _dispatch = store.dispatch;
		      var chain = [];
	
		      var middlewareAPI = {
		        getState: store.getState,
		        dispatch: function dispatch(action) {
		          return _dispatch(action);
		        }
		      };
		      chain = middlewares.map(function (middleware) {
		        return middleware(middlewareAPI);
		      });
		      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);
	
		      return _extends({}, store, {
		        dispatch: _dispatch
		      });
		    };
		  };
		}
	
	/***/ },
	/* 6 */
	/***/ function(module, exports) {
	
		'use strict';
	
		exports.__esModule = true;
		exports['default'] = bindActionCreators;
		function bindActionCreator(actionCreator, dispatch) {
		  return function () {
		    return dispatch(actionCreator.apply(undefined, arguments));
		  };
		}
	
		/**
		 * Turns an object whose values are action creators, into an object with the
		 * same keys, but with every function wrapped into a `dispatch` call so they
		 * may be invoked directly. This is just a convenience method, as you can call
		 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
		 *
		 * For convenience, you can also pass a single function as the first argument,
		 * and get a function in return.
		 *
		 * @param {Function|Object} actionCreators An object whose values are action
		 * creator functions. One handy way to obtain it is to use ES6 `import * as`
		 * syntax. You may also pass a single function.
		 *
		 * @param {Function} dispatch The `dispatch` function available on your Redux
		 * store.
		 *
		 * @returns {Function|Object} The object mimicking the original object, but with
		 * every action creator wrapped into the `dispatch` call. If you passed a
		 * function as `actionCreators`, the return value will also be a single
		 * function.
		 */
		function bindActionCreators(actionCreators, dispatch) {
		  if (typeof actionCreators === 'function') {
		    return bindActionCreator(actionCreators, dispatch);
		  }
	
		  if (typeof actionCreators !== 'object' || actionCreators === null) {
		    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
		  }
	
		  var keys = Object.keys(actionCreators);
		  var boundActionCreators = {};
		  for (var i = 0; i < keys.length; i++) {
		    var key = keys[i];
		    var actionCreator = actionCreators[key];
		    if (typeof actionCreator === 'function') {
		      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
		    }
		  }
		  return boundActionCreators;
		}
	
	/***/ },
	/* 7 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		exports.__esModule = true;
		exports['default'] = combineReducers;
	
		var _createStore = __webpack_require__(2);
	
		var _isPlainObject = __webpack_require__(4);
	
		var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
		var _warning = __webpack_require__(3);
	
		var _warning2 = _interopRequireDefault(_warning);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		function getUndefinedStateErrorMessage(key, action) {
		  var actionType = action && action.type;
		  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';
	
		  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
		}
	
		function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
		  var reducerKeys = Object.keys(reducers);
		  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';
	
		  if (reducerKeys.length === 0) {
		    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
		  }
	
		  if (!(0, _isPlainObject2['default'])(inputState)) {
		    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
		  }
	
		  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
		    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
		  });
	
		  unexpectedKeys.forEach(function (key) {
		    unexpectedKeyCache[key] = true;
		  });
	
		  if (unexpectedKeys.length > 0) {
		    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
		  }
		}
	
		function assertReducerSanity(reducers) {
		  Object.keys(reducers).forEach(function (key) {
		    var reducer = reducers[key];
		    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });
	
		    if (typeof initialState === 'undefined') {
		      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
		    }
	
		    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
		    if (typeof reducer(undefined, { type: type }) === 'undefined') {
		      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
		    }
		  });
		}
	
		/**
		 * Turns an object whose values are different reducer functions, into a single
		 * reducer function. It will call every child reducer, and gather their results
		 * into a single state object, whose keys correspond to the keys of the passed
		 * reducer functions.
		 *
		 * @param {Object} reducers An object whose values correspond to different
		 * reducer functions that need to be combined into one. One handy way to obtain
		 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
		 * undefined for any action. Instead, they should return their initial state
		 * if the state passed to them was undefined, and the current state for any
		 * unrecognized action.
		 *
		 * @returns {Function} A reducer function that invokes every reducer inside the
		 * passed object, and builds a state object with the same shape.
		 */
		function combineReducers(reducers) {
		  var reducerKeys = Object.keys(reducers);
		  var finalReducers = {};
		  for (var i = 0; i < reducerKeys.length; i++) {
		    var key = reducerKeys[i];
	
		    if (true) {
		      if (typeof reducers[key] === 'undefined') {
		        (0, _warning2['default'])('No reducer provided for key "' + key + '"');
		      }
		    }
	
		    if (typeof reducers[key] === 'function') {
		      finalReducers[key] = reducers[key];
		    }
		  }
		  var finalReducerKeys = Object.keys(finalReducers);
	
		  if (true) {
		    var unexpectedKeyCache = {};
		  }
	
		  var sanityError;
		  try {
		    assertReducerSanity(finalReducers);
		  } catch (e) {
		    sanityError = e;
		  }
	
		  return function combination() {
		    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		    var action = arguments[1];
	
		    if (sanityError) {
		      throw sanityError;
		    }
	
		    if (true) {
		      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
		      if (warningMessage) {
		        (0, _warning2['default'])(warningMessage);
		      }
		    }
	
		    var hasChanged = false;
		    var nextState = {};
		    for (var i = 0; i < finalReducerKeys.length; i++) {
		      var key = finalReducerKeys[i];
		      var reducer = finalReducers[key];
		      var previousStateForKey = state[key];
		      var nextStateForKey = reducer(previousStateForKey, action);
		      if (typeof nextStateForKey === 'undefined') {
		        var errorMessage = getUndefinedStateErrorMessage(key, action);
		        throw new Error(errorMessage);
		      }
		      nextState[key] = nextStateForKey;
		      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
		    }
		    return hasChanged ? nextState : state;
		  };
		}
	
	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {
	
		var overArg = __webpack_require__(10);
	
		/** Built-in value references. */
		var getPrototype = overArg(Object.getPrototypeOf, Object);
	
		module.exports = getPrototype;
	
	
	/***/ },
	/* 9 */
	/***/ function(module, exports) {
	
		/**
		 * Checks if `value` is a host object in IE < 9.
		 *
		 * @private
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
		 */
		function isHostObject(value) {
		  // Many host objects are `Object` objects that can coerce to strings
		  // despite having improperly defined `toString` methods.
		  var result = false;
		  if (value != null && typeof value.toString != 'function') {
		    try {
		      result = !!(value + '');
		    } catch (e) {}
		  }
		  return result;
		}
	
		module.exports = isHostObject;
	
	
	/***/ },
	/* 10 */
	/***/ function(module, exports) {
	
		/**
		 * Creates a unary function that invokes `func` with its argument transformed.
		 *
		 * @private
		 * @param {Function} func The function to wrap.
		 * @param {Function} transform The argument transform.
		 * @returns {Function} Returns the new function.
		 */
		function overArg(func, transform) {
		  return function(arg) {
		    return func(transform(arg));
		  };
		}
	
		module.exports = overArg;
	
	
	/***/ },
	/* 11 */
	/***/ function(module, exports) {
	
		/**
		 * Checks if `value` is object-like. A value is object-like if it's not `null`
		 * and has a `typeof` result of "object".
		 *
		 * @static
		 * @memberOf _
		 * @since 4.0.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
		 * @example
		 *
		 * _.isObjectLike({});
		 * // => true
		 *
		 * _.isObjectLike([1, 2, 3]);
		 * // => true
		 *
		 * _.isObjectLike(_.noop);
		 * // => false
		 *
		 * _.isObjectLike(null);
		 * // => false
		 */
		function isObjectLike(value) {
		  return !!value && typeof value == 'object';
		}
	
		module.exports = isObjectLike;
	
	
	/***/ },
	/* 12 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __webpack_require__(13);
	
	
	/***/ },
	/* 13 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
	
		var _ponyfill = __webpack_require__(14);
	
		var _ponyfill2 = _interopRequireDefault(_ponyfill);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		var root = undefined; /* global window */
	
		if (typeof global !== 'undefined') {
			root = global;
		} else if (typeof window !== 'undefined') {
			root = window;
		}
	
		var result = (0, _ponyfill2['default'])(root);
		exports['default'] = result;
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
	
	/***/ },
	/* 14 */
	/***/ function(module, exports) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports['default'] = symbolObservablePonyfill;
		function symbolObservablePonyfill(root) {
			var result;
			var _Symbol = root.Symbol;
	
			if (typeof _Symbol === 'function') {
				if (_Symbol.observable) {
					result = _Symbol.observable;
				} else {
					result = _Symbol('observable');
					_Symbol.observable = result;
				}
			} else {
				result = '@@observable';
			}
	
			return result;
		};
	
	/***/ }
	/******/ ])
	});
	;

/***/ },
/* 6 */
/***/ function(module, exports) {

	var ACTION_DEFINED = {
	    ChangeSymbol: "ChangeSymbol",
	    Login: "Login"
	};
	
	module.exports = {
	    DEFINED: ACTION_DEFINED,
	    getChangeSymbol: function (symbol) {
	        return {
	            type: ACTION_DEFINED.ChangeSymbol,
	            symbol: symbol
	        };
	    },
	    getLoginAction: function (isLogin) {
	        return {
	            type: ACTION_DEFINED.Login,
	            isLogin: isLogin
	        };
	    }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../services/orderservice.js" />
	var avalon = __webpack_require__(1);
	var orderService = __webpack_require__(8);
	function init() {
	    var vm = avalon.define({
	        $id: "investmentCtrl",
	        symbol: {
	            price: 0,
	            symbol: {
	                name: 'test'
	            }
	        },
	        openOrderInfo: {
	            volume: 20,
	            direction: 1,
	            gameId: 1
	
	        },
	        up: function () {
	            buy(0);
	        },
	        down: function () {
	            buy(1);
	        }
	    });
	    function buy(upOrDown) {
	
	        var postData = vm.openOrderInfo.$model;
	        postData.direction = upOrDown;
	        orderService.buy(postData)
	            .done(function (d) {
	                alert(JSON.stringify(d));
	            })
	        .error(function (http) {
	            var result = JSON.parse(http.responseText);
	            alert(result.message);
	        });
	    }
	
	    return vm;
	}
	
	
	module.exports = {
	    createCtrl: function () {
	        var vm = init();
	        return {
	            setSymbol: function (symbol) {
	                vm.symbol = symbol;
	            }
	        };
	    }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var webApi = __webpack_require__(3).create("/api/orders");
	
	function buy(order) {
	    order.clientTime = (new Date()).time;
	    return webApi.Post(order);
	}
	
	module.exports = {
	    buy: buy,
	    listUnclose:function(){
	
	    }
	
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// / <reference path="../services/quotationprovider.js" />
	// / <reference path="../services/symbolservice.js" />
	// / <reference path="../services/quotationstatusprovider.js" />
	var avalon = __webpack_require__(1);
	
	var ReduxActionDefined = __webpack_require__(6)
	var quotationProvider = null;
	function Init (url, globalStore, quotationStatusUrl) {
	  var vm = avalon.define({
	    $id: 'symbolList',
	    symbols: {},
	    activeId: 0,
	    active: function (symbol) {
	      if (vm.activeId)
	        vm.symbols[vm.activeId].active = false
	      symbol.active = true
	      vm.activeId = symbol.info.id
	      globalStore.dispatch(ReduxActionDefined.getChangeSymbol(symbol))
	    }
	
	  })
	
	  var services = __webpack_require__(2)
	  services.list()
	    .done(function (data) {
	      var symbols = {}
	      var defSymBolId = false
	      for (var i = 0; i < data.length; i++) {
	        symbols[data[i].info.id] = data[i]
	        data[i].active = false
	        data[i].seq = 0; // 频率
	        data[i].amp = 0; // 幅度
	        if (!defSymBolId)
	          defSymBolId = data[i].info.id
	      }
	      vm.symbols = symbols
	      vm.activeId = defSymBolId
	      vm.active(vm.symbols[defSymBolId])
	    })
	  var QuotationProvider = __webpack_require__(10)
	  quotationProvider = new QuotationProvider(url)
	  quotationProvider.onQuotation = function (quotation) {
	    vm.symbols[quotation.id].price = quotation.bid
	  }
	  if (quotationStatusUrl) {
	    var QuotationStatusProvider = __webpack_require__(11)
	    quotationProvider = new QuotationStatusProvider(quotationStatusUrl)
	    quotationProvider.onStatus(function (status) {
	      var symbol = vm.symbols[status.id]
	      symbol.seq = status.seq
	      symbol.amp = status.amp
	    })
	  }
	}
	
	module.exports = {
	  CreateCtrl: Init,
	  StartQuotationProvider: function () {
	    quotationProvider.connect()
	  },
	  StopQuotationProvidder: function () {
	    quotationProvider.disconnect()
	  }
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	function QuotationProvider(url) {
	    this.url = url;
	    this.ws = null;
	}
	QuotationProvider.prototype.disconnect=function(){
	    this.ws.close();
	};
	QuotationProvider.prototype.onQuotation=function(quotation){
	  console.log("please set onQuotation to receive quotation from server,quotation:",quotation);
	};
	
	QuotationProvider.prototype.connect = function () {
	
	    var self=this;
	    this.ws = new WebSocket(this.url);
	    this.ws.onopen = function (msg) {
	        console.log(msg);
	        console.log("连接上服务器");
	        self.ws.send("start");
	    };
	
	    this.ws.onclose = function (msg) {
	        if (msg.code != 1006) {
	            console.error(msg.reason);
	        } else {
	            init(url, symbols, func);
	        }
	    };
	    this.ws.onmessage = function (msg) {
	        var ary = msg.data.split("|")[1].split(",");
	       /* var symbol = symbols[parseInt(ary[0])];
	        symbol.price = parseFloat(ary[1]) / Math.pow(10, symbol.info.scale);*/
	        self.onQuotation({
	            id:parseInt(ary[0]),
	            bid:parseFloat(ary[1])
	        });
	    };
	    this.ws.onerror = function (error) {
	        console.error(error);
	    };
	};
	
	module.exports = QuotationProvider;

/***/ },
/* 11 */
/***/ function(module, exports) {

	function QuotationStatusProvider(url) {
	    this.url = url;
	    this.ws = null;
	
	}
	QuotationStatusProvider.prototype.onStatus = function (status) {
	    console.log("receive ", status);
	}
	QuotationStatusProvider.prototype.disconnect=function(){
	    this.ws.close();
	}
	QuotationStatusProvider.prototype.connect = function () {
	    var ws = this.ws = new WebSocket(url);
	    var self = this;
	    ws.onopen = function (msg) {
	        console.log(msg);
	        console.log("连接上服务器");
	        ws.send("start");
	    };
	
	    ws.onclose = function (msg) {
	        if (msg.code !== 1006) {
	            console.error(msg.reason);
	        } else {
	            init(url, symbols, func);
	        }
	    };
	    ws.onmessage = function (msg) {
	        var ary = msg.data.split(",");
	        var symbol = {
	
	            id: symbols[parseInt(ary[0])],
	            seq: ary[1],
	            amp: ary[2],
	        };
	
	        self.onStatus(symbol);
	
	
	    };
	    ws.onerror = function (error) {
	        console.error(error);
	    };
	}
	
	module.exports = QuotationStatusProvider;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// / <reference path="../services/ordernotify.js" />
	var Avalon = __webpack_require__(1);
	
	var OrderNotify = __webpack_require__(13).OrderNotify;
	
	var orderNotify=null;
	
	var ordersVM;
	
	function init (wsUrl,globalStore) {
	  orderNotify = new OrderNotify(wsUrl)
	
	  ordersVM = Avalon.define({
	    $id: 'orderAdminCtrl',
	    orders: []
	
	  });
	}
	
	module.exports={
	    CreateCtrl:init,
	    Start:function(){
	      orderNotify.connect();
	    },
	    Add:function(order) {
	        ordersVM.orders.push(order);
	    },
	    Stop: function () { 
	      orderNotify.disconnect();
	    }
	}


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	var OrderEvent = (function () {
	    function OrderEvent() {
	    }
	    return OrderEvent;
	}());
	var OrderNotify = (function () {
	    function OrderNotify(url) {
	        this.url = url;
	    }
	    OrderNotify.prototype.onClose = function (order) {
	        console.log('onClose', order);
	    };
	    OrderNotify.prototype.onOpen = function (order) {
	        console.log('onOpen', order);
	    };
	    OrderNotify.prototype.connect = function () {
	        var self = this;
	        this.ws = new WebSocket(this.url);
	        this.ws.onopen = function (msg) {
	            console.log(msg);
	            console.log("连接上服务器");
	        };
	        this.ws.onmessage = function (msg) {
	            console.log(msg.data);
	            var eventOrder = JSON.parse(msg.data);
	            switch (eventOrder.event) {
	                case "open":
	                    self.onOpen(eventOrder.order);
	                    break;
	                case "close":
	                    self.onClose(eventOrder.order);
	                    break;
	            }
	        };
	    };
	    OrderNotify.prototype.disconnect = function () {
	        this.ws.close();
	    };
	    return OrderNotify;
	}());
	exports.OrderNotify = OrderNotify;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="reduxaction.js" />
	
	/// <reference path="../services/userservice.js" />
	
	var Users = __webpack_require__(15);
	var Avalon = __webpack_require__(1);
	var AccountService = new Users.AccountService();
	var ReduxAction = __webpack_require__(6);
	function init(globalStore) {
	    
	    var vm = Avalon.define({
	        $id: "loginCtrl",
	        user: {
	            password: "",
	            loginId: "",
	            name: "",
	            isLogin: false
	        },
	        login: function (e) {       
	            e.preventDefault();
	            e.stopPropagation();
	            console.log("login....");
	            AccountService.login(vm.user.loginId, vm.user.password)
	                .done(function (data) {
	
	                    console.log(data);
	                    if (data.success) {
	                        vm.user.password = "";
	                        vm.user.isLogin = true;
	                        var action = ReduxAction.getLoginAction(true);
	                        globalStore.dispatch(action);
	                    } else {
	                        alert(data.message);
	                    }
	
	                });
	            return false;
	        }
	    });
	    return vm;
	}
	
	module.exports = {
	    init: init
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	
	var webApi = __webpack_require__(3).create("/api/accounts");
	function AccountService() {
	
	}
	AccountService.prototype.login = function (strUser, strPwd) {
	    return webApi.Post({
	        User: strUser,
	        Password: strPwd
	    });
	};
	module.exports = {
	    AccountService: AccountService
	};


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGY1ZGNkNGM4NjAwYjQ1ZDBmNzgiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXZhbG9uXCIiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvc2VydmljZXMvc3ltYm9sc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvbW9kdWxlcy93ZWJhcGkuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwialF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vLy4vfi9yZWR1eC9kaXN0L3JlZHV4LmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL2N0cmwvcmVkdXhBY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvY3RybC9pbnZlc3RtZW50Q3RybC5qcyIsIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9zZXJ2aWNlcy9vcmRlclNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvY3RybC9zeW1ib2xjdHJsLmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL3NlcnZpY2VzL3F1b3RhdGlvblByb3ZpZGVyLmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL3NlcnZpY2VzL3F1b3RhdGlvblN0YXR1c1Byb3ZpZGVyLmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL2N0cmwvb3JkZXJBZG1pbkN0cmwuanMiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvc2VydmljZXMvb3JkZXJub3RpZnkudHMiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvY3RybC9sb2dpbmN0cmwuanMiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvc2VydmljZXMvdXNlcnNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsUTs7Ozs7O0FDOURBLHlCOzs7Ozs7QUNBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDUEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0NBQXVDO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUEsNEJBQTJCLGNBQWMsZUFBZTs7QUFFeEQ7O0FBRUE7QUFDQTtBQUNBOzs7QUFH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Q2xELE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUN2QixLQUFLLE1BQU07cUJBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQzlCLEtBQUssQ0FBQztpQkFDVixLQUFLLE9BQU87cUJBQ1IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQy9CLEtBQUssQ0FBQzthQUNkLENBQUM7U0FDTCxDQUFDO0tBQ0wsQ0FBQztLQUVELGdDQUFVLEdBQVY7U0FDSSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ3BCLENBQUM7S0FHTCxrQkFBQztBQUFELEVBQUM7QUE1Q1ksbUNBQVc7Ozs7Ozs7QUNMeEI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCw4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7O0FBRUEsa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRzs7Ozs7OztBQzNDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAwZjVkY2Q0Yzg2MDBiNDVkMGY3OCIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJtb2R1bGVzL2N0cmwvbG9naW5jdHJsLmpzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIm1vZHVsZXMvc2VydmljZXMvc3ltYm9sc2VydmljZS5qc1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJtb2R1bGVzL2N0cmwvc3ltYm9sY3RybC5qc1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVkdXgvZGlzdC9yZWR1eC5qc1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIm1vZHVsZXMvY3RybC9yZWR1eEFjdGlvbi5qc1wiLz5cclxudmFyIGF2YWxvbiA9IHJlcXVpcmUoJ2F2YWxvbicpO1xyXG52YXIgc3ltYm9sU2VydmljZSA9IHJlcXVpcmUoXCIuL21vZHVsZXMvc2VydmljZXMvc3ltYm9sc2VydmljZS5qc1wiKTtcclxudmFyIFJlZHV4ID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWR1eC9kaXN0L3JlZHV4XCIpO1xyXG52YXIgUmVkdXhBY3Rpb25EZWZpbmVkID0gcmVxdWlyZShcIi4vbW9kdWxlcy9jdHJsL3JlZHV4QWN0aW9uLmpzXCIpO1xyXG5cclxudmFyIG1vZHVsZXMgPSB7XHJcbiAgICBzeW1ib2w6IG51bGwsXHJcbiAgICBvcmRlcjogbnVsbFxyXG59O1xyXG5mdW5jdGlvbiBDcmVhdGVHbG9iYWxTdG9yZShpbnZlcnN0bWVudEN0cmwpIHtcclxuICAgIC8vaHR0cDovL2NuLnJlZHV4LmpzLm9yZy9kb2NzL2ludHJvZHVjdGlvbi9UaHJlZVByaW5jaXBsZXMuaHRtbFxyXG4gICAgdmFyIGdsb2JhbFN0YXRlID0ge1xyXG4gICAgICAgIGN1cnJlbnRTeW1ib2xJZDogMCxcclxuICAgICAgICBpc0xvZ2luOiBmYWxzZVxyXG4gICAgfTtcclxuICAgIGZ1bmN0aW9uIGdsb2JhbFJlZHVjZShzdGF0ZSwgYWN0aW9uKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgc3RhdGUgPSBnbG9iYWxTdGF0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFJlZHV4QWN0aW9uRGVmaW5lZC5ERUZJTkVELkNoYW5nZVN5bWJvbDpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2UgdG8gJywgYWN0aW9uLnN5bWJvbCk7XHJcbiAgICAgICAgICAgICAgICBpbnZlcnN0bWVudEN0cmwuc2V0U3ltYm9sKGFjdGlvbi5zeW1ib2wpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkdXhBY3Rpb25EZWZpbmVkLkRFRklORUQuTG9naW46XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0IHF1b3RhdGlvbiBzdWJzdHJpYmUuXCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kdWxlcy5zeW1vbC5TdGFydFF1b3RhdGlvblByb3ZpZGVyKCk7XHJcbiAgICAgICAgICAgICAgICBtb2R1bGVzLm9yZGVyLlN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWR1eEFjdGlvbkRlZmluZWQuREVGSU5FRC5Mb2dvdXQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgc3ltYm9sU3RvcmUgPSBSZWR1eC5jcmVhdGVTdG9yZShnbG9iYWxSZWR1Y2UpO1xyXG4gICAgcmV0dXJuIHN5bWJvbFN0b3JlO1xyXG59XHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcblxyXG4gICAgLy/liJ3lp4vljJbotK3kubDpnaLniYhcclxuICAgIHZhciBpbnZlcnN0bWVudEN0cmwgPSByZXF1aXJlKFwiLi9tb2R1bGVzL2N0cmwvaW52ZXN0bWVudEN0cmxcIikuY3JlYXRlQ3RybCgpO1xyXG4gICAgdmFyIHN5bWJvbFN0b3JlID0gQ3JlYXRlR2xvYmFsU3RvcmUoaW52ZXJzdG1lbnRDdHJsKTtcclxuXHJcbiAgICAvL+WTgeenjemdoueJiO+8jFxyXG4gICAgbW9kdWxlcy5zeW1vbCA9IHJlcXVpcmUoXCIuL21vZHVsZXMvY3RybC9zeW1ib2xjdHJsLmpzXCIpO1xyXG4gICAgbW9kdWxlcy5zeW1vbC5DcmVhdGVDdHJsKFwid3M6Ly9sb2NhbGhvc3Q6NTAwMC9xdW90ZVwiLCBzeW1ib2xTdG9yZSk7XHJcblxyXG4gICAgLy9vcmRlcnNcclxuICAgIG1vZHVsZXMub3JkZXIgPSByZXF1aXJlKFwiLi9tb2R1bGVzL2N0cmwvb3JkZXJBZG1pbkN0cmwuanNcIik7XHJcbiAgICBtb2R1bGVzLm9yZGVyLkNyZWF0ZUN0cmwoXCJ3czovL2xvY2FsaG9zdDo1MDAwL25vdGlmeS9vcmRlclwiLCBzeW1ib2xTdG9yZSk7XHJcblxyXG4gICAgLy/nmbvlvZVcclxuICAgIHZhciBsb2dpbkN0cmwgPSByZXF1aXJlKFwiLi9tb2R1bGVzL2N0cmwvbG9naW5jdHJsLmpzXCIpLmluaXQoc3ltYm9sU3RvcmUpO1xyXG5cclxufVxyXG5cclxuaW5pdCgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vd3d3cm9vdC9fc3JjL2pzL21haW4uanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBhdmFsb247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJhdmFsb25cIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vd2ViYXBpLmpzXCIgLz5cclxudmFyIHdlYkFwaT1yZXF1aXJlKFwiLi4vd2ViYXBpXCIpLmNyZWF0ZShcIi9hcGkvc3ltYm9sc1wiKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgbGlzdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB3ZWJBcGkuR2V0KCk7XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9zZXJ2aWNlcy9zeW1ib2xzZXJ2aWNlLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcblxyXG5mdW5jdGlvbiBXZXBBcGkodXJsKSB7XHJcbiAgICB0aGlzLm9wdHMgPSB7XHJcbiAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuUHV0ID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZGF0YVwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZnVuY1wiPjwvcGFyYW0+XHJcblxyXG4gICAgICAgIHZhciBvcHRzID0gdGhpcy5leHQuY2FsbCh0aGlzLCBcIlBVVFwiLCBkYXRhKTtcclxuXHJcbiAgICAgICAgcmV0dXJuICQuYWpheChvcHRzKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5EZWxldGUgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJkYXRhXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJmdW5jXCI+PC9wYXJhbT5cclxuICAgICAgICB2YXIgb3B0cyA9IHRoaXMuZXh0LmNhbGwodGhpcywgXCJERUxFVEVcIiwgZGF0YSk7XHJcbiAgICAgICAgaWYgKGRhdGEuaWQpIHtcclxuICAgICAgICAgICAgb3B0cy51cmwgKz0gXCIvXCIgKyBkYXRhLmlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJC5hamF4KG9wdHMpO1xyXG4gICAgfTtcclxuICAgIHRoaXMuUG9zdCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImRhdGFcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImZ1bmNcIj48L3BhcmFtPlxyXG4gICAgICAgIHZhciBvcHRzID0gdGhpcy5leHQuY2FsbCh0aGlzLCBcIlBPU1RcIiwgZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuICQuYWpheChvcHRzKTtcclxuICAgIH07XHJcbiAgICB0aGlzLkdldCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImRhdGFcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImZ1bmNcIj48L3BhcmFtPlxyXG4gICAgICAgIHZhciBvcHRzID0gdGhpcy5leHQuY2FsbCh0aGlzLCBcIkdFVFwiLCBkYXRhKTtcclxuICAgICAgICByZXR1cm4gJC5hamF4KG9wdHMpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy5leHQgPSBmdW5jdGlvbiAobWV0aG9kLCBkYXRhKSB7XHJcblxyXG4gICAgICAgIHZhciBhID0gJC5leHRlbmQoe30sIHRoaXMub3B0cywgeyB0eXBlOiBtZXRob2QgfSk7XHJcblxyXG4gICAgICAgIGEuZGF0YSA9IG1ldGhvZCAhPT0gXCJHRVRcIiA/IEpTT04uc3RyaW5naWZ5KGRhdGEpIDogZGF0YTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9O1xyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uICh1cmwpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFdlcEFwaSh1cmwpO1xyXG4gICAgfVxyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL3dlYmFwaS5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGpRdWVyeTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImpRdWVyeVwiXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlJlZHV4XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlJlZHV4XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge30sXG4vKioqKioqLyBcdFx0XHRpZDogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4vKioqKioqLyBcdFx0fTtcblxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cblxuXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKFtcbi8qIDAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXHRleHBvcnRzLmNvbXBvc2UgPSBleHBvcnRzLmFwcGx5TWlkZGxld2FyZSA9IGV4cG9ydHMuYmluZEFjdGlvbkNyZWF0b3JzID0gZXhwb3J0cy5jb21iaW5lUmVkdWNlcnMgPSBleHBvcnRzLmNyZWF0ZVN0b3JlID0gdW5kZWZpbmVkO1xuXG5cdHZhciBfY3JlYXRlU3RvcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG5cdHZhciBfY3JlYXRlU3RvcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlU3RvcmUpO1xuXG5cdHZhciBfY29tYmluZVJlZHVjZXJzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KTtcblxuXHR2YXIgX2NvbWJpbmVSZWR1Y2VyczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb21iaW5lUmVkdWNlcnMpO1xuXG5cdHZhciBfYmluZEFjdGlvbkNyZWF0b3JzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcblxuXHR2YXIgX2JpbmRBY3Rpb25DcmVhdG9yczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9iaW5kQWN0aW9uQ3JlYXRvcnMpO1xuXG5cdHZhciBfYXBwbHlNaWRkbGV3YXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxuXHR2YXIgX2FwcGx5TWlkZGxld2FyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hcHBseU1pZGRsZXdhcmUpO1xuXG5cdHZhciBfY29tcG9zZSA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cblx0dmFyIF9jb21wb3NlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbXBvc2UpO1xuXG5cdHZhciBfd2FybmluZyA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cblx0dmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG5cdGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuXHQvKlxuXHQqIFRoaXMgaXMgYSBkdW1teSBmdW5jdGlvbiB0byBjaGVjayBpZiB0aGUgZnVuY3Rpb24gbmFtZSBoYXMgYmVlbiBhbHRlcmVkIGJ5IG1pbmlmaWNhdGlvbi5cblx0KiBJZiB0aGUgZnVuY3Rpb24gaGFzIGJlZW4gbWluaWZpZWQgYW5kIE5PREVfRU5WICE9PSAncHJvZHVjdGlvbicsIHdhcm4gdGhlIHVzZXIuXG5cdCovXG5cdGZ1bmN0aW9uIGlzQ3J1c2hlZCgpIHt9XG5cblx0aWYgKChcImRldmVsb3BtZW50XCIpICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGlzQ3J1c2hlZC5uYW1lID09PSAnc3RyaW5nJyAmJiBpc0NydXNoZWQubmFtZSAhPT0gJ2lzQ3J1c2hlZCcpIHtcblx0ICAoMCwgX3dhcm5pbmcyWydkZWZhdWx0J10pKCdZb3UgYXJlIGN1cnJlbnRseSB1c2luZyBtaW5pZmllZCBjb2RlIG91dHNpZGUgb2YgTk9ERV9FTlYgPT09IFxcJ3Byb2R1Y3Rpb25cXCcuICcgKyAnVGhpcyBtZWFucyB0aGF0IHlvdSBhcmUgcnVubmluZyBhIHNsb3dlciBkZXZlbG9wbWVudCBidWlsZCBvZiBSZWR1eC4gJyArICdZb3UgY2FuIHVzZSBsb29zZS1lbnZpZnkgKGh0dHBzOi8vZ2l0aHViLmNvbS96ZXJ0b3NoL2xvb3NlLWVudmlmeSkgZm9yIGJyb3dzZXJpZnkgJyArICdvciBEZWZpbmVQbHVnaW4gZm9yIHdlYnBhY2sgKGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzAwMzAwMzEpICcgKyAndG8gZW5zdXJlIHlvdSBoYXZlIHRoZSBjb3JyZWN0IGNvZGUgZm9yIHlvdXIgcHJvZHVjdGlvbiBidWlsZC4nKTtcblx0fVxuXG5cdGV4cG9ydHMuY3JlYXRlU3RvcmUgPSBfY3JlYXRlU3RvcmUyWydkZWZhdWx0J107XG5cdGV4cG9ydHMuY29tYmluZVJlZHVjZXJzID0gX2NvbWJpbmVSZWR1Y2VyczJbJ2RlZmF1bHQnXTtcblx0ZXhwb3J0cy5iaW5kQWN0aW9uQ3JlYXRvcnMgPSBfYmluZEFjdGlvbkNyZWF0b3JzMlsnZGVmYXVsdCddO1xuXHRleHBvcnRzLmFwcGx5TWlkZGxld2FyZSA9IF9hcHBseU1pZGRsZXdhcmUyWydkZWZhdWx0J107XG5cdGV4cG9ydHMuY29tcG9zZSA9IF9jb21wb3NlMlsnZGVmYXVsdCddO1xuXG4vKioqLyB9LFxuLyogMSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblx0ZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBjb21wb3NlO1xuXHQvKipcblx0ICogQ29tcG9zZXMgc2luZ2xlLWFyZ3VtZW50IGZ1bmN0aW9ucyBmcm9tIHJpZ2h0IHRvIGxlZnQuIFRoZSByaWdodG1vc3Rcblx0ICogZnVuY3Rpb24gY2FuIHRha2UgbXVsdGlwbGUgYXJndW1lbnRzIGFzIGl0IHByb3ZpZGVzIHRoZSBzaWduYXR1cmUgZm9yXG5cdCAqIHRoZSByZXN1bHRpbmcgY29tcG9zaXRlIGZ1bmN0aW9uLlxuXHQgKlxuXHQgKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBmdW5jcyBUaGUgZnVuY3Rpb25zIHRvIGNvbXBvc2UuXG5cdCAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiBvYnRhaW5lZCBieSBjb21wb3NpbmcgdGhlIGFyZ3VtZW50IGZ1bmN0aW9uc1xuXHQgKiBmcm9tIHJpZ2h0IHRvIGxlZnQuIEZvciBleGFtcGxlLCBjb21wb3NlKGYsIGcsIGgpIGlzIGlkZW50aWNhbCB0byBkb2luZ1xuXHQgKiAoLi4uYXJncykgPT4gZihnKGgoLi4uYXJncykpKS5cblx0ICovXG5cblx0ZnVuY3Rpb24gY29tcG9zZSgpIHtcblx0ICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgZnVuY3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcblx0ICAgIGZ1bmNzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuXHQgIH1cblxuXHQgIGlmIChmdW5jcy5sZW5ndGggPT09IDApIHtcblx0ICAgIHJldHVybiBmdW5jdGlvbiAoYXJnKSB7XG5cdCAgICAgIHJldHVybiBhcmc7XG5cdCAgICB9O1xuXHQgIH1cblxuXHQgIGlmIChmdW5jcy5sZW5ndGggPT09IDEpIHtcblx0ICAgIHJldHVybiBmdW5jc1swXTtcblx0ICB9XG5cblx0ICB2YXIgbGFzdCA9IGZ1bmNzW2Z1bmNzLmxlbmd0aCAtIDFdO1xuXHQgIHZhciByZXN0ID0gZnVuY3Muc2xpY2UoMCwgLTEpO1xuXHQgIHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdCAgICByZXR1cm4gcmVzdC5yZWR1Y2VSaWdodChmdW5jdGlvbiAoY29tcG9zZWQsIGYpIHtcblx0ICAgICAgcmV0dXJuIGYoY29tcG9zZWQpO1xuXHQgICAgfSwgbGFzdC5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cykpO1xuXHQgIH07XG5cdH1cblxuLyoqKi8gfSxcbi8qIDIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXHRleHBvcnRzLkFjdGlvblR5cGVzID0gdW5kZWZpbmVkO1xuXHRleHBvcnRzWydkZWZhdWx0J10gPSBjcmVhdGVTdG9yZTtcblxuXHR2YXIgX2lzUGxhaW5PYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXG5cdHZhciBfaXNQbGFpbk9iamVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1BsYWluT2JqZWN0KTtcblxuXHR2YXIgX3N5bWJvbE9ic2VydmFibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKTtcblxuXHR2YXIgX3N5bWJvbE9ic2VydmFibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3ltYm9sT2JzZXJ2YWJsZSk7XG5cblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5cdC8qKlxuXHQgKiBUaGVzZSBhcmUgcHJpdmF0ZSBhY3Rpb24gdHlwZXMgcmVzZXJ2ZWQgYnkgUmVkdXguXG5cdCAqIEZvciBhbnkgdW5rbm93biBhY3Rpb25zLCB5b3UgbXVzdCByZXR1cm4gdGhlIGN1cnJlbnQgc3RhdGUuXG5cdCAqIElmIHRoZSBjdXJyZW50IHN0YXRlIGlzIHVuZGVmaW5lZCwgeW91IG11c3QgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLlxuXHQgKiBEbyBub3QgcmVmZXJlbmNlIHRoZXNlIGFjdGlvbiB0eXBlcyBkaXJlY3RseSBpbiB5b3VyIGNvZGUuXG5cdCAqL1xuXHR2YXIgQWN0aW9uVHlwZXMgPSBleHBvcnRzLkFjdGlvblR5cGVzID0ge1xuXHQgIElOSVQ6ICdAQHJlZHV4L0lOSVQnXG5cdH07XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBSZWR1eCBzdG9yZSB0aGF0IGhvbGRzIHRoZSBzdGF0ZSB0cmVlLlxuXHQgKiBUaGUgb25seSB3YXkgdG8gY2hhbmdlIHRoZSBkYXRhIGluIHRoZSBzdG9yZSBpcyB0byBjYWxsIGBkaXNwYXRjaCgpYCBvbiBpdC5cblx0ICpcblx0ICogVGhlcmUgc2hvdWxkIG9ubHkgYmUgYSBzaW5nbGUgc3RvcmUgaW4geW91ciBhcHAuIFRvIHNwZWNpZnkgaG93IGRpZmZlcmVudFxuXHQgKiBwYXJ0cyBvZiB0aGUgc3RhdGUgdHJlZSByZXNwb25kIHRvIGFjdGlvbnMsIHlvdSBtYXkgY29tYmluZSBzZXZlcmFsIHJlZHVjZXJzXG5cdCAqIGludG8gYSBzaW5nbGUgcmVkdWNlciBmdW5jdGlvbiBieSB1c2luZyBgY29tYmluZVJlZHVjZXJzYC5cblx0ICpcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gcmVkdWNlciBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbmV4dCBzdGF0ZSB0cmVlLCBnaXZlblxuXHQgKiB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgYWN0aW9uIHRvIGhhbmRsZS5cblx0ICpcblx0ICogQHBhcmFtIHthbnl9IFtwcmVsb2FkZWRTdGF0ZV0gVGhlIGluaXRpYWwgc3RhdGUuIFlvdSBtYXkgb3B0aW9uYWxseSBzcGVjaWZ5IGl0XG5cdCAqIHRvIGh5ZHJhdGUgdGhlIHN0YXRlIGZyb20gdGhlIHNlcnZlciBpbiB1bml2ZXJzYWwgYXBwcywgb3IgdG8gcmVzdG9yZSBhXG5cdCAqIHByZXZpb3VzbHkgc2VyaWFsaXplZCB1c2VyIHNlc3Npb24uXG5cdCAqIElmIHlvdSB1c2UgYGNvbWJpbmVSZWR1Y2Vyc2AgdG8gcHJvZHVjZSB0aGUgcm9vdCByZWR1Y2VyIGZ1bmN0aW9uLCB0aGlzIG11c3QgYmVcblx0ICogYW4gb2JqZWN0IHdpdGggdGhlIHNhbWUgc2hhcGUgYXMgYGNvbWJpbmVSZWR1Y2Vyc2Aga2V5cy5cblx0ICpcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gZW5oYW5jZXIgVGhlIHN0b3JlIGVuaGFuY2VyLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuXHQgKiB0byBlbmhhbmNlIHRoZSBzdG9yZSB3aXRoIHRoaXJkLXBhcnR5IGNhcGFiaWxpdGllcyBzdWNoIGFzIG1pZGRsZXdhcmUsXG5cdCAqIHRpbWUgdHJhdmVsLCBwZXJzaXN0ZW5jZSwgZXRjLiBUaGUgb25seSBzdG9yZSBlbmhhbmNlciB0aGF0IHNoaXBzIHdpdGggUmVkdXhcblx0ICogaXMgYGFwcGx5TWlkZGxld2FyZSgpYC5cblx0ICpcblx0ICogQHJldHVybnMge1N0b3JlfSBBIFJlZHV4IHN0b3JlIHRoYXQgbGV0cyB5b3UgcmVhZCB0aGUgc3RhdGUsIGRpc3BhdGNoIGFjdGlvbnNcblx0ICogYW5kIHN1YnNjcmliZSB0byBjaGFuZ2VzLlxuXHQgKi9cblx0ZnVuY3Rpb24gY3JlYXRlU3RvcmUocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKSB7XG5cdCAgdmFyIF9yZWYyO1xuXG5cdCAgaWYgKHR5cGVvZiBwcmVsb2FkZWRTdGF0ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZW5oYW5jZXIgPT09ICd1bmRlZmluZWQnKSB7XG5cdCAgICBlbmhhbmNlciA9IHByZWxvYWRlZFN0YXRlO1xuXHQgICAgcHJlbG9hZGVkU3RhdGUgPSB1bmRlZmluZWQ7XG5cdCAgfVxuXG5cdCAgaWYgKHR5cGVvZiBlbmhhbmNlciAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0ICAgIGlmICh0eXBlb2YgZW5oYW5jZXIgIT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgZW5oYW5jZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcblx0ICAgIH1cblxuXHQgICAgcmV0dXJuIGVuaGFuY2VyKGNyZWF0ZVN0b3JlKShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSk7XG5cdCAgfVxuXG5cdCAgaWYgKHR5cGVvZiByZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG5cdCAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSByZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG5cdCAgfVxuXG5cdCAgdmFyIGN1cnJlbnRSZWR1Y2VyID0gcmVkdWNlcjtcblx0ICB2YXIgY3VycmVudFN0YXRlID0gcHJlbG9hZGVkU3RhdGU7XG5cdCAgdmFyIGN1cnJlbnRMaXN0ZW5lcnMgPSBbXTtcblx0ICB2YXIgbmV4dExpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnM7XG5cdCAgdmFyIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcblxuXHQgIGZ1bmN0aW9uIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKSB7XG5cdCAgICBpZiAobmV4dExpc3RlbmVycyA9PT0gY3VycmVudExpc3RlbmVycykge1xuXHQgICAgICBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycy5zbGljZSgpO1xuXHQgICAgfVxuXHQgIH1cblxuXHQgIC8qKlxuXHQgICAqIFJlYWRzIHRoZSBzdGF0ZSB0cmVlIG1hbmFnZWQgYnkgdGhlIHN0b3JlLlxuXHQgICAqXG5cdCAgICogQHJldHVybnMge2FueX0gVGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBvZiB5b3VyIGFwcGxpY2F0aW9uLlxuXHQgICAqL1xuXHQgIGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuXHQgICAgcmV0dXJuIGN1cnJlbnRTdGF0ZTtcblx0ICB9XG5cblx0ICAvKipcblx0ICAgKiBBZGRzIGEgY2hhbmdlIGxpc3RlbmVyLiBJdCB3aWxsIGJlIGNhbGxlZCBhbnkgdGltZSBhbiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCxcblx0ICAgKiBhbmQgc29tZSBwYXJ0IG9mIHRoZSBzdGF0ZSB0cmVlIG1heSBwb3RlbnRpYWxseSBoYXZlIGNoYW5nZWQuIFlvdSBtYXkgdGhlblxuXHQgICAqIGNhbGwgYGdldFN0YXRlKClgIHRvIHJlYWQgdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBpbnNpZGUgdGhlIGNhbGxiYWNrLlxuXHQgICAqXG5cdCAgICogWW91IG1heSBjYWxsIGBkaXNwYXRjaCgpYCBmcm9tIGEgY2hhbmdlIGxpc3RlbmVyLCB3aXRoIHRoZSBmb2xsb3dpbmdcblx0ICAgKiBjYXZlYXRzOlxuXHQgICAqXG5cdCAgICogMS4gVGhlIHN1YnNjcmlwdGlvbnMgYXJlIHNuYXBzaG90dGVkIGp1c3QgYmVmb3JlIGV2ZXJ5IGBkaXNwYXRjaCgpYCBjYWxsLlxuXHQgICAqIElmIHlvdSBzdWJzY3JpYmUgb3IgdW5zdWJzY3JpYmUgd2hpbGUgdGhlIGxpc3RlbmVycyBhcmUgYmVpbmcgaW52b2tlZCwgdGhpc1xuXHQgICAqIHdpbGwgbm90IGhhdmUgYW55IGVmZmVjdCBvbiB0aGUgYGRpc3BhdGNoKClgIHRoYXQgaXMgY3VycmVudGx5IGluIHByb2dyZXNzLlxuXHQgICAqIEhvd2V2ZXIsIHRoZSBuZXh0IGBkaXNwYXRjaCgpYCBjYWxsLCB3aGV0aGVyIG5lc3RlZCBvciBub3QsIHdpbGwgdXNlIGEgbW9yZVxuXHQgICAqIHJlY2VudCBzbmFwc2hvdCBvZiB0aGUgc3Vic2NyaXB0aW9uIGxpc3QuXG5cdCAgICpcblx0ICAgKiAyLiBUaGUgbGlzdGVuZXIgc2hvdWxkIG5vdCBleHBlY3QgdG8gc2VlIGFsbCBzdGF0ZSBjaGFuZ2VzLCBhcyB0aGUgc3RhdGVcblx0ICAgKiBtaWdodCBoYXZlIGJlZW4gdXBkYXRlZCBtdWx0aXBsZSB0aW1lcyBkdXJpbmcgYSBuZXN0ZWQgYGRpc3BhdGNoKClgIGJlZm9yZVxuXHQgICAqIHRoZSBsaXN0ZW5lciBpcyBjYWxsZWQuIEl0IGlzLCBob3dldmVyLCBndWFyYW50ZWVkIHRoYXQgYWxsIHN1YnNjcmliZXJzXG5cdCAgICogcmVnaXN0ZXJlZCBiZWZvcmUgdGhlIGBkaXNwYXRjaCgpYCBzdGFydGVkIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIGxhdGVzdFxuXHQgICAqIHN0YXRlIGJ5IHRoZSB0aW1lIGl0IGV4aXRzLlxuXHQgICAqXG5cdCAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgQSBjYWxsYmFjayB0byBiZSBpbnZva2VkIG9uIGV2ZXJ5IGRpc3BhdGNoLlxuXHQgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0byByZW1vdmUgdGhpcyBjaGFuZ2UgbGlzdGVuZXIuXG5cdCAgICovXG5cdCAgZnVuY3Rpb24gc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG5cdCAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgbGlzdGVuZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcblx0ICAgIH1cblxuXHQgICAgdmFyIGlzU3Vic2NyaWJlZCA9IHRydWU7XG5cblx0ICAgIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKTtcblx0ICAgIG5leHRMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG5cblx0ICAgIHJldHVybiBmdW5jdGlvbiB1bnN1YnNjcmliZSgpIHtcblx0ICAgICAgaWYgKCFpc1N1YnNjcmliZWQpIHtcblx0ICAgICAgICByZXR1cm47XG5cdCAgICAgIH1cblxuXHQgICAgICBpc1N1YnNjcmliZWQgPSBmYWxzZTtcblxuXHQgICAgICBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCk7XG5cdCAgICAgIHZhciBpbmRleCA9IG5leHRMaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG5cdCAgICAgIG5leHRMaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcblx0ICAgIH07XG5cdCAgfVxuXG5cdCAgLyoqXG5cdCAgICogRGlzcGF0Y2hlcyBhbiBhY3Rpb24uIEl0IGlzIHRoZSBvbmx5IHdheSB0byB0cmlnZ2VyIGEgc3RhdGUgY2hhbmdlLlxuXHQgICAqXG5cdCAgICogVGhlIGByZWR1Y2VyYCBmdW5jdGlvbiwgdXNlZCB0byBjcmVhdGUgdGhlIHN0b3JlLCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZVxuXHQgICAqIGN1cnJlbnQgc3RhdGUgdHJlZSBhbmQgdGhlIGdpdmVuIGBhY3Rpb25gLiBJdHMgcmV0dXJuIHZhbHVlIHdpbGxcblx0ICAgKiBiZSBjb25zaWRlcmVkIHRoZSAqKm5leHQqKiBzdGF0ZSBvZiB0aGUgdHJlZSwgYW5kIHRoZSBjaGFuZ2UgbGlzdGVuZXJzXG5cdCAgICogd2lsbCBiZSBub3RpZmllZC5cblx0ICAgKlxuXHQgICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9ubHkgc3VwcG9ydHMgcGxhaW4gb2JqZWN0IGFjdGlvbnMuIElmIHlvdSB3YW50IHRvXG5cdCAgICogZGlzcGF0Y2ggYSBQcm9taXNlLCBhbiBPYnNlcnZhYmxlLCBhIHRodW5rLCBvciBzb21ldGhpbmcgZWxzZSwgeW91IG5lZWQgdG9cblx0ICAgKiB3cmFwIHlvdXIgc3RvcmUgY3JlYXRpbmcgZnVuY3Rpb24gaW50byB0aGUgY29ycmVzcG9uZGluZyBtaWRkbGV3YXJlLiBGb3Jcblx0ICAgKiBleGFtcGxlLCBzZWUgdGhlIGRvY3VtZW50YXRpb24gZm9yIHRoZSBgcmVkdXgtdGh1bmtgIHBhY2thZ2UuIEV2ZW4gdGhlXG5cdCAgICogbWlkZGxld2FyZSB3aWxsIGV2ZW50dWFsbHkgZGlzcGF0Y2ggcGxhaW4gb2JqZWN0IGFjdGlvbnMgdXNpbmcgdGhpcyBtZXRob2QuXG5cdCAgICpcblx0ICAgKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uIEEgcGxhaW4gb2JqZWN0IHJlcHJlc2VudGluZyDigJx3aGF0IGNoYW5nZWTigJ0uIEl0IGlzXG5cdCAgICogYSBnb29kIGlkZWEgdG8ga2VlcCBhY3Rpb25zIHNlcmlhbGl6YWJsZSBzbyB5b3UgY2FuIHJlY29yZCBhbmQgcmVwbGF5IHVzZXJcblx0ICAgKiBzZXNzaW9ucywgb3IgdXNlIHRoZSB0aW1lIHRyYXZlbGxpbmcgYHJlZHV4LWRldnRvb2xzYC4gQW4gYWN0aW9uIG11c3QgaGF2ZVxuXHQgICAqIGEgYHR5cGVgIHByb3BlcnR5IHdoaWNoIG1heSBub3QgYmUgYHVuZGVmaW5lZGAuIEl0IGlzIGEgZ29vZCBpZGVhIHRvIHVzZVxuXHQgICAqIHN0cmluZyBjb25zdGFudHMgZm9yIGFjdGlvbiB0eXBlcy5cblx0ICAgKlxuXHQgICAqIEByZXR1cm5zIHtPYmplY3R9IEZvciBjb252ZW5pZW5jZSwgdGhlIHNhbWUgYWN0aW9uIG9iamVjdCB5b3UgZGlzcGF0Y2hlZC5cblx0ICAgKlxuXHQgICAqIE5vdGUgdGhhdCwgaWYgeW91IHVzZSBhIGN1c3RvbSBtaWRkbGV3YXJlLCBpdCBtYXkgd3JhcCBgZGlzcGF0Y2goKWAgdG9cblx0ICAgKiByZXR1cm4gc29tZXRoaW5nIGVsc2UgKGZvciBleGFtcGxlLCBhIFByb21pc2UgeW91IGNhbiBhd2FpdCkuXG5cdCAgICovXG5cdCAgZnVuY3Rpb24gZGlzcGF0Y2goYWN0aW9uKSB7XG5cdCAgICBpZiAoISgwLCBfaXNQbGFpbk9iamVjdDJbJ2RlZmF1bHQnXSkoYWN0aW9uKSkge1xuXHQgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdGlvbnMgbXVzdCBiZSBwbGFpbiBvYmplY3RzLiAnICsgJ1VzZSBjdXN0b20gbWlkZGxld2FyZSBmb3IgYXN5bmMgYWN0aW9ucy4nKTtcblx0ICAgIH1cblxuXHQgICAgaWYgKHR5cGVvZiBhY3Rpb24udHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0ICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3Rpb25zIG1heSBub3QgaGF2ZSBhbiB1bmRlZmluZWQgXCJ0eXBlXCIgcHJvcGVydHkuICcgKyAnSGF2ZSB5b3UgbWlzc3BlbGxlZCBhIGNvbnN0YW50PycpO1xuXHQgICAgfVxuXG5cdCAgICBpZiAoaXNEaXNwYXRjaGluZykge1xuXHQgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXJzIG1heSBub3QgZGlzcGF0Y2ggYWN0aW9ucy4nKTtcblx0ICAgIH1cblxuXHQgICAgdHJ5IHtcblx0ICAgICAgaXNEaXNwYXRjaGluZyA9IHRydWU7XG5cdCAgICAgIGN1cnJlbnRTdGF0ZSA9IGN1cnJlbnRSZWR1Y2VyKGN1cnJlbnRTdGF0ZSwgYWN0aW9uKTtcblx0ICAgIH0gZmluYWxseSB7XG5cdCAgICAgIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcblx0ICAgIH1cblxuXHQgICAgdmFyIGxpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnMgPSBuZXh0TGlzdGVuZXJzO1xuXHQgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgbGlzdGVuZXJzW2ldKCk7XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiBhY3Rpb247XG5cdCAgfVxuXG5cdCAgLyoqXG5cdCAgICogUmVwbGFjZXMgdGhlIHJlZHVjZXIgY3VycmVudGx5IHVzZWQgYnkgdGhlIHN0b3JlIHRvIGNhbGN1bGF0ZSB0aGUgc3RhdGUuXG5cdCAgICpcblx0ICAgKiBZb3UgbWlnaHQgbmVlZCB0aGlzIGlmIHlvdXIgYXBwIGltcGxlbWVudHMgY29kZSBzcGxpdHRpbmcgYW5kIHlvdSB3YW50IHRvXG5cdCAgICogbG9hZCBzb21lIG9mIHRoZSByZWR1Y2VycyBkeW5hbWljYWxseS4gWW91IG1pZ2h0IGFsc28gbmVlZCB0aGlzIGlmIHlvdVxuXHQgICAqIGltcGxlbWVudCBhIGhvdCByZWxvYWRpbmcgbWVjaGFuaXNtIGZvciBSZWR1eC5cblx0ICAgKlxuXHQgICAqIEBwYXJhbSB7RnVuY3Rpb259IG5leHRSZWR1Y2VyIFRoZSByZWR1Y2VyIGZvciB0aGUgc3RvcmUgdG8gdXNlIGluc3RlYWQuXG5cdCAgICogQHJldHVybnMge3ZvaWR9XG5cdCAgICovXG5cdCAgZnVuY3Rpb24gcmVwbGFjZVJlZHVjZXIobmV4dFJlZHVjZXIpIHtcblx0ICAgIGlmICh0eXBlb2YgbmV4dFJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgbmV4dFJlZHVjZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcblx0ICAgIH1cblxuXHQgICAgY3VycmVudFJlZHVjZXIgPSBuZXh0UmVkdWNlcjtcblx0ICAgIGRpc3BhdGNoKHsgdHlwZTogQWN0aW9uVHlwZXMuSU5JVCB9KTtcblx0ICB9XG5cblx0ICAvKipcblx0ICAgKiBJbnRlcm9wZXJhYmlsaXR5IHBvaW50IGZvciBvYnNlcnZhYmxlL3JlYWN0aXZlIGxpYnJhcmllcy5cblx0ICAgKiBAcmV0dXJucyB7b2JzZXJ2YWJsZX0gQSBtaW5pbWFsIG9ic2VydmFibGUgb2Ygc3RhdGUgY2hhbmdlcy5cblx0ICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIHRoZSBvYnNlcnZhYmxlIHByb3Bvc2FsOlxuXHQgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS96ZW5wYXJzaW5nL2VzLW9ic2VydmFibGVcblx0ICAgKi9cblx0ICBmdW5jdGlvbiBvYnNlcnZhYmxlKCkge1xuXHQgICAgdmFyIF9yZWY7XG5cblx0ICAgIHZhciBvdXRlclN1YnNjcmliZSA9IHN1YnNjcmliZTtcblx0ICAgIHJldHVybiBfcmVmID0ge1xuXHQgICAgICAvKipcblx0ICAgICAgICogVGhlIG1pbmltYWwgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb24gbWV0aG9kLlxuXHQgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JzZXJ2ZXIgQW55IG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIGFzIGFuIG9ic2VydmVyLlxuXHQgICAgICAgKiBUaGUgb2JzZXJ2ZXIgb2JqZWN0IHNob3VsZCBoYXZlIGEgYG5leHRgIG1ldGhvZC5cblx0ICAgICAgICogQHJldHVybnMge3N1YnNjcmlwdGlvbn0gQW4gb2JqZWN0IHdpdGggYW4gYHVuc3Vic2NyaWJlYCBtZXRob2QgdGhhdCBjYW5cblx0ICAgICAgICogYmUgdXNlZCB0byB1bnN1YnNjcmliZSB0aGUgb2JzZXJ2YWJsZSBmcm9tIHRoZSBzdG9yZSwgYW5kIHByZXZlbnQgZnVydGhlclxuXHQgICAgICAgKiBlbWlzc2lvbiBvZiB2YWx1ZXMgZnJvbSB0aGUgb2JzZXJ2YWJsZS5cblx0ICAgICAgICovXG5cdCAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyKSB7XG5cdCAgICAgICAgaWYgKHR5cGVvZiBvYnNlcnZlciAhPT0gJ29iamVjdCcpIHtcblx0ICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHRoZSBvYnNlcnZlciB0byBiZSBhbiBvYmplY3QuJyk7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgZnVuY3Rpb24gb2JzZXJ2ZVN0YXRlKCkge1xuXHQgICAgICAgICAgaWYgKG9ic2VydmVyLm5leHQpIHtcblx0ICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChnZXRTdGF0ZSgpKTtcblx0ICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cblx0ICAgICAgICBvYnNlcnZlU3RhdGUoKTtcblx0ICAgICAgICB2YXIgdW5zdWJzY3JpYmUgPSBvdXRlclN1YnNjcmliZShvYnNlcnZlU3RhdGUpO1xuXHQgICAgICAgIHJldHVybiB7IHVuc3Vic2NyaWJlOiB1bnN1YnNjcmliZSB9O1xuXHQgICAgICB9XG5cdCAgICB9LCBfcmVmW19zeW1ib2xPYnNlcnZhYmxlMlsnZGVmYXVsdCddXSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgcmV0dXJuIHRoaXM7XG5cdCAgICB9LCBfcmVmO1xuXHQgIH1cblxuXHQgIC8vIFdoZW4gYSBzdG9yZSBpcyBjcmVhdGVkLCBhbiBcIklOSVRcIiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCBzbyB0aGF0IGV2ZXJ5XG5cdCAgLy8gcmVkdWNlciByZXR1cm5zIHRoZWlyIGluaXRpYWwgc3RhdGUuIFRoaXMgZWZmZWN0aXZlbHkgcG9wdWxhdGVzXG5cdCAgLy8gdGhlIGluaXRpYWwgc3RhdGUgdHJlZS5cblx0ICBkaXNwYXRjaCh7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG5cblx0ICByZXR1cm4gX3JlZjIgPSB7XG5cdCAgICBkaXNwYXRjaDogZGlzcGF0Y2gsXG5cdCAgICBzdWJzY3JpYmU6IHN1YnNjcmliZSxcblx0ICAgIGdldFN0YXRlOiBnZXRTdGF0ZSxcblx0ICAgIHJlcGxhY2VSZWR1Y2VyOiByZXBsYWNlUmVkdWNlclxuXHQgIH0sIF9yZWYyW19zeW1ib2xPYnNlcnZhYmxlMlsnZGVmYXVsdCddXSA9IG9ic2VydmFibGUsIF9yZWYyO1xuXHR9XG5cbi8qKiovIH0sXG4vKiAzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblx0ZXhwb3J0c1snZGVmYXVsdCddID0gd2FybmluZztcblx0LyoqXG5cdCAqIFByaW50cyBhIHdhcm5pbmcgaW4gdGhlIGNvbnNvbGUgaWYgaXQgZXhpc3RzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBUaGUgd2FybmluZyBtZXNzYWdlLlxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdGZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSkge1xuXHQgIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cblx0ICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuXHQgIH1cblx0ICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cblx0ICB0cnkge1xuXHQgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCBpZiB5b3UgZW5hYmxlXG5cdCAgICAvLyBcImJyZWFrIG9uIGFsbCBleGNlcHRpb25zXCIgaW4geW91ciBjb25zb2xlLFxuXHQgICAgLy8gaXQgd291bGQgcGF1c2UgdGhlIGV4ZWN1dGlvbiBhdCB0aGlzIGxpbmUuXG5cdCAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG5cdCAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1lbXB0eSAqL1xuXHQgIH0gY2F0Y2ggKGUpIHt9XG5cdCAgLyogZXNsaW50LWVuYWJsZSBuby1lbXB0eSAqL1xuXHR9XG5cbi8qKiovIH0sXG4vKiA0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgZ2V0UHJvdG90eXBlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KSxcblx0ICAgIGlzSG9zdE9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oOSksXG5cdCAgICBpc09iamVjdExpa2UgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKTtcblxuXHQvKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG5cdHZhciBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuXHQvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG5cdHZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG5cdCAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cblx0LyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xuXHR2YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG5cdC8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xuXHR2YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuXHQvKiogVXNlZCB0byBpbmZlciB0aGUgYE9iamVjdGAgY29uc3RydWN0b3IuICovXG5cdHZhciBvYmplY3RDdG9yU3RyaW5nID0gZnVuY1RvU3RyaW5nLmNhbGwoT2JqZWN0KTtcblxuXHQvKipcblx0ICogVXNlZCB0byByZXNvbHZlIHRoZVxuXHQgKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcblx0ICogb2YgdmFsdWVzLlxuXHQgKi9cblx0dmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cblx0LyoqXG5cdCAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcblx0ICogYE9iamVjdGAgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBgW1tQcm90b3R5cGVdXWAgb2YgYG51bGxgLlxuXHQgKlxuXHQgKiBAc3RhdGljXG5cdCAqIEBtZW1iZXJPZiBfXG5cdCAqIEBzaW5jZSAwLjguMFxuXHQgKiBAY2F0ZWdvcnkgTGFuZ1xuXHQgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cblx0ICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cblx0ICogQGV4YW1wbGVcblx0ICpcblx0ICogZnVuY3Rpb24gRm9vKCkge1xuXHQgKiAgIHRoaXMuYSA9IDE7XG5cdCAqIH1cblx0ICpcblx0ICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuXHQgKiAvLyA9PiBmYWxzZVxuXHQgKlxuXHQgKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcblx0ICogLy8gPT4gZmFsc2Vcblx0ICpcblx0ICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG5cdCAqIC8vID0+IHRydWVcblx0ICpcblx0ICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuXHQgKiAvLyA9PiB0cnVlXG5cdCAqL1xuXHRmdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG5cdCAgaWYgKCFpc09iamVjdExpa2UodmFsdWUpIHx8XG5cdCAgICAgIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpICE9IG9iamVjdFRhZyB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSB7XG5cdCAgICByZXR1cm4gZmFsc2U7XG5cdCAgfVxuXHQgIHZhciBwcm90byA9IGdldFByb3RvdHlwZSh2YWx1ZSk7XG5cdCAgaWYgKHByb3RvID09PSBudWxsKSB7XG5cdCAgICByZXR1cm4gdHJ1ZTtcblx0ICB9XG5cdCAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3Rvcjtcblx0ICByZXR1cm4gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiZcblx0ICAgIEN0b3IgaW5zdGFuY2VvZiBDdG9yICYmIGZ1bmNUb1N0cmluZy5jYWxsKEN0b3IpID09IG9iamVjdEN0b3JTdHJpbmcpO1xuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBpc1BsYWluT2JqZWN0O1xuXG5cbi8qKiovIH0sXG4vKiA1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuXHR2YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5cdGV4cG9ydHNbJ2RlZmF1bHQnXSA9IGFwcGx5TWlkZGxld2FyZTtcblxuXHR2YXIgX2NvbXBvc2UgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG5cdHZhciBfY29tcG9zZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb21wb3NlKTtcblxuXHRmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBzdG9yZSBlbmhhbmNlciB0aGF0IGFwcGxpZXMgbWlkZGxld2FyZSB0byB0aGUgZGlzcGF0Y2ggbWV0aG9kXG5cdCAqIG9mIHRoZSBSZWR1eCBzdG9yZS4gVGhpcyBpcyBoYW5keSBmb3IgYSB2YXJpZXR5IG9mIHRhc2tzLCBzdWNoIGFzIGV4cHJlc3Npbmdcblx0ICogYXN5bmNocm9ub3VzIGFjdGlvbnMgaW4gYSBjb25jaXNlIG1hbm5lciwgb3IgbG9nZ2luZyBldmVyeSBhY3Rpb24gcGF5bG9hZC5cblx0ICpcblx0ICogU2VlIGByZWR1eC10aHVua2AgcGFja2FnZSBhcyBhbiBleGFtcGxlIG9mIHRoZSBSZWR1eCBtaWRkbGV3YXJlLlxuXHQgKlxuXHQgKiBCZWNhdXNlIG1pZGRsZXdhcmUgaXMgcG90ZW50aWFsbHkgYXN5bmNocm9ub3VzLCB0aGlzIHNob3VsZCBiZSB0aGUgZmlyc3Rcblx0ICogc3RvcmUgZW5oYW5jZXIgaW4gdGhlIGNvbXBvc2l0aW9uIGNoYWluLlxuXHQgKlxuXHQgKiBOb3RlIHRoYXQgZWFjaCBtaWRkbGV3YXJlIHdpbGwgYmUgZ2l2ZW4gdGhlIGBkaXNwYXRjaGAgYW5kIGBnZXRTdGF0ZWAgZnVuY3Rpb25zXG5cdCAqIGFzIG5hbWVkIGFyZ3VtZW50cy5cblx0ICpcblx0ICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gbWlkZGxld2FyZXMgVGhlIG1pZGRsZXdhcmUgY2hhaW4gdG8gYmUgYXBwbGllZC5cblx0ICogQHJldHVybnMge0Z1bmN0aW9ufSBBIHN0b3JlIGVuaGFuY2VyIGFwcGx5aW5nIHRoZSBtaWRkbGV3YXJlLlxuXHQgKi9cblx0ZnVuY3Rpb24gYXBwbHlNaWRkbGV3YXJlKCkge1xuXHQgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBtaWRkbGV3YXJlcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuXHQgICAgbWlkZGxld2FyZXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG5cdCAgfVxuXG5cdCAgcmV0dXJuIGZ1bmN0aW9uIChjcmVhdGVTdG9yZSkge1xuXHQgICAgcmV0dXJuIGZ1bmN0aW9uIChyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgZW5oYW5jZXIpIHtcblx0ICAgICAgdmFyIHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKTtcblx0ICAgICAgdmFyIF9kaXNwYXRjaCA9IHN0b3JlLmRpc3BhdGNoO1xuXHQgICAgICB2YXIgY2hhaW4gPSBbXTtcblxuXHQgICAgICB2YXIgbWlkZGxld2FyZUFQSSA9IHtcblx0ICAgICAgICBnZXRTdGF0ZTogc3RvcmUuZ2V0U3RhdGUsXG5cdCAgICAgICAgZGlzcGF0Y2g6IGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuXHQgICAgICAgICAgcmV0dXJuIF9kaXNwYXRjaChhY3Rpb24pO1xuXHQgICAgICAgIH1cblx0ICAgICAgfTtcblx0ICAgICAgY2hhaW4gPSBtaWRkbGV3YXJlcy5tYXAoZnVuY3Rpb24gKG1pZGRsZXdhcmUpIHtcblx0ICAgICAgICByZXR1cm4gbWlkZGxld2FyZShtaWRkbGV3YXJlQVBJKTtcblx0ICAgICAgfSk7XG5cdCAgICAgIF9kaXNwYXRjaCA9IF9jb21wb3NlMlsnZGVmYXVsdCddLmFwcGx5KHVuZGVmaW5lZCwgY2hhaW4pKHN0b3JlLmRpc3BhdGNoKTtcblxuXHQgICAgICByZXR1cm4gX2V4dGVuZHMoe30sIHN0b3JlLCB7XG5cdCAgICAgICAgZGlzcGF0Y2g6IF9kaXNwYXRjaFxuXHQgICAgICB9KTtcblx0ICAgIH07XG5cdCAgfTtcblx0fVxuXG4vKioqLyB9LFxuLyogNiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cdGV4cG9ydHNbJ2RlZmF1bHQnXSA9IGJpbmRBY3Rpb25DcmVhdG9ycztcblx0ZnVuY3Rpb24gYmluZEFjdGlvbkNyZWF0b3IoYWN0aW9uQ3JlYXRvciwgZGlzcGF0Y2gpIHtcblx0ICByZXR1cm4gZnVuY3Rpb24gKCkge1xuXHQgICAgcmV0dXJuIGRpc3BhdGNoKGFjdGlvbkNyZWF0b3IuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpKTtcblx0ICB9O1xuXHR9XG5cblx0LyoqXG5cdCAqIFR1cm5zIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGFjdGlvbiBjcmVhdG9ycywgaW50byBhbiBvYmplY3Qgd2l0aCB0aGVcblx0ICogc2FtZSBrZXlzLCBidXQgd2l0aCBldmVyeSBmdW5jdGlvbiB3cmFwcGVkIGludG8gYSBgZGlzcGF0Y2hgIGNhbGwgc28gdGhleVxuXHQgKiBtYXkgYmUgaW52b2tlZCBkaXJlY3RseS4gVGhpcyBpcyBqdXN0IGEgY29udmVuaWVuY2UgbWV0aG9kLCBhcyB5b3UgY2FuIGNhbGxcblx0ICogYHN0b3JlLmRpc3BhdGNoKE15QWN0aW9uQ3JlYXRvcnMuZG9Tb21ldGhpbmcoKSlgIHlvdXJzZWxmIGp1c3QgZmluZS5cblx0ICpcblx0ICogRm9yIGNvbnZlbmllbmNlLCB5b3UgY2FuIGFsc28gcGFzcyBhIHNpbmdsZSBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQsXG5cdCAqIGFuZCBnZXQgYSBmdW5jdGlvbiBpbiByZXR1cm4uXG5cdCAqXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fSBhY3Rpb25DcmVhdG9ycyBBbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBhY3Rpb25cblx0ICogY3JlYXRvciBmdW5jdGlvbnMuIE9uZSBoYW5keSB3YXkgdG8gb2J0YWluIGl0IGlzIHRvIHVzZSBFUzYgYGltcG9ydCAqIGFzYFxuXHQgKiBzeW50YXguIFlvdSBtYXkgYWxzbyBwYXNzIGEgc2luZ2xlIGZ1bmN0aW9uLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBkaXNwYXRjaCBUaGUgYGRpc3BhdGNoYCBmdW5jdGlvbiBhdmFpbGFibGUgb24geW91ciBSZWR1eFxuXHQgKiBzdG9yZS5cblx0ICpcblx0ICogQHJldHVybnMge0Z1bmN0aW9ufE9iamVjdH0gVGhlIG9iamVjdCBtaW1pY2tpbmcgdGhlIG9yaWdpbmFsIG9iamVjdCwgYnV0IHdpdGhcblx0ICogZXZlcnkgYWN0aW9uIGNyZWF0b3Igd3JhcHBlZCBpbnRvIHRoZSBgZGlzcGF0Y2hgIGNhbGwuIElmIHlvdSBwYXNzZWQgYVxuXHQgKiBmdW5jdGlvbiBhcyBgYWN0aW9uQ3JlYXRvcnNgLCB0aGUgcmV0dXJuIHZhbHVlIHdpbGwgYWxzbyBiZSBhIHNpbmdsZVxuXHQgKiBmdW5jdGlvbi5cblx0ICovXG5cdGZ1bmN0aW9uIGJpbmRBY3Rpb25DcmVhdG9ycyhhY3Rpb25DcmVhdG9ycywgZGlzcGF0Y2gpIHtcblx0ICBpZiAodHlwZW9mIGFjdGlvbkNyZWF0b3JzID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICByZXR1cm4gYmluZEFjdGlvbkNyZWF0b3IoYWN0aW9uQ3JlYXRvcnMsIGRpc3BhdGNoKTtcblx0ICB9XG5cblx0ICBpZiAodHlwZW9mIGFjdGlvbkNyZWF0b3JzICE9PSAnb2JqZWN0JyB8fCBhY3Rpb25DcmVhdG9ycyA9PT0gbnVsbCkge1xuXHQgICAgdGhyb3cgbmV3IEVycm9yKCdiaW5kQWN0aW9uQ3JlYXRvcnMgZXhwZWN0ZWQgYW4gb2JqZWN0IG9yIGEgZnVuY3Rpb24sIGluc3RlYWQgcmVjZWl2ZWQgJyArIChhY3Rpb25DcmVhdG9ycyA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBhY3Rpb25DcmVhdG9ycykgKyAnLiAnICsgJ0RpZCB5b3Ugd3JpdGUgXCJpbXBvcnQgQWN0aW9uQ3JlYXRvcnMgZnJvbVwiIGluc3RlYWQgb2YgXCJpbXBvcnQgKiBhcyBBY3Rpb25DcmVhdG9ycyBmcm9tXCI/Jyk7XG5cdCAgfVxuXG5cdCAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhY3Rpb25DcmVhdG9ycyk7XG5cdCAgdmFyIGJvdW5kQWN0aW9uQ3JlYXRvcnMgPSB7fTtcblx0ICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcblx0ICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuXHQgICAgdmFyIGFjdGlvbkNyZWF0b3IgPSBhY3Rpb25DcmVhdG9yc1trZXldO1xuXHQgICAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9yID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgIGJvdW5kQWN0aW9uQ3JlYXRvcnNba2V5XSA9IGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3IsIGRpc3BhdGNoKTtcblx0ICAgIH1cblx0ICB9XG5cdCAgcmV0dXJuIGJvdW5kQWN0aW9uQ3JlYXRvcnM7XG5cdH1cblxuLyoqKi8gfSxcbi8qIDcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXHRleHBvcnRzWydkZWZhdWx0J10gPSBjb21iaW5lUmVkdWNlcnM7XG5cblx0dmFyIF9jcmVhdGVTdG9yZSA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cblx0dmFyIF9pc1BsYWluT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblxuXHR2YXIgX2lzUGxhaW5PYmplY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNQbGFpbk9iamVjdCk7XG5cblx0dmFyIF93YXJuaW5nID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxuXHR2YXIgX3dhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2FybmluZyk7XG5cblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5cdGZ1bmN0aW9uIGdldFVuZGVmaW5lZFN0YXRlRXJyb3JNZXNzYWdlKGtleSwgYWN0aW9uKSB7XG5cdCAgdmFyIGFjdGlvblR5cGUgPSBhY3Rpb24gJiYgYWN0aW9uLnR5cGU7XG5cdCAgdmFyIGFjdGlvbk5hbWUgPSBhY3Rpb25UeXBlICYmICdcIicgKyBhY3Rpb25UeXBlLnRvU3RyaW5nKCkgKyAnXCInIHx8ICdhbiBhY3Rpb24nO1xuXG5cdCAgcmV0dXJuICdHaXZlbiBhY3Rpb24gJyArIGFjdGlvbk5hbWUgKyAnLCByZWR1Y2VyIFwiJyArIGtleSArICdcIiByZXR1cm5lZCB1bmRlZmluZWQuICcgKyAnVG8gaWdub3JlIGFuIGFjdGlvbiwgeW91IG11c3QgZXhwbGljaXRseSByZXR1cm4gdGhlIHByZXZpb3VzIHN0YXRlLic7XG5cdH1cblxuXHRmdW5jdGlvbiBnZXRVbmV4cGVjdGVkU3RhdGVTaGFwZVdhcm5pbmdNZXNzYWdlKGlucHV0U3RhdGUsIHJlZHVjZXJzLCBhY3Rpb24sIHVuZXhwZWN0ZWRLZXlDYWNoZSkge1xuXHQgIHZhciByZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKHJlZHVjZXJzKTtcblx0ICB2YXIgYXJndW1lbnROYW1lID0gYWN0aW9uICYmIGFjdGlvbi50eXBlID09PSBfY3JlYXRlU3RvcmUuQWN0aW9uVHlwZXMuSU5JVCA/ICdwcmVsb2FkZWRTdGF0ZSBhcmd1bWVudCBwYXNzZWQgdG8gY3JlYXRlU3RvcmUnIDogJ3ByZXZpb3VzIHN0YXRlIHJlY2VpdmVkIGJ5IHRoZSByZWR1Y2VyJztcblxuXHQgIGlmIChyZWR1Y2VyS2V5cy5sZW5ndGggPT09IDApIHtcblx0ICAgIHJldHVybiAnU3RvcmUgZG9lcyBub3QgaGF2ZSBhIHZhbGlkIHJlZHVjZXIuIE1ha2Ugc3VyZSB0aGUgYXJndW1lbnQgcGFzc2VkICcgKyAndG8gY29tYmluZVJlZHVjZXJzIGlzIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIHJlZHVjZXJzLic7XG5cdCAgfVxuXG5cdCAgaWYgKCEoMCwgX2lzUGxhaW5PYmplY3QyWydkZWZhdWx0J10pKGlucHV0U3RhdGUpKSB7XG5cdCAgICByZXR1cm4gJ1RoZSAnICsgYXJndW1lbnROYW1lICsgJyBoYXMgdW5leHBlY3RlZCB0eXBlIG9mIFwiJyArIHt9LnRvU3RyaW5nLmNhbGwoaW5wdXRTdGF0ZSkubWF0Y2goL1xccyhbYS16fEEtWl0rKS8pWzFdICsgJ1wiLiBFeHBlY3RlZCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nICcgKyAoJ2tleXM6IFwiJyArIHJlZHVjZXJLZXlzLmpvaW4oJ1wiLCBcIicpICsgJ1wiJyk7XG5cdCAgfVxuXG5cdCAgdmFyIHVuZXhwZWN0ZWRLZXlzID0gT2JqZWN0LmtleXMoaW5wdXRTdGF0ZSkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcblx0ICAgIHJldHVybiAhcmVkdWNlcnMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAhdW5leHBlY3RlZEtleUNhY2hlW2tleV07XG5cdCAgfSk7XG5cblx0ICB1bmV4cGVjdGVkS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0ICAgIHVuZXhwZWN0ZWRLZXlDYWNoZVtrZXldID0gdHJ1ZTtcblx0ICB9KTtcblxuXHQgIGlmICh1bmV4cGVjdGVkS2V5cy5sZW5ndGggPiAwKSB7XG5cdCAgICByZXR1cm4gJ1VuZXhwZWN0ZWQgJyArICh1bmV4cGVjdGVkS2V5cy5sZW5ndGggPiAxID8gJ2tleXMnIDogJ2tleScpICsgJyAnICsgKCdcIicgKyB1bmV4cGVjdGVkS2V5cy5qb2luKCdcIiwgXCInKSArICdcIiBmb3VuZCBpbiAnICsgYXJndW1lbnROYW1lICsgJy4gJykgKyAnRXhwZWN0ZWQgdG8gZmluZCBvbmUgb2YgdGhlIGtub3duIHJlZHVjZXIga2V5cyBpbnN0ZWFkOiAnICsgKCdcIicgKyByZWR1Y2VyS2V5cy5qb2luKCdcIiwgXCInKSArICdcIi4gVW5leHBlY3RlZCBrZXlzIHdpbGwgYmUgaWdub3JlZC4nKTtcblx0ICB9XG5cdH1cblxuXHRmdW5jdGlvbiBhc3NlcnRSZWR1Y2VyU2FuaXR5KHJlZHVjZXJzKSB7XG5cdCAgT2JqZWN0LmtleXMocmVkdWNlcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHQgICAgdmFyIHJlZHVjZXIgPSByZWR1Y2Vyc1trZXldO1xuXHQgICAgdmFyIGluaXRpYWxTdGF0ZSA9IHJlZHVjZXIodW5kZWZpbmVkLCB7IHR5cGU6IF9jcmVhdGVTdG9yZS5BY3Rpb25UeXBlcy5JTklUIH0pO1xuXG5cdCAgICBpZiAodHlwZW9mIGluaXRpYWxTdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0ICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VyIFwiJyArIGtleSArICdcIiByZXR1cm5lZCB1bmRlZmluZWQgZHVyaW5nIGluaXRpYWxpemF0aW9uLiAnICsgJ0lmIHRoZSBzdGF0ZSBwYXNzZWQgdG8gdGhlIHJlZHVjZXIgaXMgdW5kZWZpbmVkLCB5b3UgbXVzdCAnICsgJ2V4cGxpY2l0bHkgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLiBUaGUgaW5pdGlhbCBzdGF0ZSBtYXkgJyArICdub3QgYmUgdW5kZWZpbmVkLicpO1xuXHQgICAgfVxuXG5cdCAgICB2YXIgdHlwZSA9ICdAQHJlZHV4L1BST0JFX1VOS05PV05fQUNUSU9OXycgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoNykuc3BsaXQoJycpLmpvaW4oJy4nKTtcblx0ICAgIGlmICh0eXBlb2YgcmVkdWNlcih1bmRlZmluZWQsIHsgdHlwZTogdHlwZSB9KSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0ICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VyIFwiJyArIGtleSArICdcIiByZXR1cm5lZCB1bmRlZmluZWQgd2hlbiBwcm9iZWQgd2l0aCBhIHJhbmRvbSB0eXBlLiAnICsgKCdEb25cXCd0IHRyeSB0byBoYW5kbGUgJyArIF9jcmVhdGVTdG9yZS5BY3Rpb25UeXBlcy5JTklUICsgJyBvciBvdGhlciBhY3Rpb25zIGluIFwicmVkdXgvKlwiICcpICsgJ25hbWVzcGFjZS4gVGhleSBhcmUgY29uc2lkZXJlZCBwcml2YXRlLiBJbnN0ZWFkLCB5b3UgbXVzdCByZXR1cm4gdGhlICcgKyAnY3VycmVudCBzdGF0ZSBmb3IgYW55IHVua25vd24gYWN0aW9ucywgdW5sZXNzIGl0IGlzIHVuZGVmaW5lZCwgJyArICdpbiB3aGljaCBjYXNlIHlvdSBtdXN0IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZSwgcmVnYXJkbGVzcyBvZiB0aGUgJyArICdhY3Rpb24gdHlwZS4gVGhlIGluaXRpYWwgc3RhdGUgbWF5IG5vdCBiZSB1bmRlZmluZWQuJyk7XG5cdCAgICB9XG5cdCAgfSk7XG5cdH1cblxuXHQvKipcblx0ICogVHVybnMgYW4gb2JqZWN0IHdob3NlIHZhbHVlcyBhcmUgZGlmZmVyZW50IHJlZHVjZXIgZnVuY3Rpb25zLCBpbnRvIGEgc2luZ2xlXG5cdCAqIHJlZHVjZXIgZnVuY3Rpb24uIEl0IHdpbGwgY2FsbCBldmVyeSBjaGlsZCByZWR1Y2VyLCBhbmQgZ2F0aGVyIHRoZWlyIHJlc3VsdHNcblx0ICogaW50byBhIHNpbmdsZSBzdGF0ZSBvYmplY3QsIHdob3NlIGtleXMgY29ycmVzcG9uZCB0byB0aGUga2V5cyBvZiB0aGUgcGFzc2VkXG5cdCAqIHJlZHVjZXIgZnVuY3Rpb25zLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gcmVkdWNlcnMgQW4gb2JqZWN0IHdob3NlIHZhbHVlcyBjb3JyZXNwb25kIHRvIGRpZmZlcmVudFxuXHQgKiByZWR1Y2VyIGZ1bmN0aW9ucyB0aGF0IG5lZWQgdG8gYmUgY29tYmluZWQgaW50byBvbmUuIE9uZSBoYW5keSB3YXkgdG8gb2J0YWluXG5cdCAqIGl0IGlzIHRvIHVzZSBFUzYgYGltcG9ydCAqIGFzIHJlZHVjZXJzYCBzeW50YXguIFRoZSByZWR1Y2VycyBtYXkgbmV2ZXIgcmV0dXJuXG5cdCAqIHVuZGVmaW5lZCBmb3IgYW55IGFjdGlvbi4gSW5zdGVhZCwgdGhleSBzaG91bGQgcmV0dXJuIHRoZWlyIGluaXRpYWwgc3RhdGVcblx0ICogaWYgdGhlIHN0YXRlIHBhc3NlZCB0byB0aGVtIHdhcyB1bmRlZmluZWQsIGFuZCB0aGUgY3VycmVudCBzdGF0ZSBmb3IgYW55XG5cdCAqIHVucmVjb2duaXplZCBhY3Rpb24uXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSByZWR1Y2VyIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBldmVyeSByZWR1Y2VyIGluc2lkZSB0aGVcblx0ICogcGFzc2VkIG9iamVjdCwgYW5kIGJ1aWxkcyBhIHN0YXRlIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlLlxuXHQgKi9cblx0ZnVuY3Rpb24gY29tYmluZVJlZHVjZXJzKHJlZHVjZXJzKSB7XG5cdCAgdmFyIHJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMocmVkdWNlcnMpO1xuXHQgIHZhciBmaW5hbFJlZHVjZXJzID0ge307XG5cdCAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWR1Y2VyS2V5cy5sZW5ndGg7IGkrKykge1xuXHQgICAgdmFyIGtleSA9IHJlZHVjZXJLZXlzW2ldO1xuXG5cdCAgICBpZiAodHJ1ZSkge1xuXHQgICAgICBpZiAodHlwZW9mIHJlZHVjZXJzW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XG5cdCAgICAgICAgKDAsIF93YXJuaW5nMlsnZGVmYXVsdCddKSgnTm8gcmVkdWNlciBwcm92aWRlZCBmb3Iga2V5IFwiJyArIGtleSArICdcIicpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICBmaW5hbFJlZHVjZXJzW2tleV0gPSByZWR1Y2Vyc1trZXldO1xuXHQgICAgfVxuXHQgIH1cblx0ICB2YXIgZmluYWxSZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKGZpbmFsUmVkdWNlcnMpO1xuXG5cdCAgaWYgKHRydWUpIHtcblx0ICAgIHZhciB1bmV4cGVjdGVkS2V5Q2FjaGUgPSB7fTtcblx0ICB9XG5cblx0ICB2YXIgc2FuaXR5RXJyb3I7XG5cdCAgdHJ5IHtcblx0ICAgIGFzc2VydFJlZHVjZXJTYW5pdHkoZmluYWxSZWR1Y2Vycyk7XG5cdCAgfSBjYXRjaCAoZSkge1xuXHQgICAgc2FuaXR5RXJyb3IgPSBlO1xuXHQgIH1cblxuXHQgIHJldHVybiBmdW5jdGlvbiBjb21iaW5hdGlvbigpIHtcblx0ICAgIHZhciBzdGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuXHQgICAgdmFyIGFjdGlvbiA9IGFyZ3VtZW50c1sxXTtcblxuXHQgICAgaWYgKHNhbml0eUVycm9yKSB7XG5cdCAgICAgIHRocm93IHNhbml0eUVycm9yO1xuXHQgICAgfVxuXG5cdCAgICBpZiAodHJ1ZSkge1xuXHQgICAgICB2YXIgd2FybmluZ01lc3NhZ2UgPSBnZXRVbmV4cGVjdGVkU3RhdGVTaGFwZVdhcm5pbmdNZXNzYWdlKHN0YXRlLCBmaW5hbFJlZHVjZXJzLCBhY3Rpb24sIHVuZXhwZWN0ZWRLZXlDYWNoZSk7XG5cdCAgICAgIGlmICh3YXJuaW5nTWVzc2FnZSkge1xuXHQgICAgICAgICgwLCBfd2FybmluZzJbJ2RlZmF1bHQnXSkod2FybmluZ01lc3NhZ2UpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIHZhciBoYXNDaGFuZ2VkID0gZmFsc2U7XG5cdCAgICB2YXIgbmV4dFN0YXRlID0ge307XG5cdCAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbmFsUmVkdWNlcktleXMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgdmFyIGtleSA9IGZpbmFsUmVkdWNlcktleXNbaV07XG5cdCAgICAgIHZhciByZWR1Y2VyID0gZmluYWxSZWR1Y2Vyc1trZXldO1xuXHQgICAgICB2YXIgcHJldmlvdXNTdGF0ZUZvcktleSA9IHN0YXRlW2tleV07XG5cdCAgICAgIHZhciBuZXh0U3RhdGVGb3JLZXkgPSByZWR1Y2VyKHByZXZpb3VzU3RhdGVGb3JLZXksIGFjdGlvbik7XG5cdCAgICAgIGlmICh0eXBlb2YgbmV4dFN0YXRlRm9yS2V5ID09PSAndW5kZWZpbmVkJykge1xuXHQgICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBnZXRVbmRlZmluZWRTdGF0ZUVycm9yTWVzc2FnZShrZXksIGFjdGlvbik7XG5cdCAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG5cdCAgICAgIH1cblx0ICAgICAgbmV4dFN0YXRlW2tleV0gPSBuZXh0U3RhdGVGb3JLZXk7XG5cdCAgICAgIGhhc0NoYW5nZWQgPSBoYXNDaGFuZ2VkIHx8IG5leHRTdGF0ZUZvcktleSAhPT0gcHJldmlvdXNTdGF0ZUZvcktleTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBoYXNDaGFuZ2VkID8gbmV4dFN0YXRlIDogc3RhdGU7XG5cdCAgfTtcblx0fVxuXG4vKioqLyB9LFxuLyogOCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIG92ZXJBcmcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKTtcblxuXHQvKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cblx0dmFyIGdldFByb3RvdHlwZSA9IG92ZXJBcmcoT2JqZWN0LmdldFByb3RvdHlwZU9mLCBPYmplY3QpO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZ2V0UHJvdG90eXBlO1xuXG5cbi8qKiovIH0sXG4vKiA5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKipcblx0ICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCBpbiBJRSA8IDkuXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG5cdCAqL1xuXHRmdW5jdGlvbiBpc0hvc3RPYmplY3QodmFsdWUpIHtcblx0ICAvLyBNYW55IGhvc3Qgb2JqZWN0cyBhcmUgYE9iamVjdGAgb2JqZWN0cyB0aGF0IGNhbiBjb2VyY2UgdG8gc3RyaW5nc1xuXHQgIC8vIGRlc3BpdGUgaGF2aW5nIGltcHJvcGVybHkgZGVmaW5lZCBgdG9TdHJpbmdgIG1ldGhvZHMuXG5cdCAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuXHQgIGlmICh2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZS50b1N0cmluZyAhPSAnZnVuY3Rpb24nKSB7XG5cdCAgICB0cnkge1xuXHQgICAgICByZXN1bHQgPSAhISh2YWx1ZSArICcnKTtcblx0ICAgIH0gY2F0Y2ggKGUpIHt9XG5cdCAgfVxuXHQgIHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGlzSG9zdE9iamVjdDtcblxuXG4vKioqLyB9LFxuLyogMTAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cblx0ICpcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG5cdCAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuXHQgKi9cblx0ZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcblx0ICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG5cdCAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG5cdCAgfTtcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gb3ZlckFyZztcblxuXG4vKioqLyB9LFxuLyogMTEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8qKlxuXHQgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcblx0ICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuXHQgKlxuXHQgKiBAc3RhdGljXG5cdCAqIEBtZW1iZXJPZiBfXG5cdCAqIEBzaW5jZSA0LjAuMFxuXHQgKiBAY2F0ZWdvcnkgTGFuZ1xuXHQgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cblx0ICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cblx0ICogQGV4YW1wbGVcblx0ICpcblx0ICogXy5pc09iamVjdExpa2Uoe30pO1xuXHQgKiAvLyA9PiB0cnVlXG5cdCAqXG5cdCAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG5cdCAqIC8vID0+IHRydWVcblx0ICpcblx0ICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcblx0ICogLy8gPT4gZmFsc2Vcblx0ICpcblx0ICogXy5pc09iamVjdExpa2UobnVsbCk7XG5cdCAqIC8vID0+IGZhbHNlXG5cdCAqL1xuXHRmdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcblx0ICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcblxuXG4vKioqLyB9LFxuLyogMTIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdG1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMyk7XG5cblxuLyoqKi8gfSxcbi8qIDEzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi8oZnVuY3Rpb24oZ2xvYmFsKSB7J3VzZSBzdHJpY3QnO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHRcdHZhbHVlOiB0cnVlXG5cdH0pO1xuXG5cdHZhciBfcG9ueWZpbGwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KTtcblxuXHR2YXIgX3BvbnlmaWxsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BvbnlmaWxsKTtcblxuXHRmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cblx0dmFyIHJvb3QgPSB1bmRlZmluZWQ7IC8qIGdsb2JhbCB3aW5kb3cgKi9cblxuXHRpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRyb290ID0gZ2xvYmFsO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cm9vdCA9IHdpbmRvdztcblx0fVxuXG5cdHZhciByZXN1bHQgPSAoMCwgX3BvbnlmaWxsMlsnZGVmYXVsdCddKShyb290KTtcblx0ZXhwb3J0c1snZGVmYXVsdCddID0gcmVzdWx0O1xuXHQvKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi99LmNhbGwoZXhwb3J0cywgKGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSgpKSkpXG5cbi8qKiovIH0sXG4vKiAxNCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHRcdHZhbHVlOiB0cnVlXG5cdH0pO1xuXHRleHBvcnRzWydkZWZhdWx0J10gPSBzeW1ib2xPYnNlcnZhYmxlUG9ueWZpbGw7XG5cdGZ1bmN0aW9uIHN5bWJvbE9ic2VydmFibGVQb255ZmlsbChyb290KSB7XG5cdFx0dmFyIHJlc3VsdDtcblx0XHR2YXIgX1N5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5cdFx0aWYgKHR5cGVvZiBfU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRpZiAoX1N5bWJvbC5vYnNlcnZhYmxlKSB7XG5cdFx0XHRcdHJlc3VsdCA9IF9TeW1ib2wub2JzZXJ2YWJsZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlc3VsdCA9IF9TeW1ib2woJ29ic2VydmFibGUnKTtcblx0XHRcdFx0X1N5bWJvbC5vYnNlcnZhYmxlID0gcmVzdWx0O1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHQgPSAnQEBvYnNlcnZhYmxlJztcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9O1xuXG4vKioqLyB9XG4vKioqKioqLyBdKVxufSk7XG47XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlZHV4L2Rpc3QvcmVkdXguanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEFDVElPTl9ERUZJTkVEID0ge1xuICAgIENoYW5nZVN5bWJvbDogXCJDaGFuZ2VTeW1ib2xcIixcbiAgICBMb2dpbjogXCJMb2dpblwiXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBERUZJTkVEOiBBQ1RJT05fREVGSU5FRCxcbiAgICBnZXRDaGFuZ2VTeW1ib2w6IGZ1bmN0aW9uIChzeW1ib2wpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IEFDVElPTl9ERUZJTkVELkNoYW5nZVN5bWJvbCxcbiAgICAgICAgICAgIHN5bWJvbDogc3ltYm9sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRMb2dpbkFjdGlvbjogZnVuY3Rpb24gKGlzTG9naW4pIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IEFDVElPTl9ERUZJTkVELkxvZ2luLFxuICAgICAgICAgICAgaXNMb2dpbjogaXNMb2dpblxuICAgICAgICB9O1xuICAgIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9jdHJsL3JlZHV4QWN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9zZXJ2aWNlcy9vcmRlcnNlcnZpY2UuanNcIiAvPlxyXG52YXIgYXZhbG9uID0gcmVxdWlyZSgnYXZhbG9uJyk7XHJcbnZhciBvcmRlclNlcnZpY2UgPSByZXF1aXJlKCcuLi9zZXJ2aWNlcy9vcmRlclNlcnZpY2UuanMnKTtcclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIHZhciB2bSA9IGF2YWxvbi5kZWZpbmUoe1xyXG4gICAgICAgICRpZDogXCJpbnZlc3RtZW50Q3RybFwiLFxyXG4gICAgICAgIHN5bWJvbDoge1xyXG4gICAgICAgICAgICBwcmljZTogMCxcclxuICAgICAgICAgICAgc3ltYm9sOiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAndGVzdCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3Blbk9yZGVySW5mbzoge1xyXG4gICAgICAgICAgICB2b2x1bWU6IDIwLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb246IDEsXHJcbiAgICAgICAgICAgIGdhbWVJZDogMVxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGJ1eSgwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRvd246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgYnV5KDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgZnVuY3Rpb24gYnV5KHVwT3JEb3duKSB7XHJcblxyXG4gICAgICAgIHZhciBwb3N0RGF0YSA9IHZtLm9wZW5PcmRlckluZm8uJG1vZGVsO1xyXG4gICAgICAgIHBvc3REYXRhLmRpcmVjdGlvbiA9IHVwT3JEb3duO1xyXG4gICAgICAgIG9yZGVyU2VydmljZS5idXkocG9zdERhdGEpXHJcbiAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChKU09OLnN0cmluZ2lmeShkKSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLmVycm9yKGZ1bmN0aW9uIChodHRwKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBKU09OLnBhcnNlKGh0dHAucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgYWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2bTtcclxufVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgY3JlYXRlQ3RybDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB2bSA9IGluaXQoKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzZXRTeW1ib2w6IGZ1bmN0aW9uIChzeW1ib2wpIHtcclxuICAgICAgICAgICAgICAgIHZtLnN5bWJvbCA9IHN5bWJvbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9jdHJsL2ludmVzdG1lbnRDdHJsLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB3ZWJBcGkgPSByZXF1aXJlKFwiLi4vd2ViYXBpXCIpLmNyZWF0ZShcIi9hcGkvb3JkZXJzXCIpO1xyXG5cclxuZnVuY3Rpb24gYnV5KG9yZGVyKSB7XHJcbiAgICBvcmRlci5jbGllbnRUaW1lID0gKG5ldyBEYXRlKCkpLnRpbWU7XHJcbiAgICByZXR1cm4gd2ViQXBpLlBvc3Qob3JkZXIpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGJ1eTogYnV5LFxyXG4gICAgbGlzdFVuY2xvc2U6ZnVuY3Rpb24oKXtcclxuXHJcbiAgICB9XHJcblxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvc2VydmljZXMvb3JkZXJTZXJ2aWNlLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIC8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vc2VydmljZXMvcXVvdGF0aW9ucHJvdmlkZXIuanNcIiAvPlxuLy8gLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9zZXJ2aWNlcy9zeW1ib2xzZXJ2aWNlLmpzXCIgLz5cbi8vIC8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vc2VydmljZXMvcXVvdGF0aW9uc3RhdHVzcHJvdmlkZXIuanNcIiAvPlxudmFyIGF2YWxvbiA9IHJlcXVpcmUoJ2F2YWxvbicpO1xuXG52YXIgUmVkdXhBY3Rpb25EZWZpbmVkID0gcmVxdWlyZSgnLi9yZWR1eEFjdGlvbi5qcycpXG52YXIgcXVvdGF0aW9uUHJvdmlkZXIgPSBudWxsO1xuZnVuY3Rpb24gSW5pdCAodXJsLCBnbG9iYWxTdG9yZSwgcXVvdGF0aW9uU3RhdHVzVXJsKSB7XG4gIHZhciB2bSA9IGF2YWxvbi5kZWZpbmUoe1xuICAgICRpZDogJ3N5bWJvbExpc3QnLFxuICAgIHN5bWJvbHM6IHt9LFxuICAgIGFjdGl2ZUlkOiAwLFxuICAgIGFjdGl2ZTogZnVuY3Rpb24gKHN5bWJvbCkge1xuICAgICAgaWYgKHZtLmFjdGl2ZUlkKVxuICAgICAgICB2bS5zeW1ib2xzW3ZtLmFjdGl2ZUlkXS5hY3RpdmUgPSBmYWxzZVxuICAgICAgc3ltYm9sLmFjdGl2ZSA9IHRydWVcbiAgICAgIHZtLmFjdGl2ZUlkID0gc3ltYm9sLmluZm8uaWRcbiAgICAgIGdsb2JhbFN0b3JlLmRpc3BhdGNoKFJlZHV4QWN0aW9uRGVmaW5lZC5nZXRDaGFuZ2VTeW1ib2woc3ltYm9sKSlcbiAgICB9XG5cbiAgfSlcblxuICB2YXIgc2VydmljZXMgPSByZXF1aXJlKCcuLi9zZXJ2aWNlcy9zeW1ib2xzZXJ2aWNlJylcbiAgc2VydmljZXMubGlzdCgpXG4gICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciBzeW1ib2xzID0ge31cbiAgICAgIHZhciBkZWZTeW1Cb2xJZCA9IGZhbHNlXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc3ltYm9sc1tkYXRhW2ldLmluZm8uaWRdID0gZGF0YVtpXVxuICAgICAgICBkYXRhW2ldLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIGRhdGFbaV0uc2VxID0gMDsgLy8g6aKR546HXG4gICAgICAgIGRhdGFbaV0uYW1wID0gMDsgLy8g5bmF5bqmXG4gICAgICAgIGlmICghZGVmU3ltQm9sSWQpXG4gICAgICAgICAgZGVmU3ltQm9sSWQgPSBkYXRhW2ldLmluZm8uaWRcbiAgICAgIH1cbiAgICAgIHZtLnN5bWJvbHMgPSBzeW1ib2xzXG4gICAgICB2bS5hY3RpdmVJZCA9IGRlZlN5bUJvbElkXG4gICAgICB2bS5hY3RpdmUodm0uc3ltYm9sc1tkZWZTeW1Cb2xJZF0pXG4gICAgfSlcbiAgdmFyIFF1b3RhdGlvblByb3ZpZGVyID0gcmVxdWlyZSgnLi4vc2VydmljZXMvcXVvdGF0aW9uUHJvdmlkZXInKVxuICBxdW90YXRpb25Qcm92aWRlciA9IG5ldyBRdW90YXRpb25Qcm92aWRlcih1cmwpXG4gIHF1b3RhdGlvblByb3ZpZGVyLm9uUXVvdGF0aW9uID0gZnVuY3Rpb24gKHF1b3RhdGlvbikge1xuICAgIHZtLnN5bWJvbHNbcXVvdGF0aW9uLmlkXS5wcmljZSA9IHF1b3RhdGlvbi5iaWRcbiAgfVxuICBpZiAocXVvdGF0aW9uU3RhdHVzVXJsKSB7XG4gICAgdmFyIFF1b3RhdGlvblN0YXR1c1Byb3ZpZGVyID0gcmVxdWlyZSgnLi4vc2VydmljZXMvcXVvdGF0aW9uU3RhdHVzUHJvdmlkZXInKVxuICAgIHF1b3RhdGlvblByb3ZpZGVyID0gbmV3IFF1b3RhdGlvblN0YXR1c1Byb3ZpZGVyKHF1b3RhdGlvblN0YXR1c1VybClcbiAgICBxdW90YXRpb25Qcm92aWRlci5vblN0YXR1cyhmdW5jdGlvbiAoc3RhdHVzKSB7XG4gICAgICB2YXIgc3ltYm9sID0gdm0uc3ltYm9sc1tzdGF0dXMuaWRdXG4gICAgICBzeW1ib2wuc2VxID0gc3RhdHVzLnNlcVxuICAgICAgc3ltYm9sLmFtcCA9IHN0YXR1cy5hbXBcbiAgICB9KVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBDcmVhdGVDdHJsOiBJbml0LFxuICBTdGFydFF1b3RhdGlvblByb3ZpZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgcXVvdGF0aW9uUHJvdmlkZXIuY29ubmVjdCgpXG4gIH0sXG4gIFN0b3BRdW90YXRpb25Qcm92aWRkZXI6IGZ1bmN0aW9uICgpIHtcbiAgICBxdW90YXRpb25Qcm92aWRlci5kaXNjb25uZWN0KClcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9jdHJsL3N5bWJvbGN0cmwuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gUXVvdGF0aW9uUHJvdmlkZXIodXJsKSB7XHJcbiAgICB0aGlzLnVybCA9IHVybDtcclxuICAgIHRoaXMud3MgPSBudWxsO1xyXG59XHJcblF1b3RhdGlvblByb3ZpZGVyLnByb3RvdHlwZS5kaXNjb25uZWN0PWZ1bmN0aW9uKCl7XHJcbiAgICB0aGlzLndzLmNsb3NlKCk7XHJcbn07XHJcblF1b3RhdGlvblByb3ZpZGVyLnByb3RvdHlwZS5vblF1b3RhdGlvbj1mdW5jdGlvbihxdW90YXRpb24pe1xyXG4gIGNvbnNvbGUubG9nKFwicGxlYXNlIHNldCBvblF1b3RhdGlvbiB0byByZWNlaXZlIHF1b3RhdGlvbiBmcm9tIHNlcnZlcixxdW90YXRpb246XCIscXVvdGF0aW9uKTtcclxufTtcclxuXHJcblF1b3RhdGlvblByb3ZpZGVyLnByb3RvdHlwZS5jb25uZWN0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBzZWxmPXRoaXM7XHJcbiAgICB0aGlzLndzID0gbmV3IFdlYlNvY2tldCh0aGlzLnVybCk7XHJcbiAgICB0aGlzLndzLm9ub3BlbiA9IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6L+e5o6l5LiK5pyN5Yqh5ZmoXCIpO1xyXG4gICAgICAgIHNlbGYud3Muc2VuZChcInN0YXJ0XCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLndzLm9uY2xvc2UgPSBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICAgICAgaWYgKG1zZy5jb2RlICE9IDEwMDYpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihtc2cucmVhc29uKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpbml0KHVybCwgc3ltYm9scywgZnVuYyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoaXMud3Mub25tZXNzYWdlID0gZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgIHZhciBhcnkgPSBtc2cuZGF0YS5zcGxpdChcInxcIilbMV0uc3BsaXQoXCIsXCIpO1xyXG4gICAgICAgLyogdmFyIHN5bWJvbCA9IHN5bWJvbHNbcGFyc2VJbnQoYXJ5WzBdKV07XHJcbiAgICAgICAgc3ltYm9sLnByaWNlID0gcGFyc2VGbG9hdChhcnlbMV0pIC8gTWF0aC5wb3coMTAsIHN5bWJvbC5pbmZvLnNjYWxlKTsqL1xyXG4gICAgICAgIHNlbGYub25RdW90YXRpb24oe1xyXG4gICAgICAgICAgICBpZDpwYXJzZUludChhcnlbMF0pLFxyXG4gICAgICAgICAgICBiaWQ6cGFyc2VGbG9hdChhcnlbMV0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgdGhpcy53cy5vbmVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICB9O1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBRdW90YXRpb25Qcm92aWRlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL3NlcnZpY2VzL3F1b3RhdGlvblByb3ZpZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBRdW90YXRpb25TdGF0dXNQcm92aWRlcih1cmwpIHtcclxuICAgIHRoaXMudXJsID0gdXJsO1xyXG4gICAgdGhpcy53cyA9IG51bGw7XHJcblxyXG59XHJcblF1b3RhdGlvblN0YXR1c1Byb3ZpZGVyLnByb3RvdHlwZS5vblN0YXR1cyA9IGZ1bmN0aW9uIChzdGF0dXMpIHtcclxuICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZSBcIiwgc3RhdHVzKTtcclxufVxyXG5RdW90YXRpb25TdGF0dXNQcm92aWRlci5wcm90b3R5cGUuZGlzY29ubmVjdD1mdW5jdGlvbigpe1xyXG4gICAgdGhpcy53cy5jbG9zZSgpO1xyXG59XHJcblF1b3RhdGlvblN0YXR1c1Byb3ZpZGVyLnByb3RvdHlwZS5jb25uZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHdzID0gdGhpcy53cyA9IG5ldyBXZWJTb2NrZXQodXJsKTtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHdzLm9ub3BlbiA9IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6L+e5o6l5LiK5pyN5Yqh5ZmoXCIpO1xyXG4gICAgICAgIHdzLnNlbmQoXCJzdGFydFwiKTtcclxuICAgIH07XHJcblxyXG4gICAgd3Mub25jbG9zZSA9IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgICAgICBpZiAobXNnLmNvZGUgIT09IDEwMDYpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihtc2cucmVhc29uKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpbml0KHVybCwgc3ltYm9scywgZnVuYyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHdzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgICAgICB2YXIgYXJ5ID0gbXNnLmRhdGEuc3BsaXQoXCIsXCIpO1xyXG4gICAgICAgIHZhciBzeW1ib2wgPSB7XHJcblxyXG4gICAgICAgICAgICBpZDogc3ltYm9sc1twYXJzZUludChhcnlbMF0pXSxcclxuICAgICAgICAgICAgc2VxOiBhcnlbMV0sXHJcbiAgICAgICAgICAgIGFtcDogYXJ5WzJdLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHNlbGYub25TdGF0dXMoc3ltYm9sKTtcclxuXHJcblxyXG4gICAgfTtcclxuICAgIHdzLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgIH07XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUXVvdGF0aW9uU3RhdHVzUHJvdmlkZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9zZXJ2aWNlcy9xdW90YXRpb25TdGF0dXNQcm92aWRlci5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9zZXJ2aWNlcy9vcmRlcm5vdGlmeS5qc1wiIC8+XHJcbnZhciBBdmFsb24gPSByZXF1aXJlKCdhdmFsb24nKTtcclxuXHJcbnZhciBPcmRlck5vdGlmeSA9IHJlcXVpcmUoJy4uL3NlcnZpY2VzL29yZGVybm90aWZ5JykuT3JkZXJOb3RpZnk7XHJcblxyXG52YXIgb3JkZXJOb3RpZnk9bnVsbDtcclxuXHJcbnZhciBvcmRlcnNWTTtcclxuXHJcbmZ1bmN0aW9uIGluaXQgKHdzVXJsLGdsb2JhbFN0b3JlKSB7XHJcbiAgb3JkZXJOb3RpZnkgPSBuZXcgT3JkZXJOb3RpZnkod3NVcmwpXHJcblxyXG4gIG9yZGVyc1ZNID0gQXZhbG9uLmRlZmluZSh7XHJcbiAgICAkaWQ6ICdvcmRlckFkbWluQ3RybCcsXHJcbiAgICBvcmRlcnM6IFtdXHJcblxyXG4gIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cz17XHJcbiAgICBDcmVhdGVDdHJsOmluaXQsXHJcbiAgICBTdGFydDpmdW5jdGlvbigpe1xyXG4gICAgICBvcmRlck5vdGlmeS5jb25uZWN0KCk7XHJcbiAgICB9LFxyXG4gICAgQWRkOmZ1bmN0aW9uKG9yZGVyKSB7XHJcbiAgICAgICAgb3JkZXJzVk0ub3JkZXJzLnB1c2gob3JkZXIpO1xyXG4gICAgfSxcclxuICAgIFN0b3A6IGZ1bmN0aW9uICgpIHsgXHJcbiAgICAgIG9yZGVyTm90aWZ5LmRpc2Nvbm5lY3QoKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL2N0cmwvb3JkZXJBZG1pbkN0cmwuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNsYXNzIE9yZGVyRXZlbnQge1xuICAgIGV2ZW50OiBzdHJpbmdcbiAgICBvcmRlcjogYW55XG5cbn1cbmV4cG9ydCBjbGFzcyBPcmRlck5vdGlmeSB7XG4gICAgY29uc3RydWN0b3IodXJsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgfVxuXG4gICAgdXJsOiBzdHJpbmc7XG4gICAgd3M6IFdlYlNvY2tldDtcblxuICAgIG9uQ2xvc2Uob3JkZXI6IGFueSkge1xuICAgICAgICBjb25zb2xlLmxvZygnb25DbG9zZScsIG9yZGVyKTtcbiAgICB9XG5cblxuICAgIG9uT3BlbihvcmRlcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvbk9wZW4nLCBvcmRlcik7XG4gICAgfVxuXG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLndzID0gbmV3IFdlYlNvY2tldCh0aGlzLnVybCk7XG4gICAgICAgIHRoaXMud3Mub25vcGVuID0gbXNnID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIui/nuaOpeS4iuacjeWKoeWZqFwiKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLndzLm9ubWVzc2FnZSA9IG1zZyA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cuZGF0YSk7XG4gICAgICAgICAgICB2YXIgZXZlbnRPcmRlciA9IDxPcmRlckV2ZW50PkpTT04ucGFyc2UobXNnLmRhdGEpO1xuICAgICAgICAgICAgc3dpdGNoIChldmVudE9yZGVyLmV2ZW50KSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm9wZW5cIjpcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vbk9wZW4oZXZlbnRPcmRlci5vcmRlcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjbG9zZVwiOlxuICAgICAgICAgICAgICAgICAgICBzZWxmLm9uQ2xvc2UoZXZlbnRPcmRlci5vcmRlcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy53cy5jbG9zZSgpO1xuICAgIH1cblxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi90c2xpbnQtbG9hZGVyIS4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvc2VydmljZXMvb3JkZXJub3RpZnkudHMiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwicmVkdXhhY3Rpb24uanNcIiAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3NlcnZpY2VzL3VzZXJzZXJ2aWNlLmpzXCIgLz5cclxuXHJcbnZhciBVc2VycyA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy91c2Vyc2VydmljZS5qc1wiKTtcclxudmFyIEF2YWxvbiA9IHJlcXVpcmUoJ2F2YWxvbicpO1xyXG52YXIgQWNjb3VudFNlcnZpY2UgPSBuZXcgVXNlcnMuQWNjb3VudFNlcnZpY2UoKTtcclxudmFyIFJlZHV4QWN0aW9uID0gcmVxdWlyZShcIi4vcmVkdXhBY3Rpb24uanNcIik7XHJcbmZ1bmN0aW9uIGluaXQoZ2xvYmFsU3RvcmUpIHtcclxuICAgIFxyXG4gICAgdmFyIHZtID0gQXZhbG9uLmRlZmluZSh7XHJcbiAgICAgICAgJGlkOiBcImxvZ2luQ3RybFwiLFxyXG4gICAgICAgIHVzZXI6IHtcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IFwiXCIsXHJcbiAgICAgICAgICAgIGxvZ2luSWQ6IFwiXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgICAgICAgIGlzTG9naW46IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2dpbjogZnVuY3Rpb24gKGUpIHsgICAgICAgXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJsb2dpbi4uLi5cIik7XHJcbiAgICAgICAgICAgIEFjY291bnRTZXJ2aWNlLmxvZ2luKHZtLnVzZXIubG9naW5JZCwgdm0udXNlci5wYXNzd29yZClcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0udXNlci5wYXNzd29yZCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLnVzZXIuaXNMb2dpbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSBSZWR1eEFjdGlvbi5nZXRMb2dpbkFjdGlvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsU3RvcmUuZGlzcGF0Y2goYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChkYXRhLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHZtO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGluaXQ6IGluaXRcclxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL2N0cmwvbG9naW5jdHJsLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcclxudmFyIHdlYkFwaSA9IHJlcXVpcmUoXCIuLi93ZWJhcGlcIikuY3JlYXRlKFwiL2FwaS9hY2NvdW50c1wiKTtcclxuZnVuY3Rpb24gQWNjb3VudFNlcnZpY2UoKSB7XHJcblxyXG59XHJcbkFjY291bnRTZXJ2aWNlLnByb3RvdHlwZS5sb2dpbiA9IGZ1bmN0aW9uIChzdHJVc2VyLCBzdHJQd2QpIHtcclxuICAgIHJldHVybiB3ZWJBcGkuUG9zdCh7XHJcbiAgICAgICAgVXNlcjogc3RyVXNlcixcclxuICAgICAgICBQYXNzd29yZDogc3RyUHdkXHJcbiAgICB9KTtcclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBBY2NvdW50U2VydmljZTogQWNjb3VudFNlcnZpY2VcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9zZXJ2aWNlcy91c2Vyc2VydmljZS5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==