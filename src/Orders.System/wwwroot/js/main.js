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
	var Redux = __webpack_require__(5)
	var ReduxActionDefined = __webpack_require__(6);
	var globalState = {
	    currentSymbolId: 0
	};
	function CreateGlobalStore(inverstmentCtrl) {
	    //http://cn.redux.js.org/docs/introduction/ThreePrinciples.html
	    function globalReduce(state, action) {
	        if (typeof state === 'undefined') {
	            return globalState;
	        }
	        switch (action.type) {
	            case ReduxActionDefined.DEFINED.ChangeSymbol:
	                console.log('change to ', action.symbol);
	                inverstmentCtrl.setSymbol(action.symbol);
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
	
	    //品种面版，包含了报价
	    var symbolctrl = __webpack_require__(9);
	    symbolctrl.CreateCtrl("ws://localhost:5000/quote", symbolStore);
	  
	    //登录
	    var loginCtrl = __webpack_require__(11).init();
	  
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
	}

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
	};
	
	
	module.exports = {
	    create: function (url) {
	        return new WepApi(url);
	    }
	}


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

	var ACTION_DEFINED={
	    ChangeSymbol:"ChangeSymbol",
	
	}
	
	module.exports={
	    DEFINED:ACTION_DEFINED,
	    getChangeSymbol:function(symbol){
	        return {
	            type:ACTION_DEFINED.ChangeSymbol,
	            symbol:symbol
	        };
	    }
	}

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
	            console.log("up")
	            but(0);
	        },
	        down: function () {
	            console.log("down");
	            but(1);
	        }
	    });
	    function but(upOrDown) {
	
	        var postData = vm.openOrderInfo.$model;
	        postData.direction = upOrDown;
	        postData.clientTime = (new Date()).time;
	        debugger;
	        orderService.buy(postData)
	        .error(buyError);
	    }
	    function buyError(e) {
	        alert(e.responseText);
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
	        }
	    }
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var webApi = __webpack_require__(3).create("/api/orders");
	
	function buy(order) {
	    return webApi.Post(order);
	}
	
	module.exports = {
	    buy: buy
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../services/quotationprovider.js" />
	/// <reference path="../services/symbolservice.js" />
	var avalon = __webpack_require__(1);
	
	var ReduxActionDefined = __webpack_require__(6);
	
	function Init(wsQuoteUrl,globalStore) {
	
	    var vm = avalon.define({
	        $id: "symbolList",
	        symbols: {},
	        activeId:0,
	        active:function(symbol){
	            if(vm.activeId)
	                vm.symbols[vm.activeId].active=false;
	            symbol.active=true;
	            vm.activeId=symbol.info.id;
	            globalStore.dispatch(ReduxActionDefined.getChangeSymbol(symbol));
	        }
	     
	    });
	
	    var services = __webpack_require__(2);
	    services.list()
	        .done(function (data) {
	
	            var symbols = {};
	            var defSymBolId=false;
	            for (var i = 0; i < data.length; i++) {
	                symbols[data[i].info.id] = data[i];
	                data[i].active=false;
	                if(!defSymBolId)                
	                     defSymBolId=data[i].info.id;
	            }
	            vm.symbols = symbols;
	            vm.activeId=defSymBolId;
	          
	            InitQuotationProvider(vm,wsQuoteUrl);
	            vm.active(vm.symbols[defSymBolId]);
	            
	        });
	
	
	}
	
	function InitQuotationProvider(vm,wsQuoteUrl){
	   var quotationProvider = __webpack_require__(10);
	    quotationProvider.init(wsQuoteUrl, vm.symbols);
	}
	
	module.exports = {
	    CreateCtrl: Init
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	function init(url, symbols, func) {
	    var ws = new WebSocket(url);
	    ws.onopen = function(msg) {
	        console.log(msg);
	        console.log("连接上服务器");
	        ws.send("start");
	    };
	
	    ws.onclose = function(msg) {
	        if (msg.code != 1006) {
	            console.error(msg.reason);
	        } else {
	            init(url, symbols, func);
	        }
	    };
	    ws.onmessage = function(msg) {
	        var ary = msg.data.split("|")[1].split(",");
	        var symbol = symbols[parseInt(ary[0])];
	        symbol.price = parseFloat(ary[1]) / Math.pow(10, symbol.info.scale);
	    };
	    ws.onerror = function(error) {
	        console.error(error);
	    };
	}
	
	module.exports = {
	    init: init
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../services/userservice.js" />
	
	var Users = __webpack_require__(12);
	var Avalon = __webpack_require__(1);
	var AccountService = new Users.AccountService();
	
	function init() {
	
	
	    var vm = Avalon.define({
	        $id: "loginCtrl",
	        user: {
	            password: "",
	            loginId: "",
	            name: "",
	            isLogin: false
	        },
	        login: function (e) {
	            debugger;
	            e.preventDefault();
	            e.stopPropagation();
	            console.log("login....");
	            AccountService.login(vm.user.loginId, vm.user.password)
	                .done(function (data) {
	
	                    console.log(data);
	                    if (data.success) {
	                        vm.user.password = "";
	                        vm.user.isLogin = true;
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	
	var webApi = __webpack_require__(3).create("/api/accounts");
	function AccountService() {
	    this.login = function (strUser, strPwd) {
	        return webApi.Post({
	            User: strUser,
	            Password: strPwd
	        });
	    }
	}
	module.exports = {
	    AccountService: AccountService
	}


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzFkMTg0MDlhYWZjNGI3ZGE0YTgiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXZhbG9uXCIiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvc2VydmljZXMvc3ltYm9sc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvbW9kdWxlcy93ZWJhcGkuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwialF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vLy4vfi9yZWR1eC9kaXN0L3JlZHV4LmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL2N0cmwvcmVkdXhBY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvY3RybC9pbnZlc3RtZW50Q3RybC5qcyIsIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9zZXJ2aWNlcy9vcmRlcnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvY3RybC9zeW1ib2xjdHJsLmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL3NlcnZpY2VzL3F1b3RhdGlvblByb3ZpZGVyLmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL2N0cmwvbG9naW5jdHJsLmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL3NlcnZpY2VzL3VzZXJzZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsUTs7Ozs7O0FDNUNBLHlCOzs7Ozs7QUNBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDUEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0NBQXVDO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUEsNEJBQTJCLGNBQWMsZUFBZTs7QUFFeEQ7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbkVBLHlCOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0QscUNBQW9DO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVU7QUFD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VUFBUzs7O0FBR1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEc7Ozs7OztBQzNCQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7O0FBRUEsa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRzs7Ozs7OztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2pzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGMxZDE4NDA5YWFmYzRiN2RhNGE4IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIm1vZHVsZXMvY3RybC9sb2dpbmN0cmwuanNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwibW9kdWxlcy9zZXJ2aWNlcy9zeW1ib2xzZXJ2aWNlLmpzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIm1vZHVsZXMvY3RybC9zeW1ib2xjdHJsLmpzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWR1eC9kaXN0L3JlZHV4LmpzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwibW9kdWxlcy9jdHJsL3JlZHV4QWN0aW9uLmpzXCIvPlxyXG52YXIgYXZhbG9uID0gcmVxdWlyZSgnYXZhbG9uJyk7XHJcbnZhciBzeW1ib2xTZXJ2aWNlID0gcmVxdWlyZShcIi4vbW9kdWxlcy9zZXJ2aWNlcy9zeW1ib2xzZXJ2aWNlLmpzXCIpO1xyXG52YXIgUmVkdXggPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlZHV4L2Rpc3QvcmVkdXhcIilcclxudmFyIFJlZHV4QWN0aW9uRGVmaW5lZCA9IHJlcXVpcmUoXCIuL21vZHVsZXMvY3RybC9yZWR1eEFjdGlvbi5qc1wiKTtcclxudmFyIGdsb2JhbFN0YXRlID0ge1xyXG4gICAgY3VycmVudFN5bWJvbElkOiAwXHJcbn07XHJcbmZ1bmN0aW9uIENyZWF0ZUdsb2JhbFN0b3JlKGludmVyc3RtZW50Q3RybCkge1xyXG4gICAgLy9odHRwOi8vY24ucmVkdXguanMub3JnL2RvY3MvaW50cm9kdWN0aW9uL1RocmVlUHJpbmNpcGxlcy5odG1sXHJcbiAgICBmdW5jdGlvbiBnbG9iYWxSZWR1Y2Uoc3RhdGUsIGFjdGlvbikge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBnbG9iYWxTdGF0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFJlZHV4QWN0aW9uRGVmaW5lZC5ERUZJTkVELkNoYW5nZVN5bWJvbDpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2UgdG8gJywgYWN0aW9uLnN5bWJvbCk7XHJcbiAgICAgICAgICAgICAgICBpbnZlcnN0bWVudEN0cmwuc2V0U3ltYm9sKGFjdGlvbi5zeW1ib2wpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHZhciBzeW1ib2xTdG9yZSA9IFJlZHV4LmNyZWF0ZVN0b3JlKGdsb2JhbFJlZHVjZSk7XHJcbiAgICByZXR1cm4gc3ltYm9sU3RvcmU7XHJcbn1cclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuXHJcbiAgICAvL+WIneWni+WMlui0reS5sOmdoueJiFxyXG4gICAgdmFyIGludmVyc3RtZW50Q3RybCA9IHJlcXVpcmUoXCIuL21vZHVsZXMvY3RybC9pbnZlc3RtZW50Q3RybFwiKS5jcmVhdGVDdHJsKCk7XHJcbiAgICB2YXIgc3ltYm9sU3RvcmUgPSBDcmVhdGVHbG9iYWxTdG9yZShpbnZlcnN0bWVudEN0cmwpO1xyXG5cclxuICAgIC8v5ZOB56eN6Z2i54mI77yM5YyF5ZCr5LqG5oql5Lu3XHJcbiAgICB2YXIgc3ltYm9sY3RybCA9IHJlcXVpcmUoXCIuL21vZHVsZXMvY3RybC9zeW1ib2xjdHJsLmpzXCIpO1xyXG4gICAgc3ltYm9sY3RybC5DcmVhdGVDdHJsKFwid3M6Ly9sb2NhbGhvc3Q6NTAwMC9xdW90ZVwiLCBzeW1ib2xTdG9yZSk7XHJcbiAgXHJcbiAgICAvL+eZu+W9lVxyXG4gICAgdmFyIGxvZ2luQ3RybCA9IHJlcXVpcmUoXCIuL21vZHVsZXMvY3RybC9sb2dpbmN0cmwuanNcIikuaW5pdCgpO1xyXG4gIFxyXG59XHJcblxyXG5pbml0KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi93d3dyb290L19zcmMvanMvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGF2YWxvbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImF2YWxvblwiXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi93ZWJhcGkuanNcIiAvPlxyXG52YXIgd2ViQXBpPXJlcXVpcmUoXCIuLi93ZWJhcGlcIikuY3JlYXRlKFwiL2FwaS9zeW1ib2xzXCIpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBsaXN0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHdlYkFwaS5HZXQoKTtcclxuICAgIH1cclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvc2VydmljZXMvc3ltYm9sc2VydmljZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5cclxuZnVuY3Rpb24gV2VwQXBpKHVybCkge1xyXG4gICAgdGhpcy5vcHRzID0ge1xyXG4gICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIlxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLlB1dCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImRhdGFcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImZ1bmNcIj48L3BhcmFtPlxyXG5cclxuICAgICAgICB2YXIgb3B0cyA9IHRoaXMuZXh0LmNhbGwodGhpcywgXCJQVVRcIiwgZGF0YSk7XHJcblxyXG4gICAgICAgIHJldHVybiAkLmFqYXgob3B0cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuRGVsZXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZGF0YVwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZnVuY1wiPjwvcGFyYW0+XHJcbiAgICAgICAgdmFyIG9wdHMgPSB0aGlzLmV4dC5jYWxsKHRoaXMsIFwiREVMRVRFXCIsIGRhdGEpO1xyXG4gICAgICAgIGlmIChkYXRhLmlkKSB7XHJcbiAgICAgICAgICAgIG9wdHMudXJsICs9IFwiL1wiICsgZGF0YS5pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICQuYWpheChvcHRzKTtcclxuICAgIH07XHJcbiAgICB0aGlzLlBvc3QgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJkYXRhXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJmdW5jXCI+PC9wYXJhbT5cclxuICAgICAgICB2YXIgb3B0cyA9IHRoaXMuZXh0LmNhbGwodGhpcywgXCJQT1NUXCIsIGRhdGEpO1xyXG4gICAgICAgIHJldHVybiAkLmFqYXgob3B0cyk7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5HZXQgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJkYXRhXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJmdW5jXCI+PC9wYXJhbT5cclxuICAgICAgICB2YXIgb3B0cyA9IHRoaXMuZXh0LmNhbGwodGhpcywgXCJHRVRcIiwgZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuICQuYWpheChvcHRzKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMuZXh0ID0gZnVuY3Rpb24gKG1ldGhvZCwgZGF0YSkge1xyXG5cclxuICAgICAgICB2YXIgYSA9ICQuZXh0ZW5kKHt9LCB0aGlzLm9wdHMsIHsgdHlwZTogbWV0aG9kIH0pO1xyXG5cclxuICAgICAgICBhLmRhdGEgPSBtZXRob2QgIT09IFwiR0VUXCIgPyBKU09OLnN0cmluZ2lmeShkYXRhKSA6IGRhdGE7XHJcblxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfTtcclxufTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGNyZWF0ZTogZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgV2VwQXBpKHVybCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi93d3dyb290L19zcmMvanMvbW9kdWxlcy93ZWJhcGkuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBqUXVlcnk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJqUXVlcnlcIlxuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJSZWR1eFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJSZWR1eFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9LFxuLyoqKioqKi8gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bG9hZGVkOiBmYWxzZVxuLyoqKioqKi8gXHRcdH07XG5cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG5cblxuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblx0ZXhwb3J0cy5jb21wb3NlID0gZXhwb3J0cy5hcHBseU1pZGRsZXdhcmUgPSBleHBvcnRzLmJpbmRBY3Rpb25DcmVhdG9ycyA9IGV4cG9ydHMuY29tYmluZVJlZHVjZXJzID0gZXhwb3J0cy5jcmVhdGVTdG9yZSA9IHVuZGVmaW5lZDtcblxuXHR2YXIgX2NyZWF0ZVN0b3JlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxuXHR2YXIgX2NyZWF0ZVN0b3JlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZVN0b3JlKTtcblxuXHR2YXIgX2NvbWJpbmVSZWR1Y2VycyA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XG5cblx0dmFyIF9jb21iaW5lUmVkdWNlcnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tYmluZVJlZHVjZXJzKTtcblxuXHR2YXIgX2JpbmRBY3Rpb25DcmVhdG9ycyA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XG5cblx0dmFyIF9iaW5kQWN0aW9uQ3JlYXRvcnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYmluZEFjdGlvbkNyZWF0b3JzKTtcblxuXHR2YXIgX2FwcGx5TWlkZGxld2FyZSA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cblx0dmFyIF9hcHBseU1pZGRsZXdhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXBwbHlNaWRkbGV3YXJlKTtcblxuXHR2YXIgX2NvbXBvc2UgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG5cdHZhciBfY29tcG9zZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb21wb3NlKTtcblxuXHR2YXIgX3dhcm5pbmcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG5cdHZhciBfd2FybmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93YXJuaW5nKTtcblxuXHRmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cblx0Lypcblx0KiBUaGlzIGlzIGEgZHVtbXkgZnVuY3Rpb24gdG8gY2hlY2sgaWYgdGhlIGZ1bmN0aW9uIG5hbWUgaGFzIGJlZW4gYWx0ZXJlZCBieSBtaW5pZmljYXRpb24uXG5cdCogSWYgdGhlIGZ1bmN0aW9uIGhhcyBiZWVuIG1pbmlmaWVkIGFuZCBOT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLCB3YXJuIHRoZSB1c2VyLlxuXHQqL1xuXHRmdW5jdGlvbiBpc0NydXNoZWQoKSB7fVxuXG5cdGlmICgoXCJkZXZlbG9wbWVudFwiKSAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBpc0NydXNoZWQubmFtZSA9PT0gJ3N0cmluZycgJiYgaXNDcnVzaGVkLm5hbWUgIT09ICdpc0NydXNoZWQnKSB7XG5cdCAgKDAsIF93YXJuaW5nMlsnZGVmYXVsdCddKSgnWW91IGFyZSBjdXJyZW50bHkgdXNpbmcgbWluaWZpZWQgY29kZSBvdXRzaWRlIG9mIE5PREVfRU5WID09PSBcXCdwcm9kdWN0aW9uXFwnLiAnICsgJ1RoaXMgbWVhbnMgdGhhdCB5b3UgYXJlIHJ1bm5pbmcgYSBzbG93ZXIgZGV2ZWxvcG1lbnQgYnVpbGQgb2YgUmVkdXguICcgKyAnWW91IGNhbiB1c2UgbG9vc2UtZW52aWZ5IChodHRwczovL2dpdGh1Yi5jb20vemVydG9zaC9sb29zZS1lbnZpZnkpIGZvciBicm93c2VyaWZ5ICcgKyAnb3IgRGVmaW5lUGx1Z2luIGZvciB3ZWJwYWNrIChodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMwMDMwMDMxKSAnICsgJ3RvIGVuc3VyZSB5b3UgaGF2ZSB0aGUgY29ycmVjdCBjb2RlIGZvciB5b3VyIHByb2R1Y3Rpb24gYnVpbGQuJyk7XG5cdH1cblxuXHRleHBvcnRzLmNyZWF0ZVN0b3JlID0gX2NyZWF0ZVN0b3JlMlsnZGVmYXVsdCddO1xuXHRleHBvcnRzLmNvbWJpbmVSZWR1Y2VycyA9IF9jb21iaW5lUmVkdWNlcnMyWydkZWZhdWx0J107XG5cdGV4cG9ydHMuYmluZEFjdGlvbkNyZWF0b3JzID0gX2JpbmRBY3Rpb25DcmVhdG9yczJbJ2RlZmF1bHQnXTtcblx0ZXhwb3J0cy5hcHBseU1pZGRsZXdhcmUgPSBfYXBwbHlNaWRkbGV3YXJlMlsnZGVmYXVsdCddO1xuXHRleHBvcnRzLmNvbXBvc2UgPSBfY29tcG9zZTJbJ2RlZmF1bHQnXTtcblxuLyoqKi8gfSxcbi8qIDEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cdGV4cG9ydHNbXCJkZWZhdWx0XCJdID0gY29tcG9zZTtcblx0LyoqXG5cdCAqIENvbXBvc2VzIHNpbmdsZS1hcmd1bWVudCBmdW5jdGlvbnMgZnJvbSByaWdodCB0byBsZWZ0LiBUaGUgcmlnaHRtb3N0XG5cdCAqIGZ1bmN0aW9uIGNhbiB0YWtlIG11bHRpcGxlIGFyZ3VtZW50cyBhcyBpdCBwcm92aWRlcyB0aGUgc2lnbmF0dXJlIGZvclxuXHQgKiB0aGUgcmVzdWx0aW5nIGNvbXBvc2l0ZSBmdW5jdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gZnVuY3MgVGhlIGZ1bmN0aW9ucyB0byBjb21wb3NlLlxuXHQgKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZnVuY3Rpb24gb2J0YWluZWQgYnkgY29tcG9zaW5nIHRoZSBhcmd1bWVudCBmdW5jdGlvbnNcblx0ICogZnJvbSByaWdodCB0byBsZWZ0LiBGb3IgZXhhbXBsZSwgY29tcG9zZShmLCBnLCBoKSBpcyBpZGVudGljYWwgdG8gZG9pbmdcblx0ICogKC4uLmFyZ3MpID0+IGYoZyhoKC4uLmFyZ3MpKSkuXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGNvbXBvc2UoKSB7XG5cdCAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGZ1bmNzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG5cdCAgICBmdW5jc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcblx0ICB9XG5cblx0ICBpZiAoZnVuY3MubGVuZ3RoID09PSAwKSB7XG5cdCAgICByZXR1cm4gZnVuY3Rpb24gKGFyZykge1xuXHQgICAgICByZXR1cm4gYXJnO1xuXHQgICAgfTtcblx0ICB9XG5cblx0ICBpZiAoZnVuY3MubGVuZ3RoID09PSAxKSB7XG5cdCAgICByZXR1cm4gZnVuY3NbMF07XG5cdCAgfVxuXG5cdCAgdmFyIGxhc3QgPSBmdW5jc1tmdW5jcy5sZW5ndGggLSAxXTtcblx0ICB2YXIgcmVzdCA9IGZ1bmNzLnNsaWNlKDAsIC0xKTtcblx0ICByZXR1cm4gZnVuY3Rpb24gKCkge1xuXHQgICAgcmV0dXJuIHJlc3QucmVkdWNlUmlnaHQoZnVuY3Rpb24gKGNvbXBvc2VkLCBmKSB7XG5cdCAgICAgIHJldHVybiBmKGNvbXBvc2VkKTtcblx0ICAgIH0sIGxhc3QuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpKTtcblx0ICB9O1xuXHR9XG5cbi8qKiovIH0sXG4vKiAyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblx0ZXhwb3J0cy5BY3Rpb25UeXBlcyA9IHVuZGVmaW5lZDtcblx0ZXhwb3J0c1snZGVmYXVsdCddID0gY3JlYXRlU3RvcmU7XG5cblx0dmFyIF9pc1BsYWluT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblxuXHR2YXIgX2lzUGxhaW5PYmplY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNQbGFpbk9iamVjdCk7XG5cblx0dmFyIF9zeW1ib2xPYnNlcnZhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMik7XG5cblx0dmFyIF9zeW1ib2xPYnNlcnZhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N5bWJvbE9ic2VydmFibGUpO1xuXG5cdGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuXHQvKipcblx0ICogVGhlc2UgYXJlIHByaXZhdGUgYWN0aW9uIHR5cGVzIHJlc2VydmVkIGJ5IFJlZHV4LlxuXHQgKiBGb3IgYW55IHVua25vd24gYWN0aW9ucywgeW91IG11c3QgcmV0dXJuIHRoZSBjdXJyZW50IHN0YXRlLlxuXHQgKiBJZiB0aGUgY3VycmVudCBzdGF0ZSBpcyB1bmRlZmluZWQsIHlvdSBtdXN0IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZS5cblx0ICogRG8gbm90IHJlZmVyZW5jZSB0aGVzZSBhY3Rpb24gdHlwZXMgZGlyZWN0bHkgaW4geW91ciBjb2RlLlxuXHQgKi9cblx0dmFyIEFjdGlvblR5cGVzID0gZXhwb3J0cy5BY3Rpb25UeXBlcyA9IHtcblx0ICBJTklUOiAnQEByZWR1eC9JTklUJ1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgUmVkdXggc3RvcmUgdGhhdCBob2xkcyB0aGUgc3RhdGUgdHJlZS5cblx0ICogVGhlIG9ubHkgd2F5IHRvIGNoYW5nZSB0aGUgZGF0YSBpbiB0aGUgc3RvcmUgaXMgdG8gY2FsbCBgZGlzcGF0Y2goKWAgb24gaXQuXG5cdCAqXG5cdCAqIFRoZXJlIHNob3VsZCBvbmx5IGJlIGEgc2luZ2xlIHN0b3JlIGluIHlvdXIgYXBwLiBUbyBzcGVjaWZ5IGhvdyBkaWZmZXJlbnRcblx0ICogcGFydHMgb2YgdGhlIHN0YXRlIHRyZWUgcmVzcG9uZCB0byBhY3Rpb25zLCB5b3UgbWF5IGNvbWJpbmUgc2V2ZXJhbCByZWR1Y2Vyc1xuXHQgKiBpbnRvIGEgc2luZ2xlIHJlZHVjZXIgZnVuY3Rpb24gYnkgdXNpbmcgYGNvbWJpbmVSZWR1Y2Vyc2AuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IHJlZHVjZXIgQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG5leHQgc3RhdGUgdHJlZSwgZ2l2ZW5cblx0ICogdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBhbmQgdGhlIGFjdGlvbiB0byBoYW5kbGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7YW55fSBbcHJlbG9hZGVkU3RhdGVdIFRoZSBpbml0aWFsIHN0YXRlLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuXHQgKiB0byBoeWRyYXRlIHRoZSBzdGF0ZSBmcm9tIHRoZSBzZXJ2ZXIgaW4gdW5pdmVyc2FsIGFwcHMsIG9yIHRvIHJlc3RvcmUgYVxuXHQgKiBwcmV2aW91c2x5IHNlcmlhbGl6ZWQgdXNlciBzZXNzaW9uLlxuXHQgKiBJZiB5b3UgdXNlIGBjb21iaW5lUmVkdWNlcnNgIHRvIHByb2R1Y2UgdGhlIHJvb3QgcmVkdWNlciBmdW5jdGlvbiwgdGhpcyBtdXN0IGJlXG5cdCAqIGFuIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlIGFzIGBjb21iaW5lUmVkdWNlcnNgIGtleXMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGVuaGFuY2VyIFRoZSBzdG9yZSBlbmhhbmNlci4gWW91IG1heSBvcHRpb25hbGx5IHNwZWNpZnkgaXRcblx0ICogdG8gZW5oYW5jZSB0aGUgc3RvcmUgd2l0aCB0aGlyZC1wYXJ0eSBjYXBhYmlsaXRpZXMgc3VjaCBhcyBtaWRkbGV3YXJlLFxuXHQgKiB0aW1lIHRyYXZlbCwgcGVyc2lzdGVuY2UsIGV0Yy4gVGhlIG9ubHkgc3RvcmUgZW5oYW5jZXIgdGhhdCBzaGlwcyB3aXRoIFJlZHV4XG5cdCAqIGlzIGBhcHBseU1pZGRsZXdhcmUoKWAuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtTdG9yZX0gQSBSZWR1eCBzdG9yZSB0aGF0IGxldHMgeW91IHJlYWQgdGhlIHN0YXRlLCBkaXNwYXRjaCBhY3Rpb25zXG5cdCAqIGFuZCBzdWJzY3JpYmUgdG8gY2hhbmdlcy5cblx0ICovXG5cdGZ1bmN0aW9uIGNyZWF0ZVN0b3JlKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlLCBlbmhhbmNlcikge1xuXHQgIHZhciBfcmVmMjtcblxuXHQgIGlmICh0eXBlb2YgcHJlbG9hZGVkU3RhdGUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGVuaGFuY2VyID09PSAndW5kZWZpbmVkJykge1xuXHQgICAgZW5oYW5jZXIgPSBwcmVsb2FkZWRTdGF0ZTtcblx0ICAgIHByZWxvYWRlZFN0YXRlID0gdW5kZWZpbmVkO1xuXHQgIH1cblxuXHQgIGlmICh0eXBlb2YgZW5oYW5jZXIgIT09ICd1bmRlZmluZWQnKSB7XG5cdCAgICBpZiAodHlwZW9mIGVuaGFuY2VyICE9PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIGVuaGFuY2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiBlbmhhbmNlcihjcmVhdGVTdG9yZSkocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUpO1xuXHQgIH1cblxuXHQgIGlmICh0eXBlb2YgcmVkdWNlciAhPT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgcmVkdWNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuXHQgIH1cblxuXHQgIHZhciBjdXJyZW50UmVkdWNlciA9IHJlZHVjZXI7XG5cdCAgdmFyIGN1cnJlbnRTdGF0ZSA9IHByZWxvYWRlZFN0YXRlO1xuXHQgIHZhciBjdXJyZW50TGlzdGVuZXJzID0gW107XG5cdCAgdmFyIG5leHRMaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzO1xuXHQgIHZhciBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG5cblx0ICBmdW5jdGlvbiBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCkge1xuXHQgICAgaWYgKG5leHRMaXN0ZW5lcnMgPT09IGN1cnJlbnRMaXN0ZW5lcnMpIHtcblx0ICAgICAgbmV4dExpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnMuc2xpY2UoKTtcblx0ICAgIH1cblx0ICB9XG5cblx0ICAvKipcblx0ICAgKiBSZWFkcyB0aGUgc3RhdGUgdHJlZSBtYW5hZ2VkIGJ5IHRoZSBzdG9yZS5cblx0ICAgKlxuXHQgICAqIEByZXR1cm5zIHthbnl9IFRoZSBjdXJyZW50IHN0YXRlIHRyZWUgb2YgeW91ciBhcHBsaWNhdGlvbi5cblx0ICAgKi9cblx0ICBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcblx0ICAgIHJldHVybiBjdXJyZW50U3RhdGU7XG5cdCAgfVxuXG5cdCAgLyoqXG5cdCAgICogQWRkcyBhIGNoYW5nZSBsaXN0ZW5lci4gSXQgd2lsbCBiZSBjYWxsZWQgYW55IHRpbWUgYW4gYWN0aW9uIGlzIGRpc3BhdGNoZWQsXG5cdCAgICogYW5kIHNvbWUgcGFydCBvZiB0aGUgc3RhdGUgdHJlZSBtYXkgcG90ZW50aWFsbHkgaGF2ZSBjaGFuZ2VkLiBZb3UgbWF5IHRoZW5cblx0ICAgKiBjYWxsIGBnZXRTdGF0ZSgpYCB0byByZWFkIHRoZSBjdXJyZW50IHN0YXRlIHRyZWUgaW5zaWRlIHRoZSBjYWxsYmFjay5cblx0ICAgKlxuXHQgICAqIFlvdSBtYXkgY2FsbCBgZGlzcGF0Y2goKWAgZnJvbSBhIGNoYW5nZSBsaXN0ZW5lciwgd2l0aCB0aGUgZm9sbG93aW5nXG5cdCAgICogY2F2ZWF0czpcblx0ICAgKlxuXHQgICAqIDEuIFRoZSBzdWJzY3JpcHRpb25zIGFyZSBzbmFwc2hvdHRlZCBqdXN0IGJlZm9yZSBldmVyeSBgZGlzcGF0Y2goKWAgY2FsbC5cblx0ICAgKiBJZiB5b3Ugc3Vic2NyaWJlIG9yIHVuc3Vic2NyaWJlIHdoaWxlIHRoZSBsaXN0ZW5lcnMgYXJlIGJlaW5nIGludm9rZWQsIHRoaXNcblx0ICAgKiB3aWxsIG5vdCBoYXZlIGFueSBlZmZlY3Qgb24gdGhlIGBkaXNwYXRjaCgpYCB0aGF0IGlzIGN1cnJlbnRseSBpbiBwcm9ncmVzcy5cblx0ICAgKiBIb3dldmVyLCB0aGUgbmV4dCBgZGlzcGF0Y2goKWAgY2FsbCwgd2hldGhlciBuZXN0ZWQgb3Igbm90LCB3aWxsIHVzZSBhIG1vcmVcblx0ICAgKiByZWNlbnQgc25hcHNob3Qgb2YgdGhlIHN1YnNjcmlwdGlvbiBsaXN0LlxuXHQgICAqXG5cdCAgICogMi4gVGhlIGxpc3RlbmVyIHNob3VsZCBub3QgZXhwZWN0IHRvIHNlZSBhbGwgc3RhdGUgY2hhbmdlcywgYXMgdGhlIHN0YXRlXG5cdCAgICogbWlnaHQgaGF2ZSBiZWVuIHVwZGF0ZWQgbXVsdGlwbGUgdGltZXMgZHVyaW5nIGEgbmVzdGVkIGBkaXNwYXRjaCgpYCBiZWZvcmVcblx0ICAgKiB0aGUgbGlzdGVuZXIgaXMgY2FsbGVkLiBJdCBpcywgaG93ZXZlciwgZ3VhcmFudGVlZCB0aGF0IGFsbCBzdWJzY3JpYmVyc1xuXHQgICAqIHJlZ2lzdGVyZWQgYmVmb3JlIHRoZSBgZGlzcGF0Y2goKWAgc3RhcnRlZCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBsYXRlc3Rcblx0ICAgKiBzdGF0ZSBieSB0aGUgdGltZSBpdCBleGl0cy5cblx0ICAgKlxuXHQgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIEEgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCBvbiBldmVyeSBkaXNwYXRjaC5cblx0ICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdG8gcmVtb3ZlIHRoaXMgY2hhbmdlIGxpc3RlbmVyLlxuXHQgICAqL1xuXHQgIGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuXHQgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGxpc3RlbmVyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG5cdCAgICB9XG5cblx0ICAgIHZhciBpc1N1YnNjcmliZWQgPSB0cnVlO1xuXG5cdCAgICBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCk7XG5cdCAgICBuZXh0TGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuXG5cdCAgICByZXR1cm4gZnVuY3Rpb24gdW5zdWJzY3JpYmUoKSB7XG5cdCAgICAgIGlmICghaXNTdWJzY3JpYmVkKSB7XG5cdCAgICAgICAgcmV0dXJuO1xuXHQgICAgICB9XG5cblx0ICAgICAgaXNTdWJzY3JpYmVkID0gZmFsc2U7XG5cblx0ICAgICAgZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpO1xuXHQgICAgICB2YXIgaW5kZXggPSBuZXh0TGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuXHQgICAgICBuZXh0TGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG5cdCAgICB9O1xuXHQgIH1cblxuXHQgIC8qKlxuXHQgICAqIERpc3BhdGNoZXMgYW4gYWN0aW9uLiBJdCBpcyB0aGUgb25seSB3YXkgdG8gdHJpZ2dlciBhIHN0YXRlIGNoYW5nZS5cblx0ICAgKlxuXHQgICAqIFRoZSBgcmVkdWNlcmAgZnVuY3Rpb24sIHVzZWQgdG8gY3JlYXRlIHRoZSBzdG9yZSwgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGVcblx0ICAgKiBjdXJyZW50IHN0YXRlIHRyZWUgYW5kIHRoZSBnaXZlbiBgYWN0aW9uYC4gSXRzIHJldHVybiB2YWx1ZSB3aWxsXG5cdCAgICogYmUgY29uc2lkZXJlZCB0aGUgKipuZXh0Kiogc3RhdGUgb2YgdGhlIHRyZWUsIGFuZCB0aGUgY2hhbmdlIGxpc3RlbmVyc1xuXHQgICAqIHdpbGwgYmUgbm90aWZpZWQuXG5cdCAgICpcblx0ICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvbmx5IHN1cHBvcnRzIHBsYWluIG9iamVjdCBhY3Rpb25zLiBJZiB5b3Ugd2FudCB0b1xuXHQgICAqIGRpc3BhdGNoIGEgUHJvbWlzZSwgYW4gT2JzZXJ2YWJsZSwgYSB0aHVuaywgb3Igc29tZXRoaW5nIGVsc2UsIHlvdSBuZWVkIHRvXG5cdCAgICogd3JhcCB5b3VyIHN0b3JlIGNyZWF0aW5nIGZ1bmN0aW9uIGludG8gdGhlIGNvcnJlc3BvbmRpbmcgbWlkZGxld2FyZS4gRm9yXG5cdCAgICogZXhhbXBsZSwgc2VlIHRoZSBkb2N1bWVudGF0aW9uIGZvciB0aGUgYHJlZHV4LXRodW5rYCBwYWNrYWdlLiBFdmVuIHRoZVxuXHQgICAqIG1pZGRsZXdhcmUgd2lsbCBldmVudHVhbGx5IGRpc3BhdGNoIHBsYWluIG9iamVjdCBhY3Rpb25zIHVzaW5nIHRoaXMgbWV0aG9kLlxuXHQgICAqXG5cdCAgICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiBBIHBsYWluIG9iamVjdCByZXByZXNlbnRpbmcg4oCcd2hhdCBjaGFuZ2Vk4oCdLiBJdCBpc1xuXHQgICAqIGEgZ29vZCBpZGVhIHRvIGtlZXAgYWN0aW9ucyBzZXJpYWxpemFibGUgc28geW91IGNhbiByZWNvcmQgYW5kIHJlcGxheSB1c2VyXG5cdCAgICogc2Vzc2lvbnMsIG9yIHVzZSB0aGUgdGltZSB0cmF2ZWxsaW5nIGByZWR1eC1kZXZ0b29sc2AuIEFuIGFjdGlvbiBtdXN0IGhhdmVcblx0ICAgKiBhIGB0eXBlYCBwcm9wZXJ0eSB3aGljaCBtYXkgbm90IGJlIGB1bmRlZmluZWRgLiBJdCBpcyBhIGdvb2QgaWRlYSB0byB1c2Vcblx0ICAgKiBzdHJpbmcgY29uc3RhbnRzIGZvciBhY3Rpb24gdHlwZXMuXG5cdCAgICpcblx0ICAgKiBAcmV0dXJucyB7T2JqZWN0fSBGb3IgY29udmVuaWVuY2UsIHRoZSBzYW1lIGFjdGlvbiBvYmplY3QgeW91IGRpc3BhdGNoZWQuXG5cdCAgICpcblx0ICAgKiBOb3RlIHRoYXQsIGlmIHlvdSB1c2UgYSBjdXN0b20gbWlkZGxld2FyZSwgaXQgbWF5IHdyYXAgYGRpc3BhdGNoKClgIHRvXG5cdCAgICogcmV0dXJuIHNvbWV0aGluZyBlbHNlIChmb3IgZXhhbXBsZSwgYSBQcm9taXNlIHlvdSBjYW4gYXdhaXQpLlxuXHQgICAqL1xuXHQgIGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuXHQgICAgaWYgKCEoMCwgX2lzUGxhaW5PYmplY3QyWydkZWZhdWx0J10pKGFjdGlvbikpIHtcblx0ICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3Rpb25zIG11c3QgYmUgcGxhaW4gb2JqZWN0cy4gJyArICdVc2UgY3VzdG9tIG1pZGRsZXdhcmUgZm9yIGFzeW5jIGFjdGlvbnMuJyk7XG5cdCAgICB9XG5cblx0ICAgIGlmICh0eXBlb2YgYWN0aW9uLnR5cGUgPT09ICd1bmRlZmluZWQnKSB7XG5cdCAgICAgIHRocm93IG5ldyBFcnJvcignQWN0aW9ucyBtYXkgbm90IGhhdmUgYW4gdW5kZWZpbmVkIFwidHlwZVwiIHByb3BlcnR5LiAnICsgJ0hhdmUgeW91IG1pc3NwZWxsZWQgYSBjb25zdGFudD8nKTtcblx0ICAgIH1cblxuXHQgICAgaWYgKGlzRGlzcGF0Y2hpbmcpIHtcblx0ICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VycyBtYXkgbm90IGRpc3BhdGNoIGFjdGlvbnMuJyk7XG5cdCAgICB9XG5cblx0ICAgIHRyeSB7XG5cdCAgICAgIGlzRGlzcGF0Y2hpbmcgPSB0cnVlO1xuXHQgICAgICBjdXJyZW50U3RhdGUgPSBjdXJyZW50UmVkdWNlcihjdXJyZW50U3RhdGUsIGFjdGlvbik7XG5cdCAgICB9IGZpbmFsbHkge1xuXHQgICAgICBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG5cdCAgICB9XG5cblx0ICAgIHZhciBsaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzID0gbmV4dExpc3RlbmVycztcblx0ICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgIGxpc3RlbmVyc1tpXSgpO1xuXHQgICAgfVxuXG5cdCAgICByZXR1cm4gYWN0aW9uO1xuXHQgIH1cblxuXHQgIC8qKlxuXHQgICAqIFJlcGxhY2VzIHRoZSByZWR1Y2VyIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBzdG9yZSB0byBjYWxjdWxhdGUgdGhlIHN0YXRlLlxuXHQgICAqXG5cdCAgICogWW91IG1pZ2h0IG5lZWQgdGhpcyBpZiB5b3VyIGFwcCBpbXBsZW1lbnRzIGNvZGUgc3BsaXR0aW5nIGFuZCB5b3Ugd2FudCB0b1xuXHQgICAqIGxvYWQgc29tZSBvZiB0aGUgcmVkdWNlcnMgZHluYW1pY2FsbHkuIFlvdSBtaWdodCBhbHNvIG5lZWQgdGhpcyBpZiB5b3Vcblx0ICAgKiBpbXBsZW1lbnQgYSBob3QgcmVsb2FkaW5nIG1lY2hhbmlzbSBmb3IgUmVkdXguXG5cdCAgICpcblx0ICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXh0UmVkdWNlciBUaGUgcmVkdWNlciBmb3IgdGhlIHN0b3JlIHRvIHVzZSBpbnN0ZWFkLlxuXHQgICAqIEByZXR1cm5zIHt2b2lkfVxuXHQgICAqL1xuXHQgIGZ1bmN0aW9uIHJlcGxhY2VSZWR1Y2VyKG5leHRSZWR1Y2VyKSB7XG5cdCAgICBpZiAodHlwZW9mIG5leHRSZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIG5leHRSZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG5cdCAgICB9XG5cblx0ICAgIGN1cnJlbnRSZWR1Y2VyID0gbmV4dFJlZHVjZXI7XG5cdCAgICBkaXNwYXRjaCh7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG5cdCAgfVxuXG5cdCAgLyoqXG5cdCAgICogSW50ZXJvcGVyYWJpbGl0eSBwb2ludCBmb3Igb2JzZXJ2YWJsZS9yZWFjdGl2ZSBsaWJyYXJpZXMuXG5cdCAgICogQHJldHVybnMge29ic2VydmFibGV9IEEgbWluaW1hbCBvYnNlcnZhYmxlIG9mIHN0YXRlIGNoYW5nZXMuXG5cdCAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZSB0aGUgb2JzZXJ2YWJsZSBwcm9wb3NhbDpcblx0ICAgKiBodHRwczovL2dpdGh1Yi5jb20vemVucGFyc2luZy9lcy1vYnNlcnZhYmxlXG5cdCAgICovXG5cdCAgZnVuY3Rpb24gb2JzZXJ2YWJsZSgpIHtcblx0ICAgIHZhciBfcmVmO1xuXG5cdCAgICB2YXIgb3V0ZXJTdWJzY3JpYmUgPSBzdWJzY3JpYmU7XG5cdCAgICByZXR1cm4gX3JlZiA9IHtcblx0ICAgICAgLyoqXG5cdCAgICAgICAqIFRoZSBtaW5pbWFsIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uIG1ldGhvZC5cblx0ICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9ic2VydmVyIEFueSBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCBhcyBhbiBvYnNlcnZlci5cblx0ICAgICAgICogVGhlIG9ic2VydmVyIG9iamVjdCBzaG91bGQgaGF2ZSBhIGBuZXh0YCBtZXRob2QuXG5cdCAgICAgICAqIEByZXR1cm5zIHtzdWJzY3JpcHRpb259IEFuIG9iamVjdCB3aXRoIGFuIGB1bnN1YnNjcmliZWAgbWV0aG9kIHRoYXQgY2FuXG5cdCAgICAgICAqIGJlIHVzZWQgdG8gdW5zdWJzY3JpYmUgdGhlIG9ic2VydmFibGUgZnJvbSB0aGUgc3RvcmUsIGFuZCBwcmV2ZW50IGZ1cnRoZXJcblx0ICAgICAgICogZW1pc3Npb24gb2YgdmFsdWVzIGZyb20gdGhlIG9ic2VydmFibGUuXG5cdCAgICAgICAqL1xuXHQgICAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIHN1YnNjcmliZShvYnNlcnZlcikge1xuXHQgICAgICAgIGlmICh0eXBlb2Ygb2JzZXJ2ZXIgIT09ICdvYmplY3QnKSB7XG5cdCAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCB0aGUgb2JzZXJ2ZXIgdG8gYmUgYW4gb2JqZWN0LicpO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGZ1bmN0aW9uIG9ic2VydmVTdGF0ZSgpIHtcblx0ICAgICAgICAgIGlmIChvYnNlcnZlci5uZXh0KSB7XG5cdCAgICAgICAgICAgIG9ic2VydmVyLm5leHQoZ2V0U3RhdGUoKSk7XG5cdCAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgb2JzZXJ2ZVN0YXRlKCk7XG5cdCAgICAgICAgdmFyIHVuc3Vic2NyaWJlID0gb3V0ZXJTdWJzY3JpYmUob2JzZXJ2ZVN0YXRlKTtcblx0ICAgICAgICByZXR1cm4geyB1bnN1YnNjcmliZTogdW5zdWJzY3JpYmUgfTtcblx0ICAgICAgfVxuXHQgICAgfSwgX3JlZltfc3ltYm9sT2JzZXJ2YWJsZTJbJ2RlZmF1bHQnXV0gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIHJldHVybiB0aGlzO1xuXHQgICAgfSwgX3JlZjtcblx0ICB9XG5cblx0ICAvLyBXaGVuIGEgc3RvcmUgaXMgY3JlYXRlZCwgYW4gXCJJTklUXCIgYWN0aW9uIGlzIGRpc3BhdGNoZWQgc28gdGhhdCBldmVyeVxuXHQgIC8vIHJlZHVjZXIgcmV0dXJucyB0aGVpciBpbml0aWFsIHN0YXRlLiBUaGlzIGVmZmVjdGl2ZWx5IHBvcHVsYXRlc1xuXHQgIC8vIHRoZSBpbml0aWFsIHN0YXRlIHRyZWUuXG5cdCAgZGlzcGF0Y2goeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuXG5cdCAgcmV0dXJuIF9yZWYyID0ge1xuXHQgICAgZGlzcGF0Y2g6IGRpc3BhdGNoLFxuXHQgICAgc3Vic2NyaWJlOiBzdWJzY3JpYmUsXG5cdCAgICBnZXRTdGF0ZTogZ2V0U3RhdGUsXG5cdCAgICByZXBsYWNlUmVkdWNlcjogcmVwbGFjZVJlZHVjZXJcblx0ICB9LCBfcmVmMltfc3ltYm9sT2JzZXJ2YWJsZTJbJ2RlZmF1bHQnXV0gPSBvYnNlcnZhYmxlLCBfcmVmMjtcblx0fVxuXG4vKioqLyB9LFxuLyogMyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cdGV4cG9ydHNbJ2RlZmF1bHQnXSA9IHdhcm5pbmc7XG5cdC8qKlxuXHQgKiBQcmludHMgYSB3YXJuaW5nIGluIHRoZSBjb25zb2xlIGlmIGl0IGV4aXN0cy5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgVGhlIHdhcm5pbmcgbWVzc2FnZS5cblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRmdW5jdGlvbiB3YXJuaW5nKG1lc3NhZ2UpIHtcblx0ICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5cdCAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcblx0ICB9XG5cdCAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG5cdCAgdHJ5IHtcblx0ICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgaWYgeW91IGVuYWJsZVxuXHQgICAgLy8gXCJicmVhayBvbiBhbGwgZXhjZXB0aW9uc1wiIGluIHlvdXIgY29uc29sZSxcblx0ICAgIC8vIGl0IHdvdWxkIHBhdXNlIHRoZSBleGVjdXRpb24gYXQgdGhpcyBsaW5lLlxuXHQgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuXHQgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZW1wdHkgKi9cblx0ICB9IGNhdGNoIChlKSB7fVxuXHQgIC8qIGVzbGludC1lbmFibGUgbm8tZW1wdHkgKi9cblx0fVxuXG4vKioqLyB9LFxuLyogNCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIGdldFByb3RvdHlwZSA9IF9fd2VicGFja19yZXF1aXJlX18oOCksXG5cdCAgICBpc0hvc3RPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpLFxuXHQgICAgaXNPYmplY3RMaWtlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSk7XG5cblx0LyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xuXHR2YXIgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cblx0LyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xuXHR2YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuXHQgICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5cdC8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cblx0dmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuXHQvKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cblx0dmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cblx0LyoqIFVzZWQgdG8gaW5mZXIgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLiAqL1xuXHR2YXIgb2JqZWN0Q3RvclN0cmluZyA9IGZ1bmNUb1N0cmluZy5jYWxsKE9iamVjdCk7XG5cblx0LyoqXG5cdCAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcblx0ICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG5cdCAqIG9mIHZhbHVlcy5cblx0ICovXG5cdHZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG5cdCAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cblx0ICpcblx0ICogQHN0YXRpY1xuXHQgKiBAbWVtYmVyT2YgX1xuXHQgKiBAc2luY2UgMC44LjBcblx0ICogQGNhdGVnb3J5IExhbmdcblx0ICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG5cdCAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG5cdCAqIEBleGFtcGxlXG5cdCAqXG5cdCAqIGZ1bmN0aW9uIEZvbygpIHtcblx0ICogICB0aGlzLmEgPSAxO1xuXHQgKiB9XG5cdCAqXG5cdCAqIF8uaXNQbGFpbk9iamVjdChuZXcgRm9vKTtcblx0ICogLy8gPT4gZmFsc2Vcblx0ICpcblx0ICogXy5pc1BsYWluT2JqZWN0KFsxLCAyLCAzXSk7XG5cdCAqIC8vID0+IGZhbHNlXG5cdCAqXG5cdCAqIF8uaXNQbGFpbk9iamVjdCh7ICd4JzogMCwgJ3knOiAwIH0pO1xuXHQgKiAvLyA9PiB0cnVlXG5cdCAqXG5cdCAqIF8uaXNQbGFpbk9iamVjdChPYmplY3QuY3JlYXRlKG51bGwpKTtcblx0ICogLy8gPT4gdHJ1ZVxuXHQgKi9cblx0ZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuXHQgIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fFxuXHQgICAgICBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSAhPSBvYmplY3RUYWcgfHwgaXNIb3N0T2JqZWN0KHZhbHVlKSkge1xuXHQgICAgcmV0dXJuIGZhbHNlO1xuXHQgIH1cblx0ICB2YXIgcHJvdG8gPSBnZXRQcm90b3R5cGUodmFsdWUpO1xuXHQgIGlmIChwcm90byA9PT0gbnVsbCkge1xuXHQgICAgcmV0dXJuIHRydWU7XG5cdCAgfVxuXHQgIHZhciBDdG9yID0gaGFzT3duUHJvcGVydHkuY2FsbChwcm90bywgJ2NvbnN0cnVjdG9yJykgJiYgcHJvdG8uY29uc3RydWN0b3I7XG5cdCAgcmV0dXJuICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmXG5cdCAgICBDdG9yIGluc3RhbmNlb2YgQ3RvciAmJiBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nKTtcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gaXNQbGFpbk9iamVjdDtcblxuXG4vKioqLyB9LFxuLyogNSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cblx0dmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuXHRleHBvcnRzWydkZWZhdWx0J10gPSBhcHBseU1pZGRsZXdhcmU7XG5cblx0dmFyIF9jb21wb3NlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxuXHR2YXIgX2NvbXBvc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tcG9zZSk7XG5cblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgc3RvcmUgZW5oYW5jZXIgdGhhdCBhcHBsaWVzIG1pZGRsZXdhcmUgdG8gdGhlIGRpc3BhdGNoIG1ldGhvZFxuXHQgKiBvZiB0aGUgUmVkdXggc3RvcmUuIFRoaXMgaXMgaGFuZHkgZm9yIGEgdmFyaWV0eSBvZiB0YXNrcywgc3VjaCBhcyBleHByZXNzaW5nXG5cdCAqIGFzeW5jaHJvbm91cyBhY3Rpb25zIGluIGEgY29uY2lzZSBtYW5uZXIsIG9yIGxvZ2dpbmcgZXZlcnkgYWN0aW9uIHBheWxvYWQuXG5cdCAqXG5cdCAqIFNlZSBgcmVkdXgtdGh1bmtgIHBhY2thZ2UgYXMgYW4gZXhhbXBsZSBvZiB0aGUgUmVkdXggbWlkZGxld2FyZS5cblx0ICpcblx0ICogQmVjYXVzZSBtaWRkbGV3YXJlIGlzIHBvdGVudGlhbGx5IGFzeW5jaHJvbm91cywgdGhpcyBzaG91bGQgYmUgdGhlIGZpcnN0XG5cdCAqIHN0b3JlIGVuaGFuY2VyIGluIHRoZSBjb21wb3NpdGlvbiBjaGFpbi5cblx0ICpcblx0ICogTm90ZSB0aGF0IGVhY2ggbWlkZGxld2FyZSB3aWxsIGJlIGdpdmVuIHRoZSBgZGlzcGF0Y2hgIGFuZCBgZ2V0U3RhdGVgIGZ1bmN0aW9uc1xuXHQgKiBhcyBuYW1lZCBhcmd1bWVudHMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IG1pZGRsZXdhcmVzIFRoZSBtaWRkbGV3YXJlIGNoYWluIHRvIGJlIGFwcGxpZWQuXG5cdCAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBzdG9yZSBlbmhhbmNlciBhcHBseWluZyB0aGUgbWlkZGxld2FyZS5cblx0ICovXG5cdGZ1bmN0aW9uIGFwcGx5TWlkZGxld2FyZSgpIHtcblx0ICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgbWlkZGxld2FyZXMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcblx0ICAgIG1pZGRsZXdhcmVzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuXHQgIH1cblxuXHQgIHJldHVybiBmdW5jdGlvbiAoY3JlYXRlU3RvcmUpIHtcblx0ICAgIHJldHVybiBmdW5jdGlvbiAocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKSB7XG5cdCAgICAgIHZhciBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlLCBlbmhhbmNlcik7XG5cdCAgICAgIHZhciBfZGlzcGF0Y2ggPSBzdG9yZS5kaXNwYXRjaDtcblx0ICAgICAgdmFyIGNoYWluID0gW107XG5cblx0ICAgICAgdmFyIG1pZGRsZXdhcmVBUEkgPSB7XG5cdCAgICAgICAgZ2V0U3RhdGU6IHN0b3JlLmdldFN0YXRlLFxuXHQgICAgICAgIGRpc3BhdGNoOiBmdW5jdGlvbiBkaXNwYXRjaChhY3Rpb24pIHtcblx0ICAgICAgICAgIHJldHVybiBfZGlzcGF0Y2goYWN0aW9uKTtcblx0ICAgICAgICB9XG5cdCAgICAgIH07XG5cdCAgICAgIGNoYWluID0gbWlkZGxld2FyZXMubWFwKGZ1bmN0aW9uIChtaWRkbGV3YXJlKSB7XG5cdCAgICAgICAgcmV0dXJuIG1pZGRsZXdhcmUobWlkZGxld2FyZUFQSSk7XG5cdCAgICAgIH0pO1xuXHQgICAgICBfZGlzcGF0Y2ggPSBfY29tcG9zZTJbJ2RlZmF1bHQnXS5hcHBseSh1bmRlZmluZWQsIGNoYWluKShzdG9yZS5kaXNwYXRjaCk7XG5cblx0ICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBzdG9yZSwge1xuXHQgICAgICAgIGRpc3BhdGNoOiBfZGlzcGF0Y2hcblx0ICAgICAgfSk7XG5cdCAgICB9O1xuXHQgIH07XG5cdH1cblxuLyoqKi8gfSxcbi8qIDYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXHRleHBvcnRzWydkZWZhdWx0J10gPSBiaW5kQWN0aW9uQ3JlYXRvcnM7XG5cdGZ1bmN0aW9uIGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3IsIGRpc3BhdGNoKSB7XG5cdCAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0ICAgIHJldHVybiBkaXNwYXRjaChhY3Rpb25DcmVhdG9yLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKSk7XG5cdCAgfTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUdXJucyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBhY3Rpb24gY3JlYXRvcnMsIGludG8gYW4gb2JqZWN0IHdpdGggdGhlXG5cdCAqIHNhbWUga2V5cywgYnV0IHdpdGggZXZlcnkgZnVuY3Rpb24gd3JhcHBlZCBpbnRvIGEgYGRpc3BhdGNoYCBjYWxsIHNvIHRoZXlcblx0ICogbWF5IGJlIGludm9rZWQgZGlyZWN0bHkuIFRoaXMgaXMganVzdCBhIGNvbnZlbmllbmNlIG1ldGhvZCwgYXMgeW91IGNhbiBjYWxsXG5cdCAqIGBzdG9yZS5kaXNwYXRjaChNeUFjdGlvbkNyZWF0b3JzLmRvU29tZXRoaW5nKCkpYCB5b3Vyc2VsZiBqdXN0IGZpbmUuXG5cdCAqXG5cdCAqIEZvciBjb252ZW5pZW5jZSwgeW91IGNhbiBhbHNvIHBhc3MgYSBzaW5nbGUgZnVuY3Rpb24gYXMgdGhlIGZpcnN0IGFyZ3VtZW50LFxuXHQgKiBhbmQgZ2V0IGEgZnVuY3Rpb24gaW4gcmV0dXJuLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdH0gYWN0aW9uQ3JlYXRvcnMgQW4gb2JqZWN0IHdob3NlIHZhbHVlcyBhcmUgYWN0aW9uXG5cdCAqIGNyZWF0b3IgZnVuY3Rpb25zLiBPbmUgaGFuZHkgd2F5IHRvIG9idGFpbiBpdCBpcyB0byB1c2UgRVM2IGBpbXBvcnQgKiBhc2Bcblx0ICogc3ludGF4LiBZb3UgbWF5IGFsc28gcGFzcyBhIHNpbmdsZSBmdW5jdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gZGlzcGF0Y2ggVGhlIGBkaXNwYXRjaGAgZnVuY3Rpb24gYXZhaWxhYmxlIG9uIHlvdXIgUmVkdXhcblx0ICogc3RvcmUuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtGdW5jdGlvbnxPYmplY3R9IFRoZSBvYmplY3QgbWltaWNraW5nIHRoZSBvcmlnaW5hbCBvYmplY3QsIGJ1dCB3aXRoXG5cdCAqIGV2ZXJ5IGFjdGlvbiBjcmVhdG9yIHdyYXBwZWQgaW50byB0aGUgYGRpc3BhdGNoYCBjYWxsLiBJZiB5b3UgcGFzc2VkIGFcblx0ICogZnVuY3Rpb24gYXMgYGFjdGlvbkNyZWF0b3JzYCwgdGhlIHJldHVybiB2YWx1ZSB3aWxsIGFsc28gYmUgYSBzaW5nbGVcblx0ICogZnVuY3Rpb24uXG5cdCAqL1xuXHRmdW5jdGlvbiBiaW5kQWN0aW9uQ3JlYXRvcnMoYWN0aW9uQ3JlYXRvcnMsIGRpc3BhdGNoKSB7XG5cdCAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9ycyA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3JzLCBkaXNwYXRjaCk7XG5cdCAgfVxuXG5cdCAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9ycyAhPT0gJ29iamVjdCcgfHwgYWN0aW9uQ3JlYXRvcnMgPT09IG51bGwpIHtcblx0ICAgIHRocm93IG5ldyBFcnJvcignYmluZEFjdGlvbkNyZWF0b3JzIGV4cGVjdGVkIGFuIG9iamVjdCBvciBhIGZ1bmN0aW9uLCBpbnN0ZWFkIHJlY2VpdmVkICcgKyAoYWN0aW9uQ3JlYXRvcnMgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgYWN0aW9uQ3JlYXRvcnMpICsgJy4gJyArICdEaWQgeW91IHdyaXRlIFwiaW1wb3J0IEFjdGlvbkNyZWF0b3JzIGZyb21cIiBpbnN0ZWFkIG9mIFwiaW1wb3J0ICogYXMgQWN0aW9uQ3JlYXRvcnMgZnJvbVwiPycpO1xuXHQgIH1cblxuXHQgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYWN0aW9uQ3JlYXRvcnMpO1xuXHQgIHZhciBib3VuZEFjdGlvbkNyZWF0b3JzID0ge307XG5cdCAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICB2YXIga2V5ID0ga2V5c1tpXTtcblx0ICAgIHZhciBhY3Rpb25DcmVhdG9yID0gYWN0aW9uQ3JlYXRvcnNba2V5XTtcblx0ICAgIGlmICh0eXBlb2YgYWN0aW9uQ3JlYXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICBib3VuZEFjdGlvbkNyZWF0b3JzW2tleV0gPSBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9yLCBkaXNwYXRjaCk7XG5cdCAgICB9XG5cdCAgfVxuXHQgIHJldHVybiBib3VuZEFjdGlvbkNyZWF0b3JzO1xuXHR9XG5cbi8qKiovIH0sXG4vKiA3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblx0ZXhwb3J0c1snZGVmYXVsdCddID0gY29tYmluZVJlZHVjZXJzO1xuXG5cdHZhciBfY3JlYXRlU3RvcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG5cdHZhciBfaXNQbGFpbk9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cblx0dmFyIF9pc1BsYWluT2JqZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzUGxhaW5PYmplY3QpO1xuXG5cdHZhciBfd2FybmluZyA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cblx0dmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG5cdGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuXHRmdW5jdGlvbiBnZXRVbmRlZmluZWRTdGF0ZUVycm9yTWVzc2FnZShrZXksIGFjdGlvbikge1xuXHQgIHZhciBhY3Rpb25UeXBlID0gYWN0aW9uICYmIGFjdGlvbi50eXBlO1xuXHQgIHZhciBhY3Rpb25OYW1lID0gYWN0aW9uVHlwZSAmJiAnXCInICsgYWN0aW9uVHlwZS50b1N0cmluZygpICsgJ1wiJyB8fCAnYW4gYWN0aW9uJztcblxuXHQgIHJldHVybiAnR2l2ZW4gYWN0aW9uICcgKyBhY3Rpb25OYW1lICsgJywgcmVkdWNlciBcIicgKyBrZXkgKyAnXCIgcmV0dXJuZWQgdW5kZWZpbmVkLiAnICsgJ1RvIGlnbm9yZSBhbiBhY3Rpb24sIHlvdSBtdXN0IGV4cGxpY2l0bHkgcmV0dXJuIHRoZSBwcmV2aW91cyBzdGF0ZS4nO1xuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0VW5leHBlY3RlZFN0YXRlU2hhcGVXYXJuaW5nTWVzc2FnZShpbnB1dFN0YXRlLCByZWR1Y2VycywgYWN0aW9uLCB1bmV4cGVjdGVkS2V5Q2FjaGUpIHtcblx0ICB2YXIgcmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhyZWR1Y2Vycyk7XG5cdCAgdmFyIGFyZ3VtZW50TmFtZSA9IGFjdGlvbiAmJiBhY3Rpb24udHlwZSA9PT0gX2NyZWF0ZVN0b3JlLkFjdGlvblR5cGVzLklOSVQgPyAncHJlbG9hZGVkU3RhdGUgYXJndW1lbnQgcGFzc2VkIHRvIGNyZWF0ZVN0b3JlJyA6ICdwcmV2aW91cyBzdGF0ZSByZWNlaXZlZCBieSB0aGUgcmVkdWNlcic7XG5cblx0ICBpZiAocmVkdWNlcktleXMubGVuZ3RoID09PSAwKSB7XG5cdCAgICByZXR1cm4gJ1N0b3JlIGRvZXMgbm90IGhhdmUgYSB2YWxpZCByZWR1Y2VyLiBNYWtlIHN1cmUgdGhlIGFyZ3VtZW50IHBhc3NlZCAnICsgJ3RvIGNvbWJpbmVSZWR1Y2VycyBpcyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSByZWR1Y2Vycy4nO1xuXHQgIH1cblxuXHQgIGlmICghKDAsIF9pc1BsYWluT2JqZWN0MlsnZGVmYXVsdCddKShpbnB1dFN0YXRlKSkge1xuXHQgICAgcmV0dXJuICdUaGUgJyArIGFyZ3VtZW50TmFtZSArICcgaGFzIHVuZXhwZWN0ZWQgdHlwZSBvZiBcIicgKyB7fS50b1N0cmluZy5jYWxsKGlucHV0U3RhdGUpLm1hdGNoKC9cXHMoW2EtenxBLVpdKykvKVsxXSArICdcIi4gRXhwZWN0ZWQgYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyAnICsgKCdrZXlzOiBcIicgKyByZWR1Y2VyS2V5cy5qb2luKCdcIiwgXCInKSArICdcIicpO1xuXHQgIH1cblxuXHQgIHZhciB1bmV4cGVjdGVkS2V5cyA9IE9iamVjdC5rZXlzKGlucHV0U3RhdGUpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG5cdCAgICByZXR1cm4gIXJlZHVjZXJzLmhhc093blByb3BlcnR5KGtleSkgJiYgIXVuZXhwZWN0ZWRLZXlDYWNoZVtrZXldO1xuXHQgIH0pO1xuXG5cdCAgdW5leHBlY3RlZEtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdCAgICB1bmV4cGVjdGVkS2V5Q2FjaGVba2V5XSA9IHRydWU7XG5cdCAgfSk7XG5cblx0ICBpZiAodW5leHBlY3RlZEtleXMubGVuZ3RoID4gMCkge1xuXHQgICAgcmV0dXJuICdVbmV4cGVjdGVkICcgKyAodW5leHBlY3RlZEtleXMubGVuZ3RoID4gMSA/ICdrZXlzJyA6ICdrZXknKSArICcgJyArICgnXCInICsgdW5leHBlY3RlZEtleXMuam9pbignXCIsIFwiJykgKyAnXCIgZm91bmQgaW4gJyArIGFyZ3VtZW50TmFtZSArICcuICcpICsgJ0V4cGVjdGVkIHRvIGZpbmQgb25lIG9mIHRoZSBrbm93biByZWR1Y2VyIGtleXMgaW5zdGVhZDogJyArICgnXCInICsgcmVkdWNlcktleXMuam9pbignXCIsIFwiJykgKyAnXCIuIFVuZXhwZWN0ZWQga2V5cyB3aWxsIGJlIGlnbm9yZWQuJyk7XG5cdCAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gYXNzZXJ0UmVkdWNlclNhbml0eShyZWR1Y2Vycykge1xuXHQgIE9iamVjdC5rZXlzKHJlZHVjZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0ICAgIHZhciByZWR1Y2VyID0gcmVkdWNlcnNba2V5XTtcblx0ICAgIHZhciBpbml0aWFsU3RhdGUgPSByZWR1Y2VyKHVuZGVmaW5lZCwgeyB0eXBlOiBfY3JlYXRlU3RvcmUuQWN0aW9uVHlwZXMuSU5JVCB9KTtcblxuXHQgICAgaWYgKHR5cGVvZiBpbml0aWFsU3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XG5cdCAgICAgIHRocm93IG5ldyBFcnJvcignUmVkdWNlciBcIicgKyBrZXkgKyAnXCIgcmV0dXJuZWQgdW5kZWZpbmVkIGR1cmluZyBpbml0aWFsaXphdGlvbi4gJyArICdJZiB0aGUgc3RhdGUgcGFzc2VkIHRvIHRoZSByZWR1Y2VyIGlzIHVuZGVmaW5lZCwgeW91IG11c3QgJyArICdleHBsaWNpdGx5IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZS4gVGhlIGluaXRpYWwgc3RhdGUgbWF5ICcgKyAnbm90IGJlIHVuZGVmaW5lZC4nKTtcblx0ICAgIH1cblxuXHQgICAgdmFyIHR5cGUgPSAnQEByZWR1eC9QUk9CRV9VTktOT1dOX0FDVElPTl8nICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpLnNwbGl0KCcnKS5qb2luKCcuJyk7XG5cdCAgICBpZiAodHlwZW9mIHJlZHVjZXIodW5kZWZpbmVkLCB7IHR5cGU6IHR5cGUgfSkgPT09ICd1bmRlZmluZWQnKSB7XG5cdCAgICAgIHRocm93IG5ldyBFcnJvcignUmVkdWNlciBcIicgKyBrZXkgKyAnXCIgcmV0dXJuZWQgdW5kZWZpbmVkIHdoZW4gcHJvYmVkIHdpdGggYSByYW5kb20gdHlwZS4gJyArICgnRG9uXFwndCB0cnkgdG8gaGFuZGxlICcgKyBfY3JlYXRlU3RvcmUuQWN0aW9uVHlwZXMuSU5JVCArICcgb3Igb3RoZXIgYWN0aW9ucyBpbiBcInJlZHV4LypcIiAnKSArICduYW1lc3BhY2UuIFRoZXkgYXJlIGNvbnNpZGVyZWQgcHJpdmF0ZS4gSW5zdGVhZCwgeW91IG11c3QgcmV0dXJuIHRoZSAnICsgJ2N1cnJlbnQgc3RhdGUgZm9yIGFueSB1bmtub3duIGFjdGlvbnMsIHVubGVzcyBpdCBpcyB1bmRlZmluZWQsICcgKyAnaW4gd2hpY2ggY2FzZSB5b3UgbXVzdCByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUsIHJlZ2FyZGxlc3Mgb2YgdGhlICcgKyAnYWN0aW9uIHR5cGUuIFRoZSBpbml0aWFsIHN0YXRlIG1heSBub3QgYmUgdW5kZWZpbmVkLicpO1xuXHQgICAgfVxuXHQgIH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIFR1cm5zIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGRpZmZlcmVudCByZWR1Y2VyIGZ1bmN0aW9ucywgaW50byBhIHNpbmdsZVxuXHQgKiByZWR1Y2VyIGZ1bmN0aW9uLiBJdCB3aWxsIGNhbGwgZXZlcnkgY2hpbGQgcmVkdWNlciwgYW5kIGdhdGhlciB0aGVpciByZXN1bHRzXG5cdCAqIGludG8gYSBzaW5nbGUgc3RhdGUgb2JqZWN0LCB3aG9zZSBrZXlzIGNvcnJlc3BvbmQgdG8gdGhlIGtleXMgb2YgdGhlIHBhc3NlZFxuXHQgKiByZWR1Y2VyIGZ1bmN0aW9ucy5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IHJlZHVjZXJzIEFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgY29ycmVzcG9uZCB0byBkaWZmZXJlbnRcblx0ICogcmVkdWNlciBmdW5jdGlvbnMgdGhhdCBuZWVkIHRvIGJlIGNvbWJpbmVkIGludG8gb25lLiBPbmUgaGFuZHkgd2F5IHRvIG9idGFpblxuXHQgKiBpdCBpcyB0byB1c2UgRVM2IGBpbXBvcnQgKiBhcyByZWR1Y2Vyc2Agc3ludGF4LiBUaGUgcmVkdWNlcnMgbWF5IG5ldmVyIHJldHVyblxuXHQgKiB1bmRlZmluZWQgZm9yIGFueSBhY3Rpb24uIEluc3RlYWQsIHRoZXkgc2hvdWxkIHJldHVybiB0aGVpciBpbml0aWFsIHN0YXRlXG5cdCAqIGlmIHRoZSBzdGF0ZSBwYXNzZWQgdG8gdGhlbSB3YXMgdW5kZWZpbmVkLCBhbmQgdGhlIGN1cnJlbnQgc3RhdGUgZm9yIGFueVxuXHQgKiB1bnJlY29nbml6ZWQgYWN0aW9uLlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgcmVkdWNlciBmdW5jdGlvbiB0aGF0IGludm9rZXMgZXZlcnkgcmVkdWNlciBpbnNpZGUgdGhlXG5cdCAqIHBhc3NlZCBvYmplY3QsIGFuZCBidWlsZHMgYSBzdGF0ZSBvYmplY3Qgd2l0aCB0aGUgc2FtZSBzaGFwZS5cblx0ICovXG5cdGZ1bmN0aW9uIGNvbWJpbmVSZWR1Y2VycyhyZWR1Y2Vycykge1xuXHQgIHZhciByZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKHJlZHVjZXJzKTtcblx0ICB2YXIgZmluYWxSZWR1Y2VycyA9IHt9O1xuXHQgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVkdWNlcktleXMubGVuZ3RoOyBpKyspIHtcblx0ICAgIHZhciBrZXkgPSByZWR1Y2VyS2V5c1tpXTtcblxuXHQgICAgaWYgKHRydWUpIHtcblx0ICAgICAgaWYgKHR5cGVvZiByZWR1Y2Vyc1trZXldID09PSAndW5kZWZpbmVkJykge1xuXHQgICAgICAgICgwLCBfd2FybmluZzJbJ2RlZmF1bHQnXSkoJ05vIHJlZHVjZXIgcHJvdmlkZWQgZm9yIGtleSBcIicgKyBrZXkgKyAnXCInKTtcblx0ICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICBpZiAodHlwZW9mIHJlZHVjZXJzW2tleV0gPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgZmluYWxSZWR1Y2Vyc1trZXldID0gcmVkdWNlcnNba2V5XTtcblx0ICAgIH1cblx0ICB9XG5cdCAgdmFyIGZpbmFsUmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhmaW5hbFJlZHVjZXJzKTtcblxuXHQgIGlmICh0cnVlKSB7XG5cdCAgICB2YXIgdW5leHBlY3RlZEtleUNhY2hlID0ge307XG5cdCAgfVxuXG5cdCAgdmFyIHNhbml0eUVycm9yO1xuXHQgIHRyeSB7XG5cdCAgICBhc3NlcnRSZWR1Y2VyU2FuaXR5KGZpbmFsUmVkdWNlcnMpO1xuXHQgIH0gY2F0Y2ggKGUpIHtcblx0ICAgIHNhbml0eUVycm9yID0gZTtcblx0ICB9XG5cblx0ICByZXR1cm4gZnVuY3Rpb24gY29tYmluYXRpb24oKSB7XG5cdCAgICB2YXIgc3RhdGUgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcblx0ICAgIHZhciBhY3Rpb24gPSBhcmd1bWVudHNbMV07XG5cblx0ICAgIGlmIChzYW5pdHlFcnJvcikge1xuXHQgICAgICB0aHJvdyBzYW5pdHlFcnJvcjtcblx0ICAgIH1cblxuXHQgICAgaWYgKHRydWUpIHtcblx0ICAgICAgdmFyIHdhcm5pbmdNZXNzYWdlID0gZ2V0VW5leHBlY3RlZFN0YXRlU2hhcGVXYXJuaW5nTWVzc2FnZShzdGF0ZSwgZmluYWxSZWR1Y2VycywgYWN0aW9uLCB1bmV4cGVjdGVkS2V5Q2FjaGUpO1xuXHQgICAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcblx0ICAgICAgICAoMCwgX3dhcm5pbmcyWydkZWZhdWx0J10pKHdhcm5pbmdNZXNzYWdlKTtcblx0ICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICB2YXIgaGFzQ2hhbmdlZCA9IGZhbHNlO1xuXHQgICAgdmFyIG5leHRTdGF0ZSA9IHt9O1xuXHQgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaW5hbFJlZHVjZXJLZXlzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgIHZhciBrZXkgPSBmaW5hbFJlZHVjZXJLZXlzW2ldO1xuXHQgICAgICB2YXIgcmVkdWNlciA9IGZpbmFsUmVkdWNlcnNba2V5XTtcblx0ICAgICAgdmFyIHByZXZpb3VzU3RhdGVGb3JLZXkgPSBzdGF0ZVtrZXldO1xuXHQgICAgICB2YXIgbmV4dFN0YXRlRm9yS2V5ID0gcmVkdWNlcihwcmV2aW91c1N0YXRlRm9yS2V5LCBhY3Rpb24pO1xuXHQgICAgICBpZiAodHlwZW9mIG5leHRTdGF0ZUZvcktleSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0ICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZ2V0VW5kZWZpbmVkU3RhdGVFcnJvck1lc3NhZ2Uoa2V5LCBhY3Rpb24pO1xuXHQgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuXHQgICAgICB9XG5cdCAgICAgIG5leHRTdGF0ZVtrZXldID0gbmV4dFN0YXRlRm9yS2V5O1xuXHQgICAgICBoYXNDaGFuZ2VkID0gaGFzQ2hhbmdlZCB8fCBuZXh0U3RhdGVGb3JLZXkgIT09IHByZXZpb3VzU3RhdGVGb3JLZXk7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gaGFzQ2hhbmdlZCA/IG5leHRTdGF0ZSA6IHN0YXRlO1xuXHQgIH07XG5cdH1cblxuLyoqKi8gfSxcbi8qIDggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBvdmVyQXJnID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMCk7XG5cblx0LyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG5cdHZhciBnZXRQcm90b3R5cGUgPSBvdmVyQXJnKE9iamVjdC5nZXRQcm90b3R5cGVPZiwgT2JqZWN0KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGdldFByb3RvdHlwZTtcblxuXG4vKioqLyB9LFxuLyogOSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0LyoqXG5cdCAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QgaW4gSUUgPCA5LlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cblx0ICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuXHQgKi9cblx0ZnVuY3Rpb24gaXNIb3N0T2JqZWN0KHZhbHVlKSB7XG5cdCAgLy8gTWFueSBob3N0IG9iamVjdHMgYXJlIGBPYmplY3RgIG9iamVjdHMgdGhhdCBjYW4gY29lcmNlIHRvIHN0cmluZ3Ncblx0ICAvLyBkZXNwaXRlIGhhdmluZyBpbXByb3Blcmx5IGRlZmluZWQgYHRvU3RyaW5nYCBtZXRob2RzLlxuXHQgIHZhciByZXN1bHQgPSBmYWxzZTtcblx0ICBpZiAodmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUudG9TdHJpbmcgIT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgdHJ5IHtcblx0ICAgICAgcmVzdWx0ID0gISEodmFsdWUgKyAnJyk7XG5cdCAgICB9IGNhdGNoIChlKSB7fVxuXHQgIH1cblx0ICByZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBpc0hvc3RPYmplY3Q7XG5cblxuLyoqKi8gfSxcbi8qIDEwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuXHQgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cblx0ICovXG5cdGZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG5cdCAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuXHQgICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuXHQgIH07XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IG92ZXJBcmc7XG5cblxuLyoqKi8gfSxcbi8qIDExICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKipcblx0ICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG5cdCAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cblx0ICpcblx0ICogQHN0YXRpY1xuXHQgKiBAbWVtYmVyT2YgX1xuXHQgKiBAc2luY2UgNC4wLjBcblx0ICogQGNhdGVnb3J5IExhbmdcblx0ICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG5cdCAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG5cdCAqIEBleGFtcGxlXG5cdCAqXG5cdCAqIF8uaXNPYmplY3RMaWtlKHt9KTtcblx0ICogLy8gPT4gdHJ1ZVxuXHQgKlxuXHQgKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuXHQgKiAvLyA9PiB0cnVlXG5cdCAqXG5cdCAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG5cdCAqIC8vID0+IGZhbHNlXG5cdCAqXG5cdCAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuXHQgKiAvLyA9PiBmYWxzZVxuXHQgKi9cblx0ZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG5cdCAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdExpa2U7XG5cblxuLyoqKi8gfSxcbi8qIDEyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMTMpO1xuXG5cbi8qKiovIH0sXG4vKiAxMyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0LyogV0VCUEFDSyBWQVIgSU5KRUNUSU9OICovKGZ1bmN0aW9uKGdsb2JhbCkgeyd1c2Ugc3RyaWN0JztcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0XHR2YWx1ZTogdHJ1ZVxuXHR9KTtcblxuXHR2YXIgX3BvbnlmaWxsID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNCk7XG5cblx0dmFyIF9wb255ZmlsbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb255ZmlsbCk7XG5cblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5cdHZhciByb290ID0gdW5kZWZpbmVkOyAvKiBnbG9iYWwgd2luZG93ICovXG5cblx0aWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cm9vdCA9IGdsb2JhbDtcblx0fSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdHJvb3QgPSB3aW5kb3c7XG5cdH1cblxuXHR2YXIgcmVzdWx0ID0gKDAsIF9wb255ZmlsbDJbJ2RlZmF1bHQnXSkocm9vdCk7XG5cdGV4cG9ydHNbJ2RlZmF1bHQnXSA9IHJlc3VsdDtcblx0LyogV0VCUEFDSyBWQVIgSU5KRUNUSU9OICovfS5jYWxsKGV4cG9ydHMsIChmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0oKSkpKVxuXG4vKioqLyB9LFxuLyogMTQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0XHR2YWx1ZTogdHJ1ZVxuXHR9KTtcblx0ZXhwb3J0c1snZGVmYXVsdCddID0gc3ltYm9sT2JzZXJ2YWJsZVBvbnlmaWxsO1xuXHRmdW5jdGlvbiBzeW1ib2xPYnNlcnZhYmxlUG9ueWZpbGwocm9vdCkge1xuXHRcdHZhciByZXN1bHQ7XG5cdFx0dmFyIF9TeW1ib2wgPSByb290LlN5bWJvbDtcblxuXHRcdGlmICh0eXBlb2YgX1N5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0aWYgKF9TeW1ib2wub2JzZXJ2YWJsZSkge1xuXHRcdFx0XHRyZXN1bHQgPSBfU3ltYm9sLm9ic2VydmFibGU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXN1bHQgPSBfU3ltYm9sKCdvYnNlcnZhYmxlJyk7XG5cdFx0XHRcdF9TeW1ib2wub2JzZXJ2YWJsZSA9IHJlc3VsdDtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gJ0BAb2JzZXJ2YWJsZSc7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fTtcblxuLyoqKi8gfVxuLyoqKioqKi8gXSlcbn0pO1xuO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWR1eC9kaXN0L3JlZHV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBBQ1RJT05fREVGSU5FRD17XHJcbiAgICBDaGFuZ2VTeW1ib2w6XCJDaGFuZ2VTeW1ib2xcIixcclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzPXtcclxuICAgIERFRklORUQ6QUNUSU9OX0RFRklORUQsXHJcbiAgICBnZXRDaGFuZ2VTeW1ib2w6ZnVuY3Rpb24oc3ltYm9sKXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0eXBlOkFDVElPTl9ERUZJTkVELkNoYW5nZVN5bWJvbCxcclxuICAgICAgICAgICAgc3ltYm9sOnN5bWJvbFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL2N0cmwvcmVkdXhBY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3NlcnZpY2VzL29yZGVyc2VydmljZS5qc1wiIC8+XHJcbnZhciBhdmFsb24gPSByZXF1aXJlKCdhdmFsb24nKTtcclxudmFyIG9yZGVyU2VydmljZSA9IHJlcXVpcmUoJy4uL3NlcnZpY2VzL29yZGVyc2VydmljZS5qcycpO1xyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gICAgdmFyIHZtID0gYXZhbG9uLmRlZmluZSh7XHJcbiAgICAgICAgJGlkOiBcImludmVzdG1lbnRDdHJsXCIsXHJcbiAgICAgICAgc3ltYm9sOiB7XHJcbiAgICAgICAgICAgIHByaWNlOiAwLFxyXG4gICAgICAgICAgICBzeW1ib2w6IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICd0ZXN0J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcGVuT3JkZXJJbmZvOiB7XHJcbiAgICAgICAgICAgIHZvbHVtZTogMjAsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbjogMSxcclxuICAgICAgICAgICAgZ2FtZUlkOiAxXHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1cFwiKVxyXG4gICAgICAgICAgICBidXQoMCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkb3duOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZG93blwiKTtcclxuICAgICAgICAgICAgYnV0KDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgZnVuY3Rpb24gYnV0KHVwT3JEb3duKSB7XHJcblxyXG4gICAgICAgIHZhciBwb3N0RGF0YSA9IHZtLm9wZW5PcmRlckluZm8uJG1vZGVsO1xyXG4gICAgICAgIHBvc3REYXRhLmRpcmVjdGlvbiA9IHVwT3JEb3duO1xyXG4gICAgICAgIHBvc3REYXRhLmNsaWVudFRpbWUgPSAobmV3IERhdGUoKSkudGltZTtcclxuICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICBvcmRlclNlcnZpY2UuYnV5KHBvc3REYXRhKVxyXG4gICAgICAgIC5lcnJvcihidXlFcnJvcik7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBidXlFcnJvcihlKSB7XHJcbiAgICAgICAgYWxlcnQoZS5yZXNwb25zZVRleHQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZtO1xyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBjcmVhdGVDdHJsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHZtID0gaW5pdCgpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNldFN5bWJvbDogZnVuY3Rpb24gKHN5bWJvbCkge1xyXG4gICAgICAgICAgICAgICAgdm0uc3ltYm9sID0gc3ltYm9sO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9jdHJsL2ludmVzdG1lbnRDdHJsLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB3ZWJBcGkgPSByZXF1aXJlKFwiLi4vd2ViYXBpXCIpLmNyZWF0ZShcIi9hcGkvb3JkZXJzXCIpO1xyXG5cclxuZnVuY3Rpb24gYnV5KG9yZGVyKSB7XHJcbiAgICByZXR1cm4gd2ViQXBpLlBvc3Qob3JkZXIpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGJ1eTogYnV5XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL3NlcnZpY2VzL29yZGVyc2VydmljZS5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vc2VydmljZXMvcXVvdGF0aW9ucHJvdmlkZXIuanNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3NlcnZpY2VzL3N5bWJvbHNlcnZpY2UuanNcIiAvPlxudmFyIGF2YWxvbiA9IHJlcXVpcmUoJ2F2YWxvbicpO1xuXG52YXIgUmVkdXhBY3Rpb25EZWZpbmVkID0gcmVxdWlyZShcIi4vcmVkdXhBY3Rpb24uanNcIik7XG5cbmZ1bmN0aW9uIEluaXQod3NRdW90ZVVybCxnbG9iYWxTdG9yZSkge1xuXG4gICAgdmFyIHZtID0gYXZhbG9uLmRlZmluZSh7XG4gICAgICAgICRpZDogXCJzeW1ib2xMaXN0XCIsXG4gICAgICAgIHN5bWJvbHM6IHt9LFxuICAgICAgICBhY3RpdmVJZDowLFxuICAgICAgICBhY3RpdmU6ZnVuY3Rpb24oc3ltYm9sKXtcbiAgICAgICAgICAgIGlmKHZtLmFjdGl2ZUlkKVxuICAgICAgICAgICAgICAgIHZtLnN5bWJvbHNbdm0uYWN0aXZlSWRdLmFjdGl2ZT1mYWxzZTtcbiAgICAgICAgICAgIHN5bWJvbC5hY3RpdmU9dHJ1ZTtcbiAgICAgICAgICAgIHZtLmFjdGl2ZUlkPXN5bWJvbC5pbmZvLmlkO1xuICAgICAgICAgICAgZ2xvYmFsU3RvcmUuZGlzcGF0Y2goUmVkdXhBY3Rpb25EZWZpbmVkLmdldENoYW5nZVN5bWJvbChzeW1ib2wpKTtcbiAgICAgICAgfVxuICAgICBcbiAgICB9KTtcblxuICAgIHZhciBzZXJ2aWNlcyA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9zeW1ib2xzZXJ2aWNlXCIpO1xuICAgIHNlcnZpY2VzLmxpc3QoKVxuICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgICAgICB2YXIgc3ltYm9scyA9IHt9O1xuICAgICAgICAgICAgdmFyIGRlZlN5bUJvbElkPWZhbHNlO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc3ltYm9sc1tkYXRhW2ldLmluZm8uaWRdID0gZGF0YVtpXTtcbiAgICAgICAgICAgICAgICBkYXRhW2ldLmFjdGl2ZT1mYWxzZTtcbiAgICAgICAgICAgICAgICBpZighZGVmU3ltQm9sSWQpICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgZGVmU3ltQm9sSWQ9ZGF0YVtpXS5pbmZvLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdm0uc3ltYm9scyA9IHN5bWJvbHM7XG4gICAgICAgICAgICB2bS5hY3RpdmVJZD1kZWZTeW1Cb2xJZDtcbiAgICAgICAgICBcbiAgICAgICAgICAgIEluaXRRdW90YXRpb25Qcm92aWRlcih2bSx3c1F1b3RlVXJsKTtcbiAgICAgICAgICAgIHZtLmFjdGl2ZSh2bS5zeW1ib2xzW2RlZlN5bUJvbElkXSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG5cblxufVxuXG5mdW5jdGlvbiBJbml0UXVvdGF0aW9uUHJvdmlkZXIodm0sd3NRdW90ZVVybCl7XG4gICB2YXIgcXVvdGF0aW9uUHJvdmlkZXIgPSByZXF1aXJlKCcuLi9zZXJ2aWNlcy9xdW90YXRpb25Qcm92aWRlci5qcycpO1xuICAgIHF1b3RhdGlvblByb3ZpZGVyLmluaXQod3NRdW90ZVVybCwgdm0uc3ltYm9scyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIENyZWF0ZUN0cmw6IEluaXRcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvY3RybC9zeW1ib2xjdHJsLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIGluaXQodXJsLCBzeW1ib2xzLCBmdW5jKSB7XHJcbiAgICB2YXIgd3MgPSBuZXcgV2ViU29ja2V0KHVybCk7XHJcbiAgICB3cy5vbm9wZW4gPSBmdW5jdGlvbihtc2cpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6L+e5o6l5LiK5pyN5Yqh5ZmoXCIpO1xyXG4gICAgICAgIHdzLnNlbmQoXCJzdGFydFwiKTtcclxuICAgIH07XHJcblxyXG4gICAgd3Mub25jbG9zZSA9IGZ1bmN0aW9uKG1zZykge1xyXG4gICAgICAgIGlmIChtc2cuY29kZSAhPSAxMDA2KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobXNnLnJlYXNvbik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW5pdCh1cmwsIHN5bWJvbHMsIGZ1bmMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB3cy5vbm1lc3NhZ2UgPSBmdW5jdGlvbihtc2cpIHtcclxuICAgICAgICB2YXIgYXJ5ID0gbXNnLmRhdGEuc3BsaXQoXCJ8XCIpWzFdLnNwbGl0KFwiLFwiKTtcclxuICAgICAgICB2YXIgc3ltYm9sID0gc3ltYm9sc1twYXJzZUludChhcnlbMF0pXTtcclxuICAgICAgICBzeW1ib2wucHJpY2UgPSBwYXJzZUZsb2F0KGFyeVsxXSkgLyBNYXRoLnBvdygxMCwgc3ltYm9sLmluZm8uc2NhbGUpO1xyXG4gICAgfTtcclxuICAgIHdzLm9uZXJyb3IgPSBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgfTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBpbml0OiBpbml0XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9zZXJ2aWNlcy9xdW90YXRpb25Qcm92aWRlci5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3NlcnZpY2VzL3VzZXJzZXJ2aWNlLmpzXCIgLz5cclxuXHJcbnZhciBVc2VycyA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy91c2Vyc2VydmljZS5qc1wiKTtcclxudmFyIEF2YWxvbiA9IHJlcXVpcmUoJ2F2YWxvbicpO1xyXG52YXIgQWNjb3VudFNlcnZpY2UgPSBuZXcgVXNlcnMuQWNjb3VudFNlcnZpY2UoKTtcclxuXHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcblxyXG5cclxuICAgIHZhciB2bSA9IEF2YWxvbi5kZWZpbmUoe1xyXG4gICAgICAgICRpZDogXCJsb2dpbkN0cmxcIixcclxuICAgICAgICB1c2VyOiB7XHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBcIlwiLFxyXG4gICAgICAgICAgICBsb2dpbklkOiBcIlwiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIlwiLFxyXG4gICAgICAgICAgICBpc0xvZ2luOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbG9naW46IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9naW4uLi4uXCIpO1xyXG4gICAgICAgICAgICBBY2NvdW50U2VydmljZS5sb2dpbih2bS51c2VyLmxvZ2luSWQsIHZtLnVzZXIucGFzc3dvcmQpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLnVzZXIucGFzc3dvcmQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS51c2VyLmlzTG9naW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGRhdGEubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdm07XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgaW5pdDogaW5pdFxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvY3RybC9sb2dpbmN0cmwuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxyXG52YXIgd2ViQXBpID0gcmVxdWlyZShcIi4uL3dlYmFwaVwiKS5jcmVhdGUoXCIvYXBpL2FjY291bnRzXCIpO1xyXG5mdW5jdGlvbiBBY2NvdW50U2VydmljZSgpIHtcclxuICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbiAoc3RyVXNlciwgc3RyUHdkKSB7XHJcbiAgICAgICAgcmV0dXJuIHdlYkFwaS5Qb3N0KHtcclxuICAgICAgICAgICAgVXNlcjogc3RyVXNlcixcclxuICAgICAgICAgICAgUGFzc3dvcmQ6IHN0clB3ZFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgQWNjb3VudFNlcnZpY2U6IEFjY291bnRTZXJ2aWNlXHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9zZXJ2aWNlcy91c2Vyc2VydmljZS5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==