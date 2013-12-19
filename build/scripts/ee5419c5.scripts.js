(function (window, undefined) {
  var rootjQuery, readyList, document = window.document, location = window.location, navigator = window.navigator, _jQuery = window.jQuery, _$ = window.$, core_push = Array.prototype.push, core_slice = Array.prototype.slice, core_indexOf = Array.prototype.indexOf, core_toString = Object.prototype.toString, core_hasOwn = Object.prototype.hasOwnProperty, core_trim = String.prototype.trim, jQuery = function (selector, context) {
      return new jQuery.fn.init(selector, context, rootjQuery);
    }, core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, core_rnotwhite = /\S/, core_rspace = /\s+/, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, rvalidchars = /^[\],:{}\s]*$/, rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g, rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function (all, letter) {
      return (letter + '').toUpperCase();
    }, DOMContentLoaded = function () {
      if (document.addEventListener) {
        document.removeEventListener('DOMContentLoaded', DOMContentLoaded, false);
        jQuery.ready();
      } else if (document.readyState === 'complete') {
        document.detachEvent('onreadystatechange', DOMContentLoaded);
        jQuery.ready();
      }
    }, class2type = {};
  jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    init: function (selector, context, rootjQuery) {
      var match, elem, ret, doc;
      if (!selector) {
        return this;
      }
      if (selector.nodeType) {
        this.context = this[0] = selector;
        this.length = 1;
        return this;
      }
      if (typeof selector === 'string') {
        if (selector.charAt(0) === '<' && selector.charAt(selector.length - 1) === '>' && selector.length >= 3) {
          match = [
            null,
            selector,
            null
          ];
        } else {
          match = rquickExpr.exec(selector);
        }
        if (match && (match[1] || !context)) {
          if (match[1]) {
            context = context instanceof jQuery ? context[0] : context;
            doc = context && context.nodeType ? context.ownerDocument || context : document;
            selector = jQuery.parseHTML(match[1], doc, true);
            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
              this.attr.call(selector, context, true);
            }
            return jQuery.merge(this, selector);
          } else {
            elem = document.getElementById(match[2]);
            if (elem && elem.parentNode) {
              if (elem.id !== match[2]) {
                return rootjQuery.find(selector);
              }
              this.length = 1;
              this[0] = elem;
            }
            this.context = document;
            this.selector = selector;
            return this;
          }
        } else if (!context || context.jquery) {
          return (context || rootjQuery).find(selector);
        } else {
          return this.constructor(context).find(selector);
        }
      } else if (jQuery.isFunction(selector)) {
        return rootjQuery.ready(selector);
      }
      if (selector.selector !== undefined) {
        this.selector = selector.selector;
        this.context = selector.context;
      }
      return jQuery.makeArray(selector, this);
    },
    selector: '',
    jquery: '1.8.3',
    length: 0,
    size: function () {
      return this.length;
    },
    toArray: function () {
      return core_slice.call(this);
    },
    get: function (num) {
      return num == null ? this.toArray() : num < 0 ? this[this.length + num] : this[num];
    },
    pushStack: function (elems, name, selector) {
      var ret = jQuery.merge(this.constructor(), elems);
      ret.prevObject = this;
      ret.context = this.context;
      if (name === 'find') {
        ret.selector = this.selector + (this.selector ? ' ' : '') + selector;
      } else if (name) {
        ret.selector = this.selector + '.' + name + '(' + selector + ')';
      }
      return ret;
    },
    each: function (callback, args) {
      return jQuery.each(this, callback, args);
    },
    ready: function (fn) {
      jQuery.ready.promise().done(fn);
      return this;
    },
    eq: function (i) {
      i = +i;
      return i === -1 ? this.slice(i) : this.slice(i, i + 1);
    },
    first: function () {
      return this.eq(0);
    },
    last: function () {
      return this.eq(-1);
    },
    slice: function () {
      return this.pushStack(core_slice.apply(this, arguments), 'slice', core_slice.call(arguments).join(','));
    },
    map: function (callback) {
      return this.pushStack(jQuery.map(this, function (elem, i) {
        return callback.call(elem, i, elem);
      }));
    },
    end: function () {
      return this.prevObject || this.constructor(null);
    },
    push: core_push,
    sort: [].sort,
    splice: [].splice
  };
  jQuery.fn.init.prototype = jQuery.fn;
  jQuery.extend = jQuery.fn.extend = function () {
    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
    if (typeof target === 'boolean') {
      deep = target;
      target = arguments[1] || {};
      i = 2;
    }
    if (typeof target !== 'object' && !jQuery.isFunction(target)) {
      target = {};
    }
    if (length === i) {
      target = this;
      --i;
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && jQuery.isArray(src) ? src : [];
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }
            target[name] = jQuery.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  };
  jQuery.extend({
    noConflict: function (deep) {
      if (window.$ === jQuery) {
        window.$ = _$;
      }
      if (deep && window.jQuery === jQuery) {
        window.jQuery = _jQuery;
      }
      return jQuery;
    },
    isReady: false,
    readyWait: 1,
    holdReady: function (hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    },
    ready: function (wait) {
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      }
      if (!document.body) {
        return setTimeout(jQuery.ready, 1);
      }
      jQuery.isReady = true;
      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      }
      readyList.resolveWith(document, [jQuery]);
      if (jQuery.fn.trigger) {
        jQuery(document).trigger('ready').off('ready');
      }
    },
    isFunction: function (obj) {
      return jQuery.type(obj) === 'function';
    },
    isArray: Array.isArray || function (obj) {
      return jQuery.type(obj) === 'array';
    },
    isWindow: function (obj) {
      return obj != null && obj == obj.window;
    },
    isNumeric: function (obj) {
      return !isNaN(parseFloat(obj)) && isFinite(obj);
    },
    type: function (obj) {
      return obj == null ? String(obj) : class2type[core_toString.call(obj)] || 'object';
    },
    isPlainObject: function (obj) {
      if (!obj || jQuery.type(obj) !== 'object' || obj.nodeType || jQuery.isWindow(obj)) {
        return false;
      }
      try {
        if (obj.constructor && !core_hasOwn.call(obj, 'constructor') && !core_hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
          return false;
        }
      } catch (e) {
        return false;
      }
      var key;
      for (key in obj) {
      }
      return key === undefined || core_hasOwn.call(obj, key);
    },
    isEmptyObject: function (obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    },
    error: function (msg) {
      throw new Error(msg);
    },
    parseHTML: function (data, context, scripts) {
      var parsed;
      if (!data || typeof data !== 'string') {
        return null;
      }
      if (typeof context === 'boolean') {
        scripts = context;
        context = 0;
      }
      context = context || document;
      if (parsed = rsingleTag.exec(data)) {
        return [context.createElement(parsed[1])];
      }
      parsed = jQuery.buildFragment([data], context, scripts ? null : []);
      return jQuery.merge([], (parsed.cacheable ? jQuery.clone(parsed.fragment) : parsed.fragment).childNodes);
    },
    parseJSON: function (data) {
      if (!data || typeof data !== 'string') {
        return null;
      }
      data = jQuery.trim(data);
      if (window.JSON && window.JSON.parse) {
        return window.JSON.parse(data);
      }
      if (rvalidchars.test(data.replace(rvalidescape, '@').replace(rvalidtokens, ']').replace(rvalidbraces, ''))) {
        return new Function('return ' + data)();
      }
      jQuery.error('Invalid JSON: ' + data);
    },
    parseXML: function (data) {
      var xml, tmp;
      if (!data || typeof data !== 'string') {
        return null;
      }
      try {
        if (window.DOMParser) {
          tmp = new DOMParser();
          xml = tmp.parseFromString(data, 'text/xml');
        } else {
          xml = new ActiveXObject('Microsoft.XMLDOM');
          xml.async = 'false';
          xml.loadXML(data);
        }
      } catch (e) {
        xml = undefined;
      }
      if (!xml || !xml.documentElement || xml.getElementsByTagName('parsererror').length) {
        jQuery.error('Invalid XML: ' + data);
      }
      return xml;
    },
    noop: function () {
    },
    globalEval: function (data) {
      if (data && core_rnotwhite.test(data)) {
        (window.execScript || function (data) {
          window['eval'].call(window, data);
        })(data);
      }
    },
    camelCase: function (string) {
      return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, fcamelCase);
    },
    nodeName: function (elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    each: function (obj, callback, args) {
      var name, i = 0, length = obj.length, isObj = length === undefined || jQuery.isFunction(obj);
      if (args) {
        if (isObj) {
          for (name in obj) {
            if (callback.apply(obj[name], args) === false) {
              break;
            }
          }
        } else {
          for (; i < length;) {
            if (callback.apply(obj[i++], args) === false) {
              break;
            }
          }
        }
      } else {
        if (isObj) {
          for (name in obj) {
            if (callback.call(obj[name], name, obj[name]) === false) {
              break;
            }
          }
        } else {
          for (; i < length;) {
            if (callback.call(obj[i], i, obj[i++]) === false) {
              break;
            }
          }
        }
      }
      return obj;
    },
    trim: core_trim && !core_trim.call('\ufeff\xa0') ? function (text) {
      return text == null ? '' : core_trim.call(text);
    } : function (text) {
      return text == null ? '' : (text + '').replace(rtrim, '');
    },
    makeArray: function (arr, results) {
      var type, ret = results || [];
      if (arr != null) {
        type = jQuery.type(arr);
        if (arr.length == null || type === 'string' || type === 'function' || type === 'regexp' || jQuery.isWindow(arr)) {
          core_push.call(ret, arr);
        } else {
          jQuery.merge(ret, arr);
        }
      }
      return ret;
    },
    inArray: function (elem, arr, i) {
      var len;
      if (arr) {
        if (core_indexOf) {
          return core_indexOf.call(arr, elem, i);
        }
        len = arr.length;
        i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
        for (; i < len; i++) {
          if (i in arr && arr[i] === elem) {
            return i;
          }
        }
      }
      return -1;
    },
    merge: function (first, second) {
      var l = second.length, i = first.length, j = 0;
      if (typeof l === 'number') {
        for (; j < l; j++) {
          first[i++] = second[j];
        }
      } else {
        while (second[j] !== undefined) {
          first[i++] = second[j++];
        }
      }
      first.length = i;
      return first;
    },
    grep: function (elems, callback, inv) {
      var retVal, ret = [], i = 0, length = elems.length;
      inv = !!inv;
      for (; i < length; i++) {
        retVal = !!callback(elems[i], i);
        if (inv !== retVal) {
          ret.push(elems[i]);
        }
      }
      return ret;
    },
    map: function (elems, callback, arg) {
      var value, key, ret = [], i = 0, length = elems.length, isArray = elems instanceof jQuery || length !== undefined && typeof length === 'number' && (length > 0 && elems[0] && elems[length - 1] || length === 0 || jQuery.isArray(elems));
      if (isArray) {
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret[ret.length] = value;
          }
        }
      } else {
        for (key in elems) {
          value = callback(elems[key], key, arg);
          if (value != null) {
            ret[ret.length] = value;
          }
        }
      }
      return ret.concat.apply([], ret);
    },
    guid: 1,
    proxy: function (fn, context) {
      var tmp, args, proxy;
      if (typeof context === 'string') {
        tmp = fn[context];
        context = fn;
        fn = tmp;
      }
      if (!jQuery.isFunction(fn)) {
        return undefined;
      }
      args = core_slice.call(arguments, 2);
      proxy = function () {
        return fn.apply(context, args.concat(core_slice.call(arguments)));
      };
      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
      return proxy;
    },
    access: function (elems, fn, key, value, chainable, emptyGet, pass) {
      var exec, bulk = key == null, i = 0, length = elems.length;
      if (key && typeof key === 'object') {
        for (i in key) {
          jQuery.access(elems, fn, i, key[i], 1, emptyGet, value);
        }
        chainable = 1;
      } else if (value !== undefined) {
        exec = pass === undefined && jQuery.isFunction(value);
        if (bulk) {
          if (exec) {
            exec = fn;
            fn = function (elem, key, value) {
              return exec.call(jQuery(elem), value);
            };
          } else {
            fn.call(elems, value);
            fn = null;
          }
        }
        if (fn) {
          for (; i < length; i++) {
            fn(elems[i], key, exec ? value.call(elems[i], i, fn(elems[i], key)) : value, pass);
          }
        }
        chainable = 1;
      }
      return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
    },
    now: function () {
      return new Date().getTime();
    }
  });
  jQuery.ready.promise = function (obj) {
    if (!readyList) {
      readyList = jQuery.Deferred();
      if (document.readyState === 'complete') {
        setTimeout(jQuery.ready, 1);
      } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', DOMContentLoaded, false);
        window.addEventListener('load', jQuery.ready, false);
      } else {
        document.attachEvent('onreadystatechange', DOMContentLoaded);
        window.attachEvent('onload', jQuery.ready);
        var top = false;
        try {
          top = window.frameElement == null && document.documentElement;
        } catch (e) {
        }
        if (top && top.doScroll) {
          (function doScrollCheck() {
            if (!jQuery.isReady) {
              try {
                top.doScroll('left');
              } catch (e) {
                return setTimeout(doScrollCheck, 50);
              }
              jQuery.ready();
            }
          }());
        }
      }
    }
    return readyList.promise(obj);
  };
  jQuery.each('Boolean Number String Function Array Date RegExp Object'.split(' '), function (i, name) {
    class2type['[object ' + name + ']'] = name.toLowerCase();
  });
  rootjQuery = jQuery(document);
  var optionsCache = {};
  function createOptions(options) {
    var object = optionsCache[options] = {};
    jQuery.each(options.split(core_rspace), function (_, flag) {
      object[flag] = true;
    });
    return object;
  }
  jQuery.Callbacks = function (options) {
    options = typeof options === 'string' ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
    var memory, fired, firing, firingStart, firingLength, firingIndex, list = [], stack = !options.once && [], fire = function (data) {
        memory = options.memory && data;
        fired = true;
        firingIndex = firingStart || 0;
        firingStart = 0;
        firingLength = list.length;
        firing = true;
        for (; list && firingIndex < firingLength; firingIndex++) {
          if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
            memory = false;
            break;
          }
        }
        firing = false;
        if (list) {
          if (stack) {
            if (stack.length) {
              fire(stack.shift());
            }
          } else if (memory) {
            list = [];
          } else {
            self.disable();
          }
        }
      }, self = {
        add: function () {
          if (list) {
            var start = list.length;
            (function add(args) {
              jQuery.each(args, function (_, arg) {
                var type = jQuery.type(arg);
                if (type === 'function') {
                  if (!options.unique || !self.has(arg)) {
                    list.push(arg);
                  }
                } else if (arg && arg.length && type !== 'string') {
                  add(arg);
                }
              });
            }(arguments));
            if (firing) {
              firingLength = list.length;
            } else if (memory) {
              firingStart = start;
              fire(memory);
            }
          }
          return this;
        },
        remove: function () {
          if (list) {
            jQuery.each(arguments, function (_, arg) {
              var index;
              while ((index = jQuery.inArray(arg, list, index)) > -1) {
                list.splice(index, 1);
                if (firing) {
                  if (index <= firingLength) {
                    firingLength--;
                  }
                  if (index <= firingIndex) {
                    firingIndex--;
                  }
                }
              }
            });
          }
          return this;
        },
        has: function (fn) {
          return jQuery.inArray(fn, list) > -1;
        },
        empty: function () {
          list = [];
          return this;
        },
        disable: function () {
          list = stack = memory = undefined;
          return this;
        },
        disabled: function () {
          return !list;
        },
        lock: function () {
          stack = undefined;
          if (!memory) {
            self.disable();
          }
          return this;
        },
        locked: function () {
          return !stack;
        },
        fireWith: function (context, args) {
          args = args || [];
          args = [
            context,
            args.slice ? args.slice() : args
          ];
          if (list && (!fired || stack)) {
            if (firing) {
              stack.push(args);
            } else {
              fire(args);
            }
          }
          return this;
        },
        fire: function () {
          self.fireWith(this, arguments);
          return this;
        },
        fired: function () {
          return !!fired;
        }
      };
    return self;
  };
  jQuery.extend({
    Deferred: function (func) {
      var tuples = [
          [
            'resolve',
            'done',
            jQuery.Callbacks('once memory'),
            'resolved'
          ],
          [
            'reject',
            'fail',
            jQuery.Callbacks('once memory'),
            'rejected'
          ],
          [
            'notify',
            'progress',
            jQuery.Callbacks('memory')
          ]
        ], state = 'pending', promise = {
          state: function () {
            return state;
          },
          always: function () {
            deferred.done(arguments).fail(arguments);
            return this;
          },
          then: function () {
            var fns = arguments;
            return jQuery.Deferred(function (newDefer) {
              jQuery.each(tuples, function (i, tuple) {
                var action = tuple[0], fn = fns[i];
                deferred[tuple[1]](jQuery.isFunction(fn) ? function () {
                  var returned = fn.apply(this, arguments);
                  if (returned && jQuery.isFunction(returned.promise)) {
                    returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
                  } else {
                    newDefer[action + 'With'](this === deferred ? newDefer : this, [returned]);
                  }
                } : newDefer[action]);
              });
              fns = null;
            }).promise();
          },
          promise: function (obj) {
            return obj != null ? jQuery.extend(obj, promise) : promise;
          }
        }, deferred = {};
      promise.pipe = promise.then;
      jQuery.each(tuples, function (i, tuple) {
        var list = tuple[2], stateString = tuple[3];
        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(function () {
            state = stateString;
          }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
        }
        deferred[tuple[0]] = list.fire;
        deferred[tuple[0] + 'With'] = list.fireWith;
      });
      promise.promise(deferred);
      if (func) {
        func.call(deferred, deferred);
      }
      return deferred;
    },
    when: function (subordinate) {
      var i = 0, resolveValues = core_slice.call(arguments), length = resolveValues.length, remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = remaining === 1 ? subordinate : jQuery.Deferred(), updateFunc = function (i, contexts, values) {
          return function (value) {
            contexts[i] = this;
            values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
            if (values === progressValues) {
              deferred.notifyWith(contexts, values);
            } else if (!--remaining) {
              deferred.resolveWith(contexts, values);
            }
          };
        }, progressValues, progressContexts, resolveContexts;
      if (length > 1) {
        progressValues = new Array(length);
        progressContexts = new Array(length);
        resolveContexts = new Array(length);
        for (; i < length; i++) {
          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
            resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
          } else {
            --remaining;
          }
        }
      }
      if (!remaining) {
        deferred.resolveWith(resolveContexts, resolveValues);
      }
      return deferred.promise();
    }
  });
  jQuery.support = function () {
    var support, all, a, select, opt, input, fragment, eventName, i, isSupported, clickFn, div = document.createElement('div');
    div.setAttribute('className', 't');
    div.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>';
    all = div.getElementsByTagName('*');
    a = div.getElementsByTagName('a')[0];
    if (!all || !a || !all.length) {
      return {};
    }
    select = document.createElement('select');
    opt = select.appendChild(document.createElement('option'));
    input = div.getElementsByTagName('input')[0];
    a.style.cssText = 'top:1px;float:left;opacity:.5';
    support = {
      leadingWhitespace: div.firstChild.nodeType === 3,
      tbody: !div.getElementsByTagName('tbody').length,
      htmlSerialize: !!div.getElementsByTagName('link').length,
      style: /top/.test(a.getAttribute('style')),
      hrefNormalized: a.getAttribute('href') === '/a',
      opacity: /^0.5/.test(a.style.opacity),
      cssFloat: !!a.style.cssFloat,
      checkOn: input.value === 'on',
      optSelected: opt.selected,
      getSetAttribute: div.className !== 't',
      enctype: !!document.createElement('form').enctype,
      html5Clone: document.createElement('nav').cloneNode(true).outerHTML !== '<:nav></:nav>',
      boxModel: document.compatMode === 'CSS1Compat',
      submitBubbles: true,
      changeBubbles: true,
      focusinBubbles: false,
      deleteExpando: true,
      noCloneEvent: true,
      inlineBlockNeedsLayout: false,
      shrinkWrapBlocks: false,
      reliableMarginRight: true,
      boxSizingReliable: true,
      pixelPosition: false
    };
    input.checked = true;
    support.noCloneChecked = input.cloneNode(true).checked;
    select.disabled = true;
    support.optDisabled = !opt.disabled;
    try {
      delete div.test;
    } catch (e) {
      support.deleteExpando = false;
    }
    if (!div.addEventListener && div.attachEvent && div.fireEvent) {
      div.attachEvent('onclick', clickFn = function () {
        support.noCloneEvent = false;
      });
      div.cloneNode(true).fireEvent('onclick');
      div.detachEvent('onclick', clickFn);
    }
    input = document.createElement('input');
    input.value = 't';
    input.setAttribute('type', 'radio');
    support.radioValue = input.value === 't';
    input.setAttribute('checked', 'checked');
    input.setAttribute('name', 't');
    div.appendChild(input);
    fragment = document.createDocumentFragment();
    fragment.appendChild(div.lastChild);
    support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
    support.appendChecked = input.checked;
    fragment.removeChild(input);
    fragment.appendChild(div);
    if (div.attachEvent) {
      for (i in {
          submit: true,
          change: true,
          focusin: true
        }) {
        eventName = 'on' + i;
        isSupported = eventName in div;
        if (!isSupported) {
          div.setAttribute(eventName, 'return;');
          isSupported = typeof div[eventName] === 'function';
        }
        support[i + 'Bubbles'] = isSupported;
      }
    }
    jQuery(function () {
      var container, div, tds, marginDiv, divReset = 'padding:0;margin:0;border:0;display:block;overflow:hidden;', body = document.getElementsByTagName('body')[0];
      if (!body) {
        return;
      }
      container = document.createElement('div');
      container.style.cssText = 'visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px';
      body.insertBefore(container, body.firstChild);
      div = document.createElement('div');
      container.appendChild(div);
      div.innerHTML = '<table><tr><td></td><td>t</td></tr></table>';
      tds = div.getElementsByTagName('td');
      tds[0].style.cssText = 'padding:0;margin:0;border:0;display:none';
      isSupported = tds[0].offsetHeight === 0;
      tds[0].style.display = '';
      tds[1].style.display = 'none';
      support.reliableHiddenOffsets = isSupported && tds[0].offsetHeight === 0;
      div.innerHTML = '';
      div.style.cssText = 'box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;';
      support.boxSizing = div.offsetWidth === 4;
      support.doesNotIncludeMarginInBodyOffset = body.offsetTop !== 1;
      if (window.getComputedStyle) {
        support.pixelPosition = (window.getComputedStyle(div, null) || {}).top !== '1%';
        support.boxSizingReliable = (window.getComputedStyle(div, null) || { width: '4px' }).width === '4px';
        marginDiv = document.createElement('div');
        marginDiv.style.cssText = div.style.cssText = divReset;
        marginDiv.style.marginRight = marginDiv.style.width = '0';
        div.style.width = '1px';
        div.appendChild(marginDiv);
        support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight);
      }
      if (typeof div.style.zoom !== 'undefined') {
        div.innerHTML = '';
        div.style.cssText = divReset + 'width:1px;padding:1px;display:inline;zoom:1';
        support.inlineBlockNeedsLayout = div.offsetWidth === 3;
        div.style.display = 'block';
        div.style.overflow = 'visible';
        div.innerHTML = '<div></div>';
        div.firstChild.style.width = '5px';
        support.shrinkWrapBlocks = div.offsetWidth !== 3;
        container.style.zoom = 1;
      }
      body.removeChild(container);
      container = div = tds = marginDiv = null;
    });
    fragment.removeChild(div);
    all = a = select = opt = input = fragment = div = null;
    return support;
  }();
  var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, rmultiDash = /([A-Z])/g;
  jQuery.extend({
    cache: {},
    deletedIds: [],
    uuid: 0,
    expando: 'jQuery' + (jQuery.fn.jquery + Math.random()).replace(/\D/g, ''),
    noData: {
      'embed': true,
      'object': 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000',
      'applet': true
    },
    hasData: function (elem) {
      elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
      return !!elem && !isEmptyDataObject(elem);
    },
    data: function (elem, name, data, pvt) {
      if (!jQuery.acceptData(elem)) {
        return;
      }
      var thisCache, ret, internalKey = jQuery.expando, getByName = typeof name === 'string', isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
      if ((!id || !cache[id] || !pvt && !cache[id].data) && getByName && data === undefined) {
        return;
      }
      if (!id) {
        if (isNode) {
          elem[internalKey] = id = jQuery.deletedIds.pop() || jQuery.guid++;
        } else {
          id = internalKey;
        }
      }
      if (!cache[id]) {
        cache[id] = {};
        if (!isNode) {
          cache[id].toJSON = jQuery.noop;
        }
      }
      if (typeof name === 'object' || typeof name === 'function') {
        if (pvt) {
          cache[id] = jQuery.extend(cache[id], name);
        } else {
          cache[id].data = jQuery.extend(cache[id].data, name);
        }
      }
      thisCache = cache[id];
      if (!pvt) {
        if (!thisCache.data) {
          thisCache.data = {};
        }
        thisCache = thisCache.data;
      }
      if (data !== undefined) {
        thisCache[jQuery.camelCase(name)] = data;
      }
      if (getByName) {
        ret = thisCache[name];
        if (ret == null) {
          ret = thisCache[jQuery.camelCase(name)];
        }
      } else {
        ret = thisCache;
      }
      return ret;
    },
    removeData: function (elem, name, pvt) {
      if (!jQuery.acceptData(elem)) {
        return;
      }
      var thisCache, i, l, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[jQuery.expando] : jQuery.expando;
      if (!cache[id]) {
        return;
      }
      if (name) {
        thisCache = pvt ? cache[id] : cache[id].data;
        if (thisCache) {
          if (!jQuery.isArray(name)) {
            if (name in thisCache) {
              name = [name];
            } else {
              name = jQuery.camelCase(name);
              if (name in thisCache) {
                name = [name];
              } else {
                name = name.split(' ');
              }
            }
          }
          for (i = 0, l = name.length; i < l; i++) {
            delete thisCache[name[i]];
          }
          if (!(pvt ? isEmptyDataObject : jQuery.isEmptyObject)(thisCache)) {
            return;
          }
        }
      }
      if (!pvt) {
        delete cache[id].data;
        if (!isEmptyDataObject(cache[id])) {
          return;
        }
      }
      if (isNode) {
        jQuery.cleanData([elem], true);
      } else if (jQuery.support.deleteExpando || cache != cache.window) {
        delete cache[id];
      } else {
        cache[id] = null;
      }
    },
    _data: function (elem, name, data) {
      return jQuery.data(elem, name, data, true);
    },
    acceptData: function (elem) {
      var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];
      return !noData || noData !== true && elem.getAttribute('classid') === noData;
    }
  });
  jQuery.fn.extend({
    data: function (key, value) {
      var parts, part, attr, name, l, elem = this[0], i = 0, data = null;
      if (key === undefined) {
        if (this.length) {
          data = jQuery.data(elem);
          if (elem.nodeType === 1 && !jQuery._data(elem, 'parsedAttrs')) {
            attr = elem.attributes;
            for (l = attr.length; i < l; i++) {
              name = attr[i].name;
              if (!name.indexOf('data-')) {
                name = jQuery.camelCase(name.substring(5));
                dataAttr(elem, name, data[name]);
              }
            }
            jQuery._data(elem, 'parsedAttrs', true);
          }
        }
        return data;
      }
      if (typeof key === 'object') {
        return this.each(function () {
          jQuery.data(this, key);
        });
      }
      parts = key.split('.', 2);
      parts[1] = parts[1] ? '.' + parts[1] : '';
      part = parts[1] + '!';
      return jQuery.access(this, function (value) {
        if (value === undefined) {
          data = this.triggerHandler('getData' + part, [parts[0]]);
          if (data === undefined && elem) {
            data = jQuery.data(elem, key);
            data = dataAttr(elem, key, data);
          }
          return data === undefined && parts[1] ? this.data(parts[0]) : data;
        }
        parts[1] = value;
        this.each(function () {
          var self = jQuery(this);
          self.triggerHandler('setData' + part, parts);
          jQuery.data(this, key, value);
          self.triggerHandler('changeData' + part, parts);
        });
      }, null, value, arguments.length > 1, null, false);
    },
    removeData: function (key) {
      return this.each(function () {
        jQuery.removeData(this, key);
      });
    }
  });
  function dataAttr(elem, key, data) {
    if (data === undefined && elem.nodeType === 1) {
      var name = 'data-' + key.replace(rmultiDash, '-$1').toLowerCase();
      data = elem.getAttribute(name);
      if (typeof data === 'string') {
        try {
          data = data === 'true' ? true : data === 'false' ? false : data === 'null' ? null : +data + '' === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
        } catch (e) {
        }
        jQuery.data(elem, key, data);
      } else {
        data = undefined;
      }
    }
    return data;
  }
  function isEmptyDataObject(obj) {
    var name;
    for (name in obj) {
      if (name === 'data' && jQuery.isEmptyObject(obj[name])) {
        continue;
      }
      if (name !== 'toJSON') {
        return false;
      }
    }
    return true;
  }
  jQuery.extend({
    queue: function (elem, type, data) {
      var queue;
      if (elem) {
        type = (type || 'fx') + 'queue';
        queue = jQuery._data(elem, type);
        if (data) {
          if (!queue || jQuery.isArray(data)) {
            queue = jQuery._data(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }
        return queue || [];
      }
    },
    dequeue: function (elem, type) {
      type = type || 'fx';
      var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function () {
          jQuery.dequeue(elem, type);
        };
      if (fn === 'inprogress') {
        fn = queue.shift();
        startLength--;
      }
      if (fn) {
        if (type === 'fx') {
          queue.unshift('inprogress');
        }
        delete hooks.stop;
        fn.call(elem, next, hooks);
      }
      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    _queueHooks: function (elem, type) {
      var key = type + 'queueHooks';
      return jQuery._data(elem, key) || jQuery._data(elem, key, {
        empty: jQuery.Callbacks('once memory').add(function () {
          jQuery.removeData(elem, type + 'queue', true);
          jQuery.removeData(elem, key, true);
        })
      });
    }
  });
  jQuery.fn.extend({
    queue: function (type, data) {
      var setter = 2;
      if (typeof type !== 'string') {
        data = type;
        type = 'fx';
        setter--;
      }
      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }
      return data === undefined ? this : this.each(function () {
        var queue = jQuery.queue(this, type, data);
        jQuery._queueHooks(this, type);
        if (type === 'fx' && queue[0] !== 'inprogress') {
          jQuery.dequeue(this, type);
        }
      });
    },
    dequeue: function (type) {
      return this.each(function () {
        jQuery.dequeue(this, type);
      });
    },
    delay: function (time, type) {
      time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
      type = type || 'fx';
      return this.queue(type, function (next, hooks) {
        var timeout = setTimeout(next, time);
        hooks.stop = function () {
          clearTimeout(timeout);
        };
      });
    },
    clearQueue: function (type) {
      return this.queue(type || 'fx', []);
    },
    promise: function (type, obj) {
      var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function () {
          if (!--count) {
            defer.resolveWith(elements, [elements]);
          }
        };
      if (typeof type !== 'string') {
        obj = type;
        type = undefined;
      }
      type = type || 'fx';
      while (i--) {
        tmp = jQuery._data(elements[i], type + 'queueHooks');
        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }
      resolve();
      return defer.promise(obj);
    }
  });
  var nodeHook, boolHook, fixSpecified, rclass = /[\t\r\n]/g, rreturn = /\r/g, rtype = /^(?:button|input)$/i, rfocusable = /^(?:button|input|object|select|textarea)$/i, rclickable = /^a(?:rea|)$/i, rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, getSetAttribute = jQuery.support.getSetAttribute;
  jQuery.fn.extend({
    attr: function (name, value) {
      return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1);
    },
    removeAttr: function (name) {
      return this.each(function () {
        jQuery.removeAttr(this, name);
      });
    },
    prop: function (name, value) {
      return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    removeProp: function (name) {
      name = jQuery.propFix[name] || name;
      return this.each(function () {
        try {
          this[name] = undefined;
          delete this[name];
        } catch (e) {
        }
      });
    },
    addClass: function (value) {
      var classNames, i, l, elem, setClass, c, cl;
      if (jQuery.isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).addClass(value.call(this, j, this.className));
        });
      }
      if (value && typeof value === 'string') {
        classNames = value.split(core_rspace);
        for (i = 0, l = this.length; i < l; i++) {
          elem = this[i];
          if (elem.nodeType === 1) {
            if (!elem.className && classNames.length === 1) {
              elem.className = value;
            } else {
              setClass = ' ' + elem.className + ' ';
              for (c = 0, cl = classNames.length; c < cl; c++) {
                if (setClass.indexOf(' ' + classNames[c] + ' ') < 0) {
                  setClass += classNames[c] + ' ';
                }
              }
              elem.className = jQuery.trim(setClass);
            }
          }
        }
      }
      return this;
    },
    removeClass: function (value) {
      var removes, className, elem, c, cl, i, l;
      if (jQuery.isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).removeClass(value.call(this, j, this.className));
        });
      }
      if (value && typeof value === 'string' || value === undefined) {
        removes = (value || '').split(core_rspace);
        for (i = 0, l = this.length; i < l; i++) {
          elem = this[i];
          if (elem.nodeType === 1 && elem.className) {
            className = (' ' + elem.className + ' ').replace(rclass, ' ');
            for (c = 0, cl = removes.length; c < cl; c++) {
              while (className.indexOf(' ' + removes[c] + ' ') >= 0) {
                className = className.replace(' ' + removes[c] + ' ', ' ');
              }
            }
            elem.className = value ? jQuery.trim(className) : '';
          }
        }
      }
      return this;
    },
    toggleClass: function (value, stateVal) {
      var type = typeof value, isBool = typeof stateVal === 'boolean';
      if (jQuery.isFunction(value)) {
        return this.each(function (i) {
          jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
        });
      }
      return this.each(function () {
        if (type === 'string') {
          var className, i = 0, self = jQuery(this), state = stateVal, classNames = value.split(core_rspace);
          while (className = classNames[i++]) {
            state = isBool ? state : !self.hasClass(className);
            self[state ? 'addClass' : 'removeClass'](className);
          }
        } else if (type === 'undefined' || type === 'boolean') {
          if (this.className) {
            jQuery._data(this, '__className__', this.className);
          }
          this.className = this.className || value === false ? '' : jQuery._data(this, '__className__') || '';
        }
      });
    },
    hasClass: function (selector) {
      var className = ' ' + selector + ' ', i = 0, l = this.length;
      for (; i < l; i++) {
        if (this[i].nodeType === 1 && (' ' + this[i].className + ' ').replace(rclass, ' ').indexOf(className) >= 0) {
          return true;
        }
      }
      return false;
    },
    val: function (value) {
      var hooks, ret, isFunction, elem = this[0];
      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
          if (hooks && 'get' in hooks && (ret = hooks.get(elem, 'value')) !== undefined) {
            return ret;
          }
          ret = elem.value;
          return typeof ret === 'string' ? ret.replace(rreturn, '') : ret == null ? '' : ret;
        }
        return;
      }
      isFunction = jQuery.isFunction(value);
      return this.each(function (i) {
        var val, self = jQuery(this);
        if (this.nodeType !== 1) {
          return;
        }
        if (isFunction) {
          val = value.call(this, i, self.val());
        } else {
          val = value;
        }
        if (val == null) {
          val = '';
        } else if (typeof val === 'number') {
          val += '';
        } else if (jQuery.isArray(val)) {
          val = jQuery.map(val, function (value) {
            return value == null ? '' : value + '';
          });
        }
        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
        if (!hooks || !('set' in hooks) || hooks.set(this, val, 'value') === undefined) {
          this.value = val;
        }
      });
    }
  });
  jQuery.extend({
    valHooks: {
      option: {
        get: function (elem) {
          var val = elem.attributes.value;
          return !val || val.specified ? elem.value : elem.text;
        }
      },
      select: {
        get: function (elem) {
          var value, option, options = elem.options, index = elem.selectedIndex, one = elem.type === 'select-one' || index < 0, values = one ? null : [], max = one ? index + 1 : options.length, i = index < 0 ? max : one ? index : 0;
          for (; i < max; i++) {
            option = options[i];
            if ((option.selected || i === index) && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute('disabled') === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, 'optgroup'))) {
              value = jQuery(option).val();
              if (one) {
                return value;
              }
              values.push(value);
            }
          }
          return values;
        },
        set: function (elem, value) {
          var values = jQuery.makeArray(value);
          jQuery(elem).find('option').each(function () {
            this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0;
          });
          if (!values.length) {
            elem.selectedIndex = -1;
          }
          return values;
        }
      }
    },
    attrFn: {},
    attr: function (elem, name, value, pass) {
      var ret, hooks, notxml, nType = elem.nodeType;
      if (!elem || nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (pass && jQuery.isFunction(jQuery.fn[name])) {
        return jQuery(elem)[name](value);
      }
      if (typeof elem.getAttribute === 'undefined') {
        return jQuery.prop(elem, name, value);
      }
      notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
      if (notxml) {
        name = name.toLowerCase();
        hooks = jQuery.attrHooks[name] || (rboolean.test(name) ? boolHook : nodeHook);
      }
      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
          return;
        } else if (hooks && 'set' in hooks && notxml && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        } else {
          elem.setAttribute(name, value + '');
          return value;
        }
      } else if (hooks && 'get' in hooks && notxml && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      } else {
        ret = elem.getAttribute(name);
        return ret === null ? undefined : ret;
      }
    },
    removeAttr: function (elem, value) {
      var propName, attrNames, name, isBool, i = 0;
      if (value && elem.nodeType === 1) {
        attrNames = value.split(core_rspace);
        for (; i < attrNames.length; i++) {
          name = attrNames[i];
          if (name) {
            propName = jQuery.propFix[name] || name;
            isBool = rboolean.test(name);
            if (!isBool) {
              jQuery.attr(elem, name, '');
            }
            elem.removeAttribute(getSetAttribute ? name : propName);
            if (isBool && propName in elem) {
              elem[propName] = false;
            }
          }
        }
      }
    },
    attrHooks: {
      type: {
        set: function (elem, value) {
          if (rtype.test(elem.nodeName) && elem.parentNode) {
            jQuery.error('type property can\'t be changed');
          } else if (!jQuery.support.radioValue && value === 'radio' && jQuery.nodeName(elem, 'input')) {
            var val = elem.value;
            elem.setAttribute('type', value);
            if (val) {
              elem.value = val;
            }
            return value;
          }
        }
      },
      value: {
        get: function (elem, name) {
          if (nodeHook && jQuery.nodeName(elem, 'button')) {
            return nodeHook.get(elem, name);
          }
          return name in elem ? elem.value : null;
        },
        set: function (elem, value, name) {
          if (nodeHook && jQuery.nodeName(elem, 'button')) {
            return nodeHook.set(elem, value, name);
          }
          elem.value = value;
        }
      }
    },
    propFix: {
      tabindex: 'tabIndex',
      readonly: 'readOnly',
      'for': 'htmlFor',
      'class': 'className',
      maxlength: 'maxLength',
      cellspacing: 'cellSpacing',
      cellpadding: 'cellPadding',
      rowspan: 'rowSpan',
      colspan: 'colSpan',
      usemap: 'useMap',
      frameborder: 'frameBorder',
      contenteditable: 'contentEditable'
    },
    prop: function (elem, name, value) {
      var ret, hooks, notxml, nType = elem.nodeType;
      if (!elem || nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
      if (notxml) {
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }
      if (value !== undefined) {
        if (hooks && 'set' in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        } else {
          return elem[name] = value;
        }
      } else {
        if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
          return ret;
        } else {
          return elem[name];
        }
      }
    },
    propHooks: {
      tabIndex: {
        get: function (elem) {
          var attributeNode = elem.getAttributeNode('tabindex');
          return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined;
        }
      }
    }
  });
  boolHook = {
    get: function (elem, name) {
      var attrNode, property = jQuery.prop(elem, name);
      return property === true || typeof property !== 'boolean' && (attrNode = elem.getAttributeNode(name)) && attrNode.nodeValue !== false ? name.toLowerCase() : undefined;
    },
    set: function (elem, value, name) {
      var propName;
      if (value === false) {
        jQuery.removeAttr(elem, name);
      } else {
        propName = jQuery.propFix[name] || name;
        if (propName in elem) {
          elem[propName] = true;
        }
        elem.setAttribute(name, name.toLowerCase());
      }
      return name;
    }
  };
  if (!getSetAttribute) {
    fixSpecified = {
      name: true,
      id: true,
      coords: true
    };
    nodeHook = jQuery.valHooks.button = {
      get: function (elem, name) {
        var ret;
        ret = elem.getAttributeNode(name);
        return ret && (fixSpecified[name] ? ret.value !== '' : ret.specified) ? ret.value : undefined;
      },
      set: function (elem, value, name) {
        var ret = elem.getAttributeNode(name);
        if (!ret) {
          ret = document.createAttribute(name);
          elem.setAttributeNode(ret);
        }
        return ret.value = value + '';
      }
    };
    jQuery.each([
      'width',
      'height'
    ], function (i, name) {
      jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
        set: function (elem, value) {
          if (value === '') {
            elem.setAttribute(name, 'auto');
            return value;
          }
        }
      });
    });
    jQuery.attrHooks.contenteditable = {
      get: nodeHook.get,
      set: function (elem, value, name) {
        if (value === '') {
          value = 'false';
        }
        nodeHook.set(elem, value, name);
      }
    };
  }
  if (!jQuery.support.hrefNormalized) {
    jQuery.each([
      'href',
      'src',
      'width',
      'height'
    ], function (i, name) {
      jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
        get: function (elem) {
          var ret = elem.getAttribute(name, 2);
          return ret === null ? undefined : ret;
        }
      });
    });
  }
  if (!jQuery.support.style) {
    jQuery.attrHooks.style = {
      get: function (elem) {
        return elem.style.cssText.toLowerCase() || undefined;
      },
      set: function (elem, value) {
        return elem.style.cssText = value + '';
      }
    };
  }
  if (!jQuery.support.optSelected) {
    jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
      get: function (elem) {
        var parent = elem.parentNode;
        if (parent) {
          parent.selectedIndex;
          if (parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
        }
        return null;
      }
    });
  }
  if (!jQuery.support.enctype) {
    jQuery.propFix.enctype = 'encoding';
  }
  if (!jQuery.support.checkOn) {
    jQuery.each([
      'radio',
      'checkbox'
    ], function () {
      jQuery.valHooks[this] = {
        get: function (elem) {
          return elem.getAttribute('value') === null ? 'on' : elem.value;
        }
      };
    });
  }
  jQuery.each([
    'radio',
    'checkbox'
  ], function () {
    jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {
      set: function (elem, value) {
        if (jQuery.isArray(value)) {
          return elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0;
        }
      }
    });
  });
  var rformElems = /^(?:textarea|input|select)$/i, rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/, rhoverHack = /(?:^|\s)hover(\.\S+|)\b/, rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, hoverHack = function (events) {
      return jQuery.event.special.hover ? events : events.replace(rhoverHack, 'mouseenter$1 mouseleave$1');
    };
  jQuery.event = {
    add: function (elem, types, handler, data, selector) {
      var elemData, eventHandle, events, t, tns, type, namespaces, handleObj, handleObjIn, handlers, special;
      if (elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data(elem))) {
        return;
      }
      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      }
      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      }
      events = elemData.events;
      if (!events) {
        elemData.events = events = {};
      }
      eventHandle = elemData.handle;
      if (!eventHandle) {
        elemData.handle = eventHandle = function (e) {
          return typeof jQuery !== 'undefined' && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined;
        };
        eventHandle.elem = elem;
      }
      types = jQuery.trim(hoverHack(types)).split(' ');
      for (t = 0; t < types.length; t++) {
        tns = rtypenamespace.exec(types[t]) || [];
        type = tns[1];
        namespaces = (tns[2] || '').split('.').sort();
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        special = jQuery.event.special[type] || {};
        handleObj = jQuery.extend({
          type: type,
          origType: tns[1],
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join('.')
        }, handleObjIn);
        handlers = events[type];
        if (!handlers) {
          handlers = events[type] = [];
          handlers.delegateCount = 0;
          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle, false);
            } else if (elem.attachEvent) {
              elem.attachEvent('on' + type, eventHandle);
            }
          }
        }
        if (special.add) {
          special.add.call(elem, handleObj);
          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        }
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        }
        jQuery.event.global[type] = true;
      }
      elem = null;
    },
    global: {},
    remove: function (elem, types, handler, selector, mappedTypes) {
      var t, tns, type, origType, namespaces, origCount, j, events, special, eventType, handleObj, elemData = jQuery.hasData(elem) && jQuery._data(elem);
      if (!elemData || !(events = elemData.events)) {
        return;
      }
      types = jQuery.trim(hoverHack(types || '')).split(' ');
      for (t = 0; t < types.length; t++) {
        tns = rtypenamespace.exec(types[t]) || [];
        type = origType = tns[1];
        namespaces = tns[2];
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        eventType = events[type] || [];
        origCount = eventType.length;
        namespaces = namespaces ? new RegExp('(^|\\.)' + namespaces.split('.').sort().join('\\.(?:.*\\.|)') + '(\\.|$)') : null;
        for (j = 0; j < eventType.length; j++) {
          handleObj = eventType[j];
          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!namespaces || namespaces.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === '**' && handleObj.selector)) {
            eventType.splice(j--, 1);
            if (handleObj.selector) {
              eventType.delegateCount--;
            }
            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        }
        if (eventType.length === 0 && origCount !== eventType.length) {
          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery.removeEvent(elem, type, elemData.handle);
          }
          delete events[type];
        }
      }
      if (jQuery.isEmptyObject(events)) {
        delete elemData.handle;
        jQuery.removeData(elem, 'events', true);
      }
    },
    customEvent: {
      'getData': true,
      'setData': true,
      'changeData': true
    },
    trigger: function (event, data, elem, onlyHandlers) {
      if (elem && (elem.nodeType === 3 || elem.nodeType === 8)) {
        return;
      }
      var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType, type = event.type || event, namespaces = [];
      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
      }
      if (type.indexOf('!') >= 0) {
        type = type.slice(0, -1);
        exclusive = true;
      }
      if (type.indexOf('.') >= 0) {
        namespaces = type.split('.');
        type = namespaces.shift();
        namespaces.sort();
      }
      if ((!elem || jQuery.event.customEvent[type]) && !jQuery.event.global[type]) {
        return;
      }
      event = typeof event === 'object' ? event[jQuery.expando] ? event : new jQuery.Event(type, event) : new jQuery.Event(type);
      event.type = type;
      event.isTrigger = true;
      event.exclusive = exclusive;
      event.namespace = namespaces.join('.');
      event.namespace_re = event.namespace ? new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)') : null;
      ontype = type.indexOf(':') < 0 ? 'on' + type : '';
      if (!elem) {
        cache = jQuery.cache;
        for (i in cache) {
          if (cache[i].events && cache[i].events[type]) {
            jQuery.event.trigger(event, data, cache[i].handle.elem, true);
          }
        }
        return;
      }
      event.result = undefined;
      if (!event.target) {
        event.target = elem;
      }
      data = data != null ? jQuery.makeArray(data) : [];
      data.unshift(event);
      special = jQuery.event.special[type] || {};
      if (special.trigger && special.trigger.apply(elem, data) === false) {
        return;
      }
      eventPath = [[
          elem,
          special.bindType || type
        ]];
      if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
        bubbleType = special.delegateType || type;
        cur = rfocusMorph.test(bubbleType + type) ? elem : elem.parentNode;
        for (old = elem; cur; cur = cur.parentNode) {
          eventPath.push([
            cur,
            bubbleType
          ]);
          old = cur;
        }
        if (old === (elem.ownerDocument || document)) {
          eventPath.push([
            old.defaultView || old.parentWindow || window,
            bubbleType
          ]);
        }
      }
      for (i = 0; i < eventPath.length && !event.isPropagationStopped(); i++) {
        cur = eventPath[i][0];
        event.type = eventPath[i][1];
        handle = (jQuery._data(cur, 'events') || {})[event.type] && jQuery._data(cur, 'handle');
        if (handle) {
          handle.apply(cur, data);
        }
        handle = ontype && cur[ontype];
        if (handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === false) {
          event.preventDefault();
        }
      }
      event.type = type;
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default || special._default.apply(elem.ownerDocument, data) === false) && !(type === 'click' && jQuery.nodeName(elem, 'a')) && jQuery.acceptData(elem)) {
          if (ontype && elem[type] && (type !== 'focus' && type !== 'blur' || event.target.offsetWidth !== 0) && !jQuery.isWindow(elem)) {
            old = elem[ontype];
            if (old) {
              elem[ontype] = null;
            }
            jQuery.event.triggered = type;
            elem[type]();
            jQuery.event.triggered = undefined;
            if (old) {
              elem[ontype] = old;
            }
          }
        }
      }
      return event.result;
    },
    dispatch: function (event) {
      event = jQuery.event.fix(event || window.event);
      var i, j, cur, ret, selMatch, matched, matches, handleObj, sel, related, handlers = (jQuery._data(this, 'events') || {})[event.type] || [], delegateCount = handlers.delegateCount, args = core_slice.call(arguments), run_all = !event.exclusive && !event.namespace, special = jQuery.event.special[event.type] || {}, handlerQueue = [];
      args[0] = event;
      event.delegateTarget = this;
      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return;
      }
      if (delegateCount && !(event.button && event.type === 'click')) {
        for (cur = event.target; cur != this; cur = cur.parentNode || this) {
          if (cur.disabled !== true || event.type !== 'click') {
            selMatch = {};
            matches = [];
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i];
              sel = handleObj.selector;
              if (selMatch[sel] === undefined) {
                selMatch[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length;
              }
              if (selMatch[sel]) {
                matches.push(handleObj);
              }
            }
            if (matches.length) {
              handlerQueue.push({
                elem: cur,
                matches: matches
              });
            }
          }
        }
      }
      if (handlers.length > delegateCount) {
        handlerQueue.push({
          elem: this,
          matches: handlers.slice(delegateCount)
        });
      }
      for (i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++) {
        matched = handlerQueue[i];
        event.currentTarget = matched.elem;
        for (j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++) {
          handleObj = matched.matches[j];
          if (run_all || !event.namespace && !handleObj.namespace || event.namespace_re && event.namespace_re.test(handleObj.namespace)) {
            event.data = handleObj.data;
            event.handleObj = handleObj;
            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
            if (ret !== undefined) {
              event.result = ret;
              if (ret === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      }
      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }
      return event.result;
    },
    props: 'attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(' '),
    fixHooks: {},
    keyHooks: {
      props: 'char charCode key keyCode'.split(' '),
      filter: function (event, original) {
        if (event.which == null) {
          event.which = original.charCode != null ? original.charCode : original.keyCode;
        }
        return event;
      }
    },
    mouseHooks: {
      props: 'button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement'.split(' '),
      filter: function (event, original) {
        var eventDoc, doc, body, button = original.button, fromElement = original.fromElement;
        if (event.pageX == null && original.clientX != null) {
          eventDoc = event.target.ownerDocument || document;
          doc = eventDoc.documentElement;
          body = eventDoc.body;
          event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
          event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
        }
        if (!event.relatedTarget && fromElement) {
          event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
        }
        if (!event.which && button !== undefined) {
          event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
        }
        return event;
      }
    },
    fix: function (event) {
      if (event[jQuery.expando]) {
        return event;
      }
      var i, prop, originalEvent = event, fixHook = jQuery.event.fixHooks[event.type] || {}, copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
      event = jQuery.Event(originalEvent);
      for (i = copy.length; i;) {
        prop = copy[--i];
        event[prop] = originalEvent[prop];
      }
      if (!event.target) {
        event.target = originalEvent.srcElement || document;
      }
      if (event.target.nodeType === 3) {
        event.target = event.target.parentNode;
      }
      event.metaKey = !!event.metaKey;
      return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
    },
    special: {
      load: { noBubble: true },
      focus: { delegateType: 'focusin' },
      blur: { delegateType: 'focusout' },
      beforeunload: {
        setup: function (data, namespaces, eventHandle) {
          if (jQuery.isWindow(this)) {
            this.onbeforeunload = eventHandle;
          }
        },
        teardown: function (namespaces, eventHandle) {
          if (this.onbeforeunload === eventHandle) {
            this.onbeforeunload = null;
          }
        }
      }
    },
    simulate: function (type, elem, event, bubble) {
      var e = jQuery.extend(new jQuery.Event(), event, {
          type: type,
          isSimulated: true,
          originalEvent: {}
        });
      if (bubble) {
        jQuery.event.trigger(e, null, elem);
      } else {
        jQuery.event.dispatch.call(elem, e);
      }
      if (e.isDefaultPrevented()) {
        event.preventDefault();
      }
    }
  };
  jQuery.event.handle = jQuery.event.dispatch;
  jQuery.removeEvent = document.removeEventListener ? function (elem, type, handle) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle, false);
    }
  } : function (elem, type, handle) {
    var name = 'on' + type;
    if (elem.detachEvent) {
      if (typeof elem[name] === 'undefined') {
        elem[name] = null;
      }
      elem.detachEvent(name, handle);
    }
  };
  jQuery.Event = function (src, props) {
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    }
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;
      this.isDefaultPrevented = src.defaultPrevented || src.returnValue === false || src.getPreventDefault && src.getPreventDefault() ? returnTrue : returnFalse;
    } else {
      this.type = src;
    }
    if (props) {
      jQuery.extend(this, props);
    }
    this.timeStamp = src && src.timeStamp || jQuery.now();
    this[jQuery.expando] = true;
  };
  function returnFalse() {
    return false;
  }
  function returnTrue() {
    return true;
  }
  jQuery.Event.prototype = {
    preventDefault: function () {
      this.isDefaultPrevented = returnTrue;
      var e = this.originalEvent;
      if (!e) {
        return;
      }
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    },
    stopPropagation: function () {
      this.isPropagationStopped = returnTrue;
      var e = this.originalEvent;
      if (!e) {
        return;
      }
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      e.cancelBubble = true;
    },
    stopImmediatePropagation: function () {
      this.isImmediatePropagationStopped = returnTrue;
      this.stopPropagation();
    },
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse
  };
  jQuery.each({
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  }, function (orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function (event) {
        var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj, selector = handleObj.selector;
        if (!related || related !== target && !jQuery.contains(target, related)) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix;
        }
        return ret;
      }
    };
  });
  if (!jQuery.support.submitBubbles) {
    jQuery.event.special.submit = {
      setup: function () {
        if (jQuery.nodeName(this, 'form')) {
          return false;
        }
        jQuery.event.add(this, 'click._submit keypress._submit', function (e) {
          var elem = e.target, form = jQuery.nodeName(elem, 'input') || jQuery.nodeName(elem, 'button') ? elem.form : undefined;
          if (form && !jQuery._data(form, '_submit_attached')) {
            jQuery.event.add(form, 'submit._submit', function (event) {
              event._submit_bubble = true;
            });
            jQuery._data(form, '_submit_attached', true);
          }
        });
      },
      postDispatch: function (event) {
        if (event._submit_bubble) {
          delete event._submit_bubble;
          if (this.parentNode && !event.isTrigger) {
            jQuery.event.simulate('submit', this.parentNode, event, true);
          }
        }
      },
      teardown: function () {
        if (jQuery.nodeName(this, 'form')) {
          return false;
        }
        jQuery.event.remove(this, '._submit');
      }
    };
  }
  if (!jQuery.support.changeBubbles) {
    jQuery.event.special.change = {
      setup: function () {
        if (rformElems.test(this.nodeName)) {
          if (this.type === 'checkbox' || this.type === 'radio') {
            jQuery.event.add(this, 'propertychange._change', function (event) {
              if (event.originalEvent.propertyName === 'checked') {
                this._just_changed = true;
              }
            });
            jQuery.event.add(this, 'click._change', function (event) {
              if (this._just_changed && !event.isTrigger) {
                this._just_changed = false;
              }
              jQuery.event.simulate('change', this, event, true);
            });
          }
          return false;
        }
        jQuery.event.add(this, 'beforeactivate._change', function (e) {
          var elem = e.target;
          if (rformElems.test(elem.nodeName) && !jQuery._data(elem, '_change_attached')) {
            jQuery.event.add(elem, 'change._change', function (event) {
              if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                jQuery.event.simulate('change', this.parentNode, event, true);
              }
            });
            jQuery._data(elem, '_change_attached', true);
          }
        });
      },
      handle: function (event) {
        var elem = event.target;
        if (this !== elem || event.isSimulated || event.isTrigger || elem.type !== 'radio' && elem.type !== 'checkbox') {
          return event.handleObj.handler.apply(this, arguments);
        }
      },
      teardown: function () {
        jQuery.event.remove(this, '._change');
        return !rformElems.test(this.nodeName);
      }
    };
  }
  if (!jQuery.support.focusinBubbles) {
    jQuery.each({
      focus: 'focusin',
      blur: 'focusout'
    }, function (orig, fix) {
      var attaches = 0, handler = function (event) {
          jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
        };
      jQuery.event.special[fix] = {
        setup: function () {
          if (attaches++ === 0) {
            document.addEventListener(orig, handler, true);
          }
        },
        teardown: function () {
          if (--attaches === 0) {
            document.removeEventListener(orig, handler, true);
          }
        }
      };
    });
  }
  jQuery.fn.extend({
    on: function (types, selector, data, fn, one) {
      var origFn, type;
      if (typeof types === 'object') {
        if (typeof selector !== 'string') {
          data = data || selector;
          selector = undefined;
        }
        for (type in types) {
          this.on(type, selector, data, types[type], one);
        }
        return this;
      }
      if (data == null && fn == null) {
        fn = selector;
        data = selector = undefined;
      } else if (fn == null) {
        if (typeof selector === 'string') {
          fn = data;
          data = undefined;
        } else {
          fn = data;
          data = selector;
          selector = undefined;
        }
      }
      if (fn === false) {
        fn = returnFalse;
      } else if (!fn) {
        return this;
      }
      if (one === 1) {
        origFn = fn;
        fn = function (event) {
          jQuery().off(event);
          return origFn.apply(this, arguments);
        };
        fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
      }
      return this.each(function () {
        jQuery.event.add(this, types, fn, data, selector);
      });
    },
    one: function (types, selector, data, fn) {
      return this.on(types, selector, data, fn, 1);
    },
    off: function (types, selector, fn) {
      var handleObj, type;
      if (types && types.preventDefault && types.handleObj) {
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + '.' + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
        return this;
      }
      if (typeof types === 'object') {
        for (type in types) {
          this.off(type, selector, types[type]);
        }
        return this;
      }
      if (selector === false || typeof selector === 'function') {
        fn = selector;
        selector = undefined;
      }
      if (fn === false) {
        fn = returnFalse;
      }
      return this.each(function () {
        jQuery.event.remove(this, types, fn, selector);
      });
    },
    bind: function (types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function (types, fn) {
      return this.off(types, null, fn);
    },
    live: function (types, data, fn) {
      jQuery(this.context).on(types, this.selector, data, fn);
      return this;
    },
    die: function (types, fn) {
      jQuery(this.context).off(types, this.selector || '**', fn);
      return this;
    },
    delegate: function (selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function (selector, types, fn) {
      return arguments.length === 1 ? this.off(selector, '**') : this.off(types, selector || '**', fn);
    },
    trigger: function (type, data) {
      return this.each(function () {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function (type, data) {
      if (this[0]) {
        return jQuery.event.trigger(type, data, this[0], true);
      }
    },
    toggle: function (fn) {
      var args = arguments, guid = fn.guid || jQuery.guid++, i = 0, toggler = function (event) {
          var lastToggle = (jQuery._data(this, 'lastToggle' + fn.guid) || 0) % i;
          jQuery._data(this, 'lastToggle' + fn.guid, lastToggle + 1);
          event.preventDefault();
          return args[lastToggle].apply(this, arguments) || false;
        };
      toggler.guid = guid;
      while (i < args.length) {
        args[i++].guid = guid;
      }
      return this.click(toggler);
    },
    hover: function (fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    }
  });
  jQuery.each(('blur focus focusin focusout load resize scroll unload click dblclick ' + 'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' + 'change select submit keydown keypress keyup error contextmenu').split(' '), function (i, name) {
    jQuery.fn[name] = function (data, fn) {
      if (fn == null) {
        fn = data;
        data = null;
      }
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
    };
    if (rkeyEvent.test(name)) {
      jQuery.event.fixHooks[name] = jQuery.event.keyHooks;
    }
    if (rmouseEvent.test(name)) {
      jQuery.event.fixHooks[name] = jQuery.event.mouseHooks;
    }
  });
  (function (window, undefined) {
    var cachedruns, assertGetIdNotName, Expr, getText, isXML, contains, compile, sortOrder, hasDuplicate, outermostContext, baseHasDuplicate = true, strundefined = 'undefined', expando = ('sizcache' + Math.random()).replace('.', ''), Token = String, document = window.document, docElem = document.documentElement, dirruns = 0, done = 0, pop = [].pop, push = [].push, slice = [].slice, indexOf = [].indexOf || function (elem) {
        var i = 0, len = this.length;
        for (; i < len; i++) {
          if (this[i] === elem) {
            return i;
          }
        }
        return -1;
      }, markFunction = function (fn, value) {
        fn[expando] = value == null || value;
        return fn;
      }, createCache = function () {
        var cache = {}, keys = [];
        return markFunction(function (key, value) {
          if (keys.push(key) > Expr.cacheLength) {
            delete cache[keys.shift()];
          }
          return cache[key + ' '] = value;
        }, cache);
      }, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), whitespace = '[\\x20\\t\\r\\n\\f]', characterEncoding = '(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+', identifier = characterEncoding.replace('w', 'w#'), operators = '([*^$|!~]?=)', attributes = '\\[' + whitespace + '*(' + characterEncoding + ')' + whitespace + '*(?:' + operators + whitespace + '*(?:([\'"])((?:\\\\.|[^\\\\])*?)\\3|(' + identifier + ')|)|)' + whitespace + '*\\]', pseudos = ':(' + characterEncoding + ')(?:\\((?:([\'"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:' + attributes + ')|[^:]|\\\\.)*|.*))\\)|)', pos = ':(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + whitespace + '*((?:-\\d)?\\d*)' + whitespace + '*\\)|)(?=[^-]|$)', rtrim = new RegExp('^' + whitespace + '+|((?:^|[^\\\\])(?:\\\\.)*)' + whitespace + '+$', 'g'), rcomma = new RegExp('^' + whitespace + '*,' + whitespace + '*'), rcombinators = new RegExp('^' + whitespace + '*([\\x20\\t\\r\\n\\f>+~])' + whitespace + '*'), rpseudo = new RegExp(pseudos), rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, rnot = /^:not/, rsibling = /[\x20\t\r\n\f]*[+~]/, rendsWithNot = /:not\($/, rheader = /h\d/i, rinputs = /input|select|textarea|button/i, rbackslash = /\\(?!\\)/g, matchExpr = {
        'ID': new RegExp('^#(' + characterEncoding + ')'),
        'CLASS': new RegExp('^\\.(' + characterEncoding + ')'),
        'NAME': new RegExp('^\\[name=[\'"]?(' + characterEncoding + ')[\'"]?\\]'),
        'TAG': new RegExp('^(' + characterEncoding.replace('w', 'w*') + ')'),
        'ATTR': new RegExp('^' + attributes),
        'PSEUDO': new RegExp('^' + pseudos),
        'POS': new RegExp(pos, 'i'),
        'CHILD': new RegExp('^:(only|nth|first|last)-child(?:\\(' + whitespace + '*(even|odd|(([+-]|)(\\d*)n|)' + whitespace + '*(?:([+-]|)' + whitespace + '*(\\d+)|))' + whitespace + '*\\)|)', 'i'),
        'needsContext': new RegExp('^' + whitespace + '*[>+~]|' + pos, 'i')
      }, assert = function (fn) {
        var div = document.createElement('div');
        try {
          return fn(div);
        } catch (e) {
          return false;
        } finally {
          div = null;
        }
      }, assertTagNameNoComments = assert(function (div) {
        div.appendChild(document.createComment(''));
        return !div.getElementsByTagName('*').length;
      }), assertHrefNotNormalized = assert(function (div) {
        div.innerHTML = '<a href=\'#\'></a>';
        return div.firstChild && typeof div.firstChild.getAttribute !== strundefined && div.firstChild.getAttribute('href') === '#';
      }), assertAttributes = assert(function (div) {
        div.innerHTML = '<select></select>';
        var type = typeof div.lastChild.getAttribute('multiple');
        return type !== 'boolean' && type !== 'string';
      }), assertUsableClassName = assert(function (div) {
        div.innerHTML = '<div class=\'hidden e\'></div><div class=\'hidden\'></div>';
        if (!div.getElementsByClassName || !div.getElementsByClassName('e').length) {
          return false;
        }
        div.lastChild.className = 'e';
        return div.getElementsByClassName('e').length === 2;
      }), assertUsableName = assert(function (div) {
        div.id = expando + 0;
        div.innerHTML = '<a name=\'' + expando + '\'></a><div name=\'' + expando + '\'></div>';
        docElem.insertBefore(div, docElem.firstChild);
        var pass = document.getElementsByName && document.getElementsByName(expando).length === 2 + document.getElementsByName(expando + 0).length;
        assertGetIdNotName = !document.getElementById(expando);
        docElem.removeChild(div);
        return pass;
      });
    try {
      slice.call(docElem.childNodes, 0)[0].nodeType;
    } catch (e) {
      slice = function (i) {
        var elem, results = [];
        for (; elem = this[i]; i++) {
          results.push(elem);
        }
        return results;
      };
    }
    function Sizzle(selector, context, results, seed) {
      results = results || [];
      context = context || document;
      var match, elem, xml, m, nodeType = context.nodeType;
      if (!selector || typeof selector !== 'string') {
        return results;
      }
      if (nodeType !== 1 && nodeType !== 9) {
        return [];
      }
      xml = isXML(context);
      if (!xml && !seed) {
        if (match = rquickExpr.exec(selector)) {
          if (m = match[1]) {
            if (nodeType === 9) {
              elem = context.getElementById(m);
              if (elem && elem.parentNode) {
                if (elem.id === m) {
                  results.push(elem);
                  return results;
                }
              } else {
                return results;
              }
            } else {
              if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                results.push(elem);
                return results;
              }
            }
          } else if (match[2]) {
            push.apply(results, slice.call(context.getElementsByTagName(selector), 0));
            return results;
          } else if ((m = match[3]) && assertUsableClassName && context.getElementsByClassName) {
            push.apply(results, slice.call(context.getElementsByClassName(m), 0));
            return results;
          }
        }
      }
      return select(selector.replace(rtrim, '$1'), context, results, seed, xml);
    }
    Sizzle.matches = function (expr, elements) {
      return Sizzle(expr, null, null, elements);
    };
    Sizzle.matchesSelector = function (elem, expr) {
      return Sizzle(expr, null, null, [elem]).length > 0;
    };
    function createInputPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return name === 'input' && elem.type === type;
      };
    }
    function createButtonPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === 'input' || name === 'button') && elem.type === type;
      };
    }
    function createPositionalPseudo(fn) {
      return markFunction(function (argument) {
        argument = +argument;
        return markFunction(function (seed, matches) {
          var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
          while (i--) {
            if (seed[j = matchIndexes[i]]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }
    getText = Sizzle.getText = function (elem) {
      var node, ret = '', i = 0, nodeType = elem.nodeType;
      if (nodeType) {
        if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
          if (typeof elem.textContent === 'string') {
            return elem.textContent;
          } else {
            for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
              ret += getText(elem);
            }
          }
        } else if (nodeType === 3 || nodeType === 4) {
          return elem.nodeValue;
        }
      } else {
        for (; node = elem[i]; i++) {
          ret += getText(node);
        }
      }
      return ret;
    };
    isXML = Sizzle.isXML = function (elem) {
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? documentElement.nodeName !== 'HTML' : false;
    };
    contains = Sizzle.contains = docElem.contains ? function (a, b) {
      var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
      return a === bup || !!(bup && bup.nodeType === 1 && adown.contains && adown.contains(bup));
    } : docElem.compareDocumentPosition ? function (a, b) {
      return b && !!(a.compareDocumentPosition(b) & 16);
    } : function (a, b) {
      while (b = b.parentNode) {
        if (b === a) {
          return true;
        }
      }
      return false;
    };
    Sizzle.attr = function (elem, name) {
      var val, xml = isXML(elem);
      if (!xml) {
        name = name.toLowerCase();
      }
      if (val = Expr.attrHandle[name]) {
        return val(elem);
      }
      if (xml || assertAttributes) {
        return elem.getAttribute(name);
      }
      val = elem.getAttributeNode(name);
      return val ? typeof elem[name] === 'boolean' ? elem[name] ? name : null : val.specified ? val.value : null : null;
    };
    Expr = Sizzle.selectors = {
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: assertHrefNotNormalized ? {} : {
        'href': function (elem) {
          return elem.getAttribute('href', 2);
        },
        'type': function (elem) {
          return elem.getAttribute('type');
        }
      },
      find: {
        'ID': assertGetIdNotName ? function (id, context, xml) {
          if (typeof context.getElementById !== strundefined && !xml) {
            var m = context.getElementById(id);
            return m && m.parentNode ? [m] : [];
          }
        } : function (id, context, xml) {
          if (typeof context.getElementById !== strundefined && !xml) {
            var m = context.getElementById(id);
            return m ? m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode('id').value === id ? [m] : undefined : [];
          }
        },
        'TAG': assertTagNameNoComments ? function (tag, context) {
          if (typeof context.getElementsByTagName !== strundefined) {
            return context.getElementsByTagName(tag);
          }
        } : function (tag, context) {
          var results = context.getElementsByTagName(tag);
          if (tag === '*') {
            var elem, tmp = [], i = 0;
            for (; elem = results[i]; i++) {
              if (elem.nodeType === 1) {
                tmp.push(elem);
              }
            }
            return tmp;
          }
          return results;
        },
        'NAME': assertUsableName && function (tag, context) {
          if (typeof context.getElementsByName !== strundefined) {
            return context.getElementsByName(name);
          }
        },
        'CLASS': assertUsableClassName && function (className, context, xml) {
          if (typeof context.getElementsByClassName !== strundefined && !xml) {
            return context.getElementsByClassName(className);
          }
        }
      },
      relative: {
        '>': {
          dir: 'parentNode',
          first: true
        },
        ' ': { dir: 'parentNode' },
        '+': {
          dir: 'previousSibling',
          first: true
        },
        '~': { dir: 'previousSibling' }
      },
      preFilter: {
        'ATTR': function (match) {
          match[1] = match[1].replace(rbackslash, '');
          match[3] = (match[4] || match[5] || '').replace(rbackslash, '');
          if (match[2] === '~=') {
            match[3] = ' ' + match[3] + ' ';
          }
          return match.slice(0, 4);
        },
        'CHILD': function (match) {
          match[1] = match[1].toLowerCase();
          if (match[1] === 'nth') {
            if (!match[2]) {
              Sizzle.error(match[0]);
            }
            match[3] = +(match[3] ? match[4] + (match[5] || 1) : 2 * (match[2] === 'even' || match[2] === 'odd'));
            match[4] = +(match[6] + match[7] || match[2] === 'odd');
          } else if (match[2]) {
            Sizzle.error(match[0]);
          }
          return match;
        },
        'PSEUDO': function (match) {
          var unquoted, excess;
          if (matchExpr['CHILD'].test(match[0])) {
            return null;
          }
          if (match[3]) {
            match[2] = match[3];
          } else if (unquoted = match[4]) {
            if (rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(')', unquoted.length - excess) - unquoted.length)) {
              unquoted = unquoted.slice(0, excess);
              match[0] = match[0].slice(0, excess);
            }
            match[2] = unquoted;
          }
          return match.slice(0, 3);
        }
      },
      filter: {
        'ID': assertGetIdNotName ? function (id) {
          id = id.replace(rbackslash, '');
          return function (elem) {
            return elem.getAttribute('id') === id;
          };
        } : function (id) {
          id = id.replace(rbackslash, '');
          return function (elem) {
            var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode('id');
            return node && node.value === id;
          };
        },
        'TAG': function (nodeName) {
          if (nodeName === '*') {
            return function () {
              return true;
            };
          }
          nodeName = nodeName.replace(rbackslash, '').toLowerCase();
          return function (elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        'CLASS': function (className) {
          var pattern = classCache[expando][className + ' '];
          return pattern || (pattern = new RegExp('(^|' + whitespace + ')' + className + '(' + whitespace + '|$)')) && classCache(className, function (elem) {
            return pattern.test(elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute('class') || '');
          });
        },
        'ATTR': function (name, operator, check) {
          return function (elem, context) {
            var result = Sizzle.attr(elem, name);
            if (result == null) {
              return operator === '!=';
            }
            if (!operator) {
              return true;
            }
            result += '';
            return operator === '=' ? result === check : operator === '!=' ? result !== check : operator === '^=' ? check && result.indexOf(check) === 0 : operator === '*=' ? check && result.indexOf(check) > -1 : operator === '$=' ? check && result.substr(result.length - check.length) === check : operator === '~=' ? (' ' + result + ' ').indexOf(check) > -1 : operator === '|=' ? result === check || result.substr(0, check.length + 1) === check + '-' : false;
          };
        },
        'CHILD': function (type, argument, first, last) {
          if (type === 'nth') {
            return function (elem) {
              var node, diff, parent = elem.parentNode;
              if (first === 1 && last === 0) {
                return true;
              }
              if (parent) {
                diff = 0;
                for (node = parent.firstChild; node; node = node.nextSibling) {
                  if (node.nodeType === 1) {
                    diff++;
                    if (elem === node) {
                      break;
                    }
                  }
                }
              }
              diff -= last;
              return diff === first || diff % first === 0 && diff / first >= 0;
            };
          }
          return function (elem) {
            var node = elem;
            switch (type) {
            case 'only':
            case 'first':
              while (node = node.previousSibling) {
                if (node.nodeType === 1) {
                  return false;
                }
              }
              if (type === 'first') {
                return true;
              }
              node = elem;
            case 'last':
              while (node = node.nextSibling) {
                if (node.nodeType === 1) {
                  return false;
                }
              }
              return true;
            }
          };
        },
        'PSEUDO': function (pseudo, argument) {
          var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error('unsupported pseudo: ' + pseudo);
          if (fn[expando]) {
            return fn(argument);
          }
          if (fn.length > 1) {
            args = [
              pseudo,
              pseudo,
              '',
              argument
            ];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
              var idx, matched = fn(seed, argument), i = matched.length;
              while (i--) {
                idx = indexOf.call(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i]);
              }
            }) : function (elem) {
              return fn(elem, 0, args);
            };
          }
          return fn;
        }
      },
      pseudos: {
        'not': markFunction(function (selector) {
          var input = [], results = [], matcher = compile(selector.replace(rtrim, '$1'));
          return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
            var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
            while (i--) {
              if (elem = unmatched[i]) {
                seed[i] = !(matches[i] = elem);
              }
            }
          }) : function (elem, context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);
            return !results.pop();
          };
        }),
        'has': markFunction(function (selector) {
          return function (elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        'contains': markFunction(function (text) {
          return function (elem) {
            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
          };
        }),
        'enabled': function (elem) {
          return elem.disabled === false;
        },
        'disabled': function (elem) {
          return elem.disabled === true;
        },
        'checked': function (elem) {
          var nodeName = elem.nodeName.toLowerCase();
          return nodeName === 'input' && !!elem.checked || nodeName === 'option' && !!elem.selected;
        },
        'selected': function (elem) {
          if (elem.parentNode) {
            elem.parentNode.selectedIndex;
          }
          return elem.selected === true;
        },
        'parent': function (elem) {
          return !Expr.pseudos['empty'](elem);
        },
        'empty': function (elem) {
          var nodeType;
          elem = elem.firstChild;
          while (elem) {
            if (elem.nodeName > '@' || (nodeType = elem.nodeType) === 3 || nodeType === 4) {
              return false;
            }
            elem = elem.nextSibling;
          }
          return true;
        },
        'header': function (elem) {
          return rheader.test(elem.nodeName);
        },
        'text': function (elem) {
          var type, attr;
          return elem.nodeName.toLowerCase() === 'input' && (type = elem.type) === 'text' && ((attr = elem.getAttribute('type')) == null || attr.toLowerCase() === type);
        },
        'radio': createInputPseudo('radio'),
        'checkbox': createInputPseudo('checkbox'),
        'file': createInputPseudo('file'),
        'password': createInputPseudo('password'),
        'image': createInputPseudo('image'),
        'submit': createButtonPseudo('submit'),
        'reset': createButtonPseudo('reset'),
        'button': function (elem) {
          var name = elem.nodeName.toLowerCase();
          return name === 'input' && elem.type === 'button' || name === 'button';
        },
        'input': function (elem) {
          return rinputs.test(elem.nodeName);
        },
        'focus': function (elem) {
          var doc = elem.ownerDocument;
          return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        'active': function (elem) {
          return elem === elem.ownerDocument.activeElement;
        },
        'first': createPositionalPseudo(function () {
          return [0];
        }),
        'last': createPositionalPseudo(function (matchIndexes, length) {
          return [length - 1];
        }),
        'eq': createPositionalPseudo(function (matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        'even': createPositionalPseudo(function (matchIndexes, length) {
          for (var i = 0; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        'odd': createPositionalPseudo(function (matchIndexes, length) {
          for (var i = 1; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        'lt': createPositionalPseudo(function (matchIndexes, length, argument) {
          for (var i = argument < 0 ? argument + length : argument; --i >= 0;) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        'gt': createPositionalPseudo(function (matchIndexes, length, argument) {
          for (var i = argument < 0 ? argument + length : argument; ++i < length;) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        })
      }
    };
    function siblingCheck(a, b, ret) {
      if (a === b) {
        return ret;
      }
      var cur = a.nextSibling;
      while (cur) {
        if (cur === b) {
          return -1;
        }
        cur = cur.nextSibling;
      }
      return 1;
    }
    sortOrder = docElem.compareDocumentPosition ? function (a, b) {
      if (a === b) {
        hasDuplicate = true;
        return 0;
      }
      return (!a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition : a.compareDocumentPosition(b) & 4) ? -1 : 1;
    } : function (a, b) {
      if (a === b) {
        hasDuplicate = true;
        return 0;
      } else if (a.sourceIndex && b.sourceIndex) {
        return a.sourceIndex - b.sourceIndex;
      }
      var al, bl, ap = [], bp = [], aup = a.parentNode, bup = b.parentNode, cur = aup;
      if (aup === bup) {
        return siblingCheck(a, b);
      } else if (!aup) {
        return -1;
      } else if (!bup) {
        return 1;
      }
      while (cur) {
        ap.unshift(cur);
        cur = cur.parentNode;
      }
      cur = bup;
      while (cur) {
        bp.unshift(cur);
        cur = cur.parentNode;
      }
      al = ap.length;
      bl = bp.length;
      for (var i = 0; i < al && i < bl; i++) {
        if (ap[i] !== bp[i]) {
          return siblingCheck(ap[i], bp[i]);
        }
      }
      return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1);
    };
    [
      0,
      0
    ].sort(sortOrder);
    baseHasDuplicate = !hasDuplicate;
    Sizzle.uniqueSort = function (results) {
      var elem, duplicates = [], i = 1, j = 0;
      hasDuplicate = baseHasDuplicate;
      results.sort(sortOrder);
      if (hasDuplicate) {
        for (; elem = results[i]; i++) {
          if (elem === results[i - 1]) {
            j = duplicates.push(i);
          }
        }
        while (j--) {
          results.splice(duplicates[j], 1);
        }
      }
      return results;
    };
    Sizzle.error = function (msg) {
      throw new Error('Syntax error, unrecognized expression: ' + msg);
    };
    function tokenize(selector, parseOnly) {
      var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[expando][selector + ' '];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;
      while (soFar) {
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push(tokens = []);
        }
        matched = false;
        if (match = rcombinators.exec(soFar)) {
          tokens.push(matched = new Token(match.shift()));
          soFar = soFar.slice(matched.length);
          matched.type = match[0].replace(rtrim, ' ');
        }
        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            tokens.push(matched = new Token(match.shift()));
            soFar = soFar.slice(matched.length);
            matched.type = type;
            matched.matches = match;
          }
        }
        if (!matched) {
          break;
        }
      }
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
    }
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir, checkNonElements = base && combinator.dir === 'parentNode', doneName = done++;
      return combinator.first ? function (elem, context, xml) {
        while (elem = elem[dir]) {
          if (checkNonElements || elem.nodeType === 1) {
            return matcher(elem, context, xml);
          }
        }
      } : function (elem, context, xml) {
        if (!xml) {
          var cache, dirkey = dirruns + ' ' + doneName + ' ', cachedkey = dirkey + cachedruns;
          while (elem = elem[dir]) {
            if (checkNonElements || elem.nodeType === 1) {
              if ((cache = elem[expando]) === cachedkey) {
                return elem.sizset;
              } else if (typeof cache === 'string' && cache.indexOf(dirkey) === 0) {
                if (elem.sizset) {
                  return elem;
                }
              } else {
                elem[expando] = cachedkey;
                if (matcher(elem, context, xml)) {
                  elem.sizset = true;
                  return elem;
                }
                elem.sizset = false;
              }
            }
          }
        } else {
          while (elem = elem[dir]) {
            if (checkNonElements || elem.nodeType === 1) {
              if (matcher(elem, context, xml)) {
                return elem;
              }
            }
          }
        }
      };
    }
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function (elem, context, xml) {
        var i = matchers.length;
        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    function condense(unmatched, map, filter, context, xml) {
      var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = map != null;
      for (; i < len; i++) {
        if (elem = unmatched[i]) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i);
            }
          }
        }
      }
      return newUnmatched;
    }
    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function (seed, results, context, xml) {
        var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || '*', context.nodeType ? [context] : context, []), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        }
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);
          i = temp.length;
          while (i--) {
            if (elem = temp[i]) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if (elem = matcherOut[i]) {
                  temp.push(matcherIn[i] = elem);
                }
              }
              postFinder(null, matcherOut = [], temp, xml);
            }
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }
        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }
    function matcherFromTokens(tokens) {
      var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[' '], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function (elem) {
          return elem === checkContext;
        }, implicitRelative, true), matchAnyContext = addCombinator(function (elem) {
          return indexOf.call(checkContext, elem) > -1;
        }, implicitRelative, true), matchers = [function (elem, context, xml) {
            return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
          }];
      for (; i < len; i++) {
        if (matcher = Expr.relative[tokens[i].type]) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
          if (matcher[expando]) {
            j = ++i;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && tokens.slice(0, i - 1).join('').replace(rtrim, '$1'), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && tokens.join(''));
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function (seed, context, xml, results, expandContext) {
          var elem, j, matcher, setMatched = [], matchedCount = 0, i = '0', unmatched = seed && [], outermost = expandContext != null, contextBackup = outermostContext, elems = seed || byElement && Expr.find['TAG']('*', expandContext && context.parentNode || context), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.E;
          if (outermost) {
            outermostContext = context !== document && context;
            cachedruns = superMatcher.el;
          }
          for (; (elem = elems[i]) != null; i++) {
            if (byElement && elem) {
              for (j = 0; matcher = elementMatchers[j]; j++) {
                if (matcher(elem, context, xml)) {
                  results.push(elem);
                  break;
                }
              }
              if (outermost) {
                dirruns = dirrunsUnique;
                cachedruns = ++superMatcher.el;
              }
            }
            if (bySet) {
              if (elem = !matcher && elem) {
                matchedCount--;
              }
              if (seed) {
                unmatched.push(elem);
              }
            }
          }
          matchedCount += i;
          if (bySet && i !== matchedCount) {
            for (j = 0; matcher = setMatchers[j]; j++) {
              matcher(unmatched, setMatched, context, xml);
            }
            if (seed) {
              if (matchedCount > 0) {
                while (i--) {
                  if (!(unmatched[i] || setMatched[i])) {
                    setMatched[i] = pop.call(results);
                  }
                }
              }
              setMatched = condense(setMatched);
            }
            push.apply(results, setMatched);
            if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
              Sizzle.uniqueSort(results);
            }
          }
          if (outermost) {
            dirruns = dirrunsUnique;
            outermostContext = contextBackup;
          }
          return unmatched;
        };
      superMatcher.el = 0;
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    compile = Sizzle.compile = function (selector, group) {
      var i, setMatchers = [], elementMatchers = [], cached = compilerCache[expando][selector + ' '];
      if (!cached) {
        if (!group) {
          group = tokenize(selector);
        }
        i = group.length;
        while (i--) {
          cached = matcherFromTokens(group[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
      }
      return cached;
    };
    function multipleContexts(selector, contexts, results) {
      var i = 0, len = contexts.length;
      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }
    function select(selector, context, results, seed, xml) {
      var i, tokens, token, type, find, match = tokenize(selector), j = match.length;
      if (!seed) {
        if (match.length === 1) {
          tokens = match[0] = match[0].slice(0);
          if (tokens.length > 2 && (token = tokens[0]).type === 'ID' && context.nodeType === 9 && !xml && Expr.relative[tokens[1].type]) {
            context = Expr.find['ID'](token.matches[0].replace(rbackslash, ''), context, xml)[0];
            if (!context) {
              return results;
            }
            selector = selector.slice(tokens.shift().length);
          }
          for (i = matchExpr['POS'].test(selector) ? -1 : tokens.length - 1; i >= 0; i--) {
            token = tokens[i];
            if (Expr.relative[type = token.type]) {
              break;
            }
            if (find = Expr.find[type]) {
              if (seed = find(token.matches[0].replace(rbackslash, ''), rsibling.test(tokens[0].type) && context.parentNode || context, xml)) {
                tokens.splice(i, 1);
                selector = seed.length && tokens.join('');
                if (!selector) {
                  push.apply(results, slice.call(seed, 0));
                  return results;
                }
                break;
              }
            }
          }
        }
      }
      compile(selector, match)(seed, context, xml, results, rsibling.test(selector));
      return results;
    }
    if (document.querySelectorAll) {
      (function () {
        var disconnectedMatch, oldSelect = select, rescape = /'|\\/g, rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, rbuggyQSA = [':focus'], rbuggyMatches = [':active'], matches = docElem.matchesSelector || docElem.mozMatchesSelector || docElem.webkitMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector;
        assert(function (div) {
          div.innerHTML = '<select><option selected=\'\'></option></select>';
          if (!div.querySelectorAll('[selected]').length) {
            rbuggyQSA.push('\\[' + whitespace + '*(?:checked|disabled|ismap|multiple|readonly|selected|value)');
          }
          if (!div.querySelectorAll(':checked').length) {
            rbuggyQSA.push(':checked');
          }
        });
        assert(function (div) {
          div.innerHTML = '<p test=\'\'></p>';
          if (div.querySelectorAll('[test^=\'\']').length) {
            rbuggyQSA.push('[*^$]=' + whitespace + '*(?:""|\'\')');
          }
          div.innerHTML = '<input type=\'hidden\'/>';
          if (!div.querySelectorAll(':enabled').length) {
            rbuggyQSA.push(':enabled', ':disabled');
          }
        });
        rbuggyQSA = new RegExp(rbuggyQSA.join('|'));
        select = function (selector, context, results, seed, xml) {
          if (!seed && !xml && !rbuggyQSA.test(selector)) {
            var groups, i, old = true, nid = expando, newContext = context, newSelector = context.nodeType === 9 && selector;
            if (context.nodeType === 1 && context.nodeName.toLowerCase() !== 'object') {
              groups = tokenize(selector);
              if (old = context.getAttribute('id')) {
                nid = old.replace(rescape, '\\$&');
              } else {
                context.setAttribute('id', nid);
              }
              nid = '[id=\'' + nid + '\'] ';
              i = groups.length;
              while (i--) {
                groups[i] = nid + groups[i].join('');
              }
              newContext = rsibling.test(selector) && context.parentNode || context;
              newSelector = groups.join(',');
            }
            if (newSelector) {
              try {
                push.apply(results, slice.call(newContext.querySelectorAll(newSelector), 0));
                return results;
              } catch (qsaError) {
              } finally {
                if (!old) {
                  context.removeAttribute('id');
                }
              }
            }
          }
          return oldSelect(selector, context, results, seed, xml);
        };
        if (matches) {
          assert(function (div) {
            disconnectedMatch = matches.call(div, 'div');
            try {
              matches.call(div, '[test!=\'\']:sizzle');
              rbuggyMatches.push('!=', pseudos);
            } catch (e) {
            }
          });
          rbuggyMatches = new RegExp(rbuggyMatches.join('|'));
          Sizzle.matchesSelector = function (elem, expr) {
            expr = expr.replace(rattributeQuotes, '=\'$1\']');
            if (!isXML(elem) && !rbuggyMatches.test(expr) && !rbuggyQSA.test(expr)) {
              try {
                var ret = matches.call(elem, expr);
                if (ret || disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
                  return ret;
                }
              } catch (e) {
              }
            }
            return Sizzle(expr, null, null, [elem]).length > 0;
          };
        }
      }());
    }
    Expr.pseudos['nth'] = Expr.pseudos['eq'];
    function setFilters() {
    }
    Expr.filters = setFilters.prototype = Expr.pseudos;
    Expr.setFilters = new setFilters();
    Sizzle.attr = jQuery.attr;
    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[':'] = jQuery.expr.pseudos;
    jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
  }(window));
  var runtil = /Until$/, rparentsprev = /^(?:parents|prev(?:Until|All))/, isSimple = /^.[^:#\[\.,]*$/, rneedsContext = jQuery.expr.match.needsContext, guaranteedUnique = {
      children: true,
      contents: true,
      next: true,
      prev: true
    };
  jQuery.fn.extend({
    find: function (selector) {
      var i, l, length, n, r, ret, self = this;
      if (typeof selector !== 'string') {
        return jQuery(selector).filter(function () {
          for (i = 0, l = self.length; i < l; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        });
      }
      ret = this.pushStack('', 'find', selector);
      for (i = 0, l = this.length; i < l; i++) {
        length = ret.length;
        jQuery.find(selector, this[i], ret);
        if (i > 0) {
          for (n = length; n < ret.length; n++) {
            for (r = 0; r < length; r++) {
              if (ret[r] === ret[n]) {
                ret.splice(n--, 1);
                break;
              }
            }
          }
        }
      }
      return ret;
    },
    has: function (target) {
      var i, targets = jQuery(target, this), len = targets.length;
      return this.filter(function () {
        for (i = 0; i < len; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    not: function (selector) {
      return this.pushStack(winnow(this, selector, false), 'not', selector);
    },
    filter: function (selector) {
      return this.pushStack(winnow(this, selector, true), 'filter', selector);
    },
    is: function (selector) {
      return !!selector && (typeof selector === 'string' ? rneedsContext.test(selector) ? jQuery(selector, this.context).index(this[0]) >= 0 : jQuery.filter(selector, this).length > 0 : this.filter(selector).length > 0);
    },
    closest: function (selectors, context) {
      var cur, i = 0, l = this.length, ret = [], pos = rneedsContext.test(selectors) || typeof selectors !== 'string' ? jQuery(selectors, context || this.context) : 0;
      for (; i < l; i++) {
        cur = this[i];
        while (cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11) {
          if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) {
            ret.push(cur);
            break;
          }
          cur = cur.parentNode;
        }
      }
      ret = ret.length > 1 ? jQuery.unique(ret) : ret;
      return this.pushStack(ret, 'closest', selectors);
    },
    index: function (elem) {
      if (!elem) {
        return this[0] && this[0].parentNode ? this.prevAll().length : -1;
      }
      if (typeof elem === 'string') {
        return jQuery.inArray(this[0], jQuery(elem));
      }
      return jQuery.inArray(elem.jquery ? elem[0] : elem, this);
    },
    add: function (selector, context) {
      var set = typeof selector === 'string' ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector), all = jQuery.merge(this.get(), set);
      return this.pushStack(isDisconnected(set[0]) || isDisconnected(all[0]) ? all : jQuery.unique(all));
    },
    addBack: function (selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
    }
  });
  jQuery.fn.andSelf = jQuery.fn.addBack;
  function isDisconnected(node) {
    return !node || !node.parentNode || node.parentNode.nodeType === 11;
  }
  function sibling(cur, dir) {
    do {
      cur = cur[dir];
    } while (cur && cur.nodeType !== 1);
    return cur;
  }
  jQuery.each({
    parent: function (elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function (elem) {
      return jQuery.dir(elem, 'parentNode');
    },
    parentsUntil: function (elem, i, until) {
      return jQuery.dir(elem, 'parentNode', until);
    },
    next: function (elem) {
      return sibling(elem, 'nextSibling');
    },
    prev: function (elem) {
      return sibling(elem, 'previousSibling');
    },
    nextAll: function (elem) {
      return jQuery.dir(elem, 'nextSibling');
    },
    prevAll: function (elem) {
      return jQuery.dir(elem, 'previousSibling');
    },
    nextUntil: function (elem, i, until) {
      return jQuery.dir(elem, 'nextSibling', until);
    },
    prevUntil: function (elem, i, until) {
      return jQuery.dir(elem, 'previousSibling', until);
    },
    siblings: function (elem) {
      return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
    },
    children: function (elem) {
      return jQuery.sibling(elem.firstChild);
    },
    contents: function (elem) {
      return jQuery.nodeName(elem, 'iframe') ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes);
    }
  }, function (name, fn) {
    jQuery.fn[name] = function (until, selector) {
      var ret = jQuery.map(this, fn, until);
      if (!runtil.test(name)) {
        selector = until;
      }
      if (selector && typeof selector === 'string') {
        ret = jQuery.filter(selector, ret);
      }
      ret = this.length > 1 && !guaranteedUnique[name] ? jQuery.unique(ret) : ret;
      if (this.length > 1 && rparentsprev.test(name)) {
        ret = ret.reverse();
      }
      return this.pushStack(ret, name, core_slice.call(arguments).join(','));
    };
  });
  jQuery.extend({
    filter: function (expr, elems, not) {
      if (not) {
        expr = ':not(' + expr + ')';
      }
      return elems.length === 1 ? jQuery.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] : jQuery.find.matches(expr, elems);
    },
    dir: function (elem, dir, until) {
      var matched = [], cur = elem[dir];
      while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
        if (cur.nodeType === 1) {
          matched.push(cur);
        }
        cur = cur[dir];
      }
      return matched;
    },
    sibling: function (n, elem) {
      var r = [];
      for (; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== elem) {
          r.push(n);
        }
      }
      return r;
    }
  });
  function winnow(elements, qualifier, keep) {
    qualifier = qualifier || 0;
    if (jQuery.isFunction(qualifier)) {
      return jQuery.grep(elements, function (elem, i) {
        var retVal = !!qualifier.call(elem, i, elem);
        return retVal === keep;
      });
    } else if (qualifier.nodeType) {
      return jQuery.grep(elements, function (elem, i) {
        return elem === qualifier === keep;
      });
    } else if (typeof qualifier === 'string') {
      var filtered = jQuery.grep(elements, function (elem) {
          return elem.nodeType === 1;
        });
      if (isSimple.test(qualifier)) {
        return jQuery.filter(qualifier, filtered, !keep);
      } else {
        qualifier = jQuery.filter(qualifier, filtered);
      }
    }
    return jQuery.grep(elements, function (elem, i) {
      return jQuery.inArray(elem, qualifier) >= 0 === keep;
    });
  }
  function createSafeFragment(document) {
    var list = nodeNames.split('|'), safeFrag = document.createDocumentFragment();
    if (safeFrag.createElement) {
      while (list.length) {
        safeFrag.createElement(list.pop());
      }
    }
    return safeFrag;
  }
  var nodeNames = 'abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|' + 'header|hgroup|mark|meter|nav|output|progress|section|summary|time|video', rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g, rleadingWhitespace = /^\s+/, rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rtbody = /<tbody/i, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, rnocache = /<(?:script|object|embed|option|style)/i, rnoshimcache = new RegExp('<(?:' + nodeNames + ')[\\s/>]', 'i'), rcheckableType = /^(?:checkbox|radio)$/, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /\/(java|ecma)script/i, rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g, wrapMap = {
      option: [
        1,
        '<select multiple=\'multiple\'>',
        '</select>'
      ],
      legend: [
        1,
        '<fieldset>',
        '</fieldset>'
      ],
      thead: [
        1,
        '<table>',
        '</table>'
      ],
      tr: [
        2,
        '<table><tbody>',
        '</tbody></table>'
      ],
      td: [
        3,
        '<table><tbody><tr>',
        '</tr></tbody></table>'
      ],
      col: [
        2,
        '<table><tbody></tbody><colgroup>',
        '</colgroup></table>'
      ],
      area: [
        1,
        '<map>',
        '</map>'
      ],
      _default: [
        0,
        '',
        ''
      ]
    }, safeFragment = createSafeFragment(document), fragmentDiv = safeFragment.appendChild(document.createElement('div'));
  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;
  if (!jQuery.support.htmlSerialize) {
    wrapMap._default = [
      1,
      'X<div>',
      '</div>'
    ];
  }
  jQuery.fn.extend({
    text: function (value) {
      return jQuery.access(this, function (value) {
        return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
      }, null, value, arguments.length);
    },
    wrapAll: function (html) {
      if (jQuery.isFunction(html)) {
        return this.each(function (i) {
          jQuery(this).wrapAll(html.call(this, i));
        });
      }
      if (this[0]) {
        var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }
        wrap.map(function () {
          var elem = this;
          while (elem.firstChild && elem.firstChild.nodeType === 1) {
            elem = elem.firstChild;
          }
          return elem;
        }).append(this);
      }
      return this;
    },
    wrapInner: function (html) {
      if (jQuery.isFunction(html)) {
        return this.each(function (i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }
      return this.each(function () {
        var self = jQuery(this), contents = self.contents();
        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    wrap: function (html) {
      var isFunction = jQuery.isFunction(html);
      return this.each(function (i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function () {
      return this.parent().each(function () {
        if (!jQuery.nodeName(this, 'body')) {
          jQuery(this).replaceWith(this.childNodes);
        }
      }).end();
    },
    append: function () {
      return this.domManip(arguments, true, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11) {
          this.appendChild(elem);
        }
      });
    },
    prepend: function () {
      return this.domManip(arguments, true, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11) {
          this.insertBefore(elem, this.firstChild);
        }
      });
    },
    before: function () {
      if (!isDisconnected(this[0])) {
        return this.domManip(arguments, false, function (elem) {
          this.parentNode.insertBefore(elem, this);
        });
      }
      if (arguments.length) {
        var set = jQuery.clean(arguments);
        return this.pushStack(jQuery.merge(set, this), 'before', this.selector);
      }
    },
    after: function () {
      if (!isDisconnected(this[0])) {
        return this.domManip(arguments, false, function (elem) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        });
      }
      if (arguments.length) {
        var set = jQuery.clean(arguments);
        return this.pushStack(jQuery.merge(this, set), 'after', this.selector);
      }
    },
    remove: function (selector, keepData) {
      var elem, i = 0;
      for (; (elem = this[i]) != null; i++) {
        if (!selector || jQuery.filter(selector, [elem]).length) {
          if (!keepData && elem.nodeType === 1) {
            jQuery.cleanData(elem.getElementsByTagName('*'));
            jQuery.cleanData([elem]);
          }
          if (elem.parentNode) {
            elem.parentNode.removeChild(elem);
          }
        }
      }
      return this;
    },
    empty: function () {
      var elem, i = 0;
      for (; (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          jQuery.cleanData(elem.getElementsByTagName('*'));
        }
        while (elem.firstChild) {
          elem.removeChild(elem.firstChild);
        }
      }
      return this;
    },
    clone: function (dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function () {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function (value) {
      return jQuery.access(this, function (value) {
        var elem = this[0] || {}, i = 0, l = this.length;
        if (value === undefined) {
          return elem.nodeType === 1 ? elem.innerHTML.replace(rinlinejQuery, '') : undefined;
        }
        if (typeof value === 'string' && !rnoInnerhtml.test(value) && (jQuery.support.htmlSerialize || !rnoshimcache.test(value)) && (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || [
            '',
            ''
          ])[1].toLowerCase()]) {
          value = value.replace(rxhtmlTag, '<$1></$2>');
          try {
            for (; i < l; i++) {
              elem = this[i] || {};
              if (elem.nodeType === 1) {
                jQuery.cleanData(elem.getElementsByTagName('*'));
                elem.innerHTML = value;
              }
            }
            elem = 0;
          } catch (e) {
          }
        }
        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    replaceWith: function (value) {
      if (!isDisconnected(this[0])) {
        if (jQuery.isFunction(value)) {
          return this.each(function (i) {
            var self = jQuery(this), old = self.html();
            self.replaceWith(value.call(this, i, old));
          });
        }
        if (typeof value !== 'string') {
          value = jQuery(value).detach();
        }
        return this.each(function () {
          var next = this.nextSibling, parent = this.parentNode;
          jQuery(this).remove();
          if (next) {
            jQuery(next).before(value);
          } else {
            jQuery(parent).append(value);
          }
        });
      }
      return this.length ? this.pushStack(jQuery(jQuery.isFunction(value) ? value() : value), 'replaceWith', value) : this;
    },
    detach: function (selector) {
      return this.remove(selector, true);
    },
    domManip: function (args, table, callback) {
      args = [].concat.apply([], args);
      var results, first, fragment, iNoClone, i = 0, value = args[0], scripts = [], l = this.length;
      if (!jQuery.support.checkClone && l > 1 && typeof value === 'string' && rchecked.test(value)) {
        return this.each(function () {
          jQuery(this).domManip(args, table, callback);
        });
      }
      if (jQuery.isFunction(value)) {
        return this.each(function (i) {
          var self = jQuery(this);
          args[0] = value.call(this, i, table ? self.html() : undefined);
          self.domManip(args, table, callback);
        });
      }
      if (this[0]) {
        results = jQuery.buildFragment(args, this, scripts);
        fragment = results.fragment;
        first = fragment.firstChild;
        if (fragment.childNodes.length === 1) {
          fragment = first;
        }
        if (first) {
          table = table && jQuery.nodeName(first, 'tr');
          for (iNoClone = results.cacheable || l - 1; i < l; i++) {
            callback.call(table && jQuery.nodeName(this[i], 'table') ? findOrAppend(this[i], 'tbody') : this[i], i === iNoClone ? fragment : jQuery.clone(fragment, true, true));
          }
        }
        fragment = first = null;
        if (scripts.length) {
          jQuery.each(scripts, function (i, elem) {
            if (elem.src) {
              if (jQuery.ajax) {
                jQuery.ajax({
                  url: elem.src,
                  type: 'GET',
                  dataType: 'script',
                  async: false,
                  global: false,
                  'throws': true
                });
              } else {
                jQuery.error('no ajax');
              }
            } else {
              jQuery.globalEval((elem.text || elem.textContent || elem.innerHTML || '').replace(rcleanScript, ''));
            }
            if (elem.parentNode) {
              elem.parentNode.removeChild(elem);
            }
          });
        }
      }
      return this;
    }
  });
  function findOrAppend(elem, tag) {
    return elem.getElementsByTagName(tag)[0] || elem.appendChild(elem.ownerDocument.createElement(tag));
  }
  function cloneCopyEvent(src, dest) {
    if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
      return;
    }
    var type, i, l, oldData = jQuery._data(src), curData = jQuery._data(dest, oldData), events = oldData.events;
    if (events) {
      delete curData.handle;
      curData.events = {};
      for (type in events) {
        for (i = 0, l = events[type].length; i < l; i++) {
          jQuery.event.add(dest, type, events[type][i]);
        }
      }
    }
    if (curData.data) {
      curData.data = jQuery.extend({}, curData.data);
    }
  }
  function cloneFixAttributes(src, dest) {
    var nodeName;
    if (dest.nodeType !== 1) {
      return;
    }
    if (dest.clearAttributes) {
      dest.clearAttributes();
    }
    if (dest.mergeAttributes) {
      dest.mergeAttributes(src);
    }
    nodeName = dest.nodeName.toLowerCase();
    if (nodeName === 'object') {
      if (dest.parentNode) {
        dest.outerHTML = src.outerHTML;
      }
      if (jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML))) {
        dest.innerHTML = src.innerHTML;
      }
    } else if (nodeName === 'input' && rcheckableType.test(src.type)) {
      dest.defaultChecked = dest.checked = src.checked;
      if (dest.value !== src.value) {
        dest.value = src.value;
      }
    } else if (nodeName === 'option') {
      dest.selected = src.defaultSelected;
    } else if (nodeName === 'input' || nodeName === 'textarea') {
      dest.defaultValue = src.defaultValue;
    } else if (nodeName === 'script' && dest.text !== src.text) {
      dest.text = src.text;
    }
    dest.removeAttribute(jQuery.expando);
  }
  jQuery.buildFragment = function (args, context, scripts) {
    var fragment, cacheable, cachehit, first = args[0];
    context = context || document;
    context = !context.nodeType && context[0] || context;
    context = context.ownerDocument || context;
    if (args.length === 1 && typeof first === 'string' && first.length < 512 && context === document && first.charAt(0) === '<' && !rnocache.test(first) && (jQuery.support.checkClone || !rchecked.test(first)) && (jQuery.support.html5Clone || !rnoshimcache.test(first))) {
      cacheable = true;
      fragment = jQuery.fragments[first];
      cachehit = fragment !== undefined;
    }
    if (!fragment) {
      fragment = context.createDocumentFragment();
      jQuery.clean(args, context, fragment, scripts);
      if (cacheable) {
        jQuery.fragments[first] = cachehit && fragment;
      }
    }
    return {
      fragment: fragment,
      cacheable: cacheable
    };
  };
  jQuery.fragments = {};
  jQuery.each({
    appendTo: 'append',
    prependTo: 'prepend',
    insertBefore: 'before',
    insertAfter: 'after',
    replaceAll: 'replaceWith'
  }, function (name, original) {
    jQuery.fn[name] = function (selector) {
      var elems, i = 0, ret = [], insert = jQuery(selector), l = insert.length, parent = this.length === 1 && this[0].parentNode;
      if ((parent == null || parent && parent.nodeType === 11 && parent.childNodes.length === 1) && l === 1) {
        insert[original](this[0]);
        return this;
      } else {
        for (; i < l; i++) {
          elems = (i > 0 ? this.clone(true) : this).get();
          jQuery(insert[i])[original](elems);
          ret = ret.concat(elems);
        }
        return this.pushStack(ret, name, insert.selector);
      }
    };
  });
  function getAll(elem) {
    if (typeof elem.getElementsByTagName !== 'undefined') {
      return elem.getElementsByTagName('*');
    } else if (typeof elem.querySelectorAll !== 'undefined') {
      return elem.querySelectorAll('*');
    } else {
      return [];
    }
  }
  function fixDefaultChecked(elem) {
    if (rcheckableType.test(elem.type)) {
      elem.defaultChecked = elem.checked;
    }
  }
  jQuery.extend({
    clone: function (elem, dataAndEvents, deepDataAndEvents) {
      var srcElements, destElements, i, clone;
      if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test('<' + elem.nodeName + '>')) {
        clone = elem.cloneNode(true);
      } else {
        fragmentDiv.innerHTML = elem.outerHTML;
        fragmentDiv.removeChild(clone = fragmentDiv.firstChild);
      }
      if ((!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
        cloneFixAttributes(elem, clone);
        srcElements = getAll(elem);
        destElements = getAll(clone);
        for (i = 0; srcElements[i]; ++i) {
          if (destElements[i]) {
            cloneFixAttributes(srcElements[i], destElements[i]);
          }
        }
      }
      if (dataAndEvents) {
        cloneCopyEvent(elem, clone);
        if (deepDataAndEvents) {
          srcElements = getAll(elem);
          destElements = getAll(clone);
          for (i = 0; srcElements[i]; ++i) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        }
      }
      srcElements = destElements = null;
      return clone;
    },
    clean: function (elems, context, fragment, scripts) {
      var i, j, elem, tag, wrap, depth, div, hasBody, tbody, len, handleScript, jsTags, safe = context === document && safeFragment, ret = [];
      if (!context || typeof context.createDocumentFragment === 'undefined') {
        context = document;
      }
      for (i = 0; (elem = elems[i]) != null; i++) {
        if (typeof elem === 'number') {
          elem += '';
        }
        if (!elem) {
          continue;
        }
        if (typeof elem === 'string') {
          if (!rhtml.test(elem)) {
            elem = context.createTextNode(elem);
          } else {
            safe = safe || createSafeFragment(context);
            div = context.createElement('div');
            safe.appendChild(div);
            elem = elem.replace(rxhtmlTag, '<$1></$2>');
            tag = (rtagName.exec(elem) || [
              '',
              ''
            ])[1].toLowerCase();
            wrap = wrapMap[tag] || wrapMap._default;
            depth = wrap[0];
            div.innerHTML = wrap[1] + elem + wrap[2];
            while (depth--) {
              div = div.lastChild;
            }
            if (!jQuery.support.tbody) {
              hasBody = rtbody.test(elem);
              tbody = tag === 'table' && !hasBody ? div.firstChild && div.firstChild.childNodes : wrap[1] === '<table>' && !hasBody ? div.childNodes : [];
              for (j = tbody.length - 1; j >= 0; --j) {
                if (jQuery.nodeName(tbody[j], 'tbody') && !tbody[j].childNodes.length) {
                  tbody[j].parentNode.removeChild(tbody[j]);
                }
              }
            }
            if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)) {
              div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]), div.firstChild);
            }
            elem = div.childNodes;
            div.parentNode.removeChild(div);
          }
        }
        if (elem.nodeType) {
          ret.push(elem);
        } else {
          jQuery.merge(ret, elem);
        }
      }
      if (div) {
        elem = div = safe = null;
      }
      if (!jQuery.support.appendChecked) {
        for (i = 0; (elem = ret[i]) != null; i++) {
          if (jQuery.nodeName(elem, 'input')) {
            fixDefaultChecked(elem);
          } else if (typeof elem.getElementsByTagName !== 'undefined') {
            jQuery.grep(elem.getElementsByTagName('input'), fixDefaultChecked);
          }
        }
      }
      if (fragment) {
        handleScript = function (elem) {
          if (!elem.type || rscriptType.test(elem.type)) {
            return scripts ? scripts.push(elem.parentNode ? elem.parentNode.removeChild(elem) : elem) : fragment.appendChild(elem);
          }
        };
        for (i = 0; (elem = ret[i]) != null; i++) {
          if (!(jQuery.nodeName(elem, 'script') && handleScript(elem))) {
            fragment.appendChild(elem);
            if (typeof elem.getElementsByTagName !== 'undefined') {
              jsTags = jQuery.grep(jQuery.merge([], elem.getElementsByTagName('script')), handleScript);
              ret.splice.apply(ret, [
                i + 1,
                0
              ].concat(jsTags));
              i += jsTags.length;
            }
          }
        }
      }
      return ret;
    },
    cleanData: function (elems, acceptData) {
      var data, id, elem, type, i = 0, internalKey = jQuery.expando, cache = jQuery.cache, deleteExpando = jQuery.support.deleteExpando, special = jQuery.event.special;
      for (; (elem = elems[i]) != null; i++) {
        if (acceptData || jQuery.acceptData(elem)) {
          id = elem[internalKey];
          data = id && cache[id];
          if (data) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type);
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            }
            if (cache[id]) {
              delete cache[id];
              if (deleteExpando) {
                delete elem[internalKey];
              } else if (elem.removeAttribute) {
                elem.removeAttribute(internalKey);
              } else {
                elem[internalKey] = null;
              }
              jQuery.deletedIds.push(id);
            }
          }
        }
      }
    }
  });
  (function () {
    var matched, browser;
    jQuery.uaMatch = function (ua) {
      ua = ua.toLowerCase();
      var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
      return {
        browser: match[1] || '',
        version: match[2] || '0'
      };
    };
    matched = jQuery.uaMatch(navigator.userAgent);
    browser = {};
    if (matched.browser) {
      browser[matched.browser] = true;
      browser.version = matched.version;
    }
    if (browser.chrome) {
      browser.webkit = true;
    } else if (browser.webkit) {
      browser.safari = true;
    }
    jQuery.browser = browser;
    jQuery.sub = function () {
      function jQuerySub(selector, context) {
        return new jQuerySub.fn.init(selector, context);
      }
      jQuery.extend(true, jQuerySub, this);
      jQuerySub.superclass = this;
      jQuerySub.fn = jQuerySub.prototype = this();
      jQuerySub.fn.constructor = jQuerySub;
      jQuerySub.sub = this.sub;
      jQuerySub.fn.init = function init(selector, context) {
        if (context && context instanceof jQuery && !(context instanceof jQuerySub)) {
          context = jQuerySub(context);
        }
        return jQuery.fn.init.call(this, selector, context, rootjQuerySub);
      };
      jQuerySub.fn.init.prototype = jQuerySub.fn;
      var rootjQuerySub = jQuerySub(document);
      return jQuerySub;
    };
  }());
  var curCSS, iframe, iframeDoc, ralpha = /alpha\([^)]*\)/i, ropacity = /opacity=([^)]*)/, rposition = /^(top|right|bottom|left)$/, rdisplayswap = /^(none|table(?!-c[ea]).+)/, rmargin = /^margin/, rnumsplit = new RegExp('^(' + core_pnum + ')(.*)$', 'i'), rnumnonpx = new RegExp('^(' + core_pnum + ')(?!px)[a-z%]+$', 'i'), rrelNum = new RegExp('^([-+])=(' + core_pnum + ')', 'i'), elemdisplay = { BODY: 'block' }, cssShow = {
      position: 'absolute',
      visibility: 'hidden',
      display: 'block'
    }, cssNormalTransform = {
      letterSpacing: 0,
      fontWeight: 400
    }, cssExpand = [
      'Top',
      'Right',
      'Bottom',
      'Left'
    ], cssPrefixes = [
      'Webkit',
      'O',
      'Moz',
      'ms'
    ], eventsToggle = jQuery.fn.toggle;
  function vendorPropName(style, name) {
    if (name in style) {
      return name;
    }
    var capName = name.charAt(0).toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length;
    while (i--) {
      name = cssPrefixes[i] + capName;
      if (name in style) {
        return name;
      }
    }
    return origName;
  }
  function isHidden(elem, el) {
    elem = el || elem;
    return jQuery.css(elem, 'display') === 'none' || !jQuery.contains(elem.ownerDocument, elem);
  }
  function showHide(elements, show) {
    var elem, display, values = [], index = 0, length = elements.length;
    for (; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      values[index] = jQuery._data(elem, 'olddisplay');
      if (show) {
        if (!values[index] && elem.style.display === 'none') {
          elem.style.display = '';
        }
        if (elem.style.display === '' && isHidden(elem)) {
          values[index] = jQuery._data(elem, 'olddisplay', css_defaultDisplay(elem.nodeName));
        }
      } else {
        display = curCSS(elem, 'display');
        if (!values[index] && display !== 'none') {
          jQuery._data(elem, 'olddisplay', display);
        }
      }
    }
    for (index = 0; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      if (!show || elem.style.display === 'none' || elem.style.display === '') {
        elem.style.display = show ? values[index] || '' : 'none';
      }
    }
    return elements;
  }
  jQuery.fn.extend({
    css: function (name, value) {
      return jQuery.access(this, function (elem, name, value) {
        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    },
    show: function () {
      return showHide(this, true);
    },
    hide: function () {
      return showHide(this);
    },
    toggle: function (state, fn2) {
      var bool = typeof state === 'boolean';
      if (jQuery.isFunction(state) && jQuery.isFunction(fn2)) {
        return eventsToggle.apply(this, arguments);
      }
      return this.each(function () {
        if (bool ? state : isHidden(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  jQuery.extend({
    cssHooks: {
      opacity: {
        get: function (elem, computed) {
          if (computed) {
            var ret = curCSS(elem, 'opacity');
            return ret === '' ? '1' : ret;
          }
        }
      }
    },
    cssNumber: {
      'fillOpacity': true,
      'fontWeight': true,
      'lineHeight': true,
      'opacity': true,
      'orphans': true,
      'widows': true,
      'zIndex': true,
      'zoom': true
    },
    cssProps: { 'float': jQuery.support.cssFloat ? 'cssFloat' : 'styleFloat' },
    style: function (elem, name, value, extra) {
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      }
      var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (value !== undefined) {
        type = typeof value;
        if (type === 'string' && (ret = rrelNum.exec(value))) {
          value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
          type = 'number';
        }
        if (value == null || type === 'number' && isNaN(value)) {
          return;
        }
        if (type === 'number' && !jQuery.cssNumber[origName]) {
          value += 'px';
        }
        if (!hooks || !('set' in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
          try {
            style[name] = value;
          } catch (e) {
          }
        }
      } else {
        if (hooks && 'get' in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
          return ret;
        }
        return style[name];
      }
    },
    css: function (elem, name, numeric, extra) {
      var val, num, hooks, origName = jQuery.camelCase(name);
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (hooks && 'get' in hooks) {
        val = hooks.get(elem, true, extra);
      }
      if (val === undefined) {
        val = curCSS(elem, name);
      }
      if (val === 'normal' && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      }
      if (numeric || extra !== undefined) {
        num = parseFloat(val);
        return numeric || jQuery.isNumeric(num) ? num || 0 : val;
      }
      return val;
    },
    swap: function (elem, options, callback) {
      var ret, name, old = {};
      for (name in options) {
        old[name] = elem.style[name];
        elem.style[name] = options[name];
      }
      ret = callback.call(elem);
      for (name in options) {
        elem.style[name] = old[name];
      }
      return ret;
    }
  });
  if (window.getComputedStyle) {
    curCSS = function (elem, name) {
      var ret, width, minWidth, maxWidth, computed = window.getComputedStyle(elem, null), style = elem.style;
      if (computed) {
        ret = computed.getPropertyValue(name) || computed[name];
        if (ret === '' && !jQuery.contains(elem.ownerDocument, elem)) {
          ret = jQuery.style(elem, name);
        }
        if (rnumnonpx.test(ret) && rmargin.test(name)) {
          width = style.width;
          minWidth = style.minWidth;
          maxWidth = style.maxWidth;
          style.minWidth = style.maxWidth = style.width = ret;
          ret = computed.width;
          style.width = width;
          style.minWidth = minWidth;
          style.maxWidth = maxWidth;
        }
      }
      return ret;
    };
  } else if (document.documentElement.currentStyle) {
    curCSS = function (elem, name) {
      var left, rsLeft, ret = elem.currentStyle && elem.currentStyle[name], style = elem.style;
      if (ret == null && style && style[name]) {
        ret = style[name];
      }
      if (rnumnonpx.test(ret) && !rposition.test(name)) {
        left = style.left;
        rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;
        if (rsLeft) {
          elem.runtimeStyle.left = elem.currentStyle.left;
        }
        style.left = name === 'fontSize' ? '1em' : ret;
        ret = style.pixelLeft + 'px';
        style.left = left;
        if (rsLeft) {
          elem.runtimeStyle.left = rsLeft;
        }
      }
      return ret === '' ? 'auto' : ret;
    };
  }
  function setPositiveNumber(elem, value, subtract) {
    var matches = rnumsplit.exec(value);
    return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || 'px') : value;
  }
  function augmentWidthOrHeight(elem, name, extra, isBorderBox) {
    var i = extra === (isBorderBox ? 'border' : 'content') ? 4 : name === 'width' ? 1 : 0, val = 0;
    for (; i < 4; i += 2) {
      if (extra === 'margin') {
        val += jQuery.css(elem, extra + cssExpand[i], true);
      }
      if (isBorderBox) {
        if (extra === 'content') {
          val -= parseFloat(curCSS(elem, 'padding' + cssExpand[i])) || 0;
        }
        if (extra !== 'margin') {
          val -= parseFloat(curCSS(elem, 'border' + cssExpand[i] + 'Width')) || 0;
        }
      } else {
        val += parseFloat(curCSS(elem, 'padding' + cssExpand[i])) || 0;
        if (extra !== 'padding') {
          val += parseFloat(curCSS(elem, 'border' + cssExpand[i] + 'Width')) || 0;
        }
      }
    }
    return val;
  }
  function getWidthOrHeight(elem, name, extra) {
    var val = name === 'width' ? elem.offsetWidth : elem.offsetHeight, valueIsBorderBox = true, isBorderBox = jQuery.support.boxSizing && jQuery.css(elem, 'boxSizing') === 'border-box';
    if (val <= 0 || val == null) {
      val = curCSS(elem, name);
      if (val < 0 || val == null) {
        val = elem.style[name];
      }
      if (rnumnonpx.test(val)) {
        return val;
      }
      valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]);
      val = parseFloat(val) || 0;
    }
    return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? 'border' : 'content'), valueIsBorderBox) + 'px';
  }
  function css_defaultDisplay(nodeName) {
    if (elemdisplay[nodeName]) {
      return elemdisplay[nodeName];
    }
    var elem = jQuery('<' + nodeName + '>').appendTo(document.body), display = elem.css('display');
    elem.remove();
    if (display === 'none' || display === '') {
      iframe = document.body.appendChild(iframe || jQuery.extend(document.createElement('iframe'), {
        frameBorder: 0,
        width: 0,
        height: 0
      }));
      if (!iframeDoc || !iframe.createElement) {
        iframeDoc = (iframe.contentWindow || iframe.contentDocument).document;
        iframeDoc.write('<!doctype html><html><body>');
        iframeDoc.close();
      }
      elem = iframeDoc.body.appendChild(iframeDoc.createElement(nodeName));
      display = curCSS(elem, 'display');
      document.body.removeChild(iframe);
    }
    elemdisplay[nodeName] = display;
    return display;
  }
  jQuery.each([
    'height',
    'width'
  ], function (i, name) {
    jQuery.cssHooks[name] = {
      get: function (elem, computed, extra) {
        if (computed) {
          if (elem.offsetWidth === 0 && rdisplayswap.test(curCSS(elem, 'display'))) {
            return jQuery.swap(elem, cssShow, function () {
              return getWidthOrHeight(elem, name, extra);
            });
          } else {
            return getWidthOrHeight(elem, name, extra);
          }
        }
      },
      set: function (elem, value, extra) {
        return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && jQuery.css(elem, 'boxSizing') === 'border-box') : 0);
      }
    };
  });
  if (!jQuery.support.opacity) {
    jQuery.cssHooks.opacity = {
      get: function (elem, computed) {
        return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || '') ? 0.01 * parseFloat(RegExp.$1) + '' : computed ? '1' : '';
      },
      set: function (elem, value) {
        var style = elem.style, currentStyle = elem.currentStyle, opacity = jQuery.isNumeric(value) ? 'alpha(opacity=' + value * 100 + ')' : '', filter = currentStyle && currentStyle.filter || style.filter || '';
        style.zoom = 1;
        if (value >= 1 && jQuery.trim(filter.replace(ralpha, '')) === '' && style.removeAttribute) {
          style.removeAttribute('filter');
          if (currentStyle && !currentStyle.filter) {
            return;
          }
        }
        style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + ' ' + opacity;
      }
    };
  }
  jQuery(function () {
    if (!jQuery.support.reliableMarginRight) {
      jQuery.cssHooks.marginRight = {
        get: function (elem, computed) {
          return jQuery.swap(elem, { 'display': 'inline-block' }, function () {
            if (computed) {
              return curCSS(elem, 'marginRight');
            }
          });
        }
      };
    }
    if (!jQuery.support.pixelPosition && jQuery.fn.position) {
      jQuery.each([
        'top',
        'left'
      ], function (i, prop) {
        jQuery.cssHooks[prop] = {
          get: function (elem, computed) {
            if (computed) {
              var ret = curCSS(elem, prop);
              return rnumnonpx.test(ret) ? jQuery(elem).position()[prop] + 'px' : ret;
            }
          }
        };
      });
    }
  });
  if (jQuery.expr && jQuery.expr.filters) {
    jQuery.expr.filters.hidden = function (elem) {
      return elem.offsetWidth === 0 && elem.offsetHeight === 0 || !jQuery.support.reliableHiddenOffsets && (elem.style && elem.style.display || curCSS(elem, 'display')) === 'none';
    };
    jQuery.expr.filters.visible = function (elem) {
      return !jQuery.expr.filters.hidden(elem);
    };
  }
  jQuery.each({
    margin: '',
    padding: '',
    border: 'Width'
  }, function (prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {
      expand: function (value) {
        var i, parts = typeof value === 'string' ? value.split(' ') : [value], expanded = {};
        for (i = 0; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
        }
        return expanded;
      }
    };
    if (!rmargin.test(prefix)) {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, rselectTextarea = /^(?:select|textarea)/i;
  jQuery.fn.extend({
    serialize: function () {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function () {
      return this.map(function () {
        return this.elements ? jQuery.makeArray(this.elements) : this;
      }).filter(function () {
        return this.name && !this.disabled && (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type));
      }).map(function (i, elem) {
        var val = jQuery(this).val();
        return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val, i) {
          return {
            name: elem.name,
            value: val.replace(rCRLF, '\r\n')
          };
        }) : {
          name: elem.name,
          value: val.replace(rCRLF, '\r\n')
        };
      }).get();
    }
  });
  jQuery.param = function (a, traditional) {
    var prefix, s = [], add = function (key, value) {
        value = jQuery.isFunction(value) ? value() : value == null ? '' : value;
        s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
      };
    if (traditional === undefined) {
      traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
    }
    if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
      jQuery.each(a, function () {
        add(this.name, this.value);
      });
    } else {
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }
    return s.join('&').replace(r20, '+');
  };
  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (jQuery.isArray(obj)) {
      jQuery.each(obj, function (i, v) {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v);
        } else {
          buildParams(prefix + '[' + (typeof v === 'object' ? i : '') + ']', v, traditional, add);
        }
      });
    } else if (!traditional && jQuery.type(obj) === 'object') {
      for (name in obj) {
        buildParams(prefix + '[' + name + ']', obj[name], traditional, add);
      }
    } else {
      add(prefix, obj);
    }
  }
  var ajaxLocParts, ajaxLocation, rhash = /#.*$/, rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rquery = /\?/, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, rts = /([?&])_=[^&]*/, rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, _load = jQuery.fn.load, prefilters = {}, transports = {}, allTypes = ['*/'] + ['*'];
  try {
    ajaxLocation = location.href;
  } catch (e) {
    ajaxLocation = document.createElement('a');
    ajaxLocation.href = '';
    ajaxLocation = ajaxLocation.href;
  }
  ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
  function addToPrefiltersOrTransports(structure) {
    return function (dataTypeExpression, func) {
      if (typeof dataTypeExpression !== 'string') {
        func = dataTypeExpression;
        dataTypeExpression = '*';
      }
      var dataType, list, placeBefore, dataTypes = dataTypeExpression.toLowerCase().split(core_rspace), i = 0, length = dataTypes.length;
      if (jQuery.isFunction(func)) {
        for (; i < length; i++) {
          dataType = dataTypes[i];
          placeBefore = /^\+/.test(dataType);
          if (placeBefore) {
            dataType = dataType.substr(1) || '*';
          }
          list = structure[dataType] = structure[dataType] || [];
          list[placeBefore ? 'unshift' : 'push'](func);
        }
      }
    };
  }
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, dataType, inspected) {
    dataType = dataType || options.dataTypes[0];
    inspected = inspected || {};
    inspected[dataType] = true;
    var selection, list = structure[dataType], i = 0, length = list ? list.length : 0, executeOnly = structure === prefilters;
    for (; i < length && (executeOnly || !selection); i++) {
      selection = list[i](options, originalOptions, jqXHR);
      if (typeof selection === 'string') {
        if (!executeOnly || inspected[selection]) {
          selection = undefined;
        } else {
          options.dataTypes.unshift(selection);
          selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, selection, inspected);
        }
      }
    }
    if ((executeOnly || !selection) && !inspected['*']) {
      selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, '*', inspected);
    }
    return selection;
  }
  function ajaxExtend(target, src) {
    var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep);
    }
  }
  jQuery.fn.load = function (url, params, callback) {
    if (typeof url !== 'string' && _load) {
      return _load.apply(this, arguments);
    }
    if (!this.length) {
      return this;
    }
    var selector, type, response, self = this, off = url.indexOf(' ');
    if (off >= 0) {
      selector = url.slice(off, url.length);
      url = url.slice(0, off);
    }
    if (jQuery.isFunction(params)) {
      callback = params;
      params = undefined;
    } else if (params && typeof params === 'object') {
      type = 'POST';
    }
    jQuery.ajax({
      url: url,
      type: type,
      dataType: 'html',
      data: params,
      complete: function (jqXHR, status) {
        if (callback) {
          self.each(callback, response || [
            jqXHR.responseText,
            status,
            jqXHR
          ]);
        }
      }
    }).done(function (responseText) {
      response = arguments;
      self.html(selector ? jQuery('<div>').append(responseText.replace(rscript, '')).find(selector) : responseText);
    });
    return this;
  };
  jQuery.each('ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend'.split(' '), function (i, o) {
    jQuery.fn[o] = function (f) {
      return this.on(o, f);
    };
  });
  jQuery.each([
    'get',
    'post'
  ], function (i, method) {
    jQuery[method] = function (url, data, callback, type) {
      if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }
      return jQuery.ajax({
        type: method,
        url: url,
        data: data,
        success: callback,
        dataType: type
      });
    };
  });
  jQuery.extend({
    getScript: function (url, callback) {
      return jQuery.get(url, undefined, callback, 'script');
    },
    getJSON: function (url, data, callback) {
      return jQuery.get(url, data, callback, 'json');
    },
    ajaxSetup: function (target, settings) {
      if (settings) {
        ajaxExtend(target, jQuery.ajaxSettings);
      } else {
        settings = target;
        target = jQuery.ajaxSettings;
      }
      ajaxExtend(target, settings);
      return target;
    },
    ajaxSettings: {
      url: ajaxLocation,
      isLocal: rlocalProtocol.test(ajaxLocParts[1]),
      global: true,
      type: 'GET',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      processData: true,
      async: true,
      accepts: {
        xml: 'application/xml, text/xml',
        html: 'text/html',
        text: 'text/plain',
        json: 'application/json, text/javascript',
        '*': allTypes
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: 'responseXML',
        text: 'responseText'
      },
      converters: {
        '* text': window.String,
        'text html': true,
        'text json': jQuery.parseJSON,
        'text xml': jQuery.parseXML
      },
      flatOptions: {
        context: true,
        url: true
      }
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    ajax: function (url, options) {
      if (typeof url === 'object') {
        options = url;
        url = undefined;
      }
      options = options || {};
      var ifModifiedKey, responseHeadersString, responseHeaders, transport, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = callbackContext !== s && (callbackContext.nodeType || callbackContext instanceof jQuery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks('once memory'), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = 'canceled', jqXHR = {
          readyState: 0,
          setRequestHeader: function (name, value) {
            if (!state) {
              var lname = name.toLowerCase();
              name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
              requestHeaders[name] = value;
            }
            return this;
          },
          getAllResponseHeaders: function () {
            return state === 2 ? responseHeadersString : null;
          },
          getResponseHeader: function (key) {
            var match;
            if (state === 2) {
              if (!responseHeaders) {
                responseHeaders = {};
                while (match = rheaders.exec(responseHeadersString)) {
                  responseHeaders[match[1].toLowerCase()] = match[2];
                }
              }
              match = responseHeaders[key.toLowerCase()];
            }
            return match === undefined ? null : match;
          },
          overrideMimeType: function (type) {
            if (!state) {
              s.mimeType = type;
            }
            return this;
          },
          abort: function (statusText) {
            statusText = statusText || strAbort;
            if (transport) {
              transport.abort(statusText);
            }
            done(0, statusText);
            return this;
          }
        };
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess, success, error, response, modified, statusText = nativeStatusText;
        if (state === 2) {
          return;
        }
        state = 2;
        if (timeoutTimer) {
          clearTimeout(timeoutTimer);
        }
        transport = undefined;
        responseHeadersString = headers || '';
        jqXHR.readyState = status > 0 ? 4 : 0;
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        }
        if (status >= 200 && status < 300 || status === 304) {
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader('Last-Modified');
            if (modified) {
              jQuery.lastModified[ifModifiedKey] = modified;
            }
            modified = jqXHR.getResponseHeader('Etag');
            if (modified) {
              jQuery.etag[ifModifiedKey] = modified;
            }
          }
          if (status === 304) {
            statusText = 'notmodified';
            isSuccess = true;
          } else {
            isSuccess = ajaxConvert(s, response);
            statusText = isSuccess.state;
            success = isSuccess.data;
            error = isSuccess.error;
            isSuccess = !error;
          }
        } else {
          error = statusText;
          if (!statusText || status) {
            statusText = 'error';
            if (status < 0) {
              status = 0;
            }
          }
        }
        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + '';
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [
            success,
            statusText,
            jqXHR
          ]);
        } else {
          deferred.rejectWith(callbackContext, [
            jqXHR,
            statusText,
            error
          ]);
        }
        jqXHR.statusCode(statusCode);
        statusCode = undefined;
        if (fireGlobals) {
          globalEventContext.trigger('ajax' + (isSuccess ? 'Success' : 'Error'), [
            jqXHR,
            s,
            isSuccess ? success : error
          ]);
        }
        completeDeferred.fireWith(callbackContext, [
          jqXHR,
          statusText
        ]);
        if (fireGlobals) {
          globalEventContext.trigger('ajaxComplete', [
            jqXHR,
            s
          ]);
          if (!--jQuery.active) {
            jQuery.event.trigger('ajaxStop');
          }
        }
      }
      deferred.promise(jqXHR);
      jqXHR.success = jqXHR.done;
      jqXHR.error = jqXHR.fail;
      jqXHR.complete = completeDeferred.add;
      jqXHR.statusCode = function (map) {
        if (map) {
          var tmp;
          if (state < 2) {
            for (tmp in map) {
              statusCode[tmp] = [
                statusCode[tmp],
                map[tmp]
              ];
            }
          } else {
            tmp = map[jqXHR.status];
            jqXHR.always(tmp);
          }
        }
        return this;
      };
      s.url = ((url || s.url) + '').replace(rhash, '').replace(rprotocol, ajaxLocParts[1] + '//');
      s.dataTypes = jQuery.trim(s.dataType || '*').toLowerCase().split(core_rspace);
      if (s.crossDomain == null) {
        parts = rurl.exec(s.url.toLowerCase());
        s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === 'http:' ? 80 : 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === 'http:' ? 80 : 443))));
      }
      if (s.data && s.processData && typeof s.data !== 'string') {
        s.data = jQuery.param(s.data, s.traditional);
      }
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
      if (state === 2) {
        return jqXHR;
      }
      fireGlobals = s.global;
      s.type = s.type.toUpperCase();
      s.hasContent = !rnoContent.test(s.type);
      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger('ajaxStart');
      }
      if (!s.hasContent) {
        if (s.data) {
          s.url += (rquery.test(s.url) ? '&' : '?') + s.data;
          delete s.data;
        }
        ifModifiedKey = s.url;
        if (s.cache === false) {
          var ts = jQuery.now(), ret = s.url.replace(rts, '$1_=' + ts);
          s.url = ret + (ret === s.url ? (rquery.test(s.url) ? '&' : '?') + '_=' + ts : '');
        }
      }
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader('Content-Type', s.contentType);
      }
      if (s.ifModified) {
        ifModifiedKey = ifModifiedKey || s.url;
        if (jQuery.lastModified[ifModifiedKey]) {
          jqXHR.setRequestHeader('If-Modified-Since', jQuery.lastModified[ifModifiedKey]);
        }
        if (jQuery.etag[ifModifiedKey]) {
          jqXHR.setRequestHeader('If-None-Match', jQuery.etag[ifModifiedKey]);
        }
      }
      jqXHR.setRequestHeader('Accept', s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== '*' ? ', ' + allTypes + '; q=0.01' : '') : s.accepts['*']);
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }
      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
        return jqXHR.abort();
      }
      strAbort = 'abort';
      for (i in {
          success: 1,
          error: 1,
          complete: 1
        }) {
        jqXHR[i](s[i]);
      }
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
      if (!transport) {
        done(-1, 'No Transport');
      } else {
        jqXHR.readyState = 1;
        if (fireGlobals) {
          globalEventContext.trigger('ajaxSend', [
            jqXHR,
            s
          ]);
        }
        if (s.async && s.timeout > 0) {
          timeoutTimer = setTimeout(function () {
            jqXHR.abort('timeout');
          }, s.timeout);
        }
        try {
          state = 1;
          transport.send(requestHeaders, done);
        } catch (e) {
          if (state < 2) {
            done(-1, e);
          } else {
            throw e;
          }
        }
      }
      return jqXHR;
    },
    active: 0,
    lastModified: {},
    etag: {}
  });
  function ajaxHandleResponses(s, jqXHR, responses) {
    var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes, responseFields = s.responseFields;
    for (type in responseFields) {
      if (type in responses) {
        jqXHR[responseFields[type]] = responses[type];
      }
    }
    while (dataTypes[0] === '*') {
      dataTypes.shift();
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader('content-type');
      }
    }
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + ' ' + dataTypes[0]]) {
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          firstDataType = type;
        }
      }
      finalDataType = finalDataType || firstDataType;
    }
    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }
      return responses[finalDataType];
    }
  }
  function ajaxConvert(s, response) {
    var conv, conv2, current, tmp, dataTypes = s.dataTypes.slice(), prev = dataTypes[0], converters = {}, i = 0;
    if (s.dataFilter) {
      response = s.dataFilter(response, s.dataType);
    }
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }
    for (; current = dataTypes[++i];) {
      if (current !== '*') {
        if (prev !== '*' && prev !== current) {
          conv = converters[prev + ' ' + current] || converters['* ' + current];
          if (!conv) {
            for (conv2 in converters) {
              tmp = conv2.split(' ');
              if (tmp[1] === current) {
                conv = converters[prev + ' ' + tmp[0]] || converters['* ' + tmp[0]];
                if (conv) {
                  if (conv === true) {
                    conv = converters[conv2];
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.splice(i--, 0, current);
                  }
                  break;
                }
              }
            }
          }
          if (conv !== true) {
            if (conv && s['throws']) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: 'parsererror',
                  error: conv ? e : 'No conversion from ' + prev + ' to ' + current
                };
              }
            }
          }
        }
        prev = current;
      }
    }
    return {
      state: 'success',
      data: response
    };
  }
  var oldCallbacks = [], rquestion = /\?/, rjsonp = /(=)\?(?=&|$)|\?\?/, nonce = jQuery.now();
  jQuery.ajaxSetup({
    jsonp: 'callback',
    jsonpCallback: function () {
      var callback = oldCallbacks.pop() || jQuery.expando + '_' + nonce++;
      this[callback] = true;
      return callback;
    }
  });
  jQuery.ajaxPrefilter('json jsonp', function (s, originalSettings, jqXHR) {
    var callbackName, overwritten, responseContainer, data = s.data, url = s.url, hasCallback = s.jsonp !== false, replaceInUrl = hasCallback && rjsonp.test(url), replaceInData = hasCallback && !replaceInUrl && typeof data === 'string' && !(s.contentType || '').indexOf('application/x-www-form-urlencoded') && rjsonp.test(data);
    if (s.dataTypes[0] === 'jsonp' || replaceInUrl || replaceInData) {
      callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
      overwritten = window[callbackName];
      if (replaceInUrl) {
        s.url = url.replace(rjsonp, '$1' + callbackName);
      } else if (replaceInData) {
        s.data = data.replace(rjsonp, '$1' + callbackName);
      } else if (hasCallback) {
        s.url += (rquestion.test(url) ? '&' : '?') + s.jsonp + '=' + callbackName;
      }
      s.converters['script json'] = function () {
        if (!responseContainer) {
          jQuery.error(callbackName + ' was not called');
        }
        return responseContainer[0];
      };
      s.dataTypes[0] = 'json';
      window[callbackName] = function () {
        responseContainer = arguments;
      };
      jqXHR.always(function () {
        window[callbackName] = overwritten;
        if (s[callbackName]) {
          s.jsonpCallback = originalSettings.jsonpCallback;
          oldCallbacks.push(callbackName);
        }
        if (responseContainer && jQuery.isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }
        responseContainer = overwritten = undefined;
      });
      return 'script';
    }
  });
  jQuery.ajaxSetup({
    accepts: { script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript' },
    contents: { script: /javascript|ecmascript/ },
    converters: {
      'text script': function (text) {
        jQuery.globalEval(text);
        return text;
      }
    }
  });
  jQuery.ajaxPrefilter('script', function (s) {
    if (s.cache === undefined) {
      s.cache = false;
    }
    if (s.crossDomain) {
      s.type = 'GET';
      s.global = false;
    }
  });
  jQuery.ajaxTransport('script', function (s) {
    if (s.crossDomain) {
      var script, head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
      return {
        send: function (_, callback) {
          script = document.createElement('script');
          script.async = 'async';
          if (s.scriptCharset) {
            script.charset = s.scriptCharset;
          }
          script.src = s.url;
          script.onload = script.onreadystatechange = function (_, isAbort) {
            if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
              script.onload = script.onreadystatechange = null;
              if (head && script.parentNode) {
                head.removeChild(script);
              }
              script = undefined;
              if (!isAbort) {
                callback(200, 'success');
              }
            }
          };
          head.insertBefore(script, head.firstChild);
        },
        abort: function () {
          if (script) {
            script.onload(0, 1);
          }
        }
      };
    }
  });
  var xhrCallbacks, xhrOnUnloadAbort = window.ActiveXObject ? function () {
      for (var key in xhrCallbacks) {
        xhrCallbacks[key](0, 1);
      }
    } : false, xhrId = 0;
  function createStandardXHR() {
    try {
      return new window.XMLHttpRequest();
    } catch (e) {
    }
  }
  function createActiveXHR() {
    try {
      return new window.ActiveXObject('Microsoft.XMLHTTP');
    } catch (e) {
    }
  }
  jQuery.ajaxSettings.xhr = window.ActiveXObject ? function () {
    return !this.isLocal && createStandardXHR() || createActiveXHR();
  } : createStandardXHR;
  (function (xhr) {
    jQuery.extend(jQuery.support, {
      ajax: !!xhr,
      cors: !!xhr && 'withCredentials' in xhr
    });
  }(jQuery.ajaxSettings.xhr()));
  if (jQuery.support.ajax) {
    jQuery.ajaxTransport(function (s) {
      if (!s.crossDomain || jQuery.support.cors) {
        var callback;
        return {
          send: function (headers, complete) {
            var handle, i, xhr = s.xhr();
            if (s.username) {
              xhr.open(s.type, s.url, s.async, s.username, s.password);
            } else {
              xhr.open(s.type, s.url, s.async);
            }
            if (s.xhrFields) {
              for (i in s.xhrFields) {
                xhr[i] = s.xhrFields[i];
              }
            }
            if (s.mimeType && xhr.overrideMimeType) {
              xhr.overrideMimeType(s.mimeType);
            }
            if (!s.crossDomain && !headers['X-Requested-With']) {
              headers['X-Requested-With'] = 'XMLHttpRequest';
            }
            try {
              for (i in headers) {
                xhr.setRequestHeader(i, headers[i]);
              }
            } catch (_) {
            }
            xhr.send(s.hasContent && s.data || null);
            callback = function (_, isAbort) {
              var status, statusText, responseHeaders, responses, xml;
              try {
                if (callback && (isAbort || xhr.readyState === 4)) {
                  callback = undefined;
                  if (handle) {
                    xhr.onreadystatechange = jQuery.noop;
                    if (xhrOnUnloadAbort) {
                      delete xhrCallbacks[handle];
                    }
                  }
                  if (isAbort) {
                    if (xhr.readyState !== 4) {
                      xhr.abort();
                    }
                  } else {
                    status = xhr.status;
                    responseHeaders = xhr.getAllResponseHeaders();
                    responses = {};
                    xml = xhr.responseXML;
                    if (xml && xml.documentElement) {
                      responses.xml = xml;
                    }
                    try {
                      responses.text = xhr.responseText;
                    } catch (e) {
                    }
                    try {
                      statusText = xhr.statusText;
                    } catch (e) {
                      statusText = '';
                    }
                    if (!status && s.isLocal && !s.crossDomain) {
                      status = responses.text ? 200 : 404;
                    } else if (status === 1223) {
                      status = 204;
                    }
                  }
                }
              } catch (firefoxAccessException) {
                if (!isAbort) {
                  complete(-1, firefoxAccessException);
                }
              }
              if (responses) {
                complete(status, statusText, responses, responseHeaders);
              }
            };
            if (!s.async) {
              callback();
            } else if (xhr.readyState === 4) {
              setTimeout(callback, 0);
            } else {
              handle = ++xhrId;
              if (xhrOnUnloadAbort) {
                if (!xhrCallbacks) {
                  xhrCallbacks = {};
                  jQuery(window).unload(xhrOnUnloadAbort);
                }
                xhrCallbacks[handle] = callback;
              }
              xhr.onreadystatechange = callback;
            }
          },
          abort: function () {
            if (callback) {
              callback(0, 1);
            }
          }
        };
      }
    });
  }
  var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp('^(?:([-+])=|)(' + core_pnum + ')([a-z%]*)$', 'i'), rrun = /queueHooks$/, animationPrefilters = [defaultPrefilter], tweeners = {
      '*': [function (prop, value) {
          var end, unit, tween = this.createTween(prop, value), parts = rfxnum.exec(value), target = tween.cur(), start = +target || 0, scale = 1, maxIterations = 20;
          if (parts) {
            end = +parts[2];
            unit = parts[3] || (jQuery.cssNumber[prop] ? '' : 'px');
            if (unit !== 'px' && start) {
              start = jQuery.css(tween.elem, prop, true) || end || 1;
              do {
                scale = scale || '.5';
                start = start / scale;
                jQuery.style(tween.elem, prop, start + unit);
              } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
            }
            tween.unit = unit;
            tween.start = start;
            tween.end = parts[1] ? start + (parts[1] + 1) * end : end;
          }
          return tween;
        }]
    };
  function createFxNow() {
    setTimeout(function () {
      fxNow = undefined;
    }, 0);
    return fxNow = jQuery.now();
  }
  function createTweens(animation, props) {
    jQuery.each(props, function (prop, value) {
      var collection = (tweeners[prop] || []).concat(tweeners['*']), index = 0, length = collection.length;
      for (; index < length; index++) {
        if (collection[index].call(animation, prop, value)) {
          return;
        }
      }
    });
  }
  function Animation(elem, properties, options) {
    var result, index = 0, tweenerIndex = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function () {
        delete tick.elem;
      }), tick = function () {
        var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length;
        for (; index < length; index++) {
          animation.tweens[index].run(percent);
        }
        deferred.notifyWith(elem, [
          animation,
          percent,
          remaining
        ]);
        if (percent < 1 && length) {
          return remaining;
        } else {
          deferred.resolveWith(elem, [animation]);
          return false;
        }
      }, animation = deferred.promise({
        elem: elem,
        props: jQuery.extend({}, properties),
        opts: jQuery.extend(true, { specialEasing: {} }, options),
        originalProperties: properties,
        originalOptions: options,
        startTime: fxNow || createFxNow(),
        duration: options.duration,
        tweens: [],
        createTween: function (prop, end, easing) {
          var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
          animation.tweens.push(tween);
          return tween;
        },
        stop: function (gotoEnd) {
          var index = 0, length = gotoEnd ? animation.tweens.length : 0;
          for (; index < length; index++) {
            animation.tweens[index].run(1);
          }
          if (gotoEnd) {
            deferred.resolveWith(elem, [
              animation,
              gotoEnd
            ]);
          } else {
            deferred.rejectWith(elem, [
              animation,
              gotoEnd
            ]);
          }
          return this;
        }
      }), props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (; index < length; index++) {
      result = animationPrefilters[index].call(animation, elem, props, animation.opts);
      if (result) {
        return result;
      }
    }
    createTweens(animation, props);
    if (jQuery.isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    }
    jQuery.fx.timer(jQuery.extend(tick, {
      anim: animation,
      queue: animation.opts.queue,
      elem: elem
    }));
    return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
  }
  function propFilter(props, specialEasing) {
    var index, name, easing, value, hooks;
    for (index in props) {
      name = jQuery.camelCase(index);
      easing = specialEasing[name];
      value = props[index];
      if (jQuery.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }
      if (index !== name) {
        props[name] = value;
        delete props[index];
      }
      hooks = jQuery.cssHooks[name];
      if (hooks && 'expand' in hooks) {
        value = hooks.expand(value);
        delete props[name];
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }
  jQuery.Animation = jQuery.extend(Animation, {
    tweener: function (props, callback) {
      if (jQuery.isFunction(props)) {
        callback = props;
        props = ['*'];
      } else {
        props = props.split(' ');
      }
      var prop, index = 0, length = props.length;
      for (; index < length; index++) {
        prop = props[index];
        tweeners[prop] = tweeners[prop] || [];
        tweeners[prop].unshift(callback);
      }
    },
    prefilter: function (callback, prepend) {
      if (prepend) {
        animationPrefilters.unshift(callback);
      } else {
        animationPrefilters.push(callback);
      }
    }
  });
  function defaultPrefilter(elem, props, opts) {
    var index, prop, value, length, dataShow, toggle, tween, hooks, oldfire, anim = this, style = elem.style, orig = {}, handled = [], hidden = elem.nodeType && isHidden(elem);
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, 'fx');
      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;
        hooks.empty.fire = function () {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;
      anim.always(function () {
        anim.always(function () {
          hooks.unqueued--;
          if (!jQuery.queue(elem, 'fx').length) {
            hooks.empty.fire();
          }
        });
      });
    }
    if (elem.nodeType === 1 && ('height' in props || 'width' in props)) {
      opts.overflow = [
        style.overflow,
        style.overflowX,
        style.overflowY
      ];
      if (jQuery.css(elem, 'display') === 'inline' && jQuery.css(elem, 'float') === 'none') {
        if (!jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay(elem.nodeName) === 'inline') {
          style.display = 'inline-block';
        } else {
          style.zoom = 1;
        }
      }
    }
    if (opts.overflow) {
      style.overflow = 'hidden';
      if (!jQuery.support.shrinkWrapBlocks) {
        anim.done(function () {
          style.overflow = opts.overflow[0];
          style.overflowX = opts.overflow[1];
          style.overflowY = opts.overflow[2];
        });
      }
    }
    for (index in props) {
      value = props[index];
      if (rfxtypes.exec(value)) {
        delete props[index];
        toggle = toggle || value === 'toggle';
        if (value === (hidden ? 'hide' : 'show')) {
          continue;
        }
        handled.push(index);
      }
    }
    length = handled.length;
    if (length) {
      dataShow = jQuery._data(elem, 'fxshow') || jQuery._data(elem, 'fxshow', {});
      if ('hidden' in dataShow) {
        hidden = dataShow.hidden;
      }
      if (toggle) {
        dataShow.hidden = !hidden;
      }
      if (hidden) {
        jQuery(elem).show();
      } else {
        anim.done(function () {
          jQuery(elem).hide();
        });
      }
      anim.done(function () {
        var prop;
        jQuery.removeData(elem, 'fxshow', true);
        for (prop in orig) {
          jQuery.style(elem, prop, orig[prop]);
        }
      });
      for (index = 0; index < length; index++) {
        prop = handled[index];
        tween = anim.createTween(prop, hidden ? dataShow[prop] : 0);
        orig[prop] = dataShow[prop] || jQuery.style(elem, prop);
        if (!(prop in dataShow)) {
          dataShow[prop] = tween.start;
          if (hidden) {
            tween.end = tween.start;
            tween.start = prop === 'width' || prop === 'height' ? 1 : 0;
          }
        }
      }
    }
  }
  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }
  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function (elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || 'swing';
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? '' : 'px');
    },
    cur: function () {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run: function (percent) {
      var eased, hooks = Tween.propHooks[this.prop];
      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
      } else {
        this.pos = eased = percent;
      }
      this.now = (this.end - this.start) * eased + this.start;
      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }
      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }
      return this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {
    _default: {
      get: function (tween) {
        var result;
        if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
          return tween.elem[tween.prop];
        }
        result = jQuery.css(tween.elem, tween.prop, false, '');
        return !result || result === 'auto' ? 0 : result;
      },
      set: function (tween) {
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      }
    }
  };
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set: function (tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    }
  };
  jQuery.each([
    'toggle',
    'show',
    'hide'
  ], function (i, name) {
    var cssFn = jQuery.fn[name];
    jQuery.fn[name] = function (speed, easing, callback) {
      return speed == null || typeof speed === 'boolean' || !i && jQuery.isFunction(speed) && jQuery.isFunction(easing) ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
    };
  });
  jQuery.fn.extend({
    fadeTo: function (speed, to, easing, callback) {
      return this.filter(isHidden).css('opacity', 0).show().end().animate({ opacity: to }, speed, easing, callback);
    },
    animate: function (prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function () {
          var anim = Animation(this, jQuery.extend({}, prop), optall);
          if (empty) {
            anim.stop(true);
          }
        };
      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    stop: function (type, clearQueue, gotoEnd) {
      var stopQueue = function (hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd);
      };
      if (typeof type !== 'string') {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }
      if (clearQueue && type !== false) {
        this.queue(type || 'fx', []);
      }
      return this.each(function () {
        var dequeue = true, index = type != null && type + 'queueHooks', timers = jQuery.timers, data = jQuery._data(this);
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }
        for (index = timers.length; index--;) {
          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        }
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    }
  });
  function genFx(type, includeWidth) {
    var which, attrs = { height: type }, i = 0;
    includeWidth = includeWidth ? 1 : 0;
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs['margin' + which] = attrs['padding' + which] = type;
    }
    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }
    return attrs;
  }
  jQuery.each({
    slideDown: genFx('show'),
    slideUp: genFx('hide'),
    slideToggle: genFx('toggle'),
    fadeIn: { opacity: 'show' },
    fadeOut: { opacity: 'hide' },
    fadeToggle: { opacity: 'toggle' }
  }, function (name, props) {
    jQuery.fn[name] = function (speed, easing, callback) {
      return this.animate(props, speed, easing, callback);
    };
  });
  jQuery.speed = function (speed, easing, fn) {
    var opt = speed && typeof speed === 'object' ? jQuery.extend({}, speed) : {
        complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
        duration: speed,
        easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
      };
    opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === 'number' ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
    if (opt.queue == null || opt.queue === true) {
      opt.queue = 'fx';
    }
    opt.old = opt.complete;
    opt.complete = function () {
      if (jQuery.isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    };
    return opt;
  };
  jQuery.easing = {
    linear: function (p) {
      return p;
    },
    swing: function (p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    }
  };
  jQuery.timers = [];
  jQuery.fx = Tween.prototype.init;
  jQuery.fx.tick = function () {
    var timer, timers = jQuery.timers, i = 0;
    fxNow = jQuery.now();
    for (; i < timers.length; i++) {
      timer = timers[i];
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }
    if (!timers.length) {
      jQuery.fx.stop();
    }
    fxNow = undefined;
  };
  jQuery.fx.timer = function (timer) {
    if (timer() && jQuery.timers.push(timer) && !timerId) {
      timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
    }
  };
  jQuery.fx.interval = 13;
  jQuery.fx.stop = function () {
    clearInterval(timerId);
    timerId = null;
  };
  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  };
  jQuery.fx.step = {};
  if (jQuery.expr && jQuery.expr.filters) {
    jQuery.expr.filters.animated = function (elem) {
      return jQuery.grep(jQuery.timers, function (fn) {
        return elem === fn.elem;
      }).length;
    };
  }
  var rroot = /^(?:body|html)$/i;
  jQuery.fn.offset = function (options) {
    if (arguments.length) {
      return options === undefined ? this : this.each(function (i) {
        jQuery.offset.setOffset(this, options, i);
      });
    }
    var docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft, box = {
        top: 0,
        left: 0
      }, elem = this[0], doc = elem && elem.ownerDocument;
    if (!doc) {
      return;
    }
    if ((body = doc.body) === elem) {
      return jQuery.offset.bodyOffset(elem);
    }
    docElem = doc.documentElement;
    if (!jQuery.contains(docElem, elem)) {
      return box;
    }
    if (typeof elem.getBoundingClientRect !== 'undefined') {
      box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    clientTop = docElem.clientTop || body.clientTop || 0;
    clientLeft = docElem.clientLeft || body.clientLeft || 0;
    scrollTop = win.pageYOffset || docElem.scrollTop;
    scrollLeft = win.pageXOffset || docElem.scrollLeft;
    return {
      top: box.top + scrollTop - clientTop,
      left: box.left + scrollLeft - clientLeft
    };
  };
  jQuery.offset = {
    bodyOffset: function (body) {
      var top = body.offsetTop, left = body.offsetLeft;
      if (jQuery.support.doesNotIncludeMarginInBodyOffset) {
        top += parseFloat(jQuery.css(body, 'marginTop')) || 0;
        left += parseFloat(jQuery.css(body, 'marginLeft')) || 0;
      }
      return {
        top: top,
        left: left
      };
    },
    setOffset: function (elem, options, i) {
      var position = jQuery.css(elem, 'position');
      if (position === 'static') {
        elem.style.position = 'relative';
      }
      var curElem = jQuery(elem), curOffset = curElem.offset(), curCSSTop = jQuery.css(elem, 'top'), curCSSLeft = jQuery.css(elem, 'left'), calculatePosition = (position === 'absolute' || position === 'fixed') && jQuery.inArray('auto', [
          curCSSTop,
          curCSSLeft
        ]) > -1, props = {}, curPosition = {}, curTop, curLeft;
      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }
      if (jQuery.isFunction(options)) {
        options = options.call(elem, i, curOffset);
      }
      if (options.top != null) {
        props.top = options.top - curOffset.top + curTop;
      }
      if (options.left != null) {
        props.left = options.left - curOffset.left + curLeft;
      }
      if ('using' in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    }
  };
  jQuery.fn.extend({
    position: function () {
      if (!this[0]) {
        return;
      }
      var elem = this[0], offsetParent = this.offsetParent(), offset = this.offset(), parentOffset = rroot.test(offsetParent[0].nodeName) ? {
          top: 0,
          left: 0
        } : offsetParent.offset();
      offset.top -= parseFloat(jQuery.css(elem, 'marginTop')) || 0;
      offset.left -= parseFloat(jQuery.css(elem, 'marginLeft')) || 0;
      parentOffset.top += parseFloat(jQuery.css(offsetParent[0], 'borderTopWidth')) || 0;
      parentOffset.left += parseFloat(jQuery.css(offsetParent[0], 'borderLeftWidth')) || 0;
      return {
        top: offset.top - parentOffset.top,
        left: offset.left - parentOffset.left
      };
    },
    offsetParent: function () {
      return this.map(function () {
        var offsetParent = this.offsetParent || document.body;
        while (offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, 'position') === 'static')) {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || document.body;
      });
    }
  });
  jQuery.each({
    scrollLeft: 'pageXOffset',
    scrollTop: 'pageYOffset'
  }, function (method, prop) {
    var top = /Y/.test(prop);
    jQuery.fn[method] = function (val) {
      return jQuery.access(this, function (elem, method, val) {
        var win = getWindow(elem);
        if (val === undefined) {
          return win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method];
        }
        if (win) {
          win.scrollTo(!top ? val : jQuery(win).scrollLeft(), top ? val : jQuery(win).scrollTop());
        } else {
          elem[method] = val;
        }
      }, method, val, arguments.length, null);
    };
  });
  function getWindow(elem) {
    return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
  }
  jQuery.each({
    Height: 'height',
    Width: 'width'
  }, function (name, type) {
    jQuery.each({
      padding: 'inner' + name,
      content: type,
      '': 'outer' + name
    }, function (defaultExtra, funcName) {
      jQuery.fn[funcName] = function (margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== 'boolean'), extra = defaultExtra || (margin === true || value === true ? 'margin' : 'border');
        return jQuery.access(this, function (elem, type, value) {
          var doc;
          if (jQuery.isWindow(elem)) {
            return elem.document.documentElement['client' + name];
          }
          if (elem.nodeType === 9) {
            doc = elem.documentElement;
            return Math.max(elem.body['scroll' + name], doc['scroll' + name], elem.body['offset' + name], doc['offset' + name], doc['client' + name]);
          }
          return value === undefined ? jQuery.css(elem, type, value, extra) : jQuery.style(elem, type, value, extra);
        }, type, chainable ? margin : undefined, chainable, null);
      };
    });
  });
  window.jQuery = window.$ = jQuery;
  if (typeof define === 'function' && define.amd && define.amd.jQuery) {
    define('jquery', [], function () {
      return jQuery;
    });
  }
}(window));
(function (a, b) {
  function c(b, c) {
    var e = b.nodeName.toLowerCase();
    if ('area' === e) {
      var f = b.parentNode, g = f.name, h;
      return !b.href || !g || f.nodeName.toLowerCase() !== 'map' ? !1 : (h = a('img[usemap=#' + g + ']')[0], !!h && d(h));
    }
    return (/input|select|textarea|button|object/.test(e) ? !b.disabled : 'a' == e ? b.href || c : c) && d(b);
  }
  function d(b) {
    return !a(b).parents().andSelf().filter(function () {
      return a.curCSS(this, 'visibility') === 'hidden' || a.expr.filters.hidden(this);
    }).length;
  }
  a.ui = a.ui || {};
  if (a.ui.version)
    return;
  a.extend(a.ui, {
    version: '1.8.23',
    keyCode: {
      ALT: 18,
      BACKSPACE: 8,
      CAPS_LOCK: 20,
      COMMA: 188,
      COMMAND: 91,
      COMMAND_LEFT: 91,
      COMMAND_RIGHT: 93,
      CONTROL: 17,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      INSERT: 45,
      LEFT: 37,
      MENU: 93,
      NUMPAD_ADD: 107,
      NUMPAD_DECIMAL: 110,
      NUMPAD_DIVIDE: 111,
      NUMPAD_ENTER: 108,
      NUMPAD_MULTIPLY: 106,
      NUMPAD_SUBTRACT: 109,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SHIFT: 16,
      SPACE: 32,
      TAB: 9,
      UP: 38,
      WINDOWS: 91
    }
  }), a.fn.extend({
    propAttr: a.fn.prop || a.fn.attr,
    _focus: a.fn.focus,
    focus: function (b, c) {
      return typeof b == 'number' ? this.each(function () {
        var d = this;
        setTimeout(function () {
          a(d).focus(), c && c.call(d);
        }, b);
      }) : this._focus.apply(this, arguments);
    },
    scrollParent: function () {
      var b;
      return a.browser.msie && /(static|relative)/.test(this.css('position')) || /absolute/.test(this.css('position')) ? b = this.parents().filter(function () {
        return /(relative|absolute|fixed)/.test(a.curCSS(this, 'position', 1)) && /(auto|scroll)/.test(a.curCSS(this, 'overflow', 1) + a.curCSS(this, 'overflow-y', 1) + a.curCSS(this, 'overflow-x', 1));
      }).eq(0) : b = this.parents().filter(function () {
        return /(auto|scroll)/.test(a.curCSS(this, 'overflow', 1) + a.curCSS(this, 'overflow-y', 1) + a.curCSS(this, 'overflow-x', 1));
      }).eq(0), /fixed/.test(this.css('position')) || !b.length ? a(document) : b;
    },
    zIndex: function (c) {
      if (c !== b)
        return this.css('zIndex', c);
      if (this.length) {
        var d = a(this[0]), e, f;
        while (d.length && d[0] !== document) {
          e = d.css('position');
          if (e === 'absolute' || e === 'relative' || e === 'fixed') {
            f = parseInt(d.css('zIndex'), 10);
            if (!isNaN(f) && f !== 0)
              return f;
          }
          d = d.parent();
        }
      }
      return 0;
    },
    disableSelection: function () {
      return this.bind((a.support.selectstart ? 'selectstart' : 'mousedown') + '.ui-disableSelection', function (a) {
        a.preventDefault();
      });
    },
    enableSelection: function () {
      return this.unbind('.ui-disableSelection');
    }
  }), a('<a>').outerWidth(1).jquery || a.each([
    'Width',
    'Height'
  ], function (c, d) {
    function h(b, c, d, f) {
      return a.each(e, function () {
        c -= parseFloat(a.curCSS(b, 'padding' + this, !0)) || 0, d && (c -= parseFloat(a.curCSS(b, 'border' + this + 'Width', !0)) || 0), f && (c -= parseFloat(a.curCSS(b, 'margin' + this, !0)) || 0);
      }), c;
    }
    var e = d === 'Width' ? [
        'Left',
        'Right'
      ] : [
        'Top',
        'Bottom'
      ], f = d.toLowerCase(), g = {
        innerWidth: a.fn.innerWidth,
        innerHeight: a.fn.innerHeight,
        outerWidth: a.fn.outerWidth,
        outerHeight: a.fn.outerHeight
      };
    a.fn['inner' + d] = function (c) {
      return c === b ? g['inner' + d].call(this) : this.each(function () {
        a(this).css(f, h(this, c) + 'px');
      });
    }, a.fn['outer' + d] = function (b, c) {
      return typeof b != 'number' ? g['outer' + d].call(this, b) : this.each(function () {
        a(this).css(f, h(this, b, !0, c) + 'px');
      });
    };
  }), a.extend(a.expr[':'], {
    data: a.expr.createPseudo ? a.expr.createPseudo(function (b) {
      return function (c) {
        return !!a.data(c, b);
      };
    }) : function (b, c, d) {
      return !!a.data(b, d[3]);
    },
    focusable: function (b) {
      return c(b, !isNaN(a.attr(b, 'tabindex')));
    },
    tabbable: function (b) {
      var d = a.attr(b, 'tabindex'), e = isNaN(d);
      return (e || d >= 0) && c(b, !e);
    }
  }), a(function () {
    var b = document.body, c = b.appendChild(c = document.createElement('div'));
    c.offsetHeight, a.extend(c.style, {
      minHeight: '100px',
      height: 'auto',
      padding: 0,
      borderWidth: 0
    }), a.support.minHeight = c.offsetHeight === 100, a.support.selectstart = 'onselectstart' in c, b.removeChild(c).style.display = 'none';
  }), a.curCSS || (a.curCSS = a.css), a.extend(a.ui, {
    plugin: {
      add: function (b, c, d) {
        var e = a.ui[b].prototype;
        for (var f in d)
          e.plugins[f] = e.plugins[f] || [], e.plugins[f].push([
            c,
            d[f]
          ]);
      },
      call: function (a, b, c) {
        var d = a.plugins[b];
        if (!d || !a.element[0].parentNode)
          return;
        for (var e = 0; e < d.length; e++)
          a.options[d[e][0]] && d[e][1].apply(a.element, c);
      }
    },
    contains: function (a, b) {
      return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b);
    },
    hasScroll: function (b, c) {
      if (a(b).css('overflow') === 'hidden')
        return !1;
      var d = c && c === 'left' ? 'scrollLeft' : 'scrollTop', e = !1;
      return b[d] > 0 ? !0 : (b[d] = 1, e = b[d] > 0, b[d] = 0, e);
    },
    isOverAxis: function (a, b, c) {
      return a > b && a < b + c;
    },
    isOver: function (b, c, d, e, f, g) {
      return a.ui.isOverAxis(b, d, f) && a.ui.isOverAxis(c, e, g);
    }
  });
}(jQuery), function (a, b) {
  if (a.cleanData) {
    var c = a.cleanData;
    a.cleanData = function (b) {
      for (var d = 0, e; (e = b[d]) != null; d++)
        try {
          a(e).triggerHandler('remove');
        } catch (f) {
        }
      c(b);
    };
  } else {
    var d = a.fn.remove;
    a.fn.remove = function (b, c) {
      return this.each(function () {
        return c || (!b || a.filter(b, [this]).length) && a('*', this).add([this]).each(function () {
          try {
            a(this).triggerHandler('remove');
          } catch (b) {
          }
        }), d.call(a(this), b, c);
      });
    };
  }
  a.widget = function (b, c, d) {
    var e = b.split('.')[0], f;
    b = b.split('.')[1], f = e + '-' + b, d || (d = c, c = a.Widget), a.expr[':'][f] = function (c) {
      return !!a.data(c, b);
    }, a[e] = a[e] || {}, a[e][b] = function (a, b) {
      arguments.length && this._createWidget(a, b);
    };
    var g = new c();
    g.options = a.extend(!0, {}, g.options), a[e][b].prototype = a.extend(!0, g, {
      namespace: e,
      widgetName: b,
      widgetEventPrefix: a[e][b].prototype.widgetEventPrefix || b,
      widgetBaseClass: f
    }, d), a.widget.bridge(b, a[e][b]);
  }, a.widget.bridge = function (c, d) {
    a.fn[c] = function (e) {
      var f = typeof e == 'string', g = Array.prototype.slice.call(arguments, 1), h = this;
      return e = !f && g.length ? a.extend.apply(null, [
        !0,
        e
      ].concat(g)) : e, f && e.charAt(0) === '_' ? h : (f ? this.each(function () {
        var d = a.data(this, c), f = d && a.isFunction(d[e]) ? d[e].apply(d, g) : d;
        if (f !== d && f !== b)
          return h = f, !1;
      }) : this.each(function () {
        var b = a.data(this, c);
        b ? b.option(e || {})._init() : a.data(this, c, new d(e, this));
      }), h);
    };
  }, a.Widget = function (a, b) {
    arguments.length && this._createWidget(a, b);
  }, a.Widget.prototype = {
    widgetName: 'widget',
    widgetEventPrefix: '',
    options: { disabled: !1 },
    _createWidget: function (b, c) {
      a.data(c, this.widgetName, this), this.element = a(c), this.options = a.extend(!0, {}, this.options, this._getCreateOptions(), b);
      var d = this;
      this.element.bind('remove.' + this.widgetName, function () {
        d.destroy();
      }), this._create(), this._trigger('create'), this._init();
    },
    _getCreateOptions: function () {
      return a.metadata && a.metadata.get(this.element[0])[this.widgetName];
    },
    _create: function () {
    },
    _init: function () {
    },
    destroy: function () {
      this.element.unbind('.' + this.widgetName).removeData(this.widgetName), this.widget().unbind('.' + this.widgetName).removeAttr('aria-disabled').removeClass(this.widgetBaseClass + '-disabled ' + 'ui-state-disabled');
    },
    widget: function () {
      return this.element;
    },
    option: function (c, d) {
      var e = c;
      if (arguments.length === 0)
        return a.extend({}, this.options);
      if (typeof c == 'string') {
        if (d === b)
          return this.options[c];
        e = {}, e[c] = d;
      }
      return this._setOptions(e), this;
    },
    _setOptions: function (b) {
      var c = this;
      return a.each(b, function (a, b) {
        c._setOption(a, b);
      }), this;
    },
    _setOption: function (a, b) {
      return this.options[a] = b, a === 'disabled' && this.widget()[b ? 'addClass' : 'removeClass'](this.widgetBaseClass + '-disabled' + ' ' + 'ui-state-disabled').attr('aria-disabled', b), this;
    },
    enable: function () {
      return this._setOption('disabled', !1);
    },
    disable: function () {
      return this._setOption('disabled', !0);
    },
    _trigger: function (b, c, d) {
      var e, f, g = this.options[b];
      d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent;
      if (f)
        for (e in f)
          e in c || (c[e] = f[e]);
      return this.element.trigger(c, d), !(a.isFunction(g) && g.call(this.element[0], c, d) === !1 || c.isDefaultPrevented());
    }
  };
}(jQuery), function (a, b) {
  var c = !1;
  a(document).mouseup(function (a) {
    c = !1;
  }), a.widget('ui.mouse', {
    options: {
      cancel: ':input,option',
      distance: 1,
      delay: 0
    },
    _mouseInit: function () {
      var b = this;
      this.element.bind('mousedown.' + this.widgetName, function (a) {
        return b._mouseDown(a);
      }).bind('click.' + this.widgetName, function (c) {
        if (!0 === a.data(c.target, b.widgetName + '.preventClickEvent'))
          return a.removeData(c.target, b.widgetName + '.preventClickEvent'), c.stopImmediatePropagation(), !1;
      }), this.started = !1;
    },
    _mouseDestroy: function () {
      this.element.unbind('.' + this.widgetName), this._mouseMoveDelegate && a(document).unbind('mousemove.' + this.widgetName, this._mouseMoveDelegate).unbind('mouseup.' + this.widgetName, this._mouseUpDelegate);
    },
    _mouseDown: function (b) {
      if (c)
        return;
      this._mouseStarted && this._mouseUp(b), this._mouseDownEvent = b;
      var d = this, e = b.which == 1, f = typeof this.options.cancel == 'string' && b.target.nodeName ? a(b.target).closest(this.options.cancel).length : !1;
      if (!e || f || !this._mouseCapture(b))
        return !0;
      this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
        d.mouseDelayMet = !0;
      }, this.options.delay));
      if (this._mouseDistanceMet(b) && this._mouseDelayMet(b)) {
        this._mouseStarted = this._mouseStart(b) !== !1;
        if (!this._mouseStarted)
          return b.preventDefault(), !0;
      }
      return !0 === a.data(b.target, this.widgetName + '.preventClickEvent') && a.removeData(b.target, this.widgetName + '.preventClickEvent'), this._mouseMoveDelegate = function (a) {
        return d._mouseMove(a);
      }, this._mouseUpDelegate = function (a) {
        return d._mouseUp(a);
      }, a(document).bind('mousemove.' + this.widgetName, this._mouseMoveDelegate).bind('mouseup.' + this.widgetName, this._mouseUpDelegate), b.preventDefault(), c = !0, !0;
    },
    _mouseMove: function (b) {
      return !a.browser.msie || document.documentMode >= 9 || !!b.button ? this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted) : this._mouseUp(b);
    },
    _mouseUp: function (b) {
      return a(document).unbind('mousemove.' + this.widgetName, this._mouseMoveDelegate).unbind('mouseup.' + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, b.target == this._mouseDownEvent.target && a.data(b.target, this.widgetName + '.preventClickEvent', !0), this._mouseStop(b)), !1;
    },
    _mouseDistanceMet: function (a) {
      return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance;
    },
    _mouseDelayMet: function (a) {
      return this.mouseDelayMet;
    },
    _mouseStart: function (a) {
    },
    _mouseDrag: function (a) {
    },
    _mouseStop: function (a) {
    },
    _mouseCapture: function (a) {
      return !0;
    }
  });
}(jQuery), function (a, b) {
  a.widget('ui.draggable', a.ui.mouse, {
    widgetEventPrefix: 'drag',
    options: {
      addClasses: !0,
      appendTo: 'parent',
      axis: !1,
      connectToSortable: !1,
      containment: !1,
      cursor: 'auto',
      cursorAt: !1,
      grid: !1,
      handle: !1,
      helper: 'original',
      iframeFix: !1,
      opacity: !1,
      refreshPositions: !1,
      revert: !1,
      revertDuration: 500,
      scope: 'default',
      scroll: !0,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      snap: !1,
      snapMode: 'both',
      snapTolerance: 20,
      stack: !1,
      zIndex: !1
    },
    _create: function () {
      this.options.helper == 'original' && !/^(?:r|a|f)/.test(this.element.css('position')) && (this.element[0].style.position = 'relative'), this.options.addClasses && this.element.addClass('ui-draggable'), this.options.disabled && this.element.addClass('ui-draggable-disabled'), this._mouseInit();
    },
    destroy: function () {
      if (!this.element.data('draggable'))
        return;
      return this.element.removeData('draggable').unbind('.draggable').removeClass('ui-draggable ui-draggable-dragging ui-draggable-disabled'), this._mouseDestroy(), this;
    },
    _mouseCapture: function (b) {
      var c = this.options;
      return this.helper || c.disabled || a(b.target).is('.ui-resizable-handle') ? !1 : (this.handle = this._getHandle(b), this.handle ? (c.iframeFix && a(c.iframeFix === !0 ? 'iframe' : c.iframeFix).each(function () {
        a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
          width: this.offsetWidth + 'px',
          height: this.offsetHeight + 'px',
          position: 'absolute',
          opacity: '0.001',
          zIndex: 1000
        }).css(a(this).offset()).appendTo('body');
      }), !0) : !1);
    },
    _mouseStart: function (b) {
      var c = this.options;
      return this.helper = this._createHelper(b), this.helper.addClass('ui-draggable-dragging'), this._cacheHelperProportions(), a.ui.ddmanager && (a.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css('position'), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {
        top: this.offset.top - this.margins.top,
        left: this.offset.left - this.margins.left
      }, a.extend(this.offset, {
        click: {
          left: b.pageX - this.offset.left,
          top: b.pageY - this.offset.top
        },
        parent: this._getParentOffset(),
        relative: this._getRelativeOffset()
      }), this.originalPosition = this.position = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt), c.containment && this._setContainment(), this._trigger('start', b) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this._mouseDrag(b, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b), !0);
    },
    _mouseDrag: function (b, c) {
      this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo('absolute');
      if (!c) {
        var d = this._uiHash();
        if (this._trigger('drag', b, d) === !1)
          return this._mouseUp({}), !1;
        this.position = d.position;
      }
      if (!this.options.axis || this.options.axis != 'y')
        this.helper[0].style.left = this.position.left + 'px';
      if (!this.options.axis || this.options.axis != 'x')
        this.helper[0].style.top = this.position.top + 'px';
      return a.ui.ddmanager && a.ui.ddmanager.drag(this, b), !1;
    },
    _mouseStop: function (b) {
      var c = !1;
      a.ui.ddmanager && !this.options.dropBehaviour && (c = a.ui.ddmanager.drop(this, b)), this.dropped && (c = this.dropped, this.dropped = !1);
      var d = this.element[0], e = !1;
      while (d && (d = d.parentNode))
        d == document && (e = !0);
      if (!e && this.options.helper === 'original')
        return !1;
      if (this.options.revert == 'invalid' && !c || this.options.revert == 'valid' && c || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, c)) {
        var f = this;
        a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
          f._trigger('stop', b) !== !1 && f._clear();
        });
      } else
        this._trigger('stop', b) !== !1 && this._clear();
      return !1;
    },
    _mouseUp: function (b) {
      return this.options.iframeFix === !0 && a('div.ui-draggable-iframeFix').each(function () {
        this.parentNode.removeChild(this);
      }), a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b), a.ui.mouse.prototype._mouseUp.call(this, b);
    },
    cancel: function () {
      return this.helper.is('.ui-draggable-dragging') ? this._mouseUp({}) : this._clear(), this;
    },
    _getHandle: function (b) {
      var c = !this.options.handle || !a(this.options.handle, this.element).length ? !0 : !1;
      return a(this.options.handle, this.element).find('*').andSelf().each(function () {
        this == b.target && (c = !0);
      }), c;
    },
    _createHelper: function (b) {
      var c = this.options, d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b])) : c.helper == 'clone' ? this.element.clone().removeAttr('id') : this.element;
      return d.parents('body').length || d.appendTo(c.appendTo == 'parent' ? this.element[0].parentNode : c.appendTo), d[0] != this.element[0] && !/(fixed|absolute)/.test(d.css('position')) && d.css('position', 'absolute'), d;
    },
    _adjustOffsetFromHelper: function (b) {
      typeof b == 'string' && (b = b.split(' ')), a.isArray(b) && (b = {
        left: +b[0],
        top: +b[1] || 0
      }), 'left' in b && (this.offset.click.left = b.left + this.margins.left), 'right' in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), 'top' in b && (this.offset.click.top = b.top + this.margins.top), 'bottom' in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top);
    },
    _getParentOffset: function () {
      this.offsetParent = this.helper.offsetParent();
      var b = this.offsetParent.offset();
      this.cssPosition == 'absolute' && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop());
      if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == 'html' && a.browser.msie)
        b = {
          top: 0,
          left: 0
        };
      return {
        top: b.top + (parseInt(this.offsetParent.css('borderTopWidth'), 10) || 0),
        left: b.left + (parseInt(this.offsetParent.css('borderLeftWidth'), 10) || 0)
      };
    },
    _getRelativeOffset: function () {
      if (this.cssPosition == 'relative') {
        var a = this.element.position();
        return {
          top: a.top - (parseInt(this.helper.css('top'), 10) || 0) + this.scrollParent.scrollTop(),
          left: a.left - (parseInt(this.helper.css('left'), 10) || 0) + this.scrollParent.scrollLeft()
        };
      }
      return {
        top: 0,
        left: 0
      };
    },
    _cacheMargins: function () {
      this.margins = {
        left: parseInt(this.element.css('marginLeft'), 10) || 0,
        top: parseInt(this.element.css('marginTop'), 10) || 0,
        right: parseInt(this.element.css('marginRight'), 10) || 0,
        bottom: parseInt(this.element.css('marginBottom'), 10) || 0
      };
    },
    _cacheHelperProportions: function () {
      this.helperProportions = {
        width: this.helper.outerWidth(),
        height: this.helper.outerHeight()
      };
    },
    _setContainment: function () {
      var b = this.options;
      b.containment == 'parent' && (b.containment = this.helper[0].parentNode);
      if (b.containment == 'document' || b.containment == 'window')
        this.containment = [
          b.containment == 'document' ? 0 : a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
          b.containment == 'document' ? 0 : a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top,
          (b.containment == 'document' ? 0 : a(window).scrollLeft()) + a(b.containment == 'document' ? document : window).width() - this.helperProportions.width - this.margins.left,
          (b.containment == 'document' ? 0 : a(window).scrollTop()) + (a(b.containment == 'document' ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
        ];
      if (!/^(document|window|parent)$/.test(b.containment) && b.containment.constructor != Array) {
        var c = a(b.containment), d = c[0];
        if (!d)
          return;
        var e = c.offset(), f = a(d).css('overflow') != 'hidden';
        this.containment = [
          (parseInt(a(d).css('borderLeftWidth'), 10) || 0) + (parseInt(a(d).css('paddingLeft'), 10) || 0),
          (parseInt(a(d).css('borderTopWidth'), 10) || 0) + (parseInt(a(d).css('paddingTop'), 10) || 0),
          (f ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(a(d).css('borderLeftWidth'), 10) || 0) - (parseInt(a(d).css('paddingRight'), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right,
          (f ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(a(d).css('borderTopWidth'), 10) || 0) - (parseInt(a(d).css('paddingBottom'), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom
        ], this.relative_container = c;
      } else
        b.containment.constructor == Array && (this.containment = b.containment);
    },
    _convertPositionTo: function (b, c) {
      c || (c = this.position);
      var d = b == 'absolute' ? 1 : -1, e = this.options, f = this.cssPosition == 'absolute' && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, g = /(html|body)/i.test(f[0].tagName);
      return {
        top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == 'fixed' ? 0 : (this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()) * d),
        left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == 'fixed' ? 0 : (this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft()) * d)
      };
    },
    _generatePosition: function (b) {
      var c = this.options, d = this.cssPosition == 'absolute' && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, e = /(html|body)/i.test(d[0].tagName), f = b.pageX, g = b.pageY;
      if (this.originalPosition) {
        var h;
        if (this.containment) {
          if (this.relative_container) {
            var i = this.relative_container.offset();
            h = [
              this.containment[0] + i.left,
              this.containment[1] + i.top,
              this.containment[2] + i.left,
              this.containment[3] + i.top
            ];
          } else
            h = this.containment;
          b.pageX - this.offset.click.left < h[0] && (f = h[0] + this.offset.click.left), b.pageY - this.offset.click.top < h[1] && (g = h[1] + this.offset.click.top), b.pageX - this.offset.click.left > h[2] && (f = h[2] + this.offset.click.left), b.pageY - this.offset.click.top > h[3] && (g = h[3] + this.offset.click.top);
        }
        if (c.grid) {
          var j = c.grid[1] ? this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1] : this.originalPageY;
          g = h ? j - this.offset.click.top < h[1] || j - this.offset.click.top > h[3] ? j - this.offset.click.top < h[1] ? j + c.grid[1] : j - c.grid[1] : j : j;
          var k = c.grid[0] ? this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0] : this.originalPageX;
          f = h ? k - this.offset.click.left < h[0] || k - this.offset.click.left > h[2] ? k - this.offset.click.left < h[0] ? k + c.grid[0] : k - c.grid[0] : k : k;
        }
      }
      return {
        top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && a.browser.version < 526 && this.cssPosition == 'fixed' ? 0 : this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : e ? 0 : d.scrollTop()),
        left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && a.browser.version < 526 && this.cssPosition == 'fixed' ? 0 : this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : e ? 0 : d.scrollLeft())
      };
    },
    _clear: function () {
      this.helper.removeClass('ui-draggable-dragging'), this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1;
    },
    _trigger: function (b, c, d) {
      return d = d || this._uiHash(), a.ui.plugin.call(this, b, [
        c,
        d
      ]), b == 'drag' && (this.positionAbs = this._convertPositionTo('absolute')), a.Widget.prototype._trigger.call(this, b, c, d);
    },
    plugins: {},
    _uiHash: function (a) {
      return {
        helper: this.helper,
        position: this.position,
        originalPosition: this.originalPosition,
        offset: this.positionAbs
      };
    }
  }), a.extend(a.ui.draggable, { version: '1.8.23' }), a.ui.plugin.add('draggable', 'connectToSortable', {
    start: function (b, c) {
      var d = a(this).data('draggable'), e = d.options, f = a.extend({}, c, { item: d.element });
      d.sortables = [], a(e.connectToSortable).each(function () {
        var c = a.data(this, 'sortable');
        c && !c.options.disabled && (d.sortables.push({
          instance: c,
          shouldRevert: c.options.revert
        }), c.refreshPositions(), c._trigger('activate', b, f));
      });
    },
    stop: function (b, c) {
      var d = a(this).data('draggable'), e = a.extend({}, c, { item: d.element });
      a.each(d.sortables, function () {
        this.instance.isOver ? (this.instance.isOver = 0, d.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(b), this.instance.options.helper = this.instance.options._helper, d.options.helper == 'original' && this.instance.currentItem.css({
          top: 'auto',
          left: 'auto'
        })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger('deactivate', b, e));
      });
    },
    drag: function (b, c) {
      var d = a(this).data('draggable'), e = this, f = function (b) {
          var c = this.offset.click.top, d = this.offset.click.left, e = this.positionAbs.top, f = this.positionAbs.left, g = b.height, h = b.width, i = b.top, j = b.left;
          return a.ui.isOver(e + c, f + d, i, j, g, h);
        };
      a.each(d.sortables, function (f) {
        this.instance.positionAbs = d.positionAbs, this.instance.helperProportions = d.helperProportions, this.instance.offset.click = d.offset.click, this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = a(e).clone().removeAttr('id').appendTo(this.instance.element).data('sortable-item', !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function () {
          return c.helper[0];
        }, b.target = this.instance.currentItem[0], this.instance._mouseCapture(b, !0), this.instance._mouseStart(b, !0, !0), this.instance.offset.click.top = d.offset.click.top, this.instance.offset.click.left = d.offset.click.left, this.instance.offset.parent.left -= d.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= d.offset.parent.top - this.instance.offset.parent.top, d._trigger('toSortable', b), d.dropped = this.instance.element, d.currentItem = d.element, this.instance.fromOutside = d), this.instance.currentItem && this.instance._mouseDrag(b)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger('out', b, this.instance._uiHash(this.instance)), this.instance._mouseStop(b, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), d._trigger('fromSortable', b), d.dropped = !1);
      });
    }
  }), a.ui.plugin.add('draggable', 'cursor', {
    start: function (b, c) {
      var d = a('body'), e = a(this).data('draggable').options;
      d.css('cursor') && (e._cursor = d.css('cursor')), d.css('cursor', e.cursor);
    },
    stop: function (b, c) {
      var d = a(this).data('draggable').options;
      d._cursor && a('body').css('cursor', d._cursor);
    }
  }), a.ui.plugin.add('draggable', 'opacity', {
    start: function (b, c) {
      var d = a(c.helper), e = a(this).data('draggable').options;
      d.css('opacity') && (e._opacity = d.css('opacity')), d.css('opacity', e.opacity);
    },
    stop: function (b, c) {
      var d = a(this).data('draggable').options;
      d._opacity && a(c.helper).css('opacity', d._opacity);
    }
  }), a.ui.plugin.add('draggable', 'scroll', {
    start: function (b, c) {
      var d = a(this).data('draggable');
      d.scrollParent[0] != document && d.scrollParent[0].tagName != 'HTML' && (d.overflowOffset = d.scrollParent.offset());
    },
    drag: function (b, c) {
      var d = a(this).data('draggable'), e = d.options, f = !1;
      if (d.scrollParent[0] != document && d.scrollParent[0].tagName != 'HTML') {
        if (!e.axis || e.axis != 'x')
          d.overflowOffset.top + d.scrollParent[0].offsetHeight - b.pageY < e.scrollSensitivity ? d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop + e.scrollSpeed : b.pageY - d.overflowOffset.top < e.scrollSensitivity && (d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop - e.scrollSpeed);
        if (!e.axis || e.axis != 'y')
          d.overflowOffset.left + d.scrollParent[0].offsetWidth - b.pageX < e.scrollSensitivity ? d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft + e.scrollSpeed : b.pageX - d.overflowOffset.left < e.scrollSensitivity && (d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft - e.scrollSpeed);
      } else {
        if (!e.axis || e.axis != 'x')
          b.pageY - a(document).scrollTop() < e.scrollSensitivity ? f = a(document).scrollTop(a(document).scrollTop() - e.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < e.scrollSensitivity && (f = a(document).scrollTop(a(document).scrollTop() + e.scrollSpeed));
        if (!e.axis || e.axis != 'y')
          b.pageX - a(document).scrollLeft() < e.scrollSensitivity ? f = a(document).scrollLeft(a(document).scrollLeft() - e.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < e.scrollSensitivity && (f = a(document).scrollLeft(a(document).scrollLeft() + e.scrollSpeed));
      }
      f !== !1 && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(d, b);
    }
  }), a.ui.plugin.add('draggable', 'snap', {
    start: function (b, c) {
      var d = a(this).data('draggable'), e = d.options;
      d.snapElements = [], a(e.snap.constructor != String ? e.snap.items || ':data(draggable)' : e.snap).each(function () {
        var b = a(this), c = b.offset();
        this != d.element[0] && d.snapElements.push({
          item: this,
          width: b.outerWidth(),
          height: b.outerHeight(),
          top: c.top,
          left: c.left
        });
      });
    },
    drag: function (b, c) {
      var d = a(this).data('draggable'), e = d.options, f = e.snapTolerance, g = c.offset.left, h = g + d.helperProportions.width, i = c.offset.top, j = i + d.helperProportions.height;
      for (var k = d.snapElements.length - 1; k >= 0; k--) {
        var l = d.snapElements[k].left, m = l + d.snapElements[k].width, n = d.snapElements[k].top, o = n + d.snapElements[k].height;
        if (!(l - f < g && g < m + f && n - f < i && i < o + f || l - f < g && g < m + f && n - f < j && j < o + f || l - f < h && h < m + f && n - f < i && i < o + f || l - f < h && h < m + f && n - f < j && j < o + f)) {
          d.snapElements[k].snapping && d.options.snap.release && d.options.snap.release.call(d.element, b, a.extend(d._uiHash(), { snapItem: d.snapElements[k].item })), d.snapElements[k].snapping = !1;
          continue;
        }
        if (e.snapMode != 'inner') {
          var p = Math.abs(n - j) <= f, q = Math.abs(o - i) <= f, r = Math.abs(l - h) <= f, s = Math.abs(m - g) <= f;
          p && (c.position.top = d._convertPositionTo('relative', {
            top: n - d.helperProportions.height,
            left: 0
          }).top - d.margins.top), q && (c.position.top = d._convertPositionTo('relative', {
            top: o,
            left: 0
          }).top - d.margins.top), r && (c.position.left = d._convertPositionTo('relative', {
            top: 0,
            left: l - d.helperProportions.width
          }).left - d.margins.left), s && (c.position.left = d._convertPositionTo('relative', {
            top: 0,
            left: m
          }).left - d.margins.left);
        }
        var t = p || q || r || s;
        if (e.snapMode != 'outer') {
          var p = Math.abs(n - i) <= f, q = Math.abs(o - j) <= f, r = Math.abs(l - g) <= f, s = Math.abs(m - h) <= f;
          p && (c.position.top = d._convertPositionTo('relative', {
            top: n,
            left: 0
          }).top - d.margins.top), q && (c.position.top = d._convertPositionTo('relative', {
            top: o - d.helperProportions.height,
            left: 0
          }).top - d.margins.top), r && (c.position.left = d._convertPositionTo('relative', {
            top: 0,
            left: l
          }).left - d.margins.left), s && (c.position.left = d._convertPositionTo('relative', {
            top: 0,
            left: m - d.helperProportions.width
          }).left - d.margins.left);
        }
        !d.snapElements[k].snapping && (p || q || r || s || t) && d.options.snap.snap && d.options.snap.snap.call(d.element, b, a.extend(d._uiHash(), { snapItem: d.snapElements[k].item })), d.snapElements[k].snapping = p || q || r || s || t;
      }
    }
  }), a.ui.plugin.add('draggable', 'stack', {
    start: function (b, c) {
      var d = a(this).data('draggable').options, e = a.makeArray(a(d.stack)).sort(function (b, c) {
          return (parseInt(a(b).css('zIndex'), 10) || 0) - (parseInt(a(c).css('zIndex'), 10) || 0);
        });
      if (!e.length)
        return;
      var f = parseInt(e[0].style.zIndex) || 0;
      a(e).each(function (a) {
        this.style.zIndex = f + a;
      }), this[0].style.zIndex = f + e.length;
    }
  }), a.ui.plugin.add('draggable', 'zIndex', {
    start: function (b, c) {
      var d = a(c.helper), e = a(this).data('draggable').options;
      d.css('zIndex') && (e._zIndex = d.css('zIndex')), d.css('zIndex', e.zIndex);
    },
    stop: function (b, c) {
      var d = a(this).data('draggable').options;
      d._zIndex && a(c.helper).css('zIndex', d._zIndex);
    }
  });
}(jQuery), function (a, b) {
  a.widget('ui.droppable', {
    widgetEventPrefix: 'drop',
    options: {
      accept: '*',
      activeClass: !1,
      addClasses: !0,
      greedy: !1,
      hoverClass: !1,
      scope: 'default',
      tolerance: 'intersect'
    },
    _create: function () {
      var b = this.options, c = b.accept;
      this.isover = 0, this.isout = 1, this.accept = a.isFunction(c) ? c : function (a) {
        return a.is(c);
      }, this.proportions = {
        width: this.element[0].offsetWidth,
        height: this.element[0].offsetHeight
      }, a.ui.ddmanager.droppables[b.scope] = a.ui.ddmanager.droppables[b.scope] || [], a.ui.ddmanager.droppables[b.scope].push(this), b.addClasses && this.element.addClass('ui-droppable');
    },
    destroy: function () {
      var b = a.ui.ddmanager.droppables[this.options.scope];
      for (var c = 0; c < b.length; c++)
        b[c] == this && b.splice(c, 1);
      return this.element.removeClass('ui-droppable ui-droppable-disabled').removeData('droppable').unbind('.droppable'), this;
    },
    _setOption: function (b, c) {
      b == 'accept' && (this.accept = a.isFunction(c) ? c : function (a) {
        return a.is(c);
      }), a.Widget.prototype._setOption.apply(this, arguments);
    },
    _activate: function (b) {
      var c = a.ui.ddmanager.current;
      this.options.activeClass && this.element.addClass(this.options.activeClass), c && this._trigger('activate', b, this.ui(c));
    },
    _deactivate: function (b) {
      var c = a.ui.ddmanager.current;
      this.options.activeClass && this.element.removeClass(this.options.activeClass), c && this._trigger('deactivate', b, this.ui(c));
    },
    _over: function (b) {
      var c = a.ui.ddmanager.current;
      if (!c || (c.currentItem || c.element)[0] == this.element[0])
        return;
      this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger('over', b, this.ui(c)));
    },
    _out: function (b) {
      var c = a.ui.ddmanager.current;
      if (!c || (c.currentItem || c.element)[0] == this.element[0])
        return;
      this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger('out', b, this.ui(c)));
    },
    _drop: function (b, c) {
      var d = c || a.ui.ddmanager.current;
      if (!d || (d.currentItem || d.element)[0] == this.element[0])
        return !1;
      var e = !1;
      return this.element.find(':data(droppable)').not('.ui-draggable-dragging').each(function () {
        var b = a.data(this, 'droppable');
        if (b.options.greedy && !b.options.disabled && b.options.scope == d.options.scope && b.accept.call(b.element[0], d.currentItem || d.element) && a.ui.intersect(d, a.extend(b, { offset: b.element.offset() }), b.options.tolerance))
          return e = !0, !1;
      }), e ? !1 : this.accept.call(this.element[0], d.currentItem || d.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger('drop', b, this.ui(d)), this.element) : !1;
    },
    ui: function (a) {
      return {
        draggable: a.currentItem || a.element,
        helper: a.helper,
        position: a.position,
        offset: a.positionAbs
      };
    }
  }), a.extend(a.ui.droppable, { version: '1.8.23' }), a.ui.intersect = function (b, c, d) {
    if (!c.offset)
      return !1;
    var e = (b.positionAbs || b.position.absolute).left, f = e + b.helperProportions.width, g = (b.positionAbs || b.position.absolute).top, h = g + b.helperProportions.height, i = c.offset.left, j = i + c.proportions.width, k = c.offset.top, l = k + c.proportions.height;
    switch (d) {
    case 'fit':
      return i <= e && f <= j && k <= g && h <= l;
    case 'intersect':
      return i < e + b.helperProportions.width / 2 && f - b.helperProportions.width / 2 < j && k < g + b.helperProportions.height / 2 && h - b.helperProportions.height / 2 < l;
    case 'pointer':
      var m = (b.positionAbs || b.position.absolute).left + (b.clickOffset || b.offset.click).left, n = (b.positionAbs || b.position.absolute).top + (b.clickOffset || b.offset.click).top, o = a.ui.isOver(n, m, k, i, c.proportions.height, c.proportions.width);
      return o;
    case 'touch':
      return (g >= k && g <= l || h >= k && h <= l || g < k && h > l) && (e >= i && e <= j || f >= i && f <= j || e < i && f > j);
    default:
      return !1;
    }
  }, a.ui.ddmanager = {
    current: null,
    droppables: { 'default': [] },
    prepareOffsets: function (b, c) {
      var d = a.ui.ddmanager.droppables[b.options.scope] || [], e = c ? c.type : null, f = (b.currentItem || b.element).find(':data(droppable)').andSelf();
      g:
        for (var h = 0; h < d.length; h++) {
          if (d[h].options.disabled || b && !d[h].accept.call(d[h].element[0], b.currentItem || b.element))
            continue;
          for (var i = 0; i < f.length; i++)
            if (f[i] == d[h].element[0]) {
              d[h].proportions.height = 0;
              continue g;
            }
          d[h].visible = d[h].element.css('display') != 'none';
          if (!d[h].visible)
            continue;
          e == 'mousedown' && d[h]._activate.call(d[h], c), d[h].offset = d[h].element.offset(), d[h].proportions = {
            width: d[h].element[0].offsetWidth,
            height: d[h].element[0].offsetHeight
          };
        }
    },
    drop: function (b, c) {
      var d = !1;
      return a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function () {
        if (!this.options)
          return;
        !this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance) && (d = this._drop.call(this, c) || d), !this.options.disabled && this.visible && this.accept.call(this.element[0], b.currentItem || b.element) && (this.isout = 1, this.isover = 0, this._deactivate.call(this, c));
      }), d;
    },
    dragStart: function (b, c) {
      b.element.parents(':not(body,html)').bind('scroll.droppable', function () {
        b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c);
      });
    },
    drag: function (b, c) {
      b.options.refreshPositions && a.ui.ddmanager.prepareOffsets(b, c), a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function () {
        if (this.options.disabled || this.greedyChild || !this.visible)
          return;
        var d = a.ui.intersect(b, this, this.options.tolerance), e = !d && this.isover == 1 ? 'isout' : d && this.isover == 0 ? 'isover' : null;
        if (!e)
          return;
        var f;
        if (this.options.greedy) {
          var g = this.element.parents(':data(droppable):eq(0)');
          g.length && (f = a.data(g[0], 'droppable'), f.greedyChild = e == 'isover' ? 1 : 0);
        }
        f && e == 'isover' && (f.isover = 0, f.isout = 1, f._out.call(f, c)), this[e] = 1, this[e == 'isout' ? 'isover' : 'isout'] = 0, this[e == 'isover' ? '_over' : '_out'].call(this, c), f && e == 'isout' && (f.isout = 0, f.isover = 1, f._over.call(f, c));
      });
    },
    dragStop: function (b, c) {
      b.element.parents(':not(body,html)').unbind('scroll.droppable'), b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c);
    }
  };
}(jQuery), function (a, b) {
  a.widget('ui.resizable', a.ui.mouse, {
    widgetEventPrefix: 'resize',
    options: {
      alsoResize: !1,
      animate: !1,
      animateDuration: 'slow',
      animateEasing: 'swing',
      aspectRatio: !1,
      autoHide: !1,
      containment: !1,
      ghost: !1,
      grid: !1,
      handles: 'e,s,se',
      helper: !1,
      maxHeight: null,
      maxWidth: null,
      minHeight: 10,
      minWidth: 10,
      zIndex: 1000
    },
    _create: function () {
      var b = this, c = this.options;
      this.element.addClass('ui-resizable'), a.extend(this, {
        _aspectRatio: !!c.aspectRatio,
        aspectRatio: c.aspectRatio,
        originalElement: this.element,
        _proportionallyResizeElements: [],
        _helper: c.helper || c.ghost || c.animate ? c.helper || 'ui-resizable-helper' : null
      }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
        position: this.element.css('position'),
        width: this.element.outerWidth(),
        height: this.element.outerHeight(),
        top: this.element.css('top'),
        left: this.element.css('left')
      })), this.element = this.element.parent().data('resizable', this.element.data('resizable')), this.elementIsWrapper = !0, this.element.css({
        marginLeft: this.originalElement.css('marginLeft'),
        marginTop: this.originalElement.css('marginTop'),
        marginRight: this.originalElement.css('marginRight'),
        marginBottom: this.originalElement.css('marginBottom')
      }), this.originalElement.css({
        marginLeft: 0,
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0
      }), this.originalResizeStyle = this.originalElement.css('resize'), this.originalElement.css('resize', 'none'), this._proportionallyResizeElements.push(this.originalElement.css({
        position: 'static',
        zoom: 1,
        display: 'block'
      })), this.originalElement.css({ margin: this.originalElement.css('margin') }), this._proportionallyResize()), this.handles = c.handles || (a('.ui-resizable-handle', this.element).length ? {
        n: '.ui-resizable-n',
        e: '.ui-resizable-e',
        s: '.ui-resizable-s',
        w: '.ui-resizable-w',
        se: '.ui-resizable-se',
        sw: '.ui-resizable-sw',
        ne: '.ui-resizable-ne',
        nw: '.ui-resizable-nw'
      } : 'e,s,se');
      if (this.handles.constructor == String) {
        this.handles == 'all' && (this.handles = 'n,e,s,w,se,sw,ne,nw');
        var d = this.handles.split(',');
        this.handles = {};
        for (var e = 0; e < d.length; e++) {
          var f = a.trim(d[e]), g = 'ui-resizable-' + f, h = a('<div class="ui-resizable-handle ' + g + '"></div>');
          h.css({ zIndex: c.zIndex }), 'se' == f && h.addClass('ui-icon ui-icon-gripsmall-diagonal-se'), this.handles[f] = '.ui-resizable-' + f, this.element.append(h);
        }
      }
      this._renderAxis = function (b) {
        b = b || this.element;
        for (var c in this.handles) {
          this.handles[c].constructor == String && (this.handles[c] = a(this.handles[c], this.element).show());
          if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
            var d = a(this.handles[c], this.element), e = 0;
            e = /sw|ne|nw|se|n|s/.test(c) ? d.outerHeight() : d.outerWidth();
            var f = [
                'padding',
                /ne|nw|n/.test(c) ? 'Top' : /se|sw|s/.test(c) ? 'Bottom' : /^e$/.test(c) ? 'Right' : 'Left'
              ].join('');
            b.css(f, e), this._proportionallyResize();
          }
          if (!a(this.handles[c]).length)
            continue;
        }
      }, this._renderAxis(this.element), this._handles = a('.ui-resizable-handle', this.element).disableSelection(), this._handles.mouseover(function () {
        if (!b.resizing) {
          if (this.className)
            var a = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
          b.axis = a && a[1] ? a[1] : 'se';
        }
      }), c.autoHide && (this._handles.hide(), a(this.element).addClass('ui-resizable-autohide').hover(function () {
        if (c.disabled)
          return;
        a(this).removeClass('ui-resizable-autohide'), b._handles.show();
      }, function () {
        if (c.disabled)
          return;
        b.resizing || (a(this).addClass('ui-resizable-autohide'), b._handles.hide());
      })), this._mouseInit();
    },
    destroy: function () {
      this._mouseDestroy();
      var b = function (b) {
        a(b).removeClass('ui-resizable ui-resizable-disabled ui-resizable-resizing').removeData('resizable').unbind('.resizable').find('.ui-resizable-handle').remove();
      };
      if (this.elementIsWrapper) {
        b(this.element);
        var c = this.element;
        c.after(this.originalElement.css({
          position: c.css('position'),
          width: c.outerWidth(),
          height: c.outerHeight(),
          top: c.css('top'),
          left: c.css('left')
        })).remove();
      }
      return this.originalElement.css('resize', this.originalResizeStyle), b(this.originalElement), this;
    },
    _mouseCapture: function (b) {
      var c = !1;
      for (var d in this.handles)
        a(this.handles[d])[0] == b.target && (c = !0);
      return !this.options.disabled && c;
    },
    _mouseStart: function (b) {
      var d = this.options, e = this.element.position(), f = this.element;
      this.resizing = !0, this.documentScroll = {
        top: a(document).scrollTop(),
        left: a(document).scrollLeft()
      }, (f.is('.ui-draggable') || /absolute/.test(f.css('position'))) && f.css({
        position: 'absolute',
        top: e.top,
        left: e.left
      }), this._renderProxy();
      var g = c(this.helper.css('left')), h = c(this.helper.css('top'));
      d.containment && (g += a(d.containment).scrollLeft() || 0, h += a(d.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
        left: g,
        top: h
      }, this.size = this._helper ? {
        width: f.outerWidth(),
        height: f.outerHeight()
      } : {
        width: f.width(),
        height: f.height()
      }, this.originalSize = this._helper ? {
        width: f.outerWidth(),
        height: f.outerHeight()
      } : {
        width: f.width(),
        height: f.height()
      }, this.originalPosition = {
        left: g,
        top: h
      }, this.sizeDiff = {
        width: f.outerWidth() - f.width(),
        height: f.outerHeight() - f.height()
      }, this.originalMousePosition = {
        left: b.pageX,
        top: b.pageY
      }, this.aspectRatio = typeof d.aspectRatio == 'number' ? d.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
      var i = a('.ui-resizable-' + this.axis).css('cursor');
      return a('body').css('cursor', i == 'auto' ? this.axis + '-resize' : i), f.addClass('ui-resizable-resizing'), this._propagate('start', b), !0;
    },
    _mouseDrag: function (b) {
      var c = this.helper, d = this.options, e = {}, f = this, g = this.originalMousePosition, h = this.axis, i = b.pageX - g.left || 0, j = b.pageY - g.top || 0, k = this._change[h];
      if (!k)
        return !1;
      var l = k.apply(this, [
          b,
          i,
          j
        ]), m = a.browser.msie && a.browser.version < 7, n = this.sizeDiff;
      this._updateVirtualBoundaries(b.shiftKey);
      if (this._aspectRatio || b.shiftKey)
        l = this._updateRatio(l, b);
      return l = this._respectSize(l, b), this._propagate('resize', b), c.css({
        top: this.position.top + 'px',
        left: this.position.left + 'px',
        width: this.size.width + 'px',
        height: this.size.height + 'px'
      }), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), this._updateCache(l), this._trigger('resize', b, this.ui()), !1;
    },
    _mouseStop: function (b) {
      this.resizing = !1;
      var c = this.options, d = this;
      if (this._helper) {
        var e = this._proportionallyResizeElements, f = e.length && /textarea/i.test(e[0].nodeName), g = f && a.ui.hasScroll(e[0], 'left') ? 0 : d.sizeDiff.height, h = f ? 0 : d.sizeDiff.width, i = {
            width: d.helper.width() - h,
            height: d.helper.height() - g
          }, j = parseInt(d.element.css('left'), 10) + (d.position.left - d.originalPosition.left) || null, k = parseInt(d.element.css('top'), 10) + (d.position.top - d.originalPosition.top) || null;
        c.animate || this.element.css(a.extend(i, {
          top: k,
          left: j
        })), d.helper.height(d.size.height), d.helper.width(d.size.width), this._helper && !c.animate && this._proportionallyResize();
      }
      return a('body').css('cursor', 'auto'), this.element.removeClass('ui-resizable-resizing'), this._propagate('stop', b), this._helper && this.helper.remove(), !1;
    },
    _updateVirtualBoundaries: function (a) {
      var b = this.options, c, e, f, g, h;
      h = {
        minWidth: d(b.minWidth) ? b.minWidth : 0,
        maxWidth: d(b.maxWidth) ? b.maxWidth : Infinity,
        minHeight: d(b.minHeight) ? b.minHeight : 0,
        maxHeight: d(b.maxHeight) ? b.maxHeight : Infinity
      };
      if (this._aspectRatio || a)
        c = h.minHeight * this.aspectRatio, f = h.minWidth / this.aspectRatio, e = h.maxHeight * this.aspectRatio, g = h.maxWidth / this.aspectRatio, c > h.minWidth && (h.minWidth = c), f > h.minHeight && (h.minHeight = f), e < h.maxWidth && (h.maxWidth = e), g < h.maxHeight && (h.maxHeight = g);
      this._vBoundaries = h;
    },
    _updateCache: function (a) {
      var b = this.options;
      this.offset = this.helper.offset(), d(a.left) && (this.position.left = a.left), d(a.top) && (this.position.top = a.top), d(a.height) && (this.size.height = a.height), d(a.width) && (this.size.width = a.width);
    },
    _updateRatio: function (a, b) {
      var c = this.options, e = this.position, f = this.size, g = this.axis;
      return d(a.height) ? a.width = a.height * this.aspectRatio : d(a.width) && (a.height = a.width / this.aspectRatio), g == 'sw' && (a.left = e.left + (f.width - a.width), a.top = null), g == 'nw' && (a.top = e.top + (f.height - a.height), a.left = e.left + (f.width - a.width)), a;
    },
    _respectSize: function (a, b) {
      var c = this.helper, e = this._vBoundaries, f = this._aspectRatio || b.shiftKey, g = this.axis, h = d(a.width) && e.maxWidth && e.maxWidth < a.width, i = d(a.height) && e.maxHeight && e.maxHeight < a.height, j = d(a.width) && e.minWidth && e.minWidth > a.width, k = d(a.height) && e.minHeight && e.minHeight > a.height;
      j && (a.width = e.minWidth), k && (a.height = e.minHeight), h && (a.width = e.maxWidth), i && (a.height = e.maxHeight);
      var l = this.originalPosition.left + this.originalSize.width, m = this.position.top + this.size.height, n = /sw|nw|w/.test(g), o = /nw|ne|n/.test(g);
      j && n && (a.left = l - e.minWidth), h && n && (a.left = l - e.maxWidth), k && o && (a.top = m - e.minHeight), i && o && (a.top = m - e.maxHeight);
      var p = !a.width && !a.height;
      return p && !a.left && a.top ? a.top = null : p && !a.top && a.left && (a.left = null), a;
    },
    _proportionallyResize: function () {
      var b = this.options;
      if (!this._proportionallyResizeElements.length)
        return;
      var c = this.helper || this.element;
      for (var d = 0; d < this._proportionallyResizeElements.length; d++) {
        var e = this._proportionallyResizeElements[d];
        if (!this.borderDif) {
          var f = [
              e.css('borderTopWidth'),
              e.css('borderRightWidth'),
              e.css('borderBottomWidth'),
              e.css('borderLeftWidth')
            ], g = [
              e.css('paddingTop'),
              e.css('paddingRight'),
              e.css('paddingBottom'),
              e.css('paddingLeft')
            ];
          this.borderDif = a.map(f, function (a, b) {
            var c = parseInt(a, 10) || 0, d = parseInt(g[b], 10) || 0;
            return c + d;
          });
        }
        if (!a.browser.msie || !a(c).is(':hidden') && !a(c).parents(':hidden').length)
          e.css({
            height: c.height() - this.borderDif[0] - this.borderDif[2] || 0,
            width: c.width() - this.borderDif[1] - this.borderDif[3] || 0
          });
        else
          continue;
      }
    },
    _renderProxy: function () {
      var b = this.element, c = this.options;
      this.elementOffset = b.offset();
      if (this._helper) {
        this.helper = this.helper || a('<div style="overflow:hidden;"></div>');
        var d = a.browser.msie && a.browser.version < 7, e = d ? 1 : 0, f = d ? 2 : -1;
        this.helper.addClass(this._helper).css({
          width: this.element.outerWidth() + f,
          height: this.element.outerHeight() + f,
          position: 'absolute',
          left: this.elementOffset.left - e + 'px',
          top: this.elementOffset.top - e + 'px',
          zIndex: ++c.zIndex
        }), this.helper.appendTo('body').disableSelection();
      } else
        this.helper = this.element;
    },
    _change: {
      e: function (a, b, c) {
        return { width: this.originalSize.width + b };
      },
      w: function (a, b, c) {
        var d = this.options, e = this.originalSize, f = this.originalPosition;
        return {
          left: f.left + b,
          width: e.width - b
        };
      },
      n: function (a, b, c) {
        var d = this.options, e = this.originalSize, f = this.originalPosition;
        return {
          top: f.top + c,
          height: e.height - c
        };
      },
      s: function (a, b, c) {
        return { height: this.originalSize.height + c };
      },
      se: function (b, c, d) {
        return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [
          b,
          c,
          d
        ]));
      },
      sw: function (b, c, d) {
        return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [
          b,
          c,
          d
        ]));
      },
      ne: function (b, c, d) {
        return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [
          b,
          c,
          d
        ]));
      },
      nw: function (b, c, d) {
        return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [
          b,
          c,
          d
        ]));
      }
    },
    _propagate: function (b, c) {
      a.ui.plugin.call(this, b, [
        c,
        this.ui()
      ]), b != 'resize' && this._trigger(b, c, this.ui());
    },
    plugins: {},
    ui: function () {
      return {
        originalElement: this.originalElement,
        element: this.element,
        helper: this.helper,
        position: this.position,
        size: this.size,
        originalSize: this.originalSize,
        originalPosition: this.originalPosition
      };
    }
  }), a.extend(a.ui.resizable, { version: '1.8.23' }), a.ui.plugin.add('resizable', 'alsoResize', {
    start: function (b, c) {
      var d = a(this).data('resizable'), e = d.options, f = function (b) {
          a(b).each(function () {
            var b = a(this);
            b.data('resizable-alsoresize', {
              width: parseInt(b.width(), 10),
              height: parseInt(b.height(), 10),
              left: parseInt(b.css('left'), 10),
              top: parseInt(b.css('top'), 10)
            });
          });
        };
      typeof e.alsoResize == 'object' && !e.alsoResize.parentNode ? e.alsoResize.length ? (e.alsoResize = e.alsoResize[0], f(e.alsoResize)) : a.each(e.alsoResize, function (a) {
        f(a);
      }) : f(e.alsoResize);
    },
    resize: function (b, c) {
      var d = a(this).data('resizable'), e = d.options, f = d.originalSize, g = d.originalPosition, h = {
          height: d.size.height - f.height || 0,
          width: d.size.width - f.width || 0,
          top: d.position.top - g.top || 0,
          left: d.position.left - g.left || 0
        }, i = function (b, d) {
          a(b).each(function () {
            var b = a(this), e = a(this).data('resizable-alsoresize'), f = {}, g = d && d.length ? d : b.parents(c.originalElement[0]).length ? [
                'width',
                'height'
              ] : [
                'width',
                'height',
                'top',
                'left'
              ];
            a.each(g, function (a, b) {
              var c = (e[b] || 0) + (h[b] || 0);
              c && c >= 0 && (f[b] = c || null);
            }), b.css(f);
          });
        };
      typeof e.alsoResize == 'object' && !e.alsoResize.nodeType ? a.each(e.alsoResize, function (a, b) {
        i(a, b);
      }) : i(e.alsoResize);
    },
    stop: function (b, c) {
      a(this).removeData('resizable-alsoresize');
    }
  }), a.ui.plugin.add('resizable', 'animate', {
    stop: function (b, c) {
      var d = a(this).data('resizable'), e = d.options, f = d._proportionallyResizeElements, g = f.length && /textarea/i.test(f[0].nodeName), h = g && a.ui.hasScroll(f[0], 'left') ? 0 : d.sizeDiff.height, i = g ? 0 : d.sizeDiff.width, j = {
          width: d.size.width - i,
          height: d.size.height - h
        }, k = parseInt(d.element.css('left'), 10) + (d.position.left - d.originalPosition.left) || null, l = parseInt(d.element.css('top'), 10) + (d.position.top - d.originalPosition.top) || null;
      d.element.animate(a.extend(j, l && k ? {
        top: l,
        left: k
      } : {}), {
        duration: e.animateDuration,
        easing: e.animateEasing,
        step: function () {
          var c = {
              width: parseInt(d.element.css('width'), 10),
              height: parseInt(d.element.css('height'), 10),
              top: parseInt(d.element.css('top'), 10),
              left: parseInt(d.element.css('left'), 10)
            };
          f && f.length && a(f[0]).css({
            width: c.width,
            height: c.height
          }), d._updateCache(c), d._propagate('resize', b);
        }
      });
    }
  }), a.ui.plugin.add('resizable', 'containment', {
    start: function (b, d) {
      var e = a(this).data('resizable'), f = e.options, g = e.element, h = f.containment, i = h instanceof a ? h.get(0) : /parent/.test(h) ? g.parent().get(0) : h;
      if (!i)
        return;
      e.containerElement = a(i);
      if (/document/.test(h) || h == document)
        e.containerOffset = {
          left: 0,
          top: 0
        }, e.containerPosition = {
          left: 0,
          top: 0
        }, e.parentData = {
          element: a(document),
          left: 0,
          top: 0,
          width: a(document).width(),
          height: a(document).height() || document.body.parentNode.scrollHeight
        };
      else {
        var j = a(i), k = [];
        a([
          'Top',
          'Right',
          'Left',
          'Bottom'
        ]).each(function (a, b) {
          k[a] = c(j.css('padding' + b));
        }), e.containerOffset = j.offset(), e.containerPosition = j.position(), e.containerSize = {
          height: j.innerHeight() - k[3],
          width: j.innerWidth() - k[1]
        };
        var l = e.containerOffset, m = e.containerSize.height, n = e.containerSize.width, o = a.ui.hasScroll(i, 'left') ? i.scrollWidth : n, p = a.ui.hasScroll(i) ? i.scrollHeight : m;
        e.parentData = {
          element: i,
          left: l.left,
          top: l.top,
          width: o,
          height: p
        };
      }
    },
    resize: function (b, c) {
      var d = a(this).data('resizable'), e = d.options, f = d.containerSize, g = d.containerOffset, h = d.size, i = d.position, j = d._aspectRatio || b.shiftKey, k = {
          top: 0,
          left: 0
        }, l = d.containerElement;
      l[0] != document && /static/.test(l.css('position')) && (k = g), i.left < (d._helper ? g.left : 0) && (d.size.width = d.size.width + (d._helper ? d.position.left - g.left : d.position.left - k.left), j && (d.size.height = d.size.width / d.aspectRatio), d.position.left = e.helper ? g.left : 0), i.top < (d._helper ? g.top : 0) && (d.size.height = d.size.height + (d._helper ? d.position.top - g.top : d.position.top), j && (d.size.width = d.size.height * d.aspectRatio), d.position.top = d._helper ? g.top : 0), d.offset.left = d.parentData.left + d.position.left, d.offset.top = d.parentData.top + d.position.top;
      var m = Math.abs((d._helper ? d.offset.left - k.left : d.offset.left - k.left) + d.sizeDiff.width), n = Math.abs((d._helper ? d.offset.top - k.top : d.offset.top - g.top) + d.sizeDiff.height), o = d.containerElement.get(0) == d.element.parent().get(0), p = /relative|absolute/.test(d.containerElement.css('position'));
      o && p && (m -= d.parentData.left), m + d.size.width >= d.parentData.width && (d.size.width = d.parentData.width - m, j && (d.size.height = d.size.width / d.aspectRatio)), n + d.size.height >= d.parentData.height && (d.size.height = d.parentData.height - n, j && (d.size.width = d.size.height * d.aspectRatio));
    },
    stop: function (b, c) {
      var d = a(this).data('resizable'), e = d.options, f = d.position, g = d.containerOffset, h = d.containerPosition, i = d.containerElement, j = a(d.helper), k = j.offset(), l = j.outerWidth() - d.sizeDiff.width, m = j.outerHeight() - d.sizeDiff.height;
      d._helper && !e.animate && /relative/.test(i.css('position')) && a(this).css({
        left: k.left - h.left - g.left,
        width: l,
        height: m
      }), d._helper && !e.animate && /static/.test(i.css('position')) && a(this).css({
        left: k.left - h.left - g.left,
        width: l,
        height: m
      });
    }
  }), a.ui.plugin.add('resizable', 'ghost', {
    start: function (b, c) {
      var d = a(this).data('resizable'), e = d.options, f = d.size;
      d.ghost = d.originalElement.clone(), d.ghost.css({
        opacity: 0.25,
        display: 'block',
        position: 'relative',
        height: f.height,
        width: f.width,
        margin: 0,
        left: 0,
        top: 0
      }).addClass('ui-resizable-ghost').addClass(typeof e.ghost == 'string' ? e.ghost : ''), d.ghost.appendTo(d.helper);
    },
    resize: function (b, c) {
      var d = a(this).data('resizable'), e = d.options;
      d.ghost && d.ghost.css({
        position: 'relative',
        height: d.size.height,
        width: d.size.width
      });
    },
    stop: function (b, c) {
      var d = a(this).data('resizable'), e = d.options;
      d.ghost && d.helper && d.helper.get(0).removeChild(d.ghost.get(0));
    }
  }), a.ui.plugin.add('resizable', 'grid', {
    resize: function (b, c) {
      var d = a(this).data('resizable'), e = d.options, f = d.size, g = d.originalSize, h = d.originalPosition, i = d.axis, j = e._aspectRatio || b.shiftKey;
      e.grid = typeof e.grid == 'number' ? [
        e.grid,
        e.grid
      ] : e.grid;
      var k = Math.round((f.width - g.width) / (e.grid[0] || 1)) * (e.grid[0] || 1), l = Math.round((f.height - g.height) / (e.grid[1] || 1)) * (e.grid[1] || 1);
      /^(se|s|e)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l) : /^(ne)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l, d.position.top = h.top - l) : /^(sw)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l, d.position.left = h.left - k) : (d.size.width = g.width + k, d.size.height = g.height + l, d.position.top = h.top - l, d.position.left = h.left - k);
    }
  });
  var c = function (a) {
      return parseInt(a, 10) || 0;
    }, d = function (a) {
      return !isNaN(parseInt(a, 10));
    };
}(jQuery), function (a, b) {
  a.widget('ui.selectable', a.ui.mouse, {
    options: {
      appendTo: 'body',
      autoRefresh: !0,
      distance: 0,
      filter: '*',
      tolerance: 'touch'
    },
    _create: function () {
      var b = this;
      this.element.addClass('ui-selectable'), this.dragged = !1;
      var c;
      this.refresh = function () {
        c = a(b.options.filter, b.element[0]), c.addClass('ui-selectee'), c.each(function () {
          var b = a(this), c = b.offset();
          a.data(this, 'selectable-item', {
            element: this,
            $element: b,
            left: c.left,
            top: c.top,
            right: c.left + b.outerWidth(),
            bottom: c.top + b.outerHeight(),
            startselected: !1,
            selected: b.hasClass('ui-selected'),
            selecting: b.hasClass('ui-selecting'),
            unselecting: b.hasClass('ui-unselecting')
          });
        });
      }, this.refresh(), this.selectees = c.addClass('ui-selectee'), this._mouseInit(), this.helper = a('<div class=\'ui-selectable-helper\'></div>');
    },
    destroy: function () {
      return this.selectees.removeClass('ui-selectee').removeData('selectable-item'), this.element.removeClass('ui-selectable ui-selectable-disabled').removeData('selectable').unbind('.selectable'), this._mouseDestroy(), this;
    },
    _mouseStart: function (b) {
      var c = this;
      this.opos = [
        b.pageX,
        b.pageY
      ];
      if (this.options.disabled)
        return;
      var d = this.options;
      this.selectees = a(d.filter, this.element[0]), this._trigger('start', b), a(d.appendTo).append(this.helper), this.helper.css({
        left: b.clientX,
        top: b.clientY,
        width: 0,
        height: 0
      }), d.autoRefresh && this.refresh(), this.selectees.filter('.ui-selected').each(function () {
        var d = a.data(this, 'selectable-item');
        d.startselected = !0, !b.metaKey && !b.ctrlKey && (d.$element.removeClass('ui-selected'), d.selected = !1, d.$element.addClass('ui-unselecting'), d.unselecting = !0, c._trigger('unselecting', b, { unselecting: d.element }));
      }), a(b.target).parents().andSelf().each(function () {
        var d = a.data(this, 'selectable-item');
        if (d) {
          var e = !b.metaKey && !b.ctrlKey || !d.$element.hasClass('ui-selected');
          return d.$element.removeClass(e ? 'ui-unselecting' : 'ui-selected').addClass(e ? 'ui-selecting' : 'ui-unselecting'), d.unselecting = !e, d.selecting = e, d.selected = e, e ? c._trigger('selecting', b, { selecting: d.element }) : c._trigger('unselecting', b, { unselecting: d.element }), !1;
        }
      });
    },
    _mouseDrag: function (b) {
      var c = this;
      this.dragged = !0;
      if (this.options.disabled)
        return;
      var d = this.options, e = this.opos[0], f = this.opos[1], g = b.pageX, h = b.pageY;
      if (e > g) {
        var i = g;
        g = e, e = i;
      }
      if (f > h) {
        var i = h;
        h = f, f = i;
      }
      return this.helper.css({
        left: e,
        top: f,
        width: g - e,
        height: h - f
      }), this.selectees.each(function () {
        var i = a.data(this, 'selectable-item');
        if (!i || i.element == c.element[0])
          return;
        var j = !1;
        d.tolerance == 'touch' ? j = !(i.left > g || i.right < e || i.top > h || i.bottom < f) : d.tolerance == 'fit' && (j = i.left > e && i.right < g && i.top > f && i.bottom < h), j ? (i.selected && (i.$element.removeClass('ui-selected'), i.selected = !1), i.unselecting && (i.$element.removeClass('ui-unselecting'), i.unselecting = !1), i.selecting || (i.$element.addClass('ui-selecting'), i.selecting = !0, c._trigger('selecting', b, { selecting: i.element }))) : (i.selecting && ((b.metaKey || b.ctrlKey) && i.startselected ? (i.$element.removeClass('ui-selecting'), i.selecting = !1, i.$element.addClass('ui-selected'), i.selected = !0) : (i.$element.removeClass('ui-selecting'), i.selecting = !1, i.startselected && (i.$element.addClass('ui-unselecting'), i.unselecting = !0), c._trigger('unselecting', b, { unselecting: i.element }))), i.selected && !b.metaKey && !b.ctrlKey && !i.startselected && (i.$element.removeClass('ui-selected'), i.selected = !1, i.$element.addClass('ui-unselecting'), i.unselecting = !0, c._trigger('unselecting', b, { unselecting: i.element })));
      }), !1;
    },
    _mouseStop: function (b) {
      var c = this;
      this.dragged = !1;
      var d = this.options;
      return a('.ui-unselecting', this.element[0]).each(function () {
        var d = a.data(this, 'selectable-item');
        d.$element.removeClass('ui-unselecting'), d.unselecting = !1, d.startselected = !1, c._trigger('unselected', b, { unselected: d.element });
      }), a('.ui-selecting', this.element[0]).each(function () {
        var d = a.data(this, 'selectable-item');
        d.$element.removeClass('ui-selecting').addClass('ui-selected'), d.selecting = !1, d.selected = !0, d.startselected = !0, c._trigger('selected', b, { selected: d.element });
      }), this._trigger('stop', b), this.helper.remove(), !1;
    }
  }), a.extend(a.ui.selectable, { version: '1.8.23' });
}(jQuery), function (a, b) {
  a.widget('ui.sortable', a.ui.mouse, {
    widgetEventPrefix: 'sort',
    ready: !1,
    options: {
      appendTo: 'parent',
      axis: !1,
      connectWith: !1,
      containment: !1,
      cursor: 'auto',
      cursorAt: !1,
      dropOnEmpty: !0,
      forcePlaceholderSize: !1,
      forceHelperSize: !1,
      grid: !1,
      handle: !1,
      helper: 'original',
      items: '> *',
      opacity: !1,
      placeholder: !1,
      revert: !1,
      scroll: !0,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      scope: 'default',
      tolerance: 'intersect',
      zIndex: 1000
    },
    _create: function () {
      var a = this.options;
      this.containerCache = {}, this.element.addClass('ui-sortable'), this.refresh(), this.floating = this.items.length ? a.axis === 'x' || /left|right/.test(this.items[0].item.css('float')) || /inline|table-cell/.test(this.items[0].item.css('display')) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0;
    },
    destroy: function () {
      a.Widget.prototype.destroy.call(this), this.element.removeClass('ui-sortable ui-sortable-disabled'), this._mouseDestroy();
      for (var b = this.items.length - 1; b >= 0; b--)
        this.items[b].item.removeData(this.widgetName + '-item');
      return this;
    },
    _setOption: function (b, c) {
      b === 'disabled' ? (this.options[b] = c, this.widget()[c ? 'addClass' : 'removeClass']('ui-sortable-disabled')) : a.Widget.prototype._setOption.apply(this, arguments);
    },
    _mouseCapture: function (b, c) {
      var d = this;
      if (this.reverting)
        return !1;
      if (this.options.disabled || this.options.type == 'static')
        return !1;
      this._refreshItems(b);
      var e = null, f = this, g = a(b.target).parents().each(function () {
          if (a.data(this, d.widgetName + '-item') == f)
            return e = a(this), !1;
        });
      a.data(b.target, d.widgetName + '-item') == f && (e = a(b.target));
      if (!e)
        return !1;
      if (this.options.handle && !c) {
        var h = !1;
        a(this.options.handle, e).find('*').andSelf().each(function () {
          this == b.target && (h = !0);
        });
        if (!h)
          return !1;
      }
      return this.currentItem = e, this._removeCurrentsFromItems(), !0;
    },
    _mouseStart: function (b, c, d) {
      var e = this.options, f = this;
      this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(b), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
        top: this.offset.top - this.margins.top,
        left: this.offset.left - this.margins.left
      }, a.extend(this.offset, {
        click: {
          left: b.pageX - this.offset.left,
          top: b.pageY - this.offset.top
        },
        parent: this._getParentOffset(),
        relative: this._getRelativeOffset()
      }), this.helper.css('position', 'absolute'), this.cssPosition = this.helper.css('position'), this.originalPosition = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt), this.domPosition = {
        prev: this.currentItem.prev()[0],
        parent: this.currentItem.parent()[0]
      }, this.helper[0] != this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), e.containment && this._setContainment(), e.cursor && (a('body').css('cursor') && (this._storedCursor = a('body').css('cursor')), a('body').css('cursor', e.cursor)), e.opacity && (this.helper.css('opacity') && (this._storedOpacity = this.helper.css('opacity')), this.helper.css('opacity', e.opacity)), e.zIndex && (this.helper.css('zIndex') && (this._storedZIndex = this.helper.css('zIndex')), this.helper.css('zIndex', e.zIndex)), this.scrollParent[0] != document && this.scrollParent[0].tagName != 'HTML' && (this.overflowOffset = this.scrollParent.offset()), this._trigger('start', b, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions();
      if (!d)
        for (var g = this.containers.length - 1; g >= 0; g--)
          this.containers[g]._trigger('activate', b, f._uiHash(this));
      return a.ui.ddmanager && (a.ui.ddmanager.current = this), a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this.dragging = !0, this.helper.addClass('ui-sortable-helper'), this._mouseDrag(b), !0;
    },
    _mouseDrag: function (b) {
      this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo('absolute'), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs);
      if (this.options.scroll) {
        var c = this.options, d = !1;
        this.scrollParent[0] != document && this.scrollParent[0].tagName != 'HTML' ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - b.pageY < c.scrollSensitivity ? this.scrollParent[0].scrollTop = d = this.scrollParent[0].scrollTop + c.scrollSpeed : b.pageY - this.overflowOffset.top < c.scrollSensitivity && (this.scrollParent[0].scrollTop = d = this.scrollParent[0].scrollTop - c.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - b.pageX < c.scrollSensitivity ? this.scrollParent[0].scrollLeft = d = this.scrollParent[0].scrollLeft + c.scrollSpeed : b.pageX - this.overflowOffset.left < c.scrollSensitivity && (this.scrollParent[0].scrollLeft = d = this.scrollParent[0].scrollLeft - c.scrollSpeed)) : (b.pageY - a(document).scrollTop() < c.scrollSensitivity ? d = a(document).scrollTop(a(document).scrollTop() - c.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < c.scrollSensitivity && (d = a(document).scrollTop(a(document).scrollTop() + c.scrollSpeed)), b.pageX - a(document).scrollLeft() < c.scrollSensitivity ? d = a(document).scrollLeft(a(document).scrollLeft() - c.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < c.scrollSensitivity && (d = a(document).scrollLeft(a(document).scrollLeft() + c.scrollSpeed))), d !== !1 && a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b);
      }
      this.positionAbs = this._convertPositionTo('absolute');
      if (!this.options.axis || this.options.axis != 'y')
        this.helper[0].style.left = this.position.left + 'px';
      if (!this.options.axis || this.options.axis != 'x')
        this.helper[0].style.top = this.position.top + 'px';
      for (var e = this.items.length - 1; e >= 0; e--) {
        var f = this.items[e], g = f.item[0], h = this._intersectsWithPointer(f);
        if (!h)
          continue;
        if (g != this.currentItem[0] && this.placeholder[h == 1 ? 'next' : 'prev']()[0] != g && !a.ui.contains(this.placeholder[0], g) && (this.options.type == 'semi-dynamic' ? !a.ui.contains(this.element[0], g) : !0)) {
          this.direction = h == 1 ? 'down' : 'up';
          if (this.options.tolerance == 'pointer' || this._intersectsWithSides(f))
            this._rearrange(b, f);
          else
            break;
          this._trigger('change', b, this._uiHash());
          break;
        }
      }
      return this._contactContainers(b), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), this._trigger('sort', b, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1;
    },
    _mouseStop: function (b, c) {
      if (!b)
        return;
      a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, b);
      if (this.options.revert) {
        var d = this, e = d.placeholder.offset();
        d.reverting = !0, a(this.helper).animate({
          left: e.left - this.offset.parent.left - d.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
          top: e.top - this.offset.parent.top - d.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
        }, parseInt(this.options.revert, 10) || 500, function () {
          d._clear(b);
        });
      } else
        this._clear(b, c);
      return !1;
    },
    cancel: function () {
      var b = this;
      if (this.dragging) {
        this._mouseUp({ target: null }), this.options.helper == 'original' ? this.currentItem.css(this._storedCSS).removeClass('ui-sortable-helper') : this.currentItem.show();
        for (var c = this.containers.length - 1; c >= 0; c--)
          this.containers[c]._trigger('deactivate', null, b._uiHash(this)), this.containers[c].containerCache.over && (this.containers[c]._trigger('out', null, b._uiHash(this)), this.containers[c].containerCache.over = 0);
      }
      return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.options.helper != 'original' && this.helper && this.helper[0].parentNode && this.helper.remove(), a.extend(this, {
        helper: null,
        dragging: !1,
        reverting: !1,
        _noFinalSort: null
      }), this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem)), this;
    },
    serialize: function (b) {
      var c = this._getItemsAsjQuery(b && b.connected), d = [];
      return b = b || {}, a(c).each(function () {
        var c = (a(b.item || this).attr(b.attribute || 'id') || '').match(b.expression || /(.+)[-=_](.+)/);
        c && d.push((b.key || c[1] + '[]') + '=' + (b.key && b.expression ? c[1] : c[2]));
      }), !d.length && b.key && d.push(b.key + '='), d.join('&');
    },
    toArray: function (b) {
      var c = this._getItemsAsjQuery(b && b.connected), d = [];
      return b = b || {}, c.each(function () {
        d.push(a(b.item || this).attr(b.attribute || 'id') || '');
      }), d;
    },
    _intersectsWith: function (a) {
      var b = this.positionAbs.left, c = b + this.helperProportions.width, d = this.positionAbs.top, e = d + this.helperProportions.height, f = a.left, g = f + a.width, h = a.top, i = h + a.height, j = this.offset.click.top, k = this.offset.click.left, l = d + j > h && d + j < i && b + k > f && b + k < g;
      return this.options.tolerance == 'pointer' || this.options.forcePointerForContainers || this.options.tolerance != 'pointer' && this.helperProportions[this.floating ? 'width' : 'height'] > a[this.floating ? 'width' : 'height'] ? l : f < b + this.helperProportions.width / 2 && c - this.helperProportions.width / 2 < g && h < d + this.helperProportions.height / 2 && e - this.helperProportions.height / 2 < i;
    },
    _intersectsWithPointer: function (b) {
      var c = this.options.axis === 'x' || a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, b.top, b.height), d = this.options.axis === 'y' || a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, b.left, b.width), e = c && d, f = this._getDragVerticalDirection(), g = this._getDragHorizontalDirection();
      return e ? this.floating ? g && g == 'right' || f == 'down' ? 2 : 1 : f && (f == 'down' ? 2 : 1) : !1;
    },
    _intersectsWithSides: function (b) {
      var c = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, b.top + b.height / 2, b.height), d = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, b.left + b.width / 2, b.width), e = this._getDragVerticalDirection(), f = this._getDragHorizontalDirection();
      return this.floating && f ? f == 'right' && d || f == 'left' && !d : e && (e == 'down' && c || e == 'up' && !c);
    },
    _getDragVerticalDirection: function () {
      var a = this.positionAbs.top - this.lastPositionAbs.top;
      return a != 0 && (a > 0 ? 'down' : 'up');
    },
    _getDragHorizontalDirection: function () {
      var a = this.positionAbs.left - this.lastPositionAbs.left;
      return a != 0 && (a > 0 ? 'right' : 'left');
    },
    refresh: function (a) {
      return this._refreshItems(a), this.refreshPositions(), this;
    },
    _connectWith: function () {
      var a = this.options;
      return a.connectWith.constructor == String ? [a.connectWith] : a.connectWith;
    },
    _getItemsAsjQuery: function (b) {
      var c = this, d = [], e = [], f = this._connectWith();
      if (f && b)
        for (var g = f.length - 1; g >= 0; g--) {
          var h = a(f[g]);
          for (var i = h.length - 1; i >= 0; i--) {
            var j = a.data(h[i], this.widgetName);
            j && j != this && !j.options.disabled && e.push([
              a.isFunction(j.options.items) ? j.options.items.call(j.element) : a(j.options.items, j.element).not('.ui-sortable-helper').not('.ui-sortable-placeholder'),
              j
            ]);
          }
        }
      e.push([
        a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
          options: this.options,
          item: this.currentItem
        }) : a(this.options.items, this.element).not('.ui-sortable-helper').not('.ui-sortable-placeholder'),
        this
      ]);
      for (var g = e.length - 1; g >= 0; g--)
        e[g][0].each(function () {
          d.push(this);
        });
      return a(d);
    },
    _removeCurrentsFromItems: function () {
      var a = this.currentItem.find(':data(' + this.widgetName + '-item)');
      for (var b = 0; b < this.items.length; b++)
        for (var c = 0; c < a.length; c++)
          a[c] == this.items[b].item[0] && this.items.splice(b, 1);
    },
    _refreshItems: function (b) {
      this.items = [], this.containers = [this];
      var c = this.items, d = this, e = [[
            a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, { item: this.currentItem }) : a(this.options.items, this.element),
            this
          ]], f = this._connectWith();
      if (f && this.ready)
        for (var g = f.length - 1; g >= 0; g--) {
          var h = a(f[g]);
          for (var i = h.length - 1; i >= 0; i--) {
            var j = a.data(h[i], this.widgetName);
            j && j != this && !j.options.disabled && (e.push([
              a.isFunction(j.options.items) ? j.options.items.call(j.element[0], b, { item: this.currentItem }) : a(j.options.items, j.element),
              j
            ]), this.containers.push(j));
          }
        }
      for (var g = e.length - 1; g >= 0; g--) {
        var k = e[g][1], l = e[g][0];
        for (var i = 0, m = l.length; i < m; i++) {
          var n = a(l[i]);
          n.data(this.widgetName + '-item', k), c.push({
            item: n,
            instance: k,
            width: 0,
            height: 0,
            left: 0,
            top: 0
          });
        }
      }
    },
    refreshPositions: function (b) {
      this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
      for (var c = this.items.length - 1; c >= 0; c--) {
        var d = this.items[c];
        if (d.instance != this.currentContainer && this.currentContainer && d.item[0] != this.currentItem[0])
          continue;
        var e = this.options.toleranceElement ? a(this.options.toleranceElement, d.item) : d.item;
        b || (d.width = e.outerWidth(), d.height = e.outerHeight());
        var f = e.offset();
        d.left = f.left, d.top = f.top;
      }
      if (this.options.custom && this.options.custom.refreshContainers)
        this.options.custom.refreshContainers.call(this);
      else
        for (var c = this.containers.length - 1; c >= 0; c--) {
          var f = this.containers[c].element.offset();
          this.containers[c].containerCache.left = f.left, this.containers[c].containerCache.top = f.top, this.containers[c].containerCache.width = this.containers[c].element.outerWidth(), this.containers[c].containerCache.height = this.containers[c].element.outerHeight();
        }
      return this;
    },
    _createPlaceholder: function (b) {
      var c = b || this, d = c.options;
      if (!d.placeholder || d.placeholder.constructor == String) {
        var e = d.placeholder;
        d.placeholder = {
          element: function () {
            var b = a(document.createElement(c.currentItem[0].nodeName)).addClass(e || c.currentItem[0].className + ' ui-sortable-placeholder').removeClass('ui-sortable-helper')[0];
            return e || (b.style.visibility = 'hidden'), b;
          },
          update: function (a, b) {
            if (e && !d.forcePlaceholderSize)
              return;
            b.height() || b.height(c.currentItem.innerHeight() - parseInt(c.currentItem.css('paddingTop') || 0, 10) - parseInt(c.currentItem.css('paddingBottom') || 0, 10)), b.width() || b.width(c.currentItem.innerWidth() - parseInt(c.currentItem.css('paddingLeft') || 0, 10) - parseInt(c.currentItem.css('paddingRight') || 0, 10));
          }
        };
      }
      c.placeholder = a(d.placeholder.element.call(c.element, c.currentItem)), c.currentItem.after(c.placeholder), d.placeholder.update(c, c.placeholder);
    },
    _contactContainers: function (b) {
      var c = null, d = null;
      for (var e = this.containers.length - 1; e >= 0; e--) {
        if (a.ui.contains(this.currentItem[0], this.containers[e].element[0]))
          continue;
        if (this._intersectsWith(this.containers[e].containerCache)) {
          if (c && a.ui.contains(this.containers[e].element[0], c.element[0]))
            continue;
          c = this.containers[e], d = e;
        } else
          this.containers[e].containerCache.over && (this.containers[e]._trigger('out', b, this._uiHash(this)), this.containers[e].containerCache.over = 0);
      }
      if (!c)
        return;
      if (this.containers.length === 1)
        this.containers[d]._trigger('over', b, this._uiHash(this)), this.containers[d].containerCache.over = 1;
      else if (this.currentContainer != this.containers[d]) {
        var f = 10000, g = null, h = this.positionAbs[this.containers[d].floating ? 'left' : 'top'];
        for (var i = this.items.length - 1; i >= 0; i--) {
          if (!a.ui.contains(this.containers[d].element[0], this.items[i].item[0]))
            continue;
          var j = this.containers[d].floating ? this.items[i].item.offset().left : this.items[i].item.offset().top;
          Math.abs(j - h) < f && (f = Math.abs(j - h), g = this.items[i], this.direction = j - h > 0 ? 'down' : 'up');
        }
        if (!g && !this.options.dropOnEmpty)
          return;
        this.currentContainer = this.containers[d], g ? this._rearrange(b, g, null, !0) : this._rearrange(b, null, this.containers[d].element, !0), this._trigger('change', b, this._uiHash()), this.containers[d]._trigger('change', b, this._uiHash(this)), this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[d]._trigger('over', b, this._uiHash(this)), this.containers[d].containerCache.over = 1;
      }
    },
    _createHelper: function (b) {
      var c = this.options, d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [
          b,
          this.currentItem
        ])) : c.helper == 'clone' ? this.currentItem.clone() : this.currentItem;
      return d.parents('body').length || a(c.appendTo != 'parent' ? c.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]), d[0] == this.currentItem[0] && (this._storedCSS = {
        width: this.currentItem[0].style.width,
        height: this.currentItem[0].style.height,
        position: this.currentItem.css('position'),
        top: this.currentItem.css('top'),
        left: this.currentItem.css('left')
      }), (d[0].style.width == '' || c.forceHelperSize) && d.width(this.currentItem.width()), (d[0].style.height == '' || c.forceHelperSize) && d.height(this.currentItem.height()), d;
    },
    _adjustOffsetFromHelper: function (b) {
      typeof b == 'string' && (b = b.split(' ')), a.isArray(b) && (b = {
        left: +b[0],
        top: +b[1] || 0
      }), 'left' in b && (this.offset.click.left = b.left + this.margins.left), 'right' in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), 'top' in b && (this.offset.click.top = b.top + this.margins.top), 'bottom' in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top);
    },
    _getParentOffset: function () {
      this.offsetParent = this.helper.offsetParent();
      var b = this.offsetParent.offset();
      this.cssPosition == 'absolute' && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop());
      if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == 'html' && a.browser.msie)
        b = {
          top: 0,
          left: 0
        };
      return {
        top: b.top + (parseInt(this.offsetParent.css('borderTopWidth'), 10) || 0),
        left: b.left + (parseInt(this.offsetParent.css('borderLeftWidth'), 10) || 0)
      };
    },
    _getRelativeOffset: function () {
      if (this.cssPosition == 'relative') {
        var a = this.currentItem.position();
        return {
          top: a.top - (parseInt(this.helper.css('top'), 10) || 0) + this.scrollParent.scrollTop(),
          left: a.left - (parseInt(this.helper.css('left'), 10) || 0) + this.scrollParent.scrollLeft()
        };
      }
      return {
        top: 0,
        left: 0
      };
    },
    _cacheMargins: function () {
      this.margins = {
        left: parseInt(this.currentItem.css('marginLeft'), 10) || 0,
        top: parseInt(this.currentItem.css('marginTop'), 10) || 0
      };
    },
    _cacheHelperProportions: function () {
      this.helperProportions = {
        width: this.helper.outerWidth(),
        height: this.helper.outerHeight()
      };
    },
    _setContainment: function () {
      var b = this.options;
      b.containment == 'parent' && (b.containment = this.helper[0].parentNode);
      if (b.containment == 'document' || b.containment == 'window')
        this.containment = [
          0 - this.offset.relative.left - this.offset.parent.left,
          0 - this.offset.relative.top - this.offset.parent.top,
          a(b.containment == 'document' ? document : window).width() - this.helperProportions.width - this.margins.left,
          (a(b.containment == 'document' ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
        ];
      if (!/^(document|window|parent)$/.test(b.containment)) {
        var c = a(b.containment)[0], d = a(b.containment).offset(), e = a(c).css('overflow') != 'hidden';
        this.containment = [
          d.left + (parseInt(a(c).css('borderLeftWidth'), 10) || 0) + (parseInt(a(c).css('paddingLeft'), 10) || 0) - this.margins.left,
          d.top + (parseInt(a(c).css('borderTopWidth'), 10) || 0) + (parseInt(a(c).css('paddingTop'), 10) || 0) - this.margins.top,
          d.left + (e ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css('borderLeftWidth'), 10) || 0) - (parseInt(a(c).css('paddingRight'), 10) || 0) - this.helperProportions.width - this.margins.left,
          d.top + (e ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css('borderTopWidth'), 10) || 0) - (parseInt(a(c).css('paddingBottom'), 10) || 0) - this.helperProportions.height - this.margins.top
        ];
      }
    },
    _convertPositionTo: function (b, c) {
      c || (c = this.position);
      var d = b == 'absolute' ? 1 : -1, e = this.options, f = this.cssPosition == 'absolute' && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, g = /(html|body)/i.test(f[0].tagName);
      return {
        top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (a.browser.safari && this.cssPosition == 'fixed' ? 0 : (this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()) * d),
        left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (a.browser.safari && this.cssPosition == 'fixed' ? 0 : (this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft()) * d)
      };
    },
    _generatePosition: function (b) {
      var c = this.options, d = this.cssPosition == 'absolute' && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, e = /(html|body)/i.test(d[0].tagName);
      this.cssPosition == 'relative' && (this.scrollParent[0] == document || this.scrollParent[0] == this.offsetParent[0]) && (this.offset.relative = this._getRelativeOffset());
      var f = b.pageX, g = b.pageY;
      if (this.originalPosition) {
        this.containment && (b.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), b.pageY - this.offset.click.top < this.containment[1] && (g = this.containment[1] + this.offset.click.top), b.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), b.pageY - this.offset.click.top > this.containment[3] && (g = this.containment[3] + this.offset.click.top));
        if (c.grid) {
          var h = this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1];
          g = this.containment ? h - this.offset.click.top < this.containment[1] || h - this.offset.click.top > this.containment[3] ? h - this.offset.click.top < this.containment[1] ? h + c.grid[1] : h - c.grid[1] : h : h;
          var i = this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0];
          f = this.containment ? i - this.offset.click.left < this.containment[0] || i - this.offset.click.left > this.containment[2] ? i - this.offset.click.left < this.containment[0] ? i + c.grid[0] : i - c.grid[0] : i : i;
        }
      }
      return {
        top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && this.cssPosition == 'fixed' ? 0 : this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : e ? 0 : d.scrollTop()),
        left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && this.cssPosition == 'fixed' ? 0 : this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : e ? 0 : d.scrollLeft())
      };
    },
    _rearrange: function (a, b, c, d) {
      c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == 'down' ? b.item[0] : b.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
      var e = this, f = this.counter;
      window.setTimeout(function () {
        f == e.counter && e.refreshPositions(!d);
      }, 0);
    },
    _clear: function (b, c) {
      this.reverting = !1;
      var d = [], e = this;
      !this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null;
      if (this.helper[0] == this.currentItem[0]) {
        for (var f in this._storedCSS)
          if (this._storedCSS[f] == 'auto' || this._storedCSS[f] == 'static')
            this._storedCSS[f] = '';
        this.currentItem.css(this._storedCSS).removeClass('ui-sortable-helper');
      } else
        this.currentItem.show();
      this.fromOutside && !c && d.push(function (a) {
        this._trigger('receive', a, this._uiHash(this.fromOutside));
      }), (this.fromOutside || this.domPosition.prev != this.currentItem.prev().not('.ui-sortable-helper')[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !c && d.push(function (a) {
        this._trigger('update', a, this._uiHash());
      });
      if (!a.ui.contains(this.element[0], this.currentItem[0])) {
        c || d.push(function (a) {
          this._trigger('remove', a, this._uiHash());
        });
        for (var f = this.containers.length - 1; f >= 0; f--)
          a.ui.contains(this.containers[f].element[0], this.currentItem[0]) && !c && (d.push(function (a) {
            return function (b) {
              a._trigger('receive', b, this._uiHash(this));
            };
          }.call(this, this.containers[f])), d.push(function (a) {
            return function (b) {
              a._trigger('update', b, this._uiHash(this));
            };
          }.call(this, this.containers[f])));
      }
      for (var f = this.containers.length - 1; f >= 0; f--)
        c || d.push(function (a) {
          return function (b) {
            a._trigger('deactivate', b, this._uiHash(this));
          };
        }.call(this, this.containers[f])), this.containers[f].containerCache.over && (d.push(function (a) {
          return function (b) {
            a._trigger('out', b, this._uiHash(this));
          };
        }.call(this, this.containers[f])), this.containers[f].containerCache.over = 0);
      this._storedCursor && a('body').css('cursor', this._storedCursor), this._storedOpacity && this.helper.css('opacity', this._storedOpacity), this._storedZIndex && this.helper.css('zIndex', this._storedZIndex == 'auto' ? '' : this._storedZIndex), this.dragging = !1;
      if (this.cancelHelperRemoval) {
        if (!c) {
          this._trigger('beforeStop', b, this._uiHash());
          for (var f = 0; f < d.length; f++)
            d[f].call(this, b);
          this._trigger('stop', b, this._uiHash());
        }
        return this.fromOutside = !1, !1;
      }
      c || this._trigger('beforeStop', b, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] != this.currentItem[0] && this.helper.remove(), this.helper = null;
      if (!c) {
        for (var f = 0; f < d.length; f++)
          d[f].call(this, b);
        this._trigger('stop', b, this._uiHash());
      }
      return this.fromOutside = !1, !0;
    },
    _trigger: function () {
      a.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel();
    },
    _uiHash: function (b) {
      var c = b || this;
      return {
        helper: c.helper,
        placeholder: c.placeholder || a([]),
        position: c.position,
        originalPosition: c.originalPosition,
        offset: c.positionAbs,
        item: c.currentItem,
        sender: b ? b.element : null
      };
    }
  }), a.extend(a.ui.sortable, { version: '1.8.23' });
}(jQuery), jQuery.effects || function (a, b) {
  function c(b) {
    var c;
    return b && b.constructor == Array && b.length == 3 ? b : (c = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b)) ? [
      parseInt(c[1], 10),
      parseInt(c[2], 10),
      parseInt(c[3], 10)
    ] : (c = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b)) ? [
      parseFloat(c[1]) * 2.55,
      parseFloat(c[2]) * 2.55,
      parseFloat(c[3]) * 2.55
    ] : (c = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(b)) ? [
      parseInt(c[1], 16),
      parseInt(c[2], 16),
      parseInt(c[3], 16)
    ] : (c = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(b)) ? [
      parseInt(c[1] + c[1], 16),
      parseInt(c[2] + c[2], 16),
      parseInt(c[3] + c[3], 16)
    ] : (c = /rgba\(0, 0, 0, 0\)/.exec(b)) ? e.transparent : e[a.trim(b).toLowerCase()];
  }
  function d(b, d) {
    var e;
    do {
      e = (a.curCSS || a.css)(b, d);
      if (e != '' && e != 'transparent' || a.nodeName(b, 'body'))
        break;
      d = 'backgroundColor';
    } while (b = b.parentNode);
    return c(e);
  }
  function h() {
    var a = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle, b = {}, c, d;
    if (a && a.length && a[0] && a[a[0]]) {
      var e = a.length;
      while (e--)
        c = a[e], typeof a[c] == 'string' && (d = c.replace(/\-(\w)/g, function (a, b) {
          return b.toUpperCase();
        }), b[d] = a[c]);
    } else
      for (c in a)
        typeof a[c] == 'string' && (b[c] = a[c]);
    return b;
  }
  function i(b) {
    var c, d;
    for (c in b)
      d = b[c], (d == null || a.isFunction(d) || c in g || /scrollbar/.test(c) || !/color/i.test(c) && isNaN(parseFloat(d))) && delete b[c];
    return b;
  }
  function j(a, b) {
    var c = { _: 0 }, d;
    for (d in b)
      a[d] != b[d] && (c[d] = b[d]);
    return c;
  }
  function k(b, c, d, e) {
    typeof b == 'object' && (e = c, d = null, c = b, b = c.effect), a.isFunction(c) && (e = c, d = null, c = {});
    if (typeof c == 'number' || a.fx.speeds[c])
      e = d, d = c, c = {};
    return a.isFunction(d) && (e = d, d = null), c = c || {}, d = d || c.duration, d = a.fx.off ? 0 : typeof d == 'number' ? d : d in a.fx.speeds ? a.fx.speeds[d] : a.fx.speeds._default, e = e || c.complete, [
      b,
      c,
      d,
      e
    ];
  }
  function l(b) {
    return !b || typeof b == 'number' || a.fx.speeds[b] ? !0 : typeof b == 'string' && !a.effects[b] ? !0 : !1;
  }
  a.effects = {}, a.each([
    'backgroundColor',
    'borderBottomColor',
    'borderLeftColor',
    'borderRightColor',
    'borderTopColor',
    'borderColor',
    'color',
    'outlineColor'
  ], function (b, e) {
    a.fx.step[e] = function (a) {
      a.colorInit || (a.start = d(a.elem, e), a.end = c(a.end), a.colorInit = !0), a.elem.style[e] = 'rgb(' + Math.max(Math.min(parseInt(a.pos * (a.end[0] - a.start[0]) + a.start[0], 10), 255), 0) + ',' + Math.max(Math.min(parseInt(a.pos * (a.end[1] - a.start[1]) + a.start[1], 10), 255), 0) + ',' + Math.max(Math.min(parseInt(a.pos * (a.end[2] - a.start[2]) + a.start[2], 10), 255), 0) + ')';
    };
  });
  var e = {
      aqua: [
        0,
        255,
        255
      ],
      azure: [
        240,
        255,
        255
      ],
      beige: [
        245,
        245,
        220
      ],
      black: [
        0,
        0,
        0
      ],
      blue: [
        0,
        0,
        255
      ],
      brown: [
        165,
        42,
        42
      ],
      cyan: [
        0,
        255,
        255
      ],
      darkblue: [
        0,
        0,
        139
      ],
      darkcyan: [
        0,
        139,
        139
      ],
      darkgrey: [
        169,
        169,
        169
      ],
      darkgreen: [
        0,
        100,
        0
      ],
      darkkhaki: [
        189,
        183,
        107
      ],
      darkmagenta: [
        139,
        0,
        139
      ],
      darkolivegreen: [
        85,
        107,
        47
      ],
      darkorange: [
        255,
        140,
        0
      ],
      darkorchid: [
        153,
        50,
        204
      ],
      darkred: [
        139,
        0,
        0
      ],
      darksalmon: [
        233,
        150,
        122
      ],
      darkviolet: [
        148,
        0,
        211
      ],
      fuchsia: [
        255,
        0,
        255
      ],
      gold: [
        255,
        215,
        0
      ],
      green: [
        0,
        128,
        0
      ],
      indigo: [
        75,
        0,
        130
      ],
      khaki: [
        240,
        230,
        140
      ],
      lightblue: [
        173,
        216,
        230
      ],
      lightcyan: [
        224,
        255,
        255
      ],
      lightgreen: [
        144,
        238,
        144
      ],
      lightgrey: [
        211,
        211,
        211
      ],
      lightpink: [
        255,
        182,
        193
      ],
      lightyellow: [
        255,
        255,
        224
      ],
      lime: [
        0,
        255,
        0
      ],
      magenta: [
        255,
        0,
        255
      ],
      maroon: [
        128,
        0,
        0
      ],
      navy: [
        0,
        0,
        128
      ],
      olive: [
        128,
        128,
        0
      ],
      orange: [
        255,
        165,
        0
      ],
      pink: [
        255,
        192,
        203
      ],
      purple: [
        128,
        0,
        128
      ],
      violet: [
        128,
        0,
        128
      ],
      red: [
        255,
        0,
        0
      ],
      silver: [
        192,
        192,
        192
      ],
      white: [
        255,
        255,
        255
      ],
      yellow: [
        255,
        255,
        0
      ],
      transparent: [
        255,
        255,
        255
      ]
    }, f = [
      'add',
      'remove',
      'toggle'
    ], g = {
      border: 1,
      borderBottom: 1,
      borderColor: 1,
      borderLeft: 1,
      borderRight: 1,
      borderTop: 1,
      borderWidth: 1,
      margin: 1,
      padding: 1
    };
  a.effects.animateClass = function (b, c, d, e) {
    return a.isFunction(d) && (e = d, d = null), this.queue(function () {
      var g = a(this), k = g.attr('style') || ' ', l = i(h.call(this)), m, n = g.attr('class') || '';
      a.each(f, function (a, c) {
        b[c] && g[c + 'Class'](b[c]);
      }), m = i(h.call(this)), g.attr('class', n), g.animate(j(l, m), {
        queue: !1,
        duration: c,
        easing: d,
        complete: function () {
          a.each(f, function (a, c) {
            b[c] && g[c + 'Class'](b[c]);
          }), typeof g.attr('style') == 'object' ? (g.attr('style').cssText = '', g.attr('style').cssText = k) : g.attr('style', k), e && e.apply(this, arguments), a.dequeue(this);
        }
      });
    });
  }, a.fn.extend({
    _addClass: a.fn.addClass,
    addClass: function (b, c, d, e) {
      return c ? a.effects.animateClass.apply(this, [
        { add: b },
        c,
        d,
        e
      ]) : this._addClass(b);
    },
    _removeClass: a.fn.removeClass,
    removeClass: function (b, c, d, e) {
      return c ? a.effects.animateClass.apply(this, [
        { remove: b },
        c,
        d,
        e
      ]) : this._removeClass(b);
    },
    _toggleClass: a.fn.toggleClass,
    toggleClass: function (c, d, e, f, g) {
      return typeof d == 'boolean' || d === b ? e ? a.effects.animateClass.apply(this, [
        d ? { add: c } : { remove: c },
        e,
        f,
        g
      ]) : this._toggleClass(c, d) : a.effects.animateClass.apply(this, [
        { toggle: c },
        d,
        e,
        f
      ]);
    },
    switchClass: function (b, c, d, e, f) {
      return a.effects.animateClass.apply(this, [
        {
          add: c,
          remove: b
        },
        d,
        e,
        f
      ]);
    }
  }), a.extend(a.effects, {
    version: '1.8.23',
    save: function (a, b) {
      for (var c = 0; c < b.length; c++)
        b[c] !== null && a.data('ec.storage.' + b[c], a[0].style[b[c]]);
    },
    restore: function (a, b) {
      for (var c = 0; c < b.length; c++)
        b[c] !== null && a.css(b[c], a.data('ec.storage.' + b[c]));
    },
    setMode: function (a, b) {
      return b == 'toggle' && (b = a.is(':hidden') ? 'show' : 'hide'), b;
    },
    getBaseline: function (a, b) {
      var c, d;
      switch (a[0]) {
      case 'top':
        c = 0;
        break;
      case 'middle':
        c = 0.5;
        break;
      case 'bottom':
        c = 1;
        break;
      default:
        c = a[0] / b.height;
      }
      switch (a[1]) {
      case 'left':
        d = 0;
        break;
      case 'center':
        d = 0.5;
        break;
      case 'right':
        d = 1;
        break;
      default:
        d = a[1] / b.width;
      }
      return {
        x: d,
        y: c
      };
    },
    createWrapper: function (b) {
      if (b.parent().is('.ui-effects-wrapper'))
        return b.parent();
      var c = {
          width: b.outerWidth(!0),
          height: b.outerHeight(!0),
          'float': b.css('float')
        }, d = a('<div></div>').addClass('ui-effects-wrapper').css({
          fontSize: '100%',
          background: 'transparent',
          border: 'none',
          margin: 0,
          padding: 0
        }), e = document.activeElement;
      try {
        e.id;
      } catch (f) {
        e = document.body;
      }
      return b.wrap(d), (b[0] === e || a.contains(b[0], e)) && a(e).focus(), d = b.parent(), b.css('position') == 'static' ? (d.css({ position: 'relative' }), b.css({ position: 'relative' })) : (a.extend(c, {
        position: b.css('position'),
        zIndex: b.css('z-index')
      }), a.each([
        'top',
        'left',
        'bottom',
        'right'
      ], function (a, d) {
        c[d] = b.css(d), isNaN(parseInt(c[d], 10)) && (c[d] = 'auto');
      }), b.css({
        position: 'relative',
        top: 0,
        left: 0,
        right: 'auto',
        bottom: 'auto'
      })), d.css(c).show();
    },
    removeWrapper: function (b) {
      var c, d = document.activeElement;
      return b.parent().is('.ui-effects-wrapper') ? (c = b.parent().replaceWith(b), (b[0] === d || a.contains(b[0], d)) && a(d).focus(), c) : b;
    },
    setTransition: function (b, c, d, e) {
      return e = e || {}, a.each(c, function (a, c) {
        var f = b.cssUnit(c);
        f[0] > 0 && (e[c] = f[0] * d + f[1]);
      }), e;
    }
  }), a.fn.extend({
    effect: function (b, c, d, e) {
      var f = k.apply(this, arguments), g = {
          options: f[1],
          duration: f[2],
          callback: f[3]
        }, h = g.options.mode, i = a.effects[b];
      return a.fx.off || !i ? h ? this[h](g.duration, g.callback) : this.each(function () {
        g.callback && g.callback.call(this);
      }) : i.call(this, g);
    },
    _show: a.fn.show,
    show: function (a) {
      if (l(a))
        return this._show.apply(this, arguments);
      var b = k.apply(this, arguments);
      return b[1].mode = 'show', this.effect.apply(this, b);
    },
    _hide: a.fn.hide,
    hide: function (a) {
      if (l(a))
        return this._hide.apply(this, arguments);
      var b = k.apply(this, arguments);
      return b[1].mode = 'hide', this.effect.apply(this, b);
    },
    __toggle: a.fn.toggle,
    toggle: function (b) {
      if (l(b) || typeof b == 'boolean' || a.isFunction(b))
        return this.__toggle.apply(this, arguments);
      var c = k.apply(this, arguments);
      return c[1].mode = 'toggle', this.effect.apply(this, c);
    },
    cssUnit: function (b) {
      var c = this.css(b), d = [];
      return a.each([
        'em',
        'px',
        '%',
        'pt'
      ], function (a, b) {
        c.indexOf(b) > 0 && (d = [
          parseFloat(c),
          b
        ]);
      }), d;
    }
  });
  var m = {};
  a.each([
    'Quad',
    'Cubic',
    'Quart',
    'Quint',
    'Expo'
  ], function (a, b) {
    m[b] = function (b) {
      return Math.pow(b, a + 2);
    };
  }), a.extend(m, {
    Sine: function (a) {
      return 1 - Math.cos(a * Math.PI / 2);
    },
    Circ: function (a) {
      return 1 - Math.sqrt(1 - a * a);
    },
    Elastic: function (a) {
      return a === 0 || a === 1 ? a : -Math.pow(2, 8 * (a - 1)) * Math.sin(((a - 1) * 80 - 7.5) * Math.PI / 15);
    },
    Back: function (a) {
      return a * a * (3 * a - 2);
    },
    Bounce: function (a) {
      var b, c = 4;
      while (a < ((b = Math.pow(2, --c)) - 1) / 11);
      return 1 / Math.pow(4, 3 - c) - 7.5625 * Math.pow((b * 3 - 2) / 22 - a, 2);
    }
  }), a.each(m, function (b, c) {
    a.easing['easeIn' + b] = c, a.easing['easeOut' + b] = function (a) {
      return 1 - c(1 - a);
    }, a.easing['easeInOut' + b] = function (a) {
      return a < 0.5 ? c(a * 2) / 2 : c(a * -2 + 2) / -2 + 1;
    };
  });
}(jQuery), function (a, b) {
  a.effects.blind = function (b) {
    return this.queue(function () {
      var c = a(this), d = [
          'position',
          'top',
          'bottom',
          'left',
          'right'
        ], e = a.effects.setMode(c, b.options.mode || 'hide'), f = b.options.direction || 'vertical';
      a.effects.save(c, d), c.show();
      var g = a.effects.createWrapper(c).css({ overflow: 'hidden' }), h = f == 'vertical' ? 'height' : 'width', i = f == 'vertical' ? g.height() : g.width();
      e == 'show' && g.css(h, 0);
      var j = {};
      j[h] = e == 'show' ? i : 0, g.animate(j, b.duration, b.options.easing, function () {
        e == 'hide' && c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(c[0], arguments), c.dequeue();
      });
    });
  };
}(jQuery), function (a, b) {
  a.effects.bounce = function (b) {
    return this.queue(function () {
      var c = a(this), d = [
          'position',
          'top',
          'bottom',
          'left',
          'right'
        ], e = a.effects.setMode(c, b.options.mode || 'effect'), f = b.options.direction || 'up', g = b.options.distance || 20, h = b.options.times || 5, i = b.duration || 250;
      /show|hide/.test(e) && d.push('opacity'), a.effects.save(c, d), c.show(), a.effects.createWrapper(c);
      var j = f == 'up' || f == 'down' ? 'top' : 'left', k = f == 'up' || f == 'left' ? 'pos' : 'neg', g = b.options.distance || (j == 'top' ? c.outerHeight(!0) / 3 : c.outerWidth(!0) / 3);
      e == 'show' && c.css('opacity', 0).css(j, k == 'pos' ? -g : g), e == 'hide' && (g = g / (h * 2)), e != 'hide' && h--;
      if (e == 'show') {
        var l = { opacity: 1 };
        l[j] = (k == 'pos' ? '+=' : '-=') + g, c.animate(l, i / 2, b.options.easing), g = g / 2, h--;
      }
      for (var m = 0; m < h; m++) {
        var n = {}, p = {};
        n[j] = (k == 'pos' ? '-=' : '+=') + g, p[j] = (k == 'pos' ? '+=' : '-=') + g, c.animate(n, i / 2, b.options.easing).animate(p, i / 2, b.options.easing), g = e == 'hide' ? g * 2 : g / 2;
      }
      if (e == 'hide') {
        var l = { opacity: 0 };
        l[j] = (k == 'pos' ? '-=' : '+=') + g, c.animate(l, i / 2, b.options.easing, function () {
          c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments);
        });
      } else {
        var n = {}, p = {};
        n[j] = (k == 'pos' ? '-=' : '+=') + g, p[j] = (k == 'pos' ? '+=' : '-=') + g, c.animate(n, i / 2, b.options.easing).animate(p, i / 2, b.options.easing, function () {
          a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments);
        });
      }
      c.queue('fx', function () {
        c.dequeue();
      }), c.dequeue();
    });
  };
}(jQuery), function (a, b) {
  a.effects.clip = function (b) {
    return this.queue(function () {
      var c = a(this), d = [
          'position',
          'top',
          'bottom',
          'left',
          'right',
          'height',
          'width'
        ], e = a.effects.setMode(c, b.options.mode || 'hide'), f = b.options.direction || 'vertical';
      a.effects.save(c, d), c.show();
      var g = a.effects.createWrapper(c).css({ overflow: 'hidden' }), h = c[0].tagName == 'IMG' ? g : c, i = {
          size: f == 'vertical' ? 'height' : 'width',
          position: f == 'vertical' ? 'top' : 'left'
        }, j = f == 'vertical' ? h.height() : h.width();
      e == 'show' && (h.css(i.size, 0), h.css(i.position, j / 2));
      var k = {};
      k[i.size] = e == 'show' ? j : 0, k[i.position] = e == 'show' ? 0 : j / 2, h.animate(k, {
        queue: !1,
        duration: b.duration,
        easing: b.options.easing,
        complete: function () {
          e == 'hide' && c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(c[0], arguments), c.dequeue();
        }
      });
    });
  };
}(jQuery), function (a, b) {
  a.effects.drop = function (b) {
    return this.queue(function () {
      var c = a(this), d = [
          'position',
          'top',
          'bottom',
          'left',
          'right',
          'opacity'
        ], e = a.effects.setMode(c, b.options.mode || 'hide'), f = b.options.direction || 'left';
      a.effects.save(c, d), c.show(), a.effects.createWrapper(c);
      var g = f == 'up' || f == 'down' ? 'top' : 'left', h = f == 'up' || f == 'left' ? 'pos' : 'neg', i = b.options.distance || (g == 'top' ? c.outerHeight(!0) / 2 : c.outerWidth(!0) / 2);
      e == 'show' && c.css('opacity', 0).css(g, h == 'pos' ? -i : i);
      var j = { opacity: e == 'show' ? 1 : 0 };
      j[g] = (e == 'show' ? h == 'pos' ? '+=' : '-=' : h == 'pos' ? '-=' : '+=') + i, c.animate(j, {
        queue: !1,
        duration: b.duration,
        easing: b.options.easing,
        complete: function () {
          e == 'hide' && c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments), c.dequeue();
        }
      });
    });
  };
}(jQuery), function (a, b) {
  a.effects.explode = function (b) {
    return this.queue(function () {
      var c = b.options.pieces ? Math.round(Math.sqrt(b.options.pieces)) : 3, d = b.options.pieces ? Math.round(Math.sqrt(b.options.pieces)) : 3;
      b.options.mode = b.options.mode == 'toggle' ? a(this).is(':visible') ? 'hide' : 'show' : b.options.mode;
      var e = a(this).show().css('visibility', 'hidden'), f = e.offset();
      f.top -= parseInt(e.css('marginTop'), 10) || 0, f.left -= parseInt(e.css('marginLeft'), 10) || 0;
      var g = e.outerWidth(!0), h = e.outerHeight(!0);
      for (var i = 0; i < c; i++)
        for (var j = 0; j < d; j++)
          e.clone().appendTo('body').wrap('<div></div>').css({
            position: 'absolute',
            visibility: 'visible',
            left: -j * (g / d),
            top: -i * (h / c)
          }).parent().addClass('ui-effects-explode').css({
            position: 'absolute',
            overflow: 'hidden',
            width: g / d,
            height: h / c,
            left: f.left + j * (g / d) + (b.options.mode == 'show' ? (j - Math.floor(d / 2)) * (g / d) : 0),
            top: f.top + i * (h / c) + (b.options.mode == 'show' ? (i - Math.floor(c / 2)) * (h / c) : 0),
            opacity: b.options.mode == 'show' ? 0 : 1
          }).animate({
            left: f.left + j * (g / d) + (b.options.mode == 'show' ? 0 : (j - Math.floor(d / 2)) * (g / d)),
            top: f.top + i * (h / c) + (b.options.mode == 'show' ? 0 : (i - Math.floor(c / 2)) * (h / c)),
            opacity: b.options.mode == 'show' ? 1 : 0
          }, b.duration || 500);
      setTimeout(function () {
        b.options.mode == 'show' ? e.css({ visibility: 'visible' }) : e.css({ visibility: 'visible' }).hide(), b.callback && b.callback.apply(e[0]), e.dequeue(), a('div.ui-effects-explode').remove();
      }, b.duration || 500);
    });
  };
}(jQuery), function (a, b) {
  a.effects.fade = function (b) {
    return this.queue(function () {
      var c = a(this), d = a.effects.setMode(c, b.options.mode || 'hide');
      c.animate({ opacity: d }, {
        queue: !1,
        duration: b.duration,
        easing: b.options.easing,
        complete: function () {
          b.callback && b.callback.apply(this, arguments), c.dequeue();
        }
      });
    });
  };
}(jQuery), function (a, b) {
  a.effects.fold = function (b) {
    return this.queue(function () {
      var c = a(this), d = [
          'position',
          'top',
          'bottom',
          'left',
          'right'
        ], e = a.effects.setMode(c, b.options.mode || 'hide'), f = b.options.size || 15, g = !!b.options.horizFirst, h = b.duration ? b.duration / 2 : a.fx.speeds._default / 2;
      a.effects.save(c, d), c.show();
      var i = a.effects.createWrapper(c).css({ overflow: 'hidden' }), j = e == 'show' != g, k = j ? [
          'width',
          'height'
        ] : [
          'height',
          'width'
        ], l = j ? [
          i.width(),
          i.height()
        ] : [
          i.height(),
          i.width()
        ], m = /([0-9]+)%/.exec(f);
      m && (f = parseInt(m[1], 10) / 100 * l[e == 'hide' ? 0 : 1]), e == 'show' && i.css(g ? {
        height: 0,
        width: f
      } : {
        height: f,
        width: 0
      });
      var n = {}, p = {};
      n[k[0]] = e == 'show' ? l[0] : f, p[k[1]] = e == 'show' ? l[1] : 0, i.animate(n, h, b.options.easing).animate(p, h, b.options.easing, function () {
        e == 'hide' && c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(c[0], arguments), c.dequeue();
      });
    });
  };
}(jQuery), function (a, b) {
  a.effects.highlight = function (b) {
    return this.queue(function () {
      var c = a(this), d = [
          'backgroundImage',
          'backgroundColor',
          'opacity'
        ], e = a.effects.setMode(c, b.options.mode || 'show'), f = { backgroundColor: c.css('backgroundColor') };
      e == 'hide' && (f.opacity = 0), a.effects.save(c, d), c.show().css({
        backgroundImage: 'none',
        backgroundColor: b.options.color || '#ffff99'
      }).animate(f, {
        queue: !1,
        duration: b.duration,
        easing: b.options.easing,
        complete: function () {
          e == 'hide' && c.hide(), a.effects.restore(c, d), e == 'show' && !a.support.opacity && this.style.removeAttribute('filter'), b.callback && b.callback.apply(this, arguments), c.dequeue();
        }
      });
    });
  };
}(jQuery), function (a, b) {
  a.effects.pulsate = function (b) {
    return this.queue(function () {
      var c = a(this), d = a.effects.setMode(c, b.options.mode || 'show'), e = (b.options.times || 5) * 2 - 1, f = b.duration ? b.duration / 2 : a.fx.speeds._default / 2, g = c.is(':visible'), h = 0;
      g || (c.css('opacity', 0).show(), h = 1), (d == 'hide' && g || d == 'show' && !g) && e--;
      for (var i = 0; i < e; i++)
        c.animate({ opacity: h }, f, b.options.easing), h = (h + 1) % 2;
      c.animate({ opacity: h }, f, b.options.easing, function () {
        h == 0 && c.hide(), b.callback && b.callback.apply(this, arguments);
      }), c.queue('fx', function () {
        c.dequeue();
      }).dequeue();
    });
  };
}(jQuery), function (a, b) {
  a.effects.puff = function (b) {
    return this.queue(function () {
      var c = a(this), d = a.effects.setMode(c, b.options.mode || 'hide'), e = parseInt(b.options.percent, 10) || 150, f = e / 100, g = {
          height: c.height(),
          width: c.width()
        };
      a.extend(b.options, {
        fade: !0,
        mode: d,
        percent: d == 'hide' ? e : 100,
        from: d == 'hide' ? g : {
          height: g.height * f,
          width: g.width * f
        }
      }), c.effect('scale', b.options, b.duration, b.callback), c.dequeue();
    });
  }, a.effects.scale = function (b) {
    return this.queue(function () {
      var c = a(this), d = a.extend(!0, {}, b.options), e = a.effects.setMode(c, b.options.mode || 'effect'), f = parseInt(b.options.percent, 10) || (parseInt(b.options.percent, 10) == 0 ? 0 : e == 'hide' ? 0 : 100), g = b.options.direction || 'both', h = b.options.origin;
      e != 'effect' && (d.origin = h || [
        'middle',
        'center'
      ], d.restore = !0);
      var i = {
          height: c.height(),
          width: c.width()
        };
      c.from = b.options.from || (e == 'show' ? {
        height: 0,
        width: 0
      } : i);
      var j = {
          y: g != 'horizontal' ? f / 100 : 1,
          x: g != 'vertical' ? f / 100 : 1
        };
      c.to = {
        height: i.height * j.y,
        width: i.width * j.x
      }, b.options.fade && (e == 'show' && (c.from.opacity = 0, c.to.opacity = 1), e == 'hide' && (c.from.opacity = 1, c.to.opacity = 0)), d.from = c.from, d.to = c.to, d.mode = e, c.effect('size', d, b.duration, b.callback), c.dequeue();
    });
  }, a.effects.size = function (b) {
    return this.queue(function () {
      var c = a(this), d = [
          'position',
          'top',
          'bottom',
          'left',
          'right',
          'width',
          'height',
          'overflow',
          'opacity'
        ], e = [
          'position',
          'top',
          'bottom',
          'left',
          'right',
          'overflow',
          'opacity'
        ], f = [
          'width',
          'height',
          'overflow'
        ], g = ['fontSize'], h = [
          'borderTopWidth',
          'borderBottomWidth',
          'paddingTop',
          'paddingBottom'
        ], i = [
          'borderLeftWidth',
          'borderRightWidth',
          'paddingLeft',
          'paddingRight'
        ], j = a.effects.setMode(c, b.options.mode || 'effect'), k = b.options.restore || !1, l = b.options.scale || 'both', m = b.options.origin, n = {
          height: c.height(),
          width: c.width()
        };
      c.from = b.options.from || n, c.to = b.options.to || n;
      if (m) {
        var p = a.effects.getBaseline(m, n);
        c.from.top = (n.height - c.from.height) * p.y, c.from.left = (n.width - c.from.width) * p.x, c.to.top = (n.height - c.to.height) * p.y, c.to.left = (n.width - c.to.width) * p.x;
      }
      var q = {
          from: {
            y: c.from.height / n.height,
            x: c.from.width / n.width
          },
          to: {
            y: c.to.height / n.height,
            x: c.to.width / n.width
          }
        };
      if (l == 'box' || l == 'both')
        q.from.y != q.to.y && (d = d.concat(h), c.from = a.effects.setTransition(c, h, q.from.y, c.from), c.to = a.effects.setTransition(c, h, q.to.y, c.to)), q.from.x != q.to.x && (d = d.concat(i), c.from = a.effects.setTransition(c, i, q.from.x, c.from), c.to = a.effects.setTransition(c, i, q.to.x, c.to));
      (l == 'content' || l == 'both') && q.from.y != q.to.y && (d = d.concat(g), c.from = a.effects.setTransition(c, g, q.from.y, c.from), c.to = a.effects.setTransition(c, g, q.to.y, c.to)), a.effects.save(c, k ? d : e), c.show(), a.effects.createWrapper(c), c.css('overflow', 'hidden').css(c.from);
      if (l == 'content' || l == 'both')
        h = h.concat([
          'marginTop',
          'marginBottom'
        ]).concat(g), i = i.concat([
          'marginLeft',
          'marginRight'
        ]), f = d.concat(h).concat(i), c.find('*[width]').each(function () {
          var c = a(this);
          k && a.effects.save(c, f);
          var d = {
              height: c.height(),
              width: c.width()
            };
          c.from = {
            height: d.height * q.from.y,
            width: d.width * q.from.x
          }, c.to = {
            height: d.height * q.to.y,
            width: d.width * q.to.x
          }, q.from.y != q.to.y && (c.from = a.effects.setTransition(c, h, q.from.y, c.from), c.to = a.effects.setTransition(c, h, q.to.y, c.to)), q.from.x != q.to.x && (c.from = a.effects.setTransition(c, i, q.from.x, c.from), c.to = a.effects.setTransition(c, i, q.to.x, c.to)), c.css(c.from), c.animate(c.to, b.duration, b.options.easing, function () {
            k && a.effects.restore(c, f);
          });
        });
      c.animate(c.to, {
        queue: !1,
        duration: b.duration,
        easing: b.options.easing,
        complete: function () {
          c.to.opacity === 0 && c.css('opacity', c.from.opacity), j == 'hide' && c.hide(), a.effects.restore(c, k ? d : e), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments), c.dequeue();
        }
      });
    });
  };
}(jQuery), function (a, b) {
  a.effects.shake = function (b) {
    return this.queue(function () {
      var c = a(this), d = [
          'position',
          'top',
          'bottom',
          'left',
          'right'
        ], e = a.effects.setMode(c, b.options.mode || 'effect'), f = b.options.direction || 'left', g = b.options.distance || 20, h = b.options.times || 3, i = b.duration || b.options.duration || 140;
      a.effects.save(c, d), c.show(), a.effects.createWrapper(c);
      var j = f == 'up' || f == 'down' ? 'top' : 'left', k = f == 'up' || f == 'left' ? 'pos' : 'neg', l = {}, m = {}, n = {};
      l[j] = (k == 'pos' ? '-=' : '+=') + g, m[j] = (k == 'pos' ? '+=' : '-=') + g * 2, n[j] = (k == 'pos' ? '-=' : '+=') + g * 2, c.animate(l, i, b.options.easing);
      for (var p = 1; p < h; p++)
        c.animate(m, i, b.options.easing).animate(n, i, b.options.easing);
      c.animate(m, i, b.options.easing).animate(l, i / 2, b.options.easing, function () {
        a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments);
      }), c.queue('fx', function () {
        c.dequeue();
      }), c.dequeue();
    });
  };
}(jQuery), function (a, b) {
  a.effects.slide = function (b) {
    return this.queue(function () {
      var c = a(this), d = [
          'position',
          'top',
          'bottom',
          'left',
          'right'
        ], e = a.effects.setMode(c, b.options.mode || 'show'), f = b.options.direction || 'left';
      a.effects.save(c, d), c.show(), a.effects.createWrapper(c).css({ overflow: 'hidden' });
      var g = f == 'up' || f == 'down' ? 'top' : 'left', h = f == 'up' || f == 'left' ? 'pos' : 'neg', i = b.options.distance || (g == 'top' ? c.outerHeight(!0) : c.outerWidth(!0));
      e == 'show' && c.css(g, h == 'pos' ? isNaN(i) ? '-' + i : -i : i);
      var j = {};
      j[g] = (e == 'show' ? h == 'pos' ? '+=' : '-=' : h == 'pos' ? '-=' : '+=') + i, c.animate(j, {
        queue: !1,
        duration: b.duration,
        easing: b.options.easing,
        complete: function () {
          e == 'hide' && c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments), c.dequeue();
        }
      });
    });
  };
}(jQuery), function (a, b) {
  a.effects.transfer = function (b) {
    return this.queue(function () {
      var c = a(this), d = a(b.options.to), e = d.offset(), f = {
          top: e.top,
          left: e.left,
          height: d.innerHeight(),
          width: d.innerWidth()
        }, g = c.offset(), h = a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(b.options.className).css({
          top: g.top,
          left: g.left,
          height: c.innerHeight(),
          width: c.innerWidth(),
          position: 'absolute'
        }).animate(f, b.duration, b.options.easing, function () {
          h.remove(), b.callback && b.callback.apply(c[0], arguments), c.dequeue();
        });
    });
  };
}(jQuery), function (a, b) {
  a.widget('ui.accordion', {
    options: {
      active: 0,
      animated: 'slide',
      autoHeight: !0,
      clearStyle: !1,
      collapsible: !1,
      event: 'click',
      fillSpace: !1,
      header: '> li > :first-child,> :not(li):even',
      icons: {
        header: 'ui-icon-triangle-1-e',
        headerSelected: 'ui-icon-triangle-1-s'
      },
      navigation: !1,
      navigationFilter: function () {
        return this.href.toLowerCase() === location.href.toLowerCase();
      }
    },
    _create: function () {
      var b = this, c = b.options;
      b.running = 0, b.element.addClass('ui-accordion ui-widget ui-helper-reset').children('li').addClass('ui-accordion-li-fix'), b.headers = b.element.find(c.header).addClass('ui-accordion-header ui-helper-reset ui-state-default ui-corner-all').bind('mouseenter.accordion', function () {
        if (c.disabled)
          return;
        a(this).addClass('ui-state-hover');
      }).bind('mouseleave.accordion', function () {
        if (c.disabled)
          return;
        a(this).removeClass('ui-state-hover');
      }).bind('focus.accordion', function () {
        if (c.disabled)
          return;
        a(this).addClass('ui-state-focus');
      }).bind('blur.accordion', function () {
        if (c.disabled)
          return;
        a(this).removeClass('ui-state-focus');
      }), b.headers.next().addClass('ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom');
      if (c.navigation) {
        var d = b.element.find('a').filter(c.navigationFilter).eq(0);
        if (d.length) {
          var e = d.closest('.ui-accordion-header');
          e.length ? b.active = e : b.active = d.closest('.ui-accordion-content').prev();
        }
      }
      b.active = b._findActive(b.active || c.active).addClass('ui-state-default ui-state-active').toggleClass('ui-corner-all').toggleClass('ui-corner-top'), b.active.next().addClass('ui-accordion-content-active'), b._createIcons(), b.resize(), b.element.attr('role', 'tablist'), b.headers.attr('role', 'tab').bind('keydown.accordion', function (a) {
        return b._keydown(a);
      }).next().attr('role', 'tabpanel'), b.headers.not(b.active || '').attr({
        'aria-expanded': 'false',
        'aria-selected': 'false',
        tabIndex: -1
      }).next().hide(), b.active.length ? b.active.attr({
        'aria-expanded': 'true',
        'aria-selected': 'true',
        tabIndex: 0
      }) : b.headers.eq(0).attr('tabIndex', 0), a.browser.safari || b.headers.find('a').attr('tabIndex', -1), c.event && b.headers.bind(c.event.split(' ').join('.accordion ') + '.accordion', function (a) {
        b._clickHandler.call(b, a, this), a.preventDefault();
      });
    },
    _createIcons: function () {
      var b = this.options;
      b.icons && (a('<span></span>').addClass('ui-icon ' + b.icons.header).prependTo(this.headers), this.active.children('.ui-icon').toggleClass(b.icons.header).toggleClass(b.icons.headerSelected), this.element.addClass('ui-accordion-icons'));
    },
    _destroyIcons: function () {
      this.headers.children('.ui-icon').remove(), this.element.removeClass('ui-accordion-icons');
    },
    destroy: function () {
      var b = this.options;
      this.element.removeClass('ui-accordion ui-widget ui-helper-reset').removeAttr('role'), this.headers.unbind('.accordion').removeClass('ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top').removeAttr('role').removeAttr('aria-expanded').removeAttr('aria-selected').removeAttr('tabIndex'), this.headers.find('a').removeAttr('tabIndex'), this._destroyIcons();
      var c = this.headers.next().css('display', '').removeAttr('role').removeClass('ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled');
      return (b.autoHeight || b.fillHeight) && c.css('height', ''), a.Widget.prototype.destroy.call(this);
    },
    _setOption: function (b, c) {
      a.Widget.prototype._setOption.apply(this, arguments), b == 'active' && this.activate(c), b == 'icons' && (this._destroyIcons(), c && this._createIcons()), b == 'disabled' && this.headers.add(this.headers.next())[c ? 'addClass' : 'removeClass']('ui-accordion-disabled ui-state-disabled');
    },
    _keydown: function (b) {
      if (this.options.disabled || b.altKey || b.ctrlKey)
        return;
      var c = a.ui.keyCode, d = this.headers.length, e = this.headers.index(b.target), f = !1;
      switch (b.keyCode) {
      case c.RIGHT:
      case c.DOWN:
        f = this.headers[(e + 1) % d];
        break;
      case c.LEFT:
      case c.UP:
        f = this.headers[(e - 1 + d) % d];
        break;
      case c.SPACE:
      case c.ENTER:
        this._clickHandler({ target: b.target }, b.target), b.preventDefault();
      }
      return f ? (a(b.target).attr('tabIndex', -1), a(f).attr('tabIndex', 0), f.focus(), !1) : !0;
    },
    resize: function () {
      var b = this.options, c;
      if (b.fillSpace) {
        if (a.browser.msie) {
          var d = this.element.parent().css('overflow');
          this.element.parent().css('overflow', 'hidden');
        }
        c = this.element.parent().height(), a.browser.msie && this.element.parent().css('overflow', d), this.headers.each(function () {
          c -= a(this).outerHeight(!0);
        }), this.headers.next().each(function () {
          a(this).height(Math.max(0, c - a(this).innerHeight() + a(this).height()));
        }).css('overflow', 'auto');
      } else
        b.autoHeight && (c = 0, this.headers.next().each(function () {
          c = Math.max(c, a(this).height('').height());
        }).height(c));
      return this;
    },
    activate: function (a) {
      this.options.active = a;
      var b = this._findActive(a)[0];
      return this._clickHandler({ target: b }, b), this;
    },
    _findActive: function (b) {
      return b ? typeof b == 'number' ? this.headers.filter(':eq(' + b + ')') : this.headers.not(this.headers.not(b)) : b === !1 ? a([]) : this.headers.filter(':eq(0)');
    },
    _clickHandler: function (b, c) {
      var d = this.options;
      if (d.disabled)
        return;
      if (!b.target) {
        if (!d.collapsible)
          return;
        this.active.removeClass('ui-state-active ui-corner-top').addClass('ui-state-default ui-corner-all').children('.ui-icon').removeClass(d.icons.headerSelected).addClass(d.icons.header), this.active.next().addClass('ui-accordion-content-active');
        var e = this.active.next(), f = {
            options: d,
            newHeader: a([]),
            oldHeader: d.active,
            newContent: a([]),
            oldContent: e
          }, g = this.active = a([]);
        this._toggle(g, e, f);
        return;
      }
      var h = a(b.currentTarget || c), i = h[0] === this.active[0];
      d.active = d.collapsible && i ? !1 : this.headers.index(h);
      if (this.running || !d.collapsible && i)
        return;
      var j = this.active, g = h.next(), e = this.active.next(), f = {
          options: d,
          newHeader: i && d.collapsible ? a([]) : h,
          oldHeader: this.active,
          newContent: i && d.collapsible ? a([]) : g,
          oldContent: e
        }, k = this.headers.index(this.active[0]) > this.headers.index(h[0]);
      this.active = i ? a([]) : h, this._toggle(g, e, f, i, k), j.removeClass('ui-state-active ui-corner-top').addClass('ui-state-default ui-corner-all').children('.ui-icon').removeClass(d.icons.headerSelected).addClass(d.icons.header), i || (h.removeClass('ui-state-default ui-corner-all').addClass('ui-state-active ui-corner-top').children('.ui-icon').removeClass(d.icons.header).addClass(d.icons.headerSelected), h.next().addClass('ui-accordion-content-active'));
      return;
    },
    _toggle: function (b, c, d, e, f) {
      var g = this, h = g.options;
      g.toShow = b, g.toHide = c, g.data = d;
      var i = function () {
        if (!g)
          return;
        return g._completed.apply(g, arguments);
      };
      g._trigger('changestart', null, g.data), g.running = c.size() === 0 ? b.size() : c.size();
      if (h.animated) {
        var j = {};
        h.collapsible && e ? j = {
          toShow: a([]),
          toHide: c,
          complete: i,
          down: f,
          autoHeight: h.autoHeight || h.fillSpace
        } : j = {
          toShow: b,
          toHide: c,
          complete: i,
          down: f,
          autoHeight: h.autoHeight || h.fillSpace
        }, h.proxied || (h.proxied = h.animated), h.proxiedDuration || (h.proxiedDuration = h.duration), h.animated = a.isFunction(h.proxied) ? h.proxied(j) : h.proxied, h.duration = a.isFunction(h.proxiedDuration) ? h.proxiedDuration(j) : h.proxiedDuration;
        var k = a.ui.accordion.animations, l = h.duration, m = h.animated;
        m && !k[m] && !a.easing[m] && (m = 'slide'), k[m] || (k[m] = function (a) {
          this.slide(a, {
            easing: m,
            duration: l || 700
          });
        }), k[m](j);
      } else
        h.collapsible && e ? b.toggle() : (c.hide(), b.show()), i(!0);
      c.prev().attr({
        'aria-expanded': 'false',
        'aria-selected': 'false',
        tabIndex: -1
      }).blur(), b.prev().attr({
        'aria-expanded': 'true',
        'aria-selected': 'true',
        tabIndex: 0
      }).focus();
    },
    _completed: function (a) {
      this.running = a ? 0 : --this.running;
      if (this.running)
        return;
      this.options.clearStyle && this.toShow.add(this.toHide).css({
        height: '',
        overflow: ''
      }), this.toHide.removeClass('ui-accordion-content-active'), this.toHide.length && (this.toHide.parent()[0].className = this.toHide.parent()[0].className), this._trigger('change', null, this.data);
    }
  }), a.extend(a.ui.accordion, {
    version: '1.8.23',
    animations: {
      slide: function (b, c) {
        b = a.extend({
          easing: 'swing',
          duration: 300
        }, b, c);
        if (!b.toHide.size()) {
          b.toShow.animate({
            height: 'show',
            paddingTop: 'show',
            paddingBottom: 'show'
          }, b);
          return;
        }
        if (!b.toShow.size()) {
          b.toHide.animate({
            height: 'hide',
            paddingTop: 'hide',
            paddingBottom: 'hide'
          }, b);
          return;
        }
        var d = b.toShow.css('overflow'), e = 0, f = {}, g = {}, h = [
            'height',
            'paddingTop',
            'paddingBottom'
          ], i, j = b.toShow;
        i = j[0].style.width, j.width(j.parent().width() - parseFloat(j.css('paddingLeft')) - parseFloat(j.css('paddingRight')) - (parseFloat(j.css('borderLeftWidth')) || 0) - (parseFloat(j.css('borderRightWidth')) || 0)), a.each(h, function (c, d) {
          g[d] = 'hide';
          var e = ('' + a.css(b.toShow[0], d)).match(/^([\d+-.]+)(.*)$/);
          f[d] = {
            value: e[1],
            unit: e[2] || 'px'
          };
        }), b.toShow.css({
          height: 0,
          overflow: 'hidden'
        }).show(), b.toHide.filter(':hidden').each(b.complete).end().filter(':visible').animate(g, {
          step: function (a, c) {
            c.prop == 'height' && (e = c.end - c.start === 0 ? 0 : (c.now - c.start) / (c.end - c.start)), b.toShow[0].style[c.prop] = e * f[c.prop].value + f[c.prop].unit;
          },
          duration: b.duration,
          easing: b.easing,
          complete: function () {
            b.autoHeight || b.toShow.css('height', ''), b.toShow.css({
              width: i,
              overflow: d
            }), b.complete();
          }
        });
      },
      bounceslide: function (a) {
        this.slide(a, {
          easing: a.down ? 'easeOutBounce' : 'swing',
          duration: a.down ? 1000 : 200
        });
      }
    }
  });
}(jQuery), function (a, b) {
  var c = 0;
  a.widget('ui.autocomplete', {
    options: {
      appendTo: 'body',
      autoFocus: !1,
      delay: 300,
      minLength: 1,
      position: {
        my: 'left top',
        at: 'left bottom',
        collision: 'none'
      },
      source: null
    },
    pending: 0,
    _create: function () {
      var b = this, c = this.element[0].ownerDocument, d;
      this.isMultiLine = this.element.is('textarea'), this.element.addClass('ui-autocomplete-input').attr('autocomplete', 'off').attr({
        role: 'textbox',
        'aria-autocomplete': 'list',
        'aria-haspopup': 'true'
      }).bind('keydown.autocomplete', function (c) {
        if (b.options.disabled || b.element.propAttr('readOnly'))
          return;
        d = !1;
        var e = a.ui.keyCode;
        switch (c.keyCode) {
        case e.PAGE_UP:
          b._move('previousPage', c);
          break;
        case e.PAGE_DOWN:
          b._move('nextPage', c);
          break;
        case e.UP:
          b._keyEvent('previous', c);
          break;
        case e.DOWN:
          b._keyEvent('next', c);
          break;
        case e.ENTER:
        case e.NUMPAD_ENTER:
          b.menu.active && (d = !0, c.preventDefault());
        case e.TAB:
          if (!b.menu.active)
            return;
          b.menu.select(c);
          break;
        case e.ESCAPE:
          b.element.val(b.term), b.close(c);
          break;
        default:
          clearTimeout(b.searching), b.searching = setTimeout(function () {
            b.term != b.element.val() && (b.selectedItem = null, b.search(null, c));
          }, b.options.delay);
        }
      }).bind('keypress.autocomplete', function (a) {
        d && (d = !1, a.preventDefault());
      }).bind('focus.autocomplete', function () {
        if (b.options.disabled)
          return;
        b.selectedItem = null, b.previous = b.element.val();
      }).bind('blur.autocomplete', function (a) {
        if (b.options.disabled)
          return;
        clearTimeout(b.searching), b.closing = setTimeout(function () {
          b.close(a), b._change(a);
        }, 150);
      }), this._initSource(), this.menu = a('<ul></ul>').addClass('ui-autocomplete').appendTo(a(this.options.appendTo || 'body', c)[0]).mousedown(function (c) {
        var d = b.menu.element[0];
        a(c.target).closest('.ui-menu-item').length || setTimeout(function () {
          a(document).one('mousedown', function (c) {
            c.target !== b.element[0] && c.target !== d && !a.ui.contains(d, c.target) && b.close();
          });
        }, 1), setTimeout(function () {
          clearTimeout(b.closing);
        }, 13);
      }).menu({
        focus: function (a, c) {
          var d = c.item.data('item.autocomplete');
          !1 !== b._trigger('focus', a, { item: d }) && /^key/.test(a.originalEvent.type) && b.element.val(d.value);
        },
        selected: function (a, d) {
          var e = d.item.data('item.autocomplete'), f = b.previous;
          b.element[0] !== c.activeElement && (b.element.focus(), b.previous = f, setTimeout(function () {
            b.previous = f, b.selectedItem = e;
          }, 1)), !1 !== b._trigger('select', a, { item: e }) && b.element.val(e.value), b.term = b.element.val(), b.close(a), b.selectedItem = e;
        },
        blur: function (a, c) {
          b.menu.element.is(':visible') && b.element.val() !== b.term && b.element.val(b.term);
        }
      }).zIndex(this.element.zIndex() + 1).css({
        top: 0,
        left: 0
      }).hide().data('menu'), a.fn.bgiframe && this.menu.element.bgiframe(), b.beforeunloadHandler = function () {
        b.element.removeAttr('autocomplete');
      }, a(window).bind('beforeunload', b.beforeunloadHandler);
    },
    destroy: function () {
      this.element.removeClass('ui-autocomplete-input').removeAttr('autocomplete').removeAttr('role').removeAttr('aria-autocomplete').removeAttr('aria-haspopup'), this.menu.element.remove(), a(window).unbind('beforeunload', this.beforeunloadHandler), a.Widget.prototype.destroy.call(this);
    },
    _setOption: function (b, c) {
      a.Widget.prototype._setOption.apply(this, arguments), b === 'source' && this._initSource(), b === 'appendTo' && this.menu.element.appendTo(a(c || 'body', this.element[0].ownerDocument)[0]), b === 'disabled' && c && this.xhr && this.xhr.abort();
    },
    _initSource: function () {
      var b = this, c, d;
      a.isArray(this.options.source) ? (c = this.options.source, this.source = function (b, d) {
        d(a.ui.autocomplete.filter(c, b.term));
      }) : typeof this.options.source == 'string' ? (d = this.options.source, this.source = function (c, e) {
        b.xhr && b.xhr.abort(), b.xhr = a.ajax({
          url: d,
          data: c,
          dataType: 'json',
          success: function (a, b) {
            e(a);
          },
          error: function () {
            e([]);
          }
        });
      }) : this.source = this.options.source;
    },
    search: function (a, b) {
      a = a != null ? a : this.element.val(), this.term = this.element.val();
      if (a.length < this.options.minLength)
        return this.close(b);
      clearTimeout(this.closing);
      if (this._trigger('search', b) === !1)
        return;
      return this._search(a);
    },
    _search: function (a) {
      this.pending++, this.element.addClass('ui-autocomplete-loading'), this.source({ term: a }, this._response());
    },
    _response: function () {
      var a = this, b = ++c;
      return function (d) {
        b === c && a.__response(d), a.pending--, a.pending || a.element.removeClass('ui-autocomplete-loading');
      };
    },
    __response: function (a) {
      !this.options.disabled && a && a.length ? (a = this._normalize(a), this._suggest(a), this._trigger('open')) : this.close();
    },
    close: function (a) {
      clearTimeout(this.closing), this.menu.element.is(':visible') && (this.menu.element.hide(), this.menu.deactivate(), this._trigger('close', a));
    },
    _change: function (a) {
      this.previous !== this.element.val() && this._trigger('change', a, { item: this.selectedItem });
    },
    _normalize: function (b) {
      return b.length && b[0].label && b[0].value ? b : a.map(b, function (b) {
        return typeof b == 'string' ? {
          label: b,
          value: b
        } : a.extend({
          label: b.label || b.value,
          value: b.value || b.label
        }, b);
      });
    },
    _suggest: function (b) {
      var c = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
      this._renderMenu(c, b), this.menu.deactivate(), this.menu.refresh(), c.show(), this._resizeMenu(), c.position(a.extend({ of: this.element }, this.options.position)), this.options.autoFocus && this.menu.next(new a.Event('mouseover'));
    },
    _resizeMenu: function () {
      var a = this.menu.element;
      a.outerWidth(Math.max(a.width('').outerWidth() + 1, this.element.outerWidth()));
    },
    _renderMenu: function (b, c) {
      var d = this;
      a.each(c, function (a, c) {
        d._renderItem(b, c);
      });
    },
    _renderItem: function (b, c) {
      return a('<li></li>').data('item.autocomplete', c).append(a('<a></a>').text(c.label)).appendTo(b);
    },
    _move: function (a, b) {
      if (!this.menu.element.is(':visible')) {
        this.search(null, b);
        return;
      }
      if (this.menu.first() && /^previous/.test(a) || this.menu.last() && /^next/.test(a)) {
        this.element.val(this.term), this.menu.deactivate();
        return;
      }
      this.menu[a](b);
    },
    widget: function () {
      return this.menu.element;
    },
    _keyEvent: function (a, b) {
      if (!this.isMultiLine || this.menu.element.is(':visible'))
        this._move(a, b), b.preventDefault();
    }
  }), a.extend(a.ui.autocomplete, {
    escapeRegex: function (a) {
      return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    },
    filter: function (b, c) {
      var d = new RegExp(a.ui.autocomplete.escapeRegex(c), 'i');
      return a.grep(b, function (a) {
        return d.test(a.label || a.value || a);
      });
    }
  });
}(jQuery), function (a) {
  a.widget('ui.menu', {
    _create: function () {
      var b = this;
      this.element.addClass('ui-menu ui-widget ui-widget-content ui-corner-all').attr({
        role: 'listbox',
        'aria-activedescendant': 'ui-active-menuitem'
      }).click(function (c) {
        if (!a(c.target).closest('.ui-menu-item a').length)
          return;
        c.preventDefault(), b.select(c);
      }), this.refresh();
    },
    refresh: function () {
      var b = this, c = this.element.children('li:not(.ui-menu-item):has(a)').addClass('ui-menu-item').attr('role', 'menuitem');
      c.children('a').addClass('ui-corner-all').attr('tabindex', -1).mouseenter(function (c) {
        b.activate(c, a(this).parent());
      }).mouseleave(function () {
        b.deactivate();
      });
    },
    activate: function (a, b) {
      this.deactivate();
      if (this.hasScroll()) {
        var c = b.offset().top - this.element.offset().top, d = this.element.scrollTop(), e = this.element.height();
        c < 0 ? this.element.scrollTop(d + c) : c >= e && this.element.scrollTop(d + c - e + b.height());
      }
      this.active = b.eq(0).children('a').addClass('ui-state-hover').attr('id', 'ui-active-menuitem').end(), this._trigger('focus', a, { item: b });
    },
    deactivate: function () {
      if (!this.active)
        return;
      this.active.children('a').removeClass('ui-state-hover').removeAttr('id'), this._trigger('blur'), this.active = null;
    },
    next: function (a) {
      this.move('next', '.ui-menu-item:first', a);
    },
    previous: function (a) {
      this.move('prev', '.ui-menu-item:last', a);
    },
    first: function () {
      return this.active && !this.active.prevAll('.ui-menu-item').length;
    },
    last: function () {
      return this.active && !this.active.nextAll('.ui-menu-item').length;
    },
    move: function (a, b, c) {
      if (!this.active) {
        this.activate(c, this.element.children(b));
        return;
      }
      var d = this.active[a + 'All']('.ui-menu-item').eq(0);
      d.length ? this.activate(c, d) : this.activate(c, this.element.children(b));
    },
    nextPage: function (b) {
      if (this.hasScroll()) {
        if (!this.active || this.last()) {
          this.activate(b, this.element.children('.ui-menu-item:first'));
          return;
        }
        var c = this.active.offset().top, d = this.element.height(), e = this.element.children('.ui-menu-item').filter(function () {
            var b = a(this).offset().top - c - d + a(this).height();
            return b < 10 && b > -10;
          });
        e.length || (e = this.element.children('.ui-menu-item:last')), this.activate(b, e);
      } else
        this.activate(b, this.element.children('.ui-menu-item').filter(!this.active || this.last() ? ':first' : ':last'));
    },
    previousPage: function (b) {
      if (this.hasScroll()) {
        if (!this.active || this.first()) {
          this.activate(b, this.element.children('.ui-menu-item:last'));
          return;
        }
        var c = this.active.offset().top, d = this.element.height(), e = this.element.children('.ui-menu-item').filter(function () {
            var b = a(this).offset().top - c + d - a(this).height();
            return b < 10 && b > -10;
          });
        e.length || (e = this.element.children('.ui-menu-item:first')), this.activate(b, e);
      } else
        this.activate(b, this.element.children('.ui-menu-item').filter(!this.active || this.first() ? ':last' : ':first'));
    },
    hasScroll: function () {
      return this.element.height() < this.element[a.fn.prop ? 'prop' : 'attr']('scrollHeight');
    },
    select: function (a) {
      this._trigger('selected', a, { item: this.active });
    }
  });
}(jQuery), function (a, b) {
  var c, d, e, f, g = 'ui-button ui-widget ui-state-default ui-corner-all', h = 'ui-state-hover ui-state-active ', i = 'ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only', j = function () {
      var b = a(this).find(':ui-button');
      setTimeout(function () {
        b.button('refresh');
      }, 1);
    }, k = function (b) {
      var c = b.name, d = b.form, e = a([]);
      return c && (d ? e = a(d).find('[name=\'' + c + '\']') : e = a('[name=\'' + c + '\']', b.ownerDocument).filter(function () {
        return !this.form;
      })), e;
    };
  a.widget('ui.button', {
    options: {
      disabled: null,
      text: !0,
      label: null,
      icons: {
        primary: null,
        secondary: null
      }
    },
    _create: function () {
      this.element.closest('form').unbind('reset.button').bind('reset.button', j), typeof this.options.disabled != 'boolean' ? this.options.disabled = !!this.element.propAttr('disabled') : this.element.propAttr('disabled', this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr('title');
      var b = this, h = this.options, i = this.type === 'checkbox' || this.type === 'radio', l = 'ui-state-hover' + (i ? '' : ' ui-state-active'), m = 'ui-state-focus';
      h.label === null && (h.label = this.buttonElement.html()), this.buttonElement.addClass(g).attr('role', 'button').bind('mouseenter.button', function () {
        if (h.disabled)
          return;
        a(this).addClass('ui-state-hover'), this === c && a(this).addClass('ui-state-active');
      }).bind('mouseleave.button', function () {
        if (h.disabled)
          return;
        a(this).removeClass(l);
      }).bind('click.button', function (a) {
        h.disabled && (a.preventDefault(), a.stopImmediatePropagation());
      }), this.element.bind('focus.button', function () {
        b.buttonElement.addClass(m);
      }).bind('blur.button', function () {
        b.buttonElement.removeClass(m);
      }), i && (this.element.bind('change.button', function () {
        if (f)
          return;
        b.refresh();
      }), this.buttonElement.bind('mousedown.button', function (a) {
        if (h.disabled)
          return;
        f = !1, d = a.pageX, e = a.pageY;
      }).bind('mouseup.button', function (a) {
        if (h.disabled)
          return;
        if (d !== a.pageX || e !== a.pageY)
          f = !0;
      })), this.type === 'checkbox' ? this.buttonElement.bind('click.button', function () {
        if (h.disabled || f)
          return !1;
        a(this).toggleClass('ui-state-active'), b.buttonElement.attr('aria-pressed', b.element[0].checked);
      }) : this.type === 'radio' ? this.buttonElement.bind('click.button', function () {
        if (h.disabled || f)
          return !1;
        a(this).addClass('ui-state-active'), b.buttonElement.attr('aria-pressed', 'true');
        var c = b.element[0];
        k(c).not(c).map(function () {
          return a(this).button('widget')[0];
        }).removeClass('ui-state-active').attr('aria-pressed', 'false');
      }) : (this.buttonElement.bind('mousedown.button', function () {
        if (h.disabled)
          return !1;
        a(this).addClass('ui-state-active'), c = this, a(document).one('mouseup', function () {
          c = null;
        });
      }).bind('mouseup.button', function () {
        if (h.disabled)
          return !1;
        a(this).removeClass('ui-state-active');
      }).bind('keydown.button', function (b) {
        if (h.disabled)
          return !1;
        (b.keyCode == a.ui.keyCode.SPACE || b.keyCode == a.ui.keyCode.ENTER) && a(this).addClass('ui-state-active');
      }).bind('keyup.button', function () {
        a(this).removeClass('ui-state-active');
      }), this.buttonElement.is('a') && this.buttonElement.keyup(function (b) {
        b.keyCode === a.ui.keyCode.SPACE && a(this).click();
      })), this._setOption('disabled', h.disabled), this._resetButton();
    },
    _determineButtonType: function () {
      this.element.is(':checkbox') ? this.type = 'checkbox' : this.element.is(':radio') ? this.type = 'radio' : this.element.is('input') ? this.type = 'input' : this.type = 'button';
      if (this.type === 'checkbox' || this.type === 'radio') {
        var a = this.element.parents().filter(':last'), b = 'label[for=\'' + this.element.attr('id') + '\']';
        this.buttonElement = a.find(b), this.buttonElement.length || (a = a.length ? a.siblings() : this.element.siblings(), this.buttonElement = a.filter(b), this.buttonElement.length || (this.buttonElement = a.find(b))), this.element.addClass('ui-helper-hidden-accessible');
        var c = this.element.is(':checked');
        c && this.buttonElement.addClass('ui-state-active'), this.buttonElement.attr('aria-pressed', c);
      } else
        this.buttonElement = this.element;
    },
    widget: function () {
      return this.buttonElement;
    },
    destroy: function () {
      this.element.removeClass('ui-helper-hidden-accessible'), this.buttonElement.removeClass(g + ' ' + h + ' ' + i).removeAttr('role').removeAttr('aria-pressed').html(this.buttonElement.find('.ui-button-text').html()), this.hasTitle || this.buttonElement.removeAttr('title'), a.Widget.prototype.destroy.call(this);
    },
    _setOption: function (b, c) {
      a.Widget.prototype._setOption.apply(this, arguments);
      if (b === 'disabled') {
        c ? this.element.propAttr('disabled', !0) : this.element.propAttr('disabled', !1);
        return;
      }
      this._resetButton();
    },
    refresh: function () {
      var b = this.element.is(':disabled');
      b !== this.options.disabled && this._setOption('disabled', b), this.type === 'radio' ? k(this.element[0]).each(function () {
        a(this).is(':checked') ? a(this).button('widget').addClass('ui-state-active').attr('aria-pressed', 'true') : a(this).button('widget').removeClass('ui-state-active').attr('aria-pressed', 'false');
      }) : this.type === 'checkbox' && (this.element.is(':checked') ? this.buttonElement.addClass('ui-state-active').attr('aria-pressed', 'true') : this.buttonElement.removeClass('ui-state-active').attr('aria-pressed', 'false'));
    },
    _resetButton: function () {
      if (this.type === 'input') {
        this.options.label && this.element.val(this.options.label);
        return;
      }
      var b = this.buttonElement.removeClass(i), c = a('<span></span>', this.element[0].ownerDocument).addClass('ui-button-text').html(this.options.label).appendTo(b.empty()).text(), d = this.options.icons, e = d.primary && d.secondary, f = [];
      d.primary || d.secondary ? (this.options.text && f.push('ui-button-text-icon' + (e ? 's' : d.primary ? '-primary' : '-secondary')), d.primary && b.prepend('<span class=\'ui-button-icon-primary ui-icon ' + d.primary + '\'></span>'), d.secondary && b.append('<span class=\'ui-button-icon-secondary ui-icon ' + d.secondary + '\'></span>'), this.options.text || (f.push(e ? 'ui-button-icons-only' : 'ui-button-icon-only'), this.hasTitle || b.attr('title', c))) : f.push('ui-button-text-only'), b.addClass(f.join(' '));
    }
  }), a.widget('ui.buttonset', {
    options: { items: ':button, :submit, :reset, :checkbox, :radio, a, :data(button)' },
    _create: function () {
      this.element.addClass('ui-buttonset');
    },
    _init: function () {
      this.refresh();
    },
    _setOption: function (b, c) {
      b === 'disabled' && this.buttons.button('option', b, c), a.Widget.prototype._setOption.apply(this, arguments);
    },
    refresh: function () {
      var b = this.element.css('direction') === 'rtl';
      this.buttons = this.element.find(this.options.items).filter(':ui-button').button('refresh').end().not(':ui-button').button().end().map(function () {
        return a(this).button('widget')[0];
      }).removeClass('ui-corner-all ui-corner-left ui-corner-right').filter(':first').addClass(b ? 'ui-corner-right' : 'ui-corner-left').end().filter(':last').addClass(b ? 'ui-corner-left' : 'ui-corner-right').end().end();
    },
    destroy: function () {
      this.element.removeClass('ui-buttonset'), this.buttons.map(function () {
        return a(this).button('widget')[0];
      }).removeClass('ui-corner-left ui-corner-right').end().button('destroy'), a.Widget.prototype.destroy.call(this);
    }
  });
}(jQuery), function ($, undefined) {
  function Datepicker() {
    this.debug = !1, this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = 'ui-datepicker-div', this._inlineClass = 'ui-datepicker-inline', this._appendClass = 'ui-datepicker-append', this._triggerClass = 'ui-datepicker-trigger', this._dialogClass = 'ui-datepicker-dialog', this._disableClass = 'ui-datepicker-disabled', this._unselectableClass = 'ui-datepicker-unselectable', this._currentClass = 'ui-datepicker-current-day', this._dayOverClass = 'ui-datepicker-days-cell-over', this.regional = [], this.regional[''] = {
      closeText: 'Done',
      prevText: 'Prev',
      nextText: 'Next',
      currentText: 'Today',
      monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      monthNamesShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      dayNames: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      dayNamesShort: [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
      ],
      dayNamesMin: [
        'Su',
        'Mo',
        'Tu',
        'We',
        'Th',
        'Fr',
        'Sa'
      ],
      weekHeader: 'Wk',
      dateFormat: 'mm/dd/yy',
      firstDay: 0,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ''
    }, this._defaults = {
      showOn: 'focus',
      showAnim: 'fadeIn',
      showOptions: {},
      defaultDate: null,
      appendText: '',
      buttonText: '...',
      buttonImage: '',
      buttonImageOnly: !1,
      hideIfNoPrevNext: !1,
      navigationAsDateFormat: !1,
      gotoCurrent: !1,
      changeMonth: !1,
      changeYear: !1,
      yearRange: 'c-10:c+10',
      showOtherMonths: !1,
      selectOtherMonths: !1,
      showWeek: !1,
      calculateWeek: this.iso8601Week,
      shortYearCutoff: '+10',
      minDate: null,
      maxDate: null,
      duration: 'fast',
      beforeShowDay: null,
      beforeShow: null,
      onSelect: null,
      onChangeMonthYear: null,
      onClose: null,
      numberOfMonths: 1,
      showCurrentAtPos: 0,
      stepMonths: 1,
      stepBigMonths: 12,
      altField: '',
      altFormat: '',
      constrainInput: !0,
      showButtonPanel: !1,
      autoSize: !1,
      disabled: !1
    }, $.extend(this._defaults, this.regional['']), this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'));
  }
  function bindHover(a) {
    var b = 'button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a';
    return a.bind('mouseout', function (a) {
      var c = $(a.target).closest(b);
      if (!c.length)
        return;
      c.removeClass('ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover');
    }).bind('mouseover', function (c) {
      var d = $(c.target).closest(b);
      if ($.datepicker._isDisabledDatepicker(instActive.inline ? a.parent()[0] : instActive.input[0]) || !d.length)
        return;
      d.parents('.ui-datepicker-calendar').find('a').removeClass('ui-state-hover'), d.addClass('ui-state-hover'), d.hasClass('ui-datepicker-prev') && d.addClass('ui-datepicker-prev-hover'), d.hasClass('ui-datepicker-next') && d.addClass('ui-datepicker-next-hover');
    });
  }
  function extendRemove(a, b) {
    $.extend(a, b);
    for (var c in b)
      if (b[c] == null || b[c] == undefined)
        a[c] = b[c];
    return a;
  }
  function isArray(a) {
    return a && ($.browser.safari && typeof a == 'object' && a.length || a.constructor && a.constructor.toString().match(/\Array\(\)/));
  }
  $.extend($.ui, { datepicker: { version: '1.8.23' } });
  var PROP_NAME = 'datepicker', dpuuid = new Date().getTime(), instActive;
  $.extend(Datepicker.prototype, {
    markerClassName: 'hasDatepicker',
    maxRows: 4,
    log: function () {
      this.debug && console.log.apply('', arguments);
    },
    _widgetDatepicker: function () {
      return this.dpDiv;
    },
    setDefaults: function (a) {
      return extendRemove(this._defaults, a || {}), this;
    },
    _attachDatepicker: function (target, settings) {
      var inlineSettings = null;
      for (var attrName in this._defaults) {
        var attrValue = target.getAttribute('date:' + attrName);
        if (attrValue) {
          inlineSettings = inlineSettings || {};
          try {
            inlineSettings[attrName] = eval(attrValue);
          } catch (err) {
            inlineSettings[attrName] = attrValue;
          }
        }
      }
      var nodeName = target.nodeName.toLowerCase(), inline = nodeName == 'div' || nodeName == 'span';
      target.id || (this.uuid += 1, target.id = 'dp' + this.uuid);
      var inst = this._newInst($(target), inline);
      inst.settings = $.extend({}, settings || {}, inlineSettings || {}), nodeName == 'input' ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst);
    },
    _newInst: function (a, b) {
      var c = a[0].id.replace(/([^A-Za-z0-9_-])/g, '\\\\$1');
      return {
        id: c,
        input: a,
        selectedDay: 0,
        selectedMonth: 0,
        selectedYear: 0,
        drawMonth: 0,
        drawYear: 0,
        inline: b,
        dpDiv: b ? bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')) : this.dpDiv
      };
    },
    _connectDatepicker: function (a, b) {
      var c = $(a);
      b.append = $([]), b.trigger = $([]);
      if (c.hasClass(this.markerClassName))
        return;
      this._attachments(c, b), c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind('setData.datepicker', function (a, c, d) {
        b.settings[c] = d;
      }).bind('getData.datepicker', function (a, c) {
        return this._get(b, c);
      }), this._autoSize(b), $.data(a, PROP_NAME, b), b.settings.disabled && this._disableDatepicker(a);
    },
    _attachments: function (a, b) {
      var c = this._get(b, 'appendText'), d = this._get(b, 'isRTL');
      b.append && b.append.remove(), c && (b.append = $('<span class="' + this._appendClass + '">' + c + '</span>'), a[d ? 'before' : 'after'](b.append)), a.unbind('focus', this._showDatepicker), b.trigger && b.trigger.remove();
      var e = this._get(b, 'showOn');
      (e == 'focus' || e == 'both') && a.focus(this._showDatepicker);
      if (e == 'button' || e == 'both') {
        var f = this._get(b, 'buttonText'), g = this._get(b, 'buttonImage');
        b.trigger = $(this._get(b, 'buttonImageOnly') ? $('<img/>').addClass(this._triggerClass).attr({
          src: g,
          alt: f,
          title: f
        }) : $('<button type="button"></button>').addClass(this._triggerClass).html(g == '' ? f : $('<img/>').attr({
          src: g,
          alt: f,
          title: f
        }))), a[d ? 'before' : 'after'](b.trigger), b.trigger.click(function () {
          return $.datepicker._datepickerShowing && $.datepicker._lastInput == a[0] ? $.datepicker._hideDatepicker() : $.datepicker._datepickerShowing && $.datepicker._lastInput != a[0] ? ($.datepicker._hideDatepicker(), $.datepicker._showDatepicker(a[0])) : $.datepicker._showDatepicker(a[0]), !1;
        });
      }
    },
    _autoSize: function (a) {
      if (this._get(a, 'autoSize') && !a.inline) {
        var b = new Date(2009, 11, 20), c = this._get(a, 'dateFormat');
        if (c.match(/[DM]/)) {
          var d = function (a) {
            var b = 0, c = 0;
            for (var d = 0; d < a.length; d++)
              a[d].length > b && (b = a[d].length, c = d);
            return c;
          };
          b.setMonth(d(this._get(a, c.match(/MM/) ? 'monthNames' : 'monthNamesShort'))), b.setDate(d(this._get(a, c.match(/DD/) ? 'dayNames' : 'dayNamesShort')) + 20 - b.getDay());
        }
        a.input.attr('size', this._formatDate(a, b).length);
      }
    },
    _inlineDatepicker: function (a, b) {
      var c = $(a);
      if (c.hasClass(this.markerClassName))
        return;
      c.addClass(this.markerClassName).append(b.dpDiv).bind('setData.datepicker', function (a, c, d) {
        b.settings[c] = d;
      }).bind('getData.datepicker', function (a, c) {
        return this._get(b, c);
      }), $.data(a, PROP_NAME, b), this._setDate(b, this._getDefaultDate(b), !0), this._updateDatepicker(b), this._updateAlternate(b), b.settings.disabled && this._disableDatepicker(a), b.dpDiv.css('display', 'block');
    },
    _dialogDatepicker: function (a, b, c, d, e) {
      var f = this._dialogInst;
      if (!f) {
        this.uuid += 1;
        var g = 'dp' + this.uuid;
        this._dialogInput = $('<input type="text" id="' + g + '" style="position: absolute; top: -100px; width: 0px;"/>'), this._dialogInput.keydown(this._doKeyDown), $('body').append(this._dialogInput), f = this._dialogInst = this._newInst(this._dialogInput, !1), f.settings = {}, $.data(this._dialogInput[0], PROP_NAME, f);
      }
      extendRemove(f.settings, d || {}), b = b && b.constructor == Date ? this._formatDate(f, b) : b, this._dialogInput.val(b), this._pos = e ? e.length ? e : [
        e.pageX,
        e.pageY
      ] : null;
      if (!this._pos) {
        var h = document.documentElement.clientWidth, i = document.documentElement.clientHeight, j = document.documentElement.scrollLeft || document.body.scrollLeft, k = document.documentElement.scrollTop || document.body.scrollTop;
        this._pos = [
          h / 2 - 100 + j,
          i / 2 - 150 + k
        ];
      }
      return this._dialogInput.css('left', this._pos[0] + 20 + 'px').css('top', this._pos[1] + 'px'), f.settings.onSelect = c, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), $.data(this._dialogInput[0], PROP_NAME, f), this;
    },
    _destroyDatepicker: function (a) {
      var b = $(a), c = $.data(a, PROP_NAME);
      if (!b.hasClass(this.markerClassName))
        return;
      var d = a.nodeName.toLowerCase();
      $.removeData(a, PROP_NAME), d == 'input' ? (c.append.remove(), c.trigger.remove(), b.removeClass(this.markerClassName).unbind('focus', this._showDatepicker).unbind('keydown', this._doKeyDown).unbind('keypress', this._doKeyPress).unbind('keyup', this._doKeyUp)) : (d == 'div' || d == 'span') && b.removeClass(this.markerClassName).empty();
    },
    _enableDatepicker: function (a) {
      var b = $(a), c = $.data(a, PROP_NAME);
      if (!b.hasClass(this.markerClassName))
        return;
      var d = a.nodeName.toLowerCase();
      if (d == 'input')
        a.disabled = !1, c.trigger.filter('button').each(function () {
          this.disabled = !1;
        }).end().filter('img').css({
          opacity: '1.0',
          cursor: ''
        });
      else if (d == 'div' || d == 'span') {
        var e = b.children('.' + this._inlineClass);
        e.children().removeClass('ui-state-disabled'), e.find('select.ui-datepicker-month, select.ui-datepicker-year').removeAttr('disabled');
      }
      this._disabledInputs = $.map(this._disabledInputs, function (b) {
        return b == a ? null : b;
      });
    },
    _disableDatepicker: function (a) {
      var b = $(a), c = $.data(a, PROP_NAME);
      if (!b.hasClass(this.markerClassName))
        return;
      var d = a.nodeName.toLowerCase();
      if (d == 'input')
        a.disabled = !0, c.trigger.filter('button').each(function () {
          this.disabled = !0;
        }).end().filter('img').css({
          opacity: '0.5',
          cursor: 'default'
        });
      else if (d == 'div' || d == 'span') {
        var e = b.children('.' + this._inlineClass);
        e.children().addClass('ui-state-disabled'), e.find('select.ui-datepicker-month, select.ui-datepicker-year').attr('disabled', 'disabled');
      }
      this._disabledInputs = $.map(this._disabledInputs, function (b) {
        return b == a ? null : b;
      }), this._disabledInputs[this._disabledInputs.length] = a;
    },
    _isDisabledDatepicker: function (a) {
      if (!a)
        return !1;
      for (var b = 0; b < this._disabledInputs.length; b++)
        if (this._disabledInputs[b] == a)
          return !0;
      return !1;
    },
    _getInst: function (a) {
      try {
        return $.data(a, PROP_NAME);
      } catch (b) {
        throw 'Missing instance data for this datepicker';
      }
    },
    _optionDatepicker: function (a, b, c) {
      var d = this._getInst(a);
      if (arguments.length == 2 && typeof b == 'string')
        return b == 'defaults' ? $.extend({}, $.datepicker._defaults) : d ? b == 'all' ? $.extend({}, d.settings) : this._get(d, b) : null;
      var e = b || {};
      typeof b == 'string' && (e = {}, e[b] = c);
      if (d) {
        this._curInst == d && this._hideDatepicker();
        var f = this._getDateDatepicker(a, !0), g = this._getMinMaxDate(d, 'min'), h = this._getMinMaxDate(d, 'max');
        extendRemove(d.settings, e), g !== null && e.dateFormat !== undefined && e.minDate === undefined && (d.settings.minDate = this._formatDate(d, g)), h !== null && e.dateFormat !== undefined && e.maxDate === undefined && (d.settings.maxDate = this._formatDate(d, h)), this._attachments($(a), d), this._autoSize(d), this._setDate(d, f), this._updateAlternate(d), this._updateDatepicker(d);
      }
    },
    _changeDatepicker: function (a, b, c) {
      this._optionDatepicker(a, b, c);
    },
    _refreshDatepicker: function (a) {
      var b = this._getInst(a);
      b && this._updateDatepicker(b);
    },
    _setDateDatepicker: function (a, b) {
      var c = this._getInst(a);
      c && (this._setDate(c, b), this._updateDatepicker(c), this._updateAlternate(c));
    },
    _getDateDatepicker: function (a, b) {
      var c = this._getInst(a);
      return c && !c.inline && this._setDateFromField(c, b), c ? this._getDate(c) : null;
    },
    _doKeyDown: function (a) {
      var b = $.datepicker._getInst(a.target), c = !0, d = b.dpDiv.is('.ui-datepicker-rtl');
      b._keyEvent = !0;
      if ($.datepicker._datepickerShowing)
        switch (a.keyCode) {
        case 9:
          $.datepicker._hideDatepicker(), c = !1;
          break;
        case 13:
          var e = $('td.' + $.datepicker._dayOverClass + ':not(.' + $.datepicker._currentClass + ')', b.dpDiv);
          e[0] && $.datepicker._selectDay(a.target, b.selectedMonth, b.selectedYear, e[0]);
          var f = $.datepicker._get(b, 'onSelect');
          if (f) {
            var g = $.datepicker._formatDate(b);
            f.apply(b.input ? b.input[0] : null, [
              g,
              b
            ]);
          } else
            $.datepicker._hideDatepicker();
          return !1;
        case 27:
          $.datepicker._hideDatepicker();
          break;
        case 33:
          $.datepicker._adjustDate(a.target, a.ctrlKey ? -$.datepicker._get(b, 'stepBigMonths') : -$.datepicker._get(b, 'stepMonths'), 'M');
          break;
        case 34:
          $.datepicker._adjustDate(a.target, a.ctrlKey ? +$.datepicker._get(b, 'stepBigMonths') : +$.datepicker._get(b, 'stepMonths'), 'M');
          break;
        case 35:
          (a.ctrlKey || a.metaKey) && $.datepicker._clearDate(a.target), c = a.ctrlKey || a.metaKey;
          break;
        case 36:
          (a.ctrlKey || a.metaKey) && $.datepicker._gotoToday(a.target), c = a.ctrlKey || a.metaKey;
          break;
        case 37:
          (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, d ? 1 : -1, 'D'), c = a.ctrlKey || a.metaKey, a.originalEvent.altKey && $.datepicker._adjustDate(a.target, a.ctrlKey ? -$.datepicker._get(b, 'stepBigMonths') : -$.datepicker._get(b, 'stepMonths'), 'M');
          break;
        case 38:
          (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, -7, 'D'), c = a.ctrlKey || a.metaKey;
          break;
        case 39:
          (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, d ? -1 : 1, 'D'), c = a.ctrlKey || a.metaKey, a.originalEvent.altKey && $.datepicker._adjustDate(a.target, a.ctrlKey ? +$.datepicker._get(b, 'stepBigMonths') : +$.datepicker._get(b, 'stepMonths'), 'M');
          break;
        case 40:
          (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, 7, 'D'), c = a.ctrlKey || a.metaKey;
          break;
        default:
          c = !1;
        }
      else
        a.keyCode == 36 && a.ctrlKey ? $.datepicker._showDatepicker(this) : c = !1;
      c && (a.preventDefault(), a.stopPropagation());
    },
    _doKeyPress: function (a) {
      var b = $.datepicker._getInst(a.target);
      if ($.datepicker._get(b, 'constrainInput')) {
        var c = $.datepicker._possibleChars($.datepicker._get(b, 'dateFormat')), d = String.fromCharCode(a.charCode == undefined ? a.keyCode : a.charCode);
        return a.ctrlKey || a.metaKey || d < ' ' || !c || c.indexOf(d) > -1;
      }
    },
    _doKeyUp: function (a) {
      var b = $.datepicker._getInst(a.target);
      if (b.input.val() != b.lastVal)
        try {
          var c = $.datepicker.parseDate($.datepicker._get(b, 'dateFormat'), b.input ? b.input.val() : null, $.datepicker._getFormatConfig(b));
          c && ($.datepicker._setDateFromField(b), $.datepicker._updateAlternate(b), $.datepicker._updateDatepicker(b));
        } catch (d) {
          $.datepicker.log(d);
        }
      return !0;
    },
    _showDatepicker: function (a) {
      a = a.target || a, a.nodeName.toLowerCase() != 'input' && (a = $('input', a.parentNode)[0]);
      if ($.datepicker._isDisabledDatepicker(a) || $.datepicker._lastInput == a)
        return;
      var b = $.datepicker._getInst(a);
      $.datepicker._curInst && $.datepicker._curInst != b && ($.datepicker._curInst.dpDiv.stop(!0, !0), b && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0]));
      var c = $.datepicker._get(b, 'beforeShow'), d = c ? c.apply(a, [
          a,
          b
        ]) : {};
      if (d === !1)
        return;
      extendRemove(b.settings, d), b.lastVal = null, $.datepicker._lastInput = a, $.datepicker._setDateFromField(b), $.datepicker._inDialog && (a.value = ''), $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(a), $.datepicker._pos[1] += a.offsetHeight);
      var e = !1;
      $(a).parents().each(function () {
        return e |= $(this).css('position') == 'fixed', !e;
      }), e && $.browser.opera && ($.datepicker._pos[0] -= document.documentElement.scrollLeft, $.datepicker._pos[1] -= document.documentElement.scrollTop);
      var f = {
          left: $.datepicker._pos[0],
          top: $.datepicker._pos[1]
        };
      $.datepicker._pos = null, b.dpDiv.empty(), b.dpDiv.css({
        position: 'absolute',
        display: 'block',
        top: '-1000px'
      }), $.datepicker._updateDatepicker(b), f = $.datepicker._checkOffset(b, f, e), b.dpDiv.css({
        position: $.datepicker._inDialog && $.blockUI ? 'static' : e ? 'fixed' : 'absolute',
        display: 'none',
        left: f.left + 'px',
        top: f.top + 'px'
      });
      if (!b.inline) {
        var g = $.datepicker._get(b, 'showAnim'), h = $.datepicker._get(b, 'duration'), i = function () {
            var a = b.dpDiv.find('iframe.ui-datepicker-cover');
            if (!!a.length) {
              var c = $.datepicker._getBorders(b.dpDiv);
              a.css({
                left: -c[0],
                top: -c[1],
                width: b.dpDiv.outerWidth(),
                height: b.dpDiv.outerHeight()
              });
            }
          };
        b.dpDiv.zIndex($(a).zIndex() + 1), $.datepicker._datepickerShowing = !0, $.effects && $.effects[g] ? b.dpDiv.show(g, $.datepicker._get(b, 'showOptions'), h, i) : b.dpDiv[g || 'show'](g ? h : null, i), (!g || !h) && i(), b.input.is(':visible') && !b.input.is(':disabled') && b.input.focus(), $.datepicker._curInst = b;
      }
    },
    _updateDatepicker: function (a) {
      var b = this;
      b.maxRows = 4;
      var c = $.datepicker._getBorders(a.dpDiv);
      instActive = a, a.dpDiv.empty().append(this._generateHTML(a)), this._attachHandlers(a);
      var d = a.dpDiv.find('iframe.ui-datepicker-cover');
      !d.length || d.css({
        left: -c[0],
        top: -c[1],
        width: a.dpDiv.outerWidth(),
        height: a.dpDiv.outerHeight()
      }), a.dpDiv.find('.' + this._dayOverClass + ' a').mouseover();
      var e = this._getNumberOfMonths(a), f = e[1], g = 17;
      a.dpDiv.removeClass('ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4').width(''), f > 1 && a.dpDiv.addClass('ui-datepicker-multi-' + f).css('width', g * f + 'em'), a.dpDiv[(e[0] != 1 || e[1] != 1 ? 'add' : 'remove') + 'Class']('ui-datepicker-multi'), a.dpDiv[(this._get(a, 'isRTL') ? 'add' : 'remove') + 'Class']('ui-datepicker-rtl'), a == $.datepicker._curInst && $.datepicker._datepickerShowing && a.input && a.input.is(':visible') && !a.input.is(':disabled') && a.input[0] != document.activeElement && a.input.focus();
      if (a.yearshtml) {
        var h = a.yearshtml;
        setTimeout(function () {
          h === a.yearshtml && a.yearshtml && a.dpDiv.find('select.ui-datepicker-year:first').replaceWith(a.yearshtml), h = a.yearshtml = null;
        }, 0);
      }
    },
    _getBorders: function (a) {
      var b = function (a) {
        return {
          thin: 1,
          medium: 2,
          thick: 3
        }[a] || a;
      };
      return [
        parseFloat(b(a.css('border-left-width'))),
        parseFloat(b(a.css('border-top-width')))
      ];
    },
    _checkOffset: function (a, b, c) {
      var d = a.dpDiv.outerWidth(), e = a.dpDiv.outerHeight(), f = a.input ? a.input.outerWidth() : 0, g = a.input ? a.input.outerHeight() : 0, h = document.documentElement.clientWidth + (c ? 0 : $(document).scrollLeft()), i = document.documentElement.clientHeight + (c ? 0 : $(document).scrollTop());
      return b.left -= this._get(a, 'isRTL') ? d - f : 0, b.left -= c && b.left == a.input.offset().left ? $(document).scrollLeft() : 0, b.top -= c && b.top == a.input.offset().top + g ? $(document).scrollTop() : 0, b.left -= Math.min(b.left, b.left + d > h && h > d ? Math.abs(b.left + d - h) : 0), b.top -= Math.min(b.top, b.top + e > i && i > e ? Math.abs(e + g) : 0), b;
    },
    _findPos: function (a) {
      var b = this._getInst(a), c = this._get(b, 'isRTL');
      while (a && (a.type == 'hidden' || a.nodeType != 1 || $.expr.filters.hidden(a)))
        a = a[c ? 'previousSibling' : 'nextSibling'];
      var d = $(a).offset();
      return [
        d.left,
        d.top
      ];
    },
    _hideDatepicker: function (a) {
      var b = this._curInst;
      if (!b || a && b != $.data(a, PROP_NAME))
        return;
      if (this._datepickerShowing) {
        var c = this._get(b, 'showAnim'), d = this._get(b, 'duration'), e = function () {
            $.datepicker._tidyDialog(b);
          };
        $.effects && $.effects[c] ? b.dpDiv.hide(c, $.datepicker._get(b, 'showOptions'), d, e) : b.dpDiv[c == 'slideDown' ? 'slideUp' : c == 'fadeIn' ? 'fadeOut' : 'hide'](c ? d : null, e), c || e(), this._datepickerShowing = !1;
        var f = this._get(b, 'onClose');
        f && f.apply(b.input ? b.input[0] : null, [
          b.input ? b.input.val() : '',
          b
        ]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
          position: 'absolute',
          left: '0',
          top: '-100px'
        }), $.blockUI && ($.unblockUI(), $('body').append(this.dpDiv))), this._inDialog = !1;
      }
    },
    _tidyDialog: function (a) {
      a.dpDiv.removeClass(this._dialogClass).unbind('.ui-datepicker-calendar');
    },
    _checkExternalClick: function (a) {
      if (!$.datepicker._curInst)
        return;
      var b = $(a.target), c = $.datepicker._getInst(b[0]);
      (b[0].id != $.datepicker._mainDivId && b.parents('#' + $.datepicker._mainDivId).length == 0 && !b.hasClass($.datepicker.markerClassName) && !b.closest('.' + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && (!$.datepicker._inDialog || !$.blockUI) || b.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != c) && $.datepicker._hideDatepicker();
    },
    _adjustDate: function (a, b, c) {
      var d = $(a), e = this._getInst(d[0]);
      if (this._isDisabledDatepicker(d[0]))
        return;
      this._adjustInstDate(e, b + (c == 'M' ? this._get(e, 'showCurrentAtPos') : 0), c), this._updateDatepicker(e);
    },
    _gotoToday: function (a) {
      var b = $(a), c = this._getInst(b[0]);
      if (this._get(c, 'gotoCurrent') && c.currentDay)
        c.selectedDay = c.currentDay, c.drawMonth = c.selectedMonth = c.currentMonth, c.drawYear = c.selectedYear = c.currentYear;
      else {
        var d = new Date();
        c.selectedDay = d.getDate(), c.drawMonth = c.selectedMonth = d.getMonth(), c.drawYear = c.selectedYear = d.getFullYear();
      }
      this._notifyChange(c), this._adjustDate(b);
    },
    _selectMonthYear: function (a, b, c) {
      var d = $(a), e = this._getInst(d[0]);
      e['selected' + (c == 'M' ? 'Month' : 'Year')] = e['draw' + (c == 'M' ? 'Month' : 'Year')] = parseInt(b.options[b.selectedIndex].value, 10), this._notifyChange(e), this._adjustDate(d);
    },
    _selectDay: function (a, b, c, d) {
      var e = $(a);
      if ($(d).hasClass(this._unselectableClass) || this._isDisabledDatepicker(e[0]))
        return;
      var f = this._getInst(e[0]);
      f.selectedDay = f.currentDay = $('a', d).html(), f.selectedMonth = f.currentMonth = b, f.selectedYear = f.currentYear = c, this._selectDate(a, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear));
    },
    _clearDate: function (a) {
      var b = $(a), c = this._getInst(b[0]);
      this._selectDate(b, '');
    },
    _selectDate: function (a, b) {
      var c = $(a), d = this._getInst(c[0]);
      b = b != null ? b : this._formatDate(d), d.input && d.input.val(b), this._updateAlternate(d);
      var e = this._get(d, 'onSelect');
      e ? e.apply(d.input ? d.input[0] : null, [
        b,
        d
      ]) : d.input && d.input.trigger('change'), d.inline ? this._updateDatepicker(d) : (this._hideDatepicker(), this._lastInput = d.input[0], typeof d.input[0] != 'object' && d.input.focus(), this._lastInput = null);
    },
    _updateAlternate: function (a) {
      var b = this._get(a, 'altField');
      if (b) {
        var c = this._get(a, 'altFormat') || this._get(a, 'dateFormat'), d = this._getDate(a), e = this.formatDate(c, d, this._getFormatConfig(a));
        $(b).each(function () {
          $(this).val(e);
        });
      }
    },
    noWeekends: function (a) {
      var b = a.getDay();
      return [
        b > 0 && b < 6,
        ''
      ];
    },
    iso8601Week: function (a) {
      var b = new Date(a.getTime());
      b.setDate(b.getDate() + 4 - (b.getDay() || 7));
      var c = b.getTime();
      return b.setMonth(0), b.setDate(1), Math.floor(Math.round((c - b) / 86400000) / 7) + 1;
    },
    parseDate: function (a, b, c) {
      if (a == null || b == null)
        throw 'Invalid arguments';
      b = typeof b == 'object' ? b.toString() : b + '';
      if (b == '')
        return null;
      var d = (c ? c.shortYearCutoff : null) || this._defaults.shortYearCutoff;
      d = typeof d != 'string' ? d : new Date().getFullYear() % 100 + parseInt(d, 10);
      var e = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort, f = (c ? c.dayNames : null) || this._defaults.dayNames, g = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort, h = (c ? c.monthNames : null) || this._defaults.monthNames, i = -1, j = -1, k = -1, l = -1, m = !1, n = function (b) {
          var c = s + 1 < a.length && a.charAt(s + 1) == b;
          return c && s++, c;
        }, o = function (a) {
          var c = n(a), d = a == '@' ? 14 : a == '!' ? 20 : a == 'y' && c ? 4 : a == 'o' ? 3 : 2, e = new RegExp('^\\d{1,' + d + '}'), f = b.substring(r).match(e);
          if (!f)
            throw 'Missing number at position ' + r;
          return r += f[0].length, parseInt(f[0], 10);
        }, p = function (a, c, d) {
          var e = $.map(n(a) ? d : c, function (a, b) {
              return [[
                  b,
                  a
                ]];
            }).sort(function (a, b) {
              return -(a[1].length - b[1].length);
            }), f = -1;
          $.each(e, function (a, c) {
            var d = c[1];
            if (b.substr(r, d.length).toLowerCase() == d.toLowerCase())
              return f = c[0], r += d.length, !1;
          });
          if (f != -1)
            return f + 1;
          throw 'Unknown name at position ' + r;
        }, q = function () {
          if (b.charAt(r) != a.charAt(s))
            throw 'Unexpected literal at position ' + r;
          r++;
        }, r = 0;
      for (var s = 0; s < a.length; s++)
        if (m)
          a.charAt(s) == '\'' && !n('\'') ? m = !1 : q();
        else
          switch (a.charAt(s)) {
          case 'd':
            k = o('d');
            break;
          case 'D':
            p('D', e, f);
            break;
          case 'o':
            l = o('o');
            break;
          case 'm':
            j = o('m');
            break;
          case 'M':
            j = p('M', g, h);
            break;
          case 'y':
            i = o('y');
            break;
          case '@':
            var t = new Date(o('@'));
            i = t.getFullYear(), j = t.getMonth() + 1, k = t.getDate();
            break;
          case '!':
            var t = new Date((o('!') - this._ticksTo1970) / 10000);
            i = t.getFullYear(), j = t.getMonth() + 1, k = t.getDate();
            break;
          case '\'':
            n('\'') ? q() : m = !0;
            break;
          default:
            q();
          }
      if (r < b.length)
        throw 'Extra/unparsed characters found in date: ' + b.substring(r);
      i == -1 ? i = new Date().getFullYear() : i < 100 && (i += new Date().getFullYear() - new Date().getFullYear() % 100 + (i <= d ? 0 : -100));
      if (l > -1) {
        j = 1, k = l;
        do {
          var u = this._getDaysInMonth(i, j - 1);
          if (k <= u)
            break;
          j++, k -= u;
        } while (!0);
      }
      var t = this._daylightSavingAdjust(new Date(i, j - 1, k));
      if (t.getFullYear() != i || t.getMonth() + 1 != j || t.getDate() != k)
        throw 'Invalid date';
      return t;
    },
    ATOM: 'yy-mm-dd',
    COOKIE: 'D, dd M yy',
    ISO_8601: 'yy-mm-dd',
    RFC_822: 'D, d M y',
    RFC_850: 'DD, dd-M-y',
    RFC_1036: 'D, d M y',
    RFC_1123: 'D, d M yy',
    RFC_2822: 'D, d M yy',
    RSS: 'D, d M y',
    TICKS: '!',
    TIMESTAMP: '@',
    W3C: 'yy-mm-dd',
    _ticksTo1970: (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 10000000,
    formatDate: function (a, b, c) {
      if (!b)
        return '';
      var d = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort, e = (c ? c.dayNames : null) || this._defaults.dayNames, f = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort, g = (c ? c.monthNames : null) || this._defaults.monthNames, h = function (b) {
          var c = m + 1 < a.length && a.charAt(m + 1) == b;
          return c && m++, c;
        }, i = function (a, b, c) {
          var d = '' + b;
          if (h(a))
            while (d.length < c)
              d = '0' + d;
          return d;
        }, j = function (a, b, c, d) {
          return h(a) ? d[b] : c[b];
        }, k = '', l = !1;
      if (b)
        for (var m = 0; m < a.length; m++)
          if (l)
            a.charAt(m) == '\'' && !h('\'') ? l = !1 : k += a.charAt(m);
          else
            switch (a.charAt(m)) {
            case 'd':
              k += i('d', b.getDate(), 2);
              break;
            case 'D':
              k += j('D', b.getDay(), d, e);
              break;
            case 'o':
              k += i('o', Math.round((new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime() - new Date(b.getFullYear(), 0, 0).getTime()) / 86400000), 3);
              break;
            case 'm':
              k += i('m', b.getMonth() + 1, 2);
              break;
            case 'M':
              k += j('M', b.getMonth(), f, g);
              break;
            case 'y':
              k += h('y') ? b.getFullYear() : (b.getYear() % 100 < 10 ? '0' : '') + b.getYear() % 100;
              break;
            case '@':
              k += b.getTime();
              break;
            case '!':
              k += b.getTime() * 10000 + this._ticksTo1970;
              break;
            case '\'':
              h('\'') ? k += '\'' : l = !0;
              break;
            default:
              k += a.charAt(m);
            }
      return k;
    },
    _possibleChars: function (a) {
      var b = '', c = !1, d = function (b) {
          var c = e + 1 < a.length && a.charAt(e + 1) == b;
          return c && e++, c;
        };
      for (var e = 0; e < a.length; e++)
        if (c)
          a.charAt(e) == '\'' && !d('\'') ? c = !1 : b += a.charAt(e);
        else
          switch (a.charAt(e)) {
          case 'd':
          case 'm':
          case 'y':
          case '@':
            b += '0123456789';
            break;
          case 'D':
          case 'M':
            return null;
          case '\'':
            d('\'') ? b += '\'' : c = !0;
            break;
          default:
            b += a.charAt(e);
          }
      return b;
    },
    _get: function (a, b) {
      return a.settings[b] !== undefined ? a.settings[b] : this._defaults[b];
    },
    _setDateFromField: function (a, b) {
      if (a.input.val() == a.lastVal)
        return;
      var c = this._get(a, 'dateFormat'), d = a.lastVal = a.input ? a.input.val() : null, e, f;
      e = f = this._getDefaultDate(a);
      var g = this._getFormatConfig(a);
      try {
        e = this.parseDate(c, d, g) || f;
      } catch (h) {
        this.log(h), d = b ? '' : d;
      }
      a.selectedDay = e.getDate(), a.drawMonth = a.selectedMonth = e.getMonth(), a.drawYear = a.selectedYear = e.getFullYear(), a.currentDay = d ? e.getDate() : 0, a.currentMonth = d ? e.getMonth() : 0, a.currentYear = d ? e.getFullYear() : 0, this._adjustInstDate(a);
    },
    _getDefaultDate: function (a) {
      return this._restrictMinMax(a, this._determineDate(a, this._get(a, 'defaultDate'), new Date()));
    },
    _determineDate: function (a, b, c) {
      var d = function (a) {
          var b = new Date();
          return b.setDate(b.getDate() + a), b;
        }, e = function (b) {
          try {
            return $.datepicker.parseDate($.datepicker._get(a, 'dateFormat'), b, $.datepicker._getFormatConfig(a));
          } catch (c) {
          }
          var d = (b.toLowerCase().match(/^c/) ? $.datepicker._getDate(a) : null) || new Date(), e = d.getFullYear(), f = d.getMonth(), g = d.getDate(), h = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, i = h.exec(b);
          while (i) {
            switch (i[2] || 'd') {
            case 'd':
            case 'D':
              g += parseInt(i[1], 10);
              break;
            case 'w':
            case 'W':
              g += parseInt(i[1], 10) * 7;
              break;
            case 'm':
            case 'M':
              f += parseInt(i[1], 10), g = Math.min(g, $.datepicker._getDaysInMonth(e, f));
              break;
            case 'y':
            case 'Y':
              e += parseInt(i[1], 10), g = Math.min(g, $.datepicker._getDaysInMonth(e, f));
            }
            i = h.exec(b);
          }
          return new Date(e, f, g);
        }, f = b == null || b === '' ? c : typeof b == 'string' ? e(b) : typeof b == 'number' ? isNaN(b) ? c : d(b) : new Date(b.getTime());
      return f = f && f.toString() == 'Invalid Date' ? c : f, f && (f.setHours(0), f.setMinutes(0), f.setSeconds(0), f.setMilliseconds(0)), this._daylightSavingAdjust(f);
    },
    _daylightSavingAdjust: function (a) {
      return a ? (a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0), a) : null;
    },
    _setDate: function (a, b, c) {
      var d = !b, e = a.selectedMonth, f = a.selectedYear, g = this._restrictMinMax(a, this._determineDate(a, b, new Date()));
      a.selectedDay = a.currentDay = g.getDate(), a.drawMonth = a.selectedMonth = a.currentMonth = g.getMonth(), a.drawYear = a.selectedYear = a.currentYear = g.getFullYear(), (e != a.selectedMonth || f != a.selectedYear) && !c && this._notifyChange(a), this._adjustInstDate(a), a.input && a.input.val(d ? '' : this._formatDate(a));
    },
    _getDate: function (a) {
      var b = !a.currentYear || a.input && a.input.val() == '' ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
      return b;
    },
    _attachHandlers: function (a) {
      var b = this._get(a, 'stepMonths'), c = '#' + a.id.replace(/\\\\/g, '\\');
      a.dpDiv.find('[data-handler]').map(function () {
        var a = {
            prev: function () {
              window['DP_jQuery_' + dpuuid].datepicker._adjustDate(c, -b, 'M');
            },
            next: function () {
              window['DP_jQuery_' + dpuuid].datepicker._adjustDate(c, +b, 'M');
            },
            hide: function () {
              window['DP_jQuery_' + dpuuid].datepicker._hideDatepicker();
            },
            today: function () {
              window['DP_jQuery_' + dpuuid].datepicker._gotoToday(c);
            },
            selectDay: function () {
              return window['DP_jQuery_' + dpuuid].datepicker._selectDay(c, +this.getAttribute('data-month'), +this.getAttribute('data-year'), this), !1;
            },
            selectMonth: function () {
              return window['DP_jQuery_' + dpuuid].datepicker._selectMonthYear(c, this, 'M'), !1;
            },
            selectYear: function () {
              return window['DP_jQuery_' + dpuuid].datepicker._selectMonthYear(c, this, 'Y'), !1;
            }
          };
        $(this).bind(this.getAttribute('data-event'), a[this.getAttribute('data-handler')]);
      });
    },
    _generateHTML: function (a) {
      var b = new Date();
      b = this._daylightSavingAdjust(new Date(b.getFullYear(), b.getMonth(), b.getDate()));
      var c = this._get(a, 'isRTL'), d = this._get(a, 'showButtonPanel'), e = this._get(a, 'hideIfNoPrevNext'), f = this._get(a, 'navigationAsDateFormat'), g = this._getNumberOfMonths(a), h = this._get(a, 'showCurrentAtPos'), i = this._get(a, 'stepMonths'), j = g[0] != 1 || g[1] != 1, k = this._daylightSavingAdjust(a.currentDay ? new Date(a.currentYear, a.currentMonth, a.currentDay) : new Date(9999, 9, 9)), l = this._getMinMaxDate(a, 'min'), m = this._getMinMaxDate(a, 'max'), n = a.drawMonth - h, o = a.drawYear;
      n < 0 && (n += 12, o--);
      if (m) {
        var p = this._daylightSavingAdjust(new Date(m.getFullYear(), m.getMonth() - g[0] * g[1] + 1, m.getDate()));
        p = l && p < l ? l : p;
        while (this._daylightSavingAdjust(new Date(o, n, 1)) > p)
          n--, n < 0 && (n = 11, o--);
      }
      a.drawMonth = n, a.drawYear = o;
      var q = this._get(a, 'prevText');
      q = f ? this.formatDate(q, this._daylightSavingAdjust(new Date(o, n - i, 1)), this._getFormatConfig(a)) : q;
      var r = this._canAdjustMonth(a, -1, o, n) ? '<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="' + q + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? 'e' : 'w') + '">' + q + '</span></a>' : e ? '' : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + q + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? 'e' : 'w') + '">' + q + '</span></a>', s = this._get(a, 'nextText');
      s = f ? this.formatDate(s, this._daylightSavingAdjust(new Date(o, n + i, 1)), this._getFormatConfig(a)) : s;
      var t = this._canAdjustMonth(a, 1, o, n) ? '<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="' + s + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? 'w' : 'e') + '">' + s + '</span></a>' : e ? '' : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + s + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? 'w' : 'e') + '">' + s + '</span></a>', u = this._get(a, 'currentText'), v = this._get(a, 'gotoCurrent') && a.currentDay ? k : b;
      u = f ? this.formatDate(u, v, this._getFormatConfig(a)) : u;
      var w = a.inline ? '' : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' + this._get(a, 'closeText') + '</button>', x = d ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (c ? w : '') + (this._isInRange(a, v) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">' + u + '</button>' : '') + (c ? '' : w) + '</div>' : '', y = parseInt(this._get(a, 'firstDay'), 10);
      y = isNaN(y) ? 0 : y;
      var z = this._get(a, 'showWeek'), A = this._get(a, 'dayNames'), B = this._get(a, 'dayNamesShort'), C = this._get(a, 'dayNamesMin'), D = this._get(a, 'monthNames'), E = this._get(a, 'monthNamesShort'), F = this._get(a, 'beforeShowDay'), G = this._get(a, 'showOtherMonths'), H = this._get(a, 'selectOtherMonths'), I = this._get(a, 'calculateWeek') || this.iso8601Week, J = this._getDefaultDate(a), K = '';
      for (var L = 0; L < g[0]; L++) {
        var M = '';
        this.maxRows = 4;
        for (var N = 0; N < g[1]; N++) {
          var O = this._daylightSavingAdjust(new Date(o, n, a.selectedDay)), P = ' ui-corner-all', Q = '';
          if (j) {
            Q += '<div class="ui-datepicker-group';
            if (g[1] > 1)
              switch (N) {
              case 0:
                Q += ' ui-datepicker-group-first', P = ' ui-corner-' + (c ? 'right' : 'left');
                break;
              case g[1] - 1:
                Q += ' ui-datepicker-group-last', P = ' ui-corner-' + (c ? 'left' : 'right');
                break;
              default:
                Q += ' ui-datepicker-group-middle', P = '';
              }
            Q += '">';
          }
          Q += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + P + '">' + (/all|left/.test(P) && L == 0 ? c ? t : r : '') + (/all|right/.test(P) && L == 0 ? c ? r : t : '') + this._generateMonthYearHeader(a, n, o, l, m, L > 0 || N > 0, D, E) + '</div><table class="ui-datepicker-calendar"><thead>' + '<tr>';
          var R = z ? '<th class="ui-datepicker-week-col">' + this._get(a, 'weekHeader') + '</th>' : '';
          for (var S = 0; S < 7; S++) {
            var T = (S + y) % 7;
            R += '<th' + ((S + y + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : '') + '>' + '<span title="' + A[T] + '">' + C[T] + '</span></th>';
          }
          Q += R + '</tr></thead><tbody>';
          var U = this._getDaysInMonth(o, n);
          o == a.selectedYear && n == a.selectedMonth && (a.selectedDay = Math.min(a.selectedDay, U));
          var V = (this._getFirstDayOfMonth(o, n) - y + 7) % 7, W = Math.ceil((V + U) / 7), X = j ? this.maxRows > W ? this.maxRows : W : W;
          this.maxRows = X;
          var Y = this._daylightSavingAdjust(new Date(o, n, 1 - V));
          for (var Z = 0; Z < X; Z++) {
            Q += '<tr>';
            var _ = z ? '<td class="ui-datepicker-week-col">' + this._get(a, 'calculateWeek')(Y) + '</td>' : '';
            for (var S = 0; S < 7; S++) {
              var ba = F ? F.apply(a.input ? a.input[0] : null, [Y]) : [
                  !0,
                  ''
                ], bb = Y.getMonth() != n, bc = bb && !H || !ba[0] || l && Y < l || m && Y > m;
              _ += '<td class="' + ((S + y + 6) % 7 >= 5 ? ' ui-datepicker-week-end' : '') + (bb ? ' ui-datepicker-other-month' : '') + (Y.getTime() == O.getTime() && n == a.selectedMonth && a._keyEvent || J.getTime() == Y.getTime() && J.getTime() == O.getTime() ? ' ' + this._dayOverClass : '') + (bc ? ' ' + this._unselectableClass + ' ui-state-disabled' : '') + (bb && !G ? '' : ' ' + ba[1] + (Y.getTime() == k.getTime() ? ' ' + this._currentClass : '') + (Y.getTime() == b.getTime() ? ' ui-datepicker-today' : '')) + '"' + ((!bb || G) && ba[2] ? ' title="' + ba[2] + '"' : '') + (bc ? '' : ' data-handler="selectDay" data-event="click" data-month="' + Y.getMonth() + '" data-year="' + Y.getFullYear() + '"') + '>' + (bb && !G ? '&#xa0;' : bc ? '<span class="ui-state-default">' + Y.getDate() + '</span>' : '<a class="ui-state-default' + (Y.getTime() == b.getTime() ? ' ui-state-highlight' : '') + (Y.getTime() == k.getTime() ? ' ui-state-active' : '') + (bb ? ' ui-priority-secondary' : '') + '" href="#">' + Y.getDate() + '</a>') + '</td>', Y.setDate(Y.getDate() + 1), Y = this._daylightSavingAdjust(Y);
            }
            Q += _ + '</tr>';
          }
          n++, n > 11 && (n = 0, o++), Q += '</tbody></table>' + (j ? '</div>' + (g[0] > 0 && N == g[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : '') : ''), M += Q;
        }
        K += M;
      }
      return K += x + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !a.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : ''), a._keyEvent = !1, K;
    },
    _generateMonthYearHeader: function (a, b, c, d, e, f, g, h) {
      var i = this._get(a, 'changeMonth'), j = this._get(a, 'changeYear'), k = this._get(a, 'showMonthAfterYear'), l = '<div class="ui-datepicker-title">', m = '';
      if (f || !i)
        m += '<span class="ui-datepicker-month">' + g[b] + '</span>';
      else {
        var n = d && d.getFullYear() == c, o = e && e.getFullYear() == c;
        m += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
        for (var p = 0; p < 12; p++)
          (!n || p >= d.getMonth()) && (!o || p <= e.getMonth()) && (m += '<option value="' + p + '"' + (p == b ? ' selected="selected"' : '') + '>' + h[p] + '</option>');
        m += '</select>';
      }
      k || (l += m + (f || !i || !j ? '&#xa0;' : ''));
      if (!a.yearshtml) {
        a.yearshtml = '';
        if (f || !j)
          l += '<span class="ui-datepicker-year">' + c + '</span>';
        else {
          var q = this._get(a, 'yearRange').split(':'), r = new Date().getFullYear(), s = function (a) {
              var b = a.match(/c[+-].*/) ? c + parseInt(a.substring(1), 10) : a.match(/[+-].*/) ? r + parseInt(a, 10) : parseInt(a, 10);
              return isNaN(b) ? r : b;
            }, t = s(q[0]), u = Math.max(t, s(q[1] || ''));
          t = d ? Math.max(t, d.getFullYear()) : t, u = e ? Math.min(u, e.getFullYear()) : u, a.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">';
          for (; t <= u; t++)
            a.yearshtml += '<option value="' + t + '"' + (t == c ? ' selected="selected"' : '') + '>' + t + '</option>';
          a.yearshtml += '</select>', l += a.yearshtml, a.yearshtml = null;
        }
      }
      return l += this._get(a, 'yearSuffix'), k && (l += (f || !i || !j ? '&#xa0;' : '') + m), l += '</div>', l;
    },
    _adjustInstDate: function (a, b, c) {
      var d = a.drawYear + (c == 'Y' ? b : 0), e = a.drawMonth + (c == 'M' ? b : 0), f = Math.min(a.selectedDay, this._getDaysInMonth(d, e)) + (c == 'D' ? b : 0), g = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(d, e, f)));
      a.selectedDay = g.getDate(), a.drawMonth = a.selectedMonth = g.getMonth(), a.drawYear = a.selectedYear = g.getFullYear(), (c == 'M' || c == 'Y') && this._notifyChange(a);
    },
    _restrictMinMax: function (a, b) {
      var c = this._getMinMaxDate(a, 'min'), d = this._getMinMaxDate(a, 'max'), e = c && b < c ? c : b;
      return e = d && e > d ? d : e, e;
    },
    _notifyChange: function (a) {
      var b = this._get(a, 'onChangeMonthYear');
      b && b.apply(a.input ? a.input[0] : null, [
        a.selectedYear,
        a.selectedMonth + 1,
        a
      ]);
    },
    _getNumberOfMonths: function (a) {
      var b = this._get(a, 'numberOfMonths');
      return b == null ? [
        1,
        1
      ] : typeof b == 'number' ? [
        1,
        b
      ] : b;
    },
    _getMinMaxDate: function (a, b) {
      return this._determineDate(a, this._get(a, b + 'Date'), null);
    },
    _getDaysInMonth: function (a, b) {
      return 32 - this._daylightSavingAdjust(new Date(a, b, 32)).getDate();
    },
    _getFirstDayOfMonth: function (a, b) {
      return new Date(a, b, 1).getDay();
    },
    _canAdjustMonth: function (a, b, c, d) {
      var e = this._getNumberOfMonths(a), f = this._daylightSavingAdjust(new Date(c, d + (b < 0 ? b : e[0] * e[1]), 1));
      return b < 0 && f.setDate(this._getDaysInMonth(f.getFullYear(), f.getMonth())), this._isInRange(a, f);
    },
    _isInRange: function (a, b) {
      var c = this._getMinMaxDate(a, 'min'), d = this._getMinMaxDate(a, 'max');
      return (!c || b.getTime() >= c.getTime()) && (!d || b.getTime() <= d.getTime());
    },
    _getFormatConfig: function (a) {
      var b = this._get(a, 'shortYearCutoff');
      return b = typeof b != 'string' ? b : new Date().getFullYear() % 100 + parseInt(b, 10), {
        shortYearCutoff: b,
        dayNamesShort: this._get(a, 'dayNamesShort'),
        dayNames: this._get(a, 'dayNames'),
        monthNamesShort: this._get(a, 'monthNamesShort'),
        monthNames: this._get(a, 'monthNames')
      };
    },
    _formatDate: function (a, b, c, d) {
      b || (a.currentDay = a.selectedDay, a.currentMonth = a.selectedMonth, a.currentYear = a.selectedYear);
      var e = b ? typeof b == 'object' ? b : this._daylightSavingAdjust(new Date(d, c, b)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
      return this.formatDate(this._get(a, 'dateFormat'), e, this._getFormatConfig(a));
    }
  }), $.fn.datepicker = function (a) {
    if (!this.length)
      return this;
    $.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick).find('body').append($.datepicker.dpDiv), $.datepicker.initialized = !0);
    var b = Array.prototype.slice.call(arguments, 1);
    return typeof a != 'string' || a != 'isDisabled' && a != 'getDate' && a != 'widget' ? a == 'option' && arguments.length == 2 && typeof arguments[1] == 'string' ? $.datepicker['_' + a + 'Datepicker'].apply($.datepicker, [this[0]].concat(b)) : this.each(function () {
      typeof a == 'string' ? $.datepicker['_' + a + 'Datepicker'].apply($.datepicker, [this].concat(b)) : $.datepicker._attachDatepicker(this, a);
    }) : $.datepicker['_' + a + 'Datepicker'].apply($.datepicker, [this[0]].concat(b));
  }, $.datepicker = new Datepicker(), $.datepicker.initialized = !1, $.datepicker.uuid = new Date().getTime(), $.datepicker.version = '1.8.23', window['DP_jQuery_' + dpuuid] = $;
}(jQuery), function (a, b) {
  var c = 'ui-dialog ui-widget ui-widget-content ui-corner-all ', d = {
      buttons: !0,
      height: !0,
      maxHeight: !0,
      maxWidth: !0,
      minHeight: !0,
      minWidth: !0,
      width: !0
    }, e = {
      maxHeight: !0,
      maxWidth: !0,
      minHeight: !0,
      minWidth: !0
    };
  a.widget('ui.dialog', {
    options: {
      autoOpen: !0,
      buttons: {},
      closeOnEscape: !0,
      closeText: 'close',
      dialogClass: '',
      draggable: !0,
      hide: null,
      height: 'auto',
      maxHeight: !1,
      maxWidth: !1,
      minHeight: 150,
      minWidth: 150,
      modal: !1,
      position: {
        my: 'center',
        at: 'center',
        collision: 'fit',
        using: function (b) {
          var c = a(this).css(b).offset().top;
          c < 0 && a(this).css('top', b.top - c);
        }
      },
      resizable: !0,
      show: null,
      stack: !0,
      title: '',
      width: 300,
      zIndex: 1000
    },
    _create: function () {
      this.originalTitle = this.element.attr('title'), typeof this.originalTitle != 'string' && (this.originalTitle = ''), this.options.title = this.options.title || this.originalTitle;
      var b = this, d = b.options, e = d.title || '&#160;', f = a.ui.dialog.getTitleId(b.element), g = (b.uiDialog = a('<div></div>')).appendTo(document.body).hide().addClass(c + d.dialogClass).css({ zIndex: d.zIndex }).attr('tabIndex', -1).css('outline', 0).keydown(function (c) {
          d.closeOnEscape && !c.isDefaultPrevented() && c.keyCode && c.keyCode === a.ui.keyCode.ESCAPE && (b.close(c), c.preventDefault());
        }).attr({
          role: 'dialog',
          'aria-labelledby': f
        }).mousedown(function (a) {
          b.moveToTop(!1, a);
        }), h = b.element.show().removeAttr('title').addClass('ui-dialog-content ui-widget-content').appendTo(g), i = (b.uiDialogTitlebar = a('<div></div>')).addClass('ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix').prependTo(g), j = a('<a href="#"></a>').addClass('ui-dialog-titlebar-close ui-corner-all').attr('role', 'button').hover(function () {
          j.addClass('ui-state-hover');
        }, function () {
          j.removeClass('ui-state-hover');
        }).focus(function () {
          j.addClass('ui-state-focus');
        }).blur(function () {
          j.removeClass('ui-state-focus');
        }).click(function (a) {
          return b.close(a), !1;
        }).appendTo(i), k = (b.uiDialogTitlebarCloseText = a('<span></span>')).addClass('ui-icon ui-icon-closethick').text(d.closeText).appendTo(j), l = a('<span></span>').addClass('ui-dialog-title').attr('id', f).html(e).prependTo(i);
      a.isFunction(d.beforeclose) && !a.isFunction(d.beforeClose) && (d.beforeClose = d.beforeclose), i.find('*').add(i).disableSelection(), d.draggable && a.fn.draggable && b._makeDraggable(), d.resizable && a.fn.resizable && b._makeResizable(), b._createButtons(d.buttons), b._isOpen = !1, a.fn.bgiframe && g.bgiframe();
    },
    _init: function () {
      this.options.autoOpen && this.open();
    },
    destroy: function () {
      var a = this;
      return a.overlay && a.overlay.destroy(), a.uiDialog.hide(), a.element.unbind('.dialog').removeData('dialog').removeClass('ui-dialog-content ui-widget-content').hide().appendTo('body'), a.uiDialog.remove(), a.originalTitle && a.element.attr('title', a.originalTitle), a;
    },
    widget: function () {
      return this.uiDialog;
    },
    close: function (b) {
      var c = this, d, e;
      if (!1 === c._trigger('beforeClose', b))
        return;
      return c.overlay && c.overlay.destroy(), c.uiDialog.unbind('keypress.ui-dialog'), c._isOpen = !1, c.options.hide ? c.uiDialog.hide(c.options.hide, function () {
        c._trigger('close', b);
      }) : (c.uiDialog.hide(), c._trigger('close', b)), a.ui.dialog.overlay.resize(), c.options.modal && (d = 0, a('.ui-dialog').each(function () {
        this !== c.uiDialog[0] && (e = a(this).css('z-index'), isNaN(e) || (d = Math.max(d, e)));
      }), a.ui.dialog.maxZ = d), c;
    },
    isOpen: function () {
      return this._isOpen;
    },
    moveToTop: function (b, c) {
      var d = this, e = d.options, f;
      return e.modal && !b || !e.stack && !e.modal ? d._trigger('focus', c) : (e.zIndex > a.ui.dialog.maxZ && (a.ui.dialog.maxZ = e.zIndex), d.overlay && (a.ui.dialog.maxZ += 1, d.overlay.$el.css('z-index', a.ui.dialog.overlay.maxZ = a.ui.dialog.maxZ)), f = {
        scrollTop: d.element.scrollTop(),
        scrollLeft: d.element.scrollLeft()
      }, a.ui.dialog.maxZ += 1, d.uiDialog.css('z-index', a.ui.dialog.maxZ), d.element.attr(f), d._trigger('focus', c), d);
    },
    open: function () {
      if (this._isOpen)
        return;
      var b = this, c = b.options, d = b.uiDialog;
      return b.overlay = c.modal ? new a.ui.dialog.overlay(b) : null, b._size(), b._position(c.position), d.show(c.show), b.moveToTop(!0), c.modal && d.bind('keydown.ui-dialog', function (b) {
        if (b.keyCode !== a.ui.keyCode.TAB)
          return;
        var c = a(':tabbable', this), d = c.filter(':first'), e = c.filter(':last');
        if (b.target === e[0] && !b.shiftKey)
          return d.focus(1), !1;
        if (b.target === d[0] && b.shiftKey)
          return e.focus(1), !1;
      }), a(b.element.find(':tabbable').get().concat(d.find('.ui-dialog-buttonpane :tabbable').get().concat(d.get()))).eq(0).focus(), b._isOpen = !0, b._trigger('open'), b;
    },
    _createButtons: function (b) {
      var c = this, d = !1, e = a('<div></div>').addClass('ui-dialog-buttonpane ui-widget-content ui-helper-clearfix'), f = a('<div></div>').addClass('ui-dialog-buttonset').appendTo(e);
      c.uiDialog.find('.ui-dialog-buttonpane').remove(), typeof b == 'object' && b !== null && a.each(b, function () {
        return !(d = !0);
      }), d && (a.each(b, function (b, d) {
        d = a.isFunction(d) ? {
          click: d,
          text: b
        } : d;
        var e = a('<button type="button"></button>').click(function () {
            d.click.apply(c.element[0], arguments);
          }).appendTo(f);
        a.each(d, function (a, b) {
          if (a === 'click')
            return;
          a in e ? e[a](b) : e.attr(a, b);
        }), a.fn.button && e.button();
      }), e.appendTo(c.uiDialog));
    },
    _makeDraggable: function () {
      function f(a) {
        return {
          position: a.position,
          offset: a.offset
        };
      }
      var b = this, c = b.options, d = a(document), e;
      b.uiDialog.draggable({
        cancel: '.ui-dialog-content, .ui-dialog-titlebar-close',
        handle: '.ui-dialog-titlebar',
        containment: 'document',
        start: function (d, g) {
          e = c.height === 'auto' ? 'auto' : a(this).height(), a(this).height(a(this).height()).addClass('ui-dialog-dragging'), b._trigger('dragStart', d, f(g));
        },
        drag: function (a, c) {
          b._trigger('drag', a, f(c));
        },
        stop: function (g, h) {
          c.position = [
            h.position.left - d.scrollLeft(),
            h.position.top - d.scrollTop()
          ], a(this).removeClass('ui-dialog-dragging').height(e), b._trigger('dragStop', g, f(h)), a.ui.dialog.overlay.resize();
        }
      });
    },
    _makeResizable: function (c) {
      function h(a) {
        return {
          originalPosition: a.originalPosition,
          originalSize: a.originalSize,
          position: a.position,
          size: a.size
        };
      }
      c = c === b ? this.options.resizable : c;
      var d = this, e = d.options, f = d.uiDialog.css('position'), g = typeof c == 'string' ? c : 'n,e,s,w,se,sw,ne,nw';
      d.uiDialog.resizable({
        cancel: '.ui-dialog-content',
        containment: 'document',
        alsoResize: d.element,
        maxWidth: e.maxWidth,
        maxHeight: e.maxHeight,
        minWidth: e.minWidth,
        minHeight: d._minHeight(),
        handles: g,
        start: function (b, c) {
          a(this).addClass('ui-dialog-resizing'), d._trigger('resizeStart', b, h(c));
        },
        resize: function (a, b) {
          d._trigger('resize', a, h(b));
        },
        stop: function (b, c) {
          a(this).removeClass('ui-dialog-resizing'), e.height = a(this).height(), e.width = a(this).width(), d._trigger('resizeStop', b, h(c)), a.ui.dialog.overlay.resize();
        }
      }).css('position', f).find('.ui-resizable-se').addClass('ui-icon ui-icon-grip-diagonal-se');
    },
    _minHeight: function () {
      var a = this.options;
      return a.height === 'auto' ? a.minHeight : Math.min(a.minHeight, a.height);
    },
    _position: function (b) {
      var c = [], d = [
          0,
          0
        ], e;
      if (b) {
        if (typeof b == 'string' || typeof b == 'object' && '0' in b)
          c = b.split ? b.split(' ') : [
            b[0],
            b[1]
          ], c.length === 1 && (c[1] = c[0]), a.each([
            'left',
            'top'
          ], function (a, b) {
            +c[a] === c[a] && (d[a] = c[a], c[a] = b);
          }), b = {
            my: c.join(' '),
            at: c.join(' '),
            offset: d.join(' ')
          };
        b = a.extend({}, a.ui.dialog.prototype.options.position, b);
      } else
        b = a.ui.dialog.prototype.options.position;
      e = this.uiDialog.is(':visible'), e || this.uiDialog.show(), this.uiDialog.css({
        top: 0,
        left: 0
      }).position(a.extend({ of: window }, b)), e || this.uiDialog.hide();
    },
    _setOptions: function (b) {
      var c = this, f = {}, g = !1;
      a.each(b, function (a, b) {
        c._setOption(a, b), a in d && (g = !0), a in e && (f[a] = b);
      }), g && this._size(), this.uiDialog.is(':data(resizable)') && this.uiDialog.resizable('option', f);
    },
    _setOption: function (b, d) {
      var e = this, f = e.uiDialog;
      switch (b) {
      case 'beforeclose':
        b = 'beforeClose';
        break;
      case 'buttons':
        e._createButtons(d);
        break;
      case 'closeText':
        e.uiDialogTitlebarCloseText.text('' + d);
        break;
      case 'dialogClass':
        f.removeClass(e.options.dialogClass).addClass(c + d);
        break;
      case 'disabled':
        d ? f.addClass('ui-dialog-disabled') : f.removeClass('ui-dialog-disabled');
        break;
      case 'draggable':
        var g = f.is(':data(draggable)');
        g && !d && f.draggable('destroy'), !g && d && e._makeDraggable();
        break;
      case 'position':
        e._position(d);
        break;
      case 'resizable':
        var h = f.is(':data(resizable)');
        h && !d && f.resizable('destroy'), h && typeof d == 'string' && f.resizable('option', 'handles', d), !h && d !== !1 && e._makeResizable(d);
        break;
      case 'title':
        a('.ui-dialog-title', e.uiDialogTitlebar).html('' + (d || '&#160;'));
      }
      a.Widget.prototype._setOption.apply(e, arguments);
    },
    _size: function () {
      var b = this.options, c, d, e = this.uiDialog.is(':visible');
      this.element.show().css({
        width: 'auto',
        minHeight: 0,
        height: 0
      }), b.minWidth > b.width && (b.width = b.minWidth), c = this.uiDialog.css({
        height: 'auto',
        width: b.width
      }).height(), d = Math.max(0, b.minHeight - c);
      if (b.height === 'auto')
        if (a.support.minHeight)
          this.element.css({
            minHeight: d,
            height: 'auto'
          });
        else {
          this.uiDialog.show();
          var f = this.element.css('height', 'auto').height();
          e || this.uiDialog.hide(), this.element.height(Math.max(f, d));
        }
      else
        this.element.height(Math.max(b.height - c, 0));
      this.uiDialog.is(':data(resizable)') && this.uiDialog.resizable('option', 'minHeight', this._minHeight());
    }
  }), a.extend(a.ui.dialog, {
    version: '1.8.23',
    uuid: 0,
    maxZ: 0,
    getTitleId: function (a) {
      var b = a.attr('id');
      return b || (this.uuid += 1, b = this.uuid), 'ui-dialog-title-' + b;
    },
    overlay: function (b) {
      this.$el = a.ui.dialog.overlay.create(b);
    }
  }), a.extend(a.ui.dialog.overlay, {
    instances: [],
    oldInstances: [],
    maxZ: 0,
    events: a.map('focus,mousedown,mouseup,keydown,keypress,click'.split(','), function (a) {
      return a + '.dialog-overlay';
    }).join(' '),
    create: function (b) {
      this.instances.length === 0 && (setTimeout(function () {
        a.ui.dialog.overlay.instances.length && a(document).bind(a.ui.dialog.overlay.events, function (b) {
          if (a(b.target).zIndex() < a.ui.dialog.overlay.maxZ)
            return !1;
        });
      }, 1), a(document).bind('keydown.dialog-overlay', function (c) {
        b.options.closeOnEscape && !c.isDefaultPrevented() && c.keyCode && c.keyCode === a.ui.keyCode.ESCAPE && (b.close(c), c.preventDefault());
      }), a(window).bind('resize.dialog-overlay', a.ui.dialog.overlay.resize));
      var c = (this.oldInstances.pop() || a('<div></div>').addClass('ui-widget-overlay')).appendTo(document.body).css({
          width: this.width(),
          height: this.height()
        });
      return a.fn.bgiframe && c.bgiframe(), this.instances.push(c), c;
    },
    destroy: function (b) {
      var c = a.inArray(b, this.instances);
      c != -1 && this.oldInstances.push(this.instances.splice(c, 1)[0]), this.instances.length === 0 && a([
        document,
        window
      ]).unbind('.dialog-overlay'), b.remove();
      var d = 0;
      a.each(this.instances, function () {
        d = Math.max(d, this.css('z-index'));
      }), this.maxZ = d;
    },
    height: function () {
      var b, c;
      return a.browser.msie && a.browser.version < 7 ? (b = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), c = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight), b < c ? a(window).height() + 'px' : b + 'px') : a(document).height() + 'px';
    },
    width: function () {
      var b, c;
      return a.browser.msie ? (b = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), c = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth), b < c ? a(window).width() + 'px' : b + 'px') : a(document).width() + 'px';
    },
    resize: function () {
      var b = a([]);
      a.each(a.ui.dialog.overlay.instances, function () {
        b = b.add(this);
      }), b.css({
        width: 0,
        height: 0
      }).css({
        width: a.ui.dialog.overlay.width(),
        height: a.ui.dialog.overlay.height()
      });
    }
  }), a.extend(a.ui.dialog.overlay.prototype, {
    destroy: function () {
      a.ui.dialog.overlay.destroy(this.$el);
    }
  });
}(jQuery), function (a, b) {
  a.ui = a.ui || {};
  var c = /left|center|right/, d = /top|center|bottom/, e = 'center', f = {}, g = a.fn.position, h = a.fn.offset;
  a.fn.position = function (b) {
    if (!b || !b.of)
      return g.apply(this, arguments);
    b = a.extend({}, b);
    var h = a(b.of), i = h[0], j = (b.collision || 'flip').split(' '), k = b.offset ? b.offset.split(' ') : [
        0,
        0
      ], l, m, n;
    return i.nodeType === 9 ? (l = h.width(), m = h.height(), n = {
      top: 0,
      left: 0
    }) : i.setTimeout ? (l = h.width(), m = h.height(), n = {
      top: h.scrollTop(),
      left: h.scrollLeft()
    }) : i.preventDefault ? (b.at = 'left top', l = m = 0, n = {
      top: b.of.pageY,
      left: b.of.pageX
    }) : (l = h.outerWidth(), m = h.outerHeight(), n = h.offset()), a.each([
      'my',
      'at'
    ], function () {
      var a = (b[this] || '').split(' ');
      a.length === 1 && (a = c.test(a[0]) ? a.concat([e]) : d.test(a[0]) ? [e].concat(a) : [
        e,
        e
      ]), a[0] = c.test(a[0]) ? a[0] : e, a[1] = d.test(a[1]) ? a[1] : e, b[this] = a;
    }), j.length === 1 && (j[1] = j[0]), k[0] = parseInt(k[0], 10) || 0, k.length === 1 && (k[1] = k[0]), k[1] = parseInt(k[1], 10) || 0, b.at[0] === 'right' ? n.left += l : b.at[0] === e && (n.left += l / 2), b.at[1] === 'bottom' ? n.top += m : b.at[1] === e && (n.top += m / 2), n.left += k[0], n.top += k[1], this.each(function () {
      var c = a(this), d = c.outerWidth(), g = c.outerHeight(), h = parseInt(a.curCSS(this, 'marginLeft', !0)) || 0, i = parseInt(a.curCSS(this, 'marginTop', !0)) || 0, o = d + h + (parseInt(a.curCSS(this, 'marginRight', !0)) || 0), p = g + i + (parseInt(a.curCSS(this, 'marginBottom', !0)) || 0), q = a.extend({}, n), r;
      b.my[0] === 'right' ? q.left -= d : b.my[0] === e && (q.left -= d / 2), b.my[1] === 'bottom' ? q.top -= g : b.my[1] === e && (q.top -= g / 2), f.fractions || (q.left = Math.round(q.left), q.top = Math.round(q.top)), r = {
        left: q.left - h,
        top: q.top - i
      }, a.each([
        'left',
        'top'
      ], function (c, e) {
        a.ui.position[j[c]] && a.ui.position[j[c]][e](q, {
          targetWidth: l,
          targetHeight: m,
          elemWidth: d,
          elemHeight: g,
          collisionPosition: r,
          collisionWidth: o,
          collisionHeight: p,
          offset: k,
          my: b.my,
          at: b.at
        });
      }), a.fn.bgiframe && c.bgiframe(), c.offset(a.extend(q, { using: b.using }));
    });
  }, a.ui.position = {
    fit: {
      left: function (b, c) {
        var d = a(window), e = c.collisionPosition.left + c.collisionWidth - d.width() - d.scrollLeft();
        b.left = e > 0 ? b.left - e : Math.max(b.left - c.collisionPosition.left, b.left);
      },
      top: function (b, c) {
        var d = a(window), e = c.collisionPosition.top + c.collisionHeight - d.height() - d.scrollTop();
        b.top = e > 0 ? b.top - e : Math.max(b.top - c.collisionPosition.top, b.top);
      }
    },
    flip: {
      left: function (b, c) {
        if (c.at[0] === e)
          return;
        var d = a(window), f = c.collisionPosition.left + c.collisionWidth - d.width() - d.scrollLeft(), g = c.my[0] === 'left' ? -c.elemWidth : c.my[0] === 'right' ? c.elemWidth : 0, h = c.at[0] === 'left' ? c.targetWidth : -c.targetWidth, i = -2 * c.offset[0];
        b.left += c.collisionPosition.left < 0 ? g + h + i : f > 0 ? g + h + i : 0;
      },
      top: function (b, c) {
        if (c.at[1] === e)
          return;
        var d = a(window), f = c.collisionPosition.top + c.collisionHeight - d.height() - d.scrollTop(), g = c.my[1] === 'top' ? -c.elemHeight : c.my[1] === 'bottom' ? c.elemHeight : 0, h = c.at[1] === 'top' ? c.targetHeight : -c.targetHeight, i = -2 * c.offset[1];
        b.top += c.collisionPosition.top < 0 ? g + h + i : f > 0 ? g + h + i : 0;
      }
    }
  }, a.offset.setOffset || (a.offset.setOffset = function (b, c) {
    /static/.test(a.curCSS(b, 'position')) && (b.style.position = 'relative');
    var d = a(b), e = d.offset(), f = parseInt(a.curCSS(b, 'top', !0), 10) || 0, g = parseInt(a.curCSS(b, 'left', !0), 10) || 0, h = {
        top: c.top - e.top + f,
        left: c.left - e.left + g
      };
    'using' in c ? c.using.call(b, h) : d.css(h);
  }, a.fn.offset = function (b) {
    var c = this[0];
    return !c || !c.ownerDocument ? null : b ? a.isFunction(b) ? this.each(function (c) {
      a(this).offset(b.call(this, c, a(this).offset()));
    }) : this.each(function () {
      a.offset.setOffset(this, b);
    }) : h.call(this);
  }), a.curCSS || (a.curCSS = a.css), function () {
    var b = document.getElementsByTagName('body')[0], c = document.createElement('div'), d, e, g, h, i;
    d = document.createElement(b ? 'div' : 'body'), g = {
      visibility: 'hidden',
      width: 0,
      height: 0,
      border: 0,
      margin: 0,
      background: 'none'
    }, b && a.extend(g, {
      position: 'absolute',
      left: '-1000px',
      top: '-1000px'
    });
    for (var j in g)
      d.style[j] = g[j];
    d.appendChild(c), e = b || document.documentElement, e.insertBefore(d, e.firstChild), c.style.cssText = 'position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;', h = a(c).offset(function (a, b) {
      return b;
    }).offset(), d.innerHTML = '', e.removeChild(d), i = h.top + h.left + (b ? 2000 : 0), f.fractions = i > 21 && i < 22;
  }();
}(jQuery), function (a, b) {
  a.widget('ui.progressbar', {
    options: {
      value: 0,
      max: 100
    },
    min: 0,
    _create: function () {
      this.element.addClass('ui-progressbar ui-widget ui-widget-content ui-corner-all').attr({
        role: 'progressbar',
        'aria-valuemin': this.min,
        'aria-valuemax': this.options.max,
        'aria-valuenow': this._value()
      }), this.valueDiv = a('<div class=\'ui-progressbar-value ui-widget-header ui-corner-left\'></div>').appendTo(this.element), this.oldValue = this._value(), this._refreshValue();
    },
    destroy: function () {
      this.element.removeClass('ui-progressbar ui-widget ui-widget-content ui-corner-all').removeAttr('role').removeAttr('aria-valuemin').removeAttr('aria-valuemax').removeAttr('aria-valuenow'), this.valueDiv.remove(), a.Widget.prototype.destroy.apply(this, arguments);
    },
    value: function (a) {
      return a === b ? this._value() : (this._setOption('value', a), this);
    },
    _setOption: function (b, c) {
      b === 'value' && (this.options.value = c, this._refreshValue(), this._value() === this.options.max && this._trigger('complete')), a.Widget.prototype._setOption.apply(this, arguments);
    },
    _value: function () {
      var a = this.options.value;
      return typeof a != 'number' && (a = 0), Math.min(this.options.max, Math.max(this.min, a));
    },
    _percentage: function () {
      return 100 * this._value() / this.options.max;
    },
    _refreshValue: function () {
      var a = this.value(), b = this._percentage();
      this.oldValue !== a && (this.oldValue = a, this._trigger('change')), this.valueDiv.toggle(a > this.min).toggleClass('ui-corner-right', a === this.options.max).width(b.toFixed(0) + '%'), this.element.attr('aria-valuenow', a);
    }
  }), a.extend(a.ui.progressbar, { version: '1.8.23' });
}(jQuery), function (a, b) {
  var c = 5;
  a.widget('ui.slider', a.ui.mouse, {
    widgetEventPrefix: 'slide',
    options: {
      animate: !1,
      distance: 0,
      max: 100,
      min: 0,
      orientation: 'horizontal',
      range: !1,
      step: 1,
      value: 0,
      values: null
    },
    _create: function () {
      var b = this, d = this.options, e = this.element.find('.ui-slider-handle').addClass('ui-state-default ui-corner-all'), f = '<a class=\'ui-slider-handle ui-state-default ui-corner-all\' href=\'#\'></a>', g = d.values && d.values.length || 1, h = [];
      this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass('ui-slider ui-slider-' + this.orientation + ' ui-widget' + ' ui-widget-content' + ' ui-corner-all' + (d.disabled ? ' ui-slider-disabled ui-disabled' : '')), this.range = a([]), d.range && (d.range === !0 && (d.values || (d.values = [
        this._valueMin(),
        this._valueMin()
      ]), d.values.length && d.values.length !== 2 && (d.values = [
        d.values[0],
        d.values[0]
      ])), this.range = a('<div></div>').appendTo(this.element).addClass('ui-slider-range ui-widget-header' + (d.range === 'min' || d.range === 'max' ? ' ui-slider-range-' + d.range : '')));
      for (var i = e.length; i < g; i += 1)
        h.push(f);
      this.handles = e.add(a(h.join('')).appendTo(b.element)), this.handle = this.handles.eq(0), this.handles.add(this.range).filter('a').click(function (a) {
        a.preventDefault();
      }).hover(function () {
        d.disabled || a(this).addClass('ui-state-hover');
      }, function () {
        a(this).removeClass('ui-state-hover');
      }).focus(function () {
        d.disabled ? a(this).blur() : (a('.ui-slider .ui-state-focus').removeClass('ui-state-focus'), a(this).addClass('ui-state-focus'));
      }).blur(function () {
        a(this).removeClass('ui-state-focus');
      }), this.handles.each(function (b) {
        a(this).data('index.ui-slider-handle', b);
      }), this.handles.keydown(function (d) {
        var e = a(this).data('index.ui-slider-handle'), f, g, h, i;
        if (b.options.disabled)
          return;
        switch (d.keyCode) {
        case a.ui.keyCode.HOME:
        case a.ui.keyCode.END:
        case a.ui.keyCode.PAGE_UP:
        case a.ui.keyCode.PAGE_DOWN:
        case a.ui.keyCode.UP:
        case a.ui.keyCode.RIGHT:
        case a.ui.keyCode.DOWN:
        case a.ui.keyCode.LEFT:
          d.preventDefault();
          if (!b._keySliding) {
            b._keySliding = !0, a(this).addClass('ui-state-active'), f = b._start(d, e);
            if (f === !1)
              return;
          }
        }
        i = b.options.step, b.options.values && b.options.values.length ? g = h = b.values(e) : g = h = b.value();
        switch (d.keyCode) {
        case a.ui.keyCode.HOME:
          h = b._valueMin();
          break;
        case a.ui.keyCode.END:
          h = b._valueMax();
          break;
        case a.ui.keyCode.PAGE_UP:
          h = b._trimAlignValue(g + (b._valueMax() - b._valueMin()) / c);
          break;
        case a.ui.keyCode.PAGE_DOWN:
          h = b._trimAlignValue(g - (b._valueMax() - b._valueMin()) / c);
          break;
        case a.ui.keyCode.UP:
        case a.ui.keyCode.RIGHT:
          if (g === b._valueMax())
            return;
          h = b._trimAlignValue(g + i);
          break;
        case a.ui.keyCode.DOWN:
        case a.ui.keyCode.LEFT:
          if (g === b._valueMin())
            return;
          h = b._trimAlignValue(g - i);
        }
        b._slide(d, e, h);
      }).keyup(function (c) {
        var d = a(this).data('index.ui-slider-handle');
        b._keySliding && (b._keySliding = !1, b._stop(c, d), b._change(c, d), a(this).removeClass('ui-state-active'));
      }), this._refreshValue(), this._animateOff = !1;
    },
    destroy: function () {
      return this.handles.remove(), this.range.remove(), this.element.removeClass('ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all').removeData('slider').unbind('.slider'), this._mouseDestroy(), this;
    },
    _mouseCapture: function (b) {
      var c = this.options, d, e, f, g, h, i, j, k, l;
      return c.disabled ? !1 : (this.elementSize = {
        width: this.element.outerWidth(),
        height: this.element.outerHeight()
      }, this.elementOffset = this.element.offset(), d = {
        x: b.pageX,
        y: b.pageY
      }, e = this._normValueFromMouse(d), f = this._valueMax() - this._valueMin() + 1, h = this, this.handles.each(function (b) {
        var c = Math.abs(e - h.values(b));
        f > c && (f = c, g = a(this), i = b);
      }), c.range === !0 && this.values(1) === c.min && (i += 1, g = a(this.handles[i])), j = this._start(b, i), j === !1 ? !1 : (this._mouseSliding = !0, h._handleIndex = i, g.addClass('ui-state-active').focus(), k = g.offset(), l = !a(b.target).parents().andSelf().is('.ui-slider-handle'), this._clickOffset = l ? {
        left: 0,
        top: 0
      } : {
        left: b.pageX - k.left - g.width() / 2,
        top: b.pageY - k.top - g.height() / 2 - (parseInt(g.css('borderTopWidth'), 10) || 0) - (parseInt(g.css('borderBottomWidth'), 10) || 0) + (parseInt(g.css('marginTop'), 10) || 0)
      }, this.handles.hasClass('ui-state-hover') || this._slide(b, i, e), this._animateOff = !0, !0));
    },
    _mouseStart: function (a) {
      return !0;
    },
    _mouseDrag: function (a) {
      var b = {
          x: a.pageX,
          y: a.pageY
        }, c = this._normValueFromMouse(b);
      return this._slide(a, this._handleIndex, c), !1;
    },
    _mouseStop: function (a) {
      return this.handles.removeClass('ui-state-active'), this._mouseSliding = !1, this._stop(a, this._handleIndex), this._change(a, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1;
    },
    _detectOrientation: function () {
      this.orientation = this.options.orientation === 'vertical' ? 'vertical' : 'horizontal';
    },
    _normValueFromMouse: function (a) {
      var b, c, d, e, f;
      return this.orientation === 'horizontal' ? (b = this.elementSize.width, c = a.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (b = this.elementSize.height, c = a.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), d = c / b, d > 1 && (d = 1), d < 0 && (d = 0), this.orientation === 'vertical' && (d = 1 - d), e = this._valueMax() - this._valueMin(), f = this._valueMin() + d * e, this._trimAlignValue(f);
    },
    _start: function (a, b) {
      var c = {
          handle: this.handles[b],
          value: this.value()
        };
      return this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger('start', a, c);
    },
    _slide: function (a, b, c) {
      var d, e, f;
      this.options.values && this.options.values.length ? (d = this.values(b ? 0 : 1), this.options.values.length === 2 && this.options.range === !0 && (b === 0 && c > d || b === 1 && c < d) && (c = d), c !== this.values(b) && (e = this.values(), e[b] = c, f = this._trigger('slide', a, {
        handle: this.handles[b],
        value: c,
        values: e
      }), d = this.values(b ? 0 : 1), f !== !1 && this.values(b, c, !0))) : c !== this.value() && (f = this._trigger('slide', a, {
        handle: this.handles[b],
        value: c
      }), f !== !1 && this.value(c));
    },
    _stop: function (a, b) {
      var c = {
          handle: this.handles[b],
          value: this.value()
        };
      this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger('stop', a, c);
    },
    _change: function (a, b) {
      if (!this._keySliding && !this._mouseSliding) {
        var c = {
            handle: this.handles[b],
            value: this.value()
          };
        this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger('change', a, c);
      }
    },
    value: function (a) {
      if (arguments.length) {
        this.options.value = this._trimAlignValue(a), this._refreshValue(), this._change(null, 0);
        return;
      }
      return this._value();
    },
    values: function (b, c) {
      var d, e, f;
      if (arguments.length > 1) {
        this.options.values[b] = this._trimAlignValue(c), this._refreshValue(), this._change(null, b);
        return;
      }
      if (!arguments.length)
        return this._values();
      if (!a.isArray(arguments[0]))
        return this.options.values && this.options.values.length ? this._values(b) : this.value();
      d = this.options.values, e = arguments[0];
      for (f = 0; f < d.length; f += 1)
        d[f] = this._trimAlignValue(e[f]), this._change(null, f);
      this._refreshValue();
    },
    _setOption: function (b, c) {
      var d, e = 0;
      a.isArray(this.options.values) && (e = this.options.values.length), a.Widget.prototype._setOption.apply(this, arguments);
      switch (b) {
      case 'disabled':
        c ? (this.handles.filter('.ui-state-focus').blur(), this.handles.removeClass('ui-state-hover'), this.handles.propAttr('disabled', !0), this.element.addClass('ui-disabled')) : (this.handles.propAttr('disabled', !1), this.element.removeClass('ui-disabled'));
        break;
      case 'orientation':
        this._detectOrientation(), this.element.removeClass('ui-slider-horizontal ui-slider-vertical').addClass('ui-slider-' + this.orientation), this._refreshValue();
        break;
      case 'value':
        this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
        break;
      case 'values':
        this._animateOff = !0, this._refreshValue();
        for (d = 0; d < e; d += 1)
          this._change(null, d);
        this._animateOff = !1;
      }
    },
    _value: function () {
      var a = this.options.value;
      return a = this._trimAlignValue(a), a;
    },
    _values: function (a) {
      var b, c, d;
      if (arguments.length)
        return b = this.options.values[a], b = this._trimAlignValue(b), b;
      c = this.options.values.slice();
      for (d = 0; d < c.length; d += 1)
        c[d] = this._trimAlignValue(c[d]);
      return c;
    },
    _trimAlignValue: function (a) {
      if (a <= this._valueMin())
        return this._valueMin();
      if (a >= this._valueMax())
        return this._valueMax();
      var b = this.options.step > 0 ? this.options.step : 1, c = (a - this._valueMin()) % b, d = a - c;
      return Math.abs(c) * 2 >= b && (d += c > 0 ? b : -b), parseFloat(d.toFixed(5));
    },
    _valueMin: function () {
      return this.options.min;
    },
    _valueMax: function () {
      return this.options.max;
    },
    _refreshValue: function () {
      var b = this.options.range, c = this.options, d = this, e = this._animateOff ? !1 : c.animate, f, g = {}, h, i, j, k;
      this.options.values && this.options.values.length ? this.handles.each(function (b, i) {
        f = (d.values(b) - d._valueMin()) / (d._valueMax() - d._valueMin()) * 100, g[d.orientation === 'horizontal' ? 'left' : 'bottom'] = f + '%', a(this).stop(1, 1)[e ? 'animate' : 'css'](g, c.animate), d.options.range === !0 && (d.orientation === 'horizontal' ? (b === 0 && d.range.stop(1, 1)[e ? 'animate' : 'css']({ left: f + '%' }, c.animate), b === 1 && d.range[e ? 'animate' : 'css']({ width: f - h + '%' }, {
          queue: !1,
          duration: c.animate
        })) : (b === 0 && d.range.stop(1, 1)[e ? 'animate' : 'css']({ bottom: f + '%' }, c.animate), b === 1 && d.range[e ? 'animate' : 'css']({ height: f - h + '%' }, {
          queue: !1,
          duration: c.animate
        }))), h = f;
      }) : (i = this.value(), j = this._valueMin(), k = this._valueMax(), f = k !== j ? (i - j) / (k - j) * 100 : 0, g[d.orientation === 'horizontal' ? 'left' : 'bottom'] = f + '%', this.handle.stop(1, 1)[e ? 'animate' : 'css'](g, c.animate), b === 'min' && this.orientation === 'horizontal' && this.range.stop(1, 1)[e ? 'animate' : 'css']({ width: f + '%' }, c.animate), b === 'max' && this.orientation === 'horizontal' && this.range[e ? 'animate' : 'css']({ width: 100 - f + '%' }, {
        queue: !1,
        duration: c.animate
      }), b === 'min' && this.orientation === 'vertical' && this.range.stop(1, 1)[e ? 'animate' : 'css']({ height: f + '%' }, c.animate), b === 'max' && this.orientation === 'vertical' && this.range[e ? 'animate' : 'css']({ height: 100 - f + '%' }, {
        queue: !1,
        duration: c.animate
      }));
    }
  }), a.extend(a.ui.slider, { version: '1.8.23' });
}(jQuery), function (a, b) {
  function e() {
    return ++c;
  }
  function f() {
    return ++d;
  }
  var c = 0, d = 0;
  a.widget('ui.tabs', {
    options: {
      add: null,
      ajaxOptions: null,
      cache: !1,
      cookie: null,
      collapsible: !1,
      disable: null,
      disabled: [],
      enable: null,
      event: 'click',
      fx: null,
      idPrefix: 'ui-tabs-',
      load: null,
      panelTemplate: '<div></div>',
      remove: null,
      select: null,
      show: null,
      spinner: '<em>Loading&#8230;</em>',
      tabTemplate: '<li><a href=\'#{href}\'><span>#{label}</span></a></li>'
    },
    _create: function () {
      this._tabify(!0);
    },
    _setOption: function (a, b) {
      if (a == 'selected') {
        if (this.options.collapsible && b == this.options.selected)
          return;
        this.select(b);
      } else
        this.options[a] = b, this._tabify();
    },
    _tabId: function (a) {
      return a.title && a.title.replace(/\s/g, '_').replace(/[^\w\u00c0-\uFFFF-]/g, '') || this.options.idPrefix + e();
    },
    _sanitizeSelector: function (a) {
      return a.replace(/:/g, '\\:');
    },
    _cookie: function () {
      var b = this.cookie || (this.cookie = this.options.cookie.name || 'ui-tabs-' + f());
      return a.cookie.apply(null, [b].concat(a.makeArray(arguments)));
    },
    _ui: function (a, b) {
      return {
        tab: a,
        panel: b,
        index: this.anchors.index(a)
      };
    },
    _cleanup: function () {
      this.lis.filter('.ui-state-processing').removeClass('ui-state-processing').find('span:data(label.tabs)').each(function () {
        var b = a(this);
        b.html(b.data('label.tabs')).removeData('label.tabs');
      });
    },
    _tabify: function (c) {
      function m(b, c) {
        b.css('display', ''), !a.support.opacity && c.opacity && b[0].style.removeAttribute('filter');
      }
      var d = this, e = this.options, f = /^#.+/;
      this.list = this.element.find('ol,ul').eq(0), this.lis = a(' > li:has(a[href])', this.list), this.anchors = this.lis.map(function () {
        return a('a', this)[0];
      }), this.panels = a([]), this.anchors.each(function (b, c) {
        var g = a(c).attr('href'), h = g.split('#')[0], i;
        h && (h === location.toString().split('#')[0] || (i = a('base')[0]) && h === i.href) && (g = c.hash, c.href = g);
        if (f.test(g))
          d.panels = d.panels.add(d.element.find(d._sanitizeSelector(g)));
        else if (g && g !== '#') {
          a.data(c, 'href.tabs', g), a.data(c, 'load.tabs', g.replace(/#.*$/, ''));
          var j = d._tabId(c);
          c.href = '#' + j;
          var k = d.element.find('#' + j);
          k.length || (k = a(e.panelTemplate).attr('id', j).addClass('ui-tabs-panel ui-widget-content ui-corner-bottom').insertAfter(d.panels[b - 1] || d.list), k.data('destroy.tabs', !0)), d.panels = d.panels.add(k);
        } else
          e.disabled.push(b);
      }), c ? (this.element.addClass('ui-tabs ui-widget ui-widget-content ui-corner-all'), this.list.addClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all'), this.lis.addClass('ui-state-default ui-corner-top'), this.panels.addClass('ui-tabs-panel ui-widget-content ui-corner-bottom'), e.selected === b ? (location.hash && this.anchors.each(function (a, b) {
        if (b.hash == location.hash)
          return e.selected = a, !1;
      }), typeof e.selected != 'number' && e.cookie && (e.selected = parseInt(d._cookie(), 10)), typeof e.selected != 'number' && this.lis.filter('.ui-tabs-selected').length && (e.selected = this.lis.index(this.lis.filter('.ui-tabs-selected'))), e.selected = e.selected || (this.lis.length ? 0 : -1)) : e.selected === null && (e.selected = -1), e.selected = e.selected >= 0 && this.anchors[e.selected] || e.selected < 0 ? e.selected : 0, e.disabled = a.unique(e.disabled.concat(a.map(this.lis.filter('.ui-state-disabled'), function (a, b) {
        return d.lis.index(a);
      }))).sort(), a.inArray(e.selected, e.disabled) != -1 && e.disabled.splice(a.inArray(e.selected, e.disabled), 1), this.panels.addClass('ui-tabs-hide'), this.lis.removeClass('ui-tabs-selected ui-state-active'), e.selected >= 0 && this.anchors.length && (d.element.find(d._sanitizeSelector(d.anchors[e.selected].hash)).removeClass('ui-tabs-hide'), this.lis.eq(e.selected).addClass('ui-tabs-selected ui-state-active'), d.element.queue('tabs', function () {
        d._trigger('show', null, d._ui(d.anchors[e.selected], d.element.find(d._sanitizeSelector(d.anchors[e.selected].hash))[0]));
      }), this.load(e.selected)), a(window).bind('unload', function () {
        d.lis.add(d.anchors).unbind('.tabs'), d.lis = d.anchors = d.panels = null;
      })) : e.selected = this.lis.index(this.lis.filter('.ui-tabs-selected')), this.element[e.collapsible ? 'addClass' : 'removeClass']('ui-tabs-collapsible'), e.cookie && this._cookie(e.selected, e.cookie);
      for (var g = 0, h; h = this.lis[g]; g++)
        a(h)[a.inArray(g, e.disabled) != -1 && !a(h).hasClass('ui-tabs-selected') ? 'addClass' : 'removeClass']('ui-state-disabled');
      e.cache === !1 && this.anchors.removeData('cache.tabs'), this.lis.add(this.anchors).unbind('.tabs');
      if (e.event !== 'mouseover') {
        var i = function (a, b) {
            b.is(':not(.ui-state-disabled)') && b.addClass('ui-state-' + a);
          }, j = function (a, b) {
            b.removeClass('ui-state-' + a);
          };
        this.lis.bind('mouseover.tabs', function () {
          i('hover', a(this));
        }), this.lis.bind('mouseout.tabs', function () {
          j('hover', a(this));
        }), this.anchors.bind('focus.tabs', function () {
          i('focus', a(this).closest('li'));
        }), this.anchors.bind('blur.tabs', function () {
          j('focus', a(this).closest('li'));
        });
      }
      var k, l;
      e.fx && (a.isArray(e.fx) ? (k = e.fx[0], l = e.fx[1]) : k = l = e.fx);
      var n = l ? function (b, c) {
          a(b).closest('li').addClass('ui-tabs-selected ui-state-active'), c.hide().removeClass('ui-tabs-hide').animate(l, l.duration || 'normal', function () {
            m(c, l), d._trigger('show', null, d._ui(b, c[0]));
          });
        } : function (b, c) {
          a(b).closest('li').addClass('ui-tabs-selected ui-state-active'), c.removeClass('ui-tabs-hide'), d._trigger('show', null, d._ui(b, c[0]));
        }, o = k ? function (a, b) {
          b.animate(k, k.duration || 'normal', function () {
            d.lis.removeClass('ui-tabs-selected ui-state-active'), b.addClass('ui-tabs-hide'), m(b, k), d.element.dequeue('tabs');
          });
        } : function (a, b, c) {
          d.lis.removeClass('ui-tabs-selected ui-state-active'), b.addClass('ui-tabs-hide'), d.element.dequeue('tabs');
        };
      this.anchors.bind(e.event + '.tabs', function () {
        var b = this, c = a(b).closest('li'), f = d.panels.filter(':not(.ui-tabs-hide)'), g = d.element.find(d._sanitizeSelector(b.hash));
        if (c.hasClass('ui-tabs-selected') && !e.collapsible || c.hasClass('ui-state-disabled') || c.hasClass('ui-state-processing') || d.panels.filter(':animated').length || d._trigger('select', null, d._ui(this, g[0])) === !1)
          return this.blur(), !1;
        e.selected = d.anchors.index(this), d.abort();
        if (e.collapsible) {
          if (c.hasClass('ui-tabs-selected'))
            return e.selected = -1, e.cookie && d._cookie(e.selected, e.cookie), d.element.queue('tabs', function () {
              o(b, f);
            }).dequeue('tabs'), this.blur(), !1;
          if (!f.length)
            return e.cookie && d._cookie(e.selected, e.cookie), d.element.queue('tabs', function () {
              n(b, g);
            }), d.load(d.anchors.index(this)), this.blur(), !1;
        }
        e.cookie && d._cookie(e.selected, e.cookie);
        if (g.length)
          f.length && d.element.queue('tabs', function () {
            o(b, f);
          }), d.element.queue('tabs', function () {
            n(b, g);
          }), d.load(d.anchors.index(this));
        else
          throw 'jQuery UI Tabs: Mismatching fragment identifier.';
        a.browser.msie && this.blur();
      }), this.anchors.bind('click.tabs', function () {
        return !1;
      });
    },
    _getIndex: function (a) {
      return typeof a == 'string' && (a = this.anchors.index(this.anchors.filter('[href$=\'' + a + '\']'))), a;
    },
    destroy: function () {
      var b = this.options;
      return this.abort(), this.element.unbind('.tabs').removeClass('ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible').removeData('tabs'), this.list.removeClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all'), this.anchors.each(function () {
        var b = a.data(this, 'href.tabs');
        b && (this.href = b);
        var c = a(this).unbind('.tabs');
        a.each([
          'href',
          'load',
          'cache'
        ], function (a, b) {
          c.removeData(b + '.tabs');
        });
      }), this.lis.unbind('.tabs').add(this.panels).each(function () {
        a.data(this, 'destroy.tabs') ? a(this).remove() : a(this).removeClass([
          'ui-state-default',
          'ui-corner-top',
          'ui-tabs-selected',
          'ui-state-active',
          'ui-state-hover',
          'ui-state-focus',
          'ui-state-disabled',
          'ui-tabs-panel',
          'ui-widget-content',
          'ui-corner-bottom',
          'ui-tabs-hide'
        ].join(' '));
      }), b.cookie && this._cookie(null, b.cookie), this;
    },
    add: function (c, d, e) {
      e === b && (e = this.anchors.length);
      var f = this, g = this.options, h = a(g.tabTemplate.replace(/#\{href\}/g, c).replace(/#\{label\}/g, d)), i = c.indexOf('#') ? this._tabId(a('a', h)[0]) : c.replace('#', '');
      h.addClass('ui-state-default ui-corner-top').data('destroy.tabs', !0);
      var j = f.element.find('#' + i);
      return j.length || (j = a(g.panelTemplate).attr('id', i).data('destroy.tabs', !0)), j.addClass('ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide'), e >= this.lis.length ? (h.appendTo(this.list), j.appendTo(this.list[0].parentNode)) : (h.insertBefore(this.lis[e]), j.insertBefore(this.panels[e])), g.disabled = a.map(g.disabled, function (a, b) {
        return a >= e ? ++a : a;
      }), this._tabify(), this.anchors.length == 1 && (g.selected = 0, h.addClass('ui-tabs-selected ui-state-active'), j.removeClass('ui-tabs-hide'), this.element.queue('tabs', function () {
        f._trigger('show', null, f._ui(f.anchors[0], f.panels[0]));
      }), this.load(0)), this._trigger('add', null, this._ui(this.anchors[e], this.panels[e])), this;
    },
    remove: function (b) {
      b = this._getIndex(b);
      var c = this.options, d = this.lis.eq(b).remove(), e = this.panels.eq(b).remove();
      return d.hasClass('ui-tabs-selected') && this.anchors.length > 1 && this.select(b + (b + 1 < this.anchors.length ? 1 : -1)), c.disabled = a.map(a.grep(c.disabled, function (a, c) {
        return a != b;
      }), function (a, c) {
        return a >= b ? --a : a;
      }), this._tabify(), this._trigger('remove', null, this._ui(d.find('a')[0], e[0])), this;
    },
    enable: function (b) {
      b = this._getIndex(b);
      var c = this.options;
      if (a.inArray(b, c.disabled) == -1)
        return;
      return this.lis.eq(b).removeClass('ui-state-disabled'), c.disabled = a.grep(c.disabled, function (a, c) {
        return a != b;
      }), this._trigger('enable', null, this._ui(this.anchors[b], this.panels[b])), this;
    },
    disable: function (a) {
      a = this._getIndex(a);
      var b = this, c = this.options;
      return a != c.selected && (this.lis.eq(a).addClass('ui-state-disabled'), c.disabled.push(a), c.disabled.sort(), this._trigger('disable', null, this._ui(this.anchors[a], this.panels[a]))), this;
    },
    select: function (a) {
      a = this._getIndex(a);
      if (a == -1)
        if (this.options.collapsible && this.options.selected != -1)
          a = this.options.selected;
        else
          return this;
      return this.anchors.eq(a).trigger(this.options.event + '.tabs'), this;
    },
    load: function (b) {
      b = this._getIndex(b);
      var c = this, d = this.options, e = this.anchors.eq(b)[0], f = a.data(e, 'load.tabs');
      this.abort();
      if (!f || this.element.queue('tabs').length !== 0 && a.data(e, 'cache.tabs')) {
        this.element.dequeue('tabs');
        return;
      }
      this.lis.eq(b).addClass('ui-state-processing');
      if (d.spinner) {
        var g = a('span', e);
        g.data('label.tabs', g.html()).html(d.spinner);
      }
      return this.xhr = a.ajax(a.extend({}, d.ajaxOptions, {
        url: f,
        success: function (f, g) {
          c.element.find(c._sanitizeSelector(e.hash)).html(f), c._cleanup(), d.cache && a.data(e, 'cache.tabs', !0), c._trigger('load', null, c._ui(c.anchors[b], c.panels[b]));
          try {
            d.ajaxOptions.success(f, g);
          } catch (h) {
          }
        },
        error: function (a, f, g) {
          c._cleanup(), c._trigger('load', null, c._ui(c.anchors[b], c.panels[b]));
          try {
            d.ajaxOptions.error(a, f, b, e);
          } catch (g) {
          }
        }
      })), c.element.dequeue('tabs'), this;
    },
    abort: function () {
      return this.element.queue([]), this.panels.stop(!1, !0), this.element.queue('tabs', this.element.queue('tabs').splice(-2, 2)), this.xhr && (this.xhr.abort(), delete this.xhr), this._cleanup(), this;
    },
    url: function (a, b) {
      return this.anchors.eq(a).removeData('cache.tabs').data('load.tabs', b), this;
    },
    length: function () {
      return this.anchors.length;
    }
  }), a.extend(a.ui.tabs, { version: '1.8.23' }), a.extend(a.ui.tabs.prototype, {
    rotation: null,
    rotate: function (a, b) {
      var c = this, d = this.options, e = c._rotate || (c._rotate = function (b) {
          clearTimeout(c.rotation), c.rotation = setTimeout(function () {
            var a = d.selected;
            c.select(++a < c.anchors.length ? a : 0);
          }, a), b && b.stopPropagation();
        }), f = c._unrotate || (c._unrotate = b ? function (a) {
          e();
        } : function (a) {
          a.clientX && c.rotate(null);
        });
      return a ? (this.element.bind('tabsshow', e), this.anchors.bind(d.event + '.tabs', f), e()) : (clearTimeout(c.rotation), this.element.unbind('tabsshow', e), this.anchors.unbind(d.event + '.tabs', f), delete this._rotate, delete this._unrotate), this;
    }
  });
}(jQuery));
(function (window, document, undefined) {
  'use strict';
  var lowercase = function (string) {
    return isString(string) ? string.toLowerCase() : string;
  };
  var uppercase = function (string) {
    return isString(string) ? string.toUpperCase() : string;
  };
  var manualLowercase = function (s) {
    return isString(s) ? s.replace(/[A-Z]/g, function (ch) {
      return String.fromCharCode(ch.charCodeAt(0) | 32);
    }) : s;
  };
  var manualUppercase = function (s) {
    return isString(s) ? s.replace(/[a-z]/g, function (ch) {
      return String.fromCharCode(ch.charCodeAt(0) & ~32);
    }) : s;
  };
  if ('i' !== 'I'.toLowerCase()) {
    lowercase = manualLowercase;
    uppercase = manualUppercase;
  }
  var msie = int((/msie (\d+)/.exec(lowercase(navigator.userAgent)) || [])[1]), jqLite, jQuery, slice = [].slice, push = [].push, toString = Object.prototype.toString, angular = window.angular || (window.angular = {}), angularModule, nodeName_, uid = [
      '0',
      '0',
      '0'
    ];
  function isArrayLike(obj) {
    if (!obj || typeof obj.length !== 'number')
      return false;
    if (typeof obj.hasOwnProperty != 'function' && typeof obj.constructor != 'function') {
      return true;
    } else {
      return obj instanceof JQLite || jQuery && obj instanceof jQuery || toString.call(obj) !== '[object Object]' || typeof obj.callee === 'function';
    }
  }
  function forEach(obj, iterator, context) {
    var key;
    if (obj) {
      if (isFunction(obj)) {
        for (key in obj) {
          if (key != 'prototype' && key != 'length' && key != 'name' && obj.hasOwnProperty(key)) {
            iterator.call(context, obj[key], key);
          }
        }
      } else if (obj.forEach && obj.forEach !== forEach) {
        obj.forEach(iterator, context);
      } else if (isArrayLike(obj)) {
        for (key = 0; key < obj.length; key++)
          iterator.call(context, obj[key], key);
      } else {
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            iterator.call(context, obj[key], key);
          }
        }
      }
    }
    return obj;
  }
  function sortedKeys(obj) {
    var keys = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    return keys.sort();
  }
  function forEachSorted(obj, iterator, context) {
    var keys = sortedKeys(obj);
    for (var i = 0; i < keys.length; i++) {
      iterator.call(context, obj[keys[i]], keys[i]);
    }
    return keys;
  }
  function reverseParams(iteratorFn) {
    return function (value, key) {
      iteratorFn(key, value);
    };
  }
  function nextUid() {
    var index = uid.length;
    var digit;
    while (index) {
      index--;
      digit = uid[index].charCodeAt(0);
      if (digit == 57) {
        uid[index] = 'A';
        return uid.join('');
      }
      if (digit == 90) {
        uid[index] = '0';
      } else {
        uid[index] = String.fromCharCode(digit + 1);
        return uid.join('');
      }
    }
    uid.unshift('0');
    return uid.join('');
  }
  function setHashKey(obj, h) {
    if (h) {
      obj.$$hashKey = h;
    } else {
      delete obj.$$hashKey;
    }
  }
  function extend(dst) {
    var h = dst.$$hashKey;
    forEach(arguments, function (obj) {
      if (obj !== dst) {
        forEach(obj, function (value, key) {
          dst[key] = value;
        });
      }
    });
    setHashKey(dst, h);
    return dst;
  }
  function int(str) {
    return parseInt(str, 10);
  }
  function inherit(parent, extra) {
    return extend(new (extend(function () {
    }, { prototype: parent }))(), extra);
  }
  function noop() {
  }
  noop.$inject = [];
  function identity($) {
    return $;
  }
  identity.$inject = [];
  function valueFn(value) {
    return function () {
      return value;
    };
  }
  function isUndefined(value) {
    return typeof value == 'undefined';
  }
  function isDefined(value) {
    return typeof value != 'undefined';
  }
  function isObject(value) {
    return value != null && typeof value == 'object';
  }
  function isString(value) {
    return typeof value == 'string';
  }
  function isNumber(value) {
    return typeof value == 'number';
  }
  function isDate(value) {
    return toString.apply(value) == '[object Date]';
  }
  function isArray(value) {
    return toString.apply(value) == '[object Array]';
  }
  function isFunction(value) {
    return typeof value == 'function';
  }
  function isRegExp(value) {
    return toString.apply(value) == '[object RegExp]';
  }
  function isWindow(obj) {
    return obj && obj.document && obj.location && obj.alert && obj.setInterval;
  }
  function isScope(obj) {
    return obj && obj.$evalAsync && obj.$watch;
  }
  function isFile(obj) {
    return toString.apply(obj) === '[object File]';
  }
  function isBoolean(value) {
    return typeof value == 'boolean';
  }
  var trim = function () {
      if (!String.prototype.trim) {
        return function (value) {
          return isString(value) ? value.replace(/^\s*/, '').replace(/\s*$/, '') : value;
        };
      }
      return function (value) {
        return isString(value) ? value.trim() : value;
      };
    }();
  function isElement(node) {
    return node && (node.nodeName || node.bind && node.find);
  }
  function makeMap(str) {
    var obj = {}, items = str.split(','), i;
    for (i = 0; i < items.length; i++)
      obj[items[i]] = true;
    return obj;
  }
  if (msie < 9) {
    nodeName_ = function (element) {
      element = element.nodeName ? element : element[0];
      return element.scopeName && element.scopeName != 'HTML' ? uppercase(element.scopeName + ':' + element.nodeName) : element.nodeName;
    };
  } else {
    nodeName_ = function (element) {
      return element.nodeName ? element.nodeName : element[0].nodeName;
    };
  }
  function map(obj, iterator, context) {
    var results = [];
    forEach(obj, function (value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  }
  function size(obj, ownPropsOnly) {
    var size = 0, key;
    if (isArray(obj) || isString(obj)) {
      return obj.length;
    } else if (isObject(obj)) {
      for (key in obj)
        if (!ownPropsOnly || obj.hasOwnProperty(key))
          size++;
    }
    return size;
  }
  function includes(array, obj) {
    return indexOf(array, obj) != -1;
  }
  function indexOf(array, obj) {
    if (array.indexOf)
      return array.indexOf(obj);
    for (var i = 0; i < array.length; i++) {
      if (obj === array[i])
        return i;
    }
    return -1;
  }
  function arrayRemove(array, value) {
    var index = indexOf(array, value);
    if (index >= 0)
      array.splice(index, 1);
    return value;
  }
  function isLeafNode(node) {
    if (node) {
      switch (node.nodeName) {
      case 'OPTION':
      case 'PRE':
      case 'TITLE':
        return true;
      }
    }
    return false;
  }
  function copy(source, destination) {
    if (isWindow(source) || isScope(source))
      throw Error('Can\'t copy Window or Scope');
    if (!destination) {
      destination = source;
      if (source) {
        if (isArray(source)) {
          destination = copy(source, []);
        } else if (isDate(source)) {
          destination = new Date(source.getTime());
        } else if (isRegExp(source)) {
          destination = new RegExp(source.source);
        } else if (isObject(source)) {
          destination = copy(source, {});
        }
      }
    } else {
      if (source === destination)
        throw Error('Can\'t copy equivalent objects or arrays');
      if (isArray(source)) {
        destination.length = 0;
        for (var i = 0; i < source.length; i++) {
          destination.push(copy(source[i]));
        }
      } else {
        var h = destination.$$hashKey;
        forEach(destination, function (value, key) {
          delete destination[key];
        });
        for (var key in source) {
          destination[key] = copy(source[key]);
        }
        setHashKey(destination, h);
      }
    }
    return destination;
  }
  function shallowCopy(src, dst) {
    dst = dst || {};
    for (var key in src) {
      if (src.hasOwnProperty(key) && key.substr(0, 2) !== '$$') {
        dst[key] = src[key];
      }
    }
    return dst;
  }
  function equals(o1, o2) {
    if (o1 === o2)
      return true;
    if (o1 === null || o2 === null)
      return false;
    if (o1 !== o1 && o2 !== o2)
      return true;
    var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
    if (t1 == t2) {
      if (t1 == 'object') {
        if (isArray(o1)) {
          if (!isArray(o2))
            return false;
          if ((length = o1.length) == o2.length) {
            for (key = 0; key < length; key++) {
              if (!equals(o1[key], o2[key]))
                return false;
            }
            return true;
          }
        } else if (isDate(o1)) {
          return isDate(o2) && o1.getTime() == o2.getTime();
        } else if (isRegExp(o1) && isRegExp(o2)) {
          return o1.toString() == o2.toString();
        } else {
          if (isScope(o1) || isScope(o2) || isWindow(o1) || isWindow(o2) || isArray(o2))
            return false;
          keySet = {};
          for (key in o1) {
            if (key.charAt(0) === '$' || isFunction(o1[key]))
              continue;
            if (!equals(o1[key], o2[key]))
              return false;
            keySet[key] = true;
          }
          for (key in o2) {
            if (!keySet[key] && key.charAt(0) !== '$' && o2[key] !== undefined && !isFunction(o2[key]))
              return false;
          }
          return true;
        }
      }
    }
    return false;
  }
  function concat(array1, array2, index) {
    return array1.concat(slice.call(array2, index));
  }
  function sliceArgs(args, startIndex) {
    return slice.call(args, startIndex || 0);
  }
  function bind(self, fn) {
    var curryArgs = arguments.length > 2 ? sliceArgs(arguments, 2) : [];
    if (isFunction(fn) && !(fn instanceof RegExp)) {
      return curryArgs.length ? function () {
        return arguments.length ? fn.apply(self, curryArgs.concat(slice.call(arguments, 0))) : fn.apply(self, curryArgs);
      } : function () {
        return arguments.length ? fn.apply(self, arguments) : fn.call(self);
      };
    } else {
      return fn;
    }
  }
  function toJsonReplacer(key, value) {
    var val = value;
    if (/^\$+/.test(key)) {
      val = undefined;
    } else if (isWindow(value)) {
      val = '$WINDOW';
    } else if (value && document === value) {
      val = '$DOCUMENT';
    } else if (isScope(value)) {
      val = '$SCOPE';
    }
    return val;
  }
  function toJson(obj, pretty) {
    if (typeof obj === 'undefined')
      return undefined;
    return JSON.stringify(obj, toJsonReplacer, pretty ? '  ' : null);
  }
  function fromJson(json) {
    return isString(json) ? JSON.parse(json) : json;
  }
  function toBoolean(value) {
    if (value && value.length !== 0) {
      var v = lowercase('' + value);
      value = !(v == 'f' || v == '0' || v == 'false' || v == 'no' || v == 'n' || v == '[]');
    } else {
      value = false;
    }
    return value;
  }
  function startingTag(element) {
    element = jqLite(element).clone();
    try {
      element.html('');
    } catch (e) {
    }
    var TEXT_NODE = 3;
    var elemHtml = jqLite('<div>').append(element).html();
    try {
      return element[0].nodeType === TEXT_NODE ? lowercase(elemHtml) : elemHtml.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (match, nodeName) {
        return '<' + lowercase(nodeName);
      });
    } catch (e) {
      return lowercase(elemHtml);
    }
  }
  function tryDecodeURIComponent(value) {
    try {
      return decodeURIComponent(value);
    } catch (e) {
    }
  }
  function parseKeyValue(keyValue) {
    var obj = {}, key_value, key;
    forEach((keyValue || '').split('&'), function (keyValue) {
      if (keyValue) {
        key_value = keyValue.split('=');
        key = tryDecodeURIComponent(key_value[0]);
        if (isDefined(key)) {
          obj[key] = isDefined(key_value[1]) ? tryDecodeURIComponent(key_value[1]) : true;
        }
      }
    });
    return obj;
  }
  function toKeyValue(obj) {
    var parts = [];
    forEach(obj, function (value, key) {
      parts.push(encodeUriQuery(key, true) + (value === true ? '' : '=' + encodeUriQuery(value, true)));
    });
    return parts.length ? parts.join('&') : '';
  }
  function encodeUriSegment(val) {
    return encodeUriQuery(val, true).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
  }
  function encodeUriQuery(val, pctEncodeSpaces) {
    return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, pctEncodeSpaces ? '%20' : '+');
  }
  function angularInit(element, bootstrap) {
    var elements = [element], appElement, module, names = [
        'ng:app',
        'ng-app',
        'x-ng-app',
        'data-ng-app'
      ], NG_APP_CLASS_REGEXP = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
    function append(element) {
      element && elements.push(element);
    }
    forEach(names, function (name) {
      names[name] = true;
      append(document.getElementById(name));
      name = name.replace(':', '\\:');
      if (element.querySelectorAll) {
        forEach(element.querySelectorAll('.' + name), append);
        forEach(element.querySelectorAll('.' + name + '\\:'), append);
        forEach(element.querySelectorAll('[' + name + ']'), append);
      }
    });
    forEach(elements, function (element) {
      if (!appElement) {
        var className = ' ' + element.className + ' ';
        var match = NG_APP_CLASS_REGEXP.exec(className);
        if (match) {
          appElement = element;
          module = (match[2] || '').replace(/\s+/g, ',');
        } else {
          forEach(element.attributes, function (attr) {
            if (!appElement && names[attr.name]) {
              appElement = element;
              module = attr.value;
            }
          });
        }
      }
    });
    if (appElement) {
      bootstrap(appElement, module ? [module] : []);
    }
  }
  function bootstrap(element, modules) {
    var doBootstrap = function () {
      element = jqLite(element);
      modules = modules || [];
      modules.unshift([
        '$provide',
        function ($provide) {
          $provide.value('$rootElement', element);
        }
      ]);
      modules.unshift('ng');
      var injector = createInjector(modules);
      injector.invoke([
        '$rootScope',
        '$rootElement',
        '$compile',
        '$injector',
        function (scope, element, compile, injector) {
          scope.$apply(function () {
            element.data('$injector', injector);
            compile(element)(scope);
          });
        }
      ]);
      return injector;
    };
    var NG_DEFER_BOOTSTRAP = /^NG_DEFER_BOOTSTRAP!/;
    if (window && !NG_DEFER_BOOTSTRAP.test(window.name)) {
      return doBootstrap();
    }
    window.name = window.name.replace(NG_DEFER_BOOTSTRAP, '');
    angular.resumeBootstrap = function (extraModules) {
      forEach(extraModules, function (module) {
        modules.push(module);
      });
      doBootstrap();
    };
  }
  var SNAKE_CASE_REGEXP = /[A-Z]/g;
  function snake_case(name, separator) {
    separator = separator || '_';
    return name.replace(SNAKE_CASE_REGEXP, function (letter, pos) {
      return (pos ? separator : '') + letter.toLowerCase();
    });
  }
  function bindJQuery() {
    jQuery = window.jQuery;
    if (jQuery) {
      jqLite = jQuery;
      extend(jQuery.fn, {
        scope: JQLitePrototype.scope,
        controller: JQLitePrototype.controller,
        injector: JQLitePrototype.injector,
        inheritedData: JQLitePrototype.inheritedData
      });
      JQLitePatchJQueryRemove('remove', true, true, false);
      JQLitePatchJQueryRemove('empty', false, false, false);
      JQLitePatchJQueryRemove('html', false, false, true);
    } else {
      jqLite = JQLite;
    }
    angular.element = jqLite;
  }
  function assertArg(arg, name, reason) {
    if (!arg) {
      throw new Error('Argument \'' + (name || '?') + '\' is ' + (reason || 'required'));
    }
    return arg;
  }
  function assertArgFn(arg, name, acceptArrayAnnotation) {
    if (acceptArrayAnnotation && isArray(arg)) {
      arg = arg[arg.length - 1];
    }
    assertArg(isFunction(arg), name, 'not a function, got ' + (arg && typeof arg == 'object' ? arg.constructor.name || 'Object' : typeof arg));
    return arg;
  }
  function getter(obj, path, bindFnToScope) {
    if (!path)
      return obj;
    var keys = path.split('.');
    var key;
    var lastInstance = obj;
    var len = keys.length;
    for (var i = 0; i < len; i++) {
      key = keys[i];
      if (obj) {
        obj = (lastInstance = obj)[key];
      }
    }
    if (!bindFnToScope && isFunction(obj)) {
      return bind(lastInstance, obj);
    }
    return obj;
  }
  function setupModuleLoader(window) {
    function ensure(obj, name, factory) {
      return obj[name] || (obj[name] = factory());
    }
    return ensure(ensure(window, 'angular', Object), 'module', function () {
      var modules = {};
      return function module(name, requires, configFn) {
        if (requires && modules.hasOwnProperty(name)) {
          modules[name] = null;
        }
        return ensure(modules, name, function () {
          if (!requires) {
            throw Error('No module: ' + name);
          }
          var invokeQueue = [];
          var runBlocks = [];
          var config = invokeLater('$injector', 'invoke');
          var moduleInstance = {
              _invokeQueue: invokeQueue,
              _runBlocks: runBlocks,
              requires: requires,
              name: name,
              provider: invokeLater('$provide', 'provider'),
              factory: invokeLater('$provide', 'factory'),
              service: invokeLater('$provide', 'service'),
              value: invokeLater('$provide', 'value'),
              constant: invokeLater('$provide', 'constant', 'unshift'),
              filter: invokeLater('$filterProvider', 'register'),
              controller: invokeLater('$controllerProvider', 'register'),
              directive: invokeLater('$compileProvider', 'directive'),
              config: config,
              run: function (block) {
                runBlocks.push(block);
                return this;
              }
            };
          if (configFn) {
            config(configFn);
          }
          return moduleInstance;
          function invokeLater(provider, method, insertMethod) {
            return function () {
              invokeQueue[insertMethod || 'push']([
                provider,
                method,
                arguments
              ]);
              return moduleInstance;
            };
          }
        });
      };
    });
  }
  var version = {
      full: '1.0.8',
      major: 1,
      minor: 0,
      dot: 8,
      codeName: 'bubble-burst'
    };
  function publishExternalAPI(angular) {
    extend(angular, {
      'bootstrap': bootstrap,
      'copy': copy,
      'extend': extend,
      'equals': equals,
      'element': jqLite,
      'forEach': forEach,
      'injector': createInjector,
      'noop': noop,
      'bind': bind,
      'toJson': toJson,
      'fromJson': fromJson,
      'identity': identity,
      'isUndefined': isUndefined,
      'isDefined': isDefined,
      'isString': isString,
      'isFunction': isFunction,
      'isObject': isObject,
      'isNumber': isNumber,
      'isElement': isElement,
      'isArray': isArray,
      'version': version,
      'isDate': isDate,
      'lowercase': lowercase,
      'uppercase': uppercase,
      'callbacks': { counter: 0 }
    });
    angularModule = setupModuleLoader(window);
    try {
      angularModule('ngLocale');
    } catch (e) {
      angularModule('ngLocale', []).provider('$locale', $LocaleProvider);
    }
    angularModule('ng', ['ngLocale'], [
      '$provide',
      function ngModule($provide) {
        $provide.provider('$compile', $CompileProvider).directive({
          a: htmlAnchorDirective,
          input: inputDirective,
          textarea: inputDirective,
          form: formDirective,
          script: scriptDirective,
          select: selectDirective,
          style: styleDirective,
          option: optionDirective,
          ngBind: ngBindDirective,
          ngBindHtmlUnsafe: ngBindHtmlUnsafeDirective,
          ngBindTemplate: ngBindTemplateDirective,
          ngClass: ngClassDirective,
          ngClassEven: ngClassEvenDirective,
          ngClassOdd: ngClassOddDirective,
          ngCsp: ngCspDirective,
          ngCloak: ngCloakDirective,
          ngController: ngControllerDirective,
          ngForm: ngFormDirective,
          ngHide: ngHideDirective,
          ngInclude: ngIncludeDirective,
          ngInit: ngInitDirective,
          ngNonBindable: ngNonBindableDirective,
          ngPluralize: ngPluralizeDirective,
          ngRepeat: ngRepeatDirective,
          ngShow: ngShowDirective,
          ngStyle: ngStyleDirective,
          ngSwitch: ngSwitchDirective,
          ngSwitchWhen: ngSwitchWhenDirective,
          ngSwitchDefault: ngSwitchDefaultDirective,
          ngOptions: ngOptionsDirective,
          ngView: ngViewDirective,
          ngTransclude: ngTranscludeDirective,
          ngModel: ngModelDirective,
          ngList: ngListDirective,
          ngChange: ngChangeDirective,
          required: requiredDirective,
          ngRequired: requiredDirective,
          ngValue: ngValueDirective
        }).directive(ngAttributeAliasDirectives).directive(ngEventDirectives);
        $provide.provider({
          $anchorScroll: $AnchorScrollProvider,
          $browser: $BrowserProvider,
          $cacheFactory: $CacheFactoryProvider,
          $controller: $ControllerProvider,
          $document: $DocumentProvider,
          $exceptionHandler: $ExceptionHandlerProvider,
          $filter: $FilterProvider,
          $interpolate: $InterpolateProvider,
          $http: $HttpProvider,
          $httpBackend: $HttpBackendProvider,
          $location: $LocationProvider,
          $log: $LogProvider,
          $parse: $ParseProvider,
          $route: $RouteProvider,
          $routeParams: $RouteParamsProvider,
          $rootScope: $RootScopeProvider,
          $q: $QProvider,
          $sniffer: $SnifferProvider,
          $templateCache: $TemplateCacheProvider,
          $timeout: $TimeoutProvider,
          $window: $WindowProvider
        });
      }
    ]);
  }
  var jqCache = JQLite.cache = {}, jqName = JQLite.expando = 'ng-' + new Date().getTime(), jqId = 1, addEventListenerFn = window.document.addEventListener ? function (element, type, fn) {
      element.addEventListener(type, fn, false);
    } : function (element, type, fn) {
      element.attachEvent('on' + type, fn);
    }, removeEventListenerFn = window.document.removeEventListener ? function (element, type, fn) {
      element.removeEventListener(type, fn, false);
    } : function (element, type, fn) {
      element.detachEvent('on' + type, fn);
    };
  function jqNextId() {
    return ++jqId;
  }
  var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
  var MOZ_HACK_REGEXP = /^moz([A-Z])/;
  function camelCase(name) {
    return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
  }
  function JQLitePatchJQueryRemove(name, dispatchThis, filterElems, getterIfNoArguments) {
    var originalJqFn = jQuery.fn[name];
    originalJqFn = originalJqFn.$original || originalJqFn;
    removePatch.$original = originalJqFn;
    jQuery.fn[name] = removePatch;
    function removePatch(param) {
      var list = filterElems && param ? [this.filter(param)] : [this], fireEvent = dispatchThis, set, setIndex, setLength, element, childIndex, childLength, children;
      if (!getterIfNoArguments || param != null) {
        while (list.length) {
          set = list.shift();
          for (setIndex = 0, setLength = set.length; setIndex < setLength; setIndex++) {
            element = jqLite(set[setIndex]);
            if (fireEvent) {
              element.triggerHandler('$destroy');
            } else {
              fireEvent = !fireEvent;
            }
            for (childIndex = 0, childLength = (children = element.children()).length; childIndex < childLength; childIndex++) {
              list.push(jQuery(children[childIndex]));
            }
          }
        }
      }
      return originalJqFn.apply(this, arguments);
    }
  }
  function JQLite(element) {
    if (element instanceof JQLite) {
      return element;
    }
    if (!(this instanceof JQLite)) {
      if (isString(element) && element.charAt(0) != '<') {
        throw Error('selectors not implemented');
      }
      return new JQLite(element);
    }
    if (isString(element)) {
      var div = document.createElement('div');
      div.innerHTML = '<div>&#160;</div>' + element;
      div.removeChild(div.firstChild);
      JQLiteAddNodes(this, div.childNodes);
      this.remove();
    } else {
      JQLiteAddNodes(this, element);
    }
  }
  function JQLiteClone(element) {
    return element.cloneNode(true);
  }
  function JQLiteDealoc(element) {
    JQLiteRemoveData(element);
    for (var i = 0, children = element.childNodes || []; i < children.length; i++) {
      JQLiteDealoc(children[i]);
    }
  }
  function JQLiteUnbind(element, type, fn) {
    var events = JQLiteExpandoStore(element, 'events'), handle = JQLiteExpandoStore(element, 'handle');
    if (!handle)
      return;
    if (isUndefined(type)) {
      forEach(events, function (eventHandler, type) {
        removeEventListenerFn(element, type, eventHandler);
        delete events[type];
      });
    } else {
      if (isUndefined(fn)) {
        removeEventListenerFn(element, type, events[type]);
        delete events[type];
      } else {
        arrayRemove(events[type] || [], fn);
      }
    }
  }
  function JQLiteRemoveData(element) {
    var expandoId = element[jqName], expandoStore = jqCache[expandoId];
    if (expandoStore) {
      if (expandoStore.handle) {
        expandoStore.events.$destroy && expandoStore.handle({}, '$destroy');
        JQLiteUnbind(element);
      }
      delete jqCache[expandoId];
      element[jqName] = undefined;
    }
  }
  function JQLiteExpandoStore(element, key, value) {
    var expandoId = element[jqName], expandoStore = jqCache[expandoId || -1];
    if (isDefined(value)) {
      if (!expandoStore) {
        element[jqName] = expandoId = jqNextId();
        expandoStore = jqCache[expandoId] = {};
      }
      expandoStore[key] = value;
    } else {
      return expandoStore && expandoStore[key];
    }
  }
  function JQLiteData(element, key, value) {
    var data = JQLiteExpandoStore(element, 'data'), isSetter = isDefined(value), keyDefined = !isSetter && isDefined(key), isSimpleGetter = keyDefined && !isObject(key);
    if (!data && !isSimpleGetter) {
      JQLiteExpandoStore(element, 'data', data = {});
    }
    if (isSetter) {
      data[key] = value;
    } else {
      if (keyDefined) {
        if (isSimpleGetter) {
          return data && data[key];
        } else {
          extend(data, key);
        }
      } else {
        return data;
      }
    }
  }
  function JQLiteHasClass(element, selector) {
    return (' ' + element.className + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + selector + ' ') > -1;
  }
  function JQLiteRemoveClass(element, cssClasses) {
    if (cssClasses) {
      forEach(cssClasses.split(' '), function (cssClass) {
        element.className = trim((' ' + element.className + ' ').replace(/[\n\t]/g, ' ').replace(' ' + trim(cssClass) + ' ', ' '));
      });
    }
  }
  function JQLiteAddClass(element, cssClasses) {
    if (cssClasses) {
      forEach(cssClasses.split(' '), function (cssClass) {
        if (!JQLiteHasClass(element, cssClass)) {
          element.className = trim(element.className + ' ' + trim(cssClass));
        }
      });
    }
  }
  function JQLiteAddNodes(root, elements) {
    if (elements) {
      elements = !elements.nodeName && isDefined(elements.length) && !isWindow(elements) ? elements : [elements];
      for (var i = 0; i < elements.length; i++) {
        root.push(elements[i]);
      }
    }
  }
  function JQLiteController(element, name) {
    return JQLiteInheritedData(element, '$' + (name || 'ngController') + 'Controller');
  }
  function JQLiteInheritedData(element, name, value) {
    element = jqLite(element);
    if (element[0].nodeType == 9) {
      element = element.find('html');
    }
    while (element.length) {
      if (value = element.data(name))
        return value;
      element = element.parent();
    }
  }
  var JQLitePrototype = JQLite.prototype = {
      ready: function (fn) {
        var fired = false;
        function trigger() {
          if (fired)
            return;
          fired = true;
          fn();
        }
        this.bind('DOMContentLoaded', trigger);
        JQLite(window).bind('load', trigger);
      },
      toString: function () {
        var value = [];
        forEach(this, function (e) {
          value.push('' + e);
        });
        return '[' + value.join(', ') + ']';
      },
      eq: function (index) {
        return index >= 0 ? jqLite(this[index]) : jqLite(this[this.length + index]);
      },
      length: 0,
      push: push,
      sort: [].sort,
      splice: [].splice
    };
  var BOOLEAN_ATTR = {};
  forEach('multiple,selected,checked,disabled,readOnly,required'.split(','), function (value) {
    BOOLEAN_ATTR[lowercase(value)] = value;
  });
  var BOOLEAN_ELEMENTS = {};
  forEach('input,select,option,textarea,button,form'.split(','), function (value) {
    BOOLEAN_ELEMENTS[uppercase(value)] = true;
  });
  function getBooleanAttrName(element, name) {
    var booleanAttr = BOOLEAN_ATTR[name.toLowerCase()];
    return booleanAttr && BOOLEAN_ELEMENTS[element.nodeName] && booleanAttr;
  }
  forEach({
    data: JQLiteData,
    inheritedData: JQLiteInheritedData,
    scope: function (element) {
      return JQLiteInheritedData(element, '$scope');
    },
    controller: JQLiteController,
    injector: function (element) {
      return JQLiteInheritedData(element, '$injector');
    },
    removeAttr: function (element, name) {
      element.removeAttribute(name);
    },
    hasClass: JQLiteHasClass,
    css: function (element, name, value) {
      name = camelCase(name);
      if (isDefined(value)) {
        element.style[name] = value;
      } else {
        var val;
        if (msie <= 8) {
          val = element.currentStyle && element.currentStyle[name];
          if (val === '')
            val = 'auto';
        }
        val = val || element.style[name];
        if (msie <= 8) {
          val = val === '' ? undefined : val;
        }
        return val;
      }
    },
    attr: function (element, name, value) {
      var lowercasedName = lowercase(name);
      if (BOOLEAN_ATTR[lowercasedName]) {
        if (isDefined(value)) {
          if (!!value) {
            element[name] = true;
            element.setAttribute(name, lowercasedName);
          } else {
            element[name] = false;
            element.removeAttribute(lowercasedName);
          }
        } else {
          return element[name] || (element.attributes.getNamedItem(name) || noop).specified ? lowercasedName : undefined;
        }
      } else if (isDefined(value)) {
        element.setAttribute(name, value);
      } else if (element.getAttribute) {
        var ret = element.getAttribute(name, 2);
        return ret === null ? undefined : ret;
      }
    },
    prop: function (element, name, value) {
      if (isDefined(value)) {
        element[name] = value;
      } else {
        return element[name];
      }
    },
    text: extend(msie < 9 ? function (element, value) {
      if (element.nodeType == 1) {
        if (isUndefined(value))
          return element.innerText;
        element.innerText = value;
      } else {
        if (isUndefined(value))
          return element.nodeValue;
        element.nodeValue = value;
      }
    } : function (element, value) {
      if (isUndefined(value)) {
        return element.textContent;
      }
      element.textContent = value;
    }, { $dv: '' }),
    val: function (element, value) {
      if (isUndefined(value)) {
        if (nodeName_(element) === 'SELECT' && element.multiple) {
          var result = [];
          forEach(element.options, function (option) {
            if (option.selected) {
              result.push(option.value || option.text);
            }
          });
          return result.length === 0 ? null : result;
        }
        return element.value;
      }
      element.value = value;
    },
    html: function (element, value) {
      if (isUndefined(value)) {
        return element.innerHTML;
      }
      for (var i = 0, childNodes = element.childNodes; i < childNodes.length; i++) {
        JQLiteDealoc(childNodes[i]);
      }
      element.innerHTML = value;
    }
  }, function (fn, name) {
    JQLite.prototype[name] = function (arg1, arg2) {
      var i, key;
      if ((fn.length == 2 && (fn !== JQLiteHasClass && fn !== JQLiteController) ? arg1 : arg2) === undefined) {
        if (isObject(arg1)) {
          for (i = 0; i < this.length; i++) {
            if (fn === JQLiteData) {
              fn(this[i], arg1);
            } else {
              for (key in arg1) {
                fn(this[i], key, arg1[key]);
              }
            }
          }
          return this;
        } else {
          if (this.length)
            return fn(this[0], arg1, arg2);
        }
      } else {
        for (i = 0; i < this.length; i++) {
          fn(this[i], arg1, arg2);
        }
        return this;
      }
      return fn.$dv;
    };
  });
  function createEventHandler(element, events) {
    var eventHandler = function (event, type) {
      if (!event.preventDefault) {
        event.preventDefault = function () {
          event.returnValue = false;
        };
      }
      if (!event.stopPropagation) {
        event.stopPropagation = function () {
          event.cancelBubble = true;
        };
      }
      if (!event.target) {
        event.target = event.srcElement || document;
      }
      if (isUndefined(event.defaultPrevented)) {
        var prevent = event.preventDefault;
        event.preventDefault = function () {
          event.defaultPrevented = true;
          prevent.call(event);
        };
        event.defaultPrevented = false;
      }
      event.isDefaultPrevented = function () {
        return event.defaultPrevented;
      };
      forEach(events[type || event.type], function (fn) {
        fn.call(element, event);
      });
      if (msie <= 8) {
        event.preventDefault = null;
        event.stopPropagation = null;
        event.isDefaultPrevented = null;
      } else {
        delete event.preventDefault;
        delete event.stopPropagation;
        delete event.isDefaultPrevented;
      }
    };
    eventHandler.elem = element;
    return eventHandler;
  }
  forEach({
    removeData: JQLiteRemoveData,
    dealoc: JQLiteDealoc,
    bind: function bindFn(element, type, fn) {
      var events = JQLiteExpandoStore(element, 'events'), handle = JQLiteExpandoStore(element, 'handle');
      if (!events)
        JQLiteExpandoStore(element, 'events', events = {});
      if (!handle)
        JQLiteExpandoStore(element, 'handle', handle = createEventHandler(element, events));
      forEach(type.split(' '), function (type) {
        var eventFns = events[type];
        if (!eventFns) {
          if (type == 'mouseenter' || type == 'mouseleave') {
            var contains = document.body.contains || document.body.compareDocumentPosition ? function (a, b) {
                var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
                return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
              } : function (a, b) {
                if (b) {
                  while (b = b.parentNode) {
                    if (b === a) {
                      return true;
                    }
                  }
                }
                return false;
              };
            events[type] = [];
            var eventmap = {
                mouseleave: 'mouseout',
                mouseenter: 'mouseover'
              };
            bindFn(element, eventmap[type], function (event) {
              var ret, target = this, related = event.relatedTarget;
              if (!related || related !== target && !contains(target, related)) {
                handle(event, type);
              }
            });
          } else {
            addEventListenerFn(element, type, handle);
            events[type] = [];
          }
          eventFns = events[type];
        }
        eventFns.push(fn);
      });
    },
    unbind: JQLiteUnbind,
    replaceWith: function (element, replaceNode) {
      var index, parent = element.parentNode;
      JQLiteDealoc(element);
      forEach(new JQLite(replaceNode), function (node) {
        if (index) {
          parent.insertBefore(node, index.nextSibling);
        } else {
          parent.replaceChild(node, element);
        }
        index = node;
      });
    },
    children: function (element) {
      var children = [];
      forEach(element.childNodes, function (element) {
        if (element.nodeType === 1)
          children.push(element);
      });
      return children;
    },
    contents: function (element) {
      return element.childNodes || [];
    },
    append: function (element, node) {
      forEach(new JQLite(node), function (child) {
        if (element.nodeType === 1)
          element.appendChild(child);
      });
    },
    prepend: function (element, node) {
      if (element.nodeType === 1) {
        var index = element.firstChild;
        forEach(new JQLite(node), function (child) {
          element.insertBefore(child, index);
        });
      }
    },
    wrap: function (element, wrapNode) {
      wrapNode = jqLite(wrapNode)[0];
      var parent = element.parentNode;
      if (parent) {
        parent.replaceChild(wrapNode, element);
      }
      wrapNode.appendChild(element);
    },
    remove: function (element) {
      JQLiteDealoc(element);
      var parent = element.parentNode;
      if (parent)
        parent.removeChild(element);
    },
    after: function (element, newElement) {
      var index = element, parent = element.parentNode;
      forEach(new JQLite(newElement), function (node) {
        parent.insertBefore(node, index.nextSibling);
        index = node;
      });
    },
    addClass: JQLiteAddClass,
    removeClass: JQLiteRemoveClass,
    toggleClass: function (element, selector, condition) {
      if (isUndefined(condition)) {
        condition = !JQLiteHasClass(element, selector);
      }
      (condition ? JQLiteAddClass : JQLiteRemoveClass)(element, selector);
    },
    parent: function (element) {
      var parent = element.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    next: function (element) {
      if (element.nextElementSibling) {
        return element.nextElementSibling;
      }
      var elm = element.nextSibling;
      while (elm != null && elm.nodeType !== 1) {
        elm = elm.nextSibling;
      }
      return elm;
    },
    find: function (element, selector) {
      return element.getElementsByTagName(selector);
    },
    clone: JQLiteClone,
    triggerHandler: function (element, eventName) {
      var eventFns = (JQLiteExpandoStore(element, 'events') || {})[eventName];
      forEach(eventFns, function (fn) {
        fn.call(element, null);
      });
    }
  }, function (fn, name) {
    JQLite.prototype[name] = function (arg1, arg2) {
      var value;
      for (var i = 0; i < this.length; i++) {
        if (value == undefined) {
          value = fn(this[i], arg1, arg2);
          if (value !== undefined) {
            value = jqLite(value);
          }
        } else {
          JQLiteAddNodes(value, fn(this[i], arg1, arg2));
        }
      }
      return value == undefined ? this : value;
    };
  });
  function hashKey(obj) {
    var objType = typeof obj, key;
    if (objType == 'object' && obj !== null) {
      if (typeof (key = obj.$$hashKey) == 'function') {
        key = obj.$$hashKey();
      } else if (key === undefined) {
        key = obj.$$hashKey = nextUid();
      }
    } else {
      key = obj;
    }
    return objType + ':' + key;
  }
  function HashMap(array) {
    forEach(array, this.put, this);
  }
  HashMap.prototype = {
    put: function (key, value) {
      this[hashKey(key)] = value;
    },
    get: function (key) {
      return this[hashKey(key)];
    },
    remove: function (key) {
      var value = this[key = hashKey(key)];
      delete this[key];
      return value;
    }
  };
  function HashQueueMap() {
  }
  HashQueueMap.prototype = {
    push: function (key, value) {
      var array = this[key = hashKey(key)];
      if (!array) {
        this[key] = [value];
      } else {
        array.push(value);
      }
    },
    shift: function (key) {
      var array = this[key = hashKey(key)];
      if (array) {
        if (array.length == 1) {
          delete this[key];
          return array[0];
        } else {
          return array.shift();
        }
      }
    },
    peek: function (key) {
      var array = this[hashKey(key)];
      if (array) {
        return array[0];
      }
    }
  };
  var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
  var FN_ARG_SPLIT = /,/;
  var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
  function annotate(fn) {
    var $inject, fnText, argDecl, last;
    if (typeof fn == 'function') {
      if (!($inject = fn.$inject)) {
        $inject = [];
        fnText = fn.toString().replace(STRIP_COMMENTS, '');
        argDecl = fnText.match(FN_ARGS);
        forEach(argDecl[1].split(FN_ARG_SPLIT), function (arg) {
          arg.replace(FN_ARG, function (all, underscore, name) {
            $inject.push(name);
          });
        });
        fn.$inject = $inject;
      }
    } else if (isArray(fn)) {
      last = fn.length - 1;
      assertArgFn(fn[last], 'fn');
      $inject = fn.slice(0, last);
    } else {
      assertArgFn(fn, 'fn', true);
    }
    return $inject;
  }
  function createInjector(modulesToLoad) {
    var INSTANTIATING = {}, providerSuffix = 'Provider', path = [], loadedModules = new HashMap(), providerCache = {
        $provide: {
          provider: supportObject(provider),
          factory: supportObject(factory),
          service: supportObject(service),
          value: supportObject(value),
          constant: supportObject(constant),
          decorator: decorator
        }
      }, providerInjector = createInternalInjector(providerCache, function () {
        throw Error('Unknown provider: ' + path.join(' <- '));
      }), instanceCache = {}, instanceInjector = instanceCache.$injector = createInternalInjector(instanceCache, function (servicename) {
        var provider = providerInjector.get(servicename + providerSuffix);
        return instanceInjector.invoke(provider.$get, provider);
      });
    forEach(loadModules(modulesToLoad), function (fn) {
      instanceInjector.invoke(fn || noop);
    });
    return instanceInjector;
    function supportObject(delegate) {
      return function (key, value) {
        if (isObject(key)) {
          forEach(key, reverseParams(delegate));
        } else {
          return delegate(key, value);
        }
      };
    }
    function provider(name, provider_) {
      if (isFunction(provider_) || isArray(provider_)) {
        provider_ = providerInjector.instantiate(provider_);
      }
      if (!provider_.$get) {
        throw Error('Provider ' + name + ' must define $get factory method.');
      }
      return providerCache[name + providerSuffix] = provider_;
    }
    function factory(name, factoryFn) {
      return provider(name, { $get: factoryFn });
    }
    function service(name, constructor) {
      return factory(name, [
        '$injector',
        function ($injector) {
          return $injector.instantiate(constructor);
        }
      ]);
    }
    function value(name, value) {
      return factory(name, valueFn(value));
    }
    function constant(name, value) {
      providerCache[name] = value;
      instanceCache[name] = value;
    }
    function decorator(serviceName, decorFn) {
      var origProvider = providerInjector.get(serviceName + providerSuffix), orig$get = origProvider.$get;
      origProvider.$get = function () {
        var origInstance = instanceInjector.invoke(orig$get, origProvider);
        return instanceInjector.invoke(decorFn, null, { $delegate: origInstance });
      };
    }
    function loadModules(modulesToLoad) {
      var runBlocks = [];
      forEach(modulesToLoad, function (module) {
        if (loadedModules.get(module))
          return;
        loadedModules.put(module, true);
        if (isString(module)) {
          var moduleFn = angularModule(module);
          runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks);
          try {
            for (var invokeQueue = moduleFn._invokeQueue, i = 0, ii = invokeQueue.length; i < ii; i++) {
              var invokeArgs = invokeQueue[i], provider = invokeArgs[0] == '$injector' ? providerInjector : providerInjector.get(invokeArgs[0]);
              provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
            }
          } catch (e) {
            if (e.message)
              e.message += ' from ' + module;
            throw e;
          }
        } else if (isFunction(module)) {
          try {
            runBlocks.push(providerInjector.invoke(module));
          } catch (e) {
            if (e.message)
              e.message += ' from ' + module;
            throw e;
          }
        } else if (isArray(module)) {
          try {
            runBlocks.push(providerInjector.invoke(module));
          } catch (e) {
            if (e.message)
              e.message += ' from ' + String(module[module.length - 1]);
            throw e;
          }
        } else {
          assertArgFn(module, 'module');
        }
      });
      return runBlocks;
    }
    function createInternalInjector(cache, factory) {
      function getService(serviceName) {
        if (typeof serviceName !== 'string') {
          throw Error('Service name expected');
        }
        if (cache.hasOwnProperty(serviceName)) {
          if (cache[serviceName] === INSTANTIATING) {
            throw Error('Circular dependency: ' + path.join(' <- '));
          }
          return cache[serviceName];
        } else {
          try {
            path.unshift(serviceName);
            cache[serviceName] = INSTANTIATING;
            return cache[serviceName] = factory(serviceName);
          } finally {
            path.shift();
          }
        }
      }
      function invoke(fn, self, locals) {
        var args = [], $inject = annotate(fn), length, i, key;
        for (i = 0, length = $inject.length; i < length; i++) {
          key = $inject[i];
          args.push(locals && locals.hasOwnProperty(key) ? locals[key] : getService(key));
        }
        if (!fn.$inject) {
          fn = fn[length];
        }
        switch (self ? -1 : args.length) {
        case 0:
          return fn();
        case 1:
          return fn(args[0]);
        case 2:
          return fn(args[0], args[1]);
        case 3:
          return fn(args[0], args[1], args[2]);
        case 4:
          return fn(args[0], args[1], args[2], args[3]);
        case 5:
          return fn(args[0], args[1], args[2], args[3], args[4]);
        case 6:
          return fn(args[0], args[1], args[2], args[3], args[4], args[5]);
        case 7:
          return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
        case 8:
          return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
        case 9:
          return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
        case 10:
          return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
        default:
          return fn.apply(self, args);
        }
      }
      function instantiate(Type, locals) {
        var Constructor = function () {
          }, instance, returnedValue;
        Constructor.prototype = (isArray(Type) ? Type[Type.length - 1] : Type).prototype;
        instance = new Constructor();
        returnedValue = invoke(Type, instance, locals);
        return isObject(returnedValue) ? returnedValue : instance;
      }
      return {
        invoke: invoke,
        instantiate: instantiate,
        get: getService,
        annotate: annotate
      };
    }
  }
  function $AnchorScrollProvider() {
    var autoScrollingEnabled = true;
    this.disableAutoScrolling = function () {
      autoScrollingEnabled = false;
    };
    this.$get = [
      '$window',
      '$location',
      '$rootScope',
      function ($window, $location, $rootScope) {
        var document = $window.document;
        function getFirstAnchor(list) {
          var result = null;
          forEach(list, function (element) {
            if (!result && lowercase(element.nodeName) === 'a')
              result = element;
          });
          return result;
        }
        function scroll() {
          var hash = $location.hash(), elm;
          if (!hash)
            $window.scrollTo(0, 0);
          else if (elm = document.getElementById(hash))
            elm.scrollIntoView();
          else if (elm = getFirstAnchor(document.getElementsByName(hash)))
            elm.scrollIntoView();
          else if (hash === 'top')
            $window.scrollTo(0, 0);
        }
        if (autoScrollingEnabled) {
          $rootScope.$watch(function autoScrollWatch() {
            return $location.hash();
          }, function autoScrollWatchAction() {
            $rootScope.$evalAsync(scroll);
          });
        }
        return scroll;
      }
    ];
  }
  function Browser(window, document, $log, $sniffer) {
    var self = this, rawDocument = document[0], location = window.location, history = window.history, setTimeout = window.setTimeout, clearTimeout = window.clearTimeout, pendingDeferIds = {};
    self.isMock = false;
    var outstandingRequestCount = 0;
    var outstandingRequestCallbacks = [];
    self.$$completeOutstandingRequest = completeOutstandingRequest;
    self.$$incOutstandingRequestCount = function () {
      outstandingRequestCount++;
    };
    function completeOutstandingRequest(fn) {
      try {
        fn.apply(null, sliceArgs(arguments, 1));
      } finally {
        outstandingRequestCount--;
        if (outstandingRequestCount === 0) {
          while (outstandingRequestCallbacks.length) {
            try {
              outstandingRequestCallbacks.pop()();
            } catch (e) {
              $log.error(e);
            }
          }
        }
      }
    }
    self.notifyWhenNoOutstandingRequests = function (callback) {
      forEach(pollFns, function (pollFn) {
        pollFn();
      });
      if (outstandingRequestCount === 0) {
        callback();
      } else {
        outstandingRequestCallbacks.push(callback);
      }
    };
    var pollFns = [], pollTimeout;
    self.addPollFn = function (fn) {
      if (isUndefined(pollTimeout))
        startPoller(100, setTimeout);
      pollFns.push(fn);
      return fn;
    };
    function startPoller(interval, setTimeout) {
      (function check() {
        forEach(pollFns, function (pollFn) {
          pollFn();
        });
        pollTimeout = setTimeout(check, interval);
      }());
    }
    var lastBrowserUrl = location.href, baseElement = document.find('base'), replacedUrl = null;
    self.url = function (url, replace) {
      if (url) {
        if (lastBrowserUrl == url)
          return;
        lastBrowserUrl = url;
        if ($sniffer.history) {
          if (replace)
            history.replaceState(null, '', url);
          else {
            history.pushState(null, '', url);
            baseElement.attr('href', baseElement.attr('href'));
          }
        } else {
          if (replace) {
            location.replace(url);
            replacedUrl = url;
          } else {
            location.href = url;
            replacedUrl = null;
          }
        }
        return self;
      } else {
        return replacedUrl || location.href.replace(/%27/g, '\'');
      }
    };
    var urlChangeListeners = [], urlChangeInit = false;
    function fireUrlChange() {
      if (lastBrowserUrl == self.url())
        return;
      lastBrowserUrl = self.url();
      forEach(urlChangeListeners, function (listener) {
        listener(self.url());
      });
    }
    self.onUrlChange = function (callback) {
      if (!urlChangeInit) {
        if ($sniffer.history)
          jqLite(window).bind('popstate', fireUrlChange);
        if ($sniffer.hashchange)
          jqLite(window).bind('hashchange', fireUrlChange);
        else
          self.addPollFn(fireUrlChange);
        urlChangeInit = true;
      }
      urlChangeListeners.push(callback);
      return callback;
    };
    self.baseHref = function () {
      var href = baseElement.attr('href');
      return href ? href.replace(/^https?\:\/\/[^\/]*/, '') : '';
    };
    var lastCookies = {};
    var lastCookieString = '';
    var cookiePath = self.baseHref();
    self.cookies = function (name, value) {
      var cookieLength, cookieArray, cookie, i, index;
      if (name) {
        if (value === undefined) {
          rawDocument.cookie = escape(name) + '=;path=' + cookiePath + ';expires=Thu, 01 Jan 1970 00:00:00 GMT';
        } else {
          if (isString(value)) {
            cookieLength = (rawDocument.cookie = escape(name) + '=' + escape(value) + ';path=' + cookiePath).length + 1;
            if (cookieLength > 4096) {
              $log.warn('Cookie \'' + name + '\' possibly not set or overflowed because it was too large (' + cookieLength + ' > 4096 bytes)!');
            }
          }
        }
      } else {
        if (rawDocument.cookie !== lastCookieString) {
          lastCookieString = rawDocument.cookie;
          cookieArray = lastCookieString.split('; ');
          lastCookies = {};
          for (i = 0; i < cookieArray.length; i++) {
            cookie = cookieArray[i];
            index = cookie.indexOf('=');
            if (index > 0) {
              var name = unescape(cookie.substring(0, index));
              if (lastCookies[name] === undefined) {
                lastCookies[name] = unescape(cookie.substring(index + 1));
              }
            }
          }
        }
        return lastCookies;
      }
    };
    self.defer = function (fn, delay) {
      var timeoutId;
      outstandingRequestCount++;
      timeoutId = setTimeout(function () {
        delete pendingDeferIds[timeoutId];
        completeOutstandingRequest(fn);
      }, delay || 0);
      pendingDeferIds[timeoutId] = true;
      return timeoutId;
    };
    self.defer.cancel = function (deferId) {
      if (pendingDeferIds[deferId]) {
        delete pendingDeferIds[deferId];
        clearTimeout(deferId);
        completeOutstandingRequest(noop);
        return true;
      }
      return false;
    };
  }
  function $BrowserProvider() {
    this.$get = [
      '$window',
      '$log',
      '$sniffer',
      '$document',
      function ($window, $log, $sniffer, $document) {
        return new Browser($window, $document, $log, $sniffer);
      }
    ];
  }
  function $CacheFactoryProvider() {
    this.$get = function () {
      var caches = {};
      function cacheFactory(cacheId, options) {
        if (cacheId in caches) {
          throw Error('cacheId ' + cacheId + ' taken');
        }
        var size = 0, stats = extend({}, options, { id: cacheId }), data = {}, capacity = options && options.capacity || Number.MAX_VALUE, lruHash = {}, freshEnd = null, staleEnd = null;
        return caches[cacheId] = {
          put: function (key, value) {
            var lruEntry = lruHash[key] || (lruHash[key] = { key: key });
            refresh(lruEntry);
            if (isUndefined(value))
              return;
            if (!(key in data))
              size++;
            data[key] = value;
            if (size > capacity) {
              this.remove(staleEnd.key);
            }
          },
          get: function (key) {
            var lruEntry = lruHash[key];
            if (!lruEntry)
              return;
            refresh(lruEntry);
            return data[key];
          },
          remove: function (key) {
            var lruEntry = lruHash[key];
            if (!lruEntry)
              return;
            if (lruEntry == freshEnd)
              freshEnd = lruEntry.p;
            if (lruEntry == staleEnd)
              staleEnd = lruEntry.n;
            link(lruEntry.n, lruEntry.p);
            delete lruHash[key];
            delete data[key];
            size--;
          },
          removeAll: function () {
            data = {};
            size = 0;
            lruHash = {};
            freshEnd = staleEnd = null;
          },
          destroy: function () {
            data = null;
            stats = null;
            lruHash = null;
            delete caches[cacheId];
          },
          info: function () {
            return extend({}, stats, { size: size });
          }
        };
        function refresh(entry) {
          if (entry != freshEnd) {
            if (!staleEnd) {
              staleEnd = entry;
            } else if (staleEnd == entry) {
              staleEnd = entry.n;
            }
            link(entry.n, entry.p);
            link(entry, freshEnd);
            freshEnd = entry;
            freshEnd.n = null;
          }
        }
        function link(nextEntry, prevEntry) {
          if (nextEntry != prevEntry) {
            if (nextEntry)
              nextEntry.p = prevEntry;
            if (prevEntry)
              prevEntry.n = nextEntry;
          }
        }
      }
      cacheFactory.info = function () {
        var info = {};
        forEach(caches, function (cache, cacheId) {
          info[cacheId] = cache.info();
        });
        return info;
      };
      cacheFactory.get = function (cacheId) {
        return caches[cacheId];
      };
      return cacheFactory;
    };
  }
  function $TemplateCacheProvider() {
    this.$get = [
      '$cacheFactory',
      function ($cacheFactory) {
        return $cacheFactory('templates');
      }
    ];
  }
  var NON_ASSIGNABLE_MODEL_EXPRESSION = 'Non-assignable model expression: ';
  $CompileProvider.$inject = ['$provide'];
  function $CompileProvider($provide) {
    var hasDirectives = {}, Suffix = 'Directive', COMMENT_DIRECTIVE_REGEXP = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/, CLASS_DIRECTIVE_REGEXP = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/, MULTI_ROOT_TEMPLATE_ERROR = 'Template must have exactly one root element. was: ', urlSanitizationWhitelist = /^\s*(https?|ftp|mailto|file):/;
    this.directive = function registerDirective(name, directiveFactory) {
      if (isString(name)) {
        assertArg(directiveFactory, 'directive');
        if (!hasDirectives.hasOwnProperty(name)) {
          hasDirectives[name] = [];
          $provide.factory(name + Suffix, [
            '$injector',
            '$exceptionHandler',
            function ($injector, $exceptionHandler) {
              var directives = [];
              forEach(hasDirectives[name], function (directiveFactory) {
                try {
                  var directive = $injector.invoke(directiveFactory);
                  if (isFunction(directive)) {
                    directive = { compile: valueFn(directive) };
                  } else if (!directive.compile && directive.link) {
                    directive.compile = valueFn(directive.link);
                  }
                  directive.priority = directive.priority || 0;
                  directive.name = directive.name || name;
                  directive.require = directive.require || directive.controller && directive.name;
                  directive.restrict = directive.restrict || 'A';
                  directives.push(directive);
                } catch (e) {
                  $exceptionHandler(e);
                }
              });
              return directives;
            }
          ]);
        }
        hasDirectives[name].push(directiveFactory);
      } else {
        forEach(name, reverseParams(registerDirective));
      }
      return this;
    };
    this.urlSanitizationWhitelist = function (regexp) {
      if (isDefined(regexp)) {
        urlSanitizationWhitelist = regexp;
        return this;
      }
      return urlSanitizationWhitelist;
    };
    this.$get = [
      '$injector',
      '$interpolate',
      '$exceptionHandler',
      '$http',
      '$templateCache',
      '$parse',
      '$controller',
      '$rootScope',
      '$document',
      function ($injector, $interpolate, $exceptionHandler, $http, $templateCache, $parse, $controller, $rootScope, $document) {
        var Attributes = function (element, attr) {
          this.$$element = element;
          this.$attr = attr || {};
        };
        Attributes.prototype = {
          $normalize: directiveNormalize,
          $set: function (key, value, writeAttr, attrName) {
            var booleanKey = getBooleanAttrName(this.$$element[0], key), $$observers = this.$$observers, normalizedVal;
            if (booleanKey) {
              this.$$element.prop(key, value);
              attrName = booleanKey;
            }
            this[key] = value;
            if (attrName) {
              this.$attr[key] = attrName;
            } else {
              attrName = this.$attr[key];
              if (!attrName) {
                this.$attr[key] = attrName = snake_case(key, '-');
              }
            }
            if (nodeName_(this.$$element[0]) === 'A' && key === 'href') {
              urlSanitizationNode.setAttribute('href', value);
              normalizedVal = urlSanitizationNode.href;
              if (normalizedVal !== '' && !normalizedVal.match(urlSanitizationWhitelist)) {
                this[key] = value = 'unsafe:' + normalizedVal;
              }
            }
            if (writeAttr !== false) {
              if (value === null || value === undefined) {
                this.$$element.removeAttr(attrName);
              } else {
                this.$$element.attr(attrName, value);
              }
            }
            $$observers && forEach($$observers[key], function (fn) {
              try {
                fn(value);
              } catch (e) {
                $exceptionHandler(e);
              }
            });
          },
          $observe: function (key, fn) {
            var attrs = this, $$observers = attrs.$$observers || (attrs.$$observers = {}), listeners = $$observers[key] || ($$observers[key] = []);
            listeners.push(fn);
            $rootScope.$evalAsync(function () {
              if (!listeners.$$inter) {
                fn(attrs[key]);
              }
            });
            return fn;
          }
        };
        var urlSanitizationNode = $document[0].createElement('a'), startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol(), denormalizeTemplate = startSymbol == '{{' || endSymbol == '}}' ? identity : function denormalizeTemplate(template) {
            return template.replace(/\{\{/g, startSymbol).replace(/}}/g, endSymbol);
          };
        return compile;
        function compile($compileNodes, transcludeFn, maxPriority) {
          if (!($compileNodes instanceof jqLite)) {
            $compileNodes = jqLite($compileNodes);
          }
          forEach($compileNodes, function (node, index) {
            if (node.nodeType == 3 && node.nodeValue.match(/\S+/)) {
              $compileNodes[index] = jqLite(node).wrap('<span></span>').parent()[0];
            }
          });
          var compositeLinkFn = compileNodes($compileNodes, transcludeFn, $compileNodes, maxPriority);
          return function publicLinkFn(scope, cloneConnectFn) {
            assertArg(scope, 'scope');
            var $linkNode = cloneConnectFn ? JQLitePrototype.clone.call($compileNodes) : $compileNodes;
            for (var i = 0, ii = $linkNode.length; i < ii; i++) {
              var node = $linkNode[i];
              if (node.nodeType == 1 || node.nodeType == 9) {
                $linkNode.eq(i).data('$scope', scope);
              }
            }
            safeAddClass($linkNode, 'ng-scope');
            if (cloneConnectFn)
              cloneConnectFn($linkNode, scope);
            if (compositeLinkFn)
              compositeLinkFn(scope, $linkNode, $linkNode);
            return $linkNode;
          };
        }
        function wrongMode(localName, mode) {
          throw Error('Unsupported \'' + mode + '\' for \'' + localName + '\'.');
        }
        function safeAddClass($element, className) {
          try {
            $element.addClass(className);
          } catch (e) {
          }
        }
        function compileNodes(nodeList, transcludeFn, $rootElement, maxPriority) {
          var linkFns = [], nodeLinkFn, childLinkFn, directives, attrs, linkFnFound;
          for (var i = 0; i < nodeList.length; i++) {
            attrs = new Attributes();
            directives = collectDirectives(nodeList[i], [], attrs, maxPriority);
            nodeLinkFn = directives.length ? applyDirectivesToNode(directives, nodeList[i], attrs, transcludeFn, $rootElement) : null;
            childLinkFn = nodeLinkFn && nodeLinkFn.terminal || !nodeList[i].childNodes || !nodeList[i].childNodes.length ? null : compileNodes(nodeList[i].childNodes, nodeLinkFn ? nodeLinkFn.transclude : transcludeFn);
            linkFns.push(nodeLinkFn);
            linkFns.push(childLinkFn);
            linkFnFound = linkFnFound || nodeLinkFn || childLinkFn;
          }
          return linkFnFound ? compositeLinkFn : null;
          function compositeLinkFn(scope, nodeList, $rootElement, boundTranscludeFn) {
            var nodeLinkFn, childLinkFn, node, childScope, childTranscludeFn, i, ii, n;
            var stableNodeList = [];
            for (i = 0, ii = nodeList.length; i < ii; i++) {
              stableNodeList.push(nodeList[i]);
            }
            for (i = 0, n = 0, ii = linkFns.length; i < ii; n++) {
              node = stableNodeList[n];
              nodeLinkFn = linkFns[i++];
              childLinkFn = linkFns[i++];
              if (nodeLinkFn) {
                if (nodeLinkFn.scope) {
                  childScope = scope.$new(isObject(nodeLinkFn.scope));
                  jqLite(node).data('$scope', childScope);
                } else {
                  childScope = scope;
                }
                childTranscludeFn = nodeLinkFn.transclude;
                if (childTranscludeFn || !boundTranscludeFn && transcludeFn) {
                  nodeLinkFn(childLinkFn, childScope, node, $rootElement, function (transcludeFn) {
                    return function (cloneFn) {
                      var transcludeScope = scope.$new();
                      transcludeScope.$$transcluded = true;
                      return transcludeFn(transcludeScope, cloneFn).bind('$destroy', bind(transcludeScope, transcludeScope.$destroy));
                    };
                  }(childTranscludeFn || transcludeFn));
                } else {
                  nodeLinkFn(childLinkFn, childScope, node, undefined, boundTranscludeFn);
                }
              } else if (childLinkFn) {
                childLinkFn(scope, node.childNodes, undefined, boundTranscludeFn);
              }
            }
          }
        }
        function collectDirectives(node, directives, attrs, maxPriority) {
          var nodeType = node.nodeType, attrsMap = attrs.$attr, match, className;
          switch (nodeType) {
          case 1:
            addDirective(directives, directiveNormalize(nodeName_(node).toLowerCase()), 'E', maxPriority);
            for (var attr, name, nName, value, nAttrs = node.attributes, j = 0, jj = nAttrs && nAttrs.length; j < jj; j++) {
              attr = nAttrs[j];
              if (!msie || msie >= 8 || attr.specified) {
                name = attr.name;
                nName = directiveNormalize(name.toLowerCase());
                attrsMap[nName] = name;
                attrs[nName] = value = trim(msie && name == 'href' ? decodeURIComponent(node.getAttribute(name, 2)) : attr.value);
                if (getBooleanAttrName(node, nName)) {
                  attrs[nName] = true;
                }
                addAttrInterpolateDirective(node, directives, value, nName);
                addDirective(directives, nName, 'A', maxPriority);
              }
            }
            className = node.className;
            if (isString(className) && className !== '') {
              while (match = CLASS_DIRECTIVE_REGEXP.exec(className)) {
                nName = directiveNormalize(match[2]);
                if (addDirective(directives, nName, 'C', maxPriority)) {
                  attrs[nName] = trim(match[3]);
                }
                className = className.substr(match.index + match[0].length);
              }
            }
            break;
          case 3:
            addTextInterpolateDirective(directives, node.nodeValue);
            break;
          case 8:
            try {
              match = COMMENT_DIRECTIVE_REGEXP.exec(node.nodeValue);
              if (match) {
                nName = directiveNormalize(match[1]);
                if (addDirective(directives, nName, 'M', maxPriority)) {
                  attrs[nName] = trim(match[2]);
                }
              }
            } catch (e) {
            }
            break;
          }
          directives.sort(byPriority);
          return directives;
        }
        function applyDirectivesToNode(directives, compileNode, templateAttrs, transcludeFn, jqCollection) {
          var terminalPriority = -Number.MAX_VALUE, preLinkFns = [], postLinkFns = [], newScopeDirective = null, newIsolateScopeDirective = null, templateDirective = null, $compileNode = templateAttrs.$$element = jqLite(compileNode), directive, directiveName, $template, transcludeDirective, childTranscludeFn = transcludeFn, controllerDirectives, linkFn, directiveValue;
          for (var i = 0, ii = directives.length; i < ii; i++) {
            directive = directives[i];
            $template = undefined;
            if (terminalPriority > directive.priority) {
              break;
            }
            if (directiveValue = directive.scope) {
              assertNoDuplicate('isolated scope', newIsolateScopeDirective, directive, $compileNode);
              if (isObject(directiveValue)) {
                safeAddClass($compileNode, 'ng-isolate-scope');
                newIsolateScopeDirective = directive;
              }
              safeAddClass($compileNode, 'ng-scope');
              newScopeDirective = newScopeDirective || directive;
            }
            directiveName = directive.name;
            if (directiveValue = directive.controller) {
              controllerDirectives = controllerDirectives || {};
              assertNoDuplicate('\'' + directiveName + '\' controller', controllerDirectives[directiveName], directive, $compileNode);
              controllerDirectives[directiveName] = directive;
            }
            if (directiveValue = directive.transclude) {
              assertNoDuplicate('transclusion', transcludeDirective, directive, $compileNode);
              transcludeDirective = directive;
              terminalPriority = directive.priority;
              if (directiveValue == 'element') {
                $template = jqLite(compileNode);
                $compileNode = templateAttrs.$$element = jqLite(document.createComment(' ' + directiveName + ': ' + templateAttrs[directiveName] + ' '));
                compileNode = $compileNode[0];
                replaceWith(jqCollection, jqLite($template[0]), compileNode);
                childTranscludeFn = compile($template, transcludeFn, terminalPriority);
              } else {
                $template = jqLite(JQLiteClone(compileNode)).contents();
                $compileNode.html('');
                childTranscludeFn = compile($template, transcludeFn);
              }
            }
            if (directiveValue = directive.template) {
              assertNoDuplicate('template', templateDirective, directive, $compileNode);
              templateDirective = directive;
              directiveValue = denormalizeTemplate(directiveValue);
              if (directive.replace) {
                $template = jqLite('<div>' + trim(directiveValue) + '</div>').contents();
                compileNode = $template[0];
                if ($template.length != 1 || compileNode.nodeType !== 1) {
                  throw new Error(MULTI_ROOT_TEMPLATE_ERROR + directiveValue);
                }
                replaceWith(jqCollection, $compileNode, compileNode);
                var newTemplateAttrs = { $attr: {} };
                directives = directives.concat(collectDirectives(compileNode, directives.splice(i + 1, directives.length - (i + 1)), newTemplateAttrs));
                mergeTemplateAttributes(templateAttrs, newTemplateAttrs);
                ii = directives.length;
              } else {
                $compileNode.html(directiveValue);
              }
            }
            if (directive.templateUrl) {
              assertNoDuplicate('template', templateDirective, directive, $compileNode);
              templateDirective = directive;
              nodeLinkFn = compileTemplateUrl(directives.splice(i, directives.length - i), nodeLinkFn, $compileNode, templateAttrs, jqCollection, directive.replace, childTranscludeFn);
              ii = directives.length;
            } else if (directive.compile) {
              try {
                linkFn = directive.compile($compileNode, templateAttrs, childTranscludeFn);
                if (isFunction(linkFn)) {
                  addLinkFns(null, linkFn);
                } else if (linkFn) {
                  addLinkFns(linkFn.pre, linkFn.post);
                }
              } catch (e) {
                $exceptionHandler(e, startingTag($compileNode));
              }
            }
            if (directive.terminal) {
              nodeLinkFn.terminal = true;
              terminalPriority = Math.max(terminalPriority, directive.priority);
            }
          }
          nodeLinkFn.scope = newScopeDirective && newScopeDirective.scope;
          nodeLinkFn.transclude = transcludeDirective && childTranscludeFn;
          return nodeLinkFn;
          function addLinkFns(pre, post) {
            if (pre) {
              pre.require = directive.require;
              preLinkFns.push(pre);
            }
            if (post) {
              post.require = directive.require;
              postLinkFns.push(post);
            }
          }
          function getControllers(require, $element) {
            var value, retrievalMethod = 'data', optional = false;
            if (isString(require)) {
              while ((value = require.charAt(0)) == '^' || value == '?') {
                require = require.substr(1);
                if (value == '^') {
                  retrievalMethod = 'inheritedData';
                }
                optional = optional || value == '?';
              }
              value = $element[retrievalMethod]('$' + require + 'Controller');
              if (!value && !optional) {
                throw Error('No controller: ' + require);
              }
              return value;
            } else if (isArray(require)) {
              value = [];
              forEach(require, function (require) {
                value.push(getControllers(require, $element));
              });
            }
            return value;
          }
          function nodeLinkFn(childLinkFn, scope, linkNode, $rootElement, boundTranscludeFn) {
            var attrs, $element, i, ii, linkFn, controller;
            if (compileNode === linkNode) {
              attrs = templateAttrs;
            } else {
              attrs = shallowCopy(templateAttrs, new Attributes(jqLite(linkNode), templateAttrs.$attr));
            }
            $element = attrs.$$element;
            if (newIsolateScopeDirective) {
              var LOCAL_REGEXP = /^\s*([@=&])\s*(\w*)\s*$/;
              var parentScope = scope.$parent || scope;
              forEach(newIsolateScopeDirective.scope, function (definiton, scopeName) {
                var match = definiton.match(LOCAL_REGEXP) || [], attrName = match[2] || scopeName, mode = match[1], lastValue, parentGet, parentSet;
                scope.$$isolateBindings[scopeName] = mode + attrName;
                switch (mode) {
                case '@': {
                    attrs.$observe(attrName, function (value) {
                      scope[scopeName] = value;
                    });
                    attrs.$$observers[attrName].$$scope = parentScope;
                    break;
                  }
                case '=': {
                    parentGet = $parse(attrs[attrName]);
                    parentSet = parentGet.assign || function () {
                      lastValue = scope[scopeName] = parentGet(parentScope);
                      throw Error(NON_ASSIGNABLE_MODEL_EXPRESSION + attrs[attrName] + ' (directive: ' + newIsolateScopeDirective.name + ')');
                    };
                    lastValue = scope[scopeName] = parentGet(parentScope);
                    scope.$watch(function parentValueWatch() {
                      var parentValue = parentGet(parentScope);
                      if (parentValue !== scope[scopeName]) {
                        if (parentValue !== lastValue) {
                          lastValue = scope[scopeName] = parentValue;
                        } else {
                          parentSet(parentScope, parentValue = lastValue = scope[scopeName]);
                        }
                      }
                      return parentValue;
                    });
                    break;
                  }
                case '&': {
                    parentGet = $parse(attrs[attrName]);
                    scope[scopeName] = function (locals) {
                      return parentGet(parentScope, locals);
                    };
                    break;
                  }
                default: {
                    throw Error('Invalid isolate scope definition for directive ' + newIsolateScopeDirective.name + ': ' + definiton);
                  }
                }
              });
            }
            if (controllerDirectives) {
              forEach(controllerDirectives, function (directive) {
                var locals = {
                    $scope: scope,
                    $element: $element,
                    $attrs: attrs,
                    $transclude: boundTranscludeFn
                  };
                controller = directive.controller;
                if (controller == '@') {
                  controller = attrs[directive.name];
                }
                $element.data('$' + directive.name + 'Controller', $controller(controller, locals));
              });
            }
            for (i = 0, ii = preLinkFns.length; i < ii; i++) {
              try {
                linkFn = preLinkFns[i];
                linkFn(scope, $element, attrs, linkFn.require && getControllers(linkFn.require, $element));
              } catch (e) {
                $exceptionHandler(e, startingTag($element));
              }
            }
            childLinkFn && childLinkFn(scope, linkNode.childNodes, undefined, boundTranscludeFn);
            for (i = 0, ii = postLinkFns.length; i < ii; i++) {
              try {
                linkFn = postLinkFns[i];
                linkFn(scope, $element, attrs, linkFn.require && getControllers(linkFn.require, $element));
              } catch (e) {
                $exceptionHandler(e, startingTag($element));
              }
            }
          }
        }
        function addDirective(tDirectives, name, location, maxPriority) {
          var match = false;
          if (hasDirectives.hasOwnProperty(name)) {
            for (var directive, directives = $injector.get(name + Suffix), i = 0, ii = directives.length; i < ii; i++) {
              try {
                directive = directives[i];
                if ((maxPriority === undefined || maxPriority > directive.priority) && directive.restrict.indexOf(location) != -1) {
                  tDirectives.push(directive);
                  match = true;
                }
              } catch (e) {
                $exceptionHandler(e);
              }
            }
          }
          return match;
        }
        function mergeTemplateAttributes(dst, src) {
          var srcAttr = src.$attr, dstAttr = dst.$attr, $element = dst.$$element;
          forEach(dst, function (value, key) {
            if (key.charAt(0) != '$') {
              if (src[key]) {
                value += (key === 'style' ? ';' : ' ') + src[key];
              }
              dst.$set(key, value, true, srcAttr[key]);
            }
          });
          forEach(src, function (value, key) {
            if (key == 'class') {
              safeAddClass($element, value);
              dst['class'] = (dst['class'] ? dst['class'] + ' ' : '') + value;
            } else if (key == 'style') {
              $element.attr('style', $element.attr('style') + ';' + value);
            } else if (key.charAt(0) != '$' && !dst.hasOwnProperty(key)) {
              dst[key] = value;
              dstAttr[key] = srcAttr[key];
            }
          });
        }
        function compileTemplateUrl(directives, beforeTemplateNodeLinkFn, $compileNode, tAttrs, $rootElement, replace, childTranscludeFn) {
          var linkQueue = [], afterTemplateNodeLinkFn, afterTemplateChildLinkFn, beforeTemplateCompileNode = $compileNode[0], origAsyncDirective = directives.shift(), derivedSyncDirective = extend({}, origAsyncDirective, {
              controller: null,
              templateUrl: null,
              transclude: null,
              scope: null
            });
          $compileNode.html('');
          $http.get(origAsyncDirective.templateUrl, { cache: $templateCache }).success(function (content) {
            var compileNode, tempTemplateAttrs, $template;
            content = denormalizeTemplate(content);
            if (replace) {
              $template = jqLite('<div>' + trim(content) + '</div>').contents();
              compileNode = $template[0];
              if ($template.length != 1 || compileNode.nodeType !== 1) {
                throw new Error(MULTI_ROOT_TEMPLATE_ERROR + content);
              }
              tempTemplateAttrs = { $attr: {} };
              replaceWith($rootElement, $compileNode, compileNode);
              collectDirectives(compileNode, directives, tempTemplateAttrs);
              mergeTemplateAttributes(tAttrs, tempTemplateAttrs);
            } else {
              compileNode = beforeTemplateCompileNode;
              $compileNode.html(content);
            }
            directives.unshift(derivedSyncDirective);
            afterTemplateNodeLinkFn = applyDirectivesToNode(directives, compileNode, tAttrs, childTranscludeFn);
            afterTemplateChildLinkFn = compileNodes($compileNode[0].childNodes, childTranscludeFn);
            while (linkQueue.length) {
              var controller = linkQueue.pop(), linkRootElement = linkQueue.pop(), beforeTemplateLinkNode = linkQueue.pop(), scope = linkQueue.pop(), linkNode = compileNode;
              if (beforeTemplateLinkNode !== beforeTemplateCompileNode) {
                linkNode = JQLiteClone(compileNode);
                replaceWith(linkRootElement, jqLite(beforeTemplateLinkNode), linkNode);
              }
              afterTemplateNodeLinkFn(function () {
                beforeTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, linkNode, $rootElement, controller);
              }, scope, linkNode, $rootElement, controller);
            }
            linkQueue = null;
          }).error(function (response, code, headers, config) {
            throw Error('Failed to load template: ' + config.url);
          });
          return function delayedNodeLinkFn(ignoreChildLinkFn, scope, node, rootElement, controller) {
            if (linkQueue) {
              linkQueue.push(scope);
              linkQueue.push(node);
              linkQueue.push(rootElement);
              linkQueue.push(controller);
            } else {
              afterTemplateNodeLinkFn(function () {
                beforeTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, node, rootElement, controller);
              }, scope, node, rootElement, controller);
            }
          };
        }
        function byPriority(a, b) {
          return b.priority - a.priority;
        }
        function assertNoDuplicate(what, previousDirective, directive, element) {
          if (previousDirective) {
            throw Error('Multiple directives [' + previousDirective.name + ', ' + directive.name + '] asking for ' + what + ' on: ' + startingTag(element));
          }
        }
        function addTextInterpolateDirective(directives, text) {
          var interpolateFn = $interpolate(text, true);
          if (interpolateFn) {
            directives.push({
              priority: 0,
              compile: valueFn(function textInterpolateLinkFn(scope, node) {
                var parent = node.parent(), bindings = parent.data('$binding') || [];
                bindings.push(interpolateFn);
                safeAddClass(parent.data('$binding', bindings), 'ng-binding');
                scope.$watch(interpolateFn, function interpolateFnWatchAction(value) {
                  node[0].nodeValue = value;
                });
              })
            });
          }
        }
        function addAttrInterpolateDirective(node, directives, value, name) {
          var interpolateFn = $interpolate(value, true);
          if (!interpolateFn)
            return;
          directives.push({
            priority: 100,
            compile: valueFn(function attrInterpolateLinkFn(scope, element, attr) {
              var $$observers = attr.$$observers || (attr.$$observers = {});
              if (name === 'class') {
                interpolateFn = $interpolate(attr[name], true);
              }
              attr[name] = undefined;
              ($$observers[name] || ($$observers[name] = [])).$$inter = true;
              (attr.$$observers && attr.$$observers[name].$$scope || scope).$watch(interpolateFn, function interpolateFnWatchAction(value) {
                attr.$set(name, value);
              });
            })
          });
        }
        function replaceWith($rootElement, $element, newNode) {
          var oldNode = $element[0], parent = oldNode.parentNode, i, ii;
          if ($rootElement) {
            for (i = 0, ii = $rootElement.length; i < ii; i++) {
              if ($rootElement[i] == oldNode) {
                $rootElement[i] = newNode;
                break;
              }
            }
          }
          if (parent) {
            parent.replaceChild(newNode, oldNode);
          }
          newNode[jqLite.expando] = oldNode[jqLite.expando];
          $element[0] = newNode;
        }
      }
    ];
  }
  var PREFIX_REGEXP = /^(x[\:\-_]|data[\:\-_])/i;
  function directiveNormalize(name) {
    return camelCase(name.replace(PREFIX_REGEXP, ''));
  }
  function nodesetLinkingFn(scope, nodeList, rootElement, boundTranscludeFn) {
  }
  function directiveLinkingFn(nodesetLinkingFn, scope, node, rootElement, boundTranscludeFn) {
  }
  function $ControllerProvider() {
    var controllers = {};
    this.register = function (name, constructor) {
      if (isObject(name)) {
        extend(controllers, name);
      } else {
        controllers[name] = constructor;
      }
    };
    this.$get = [
      '$injector',
      '$window',
      function ($injector, $window) {
        return function (constructor, locals) {
          if (isString(constructor)) {
            var name = constructor;
            constructor = controllers.hasOwnProperty(name) ? controllers[name] : getter(locals.$scope, name, true) || getter($window, name, true);
            assertArgFn(constructor, name, true);
          }
          return $injector.instantiate(constructor, locals);
        };
      }
    ];
  }
  function $DocumentProvider() {
    this.$get = [
      '$window',
      function (window) {
        return jqLite(window.document);
      }
    ];
  }
  function $ExceptionHandlerProvider() {
    this.$get = [
      '$log',
      function ($log) {
        return function (exception, cause) {
          $log.error.apply($log, arguments);
        };
      }
    ];
  }
  function $InterpolateProvider() {
    var startSymbol = '{{';
    var endSymbol = '}}';
    this.startSymbol = function (value) {
      if (value) {
        startSymbol = value;
        return this;
      } else {
        return startSymbol;
      }
    };
    this.endSymbol = function (value) {
      if (value) {
        endSymbol = value;
        return this;
      } else {
        return endSymbol;
      }
    };
    this.$get = [
      '$parse',
      function ($parse) {
        var startSymbolLength = startSymbol.length, endSymbolLength = endSymbol.length;
        function $interpolate(text, mustHaveExpression) {
          var startIndex, endIndex, index = 0, parts = [], length = text.length, hasInterpolation = false, fn, exp, concat = [];
          while (index < length) {
            if ((startIndex = text.indexOf(startSymbol, index)) != -1 && (endIndex = text.indexOf(endSymbol, startIndex + startSymbolLength)) != -1) {
              index != startIndex && parts.push(text.substring(index, startIndex));
              parts.push(fn = $parse(exp = text.substring(startIndex + startSymbolLength, endIndex)));
              fn.exp = exp;
              index = endIndex + endSymbolLength;
              hasInterpolation = true;
            } else {
              index != length && parts.push(text.substring(index));
              index = length;
            }
          }
          if (!(length = parts.length)) {
            parts.push('');
            length = 1;
          }
          if (!mustHaveExpression || hasInterpolation) {
            concat.length = length;
            fn = function (context) {
              for (var i = 0, ii = length, part; i < ii; i++) {
                if (typeof (part = parts[i]) == 'function') {
                  part = part(context);
                  if (part == null || part == undefined) {
                    part = '';
                  } else if (typeof part != 'string') {
                    part = toJson(part);
                  }
                }
                concat[i] = part;
              }
              return concat.join('');
            };
            fn.exp = text;
            fn.parts = parts;
            return fn;
          }
        }
        $interpolate.startSymbol = function () {
          return startSymbol;
        };
        $interpolate.endSymbol = function () {
          return endSymbol;
        };
        return $interpolate;
      }
    ];
  }
  var URL_MATCH = /^([^:]+):\/\/(\w+:{0,1}\w*@)?(\{?[\w\.-]*\}?)(:([0-9]+))?(\/[^\?#]*)?(\?([^#]*))?(#(.*))?$/, PATH_MATCH = /^([^\?#]*)?(\?([^#]*))?(#(.*))?$/, HASH_MATCH = PATH_MATCH, DEFAULT_PORTS = {
      'http': 80,
      'https': 443,
      'ftp': 21
    };
  function encodePath(path) {
    var segments = path.split('/'), i = segments.length;
    while (i--) {
      segments[i] = encodeUriSegment(segments[i]);
    }
    return segments.join('/');
  }
  function stripHash(url) {
    return url.split('#')[0];
  }
  function matchUrl(url, obj) {
    var match = URL_MATCH.exec(url);
    match = {
      protocol: match[1],
      host: match[3],
      port: int(match[5]) || DEFAULT_PORTS[match[1]] || null,
      path: match[6] || '/',
      search: match[8],
      hash: match[10]
    };
    if (obj) {
      obj.$$protocol = match.protocol;
      obj.$$host = match.host;
      obj.$$port = match.port;
    }
    return match;
  }
  function composeProtocolHostPort(protocol, host, port) {
    return protocol + '://' + host + (port == DEFAULT_PORTS[protocol] ? '' : ':' + port);
  }
  function pathPrefixFromBase(basePath) {
    return basePath.substr(0, basePath.lastIndexOf('/'));
  }
  function convertToHtml5Url(url, basePath, hashPrefix) {
    var match = matchUrl(url);
    if (decodeURIComponent(match.path) != basePath || isUndefined(match.hash) || match.hash.indexOf(hashPrefix) !== 0) {
      return url;
    } else {
      return composeProtocolHostPort(match.protocol, match.host, match.port) + pathPrefixFromBase(basePath) + match.hash.substr(hashPrefix.length);
    }
  }
  function convertToHashbangUrl(url, basePath, hashPrefix) {
    var match = matchUrl(url);
    if (decodeURIComponent(match.path) == basePath && !isUndefined(match.hash) && match.hash.indexOf(hashPrefix) === 0) {
      return url;
    } else {
      var search = match.search && '?' + match.search || '', hash = match.hash && '#' + match.hash || '', pathPrefix = pathPrefixFromBase(basePath), path = match.path.substr(pathPrefix.length);
      if (match.path.indexOf(pathPrefix) !== 0) {
        throw Error('Invalid url "' + url + '", missing path prefix "' + pathPrefix + '" !');
      }
      return composeProtocolHostPort(match.protocol, match.host, match.port) + basePath + '#' + hashPrefix + path + search + hash;
    }
  }
  function LocationUrl(url, pathPrefix, appBaseUrl) {
    pathPrefix = pathPrefix || '';
    this.$$parse = function (newAbsoluteUrl) {
      var match = matchUrl(newAbsoluteUrl, this);
      if (match.path.indexOf(pathPrefix) !== 0) {
        throw Error('Invalid url "' + newAbsoluteUrl + '", missing path prefix "' + pathPrefix + '" !');
      }
      this.$$path = decodeURIComponent(match.path.substr(pathPrefix.length));
      this.$$search = parseKeyValue(match.search);
      this.$$hash = match.hash && decodeURIComponent(match.hash) || '';
      this.$$compose();
    };
    this.$$compose = function () {
      var search = toKeyValue(this.$$search), hash = this.$$hash ? '#' + encodeUriSegment(this.$$hash) : '';
      this.$$url = encodePath(this.$$path) + (search ? '?' + search : '') + hash;
      this.$$absUrl = composeProtocolHostPort(this.$$protocol, this.$$host, this.$$port) + pathPrefix + this.$$url;
    };
    this.$$rewriteAppUrl = function (absoluteLinkUrl) {
      if (absoluteLinkUrl.indexOf(appBaseUrl) == 0) {
        return absoluteLinkUrl;
      }
    };
    this.$$parse(url);
  }
  function LocationHashbangUrl(url, hashPrefix, appBaseUrl) {
    var basePath;
    this.$$parse = function (url) {
      var match = matchUrl(url, this);
      if (match.hash && match.hash.indexOf(hashPrefix) !== 0) {
        throw Error('Invalid url "' + url + '", missing hash prefix "' + hashPrefix + '" !');
      }
      basePath = match.path + (match.search ? '?' + match.search : '');
      match = HASH_MATCH.exec((match.hash || '').substr(hashPrefix.length));
      if (match[1]) {
        this.$$path = (match[1].charAt(0) == '/' ? '' : '/') + decodeURIComponent(match[1]);
      } else {
        this.$$path = '';
      }
      this.$$search = parseKeyValue(match[3]);
      this.$$hash = match[5] && decodeURIComponent(match[5]) || '';
      this.$$compose();
    };
    this.$$compose = function () {
      var search = toKeyValue(this.$$search), hash = this.$$hash ? '#' + encodeUriSegment(this.$$hash) : '';
      this.$$url = encodePath(this.$$path) + (search ? '?' + search : '') + hash;
      this.$$absUrl = composeProtocolHostPort(this.$$protocol, this.$$host, this.$$port) + basePath + (this.$$url ? '#' + hashPrefix + this.$$url : '');
    };
    this.$$rewriteAppUrl = function (absoluteLinkUrl) {
      if (absoluteLinkUrl.indexOf(appBaseUrl) == 0) {
        return absoluteLinkUrl;
      }
    };
    this.$$parse(url);
  }
  LocationUrl.prototype = {
    $$replace: false,
    absUrl: locationGetter('$$absUrl'),
    url: function (url, replace) {
      if (isUndefined(url))
        return this.$$url;
      var match = PATH_MATCH.exec(url);
      if (match[1])
        this.path(decodeURIComponent(match[1]));
      if (match[2] || match[1])
        this.search(match[3] || '');
      this.hash(match[5] || '', replace);
      return this;
    },
    protocol: locationGetter('$$protocol'),
    host: locationGetter('$$host'),
    port: locationGetter('$$port'),
    path: locationGetterSetter('$$path', function (path) {
      return path.charAt(0) == '/' ? path : '/' + path;
    }),
    search: function (search, paramValue) {
      if (isUndefined(search))
        return this.$$search;
      if (isDefined(paramValue)) {
        if (paramValue === null) {
          delete this.$$search[search];
        } else {
          this.$$search[search] = paramValue;
        }
      } else {
        this.$$search = isString(search) ? parseKeyValue(search) : search;
      }
      this.$$compose();
      return this;
    },
    hash: locationGetterSetter('$$hash', identity),
    replace: function () {
      this.$$replace = true;
      return this;
    }
  };
  LocationHashbangUrl.prototype = inherit(LocationUrl.prototype);
  function LocationHashbangInHtml5Url(url, hashPrefix, appBaseUrl, baseExtra) {
    LocationHashbangUrl.apply(this, arguments);
    this.$$rewriteAppUrl = function (absoluteLinkUrl) {
      if (absoluteLinkUrl.indexOf(appBaseUrl) == 0) {
        return appBaseUrl + baseExtra + '#' + hashPrefix + absoluteLinkUrl.substr(appBaseUrl.length);
      }
    };
  }
  LocationHashbangInHtml5Url.prototype = inherit(LocationHashbangUrl.prototype);
  function locationGetter(property) {
    return function () {
      return this[property];
    };
  }
  function locationGetterSetter(property, preprocess) {
    return function (value) {
      if (isUndefined(value))
        return this[property];
      this[property] = preprocess(value);
      this.$$compose();
      return this;
    };
  }
  function $LocationProvider() {
    var hashPrefix = '', html5Mode = false;
    this.hashPrefix = function (prefix) {
      if (isDefined(prefix)) {
        hashPrefix = prefix;
        return this;
      } else {
        return hashPrefix;
      }
    };
    this.html5Mode = function (mode) {
      if (isDefined(mode)) {
        html5Mode = mode;
        return this;
      } else {
        return html5Mode;
      }
    };
    this.$get = [
      '$rootScope',
      '$browser',
      '$sniffer',
      '$rootElement',
      function ($rootScope, $browser, $sniffer, $rootElement) {
        var $location, basePath, pathPrefix, initUrl = $browser.url(), initUrlParts = matchUrl(initUrl), appBaseUrl;
        if (html5Mode) {
          basePath = $browser.baseHref() || '/';
          pathPrefix = pathPrefixFromBase(basePath);
          appBaseUrl = composeProtocolHostPort(initUrlParts.protocol, initUrlParts.host, initUrlParts.port) + pathPrefix + '/';
          if ($sniffer.history) {
            $location = new LocationUrl(convertToHtml5Url(initUrl, basePath, hashPrefix), pathPrefix, appBaseUrl);
          } else {
            $location = new LocationHashbangInHtml5Url(convertToHashbangUrl(initUrl, basePath, hashPrefix), hashPrefix, appBaseUrl, basePath.substr(pathPrefix.length + 1));
          }
        } else {
          appBaseUrl = composeProtocolHostPort(initUrlParts.protocol, initUrlParts.host, initUrlParts.port) + (initUrlParts.path || '') + (initUrlParts.search ? '?' + initUrlParts.search : '') + '#' + hashPrefix + '/';
          $location = new LocationHashbangUrl(initUrl, hashPrefix, appBaseUrl);
        }
        $rootElement.bind('click', function (event) {
          if (event.ctrlKey || event.metaKey || event.which == 2)
            return;
          var elm = jqLite(event.target);
          while (lowercase(elm[0].nodeName) !== 'a') {
            if (elm[0] === $rootElement[0] || !(elm = elm.parent())[0])
              return;
          }
          var absHref = elm.prop('href'), rewrittenUrl = $location.$$rewriteAppUrl(absHref);
          if (absHref && !elm.attr('target') && rewrittenUrl) {
            $location.$$parse(rewrittenUrl);
            $rootScope.$apply();
            event.preventDefault();
            window.angular['ff-684208-preventDefault'] = true;
          }
        });
        if ($location.absUrl() != initUrl) {
          $browser.url($location.absUrl(), true);
        }
        $browser.onUrlChange(function (newUrl) {
          if ($location.absUrl() != newUrl) {
            if ($rootScope.$broadcast('$locationChangeStart', newUrl, $location.absUrl()).defaultPrevented) {
              $browser.url($location.absUrl());
              return;
            }
            $rootScope.$evalAsync(function () {
              var oldUrl = $location.absUrl();
              $location.$$parse(newUrl);
              afterLocationChange(oldUrl);
            });
            if (!$rootScope.$$phase)
              $rootScope.$digest();
          }
        });
        var changeCounter = 0;
        $rootScope.$watch(function $locationWatch() {
          var oldUrl = $browser.url();
          var currentReplace = $location.$$replace;
          if (!changeCounter || oldUrl != $location.absUrl()) {
            changeCounter++;
            $rootScope.$evalAsync(function () {
              if ($rootScope.$broadcast('$locationChangeStart', $location.absUrl(), oldUrl).defaultPrevented) {
                $location.$$parse(oldUrl);
              } else {
                $browser.url($location.absUrl(), currentReplace);
                afterLocationChange(oldUrl);
              }
            });
          }
          $location.$$replace = false;
          return changeCounter;
        });
        return $location;
        function afterLocationChange(oldUrl) {
          $rootScope.$broadcast('$locationChangeSuccess', $location.absUrl(), oldUrl);
        }
      }
    ];
  }
  function $LogProvider() {
    this.$get = [
      '$window',
      function ($window) {
        return {
          log: consoleLog('log'),
          warn: consoleLog('warn'),
          info: consoleLog('info'),
          error: consoleLog('error')
        };
        function formatError(arg) {
          if (arg instanceof Error) {
            if (arg.stack) {
              arg = arg.message && arg.stack.indexOf(arg.message) === -1 ? 'Error: ' + arg.message + '\n' + arg.stack : arg.stack;
            } else if (arg.sourceURL) {
              arg = arg.message + '\n' + arg.sourceURL + ':' + arg.line;
            }
          }
          return arg;
        }
        function consoleLog(type) {
          var console = $window.console || {}, logFn = console[type] || console.log || noop;
          if (logFn.apply) {
            return function () {
              var args = [];
              forEach(arguments, function (arg) {
                args.push(formatError(arg));
              });
              return logFn.apply(console, args);
            };
          }
          return function (arg1, arg2) {
            logFn(arg1, arg2);
          };
        }
      }
    ];
  }
  var OPERATORS = {
      'null': function () {
        return null;
      },
      'true': function () {
        return true;
      },
      'false': function () {
        return false;
      },
      undefined: noop,
      '+': function (self, locals, a, b) {
        a = a(self, locals);
        b = b(self, locals);
        if (isDefined(a)) {
          if (isDefined(b)) {
            return a + b;
          }
          return a;
        }
        return isDefined(b) ? b : undefined;
      },
      '-': function (self, locals, a, b) {
        a = a(self, locals);
        b = b(self, locals);
        return (isDefined(a) ? a : 0) - (isDefined(b) ? b : 0);
      },
      '*': function (self, locals, a, b) {
        return a(self, locals) * b(self, locals);
      },
      '/': function (self, locals, a, b) {
        return a(self, locals) / b(self, locals);
      },
      '%': function (self, locals, a, b) {
        return a(self, locals) % b(self, locals);
      },
      '^': function (self, locals, a, b) {
        return a(self, locals) ^ b(self, locals);
      },
      '=': noop,
      '==': function (self, locals, a, b) {
        return a(self, locals) == b(self, locals);
      },
      '!=': function (self, locals, a, b) {
        return a(self, locals) != b(self, locals);
      },
      '<': function (self, locals, a, b) {
        return a(self, locals) < b(self, locals);
      },
      '>': function (self, locals, a, b) {
        return a(self, locals) > b(self, locals);
      },
      '<=': function (self, locals, a, b) {
        return a(self, locals) <= b(self, locals);
      },
      '>=': function (self, locals, a, b) {
        return a(self, locals) >= b(self, locals);
      },
      '&&': function (self, locals, a, b) {
        return a(self, locals) && b(self, locals);
      },
      '||': function (self, locals, a, b) {
        return a(self, locals) || b(self, locals);
      },
      '&': function (self, locals, a, b) {
        return a(self, locals) & b(self, locals);
      },
      '|': function (self, locals, a, b) {
        return b(self, locals)(self, locals, a(self, locals));
      },
      '!': function (self, locals, a) {
        return !a(self, locals);
      }
    };
  var ESCAPE = {
      'n': '\n',
      'f': '\f',
      'r': '\r',
      't': '\t',
      'v': '\x0B',
      '\'': '\'',
      '"': '"'
    };
  function lex(text, csp) {
    var tokens = [], token, index = 0, json = [], ch, lastCh = ':';
    while (index < text.length) {
      ch = text.charAt(index);
      if (is('"\'')) {
        readString(ch);
      } else if (isNumber(ch) || is('.') && isNumber(peek())) {
        readNumber();
      } else if (isIdent(ch)) {
        readIdent();
        if (was('{,') && json[0] == '{' && (token = tokens[tokens.length - 1])) {
          token.json = token.text.indexOf('.') == -1;
        }
      } else if (is('(){}[].,;:')) {
        tokens.push({
          index: index,
          text: ch,
          json: was(':[,') && is('{[') || is('}]:,')
        });
        if (is('{['))
          json.unshift(ch);
        if (is('}]'))
          json.shift();
        index++;
      } else if (isWhitespace(ch)) {
        index++;
        continue;
      } else {
        var ch2 = ch + peek(), fn = OPERATORS[ch], fn2 = OPERATORS[ch2];
        if (fn2) {
          tokens.push({
            index: index,
            text: ch2,
            fn: fn2
          });
          index += 2;
        } else if (fn) {
          tokens.push({
            index: index,
            text: ch,
            fn: fn,
            json: was('[,:') && is('+-')
          });
          index += 1;
        } else {
          throwError('Unexpected next character ', index, index + 1);
        }
      }
      lastCh = ch;
    }
    return tokens;
    function is(chars) {
      return chars.indexOf(ch) != -1;
    }
    function was(chars) {
      return chars.indexOf(lastCh) != -1;
    }
    function peek() {
      return index + 1 < text.length ? text.charAt(index + 1) : false;
    }
    function isNumber(ch) {
      return '0' <= ch && ch <= '9';
    }
    function isWhitespace(ch) {
      return ch == ' ' || ch == '\r' || ch == '\t' || ch == '\n' || ch == '\x0B' || ch == '\xa0';
    }
    function isIdent(ch) {
      return 'a' <= ch && ch <= 'z' || 'A' <= ch && ch <= 'Z' || '_' == ch || ch == '$';
    }
    function isExpOperator(ch) {
      return ch == '-' || ch == '+' || isNumber(ch);
    }
    function throwError(error, start, end) {
      end = end || index;
      throw Error('Lexer Error: ' + error + ' at column' + (isDefined(start) ? 's ' + start + '-' + index + ' [' + text.substring(start, end) + ']' : ' ' + end) + ' in expression [' + text + '].');
    }
    function readNumber() {
      var number = '';
      var start = index;
      while (index < text.length) {
        var ch = lowercase(text.charAt(index));
        if (ch == '.' || isNumber(ch)) {
          number += ch;
        } else {
          var peekCh = peek();
          if (ch == 'e' && isExpOperator(peekCh)) {
            number += ch;
          } else if (isExpOperator(ch) && peekCh && isNumber(peekCh) && number.charAt(number.length - 1) == 'e') {
            number += ch;
          } else if (isExpOperator(ch) && (!peekCh || !isNumber(peekCh)) && number.charAt(number.length - 1) == 'e') {
            throwError('Invalid exponent');
          } else {
            break;
          }
        }
        index++;
      }
      number = 1 * number;
      tokens.push({
        index: start,
        text: number,
        json: true,
        fn: function () {
          return number;
        }
      });
    }
    function readIdent() {
      var ident = '', start = index, lastDot, peekIndex, methodName, ch;
      while (index < text.length) {
        ch = text.charAt(index);
        if (ch == '.' || isIdent(ch) || isNumber(ch)) {
          if (ch == '.')
            lastDot = index;
          ident += ch;
        } else {
          break;
        }
        index++;
      }
      if (lastDot) {
        peekIndex = index;
        while (peekIndex < text.length) {
          ch = text.charAt(peekIndex);
          if (ch == '(') {
            methodName = ident.substr(lastDot - start + 1);
            ident = ident.substr(0, lastDot - start);
            index = peekIndex;
            break;
          }
          if (isWhitespace(ch)) {
            peekIndex++;
          } else {
            break;
          }
        }
      }
      var token = {
          index: start,
          text: ident
        };
      if (OPERATORS.hasOwnProperty(ident)) {
        token.fn = token.json = OPERATORS[ident];
      } else {
        var getter = getterFn(ident, csp);
        token.fn = extend(function (self, locals) {
          return getter(self, locals);
        }, {
          assign: function (self, value) {
            return setter(self, ident, value);
          }
        });
      }
      tokens.push(token);
      if (methodName) {
        tokens.push({
          index: lastDot,
          text: '.',
          json: false
        });
        tokens.push({
          index: lastDot + 1,
          text: methodName,
          json: false
        });
      }
    }
    function readString(quote) {
      var start = index;
      index++;
      var string = '';
      var rawString = quote;
      var escape = false;
      while (index < text.length) {
        var ch = text.charAt(index);
        rawString += ch;
        if (escape) {
          if (ch == 'u') {
            var hex = text.substring(index + 1, index + 5);
            if (!hex.match(/[\da-f]{4}/i))
              throwError('Invalid unicode escape [\\u' + hex + ']');
            index += 4;
            string += String.fromCharCode(parseInt(hex, 16));
          } else {
            var rep = ESCAPE[ch];
            if (rep) {
              string += rep;
            } else {
              string += ch;
            }
          }
          escape = false;
        } else if (ch == '\\') {
          escape = true;
        } else if (ch == quote) {
          index++;
          tokens.push({
            index: start,
            text: rawString,
            string: string,
            json: true,
            fn: function () {
              return string;
            }
          });
          return;
        } else {
          string += ch;
        }
        index++;
      }
      throwError('Unterminated quote', start);
    }
  }
  function parser(text, json, $filter, csp) {
    var ZERO = valueFn(0), value, tokens = lex(text, csp), assignment = _assignment, functionCall = _functionCall, fieldAccess = _fieldAccess, objectIndex = _objectIndex, filterChain = _filterChain;
    if (json) {
      assignment = logicalOR;
      functionCall = fieldAccess = objectIndex = filterChain = function () {
        throwError('is not valid json', {
          text: text,
          index: 0
        });
      };
      value = primary();
    } else {
      value = statements();
    }
    if (tokens.length !== 0) {
      throwError('is an unexpected token', tokens[0]);
    }
    return value;
    function throwError(msg, token) {
      throw Error('Syntax Error: Token \'' + token.text + '\' ' + msg + ' at column ' + (token.index + 1) + ' of the expression [' + text + '] starting at [' + text.substring(token.index) + '].');
    }
    function peekToken() {
      if (tokens.length === 0)
        throw Error('Unexpected end of expression: ' + text);
      return tokens[0];
    }
    function peek(e1, e2, e3, e4) {
      if (tokens.length > 0) {
        var token = tokens[0];
        var t = token.text;
        if (t == e1 || t == e2 || t == e3 || t == e4 || !e1 && !e2 && !e3 && !e4) {
          return token;
        }
      }
      return false;
    }
    function expect(e1, e2, e3, e4) {
      var token = peek(e1, e2, e3, e4);
      if (token) {
        if (json && !token.json) {
          throwError('is not valid json', token);
        }
        tokens.shift();
        return token;
      }
      return false;
    }
    function consume(e1) {
      if (!expect(e1)) {
        throwError('is unexpected, expecting [' + e1 + ']', peek());
      }
    }
    function unaryFn(fn, right) {
      return function (self, locals) {
        return fn(self, locals, right);
      };
    }
    function binaryFn(left, fn, right) {
      return function (self, locals) {
        return fn(self, locals, left, right);
      };
    }
    function statements() {
      var statements = [];
      while (true) {
        if (tokens.length > 0 && !peek('}', ')', ';', ']'))
          statements.push(filterChain());
        if (!expect(';')) {
          return statements.length == 1 ? statements[0] : function (self, locals) {
            var value;
            for (var i = 0; i < statements.length; i++) {
              var statement = statements[i];
              if (statement)
                value = statement(self, locals);
            }
            return value;
          };
        }
      }
    }
    function _filterChain() {
      var left = expression();
      var token;
      while (true) {
        if (token = expect('|')) {
          left = binaryFn(left, token.fn, filter());
        } else {
          return left;
        }
      }
    }
    function filter() {
      var token = expect();
      var fn = $filter(token.text);
      var argsFn = [];
      while (true) {
        if (token = expect(':')) {
          argsFn.push(expression());
        } else {
          var fnInvoke = function (self, locals, input) {
            var args = [input];
            for (var i = 0; i < argsFn.length; i++) {
              args.push(argsFn[i](self, locals));
            }
            return fn.apply(self, args);
          };
          return function () {
            return fnInvoke;
          };
        }
      }
    }
    function expression() {
      return assignment();
    }
    function _assignment() {
      var left = logicalOR();
      var right;
      var token;
      if (token = expect('=')) {
        if (!left.assign) {
          throwError('implies assignment but [' + text.substring(0, token.index) + '] can not be assigned to', token);
        }
        right = logicalOR();
        return function (scope, locals) {
          return left.assign(scope, right(scope, locals), locals);
        };
      } else {
        return left;
      }
    }
    function logicalOR() {
      var left = logicalAND();
      var token;
      while (true) {
        if (token = expect('||')) {
          left = binaryFn(left, token.fn, logicalAND());
        } else {
          return left;
        }
      }
    }
    function logicalAND() {
      var left = equality();
      var token;
      if (token = expect('&&')) {
        left = binaryFn(left, token.fn, logicalAND());
      }
      return left;
    }
    function equality() {
      var left = relational();
      var token;
      if (token = expect('==', '!=')) {
        left = binaryFn(left, token.fn, equality());
      }
      return left;
    }
    function relational() {
      var left = additive();
      var token;
      if (token = expect('<', '>', '<=', '>=')) {
        left = binaryFn(left, token.fn, relational());
      }
      return left;
    }
    function additive() {
      var left = multiplicative();
      var token;
      while (token = expect('+', '-')) {
        left = binaryFn(left, token.fn, multiplicative());
      }
      return left;
    }
    function multiplicative() {
      var left = unary();
      var token;
      while (token = expect('*', '/', '%')) {
        left = binaryFn(left, token.fn, unary());
      }
      return left;
    }
    function unary() {
      var token;
      if (expect('+')) {
        return primary();
      } else if (token = expect('-')) {
        return binaryFn(ZERO, token.fn, unary());
      } else if (token = expect('!')) {
        return unaryFn(token.fn, unary());
      } else {
        return primary();
      }
    }
    function primary() {
      var primary;
      if (expect('(')) {
        primary = filterChain();
        consume(')');
      } else if (expect('[')) {
        primary = arrayDeclaration();
      } else if (expect('{')) {
        primary = object();
      } else {
        var token = expect();
        primary = token.fn;
        if (!primary) {
          throwError('not a primary expression', token);
        }
      }
      var next, context;
      while (next = expect('(', '[', '.')) {
        if (next.text === '(') {
          primary = functionCall(primary, context);
          context = null;
        } else if (next.text === '[') {
          context = primary;
          primary = objectIndex(primary);
        } else if (next.text === '.') {
          context = primary;
          primary = fieldAccess(primary);
        } else {
          throwError('IMPOSSIBLE');
        }
      }
      return primary;
    }
    function _fieldAccess(object) {
      var field = expect().text;
      var getter = getterFn(field, csp);
      return extend(function (scope, locals, self) {
        return getter(self || object(scope, locals), locals);
      }, {
        assign: function (scope, value, locals) {
          return setter(object(scope, locals), field, value);
        }
      });
    }
    function _objectIndex(obj) {
      var indexFn = expression();
      consume(']');
      return extend(function (self, locals) {
        var o = obj(self, locals), i = indexFn(self, locals), v, p;
        if (!o)
          return undefined;
        v = o[i];
        if (v && v.then) {
          p = v;
          if (!('$$v' in v)) {
            p.$$v = undefined;
            p.then(function (val) {
              p.$$v = val;
            });
          }
          v = v.$$v;
        }
        return v;
      }, {
        assign: function (self, value, locals) {
          return obj(self, locals)[indexFn(self, locals)] = value;
        }
      });
    }
    function _functionCall(fn, contextGetter) {
      var argsFn = [];
      if (peekToken().text != ')') {
        do {
          argsFn.push(expression());
        } while (expect(','));
      }
      consume(')');
      return function (scope, locals) {
        var args = [], context = contextGetter ? contextGetter(scope, locals) : scope;
        for (var i = 0; i < argsFn.length; i++) {
          args.push(argsFn[i](scope, locals));
        }
        var fnPtr = fn(scope, locals, context) || noop;
        return fnPtr.apply ? fnPtr.apply(context, args) : fnPtr(args[0], args[1], args[2], args[3], args[4]);
      };
    }
    function arrayDeclaration() {
      var elementFns = [];
      if (peekToken().text != ']') {
        do {
          elementFns.push(expression());
        } while (expect(','));
      }
      consume(']');
      return function (self, locals) {
        var array = [];
        for (var i = 0; i < elementFns.length; i++) {
          array.push(elementFns[i](self, locals));
        }
        return array;
      };
    }
    function object() {
      var keyValues = [];
      if (peekToken().text != '}') {
        do {
          var token = expect(), key = token.string || token.text;
          consume(':');
          var value = expression();
          keyValues.push({
            key: key,
            value: value
          });
        } while (expect(','));
      }
      consume('}');
      return function (self, locals) {
        var object = {};
        for (var i = 0; i < keyValues.length; i++) {
          var keyValue = keyValues[i];
          object[keyValue.key] = keyValue.value(self, locals);
        }
        return object;
      };
    }
  }
  function setter(obj, path, setValue) {
    var element = path.split('.');
    for (var i = 0; element.length > 1; i++) {
      var key = element.shift();
      var propertyObj = obj[key];
      if (!propertyObj) {
        propertyObj = {};
        obj[key] = propertyObj;
      }
      obj = propertyObj;
    }
    obj[element.shift()] = setValue;
    return setValue;
  }
  var getterFnCache = {};
  function cspSafeGetterFn(key0, key1, key2, key3, key4) {
    return function (scope, locals) {
      var pathVal = locals && locals.hasOwnProperty(key0) ? locals : scope, promise;
      if (pathVal === null || pathVal === undefined)
        return pathVal;
      pathVal = pathVal[key0];
      if (pathVal && pathVal.then) {
        if (!('$$v' in pathVal)) {
          promise = pathVal;
          promise.$$v = undefined;
          promise.then(function (val) {
            promise.$$v = val;
          });
        }
        pathVal = pathVal.$$v;
      }
      if (!key1 || pathVal === null || pathVal === undefined)
        return pathVal;
      pathVal = pathVal[key1];
      if (pathVal && pathVal.then) {
        if (!('$$v' in pathVal)) {
          promise = pathVal;
          promise.$$v = undefined;
          promise.then(function (val) {
            promise.$$v = val;
          });
        }
        pathVal = pathVal.$$v;
      }
      if (!key2 || pathVal === null || pathVal === undefined)
        return pathVal;
      pathVal = pathVal[key2];
      if (pathVal && pathVal.then) {
        if (!('$$v' in pathVal)) {
          promise = pathVal;
          promise.$$v = undefined;
          promise.then(function (val) {
            promise.$$v = val;
          });
        }
        pathVal = pathVal.$$v;
      }
      if (!key3 || pathVal === null || pathVal === undefined)
        return pathVal;
      pathVal = pathVal[key3];
      if (pathVal && pathVal.then) {
        if (!('$$v' in pathVal)) {
          promise = pathVal;
          promise.$$v = undefined;
          promise.then(function (val) {
            promise.$$v = val;
          });
        }
        pathVal = pathVal.$$v;
      }
      if (!key4 || pathVal === null || pathVal === undefined)
        return pathVal;
      pathVal = pathVal[key4];
      if (pathVal && pathVal.then) {
        if (!('$$v' in pathVal)) {
          promise = pathVal;
          promise.$$v = undefined;
          promise.then(function (val) {
            promise.$$v = val;
          });
        }
        pathVal = pathVal.$$v;
      }
      return pathVal;
    };
  }
  function getterFn(path, csp) {
    if (getterFnCache.hasOwnProperty(path)) {
      return getterFnCache[path];
    }
    var pathKeys = path.split('.'), pathKeysLength = pathKeys.length, fn;
    if (csp) {
      fn = pathKeysLength < 6 ? cspSafeGetterFn(pathKeys[0], pathKeys[1], pathKeys[2], pathKeys[3], pathKeys[4]) : function (scope, locals) {
        var i = 0, val;
        do {
          val = cspSafeGetterFn(pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++])(scope, locals);
          locals = undefined;
          scope = val;
        } while (i < pathKeysLength);
        return val;
      };
    } else {
      var code = 'var l, fn, p;\n';
      forEach(pathKeys, function (key, index) {
        code += 'if(s === null || s === undefined) return s;\n' + 'l=s;\n' + 's=' + (index ? 's' : '((k&&k.hasOwnProperty("' + key + '"))?k:s)') + '["' + key + '"]' + ';\n' + 'if (s && s.then) {\n' + ' if (!("$$v" in s)) {\n' + ' p=s;\n' + ' p.$$v = undefined;\n' + ' p.then(function(v) {p.$$v=v;});\n' + '}\n' + ' s=s.$$v\n' + '}\n';
      });
      code += 'return s;';
      fn = Function('s', 'k', code);
      fn.toString = function () {
        return code;
      };
    }
    return getterFnCache[path] = fn;
  }
  function $ParseProvider() {
    var cache = {};
    this.$get = [
      '$filter',
      '$sniffer',
      function ($filter, $sniffer) {
        return function (exp) {
          switch (typeof exp) {
          case 'string':
            return cache.hasOwnProperty(exp) ? cache[exp] : cache[exp] = parser(exp, false, $filter, $sniffer.csp);
          case 'function':
            return exp;
          default:
            return noop;
          }
        };
      }
    ];
  }
  function $QProvider() {
    this.$get = [
      '$rootScope',
      '$exceptionHandler',
      function ($rootScope, $exceptionHandler) {
        return qFactory(function (callback) {
          $rootScope.$evalAsync(callback);
        }, $exceptionHandler);
      }
    ];
  }
  function qFactory(nextTick, exceptionHandler) {
    var defer = function () {
      var pending = [], value, deferred;
      deferred = {
        resolve: function (val) {
          if (pending) {
            var callbacks = pending;
            pending = undefined;
            value = ref(val);
            if (callbacks.length) {
              nextTick(function () {
                var callback;
                for (var i = 0, ii = callbacks.length; i < ii; i++) {
                  callback = callbacks[i];
                  value.then(callback[0], callback[1]);
                }
              });
            }
          }
        },
        reject: function (reason) {
          deferred.resolve(reject(reason));
        },
        promise: {
          then: function (callback, errback) {
            var result = defer();
            var wrappedCallback = function (value) {
              try {
                result.resolve((callback || defaultCallback)(value));
              } catch (e) {
                result.reject(e);
                exceptionHandler(e);
              }
            };
            var wrappedErrback = function (reason) {
              try {
                result.resolve((errback || defaultErrback)(reason));
              } catch (e) {
                result.reject(e);
                exceptionHandler(e);
              }
            };
            if (pending) {
              pending.push([
                wrappedCallback,
                wrappedErrback
              ]);
            } else {
              value.then(wrappedCallback, wrappedErrback);
            }
            return result.promise;
          }
        }
      };
      return deferred;
    };
    var ref = function (value) {
      if (value && value.then)
        return value;
      return {
        then: function (callback) {
          var result = defer();
          nextTick(function () {
            result.resolve(callback(value));
          });
          return result.promise;
        }
      };
    };
    var reject = function (reason) {
      return {
        then: function (callback, errback) {
          var result = defer();
          nextTick(function () {
            result.resolve((errback || defaultErrback)(reason));
          });
          return result.promise;
        }
      };
    };
    var when = function (value, callback, errback) {
      var result = defer(), done;
      var wrappedCallback = function (value) {
        try {
          return (callback || defaultCallback)(value);
        } catch (e) {
          exceptionHandler(e);
          return reject(e);
        }
      };
      var wrappedErrback = function (reason) {
        try {
          return (errback || defaultErrback)(reason);
        } catch (e) {
          exceptionHandler(e);
          return reject(e);
        }
      };
      nextTick(function () {
        ref(value).then(function (value) {
          if (done)
            return;
          done = true;
          result.resolve(ref(value).then(wrappedCallback, wrappedErrback));
        }, function (reason) {
          if (done)
            return;
          done = true;
          result.resolve(wrappedErrback(reason));
        });
      });
      return result.promise;
    };
    function defaultCallback(value) {
      return value;
    }
    function defaultErrback(reason) {
      return reject(reason);
    }
    function all(promises) {
      var deferred = defer(), counter = promises.length, results = [];
      if (counter) {
        forEach(promises, function (promise, index) {
          ref(promise).then(function (value) {
            if (index in results)
              return;
            results[index] = value;
            if (!--counter)
              deferred.resolve(results);
          }, function (reason) {
            if (index in results)
              return;
            deferred.reject(reason);
          });
        });
      } else {
        deferred.resolve(results);
      }
      return deferred.promise;
    }
    return {
      defer: defer,
      reject: reject,
      when: when,
      all: all
    };
  }
  function $RouteProvider() {
    var routes = {};
    this.when = function (path, route) {
      routes[path] = extend({ reloadOnSearch: true }, route);
      if (path) {
        var redirectPath = path[path.length - 1] == '/' ? path.substr(0, path.length - 1) : path + '/';
        routes[redirectPath] = { redirectTo: path };
      }
      return this;
    };
    this.otherwise = function (params) {
      this.when(null, params);
      return this;
    };
    this.$get = [
      '$rootScope',
      '$location',
      '$routeParams',
      '$q',
      '$injector',
      '$http',
      '$templateCache',
      function ($rootScope, $location, $routeParams, $q, $injector, $http, $templateCache) {
        var forceReload = false, $route = {
            routes: routes,
            reload: function () {
              forceReload = true;
              $rootScope.$evalAsync(updateRoute);
            }
          };
        $rootScope.$on('$locationChangeSuccess', updateRoute);
        return $route;
        function switchRouteMatcher(on, when) {
          when = '^' + when.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '$';
          var regex = '', params = [], dst = {};
          var re = /:(\w+)/g, paramMatch, lastMatchedIndex = 0;
          while ((paramMatch = re.exec(when)) !== null) {
            regex += when.slice(lastMatchedIndex, paramMatch.index);
            regex += '([^\\/]*)';
            params.push(paramMatch[1]);
            lastMatchedIndex = re.lastIndex;
          }
          regex += when.substr(lastMatchedIndex);
          var match = on.match(new RegExp(regex));
          if (match) {
            forEach(params, function (name, index) {
              dst[name] = match[index + 1];
            });
          }
          return match ? dst : null;
        }
        function updateRoute() {
          var next = parseRoute(), last = $route.current;
          if (next && last && next.$$route === last.$$route && equals(next.pathParams, last.pathParams) && !next.reloadOnSearch && !forceReload) {
            last.params = next.params;
            copy(last.params, $routeParams);
            $rootScope.$broadcast('$routeUpdate', last);
          } else if (next || last) {
            forceReload = false;
            $rootScope.$broadcast('$routeChangeStart', next, last);
            $route.current = next;
            if (next) {
              if (next.redirectTo) {
                if (isString(next.redirectTo)) {
                  $location.path(interpolate(next.redirectTo, next.params)).search(next.params).replace();
                } else {
                  $location.url(next.redirectTo(next.pathParams, $location.path(), $location.search())).replace();
                }
              }
            }
            $q.when(next).then(function () {
              if (next) {
                var keys = [], values = [], template;
                forEach(next.resolve || {}, function (value, key) {
                  keys.push(key);
                  values.push(isString(value) ? $injector.get(value) : $injector.invoke(value));
                });
                if (isDefined(template = next.template)) {
                } else if (isDefined(template = next.templateUrl)) {
                  template = $http.get(template, { cache: $templateCache }).then(function (response) {
                    return response.data;
                  });
                }
                if (isDefined(template)) {
                  keys.push('$template');
                  values.push(template);
                }
                return $q.all(values).then(function (values) {
                  var locals = {};
                  forEach(values, function (value, index) {
                    locals[keys[index]] = value;
                  });
                  return locals;
                });
              }
            }).then(function (locals) {
              if (next == $route.current) {
                if (next) {
                  next.locals = locals;
                  copy(next.params, $routeParams);
                }
                $rootScope.$broadcast('$routeChangeSuccess', next, last);
              }
            }, function (error) {
              if (next == $route.current) {
                $rootScope.$broadcast('$routeChangeError', next, last, error);
              }
            });
          }
        }
        function parseRoute() {
          var params, match;
          forEach(routes, function (route, path) {
            if (!match && (params = switchRouteMatcher($location.path(), path))) {
              match = inherit(route, {
                params: extend({}, $location.search(), params),
                pathParams: params
              });
              match.$$route = route;
            }
          });
          return match || routes[null] && inherit(routes[null], {
            params: {},
            pathParams: {}
          });
        }
        function interpolate(string, params) {
          var result = [];
          forEach((string || '').split(':'), function (segment, i) {
            if (i == 0) {
              result.push(segment);
            } else {
              var segmentMatch = segment.match(/(\w+)(.*)/);
              var key = segmentMatch[1];
              result.push(params[key]);
              result.push(segmentMatch[2] || '');
              delete params[key];
            }
          });
          return result.join('');
        }
      }
    ];
  }
  function $RouteParamsProvider() {
    this.$get = valueFn({});
  }
  function $RootScopeProvider() {
    var TTL = 10;
    this.digestTtl = function (value) {
      if (arguments.length) {
        TTL = value;
      }
      return TTL;
    };
    this.$get = [
      '$injector',
      '$exceptionHandler',
      '$parse',
      function ($injector, $exceptionHandler, $parse) {
        function Scope() {
          this.$id = nextUid();
          this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
          this['this'] = this.$root = this;
          this.$$destroyed = false;
          this.$$asyncQueue = [];
          this.$$listeners = {};
          this.$$isolateBindings = {};
        }
        Scope.prototype = {
          $new: function (isolate) {
            var Child, child;
            if (isFunction(isolate)) {
              throw Error('API-CHANGE: Use $controller to instantiate controllers.');
            }
            if (isolate) {
              child = new Scope();
              child.$root = this.$root;
            } else {
              Child = function () {
              };
              Child.prototype = this;
              child = new Child();
              child.$id = nextUid();
            }
            child['this'] = child;
            child.$$listeners = {};
            child.$parent = this;
            child.$$asyncQueue = [];
            child.$$watchers = child.$$nextSibling = child.$$childHead = child.$$childTail = null;
            child.$$prevSibling = this.$$childTail;
            if (this.$$childHead) {
              this.$$childTail.$$nextSibling = child;
              this.$$childTail = child;
            } else {
              this.$$childHead = this.$$childTail = child;
            }
            return child;
          },
          $watch: function (watchExp, listener, objectEquality) {
            var scope = this, get = compileToFn(watchExp, 'watch'), array = scope.$$watchers, watcher = {
                fn: listener,
                last: initWatchVal,
                get: get,
                exp: watchExp,
                eq: !!objectEquality
              };
            if (!isFunction(listener)) {
              var listenFn = compileToFn(listener || noop, 'listener');
              watcher.fn = function (newVal, oldVal, scope) {
                listenFn(scope);
              };
            }
            if (!array) {
              array = scope.$$watchers = [];
            }
            array.unshift(watcher);
            return function () {
              arrayRemove(array, watcher);
            };
          },
          $digest: function () {
            var watch, value, last, watchers, asyncQueue, length, dirty, ttl = TTL, next, current, target = this, watchLog = [], logIdx, logMsg;
            beginPhase('$digest');
            do {
              dirty = false;
              current = target;
              do {
                asyncQueue = current.$$asyncQueue;
                while (asyncQueue.length) {
                  try {
                    current.$eval(asyncQueue.shift());
                  } catch (e) {
                    $exceptionHandler(e);
                  }
                }
                if (watchers = current.$$watchers) {
                  length = watchers.length;
                  while (length--) {
                    try {
                      watch = watchers[length];
                      if (watch && (value = watch.get(current)) !== (last = watch.last) && !(watch.eq ? equals(value, last) : typeof value == 'number' && typeof last == 'number' && isNaN(value) && isNaN(last))) {
                        dirty = true;
                        watch.last = watch.eq ? copy(value) : value;
                        watch.fn(value, last === initWatchVal ? value : last, current);
                        if (ttl < 5) {
                          logIdx = 4 - ttl;
                          if (!watchLog[logIdx])
                            watchLog[logIdx] = [];
                          logMsg = isFunction(watch.exp) ? 'fn: ' + (watch.exp.name || watch.exp.toString()) : watch.exp;
                          logMsg += '; newVal: ' + toJson(value) + '; oldVal: ' + toJson(last);
                          watchLog[logIdx].push(logMsg);
                        }
                      }
                    } catch (e) {
                      $exceptionHandler(e);
                    }
                  }
                }
                if (!(next = current.$$childHead || current !== target && current.$$nextSibling)) {
                  while (current !== target && !(next = current.$$nextSibling)) {
                    current = current.$parent;
                  }
                }
              } while (current = next);
              if (dirty && !ttl--) {
                clearPhase();
                throw Error(TTL + ' $digest() iterations reached. Aborting!\n' + 'Watchers fired in the last 5 iterations: ' + toJson(watchLog));
              }
            } while (dirty || asyncQueue.length);
            clearPhase();
          },
          $destroy: function () {
            if ($rootScope == this || this.$$destroyed)
              return;
            var parent = this.$parent;
            this.$broadcast('$destroy');
            this.$$destroyed = true;
            if (parent.$$childHead == this)
              parent.$$childHead = this.$$nextSibling;
            if (parent.$$childTail == this)
              parent.$$childTail = this.$$prevSibling;
            if (this.$$prevSibling)
              this.$$prevSibling.$$nextSibling = this.$$nextSibling;
            if (this.$$nextSibling)
              this.$$nextSibling.$$prevSibling = this.$$prevSibling;
            this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
          },
          $eval: function (expr, locals) {
            return $parse(expr)(this, locals);
          },
          $evalAsync: function (expr) {
            this.$$asyncQueue.push(expr);
          },
          $apply: function (expr) {
            try {
              beginPhase('$apply');
              return this.$eval(expr);
            } catch (e) {
              $exceptionHandler(e);
            } finally {
              clearPhase();
              try {
                $rootScope.$digest();
              } catch (e) {
                $exceptionHandler(e);
                throw e;
              }
            }
          },
          $on: function (name, listener) {
            var namedListeners = this.$$listeners[name];
            if (!namedListeners) {
              this.$$listeners[name] = namedListeners = [];
            }
            namedListeners.push(listener);
            return function () {
              namedListeners[indexOf(namedListeners, listener)] = null;
            };
          },
          $emit: function (name, args) {
            var empty = [], namedListeners, scope = this, stopPropagation = false, event = {
                name: name,
                targetScope: scope,
                stopPropagation: function () {
                  stopPropagation = true;
                },
                preventDefault: function () {
                  event.defaultPrevented = true;
                },
                defaultPrevented: false
              }, listenerArgs = concat([event], arguments, 1), i, length;
            do {
              namedListeners = scope.$$listeners[name] || empty;
              event.currentScope = scope;
              for (i = 0, length = namedListeners.length; i < length; i++) {
                if (!namedListeners[i]) {
                  namedListeners.splice(i, 1);
                  i--;
                  length--;
                  continue;
                }
                try {
                  namedListeners[i].apply(null, listenerArgs);
                  if (stopPropagation)
                    return event;
                } catch (e) {
                  $exceptionHandler(e);
                }
              }
              scope = scope.$parent;
            } while (scope);
            return event;
          },
          $broadcast: function (name, args) {
            var target = this, current = target, next = target, event = {
                name: name,
                targetScope: target,
                preventDefault: function () {
                  event.defaultPrevented = true;
                },
                defaultPrevented: false
              }, listenerArgs = concat([event], arguments, 1), listeners, i, length;
            do {
              current = next;
              event.currentScope = current;
              listeners = current.$$listeners[name] || [];
              for (i = 0, length = listeners.length; i < length; i++) {
                if (!listeners[i]) {
                  listeners.splice(i, 1);
                  i--;
                  length--;
                  continue;
                }
                try {
                  listeners[i].apply(null, listenerArgs);
                } catch (e) {
                  $exceptionHandler(e);
                }
              }
              if (!(next = current.$$childHead || current !== target && current.$$nextSibling)) {
                while (current !== target && !(next = current.$$nextSibling)) {
                  current = current.$parent;
                }
              }
            } while (current = next);
            return event;
          }
        };
        var $rootScope = new Scope();
        return $rootScope;
        function beginPhase(phase) {
          if ($rootScope.$$phase) {
            throw Error($rootScope.$$phase + ' already in progress');
          }
          $rootScope.$$phase = phase;
        }
        function clearPhase() {
          $rootScope.$$phase = null;
        }
        function compileToFn(exp, name) {
          var fn = $parse(exp);
          assertArgFn(fn, name);
          return fn;
        }
        function initWatchVal() {
        }
      }
    ];
  }
  function $SnifferProvider() {
    this.$get = [
      '$window',
      function ($window) {
        var eventSupport = {}, android = int((/android (\d+)/.exec(lowercase($window.navigator.userAgent)) || [])[1]);
        return {
          history: !!($window.history && $window.history.pushState && !(android < 4)),
          hashchange: 'onhashchange' in $window && (!$window.document.documentMode || $window.document.documentMode > 7),
          hasEvent: function (event) {
            if (event == 'input' && msie == 9)
              return false;
            if (isUndefined(eventSupport[event])) {
              var divElm = $window.document.createElement('div');
              eventSupport[event] = 'on' + event in divElm;
            }
            return eventSupport[event];
          },
          csp: false
        };
      }
    ];
  }
  function $WindowProvider() {
    this.$get = valueFn(window);
  }
  function parseHeaders(headers) {
    var parsed = {}, key, val, i;
    if (!headers)
      return parsed;
    forEach(headers.split('\n'), function (line) {
      i = line.indexOf(':');
      key = lowercase(trim(line.substr(0, i)));
      val = trim(line.substr(i + 1));
      if (key) {
        if (parsed[key]) {
          parsed[key] += ', ' + val;
        } else {
          parsed[key] = val;
        }
      }
    });
    return parsed;
  }
  function headersGetter(headers) {
    var headersObj = isObject(headers) ? headers : undefined;
    return function (name) {
      if (!headersObj)
        headersObj = parseHeaders(headers);
      if (name) {
        return headersObj[lowercase(name)] || null;
      }
      return headersObj;
    };
  }
  function transformData(data, headers, fns) {
    if (isFunction(fns))
      return fns(data, headers);
    forEach(fns, function (fn) {
      data = fn(data, headers);
    });
    return data;
  }
  function isSuccess(status) {
    return 200 <= status && status < 300;
  }
  function $HttpProvider() {
    var JSON_START = /^\s*(\[|\{[^\{])/, JSON_END = /[\}\]]\s*$/, PROTECTION_PREFIX = /^\)\]\}',?\n/;
    var $config = this.defaults = {
        transformResponse: [function (data) {
            if (isString(data)) {
              data = data.replace(PROTECTION_PREFIX, '');
              if (JSON_START.test(data) && JSON_END.test(data))
                data = fromJson(data, true);
            }
            return data;
          }],
        transformRequest: [function (d) {
            return isObject(d) && !isFile(d) ? toJson(d) : d;
          }],
        headers: {
          common: {
            'Accept': 'application/json, text/plain, */*',
            'X-Requested-With': 'XMLHttpRequest'
          },
          post: { 'Content-Type': 'application/json;charset=utf-8' },
          put: { 'Content-Type': 'application/json;charset=utf-8' }
        }
      };
    var providerResponseInterceptors = this.responseInterceptors = [];
    this.$get = [
      '$httpBackend',
      '$browser',
      '$cacheFactory',
      '$rootScope',
      '$q',
      '$injector',
      function ($httpBackend, $browser, $cacheFactory, $rootScope, $q, $injector) {
        var defaultCache = $cacheFactory('$http'), responseInterceptors = [];
        forEach(providerResponseInterceptors, function (interceptor) {
          responseInterceptors.push(isString(interceptor) ? $injector.get(interceptor) : $injector.invoke(interceptor));
        });
        function $http(config) {
          config.method = uppercase(config.method);
          var reqTransformFn = config.transformRequest || $config.transformRequest, respTransformFn = config.transformResponse || $config.transformResponse, reqHeaders = extend({}, config.headers), defHeaders = extend({ 'X-XSRF-TOKEN': $browser.cookies()['XSRF-TOKEN'] }, $config.headers.common, $config.headers[lowercase(config.method)]), reqData, defHeaderName, lowercaseDefHeaderName, headerName, promise;
          defaultHeadersIteration:
            for (defHeaderName in defHeaders) {
              lowercaseDefHeaderName = lowercase(defHeaderName);
              for (headerName in config.headers) {
                if (lowercase(headerName) === lowercaseDefHeaderName) {
                  continue defaultHeadersIteration;
                }
              }
              reqHeaders[defHeaderName] = defHeaders[defHeaderName];
            }
          if (isUndefined(config.data)) {
            for (var header in reqHeaders) {
              if (lowercase(header) === 'content-type') {
                delete reqHeaders[header];
                break;
              }
            }
          }
          reqData = transformData(config.data, headersGetter(reqHeaders), reqTransformFn);
          promise = sendReq(config, reqData, reqHeaders);
          promise = promise.then(transformResponse, transformResponse);
          forEach(responseInterceptors, function (interceptor) {
            promise = interceptor(promise);
          });
          promise.success = function (fn) {
            promise.then(function (response) {
              fn(response.data, response.status, response.headers, config);
            });
            return promise;
          };
          promise.error = function (fn) {
            promise.then(null, function (response) {
              fn(response.data, response.status, response.headers, config);
            });
            return promise;
          };
          return promise;
          function transformResponse(response) {
            var resp = extend({}, response, { data: transformData(response.data, response.headers, respTransformFn) });
            return isSuccess(response.status) ? resp : $q.reject(resp);
          }
        }
        $http.pendingRequests = [];
        createShortMethods('get', 'delete', 'head', 'jsonp');
        createShortMethodsWithData('post', 'put');
        $http.defaults = $config;
        return $http;
        function createShortMethods(names) {
          forEach(arguments, function (name) {
            $http[name] = function (url, config) {
              return $http(extend(config || {}, {
                method: name,
                url: url
              }));
            };
          });
        }
        function createShortMethodsWithData(name) {
          forEach(arguments, function (name) {
            $http[name] = function (url, data, config) {
              return $http(extend(config || {}, {
                method: name,
                url: url,
                data: data
              }));
            };
          });
        }
        function sendReq(config, reqData, reqHeaders) {
          var deferred = $q.defer(), promise = deferred.promise, cache, cachedResp, url = buildUrl(config.url, config.params);
          $http.pendingRequests.push(config);
          promise.then(removePendingReq, removePendingReq);
          if (config.cache && config.method == 'GET') {
            cache = isObject(config.cache) ? config.cache : defaultCache;
          }
          if (cache) {
            cachedResp = cache.get(url);
            if (cachedResp) {
              if (cachedResp.then) {
                cachedResp.then(removePendingReq, removePendingReq);
                return cachedResp;
              } else {
                if (isArray(cachedResp)) {
                  resolvePromise(cachedResp[1], cachedResp[0], copy(cachedResp[2]));
                } else {
                  resolvePromise(cachedResp, 200, {});
                }
              }
            } else {
              cache.put(url, promise);
            }
          }
          if (!cachedResp) {
            $httpBackend(config.method, url, reqData, done, reqHeaders, config.timeout, config.withCredentials);
          }
          return promise;
          function done(status, response, headersString) {
            if (cache) {
              if (isSuccess(status)) {
                cache.put(url, [
                  status,
                  response,
                  parseHeaders(headersString)
                ]);
              } else {
                cache.remove(url);
              }
            }
            resolvePromise(response, status, headersString);
            $rootScope.$apply();
          }
          function resolvePromise(response, status, headers) {
            status = Math.max(status, 0);
            (isSuccess(status) ? deferred.resolve : deferred.reject)({
              data: response,
              status: status,
              headers: headersGetter(headers),
              config: config
            });
          }
          function removePendingReq() {
            var idx = indexOf($http.pendingRequests, config);
            if (idx !== -1)
              $http.pendingRequests.splice(idx, 1);
          }
        }
        function buildUrl(url, params) {
          if (!params)
            return url;
          var parts = [];
          forEachSorted(params, function (value, key) {
            if (value == null || value == undefined)
              return;
            if (isObject(value)) {
              value = toJson(value);
            }
            parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
          });
          return url + (url.indexOf('?') == -1 ? '?' : '&') + parts.join('&');
        }
      }
    ];
  }
  var XHR = window.XMLHttpRequest || function () {
      try {
        return new ActiveXObject('Msxml2.XMLHTTP.6.0');
      } catch (e1) {
      }
      try {
        return new ActiveXObject('Msxml2.XMLHTTP.3.0');
      } catch (e2) {
      }
      try {
        return new ActiveXObject('Msxml2.XMLHTTP');
      } catch (e3) {
      }
      throw new Error('This browser does not support XMLHttpRequest.');
    };
  function $HttpBackendProvider() {
    this.$get = [
      '$browser',
      '$window',
      '$document',
      function ($browser, $window, $document) {
        return createHttpBackend($browser, XHR, $browser.defer, $window.angular.callbacks, $document[0], $window.location.protocol.replace(':', ''));
      }
    ];
  }
  function createHttpBackend($browser, XHR, $browserDefer, callbacks, rawDocument, locationProtocol) {
    return function (method, url, post, callback, headers, timeout, withCredentials) {
      $browser.$$incOutstandingRequestCount();
      url = url || $browser.url();
      if (lowercase(method) == 'jsonp') {
        var callbackId = '_' + (callbacks.counter++).toString(36);
        callbacks[callbackId] = function (data) {
          callbacks[callbackId].data = data;
        };
        jsonpReq(url.replace('JSON_CALLBACK', 'angular.callbacks.' + callbackId), function () {
          if (callbacks[callbackId].data) {
            completeRequest(callback, 200, callbacks[callbackId].data);
          } else {
            completeRequest(callback, -2);
          }
          delete callbacks[callbackId];
        });
      } else {
        var xhr = new XHR();
        xhr.open(method, url, true);
        forEach(headers, function (value, key) {
          if (value)
            xhr.setRequestHeader(key, value);
        });
        var status;
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            var responseHeaders = xhr.getAllResponseHeaders();
            var value, simpleHeaders = [
                'Cache-Control',
                'Content-Language',
                'Content-Type',
                'Expires',
                'Last-Modified',
                'Pragma'
              ];
            if (!responseHeaders) {
              responseHeaders = '';
              forEach(simpleHeaders, function (header) {
                var value = xhr.getResponseHeader(header);
                if (value) {
                  responseHeaders += header + ': ' + value + '\n';
                }
              });
            }
            completeRequest(callback, status || xhr.status, xhr.responseText, responseHeaders);
          }
        };
        if (withCredentials) {
          xhr.withCredentials = true;
        }
        xhr.send(post || '');
        if (timeout > 0) {
          $browserDefer(function () {
            status = -1;
            xhr.abort();
          }, timeout);
        }
      }
      function completeRequest(callback, status, response, headersString) {
        var protocol = (url.match(URL_MATCH) || [
            '',
            locationProtocol
          ])[1];
        status = protocol == 'file' ? response ? 200 : 404 : status;
        status = status == 1223 ? 204 : status;
        callback(status, response, headersString);
        $browser.$$completeOutstandingRequest(noop);
      }
    };
    function jsonpReq(url, done) {
      var script = rawDocument.createElement('script'), doneWrapper = function () {
          rawDocument.body.removeChild(script);
          if (done)
            done();
        };
      script.type = 'text/javascript';
      script.src = url;
      if (msie) {
        script.onreadystatechange = function () {
          if (/loaded|complete/.test(script.readyState))
            doneWrapper();
        };
      } else {
        script.onload = script.onerror = doneWrapper;
      }
      rawDocument.body.appendChild(script);
    }
  }
  function $LocaleProvider() {
    this.$get = function () {
      return {
        id: 'en-us',
        NUMBER_FORMATS: {
          DECIMAL_SEP: '.',
          GROUP_SEP: ',',
          PATTERNS: [
            {
              minInt: 1,
              minFrac: 0,
              maxFrac: 3,
              posPre: '',
              posSuf: '',
              negPre: '-',
              negSuf: '',
              gSize: 3,
              lgSize: 3
            },
            {
              minInt: 1,
              minFrac: 2,
              maxFrac: 2,
              posPre: '\xa4',
              posSuf: '',
              negPre: '(\xa4',
              negSuf: ')',
              gSize: 3,
              lgSize: 3
            }
          ],
          CURRENCY_SYM: '$'
        },
        DATETIME_FORMATS: {
          MONTH: 'January,February,March,April,May,June,July,August,September,October,November,December'.split(','),
          SHORTMONTH: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),
          DAY: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
          SHORTDAY: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(','),
          AMPMS: [
            'AM',
            'PM'
          ],
          medium: 'MMM d, y h:mm:ss a',
          short: 'M/d/yy h:mm a',
          fullDate: 'EEEE, MMMM d, y',
          longDate: 'MMMM d, y',
          mediumDate: 'MMM d, y',
          shortDate: 'M/d/yy',
          mediumTime: 'h:mm:ss a',
          shortTime: 'h:mm a'
        },
        pluralCat: function (num) {
          if (num === 1) {
            return 'one';
          }
          return 'other';
        }
      };
    };
  }
  function $TimeoutProvider() {
    this.$get = [
      '$rootScope',
      '$browser',
      '$q',
      '$exceptionHandler',
      function ($rootScope, $browser, $q, $exceptionHandler) {
        var deferreds = {};
        function timeout(fn, delay, invokeApply) {
          var deferred = $q.defer(), promise = deferred.promise, skipApply = isDefined(invokeApply) && !invokeApply, timeoutId, cleanup;
          timeoutId = $browser.defer(function () {
            try {
              deferred.resolve(fn());
            } catch (e) {
              deferred.reject(e);
              $exceptionHandler(e);
            } finally {
              delete deferreds[promise.$$timeoutId];
            }
            if (!skipApply)
              $rootScope.$apply();
          }, delay);
          promise.$$timeoutId = timeoutId;
          deferreds[timeoutId] = deferred;
          return promise;
        }
        timeout.cancel = function (promise) {
          if (promise && promise.$$timeoutId in deferreds) {
            deferreds[promise.$$timeoutId].reject('canceled');
            delete deferreds[promise.$$timeoutId];
            return $browser.defer.cancel(promise.$$timeoutId);
          }
          return false;
        };
        return timeout;
      }
    ];
  }
  $FilterProvider.$inject = ['$provide'];
  function $FilterProvider($provide) {
    var suffix = 'Filter';
    function register(name, factory) {
      return $provide.factory(name + suffix, factory);
    }
    this.register = register;
    this.$get = [
      '$injector',
      function ($injector) {
        return function (name) {
          return $injector.get(name + suffix);
        };
      }
    ];
    register('currency', currencyFilter);
    register('date', dateFilter);
    register('filter', filterFilter);
    register('json', jsonFilter);
    register('limitTo', limitToFilter);
    register('lowercase', lowercaseFilter);
    register('number', numberFilter);
    register('orderBy', orderByFilter);
    register('uppercase', uppercaseFilter);
  }
  function filterFilter() {
    return function (array, expression) {
      if (!isArray(array))
        return array;
      var predicates = [];
      predicates.check = function (value) {
        for (var j = 0; j < predicates.length; j++) {
          if (!predicates[j](value)) {
            return false;
          }
        }
        return true;
      };
      var search = function (obj, text) {
        if (text.charAt(0) === '!') {
          return !search(obj, text.substr(1));
        }
        switch (typeof obj) {
        case 'boolean':
        case 'number':
        case 'string':
          return ('' + obj).toLowerCase().indexOf(text) > -1;
        case 'object':
          for (var objKey in obj) {
            if (objKey.charAt(0) !== '$' && search(obj[objKey], text)) {
              return true;
            }
          }
          return false;
        case 'array':
          for (var i = 0; i < obj.length; i++) {
            if (search(obj[i], text)) {
              return true;
            }
          }
          return false;
        default:
          return false;
        }
      };
      switch (typeof expression) {
      case 'boolean':
      case 'number':
      case 'string':
        expression = { $: expression };
      case 'object':
        for (var key in expression) {
          if (key == '$') {
            (function () {
              var text = ('' + expression[key]).toLowerCase();
              if (!text)
                return;
              predicates.push(function (value) {
                return search(value, text);
              });
            }());
          } else {
            (function () {
              var path = key;
              var text = ('' + expression[key]).toLowerCase();
              if (!text)
                return;
              predicates.push(function (value) {
                return search(getter(value, path), text);
              });
            }());
          }
        }
        break;
      case 'function':
        predicates.push(expression);
        break;
      default:
        return array;
      }
      var filtered = [];
      for (var j = 0; j < array.length; j++) {
        var value = array[j];
        if (predicates.check(value)) {
          filtered.push(value);
        }
      }
      return filtered;
    };
  }
  currencyFilter.$inject = ['$locale'];
  function currencyFilter($locale) {
    var formats = $locale.NUMBER_FORMATS;
    return function (amount, currencySymbol) {
      if (isUndefined(currencySymbol))
        currencySymbol = formats.CURRENCY_SYM;
      return formatNumber(amount, formats.PATTERNS[1], formats.GROUP_SEP, formats.DECIMAL_SEP, 2).replace(/\u00A4/g, currencySymbol);
    };
  }
  numberFilter.$inject = ['$locale'];
  function numberFilter($locale) {
    var formats = $locale.NUMBER_FORMATS;
    return function (number, fractionSize) {
      return formatNumber(number, formats.PATTERNS[0], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize);
    };
  }
  var DECIMAL_SEP = '.';
  function formatNumber(number, pattern, groupSep, decimalSep, fractionSize) {
    if (isNaN(number) || !isFinite(number))
      return '';
    var isNegative = number < 0;
    number = Math.abs(number);
    var numStr = number + '', formatedText = '', parts = [];
    var hasExponent = false;
    if (numStr.indexOf('e') !== -1) {
      var match = numStr.match(/([\d\.]+)e(-?)(\d+)/);
      if (match && match[2] == '-' && match[3] > fractionSize + 1) {
        numStr = '0';
      } else {
        formatedText = numStr;
        hasExponent = true;
      }
    }
    if (!hasExponent) {
      var fractionLen = (numStr.split(DECIMAL_SEP)[1] || '').length;
      if (isUndefined(fractionSize)) {
        fractionSize = Math.min(Math.max(pattern.minFrac, fractionLen), pattern.maxFrac);
      }
      var pow = Math.pow(10, fractionSize);
      number = Math.round(number * pow) / pow;
      var fraction = ('' + number).split(DECIMAL_SEP);
      var whole = fraction[0];
      fraction = fraction[1] || '';
      var pos = 0, lgroup = pattern.lgSize, group = pattern.gSize;
      if (whole.length >= lgroup + group) {
        pos = whole.length - lgroup;
        for (var i = 0; i < pos; i++) {
          if ((pos - i) % group === 0 && i !== 0) {
            formatedText += groupSep;
          }
          formatedText += whole.charAt(i);
        }
      }
      for (i = pos; i < whole.length; i++) {
        if ((whole.length - i) % lgroup === 0 && i !== 0) {
          formatedText += groupSep;
        }
        formatedText += whole.charAt(i);
      }
      while (fraction.length < fractionSize) {
        fraction += '0';
      }
      if (fractionSize && fractionSize !== '0')
        formatedText += decimalSep + fraction.substr(0, fractionSize);
    } else {
      if (fractionSize > 0 && number > -1 && number < 1) {
        formatedText = number.toFixed(fractionSize);
      }
    }
    parts.push(isNegative ? pattern.negPre : pattern.posPre);
    parts.push(formatedText);
    parts.push(isNegative ? pattern.negSuf : pattern.posSuf);
    return parts.join('');
  }
  function padNumber(num, digits, trim) {
    var neg = '';
    if (num < 0) {
      neg = '-';
      num = -num;
    }
    num = '' + num;
    while (num.length < digits)
      num = '0' + num;
    if (trim)
      num = num.substr(num.length - digits);
    return neg + num;
  }
  function dateGetter(name, size, offset, trim) {
    offset = offset || 0;
    return function (date) {
      var value = date['get' + name]();
      if (offset > 0 || value > -offset)
        value += offset;
      if (value === 0 && offset == -12)
        value = 12;
      return padNumber(value, size, trim);
    };
  }
  function dateStrGetter(name, shortForm) {
    return function (date, formats) {
      var value = date['get' + name]();
      var get = uppercase(shortForm ? 'SHORT' + name : name);
      return formats[get][value];
    };
  }
  function timeZoneGetter(date) {
    var zone = -1 * date.getTimezoneOffset();
    var paddedZone = zone >= 0 ? '+' : '';
    paddedZone += padNumber(Math[zone > 0 ? 'floor' : 'ceil'](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2);
    return paddedZone;
  }
  function ampmGetter(date, formats) {
    return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1];
  }
  var DATE_FORMATS = {
      yyyy: dateGetter('FullYear', 4),
      yy: dateGetter('FullYear', 2, 0, true),
      y: dateGetter('FullYear', 1),
      MMMM: dateStrGetter('Month'),
      MMM: dateStrGetter('Month', true),
      MM: dateGetter('Month', 2, 1),
      M: dateGetter('Month', 1, 1),
      dd: dateGetter('Date', 2),
      d: dateGetter('Date', 1),
      HH: dateGetter('Hours', 2),
      H: dateGetter('Hours', 1),
      hh: dateGetter('Hours', 2, -12),
      h: dateGetter('Hours', 1, -12),
      mm: dateGetter('Minutes', 2),
      m: dateGetter('Minutes', 1),
      ss: dateGetter('Seconds', 2),
      s: dateGetter('Seconds', 1),
      EEEE: dateStrGetter('Day'),
      EEE: dateStrGetter('Day', true),
      a: ampmGetter,
      Z: timeZoneGetter
    };
  var DATE_FORMATS_SPLIT = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/, NUMBER_STRING = /^\d+$/;
  dateFilter.$inject = ['$locale'];
  function dateFilter($locale) {
    var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
    function jsonStringToDate(string) {
      var match;
      if (match = string.match(R_ISO8601_STR)) {
        var date = new Date(0), tzHour = 0, tzMin = 0;
        if (match[9]) {
          tzHour = int(match[9] + match[10]);
          tzMin = int(match[9] + match[11]);
        }
        date.setUTCFullYear(int(match[1]), int(match[2]) - 1, int(match[3]));
        date.setUTCHours(int(match[4] || 0) - tzHour, int(match[5] || 0) - tzMin, int(match[6] || 0), int(match[7] || 0));
        return date;
      }
      return string;
    }
    return function (date, format) {
      var text = '', parts = [], fn, match;
      format = format || 'mediumDate';
      format = $locale.DATETIME_FORMATS[format] || format;
      if (isString(date)) {
        if (NUMBER_STRING.test(date)) {
          date = int(date);
        } else {
          date = jsonStringToDate(date);
        }
      }
      if (isNumber(date)) {
        date = new Date(date);
      }
      if (!isDate(date)) {
        return date;
      }
      while (format) {
        match = DATE_FORMATS_SPLIT.exec(format);
        if (match) {
          parts = concat(parts, match, 1);
          format = parts.pop();
        } else {
          parts.push(format);
          format = null;
        }
      }
      forEach(parts, function (value) {
        fn = DATE_FORMATS[value];
        text += fn ? fn(date, $locale.DATETIME_FORMATS) : value.replace(/(^'|'$)/g, '').replace(/''/g, '\'');
      });
      return text;
    };
  }
  function jsonFilter() {
    return function (object) {
      return toJson(object, true);
    };
  }
  var lowercaseFilter = valueFn(lowercase);
  var uppercaseFilter = valueFn(uppercase);
  function limitToFilter() {
    return function (array, limit) {
      if (!(array instanceof Array))
        return array;
      limit = int(limit);
      var out = [], i, n;
      if (!array || !(array instanceof Array))
        return out;
      if (limit > array.length)
        limit = array.length;
      else if (limit < -array.length)
        limit = -array.length;
      if (limit > 0) {
        i = 0;
        n = limit;
      } else {
        i = array.length + limit;
        n = array.length;
      }
      for (; i < n; i++) {
        out.push(array[i]);
      }
      return out;
    };
  }
  orderByFilter.$inject = ['$parse'];
  function orderByFilter($parse) {
    return function (array, sortPredicate, reverseOrder) {
      if (!isArray(array))
        return array;
      if (!sortPredicate)
        return array;
      sortPredicate = isArray(sortPredicate) ? sortPredicate : [sortPredicate];
      sortPredicate = map(sortPredicate, function (predicate) {
        var descending = false, get = predicate || identity;
        if (isString(predicate)) {
          if (predicate.charAt(0) == '+' || predicate.charAt(0) == '-') {
            descending = predicate.charAt(0) == '-';
            predicate = predicate.substring(1);
          }
          get = $parse(predicate);
        }
        return reverseComparator(function (a, b) {
          return compare(get(a), get(b));
        }, descending);
      });
      var arrayCopy = [];
      for (var i = 0; i < array.length; i++) {
        arrayCopy.push(array[i]);
      }
      return arrayCopy.sort(reverseComparator(comparator, reverseOrder));
      function comparator(o1, o2) {
        for (var i = 0; i < sortPredicate.length; i++) {
          var comp = sortPredicate[i](o1, o2);
          if (comp !== 0)
            return comp;
        }
        return 0;
      }
      function reverseComparator(comp, descending) {
        return toBoolean(descending) ? function (a, b) {
          return comp(b, a);
        } : comp;
      }
      function compare(v1, v2) {
        var t1 = typeof v1;
        var t2 = typeof v2;
        if (t1 == t2) {
          if (t1 == 'string') {
            v1 = v1.toLowerCase();
            v2 = v2.toLowerCase();
          }
          if (v1 === v2)
            return 0;
          return v1 < v2 ? -1 : 1;
        } else {
          return t1 < t2 ? -1 : 1;
        }
      }
    };
  }
  function ngDirective(directive) {
    if (isFunction(directive)) {
      directive = { link: directive };
    }
    directive.restrict = directive.restrict || 'AC';
    return valueFn(directive);
  }
  var htmlAnchorDirective = valueFn({
      restrict: 'E',
      compile: function (element, attr) {
        if (msie <= 8) {
          if (!attr.href && !attr.name) {
            attr.$set('href', '');
          }
          element.append(document.createComment('IE fix'));
        }
        return function (scope, element) {
          element.bind('click', function (event) {
            if (!element.attr('href')) {
              event.preventDefault();
            }
          });
        };
      }
    });
  var ngAttributeAliasDirectives = {};
  forEach(BOOLEAN_ATTR, function (propName, attrName) {
    var normalized = directiveNormalize('ng-' + attrName);
    ngAttributeAliasDirectives[normalized] = function () {
      return {
        priority: 100,
        compile: function () {
          return function (scope, element, attr) {
            scope.$watch(attr[normalized], function ngBooleanAttrWatchAction(value) {
              attr.$set(attrName, !!value);
            });
          };
        }
      };
    };
  });
  forEach([
    'src',
    'href'
  ], function (attrName) {
    var normalized = directiveNormalize('ng-' + attrName);
    ngAttributeAliasDirectives[normalized] = function () {
      return {
        priority: 99,
        link: function (scope, element, attr) {
          attr.$observe(normalized, function (value) {
            if (!value)
              return;
            attr.$set(attrName, value);
            if (msie)
              element.prop(attrName, attr[attrName]);
          });
        }
      };
    };
  });
  var nullFormCtrl = {
      $addControl: noop,
      $removeControl: noop,
      $setValidity: noop,
      $setDirty: noop
    };
  FormController.$inject = [
    '$element',
    '$attrs',
    '$scope'
  ];
  function FormController(element, attrs) {
    var form = this, parentForm = element.parent().controller('form') || nullFormCtrl, invalidCount = 0, errors = form.$error = {};
    form.$name = attrs.name || attrs.ngForm;
    form.$dirty = false;
    form.$pristine = true;
    form.$valid = true;
    form.$invalid = false;
    parentForm.$addControl(form);
    element.addClass(PRISTINE_CLASS);
    toggleValidCss(true);
    function toggleValidCss(isValid, validationErrorKey) {
      validationErrorKey = validationErrorKey ? '-' + snake_case(validationErrorKey, '-') : '';
      element.removeClass((isValid ? INVALID_CLASS : VALID_CLASS) + validationErrorKey).addClass((isValid ? VALID_CLASS : INVALID_CLASS) + validationErrorKey);
    }
    form.$addControl = function (control) {
      if (control.$name && !form.hasOwnProperty(control.$name)) {
        form[control.$name] = control;
      }
    };
    form.$removeControl = function (control) {
      if (control.$name && form[control.$name] === control) {
        delete form[control.$name];
      }
      forEach(errors, function (queue, validationToken) {
        form.$setValidity(validationToken, true, control);
      });
    };
    form.$setValidity = function (validationToken, isValid, control) {
      var queue = errors[validationToken];
      if (isValid) {
        if (queue) {
          arrayRemove(queue, control);
          if (!queue.length) {
            invalidCount--;
            if (!invalidCount) {
              toggleValidCss(isValid);
              form.$valid = true;
              form.$invalid = false;
            }
            errors[validationToken] = false;
            toggleValidCss(true, validationToken);
            parentForm.$setValidity(validationToken, true, form);
          }
        }
      } else {
        if (!invalidCount) {
          toggleValidCss(isValid);
        }
        if (queue) {
          if (includes(queue, control))
            return;
        } else {
          errors[validationToken] = queue = [];
          invalidCount++;
          toggleValidCss(false, validationToken);
          parentForm.$setValidity(validationToken, false, form);
        }
        queue.push(control);
        form.$valid = false;
        form.$invalid = true;
      }
    };
    form.$setDirty = function () {
      element.removeClass(PRISTINE_CLASS).addClass(DIRTY_CLASS);
      form.$dirty = true;
      form.$pristine = false;
      parentForm.$setDirty();
    };
  }
  var formDirectiveFactory = function (isNgForm) {
    return [
      '$timeout',
      function ($timeout) {
        var formDirective = {
            name: 'form',
            restrict: 'E',
            controller: FormController,
            compile: function () {
              return {
                pre: function (scope, formElement, attr, controller) {
                  if (!attr.action) {
                    var preventDefaultListener = function (event) {
                      event.preventDefault ? event.preventDefault() : event.returnValue = false;
                    };
                    addEventListenerFn(formElement[0], 'submit', preventDefaultListener);
                    formElement.bind('$destroy', function () {
                      $timeout(function () {
                        removeEventListenerFn(formElement[0], 'submit', preventDefaultListener);
                      }, 0, false);
                    });
                  }
                  var parentFormCtrl = formElement.parent().controller('form'), alias = attr.name || attr.ngForm;
                  if (alias) {
                    scope[alias] = controller;
                  }
                  if (parentFormCtrl) {
                    formElement.bind('$destroy', function () {
                      parentFormCtrl.$removeControl(controller);
                      if (alias) {
                        scope[alias] = undefined;
                      }
                      extend(controller, nullFormCtrl);
                    });
                  }
                }
              };
            }
          };
        return isNgForm ? extend(copy(formDirective), { restrict: 'EAC' }) : formDirective;
      }
    ];
  };
  var formDirective = formDirectiveFactory();
  var ngFormDirective = formDirectiveFactory(true);
  var URL_REGEXP = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
  var EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
  var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;
  var inputType = {
      'text': textInputType,
      'number': numberInputType,
      'url': urlInputType,
      'email': emailInputType,
      'radio': radioInputType,
      'checkbox': checkboxInputType,
      'hidden': noop,
      'button': noop,
      'submit': noop,
      'reset': noop
    };
  function isEmpty(value) {
    return isUndefined(value) || value === '' || value === null || value !== value;
  }
  function textInputType(scope, element, attr, ctrl, $sniffer, $browser) {
    var listener = function () {
      var value = trim(element.val());
      if (ctrl.$viewValue !== value) {
        scope.$apply(function () {
          ctrl.$setViewValue(value);
        });
      }
    };
    if ($sniffer.hasEvent('input')) {
      element.bind('input', listener);
    } else {
      var timeout;
      var deferListener = function () {
        if (!timeout) {
          timeout = $browser.defer(function () {
            listener();
            timeout = null;
          });
        }
      };
      element.bind('keydown', function (event) {
        var key = event.keyCode;
        if (key === 91 || 15 < key && key < 19 || 37 <= key && key <= 40)
          return;
        deferListener();
      });
      element.bind('change', listener);
      if ($sniffer.hasEvent('paste')) {
        element.bind('paste cut', deferListener);
      }
    }
    ctrl.$render = function () {
      element.val(isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue);
    };
    var pattern = attr.ngPattern, patternValidator;
    var validate = function (regexp, value) {
      if (isEmpty(value) || regexp.test(value)) {
        ctrl.$setValidity('pattern', true);
        return value;
      } else {
        ctrl.$setValidity('pattern', false);
        return undefined;
      }
    };
    if (pattern) {
      if (pattern.match(/^\/(.*)\/$/)) {
        pattern = new RegExp(pattern.substr(1, pattern.length - 2));
        patternValidator = function (value) {
          return validate(pattern, value);
        };
      } else {
        patternValidator = function (value) {
          var patternObj = scope.$eval(pattern);
          if (!patternObj || !patternObj.test) {
            throw new Error('Expected ' + pattern + ' to be a RegExp but was ' + patternObj);
          }
          return validate(patternObj, value);
        };
      }
      ctrl.$formatters.push(patternValidator);
      ctrl.$parsers.push(patternValidator);
    }
    if (attr.ngMinlength) {
      var minlength = int(attr.ngMinlength);
      var minLengthValidator = function (value) {
        if (!isEmpty(value) && value.length < minlength) {
          ctrl.$setValidity('minlength', false);
          return undefined;
        } else {
          ctrl.$setValidity('minlength', true);
          return value;
        }
      };
      ctrl.$parsers.push(minLengthValidator);
      ctrl.$formatters.push(minLengthValidator);
    }
    if (attr.ngMaxlength) {
      var maxlength = int(attr.ngMaxlength);
      var maxLengthValidator = function (value) {
        if (!isEmpty(value) && value.length > maxlength) {
          ctrl.$setValidity('maxlength', false);
          return undefined;
        } else {
          ctrl.$setValidity('maxlength', true);
          return value;
        }
      };
      ctrl.$parsers.push(maxLengthValidator);
      ctrl.$formatters.push(maxLengthValidator);
    }
  }
  function numberInputType(scope, element, attr, ctrl, $sniffer, $browser) {
    textInputType(scope, element, attr, ctrl, $sniffer, $browser);
    ctrl.$parsers.push(function (value) {
      var empty = isEmpty(value);
      if (empty || NUMBER_REGEXP.test(value)) {
        ctrl.$setValidity('number', true);
        return value === '' ? null : empty ? value : parseFloat(value);
      } else {
        ctrl.$setValidity('number', false);
        return undefined;
      }
    });
    ctrl.$formatters.push(function (value) {
      return isEmpty(value) ? '' : '' + value;
    });
    if (attr.min) {
      var min = parseFloat(attr.min);
      var minValidator = function (value) {
        if (!isEmpty(value) && value < min) {
          ctrl.$setValidity('min', false);
          return undefined;
        } else {
          ctrl.$setValidity('min', true);
          return value;
        }
      };
      ctrl.$parsers.push(minValidator);
      ctrl.$formatters.push(minValidator);
    }
    if (attr.max) {
      var max = parseFloat(attr.max);
      var maxValidator = function (value) {
        if (!isEmpty(value) && value > max) {
          ctrl.$setValidity('max', false);
          return undefined;
        } else {
          ctrl.$setValidity('max', true);
          return value;
        }
      };
      ctrl.$parsers.push(maxValidator);
      ctrl.$formatters.push(maxValidator);
    }
    ctrl.$formatters.push(function (value) {
      if (isEmpty(value) || isNumber(value)) {
        ctrl.$setValidity('number', true);
        return value;
      } else {
        ctrl.$setValidity('number', false);
        return undefined;
      }
    });
  }
  function urlInputType(scope, element, attr, ctrl, $sniffer, $browser) {
    textInputType(scope, element, attr, ctrl, $sniffer, $browser);
    var urlValidator = function (value) {
      if (isEmpty(value) || URL_REGEXP.test(value)) {
        ctrl.$setValidity('url', true);
        return value;
      } else {
        ctrl.$setValidity('url', false);
        return undefined;
      }
    };
    ctrl.$formatters.push(urlValidator);
    ctrl.$parsers.push(urlValidator);
  }
  function emailInputType(scope, element, attr, ctrl, $sniffer, $browser) {
    textInputType(scope, element, attr, ctrl, $sniffer, $browser);
    var emailValidator = function (value) {
      if (isEmpty(value) || EMAIL_REGEXP.test(value)) {
        ctrl.$setValidity('email', true);
        return value;
      } else {
        ctrl.$setValidity('email', false);
        return undefined;
      }
    };
    ctrl.$formatters.push(emailValidator);
    ctrl.$parsers.push(emailValidator);
  }
  function radioInputType(scope, element, attr, ctrl) {
    if (isUndefined(attr.name)) {
      element.attr('name', nextUid());
    }
    element.bind('click', function () {
      if (element[0].checked) {
        scope.$apply(function () {
          ctrl.$setViewValue(attr.value);
        });
      }
    });
    ctrl.$render = function () {
      var value = attr.value;
      element[0].checked = value == ctrl.$viewValue;
    };
    attr.$observe('value', ctrl.$render);
  }
  function checkboxInputType(scope, element, attr, ctrl) {
    var trueValue = attr.ngTrueValue, falseValue = attr.ngFalseValue;
    if (!isString(trueValue))
      trueValue = true;
    if (!isString(falseValue))
      falseValue = false;
    element.bind('click', function () {
      scope.$apply(function () {
        ctrl.$setViewValue(element[0].checked);
      });
    });
    ctrl.$render = function () {
      element[0].checked = ctrl.$viewValue;
    };
    ctrl.$formatters.push(function (value) {
      return value === trueValue;
    });
    ctrl.$parsers.push(function (value) {
      return value ? trueValue : falseValue;
    });
  }
  var inputDirective = [
      '$browser',
      '$sniffer',
      function ($browser, $sniffer) {
        return {
          restrict: 'E',
          require: '?ngModel',
          link: function (scope, element, attr, ctrl) {
            if (ctrl) {
              (inputType[lowercase(attr.type)] || inputType.text)(scope, element, attr, ctrl, $sniffer, $browser);
            }
          }
        };
      }
    ];
  var VALID_CLASS = 'ng-valid', INVALID_CLASS = 'ng-invalid', PRISTINE_CLASS = 'ng-pristine', DIRTY_CLASS = 'ng-dirty';
  var NgModelController = [
      '$scope',
      '$exceptionHandler',
      '$attrs',
      '$element',
      '$parse',
      function ($scope, $exceptionHandler, $attr, $element, $parse) {
        this.$viewValue = Number.NaN;
        this.$modelValue = Number.NaN;
        this.$parsers = [];
        this.$formatters = [];
        this.$viewChangeListeners = [];
        this.$pristine = true;
        this.$dirty = false;
        this.$valid = true;
        this.$invalid = false;
        this.$name = $attr.name;
        var ngModelGet = $parse($attr.ngModel), ngModelSet = ngModelGet.assign;
        if (!ngModelSet) {
          throw Error(NON_ASSIGNABLE_MODEL_EXPRESSION + $attr.ngModel + ' (' + startingTag($element) + ')');
        }
        this.$render = noop;
        var parentForm = $element.inheritedData('$formController') || nullFormCtrl, invalidCount = 0, $error = this.$error = {};
        $element.addClass(PRISTINE_CLASS);
        toggleValidCss(true);
        function toggleValidCss(isValid, validationErrorKey) {
          validationErrorKey = validationErrorKey ? '-' + snake_case(validationErrorKey, '-') : '';
          $element.removeClass((isValid ? INVALID_CLASS : VALID_CLASS) + validationErrorKey).addClass((isValid ? VALID_CLASS : INVALID_CLASS) + validationErrorKey);
        }
        this.$setValidity = function (validationErrorKey, isValid) {
          if ($error[validationErrorKey] === !isValid)
            return;
          if (isValid) {
            if ($error[validationErrorKey])
              invalidCount--;
            if (!invalidCount) {
              toggleValidCss(true);
              this.$valid = true;
              this.$invalid = false;
            }
          } else {
            toggleValidCss(false);
            this.$invalid = true;
            this.$valid = false;
            invalidCount++;
          }
          $error[validationErrorKey] = !isValid;
          toggleValidCss(isValid, validationErrorKey);
          parentForm.$setValidity(validationErrorKey, isValid, this);
        };
        this.$setViewValue = function (value) {
          this.$viewValue = value;
          if (this.$pristine) {
            this.$dirty = true;
            this.$pristine = false;
            $element.removeClass(PRISTINE_CLASS).addClass(DIRTY_CLASS);
            parentForm.$setDirty();
          }
          forEach(this.$parsers, function (fn) {
            value = fn(value);
          });
          if (this.$modelValue !== value) {
            this.$modelValue = value;
            ngModelSet($scope, value);
            forEach(this.$viewChangeListeners, function (listener) {
              try {
                listener();
              } catch (e) {
                $exceptionHandler(e);
              }
            });
          }
        };
        var ctrl = this;
        $scope.$watch(function ngModelWatch() {
          var value = ngModelGet($scope);
          if (ctrl.$modelValue !== value) {
            var formatters = ctrl.$formatters, idx = formatters.length;
            ctrl.$modelValue = value;
            while (idx--) {
              value = formatters[idx](value);
            }
            if (ctrl.$viewValue !== value) {
              ctrl.$viewValue = value;
              ctrl.$render();
            }
          }
        });
      }
    ];
  var ngModelDirective = function () {
    return {
      require: [
        'ngModel',
        '^?form'
      ],
      controller: NgModelController,
      link: function (scope, element, attr, ctrls) {
        var modelCtrl = ctrls[0], formCtrl = ctrls[1] || nullFormCtrl;
        formCtrl.$addControl(modelCtrl);
        element.bind('$destroy', function () {
          formCtrl.$removeControl(modelCtrl);
        });
      }
    };
  };
  var ngChangeDirective = valueFn({
      require: 'ngModel',
      link: function (scope, element, attr, ctrl) {
        ctrl.$viewChangeListeners.push(function () {
          scope.$eval(attr.ngChange);
        });
      }
    });
  var requiredDirective = function () {
    return {
      require: '?ngModel',
      link: function (scope, elm, attr, ctrl) {
        if (!ctrl)
          return;
        attr.required = true;
        var validator = function (value) {
          if (attr.required && (isEmpty(value) || value === false)) {
            ctrl.$setValidity('required', false);
            return;
          } else {
            ctrl.$setValidity('required', true);
            return value;
          }
        };
        ctrl.$formatters.push(validator);
        ctrl.$parsers.unshift(validator);
        attr.$observe('required', function () {
          validator(ctrl.$viewValue);
        });
      }
    };
  };
  var ngListDirective = function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ctrl) {
        var match = /\/(.*)\//.exec(attr.ngList), separator = match && new RegExp(match[1]) || attr.ngList || ',';
        var parse = function (viewValue) {
          var list = [];
          if (viewValue) {
            forEach(viewValue.split(separator), function (value) {
              if (value)
                list.push(trim(value));
            });
          }
          return list;
        };
        ctrl.$parsers.push(parse);
        ctrl.$formatters.push(function (value) {
          if (isArray(value)) {
            return value.join(', ');
          }
          return undefined;
        });
      }
    };
  };
  var CONSTANT_VALUE_REGEXP = /^(true|false|\d+)$/;
  var ngValueDirective = function () {
    return {
      priority: 100,
      compile: function (tpl, tplAttr) {
        if (CONSTANT_VALUE_REGEXP.test(tplAttr.ngValue)) {
          return function (scope, elm, attr) {
            attr.$set('value', scope.$eval(attr.ngValue));
          };
        } else {
          return function (scope, elm, attr) {
            scope.$watch(attr.ngValue, function valueWatchAction(value) {
              attr.$set('value', value);
            });
          };
        }
      }
    };
  };
  var ngBindDirective = ngDirective(function (scope, element, attr) {
      element.addClass('ng-binding').data('$binding', attr.ngBind);
      scope.$watch(attr.ngBind, function ngBindWatchAction(value) {
        element.text(value == undefined ? '' : value);
      });
    });
  var ngBindTemplateDirective = [
      '$interpolate',
      function ($interpolate) {
        return function (scope, element, attr) {
          var interpolateFn = $interpolate(element.attr(attr.$attr.ngBindTemplate));
          element.addClass('ng-binding').data('$binding', interpolateFn);
          attr.$observe('ngBindTemplate', function (value) {
            element.text(value);
          });
        };
      }
    ];
  var ngBindHtmlUnsafeDirective = [function () {
        return function (scope, element, attr) {
          element.addClass('ng-binding').data('$binding', attr.ngBindHtmlUnsafe);
          scope.$watch(attr.ngBindHtmlUnsafe, function ngBindHtmlUnsafeWatchAction(value) {
            element.html(value || '');
          });
        };
      }];
  function classDirective(name, selector) {
    name = 'ngClass' + name;
    return ngDirective(function (scope, element, attr) {
      var oldVal = undefined;
      scope.$watch(attr[name], ngClassWatchAction, true);
      attr.$observe('class', function (value) {
        var ngClass = scope.$eval(attr[name]);
        ngClassWatchAction(ngClass, ngClass);
      });
      if (name !== 'ngClass') {
        scope.$watch('$index', function ($index, old$index) {
          var mod = $index & 1;
          if (mod !== old$index & 1) {
            if (mod === selector) {
              addClass(scope.$eval(attr[name]));
            } else {
              removeClass(scope.$eval(attr[name]));
            }
          }
        });
      }
      function ngClassWatchAction(newVal) {
        if (selector === true || scope.$index % 2 === selector) {
          if (oldVal && !equals(newVal, oldVal)) {
            removeClass(oldVal);
          }
          addClass(newVal);
        }
        oldVal = copy(newVal);
      }
      function removeClass(classVal) {
        if (isObject(classVal) && !isArray(classVal)) {
          classVal = map(classVal, function (v, k) {
            if (v)
              return k;
          });
        }
        element.removeClass(isArray(classVal) ? classVal.join(' ') : classVal);
      }
      function addClass(classVal) {
        if (isObject(classVal) && !isArray(classVal)) {
          classVal = map(classVal, function (v, k) {
            if (v)
              return k;
          });
        }
        if (classVal) {
          element.addClass(isArray(classVal) ? classVal.join(' ') : classVal);
        }
      }
    });
  }
  var ngClassDirective = classDirective('', true);
  var ngClassOddDirective = classDirective('Odd', 0);
  var ngClassEvenDirective = classDirective('Even', 1);
  var ngCloakDirective = ngDirective({
      compile: function (element, attr) {
        attr.$set('ngCloak', undefined);
        element.removeClass('ng-cloak');
      }
    });
  var ngControllerDirective = [function () {
        return {
          scope: true,
          controller: '@'
        };
      }];
  var ngCspDirective = [
      '$sniffer',
      function ($sniffer) {
        return {
          priority: 1000,
          compile: function () {
            $sniffer.csp = true;
          }
        };
      }
    ];
  var ngEventDirectives = {};
  forEach('click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave submit'.split(' '), function (name) {
    var directiveName = directiveNormalize('ng-' + name);
    ngEventDirectives[directiveName] = [
      '$parse',
      function ($parse) {
        return function (scope, element, attr) {
          var fn = $parse(attr[directiveName]);
          element.bind(lowercase(name), function (event) {
            scope.$apply(function () {
              fn(scope, { $event: event });
            });
          });
        };
      }
    ];
  });
  var ngIncludeDirective = [
      '$http',
      '$templateCache',
      '$anchorScroll',
      '$compile',
      function ($http, $templateCache, $anchorScroll, $compile) {
        return {
          restrict: 'ECA',
          terminal: true,
          compile: function (element, attr) {
            var srcExp = attr.ngInclude || attr.src, onloadExp = attr.onload || '', autoScrollExp = attr.autoscroll;
            return function (scope, element) {
              var changeCounter = 0, childScope;
              var clearContent = function () {
                if (childScope) {
                  childScope.$destroy();
                  childScope = null;
                }
                element.html('');
              };
              scope.$watch(srcExp, function ngIncludeWatchAction(src) {
                var thisChangeId = ++changeCounter;
                if (src) {
                  $http.get(src, { cache: $templateCache }).success(function (response) {
                    if (thisChangeId !== changeCounter)
                      return;
                    if (childScope)
                      childScope.$destroy();
                    childScope = scope.$new();
                    element.html(response);
                    $compile(element.contents())(childScope);
                    if (isDefined(autoScrollExp) && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                      $anchorScroll();
                    }
                    childScope.$emit('$includeContentLoaded');
                    scope.$eval(onloadExp);
                  }).error(function () {
                    if (thisChangeId === changeCounter)
                      clearContent();
                  });
                } else
                  clearContent();
              });
            };
          }
        };
      }
    ];
  var ngInitDirective = ngDirective({
      compile: function () {
        return {
          pre: function (scope, element, attrs) {
            scope.$eval(attrs.ngInit);
          }
        };
      }
    });
  var ngNonBindableDirective = ngDirective({
      terminal: true,
      priority: 1000
    });
  var ngPluralizeDirective = [
      '$locale',
      '$interpolate',
      function ($locale, $interpolate) {
        var BRACE = /{}/g;
        return {
          restrict: 'EA',
          link: function (scope, element, attr) {
            var numberExp = attr.count, whenExp = element.attr(attr.$attr.when), offset = attr.offset || 0, whens = scope.$eval(whenExp), whensExpFns = {}, startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol();
            forEach(whens, function (expression, key) {
              whensExpFns[key] = $interpolate(expression.replace(BRACE, startSymbol + numberExp + '-' + offset + endSymbol));
            });
            scope.$watch(function ngPluralizeWatch() {
              var value = parseFloat(scope.$eval(numberExp));
              if (!isNaN(value)) {
                if (!(value in whens))
                  value = $locale.pluralCat(value - offset);
                return whensExpFns[value](scope, element, true);
              } else {
                return '';
              }
            }, function ngPluralizeWatchAction(newVal) {
              element.text(newVal);
            });
          }
        };
      }
    ];
  var ngRepeatDirective = ngDirective({
      transclude: 'element',
      priority: 1000,
      terminal: true,
      compile: function (element, attr, linker) {
        return function (scope, iterStartElement, attr) {
          var expression = attr.ngRepeat;
          var match = expression.match(/^\s*(.+)\s+in\s+(.*)\s*$/), lhs, rhs, valueIdent, keyIdent;
          if (!match) {
            throw Error('Expected ngRepeat in form of \'_item_ in _collection_\' but got \'' + expression + '\'.');
          }
          lhs = match[1];
          rhs = match[2];
          match = lhs.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
          if (!match) {
            throw Error('\'item\' in \'item in collection\' should be identifier or (key, value) but got \'' + lhs + '\'.');
          }
          valueIdent = match[3] || match[1];
          keyIdent = match[2];
          var lastOrder = new HashQueueMap();
          scope.$watch(function ngRepeatWatch(scope) {
            var index, length, collection = scope.$eval(rhs), cursor = iterStartElement, nextOrder = new HashQueueMap(), arrayBound, childScope, key, value, array, last;
            if (!isArray(collection)) {
              array = [];
              for (key in collection) {
                if (collection.hasOwnProperty(key) && key.charAt(0) != '$') {
                  array.push(key);
                }
              }
              array.sort();
            } else {
              array = collection || [];
            }
            arrayBound = array.length - 1;
            for (index = 0, length = array.length; index < length; index++) {
              key = collection === array ? index : array[index];
              value = collection[key];
              last = lastOrder.shift(value);
              if (last) {
                childScope = last.scope;
                nextOrder.push(value, last);
                if (index === last.index) {
                  cursor = last.element;
                } else {
                  last.index = index;
                  cursor.after(last.element);
                  cursor = last.element;
                }
              } else {
                childScope = scope.$new();
              }
              childScope[valueIdent] = value;
              if (keyIdent)
                childScope[keyIdent] = key;
              childScope.$index = index;
              childScope.$first = index === 0;
              childScope.$last = index === arrayBound;
              childScope.$middle = !(childScope.$first || childScope.$last);
              if (!last) {
                linker(childScope, function (clone) {
                  cursor.after(clone);
                  last = {
                    scope: childScope,
                    element: cursor = clone,
                    index: index
                  };
                  nextOrder.push(value, last);
                });
              }
            }
            for (key in lastOrder) {
              if (lastOrder.hasOwnProperty(key)) {
                array = lastOrder[key];
                while (array.length) {
                  value = array.pop();
                  value.element.remove();
                  value.scope.$destroy();
                }
              }
            }
            lastOrder = nextOrder;
          });
        };
      }
    });
  var ngShowDirective = ngDirective(function (scope, element, attr) {
      scope.$watch(attr.ngShow, function ngShowWatchAction(value) {
        element.css('display', toBoolean(value) ? '' : 'none');
      });
    });
  var ngHideDirective = ngDirective(function (scope, element, attr) {
      scope.$watch(attr.ngHide, function ngHideWatchAction(value) {
        element.css('display', toBoolean(value) ? 'none' : '');
      });
    });
  var ngStyleDirective = ngDirective(function (scope, element, attr) {
      scope.$watch(attr.ngStyle, function ngStyleWatchAction(newStyles, oldStyles) {
        if (oldStyles && newStyles !== oldStyles) {
          forEach(oldStyles, function (val, style) {
            element.css(style, '');
          });
        }
        if (newStyles)
          element.css(newStyles);
      }, true);
    });
  var NG_SWITCH = 'ng-switch';
  var ngSwitchDirective = valueFn({
      restrict: 'EA',
      require: 'ngSwitch',
      controller: [
        '$scope',
        function ngSwitchController() {
          this.cases = {};
        }
      ],
      link: function (scope, element, attr, ctrl) {
        var watchExpr = attr.ngSwitch || attr.on, selectedTransclude, selectedElement, selectedScope;
        scope.$watch(watchExpr, function ngSwitchWatchAction(value) {
          if (selectedElement) {
            selectedScope.$destroy();
            selectedElement.remove();
            selectedElement = selectedScope = null;
          }
          if (selectedTransclude = ctrl.cases['!' + value] || ctrl.cases['?']) {
            scope.$eval(attr.change);
            selectedScope = scope.$new();
            selectedTransclude(selectedScope, function (caseElement) {
              selectedElement = caseElement;
              element.append(caseElement);
            });
          }
        });
      }
    });
  var ngSwitchWhenDirective = ngDirective({
      transclude: 'element',
      priority: 500,
      require: '^ngSwitch',
      compile: function (element, attrs, transclude) {
        return function (scope, element, attr, ctrl) {
          ctrl.cases['!' + attrs.ngSwitchWhen] = transclude;
        };
      }
    });
  var ngSwitchDefaultDirective = ngDirective({
      transclude: 'element',
      priority: 500,
      require: '^ngSwitch',
      compile: function (element, attrs, transclude) {
        return function (scope, element, attr, ctrl) {
          ctrl.cases['?'] = transclude;
        };
      }
    });
  var ngTranscludeDirective = ngDirective({
      controller: [
        '$transclude',
        '$element',
        function ($transclude, $element) {
          $transclude(function (clone) {
            $element.append(clone);
          });
        }
      ]
    });
  var ngViewDirective = [
      '$http',
      '$templateCache',
      '$route',
      '$anchorScroll',
      '$compile',
      '$controller',
      function ($http, $templateCache, $route, $anchorScroll, $compile, $controller) {
        return {
          restrict: 'ECA',
          terminal: true,
          link: function (scope, element, attr) {
            var lastScope, onloadExp = attr.onload || '';
            scope.$on('$routeChangeSuccess', update);
            update();
            function destroyLastScope() {
              if (lastScope) {
                lastScope.$destroy();
                lastScope = null;
              }
            }
            function clearContent() {
              element.html('');
              destroyLastScope();
            }
            function update() {
              var locals = $route.current && $route.current.locals, template = locals && locals.$template;
              if (template) {
                element.html(template);
                destroyLastScope();
                var link = $compile(element.contents()), current = $route.current, controller;
                lastScope = current.scope = scope.$new();
                if (current.controller) {
                  locals.$scope = lastScope;
                  controller = $controller(current.controller, locals);
                  element.children().data('$ngControllerController', controller);
                }
                link(lastScope);
                lastScope.$emit('$viewContentLoaded');
                lastScope.$eval(onloadExp);
                $anchorScroll();
              } else {
                clearContent();
              }
            }
          }
        };
      }
    ];
  var scriptDirective = [
      '$templateCache',
      function ($templateCache) {
        return {
          restrict: 'E',
          terminal: true,
          compile: function (element, attr) {
            if (attr.type == 'text/ng-template') {
              var templateUrl = attr.id, text = element[0].text;
              $templateCache.put(templateUrl, text);
            }
          }
        };
      }
    ];
  var ngOptionsDirective = valueFn({ terminal: true });
  var selectDirective = [
      '$compile',
      '$parse',
      function ($compile, $parse) {
        var NG_OPTIONS_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*)|(?:\(\s*([\$\w][\$\w\d]*)\s*,\s*([\$\w][\$\w\d]*)\s*\)))\s+in\s+(.*)$/, nullModelCtrl = { $setViewValue: noop };
        return {
          restrict: 'E',
          require: [
            'select',
            '?ngModel'
          ],
          controller: [
            '$element',
            '$scope',
            '$attrs',
            function ($element, $scope, $attrs) {
              var self = this, optionsMap = {}, ngModelCtrl = nullModelCtrl, nullOption, unknownOption;
              self.databound = $attrs.ngModel;
              self.init = function (ngModelCtrl_, nullOption_, unknownOption_) {
                ngModelCtrl = ngModelCtrl_;
                nullOption = nullOption_;
                unknownOption = unknownOption_;
              };
              self.addOption = function (value) {
                optionsMap[value] = true;
                if (ngModelCtrl.$viewValue == value) {
                  $element.val(value);
                  if (unknownOption.parent())
                    unknownOption.remove();
                }
              };
              self.removeOption = function (value) {
                if (this.hasOption(value)) {
                  delete optionsMap[value];
                  if (ngModelCtrl.$viewValue == value) {
                    this.renderUnknownOption(value);
                  }
                }
              };
              self.renderUnknownOption = function (val) {
                var unknownVal = '? ' + hashKey(val) + ' ?';
                unknownOption.val(unknownVal);
                $element.prepend(unknownOption);
                $element.val(unknownVal);
                unknownOption.prop('selected', true);
              };
              self.hasOption = function (value) {
                return optionsMap.hasOwnProperty(value);
              };
              $scope.$on('$destroy', function () {
                self.renderUnknownOption = noop;
              });
            }
          ],
          link: function (scope, element, attr, ctrls) {
            if (!ctrls[1])
              return;
            var selectCtrl = ctrls[0], ngModelCtrl = ctrls[1], multiple = attr.multiple, optionsExp = attr.ngOptions, nullOption = false, emptyOption, optionTemplate = jqLite(document.createElement('option')), optGroupTemplate = jqLite(document.createElement('optgroup')), unknownOption = optionTemplate.clone();
            for (var i = 0, children = element.children(), ii = children.length; i < ii; i++) {
              if (children[i].value == '') {
                emptyOption = nullOption = children.eq(i);
                break;
              }
            }
            selectCtrl.init(ngModelCtrl, nullOption, unknownOption);
            if (multiple && (attr.required || attr.ngRequired)) {
              var requiredValidator = function (value) {
                ngModelCtrl.$setValidity('required', !attr.required || value && value.length);
                return value;
              };
              ngModelCtrl.$parsers.push(requiredValidator);
              ngModelCtrl.$formatters.unshift(requiredValidator);
              attr.$observe('required', function () {
                requiredValidator(ngModelCtrl.$viewValue);
              });
            }
            if (optionsExp)
              Options(scope, element, ngModelCtrl);
            else if (multiple)
              Multiple(scope, element, ngModelCtrl);
            else
              Single(scope, element, ngModelCtrl, selectCtrl);
            function Single(scope, selectElement, ngModelCtrl, selectCtrl) {
              ngModelCtrl.$render = function () {
                var viewValue = ngModelCtrl.$viewValue;
                if (selectCtrl.hasOption(viewValue)) {
                  if (unknownOption.parent())
                    unknownOption.remove();
                  selectElement.val(viewValue);
                  if (viewValue === '')
                    emptyOption.prop('selected', true);
                } else {
                  if (isUndefined(viewValue) && emptyOption) {
                    selectElement.val('');
                  } else {
                    selectCtrl.renderUnknownOption(viewValue);
                  }
                }
              };
              selectElement.bind('change', function () {
                scope.$apply(function () {
                  if (unknownOption.parent())
                    unknownOption.remove();
                  ngModelCtrl.$setViewValue(selectElement.val());
                });
              });
            }
            function Multiple(scope, selectElement, ctrl) {
              var lastView;
              ctrl.$render = function () {
                var items = new HashMap(ctrl.$viewValue);
                forEach(selectElement.find('option'), function (option) {
                  option.selected = isDefined(items.get(option.value));
                });
              };
              scope.$watch(function selectMultipleWatch() {
                if (!equals(lastView, ctrl.$viewValue)) {
                  lastView = copy(ctrl.$viewValue);
                  ctrl.$render();
                }
              });
              selectElement.bind('change', function () {
                scope.$apply(function () {
                  var array = [];
                  forEach(selectElement.find('option'), function (option) {
                    if (option.selected) {
                      array.push(option.value);
                    }
                  });
                  ctrl.$setViewValue(array);
                });
              });
            }
            function Options(scope, selectElement, ctrl) {
              var match;
              if (!(match = optionsExp.match(NG_OPTIONS_REGEXP))) {
                throw Error('Expected ngOptions in form of \'_select_ (as _label_)? for (_key_,)?_value_ in _collection_\'' + ' but got \'' + optionsExp + '\'.');
              }
              var displayFn = $parse(match[2] || match[1]), valueName = match[4] || match[6], keyName = match[5], groupByFn = $parse(match[3] || ''), valueFn = $parse(match[2] ? match[1] : valueName), valuesFn = $parse(match[7]), optionGroupsCache = [[{
                      element: selectElement,
                      label: ''
                    }]];
              if (nullOption) {
                $compile(nullOption)(scope);
                nullOption.removeClass('ng-scope');
                nullOption.remove();
              }
              selectElement.html('');
              selectElement.bind('change', function () {
                scope.$apply(function () {
                  var optionGroup, collection = valuesFn(scope) || [], locals = {}, key, value, optionElement, index, groupIndex, length, groupLength;
                  if (multiple) {
                    value = [];
                    for (groupIndex = 0, groupLength = optionGroupsCache.length; groupIndex < groupLength; groupIndex++) {
                      optionGroup = optionGroupsCache[groupIndex];
                      for (index = 1, length = optionGroup.length; index < length; index++) {
                        if ((optionElement = optionGroup[index].element)[0].selected) {
                          key = optionElement.val();
                          if (keyName)
                            locals[keyName] = key;
                          locals[valueName] = collection[key];
                          value.push(valueFn(scope, locals));
                        }
                      }
                    }
                  } else {
                    key = selectElement.val();
                    if (key == '?') {
                      value = undefined;
                    } else if (key == '') {
                      value = null;
                    } else {
                      locals[valueName] = collection[key];
                      if (keyName)
                        locals[keyName] = key;
                      value = valueFn(scope, locals);
                    }
                  }
                  ctrl.$setViewValue(value);
                });
              });
              ctrl.$render = render;
              scope.$watch(render);
              function render() {
                var optionGroups = { '': [] }, optionGroupNames = [''], optionGroupName, optionGroup, option, existingParent, existingOptions, existingOption, modelValue = ctrl.$modelValue, values = valuesFn(scope) || [], keys = keyName ? sortedKeys(values) : values, groupLength, length, groupIndex, index, locals = {}, selected, selectedSet = false, lastElement, element, label;
                if (multiple) {
                  selectedSet = new HashMap(modelValue);
                }
                for (index = 0; length = keys.length, index < length; index++) {
                  locals[valueName] = values[keyName ? locals[keyName] = keys[index] : index];
                  optionGroupName = groupByFn(scope, locals) || '';
                  if (!(optionGroup = optionGroups[optionGroupName])) {
                    optionGroup = optionGroups[optionGroupName] = [];
                    optionGroupNames.push(optionGroupName);
                  }
                  if (multiple) {
                    selected = selectedSet.remove(valueFn(scope, locals)) != undefined;
                  } else {
                    selected = modelValue === valueFn(scope, locals);
                    selectedSet = selectedSet || selected;
                  }
                  label = displayFn(scope, locals);
                  label = label === undefined ? '' : label;
                  optionGroup.push({
                    id: keyName ? keys[index] : index,
                    label: label,
                    selected: selected
                  });
                }
                if (!multiple) {
                  if (nullOption || modelValue === null) {
                    optionGroups[''].unshift({
                      id: '',
                      label: '',
                      selected: !selectedSet
                    });
                  } else if (!selectedSet) {
                    optionGroups[''].unshift({
                      id: '?',
                      label: '',
                      selected: true
                    });
                  }
                }
                for (groupIndex = 0, groupLength = optionGroupNames.length; groupIndex < groupLength; groupIndex++) {
                  optionGroupName = optionGroupNames[groupIndex];
                  optionGroup = optionGroups[optionGroupName];
                  if (optionGroupsCache.length <= groupIndex) {
                    existingParent = {
                      element: optGroupTemplate.clone().attr('label', optionGroupName),
                      label: optionGroup.label
                    };
                    existingOptions = [existingParent];
                    optionGroupsCache.push(existingOptions);
                    selectElement.append(existingParent.element);
                  } else {
                    existingOptions = optionGroupsCache[groupIndex];
                    existingParent = existingOptions[0];
                    if (existingParent.label != optionGroupName) {
                      existingParent.element.attr('label', existingParent.label = optionGroupName);
                    }
                  }
                  lastElement = null;
                  for (index = 0, length = optionGroup.length; index < length; index++) {
                    option = optionGroup[index];
                    if (existingOption = existingOptions[index + 1]) {
                      lastElement = existingOption.element;
                      if (existingOption.label !== option.label) {
                        lastElement.text(existingOption.label = option.label);
                      }
                      if (existingOption.id !== option.id) {
                        lastElement.val(existingOption.id = option.id);
                      }
                      if (lastElement[0].selected !== option.selected) {
                        lastElement.prop('selected', existingOption.selected = option.selected);
                      }
                    } else {
                      if (option.id === '' && nullOption) {
                        element = nullOption;
                      } else {
                        (element = optionTemplate.clone()).val(option.id).attr('selected', option.selected).text(option.label);
                      }
                      existingOptions.push(existingOption = {
                        element: element,
                        label: option.label,
                        id: option.id,
                        selected: option.selected
                      });
                      if (lastElement) {
                        lastElement.after(element);
                      } else {
                        existingParent.element.append(element);
                      }
                      lastElement = element;
                    }
                  }
                  index++;
                  while (existingOptions.length > index) {
                    existingOptions.pop().element.remove();
                  }
                }
                while (optionGroupsCache.length > groupIndex) {
                  optionGroupsCache.pop()[0].element.remove();
                }
              }
            }
          }
        };
      }
    ];
  var optionDirective = [
      '$interpolate',
      function ($interpolate) {
        var nullSelectCtrl = {
            addOption: noop,
            removeOption: noop
          };
        return {
          restrict: 'E',
          priority: 100,
          compile: function (element, attr) {
            if (isUndefined(attr.value)) {
              var interpolateFn = $interpolate(element.text(), true);
              if (!interpolateFn) {
                attr.$set('value', element.text());
              }
            }
            return function (scope, element, attr) {
              var selectCtrlName = '$selectController', parent = element.parent(), selectCtrl = parent.data(selectCtrlName) || parent.parent().data(selectCtrlName);
              if (selectCtrl && selectCtrl.databound) {
                element.prop('selected', false);
              } else {
                selectCtrl = nullSelectCtrl;
              }
              if (interpolateFn) {
                scope.$watch(interpolateFn, function interpolateWatchAction(newVal, oldVal) {
                  attr.$set('value', newVal);
                  if (newVal !== oldVal)
                    selectCtrl.removeOption(oldVal);
                  selectCtrl.addOption(newVal);
                });
              } else {
                selectCtrl.addOption(attr.value);
              }
              element.bind('$destroy', function () {
                selectCtrl.removeOption(attr.value);
              });
            };
          }
        };
      }
    ];
  var styleDirective = valueFn({
      restrict: 'E',
      terminal: true
    });
  bindJQuery();
  publishExternalAPI(angular);
  jqLite(document).ready(function () {
    angularInit(document, bootstrap);
  });
}(window, document));
angular.element(document).find('head').append('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak{display:none !important;}ng\\:form{display:block;}</style>');
angular.module('ui.config', []).value('ui.config', {});
angular.module('ui.filters', ['ui.config']);
angular.module('ui.directives', ['ui.config']);
angular.module('ui', [
  'ui.filters',
  'ui.directives',
  'ui.config'
]);
angular.module('ui.directives').directive('uiAnimate', [
  'ui.config',
  '$timeout',
  function (uiConfig, $timeout) {
    var options = {};
    if (angular.isString(uiConfig.animate)) {
      options['class'] = uiConfig.animate;
    } else if (uiConfig.animate) {
      options = uiConfig.animate;
    }
    return {
      restrict: 'A',
      link: function ($scope, element, attrs) {
        var opts = {};
        if (attrs.uiAnimate) {
          opts = $scope.$eval(attrs.uiAnimate);
          if (angular.isString(opts)) {
            opts = { 'class': opts };
          }
        }
        opts = angular.extend({ 'class': 'ui-animate' }, options, opts);
        element.addClass(opts['class']);
        $timeout(function () {
          element.removeClass(opts['class']);
        }, 20, false);
      }
    };
  }
]);
angular.module('ui.directives').directive('uiCalendar', [
  'ui.config',
  '$parse',
  function (uiConfig, $parse) {
    uiConfig.uiCalendar = uiConfig.uiCalendar || {};
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, elm, attrs, $timeout) {
        var sources = scope.$eval(attrs.ngModel);
        var tracker = 0;
        var getSources = function () {
          var equalsTracker = scope.$eval(attrs.equalsTracker);
          tracker = 0;
          angular.forEach(sources, function (value, key) {
            if (angular.isArray(value)) {
              tracker += value.length;
            }
          });
          if (angular.isNumber(equalsTracker)) {
            return tracker + sources.length + equalsTracker;
          } else {
            return tracker + sources.length;
          }
        };
        function update() {
          scope.calendar = elm.html('');
          var view = scope.calendar.fullCalendar('getView');
          if (view) {
            view = view.name;
          }
          var expression, options = {
              defaultView: view,
              eventSources: sources
            };
          if (attrs.uiCalendar) {
            expression = scope.$eval(attrs.uiCalendar);
          } else {
            expression = {};
          }
          angular.extend(options, uiConfig.uiCalendar, expression);
          scope.calendar.fullCalendar(options);
        }
        update();
        scope.$watch(getSources, function (newVal, oldVal) {
          update();
        });
      }
    };
  }
]);
angular.module('ui.directives').directive('uiCodemirror', [
  'ui.config',
  '$timeout',
  function (uiConfig, $timeout) {
    'use strict';
    var events = [
        'cursorActivity',
        'viewportChange',
        'gutterClick',
        'focus',
        'blur',
        'scroll',
        'update'
      ];
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, elm, attrs, ngModel) {
        var options, opts, onChange, deferCodeMirror, codeMirror;
        if (elm[0].type !== 'textarea') {
          throw new Error('uiCodemirror3 can only be applied to a textarea element');
        }
        options = uiConfig.codemirror || {};
        opts = angular.extend({}, options, scope.$eval(attrs.uiCodemirror));
        onChange = function (aEvent) {
          return function (instance, changeObj) {
            var newValue = instance.getValue();
            if (newValue !== ngModel.$viewValue) {
              ngModel.$setViewValue(newValue);
              scope.$apply();
            }
            if (typeof aEvent === 'function')
              aEvent(instance, changeObj);
          };
        };
        deferCodeMirror = function () {
          codeMirror = CodeMirror.fromTextArea(elm[0], opts);
          codeMirror.on('change', onChange(opts.onChange));
          for (var i = 0, n = events.length, aEvent; i < n; ++i) {
            aEvent = opts['on' + events[i].charAt(0).toUpperCase() + events[i].slice(1)];
            if (aEvent === void 0)
              continue;
            if (typeof aEvent !== 'function')
              continue;
            codeMirror.on(events[i], aEvent);
          }
          ngModel.$formatters.push(function (value) {
            if (angular.isUndefined(value) || value === null) {
              return '';
            } else if (angular.isObject(value) || angular.isArray(value)) {
              throw new Error('ui-codemirror cannot use an object or an array as a model');
            }
            return value;
          });
          ngModel.$render = function () {
            codeMirror.setValue(ngModel.$viewValue);
          };
          if (attrs.uiRefresh) {
            scope.$watch(attrs.uiRefresh, function (newVal, oldVal) {
              if (newVal !== oldVal)
                $timeout(codeMirror.refresh);
            });
          }
        };
        $timeout(deferCodeMirror);
      }
    };
  }
]);
angular.module('ui.directives').directive('uiCurrency', [
  'ui.config',
  'currencyFilter',
  function (uiConfig, currencyFilter) {
    var options = {
        pos: 'ui-currency-pos',
        neg: 'ui-currency-neg',
        zero: 'ui-currency-zero'
      };
    if (uiConfig.currency) {
      angular.extend(options, uiConfig.currency);
    }
    return {
      restrict: 'EAC',
      require: 'ngModel',
      link: function (scope, element, attrs, controller) {
        var opts, renderview, value;
        opts = angular.extend({}, options, scope.$eval(attrs.uiCurrency));
        renderview = function (viewvalue) {
          var num;
          num = viewvalue * 1;
          element.toggleClass(opts.pos, num > 0);
          element.toggleClass(opts.neg, num < 0);
          element.toggleClass(opts.zero, num === 0);
          if (viewvalue === '') {
            element.text('');
          } else {
            element.text(currencyFilter(num, opts.symbol));
          }
          return true;
        };
        controller.$render = function () {
          value = controller.$viewValue;
          element.val(value);
          renderview(value);
        };
      }
    };
  }
]);
angular.module('ui.directives').directive('uiDate', [
  'ui.config',
  function (uiConfig) {
    'use strict';
    var options;
    options = {};
    if (angular.isObject(uiConfig.date)) {
      angular.extend(options, uiConfig.date);
    }
    return {
      require: '?ngModel',
      link: function (scope, element, attrs, controller) {
        var getOptions = function () {
          return angular.extend({}, uiConfig.date, scope.$eval(attrs.uiDate));
        };
        var initDateWidget = function () {
          var opts = getOptions();
          if (controller) {
            var updateModel = function () {
              scope.$apply(function () {
                var date = element.datepicker('getDate');
                element.datepicker('setDate', element.val());
                controller.$setViewValue(date);
                element.blur();
              });
            };
            if (opts.onSelect) {
              var userHandler = opts.onSelect;
              opts.onSelect = function (value, picker) {
                updateModel();
                scope.$apply(function () {
                  userHandler(value, picker);
                });
              };
            } else {
              opts.onSelect = updateModel;
            }
            element.bind('change', updateModel);
            controller.$render = function () {
              var date = controller.$viewValue;
              if (angular.isDefined(date) && date !== null && !angular.isDate(date)) {
                throw new Error('ng-Model value must be a Date object - currently it is a ' + typeof date + ' - use ui-date-format to convert it from a string');
              }
              element.datepicker('setDate', date);
            };
          }
          element.datepicker('destroy');
          element.datepicker(opts);
          if (controller) {
            controller.$render();
          }
        };
        scope.$watch(getOptions, initDateWidget, true);
      }
    };
  }
]).directive('uiDateFormat', [
  'ui.config',
  function (uiConfig) {
    var directive = {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
          var dateFormat = attrs.uiDateFormat || uiConfig.dateFormat;
          if (dateFormat) {
            modelCtrl.$formatters.push(function (value) {
              if (angular.isString(value)) {
                return $.datepicker.parseDate(dateFormat, value);
              }
            });
            modelCtrl.$parsers.push(function (value) {
              if (value) {
                return $.datepicker.formatDate(dateFormat, value);
              }
            });
          } else {
            modelCtrl.$formatters.push(function (value) {
              if (angular.isString(value)) {
                return new Date(value);
              }
            });
            modelCtrl.$parsers.push(function (value) {
              if (value) {
                return value.toISOString();
              }
            });
          }
        }
      };
    return directive;
  }
]);
angular.module('ui.directives').directive('uiEvent', [
  '$parse',
  function ($parse) {
    return function (scope, elm, attrs) {
      var events = scope.$eval(attrs.uiEvent);
      angular.forEach(events, function (uiEvent, eventName) {
        var fn = $parse(uiEvent);
        elm.bind(eventName, function (evt) {
          var params = Array.prototype.slice.call(arguments);
          params = params.splice(1);
          scope.$apply(function () {
            fn(scope, {
              $event: evt,
              $params: params
            });
          });
        });
      });
    };
  }
]);
angular.module('ui.directives').directive('uiIf', [function () {
    return {
      transclude: 'element',
      priority: 1000,
      terminal: true,
      restrict: 'A',
      compile: function (element, attr, transclude) {
        return function (scope, element, attr) {
          var childElement;
          var childScope;
          scope.$watch(attr['uiIf'], function (newValue) {
            if (childElement) {
              childElement.remove();
              childElement = undefined;
            }
            if (childScope) {
              childScope.$destroy();
              childScope = undefined;
            }
            if (newValue) {
              childScope = scope.$new();
              transclude(childScope, function (clone) {
                childElement = clone;
                element.after(clone);
              });
            }
          });
        };
      }
    };
  }]);
angular.module('ui.directives').directive('uiJq', [
  'ui.config',
  '$timeout',
  function uiJqInjectingFunction(uiConfig, $timeout) {
    return {
      restrict: 'A',
      compile: function uiJqCompilingFunction(tElm, tAttrs) {
        if (!angular.isFunction(tElm[tAttrs.uiJq])) {
          throw new Error('ui-jq: The "' + tAttrs.uiJq + '" function does not exist');
        }
        var options = uiConfig.jq && uiConfig.jq[tAttrs.uiJq];
        return function uiJqLinkingFunction(scope, elm, attrs) {
          var linkOptions = [];
          if (attrs.uiOptions) {
            linkOptions = scope.$eval('[' + attrs.uiOptions + ']');
            if (angular.isObject(options) && angular.isObject(linkOptions[0])) {
              linkOptions[0] = angular.extend({}, options, linkOptions[0]);
            }
          } else if (options) {
            linkOptions = [options];
          }
          if (attrs.ngModel && elm.is('select,input,textarea')) {
            elm.on('change', function () {
              elm.trigger('input');
            });
          }
          function callPlugin() {
            $timeout(function () {
              elm[attrs.uiJq].apply(elm, linkOptions);
            }, 0, false);
          }
          if (attrs.uiRefresh) {
            scope.$watch(attrs.uiRefresh, function (newVal) {
              callPlugin();
            });
          }
          callPlugin();
        };
      }
    };
  }
]);
angular.module('ui.directives').factory('keypressHelper', [
  '$parse',
  function keypress($parse) {
    var keysByCode = {
        8: 'backspace',
        9: 'tab',
        13: 'enter',
        27: 'esc',
        32: 'space',
        33: 'pageup',
        34: 'pagedown',
        35: 'end',
        36: 'home',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        45: 'insert',
        46: 'delete'
      };
    var capitaliseFirstLetter = function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    return function (mode, scope, elm, attrs) {
      var params, combinations = [];
      params = scope.$eval(attrs['ui' + capitaliseFirstLetter(mode)]);
      angular.forEach(params, function (v, k) {
        var combination, expression;
        expression = $parse(v);
        angular.forEach(k.split(' '), function (variation) {
          combination = {
            expression: expression,
            keys: {}
          };
          angular.forEach(variation.split('-'), function (value) {
            combination.keys[value] = true;
          });
          combinations.push(combination);
        });
      });
      elm.bind(mode, function (event) {
        var altPressed = event.metaKey || event.altKey;
        var ctrlPressed = event.ctrlKey;
        var shiftPressed = event.shiftKey;
        var keyCode = event.keyCode;
        if (mode === 'keypress' && !shiftPressed && keyCode >= 97 && keyCode <= 122) {
          keyCode = keyCode - 32;
        }
        angular.forEach(combinations, function (combination) {
          var mainKeyPressed = combination.keys[keysByCode[event.keyCode]] || combination.keys[event.keyCode.toString()] || false;
          var altRequired = combination.keys.alt || false;
          var ctrlRequired = combination.keys.ctrl || false;
          var shiftRequired = combination.keys.shift || false;
          if (mainKeyPressed && altRequired == altPressed && ctrlRequired == ctrlPressed && shiftRequired == shiftPressed) {
            scope.$apply(function () {
              combination.expression(scope, { '$event': event });
            });
          }
        });
      });
    };
  }
]);
angular.module('ui.directives').directive('uiKeydown', [
  'keypressHelper',
  function (keypressHelper) {
    return {
      link: function (scope, elm, attrs) {
        keypressHelper('keydown', scope, elm, attrs);
      }
    };
  }
]);
angular.module('ui.directives').directive('uiKeypress', [
  'keypressHelper',
  function (keypressHelper) {
    return {
      link: function (scope, elm, attrs) {
        keypressHelper('keypress', scope, elm, attrs);
      }
    };
  }
]);
angular.module('ui.directives').directive('uiKeyup', [
  'keypressHelper',
  function (keypressHelper) {
    return {
      link: function (scope, elm, attrs) {
        keypressHelper('keyup', scope, elm, attrs);
      }
    };
  }
]);
(function () {
  var app = angular.module('ui.directives');
  function bindMapEvents(scope, eventsStr, googleObject, element) {
    angular.forEach(eventsStr.split(' '), function (eventName) {
      var $event = { type: 'map-' + eventName };
      google.maps.event.addListener(googleObject, eventName, function (evt) {
        element.triggerHandler(angular.extend({}, $event, evt));
        if (!scope.$$phase)
          scope.$apply();
      });
    });
  }
  app.directive('uiMap', [
    'ui.config',
    '$parse',
    function (uiConfig, $parse) {
      var mapEvents = 'bounds_changed center_changed click dblclick drag dragend ' + 'dragstart heading_changed idle maptypeid_changed mousemove mouseout ' + 'mouseover projection_changed resize rightclick tilesloaded tilt_changed ' + 'zoom_changed';
      var options = uiConfig.map || {};
      return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
          var opts = angular.extend({}, options, scope.$eval(attrs.uiOptions));
          var map = new google.maps.Map(elm[0], opts);
          var model = $parse(attrs.uiMap);
          model.assign(scope, map);
          bindMapEvents(scope, mapEvents, map, elm);
        }
      };
    }
  ]);
  app.directive('uiMapInfoWindow', [
    'ui.config',
    '$parse',
    '$compile',
    function (uiConfig, $parse, $compile) {
      var infoWindowEvents = 'closeclick content_change domready ' + 'position_changed zindex_changed';
      var options = uiConfig.mapInfoWindow || {};
      return {
        link: function (scope, elm, attrs) {
          var opts = angular.extend({}, options, scope.$eval(attrs.uiOptions));
          opts.content = elm[0];
          var model = $parse(attrs.uiMapInfoWindow);
          var infoWindow = model(scope);
          if (!infoWindow) {
            infoWindow = new google.maps.InfoWindow(opts);
            model.assign(scope, infoWindow);
          }
          bindMapEvents(scope, infoWindowEvents, infoWindow, elm);
          elm.replaceWith('<div></div>');
          var _open = infoWindow.open;
          infoWindow.open = function open(a1, a2, a3, a4, a5, a6) {
            $compile(elm.contents())(scope);
            _open.call(infoWindow, a1, a2, a3, a4, a5, a6);
          };
        }
      };
    }
  ]);
  function mapOverlayDirective(directiveName, events) {
    app.directive(directiveName, [function () {
        return {
          restrict: 'A',
          link: function (scope, elm, attrs) {
            scope.$watch(attrs[directiveName], function (newObject) {
              bindMapEvents(scope, events, newObject, elm);
            });
          }
        };
      }]);
  }
  mapOverlayDirective('uiMapMarker', 'animation_changed click clickable_changed cursor_changed ' + 'dblclick drag dragend draggable_changed dragstart flat_changed icon_changed ' + 'mousedown mouseout mouseover mouseup position_changed rightclick ' + 'shadow_changed shape_changed title_changed visible_changed zindex_changed');
  mapOverlayDirective('uiMapPolyline', 'click dblclick mousedown mousemove mouseout mouseover mouseup rightclick');
  mapOverlayDirective('uiMapPolygon', 'click dblclick mousedown mousemove mouseout mouseover mouseup rightclick');
  mapOverlayDirective('uiMapRectangle', 'bounds_changed click dblclick mousedown mousemove mouseout mouseover ' + 'mouseup rightclick');
  mapOverlayDirective('uiMapCircle', 'center_changed click dblclick mousedown mousemove ' + 'mouseout mouseover mouseup radius_changed rightclick');
  mapOverlayDirective('uiMapGroundOverlay', 'click dblclick');
}());
angular.module('ui.directives').directive('uiMask', [function () {
    return {
      require: 'ngModel',
      link: function ($scope, element, attrs, controller) {
        controller.$render = function () {
          var value = controller.$viewValue || '';
          element.val(value);
          element.mask($scope.$eval(attrs.uiMask));
        };
        controller.$parsers.push(function (value) {
          var isValid = element.isMaskValid() || angular.isUndefined(element.isMaskValid()) && element.val().length > 0;
          controller.$setValidity('mask', isValid);
          return isValid ? value : undefined;
        });
        element.bind('keyup', function () {
          $scope.$apply(function () {
            controller.$setViewValue(element.mask());
          });
        });
      }
    };
  }]);
angular.module('ui.directives').directive('uiReset', [
  'ui.config',
  function (uiConfig) {
    var resetValue = null;
    if (uiConfig.reset !== undefined)
      resetValue = uiConfig.reset;
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ctrl) {
        var aElement;
        aElement = angular.element('<a class="ui-reset" />');
        elm.wrap('<span class="ui-resetwrap" />').after(aElement);
        aElement.bind('click', function (e) {
          e.preventDefault();
          scope.$apply(function () {
            if (attrs.uiReset)
              ctrl.$setViewValue(scope.$eval(attrs.uiReset));
            else
              ctrl.$setViewValue(resetValue);
            ctrl.$render();
          });
        });
      }
    };
  }
]);
angular.module('ui.directives').directive('uiRoute', [
  '$location',
  '$parse',
  function ($location, $parse) {
    return {
      restrict: 'AC',
      compile: function (tElement, tAttrs) {
        var useProperty;
        if (tAttrs.uiRoute) {
          useProperty = 'uiRoute';
        } else if (tAttrs.ngHref) {
          useProperty = 'ngHref';
        } else if (tAttrs.href) {
          useProperty = 'href';
        } else {
          throw new Error('uiRoute missing a route or href property on ' + tElement[0]);
        }
        return function ($scope, elm, attrs) {
          var modelSetter = $parse(attrs.ngModel || attrs.routeModel || '$uiRoute').assign;
          var watcher = angular.noop;
          function staticWatcher(newVal) {
            if ((hash = newVal.indexOf('#')) > -1)
              newVal = newVal.substr(hash + 1);
            watcher = function watchHref() {
              modelSetter($scope, $location.path().indexOf(newVal) > -1);
            };
            watcher();
          }
          function regexWatcher(newVal) {
            if ((hash = newVal.indexOf('#')) > -1)
              newVal = newVal.substr(hash + 1);
            watcher = function watchRegex() {
              var regexp = new RegExp('^' + newVal + '$', ['i']);
              modelSetter($scope, regexp.test($location.path()));
            };
            watcher();
          }
          switch (useProperty) {
          case 'uiRoute':
            if (attrs.uiRoute)
              regexWatcher(attrs.uiRoute);
            else
              attrs.$observe('uiRoute', regexWatcher);
            break;
          case 'ngHref':
            if (attrs.ngHref)
              staticWatcher(attrs.ngHref);
            else
              attrs.$observe('ngHref', staticWatcher);
            break;
          case 'href':
            staticWatcher(attrs.href);
          }
          $scope.$on('$routeChangeSuccess', function () {
            watcher();
          });
        };
      }
    };
  }
]);
angular.module('ui.directives').directive('uiScrollfix', [
  '$window',
  function ($window) {
    'use strict';
    return {
      link: function (scope, elm, attrs) {
        var top = elm.offset().top;
        if (!attrs.uiScrollfix) {
          attrs.uiScrollfix = top;
        } else {
          if (attrs.uiScrollfix.charAt(0) === '-') {
            attrs.uiScrollfix = top - attrs.uiScrollfix.substr(1);
          } else if (attrs.uiScrollfix.charAt(0) === '+') {
            attrs.uiScrollfix = top + parseFloat(attrs.uiScrollfix.substr(1));
          }
        }
        angular.element($window).on('scroll.ui-scrollfix', function () {
          var offset;
          if (angular.isDefined($window.pageYOffset)) {
            offset = $window.pageYOffset;
          } else {
            var iebody = document.compatMode && document.compatMode !== 'BackCompat' ? document.documentElement : document.body;
            offset = iebody.scrollTop;
          }
          if (!elm.hasClass('ui-scrollfix') && offset > attrs.uiScrollfix) {
            elm.addClass('ui-scrollfix');
          } else if (elm.hasClass('ui-scrollfix') && offset < attrs.uiScrollfix) {
            elm.removeClass('ui-scrollfix');
          }
        });
      }
    };
  }
]);
angular.module('ui.directives').directive('uiSelect2', [
  'ui.config',
  '$timeout',
  function (uiConfig, $timeout) {
    var options = {};
    if (uiConfig.select2) {
      angular.extend(options, uiConfig.select2);
    }
    return {
      require: '?ngModel',
      compile: function (tElm, tAttrs) {
        var watch, repeatOption, repeatAttr, isSelect = tElm.is('select'), isMultiple = tAttrs.multiple !== undefined;
        if (tElm.is('select')) {
          repeatOption = tElm.find('option[ng-repeat], option[data-ng-repeat]');
          if (repeatOption.length) {
            repeatAttr = repeatOption.attr('ng-repeat') || repeatOption.attr('data-ng-repeat');
            watch = jQuery.trim(repeatAttr.split('|')[0]).split(' ').pop();
          }
        }
        return function (scope, elm, attrs, controller) {
          var opts = angular.extend({}, options, scope.$eval(attrs.uiSelect2));
          if (isSelect) {
            delete opts.multiple;
            delete opts.initSelection;
          } else if (isMultiple) {
            opts.multiple = true;
          }
          if (controller) {
            controller.$render = function () {
              if (isSelect) {
                elm.select2('val', controller.$modelValue);
              } else {
                if (isMultiple) {
                  if (!controller.$modelValue) {
                    elm.select2('data', []);
                  } else if (angular.isArray(controller.$modelValue)) {
                    elm.select2('data', controller.$modelValue);
                  } else {
                    elm.select2('val', controller.$modelValue);
                  }
                } else {
                  if (angular.isObject(controller.$modelValue)) {
                    elm.select2('data', controller.$modelValue);
                  } else {
                    elm.select2('val', controller.$modelValue);
                  }
                }
              }
            };
            if (watch) {
              scope.$watch(watch, function (newVal, oldVal, scope) {
                if (!newVal)
                  return;
                $timeout(function () {
                  elm.select2('val', controller.$viewValue);
                  elm.trigger('change');
                });
              });
            }
            if (!isSelect) {
              elm.bind('change', function () {
                scope.$apply(function () {
                  controller.$setViewValue(elm.select2('data'));
                });
              });
              if (opts.initSelection) {
                var initSelection = opts.initSelection;
                opts.initSelection = function (element, callback) {
                  initSelection(element, function (value) {
                    controller.$setViewValue(value);
                    callback(value);
                  });
                };
              }
            }
          }
          attrs.$observe('disabled', function (value) {
            elm.select2(value && 'disable' || 'enable');
          });
          if (attrs.ngMultiple) {
            scope.$watch(attrs.ngMultiple, function (newVal) {
              elm.select2(opts);
            });
          }
          elm.val(scope.$eval(attrs.ngModel));
          $timeout(function () {
            elm.select2(opts);
            if (!opts.initSelection && !isSelect)
              controller.$setViewValue(elm.select2('data'));
          });
        };
      }
    };
  }
]);
angular.module('ui.directives').directive('uiShow', [function () {
    return function (scope, elm, attrs) {
      scope.$watch(attrs.uiShow, function (newVal, oldVal) {
        if (newVal) {
          elm.addClass('ui-show');
        } else {
          elm.removeClass('ui-show');
        }
      });
    };
  }]).directive('uiHide', [function () {
    return function (scope, elm, attrs) {
      scope.$watch(attrs.uiHide, function (newVal, oldVal) {
        if (newVal) {
          elm.addClass('ui-hide');
        } else {
          elm.removeClass('ui-hide');
        }
      });
    };
  }]).directive('uiToggle', [function () {
    return function (scope, elm, attrs) {
      scope.$watch(attrs.uiToggle, function (newVal, oldVal) {
        if (newVal) {
          elm.removeClass('ui-hide').addClass('ui-show');
        } else {
          elm.removeClass('ui-show').addClass('ui-hide');
        }
      });
    };
  }]);
angular.module('ui.directives').directive('uiSortable', [
  'ui.config',
  function (uiConfig) {
    return {
      require: '?ngModel',
      link: function (scope, element, attrs, ngModel) {
        var onReceive, onRemove, onStart, onUpdate, opts, _receive, _remove, _start, _update;
        opts = angular.extend({}, uiConfig.sortable, scope.$eval(attrs.uiSortable));
        if (ngModel) {
          ngModel.$render = function () {
            element.sortable('refresh');
          };
          onStart = function (e, ui) {
            ui.item.sortable = { index: ui.item.index() };
          };
          onUpdate = function (e, ui) {
            ui.item.sortable.resort = ngModel;
          };
          onReceive = function (e, ui) {
            ui.item.sortable.relocate = true;
            ngModel.$modelValue.splice(ui.item.index(), 0, ui.item.sortable.moved);
          };
          onRemove = function (e, ui) {
            if (ngModel.$modelValue.length === 1) {
              ui.item.sortable.moved = ngModel.$modelValue.splice(0, 1)[0];
            } else {
              ui.item.sortable.moved = ngModel.$modelValue.splice(ui.item.sortable.index, 1)[0];
            }
          };
          onStop = function (e, ui) {
            if (ui.item.sortable.resort && !ui.item.sortable.relocate) {
              var end, start;
              start = ui.item.sortable.index;
              end = ui.item.index();
              if (start < end)
                end--;
              ui.item.sortable.resort.$modelValue.splice(end, 0, ui.item.sortable.resort.$modelValue.splice(start, 1)[0]);
            }
            if (ui.item.sortable.resort || ui.item.sortable.relocate) {
              scope.$apply();
            }
          };
          _start = opts.start;
          opts.start = function (e, ui) {
            onStart(e, ui);
            if (typeof _start === 'function')
              _start(e, ui);
          };
          _stop = opts.stop;
          opts.stop = function (e, ui) {
            onStop(e, ui);
            if (typeof _stop === 'function')
              _stop(e, ui);
          };
          _update = opts.update;
          opts.update = function (e, ui) {
            onUpdate(e, ui);
            if (typeof _update === 'function')
              _update(e, ui);
          };
          _receive = opts.receive;
          opts.receive = function (e, ui) {
            onReceive(e, ui);
            if (typeof _receive === 'function')
              _receive(e, ui);
          };
          _remove = opts.remove;
          opts.remove = function (e, ui) {
            onRemove(e, ui);
            if (typeof _remove === 'function')
              _remove(e, ui);
          };
        }
        element.sortable(opts);
      }
    };
  }
]);
angular.module('ui.directives').directive('uiTinymce', [
  'ui.config',
  function (uiConfig) {
    uiConfig.tinymce = uiConfig.tinymce || {};
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ngModel) {
        var expression, options = {
            onchange_callback: function (inst) {
              if (inst.isDirty()) {
                inst.save();
                ngModel.$setViewValue(elm.val());
                if (!scope.$$phase)
                  scope.$apply();
              }
            },
            handle_event_callback: function (e) {
              if (this.isDirty()) {
                this.save();
                ngModel.$setViewValue(elm.val());
                if (!scope.$$phase)
                  scope.$apply();
              }
              return true;
            },
            setup: function (ed) {
              ed.onSetContent.add(function (ed, o) {
                if (ed.isDirty()) {
                  ed.save();
                  ngModel.$setViewValue(elm.val());
                  if (!scope.$$phase)
                    scope.$apply();
                }
              });
            }
          };
        if (attrs.uiTinymce) {
          expression = scope.$eval(attrs.uiTinymce);
        } else {
          expression = {};
        }
        angular.extend(options, uiConfig.tinymce, expression);
        setTimeout(function () {
          elm.tinymce(options);
        });
      }
    };
  }
]);
angular.module('ui.directives').directive('uiValidate', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
      var validateFn, watch, validators = {}, validateExpr = scope.$eval(attrs.uiValidate);
      if (!validateExpr)
        return;
      if (angular.isString(validateExpr)) {
        validateExpr = { validator: validateExpr };
      }
      angular.forEach(validateExpr, function (expression, key) {
        validateFn = function (valueToValidate) {
          if (scope.$eval(expression, { '$value': valueToValidate })) {
            ctrl.$setValidity(key, true);
            return valueToValidate;
          } else {
            ctrl.$setValidity(key, false);
            return undefined;
          }
        };
        validators[key] = validateFn;
        ctrl.$formatters.push(validateFn);
        ctrl.$parsers.push(validateFn);
      });
      if (attrs.uiValidateWatch) {
        watch = scope.$eval(attrs.uiValidateWatch);
        if (angular.isString(watch)) {
          scope.$watch(watch, function () {
            angular.forEach(validators, function (validatorFn, key) {
              validatorFn(ctrl.$modelValue);
            });
          });
        } else {
          angular.forEach(watch, function (expression, key) {
            scope.$watch(expression, function () {
              validators[key](ctrl.$modelValue);
            });
          });
        }
      }
    }
  };
});
angular.module('ui.filters').filter('format', function () {
  return function (value, replace) {
    if (!value) {
      return value;
    }
    var target = value.toString(), token;
    if (replace === undefined) {
      return target;
    }
    if (!angular.isArray(replace) && !angular.isObject(replace)) {
      return target.split('$0').join(replace);
    }
    token = angular.isArray(replace) && '$' || ':';
    angular.forEach(replace, function (value, key) {
      target = target.split(token + key).join(value);
    });
    return target;
  };
});
angular.module('ui.filters').filter('highlight', function () {
  return function (text, search, caseSensitive) {
    if (search || angular.isNumber(search)) {
      text = text.toString();
      search = search.toString();
      if (caseSensitive) {
        return text.split(search).join('<span class="ui-match">' + search + '</span>');
      } else {
        return text.replace(new RegExp(search, 'gi'), '<span class="ui-match">$&</span>');
      }
    } else {
      return text;
    }
  };
});
angular.module('ui.filters').filter('inflector', function () {
  function ucwords(text) {
    return text.replace(/^([a-z])|\s+([a-z])/g, function ($1) {
      return $1.toUpperCase();
    });
  }
  function breakup(text, separator) {
    return text.replace(/[A-Z]/g, function (match) {
      return separator + match;
    });
  }
  var inflectors = {
      humanize: function (value) {
        return ucwords(breakup(value, ' ').split('_').join(' '));
      },
      underscore: function (value) {
        return value.substr(0, 1).toLowerCase() + breakup(value.substr(1), '_').toLowerCase().split(' ').join('_');
      },
      variable: function (value) {
        value = value.substr(0, 1).toLowerCase() + ucwords(value.split('_').join(' ')).substr(1).split(' ').join('');
        return value;
      }
    };
  return function (text, inflector, separator) {
    if (inflector !== false && angular.isString(text)) {
      inflector = inflector || 'humanize';
      return inflectors[inflector](text);
    } else {
      return text;
    }
  };
});
angular.module('ui.filters').filter('unique', function () {
  return function (items, filterOn) {
    if (filterOn === false) {
      return items;
    }
    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
      var hashCheck = {}, newItems = [];
      var extractValueToCompare = function (item) {
        if (angular.isObject(item) && angular.isString(filterOn)) {
          return item[filterOn];
        } else {
          return item;
        }
      };
      angular.forEach(items, function (item) {
        var valueToCheck, isDuplicate = false;
        for (var i = 0; i < newItems.length; i++) {
          if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          newItems.push(item);
        }
      });
      items = newItems;
    }
    return items;
  };
});
angular.module('ui.bootstrap', [
  'ui.bootstrap.tpls',
  'ui.bootstrap.accordion',
  'ui.bootstrap.alert',
  'ui.bootstrap.buttons',
  'ui.bootstrap.carousel',
  'ui.bootstrap.collapse',
  'ui.bootstrap.dialog',
  'ui.bootstrap.dropdownToggle',
  'ui.bootstrap.modal',
  'ui.bootstrap.pagination',
  'ui.bootstrap.popover',
  'ui.bootstrap.tabs',
  'ui.bootstrap.tooltip',
  'ui.bootstrap.transition',
  'ui.bootstrap.typeahead'
]);
angular.module('ui.bootstrap.tpls', [
  'template/accordion/accordion-group.html',
  'template/accordion/accordion.html',
  'template/alert/alert.html',
  'template/carousel/carousel.html',
  'template/carousel/slide.html',
  'template/dialog/message.html',
  'template/pagination/pagination.html',
  'template/popover/popover.html',
  'template/tabs/pane.html',
  'template/tabs/tabs.html',
  'template/tooltip/tooltip-popup.html',
  'template/typeahead/typeahead.html'
]);
angular.module('ui.bootstrap.accordion', ['ui.bootstrap.collapse']).constant('accordionConfig', { closeOthers: true }).controller('AccordionController', [
  '$scope',
  '$attrs',
  'accordionConfig',
  function ($scope, $attrs, accordionConfig) {
    this.groups = [];
    this.closeOthers = function (openGroup) {
      var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
      if (closeOthers) {
        angular.forEach(this.groups, function (group) {
          if (group !== openGroup) {
            group.isOpen = false;
          }
        });
      }
    };
    this.addGroup = function (groupScope) {
      var that = this;
      this.groups.push(groupScope);
      groupScope.$on('$destroy', function (event) {
        that.removeGroup(groupScope);
      });
    };
    this.removeGroup = function (group) {
      var index = this.groups.indexOf(group);
      if (index !== -1) {
        this.groups.splice(this.groups.indexOf(group), 1);
      }
    };
  }
]).directive('accordion', function () {
  return {
    restrict: 'EA',
    controller: 'AccordionController',
    transclude: true,
    replace: false,
    templateUrl: 'template/accordion/accordion.html'
  };
}).directive('accordionGroup', [
  '$parse',
  '$transition',
  '$timeout',
  function ($parse, $transition, $timeout) {
    return {
      require: '^accordion',
      restrict: 'EA',
      transclude: true,
      replace: true,
      templateUrl: 'template/accordion/accordion-group.html',
      scope: { heading: '@' },
      controller: [
        '$scope',
        function ($scope) {
          this.setHeading = function (element) {
            this.heading = element;
          };
        }
      ],
      link: function (scope, element, attrs, accordionCtrl) {
        var getIsOpen, setIsOpen;
        accordionCtrl.addGroup(scope);
        scope.isOpen = false;
        if (attrs.isOpen) {
          getIsOpen = $parse(attrs.isOpen);
          setIsOpen = getIsOpen.assign;
          scope.$watch(function watchIsOpen() {
            return getIsOpen(scope.$parent);
          }, function updateOpen(value) {
            scope.isOpen = value;
          });
          scope.isOpen = getIsOpen ? getIsOpen(scope.$parent) : false;
        }
        scope.$watch('isOpen', function (value) {
          if (value) {
            accordionCtrl.closeOthers(scope);
          }
          if (setIsOpen) {
            setIsOpen(scope.$parent, value);
          }
        });
      }
    };
  }
]).directive('accordionHeading', function () {
  return {
    restrict: 'E',
    transclude: true,
    template: '',
    replace: true,
    require: '^accordionGroup',
    compile: function (element, attr, transclude) {
      return function link(scope, element, attr, accordionGroupCtrl) {
        accordionGroupCtrl.setHeading(transclude(scope, function () {
        }));
      };
    }
  };
}).directive('accordionTransclude', function () {
  return {
    require: '^accordionGroup',
    link: function (scope, element, attr, controller) {
      scope.$watch(function () {
        return controller[attr.accordionTransclude];
      }, function (heading) {
        if (heading) {
          element.html('');
          element.append(heading);
        }
      });
    }
  };
});
angular.module('ui.bootstrap.alert', []).directive('alert', function () {
  return {
    restrict: 'EA',
    templateUrl: 'template/alert/alert.html',
    transclude: true,
    replace: true,
    scope: {
      type: '=',
      close: '&'
    }
  };
});
angular.module('ui.bootstrap.buttons', []).constant('buttonConfig', {
  activeClass: 'active',
  toggleEvent: 'click'
}).directive('btnRadio', [
  'buttonConfig',
  function (buttonConfig) {
    var activeClass = buttonConfig.activeClass || 'active';
    var toggleEvent = buttonConfig.toggleEvent || 'click';
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
        var value = scope.$eval(attrs.btnRadio);
        scope.$watch(function () {
          return ngModelCtrl.$modelValue;
        }, function (modelValue) {
          if (angular.equals(modelValue, value)) {
            element.addClass(activeClass);
          } else {
            element.removeClass(activeClass);
          }
        });
        element.bind(toggleEvent, function () {
          if (!element.hasClass(activeClass)) {
            scope.$apply(function () {
              ngModelCtrl.$setViewValue(value);
            });
          }
        });
      }
    };
  }
]).directive('btnCheckbox', [
  'buttonConfig',
  function (buttonConfig) {
    var activeClass = buttonConfig.activeClass || 'active';
    var toggleEvent = buttonConfig.toggleEvent || 'click';
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
        var trueValue = scope.$eval(attrs.btnCheckboxTrue);
        var falseValue = scope.$eval(attrs.btnCheckboxFalse);
        trueValue = angular.isDefined(trueValue) ? trueValue : true;
        falseValue = angular.isDefined(falseValue) ? falseValue : false;
        scope.$watch(function () {
          return ngModelCtrl.$modelValue;
        }, function (modelValue) {
          if (angular.equals(modelValue, trueValue)) {
            element.addClass(activeClass);
          } else {
            element.removeClass(activeClass);
          }
        });
        element.bind(toggleEvent, function () {
          scope.$apply(function () {
            ngModelCtrl.$setViewValue(element.hasClass(activeClass) ? falseValue : trueValue);
          });
        });
      }
    };
  }
]);
angular.module('ui.bootstrap.carousel', ['ui.bootstrap.transition']).controller('CarouselController', [
  '$scope',
  '$timeout',
  '$transition',
  '$q',
  function ($scope, $timeout, $transition, $q) {
    var self = this, slides = self.slides = [], currentIndex = -1, currentTimeout, isPlaying;
    self.currentSlide = null;
    self.select = function (nextSlide, direction) {
      var nextIndex = slides.indexOf(nextSlide);
      if (direction === undefined) {
        direction = nextIndex > currentIndex ? 'next' : 'prev';
      }
      if (nextSlide && nextSlide !== self.currentSlide) {
        if ($scope.$currentTransition) {
          $scope.$currentTransition.cancel();
          $timeout(goNext);
        } else {
          goNext();
        }
      }
      function goNext() {
        if (self.currentSlide && angular.isString(direction) && !$scope.noTransition && nextSlide.$element) {
          nextSlide.$element.addClass(direction);
          nextSlide.$element[0].offsetWidth = nextSlide.$element[0].offsetWidth;
          angular.forEach(slides, function (slide) {
            angular.extend(slide, {
              direction: '',
              entering: false,
              leaving: false,
              active: false
            });
          });
          angular.extend(nextSlide, {
            direction: direction,
            active: true,
            entering: true
          });
          angular.extend(self.currentSlide || {}, {
            direction: direction,
            leaving: true
          });
          $scope.$currentTransition = $transition(nextSlide.$element, {});
          (function (next, current) {
            $scope.$currentTransition.then(function () {
              transitionDone(next, current);
            }, function () {
              transitionDone(next, current);
            });
          }(nextSlide, self.currentSlide));
        } else {
          transitionDone(nextSlide, self.currentSlide);
        }
        self.currentSlide = nextSlide;
        currentIndex = nextIndex;
        restartTimer();
      }
      function transitionDone(next, current) {
        angular.extend(next, {
          direction: '',
          active: true,
          leaving: false,
          entering: false
        });
        angular.extend(current || {}, {
          direction: '',
          active: false,
          leaving: false,
          entering: false
        });
        $scope.$currentTransition = null;
      }
    };
    self.indexOfSlide = function (slide) {
      return slides.indexOf(slide);
    };
    $scope.next = function () {
      var newIndex = (currentIndex + 1) % slides.length;
      return self.select(slides[newIndex], 'next');
    };
    $scope.prev = function () {
      var newIndex = currentIndex - 1 < 0 ? slides.length - 1 : currentIndex - 1;
      return self.select(slides[newIndex], 'prev');
    };
    $scope.select = function (slide) {
      self.select(slide);
    };
    $scope.isActive = function (slide) {
      return self.currentSlide === slide;
    };
    $scope.slides = function () {
      return slides;
    };
    $scope.$watch('interval', restartTimer);
    function restartTimer() {
      if (currentTimeout) {
        $timeout.cancel(currentTimeout);
      }
      function go() {
        if (isPlaying) {
          $scope.next();
          restartTimer();
        } else {
          $scope.pause();
        }
      }
      var interval = +$scope.interval;
      if (!isNaN(interval) && interval >= 0) {
        currentTimeout = $timeout(go, interval);
      }
    }
    $scope.play = function () {
      if (!isPlaying) {
        isPlaying = true;
        restartTimer();
      }
    };
    $scope.pause = function () {
      isPlaying = false;
      if (currentTimeout) {
        $timeout.cancel(currentTimeout);
      }
    };
    self.addSlide = function (slide, element) {
      slide.$element = element;
      slides.push(slide);
      if (slides.length === 1 || slide.active) {
        self.select(slides[slides.length - 1]);
        if (slides.length == 1) {
          $scope.play();
        }
      } else {
        slide.active = false;
      }
    };
    self.removeSlide = function (slide) {
      var index = slides.indexOf(slide);
      slides.splice(index, 1);
      if (slides.length > 0 && slide.active) {
        if (index >= slides.length) {
          self.select(slides[index - 1]);
        } else {
          self.select(slides[index]);
        }
      }
    };
  }
]).directive('carousel', [function () {
    return {
      restrict: 'EA',
      transclude: true,
      replace: true,
      controller: 'CarouselController',
      require: 'carousel',
      templateUrl: 'template/carousel/carousel.html',
      scope: {
        interval: '=',
        noTransition: '='
      }
    };
  }]).directive('slide', [function () {
    return {
      require: '^carousel',
      restrict: 'EA',
      transclude: true,
      replace: true,
      templateUrl: 'template/carousel/slide.html',
      scope: { active: '=' },
      link: function (scope, element, attrs, carouselCtrl) {
        carouselCtrl.addSlide(scope, element);
        scope.$on('$destroy', function () {
          carouselCtrl.removeSlide(scope);
        });
        scope.$watch('active', function (active) {
          if (active) {
            carouselCtrl.select(scope);
          }
        });
      }
    };
  }]);
angular.module('ui.bootstrap.collapse', ['ui.bootstrap.transition']).directive('collapse', [
  '$transition',
  function ($transition) {
    var fixUpHeight = function (scope, element, height) {
      element.removeClass('collapse');
      element.css({ height: height });
      var x = element[0].offsetWidth;
      element.addClass('collapse');
    };
    return {
      link: function (scope, element, attrs) {
        var isCollapsed;
        var initialAnimSkip = true;
        scope.$watch(function () {
          return element[0].scrollHeight;
        }, function (value) {
          if (element[0].scrollHeight !== 0) {
            if (!isCollapsed) {
              if (initialAnimSkip) {
                fixUpHeight(scope, element, element[0].scrollHeight + 'px');
              } else {
                fixUpHeight(scope, element, 'auto');
              }
            }
          }
        });
        scope.$watch(attrs.collapse, function (value) {
          if (value) {
            collapse();
          } else {
            expand();
          }
        });
        var currentTransition;
        var doTransition = function (change) {
          if (currentTransition) {
            currentTransition.cancel();
          }
          currentTransition = $transition(element, change);
          currentTransition.then(function () {
            currentTransition = undefined;
          }, function () {
            currentTransition = undefined;
          });
          return currentTransition;
        };
        var expand = function () {
          if (initialAnimSkip) {
            initialAnimSkip = false;
            if (!isCollapsed) {
              fixUpHeight(scope, element, 'auto');
            }
          } else {
            doTransition({ height: element[0].scrollHeight + 'px' }).then(function () {
              if (!isCollapsed) {
                fixUpHeight(scope, element, 'auto');
              }
            });
          }
          isCollapsed = false;
        };
        var collapse = function () {
          isCollapsed = true;
          if (initialAnimSkip) {
            initialAnimSkip = false;
            fixUpHeight(scope, element, 0);
          } else {
            fixUpHeight(scope, element, element[0].scrollHeight + 'px');
            doTransition({ 'height': '0' });
          }
        };
      }
    };
  }
]);
var dialogModule = angular.module('ui.bootstrap.dialog', ['ui.bootstrap.transition']);
dialogModule.controller('MessageBoxController', [
  '$scope',
  'dialog',
  'model',
  function ($scope, dialog, model) {
    $scope.title = model.title;
    $scope.message = model.message;
    $scope.buttons = model.buttons;
    $scope.close = function (res) {
      dialog.close(res);
    };
  }
]);
dialogModule.provider('$dialog', function () {
  var defaults = {
      backdrop: true,
      dialogClass: 'modal',
      backdropClass: 'modal-backdrop',
      transitionClass: 'fade',
      triggerClass: 'in',
      dialogOpenClass: 'modal-open',
      resolve: {},
      backdropFade: false,
      dialogFade: false,
      keyboard: true,
      backdropClick: true
    };
  var globalOptions = {};
  var activeBackdrops = { value: 0 };
  this.options = function (value) {
    globalOptions = value;
  };
  this.$get = [
    '$http',
    '$document',
    '$compile',
    '$rootScope',
    '$controller',
    '$templateCache',
    '$q',
    '$transition',
    '$injector',
    function ($http, $document, $compile, $rootScope, $controller, $templateCache, $q, $transition, $injector) {
      var body = $document.find('body');
      function createElement(clazz) {
        var el = angular.element('<div>');
        el.addClass(clazz);
        return el;
      }
      function Dialog(opts) {
        var self = this, options = this.options = angular.extend({}, defaults, globalOptions, opts);
        this.backdropEl = createElement(options.backdropClass);
        if (options.backdropFade) {
          this.backdropEl.addClass(options.transitionClass);
          this.backdropEl.removeClass(options.triggerClass);
        }
        this.modalEl = createElement(options.dialogClass);
        if (options.dialogFade) {
          this.modalEl.addClass(options.transitionClass);
          this.modalEl.removeClass(options.triggerClass);
        }
        this.handledEscapeKey = function (e) {
          if (e.which === 27) {
            self.close();
            e.preventDefault();
            self.$scope.$apply();
          }
        };
        this.handleBackDropClick = function (e) {
          self.close();
          e.preventDefault();
          self.$scope.$apply();
        };
      }
      Dialog.prototype.isOpen = function () {
        return this._open;
      };
      Dialog.prototype.open = function (templateUrl, controller) {
        var self = this, options = this.options;
        if (templateUrl) {
          options.templateUrl = templateUrl;
        }
        if (controller) {
          options.controller = controller;
        }
        if (!(options.template || options.templateUrl)) {
          throw new Error('Dialog.open expected template or templateUrl, neither found. Use options or open method to specify them.');
        }
        this._loadResolves().then(function (locals) {
          var $scope = locals.$scope = self.$scope = locals.$scope ? locals.$scope : $rootScope.$new();
          self.modalEl.html(locals.$template);
          if (self.options.controller) {
            var ctrl = $controller(self.options.controller, locals);
            self.modalEl.contents().data('ngControllerController', ctrl);
          }
          $compile(self.modalEl)($scope);
          self._addElementsToDom();
          body.addClass(self.options.dialogOpenClass);
          setTimeout(function () {
            if (self.options.dialogFade) {
              self.modalEl.addClass(self.options.triggerClass);
            }
            if (self.options.backdropFade) {
              self.backdropEl.addClass(self.options.triggerClass);
            }
          });
          self._bindEvents();
        });
        this.deferred = $q.defer();
        return this.deferred.promise;
      };
      Dialog.prototype.close = function (result) {
        var self = this;
        var fadingElements = this._getFadingElements();
        body.removeClass(self.options.dialogOpenClass);
        if (fadingElements.length > 0) {
          for (var i = fadingElements.length - 1; i >= 0; i--) {
            $transition(fadingElements[i], removeTriggerClass).then(onCloseComplete);
          }
          return;
        }
        this._onCloseComplete(result);
        function removeTriggerClass(el) {
          el.removeClass(self.options.triggerClass);
        }
        function onCloseComplete() {
          if (self._open) {
            self._onCloseComplete(result);
          }
        }
      };
      Dialog.prototype._getFadingElements = function () {
        var elements = [];
        if (this.options.dialogFade) {
          elements.push(this.modalEl);
        }
        if (this.options.backdropFade) {
          elements.push(this.backdropEl);
        }
        return elements;
      };
      Dialog.prototype._bindEvents = function () {
        if (this.options.keyboard) {
          body.bind('keydown', this.handledEscapeKey);
        }
        if (this.options.backdrop && this.options.backdropClick) {
          this.backdropEl.bind('click', this.handleBackDropClick);
        }
      };
      Dialog.prototype._unbindEvents = function () {
        if (this.options.keyboard) {
          body.unbind('keydown', this.handledEscapeKey);
        }
        if (this.options.backdrop && this.options.backdropClick) {
          this.backdropEl.unbind('click', this.handleBackDropClick);
        }
      };
      Dialog.prototype._onCloseComplete = function (result) {
        this._removeElementsFromDom();
        this._unbindEvents();
        this.deferred.resolve(result);
      };
      Dialog.prototype._addElementsToDom = function () {
        body.append(this.modalEl);
        if (this.options.backdrop) {
          if (activeBackdrops.value === 0) {
            body.append(this.backdropEl);
          }
          activeBackdrops.value++;
        }
        this._open = true;
      };
      Dialog.prototype._removeElementsFromDom = function () {
        this.modalEl.remove();
        if (this.options.backdrop) {
          activeBackdrops.value--;
          if (activeBackdrops.value === 0) {
            this.backdropEl.remove();
          }
        }
        this._open = false;
      };
      Dialog.prototype._loadResolves = function () {
        var values = [], keys = [], templatePromise, self = this;
        if (this.options.template) {
          templatePromise = $q.when(this.options.template);
        } else if (this.options.templateUrl) {
          templatePromise = $http.get(this.options.templateUrl, { cache: $templateCache }).then(function (response) {
            return response.data;
          });
        }
        angular.forEach(this.options.resolve || [], function (value, key) {
          keys.push(key);
          values.push(angular.isString(value) ? $injector.get(value) : $injector.invoke(value));
        });
        keys.push('$template');
        values.push(templatePromise);
        return $q.all(values).then(function (values) {
          var locals = {};
          angular.forEach(values, function (value, index) {
            locals[keys[index]] = value;
          });
          locals.dialog = self;
          return locals;
        });
      };
      return {
        dialog: function (opts) {
          return new Dialog(opts);
        },
        messageBox: function (title, message, buttons) {
          return new Dialog({
            templateUrl: 'template/dialog/message.html',
            controller: 'MessageBoxController',
            resolve: {
              model: function () {
                return {
                  title: title,
                  message: message,
                  buttons: buttons
                };
              }
            }
          });
        }
      };
    }
  ];
});
angular.module('ui.bootstrap.dropdownToggle', []).directive('dropdownToggle', [
  '$document',
  '$location',
  '$window',
  function ($document, $location, $window) {
    var openElement = null, close;
    return {
      restrict: 'CA',
      link: function (scope, element, attrs) {
        scope.$watch(function dropdownTogglePathWatch() {
          return $location.path();
        }, function dropdownTogglePathWatchAction() {
          if (close) {
            close();
          }
        });
        element.parent().bind('click', function (event) {
          if (close) {
            close();
          }
        });
        element.bind('click', function (event) {
          event.preventDefault();
          event.stopPropagation();
          var iWasOpen = false;
          if (openElement) {
            iWasOpen = openElement === element;
            close();
          }
          if (!iWasOpen) {
            element.parent().addClass('open');
            openElement = element;
            close = function (event) {
              if (event) {
                event.preventDefault();
                event.stopPropagation();
              }
              $document.unbind('click', close);
              element.parent().removeClass('open');
              close = null;
              openElement = null;
            };
            $document.bind('click', close);
          }
        });
      }
    };
  }
]);
angular.module('ui.bootstrap.modal', ['ui.bootstrap.dialog']).directive('modal', [
  '$parse',
  '$dialog',
  function ($parse, $dialog) {
    var backdropEl;
    var body = angular.element(document.getElementsByTagName('body')[0]);
    return {
      restrict: 'EA',
      terminal: true,
      link: function (scope, elm, attrs) {
        var opts = angular.extend({}, scope.$eval(attrs.uiOptions || attrs.bsOptions || attrs.options));
        var shownExpr = attrs.modal || attrs.show;
        var setClosed;
        opts = angular.extend(opts, {
          template: elm.html(),
          resolve: {
            $scope: function () {
              return scope;
            }
          }
        });
        var dialog = $dialog.dialog(opts);
        elm.remove();
        if (attrs.close) {
          setClosed = function () {
            $parse(attrs.close)(scope);
          };
        } else {
          setClosed = function () {
            if (angular.isFunction($parse(shownExpr).assign)) {
              $parse(shownExpr).assign(scope, false);
            }
          };
        }
        scope.$watch(shownExpr, function (isShown, oldShown) {
          if (isShown) {
            dialog.open().then(function () {
              setClosed();
            });
          } else {
            if (dialog.isOpen()) {
              dialog.close();
            }
          }
        });
      }
    };
  }
]);
angular.module('ui.bootstrap.pagination', []).constant('paginationConfig', {
  boundaryLinks: false,
  directionLinks: true,
  firstText: 'First',
  previousText: 'Previous',
  nextText: 'Next',
  lastText: 'Last'
}).directive('pagination', [
  'paginationConfig',
  function (paginationConfig) {
    return {
      restrict: 'EA',
      scope: {
        numPages: '=',
        currentPage: '=',
        maxSize: '=',
        onSelectPage: '&'
      },
      templateUrl: 'template/pagination/pagination.html',
      replace: true,
      link: function (scope, element, attrs) {
        var boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$eval(attrs.boundaryLinks) : paginationConfig.boundaryLinks;
        var directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$eval(attrs.directionLinks) : paginationConfig.directionLinks;
        var firstText = angular.isDefined(attrs.firstText) ? attrs.firstText : paginationConfig.firstText;
        var previousText = angular.isDefined(attrs.previousText) ? attrs.previousText : paginationConfig.previousText;
        var nextText = angular.isDefined(attrs.nextText) ? attrs.nextText : paginationConfig.nextText;
        var lastText = angular.isDefined(attrs.lastText) ? attrs.lastText : paginationConfig.lastText;
        function makePage(number, text, isActive, isDisabled) {
          return {
            number: number,
            text: text,
            active: isActive,
            disabled: isDisabled
          };
        }
        scope.$watch('numPages + currentPage + maxSize', function () {
          scope.pages = [];
          var maxSize = scope.maxSize && scope.maxSize < scope.numPages ? scope.maxSize : scope.numPages;
          var startPage = scope.currentPage - Math.floor(maxSize / 2);
          if (startPage < 1) {
            startPage = 1;
          }
          if (startPage + maxSize - 1 > scope.numPages) {
            startPage = startPage - (startPage + maxSize - 1 - scope.numPages);
          }
          for (var number = startPage, max = startPage + maxSize; number < max; number++) {
            var page = makePage(number, number, scope.isActive(number), false);
            scope.pages.push(page);
          }
          if (directionLinks) {
            var previousPage = makePage(scope.currentPage - 1, previousText, false, scope.noPrevious());
            scope.pages.unshift(previousPage);
            var nextPage = makePage(scope.currentPage + 1, nextText, false, scope.noNext());
            scope.pages.push(nextPage);
          }
          if (boundaryLinks) {
            var firstPage = makePage(1, firstText, false, scope.noPrevious());
            scope.pages.unshift(firstPage);
            var lastPage = makePage(scope.numPages, lastText, false, scope.noNext());
            scope.pages.push(lastPage);
          }
          if (scope.currentPage > scope.numPages) {
            scope.selectPage(scope.numPages);
          }
        });
        scope.noPrevious = function () {
          return scope.currentPage === 1;
        };
        scope.noNext = function () {
          return scope.currentPage === scope.numPages;
        };
        scope.isActive = function (page) {
          return scope.currentPage === page;
        };
        scope.selectPage = function (page) {
          if (!scope.isActive(page) && page > 0 && page <= scope.numPages) {
            scope.currentPage = page;
            scope.onSelectPage({ page: page });
          }
        };
      }
    };
  }
]);
angular.module('ui.bootstrap.popover', []).directive('popoverPopup', function () {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      popoverTitle: '@',
      popoverContent: '@',
      placement: '@',
      animation: '&',
      isOpen: '&'
    },
    templateUrl: 'template/popover/popover.html'
  };
}).directive('popover', [
  '$compile',
  '$timeout',
  '$parse',
  '$window',
  function ($compile, $timeout, $parse, $window) {
    var template = '<popover-popup ' + 'popover-title="{{tt_title}}" ' + 'popover-content="{{tt_popover}}" ' + 'placement="{{tt_placement}}" ' + 'animation="tt_animation()" ' + 'is-open="tt_isOpen"' + '>' + '</popover-popup>';
    return {
      scope: true,
      link: function (scope, element, attr) {
        var popover = $compile(template)(scope), transitionTimeout;
        attr.$observe('popover', function (val) {
          scope.tt_popover = val;
        });
        attr.$observe('popoverTitle', function (val) {
          scope.tt_title = val;
        });
        attr.$observe('popoverPlacement', function (val) {
          scope.tt_placement = val || 'top';
        });
        attr.$observe('popoverAnimation', function (val) {
          scope.tt_animation = $parse(val);
        });
        scope.tt_isOpen = false;
        function getPosition() {
          var boundingClientRect = element[0].getBoundingClientRect();
          return {
            width: element.prop('offsetWidth'),
            height: element.prop('offsetHeight'),
            top: boundingClientRect.top + $window.pageYOffset,
            left: boundingClientRect.left + $window.pageXOffset
          };
        }
        function show() {
          var position, ttWidth, ttHeight, ttPosition;
          if (transitionTimeout) {
            $timeout.cancel(transitionTimeout);
          }
          popover.css({
            top: 0,
            left: 0,
            display: 'block'
          });
          element.after(popover);
          position = getPosition();
          ttWidth = popover.prop('offsetWidth');
          ttHeight = popover.prop('offsetHeight');
          switch (scope.tt_placement) {
          case 'right':
            ttPosition = {
              top: position.top + position.height / 2 - ttHeight / 2 + 'px',
              left: position.left + position.width + 'px'
            };
            break;
          case 'bottom':
            ttPosition = {
              top: position.top + position.height + 'px',
              left: position.left + position.width / 2 - ttWidth / 2 + 'px'
            };
            break;
          case 'left':
            ttPosition = {
              top: position.top + position.height / 2 - ttHeight / 2 + 'px',
              left: position.left - ttWidth + 'px'
            };
            break;
          default:
            ttPosition = {
              top: position.top - ttHeight + 'px',
              left: position.left + position.width / 2 - ttWidth / 2 + 'px'
            };
            break;
          }
          popover.css(ttPosition);
          scope.tt_isOpen = true;
        }
        function hide() {
          scope.tt_isOpen = false;
          if (angular.isDefined(scope.tt_animation) && scope.tt_animation()) {
            transitionTimeout = $timeout(function () {
              popover.remove();
            }, 500);
          } else {
            popover.remove();
          }
        }
        element.bind('click', function () {
          if (scope.tt_isOpen) {
            scope.$apply(hide);
          } else {
            scope.$apply(show);
          }
        });
      }
    };
  }
]);
angular.module('ui.bootstrap.tabs', []).controller('TabsController', [
  '$scope',
  '$element',
  function ($scope, $element) {
    var panes = $scope.panes = [];
    this.select = $scope.select = function selectPane(pane) {
      angular.forEach(panes, function (pane) {
        pane.selected = false;
      });
      pane.selected = true;
    };
    this.addPane = function addPane(pane) {
      if (!panes.length) {
        $scope.select(pane);
      }
      panes.push(pane);
    };
    this.removePane = function removePane(pane) {
      var index = panes.indexOf(pane);
      panes.splice(index, 1);
      if (pane.selected && panes.length > 0) {
        $scope.select(panes[index < panes.length ? index : index - 1]);
      }
    };
  }
]).directive('tabs', function () {
  return {
    restrict: 'EA',
    transclude: true,
    scope: {},
    controller: 'TabsController',
    templateUrl: 'template/tabs/tabs.html',
    replace: true
  };
}).directive('pane', [
  '$parse',
  function ($parse) {
    return {
      require: '^tabs',
      restrict: 'EA',
      transclude: true,
      scope: { heading: '@' },
      link: function (scope, element, attrs, tabsCtrl) {
        var getSelected, setSelected;
        scope.selected = false;
        if (attrs.active) {
          getSelected = $parse(attrs.active);
          setSelected = getSelected.assign;
          scope.$watch(function watchSelected() {
            return getSelected(scope.$parent);
          }, function updateSelected(value) {
            scope.selected = value;
          });
          scope.selected = getSelected ? getSelected(scope.$parent) : false;
        }
        scope.$watch('selected', function (selected) {
          if (selected) {
            tabsCtrl.select(scope);
          }
          if (setSelected) {
            setSelected(scope.$parent, selected);
          }
        });
        tabsCtrl.addPane(scope);
        scope.$on('$destroy', function () {
          tabsCtrl.removePane(scope);
        });
      },
      templateUrl: 'template/tabs/pane.html',
      replace: true
    };
  }
]);
angular.module('ui.bootstrap.tooltip', []).directive('tooltipPopup', function () {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      tooltipTitle: '@',
      placement: '@',
      animation: '&',
      isOpen: '&'
    },
    templateUrl: 'template/tooltip/tooltip-popup.html'
  };
}).directive('tooltip', [
  '$compile',
  '$timeout',
  '$parse',
  '$window',
  function ($compile, $timeout, $parse, $window) {
    var template = '<tooltip-popup ' + 'tooltip-title="{{tt_tooltip}}" ' + 'placement="{{tt_placement}}" ' + 'animation="tt_animation()" ' + 'is-open="tt_isOpen"' + '>' + '</tooltip-popup>';
    return {
      scope: true,
      link: function (scope, element, attr) {
        var tooltip = $compile(template)(scope), transitionTimeout;
        attr.$observe('tooltip', function (val) {
          scope.tt_tooltip = val;
        });
        attr.$observe('tooltipPlacement', function (val) {
          scope.tt_placement = val || 'top';
        });
        attr.$observe('tooltipAnimation', function (val) {
          scope.tt_animation = $parse(val);
        });
        scope.tt_isOpen = false;
        function getPosition() {
          var boundingClientRect = element[0].getBoundingClientRect();
          return {
            width: element.prop('offsetWidth'),
            height: element.prop('offsetHeight'),
            top: boundingClientRect.top + $window.pageYOffset,
            left: boundingClientRect.left + $window.pageXOffset
          };
        }
        function show() {
          var position, ttWidth, ttHeight, ttPosition;
          if (!scope.tt_tooltip) {
            return;
          }
          if (transitionTimeout) {
            $timeout.cancel(transitionTimeout);
          }
          tooltip.css({
            top: 0,
            left: 0,
            display: 'block'
          });
          element.after(tooltip);
          position = getPosition();
          ttWidth = tooltip.prop('offsetWidth');
          ttHeight = tooltip.prop('offsetHeight');
          switch (scope.tt_placement) {
          case 'right':
            ttPosition = {
              top: position.top + position.height / 2 - ttHeight / 2 + 'px',
              left: position.left + position.width + 'px'
            };
            break;
          case 'bottom':
            ttPosition = {
              top: position.top + position.height + 'px',
              left: position.left + position.width / 2 - ttWidth / 2 + 'px'
            };
            break;
          case 'left':
            ttPosition = {
              top: position.top + position.height / 2 - ttHeight / 2 + 'px',
              left: position.left - ttWidth + 'px'
            };
            break;
          default:
            ttPosition = {
              top: position.top - ttHeight + 'px',
              left: position.left + position.width / 2 - ttWidth / 2 + 'px'
            };
            break;
          }
          tooltip.css(ttPosition);
          scope.tt_isOpen = true;
        }
        function hide() {
          scope.tt_isOpen = false;
          if (angular.isDefined(scope.tt_animation) && scope.tt_animation()) {
            transitionTimeout = $timeout(function () {
              tooltip.remove();
            }, 500);
          } else {
            tooltip.remove();
          }
        }
        element.bind('mouseenter', function () {
          scope.$apply(show);
        });
        element.bind('mouseleave', function () {
          scope.$apply(hide);
        });
      }
    };
  }
]);
angular.module('ui.bootstrap.transition', []).factory('$transition', [
  '$q',
  '$timeout',
  '$rootScope',
  function ($q, $timeout, $rootScope) {
    var $transition = function (element, trigger, options) {
      options = options || {};
      var deferred = $q.defer();
      var endEventName = $transition[options.animation ? 'animationEndEventName' : 'transitionEndEventName'];
      var transitionEndHandler = function (event) {
        $rootScope.$apply(function () {
          element.unbind(endEventName, transitionEndHandler);
          deferred.resolve(element);
        });
      };
      if (endEventName) {
        element.bind(endEventName, transitionEndHandler);
      }
      $timeout(function () {
        if (angular.isString(trigger)) {
          element.addClass(trigger);
        } else if (angular.isFunction(trigger)) {
          trigger(element);
        } else if (angular.isObject(trigger)) {
          element.css(trigger);
        }
        if (!endEventName) {
          deferred.resolve(element);
        }
      });
      deferred.promise.cancel = function () {
        if (endEventName) {
          element.unbind(endEventName, transitionEndHandler);
        }
        deferred.reject('Transition cancelled');
      };
      return deferred.promise;
    };
    var transElement = document.createElement('trans');
    var transitionEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd',
        'transition': 'transitionend'
      };
    var animationEndEventNames = {
        'WebkitTransition': 'webkitAnimationEnd',
        'MozTransition': 'animationend',
        'OTransition': 'oAnimationEnd',
        'msTransition': 'MSAnimationEnd',
        'transition': 'animationend'
      };
    function findEndEventName(endEventNames) {
      for (var name in endEventNames) {
        if (transElement.style[name] !== undefined) {
          return endEventNames[name];
        }
      }
    }
    $transition.transitionEndEventName = findEndEventName(transitionEndEventNames);
    $transition.animationEndEventName = findEndEventName(animationEndEventNames);
    return $transition;
  }
]);
angular.module('ui.bootstrap.typeahead', []).factory('typeaheadParser', [
  '$parse',
  function ($parse) {
    var TYPEAHEAD_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;
    return {
      parse: function (input) {
        var match = input.match(TYPEAHEAD_REGEXP), modelMapper, viewMapper, source;
        if (!match) {
          throw new Error('Expected typeahead specification in form of \'_modelValue_ (as _label_)? for _item_ in _collection_\'' + ' but got \'' + input + '\'.');
        }
        return {
          itemName: match[3],
          source: $parse(match[4]),
          viewMapper: $parse(match[2] || match[1]),
          modelMapper: $parse(match[1])
        };
      }
    };
  }
]).directive('typeahead', [
  '$compile',
  '$q',
  'typeaheadParser',
  function ($compile, $q, typeaheadParser) {
    var HOT_KEYS = [
        9,
        13,
        27,
        38,
        40
      ];
    return {
      require: 'ngModel',
      link: function (originalScope, element, attrs, modelCtrl) {
        var selected = modelCtrl.$modelValue;
        var minSearch = originalScope.$eval(attrs.typeaheadMinLength) || 1;
        var parserResult = typeaheadParser.parse(attrs.typeahead);
        var scope = originalScope.$new();
        originalScope.$on('$destroy', function () {
          scope.$destroy();
        });
        var resetMatches = function () {
          scope.matches = [];
          scope.activeIdx = -1;
        };
        var getMatchesAsync = function (inputValue) {
          var locals = { $viewValue: inputValue };
          $q.when(parserResult.source(scope, locals)).then(function (matches) {
            if (inputValue === modelCtrl.$viewValue) {
              if (matches.length > 0) {
                scope.activeIdx = 0;
                scope.matches.length = 0;
                for (var i = 0; i < matches.length; i++) {
                  locals[parserResult.itemName] = matches[i];
                  scope.matches.push({
                    label: parserResult.viewMapper(scope, locals),
                    model: matches[i]
                  });
                }
                scope.query = inputValue;
              } else {
                resetMatches();
              }
            }
          }, resetMatches);
        };
        resetMatches();
        scope.query = undefined;
        modelCtrl.$parsers.push(function (inputValue) {
          resetMatches();
          if (selected) {
            return inputValue;
          } else {
            if (inputValue && inputValue.length >= minSearch) {
              getMatchesAsync(inputValue);
            }
          }
          return undefined;
        });
        modelCtrl.$render = function () {
          var locals = {};
          locals[parserResult.itemName] = selected;
          element.val(parserResult.viewMapper(scope, locals) || modelCtrl.$viewValue);
          selected = undefined;
        };
        scope.select = function (activeIdx) {
          var locals = {};
          locals[parserResult.itemName] = selected = scope.matches[activeIdx].model;
          modelCtrl.$setViewValue(parserResult.modelMapper(scope, locals));
          modelCtrl.$render();
        };
        element.bind('keydown', function (evt) {
          if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
            return;
          }
          evt.preventDefault();
          if (evt.which === 40) {
            scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
            scope.$digest();
          } else if (evt.which === 38) {
            scope.activeIdx = (scope.activeIdx ? scope.activeIdx : scope.matches.length) - 1;
            scope.$digest();
          } else if (evt.which === 13 || evt.which === 9) {
            scope.$apply(function () {
              scope.select(scope.activeIdx);
            });
          } else if (evt.which === 27) {
            scope.matches = [];
            scope.$digest();
          }
        });
        var tplElCompiled = $compile('<typeahead-popup matches=\'matches\' active=\'activeIdx\' select=\'select(activeIdx)\' ' + 'query=\'query\'></typeahead-popup>')(scope);
        element.after(tplElCompiled);
      }
    };
  }
]).directive('typeaheadPopup', function () {
  return {
    restrict: 'E',
    scope: {
      matches: '=',
      query: '=',
      active: '=',
      select: '&'
    },
    replace: true,
    templateUrl: 'template/typeahead/typeahead.html',
    link: function (scope, element, attrs) {
      scope.isOpen = function () {
        return scope.matches.length > 0;
      };
      scope.isActive = function (matchIdx) {
        return scope.active == matchIdx;
      };
      scope.selectActive = function (matchIdx) {
        scope.active = matchIdx;
      };
      scope.selectMatch = function (activeIdx) {
        scope.select({ activeIdx: activeIdx });
      };
    }
  };
}).filter('typeaheadHighlight', function () {
  return function (matchItem, query) {
    return query ? matchItem.replace(new RegExp(query, 'gi'), '<strong>$&</strong>') : query;
  };
});
angular.module('template/accordion/accordion-group.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/accordion/accordion-group.html', '<div class="accordion-group">' + '  <div class="accordion-heading" ><a class="accordion-toggle" ng-click="isOpen = !isOpen" accordion-transclude="heading">{{heading}}</a></div>' + '  <div class="accordion-body" collapse="!isOpen">' + '    <div class="accordion-inner" ng-transclude></div>  </div>' + '</div>');
  }
]);
angular.module('template/accordion/accordion.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/accordion/accordion.html', '<div class="accordion" ng-transclude></div>');
  }
]);
angular.module('template/alert/alert.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/alert/alert.html', '<div class=\'alert\' ng-class=\'type && "alert-" + type\'>' + '    <button type=\'button\' class=\'close\' ng-click=\'close()\'>&times;</button>' + '    <div ng-transclude></div>' + '</div>');
  }
]);
angular.module('template/carousel/carousel.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/carousel/carousel.html', '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel">' + '    <ol class="carousel-indicators">' + '        <li ng-repeat="slide in slides()" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>' + '    </ol>' + '    <div class="carousel-inner" ng-transclude></div>' + '    <a ng-click="prev()" class="carousel-control left">&lsaquo;</a>' + '    <a ng-click="next()" class="carousel-control right">&rsaquo;</a>' + '</div>' + '');
  }
]);
angular.module('template/carousel/slide.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/carousel/slide.html', '<div ng-class="{' + '    \'active\': leaving || (active && !entering),' + '    \'prev\': (next || active) && direction==\'prev\',' + '    \'next\': (next || active) && direction==\'next\',' + '    \'right\': direction==\'prev\',' + '    \'left\': direction==\'next\'' + '  }" class="item" ng-transclude></div>' + '');
  }
]);
angular.module('template/dialog/message.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/dialog/message.html', '<div class="modal-header">' + '\t<h1>{{ title }}</h1>' + '</div>' + '<div class="modal-body">' + '\t<p>{{ message }}</p>' + '</div>' + '<div class="modal-footer">' + '\t<button ng-repeat="btn in buttons" ng-click="close(btn.result)" class=btn ng-class="btn.cssClass">{{ btn.label }}</button>' + '</div>' + '');
  }
]);
angular.module('template/pagination/pagination.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/pagination/pagination.html', '<div class="pagination"><ul>' + '  <li ng-repeat="page in pages" ng-class="{active: page.active, disabled: page.disabled}"><a ng-click="selectPage(page.number)">{{page.text}}</a></li>' + '  </ul>' + '</div>' + '');
  }
]);
angular.module('template/popover/popover.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/popover/popover.html', '<div class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">' + '  <div class="arrow"></div>' + '' + '  <div class="popover-inner">' + '      <h3 class="popover-title" ng-bind="popoverTitle" ng-show="popoverTitle"></h3>' + '      <div class="popover-content" ng-bind="popoverContent"></div>' + '  </div>' + '</div>' + '');
  }
]);
angular.module('template/tabs/pane.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/tabs/pane.html', '<div class="tab-pane" ng-class="{active: selected}" ng-show="selected" ng-transclude></div>' + '');
  }
]);
angular.module('template/tabs/tabs.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/tabs/tabs.html', '<div class="tabbable">' + '  <ul class="nav nav-tabs">' + '    <li ng-repeat="pane in panes" ng-class="{active:pane.selected}">' + '      <a href="" ng-click="select(pane)">{{pane.heading}}</a>' + '    </li>' + '  </ul>' + '  <div class="tab-content" ng-transclude></div>' + '</div>' + '');
  }
]);
angular.module('template/tooltip/tooltip-popup.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/tooltip/tooltip-popup.html', '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">' + '  <div class="tooltip-arrow"></div>' + '  <div class="tooltip-inner" ng-bind="tooltipTitle"></div>' + '</div>' + '');
  }
]);
angular.module('template/typeahead/typeahead.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/typeahead/typeahead.html', '<div class="dropdown clearfix" ng-class="{open: isOpen()}">' + '    <ul class="typeahead dropdown-menu">' + '        <li ng-repeat="match in matches" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)">' + '            <a tabindex="-1" ng-click="selectMatch($index)" ng-bind-html-unsafe="match.label | typeaheadHighlight:query"></a>' + '        </li>' + '    </ul>' + '</div>');
  }
]);
(function (window, angular, undefined) {
  'use strict';
  angular.module('ngCookies', ['ng']).factory('$cookies', [
    '$rootScope',
    '$browser',
    function ($rootScope, $browser) {
      var cookies = {}, lastCookies = {}, lastBrowserCookies, runEval = false, copy = angular.copy, isUndefined = angular.isUndefined;
      $browser.addPollFn(function () {
        var currentCookies = $browser.cookies();
        if (lastBrowserCookies != currentCookies) {
          lastBrowserCookies = currentCookies;
          copy(currentCookies, lastCookies);
          copy(currentCookies, cookies);
          if (runEval)
            $rootScope.$apply();
        }
      })();
      runEval = true;
      $rootScope.$watch(push);
      return cookies;
      function push() {
        var name, value, browserCookies, updated;
        for (name in lastCookies) {
          if (isUndefined(cookies[name])) {
            $browser.cookies(name, undefined);
          }
        }
        for (name in cookies) {
          value = cookies[name];
          if (!angular.isString(value)) {
            if (angular.isDefined(lastCookies[name])) {
              cookies[name] = lastCookies[name];
            } else {
              delete cookies[name];
            }
          } else if (value !== lastCookies[name]) {
            $browser.cookies(name, value);
            updated = true;
          }
        }
        if (updated) {
          updated = false;
          browserCookies = $browser.cookies();
          for (name in cookies) {
            if (cookies[name] !== browserCookies[name]) {
              if (isUndefined(browserCookies[name])) {
                delete cookies[name];
              } else {
                cookies[name] = browserCookies[name];
              }
              updated = true;
            }
          }
        }
      }
    }
  ]).factory('$cookieStore', [
    '$cookies',
    function ($cookies) {
      return {
        get: function (key) {
          var value = $cookies[key];
          return value ? angular.fromJson(value) : value;
        },
        put: function (key, value) {
          $cookies[key] = angular.toJson(value);
        },
        remove: function (key) {
          delete $cookies[key];
        }
      };
    }
  ]);
}(window, window.angular));
(function (window, angular, undefined) {
  'use strict';
  angular.module('ngResource', ['ng']).factory('$resource', [
    '$http',
    '$parse',
    function ($http, $parse) {
      var DEFAULT_ACTIONS = {
          'get': { method: 'GET' },
          'save': { method: 'POST' },
          'query': {
            method: 'GET',
            isArray: true
          },
          'remove': { method: 'DELETE' },
          'delete': { method: 'DELETE' }
        };
      var noop = angular.noop, forEach = angular.forEach, extend = angular.extend, copy = angular.copy, isFunction = angular.isFunction, getter = function (obj, path) {
          return $parse(path)(obj);
        };
      function encodeUriSegment(val) {
        return encodeUriQuery(val, true).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
      }
      function encodeUriQuery(val, pctEncodeSpaces) {
        return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, pctEncodeSpaces ? '%20' : '+');
      }
      function Route(template, defaults) {
        this.template = template = template + '#';
        this.defaults = defaults || {};
        var urlParams = this.urlParams = {};
        forEach(template.split(/\W/), function (param) {
          if (param && new RegExp('(^|[^\\\\]):' + param + '\\W').test(template)) {
            urlParams[param] = true;
          }
        });
        this.template = template.replace(/\\:/g, ':');
      }
      Route.prototype = {
        url: function (params) {
          var self = this, url = this.template, val, encodedVal;
          params = params || {};
          forEach(this.urlParams, function (_, urlParam) {
            val = params.hasOwnProperty(urlParam) ? params[urlParam] : self.defaults[urlParam];
            if (angular.isDefined(val) && val !== null) {
              encodedVal = encodeUriSegment(val);
              url = url.replace(new RegExp(':' + urlParam + '(\\W)', 'g'), encodedVal + '$1');
            } else {
              url = url.replace(new RegExp('(/?):' + urlParam + '(\\W)', 'g'), function (match, leadingSlashes, tail) {
                if (tail.charAt(0) == '/') {
                  return tail;
                } else {
                  return leadingSlashes + tail;
                }
              });
            }
          });
          url = url.replace(/\/?#$/, '');
          var query = [];
          forEach(params, function (value, key) {
            if (!self.urlParams[key]) {
              query.push(encodeUriQuery(key) + '=' + encodeUriQuery(value));
            }
          });
          query.sort();
          url = url.replace(/\/*$/, '');
          return url + (query.length ? '?' + query.join('&') : '');
        }
      };
      function ResourceFactory(url, paramDefaults, actions) {
        var route = new Route(url);
        actions = extend({}, DEFAULT_ACTIONS, actions);
        function extractParams(data, actionParams) {
          var ids = {};
          actionParams = extend({}, paramDefaults, actionParams);
          forEach(actionParams, function (value, key) {
            ids[key] = value.charAt && value.charAt(0) == '@' ? getter(data, value.substr(1)) : value;
          });
          return ids;
        }
        function Resource(value) {
          copy(value || {}, this);
        }
        forEach(actions, function (action, name) {
          action.method = angular.uppercase(action.method);
          var hasBody = action.method == 'POST' || action.method == 'PUT' || action.method == 'PATCH';
          Resource[name] = function (a1, a2, a3, a4) {
            var params = {};
            var data;
            var success = noop;
            var error = null;
            switch (arguments.length) {
            case 4:
              error = a4;
              success = a3;
            case 3:
            case 2:
              if (isFunction(a2)) {
                if (isFunction(a1)) {
                  success = a1;
                  error = a2;
                  break;
                }
                success = a2;
                error = a3;
              } else {
                params = a1;
                data = a2;
                success = a3;
                break;
              }
            case 1:
              if (isFunction(a1))
                success = a1;
              else if (hasBody)
                data = a1;
              else
                params = a1;
              break;
            case 0:
              break;
            default:
              throw 'Expected between 0-4 arguments [params, data, success, error], got ' + arguments.length + ' arguments.';
            }
            var value = this instanceof Resource ? this : action.isArray ? [] : new Resource(data);
            $http({
              method: action.method,
              url: route.url(extend({}, extractParams(data, action.params || {}), params)),
              data: data
            }).then(function (response) {
              var data = response.data;
              if (data) {
                if (action.isArray) {
                  value.length = 0;
                  forEach(data, function (item) {
                    value.push(new Resource(item));
                  });
                } else {
                  copy(data, value);
                }
              }
              (success || noop)(value, response.headers);
            }, error);
            return value;
          };
          Resource.prototype['$' + name] = function (a1, a2, a3) {
            var params = extractParams(this), success = noop, error;
            switch (arguments.length) {
            case 3:
              params = a1;
              success = a2;
              error = a3;
              break;
            case 2:
            case 1:
              if (isFunction(a1)) {
                success = a1;
                error = a2;
              } else {
                params = a1;
                success = a2 || noop;
              }
            case 0:
              break;
            default:
              throw 'Expected between 1-3 arguments [params, success, error], got ' + arguments.length + ' arguments.';
            }
            var data = hasBody ? this : undefined;
            Resource[name].call(this, params, data, success, error);
          };
        });
        Resource.bind = function (additionalParamDefaults) {
          return ResourceFactory(url, extend({}, paramDefaults, additionalParamDefaults), actions);
        };
        return Resource;
      }
      return ResourceFactory;
    }
  ]);
}(window, window.angular));
(function (window, angular, undefined) {
  'use strict';
  var $sanitize = function (html) {
    var buf = [];
    htmlParser(html, htmlSanitizeWriter(buf));
    return buf.join('');
  };
  var START_TAG_REGEXP = /^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/, END_TAG_REGEXP = /^<\s*\/\s*([\w:-]+)[^>]*>/, ATTR_REGEXP = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g, BEGIN_TAG_REGEXP = /^</, BEGING_END_TAGE_REGEXP = /^<\s*\//, COMMENT_REGEXP = /<!--(.*?)-->/g, CDATA_REGEXP = /<!\[CDATA\[(.*?)]]>/g, URI_REGEXP = /^((ftp|https?):\/\/|mailto:|#)/i, NON_ALPHANUMERIC_REGEXP = /([^\#-~| |!])/g;
  var voidElements = makeMap('area,br,col,hr,img,wbr');
  var optionalEndTagBlockElements = makeMap('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'), optionalEndTagInlineElements = makeMap('rp,rt'), optionalEndTagElements = angular.extend({}, optionalEndTagInlineElements, optionalEndTagBlockElements);
  var blockElements = angular.extend({}, optionalEndTagBlockElements, makeMap('address,article,aside,' + 'blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,' + 'header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul'));
  var inlineElements = angular.extend({}, optionalEndTagInlineElements, makeMap('a,abbr,acronym,b,bdi,bdo,' + 'big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,' + 'span,strike,strong,sub,sup,time,tt,u,var'));
  var specialElements = makeMap('script,style');
  var validElements = angular.extend({}, voidElements, blockElements, inlineElements, optionalEndTagElements);
  var uriAttrs = makeMap('background,cite,href,longdesc,src,usemap');
  var validAttrs = angular.extend({}, uriAttrs, makeMap('abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,' + 'color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,' + 'ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,' + 'scope,scrolling,shape,span,start,summary,target,title,type,' + 'valign,value,vspace,width'));
  function makeMap(str) {
    var obj = {}, items = str.split(','), i;
    for (i = 0; i < items.length; i++)
      obj[items[i]] = true;
    return obj;
  }
  function htmlParser(html, handler) {
    var index, chars, match, stack = [], last = html;
    stack.last = function () {
      return stack[stack.length - 1];
    };
    while (html) {
      chars = true;
      if (!stack.last() || !specialElements[stack.last()]) {
        if (html.indexOf('<!--') === 0) {
          index = html.indexOf('-->');
          if (index >= 0) {
            if (handler.comment)
              handler.comment(html.substring(4, index));
            html = html.substring(index + 3);
            chars = false;
          }
        } else if (BEGING_END_TAGE_REGEXP.test(html)) {
          match = html.match(END_TAG_REGEXP);
          if (match) {
            html = html.substring(match[0].length);
            match[0].replace(END_TAG_REGEXP, parseEndTag);
            chars = false;
          }
        } else if (BEGIN_TAG_REGEXP.test(html)) {
          match = html.match(START_TAG_REGEXP);
          if (match) {
            html = html.substring(match[0].length);
            match[0].replace(START_TAG_REGEXP, parseStartTag);
            chars = false;
          }
        }
        if (chars) {
          index = html.indexOf('<');
          var text = index < 0 ? html : html.substring(0, index);
          html = index < 0 ? '' : html.substring(index);
          if (handler.chars)
            handler.chars(decodeEntities(text));
        }
      } else {
        html = html.replace(new RegExp('(.*)<\\s*\\/\\s*' + stack.last() + '[^>]*>', 'i'), function (all, text) {
          text = text.replace(COMMENT_REGEXP, '$1').replace(CDATA_REGEXP, '$1');
          if (handler.chars)
            handler.chars(decodeEntities(text));
          return '';
        });
        parseEndTag('', stack.last());
      }
      if (html == last) {
        throw 'Parse Error: ' + html;
      }
      last = html;
    }
    parseEndTag();
    function parseStartTag(tag, tagName, rest, unary) {
      tagName = angular.lowercase(tagName);
      if (blockElements[tagName]) {
        while (stack.last() && inlineElements[stack.last()]) {
          parseEndTag('', stack.last());
        }
      }
      if (optionalEndTagElements[tagName] && stack.last() == tagName) {
        parseEndTag('', tagName);
      }
      unary = voidElements[tagName] || !!unary;
      if (!unary)
        stack.push(tagName);
      var attrs = {};
      rest.replace(ATTR_REGEXP, function (match, name, doubleQuotedValue, singleQuotedValue, unquotedValue) {
        var value = doubleQuotedValue || singleQuotedValue || unquotedValue || '';
        attrs[name] = decodeEntities(value);
      });
      if (handler.start)
        handler.start(tagName, attrs, unary);
    }
    function parseEndTag(tag, tagName) {
      var pos = 0, i;
      tagName = angular.lowercase(tagName);
      if (tagName)
        for (pos = stack.length - 1; pos >= 0; pos--)
          if (stack[pos] == tagName)
            break;
      if (pos >= 0) {
        for (i = stack.length - 1; i >= pos; i--)
          if (handler.end)
            handler.end(stack[i]);
        stack.length = pos;
      }
    }
  }
  var hiddenPre = document.createElement('pre');
  function decodeEntities(value) {
    hiddenPre.innerHTML = value.replace(/</g, '&lt;');
    return hiddenPre.innerText || hiddenPre.textContent || '';
  }
  function encodeEntities(value) {
    return value.replace(/&/g, '&amp;').replace(NON_ALPHANUMERIC_REGEXP, function (value) {
      return '&#' + value.charCodeAt(0) + ';';
    }).replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function htmlSanitizeWriter(buf) {
    var ignore = false;
    var out = angular.bind(buf, buf.push);
    return {
      start: function (tag, attrs, unary) {
        tag = angular.lowercase(tag);
        if (!ignore && specialElements[tag]) {
          ignore = tag;
        }
        if (!ignore && validElements[tag] == true) {
          out('<');
          out(tag);
          angular.forEach(attrs, function (value, key) {
            var lkey = angular.lowercase(key);
            if (validAttrs[lkey] == true && (uriAttrs[lkey] !== true || value.match(URI_REGEXP))) {
              out(' ');
              out(key);
              out('="');
              out(encodeEntities(value));
              out('"');
            }
          });
          out(unary ? '/>' : '>');
        }
      },
      end: function (tag) {
        tag = angular.lowercase(tag);
        if (!ignore && validElements[tag] == true) {
          out('</');
          out(tag);
          out('>');
        }
        if (tag == ignore) {
          ignore = false;
        }
      },
      chars: function (chars) {
        if (!ignore) {
          out(encodeEntities(chars));
        }
      }
    };
  }
  angular.module('ngSanitize', []).value('$sanitize', $sanitize);
  angular.module('ngSanitize').directive('ngBindHtml', [
    '$sanitize',
    function ($sanitize) {
      return function (scope, element, attr) {
        element.addClass('ng-binding').data('$binding', attr.ngBindHtml);
        scope.$watch(attr.ngBindHtml, function ngBindHtmlWatchAction(value) {
          value = $sanitize(value);
          element.html(value || '');
        });
      };
    }
  ]);
  angular.module('ngSanitize').filter('linky', function () {
    var LINKY_URL_REGEXP = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s\.\;\,\(\)\{\}\<\>]/, MAILTO_REGEXP = /^mailto:/;
    return function (text) {
      if (!text)
        return text;
      var match;
      var raw = text;
      var html = [];
      var writer = htmlSanitizeWriter(html);
      var url;
      var i;
      while (match = raw.match(LINKY_URL_REGEXP)) {
        url = match[0];
        if (match[2] == match[3])
          url = 'mailto:' + url;
        i = match.index;
        writer.chars(raw.substr(0, i));
        writer.start('a', { href: url });
        writer.chars(match[0].replace(MAILTO_REGEXP, ''));
        writer.end('a');
        raw = raw.substring(i + match[0].length);
      }
      writer.chars(raw);
      return html.join('');
    };
  });
}(window, window.angular));
(function () {
  var n = this, t = n._, r = {}, e = Array.prototype, u = Object.prototype, i = Function.prototype, a = e.push, o = e.slice, c = e.concat, l = u.toString, f = u.hasOwnProperty, s = e.forEach, p = e.map, h = e.reduce, v = e.reduceRight, d = e.filter, g = e.every, m = e.some, y = e.indexOf, b = e.lastIndexOf, x = Array.isArray, _ = Object.keys, j = i.bind, w = function (n) {
      return n instanceof w ? n : this instanceof w ? (this._wrapped = n, void 0) : new w(n);
    };
  'undefined' != typeof exports ? ('undefined' != typeof module && module.exports && (exports = module.exports = w), exports._ = w) : n._ = w, w.VERSION = '1.4.4';
  var A = w.each = w.forEach = function (n, t, e) {
      if (null != n)
        if (s && n.forEach === s)
          n.forEach(t, e);
        else if (n.length === +n.length) {
          for (var u = 0, i = n.length; i > u; u++)
            if (t.call(e, n[u], u, n) === r)
              return;
        } else
          for (var a in n)
            if (w.has(n, a) && t.call(e, n[a], a, n) === r)
              return;
    };
  w.map = w.collect = function (n, t, r) {
    var e = [];
    return null == n ? e : p && n.map === p ? n.map(t, r) : (A(n, function (n, u, i) {
      e[e.length] = t.call(r, n, u, i);
    }), e);
  };
  var O = 'Reduce of empty array with no initial value';
  w.reduce = w.foldl = w.inject = function (n, t, r, e) {
    var u = arguments.length > 2;
    if (null == n && (n = []), h && n.reduce === h)
      return e && (t = w.bind(t, e)), u ? n.reduce(t, r) : n.reduce(t);
    if (A(n, function (n, i, a) {
        u ? r = t.call(e, r, n, i, a) : (r = n, u = !0);
      }), !u)
      throw new TypeError(O);
    return r;
  }, w.reduceRight = w.foldr = function (n, t, r, e) {
    var u = arguments.length > 2;
    if (null == n && (n = []), v && n.reduceRight === v)
      return e && (t = w.bind(t, e)), u ? n.reduceRight(t, r) : n.reduceRight(t);
    var i = n.length;
    if (i !== +i) {
      var a = w.keys(n);
      i = a.length;
    }
    if (A(n, function (o, c, l) {
        c = a ? a[--i] : --i, u ? r = t.call(e, r, n[c], c, l) : (r = n[c], u = !0);
      }), !u)
      throw new TypeError(O);
    return r;
  }, w.find = w.detect = function (n, t, r) {
    var e;
    return E(n, function (n, u, i) {
      return t.call(r, n, u, i) ? (e = n, !0) : void 0;
    }), e;
  }, w.filter = w.select = function (n, t, r) {
    var e = [];
    return null == n ? e : d && n.filter === d ? n.filter(t, r) : (A(n, function (n, u, i) {
      t.call(r, n, u, i) && (e[e.length] = n);
    }), e);
  }, w.reject = function (n, t, r) {
    return w.filter(n, function (n, e, u) {
      return !t.call(r, n, e, u);
    }, r);
  }, w.every = w.all = function (n, t, e) {
    t || (t = w.identity);
    var u = !0;
    return null == n ? u : g && n.every === g ? n.every(t, e) : (A(n, function (n, i, a) {
      return (u = u && t.call(e, n, i, a)) ? void 0 : r;
    }), !!u);
  };
  var E = w.some = w.any = function (n, t, e) {
      t || (t = w.identity);
      var u = !1;
      return null == n ? u : m && n.some === m ? n.some(t, e) : (A(n, function (n, i, a) {
        return u || (u = t.call(e, n, i, a)) ? r : void 0;
      }), !!u);
    };
  w.contains = w.include = function (n, t) {
    return null == n ? !1 : y && n.indexOf === y ? n.indexOf(t) != -1 : E(n, function (n) {
      return n === t;
    });
  }, w.invoke = function (n, t) {
    var r = o.call(arguments, 2), e = w.isFunction(t);
    return w.map(n, function (n) {
      return (e ? t : n[t]).apply(n, r);
    });
  }, w.pluck = function (n, t) {
    return w.map(n, function (n) {
      return n[t];
    });
  }, w.where = function (n, t, r) {
    return w.isEmpty(t) ? r ? null : [] : w[r ? 'find' : 'filter'](n, function (n) {
      for (var r in t)
        if (t[r] !== n[r])
          return !1;
      return !0;
    });
  }, w.findWhere = function (n, t) {
    return w.where(n, t, !0);
  }, w.max = function (n, t, r) {
    if (!t && w.isArray(n) && n[0] === +n[0] && 65535 > n.length)
      return Math.max.apply(Math, n);
    if (!t && w.isEmpty(n))
      return -1 / 0;
    var e = {
        computed: -1 / 0,
        value: -1 / 0
      };
    return A(n, function (n, u, i) {
      var a = t ? t.call(r, n, u, i) : n;
      a >= e.computed && (e = {
        value: n,
        computed: a
      });
    }), e.value;
  }, w.min = function (n, t, r) {
    if (!t && w.isArray(n) && n[0] === +n[0] && 65535 > n.length)
      return Math.min.apply(Math, n);
    if (!t && w.isEmpty(n))
      return 1 / 0;
    var e = {
        computed: 1 / 0,
        value: 1 / 0
      };
    return A(n, function (n, u, i) {
      var a = t ? t.call(r, n, u, i) : n;
      e.computed > a && (e = {
        value: n,
        computed: a
      });
    }), e.value;
  }, w.shuffle = function (n) {
    var t, r = 0, e = [];
    return A(n, function (n) {
      t = w.random(r++), e[r - 1] = e[t], e[t] = n;
    }), e;
  };
  var k = function (n) {
    return w.isFunction(n) ? n : function (t) {
      return t[n];
    };
  };
  w.sortBy = function (n, t, r) {
    var e = k(t);
    return w.pluck(w.map(n, function (n, t, u) {
      return {
        value: n,
        index: t,
        criteria: e.call(r, n, t, u)
      };
    }).sort(function (n, t) {
      var r = n.criteria, e = t.criteria;
      if (r !== e) {
        if (r > e || r === void 0)
          return 1;
        if (e > r || e === void 0)
          return -1;
      }
      return n.index < t.index ? -1 : 1;
    }), 'value');
  };
  var F = function (n, t, r, e) {
    var u = {}, i = k(t || w.identity);
    return A(n, function (t, a) {
      var o = i.call(r, t, a, n);
      e(u, o, t);
    }), u;
  };
  w.groupBy = function (n, t, r) {
    return F(n, t, r, function (n, t, r) {
      (w.has(n, t) ? n[t] : n[t] = []).push(r);
    });
  }, w.countBy = function (n, t, r) {
    return F(n, t, r, function (n, t) {
      w.has(n, t) || (n[t] = 0), n[t]++;
    });
  }, w.sortedIndex = function (n, t, r, e) {
    r = null == r ? w.identity : k(r);
    for (var u = r.call(e, t), i = 0, a = n.length; a > i;) {
      var o = i + a >>> 1;
      u > r.call(e, n[o]) ? i = o + 1 : a = o;
    }
    return i;
  }, w.toArray = function (n) {
    return n ? w.isArray(n) ? o.call(n) : n.length === +n.length ? w.map(n, w.identity) : w.values(n) : [];
  }, w.size = function (n) {
    return null == n ? 0 : n.length === +n.length ? n.length : w.keys(n).length;
  }, w.first = w.head = w.take = function (n, t, r) {
    return null == n ? void 0 : null == t || r ? n[0] : o.call(n, 0, t);
  }, w.initial = function (n, t, r) {
    return o.call(n, 0, n.length - (null == t || r ? 1 : t));
  }, w.last = function (n, t, r) {
    return null == n ? void 0 : null == t || r ? n[n.length - 1] : o.call(n, Math.max(n.length - t, 0));
  }, w.rest = w.tail = w.drop = function (n, t, r) {
    return o.call(n, null == t || r ? 1 : t);
  }, w.compact = function (n) {
    return w.filter(n, w.identity);
  };
  var R = function (n, t, r) {
    return A(n, function (n) {
      w.isArray(n) ? t ? a.apply(r, n) : R(n, t, r) : r.push(n);
    }), r;
  };
  w.flatten = function (n, t) {
    return R(n, t, []);
  }, w.without = function (n) {
    return w.difference(n, o.call(arguments, 1));
  }, w.uniq = w.unique = function (n, t, r, e) {
    w.isFunction(t) && (e = r, r = t, t = !1);
    var u = r ? w.map(n, r, e) : n, i = [], a = [];
    return A(u, function (r, e) {
      (t ? e && a[a.length - 1] === r : w.contains(a, r)) || (a.push(r), i.push(n[e]));
    }), i;
  }, w.union = function () {
    return w.uniq(c.apply(e, arguments));
  }, w.intersection = function (n) {
    var t = o.call(arguments, 1);
    return w.filter(w.uniq(n), function (n) {
      return w.every(t, function (t) {
        return w.indexOf(t, n) >= 0;
      });
    });
  }, w.difference = function (n) {
    var t = c.apply(e, o.call(arguments, 1));
    return w.filter(n, function (n) {
      return !w.contains(t, n);
    });
  }, w.zip = function () {
    for (var n = o.call(arguments), t = w.max(w.pluck(n, 'length')), r = Array(t), e = 0; t > e; e++)
      r[e] = w.pluck(n, '' + e);
    return r;
  }, w.object = function (n, t) {
    if (null == n)
      return {};
    for (var r = {}, e = 0, u = n.length; u > e; e++)
      t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
    return r;
  }, w.indexOf = function (n, t, r) {
    if (null == n)
      return -1;
    var e = 0, u = n.length;
    if (r) {
      if ('number' != typeof r)
        return e = w.sortedIndex(n, t), n[e] === t ? e : -1;
      e = 0 > r ? Math.max(0, u + r) : r;
    }
    if (y && n.indexOf === y)
      return n.indexOf(t, r);
    for (; u > e; e++)
      if (n[e] === t)
        return e;
    return -1;
  }, w.lastIndexOf = function (n, t, r) {
    if (null == n)
      return -1;
    var e = null != r;
    if (b && n.lastIndexOf === b)
      return e ? n.lastIndexOf(t, r) : n.lastIndexOf(t);
    for (var u = e ? r : n.length; u--;)
      if (n[u] === t)
        return u;
    return -1;
  }, w.range = function (n, t, r) {
    1 >= arguments.length && (t = n || 0, n = 0), r = arguments[2] || 1;
    for (var e = Math.max(Math.ceil((t - n) / r), 0), u = 0, i = Array(e); e > u;)
      i[u++] = n, n += r;
    return i;
  }, w.bind = function (n, t) {
    if (n.bind === j && j)
      return j.apply(n, o.call(arguments, 1));
    var r = o.call(arguments, 2);
    return function () {
      return n.apply(t, r.concat(o.call(arguments)));
    };
  }, w.partial = function (n) {
    var t = o.call(arguments, 1);
    return function () {
      return n.apply(this, t.concat(o.call(arguments)));
    };
  }, w.bindAll = function (n) {
    var t = o.call(arguments, 1);
    return 0 === t.length && (t = w.functions(n)), A(t, function (t) {
      n[t] = w.bind(n[t], n);
    }), n;
  }, w.memoize = function (n, t) {
    var r = {};
    return t || (t = w.identity), function () {
      var e = t.apply(this, arguments);
      return w.has(r, e) ? r[e] : r[e] = n.apply(this, arguments);
    };
  }, w.delay = function (n, t) {
    var r = o.call(arguments, 2);
    return setTimeout(function () {
      return n.apply(null, r);
    }, t);
  }, w.defer = function (n) {
    return w.delay.apply(w, [
      n,
      1
    ].concat(o.call(arguments, 1)));
  }, w.throttle = function (n, t) {
    var r, e, u, i, a = 0, o = function () {
        a = new Date(), u = null, i = n.apply(r, e);
      };
    return function () {
      var c = new Date(), l = t - (c - a);
      return r = this, e = arguments, 0 >= l ? (clearTimeout(u), u = null, a = c, i = n.apply(r, e)) : u || (u = setTimeout(o, l)), i;
    };
  }, w.debounce = function (n, t, r) {
    var e, u;
    return function () {
      var i = this, a = arguments, o = function () {
          e = null, r || (u = n.apply(i, a));
        }, c = r && !e;
      return clearTimeout(e), e = setTimeout(o, t), c && (u = n.apply(i, a)), u;
    };
  }, w.once = function (n) {
    var t, r = !1;
    return function () {
      return r ? t : (r = !0, t = n.apply(this, arguments), n = null, t);
    };
  }, w.wrap = function (n, t) {
    return function () {
      var r = [n];
      return a.apply(r, arguments), t.apply(this, r);
    };
  }, w.compose = function () {
    var n = arguments;
    return function () {
      for (var t = arguments, r = n.length - 1; r >= 0; r--)
        t = [n[r].apply(this, t)];
      return t[0];
    };
  }, w.after = function (n, t) {
    return 0 >= n ? t() : function () {
      return 1 > --n ? t.apply(this, arguments) : void 0;
    };
  }, w.keys = _ || function (n) {
    if (n !== Object(n))
      throw new TypeError('Invalid object');
    var t = [];
    for (var r in n)
      w.has(n, r) && (t[t.length] = r);
    return t;
  }, w.values = function (n) {
    var t = [];
    for (var r in n)
      w.has(n, r) && t.push(n[r]);
    return t;
  }, w.pairs = function (n) {
    var t = [];
    for (var r in n)
      w.has(n, r) && t.push([
        r,
        n[r]
      ]);
    return t;
  }, w.invert = function (n) {
    var t = {};
    for (var r in n)
      w.has(n, r) && (t[n[r]] = r);
    return t;
  }, w.functions = w.methods = function (n) {
    var t = [];
    for (var r in n)
      w.isFunction(n[r]) && t.push(r);
    return t.sort();
  }, w.extend = function (n) {
    return A(o.call(arguments, 1), function (t) {
      if (t)
        for (var r in t)
          n[r] = t[r];
    }), n;
  }, w.pick = function (n) {
    var t = {}, r = c.apply(e, o.call(arguments, 1));
    return A(r, function (r) {
      r in n && (t[r] = n[r]);
    }), t;
  }, w.omit = function (n) {
    var t = {}, r = c.apply(e, o.call(arguments, 1));
    for (var u in n)
      w.contains(r, u) || (t[u] = n[u]);
    return t;
  }, w.defaults = function (n) {
    return A(o.call(arguments, 1), function (t) {
      if (t)
        for (var r in t)
          null == n[r] && (n[r] = t[r]);
    }), n;
  }, w.clone = function (n) {
    return w.isObject(n) ? w.isArray(n) ? n.slice() : w.extend({}, n) : n;
  }, w.tap = function (n, t) {
    return t(n), n;
  };
  var I = function (n, t, r, e) {
    if (n === t)
      return 0 !== n || 1 / n == 1 / t;
    if (null == n || null == t)
      return n === t;
    n instanceof w && (n = n._wrapped), t instanceof w && (t = t._wrapped);
    var u = l.call(n);
    if (u != l.call(t))
      return !1;
    switch (u) {
    case '[object String]':
      return n == t + '';
    case '[object Number]':
      return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t;
    case '[object Date]':
    case '[object Boolean]':
      return +n == +t;
    case '[object RegExp]':
      return n.source == t.source && n.global == t.global && n.multiline == t.multiline && n.ignoreCase == t.ignoreCase;
    }
    if ('object' != typeof n || 'object' != typeof t)
      return !1;
    for (var i = r.length; i--;)
      if (r[i] == n)
        return e[i] == t;
    r.push(n), e.push(t);
    var a = 0, o = !0;
    if ('[object Array]' == u) {
      if (a = n.length, o = a == t.length)
        for (; a-- && (o = I(n[a], t[a], r, e)););
    } else {
      var c = n.constructor, f = t.constructor;
      if (c !== f && !(w.isFunction(c) && c instanceof c && w.isFunction(f) && f instanceof f))
        return !1;
      for (var s in n)
        if (w.has(n, s) && (a++, !(o = w.has(t, s) && I(n[s], t[s], r, e))))
          break;
      if (o) {
        for (s in t)
          if (w.has(t, s) && !a--)
            break;
        o = !a;
      }
    }
    return r.pop(), e.pop(), o;
  };
  w.isEqual = function (n, t) {
    return I(n, t, [], []);
  }, w.isEmpty = function (n) {
    if (null == n)
      return !0;
    if (w.isArray(n) || w.isString(n))
      return 0 === n.length;
    for (var t in n)
      if (w.has(n, t))
        return !1;
    return !0;
  }, w.isElement = function (n) {
    return !(!n || 1 !== n.nodeType);
  }, w.isArray = x || function (n) {
    return '[object Array]' == l.call(n);
  }, w.isObject = function (n) {
    return n === Object(n);
  }, A([
    'Arguments',
    'Function',
    'String',
    'Number',
    'Date',
    'RegExp'
  ], function (n) {
    w['is' + n] = function (t) {
      return l.call(t) == '[object ' + n + ']';
    };
  }), w.isArguments(arguments) || (w.isArguments = function (n) {
    return !(!n || !w.has(n, 'callee'));
  }), 'function' != typeof /./ && (w.isFunction = function (n) {
    return 'function' == typeof n;
  }), w.isFinite = function (n) {
    return isFinite(n) && !isNaN(parseFloat(n));
  }, w.isNaN = function (n) {
    return w.isNumber(n) && n != +n;
  }, w.isBoolean = function (n) {
    return n === !0 || n === !1 || '[object Boolean]' == l.call(n);
  }, w.isNull = function (n) {
    return null === n;
  }, w.isUndefined = function (n) {
    return n === void 0;
  }, w.has = function (n, t) {
    return f.call(n, t);
  }, w.noConflict = function () {
    return n._ = t, this;
  }, w.identity = function (n) {
    return n;
  }, w.times = function (n, t, r) {
    for (var e = Array(n), u = 0; n > u; u++)
      e[u] = t.call(r, u);
    return e;
  }, w.random = function (n, t) {
    return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1));
  };
  var M = {
      escape: {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#x27;',
        '/': '&#x2F;'
      }
    };
  M.unescape = w.invert(M.escape);
  var S = {
      escape: RegExp('[' + w.keys(M.escape).join('') + ']', 'g'),
      unescape: RegExp('(' + w.keys(M.unescape).join('|') + ')', 'g')
    };
  w.each([
    'escape',
    'unescape'
  ], function (n) {
    w[n] = function (t) {
      return null == t ? '' : ('' + t).replace(S[n], function (t) {
        return M[n][t];
      });
    };
  }), w.result = function (n, t) {
    if (null == n)
      return null;
    var r = n[t];
    return w.isFunction(r) ? r.call(n) : r;
  }, w.mixin = function (n) {
    A(w.functions(n), function (t) {
      var r = w[t] = n[t];
      w.prototype[t] = function () {
        var n = [this._wrapped];
        return a.apply(n, arguments), D.call(this, r.apply(w, n));
      };
    });
  };
  var N = 0;
  w.uniqueId = function (n) {
    var t = ++N + '';
    return n ? n + t : t;
  }, w.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };
  var T = /(.)^/, q = {
      '\'': '\'',
      '\\': '\\',
      '\r': 'r',
      '\n': 'n',
      '\t': 't',
      '\u2028': 'u2028',
      '\u2029': 'u2029'
    }, B = /\\|'|\r|\n|\t|\u2028|\u2029/g;
  w.template = function (n, t, r) {
    var e;
    r = w.defaults({}, r, w.templateSettings);
    var u = RegExp([
        (r.escape || T).source,
        (r.interpolate || T).source,
        (r.evaluate || T).source
      ].join('|') + '|$', 'g'), i = 0, a = '__p+=\'';
    n.replace(u, function (t, r, e, u, o) {
      return a += n.slice(i, o).replace(B, function (n) {
        return '\\' + q[n];
      }), r && (a += '\'+\n((__t=(' + r + '))==null?\'\':_.escape(__t))+\n\''), e && (a += '\'+\n((__t=(' + e + '))==null?\'\':__t)+\n\''), u && (a += '\';\n' + u + '\n__p+=\''), i = o + t.length, t;
    }), a += '\';\n', r.variable || (a = 'with(obj||{}){\n' + a + '}\n'), a = 'var __t,__p=\'\',__j=Array.prototype.join,' + 'print=function(){__p+=__j.call(arguments,\'\');};\n' + a + 'return __p;\n';
    try {
      e = Function(r.variable || 'obj', '_', a);
    } catch (o) {
      throw o.source = a, o;
    }
    if (t)
      return e(t, w);
    var c = function (n) {
      return e.call(this, n, w);
    };
    return c.source = 'function(' + (r.variable || 'obj') + '){\n' + a + '}', c;
  }, w.chain = function (n) {
    return w(n).chain();
  };
  var D = function (n) {
    return this._chain ? w(n).chain() : n;
  };
  w.mixin(w), A([
    'pop',
    'push',
    'reverse',
    'shift',
    'sort',
    'splice',
    'unshift'
  ], function (n) {
    var t = e[n];
    w.prototype[n] = function () {
      var r = this._wrapped;
      return t.apply(r, arguments), 'shift' != n && 'splice' != n || 0 !== r.length || delete r[0], D.call(this, r);
    };
  }), A([
    'concat',
    'join',
    'slice'
  ], function (n) {
    var t = e[n];
    w.prototype[n] = function () {
      return D.call(this, t.apply(this._wrapped, arguments));
    };
  }), w.extend(w.prototype, {
    chain: function () {
      return this._chain = !0, this;
    },
    value: function () {
      return this._wrapped;
    }
  });
}.call(this));
(function (t, e) {
  if (typeof exports == 'object')
    module.exports = e();
  else if (typeof define == 'function' && define.amd)
    define(e);
  else
    t.Spinner = e();
}(this, function () {
  'use strict';
  var t = [
      'webkit',
      'Moz',
      'ms',
      'O'
    ], e = {}, i;
  function o(t, e) {
    var i = document.createElement(t || 'div'), o;
    for (o in e)
      i[o] = e[o];
    return i;
  }
  function n(t) {
    for (var e = 1, i = arguments.length; e < i; e++)
      t.appendChild(arguments[e]);
    return t;
  }
  var r = function () {
      var t = o('style', { type: 'text/css' });
      n(document.getElementsByTagName('head')[0], t);
      return t.sheet || t.styleSheet;
    }();
  function s(t, o, n, s) {
    var a = [
        'opacity',
        o,
        ~~(t * 100),
        n,
        s
      ].join('-'), f = 0.01 + n / s * 100, l = Math.max(1 - (1 - t) / o * (100 - f), t), u = i.substring(0, i.indexOf('Animation')).toLowerCase(), d = u && '-' + u + '-' || '';
    if (!e[a]) {
      r.insertRule('@' + d + 'keyframes ' + a + '{' + '0%{opacity:' + l + '}' + f + '%{opacity:' + t + '}' + (f + 0.01) + '%{opacity:1}' + (f + o) % 100 + '%{opacity:' + t + '}' + '100%{opacity:' + l + '}' + '}', r.cssRules.length);
      e[a] = 1;
    }
    return a;
  }
  function a(e, i) {
    var o = e.style, n, r;
    i = i.charAt(0).toUpperCase() + i.slice(1);
    for (r = 0; r < t.length; r++) {
      n = t[r] + i;
      if (o[n] !== undefined)
        return n;
    }
    if (o[i] !== undefined)
      return i;
  }
  function f(t, e) {
    for (var i in e)
      t.style[a(t, i) || i] = e[i];
    return t;
  }
  function l(t) {
    for (var e = 1; e < arguments.length; e++) {
      var i = arguments[e];
      for (var o in i)
        if (t[o] === undefined)
          t[o] = i[o];
    }
    return t;
  }
  function u(t) {
    var e = {
        x: t.offsetLeft,
        y: t.offsetTop
      };
    while (t = t.offsetParent)
      e.x += t.offsetLeft, e.y += t.offsetTop;
    return e;
  }
  function d(t, e) {
    return typeof t == 'string' ? t : t[e % t.length];
  }
  var p = {
      lines: 12,
      length: 7,
      width: 5,
      radius: 10,
      rotate: 0,
      corners: 1,
      color: '#000',
      direction: 1,
      speed: 1,
      trail: 100,
      opacity: 1 / 4,
      fps: 20,
      zIndex: 2000000000,
      className: 'spinner',
      top: 'auto',
      left: 'auto',
      position: 'relative'
    };
  function c(t) {
    if (typeof this == 'undefined')
      return new c(t);
    this.opts = l(t || {}, c.defaults, p);
  }
  c.defaults = {};
  l(c.prototype, {
    spin: function (t) {
      this.stop();
      var e = this, n = e.opts, r = e.el = f(o(0, { className: n.className }), {
          position: n.position,
          width: 0,
          zIndex: n.zIndex
        }), s = n.radius + n.length + n.width, a, l;
      if (t) {
        t.insertBefore(r, t.firstChild || null);
        l = u(t);
        a = u(r);
        f(r, {
          left: (n.left == 'auto' ? l.x - a.x + (t.offsetWidth >> 1) : parseInt(n.left, 10) + s) + 'px',
          top: (n.top == 'auto' ? l.y - a.y + (t.offsetHeight >> 1) : parseInt(n.top, 10) + s) + 'px'
        });
      }
      r.setAttribute('role', 'progressbar');
      e.lines(r, e.opts);
      if (!i) {
        var d = 0, p = (n.lines - 1) * (1 - n.direction) / 2, c, h = n.fps, m = h / n.speed, y = (1 - n.opacity) / (m * n.trail / 100), g = m / n.lines;
        (function v() {
          d++;
          for (var t = 0; t < n.lines; t++) {
            c = Math.max(1 - (d + (n.lines - t) * g) % m * y, n.opacity);
            e.opacity(r, t * n.direction + p, c, n);
          }
          e.timeout = e.el && setTimeout(v, ~~(1000 / h));
        }());
      }
      return e;
    },
    stop: function () {
      var t = this.el;
      if (t) {
        clearTimeout(this.timeout);
        if (t.parentNode)
          t.parentNode.removeChild(t);
        this.el = undefined;
      }
      return this;
    },
    lines: function (t, e) {
      var r = 0, a = (e.lines - 1) * (1 - e.direction) / 2, l;
      function u(t, i) {
        return f(o(), {
          position: 'absolute',
          width: e.length + e.width + 'px',
          height: e.width + 'px',
          background: t,
          boxShadow: i,
          transformOrigin: 'left',
          transform: 'rotate(' + ~~(360 / e.lines * r + e.rotate) + 'deg) translate(' + e.radius + 'px' + ',0)',
          borderRadius: (e.corners * e.width >> 1) + 'px'
        });
      }
      for (; r < e.lines; r++) {
        l = f(o(), {
          position: 'absolute',
          top: 1 + ~(e.width / 2) + 'px',
          transform: e.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: e.opacity,
          animation: i && s(e.opacity, e.trail, a + r * e.direction, e.lines) + ' ' + 1 / e.speed + 's linear infinite'
        });
        if (e.shadow)
          n(l, f(u('#000', '0 0 4px ' + '#000'), { top: 2 + 'px' }));
        n(t, n(l, u(d(e.color, r), '0 0 1px rgba(0,0,0,.1)')));
      }
      return t;
    },
    opacity: function (t, e, i) {
      if (e < t.childNodes.length)
        t.childNodes[e].style.opacity = i;
    }
  });
  function h() {
    function t(t, e) {
      return o('<' + t + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', e);
    }
    r.addRule('.spin-vml', 'behavior:url(#default#VML)');
    c.prototype.lines = function (e, i) {
      var o = i.length + i.width, r = 2 * o;
      function s() {
        return f(t('group', {
          coordsize: r + ' ' + r,
          coordorigin: -o + ' ' + -o
        }), {
          width: r,
          height: r
        });
      }
      var a = -(i.width + i.length) * 2 + 'px', l = f(s(), {
          position: 'absolute',
          top: a,
          left: a
        }), u;
      function p(e, r, a) {
        n(l, n(f(s(), {
          rotation: 360 / i.lines * e + 'deg',
          left: ~~r
        }), n(f(t('roundrect', { arcsize: i.corners }), {
          width: o,
          height: i.width,
          left: i.radius,
          top: -i.width >> 1,
          filter: a
        }), t('fill', {
          color: d(i.color, e),
          opacity: i.opacity
        }), t('stroke', { opacity: 0 }))));
      }
      if (i.shadow)
        for (u = 1; u <= i.lines; u++)
          p(u, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)');
      for (u = 1; u <= i.lines; u++)
        p(u);
      return n(e, l);
    };
    c.prototype.opacity = function (t, e, i, o) {
      var n = t.firstChild;
      o = o.shadow && o.lines || 0;
      if (n && e + o < n.childNodes.length) {
        n = n.childNodes[e + o];
        n = n && n.firstChild;
        n = n && n.firstChild;
        if (n)
          n.opacity = i;
      }
    };
  }
  var m = f(o('group'), { behavior: 'url(#default#VML)' });
  if (!a(m, 'transform') && m.adj)
    h();
  else
    i = a(m, 'animation');
  return c;
}));
var thotpod = function () {
    var toString = Object.prototype.toString;
    function isArray(value) {
      return toString.apply(value) == '[object Array]';
    }
    function isDate(value) {
      return toString.apply(value) == '[object Date]';
    }
    function isObject(value) {
      return value != null && typeof value == 'object';
    }
    function copy(source, destination) {
      if (!destination) {
        destination = source;
        if (source) {
          if (isArray(source)) {
            destination = copy(source, []);
          } else if (isDate(source)) {
            destination = new Date(source.getTime());
          } else if (isObject(source)) {
            destination = copy(source, {});
          }
        }
      } else {
        if (source === destination)
          throw Error('Can\'t copy equivalent objects or arrays');
        if (isArray(source)) {
          while (destination.length) {
            destination.pop();
          }
          for (var i = 0; i < source.length; i++) {
            destination.push(copy(source[i]));
          }
        } else {
          _.forEach(destination, function (value, key) {
            delete destination[key];
          });
          for (var key in source) {
            destination[key] = copy(source[key]);
          }
        }
      }
      return destination;
    }
    function setBit(idPos, bitSet) {
      var bitSetIndex = parseInt(idPos / 32, 10);
      bitSet = bitSet || [];
      while (bitSet.length <= bitSetIndex) {
        bitSet.push(0);
      }
      bitSet[bitSetIndex] = bitSet[bitSetIndex] | 1 << idPos % 32;
      return bitSet;
    }
    function popcount(x) {
      var m1 = 1431655765;
      var m2 = 858993459;
      var m4 = 252645135;
      x -= x >> 1 & m1;
      x = (x & m2) + (x >> 2 & m2);
      x = x + (x >> 4) & m4;
      x += x >> 8;
      x += x >> 16;
      return x & 127;
    }
    function Dimensions(dimensions) {
      var defaults = _.extend({
          title: '',
          discreet: {},
          range: {},
          visibleIds: [],
          idMap: []
        }), discreetDefaults = {
          values: {},
          selected: 0,
          visibleIds: []
        }, rangeDefaults = {
          excludeNA: false,
          high: null,
          low: null
        }, self = this;
      copy(defaults, this);
      for (var attrID in dimensions.discreet) {
        if (dimensions.discreet.hasOwnProperty(attrID)) {
          var _attr = dimensions.discreet[attrID], _discreet = _.extend(_attr, discreetDefaults);
          self.discreet[attrID] = {};
          copy(_discreet, self.discreet[attrID]);
        }
      }
      for (var attrID in dimensions.range) {
        if (dimensions.range.hasOwnProperty(attrID)) {
          var _attr = dimensions.range[attrID], _range = _.extend(_attr, rangeDefaults);
          self.range[attrID] = {};
          copy(_range, self.range[attrID]);
        }
      }
    }
    Dimensions.prototype.pushDiscreetId = function (attrID, idPosition, value) {
      var _discreet = this.discreet[attrID];
      if (_discreet) {
        value = value || 'Unknown';
        if (_discreet.values.hasOwnProperty(value)) {
          _discreet.values[value].ids = setBit(idPosition, _discreet.values[value].ids);
        } else {
          _discreet.values[value] = {
            ids: [0],
            title: value,
            isSelected: false
          };
          _discreet.values[value].ids = setBit(idPosition, _discreet.values[value].ids);
        }
      }
    };
    Dimensions.prototype.load = function (search) {
      var self = this;
      var _search = _.extend({
          title: '',
          discreet: {},
          range: {}
        }, search);
      self.id = _search.id || undefined;
      self.title = _search.title || '';
      for (var rangeID in self.range) {
        if (_search.range.hasOwnProperty(rangeID)) {
          var withinLowBound = _search.range[rangeID].lowSelected >= self.range[rangeID].low, withinHighBound = _search.range[rangeID].highSelected <= self.range[rangeID].high;
          if (withinLowBound && withinHighBound) {
            self.range[rangeID].lowSelected = _search.range[rangeID].lowSelected;
            self.range[rangeID].highSelected = _search.range[rangeID].highSelected;
          } else if (!withinLowBound && withinHighBound) {
            self.range[rangeID].lowSelected = self.range[rangeID].low;
            self.range[rangeID].highSelected = _search.range[rangeID].highSelected;
          } else if (withinLowBound && !withinHighBound) {
            self.range[rangeID].lowSelected = _search.range[rangeID].lowSelected;
            self.range[rangeID].highSelected = self.range[rangeID].high;
          } else {
            self.range[rangeID].lowSelected = self.range[rangeID].low;
            self.range[rangeID].highSelected = self.range[rangeID].high;
          }
        } else {
          if (self.range.hasOwnProperty(rangeID)) {
            self.range[rangeID].lowSelected = self.range[rangeID].low;
            self.range[rangeID].highSelected = self.range[rangeID].high;
          }
        }
      }
      for (var discreetID in self.discreet) {
        if (_search.discreet.hasOwnProperty(discreetID)) {
          for (var attrID in _search.discreet[discreetID].values) {
            if (self.discreet[discreetID].values.hasOwnProperty(attrID)) {
              if (_search.discreet[discreetID].values[attrID].isSelected && !self.discreet[discreetID].values[attrID].isSelected) {
                self.discreet[discreetID].values[attrID].isSelected = true;
                self.discreet[discreetID].selected++;
              } else if (!_search.discreet[discreetID].values[attrID].isSelected && self.discreet[discreetID].values[attrID].isSelected) {
                self.discreet[discreetID].values[attrID].isSelected = false;
                self.discreet[discreetID].selected--;
              }
            }
          }
        } else {
          if (self.discreet.hasOwnProperty(discreetID)) {
            for (var attrID in self.discreet[discreetID].values) {
              if (self.discreet[discreetID].values.hasOwnProperty(attrID)) {
                if (self.discreet[discreetID].values[attrID].isSelected) {
                  self.discreet[discreetID].values[attrID].isSelected = false;
                  self.discreet[discreetID].selected--;
                }
              }
            }
          }
        }
      }
    };
    Dimensions.prototype.toArray = function () {
      var dimensionsArr = _.extend({}, this, {
          discreet: _.map(this.discreet, function (val) {
            return val;
          }),
          range: _.map(this.range, function (val) {
            return val;
          })
        });
      return dimensionsArr;
    };
    Dimensions.prototype.getDiscreet = function () {
      return _.map(this.discreet, function (val) {
        return val;
      });
    };
    Dimensions.prototype.getRange = function () {
      return _.map(this.range, function (val) {
        return val;
      });
    };
    Dimensions.prototype.reset = function () {
      this.title = '';
      this.id = undefined;
      this.discreet = {};
      this.range = {};
      return this;
    };
    function Market(Model, opts) {
      var activeItem = null, prevActive = null;
      _.extend(this, { sortBy: {} }, opts);
      this.Model = Model;
      this.dimensions = {};
      this.items = {};
      this.visibleIds = [];
      this.visibleItems = [];
      this.subsetIds = [];
      this.initialized = false;
      this.populated = false;
      this.getActive = function () {
        return activeItem;
      };
      this.getItems = function () {
        return _.map(this.items, function (val) {
          return val;
        });
      };
      this.setActive = function (id) {
        if (_.isObject(id)) {
          prevActive = activeItem;
          activeItem = id;
          activeItem.isActive = true;
        } else if (this.items[id]) {
          prevActive = activeItem;
          activeItem = this.items[id];
          activeItem.isActive = true;
        } else {
          activeItem = null;
        }
        if (prevActive) {
          prevActive.isActive = false;
        }
        return activeItem;
      };
      this.getDimensions = function () {
        return this.dimensions;
      };
      this.load = function (search) {
        this.dimensions.load(search);
        return this;
      };
    }
    Market.prototype.addModels = function (models) {
      for (var _model in models) {
        if (models.hasOwnProperty(_model)) {
          var model = models[_model];
          try {
            this.mapModel(model);
          } catch (e) {
            console.log(e.message);
          }
        }
      }
    };
    Market.prototype.mapModel = function (model) {
      var self = this, _item = self.items[model.id] = self.Model ? new self.Model(model) : model, idPosition = self.dimensions.idMap.length, dimensions = self.dimensions;
      dimensions.idMap.push(model.id);
      for (var _discreetKey in dimensions.discreet) {
        if (dimensions.discreet.hasOwnProperty(_discreetKey)) {
          var _discreetAttr = dimensions.discreet[_discreetKey];
          if (typeof _item[_discreetKey] !== 'undefined') {
            if (_discreetAttr.multi) {
              if (_item[_discreetKey].length) {
                for (var i = 0; i < _item[_discreetKey].length; i++) {
                  var _itemAttr = _item[_discreetKey][i] = _item[_discreetKey][i] || 'Unknown', _discreetVal;
                  if (_discreetAttr.restrict) {
                    _discreetVal = _.contains(_discreetAttr.restrict, _itemAttr) ? _itemAttr : 'Other';
                  } else {
                    _discreetVal = _itemAttr;
                  }
                  self.dimensions.pushDiscreetId(_discreetKey, idPosition, _discreetVal);
                }
              } else {
                self.dimensions.pushDiscreetId(_discreetKey, idPosition, 'None');
              }
            } else {
              var _discreetVal;
              _item[_discreetKey] = _item[_discreetKey] || 'Unknown';
              if (_discreetAttr.restrict) {
                _discreetVal = _.contains(_discreetAttr.restrict, _item[_discreetKey]) ? _item[_discreetKey] : 'Other';
              } else {
                _discreetVal = _item[_discreetKey];
              }
              self.dimensions.pushDiscreetId(_discreetKey, idPosition, _discreetVal);
            }
          } else {
            throw new Error('Cannot find discreet attribute: ' + _discreetKey);
          }
        }
      }
      for (var _rangeKey in dimensions.range) {
        if (dimensions.range.hasOwnProperty(_rangeKey)) {
          var _rangeAttr = self.dimensions.range[_rangeKey], _itemAttr;
          if (typeof _item[_rangeKey] !== 'undefined') {
            _itemAttr = _item[_rangeKey] = isNaN(parseFloat(_item[_rangeKey])) ? 'NA' : parseFloat(_item[_rangeKey]);
            if (!_rangeAttr.highBound) {
              if ((_itemAttr >= _rangeAttr.high || _rangeAttr.high == null) && _itemAttr !== 'NA') {
                _rangeAttr.high = _rangeAttr.highSelected = _itemAttr;
              }
            } else {
              _rangeAttr.high = _rangeAttr.highSelected = _rangeAttr.highBound;
            }
            if (!_rangeAttr.lowBound) {
              if ((_itemAttr <= _rangeAttr.low || _rangeAttr.low == null) && _itemAttr !== 'NA') {
                _rangeAttr.low = _rangeAttr.lowSelected = _itemAttr;
              }
            } else {
              _rangeAttr.low = _rangeAttr.lowSelected = _rangeAttr.lowBound;
            }
          } else {
            throw new Error('Cannot find range attribute: ' + _rangeKey);
          }
        }
      }
    };
    Market.prototype.initialize = function (dimensions, models) {
      if (!dimensions && !this.dimensions) {
        throw new Error('Dimensions must be defined in order to initialize Marketplace');
      }
      this.items = {};
      this.dimensions = dimensions ? new Dimensions(dimensions) : this.dimensions;
      if (models) {
        this.addModels(models);
        this.populated = true;
        this.apply();
        this.predict();
      }
      this.initialized = true;
      return this.items;
    };
    Market.prototype.apply = function (opts) {
      var dimensions = this.dimensions, items = this.items;
      this.subsetIds = [];
      this.visibleIds = [];
      this.visibleItems = [];
      dimensions.visibleIds = [];
      var BIT_SET_LENGTH = Math.ceil(dimensions.idMap.length / 32), bitSet = [], i;
      for (i = 0; i < BIT_SET_LENGTH; i++) {
        bitSet.push(~0);
        for (var attrId in dimensions.discreet) {
          if (dimensions.discreet.hasOwnProperty(attrId)) {
            var _discreet = dimensions.discreet[attrId], union = _discreet.multi ? ~0 : 0;
            for (var valueId in _discreet.values) {
              if (_discreet.values.hasOwnProperty(valueId)) {
                var _value = _discreet.values[valueId];
                if (_discreet.multi) {
                  if (_discreet.selected === 0) {
                    break;
                  } else if (_value.isSelected) {
                    union = union & _value.ids[i];
                  }
                } else {
                  if (_value.isSelected || _discreet.selected === 0) {
                    union = union | _value.ids[i];
                  }
                }
              }
            }
            _discreet.visibleIds[i] = union;
            bitSet[i] = bitSet[i] & union;
          }
        }
        for (var p = 0; p < 32; p++) {
          var itemIndex = i * 32 + p;
          if (dimensions.idMap[itemIndex]) {
            var _currItem = items[dimensions.idMap[itemIndex]];
            if (!_.isEmpty(dimensions.range)) {
              for (var _rangeKey in dimensions.range) {
                if (dimensions.range.hasOwnProperty(_rangeKey)) {
                  var _rangeAttr = dimensions.range[_rangeKey], _currItemAttr = _currItem[_rangeKey], _isWithinLow = _currItemAttr >= _rangeAttr.lowSelected || _rangeAttr.lowSelected == _rangeAttr.lowBound, _isWithinHigh = _currItemAttr <= _rangeAttr.highSelected || _rangeAttr.highSelected == _rangeAttr.highBound;
                  if (_isWithinLow && _isWithinHigh || _currItemAttr === 'NA' && !_rangeAttr.excludeNA) {
                    _currItem.isVisible = !!(1 & bitSet[i]);
                  } else {
                    _currItem.isVisible = false;
                    for (var _discreetKey in dimensions.discreet) {
                      if (dimensions.discreet.hasOwnProperty(_discreetKey)) {
                        var _discreetAttr = dimensions.discreet[_discreetKey], _mask = ~(1 << p);
                        _discreetAttr.visibleIds[i] = _discreetAttr.visibleIds[i] & _mask;
                      }
                    }
                    break;
                  }
                }
              }
              if (!this.subset || this.subset === 'all') {
                _currItem.isVisible = _currItem.isVisible && !_currItem.hidden;
                if (!_currItem.hidden) {
                  this.subsetIds = setBit(itemIndex, this.subsetIds);
                }
              } else {
                _currItem.isVisible = _currItem.isVisible && _currItem[this.subset];
                if (_currItem[this.subset]) {
                  this.subsetIds = setBit(itemIndex, this.subsetIds);
                }
              }
              if (_currItem.isVisible) {
                dimensions.visibleIds = setBit(itemIndex, dimensions.visibleIds);
                this.visibleIds.push(dimensions.idMap[itemIndex]);
                this.visibleItems.push(_currItem);
              }
            } else {
              _currItem.isVisible = !!(1 & bitSet[i]);
              if (_currItem.isVisible) {
                dimensions.visibleIds = setBit(itemIndex, dimensions.visibleIds);
                this.visibleIds.push(dimensions.idMap[itemIndex]);
                this.visibleItems.push(_currItem);
              }
            }
          }
          bitSet[i] = bitSet[i] >> 1;
        }
      }
      return this.sortVisibleItems();
    };
    Market.prototype.predict = function () {
      var dimensions = this.dimensions;
      var BIT_SET_LENGTH = Math.ceil(dimensions.idMap.length / 32);
      for (var attrId in dimensions.discreet) {
        if (dimensions.discreet.hasOwnProperty(attrId)) {
          var _discreet = dimensions.discreet[attrId];
          for (var valueId in _discreet.values) {
            if (_discreet.values.hasOwnProperty(valueId)) {
              var _value = _discreet.values[valueId];
              if (!_value.isSelected && _discreet.selected > 0) {
                var predictLength = 0, predictBitSet = [];
                for (var i = 0; i < BIT_SET_LENGTH; i++) {
                  var predictedUnion = _discreet.visibleIds[i] | _value.ids[i];
                  predictBitSet.push(~0);
                  for (var predictAttrId in dimensions.discreet) {
                    if (dimensions.discreet.hasOwnProperty(predictAttrId)) {
                      var _predictDiscreet = dimensions.discreet[predictAttrId];
                      if (predictAttrId === attrId) {
                        predictBitSet[i] = predictBitSet[i] & predictedUnion;
                      } else {
                        predictBitSet[i] = predictBitSet[i] & _predictDiscreet.visibleIds[i];
                      }
                    }
                  }
                  predictLength += popcount(predictBitSet[i] & _value.ids[i] & this.subsetIds[i]);
                }
                if (predictLength) {
                  _value.badge = 'badge-success';
                  _value.predict = '+' + predictLength;
                } else {
                  _value.badge = null;
                  _value.predict = 0;
                }
              } else {
                _value.predict = 0;
                for (var i = 0; i < BIT_SET_LENGTH; i++) {
                  _value.predict += popcount(dimensions.visibleIds[i] & _value.ids[i]);
                }
                _value.badge = _value.predict ? 'badge-info' : '';
              }
            }
          }
        }
      }
    };
    Market.prototype.sortVisibleItems = function (predicate, reverse) {
      var _predicate = predicate || this.sortBy.predicate, _reverse = typeof reverse == 'undefined' ? this.sortBy.reverse : reverse, _items = [], _naItems = [];
      if (!_predicate) {
        return this.visibleItems;
      }
      function compare(a, b) {
        var v1 = a[_predicate] || a[_predicate] || null;
        var v2 = b[_predicate] || b[_predicate] || null;
        var t1 = typeof v1;
        var t2 = typeof v2;
        if (t1 == t2) {
          if (t1 == 'string')
            v1 = v1.toLowerCase();
          if (t1 == 'string')
            v2 = v2.toLowerCase();
          if (v1 === v2)
            return 0;
          return v1 < v2 ? -1 : 1;
        } else {
          return v1 < v2 ? -1 : 1;
        }
      }
      for (var i = this.visibleItems.length - 1; i >= 0; i--) {
        var _item = this.visibleItems[i];
        var _attr = _item[_predicate] || _item[_predicate] || null;
        if (_attr == 'NA') {
          _naItems.push(_item);
        } else {
          _items.push(_item);
        }
      }
      _items.sort(_reverse ? compare : function (a, b) {
        return compare(b, a);
      });
      this.visibleItems = _items.concat(_naItems);
      this.sortBy = {
        predicate: _predicate,
        reverse: _reverse
      };
      return this.visibleItems;
    };
    Market.prototype.toggleDiscreet = function (discreet, value) {
      if (discreet && value) {
        value.isSelected = !value.isSelected;
        value.isSelected ? discreet.selected++ : discreet.selected--;
      }
      return this;
    };
    Market.prototype.applyRange = function (rangeKey, low, high) {
      if (this.dimensions.range.hasOwnProperty(rangeKey)) {
        var _range = this.dimensions.range[rangeKey];
        _range.lowSelected = low;
        _range.highSelected = high;
      } else {
        throw new Error('Cannot find range dimension ' + rangeKey);
      }
      return this;
    };
    Market.prototype.excludeNA = function (rangeKey) {
      this.dimensions.range[rangeKey].excludeNA = true;
      return this;
    };
    Market.prototype.includeNA = function (rangeKey) {
      this.dimensions.range[rangeKey].excludeNA = false;
      return this;
    };
    return { Marketplace: Market };
  }();
angular.module('rescour.user', []).service('User', [
  '$http',
  '$q',
  '$_api',
  function ($http, $q, $_api) {
    this.profile = {};
    this.billing = {};
    this.getProfile = function () {
      var defer = $q.defer(), self = this, path = $_api.path + '/auth/users/user/', config = angular.extend({}, $_api.config);
      $http.get(path, config).then(function (response) {
        angular.copy(response.data, self.profile);
        defer.resolve(response);
      }, function (response) {
        defer.reject(response);
      });
      return defer.promise;
    };
    this.saveProfile = function () {
      var defer = $q.defer(), self = this, path = $_api.path + '/auth/users/user/', config = angular.extend({
          transformRequest: function (data) {
            return data;
          }
        }, $_api.config), body = JSON.stringify(this.profile);
      $http.put(path, body, config).then(function (response) {
        defer.resolve(response);
      }, function (response) {
        self.getProfile();
        throw new Error('Error updating profile');
        defer.reject(response);
      });
      return defer.promise;
    };
    this.getBilling = function () {
      var defer = $q.defer(), self = this, path = $_api.path + '/auth/users/user/payment/', config = angular.extend({
          transformRequest: function (data) {
            return data;
          }
        }, $_api.config);
      $http.get(path, config).then(function (response) {
        angular.copy(response.data, self.billing);
        defer.resolve(response);
      }, function (response) {
        defer.reject(response);
      });
      return defer.promise;
    };
    this.cancelSubscription = function (reason, transformFn) {
      var defer = $q.defer(), path = $_api.path + '/auth/users/user/cancel/', config = angular.extend({ transformRequest: transformFn }, $_api.config), body = JSON.stringify({ text: reason });
      $http.post(path, body, config).then(function (response) {
        defer.resolve(response);
      }, function (response) {
        defer.reject(response);
      });
      return defer.promise;
    };
  }
]);
angular.module('rescour.utility', []).filter('limitVisible', [
  '$document',
  function ($document) {
    return function (input, limit, exceptions) {
      var visibleItems = [];
      _.each(input, function (item) {
        if (item.isVisible) {
          visibleItems.push(item);
        }
      });
      return visibleItems;
    };
  }
]).filter('ellipsis', function () {
  return function (input, limit, exceptions) {
    if (input !== 'No description provided' && input.length > limit) {
      return input.substr(0, limit) + '...';
    } else {
      return input;
    }
  };
}).filter('percentage', function () {
  return function (input, limit, exceptions) {
    var num = parseFloat(input);
    return num.toFixed(3) + ' %';
  };
}).directive('passwordVerify', function () {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ctrl) {
      scope.$watch(function () {
        return scope.$eval(attrs.passwordVerify);
      }, function (newVal) {
        ctrl.$viewValue = '';
        ctrl.$modelValue = '';
        ctrl.$render();
        ctrl.$setValidity('passwordMatch', false);
      });
      ctrl.$parsers.unshift(function (viewValue) {
        var origin = scope.$eval(attrs.passwordVerify);
        if (viewValue === origin) {
          ctrl.$setValidity('passwordMatch', true);
          return viewValue;
        } else {
          ctrl.$setValidity('passwordMatch', false);
          return undefined;
        }
      });
    }
  };
}).directive('passwordValidate', function () {
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function (viewValue) {
        scope.pwdValidLength = viewValue && viewValue.length >= 8 ? 'valid' : undefined;
        scope.pwdHasLetter = viewValue && /[A-z]/.test(viewValue) ? 'valid' : undefined;
        scope.pwdHasNumber = viewValue && /\d/.test(viewValue) ? 'valid' : undefined;
        if (scope.pwdValidLength && scope.pwdHasLetter && scope.pwdHasNumber) {
          ctrl.$setValidity('passwordValid', true);
          return viewValue;
        } else {
          ctrl.$setValidity('passwordValid', false);
          return undefined;
        }
      });
    }
  };
}).directive('ngBlur', [
  '$parse',
  function ($parse) {
    return function (scope, element, attr) {
      var fn = $parse(attr['ngBlur']);
      element.bind('blur', function (event) {
        scope.$apply(function () {
          fn(scope, {
            $event: event,
            $element: element
          });
        });
      });
    };
  }
]).directive('autoSave', [
  '$parse',
  '$timeout',
  function ($parse, $timeout) {
    return {
      restrict: 'A',
      scope: true,
      link: function (scope, element, attr) {
        var fn = $parse(attr['autoSave']);
        element.bind('blur', function (event) {
          scope.$apply(function () {
            fn(scope, { $event: event });
          });
        });
        scope.$on('autoSaveSuccess', function () {
          element.addClass('auto-save-success');
          $timeout(function () {
            element.removeClass('auto-save-success');
          }, 400);
        });
        element.addClass('auto-save');
      }
    };
  }
]).directive('fadeAfter', [
  '$timeout',
  function ($timeout) {
    return {
      link: function (scope, element, attrs) {
        if (parseInt(attrs.fadeAfter, 10)) {
          $timeout(function () {
            element.fadeOut(700);
          }, attrs.fadeAfter);
        }
      }
    };
  }
]).directive('fade', function () {
  return function (scope, element, attr) {
    scope.$watch(attr.fade, function (value) {
      !!value ? element.fadeIn(700) : element.fadeOut(700);
    });
  };
}).directive('fadeIn', function () {
  return function (scope, element, attr) {
    scope.$watch(attr.fadeIn, function (value) {
      !!value ? element.fadeIn(500) : element.hide();
    });
  };
}).directive('chunk', [
  '$timeout',
  function ($timeout) {
    return {
      link: function (scope, element, attrs) {
        var raw = element[0], currentSlice, chunkSize = parseInt(attrs.chunkSize, 10) || 10;
        function initChunk() {
          scope.visibleItems = scope.$eval(attrs.chunk);
          currentSlice = chunkSize;
          scope.chunk = scope.visibleItems.slice(0, chunkSize);
        }
        element.bind('scroll', function () {
          if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
            scope.$apply(function () {
              scope.chunk = scope.chunk.concat(scope.visibleItems.slice(currentSlice, currentSlice += chunkSize));
            });
          }
        });
        scope.$watch(function (newScope) {
          if (!angular.equals(scope.$eval(attrs.chunk), newScope.visibleItems)) {
            raw.scrollTop = 0;
            initChunk();
          }
        });
      }
    };
  }
]).directive('formatInput', [
  '$filter',
  '$timeout',
  '$parse',
  function ($filter, $timeout, $parse) {
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ctrl) {
        elm.bind('blur', function () {
          scope.$apply(function () {
            applyFilter(attrs.formatInput);
          });
        });
        function applyFilter(formatInput) {
          formatInput = formatInput || attrs.formatInput;
          if (ctrl.$modelValue) {
            ctrl.$viewValue = $filter(formatInput)(ctrl.$modelValue);
            ctrl.$render();
          } else {
            ctrl.$viewValue = undefined;
            ctrl.$render();
          }
        }
        ctrl.$parsers.push(function (viewVal) {
          return viewVal.replace(/\,/g, '');
        });
        elm.bind('focus', function () {
          scope.$apply(function () {
            ctrl.$viewValue = ctrl.$modelValue;
            ctrl.$render();
          });
        });
        attrs.$observe('formatInput', function (val) {
          if (val) {
            ctrl.$viewValue = $filter(val)(ctrl.$modelValue);
            ctrl.$render();
          }
        });
        $timeout(function () {
          applyFilter(attrs.formatInput);
        }, 0);
      }
    };
  }
]).directive('scrollContainer', [
  '$window',
  '$document',
  '$timeout',
  function ($window, $document, $timeout) {
    return {
      restrict: 'C',
      link: function (scope, element, attrs) {
        function calcElementHeight(e) {
          var _siblings = $(e).siblings(), _siblingsHeight = 0, _windowHeight = $window.innerHeight, _headerHeight = $document.find('header')[0].clientHeight;
          ;
          for (var i = 0; i < _siblings.length; i++) {
            _siblingsHeight += $(_siblings[i]).height();
          }
          return _windowHeight - _siblingsHeight - _headerHeight + 'px';
        }
        angular.element($window).bind('resize', _.debounce(function () {
          element.css({ 'height': calcElementHeight(element) });
        }, 300));
        $timeout(function () {
          element.css({ 'height': calcElementHeight(element) });
        }, 0);
      }
    };
  }
]).directive('inputDropdown', [
  '$document',
  function ($document) {
    return {
      restrict: 'C',
      link: function (scope, element, attrs) {
        var ddBtn = element.find('.input-dropdown-btn');
        var ddMenu = element.find('.input-dropdown-menu');
        scope.$on('destroyDropdowns', close);
        function open(e) {
          if (e) {
            e.stopPropagation();
            e.preventDefault();
          }
          console.log('hi');
          scope.$broadcast('destroyDropdowns');
          scope.$broadcast('destroyTooltips');
          if (!scope.isOpen) {
            scope.$apply(function () {
              ddMenu.show();
              scope.isOpen = true;
              $document.bind('click', close);
              ddBtn.unbind('click', open);
            });
          } else {
            close();
          }
        }
        function close(e) {
          scope.$apply(function () {
            if (scope.isOpen) {
              ddMenu.hide();
              scope.isOpen = false;
              $document.unbind('click', close);
              ddBtn.bind('click', open);
            }
          });
        }
        ddBtn.bind('click', open);
      }
    };
  }
]);
angular.module('thotpod.spinner', []).factory('$spinner', function () {
  var prefixes = [
      'webkit',
      'Moz',
      'ms',
      'O'
    ], animations = {}, useCssAnimations;
  function createEl(tag, prop) {
    var el = document.createElement(tag || 'div'), n;
    for (n in prop)
      el[n] = prop[n];
    return el;
  }
  function ins(parent) {
    for (var i = 1, n = arguments.length; i < n; i++)
      parent.appendChild(arguments[i]);
    return parent;
  }
  var sheet = function () {
      var el = createEl('style', { type: 'text/css' });
      ins(document.getElementsByTagName('head')[0], el);
      return el.sheet || el.styleSheet;
    }();
  function addAnimation(alpha, trail, i, lines) {
    var name = [
        'opacity',
        trail,
        ~~(alpha * 100),
        i,
        lines
      ].join('-'), start = 0.01 + i / lines * 100, z = Math.max(1 - (1 - alpha) / trail * (100 - start), alpha), prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase(), pre = prefix && '-' + prefix + '-' || '';
    if (!animations[name]) {
      sheet.insertRule('@' + pre + 'keyframes ' + name + '{' + '0%{opacity:' + z + '}' + start + '%{opacity:' + alpha + '}' + (start + 0.01) + '%{opacity:1}' + (start + trail) % 100 + '%{opacity:' + alpha + '}' + '100%{opacity:' + z + '}' + '}', sheet.cssRules.length);
      animations[name] = 1;
    }
    return name;
  }
  function vendor(el, prop) {
    var s = el.style, pp, i;
    if (s[prop] !== undefined)
      return prop;
    prop = prop.charAt(0).toUpperCase() + prop.slice(1);
    for (i = 0; i < prefixes.length; i++) {
      pp = prefixes[i] + prop;
      if (s[pp] !== undefined)
        return pp;
    }
  }
  function css(el, prop) {
    for (var n in prop)
      el.style[vendor(el, n) || n] = prop[n];
    return el;
  }
  function merge(obj) {
    for (var i = 1; i < arguments.length; i++) {
      var def = arguments[i];
      for (var n in def)
        if (obj[n] === undefined)
          obj[n] = def[n];
    }
    return obj;
  }
  function pos(el) {
    var o = {
        x: el.offsetLeft,
        y: el.offsetTop
      };
    while (el = el.offsetParent)
      o.x += el.offsetLeft, o.y += el.offsetTop;
    return o;
  }
  var defaults = {
      lines: 12,
      length: 7,
      width: 5,
      radius: 10,
      rotate: 0,
      corners: 1,
      color: '#000',
      direction: 1,
      speed: 1,
      trail: 100,
      opacity: 1 / 4,
      fps: 20,
      zIndex: 2000000000,
      className: 'spinner',
      top: 'auto',
      left: 'auto',
      position: 'relative'
    };
  function Spinner(o) {
    if (typeof this == 'undefined')
      return new Spinner(o);
    this.opts = merge(o || {}, Spinner.defaults, defaults);
  }
  Spinner.defaults = {};
  merge(Spinner.prototype, {
    spin: function (target) {
      this.stop();
      var self = this, o = self.opts, el = self.el = css(createEl(0, { className: o.className }), {
          position: o.position,
          width: 0,
          zIndex: o.zIndex
        }), mid = o.radius + o.length + o.width, ep, tp;
      if (target) {
        target.insertBefore(el, target.firstChild || null);
        tp = pos(target);
        ep = pos(el);
        css(el, {
          left: (o.left == 'auto' ? tp.x - ep.x + (target.offsetWidth >> 1) : parseInt(o.left, 10) + mid) + 'px',
          top: (o.top == 'auto' ? tp.y - ep.y + (target.offsetHeight >> 1) : parseInt(o.top, 10) + mid) + 'px'
        });
      }
      el.setAttribute('role', 'progressbar');
      self.lines(el, self.opts);
      if (!useCssAnimations) {
        var i = 0, start = (o.lines - 1) * (1 - o.direction) / 2, alpha, fps = o.fps, f = fps / o.speed, ostep = (1 - o.opacity) / (f * o.trail / 100), astep = f / o.lines;
        ;
        (function anim() {
          i++;
          for (var j = 0; j < o.lines; j++) {
            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity);
            self.opacity(el, j * o.direction + start, alpha, o);
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000 / fps));
        }());
      }
      return self;
    },
    stop: function () {
      var el = this.el;
      if (el) {
        clearTimeout(this.timeout);
        if (el.parentNode)
          el.parentNode.removeChild(el);
        this.el = undefined;
      }
      return this;
    },
    lines: function (el, o) {
      var i = 0, start = (o.lines - 1) * (1 - o.direction) / 2, seg;
      function fill(color, shadow) {
        return css(createEl(), {
          position: 'absolute',
          width: o.length + o.width + 'px',
          height: o.width + 'px',
          background: color,
          boxShadow: shadow,
          transformOrigin: 'left',
          transform: 'rotate(' + ~~(360 / o.lines * i + o.rotate) + 'deg) translate(' + o.radius + 'px' + ',0)',
          borderRadius: (o.corners * o.width >> 1) + 'px'
        });
      }
      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute',
          top: 1 + ~(o.width / 2) + 'px',
          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: o.opacity,
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1 / o.speed + 's linear infinite'
        });
        if (o.shadow)
          ins(seg, css(fill('#000', '0 0 4px ' + '#000'), { top: 2 + 'px' }));
        ins(el, ins(seg, fill(o.color, '0 0 1px rgba(0,0,0,.1)')));
      }
      return el;
    },
    opacity: function (el, i, val) {
      if (i < el.childNodes.length)
        el.childNodes[i].style.opacity = val;
    }
  });
  function initVML() {
    function vml(tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr);
    }
    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)');
    Spinner.prototype.lines = function (el, o) {
      var r = o.length + o.width, s = 2 * r;
      function grp() {
        return css(vml('group', {
          coordsize: s + ' ' + s,
          coordorigin: -r + ' ' + -r
        }), {
          width: s,
          height: s
        });
      }
      var margin = -(o.width + o.length) * 2 + 'px', g = css(grp(), {
          position: 'absolute',
          top: margin,
          left: margin
        }), i;
      function seg(i, dx, filter) {
        ins(g, ins(css(grp(), {
          rotation: 360 / o.lines * i + 'deg',
          left: ~~dx
        }), ins(css(vml('roundrect', { arcsize: o.corners }), {
          width: r,
          height: o.width,
          left: o.radius,
          top: -o.width >> 1,
          filter: filter
        }), vml('fill', {
          color: o.color,
          opacity: o.opacity
        }), vml('stroke', { opacity: 0 }))));
      }
      if (o.shadow)
        for (i = 1; i <= o.lines; i++)
          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)');
      for (i = 1; i <= o.lines; i++)
        seg(i);
      return ins(el, g);
    };
    Spinner.prototype.opacity = function (el, i, val, o) {
      var c = el.firstChild;
      o = o.shadow && o.lines || 0;
      if (c && i + o < c.childNodes.length) {
        c = c.childNodes[i + o];
        c = c && c.firstChild;
        c = c && c.firstChild;
        if (c)
          c.opacity = val;
      }
    };
  }
  var probe = css(createEl('group'), { behavior: 'url(#default#VML)' });
  if (!vendor(probe, 'transform') && probe.adj)
    initVML();
  else
    useCssAnimations = vendor(probe, 'animation');
  return Spinner;
}).directive('spinner', [
  '$spinner',
  function ($spinner) {
    return {
      restrict: 'AC',
      link: function (scope, element, attrs) {
        var opts = {
            small: {
              lines: 9,
              length: 0,
              width: 4,
              radius: 8,
              corners: 1,
              rotate: 37,
              direction: 1,
              color: '#555',
              speed: 1,
              trail: 85,
              shadow: false,
              hwaccel: true,
              className: 'spinner',
              zIndex: 2000000000,
              top: 'auto',
              left: 'auto'
            },
            large: {
              lines: 9,
              length: 0,
              width: 12,
              radius: 24,
              corners: 1,
              rotate: 37,
              direction: 1,
              color: '#555',
              speed: 1,
              trail: 85,
              shadow: false,
              hwaccel: true,
              className: 'spinner',
              zIndex: 2000000000,
              top: 'auto',
              left: 'auto'
            }
          }, ele = element[0], userOpts = scope.$eval(attrs.spinnerOptions) || {}, spinner = new $spinner(angular.extend({}, opts[attrs.spinnerSize || 'small'], userOpts)), isSpinning = false;
        scope.$watch(function () {
          if (scope.$eval(attrs.spinner) && isSpinning === false) {
            spinner.spin(ele);
            isSpinning = true;
          } else if (!scope.$eval(attrs.spinner)) {
            spinner.stop();
            isSpinning = false;
          }
        });
      }
    };
  }
]);
'use strict';
angular.module('rescour.auth', []).config([
  '$httpProvider',
  '$routeProvider',
  function ($httpProvider, $routeProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    $routeProvider.when('/logout', {
      resolve: {
        checkUser: function ($rootScope, $location) {
          $rootScope.$broadcast('auth#logoutRequest');
        }
      }
    });
    $httpProvider.responseInterceptors.push('AuthInterceptor');
  }
]).run([
  '$rootScope',
  '$_api',
  '$location',
  '$q',
  '$http',
  function ($rootScope, $_api, $location, $q, $http) {
    $rootScope.requests401 = [];
    $http.defaults.useXDomain = true;
    $rootScope.ping = function () {
      var defer = $q.defer(), self = this, path = $_api.path + '/auth/check/', config = angular.extend({
          transformRequest: function (data) {
            return data;
          }
        }, $_api.config);
      $http.get(path, config).then(function (response) {
        if (!response.data.user) {
          $rootScope.$broadcast('auth#loginRequired');
          defer.reject(response);
        } else {
          defer.resolve(response);
        }
      }, function (response) {
        defer.reject(response);
      });
      return defer.promise;
    };
    $rootScope.$on('auth#resendRequests', function () {
      function retry(req) {
        $http(req.config).then(function (response) {
          req.deferred.resolve(response);
        });
      }
      var i, requests = $rootScope.requests401;
      for (i = 0; i < requests.length; i++) {
        retry(requests[i]);
      }
      $rootScope.requests401 = [];
    });
    $rootScope.$on('auth#paymentRequired', function () {
      $location.path('/account/activate/');
    });
    $rootScope.$on('auth#paymentConfirmed', function () {
      $location.path('/account/welcome');
    });
    $rootScope.$on('auth#loginRequest', function (event, creds) {
      $_api.auth.login(creds, function (response) {
        $rootScope.$broadcast('auth#loginConfirmed');
        $location.path('/');
      }, function (response) {
        $rootScope.$broadcast('auth#loginRequired');
      });
    });
    $rootScope.$on('auth#loginRequired', function () {
      $location.path('/login');
    });
    $rootScope.$on('auth#logoutRequest', function () {
      var path = $_api.path + '/auth/logout/', config = angular.extend({
          transformRequest: function (data) {
            return data;
          }
        }, $_api.config), body = JSON.stringify({});
      $http.get(path, body, config).then(function (response) {
        $location.path('/login');
      }, function (response) {
        $location.path('/login');
      });
    });
  }
]).factory('AuthInterceptor', [
  '$q',
  '$rootScope',
  '$timeout',
  function ($q, $rootScope, $timeout) {
    return function (promise) {
      var resolve = function (response) {
        }, reject = function (response) {
          var status = response.status, message = response.data.status_message;
          switch (status) {
          case 401:
            var defer = $q.defer(), req = {
                config: response.config,
                deferred: defer
              };
            $rootScope.requests401.push(req);
            $rootScope.$broadcast('auth#loginRequired');
            return defer.promise;
          case 201:
            $rootScope.$broadcast('auth#loginRequired');
            break;
          case 402:
            var defer = $q.defer(), req = {
                config: response.config,
                deferred: defer
              };
            $rootScope.requests401.push(req);
            if (message === 'payment required') {
              $rootScope.$broadcast('auth#paymentRequired');
            } else if (message === 'payment authorizing') {
              $rootScope.$broadcast('auth#paymentAuthorizing');
            }
            return defer.promise;
          case 403:
            $rootScope.$broadcast('auth#logoutRequest');
            break;
          default:
          }
          return $q.reject(response);
        };
      promise.then(resolve, reject);
      return promise;
    };
  }
]);
angular.module('rescour.browserDetect', []).provider('BrowserDetect', function () {
  var BrowserDetect = {
      init: function () {
        this.browser = this.searchString(this.dataBrowser) || 'An unknown browser';
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || 'an unknown version';
        this.OS = this.searchString(this.dataOS) || 'an unknown OS';
        this.platform = navigator.userAgent.match(/iPad/i) != null ? 'tablet' : 'desktop';
      },
      searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
          var dataString = data[i].string;
          var dataProp = data[i].prop;
          this.versionSearchString = data[i].versionSearch || data[i].identity;
          if (dataString) {
            if (dataString.indexOf(data[i].subString) != -1)
              return data[i].identity;
          } else if (dataProp)
            return data[i].identity;
        }
      },
      searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1)
          return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
      },
      dataBrowser: [
        {
          string: navigator.userAgent,
          subString: 'Chrome',
          identity: 'Chrome'
        },
        {
          string: navigator.userAgent,
          subString: 'OmniWeb',
          versionSearch: 'OmniWeb/',
          identity: 'OmniWeb'
        },
        {
          string: navigator.vendor,
          subString: 'Apple',
          identity: 'Safari',
          versionSearch: 'Version'
        },
        {
          prop: window.opera,
          identity: 'Opera',
          versionSearch: 'Version'
        },
        {
          string: navigator.vendor,
          subString: 'iCab',
          identity: 'iCab'
        },
        {
          string: navigator.vendor,
          subString: 'KDE',
          identity: 'Konqueror'
        },
        {
          string: navigator.userAgent,
          subString: 'Firefox',
          identity: 'Firefox'
        },
        {
          string: navigator.vendor,
          subString: 'Camino',
          identity: 'Camino'
        },
        {
          string: navigator.userAgent,
          subString: 'Netscape',
          identity: 'Netscape'
        },
        {
          string: navigator.userAgent,
          subString: 'MSIE',
          identity: 'Explorer',
          versionSearch: 'MSIE'
        },
        {
          string: navigator.userAgent,
          subString: 'Gecko',
          identity: 'Mozilla',
          versionSearch: 'rv'
        },
        {
          string: navigator.userAgent,
          subString: 'Mozilla',
          identity: 'Netscape',
          versionSearch: 'Mozilla'
        }
      ],
      dataOS: [
        {
          string: navigator.platform,
          subString: 'Win',
          identity: 'Windows'
        },
        {
          string: navigator.platform,
          subString: 'Mac',
          identity: 'Mac'
        },
        {
          string: navigator.userAgent,
          subString: 'iPhone',
          identity: 'iPhone/iPod'
        },
        {
          string: navigator.platform,
          subString: 'Linux',
          identity: 'Linux'
        }
      ]
    };
  BrowserDetect.init();
  return {
    platform: BrowserDetect.platform,
    $get: function () {
      return BrowserDetect;
    }
  };
});
'use strict';
angular.module('rescour.config', []).factory('$_api', [
  '$http',
  function ($http) {
    var url = { dev: 'http://dev.maasive.net/v2/528a7eae53d4c940a0a4190d' }, stripeTokens = {
        test: 'pk_test_wSAqQNQKI7QqPmBpDcQLgGM7',
        prod: 'pk_live_4TLhgO3Pp1gOdWWmvLVK1PG3'
      }, config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }, loading = {
        none: function (data) {
          return data;
        }
      };
    return {
      config: config,
      path: url.dev,
      loading: loading,
      stripeToken: stripeTokens.test
    };
  }
]);
if (!window.console)
  window.console = {};
if (!window.console.log)
  window.console.log = function () {
  };
angular.module('roomba.app', [
  'ui.bootstrap',
  'rescour.config',
  'rescour.auth',
  'rescour.user',
  'rescour.utility',
  'thotpod.spinner',
  'ui'
]).value('States', {
  'AL': 'Alabama',
  'AK': 'Alaska',
  'AS': 'American Samoa',
  'AZ': 'Arizona',
  'AR': 'Arkansas',
  'CA': 'California',
  'CO': 'Colorado',
  'CT': 'Connecticut',
  'DE': 'Delaware',
  'DC': 'District Of Columbia',
  'FM': 'Federated States Of Micronesia',
  'FL': 'Florida',
  'GA': 'Georgia',
  'GU': 'Guam',
  'HI': 'Hawaii',
  'ID': 'Idaho',
  'IL': 'Illinois',
  'IN': 'Indiana',
  'IA': 'Iowa',
  'KS': 'Kansas',
  'KY': 'Kentucky',
  'LA': 'Louisiana',
  'ME': 'Maine',
  'MH': 'Marshall Islands',
  'MD': 'Maryland',
  'MA': 'Massachusetts',
  'MI': 'Michigan',
  'MN': 'Minnesota',
  'MS': 'Mississippi',
  'MO': 'Missouri',
  'MT': 'Montana',
  'NE': 'Nebraska',
  'NV': 'Nevada',
  'NH': 'New Hampshire',
  'NJ': 'New Jersey',
  'NM': 'New Mexico',
  'NY': 'New York',
  'NC': 'North Carolina',
  'ND': 'North Dakota',
  'MP': 'Northern Mariana Islands',
  'OH': 'Ohio',
  'OK': 'Oklahoma',
  'OR': 'Oregon',
  'PW': 'Palau',
  'PA': 'Pennsylvania',
  'PR': 'Puerto Rico',
  'RI': 'Rhode Island',
  'SC': 'South Carolina',
  'SD': 'South Dakota',
  'TN': 'Tennessee',
  'TX': 'Texas',
  'UT': 'Utah',
  'VT': 'Vermont',
  'VI': 'Virgin Islands',
  'VA': 'Virginia',
  'WA': 'Washington',
  'WV': 'West Virginia',
  'WI': 'Wisconsin',
  'WY': 'Wyoming'
}).factory('Item', [
  '$_api',
  '$q',
  '$http',
  'States',
  '$rootScope',
  function ($_api, $q, $http, States, $rootScope) {
    function ItemFactory(collection) {
      var Item = function (data, defaults) {
        var _defaults = defaults || {
            title: 'New ' + collection.title,
            tags: [],
            isVisible: true
          }, opts = angular.extend({}, _defaults, data), self = this;
        angular.copy(opts, this);
        if (collection.key === 'listings' || collection.key === 'contacts') {
          self.raw = self.raw || {};
          self.edited = self.edited || {};
          angular.forEach(collection.fields, function (fieldConfig) {
            var rawDefault = {
                value: null,
                status: null
              };
            if (fieldConfig.fields) {
              var _rawField = self.raw[fieldConfig.key] = self.raw[fieldConfig.key] || {}, _editedField = self.edited[fieldConfig.key] = self.edited[fieldConfig.key] || {};
              for (var i = 0; i < fieldConfig.fields.length; i++) {
                var subFieldConfig = fieldConfig.fields[i];
                _rawField[subFieldConfig.key] = _rawField[subFieldConfig.key] || rawDefault;
                _editedField[subFieldConfig.key] = _editedField[subFieldConfig.key] || (fieldConfig.placeholder || null);
                if (_rawField[subFieldConfig.key].status == 2) {
                  self.isConflict = true;
                }
                if (subFieldConfig.type === 'date') {
                  _editedField[subFieldConfig.key] = _editedField[subFieldConfig.key] ? new Date(_editedField[subFieldConfig.key]) : null;
                  _rawField[subFieldConfig.key].value = _rawField[subFieldConfig.key].value ? new Date(_rawField[subFieldConfig.key].value) : null;
                }
              }
            } else {
              self.raw[fieldConfig.key] = self.raw[fieldConfig.key] || rawDefault;
              self.edited[fieldConfig.key] = self.edited[fieldConfig.key] || (fieldConfig.placeholder || null);
              if (self.raw[fieldConfig.key].status == 2) {
                self.isConflict = true;
              }
              if (fieldConfig.type === 'date') {
                if (Date.parse(self.edited[fieldConfig.key])) {
                  self.edited[fieldConfig.key] = new Date(self.edited[fieldConfig.key]);
                } else {
                  self.edited[fieldConfig.key] = self.edited[fieldConfig.key] ? new Date(parseInt(self.edited[fieldConfig.key], 10)) : null;
                }
                if (Date.parse(self.raw[fieldConfig.key].value)) {
                  self.raw[fieldConfig.key].value = new Date(self.raw[fieldConfig.key].value);
                } else {
                  self.raw[fieldConfig.key].value = self.raw[fieldConfig.key].value ? new Date(parseInt(self.raw[fieldConfig.key].value, 10)) : null;
                }
              }
            }
          });
          angular.forEach(collection.models, function (modelConfig) {
            self.raw[modelConfig.key] = self.raw[modelConfig.key] || [];
            self.edited[modelConfig.key] = self.edited[modelConfig.key] || [];
            for (var i = 0; i < self.raw[modelConfig.key].length; i++) {
              var modelInstance = self.raw[modelConfig.key][i];
              for (var j = 0; j < modelConfig.fields.length; j++) {
                var modelFieldConfig = modelConfig.fields[j];
                modelInstance[modelFieldConfig.key] = modelInstance[modelFieldConfig.key] || {
                  value: null,
                  status: null
                };
                if (modelInstance[modelFieldConfig.key].status == 2 && modelConfig.key != 'pages') {
                  self.isConflict = true;
                }
                if (modelFieldConfig.type === 'date') {
                  modelInstance[modelFieldConfig.key].value = modelInstance[modelFieldConfig.key].value ? new Date(modelInstance[modelFieldConfig.key]) : null;
                }
              }
            }
            for (var i = 0; i < self.edited[modelConfig.key].length; i++) {
              var modelInstance = self.edited[modelConfig.key][i];
              for (var j = 0; j < modelConfig.fields.length; j++) {
                var modelFieldConfig = modelConfig.fields[j];
                modelInstance[modelFieldConfig.key] = modelInstance[modelFieldConfig.key] || (modelFieldConfig.placeholder || '');
                if (modelFieldConfig.type === 'date') {
                  modelInstance[modelFieldConfig.key] = modelInstance[modelFieldConfig.key] ? new Date(modelInstance[modelFieldConfig.key]) : null;
                }
              }
            }
          });
          angular.forEach(collection.dimensions.discreet, function (attr, attrID) {
            if (!attr.nested) {
              if (self.hasOwnProperty(attrID)) {
                self[attrID] = self[attrID] || (self.edited[attrID] || (self.raw[attrID].value || (attr.placeholder || '')));
              } else if (self.raw.hasOwnProperty(attrID)) {
                self[attrID] = self.edited[attrID] || (self.raw[attrID].value || (attr.placeholder || ''));
              } else {
                throw new Error(attrID + ' is not defined in $collection');
              }
            } else {
              if (self.raw.hasOwnProperty(attr.nested)) {
                if (self.raw[attr.nested].hasOwnProperty(attrID)) {
                  self[attrID] = self.edited[attr.nested][attrID] || (self.raw[attr.nested][attrID].value || (attr.placeholder || ''));
                } else {
                  throw new Error(attr.nested + ' has no property ' + attrID);
                }
              } else {
                throw new Error(attr.nested + ' is not defined in $collection');
              }
            }
          });
          angular.forEach(collection.dimensions.range, function (attr, attrID) {
            self[attrID] = parseFloat(self.edited[attrID]) || parseFloat(self.raw[attrID].value);
          });
        } else {
          angular.forEach(collection.fields, function (fieldConfig) {
            if (fieldConfig.fields) {
              var _field = self[fieldConfig.key] = self[fieldConfig.key] || {};
              for (var i = 0; i < fieldConfig.fields.length; i++) {
                var subFieldConfig = fieldConfig.fields[i];
                _field[subFieldConfig.key] = _field[subFieldConfig.key] || (fieldConfig.placeholder || null);
                if (subFieldConfig.type === 'date') {
                  _field[subFieldConfig.key] = _field[subFieldConfig.key] ? new Date(_field[subFieldConfig.key]) : null;
                }
              }
            } else {
              self[fieldConfig.key] = self[fieldConfig.key] || (fieldConfig.placeholder || null);
              if (fieldConfig.type === 'date') {
                self[fieldConfig.key] = self[fieldConfig.key] ? new Date(self[fieldConfig.key]) : null;
              }
            }
          });
          angular.forEach(collection.models, function (modelConfig) {
            self[modelConfig.key] = self[modelConfig.key] || [];
          });
          angular.forEach(collection.dimensions.discreet, function (attr, attrID) {
            if (!attr.nested) {
              if (self.hasOwnProperty(attrID)) {
                self[attrID] = self[attrID] || (attr.placeholder || '');
              } else {
                throw new Error(attrID + ' is not defined in $collection');
              }
            } else {
              if (self.hasOwnProperty(attr.nested)) {
                if (self[attr.nested].hasOwnProperty(attrID)) {
                  self[attrID] = self[attr.nested][attrID] || (attr.placeholder || '');
                } else {
                  throw new Error(attr.nested + ' has no property ' + attrID);
                }
              } else {
                throw new Error(attr.nested + ' is not defined in $collection');
              }
            }
          });
          angular.forEach(collection.dimensions.range, function (attr, attrID) {
            self[attrID] = parseFloat(self[attrID]);
          });
        }
        if (collection.key === 'listings') {
          self.checkStateAbbreviation();
          if (!this.edited.title) {
            this.title = this.raw.title.value || 'Untitled';
          } else {
            this.title = this.edited.title;
          }
          self.prodId = self.prodId || null;
        } else if (collection.key === 'contacts') {
          if (!this.edited.name) {
            this.title = this.raw.name.value || 'Unnamed';
          } else {
            this.title = this.edited.name;
          }
        } else if (collection.key === 'news') {
          self.checkStateAbbreviation();
        }
      };
      Item.collection = collection;
      Item.dimensions = collection.dimensions;
      Item.path = collection.path;
      Item.query = function (tag) {
        var items = [], defer = $q.defer(), config = angular.extend({
            transformRequest: function (data) {
              return data;
            }
          }, $_api.config), batchLimit = 50;
        (function batchItems(limit, offset) {
          var path = tag ? $_api.path + Item.path + tag : $_api.path + Item.path + '?limit=' + limit + (offset ? '&offset=' + offset : '');
          $http.get(path, config).then(function (response) {
            items = items.concat(response.data);
            if (response.data.length < limit) {
              defer.resolve(items);
            } else {
              batchItems(limit, response.data[response.data.length - 1].id);
            }
          }, function (response) {
            defer.reject(response);
          });
        }(batchLimit));
        return defer.promise;
      };
      Item.prototype.$get = function () {
        var self = this, defer = $q.defer(), config = angular.extend({
            transformRequest: function (data) {
              self.$spinner = true;
              return data;
            }
          }, $_api.config);
        $http.get($_api.path + Item.path + '/' + this.id, config).then(function (response) {
          angular.extend(self, {}, response.data);
          self.$spinner = false;
          defer.resolve(self);
        }, function (response) {
          self.$spinner = false;
          defer.reject(response);
        });
        return defer.promise;
      };
      Item.prototype.$geocode = function () {
        var defer = $q.defer(), self = this, geocoder = new google.maps.Geocoder(), address = self.edited ? self.edited.address : self.address;
        if (address.street1 && address.city && address.state) {
          geocoder.geocode({ address: address.street1 + ',' + address.city + ',' + address.state }, function (results, status) {
            if (!$rootScope.$$phase) {
              $rootScope.$apply(function () {
                if (results) {
                  var _location = results[0].geometry.location;
                  if (_location) {
                    address.latitude = _location.lat();
                    address.longitude = _location.lng();
                    defer.resolve({ status: 'success' });
                  } else {
                    defer.reject({ message: 'Could not find location.' });
                  }
                } else {
                  defer.resolve({
                    message: status,
                    status: 0
                  });
                }
              });
            } else {
              if (results) {
                var _location = results[0].geometry.location;
                if (_location) {
                  address.latitude = _location.lat();
                  address.longitude = _location.lng();
                  defer.resolve({ status: 'success' });
                } else {
                  defer.reject({ message: 'Could not find location.' });
                }
              } else {
                defer.resolve({
                  message: status,
                  status: 0
                });
              }
            }
          });
        } else {
          defer.resolve({
            status: 0,
            message: 'No address provided.'
          });
        }
        return defer.promise;
      };
      Item.prototype.$getResources = function () {
        var self = this, promises = [], config = angular.extend({
            transformRequest: function (data) {
              self.$spinner = true;
              return data;
            }
          }, $_api.config);
        for (var i = collection.resources.length - 1; i >= 0; i--) {
          var _resource = collection.resources[i];
          (function (resourceKey) {
            var _defer = $q.defer(), resourcePath = _resource.path;
            if (self.resources[resourceKey]) {
              $http.get($_api.path + Item.path + self.id + '/resources' + resourcePath, config).then(function (response) {
                self.$spinner = false;
                var _resources = {};
                _resources[resourceKey] = response.data;
                _defer.resolve(_resources);
              }, function (response) {
                self.$spinner = false;
                _defer.reject(response);
              });
            }
            promises.push(_defer.promise);
          }(_resource.key));
        }
        return $q.all(promises);
      };
      Item.prototype.$saveResources = function (resources) {
        var self = this, promises = [], config = angular.extend({
            transformRequest: function (data) {
              self.$spinner = true;
              return data;
            }
          }, $_api.config);
        self.resources = self.resources || {};
        for (var i = 0; i < collection.resources.length; i++) {
          var _resource = collection.resources[i], _resourcePath = _resource.path;
          for (var j = 0; j < resources[_resource.key].length; j++) {
            var _resourceInstance = resources[_resource.key][j];
            var _defer = $q.defer();
            var body = angular.toJson(_resourceInstance);
            self.resources[_resource.key] = self.resources[_resource.key] || [];
            if (!_resourceInstance.id) {
              (function (defer, resourceKey) {
                console.log('posting', _resourcePath);
                $http.post($_api.path + _resourcePath, body, config).then(function (response) {
                  self.$spinner = false;
                  var _id = response.data.id;
                  self.resources[resourceKey].push(_id);
                  defer.resolve(response.data.id);
                }, function (response) {
                  self.$spinner = false;
                  defer.reject();
                });
                promises.push(_defer.promise);
              }(_defer, _resource.key));
            } else {
              (function (defer) {
                console.log('putting', _resourcePath);
                $http.put($_api.path + _resourcePath + _resourceInstance.id, body, config).then(function (response) {
                  self.$spinner = false;
                  defer.resolve();
                }, function (response) {
                  self.$spinner = false;
                  defer.reject();
                });
                promises.push(_defer.promise);
              }(_defer));
            }
          }
        }
        return $q.all(promises);
      };
      Item.prototype.$update = function () {
        var self = this, defer = $q.defer(), config = angular.extend({
            transformRequest: function (data) {
              self.$spinner = true;
              return data;
            }
          }, $_api.config), body = angular.toJson(self);
        if (self.id) {
          $http.put($_api.path + Item.path + self.id, body, config).then(function (response) {
            self.$spinner = false;
            defer.resolve(response);
          }, function (response) {
            self.$spinner = false;
            defer.reject(response);
          });
        } else {
          $http.post($_api.path + Item.path, body, config).then(function (response) {
            self.$spinner = false;
            self.id = response.data.id;
            defer.resolve(response);
          }, function (response) {
            self.$spinner = false;
            defer.reject(response);
          });
        }
        return defer.promise;
      };
      Item.prototype.$delete = function () {
        var self = this, defer = $q.defer(), config = angular.extend({
            transformRequest: function (data) {
              self.$spinner = true;
              return data;
            }
          }, $_api.config);
        $http.delete($_api.path + Item.path + self.id, config).then(function (response) {
          self.$spinner = false;
          defer.resolve(response);
        }, function (response) {
          self.$spinner = false;
          defer.reject(response);
        });
        return defer.promise;
      };
      Item.prototype.$save = function () {
        this.tags = _.without(this.tags, 'edited', 'raw');
        this.tags.push('edited');
        return this.$update();
      };
      Item.prototype.$publish = function () {
        this.tags = _.without(this.tags, 'published', 'unpublished');
        this.tags.push('published');
        return this.$update();
      };
      Item.prototype.$unpublish = function () {
        this.tags = _.without(this.tags, 'published', 'unpublished');
        this.tags.push('unpublished');
        return this.$update();
      };
      Item.prototype.$flag = function () {
        if (_.contains(this.tags, 'flagged')) {
          this.tags = _.without(this.tags, 'flagged');
        } else {
          this.tags.push('flagged');
        }
        return this.$update();
      };
      Item.prototype.$join = function (selectedItem) {
        var defer = $q.defer();
        function isNull(obj) {
          var _isNull = true;
          (function recursive(obj) {
            if (angular.isObject(obj)) {
              angular.forEach(obj, function (value) {
                recursive(value);
              });
            } else if (obj != null && obj != '' && !angular.isArray(obj) && !angular.isObject(obj)) {
              _isNull = false;
              return;
            }
          }(obj));
          return _isNull;
        }
        if (!selectedItem) {
          throw new Error('No Item to join with');
        }
        var _oldItem = null, _newItem = null;
        if (isNull(this.raw) && isNull(selectedItem.edited)) {
          _oldItem = this;
          _newItem = selectedItem;
        } else if (isNull(this.edited) && isNull(selectedItem.raw)) {
          _oldItem = selectedItem;
          _newItem = this;
        }
        if (_oldItem && _newItem) {
          _newItem.edited = _oldItem.edited;
          _newItem.resources = _oldItem.resources;
          _newItem.prodId = _oldItem.prodId;
          _newItem.$save().then(function (response) {
            return _oldItem.$delete();
          }, function (response) {
            defer.reject(response);
          }).then(function (response) {
            defer.resolve(_oldItem);
          }, function (response) {
            defer.reject(response);
          });
        } else {
          console.log('Old: ', _oldItem, this);
          console.log('New: ', _newItem, selectedItem);
          defer.reject({ message: 'Items are not compatible to join' });
        }
        return defer.promise;
      };
      Item.prototype.calcFillPercent = function () {
        var self = this, _edited = self.edited, _raw = self.raw, hasEdited = false, fieldCounter = {
            total: 0,
            filled: 0
          };
        if (_edited && _raw) {
          angular.forEach(_edited, function (editedField) {
            if (angular.isArray(editedField)) {
              angular.forEach(editedField, function (editedModel) {
                angular.forEach(editedModel, function (editedModelField) {
                  if (editedModelField) {
                    hasEdited = true;
                    fieldCounter.filled++;
                  }
                  fieldCounter.total++;
                });
              });
            } else if (angular.isObject(editedField)) {
              angular.forEach(editedField, function (editedSubField) {
                if (editedSubField) {
                  hasEdited = true;
                  fieldCounter.filled++;
                }
                fieldCounter.total++;
              });
            } else {
              if (editedField) {
                hasEdited = true;
                fieldCounter.filled++;
              }
              fieldCounter.total++;
            }
          });
          if (!hasEdited) {
            fieldCounter.total = 0;
            fieldCounter.filled = 0;
            angular.forEach(_raw, function (rawField, key) {
              if (rawField.hasOwnProperty('value') && rawField.hasOwnProperty('status')) {
                if (rawField.value) {
                  fieldCounter.filled++;
                }
                fieldCounter.total++;
              } else if (angular.isArray(rawField)) {
                angular.forEach(rawField, function (rawModel) {
                  angular.forEach(rawModel, function (rawModelField, key) {
                    if (rawModelField.value) {
                      fieldCounter.filled++;
                    }
                    fieldCounter.total++;
                  });
                });
              } else if (angular.isObject(rawField)) {
                angular.forEach(rawField, function (rawSubField, key) {
                  if (rawSubField.value) {
                    fieldCounter.filled++;
                  }
                  fieldCounter.total++;
                });
              } else {
                throw new Error('Raw field is not in recognized format');
              }
            });
            self.progressClass = self.isConflict ? 'progress-bar-warning' : 'progress-bar-success';
          } else {
            self.progressClass = self.isConflict ? 'progress-bar-warning' : 'progress-bar-info';
          }
        } else {
          fieldCounter.total = 0;
          fieldCounter.filled = 0;
          angular.forEach(collection.fields, function (fieldConfig) {
            if (fieldConfig.fields) {
              angular.forEach(fieldConfig.fields, function (subFieldConfig) {
                if (self[fieldConfig.key][subFieldConfig.key]) {
                  fieldCounter.filled++;
                }
                fieldCounter.total++;
              });
            } else {
              if (self[fieldConfig.key]) {
                fieldCounter.filled++;
              }
              fieldCounter.total++;
            }
          });
          self.progressClass = '';
        }
        this.completion = parseInt(fieldCounter.filled / fieldCounter.total * 100, 10);
        return this.completion + '%';
      };
      Item.prototype.checkStateAbbreviation = function () {
        if (this.address) {
          var state = this.address.state ? this.address.state.replace(/\s+/g, '').toUpperCase() : null;
          if (States.hasOwnProperty(state)) {
            this.address.state = States[state];
          }
        } else if (this.hasOwnProperty('raw')) {
          if (this.raw.address.state.value) {
            var state = this.raw.address.state.value ? this.raw.address.state.value.replace(/\s+/g, '').toUpperCase() : null;
            if (States.hasOwnProperty(state)) {
              this.raw.address.state.value = States[state];
            }
          }
        }
      };
      Item.prototype.hasPageConflict = function () {
        var hasPageConflict = false;
        if (this.raw && this.raw.pages) {
          angular.forEach(this.raw.pages, function (page) {
            if (page.url.status == 2) {
              hasPageConflict = true;
            }
          });
        }
        return hasPageConflict;
      };
      return Item;
    }
    return ItemFactory;
  }
]).config([
  '$routeProvider',
  '$locationProvider',
  '$httpProvider',
  function ($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    $locationProvider.html5Mode(true);
    $routeProvider.when('/', { redirectTo: '/market/' }).otherwise({ redirectTo: '/' });
  }
]).controller('AppController', [
  '$scope',
  '$rootScope',
  '$location',
  '$_api',
  '$http',
  function ($scope, $rootScope, $location, $_api, $http) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      $scope.loading = true;
      $scope.failure = false;
    });
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
      $scope.loading = false;
      $scope.failure = false;
    });
    $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
      $scope.loading = false;
      $scope.failure = true;
    });
    $scope.globalAlerts = [];
    $scope.setGlobalAlert = function (alert) {
      if (angular.isArray(alert)) {
        $scope.globalAlerts = alert;
      } else {
        $scope.globalAlerts = [alert];
      }
    };
    $scope.addGlobalAlert = function (alert) {
      $scope.globalAlerts.push(alert);
    };
    $scope.closeGlobalAlert = function (alert) {
      $scope.globalAlerts = _.reject($scope.globalAlerts, function (val) {
        return angular.equals(alert, val);
      });
    };
    $scope.clearGlobalAlerts = function () {
      $scope.globalAlerts = [];
    };
  }
]);
angular.module('roomba.app').config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/market', { redirectTo: '/market/listings' }).when('/market/:collection', {
      templateUrl: '/app/market/views/market.html?v=' + Date.now(),
      controller: 'CollectionCtrl',
      reloadOnSearch: false,
      resolve: {
        Market: function ($route, $q, Models) {
          var defer = $q.defer(), _Item;
          Models.request().then(function (models) {
            _Item = models[$route.current.params.collection];
            if (_Item) {
              Models.setActive($route.current.params.collection);
            }
            return _Item.query();
          }).then(function (response) {
            var Market = new thotpod.Marketplace(_Item);
            Market.initialize(_Item.dimensions, response);
            defer.resolve(Market);
          });
          return defer.promise;
        }
      }
    }).otherwise({ redirectTo: '/market' });
  }
]).controller('CollectionCtrl', [
  '$scope',
  'Market',
  '$routeParams',
  '$location',
  '$q',
  '$dialog',
  function ($scope, Market, $routeParams, $location, $q, $dialog) {
    var Model = Market.Model;
    $scope.items = Market.visibleItems;
    $scope.dimensions = Market.getDimensions();
    $scope.activeItem = Market.getActive();
    $scope.activeItemResources = {};
    $scope.collectionID = $routeParams.collection;
    $scope.collection = Model.collection;
    $scope.srcListingDetails = '/app/market/partials/' + $scope.collection.key + '-details.html?v=' + Date.now();
    $scope.searchBy = { $: '' };
    $scope.marketView = { collapseFilters: true };
    $scope.activeSearch = {
      title: 'Any',
      key: '$'
    };
    $scope.joinDialog = $dialog.dialog({
      templateUrl: '/app/market/partials/join-dialog.html?v=' + Date.now(),
      controller: 'JoinDialogCtrl',
      backdrop: true,
      keyboard: true,
      backdropClick: true,
      dialogFade: true,
      backdropFade: true,
      resolve: {
        Market: function () {
          return Market;
        }
      }
    });
    $scope.applyFilters = function () {
      $scope.items = Market.apply();
    };
    $scope.selectItem = function (item) {
      if (Market.setActive(item)) {
        $scope.previousActive = $scope.activeItem;
        $scope.activeItem = Market.getActive();
        $scope.activeItem.isActive = true;
        $scope.activeItemResources = {};
        if ($scope.previousActive) {
          $scope.previousActive.isActive = false;
        }
      }
    };
    function setActiveItem(id) {
      if (id) {
        $scope.selectItem(id);
        debugger;
        if ($scope.activeItem) {
          $scope.activeItem.$getResources().then(function (results) {
            for (var i = results.length - 1; i >= 0; i--) {
              for (var _resource in results[i]) {
                if (results[i].hasOwnProperty(_resource)) {
                  $scope.activeItemResources[_resource] = [];
                  angular.copy(results[i][_resource], $scope.activeItemResources[_resource]);
                }
              }
            }
          });
        }
      }
    }
    if ($location.search().id) {
      setActiveItem($location.search().id);
    }
    $scope.$on('$locationChangeSuccess', function (e, newLocation, oldLocation) {
      if ($location.search().id) {
        setActiveItem($location.search().id);
      }
    });
    $scope.getStatusBg = function (status, type) {
      type = type || 'solid';
      switch (status) {
      case 0:
        return 'status-' + type + '-info';
      case 1:
        return 'status-' + type + '-success';
      case 2:
        return 'status-' + type + '-warning';
      case 3:
        return 'status-' + type + '-error';
      default:
        return 'status-' + type + '-unknown';
      }
    };
    $scope.newItem = function () {
      var _newItem = new Model();
      $scope.items.unshift(_newItem);
      $scope.selectItem(_newItem);
    };
    $scope.classRawField = function (field) {
      if (field) {
        if (field.copied) {
          return 'status-btn-success';
        } else {
          return $scope.getStatusBg(field.status, 'btn');
        }
      }
    };
    $scope.isRawNull = function (field) {
      return field ? field.value === '' || field.value == null : true;
    };
    $scope.hasTag = function (item, tag) {
      return _.contains(item.tags, tag);
    };
    $scope.setSearchCriteria = function (field) {
      $scope.activeSearch = {};
      $scope.activeSearch = field ? field : {
        title: 'Any',
        key: '$'
      };
      $scope.searchBy[$scope.activeSearch.key] = '';
    };
    $scope.flagSelected = function () {
      var successes = 0;
      for (var i = $scope.items.length - 1; i >= 0; i--) {
        var _item = $scope.items[i];
        if (_item.isSelected) {
          _item.$flag().then(function () {
            successes++;
            $scope.setGlobalAlert({
              type: 'success',
              text: successes + ' items flagged.'
            });
          });
          _item.isSelected = false;
        }
      }
    };
    $scope.publishSelected = function () {
      var successes = 0;
      for (var i = $scope.items.length - 1; i >= 0; i--) {
        var _item = $scope.items[i];
        if (_item.isSelected) {
          _item.$publish().then(function () {
            successes++;
            $scope.setGlobalAlert({
              type: 'success',
              text: successes + ' items published.'
            });
          });
          _item.isSelected = false;
        }
      }
    };
    $scope.unpublishSelected = function () {
      var successes = 0;
      for (var i = $scope.items.length - 1; i >= 0; i--) {
        var _item = $scope.items[i];
        if (_item.isSelected) {
          _item.$unpublish().then(function () {
            successes++;
            $scope.setGlobalAlert({
              type: 'success',
              text: successes + ' items unpublished.'
            });
          });
          _item.isSelected = false;
        }
      }
    };
    $scope.saveSelected = function () {
      var saveStats = {
          saveSuccesses: 0,
          saveFails: 0,
          geoSuccesses: 0,
          geoFails: 0
        };
      function saveAll() {
        var promises = [];
        for (var i = $scope.items.length - 1; i >= 0; i--) {
          var _item = $scope.items[i];
          if (_item.isSelected) {
            var defer = $q.defer();
            (function (defer, saveStats, _item) {
              _item.$geocode().then(function (response) {
                if (response.status) {
                  saveStats.geoSuccesses++;
                } else {
                  console.log(response);
                  saveStats.geoFails++;
                }
                return _item.$save();
              }, function (response) {
                console.log(response);
                saveStats.geoFails++;
              }).then(function () {
                saveStats.saveSuccesses++;
                defer.resolve();
              }, function () {
                defer.reject();
                saveStats.saveFails++;
              });
            }(defer, saveStats, _item));
            promises.push(defer.promise);
            _item.isSelected = false;
          }
        }
        return $q.all(promises);
      }
      saveAll().then(function () {
        if (saveStats.geoFails || saveStats.saveFails) {
          $scope.setGlobalAlert([
            {
              type: 'success',
              text: saveStats.geoSuccesses + ' items geocoded. ' + saveStats.saveSuccesses + ' items saved.'
            },
            {
              type: 'danger',
              text: saveStats.geoFails + ' geocode fails.' + saveStats.saveFails + ' save fails.  '
            }
          ]);
        } else {
          $scope.setGlobalAlert({
            type: 'success',
            text: saveStats.geoSuccesses + ' items geocoded. ' + saveStats.saveSuccesses + ' items saved.'
          });
        }
      });
    };
    $scope.openJoinDialog = function () {
      $scope.joinDialog.open().then(function (response) {
        if (response) {
          $scope.setGlobalAlert({
            type: response.status,
            text: response.message
          });
        }
      });
    };
    $scope.noop = function () {
      return null;
    };
    $scope.toggleDiscreet = function (discreet, value) {
      $scope.items = Market.toggleDiscreet(discreet, value).apply();
    };
  }
]).controller('MarketListCtrl', [
  '$scope',
  '$location',
  function ($scope, $location) {
    var selectToggle = true;
    $scope.openDetails = function (item) {
      if (item.id) {
        $location.search('id', item.id);
      } else {
        $location.search('id', '');
        $scope.selectItem(item);
      }
    };
    $scope.sortFields = {
      title: false,
      completion: false,
      state: false
    };
    $scope.setSortField = function (sortField) {
      angular.forEach($scope.sortFields, function (value, key) {
        $scope.sortFields[key] = false;
      });
      $scope.sortBy = sortField;
      $scope.sortFields[sortField] = true;
    };
    $scope.toggleSelectAll = function () {
      angular.forEach($scope.filteredItems, function (value) {
        value.isSelected = selectToggle;
      });
      selectToggle = !selectToggle;
    };
  }
]).controller('DetailsCtrl', [
  '$scope',
  '$routeParams',
  function ($scope, $routeParams) {
    console.log($scope.activeItem, $scope.activeItemResources);
    function copyRaw(obj) {
      angular.forEach(obj.raw, function (rawValue, key) {
        if (rawValue.hasOwnProperty('status') && rawValue.hasOwnProperty('value')) {
          if (!obj.edited[key] && rawValue.value != null) {
            $scope.copyFromRaw(obj, key);
          }
        } else if (rawValue.length) {
          if (!obj.edited[key].length && angular.isArray(obj.edited[key])) {
            angular.forEach(rawValue, function (rawModel) {
              $scope.copyModelFromRaw(obj, key, rawModel);
            });
          }
        } else if (!angular.isArray(rawValue)) {
          angular.forEach(rawValue, function (rawSubValue, subKey) {
            if (rawSubValue.hasOwnProperty('status') && rawSubValue.hasOwnProperty('value')) {
              if (rawSubValue.value) {
                $scope.copySubfieldFromRaw(obj, key, subKey);
              }
            }
          });
        }
      });
    }
    $scope.notPublished = function (item) {
      return !_.contains(item.tags, 'published');
    };
    $scope.copyAllRaw = function (item, itemResources) {
      if (item.hasOwnProperty('raw') && item.hasOwnProperty('edited')) {
        copyRaw(item);
      }
      angular.forEach(itemResources, function (subresources, key) {
        angular.forEach(subresources, function (subresource, key) {
          if (subresource.hasOwnProperty('raw') && subresource.hasOwnProperty('edited')) {
            copyRaw(subresource);
          }
        });
      });
    };
    $scope.copyModelFromRaw = function (item, modelKey, rawModel) {
      var _modelConfig = _.find($scope.collection.models, function (val) {
          return val.key === modelKey;
        }), _editedModel = {};
      angular.forEach(_modelConfig.fields, function (modelField) {
        _editedModel[modelField.key] = rawModel[modelField.key].value || '';
      });
      item.edited[modelKey].push(_editedModel);
      rawModel.copied = true;
    };
    $scope.copyFromRaw = function (item, fieldKey) {
      item.edited[fieldKey] = item.raw[fieldKey].value;
      item.raw[fieldKey].copied = true;
    };
    $scope.copySubfieldFromRaw = function (item, fieldKey, subfieldKey) {
      item.edited[fieldKey][subfieldKey] = item.raw[fieldKey][subfieldKey].value;
      item.raw[fieldKey][subfieldKey].copied = true;
    };
    $scope.saveItem = function (item) {
      $scope.clearGlobalAlerts();
      if (_.isEmpty($scope.activeItemResources)) {
        item.$geocode().then(function (response) {
          if (response.status) {
            $scope.addGlobalAlert({
              type: 'success',
              text: item.title + ' successfully geocoded.'
            });
          } else {
            $scope.addGlobalAlert({
              type: 'warning',
              text: item.title + ' did not geocode: ' + response.message
            });
          }
          return item.$save();
        }, function (response) {
          $scope.addGlobalAlert({
            type: 'danger',
            text: 'Error during geocoding: ' + response.message || ''
          });
        }).then(function () {
          $scope.addGlobalAlert({
            type: 'success',
            text: item.title + ' successfully saved.'
          });
        }, function () {
          $scope.addGlobalAlert({
            type: 'danger',
            text: 'Failed to save ' + item.title + '.'
          });
        });
      } else {
        item.$geocode().then(function (response) {
          if (response.status) {
            $scope.addGlobalAlert({
              type: 'success',
              text: item.title + ' successfully geocoded.'
            });
          } else {
            $scope.addGlobalAlert({
              type: 'warning',
              text: item.title + ' did not geocode: ' + response.message
            });
          }
          return item.$saveResources($scope.activeItemResources);
        }, function (response) {
          $scope.addGlobalAlert({
            type: 'danger',
            text: 'Error during geocoding: ' + response.message || ''
          });
        }).then(function (results) {
          $scope.addGlobalAlert({
            type: 'success',
            text: 'Resources successfully saved.'
          });
          return item.$save();
        }, function () {
          $scope.addGlobalAlert({
            type: 'danger',
            text: 'Failed to save resources.'
          });
        }).then(function () {
          $scope.addGlobalAlert({
            type: 'success',
            text: item.title + ' successfully saved.'
          });
          return;
        }, function () {
          $scope.addGlobalAlert({
            type: 'danger',
            text: 'Failed to save ' + item.title + '.'
          });
        });
      }
    };
  }
]).controller('ResourceCtrl', [
  '$scope',
  function ($scope) {
    $scope.newResource = {};
    $scope.resourceView = {};
    $scope.addResource = function (resourceKey, resource) {
      console.log($scope.activeItemResources);
      if (_.isEmpty(resource)) {
        console.log('empty!');
      } else {
        $scope.activeItemResources[resourceKey] = $scope.activeItemResources[resourceKey] || [];
        $scope.activeItemResources[resourceKey].push(angular.extend({}, { edited: resource }));
        $scope.newResource = {};
        $scope.$broadcast('ResourceAdded');
      }
    };
    $scope.removeResource = function (resourceKey, itemResource) {
      $scope.activeItem.resources[resourceKey] = _.reject($scope.activeItem.resources[resourceKey], function (val) {
        return val === itemResource.id;
      });
      $scope.activeItemResources[resourceKey] = _.reject($scope.activeItemResources[resourceKey], function (val) {
        return val.$$hashKey === itemResource.$$hashKey;
      });
    };
  }
]).controller('ModelCtrl', [
  '$scope',
  function ($scope) {
    $scope.newModel = {};
    $scope.modelView = {};
    $scope.addModel = function (item, modelKey, model) {
      if (!_.isEmpty(model)) {
        item.edited[modelKey].push(model);
        $scope.newModel = {};
        $scope.$broadcast('ModelAdded');
      }
    };
    $scope.removeModel = function (item, modelKey, model) {
      item.edited[modelKey] = _.reject(item.edited[modelKey], function (val) {
        return val.$$hashKey === model.$$hashKey;
      });
    };
    $scope.showRaw = function () {
      $scope.modelView.showRaw = !$scope.modelView.showRaw;
    };
  }
]).controller('JoinDialogCtrl', [
  '$scope',
  'Market',
  'dialog',
  'Models',
  function ($scope, Market, dialog, Models) {
    $scope.activeItem = Market.getActive();
    $scope.joinItems = _.without(Market.getItems(), $scope.activeItem);
    $scope.selectedItem = {};
    $scope.collection = Models.getActive().collection;
    $scope.searchBy = {};
    $scope.join = function (selectedItem) {
      console.log('sup');
      $scope.activeItem.$join(selectedItem).then(function (deletedItem) {
        dialog.close({
          status: 'success',
          message: $scope.activeItem.title + ' and ' + selectedItem.title + ' successfully joined!'
        });
      }, function (response) {
        dialog.close({
          status: 'danger',
          message: response.message || 'Join failed.'
        });
      });
    };
    $scope.selectItem = function (item) {
      $scope.selectedItem = item;
    };
    $scope.close = function () {
      dialog.close();
    };
    $scope.hasTag = function (item, tag) {
      return _.contains(item.tags, tag);
    };
  }
]).factory('Models', [
  'Item',
  '$http',
  '$_api',
  '$q',
  function (Item, $http, $_api, $q) {
    var models = {}, activeModel = {};
    return {
      get: function () {
        return models;
      },
      setActive: function (collectionKey) {
        activeModel = models[collectionKey];
      },
      getActive: function () {
        return activeModel;
      },
      request: function () {
        var defer = $q.defer();
        $http.get('/app-config/market.json', $_api.config).success(function (response) {
          angular.forEach(response, function (value, key) {
            models[key] = Item(value);
          });
          defer.resolve(models);
        }).error(function (data, status, headers, config) {
          console.log('error');
        });
        return defer.promise;
      }
    };
  }
]).directive('focusFirstOn', function () {
  return {
    link: function (scope, element, attrs) {
      scope.$on(attrs.focusFirstOn, function () {
        if (scope.$index === 0) {
          element[0].focus();
        }
      });
    }
  };
}).directive('slider', [
  '$timeout',
  function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        function setupSlider() {
          $(element).slider({
            range: true,
            min: 0,
            max: 100,
            values: [
              parseInt((scope.range.lowSelected - scope.range.low) / (scope.range.high - scope.range.low) * 100, 10),
              parseInt((scope.range.highSelected - scope.range.low) / (scope.range.high - scope.range.low) * 100, 10)
            ],
            step: 1,
            slide: function (event, ui) {
              scope.$apply(function () {
                scope.range.lowSelected = parseInt(ui.values[0] / 100 * (scope.range.high - scope.range.low) + scope.range.low, 10);
                scope.range.highSelected = parseInt(ui.values[1] / 100 * (scope.range.high - scope.range.low) + scope.range.low, 10);
              });
            },
            stop: function (event, ui) {
              scope.$apply(function () {
                scope.applyFilters();
              });
              scope.$apply();
            }
          });
        }
        setupSlider();
      }
    };
  }
]);
'use strict';
angular.module('roomba.app').config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: '/app/login/views/login.html?' + Date.now(),
      controller: 'LoginController',
      resolve: {
        checkUser: function ($rootScope, $location) {
        }
      }
    });
    $routeProvider.when('/login/forgot-password', {
      templateUrl: '/app/login/views/forgot-password.html?v=' + Date.now(),
      controller: 'ForgotPasswordController'
    });
    $routeProvider.when('/login/reset-password', {
      templateUrl: '/app/login/views/reset-password.html?v=' + Date.now(),
      controller: 'ResetPasswordController',
      resolve: {
        checkToken: function ($location) {
          if (!$location.search().token) {
            $location.path('/login/forgot-password');
          }
        }
      }
    });
  }
]).controller('LoginController', [
  '$scope',
  '$location',
  '$http',
  '$_api',
  function ($scope, $location, $http, $_api) {
    $scope.creds = {};
    $scope.loginAlerts = [];
    var loginFailAlert = {
        type: 'error',
        msg: 'Incorrect email password combination.  Please try again.'
      }, loginAuthenticatingAlert = {
        type: 'info',
        msg: 'Authenticating'
      };
    $scope.login = function () {
      var path = $_api.path + '/auth/login/', config = angular.extend({
          transformRequest: function (data) {
            $scope.loginAlerts = [loginAuthenticatingAlert];
            return data;
          }
        }, $_api.config), body = JSON.stringify($scope.creds);
      $http.post(path, body, config).then(function (response) {
        $scope.loginAlerts = [];
        $scope.$broadcast('auth#resendRequests');
        $location.path('/');
      }, function (response) {
        $scope.loginAlerts = [loginFailAlert];
        console.log(response);
        $scope.creds.password = '';
      });
    };
    $scope.forgotPassword = function () {
      $location.path('/login/forgot-password');
    };
  }
]).controller('ForgotPasswordController', [
  '$scope',
  '$location',
  '$http',
  '$_api',
  function ($scope, $location, $http, $_api) {
    $scope.creds = {};
    $scope.forgotPasswordAlerts = [];
    $scope.emailInstructions = function () {
      var path = $_api.path + '/auth/reset/', config = angular.extend({
          transformRequest: function (data) {
            $scope.forgotPasswordAlerts = [{
                type: 'info',
                msg: 'Sending email...'
              }];
            return data;
          }
        }, $_api.config), body = JSON.stringify($scope.creds);
      $http.post(path, body, config).then(function (response) {
        $scope.creds = {};
        $scope.forgotPasswordAlerts = [{
            type: 'success',
            msg: 'Please check your email!'
          }];
      }, function (response) {
        $scope.forgotPasswordAlerts = [{
            type: 'error',
            msg: 'Invalid email, please try again'
          }];
      });
    };
  }
]).controller('ResetPasswordController', [
  '$scope',
  '$location',
  '$http',
  '$_api',
  '$timeout',
  function ($scope, $location, $http, $_api, $timeout) {
    $scope.creds = {};
    $scope.resetPasswordAlerts = [];
    $scope.resetPassword = function () {
      if ($scope.formResetPassword.$valid) {
        var path = $_api.path + '/auth/reset/', config = angular.extend({
            transformRequest: function (data) {
              $scope.resetPasswordAlerts = [{
                  type: 'info',
                  msg: 'Resetting password...'
                }];
              return data;
            }
          }, $_api.config), body = JSON.stringify({
            token: $location.search().token,
            newPassword: $scope.creds.newPassword,
            verifyPassword: $scope.creds.verifyPassword
          });
        $http.post(path, body, config).then(function (response) {
          $scope.resetPasswordAlerts = [{
              type: 'success',
              msg: 'Password changed!  Redirecting to login..'
            }];
          $timeout(function () {
            $location.path('/login');
          }, 1000);
        }, function (response) {
          $scope.resetPasswordAlerts = [{
              type: 'error',
              msg: response.data.status_message
            }];
        });
      }
    };
  }
]);
angular.bootstrap(document, ['roomba.app']);