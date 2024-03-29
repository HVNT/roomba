!function (window, undefined) {
  function createOptions(options) {
    var object = optionsCache[options] = {};
    return jQuery.each(options.split(core_rspace), function (_, flag) {
      object[flag] = !0;
    }), object;
  }
  function dataAttr(elem, key, data) {
    if (data === undefined && 1 === elem.nodeType) {
      var name = 'data-' + key.replace(rmultiDash, '-$1').toLowerCase();
      if (data = elem.getAttribute(name), 'string' == typeof data) {
        try {
          data = 'true' === data ? !0 : 'false' === data ? !1 : 'null' === data ? null : +data + '' === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
        } catch (e) {
        }
        jQuery.data(elem, key, data);
      } else
        data = undefined;
    }
    return data;
  }
  function isEmptyDataObject(obj) {
    var name;
    for (name in obj)
      if (('data' !== name || !jQuery.isEmptyObject(obj[name])) && 'toJSON' !== name)
        return !1;
    return !0;
  }
  function returnFalse() {
    return !1;
  }
  function returnTrue() {
    return !0;
  }
  function isDisconnected(node) {
    return !node || !node.parentNode || 11 === node.parentNode.nodeType;
  }
  function sibling(cur, dir) {
    do
      cur = cur[dir];
    while (cur && 1 !== cur.nodeType);
    return cur;
  }
  function winnow(elements, qualifier, keep) {
    if (qualifier = qualifier || 0, jQuery.isFunction(qualifier))
      return jQuery.grep(elements, function (elem, i) {
        var retVal = !!qualifier.call(elem, i, elem);
        return retVal === keep;
      });
    if (qualifier.nodeType)
      return jQuery.grep(elements, function (elem) {
        return elem === qualifier === keep;
      });
    if ('string' == typeof qualifier) {
      var filtered = jQuery.grep(elements, function (elem) {
          return 1 === elem.nodeType;
        });
      if (isSimple.test(qualifier))
        return jQuery.filter(qualifier, filtered, !keep);
      qualifier = jQuery.filter(qualifier, filtered);
    }
    return jQuery.grep(elements, function (elem) {
      return jQuery.inArray(elem, qualifier) >= 0 === keep;
    });
  }
  function createSafeFragment(document) {
    var list = nodeNames.split('|'), safeFrag = document.createDocumentFragment();
    if (safeFrag.createElement)
      for (; list.length;)
        safeFrag.createElement(list.pop());
    return safeFrag;
  }
  function findOrAppend(elem, tag) {
    return elem.getElementsByTagName(tag)[0] || elem.appendChild(elem.ownerDocument.createElement(tag));
  }
  function cloneCopyEvent(src, dest) {
    if (1 === dest.nodeType && jQuery.hasData(src)) {
      var type, i, l, oldData = jQuery._data(src), curData = jQuery._data(dest, oldData), events = oldData.events;
      if (events) {
        delete curData.handle, curData.events = {};
        for (type in events)
          for (i = 0, l = events[type].length; l > i; i++)
            jQuery.event.add(dest, type, events[type][i]);
      }
      curData.data && (curData.data = jQuery.extend({}, curData.data));
    }
  }
  function cloneFixAttributes(src, dest) {
    var nodeName;
    1 === dest.nodeType && (dest.clearAttributes && dest.clearAttributes(), dest.mergeAttributes && dest.mergeAttributes(src), nodeName = dest.nodeName.toLowerCase(), 'object' === nodeName ? (dest.parentNode && (dest.outerHTML = src.outerHTML), jQuery.support.html5Clone && src.innerHTML && !jQuery.trim(dest.innerHTML) && (dest.innerHTML = src.innerHTML)) : 'input' === nodeName && rcheckableType.test(src.type) ? (dest.defaultChecked = dest.checked = src.checked, dest.value !== src.value && (dest.value = src.value)) : 'option' === nodeName ? dest.selected = src.defaultSelected : 'input' === nodeName || 'textarea' === nodeName ? dest.defaultValue = src.defaultValue : 'script' === nodeName && dest.text !== src.text && (dest.text = src.text), dest.removeAttribute(jQuery.expando));
  }
  function getAll(elem) {
    return 'undefined' != typeof elem.getElementsByTagName ? elem.getElementsByTagName('*') : 'undefined' != typeof elem.querySelectorAll ? elem.querySelectorAll('*') : [];
  }
  function fixDefaultChecked(elem) {
    rcheckableType.test(elem.type) && (elem.defaultChecked = elem.checked);
  }
  function vendorPropName(style, name) {
    if (name in style)
      return name;
    for (var capName = name.charAt(0).toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length; i--;)
      if (name = cssPrefixes[i] + capName, name in style)
        return name;
    return origName;
  }
  function isHidden(elem, el) {
    return elem = el || elem, 'none' === jQuery.css(elem, 'display') || !jQuery.contains(elem.ownerDocument, elem);
  }
  function showHide(elements, show) {
    for (var elem, display, values = [], index = 0, length = elements.length; length > index; index++)
      elem = elements[index], elem.style && (values[index] = jQuery._data(elem, 'olddisplay'), show ? (values[index] || 'none' !== elem.style.display || (elem.style.display = ''), '' === elem.style.display && isHidden(elem) && (values[index] = jQuery._data(elem, 'olddisplay', css_defaultDisplay(elem.nodeName)))) : (display = curCSS(elem, 'display'), values[index] || 'none' === display || jQuery._data(elem, 'olddisplay', display)));
    for (index = 0; length > index; index++)
      elem = elements[index], elem.style && (show && 'none' !== elem.style.display && '' !== elem.style.display || (elem.style.display = show ? values[index] || '' : 'none'));
    return elements;
  }
  function setPositiveNumber(elem, value, subtract) {
    var matches = rnumsplit.exec(value);
    return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || 'px') : value;
  }
  function augmentWidthOrHeight(elem, name, extra, isBorderBox) {
    for (var i = extra === (isBorderBox ? 'border' : 'content') ? 4 : 'width' === name ? 1 : 0, val = 0; 4 > i; i += 2)
      'margin' === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0)), isBorderBox ? ('content' === extra && (val -= parseFloat(curCSS(elem, 'padding' + cssExpand[i])) || 0), 'margin' !== extra && (val -= parseFloat(curCSS(elem, 'border' + cssExpand[i] + 'Width')) || 0)) : (val += parseFloat(curCSS(elem, 'padding' + cssExpand[i])) || 0, 'padding' !== extra && (val += parseFloat(curCSS(elem, 'border' + cssExpand[i] + 'Width')) || 0));
    return val;
  }
  function getWidthOrHeight(elem, name, extra) {
    var val = 'width' === name ? elem.offsetWidth : elem.offsetHeight, valueIsBorderBox = !0, isBorderBox = jQuery.support.boxSizing && 'border-box' === jQuery.css(elem, 'boxSizing');
    if (0 >= val || null == val) {
      if (val = curCSS(elem, name), (0 > val || null == val) && (val = elem.style[name]), rnumnonpx.test(val))
        return val;
      valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]), val = parseFloat(val) || 0;
    }
    return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? 'border' : 'content'), valueIsBorderBox) + 'px';
  }
  function css_defaultDisplay(nodeName) {
    if (elemdisplay[nodeName])
      return elemdisplay[nodeName];
    var elem = jQuery('<' + nodeName + '>').appendTo(document.body), display = elem.css('display');
    return elem.remove(), ('none' === display || '' === display) && (iframe = document.body.appendChild(iframe || jQuery.extend(document.createElement('iframe'), {
      frameBorder: 0,
      width: 0,
      height: 0
    })), iframeDoc && iframe.createElement || (iframeDoc = (iframe.contentWindow || iframe.contentDocument).document, iframeDoc.write('<!doctype html><html><body>'), iframeDoc.close()), elem = iframeDoc.body.appendChild(iframeDoc.createElement(nodeName)), display = curCSS(elem, 'display'), document.body.removeChild(iframe)), elemdisplay[nodeName] = display, display;
  }
  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (jQuery.isArray(obj))
      jQuery.each(obj, function (i, v) {
        traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + '[' + ('object' == typeof v ? i : '') + ']', v, traditional, add);
      });
    else if (traditional || 'object' !== jQuery.type(obj))
      add(prefix, obj);
    else
      for (name in obj)
        buildParams(prefix + '[' + name + ']', obj[name], traditional, add);
  }
  function addToPrefiltersOrTransports(structure) {
    return function (dataTypeExpression, func) {
      'string' != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = '*');
      var dataType, list, placeBefore, dataTypes = dataTypeExpression.toLowerCase().split(core_rspace), i = 0, length = dataTypes.length;
      if (jQuery.isFunction(func))
        for (; length > i; i++)
          dataType = dataTypes[i], placeBefore = /^\+/.test(dataType), placeBefore && (dataType = dataType.substr(1) || '*'), list = structure[dataType] = structure[dataType] || [], list[placeBefore ? 'unshift' : 'push'](func);
    };
  }
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, dataType, inspected) {
    dataType = dataType || options.dataTypes[0], inspected = inspected || {}, inspected[dataType] = !0;
    for (var selection, list = structure[dataType], i = 0, length = list ? list.length : 0, executeOnly = structure === prefilters; length > i && (executeOnly || !selection); i++)
      selection = list[i](options, originalOptions, jqXHR), 'string' == typeof selection && (!executeOnly || inspected[selection] ? selection = undefined : (options.dataTypes.unshift(selection), selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, selection, inspected)));
    return !executeOnly && selection || inspected['*'] || (selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, '*', inspected)), selection;
  }
  function ajaxExtend(target, src) {
    var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src)
      src[key] !== undefined && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
    deep && jQuery.extend(!0, target, deep);
  }
  function ajaxHandleResponses(s, jqXHR, responses) {
    var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes, responseFields = s.responseFields;
    for (type in responseFields)
      type in responses && (jqXHR[responseFields[type]] = responses[type]);
    for (; '*' === dataTypes[0];)
      dataTypes.shift(), ct === undefined && (ct = s.mimeType || jqXHR.getResponseHeader('content-type'));
    if (ct)
      for (type in contents)
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
    if (dataTypes[0] in responses)
      finalDataType = dataTypes[0];
    else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + ' ' + dataTypes[0]]) {
          finalDataType = type;
          break;
        }
        firstDataType || (firstDataType = type);
      }
      finalDataType = finalDataType || firstDataType;
    }
    return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), responses[finalDataType]) : void 0;
  }
  function ajaxConvert(s, response) {
    var conv, conv2, current, tmp, dataTypes = s.dataTypes.slice(), prev = dataTypes[0], converters = {}, i = 0;
    if (s.dataFilter && (response = s.dataFilter(response, s.dataType)), dataTypes[1])
      for (conv in s.converters)
        converters[conv.toLowerCase()] = s.converters[conv];
    for (; current = dataTypes[++i];)
      if ('*' !== current) {
        if ('*' !== prev && prev !== current) {
          if (conv = converters[prev + ' ' + current] || converters['* ' + current], !conv)
            for (conv2 in converters)
              if (tmp = conv2.split(' '), tmp[1] === current && (conv = converters[prev + ' ' + tmp[0]] || converters['* ' + tmp[0]])) {
                conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], dataTypes.splice(i--, 0, current));
                break;
              }
          if (conv !== !0)
            if (conv && s['throws'])
              response = conv(response);
            else
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: 'parsererror',
                  error: conv ? e : 'No conversion from ' + prev + ' to ' + current
                };
              }
        }
        prev = current;
      }
    return {
      state: 'success',
      data: response
    };
  }
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
  function createFxNow() {
    return setTimeout(function () {
      fxNow = undefined;
    }, 0), fxNow = jQuery.now();
  }
  function createTweens(animation, props) {
    jQuery.each(props, function (prop, value) {
      for (var collection = (tweeners[prop] || []).concat(tweeners['*']), index = 0, length = collection.length; length > index; index++)
        if (collection[index].call(animation, prop, value))
          return;
    });
  }
  function Animation(elem, properties, options) {
    var result, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function () {
        delete tick.elem;
      }), tick = function () {
        for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; length > index; index++)
          animation.tweens[index].run(percent);
        return deferred.notifyWith(elem, [
          animation,
          percent,
          remaining
        ]), 1 > percent && length ? remaining : (deferred.resolveWith(elem, [animation]), !1);
      }, animation = deferred.promise({
        elem: elem,
        props: jQuery.extend({}, properties),
        opts: jQuery.extend(!0, { specialEasing: {} }, options),
        originalProperties: properties,
        originalOptions: options,
        startTime: fxNow || createFxNow(),
        duration: options.duration,
        tweens: [],
        createTween: function (prop, end) {
          var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
          return animation.tweens.push(tween), tween;
        },
        stop: function (gotoEnd) {
          for (var index = 0, length = gotoEnd ? animation.tweens.length : 0; length > index; index++)
            animation.tweens[index].run(1);
          return gotoEnd ? deferred.resolveWith(elem, [
            animation,
            gotoEnd
          ]) : deferred.rejectWith(elem, [
            animation,
            gotoEnd
          ]), this;
        }
      }), props = animation.props;
    for (propFilter(props, animation.opts.specialEasing); length > index; index++)
      if (result = animationPrefilters[index].call(animation, elem, props, animation.opts))
        return result;
    return createTweens(animation, props), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), jQuery.fx.timer(jQuery.extend(tick, {
      anim: animation,
      queue: animation.opts.queue,
      elem: elem
    })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
  }
  function propFilter(props, specialEasing) {
    var index, name, easing, value, hooks;
    for (index in props)
      if (name = jQuery.camelCase(index), easing = specialEasing[name], value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], hooks && 'expand' in hooks) {
        value = hooks.expand(value), delete props[name];
        for (index in value)
          index in props || (props[index] = value[index], specialEasing[index] = easing);
      } else
        specialEasing[name] = easing;
  }
  function defaultPrefilter(elem, props, opts) {
    var index, prop, value, length, dataShow, toggle, tween, hooks, oldfire, anim = this, style = elem.style, orig = {}, handled = [], hidden = elem.nodeType && isHidden(elem);
    opts.queue || (hooks = jQuery._queueHooks(elem, 'fx'), null == hooks.unqueued && (hooks.unqueued = 0, oldfire = hooks.empty.fire, hooks.empty.fire = function () {
      hooks.unqueued || oldfire();
    }), hooks.unqueued++, anim.always(function () {
      anim.always(function () {
        hooks.unqueued--, jQuery.queue(elem, 'fx').length || hooks.empty.fire();
      });
    })), 1 === elem.nodeType && ('height' in props || 'width' in props) && (opts.overflow = [
      style.overflow,
      style.overflowX,
      style.overflowY
    ], 'inline' === jQuery.css(elem, 'display') && 'none' === jQuery.css(elem, 'float') && (jQuery.support.inlineBlockNeedsLayout && 'inline' !== css_defaultDisplay(elem.nodeName) ? style.zoom = 1 : style.display = 'inline-block')), opts.overflow && (style.overflow = 'hidden', jQuery.support.shrinkWrapBlocks || anim.done(function () {
      style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2];
    }));
    for (index in props)
      if (value = props[index], rfxtypes.exec(value)) {
        if (delete props[index], toggle = toggle || 'toggle' === value, value === (hidden ? 'hide' : 'show'))
          continue;
        handled.push(index);
      }
    if (length = handled.length) {
      dataShow = jQuery._data(elem, 'fxshow') || jQuery._data(elem, 'fxshow', {}), 'hidden' in dataShow && (hidden = dataShow.hidden), toggle && (dataShow.hidden = !hidden), hidden ? jQuery(elem).show() : anim.done(function () {
        jQuery(elem).hide();
      }), anim.done(function () {
        var prop;
        jQuery.removeData(elem, 'fxshow', !0);
        for (prop in orig)
          jQuery.style(elem, prop, orig[prop]);
      });
      for (index = 0; length > index; index++)
        prop = handled[index], tween = anim.createTween(prop, hidden ? dataShow[prop] : 0), orig[prop] = dataShow[prop] || jQuery.style(elem, prop), prop in dataShow || (dataShow[prop] = tween.start, hidden && (tween.end = tween.start, tween.start = 'width' === prop || 'height' === prop ? 1 : 0));
    }
  }
  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }
  function genFx(type, includeWidth) {
    var which, attrs = { height: type }, i = 0;
    for (includeWidth = includeWidth ? 1 : 0; 4 > i; i += 2 - includeWidth)
      which = cssExpand[i], attrs['margin' + which] = attrs['padding' + which] = type;
    return includeWidth && (attrs.opacity = attrs.width = type), attrs;
  }
  function getWindow(elem) {
    return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType ? elem.defaultView || elem.parentWindow : !1;
  }
  var rootjQuery, readyList, document = window.document, location = window.location, navigator = window.navigator, _jQuery = window.jQuery, _$ = window.$, core_push = Array.prototype.push, core_slice = Array.prototype.slice, core_indexOf = Array.prototype.indexOf, core_toString = Object.prototype.toString, core_hasOwn = Object.prototype.hasOwnProperty, core_trim = String.prototype.trim, jQuery = function (selector, context) {
      return new jQuery.fn.init(selector, context, rootjQuery);
    }, core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, core_rnotwhite = /\S/, core_rspace = /\s+/, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, rvalidchars = /^[\],:{}\s]*$/, rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g, rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function (all, letter) {
      return (letter + '').toUpperCase();
    }, DOMContentLoaded = function () {
      document.addEventListener ? (document.removeEventListener('DOMContentLoaded', DOMContentLoaded, !1), jQuery.ready()) : 'complete' === document.readyState && (document.detachEvent('onreadystatechange', DOMContentLoaded), jQuery.ready());
    }, class2type = {};
  jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    init: function (selector, context, rootjQuery) {
      var match, elem, doc;
      if (!selector)
        return this;
      if (selector.nodeType)
        return this.context = this[0] = selector, this.length = 1, this;
      if ('string' == typeof selector) {
        if (match = '<' === selector.charAt(0) && '>' === selector.charAt(selector.length - 1) && selector.length >= 3 ? [
            null,
            selector,
            null
          ] : rquickExpr.exec(selector), !match || !match[1] && context)
          return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
        if (match[1])
          return context = context instanceof jQuery ? context[0] : context, doc = context && context.nodeType ? context.ownerDocument || context : document, selector = jQuery.parseHTML(match[1], doc, !0), rsingleTag.test(match[1]) && jQuery.isPlainObject(context) && this.attr.call(selector, context, !0), jQuery.merge(this, selector);
        if (elem = document.getElementById(match[2]), elem && elem.parentNode) {
          if (elem.id !== match[2])
            return rootjQuery.find(selector);
          this.length = 1, this[0] = elem;
        }
        return this.context = document, this.selector = selector, this;
      }
      return jQuery.isFunction(selector) ? rootjQuery.ready(selector) : (selector.selector !== undefined && (this.selector = selector.selector, this.context = selector.context), jQuery.makeArray(selector, this));
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
      return null == num ? this.toArray() : 0 > num ? this[this.length + num] : this[num];
    },
    pushStack: function (elems, name, selector) {
      var ret = jQuery.merge(this.constructor(), elems);
      return ret.prevObject = this, ret.context = this.context, 'find' === name ? ret.selector = this.selector + (this.selector ? ' ' : '') + selector : name && (ret.selector = this.selector + '.' + name + '(' + selector + ')'), ret;
    },
    each: function (callback, args) {
      return jQuery.each(this, callback, args);
    },
    ready: function (fn) {
      return jQuery.ready.promise().done(fn), this;
    },
    eq: function (i) {
      return i = +i, -1 === i ? this.slice(i) : this.slice(i, i + 1);
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
  }, jQuery.fn.init.prototype = jQuery.fn, jQuery.extend = jQuery.fn.extend = function () {
    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
    for ('boolean' == typeof target && (deep = target, target = arguments[1] || {}, i = 2), 'object' == typeof target || jQuery.isFunction(target) || (target = {}), length === i && (target = this, --i); length > i; i++)
      if (null != (options = arguments[i]))
        for (name in options)
          src = target[name], copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, target[name] = jQuery.extend(deep, clone, copy)) : copy !== undefined && (target[name] = copy));
    return target;
  }, jQuery.extend({
    noConflict: function (deep) {
      return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), jQuery;
    },
    isReady: !1,
    readyWait: 1,
    holdReady: function (hold) {
      hold ? jQuery.readyWait++ : jQuery.ready(!0);
    },
    ready: function (wait) {
      if (wait === !0 ? !--jQuery.readyWait : !jQuery.isReady) {
        if (!document.body)
          return setTimeout(jQuery.ready, 1);
        jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [jQuery]), jQuery.fn.trigger && jQuery(document).trigger('ready').off('ready'));
      }
    },
    isFunction: function (obj) {
      return 'function' === jQuery.type(obj);
    },
    isArray: Array.isArray || function (obj) {
      return 'array' === jQuery.type(obj);
    },
    isWindow: function (obj) {
      return null != obj && obj == obj.window;
    },
    isNumeric: function (obj) {
      return !isNaN(parseFloat(obj)) && isFinite(obj);
    },
    type: function (obj) {
      return null == obj ? String(obj) : class2type[core_toString.call(obj)] || 'object';
    },
    isPlainObject: function (obj) {
      if (!obj || 'object' !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj))
        return !1;
      try {
        if (obj.constructor && !core_hasOwn.call(obj, 'constructor') && !core_hasOwn.call(obj.constructor.prototype, 'isPrototypeOf'))
          return !1;
      } catch (e) {
        return !1;
      }
      var key;
      for (key in obj);
      return key === undefined || core_hasOwn.call(obj, key);
    },
    isEmptyObject: function (obj) {
      var name;
      for (name in obj)
        return !1;
      return !0;
    },
    error: function (msg) {
      throw new Error(msg);
    },
    parseHTML: function (data, context, scripts) {
      var parsed;
      return data && 'string' == typeof data ? ('boolean' == typeof context && (scripts = context, context = 0), context = context || document, (parsed = rsingleTag.exec(data)) ? [context.createElement(parsed[1])] : (parsed = jQuery.buildFragment([data], context, scripts ? null : []), jQuery.merge([], (parsed.cacheable ? jQuery.clone(parsed.fragment) : parsed.fragment).childNodes))) : null;
    },
    parseJSON: function (data) {
      return data && 'string' == typeof data ? (data = jQuery.trim(data), window.JSON && window.JSON.parse ? window.JSON.parse(data) : rvalidchars.test(data.replace(rvalidescape, '@').replace(rvalidtokens, ']').replace(rvalidbraces, '')) ? new Function('return ' + data)() : void jQuery.error('Invalid JSON: ' + data)) : null;
    },
    parseXML: function (data) {
      var xml, tmp;
      if (!data || 'string' != typeof data)
        return null;
      try {
        window.DOMParser ? (tmp = new DOMParser(), xml = tmp.parseFromString(data, 'text/xml')) : (xml = new ActiveXObject('Microsoft.XMLDOM'), xml.async = 'false', xml.loadXML(data));
      } catch (e) {
        xml = undefined;
      }
      return xml && xml.documentElement && !xml.getElementsByTagName('parsererror').length || jQuery.error('Invalid XML: ' + data), xml;
    },
    noop: function () {
    },
    globalEval: function (data) {
      data && core_rnotwhite.test(data) && (window.execScript || function (data) {
        window.eval.call(window, data);
      })(data);
    },
    camelCase: function (string) {
      return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, fcamelCase);
    },
    nodeName: function (elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    each: function (obj, callback, args) {
      var name, i = 0, length = obj.length, isObj = length === undefined || jQuery.isFunction(obj);
      if (args)
        if (isObj) {
          for (name in obj)
            if (callback.apply(obj[name], args) === !1)
              break;
        } else
          for (; length > i && callback.apply(obj[i++], args) !== !1;);
      else if (isObj) {
        for (name in obj)
          if (callback.call(obj[name], name, obj[name]) === !1)
            break;
      } else
        for (; length > i && callback.call(obj[i], i, obj[i++]) !== !1;);
      return obj;
    },
    trim: core_trim && !core_trim.call('\ufeff\xa0') ? function (text) {
      return null == text ? '' : core_trim.call(text);
    } : function (text) {
      return null == text ? '' : (text + '').replace(rtrim, '');
    },
    makeArray: function (arr, results) {
      var type, ret = results || [];
      return null != arr && (type = jQuery.type(arr), null == arr.length || 'string' === type || 'function' === type || 'regexp' === type || jQuery.isWindow(arr) ? core_push.call(ret, arr) : jQuery.merge(ret, arr)), ret;
    },
    inArray: function (elem, arr, i) {
      var len;
      if (arr) {
        if (core_indexOf)
          return core_indexOf.call(arr, elem, i);
        for (len = arr.length, i = i ? 0 > i ? Math.max(0, len + i) : i : 0; len > i; i++)
          if (i in arr && arr[i] === elem)
            return i;
      }
      return -1;
    },
    merge: function (first, second) {
      var l = second.length, i = first.length, j = 0;
      if ('number' == typeof l)
        for (; l > j; j++)
          first[i++] = second[j];
      else
        for (; second[j] !== undefined;)
          first[i++] = second[j++];
      return first.length = i, first;
    },
    grep: function (elems, callback, inv) {
      var retVal, ret = [], i = 0, length = elems.length;
      for (inv = !!inv; length > i; i++)
        retVal = !!callback(elems[i], i), inv !== retVal && ret.push(elems[i]);
      return ret;
    },
    map: function (elems, callback, arg) {
      var value, key, ret = [], i = 0, length = elems.length, isArray = elems instanceof jQuery || length !== undefined && 'number' == typeof length && (length > 0 && elems[0] && elems[length - 1] || 0 === length || jQuery.isArray(elems));
      if (isArray)
        for (; length > i; i++)
          value = callback(elems[i], i, arg), null != value && (ret[ret.length] = value);
      else
        for (key in elems)
          value = callback(elems[key], key, arg), null != value && (ret[ret.length] = value);
      return ret.concat.apply([], ret);
    },
    guid: 1,
    proxy: function (fn, context) {
      var tmp, args, proxy;
      return 'string' == typeof context && (tmp = fn[context], context = fn, fn = tmp), jQuery.isFunction(fn) ? (args = core_slice.call(arguments, 2), proxy = function () {
        return fn.apply(context, args.concat(core_slice.call(arguments)));
      }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy) : undefined;
    },
    access: function (elems, fn, key, value, chainable, emptyGet, pass) {
      var exec, bulk = null == key, i = 0, length = elems.length;
      if (key && 'object' == typeof key) {
        for (i in key)
          jQuery.access(elems, fn, i, key[i], 1, emptyGet, value);
        chainable = 1;
      } else if (value !== undefined) {
        if (exec = pass === undefined && jQuery.isFunction(value), bulk && (exec ? (exec = fn, fn = function (elem, key, value) {
            return exec.call(jQuery(elem), value);
          }) : (fn.call(elems, value), fn = null)), fn)
          for (; length > i; i++)
            fn(elems[i], key, exec ? value.call(elems[i], i, fn(elems[i], key)) : value, pass);
        chainable = 1;
      }
      return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
    },
    now: function () {
      return new Date().getTime();
    }
  }), jQuery.ready.promise = function (obj) {
    if (!readyList)
      if (readyList = jQuery.Deferred(), 'complete' === document.readyState)
        setTimeout(jQuery.ready, 1);
      else if (document.addEventListener)
        document.addEventListener('DOMContentLoaded', DOMContentLoaded, !1), window.addEventListener('load', jQuery.ready, !1);
      else {
        document.attachEvent('onreadystatechange', DOMContentLoaded), window.attachEvent('onload', jQuery.ready);
        var top = !1;
        try {
          top = null == window.frameElement && document.documentElement;
        } catch (e) {
        }
        top && top.doScroll && !function doScrollCheck() {
          if (!jQuery.isReady) {
            try {
              top.doScroll('left');
            } catch (e) {
              return setTimeout(doScrollCheck, 50);
            }
            jQuery.ready();
          }
        }();
      }
    return readyList.promise(obj);
  }, jQuery.each('Boolean Number String Function Array Date RegExp Object'.split(' '), function (i, name) {
    class2type['[object ' + name + ']'] = name.toLowerCase();
  }), rootjQuery = jQuery(document);
  var optionsCache = {};
  jQuery.Callbacks = function (options) {
    options = 'string' == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
    var memory, fired, firing, firingStart, firingLength, firingIndex, list = [], stack = !options.once && [], fire = function (data) {
        for (memory = options.memory && data, fired = !0, firingIndex = firingStart || 0, firingStart = 0, firingLength = list.length, firing = !0; list && firingLength > firingIndex; firingIndex++)
          if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
            memory = !1;
            break;
          }
        firing = !1, list && (stack ? stack.length && fire(stack.shift()) : memory ? list = [] : self.disable());
      }, self = {
        add: function () {
          if (list) {
            var start = list.length;
            !function add(args) {
              jQuery.each(args, function (_, arg) {
                var type = jQuery.type(arg);
                'function' === type ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && 'string' !== type && add(arg);
              });
            }(arguments), firing ? firingLength = list.length : memory && (firingStart = start, fire(memory));
          }
          return this;
        },
        remove: function () {
          return list && jQuery.each(arguments, function (_, arg) {
            for (var index; (index = jQuery.inArray(arg, list, index)) > -1;)
              list.splice(index, 1), firing && (firingLength >= index && firingLength--, firingIndex >= index && firingIndex--);
          }), this;
        },
        has: function (fn) {
          return jQuery.inArray(fn, list) > -1;
        },
        empty: function () {
          return list = [], this;
        },
        disable: function () {
          return list = stack = memory = undefined, this;
        },
        disabled: function () {
          return !list;
        },
        lock: function () {
          return stack = undefined, memory || self.disable(), this;
        },
        locked: function () {
          return !stack;
        },
        fireWith: function (context, args) {
          return args = args || [], args = [
            context,
            args.slice ? args.slice() : args
          ], !list || fired && !stack || (firing ? stack.push(args) : fire(args)), this;
        },
        fire: function () {
          return self.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!fired;
        }
      };
    return self;
  }, jQuery.extend({
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
            return deferred.done(arguments).fail(arguments), this;
          },
          then: function () {
            var fns = arguments;
            return jQuery.Deferred(function (newDefer) {
              jQuery.each(tuples, function (i, tuple) {
                var action = tuple[0], fn = fns[i];
                deferred[tuple[1]](jQuery.isFunction(fn) ? function () {
                  var returned = fn.apply(this, arguments);
                  returned && jQuery.isFunction(returned.promise) ? returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify) : newDefer[action + 'With'](this === deferred ? newDefer : this, [returned]);
                } : newDefer[action]);
              }), fns = null;
            }).promise();
          },
          promise: function (obj) {
            return null != obj ? jQuery.extend(obj, promise) : promise;
          }
        }, deferred = {};
      return promise.pipe = promise.then, jQuery.each(tuples, function (i, tuple) {
        var list = tuple[2], stateString = tuple[3];
        promise[tuple[1]] = list.add, stateString && list.add(function () {
          state = stateString;
        }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = list.fire, deferred[tuple[0] + 'With'] = list.fireWith;
      }), promise.promise(deferred), func && func.call(deferred, deferred), deferred;
    },
    when: function (subordinate) {
      var progressValues, progressContexts, resolveContexts, i = 0, resolveValues = core_slice.call(arguments), length = resolveValues.length, remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = 1 === remaining ? subordinate : jQuery.Deferred(), updateFunc = function (i, contexts, values) {
          return function (value) {
            contexts[i] = this, values[i] = arguments.length > 1 ? core_slice.call(arguments) : value, values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values);
          };
        };
      if (length > 1)
        for (progressValues = new Array(length), progressContexts = new Array(length), resolveContexts = new Array(length); length > i; i++)
          resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues)) : --remaining;
      return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise();
    }
  }), jQuery.support = function () {
    var support, all, a, select, opt, input, fragment, eventName, i, isSupported, clickFn, div = document.createElement('div');
    if (div.setAttribute('className', 't'), div.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>', all = div.getElementsByTagName('*'), a = div.getElementsByTagName('a')[0], !all || !a || !all.length)
      return {};
    select = document.createElement('select'), opt = select.appendChild(document.createElement('option')), input = div.getElementsByTagName('input')[0], a.style.cssText = 'top:1px;float:left;opacity:.5', support = {
      leadingWhitespace: 3 === div.firstChild.nodeType,
      tbody: !div.getElementsByTagName('tbody').length,
      htmlSerialize: !!div.getElementsByTagName('link').length,
      style: /top/.test(a.getAttribute('style')),
      hrefNormalized: '/a' === a.getAttribute('href'),
      opacity: /^0.5/.test(a.style.opacity),
      cssFloat: !!a.style.cssFloat,
      checkOn: 'on' === input.value,
      optSelected: opt.selected,
      getSetAttribute: 't' !== div.className,
      enctype: !!document.createElement('form').enctype,
      html5Clone: '<:nav></:nav>' !== document.createElement('nav').cloneNode(!0).outerHTML,
      boxModel: 'CSS1Compat' === document.compatMode,
      submitBubbles: !0,
      changeBubbles: !0,
      focusinBubbles: !1,
      deleteExpando: !0,
      noCloneEvent: !0,
      inlineBlockNeedsLayout: !1,
      shrinkWrapBlocks: !1,
      reliableMarginRight: !0,
      boxSizingReliable: !0,
      pixelPosition: !1
    }, input.checked = !0, support.noCloneChecked = input.cloneNode(!0).checked, select.disabled = !0, support.optDisabled = !opt.disabled;
    try {
      delete div.test;
    } catch (e) {
      support.deleteExpando = !1;
    }
    if (!div.addEventListener && div.attachEvent && div.fireEvent && (div.attachEvent('onclick', clickFn = function () {
        support.noCloneEvent = !1;
      }), div.cloneNode(!0).fireEvent('onclick'), div.detachEvent('onclick', clickFn)), input = document.createElement('input'), input.value = 't', input.setAttribute('type', 'radio'), support.radioValue = 't' === input.value, input.setAttribute('checked', 'checked'), input.setAttribute('name', 't'), div.appendChild(input), fragment = document.createDocumentFragment(), fragment.appendChild(div.lastChild), support.checkClone = fragment.cloneNode(!0).cloneNode(!0).lastChild.checked, support.appendChecked = input.checked, fragment.removeChild(input), fragment.appendChild(div), div.attachEvent)
      for (i in {
          submit: !0,
          change: !0,
          focusin: !0
        })
        eventName = 'on' + i, isSupported = eventName in div, isSupported || (div.setAttribute(eventName, 'return;'), isSupported = 'function' == typeof div[eventName]), support[i + 'Bubbles'] = isSupported;
    return jQuery(function () {
      var container, div, tds, marginDiv, divReset = 'padding:0;margin:0;border:0;display:block;overflow:hidden;', body = document.getElementsByTagName('body')[0];
      body && (container = document.createElement('div'), container.style.cssText = 'visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px', body.insertBefore(container, body.firstChild), div = document.createElement('div'), container.appendChild(div), div.innerHTML = '<table><tr><td></td><td>t</td></tr></table>', tds = div.getElementsByTagName('td'), tds[0].style.cssText = 'padding:0;margin:0;border:0;display:none', isSupported = 0 === tds[0].offsetHeight, tds[0].style.display = '', tds[1].style.display = 'none', support.reliableHiddenOffsets = isSupported && 0 === tds[0].offsetHeight, div.innerHTML = '', div.style.cssText = 'box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;', support.boxSizing = 4 === div.offsetWidth, support.doesNotIncludeMarginInBodyOffset = 1 !== body.offsetTop, window.getComputedStyle && (support.pixelPosition = '1%' !== (window.getComputedStyle(div, null) || {}).top, support.boxSizingReliable = '4px' === (window.getComputedStyle(div, null) || { width: '4px' }).width, marginDiv = document.createElement('div'), marginDiv.style.cssText = div.style.cssText = divReset, marginDiv.style.marginRight = marginDiv.style.width = '0', div.style.width = '1px', div.appendChild(marginDiv), support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight)), 'undefined' != typeof div.style.zoom && (div.innerHTML = '', div.style.cssText = divReset + 'width:1px;padding:1px;display:inline;zoom:1', support.inlineBlockNeedsLayout = 3 === div.offsetWidth, div.style.display = 'block', div.style.overflow = 'visible', div.innerHTML = '<div></div>', div.firstChild.style.width = '5px', support.shrinkWrapBlocks = 3 !== div.offsetWidth, container.style.zoom = 1), body.removeChild(container), container = div = tds = marginDiv = null);
    }), fragment.removeChild(div), all = a = select = opt = input = fragment = div = null, support;
  }();
  var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, rmultiDash = /([A-Z])/g;
  jQuery.extend({
    cache: {},
    deletedIds: [],
    uuid: 0,
    expando: 'jQuery' + (jQuery.fn.jquery + Math.random()).replace(/\D/g, ''),
    noData: {
      embed: !0,
      object: 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000',
      applet: !0
    },
    hasData: function (elem) {
      return elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando], !!elem && !isEmptyDataObject(elem);
    },
    data: function (elem, name, data, pvt) {
      if (jQuery.acceptData(elem)) {
        var thisCache, ret, internalKey = jQuery.expando, getByName = 'string' == typeof name, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
        if (id && cache[id] && (pvt || cache[id].data) || !getByName || data !== undefined)
          return id || (isNode ? elem[internalKey] = id = jQuery.deletedIds.pop() || jQuery.guid++ : id = internalKey), cache[id] || (cache[id] = {}, isNode || (cache[id].toJSON = jQuery.noop)), ('object' == typeof name || 'function' == typeof name) && (pvt ? cache[id] = jQuery.extend(cache[id], name) : cache[id].data = jQuery.extend(cache[id].data, name)), thisCache = cache[id], pvt || (thisCache.data || (thisCache.data = {}), thisCache = thisCache.data), data !== undefined && (thisCache[jQuery.camelCase(name)] = data), getByName ? (ret = thisCache[name], null == ret && (ret = thisCache[jQuery.camelCase(name)])) : ret = thisCache, ret;
      }
    },
    removeData: function (elem, name, pvt) {
      if (jQuery.acceptData(elem)) {
        var thisCache, i, l, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[jQuery.expando] : jQuery.expando;
        if (cache[id]) {
          if (name && (thisCache = pvt ? cache[id] : cache[id].data)) {
            jQuery.isArray(name) || (name in thisCache ? name = [name] : (name = jQuery.camelCase(name), name = name in thisCache ? [name] : name.split(' ')));
            for (i = 0, l = name.length; l > i; i++)
              delete thisCache[name[i]];
            if (!(pvt ? isEmptyDataObject : jQuery.isEmptyObject)(thisCache))
              return;
          }
          (pvt || (delete cache[id].data, isEmptyDataObject(cache[id]))) && (isNode ? jQuery.cleanData([elem], !0) : jQuery.support.deleteExpando || cache != cache.window ? delete cache[id] : cache[id] = null);
        }
      }
    },
    _data: function (elem, name, data) {
      return jQuery.data(elem, name, data, !0);
    },
    acceptData: function (elem) {
      var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];
      return !noData || noData !== !0 && elem.getAttribute('classid') === noData;
    }
  }), jQuery.fn.extend({
    data: function (key, value) {
      var parts, part, attr, name, l, elem = this[0], i = 0, data = null;
      if (key === undefined) {
        if (this.length && (data = jQuery.data(elem), 1 === elem.nodeType && !jQuery._data(elem, 'parsedAttrs'))) {
          for (attr = elem.attributes, l = attr.length; l > i; i++)
            name = attr[i].name, name.indexOf('data-') || (name = jQuery.camelCase(name.substring(5)), dataAttr(elem, name, data[name]));
          jQuery._data(elem, 'parsedAttrs', !0);
        }
        return data;
      }
      return 'object' == typeof key ? this.each(function () {
        jQuery.data(this, key);
      }) : (parts = key.split('.', 2), parts[1] = parts[1] ? '.' + parts[1] : '', part = parts[1] + '!', jQuery.access(this, function (value) {
        return value === undefined ? (data = this.triggerHandler('getData' + part, [parts[0]]), data === undefined && elem && (data = jQuery.data(elem, key), data = dataAttr(elem, key, data)), data === undefined && parts[1] ? this.data(parts[0]) : data) : (parts[1] = value, void this.each(function () {
          var self = jQuery(this);
          self.triggerHandler('setData' + part, parts), jQuery.data(this, key, value), self.triggerHandler('changeData' + part, parts);
        }));
      }, null, value, arguments.length > 1, null, !1));
    },
    removeData: function (key) {
      return this.each(function () {
        jQuery.removeData(this, key);
      });
    }
  }), jQuery.extend({
    queue: function (elem, type, data) {
      var queue;
      return elem ? (type = (type || 'fx') + 'queue', queue = jQuery._data(elem, type), data && (!queue || jQuery.isArray(data) ? queue = jQuery._data(elem, type, jQuery.makeArray(data)) : queue.push(data)), queue || []) : void 0;
    },
    dequeue: function (elem, type) {
      type = type || 'fx';
      var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function () {
          jQuery.dequeue(elem, type);
        };
      'inprogress' === fn && (fn = queue.shift(), startLength--), fn && ('fx' === type && queue.unshift('inprogress'), delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire();
    },
    _queueHooks: function (elem, type) {
      var key = type + 'queueHooks';
      return jQuery._data(elem, key) || jQuery._data(elem, key, {
        empty: jQuery.Callbacks('once memory').add(function () {
          jQuery.removeData(elem, type + 'queue', !0), jQuery.removeData(elem, key, !0);
        })
      });
    }
  }), jQuery.fn.extend({
    queue: function (type, data) {
      var setter = 2;
      return 'string' != typeof type && (data = type, type = 'fx', setter--), arguments.length < setter ? jQuery.queue(this[0], type) : data === undefined ? this : this.each(function () {
        var queue = jQuery.queue(this, type, data);
        jQuery._queueHooks(this, type), 'fx' === type && 'inprogress' !== queue[0] && jQuery.dequeue(this, type);
      });
    },
    dequeue: function (type) {
      return this.each(function () {
        jQuery.dequeue(this, type);
      });
    },
    delay: function (time, type) {
      return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || 'fx', this.queue(type, function (next, hooks) {
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
          --count || defer.resolveWith(elements, [elements]);
        };
      for ('string' != typeof type && (obj = type, type = undefined), type = type || 'fx'; i--;)
        tmp = jQuery._data(elements[i], type + 'queueHooks'), tmp && tmp.empty && (count++, tmp.empty.add(resolve));
      return resolve(), defer.promise(obj);
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
      return name = jQuery.propFix[name] || name, this.each(function () {
        try {
          this[name] = undefined, delete this[name];
        } catch (e) {
        }
      });
    },
    addClass: function (value) {
      var classNames, i, l, elem, setClass, c, cl;
      if (jQuery.isFunction(value))
        return this.each(function (j) {
          jQuery(this).addClass(value.call(this, j, this.className));
        });
      if (value && 'string' == typeof value)
        for (classNames = value.split(core_rspace), i = 0, l = this.length; l > i; i++)
          if (elem = this[i], 1 === elem.nodeType)
            if (elem.className || 1 !== classNames.length) {
              for (setClass = ' ' + elem.className + ' ', c = 0, cl = classNames.length; cl > c; c++)
                setClass.indexOf(' ' + classNames[c] + ' ') < 0 && (setClass += classNames[c] + ' ');
              elem.className = jQuery.trim(setClass);
            } else
              elem.className = value;
      return this;
    },
    removeClass: function (value) {
      var removes, className, elem, c, cl, i, l;
      if (jQuery.isFunction(value))
        return this.each(function (j) {
          jQuery(this).removeClass(value.call(this, j, this.className));
        });
      if (value && 'string' == typeof value || value === undefined)
        for (removes = (value || '').split(core_rspace), i = 0, l = this.length; l > i; i++)
          if (elem = this[i], 1 === elem.nodeType && elem.className) {
            for (className = (' ' + elem.className + ' ').replace(rclass, ' '), c = 0, cl = removes.length; cl > c; c++)
              for (; className.indexOf(' ' + removes[c] + ' ') >= 0;)
                className = className.replace(' ' + removes[c] + ' ', ' ');
            elem.className = value ? jQuery.trim(className) : '';
          }
      return this;
    },
    toggleClass: function (value, stateVal) {
      var type = typeof value, isBool = 'boolean' == typeof stateVal;
      return this.each(jQuery.isFunction(value) ? function (i) {
        jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
      } : function () {
        if ('string' === type)
          for (var className, i = 0, self = jQuery(this), state = stateVal, classNames = value.split(core_rspace); className = classNames[i++];)
            state = isBool ? state : !self.hasClass(className), self[state ? 'addClass' : 'removeClass'](className);
        else
          ('undefined' === type || 'boolean' === type) && (this.className && jQuery._data(this, '__className__', this.className), this.className = this.className || value === !1 ? '' : jQuery._data(this, '__className__') || '');
      });
    },
    hasClass: function (selector) {
      for (var className = ' ' + selector + ' ', i = 0, l = this.length; l > i; i++)
        if (1 === this[i].nodeType && (' ' + this[i].className + ' ').replace(rclass, ' ').indexOf(className) >= 0)
          return !0;
      return !1;
    },
    val: function (value) {
      var hooks, ret, isFunction, elem = this[0];
      {
        if (arguments.length)
          return isFunction = jQuery.isFunction(value), this.each(function (i) {
            var val, self = jQuery(this);
            1 === this.nodeType && (val = isFunction ? value.call(this, i, self.val()) : value, null == val ? val = '' : 'number' == typeof val ? val += '' : jQuery.isArray(val) && (val = jQuery.map(val, function (value) {
              return null == value ? '' : value + '';
            })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], hooks && 'set' in hooks && hooks.set(this, val, 'value') !== undefined || (this.value = val));
          });
        if (elem)
          return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], hooks && 'get' in hooks && (ret = hooks.get(elem, 'value')) !== undefined ? ret : (ret = elem.value, 'string' == typeof ret ? ret.replace(rreturn, '') : null == ret ? '' : ret);
      }
    }
  }), jQuery.extend({
    valHooks: {
      option: {
        get: function (elem) {
          var val = elem.attributes.value;
          return !val || val.specified ? elem.value : elem.text;
        }
      },
      select: {
        get: function (elem) {
          for (var value, option, options = elem.options, index = elem.selectedIndex, one = 'select-one' === elem.type || 0 > index, values = one ? null : [], max = one ? index + 1 : options.length, i = 0 > index ? max : one ? index : 0; max > i; i++)
            if (option = options[i], !(!option.selected && i !== index || (jQuery.support.optDisabled ? option.disabled : null !== option.getAttribute('disabled')) || option.parentNode.disabled && jQuery.nodeName(option.parentNode, 'optgroup'))) {
              if (value = jQuery(option).val(), one)
                return value;
              values.push(value);
            }
          return values;
        },
        set: function (elem, value) {
          var values = jQuery.makeArray(value);
          return jQuery(elem).find('option').each(function () {
            this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0;
          }), values.length || (elem.selectedIndex = -1), values;
        }
      }
    },
    attrFn: {},
    attr: function (elem, name, value, pass) {
      var ret, hooks, notxml, nType = elem.nodeType;
      if (elem && 3 !== nType && 8 !== nType && 2 !== nType)
        return pass && jQuery.isFunction(jQuery.fn[name]) ? jQuery(elem)[name](value) : 'undefined' == typeof elem.getAttribute ? jQuery.prop(elem, name, value) : (notxml = 1 !== nType || !jQuery.isXMLDoc(elem), notxml && (name = name.toLowerCase(), hooks = jQuery.attrHooks[name] || (rboolean.test(name) ? boolHook : nodeHook)), value !== undefined ? null === value ? void jQuery.removeAttr(elem, name) : hooks && 'set' in hooks && notxml && (ret = hooks.set(elem, value, name)) !== undefined ? ret : (elem.setAttribute(name, value + ''), value) : hooks && 'get' in hooks && notxml && null !== (ret = hooks.get(elem, name)) ? ret : (ret = elem.getAttribute(name), null === ret ? undefined : ret));
    },
    removeAttr: function (elem, value) {
      var propName, attrNames, name, isBool, i = 0;
      if (value && 1 === elem.nodeType)
        for (attrNames = value.split(core_rspace); i < attrNames.length; i++)
          name = attrNames[i], name && (propName = jQuery.propFix[name] || name, isBool = rboolean.test(name), isBool || jQuery.attr(elem, name, ''), elem.removeAttribute(getSetAttribute ? name : propName), isBool && propName in elem && (elem[propName] = !1));
    },
    attrHooks: {
      type: {
        set: function (elem, value) {
          if (rtype.test(elem.nodeName) && elem.parentNode)
            jQuery.error('type property can\'t be changed');
          else if (!jQuery.support.radioValue && 'radio' === value && jQuery.nodeName(elem, 'input')) {
            var val = elem.value;
            return elem.setAttribute('type', value), val && (elem.value = val), value;
          }
        }
      },
      value: {
        get: function (elem, name) {
          return nodeHook && jQuery.nodeName(elem, 'button') ? nodeHook.get(elem, name) : name in elem ? elem.value : null;
        },
        set: function (elem, value, name) {
          return nodeHook && jQuery.nodeName(elem, 'button') ? nodeHook.set(elem, value, name) : void (elem.value = value);
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
      if (elem && 3 !== nType && 8 !== nType && 2 !== nType)
        return notxml = 1 !== nType || !jQuery.isXMLDoc(elem), notxml && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), value !== undefined ? hooks && 'set' in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : elem[name] = value : hooks && 'get' in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name];
    },
    propHooks: {
      tabIndex: {
        get: function (elem) {
          var attributeNode = elem.getAttributeNode('tabindex');
          return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined;
        }
      }
    }
  }), boolHook = {
    get: function (elem, name) {
      var attrNode, property = jQuery.prop(elem, name);
      return property === !0 || 'boolean' != typeof property && (attrNode = elem.getAttributeNode(name)) && attrNode.nodeValue !== !1 ? name.toLowerCase() : undefined;
    },
    set: function (elem, value, name) {
      var propName;
      return value === !1 ? jQuery.removeAttr(elem, name) : (propName = jQuery.propFix[name] || name, propName in elem && (elem[propName] = !0), elem.setAttribute(name, name.toLowerCase())), name;
    }
  }, getSetAttribute || (fixSpecified = {
    name: !0,
    id: !0,
    coords: !0
  }, nodeHook = jQuery.valHooks.button = {
    get: function (elem, name) {
      var ret;
      return ret = elem.getAttributeNode(name), ret && (fixSpecified[name] ? '' !== ret.value : ret.specified) ? ret.value : undefined;
    },
    set: function (elem, value, name) {
      var ret = elem.getAttributeNode(name);
      return ret || (ret = document.createAttribute(name), elem.setAttributeNode(ret)), ret.value = value + '';
    }
  }, jQuery.each([
    'width',
    'height'
  ], function (i, name) {
    jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
      set: function (elem, value) {
        return '' === value ? (elem.setAttribute(name, 'auto'), value) : void 0;
      }
    });
  }), jQuery.attrHooks.contenteditable = {
    get: nodeHook.get,
    set: function (elem, value, name) {
      '' === value && (value = 'false'), nodeHook.set(elem, value, name);
    }
  }), jQuery.support.hrefNormalized || jQuery.each([
    'href',
    'src',
    'width',
    'height'
  ], function (i, name) {
    jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
      get: function (elem) {
        var ret = elem.getAttribute(name, 2);
        return null === ret ? undefined : ret;
      }
    });
  }), jQuery.support.style || (jQuery.attrHooks.style = {
    get: function (elem) {
      return elem.style.cssText.toLowerCase() || undefined;
    },
    set: function (elem, value) {
      return elem.style.cssText = value + '';
    }
  }), jQuery.support.optSelected || (jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
    get: function (elem) {
      var parent = elem.parentNode;
      return parent && (parent.selectedIndex, parent.parentNode && parent.parentNode.selectedIndex), null;
    }
  })), jQuery.support.enctype || (jQuery.propFix.enctype = 'encoding'), jQuery.support.checkOn || jQuery.each([
    'radio',
    'checkbox'
  ], function () {
    jQuery.valHooks[this] = {
      get: function (elem) {
        return null === elem.getAttribute('value') ? 'on' : elem.value;
      }
    };
  }), jQuery.each([
    'radio',
    'checkbox'
  ], function () {
    jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {
      set: function (elem, value) {
        return jQuery.isArray(value) ? elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0 : void 0;
      }
    });
  });
  var rformElems = /^(?:textarea|input|select)$/i, rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/, rhoverHack = /(?:^|\s)hover(\.\S+|)\b/, rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, hoverHack = function (events) {
      return jQuery.event.special.hover ? events : events.replace(rhoverHack, 'mouseenter$1 mouseleave$1');
    };
  jQuery.event = {
    add: function (elem, types, handler, data, selector) {
      var elemData, eventHandle, events, t, tns, type, namespaces, handleObj, handleObjIn, handlers, special;
      if (3 !== elem.nodeType && 8 !== elem.nodeType && types && handler && (elemData = jQuery._data(elem))) {
        for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, selector = handleObjIn.selector), handler.guid || (handler.guid = jQuery.guid++), events = elemData.events, events || (elemData.events = events = {}), eventHandle = elemData.handle, eventHandle || (elemData.handle = eventHandle = function (e) {
            return 'undefined' == typeof jQuery || e && jQuery.event.triggered === e.type ? undefined : jQuery.event.dispatch.apply(eventHandle.elem, arguments);
          }, eventHandle.elem = elem), types = jQuery.trim(hoverHack(types)).split(' '), t = 0; t < types.length; t++)
          tns = rtypenamespace.exec(types[t]) || [], type = tns[1], namespaces = (tns[2] || '').split('.').sort(), special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, handleObj = jQuery.extend({
            type: type,
            origType: tns[1],
            data: data,
            handler: handler,
            guid: handler.guid,
            selector: selector,
            needsContext: selector && jQuery.expr.match.needsContext.test(selector),
            namespace: namespaces.join('.')
          }, handleObjIn), handlers = events[type], handlers || (handlers = events[type] = [], handlers.delegateCount = 0, special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || (elem.addEventListener ? elem.addEventListener(type, eventHandle, !1) : elem.attachEvent && elem.attachEvent('on' + type, eventHandle))), special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), jQuery.event.global[type] = !0;
        elem = null;
      }
    },
    global: {},
    remove: function (elem, types, handler, selector, mappedTypes) {
      var t, tns, type, origType, namespaces, origCount, j, events, special, eventType, handleObj, elemData = jQuery.hasData(elem) && jQuery._data(elem);
      if (elemData && (events = elemData.events)) {
        for (types = jQuery.trim(hoverHack(types || '')).split(' '), t = 0; t < types.length; t++)
          if (tns = rtypenamespace.exec(types[t]) || [], type = origType = tns[1], namespaces = tns[2], type) {
            for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, eventType = events[type] || [], origCount = eventType.length, namespaces = namespaces ? new RegExp('(^|\\.)' + namespaces.split('.').sort().join('\\.(?:.*\\.|)') + '(\\.|$)') : null, j = 0; j < eventType.length; j++)
              handleObj = eventType[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || namespaces && !namespaces.test(handleObj.namespace) || selector && selector !== handleObj.selector && ('**' !== selector || !handleObj.selector) || (eventType.splice(j--, 1), handleObj.selector && eventType.delegateCount--, special.remove && special.remove.call(elem, handleObj));
            0 === eventType.length && origCount !== eventType.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), delete events[type]);
          } else
            for (type in events)
              jQuery.event.remove(elem, type + types[t], handler, selector, !0);
        jQuery.isEmptyObject(events) && (delete elemData.handle, jQuery.removeData(elem, 'events', !0));
      }
    },
    customEvent: {
      getData: !0,
      setData: !0,
      changeData: !0
    },
    trigger: function (event, data, elem, onlyHandlers) {
      if (!elem || 3 !== elem.nodeType && 8 !== elem.nodeType) {
        var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType, type = event.type || event, namespaces = [];
        if (!rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf('!') >= 0 && (type = type.slice(0, -1), exclusive = !0), type.indexOf('.') >= 0 && (namespaces = type.split('.'), type = namespaces.shift(), namespaces.sort()), elem && !jQuery.event.customEvent[type] || jQuery.event.global[type]))
          if (event = 'object' == typeof event ? event[jQuery.expando] ? event : new jQuery.Event(type, event) : new jQuery.Event(type), event.type = type, event.isTrigger = !0, event.exclusive = exclusive, event.namespace = namespaces.join('.'), event.namespace_re = event.namespace ? new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)') : null, ontype = type.indexOf(':') < 0 ? 'on' + type : '', elem) {
            if (event.result = undefined, event.target || (event.target = elem), data = null != data ? jQuery.makeArray(data) : [], data.unshift(event), special = jQuery.event.special[type] || {}, !special.trigger || special.trigger.apply(elem, data) !== !1) {
              if (eventPath = [[
                    elem,
                    special.bindType || type
                  ]], !onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                for (bubbleType = special.delegateType || type, cur = rfocusMorph.test(bubbleType + type) ? elem : elem.parentNode, old = elem; cur; cur = cur.parentNode)
                  eventPath.push([
                    cur,
                    bubbleType
                  ]), old = cur;
                old === (elem.ownerDocument || document) && eventPath.push([
                  old.defaultView || old.parentWindow || window,
                  bubbleType
                ]);
              }
              for (i = 0; i < eventPath.length && !event.isPropagationStopped(); i++)
                cur = eventPath[i][0], event.type = eventPath[i][1], handle = (jQuery._data(cur, 'events') || {})[event.type] && jQuery._data(cur, 'handle'), handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === !1 && event.preventDefault();
              return event.type = type, onlyHandlers || event.isDefaultPrevented() || special._default && special._default.apply(elem.ownerDocument, data) !== !1 || 'click' === type && jQuery.nodeName(elem, 'a') || !jQuery.acceptData(elem) || ontype && elem[type] && ('focus' !== type && 'blur' !== type || 0 !== event.target.offsetWidth) && !jQuery.isWindow(elem) && (old = elem[ontype], old && (elem[ontype] = null), jQuery.event.triggered = type, elem[type](), jQuery.event.triggered = undefined, old && (elem[ontype] = old)), event.result;
            }
          } else {
            cache = jQuery.cache;
            for (i in cache)
              cache[i].events && cache[i].events[type] && jQuery.event.trigger(event, data, cache[i].handle.elem, !0);
          }
      }
    },
    dispatch: function (event) {
      event = jQuery.event.fix(event || window.event);
      var i, j, cur, ret, selMatch, matched, matches, handleObj, sel, handlers = (jQuery._data(this, 'events') || {})[event.type] || [], delegateCount = handlers.delegateCount, args = core_slice.call(arguments), run_all = !event.exclusive && !event.namespace, special = jQuery.event.special[event.type] || {}, handlerQueue = [];
      if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
        if (delegateCount && (!event.button || 'click' !== event.type))
          for (cur = event.target; cur != this; cur = cur.parentNode || this)
            if (cur.disabled !== !0 || 'click' !== event.type) {
              for (selMatch = {}, matches = [], i = 0; delegateCount > i; i++)
                handleObj = handlers[i], sel = handleObj.selector, selMatch[sel] === undefined && (selMatch[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length), selMatch[sel] && matches.push(handleObj);
              matches.length && handlerQueue.push({
                elem: cur,
                matches: matches
              });
            }
        for (handlers.length > delegateCount && handlerQueue.push({
            elem: this,
            matches: handlers.slice(delegateCount)
          }), i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++)
          for (matched = handlerQueue[i], event.currentTarget = matched.elem, j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++)
            handleObj = matched.matches[j], (run_all || !event.namespace && !handleObj.namespace || event.namespace_re && event.namespace_re.test(handleObj.namespace)) && (event.data = handleObj.data, event.handleObj = handleObj, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), ret !== undefined && (event.result = ret, ret === !1 && (event.preventDefault(), event.stopPropagation())));
        return special.postDispatch && special.postDispatch.call(this, event), event.result;
      }
    },
    props: 'attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(' '),
    fixHooks: {},
    keyHooks: {
      props: 'char charCode key keyCode'.split(' '),
      filter: function (event, original) {
        return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode), event;
      }
    },
    mouseHooks: {
      props: 'button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement'.split(' '),
      filter: function (event, original) {
        var eventDoc, doc, body, button = original.button, fromElement = original.fromElement;
        return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), !event.relatedTarget && fromElement && (event.relatedTarget = fromElement === event.target ? original.toElement : fromElement), event.which || button === undefined || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), event;
      }
    },
    fix: function (event) {
      if (event[jQuery.expando])
        return event;
      var i, prop, originalEvent = event, fixHook = jQuery.event.fixHooks[event.type] || {}, copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
      for (event = jQuery.Event(originalEvent), i = copy.length; i;)
        prop = copy[--i], event[prop] = originalEvent[prop];
      return event.target || (event.target = originalEvent.srcElement || document), 3 === event.target.nodeType && (event.target = event.target.parentNode), event.metaKey = !!event.metaKey, fixHook.filter ? fixHook.filter(event, originalEvent) : event;
    },
    special: {
      load: { noBubble: !0 },
      focus: { delegateType: 'focusin' },
      blur: { delegateType: 'focusout' },
      beforeunload: {
        setup: function (data, namespaces, eventHandle) {
          jQuery.isWindow(this) && (this.onbeforeunload = eventHandle);
        },
        teardown: function (namespaces, eventHandle) {
          this.onbeforeunload === eventHandle && (this.onbeforeunload = null);
        }
      }
    },
    simulate: function (type, elem, event, bubble) {
      var e = jQuery.extend(new jQuery.Event(), event, {
          type: type,
          isSimulated: !0,
          originalEvent: {}
        });
      bubble ? jQuery.event.trigger(e, null, elem) : jQuery.event.dispatch.call(elem, e), e.isDefaultPrevented() && event.preventDefault();
    }
  }, jQuery.event.handle = jQuery.event.dispatch, jQuery.removeEvent = document.removeEventListener ? function (elem, type, handle) {
    elem.removeEventListener && elem.removeEventListener(type, handle, !1);
  } : function (elem, type, handle) {
    var name = 'on' + type;
    elem.detachEvent && ('undefined' == typeof elem[name] && (elem[name] = null), elem.detachEvent(name, handle));
  }, jQuery.Event = function (src, props) {
    return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || src.returnValue === !1 || src.getPreventDefault && src.getPreventDefault() ? returnTrue : returnFalse) : this.type = src, props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), void (this[jQuery.expando] = !0)) : new jQuery.Event(src, props);
  }, jQuery.Event.prototype = {
    preventDefault: function () {
      this.isDefaultPrevented = returnTrue;
      var e = this.originalEvent;
      e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
    },
    stopPropagation: function () {
      this.isPropagationStopped = returnTrue;
      var e = this.originalEvent;
      e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0);
    },
    stopImmediatePropagation: function () {
      this.isImmediatePropagationStopped = returnTrue, this.stopPropagation();
    },
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse
  }, jQuery.each({
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  }, function (orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function (event) {
        {
          var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
          handleObj.selector;
        }
        return (!related || related !== target && !jQuery.contains(target, related)) && (event.type = handleObj.origType, ret = handleObj.handler.apply(this, arguments), event.type = fix), ret;
      }
    };
  }), jQuery.support.submitBubbles || (jQuery.event.special.submit = {
    setup: function () {
      return jQuery.nodeName(this, 'form') ? !1 : void jQuery.event.add(this, 'click._submit keypress._submit', function (e) {
        var elem = e.target, form = jQuery.nodeName(elem, 'input') || jQuery.nodeName(elem, 'button') ? elem.form : undefined;
        form && !jQuery._data(form, '_submit_attached') && (jQuery.event.add(form, 'submit._submit', function (event) {
          event._submit_bubble = !0;
        }), jQuery._data(form, '_submit_attached', !0));
      });
    },
    postDispatch: function (event) {
      event._submit_bubble && (delete event._submit_bubble, this.parentNode && !event.isTrigger && jQuery.event.simulate('submit', this.parentNode, event, !0));
    },
    teardown: function () {
      return jQuery.nodeName(this, 'form') ? !1 : void jQuery.event.remove(this, '._submit');
    }
  }), jQuery.support.changeBubbles || (jQuery.event.special.change = {
    setup: function () {
      return rformElems.test(this.nodeName) ? (('checkbox' === this.type || 'radio' === this.type) && (jQuery.event.add(this, 'propertychange._change', function (event) {
        'checked' === event.originalEvent.propertyName && (this._just_changed = !0);
      }), jQuery.event.add(this, 'click._change', function (event) {
        this._just_changed && !event.isTrigger && (this._just_changed = !1), jQuery.event.simulate('change', this, event, !0);
      })), !1) : void jQuery.event.add(this, 'beforeactivate._change', function (e) {
        var elem = e.target;
        rformElems.test(elem.nodeName) && !jQuery._data(elem, '_change_attached') && (jQuery.event.add(elem, 'change._change', function (event) {
          !this.parentNode || event.isSimulated || event.isTrigger || jQuery.event.simulate('change', this.parentNode, event, !0);
        }), jQuery._data(elem, '_change_attached', !0));
      });
    },
    handle: function (event) {
      var elem = event.target;
      return this !== elem || event.isSimulated || event.isTrigger || 'radio' !== elem.type && 'checkbox' !== elem.type ? event.handleObj.handler.apply(this, arguments) : void 0;
    },
    teardown: function () {
      return jQuery.event.remove(this, '._change'), !rformElems.test(this.nodeName);
    }
  }), jQuery.support.focusinBubbles || jQuery.each({
    focus: 'focusin',
    blur: 'focusout'
  }, function (orig, fix) {
    var attaches = 0, handler = function (event) {
        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0);
      };
    jQuery.event.special[fix] = {
      setup: function () {
        0 === attaches++ && document.addEventListener(orig, handler, !0);
      },
      teardown: function () {
        0 === --attaches && document.removeEventListener(orig, handler, !0);
      }
    };
  }), jQuery.fn.extend({
    on: function (types, selector, data, fn, one) {
      var origFn, type;
      if ('object' == typeof types) {
        'string' != typeof selector && (data = data || selector, selector = undefined);
        for (type in types)
          this.on(type, selector, data, types[type], one);
        return this;
      }
      if (null == data && null == fn ? (fn = selector, data = selector = undefined) : null == fn && ('string' == typeof selector ? (fn = data, data = undefined) : (fn = data, data = selector, selector = undefined)), fn === !1)
        fn = returnFalse;
      else if (!fn)
        return this;
      return 1 === one && (origFn = fn, fn = function (event) {
        return jQuery().off(event), origFn.apply(this, arguments);
      }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), this.each(function () {
        jQuery.event.add(this, types, fn, data, selector);
      });
    },
    one: function (types, selector, data, fn) {
      return this.on(types, selector, data, fn, 1);
    },
    off: function (types, selector, fn) {
      var handleObj, type;
      if (types && types.preventDefault && types.handleObj)
        return handleObj = types.handleObj, jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + '.' + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), this;
      if ('object' == typeof types) {
        for (type in types)
          this.off(type, selector, types[type]);
        return this;
      }
      return (selector === !1 || 'function' == typeof selector) && (fn = selector, selector = undefined), fn === !1 && (fn = returnFalse), this.each(function () {
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
      return jQuery(this.context).on(types, this.selector, data, fn), this;
    },
    die: function (types, fn) {
      return jQuery(this.context).off(types, this.selector || '**', fn), this;
    },
    delegate: function (selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function (selector, types, fn) {
      return 1 === arguments.length ? this.off(selector, '**') : this.off(types, selector || '**', fn);
    },
    trigger: function (type, data) {
      return this.each(function () {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function (type, data) {
      return this[0] ? jQuery.event.trigger(type, data, this[0], !0) : void 0;
    },
    toggle: function (fn) {
      var args = arguments, guid = fn.guid || jQuery.guid++, i = 0, toggler = function (event) {
          var lastToggle = (jQuery._data(this, 'lastToggle' + fn.guid) || 0) % i;
          return jQuery._data(this, 'lastToggle' + fn.guid, lastToggle + 1), event.preventDefault(), args[lastToggle].apply(this, arguments) || !1;
        };
      for (toggler.guid = guid; i < args.length;)
        args[i++].guid = guid;
      return this.click(toggler);
    },
    hover: function (fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    }
  }), jQuery.each('blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu'.split(' '), function (i, name) {
    jQuery.fn[name] = function (data, fn) {
      return null == fn && (fn = data, data = null), arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
    }, rkeyEvent.test(name) && (jQuery.event.fixHooks[name] = jQuery.event.keyHooks), rmouseEvent.test(name) && (jQuery.event.fixHooks[name] = jQuery.event.mouseHooks);
  }), function (window, undefined) {
    function Sizzle(selector, context, results, seed) {
      results = results || [], context = context || document;
      var match, elem, xml, m, nodeType = context.nodeType;
      if (!selector || 'string' != typeof selector)
        return results;
      if (1 !== nodeType && 9 !== nodeType)
        return [];
      if (xml = isXML(context), !xml && !seed && (match = rquickExpr.exec(selector)))
        if (m = match[1]) {
          if (9 === nodeType) {
            if (elem = context.getElementById(m), !elem || !elem.parentNode)
              return results;
            if (elem.id === m)
              return results.push(elem), results;
          } else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m)
            return results.push(elem), results;
        } else {
          if (match[2])
            return push.apply(results, slice.call(context.getElementsByTagName(selector), 0)), results;
          if ((m = match[3]) && assertUsableClassName && context.getElementsByClassName)
            return push.apply(results, slice.call(context.getElementsByClassName(m), 0)), results;
        }
      return select(selector.replace(rtrim, '$1'), context, results, seed, xml);
    }
    function createInputPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return 'input' === name && elem.type === type;
      };
    }
    function createButtonPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return ('input' === name || 'button' === name) && elem.type === type;
      };
    }
    function createPositionalPseudo(fn) {
      return markFunction(function (argument) {
        return argument = +argument, markFunction(function (seed, matches) {
          for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--;)
            seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]));
        });
      });
    }
    function siblingCheck(a, b, ret) {
      if (a === b)
        return ret;
      for (var cur = a.nextSibling; cur;) {
        if (cur === b)
          return -1;
        cur = cur.nextSibling;
      }
      return 1;
    }
    function tokenize(selector, parseOnly) {
      var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[expando][selector + ' '];
      if (cached)
        return parseOnly ? 0 : cached.slice(0);
      for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar;) {
        (!matched || (match = rcomma.exec(soFar))) && (match && (soFar = soFar.slice(match[0].length) || soFar), groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (tokens.push(matched = new Token(match.shift())), soFar = soFar.slice(matched.length), matched.type = match[0].replace(rtrim, ' '));
        for (type in Expr.filter)
          !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (tokens.push(matched = new Token(match.shift())), soFar = soFar.slice(matched.length), matched.type = type, matched.matches = match);
        if (!matched)
          break;
      }
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
    }
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir, checkNonElements = base && 'parentNode' === combinator.dir, doneName = done++;
      return combinator.first ? function (elem, context, xml) {
        for (; elem = elem[dir];)
          if (checkNonElements || 1 === elem.nodeType)
            return matcher(elem, context, xml);
      } : function (elem, context, xml) {
        if (xml) {
          for (; elem = elem[dir];)
            if ((checkNonElements || 1 === elem.nodeType) && matcher(elem, context, xml))
              return elem;
        } else
          for (var cache, dirkey = dirruns + ' ' + doneName + ' ', cachedkey = dirkey + cachedruns; elem = elem[dir];)
            if (checkNonElements || 1 === elem.nodeType) {
              if ((cache = elem[expando]) === cachedkey)
                return elem.sizset;
              if ('string' == typeof cache && 0 === cache.indexOf(dirkey)) {
                if (elem.sizset)
                  return elem;
              } else {
                if (elem[expando] = cachedkey, matcher(elem, context, xml))
                  return elem.sizset = !0, elem;
                elem.sizset = !1;
              }
            }
      };
    }
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function (elem, context, xml) {
        for (var i = matchers.length; i--;)
          if (!matchers[i](elem, context, xml))
            return !1;
        return !0;
      } : matchers[0];
    }
    function condense(unmatched, map, filter, context, xml) {
      for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; len > i; i++)
        (elem = unmatched[i]) && (!filter || filter(elem, context, xml)) && (newUnmatched.push(elem), mapped && map.push(i));
      return newUnmatched;
    }
    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), markFunction(function (seed, results, context, xml) {
        var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || '*', context.nodeType ? [context] : context, []), matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml), matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
        if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter)
          for (temp = condense(matcherOut, postMap), postFilter(temp, [], context, xml), i = temp.length; i--;)
            (elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              for (temp = [], i = matcherOut.length; i--;)
                (elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
              postFinder(null, matcherOut = [], temp, xml);
            }
            for (i = matcherOut.length; i--;)
              (elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem));
          }
        } else
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut);
      });
    }
    function matcherFromTokens(tokens) {
      for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[' '], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function (elem) {
            return elem === checkContext;
          }, implicitRelative, !0), matchAnyContext = addCombinator(function (elem) {
            return indexOf.call(checkContext, elem) > -1;
          }, implicitRelative, !0), matchers = [function (elem, context, xml) {
              return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
            }]; len > i; i++)
        if (matcher = Expr.relative[tokens[i].type])
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        else {
          if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
            for (j = ++i; len > j && !Expr.relative[tokens[j].type]; j++);
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && tokens.slice(0, i - 1).join('').replace(rtrim, '$1'), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), len > j && matcherFromTokens(tokens = tokens.slice(j)), len > j && tokens.join(''));
          }
          matchers.push(matcher);
        }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function (seed, context, xml, results, expandContext) {
          var elem, j, matcher, setMatched = [], matchedCount = 0, i = '0', unmatched = seed && [], outermost = null != expandContext, contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG('*', expandContext && context.parentNode || context), dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.E;
          for (outermost && (outermostContext = context !== document && context, cachedruns = superMatcher.el); null != (elem = elems[i]); i++) {
            if (byElement && elem) {
              for (j = 0; matcher = elementMatchers[j]; j++)
                if (matcher(elem, context, xml)) {
                  results.push(elem);
                  break;
                }
              outermost && (dirruns = dirrunsUnique, cachedruns = ++superMatcher.el);
            }
            bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem));
          }
          if (matchedCount += i, bySet && i !== matchedCount) {
            for (j = 0; matcher = setMatchers[j]; j++)
              matcher(unmatched, setMatched, context, xml);
            if (seed) {
              if (matchedCount > 0)
                for (; i--;)
                  unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
              setMatched = condense(setMatched);
            }
            push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results);
          }
          return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), unmatched;
        };
      return superMatcher.el = 0, bySet ? markFunction(superMatcher) : superMatcher;
    }
    function multipleContexts(selector, contexts, results) {
      for (var i = 0, len = contexts.length; len > i; i++)
        Sizzle(selector, contexts[i], results);
      return results;
    }
    function select(selector, context, results, seed, xml) {
      {
        var i, tokens, token, type, find, match = tokenize(selector);
        match.length;
      }
      if (!seed && 1 === match.length) {
        if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && 'ID' === (token = tokens[0]).type && 9 === context.nodeType && !xml && Expr.relative[tokens[1].type]) {
          if (context = Expr.find.ID(token.matches[0].replace(rbackslash, ''), context, xml)[0], !context)
            return results;
          selector = selector.slice(tokens.shift().length);
        }
        for (i = matchExpr.POS.test(selector) ? -1 : tokens.length - 1; i >= 0 && (token = tokens[i], !Expr.relative[type = token.type]); i--)
          if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(rbackslash, ''), rsibling.test(tokens[0].type) && context.parentNode || context, xml))) {
            if (tokens.splice(i, 1), selector = seed.length && tokens.join(''), !selector)
              return push.apply(results, slice.call(seed, 0)), results;
            break;
          }
      }
      return compile(selector, match)(seed, context, xml, results, rsibling.test(selector)), results;
    }
    function setFilters() {
    }
    var cachedruns, assertGetIdNotName, Expr, getText, isXML, contains, compile, sortOrder, hasDuplicate, outermostContext, baseHasDuplicate = !0, strundefined = 'undefined', expando = ('sizcache' + Math.random()).replace('.', ''), Token = String, document = window.document, docElem = document.documentElement, dirruns = 0, done = 0, pop = [].pop, push = [].push, slice = [].slice, indexOf = [].indexOf || function (elem) {
        for (var i = 0, len = this.length; len > i; i++)
          if (this[i] === elem)
            return i;
        return -1;
      }, markFunction = function (fn, value) {
        return fn[expando] = null == value || value, fn;
      }, createCache = function () {
        var cache = {}, keys = [];
        return markFunction(function (key, value) {
          return keys.push(key) > Expr.cacheLength && delete cache[keys.shift()], cache[key + ' '] = value;
        }, cache);
      }, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), whitespace = '[\\x20\\t\\r\\n\\f]', characterEncoding = '(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+', identifier = characterEncoding.replace('w', 'w#'), operators = '([*^$|!~]?=)', attributes = '\\[' + whitespace + '*(' + characterEncoding + ')' + whitespace + '*(?:' + operators + whitespace + '*(?:([\'"])((?:\\\\.|[^\\\\])*?)\\3|(' + identifier + ')|)|)' + whitespace + '*\\]', pseudos = ':(' + characterEncoding + ')(?:\\((?:([\'"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:' + attributes + ')|[^:]|\\\\.)*|.*))\\)|)', pos = ':(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + whitespace + '*((?:-\\d)?\\d*)' + whitespace + '*\\)|)(?=[^-]|$)', rtrim = new RegExp('^' + whitespace + '+|((?:^|[^\\\\])(?:\\\\.)*)' + whitespace + '+$', 'g'), rcomma = new RegExp('^' + whitespace + '*,' + whitespace + '*'), rcombinators = new RegExp('^' + whitespace + '*([\\x20\\t\\r\\n\\f>+~])' + whitespace + '*'), rpseudo = new RegExp(pseudos), rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, rsibling = /[\x20\t\r\n\f]*[+~]/, rheader = /h\d/i, rinputs = /input|select|textarea|button/i, rbackslash = /\\(?!\\)/g, matchExpr = {
        ID: new RegExp('^#(' + characterEncoding + ')'),
        CLASS: new RegExp('^\\.(' + characterEncoding + ')'),
        NAME: new RegExp('^\\[name=[\'"]?(' + characterEncoding + ')[\'"]?\\]'),
        TAG: new RegExp('^(' + characterEncoding.replace('w', 'w*') + ')'),
        ATTR: new RegExp('^' + attributes),
        PSEUDO: new RegExp('^' + pseudos),
        POS: new RegExp(pos, 'i'),
        CHILD: new RegExp('^:(only|nth|first|last)-child(?:\\(' + whitespace + '*(even|odd|(([+-]|)(\\d*)n|)' + whitespace + '*(?:([+-]|)' + whitespace + '*(\\d+)|))' + whitespace + '*\\)|)', 'i'),
        needsContext: new RegExp('^' + whitespace + '*[>+~]|' + pos, 'i')
      }, assert = function (fn) {
        var div = document.createElement('div');
        try {
          return fn(div);
        } catch (e) {
          return !1;
        } finally {
          div = null;
        }
      }, assertTagNameNoComments = assert(function (div) {
        return div.appendChild(document.createComment('')), !div.getElementsByTagName('*').length;
      }), assertHrefNotNormalized = assert(function (div) {
        return div.innerHTML = '<a href=\'#\'></a>', div.firstChild && typeof div.firstChild.getAttribute !== strundefined && '#' === div.firstChild.getAttribute('href');
      }), assertAttributes = assert(function (div) {
        div.innerHTML = '<select></select>';
        var type = typeof div.lastChild.getAttribute('multiple');
        return 'boolean' !== type && 'string' !== type;
      }), assertUsableClassName = assert(function (div) {
        return div.innerHTML = '<div class=\'hidden e\'></div><div class=\'hidden\'></div>', div.getElementsByClassName && div.getElementsByClassName('e').length ? (div.lastChild.className = 'e', 2 === div.getElementsByClassName('e').length) : !1;
      }), assertUsableName = assert(function (div) {
        div.id = expando + 0, div.innerHTML = '<a name=\'' + expando + '\'></a><div name=\'' + expando + '\'></div>', docElem.insertBefore(div, docElem.firstChild);
        var pass = document.getElementsByName && document.getElementsByName(expando).length === 2 + document.getElementsByName(expando + 0).length;
        return assertGetIdNotName = !document.getElementById(expando), docElem.removeChild(div), pass;
      });
    try {
      slice.call(docElem.childNodes, 0)[0].nodeType;
    } catch (e) {
      slice = function (i) {
        for (var elem, results = []; elem = this[i]; i++)
          results.push(elem);
        return results;
      };
    }
    Sizzle.matches = function (expr, elements) {
      return Sizzle(expr, null, null, elements);
    }, Sizzle.matchesSelector = function (elem, expr) {
      return Sizzle(expr, null, null, [elem]).length > 0;
    }, getText = Sizzle.getText = function (elem) {
      var node, ret = '', i = 0, nodeType = elem.nodeType;
      if (nodeType) {
        if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
          if ('string' == typeof elem.textContent)
            return elem.textContent;
          for (elem = elem.firstChild; elem; elem = elem.nextSibling)
            ret += getText(elem);
        } else if (3 === nodeType || 4 === nodeType)
          return elem.nodeValue;
      } else
        for (; node = elem[i]; i++)
          ret += getText(node);
      return ret;
    }, isXML = Sizzle.isXML = function (elem) {
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? 'HTML' !== documentElement.nodeName : !1;
    }, contains = Sizzle.contains = docElem.contains ? function (a, b) {
      var adown = 9 === a.nodeType ? a.documentElement : a, bup = b && b.parentNode;
      return a === bup || !!(bup && 1 === bup.nodeType && adown.contains && adown.contains(bup));
    } : docElem.compareDocumentPosition ? function (a, b) {
      return b && !!(16 & a.compareDocumentPosition(b));
    } : function (a, b) {
      for (; b = b.parentNode;)
        if (b === a)
          return !0;
      return !1;
    }, Sizzle.attr = function (elem, name) {
      var val, xml = isXML(elem);
      return xml || (name = name.toLowerCase()), (val = Expr.attrHandle[name]) ? val(elem) : xml || assertAttributes ? elem.getAttribute(name) : (val = elem.getAttributeNode(name), val ? 'boolean' == typeof elem[name] ? elem[name] ? name : null : val.specified ? val.value : null : null);
    }, Expr = Sizzle.selectors = {
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: assertHrefNotNormalized ? {} : {
        href: function (elem) {
          return elem.getAttribute('href', 2);
        },
        type: function (elem) {
          return elem.getAttribute('type');
        }
      },
      find: {
        ID: assertGetIdNotName ? function (id, context, xml) {
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
        TAG: assertTagNameNoComments ? function (tag, context) {
          return typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag) : void 0;
        } : function (tag, context) {
          var results = context.getElementsByTagName(tag);
          if ('*' === tag) {
            for (var elem, tmp = [], i = 0; elem = results[i]; i++)
              1 === elem.nodeType && tmp.push(elem);
            return tmp;
          }
          return results;
        },
        NAME: assertUsableName && function (tag, context) {
          return typeof context.getElementsByName !== strundefined ? context.getElementsByName(name) : void 0;
        },
        CLASS: assertUsableClassName && function (className, context, xml) {
          return typeof context.getElementsByClassName === strundefined || xml ? void 0 : context.getElementsByClassName(className);
        }
      },
      relative: {
        '>': {
          dir: 'parentNode',
          first: !0
        },
        ' ': { dir: 'parentNode' },
        '+': {
          dir: 'previousSibling',
          first: !0
        },
        '~': { dir: 'previousSibling' }
      },
      preFilter: {
        ATTR: function (match) {
          return match[1] = match[1].replace(rbackslash, ''), match[3] = (match[4] || match[5] || '').replace(rbackslash, ''), '~=' === match[2] && (match[3] = ' ' + match[3] + ' '), match.slice(0, 4);
        },
        CHILD: function (match) {
          return match[1] = match[1].toLowerCase(), 'nth' === match[1] ? (match[2] || Sizzle.error(match[0]), match[3] = +(match[3] ? match[4] + (match[5] || 1) : 2 * ('even' === match[2] || 'odd' === match[2])), match[4] = +(match[6] + match[7] || 'odd' === match[2])) : match[2] && Sizzle.error(match[0]), match;
        },
        PSEUDO: function (match) {
          var unquoted, excess;
          return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[3] : (unquoted = match[4]) && (rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(')', unquoted.length - excess) - unquoted.length) && (unquoted = unquoted.slice(0, excess), match[0] = match[0].slice(0, excess)), match[2] = unquoted), match.slice(0, 3));
        }
      },
      filter: {
        ID: assertGetIdNotName ? function (id) {
          return id = id.replace(rbackslash, ''), function (elem) {
            return elem.getAttribute('id') === id;
          };
        } : function (id) {
          return id = id.replace(rbackslash, ''), function (elem) {
            var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode('id');
            return node && node.value === id;
          };
        },
        TAG: function (nodeName) {
          return '*' === nodeName ? function () {
            return !0;
          } : (nodeName = nodeName.replace(rbackslash, '').toLowerCase(), function (elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          });
        },
        CLASS: function (className) {
          var pattern = classCache[expando][className + ' '];
          return pattern || (pattern = new RegExp('(^|' + whitespace + ')' + className + '(' + whitespace + '|$)')) && classCache(className, function (elem) {
            return pattern.test(elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute('class') || '');
          });
        },
        ATTR: function (name, operator, check) {
          return function (elem) {
            var result = Sizzle.attr(elem, name);
            return null == result ? '!=' === operator : operator ? (result += '', '=' === operator ? result === check : '!=' === operator ? result !== check : '^=' === operator ? check && 0 === result.indexOf(check) : '*=' === operator ? check && result.indexOf(check) > -1 : '$=' === operator ? check && result.substr(result.length - check.length) === check : '~=' === operator ? (' ' + result + ' ').indexOf(check) > -1 : '|=' === operator ? result === check || result.substr(0, check.length + 1) === check + '-' : !1) : !0;
          };
        },
        CHILD: function (type, argument, first, last) {
          return 'nth' === type ? function (elem) {
            var node, diff, parent = elem.parentNode;
            if (1 === first && 0 === last)
              return !0;
            if (parent)
              for (diff = 0, node = parent.firstChild; node && (1 !== node.nodeType || (diff++, elem !== node)); node = node.nextSibling);
            return diff -= last, diff === first || diff % first === 0 && diff / first >= 0;
          } : function (elem) {
            var node = elem;
            switch (type) {
            case 'only':
            case 'first':
              for (; node = node.previousSibling;)
                if (1 === node.nodeType)
                  return !1;
              if ('first' === type)
                return !0;
              node = elem;
            case 'last':
              for (; node = node.nextSibling;)
                if (1 === node.nodeType)
                  return !1;
              return !0;
            }
          };
        },
        PSEUDO: function (pseudo, argument) {
          var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error('unsupported pseudo: ' + pseudo);
          return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [
            pseudo,
            pseudo,
            '',
            argument
          ], Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
            for (var idx, matched = fn(seed, argument), i = matched.length; i--;)
              idx = indexOf.call(seed, matched[i]), seed[idx] = !(matches[idx] = matched[i]);
          }) : function (elem) {
            return fn(elem, 0, args);
          }) : fn;
        }
      },
      pseudos: {
        not: markFunction(function (selector) {
          var input = [], results = [], matcher = compile(selector.replace(rtrim, '$1'));
          return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
            for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--;)
              (elem = unmatched[i]) && (seed[i] = !(matches[i] = elem));
          }) : function (elem, context, xml) {
            return input[0] = elem, matcher(input, null, xml, results), !results.pop();
          };
        }),
        has: markFunction(function (selector) {
          return function (elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        contains: markFunction(function (text) {
          return function (elem) {
            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
          };
        }),
        enabled: function (elem) {
          return elem.disabled === !1;
        },
        disabled: function (elem) {
          return elem.disabled === !0;
        },
        checked: function (elem) {
          var nodeName = elem.nodeName.toLowerCase();
          return 'input' === nodeName && !!elem.checked || 'option' === nodeName && !!elem.selected;
        },
        selected: function (elem) {
          return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0;
        },
        parent: function (elem) {
          return !Expr.pseudos.empty(elem);
        },
        empty: function (elem) {
          var nodeType;
          for (elem = elem.firstChild; elem;) {
            if (elem.nodeName > '@' || 3 === (nodeType = elem.nodeType) || 4 === nodeType)
              return !1;
            elem = elem.nextSibling;
          }
          return !0;
        },
        header: function (elem) {
          return rheader.test(elem.nodeName);
        },
        text: function (elem) {
          var type, attr;
          return 'input' === elem.nodeName.toLowerCase() && 'text' === (type = elem.type) && (null == (attr = elem.getAttribute('type')) || attr.toLowerCase() === type);
        },
        radio: createInputPseudo('radio'),
        checkbox: createInputPseudo('checkbox'),
        file: createInputPseudo('file'),
        password: createInputPseudo('password'),
        image: createInputPseudo('image'),
        submit: createButtonPseudo('submit'),
        reset: createButtonPseudo('reset'),
        button: function (elem) {
          var name = elem.nodeName.toLowerCase();
          return 'input' === name && 'button' === elem.type || 'button' === name;
        },
        input: function (elem) {
          return rinputs.test(elem.nodeName);
        },
        focus: function (elem) {
          var doc = elem.ownerDocument;
          return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        active: function (elem) {
          return elem === elem.ownerDocument.activeElement;
        },
        first: createPositionalPseudo(function () {
          return [0];
        }),
        last: createPositionalPseudo(function (matchIndexes, length) {
          return [length - 1];
        }),
        eq: createPositionalPseudo(function (matchIndexes, length, argument) {
          return [0 > argument ? argument + length : argument];
        }),
        even: createPositionalPseudo(function (matchIndexes, length) {
          for (var i = 0; length > i; i += 2)
            matchIndexes.push(i);
          return matchIndexes;
        }),
        odd: createPositionalPseudo(function (matchIndexes, length) {
          for (var i = 1; length > i; i += 2)
            matchIndexes.push(i);
          return matchIndexes;
        }),
        lt: createPositionalPseudo(function (matchIndexes, length, argument) {
          for (var i = 0 > argument ? argument + length : argument; --i >= 0;)
            matchIndexes.push(i);
          return matchIndexes;
        }),
        gt: createPositionalPseudo(function (matchIndexes, length, argument) {
          for (var i = 0 > argument ? argument + length : argument; ++i < length;)
            matchIndexes.push(i);
          return matchIndexes;
        })
      }
    }, sortOrder = docElem.compareDocumentPosition ? function (a, b) {
      return a === b ? (hasDuplicate = !0, 0) : (a.compareDocumentPosition && b.compareDocumentPosition ? 4 & a.compareDocumentPosition(b) : a.compareDocumentPosition) ? -1 : 1;
    } : function (a, b) {
      if (a === b)
        return hasDuplicate = !0, 0;
      if (a.sourceIndex && b.sourceIndex)
        return a.sourceIndex - b.sourceIndex;
      var al, bl, ap = [], bp = [], aup = a.parentNode, bup = b.parentNode, cur = aup;
      if (aup === bup)
        return siblingCheck(a, b);
      if (!aup)
        return -1;
      if (!bup)
        return 1;
      for (; cur;)
        ap.unshift(cur), cur = cur.parentNode;
      for (cur = bup; cur;)
        bp.unshift(cur), cur = cur.parentNode;
      al = ap.length, bl = bp.length;
      for (var i = 0; al > i && bl > i; i++)
        if (ap[i] !== bp[i])
          return siblingCheck(ap[i], bp[i]);
      return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1);
    }, [
      0,
      0
    ].sort(sortOrder), baseHasDuplicate = !hasDuplicate, Sizzle.uniqueSort = function (results) {
      var elem, duplicates = [], i = 1, j = 0;
      if (hasDuplicate = baseHasDuplicate, results.sort(sortOrder), hasDuplicate) {
        for (; elem = results[i]; i++)
          elem === results[i - 1] && (j = duplicates.push(i));
        for (; j--;)
          results.splice(duplicates[j], 1);
      }
      return results;
    }, Sizzle.error = function (msg) {
      throw new Error('Syntax error, unrecognized expression: ' + msg);
    }, compile = Sizzle.compile = function (selector, group) {
      var i, setMatchers = [], elementMatchers = [], cached = compilerCache[expando][selector + ' '];
      if (!cached) {
        for (group || (group = tokenize(selector)), i = group.length; i--;)
          cached = matcherFromTokens(group[i]), cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
      }
      return cached;
    }, document.querySelectorAll && !function () {
      var disconnectedMatch, oldSelect = select, rescape = /'|\\/g, rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, rbuggyQSA = [':focus'], rbuggyMatches = [':active'], matches = docElem.matchesSelector || docElem.mozMatchesSelector || docElem.webkitMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector;
      assert(function (div) {
        div.innerHTML = '<select><option selected=\'\'></option></select>', div.querySelectorAll('[selected]').length || rbuggyQSA.push('\\[' + whitespace + '*(?:checked|disabled|ismap|multiple|readonly|selected|value)'), div.querySelectorAll(':checked').length || rbuggyQSA.push(':checked');
      }), assert(function (div) {
        div.innerHTML = '<p test=\'\'></p>', div.querySelectorAll('[test^=\'\']').length && rbuggyQSA.push('[*^$]=' + whitespace + '*(?:""|\'\')'), div.innerHTML = '<input type=\'hidden\'/>', div.querySelectorAll(':enabled').length || rbuggyQSA.push(':enabled', ':disabled');
      }), rbuggyQSA = new RegExp(rbuggyQSA.join('|')), select = function (selector, context, results, seed, xml) {
        if (!seed && !xml && !rbuggyQSA.test(selector)) {
          var groups, i, old = !0, nid = expando, newContext = context, newSelector = 9 === context.nodeType && selector;
          if (1 === context.nodeType && 'object' !== context.nodeName.toLowerCase()) {
            for (groups = tokenize(selector), (old = context.getAttribute('id')) ? nid = old.replace(rescape, '\\$&') : context.setAttribute('id', nid), nid = '[id=\'' + nid + '\'] ', i = groups.length; i--;)
              groups[i] = nid + groups[i].join('');
            newContext = rsibling.test(selector) && context.parentNode || context, newSelector = groups.join(',');
          }
          if (newSelector)
            try {
              return push.apply(results, slice.call(newContext.querySelectorAll(newSelector), 0)), results;
            } catch (qsaError) {
            } finally {
              old || context.removeAttribute('id');
            }
        }
        return oldSelect(selector, context, results, seed, xml);
      }, matches && (assert(function (div) {
        disconnectedMatch = matches.call(div, 'div');
        try {
          matches.call(div, '[test!=\'\']:sizzle'), rbuggyMatches.push('!=', pseudos);
        } catch (e) {
        }
      }), rbuggyMatches = new RegExp(rbuggyMatches.join('|')), Sizzle.matchesSelector = function (elem, expr) {
        if (expr = expr.replace(rattributeQuotes, '=\'$1\']'), !isXML(elem) && !rbuggyMatches.test(expr) && !rbuggyQSA.test(expr))
          try {
            var ret = matches.call(elem, expr);
            if (ret || disconnectedMatch || elem.document && 11 !== elem.document.nodeType)
              return ret;
          } catch (e) {
          }
        return Sizzle(expr, null, null, [elem]).length > 0;
      });
    }(), Expr.pseudos.nth = Expr.pseudos.eq, Expr.filters = setFilters.prototype = Expr.pseudos, Expr.setFilters = new setFilters(), Sizzle.attr = jQuery.attr, jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[':'] = jQuery.expr.pseudos, jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, jQuery.contains = Sizzle.contains;
  }(window);
  var runtil = /Until$/, rparentsprev = /^(?:parents|prev(?:Until|All))/, isSimple = /^.[^:#\[\.,]*$/, rneedsContext = jQuery.expr.match.needsContext, guaranteedUnique = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
    };
  jQuery.fn.extend({
    find: function (selector) {
      var i, l, length, n, r, ret, self = this;
      if ('string' != typeof selector)
        return jQuery(selector).filter(function () {
          for (i = 0, l = self.length; l > i; i++)
            if (jQuery.contains(self[i], this))
              return !0;
        });
      for (ret = this.pushStack('', 'find', selector), i = 0, l = this.length; l > i; i++)
        if (length = ret.length, jQuery.find(selector, this[i], ret), i > 0)
          for (n = length; n < ret.length; n++)
            for (r = 0; length > r; r++)
              if (ret[r] === ret[n]) {
                ret.splice(n--, 1);
                break;
              }
      return ret;
    },
    has: function (target) {
      var i, targets = jQuery(target, this), len = targets.length;
      return this.filter(function () {
        for (i = 0; len > i; i++)
          if (jQuery.contains(this, targets[i]))
            return !0;
      });
    },
    not: function (selector) {
      return this.pushStack(winnow(this, selector, !1), 'not', selector);
    },
    filter: function (selector) {
      return this.pushStack(winnow(this, selector, !0), 'filter', selector);
    },
    is: function (selector) {
      return !!selector && ('string' == typeof selector ? rneedsContext.test(selector) ? jQuery(selector, this.context).index(this[0]) >= 0 : jQuery.filter(selector, this).length > 0 : this.filter(selector).length > 0);
    },
    closest: function (selectors, context) {
      for (var cur, i = 0, l = this.length, ret = [], pos = rneedsContext.test(selectors) || 'string' != typeof selectors ? jQuery(selectors, context || this.context) : 0; l > i; i++)
        for (cur = this[i]; cur && cur.ownerDocument && cur !== context && 11 !== cur.nodeType;) {
          if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) {
            ret.push(cur);
            break;
          }
          cur = cur.parentNode;
        }
      return ret = ret.length > 1 ? jQuery.unique(ret) : ret, this.pushStack(ret, 'closest', selectors);
    },
    index: function (elem) {
      return elem ? 'string' == typeof elem ? jQuery.inArray(this[0], jQuery(elem)) : jQuery.inArray(elem.jquery ? elem[0] : elem, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1;
    },
    add: function (selector, context) {
      var set = 'string' == typeof selector ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector), all = jQuery.merge(this.get(), set);
      return this.pushStack(isDisconnected(set[0]) || isDisconnected(all[0]) ? all : jQuery.unique(all));
    },
    addBack: function (selector) {
      return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
    }
  }), jQuery.fn.andSelf = jQuery.fn.addBack, jQuery.each({
    parent: function (elem) {
      var parent = elem.parentNode;
      return parent && 11 !== parent.nodeType ? parent : null;
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
      return runtil.test(name) || (selector = until), selector && 'string' == typeof selector && (ret = jQuery.filter(selector, ret)), ret = this.length > 1 && !guaranteedUnique[name] ? jQuery.unique(ret) : ret, this.length > 1 && rparentsprev.test(name) && (ret = ret.reverse()), this.pushStack(ret, name, core_slice.call(arguments).join(','));
    };
  }), jQuery.extend({
    filter: function (expr, elems, not) {
      return not && (expr = ':not(' + expr + ')'), 1 === elems.length ? jQuery.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] : jQuery.find.matches(expr, elems);
    },
    dir: function (elem, dir, until) {
      for (var matched = [], cur = elem[dir]; cur && 9 !== cur.nodeType && (until === undefined || 1 !== cur.nodeType || !jQuery(cur).is(until));)
        1 === cur.nodeType && matched.push(cur), cur = cur[dir];
      return matched;
    },
    sibling: function (n, elem) {
      for (var r = []; n; n = n.nextSibling)
        1 === n.nodeType && n !== elem && r.push(n);
      return r;
    }
  });
  var nodeNames = 'abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video', rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g, rleadingWhitespace = /^\s+/, rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rtbody = /<tbody/i, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, rnocache = /<(?:script|object|embed|option|style)/i, rnoshimcache = new RegExp('<(?:' + nodeNames + ')[\\s/>]', 'i'), rcheckableType = /^(?:checkbox|radio)$/, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /\/(java|ecma)script/i, rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g, wrapMap = {
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
  wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, wrapMap.th = wrapMap.td, jQuery.support.htmlSerialize || (wrapMap._default = [
    1,
    'X<div>',
    '</div>'
  ]), jQuery.fn.extend({
    text: function (value) {
      return jQuery.access(this, function (value) {
        return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
      }, null, value, arguments.length);
    },
    wrapAll: function (html) {
      if (jQuery.isFunction(html))
        return this.each(function (i) {
          jQuery(this).wrapAll(html.call(this, i));
        });
      if (this[0]) {
        var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0);
        this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function () {
          for (var elem = this; elem.firstChild && 1 === elem.firstChild.nodeType;)
            elem = elem.firstChild;
          return elem;
        }).append(this);
      }
      return this;
    },
    wrapInner: function (html) {
      return this.each(jQuery.isFunction(html) ? function (i) {
        jQuery(this).wrapInner(html.call(this, i));
      } : function () {
        var self = jQuery(this), contents = self.contents();
        contents.length ? contents.wrapAll(html) : self.append(html);
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
        jQuery.nodeName(this, 'body') || jQuery(this).replaceWith(this.childNodes);
      }).end();
    },
    append: function () {
      return this.domManip(arguments, !0, function (elem) {
        (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(elem);
      });
    },
    prepend: function () {
      return this.domManip(arguments, !0, function (elem) {
        (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(elem, this.firstChild);
      });
    },
    before: function () {
      if (!isDisconnected(this[0]))
        return this.domManip(arguments, !1, function (elem) {
          this.parentNode.insertBefore(elem, this);
        });
      if (arguments.length) {
        var set = jQuery.clean(arguments);
        return this.pushStack(jQuery.merge(set, this), 'before', this.selector);
      }
    },
    after: function () {
      if (!isDisconnected(this[0]))
        return this.domManip(arguments, !1, function (elem) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        });
      if (arguments.length) {
        var set = jQuery.clean(arguments);
        return this.pushStack(jQuery.merge(this, set), 'after', this.selector);
      }
    },
    remove: function (selector, keepData) {
      for (var elem, i = 0; null != (elem = this[i]); i++)
        (!selector || jQuery.filter(selector, [elem]).length) && (keepData || 1 !== elem.nodeType || (jQuery.cleanData(elem.getElementsByTagName('*')), jQuery.cleanData([elem])), elem.parentNode && elem.parentNode.removeChild(elem));
      return this;
    },
    empty: function () {
      for (var elem, i = 0; null != (elem = this[i]); i++)
        for (1 === elem.nodeType && jQuery.cleanData(elem.getElementsByTagName('*')); elem.firstChild;)
          elem.removeChild(elem.firstChild);
      return this;
    },
    clone: function (dataAndEvents, deepDataAndEvents) {
      return dataAndEvents = null == dataAndEvents ? !1 : dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, this.map(function () {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function (value) {
      return jQuery.access(this, function (value) {
        var elem = this[0] || {}, i = 0, l = this.length;
        if (value === undefined)
          return 1 === elem.nodeType ? elem.innerHTML.replace(rinlinejQuery, '') : undefined;
        if (!('string' != typeof value || rnoInnerhtml.test(value) || !jQuery.support.htmlSerialize && rnoshimcache.test(value) || !jQuery.support.leadingWhitespace && rleadingWhitespace.test(value) || wrapMap[(rtagName.exec(value) || [
            '',
            ''
          ])[1].toLowerCase()])) {
          value = value.replace(rxhtmlTag, '<$1></$2>');
          try {
            for (; l > i; i++)
              elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(elem.getElementsByTagName('*')), elem.innerHTML = value);
            elem = 0;
          } catch (e) {
          }
        }
        elem && this.empty().append(value);
      }, null, value, arguments.length);
    },
    replaceWith: function (value) {
      return isDisconnected(this[0]) ? this.length ? this.pushStack(jQuery(jQuery.isFunction(value) ? value() : value), 'replaceWith', value) : this : jQuery.isFunction(value) ? this.each(function (i) {
        var self = jQuery(this), old = self.html();
        self.replaceWith(value.call(this, i, old));
      }) : ('string' != typeof value && (value = jQuery(value).detach()), this.each(function () {
        var next = this.nextSibling, parent = this.parentNode;
        jQuery(this).remove(), next ? jQuery(next).before(value) : jQuery(parent).append(value);
      }));
    },
    detach: function (selector) {
      return this.remove(selector, !0);
    },
    domManip: function (args, table, callback) {
      args = [].concat.apply([], args);
      var results, first, fragment, iNoClone, i = 0, value = args[0], scripts = [], l = this.length;
      if (!jQuery.support.checkClone && l > 1 && 'string' == typeof value && rchecked.test(value))
        return this.each(function () {
          jQuery(this).domManip(args, table, callback);
        });
      if (jQuery.isFunction(value))
        return this.each(function (i) {
          var self = jQuery(this);
          args[0] = value.call(this, i, table ? self.html() : undefined), self.domManip(args, table, callback);
        });
      if (this[0]) {
        if (results = jQuery.buildFragment(args, this, scripts), fragment = results.fragment, first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), first)
          for (table = table && jQuery.nodeName(first, 'tr'), iNoClone = results.cacheable || l - 1; l > i; i++)
            callback.call(table && jQuery.nodeName(this[i], 'table') ? findOrAppend(this[i], 'tbody') : this[i], i === iNoClone ? fragment : jQuery.clone(fragment, !0, !0));
        fragment = first = null, scripts.length && jQuery.each(scripts, function (i, elem) {
          elem.src ? jQuery.ajax ? jQuery.ajax({
            url: elem.src,
            type: 'GET',
            dataType: 'script',
            async: !1,
            global: !1,
            'throws': !0
          }) : jQuery.error('no ajax') : jQuery.globalEval((elem.text || elem.textContent || elem.innerHTML || '').replace(rcleanScript, '')), elem.parentNode && elem.parentNode.removeChild(elem);
        });
      }
      return this;
    }
  }), jQuery.buildFragment = function (args, context, scripts) {
    var fragment, cacheable, cachehit, first = args[0];
    return context = context || document, context = !context.nodeType && context[0] || context, context = context.ownerDocument || context, !(1 === args.length && 'string' == typeof first && first.length < 512 && context === document && '<' === first.charAt(0)) || rnocache.test(first) || !jQuery.support.checkClone && rchecked.test(first) || !jQuery.support.html5Clone && rnoshimcache.test(first) || (cacheable = !0, fragment = jQuery.fragments[first], cachehit = fragment !== undefined), fragment || (fragment = context.createDocumentFragment(), jQuery.clean(args, context, fragment, scripts), cacheable && (jQuery.fragments[first] = cachehit && fragment)), {
      fragment: fragment,
      cacheable: cacheable
    };
  }, jQuery.fragments = {}, jQuery.each({
    appendTo: 'append',
    prependTo: 'prepend',
    insertBefore: 'before',
    insertAfter: 'after',
    replaceAll: 'replaceWith'
  }, function (name, original) {
    jQuery.fn[name] = function (selector) {
      var elems, i = 0, ret = [], insert = jQuery(selector), l = insert.length, parent = 1 === this.length && this[0].parentNode;
      if ((null == parent || parent && 11 === parent.nodeType && 1 === parent.childNodes.length) && 1 === l)
        return insert[original](this[0]), this;
      for (; l > i; i++)
        elems = (i > 0 ? this.clone(!0) : this).get(), jQuery(insert[i])[original](elems), ret = ret.concat(elems);
      return this.pushStack(ret, name, insert.selector);
    };
  }), jQuery.extend({
    clone: function (elem, dataAndEvents, deepDataAndEvents) {
      var srcElements, destElements, i, clone;
      if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test('<' + elem.nodeName + '>') ? clone = elem.cloneNode(!0) : (fragmentDiv.innerHTML = elem.outerHTML, fragmentDiv.removeChild(clone = fragmentDiv.firstChild)), !(jQuery.support.noCloneEvent && jQuery.support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem)))
        for (cloneFixAttributes(elem, clone), srcElements = getAll(elem), destElements = getAll(clone), i = 0; srcElements[i]; ++i)
          destElements[i] && cloneFixAttributes(srcElements[i], destElements[i]);
      if (dataAndEvents && (cloneCopyEvent(elem, clone), deepDataAndEvents))
        for (srcElements = getAll(elem), destElements = getAll(clone), i = 0; srcElements[i]; ++i)
          cloneCopyEvent(srcElements[i], destElements[i]);
      return srcElements = destElements = null, clone;
    },
    clean: function (elems, context, fragment, scripts) {
      var i, j, elem, tag, wrap, depth, div, hasBody, tbody, handleScript, jsTags, safe = context === document && safeFragment, ret = [];
      for (context && 'undefined' != typeof context.createDocumentFragment || (context = document), i = 0; null != (elem = elems[i]); i++)
        if ('number' == typeof elem && (elem += ''), elem) {
          if ('string' == typeof elem)
            if (rhtml.test(elem)) {
              for (safe = safe || createSafeFragment(context), div = context.createElement('div'), safe.appendChild(div), elem = elem.replace(rxhtmlTag, '<$1></$2>'), tag = (rtagName.exec(elem) || [
                  '',
                  ''
                ])[1].toLowerCase(), wrap = wrapMap[tag] || wrapMap._default, depth = wrap[0], div.innerHTML = wrap[1] + elem + wrap[2]; depth--;)
                div = div.lastChild;
              if (!jQuery.support.tbody)
                for (hasBody = rtbody.test(elem), tbody = 'table' !== tag || hasBody ? '<table>' !== wrap[1] || hasBody ? [] : div.childNodes : div.firstChild && div.firstChild.childNodes, j = tbody.length - 1; j >= 0; --j)
                  jQuery.nodeName(tbody[j], 'tbody') && !tbody[j].childNodes.length && tbody[j].parentNode.removeChild(tbody[j]);
              !jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem) && div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]), div.firstChild), elem = div.childNodes, div.parentNode.removeChild(div);
            } else
              elem = context.createTextNode(elem);
          elem.nodeType ? ret.push(elem) : jQuery.merge(ret, elem);
        }
      if (div && (elem = div = safe = null), !jQuery.support.appendChecked)
        for (i = 0; null != (elem = ret[i]); i++)
          jQuery.nodeName(elem, 'input') ? fixDefaultChecked(elem) : 'undefined' != typeof elem.getElementsByTagName && jQuery.grep(elem.getElementsByTagName('input'), fixDefaultChecked);
      if (fragment)
        for (handleScript = function (elem) {
            return !elem.type || rscriptType.test(elem.type) ? scripts ? scripts.push(elem.parentNode ? elem.parentNode.removeChild(elem) : elem) : fragment.appendChild(elem) : void 0;
          }, i = 0; null != (elem = ret[i]); i++)
          jQuery.nodeName(elem, 'script') && handleScript(elem) || (fragment.appendChild(elem), 'undefined' != typeof elem.getElementsByTagName && (jsTags = jQuery.grep(jQuery.merge([], elem.getElementsByTagName('script')), handleScript), ret.splice.apply(ret, [
            i + 1,
            0
          ].concat(jsTags)), i += jsTags.length));
      return ret;
    },
    cleanData: function (elems, acceptData) {
      for (var data, id, elem, type, i = 0, internalKey = jQuery.expando, cache = jQuery.cache, deleteExpando = jQuery.support.deleteExpando, special = jQuery.event.special; null != (elem = elems[i]); i++)
        if ((acceptData || jQuery.acceptData(elem)) && (id = elem[internalKey], data = id && cache[id])) {
          if (data.events)
            for (type in data.events)
              special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
          cache[id] && (delete cache[id], deleteExpando ? delete elem[internalKey] : elem.removeAttribute ? elem.removeAttribute(internalKey) : elem[internalKey] = null, jQuery.deletedIds.push(id));
        }
    }
  }), function () {
    var matched, browser;
    jQuery.uaMatch = function (ua) {
      ua = ua.toLowerCase();
      var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
      return {
        browser: match[1] || '',
        version: match[2] || '0'
      };
    }, matched = jQuery.uaMatch(navigator.userAgent), browser = {}, matched.browser && (browser[matched.browser] = !0, browser.version = matched.version), browser.chrome ? browser.webkit = !0 : browser.webkit && (browser.safari = !0), jQuery.browser = browser, jQuery.sub = function () {
      function jQuerySub(selector, context) {
        return new jQuerySub.fn.init(selector, context);
      }
      jQuery.extend(!0, jQuerySub, this), jQuerySub.superclass = this, jQuerySub.fn = jQuerySub.prototype = this(), jQuerySub.fn.constructor = jQuerySub, jQuerySub.sub = this.sub, jQuerySub.fn.init = function (selector, context) {
        return context && context instanceof jQuery && !(context instanceof jQuerySub) && (context = jQuerySub(context)), jQuery.fn.init.call(this, selector, context, rootjQuerySub);
      }, jQuerySub.fn.init.prototype = jQuerySub.fn;
      var rootjQuerySub = jQuerySub(document);
      return jQuerySub;
    };
  }();
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
  jQuery.fn.extend({
    css: function (name, value) {
      return jQuery.access(this, function (elem, name, value) {
        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    },
    show: function () {
      return showHide(this, !0);
    },
    hide: function () {
      return showHide(this);
    },
    toggle: function (state, fn2) {
      var bool = 'boolean' == typeof state;
      return jQuery.isFunction(state) && jQuery.isFunction(fn2) ? eventsToggle.apply(this, arguments) : this.each(function () {
        (bool ? state : isHidden(this)) ? jQuery(this).show() : jQuery(this).hide();
      });
    }
  }), jQuery.extend({
    cssHooks: {
      opacity: {
        get: function (elem, computed) {
          if (computed) {
            var ret = curCSS(elem, 'opacity');
            return '' === ret ? '1' : ret;
          }
        }
      }
    },
    cssNumber: {
      fillOpacity: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: { 'float': jQuery.support.cssFloat ? 'cssFloat' : 'styleFloat' },
    style: function (elem, name, value, extra) {
      if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
        var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
        if (name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], value === undefined)
          return hooks && 'get' in hooks && (ret = hooks.get(elem, !1, extra)) !== undefined ? ret : style[name];
        if (type = typeof value, 'string' === type && (ret = rrelNum.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name)), type = 'number'), !(null == value || 'number' === type && isNaN(value) || ('number' !== type || jQuery.cssNumber[origName] || (value += 'px'), hooks && 'set' in hooks && (value = hooks.set(elem, value, extra)) === undefined)))
          try {
            style[name] = value;
          } catch (e) {
          }
      }
    },
    css: function (elem, name, numeric, extra) {
      var val, num, hooks, origName = jQuery.camelCase(name);
      return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && 'get' in hooks && (val = hooks.get(elem, !0, extra)), val === undefined && (val = curCSS(elem, name)), 'normal' === val && name in cssNormalTransform && (val = cssNormalTransform[name]), numeric || extra !== undefined ? (num = parseFloat(val), numeric || jQuery.isNumeric(num) ? num || 0 : val) : val;
    },
    swap: function (elem, options, callback) {
      var ret, name, old = {};
      for (name in options)
        old[name] = elem.style[name], elem.style[name] = options[name];
      ret = callback.call(elem);
      for (name in options)
        elem.style[name] = old[name];
      return ret;
    }
  }), window.getComputedStyle ? curCSS = function (elem, name) {
    var ret, width, minWidth, maxWidth, computed = window.getComputedStyle(elem, null), style = elem.style;
    return computed && (ret = computed.getPropertyValue(name) || computed[name], '' !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), ret;
  } : document.documentElement.currentStyle && (curCSS = function (elem, name) {
    var left, rsLeft, ret = elem.currentStyle && elem.currentStyle[name], style = elem.style;
    return null == ret && style && style[name] && (ret = style[name]), rnumnonpx.test(ret) && !rposition.test(name) && (left = style.left, rsLeft = elem.runtimeStyle && elem.runtimeStyle.left, rsLeft && (elem.runtimeStyle.left = elem.currentStyle.left), style.left = 'fontSize' === name ? '1em' : ret, ret = style.pixelLeft + 'px', style.left = left, rsLeft && (elem.runtimeStyle.left = rsLeft)), '' === ret ? 'auto' : ret;
  }), jQuery.each([
    'height',
    'width'
  ], function (i, name) {
    jQuery.cssHooks[name] = {
      get: function (elem, computed, extra) {
        return computed ? 0 === elem.offsetWidth && rdisplayswap.test(curCSS(elem, 'display')) ? jQuery.swap(elem, cssShow, function () {
          return getWidthOrHeight(elem, name, extra);
        }) : getWidthOrHeight(elem, name, extra) : void 0;
      },
      set: function (elem, value, extra) {
        return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && 'border-box' === jQuery.css(elem, 'boxSizing')) : 0);
      }
    };
  }), jQuery.support.opacity || (jQuery.cssHooks.opacity = {
    get: function (elem, computed) {
      return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || '') ? 0.01 * parseFloat(RegExp.$1) + '' : computed ? '1' : '';
    },
    set: function (elem, value) {
      var style = elem.style, currentStyle = elem.currentStyle, opacity = jQuery.isNumeric(value) ? 'alpha(opacity=' + 100 * value + ')' : '', filter = currentStyle && currentStyle.filter || style.filter || '';
      style.zoom = 1, value >= 1 && '' === jQuery.trim(filter.replace(ralpha, '')) && style.removeAttribute && (style.removeAttribute('filter'), currentStyle && !currentStyle.filter) || (style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + ' ' + opacity);
    }
  }), jQuery(function () {
    jQuery.support.reliableMarginRight || (jQuery.cssHooks.marginRight = {
      get: function (elem, computed) {
        return jQuery.swap(elem, { display: 'inline-block' }, function () {
          return computed ? curCSS(elem, 'marginRight') : void 0;
        });
      }
    }), !jQuery.support.pixelPosition && jQuery.fn.position && jQuery.each([
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
  }), jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.hidden = function (elem) {
    return 0 === elem.offsetWidth && 0 === elem.offsetHeight || !jQuery.support.reliableHiddenOffsets && 'none' === (elem.style && elem.style.display || curCSS(elem, 'display'));
  }, jQuery.expr.filters.visible = function (elem) {
    return !jQuery.expr.filters.hidden(elem);
  }), jQuery.each({
    margin: '',
    padding: '',
    border: 'Width'
  }, function (prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {
      expand: function (value) {
        var i, parts = 'string' == typeof value ? value.split(' ') : [value], expanded = {};
        for (i = 0; 4 > i; i++)
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
        return expanded;
      }
    }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber);
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
        return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function (val) {
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
  }), jQuery.param = function (a, traditional) {
    var prefix, s = [], add = function (key, value) {
        value = jQuery.isFunction(value) ? value() : null == value ? '' : value, s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
      };
    if (traditional === undefined && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a))
      jQuery.each(a, function () {
        add(this.name, this.value);
      });
    else
      for (prefix in a)
        buildParams(prefix, a[prefix], traditional, add);
    return s.join('&').replace(r20, '+');
  };
  var ajaxLocParts, ajaxLocation, rhash = /#.*$/, rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rquery = /\?/, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, rts = /([?&])_=[^&]*/, rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, _load = jQuery.fn.load, prefilters = {}, transports = {}, allTypes = ['*/'] + ['*'];
  try {
    ajaxLocation = location.href;
  } catch (e) {
    ajaxLocation = document.createElement('a'), ajaxLocation.href = '', ajaxLocation = ajaxLocation.href;
  }
  ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.fn.load = function (url, params, callback) {
    if ('string' != typeof url && _load)
      return _load.apply(this, arguments);
    if (!this.length)
      return this;
    var selector, type, response, self = this, off = url.indexOf(' ');
    return off >= 0 && (selector = url.slice(off, url.length), url = url.slice(0, off)), jQuery.isFunction(params) ? (callback = params, params = undefined) : params && 'object' == typeof params && (type = 'POST'), jQuery.ajax({
      url: url,
      type: type,
      dataType: 'html',
      data: params,
      complete: function (jqXHR, status) {
        callback && self.each(callback, response || [
          jqXHR.responseText,
          status,
          jqXHR
        ]);
      }
    }).done(function (responseText) {
      response = arguments, self.html(selector ? jQuery('<div>').append(responseText.replace(rscript, '')).find(selector) : responseText);
    }), this;
  }, jQuery.each('ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend'.split(' '), function (i, o) {
    jQuery.fn[o] = function (f) {
      return this.on(o, f);
    };
  }), jQuery.each([
    'get',
    'post'
  ], function (i, method) {
    jQuery[method] = function (url, data, callback, type) {
      return jQuery.isFunction(data) && (type = type || callback, callback = data, data = undefined), jQuery.ajax({
        type: method,
        url: url,
        data: data,
        success: callback,
        dataType: type
      });
    };
  }), jQuery.extend({
    getScript: function (url, callback) {
      return jQuery.get(url, undefined, callback, 'script');
    },
    getJSON: function (url, data, callback) {
      return jQuery.get(url, data, callback, 'json');
    },
    ajaxSetup: function (target, settings) {
      return settings ? ajaxExtend(target, jQuery.ajaxSettings) : (settings = target, target = jQuery.ajaxSettings), ajaxExtend(target, settings), target;
    },
    ajaxSettings: {
      url: ajaxLocation,
      isLocal: rlocalProtocol.test(ajaxLocParts[1]),
      global: !0,
      type: 'GET',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      processData: !0,
      async: !0,
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
        'text html': !0,
        'text json': jQuery.parseJSON,
        'text xml': jQuery.parseXML
      },
      flatOptions: {
        context: !0,
        url: !0
      }
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    ajax: function (url, options) {
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess, success, error, response, modified, statusText = nativeStatusText;
        2 !== state && (state = 2, timeoutTimer && clearTimeout(timeoutTimer), transport = undefined, responseHeadersString = headers || '', jqXHR.readyState = status > 0 ? 4 : 0, responses && (response = ajaxHandleResponses(s, jqXHR, responses)), status >= 200 && 300 > status || 304 === status ? (s.ifModified && (modified = jqXHR.getResponseHeader('Last-Modified'), modified && (jQuery.lastModified[ifModifiedKey] = modified), modified = jqXHR.getResponseHeader('Etag'), modified && (jQuery.etag[ifModifiedKey] = modified)), 304 === status ? (statusText = 'notmodified', isSuccess = !0) : (isSuccess = ajaxConvert(s, response), statusText = isSuccess.state, success = isSuccess.data, error = isSuccess.error, isSuccess = !error)) : (error = statusText, (!statusText || status) && (statusText = 'error', 0 > status && (status = 0))), jqXHR.status = status, jqXHR.statusText = (nativeStatusText || statusText) + '', isSuccess ? deferred.resolveWith(callbackContext, [
          success,
          statusText,
          jqXHR
        ]) : deferred.rejectWith(callbackContext, [
          jqXHR,
          statusText,
          error
        ]), jqXHR.statusCode(statusCode), statusCode = undefined, fireGlobals && globalEventContext.trigger('ajax' + (isSuccess ? 'Success' : 'Error'), [
          jqXHR,
          s,
          isSuccess ? success : error
        ]), completeDeferred.fireWith(callbackContext, [
          jqXHR,
          statusText
        ]), fireGlobals && (globalEventContext.trigger('ajaxComplete', [
          jqXHR,
          s
        ]), --jQuery.active || jQuery.event.trigger('ajaxStop')));
      }
      'object' == typeof url && (options = url, url = undefined), options = options || {};
      var ifModifiedKey, responseHeadersString, responseHeaders, transport, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = callbackContext !== s && (callbackContext.nodeType || callbackContext instanceof jQuery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks('once memory'), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = 'canceled', jqXHR = {
          readyState: 0,
          setRequestHeader: function (name, value) {
            if (!state) {
              var lname = name.toLowerCase();
              name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, requestHeaders[name] = value;
            }
            return this;
          },
          getAllResponseHeaders: function () {
            return 2 === state ? responseHeadersString : null;
          },
          getResponseHeader: function (key) {
            var match;
            if (2 === state) {
              if (!responseHeaders)
                for (responseHeaders = {}; match = rheaders.exec(responseHeadersString);)
                  responseHeaders[match[1].toLowerCase()] = match[2];
              match = responseHeaders[key.toLowerCase()];
            }
            return match === undefined ? null : match;
          },
          overrideMimeType: function (type) {
            return state || (s.mimeType = type), this;
          },
          abort: function (statusText) {
            return statusText = statusText || strAbort, transport && transport.abort(statusText), done(0, statusText), this;
          }
        };
      if (deferred.promise(jqXHR), jqXHR.success = jqXHR.done, jqXHR.error = jqXHR.fail, jqXHR.complete = completeDeferred.add, jqXHR.statusCode = function (map) {
          if (map) {
            var tmp;
            if (2 > state)
              for (tmp in map)
                statusCode[tmp] = [
                  statusCode[tmp],
                  map[tmp]
                ];
            else
              tmp = map[jqXHR.status], jqXHR.always(tmp);
          }
          return this;
        }, s.url = ((url || s.url) + '').replace(rhash, '').replace(rprotocol, ajaxLocParts[1] + '//'), s.dataTypes = jQuery.trim(s.dataType || '*').toLowerCase().split(core_rspace), null == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()), s.crossDomain = !(!parts || parts[1] === ajaxLocParts[1] && parts[2] === ajaxLocParts[2] && (parts[3] || ('http:' === parts[1] ? 80 : 443)) == (ajaxLocParts[3] || ('http:' === ajaxLocParts[1] ? 80 : 443)))), s.data && s.processData && 'string' != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state)
        return jqXHR;
      if (fireGlobals = s.global, s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger('ajaxStart'), !s.hasContent && (s.data && (s.url += (rquery.test(s.url) ? '&' : '?') + s.data, delete s.data), ifModifiedKey = s.url, s.cache === !1)) {
        var ts = jQuery.now(), ret = s.url.replace(rts, '$1_=' + ts);
        s.url = ret + (ret === s.url ? (rquery.test(s.url) ? '&' : '?') + '_=' + ts : '');
      }
      (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader('Content-Type', s.contentType), s.ifModified && (ifModifiedKey = ifModifiedKey || s.url, jQuery.lastModified[ifModifiedKey] && jqXHR.setRequestHeader('If-Modified-Since', jQuery.lastModified[ifModifiedKey]), jQuery.etag[ifModifiedKey] && jqXHR.setRequestHeader('If-None-Match', jQuery.etag[ifModifiedKey])), jqXHR.setRequestHeader('Accept', s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ('*' !== s.dataTypes[0] ? ', ' + allTypes + '; q=0.01' : '') : s.accepts['*']);
      for (i in s.headers)
        jqXHR.setRequestHeader(i, s.headers[i]);
      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state))
        return jqXHR.abort();
      strAbort = 'abort';
      for (i in {
          success: 1,
          error: 1,
          complete: 1
        })
        jqXHR[i](s[i]);
      if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
        jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger('ajaxSend', [
          jqXHR,
          s
        ]), s.async && s.timeout > 0 && (timeoutTimer = setTimeout(function () {
          jqXHR.abort('timeout');
        }, s.timeout));
        try {
          state = 1, transport.send(requestHeaders, done);
        } catch (e) {
          if (!(2 > state))
            throw e;
          done(-1, e);
        }
      } else
        done(-1, 'No Transport');
      return jqXHR;
    },
    active: 0,
    lastModified: {},
    etag: {}
  });
  var oldCallbacks = [], rquestion = /\?/, rjsonp = /(=)\?(?=&|$)|\?\?/, nonce = jQuery.now();
  jQuery.ajaxSetup({
    jsonp: 'callback',
    jsonpCallback: function () {
      var callback = oldCallbacks.pop() || jQuery.expando + '_' + nonce++;
      return this[callback] = !0, callback;
    }
  }), jQuery.ajaxPrefilter('json jsonp', function (s, originalSettings, jqXHR) {
    var callbackName, overwritten, responseContainer, data = s.data, url = s.url, hasCallback = s.jsonp !== !1, replaceInUrl = hasCallback && rjsonp.test(url), replaceInData = hasCallback && !replaceInUrl && 'string' == typeof data && !(s.contentType || '').indexOf('application/x-www-form-urlencoded') && rjsonp.test(data);
    return 'jsonp' === s.dataTypes[0] || replaceInUrl || replaceInData ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, overwritten = window[callbackName], replaceInUrl ? s.url = url.replace(rjsonp, '$1' + callbackName) : replaceInData ? s.data = data.replace(rjsonp, '$1' + callbackName) : hasCallback && (s.url += (rquestion.test(url) ? '&' : '?') + s.jsonp + '=' + callbackName), s.converters['script json'] = function () {
      return responseContainer || jQuery.error(callbackName + ' was not called'), responseContainer[0];
    }, s.dataTypes[0] = 'json', window[callbackName] = function () {
      responseContainer = arguments;
    }, jqXHR.always(function () {
      window[callbackName] = overwritten, s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, oldCallbacks.push(callbackName)), responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), responseContainer = overwritten = undefined;
    }), 'script') : void 0;
  }), jQuery.ajaxSetup({
    accepts: { script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript' },
    contents: { script: /javascript|ecmascript/ },
    converters: {
      'text script': function (text) {
        return jQuery.globalEval(text), text;
      }
    }
  }), jQuery.ajaxPrefilter('script', function (s) {
    s.cache === undefined && (s.cache = !1), s.crossDomain && (s.type = 'GET', s.global = !1);
  }), jQuery.ajaxTransport('script', function (s) {
    if (s.crossDomain) {
      var script, head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
      return {
        send: function (_, callback) {
          script = document.createElement('script'), script.async = 'async', s.scriptCharset && (script.charset = s.scriptCharset), script.src = s.url, script.onload = script.onreadystatechange = function (_, isAbort) {
            (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) && (script.onload = script.onreadystatechange = null, head && script.parentNode && head.removeChild(script), script = undefined, isAbort || callback(200, 'success'));
          }, head.insertBefore(script, head.firstChild);
        },
        abort: function () {
          script && script.onload(0, 1);
        }
      };
    }
  });
  var xhrCallbacks, xhrOnUnloadAbort = window.ActiveXObject ? function () {
      for (var key in xhrCallbacks)
        xhrCallbacks[key](0, 1);
    } : !1, xhrId = 0;
  jQuery.ajaxSettings.xhr = window.ActiveXObject ? function () {
    return !this.isLocal && createStandardXHR() || createActiveXHR();
  } : createStandardXHR, function (xhr) {
    jQuery.extend(jQuery.support, {
      ajax: !!xhr,
      cors: !!xhr && 'withCredentials' in xhr
    });
  }(jQuery.ajaxSettings.xhr()), jQuery.support.ajax && jQuery.ajaxTransport(function (s) {
    if (!s.crossDomain || jQuery.support.cors) {
      var callback;
      return {
        send: function (headers, complete) {
          var handle, i, xhr = s.xhr();
          if (s.username ? xhr.open(s.type, s.url, s.async, s.username, s.password) : xhr.open(s.type, s.url, s.async), s.xhrFields)
            for (i in s.xhrFields)
              xhr[i] = s.xhrFields[i];
          s.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(s.mimeType), s.crossDomain || headers['X-Requested-With'] || (headers['X-Requested-With'] = 'XMLHttpRequest');
          try {
            for (i in headers)
              xhr.setRequestHeader(i, headers[i]);
          } catch (_) {
          }
          xhr.send(s.hasContent && s.data || null), callback = function (_, isAbort) {
            var status, statusText, responseHeaders, responses, xml;
            try {
              if (callback && (isAbort || 4 === xhr.readyState))
                if (callback = undefined, handle && (xhr.onreadystatechange = jQuery.noop, xhrOnUnloadAbort && delete xhrCallbacks[handle]), isAbort)
                  4 !== xhr.readyState && xhr.abort();
                else {
                  status = xhr.status, responseHeaders = xhr.getAllResponseHeaders(), responses = {}, xml = xhr.responseXML, xml && xml.documentElement && (responses.xml = xml);
                  try {
                    responses.text = xhr.responseText;
                  } catch (e) {
                  }
                  try {
                    statusText = xhr.statusText;
                  } catch (e) {
                    statusText = '';
                  }
                  status || !s.isLocal || s.crossDomain ? 1223 === status && (status = 204) : status = responses.text ? 200 : 404;
                }
            } catch (firefoxAccessException) {
              isAbort || complete(-1, firefoxAccessException);
            }
            responses && complete(status, statusText, responses, responseHeaders);
          }, s.async ? 4 === xhr.readyState ? setTimeout(callback, 0) : (handle = ++xhrId, xhrOnUnloadAbort && (xhrCallbacks || (xhrCallbacks = {}, jQuery(window).unload(xhrOnUnloadAbort)), xhrCallbacks[handle] = callback), xhr.onreadystatechange = callback) : callback();
        },
        abort: function () {
          callback && callback(0, 1);
        }
      };
    }
  });
  var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp('^(?:([-+])=|)(' + core_pnum + ')([a-z%]*)$', 'i'), rrun = /queueHooks$/, animationPrefilters = [defaultPrefilter], tweeners = {
      '*': [function (prop, value) {
          var end, unit, tween = this.createTween(prop, value), parts = rfxnum.exec(value), target = tween.cur(), start = +target || 0, scale = 1, maxIterations = 20;
          if (parts) {
            if (end = +parts[2], unit = parts[3] || (jQuery.cssNumber[prop] ? '' : 'px'), 'px' !== unit && start) {
              start = jQuery.css(tween.elem, prop, !0) || end || 1;
              do
                scale = scale || '.5', start /= scale, jQuery.style(tween.elem, prop, start + unit);
              while (scale !== (scale = tween.cur() / target) && 1 !== scale && --maxIterations);
            }
            tween.unit = unit, tween.start = start, tween.end = parts[1] ? start + (parts[1] + 1) * end : end;
          }
          return tween;
        }]
    };
  jQuery.Animation = jQuery.extend(Animation, {
    tweener: function (props, callback) {
      jQuery.isFunction(props) ? (callback = props, props = ['*']) : props = props.split(' ');
      for (var prop, index = 0, length = props.length; length > index; index++)
        prop = props[index], tweeners[prop] = tweeners[prop] || [], tweeners[prop].unshift(callback);
    },
    prefilter: function (callback, prepend) {
      prepend ? animationPrefilters.unshift(callback) : animationPrefilters.push(callback);
    }
  }), jQuery.Tween = Tween, Tween.prototype = {
    constructor: Tween,
    init: function (elem, options, prop, end, easing, unit) {
      this.elem = elem, this.prop = prop, this.easing = easing || 'swing', this.options = options, this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? '' : 'px');
    },
    cur: function () {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run: function (percent) {
      var eased, hooks = Tween.propHooks[this.prop];
      return this.pos = eased = this.options.duration ? jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : percent, this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this;
    }
  }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
    _default: {
      get: function (tween) {
        var result;
        return null == tween.elem[tween.prop] || tween.elem.style && null != tween.elem.style[tween.prop] ? (result = jQuery.css(tween.elem, tween.prop, !1, ''), result && 'auto' !== result ? result : 0) : tween.elem[tween.prop];
      },
      set: function (tween) {
        jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop]) ? jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) : tween.elem[tween.prop] = tween.now;
      }
    }
  }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set: function (tween) {
      tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now);
    }
  }, jQuery.each([
    'toggle',
    'show',
    'hide'
  ], function (i, name) {
    var cssFn = jQuery.fn[name];
    jQuery.fn[name] = function (speed, easing, callback) {
      return null == speed || 'boolean' == typeof speed || !i && jQuery.isFunction(speed) && jQuery.isFunction(easing) ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback);
    };
  }), jQuery.fn.extend({
    fadeTo: function (speed, to, easing, callback) {
      return this.filter(isHidden).css('opacity', 0).show().end().animate({ opacity: to }, speed, easing, callback);
    },
    animate: function (prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function () {
          var anim = Animation(this, jQuery.extend({}, prop), optall);
          empty && anim.stop(!0);
        };
      return empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    stop: function (type, clearQueue, gotoEnd) {
      var stopQueue = function (hooks) {
        var stop = hooks.stop;
        delete hooks.stop, stop(gotoEnd);
      };
      return 'string' != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = undefined), clearQueue && type !== !1 && this.queue(type || 'fx', []), this.each(function () {
        var dequeue = !0, index = null != type && type + 'queueHooks', timers = jQuery.timers, data = jQuery._data(this);
        if (index)
          data[index] && data[index].stop && stopQueue(data[index]);
        else
          for (index in data)
            data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
        for (index = timers.length; index--;)
          timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), dequeue = !1, timers.splice(index, 1));
        (dequeue || !gotoEnd) && jQuery.dequeue(this, type);
      });
    }
  }), jQuery.each({
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
  }), jQuery.speed = function (speed, easing, fn) {
    var opt = speed && 'object' == typeof speed ? jQuery.extend({}, speed) : {
        complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
        duration: speed,
        easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
      };
    return opt.duration = jQuery.fx.off ? 0 : 'number' == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, (null == opt.queue || opt.queue === !0) && (opt.queue = 'fx'), opt.old = opt.complete, opt.complete = function () {
      jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue);
    }, opt;
  }, jQuery.easing = {
    linear: function (p) {
      return p;
    },
    swing: function (p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    }
  }, jQuery.timers = [], jQuery.fx = Tween.prototype.init, jQuery.fx.tick = function () {
    var timer, timers = jQuery.timers, i = 0;
    for (fxNow = jQuery.now(); i < timers.length; i++)
      timer = timers[i], timer() || timers[i] !== timer || timers.splice(i--, 1);
    timers.length || jQuery.fx.stop(), fxNow = undefined;
  }, jQuery.fx.timer = function (timer) {
    timer() && jQuery.timers.push(timer) && !timerId && (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval));
  }, jQuery.fx.interval = 13, jQuery.fx.stop = function () {
    clearInterval(timerId), timerId = null;
  }, jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  }, jQuery.fx.step = {}, jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.animated = function (elem) {
    return jQuery.grep(jQuery.timers, function (fn) {
      return elem === fn.elem;
    }).length;
  });
  var rroot = /^(?:body|html)$/i;
  jQuery.fn.offset = function (options) {
    if (arguments.length)
      return options === undefined ? this : this.each(function (i) {
        jQuery.offset.setOffset(this, options, i);
      });
    var docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft, box = {
        top: 0,
        left: 0
      }, elem = this[0], doc = elem && elem.ownerDocument;
    if (doc)
      return (body = doc.body) === elem ? jQuery.offset.bodyOffset(elem) : (docElem = doc.documentElement, jQuery.contains(docElem, elem) ? ('undefined' != typeof elem.getBoundingClientRect && (box = elem.getBoundingClientRect()), win = getWindow(doc), clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0, scrollTop = win.pageYOffset || docElem.scrollTop, scrollLeft = win.pageXOffset || docElem.scrollLeft, {
        top: box.top + scrollTop - clientTop,
        left: box.left + scrollLeft - clientLeft
      }) : box);
  }, jQuery.offset = {
    bodyOffset: function (body) {
      var top = body.offsetTop, left = body.offsetLeft;
      return jQuery.support.doesNotIncludeMarginInBodyOffset && (top += parseFloat(jQuery.css(body, 'marginTop')) || 0, left += parseFloat(jQuery.css(body, 'marginLeft')) || 0), {
        top: top,
        left: left
      };
    },
    setOffset: function (elem, options, i) {
      var position = jQuery.css(elem, 'position');
      'static' === position && (elem.style.position = 'relative');
      var curTop, curLeft, curElem = jQuery(elem), curOffset = curElem.offset(), curCSSTop = jQuery.css(elem, 'top'), curCSSLeft = jQuery.css(elem, 'left'), calculatePosition = ('absolute' === position || 'fixed' === position) && jQuery.inArray('auto', [
          curCSSTop,
          curCSSLeft
        ]) > -1, props = {}, curPosition = {};
      calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), jQuery.isFunction(options) && (options = options.call(elem, i, curOffset)), null != options.top && (props.top = options.top - curOffset.top + curTop), null != options.left && (props.left = options.left - curOffset.left + curLeft), 'using' in options ? options.using.call(elem, props) : curElem.css(props);
    }
  }, jQuery.fn.extend({
    position: function () {
      if (this[0]) {
        var elem = this[0], offsetParent = this.offsetParent(), offset = this.offset(), parentOffset = rroot.test(offsetParent[0].nodeName) ? {
            top: 0,
            left: 0
          } : offsetParent.offset();
        return offset.top -= parseFloat(jQuery.css(elem, 'marginTop')) || 0, offset.left -= parseFloat(jQuery.css(elem, 'marginLeft')) || 0, parentOffset.top += parseFloat(jQuery.css(offsetParent[0], 'borderTopWidth')) || 0, parentOffset.left += parseFloat(jQuery.css(offsetParent[0], 'borderLeftWidth')) || 0, {
          top: offset.top - parentOffset.top,
          left: offset.left - parentOffset.left
        };
      }
    },
    offsetParent: function () {
      return this.map(function () {
        for (var offsetParent = this.offsetParent || document.body; offsetParent && !rroot.test(offsetParent.nodeName) && 'static' === jQuery.css(offsetParent, 'position');)
          offsetParent = offsetParent.offsetParent;
        return offsetParent || document.body;
      });
    }
  }), jQuery.each({
    scrollLeft: 'pageXOffset',
    scrollTop: 'pageYOffset'
  }, function (method, prop) {
    var top = /Y/.test(prop);
    jQuery.fn[method] = function (val) {
      return jQuery.access(this, function (elem, method, val) {
        var win = getWindow(elem);
        return val === undefined ? win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method] : void (win ? win.scrollTo(top ? jQuery(win).scrollLeft() : val, top ? val : jQuery(win).scrollTop()) : elem[method] = val);
      }, method, val, arguments.length, null);
    };
  }), jQuery.each({
    Height: 'height',
    Width: 'width'
  }, function (name, type) {
    jQuery.each({
      padding: 'inner' + name,
      content: type,
      '': 'outer' + name
    }, function (defaultExtra, funcName) {
      jQuery.fn[funcName] = function (margin, value) {
        var chainable = arguments.length && (defaultExtra || 'boolean' != typeof margin), extra = defaultExtra || (margin === !0 || value === !0 ? 'margin' : 'border');
        return jQuery.access(this, function (elem, type, value) {
          var doc;
          return jQuery.isWindow(elem) ? elem.document.documentElement['client' + name] : 9 === elem.nodeType ? (doc = elem.documentElement, Math.max(elem.body['scroll' + name], doc['scroll' + name], elem.body['offset' + name], doc['offset' + name], doc['client' + name])) : value === undefined ? jQuery.css(elem, type, value, extra) : jQuery.style(elem, type, value, extra);
        }, type, chainable ? margin : undefined, chainable, null);
      };
    });
  }), window.jQuery = window.$ = jQuery, 'function' == typeof define && define.amd && define.amd.jQuery && define('jquery', [], function () {
    return jQuery;
  });
}(window), function (a, b) {
  function c(b, c) {
    var e = b.nodeName.toLowerCase();
    if ('area' === e) {
      var h, f = b.parentNode, g = f.name;
      return b.href && g && 'map' === f.nodeName.toLowerCase() ? (h = a('img[usemap=#' + g + ']')[0], !!h && d(h)) : !1;
    }
    return (/input|select|textarea|button|object/.test(e) ? !b.disabled : 'a' == e ? b.href || c : c) && d(b);
  }
  function d(b) {
    return !a(b).parents().andSelf().filter(function () {
      return 'hidden' === a.curCSS(this, 'visibility') || a.expr.filters.hidden(this);
    }).length;
  }
  a.ui = a.ui || {}, a.ui.version || (a.extend(a.ui, {
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
      return 'number' == typeof b ? this.each(function () {
        var d = this;
        setTimeout(function () {
          a(d).focus(), c && c.call(d);
        }, b);
      }) : this._focus.apply(this, arguments);
    },
    scrollParent: function () {
      var b;
      return b = a.browser.msie && /(static|relative)/.test(this.css('position')) || /absolute/.test(this.css('position')) ? this.parents().filter(function () {
        return /(relative|absolute|fixed)/.test(a.curCSS(this, 'position', 1)) && /(auto|scroll)/.test(a.curCSS(this, 'overflow', 1) + a.curCSS(this, 'overflow-y', 1) + a.curCSS(this, 'overflow-x', 1));
      }).eq(0) : this.parents().filter(function () {
        return /(auto|scroll)/.test(a.curCSS(this, 'overflow', 1) + a.curCSS(this, 'overflow-y', 1) + a.curCSS(this, 'overflow-x', 1));
      }).eq(0), /fixed/.test(this.css('position')) || !b.length ? a(document) : b;
    },
    zIndex: function (c) {
      if (c !== b)
        return this.css('zIndex', c);
      if (this.length)
        for (var e, f, d = a(this[0]); d.length && d[0] !== document;) {
          if (e = d.css('position'), ('absolute' === e || 'relative' === e || 'fixed' === e) && (f = parseInt(d.css('zIndex'), 10), !isNaN(f) && 0 !== f))
            return f;
          d = d.parent();
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
    var e = 'Width' === d ? [
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
      return 'number' != typeof b ? g['outer' + d].call(this, b) : this.each(function () {
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
    }), a.support.minHeight = 100 === c.offsetHeight, a.support.selectstart = 'onselectstart' in c, b.removeChild(c).style.display = 'none';
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
        if (d && a.element[0].parentNode)
          for (var e = 0; e < d.length; e++)
            a.options[d[e][0]] && d[e][1].apply(a.element, c);
      }
    },
    contains: function (a, b) {
      return document.compareDocumentPosition ? 16 & a.compareDocumentPosition(b) : a !== b && a.contains(b);
    },
    hasScroll: function (b, c) {
      if ('hidden' === a(b).css('overflow'))
        return !1;
      var d = c && 'left' === c ? 'scrollLeft' : 'scrollTop', e = !1;
      return b[d] > 0 ? !0 : (b[d] = 1, e = b[d] > 0, b[d] = 0, e);
    },
    isOverAxis: function (a, b, c) {
      return a > b && b + c > a;
    },
    isOver: function (b, c, d, e, f, g) {
      return a.ui.isOverAxis(b, d, f) && a.ui.isOverAxis(c, e, g);
    }
  }));
}(jQuery), function (a, b) {
  if (a.cleanData) {
    var c = a.cleanData;
    a.cleanData = function (b) {
      for (var e, d = 0; null != (e = b[d]); d++)
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
    var f, e = b.split('.')[0];
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
      var f = 'string' == typeof e, g = Array.prototype.slice.call(arguments, 1), h = this;
      return e = !f && g.length ? a.extend.apply(null, [
        !0,
        e
      ].concat(g)) : e, f && '_' === e.charAt(0) ? h : (this.each(f ? function () {
        var d = a.data(this, c), f = d && a.isFunction(d[e]) ? d[e].apply(d, g) : d;
        return f !== d && f !== b ? (h = f, !1) : void 0;
      } : function () {
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
      this.element.unbind('.' + this.widgetName).removeData(this.widgetName), this.widget().unbind('.' + this.widgetName).removeAttr('aria-disabled').removeClass(this.widgetBaseClass + '-disabled ui-state-disabled');
    },
    widget: function () {
      return this.element;
    },
    option: function (c, d) {
      var e = c;
      if (0 === arguments.length)
        return a.extend({}, this.options);
      if ('string' == typeof c) {
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
      return this.options[a] = b, 'disabled' === a && this.widget()[b ? 'addClass' : 'removeClass'](this.widgetBaseClass + '-disabled ui-state-disabled').attr('aria-disabled', b), this;
    },
    enable: function () {
      return this._setOption('disabled', !1);
    },
    disable: function () {
      return this._setOption('disabled', !0);
    },
    _trigger: function (b, c, d) {
      var e, f, g = this.options[b];
      if (d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent, f)
        for (e in f)
          e in c || (c[e] = f[e]);
      return this.element.trigger(c, d), !(a.isFunction(g) && g.call(this.element[0], c, d) === !1 || c.isDefaultPrevented());
    }
  };
}(jQuery), function (a) {
  var c = !1;
  a(document).mouseup(function () {
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
        return !0 === a.data(c.target, b.widgetName + '.preventClickEvent') ? (a.removeData(c.target, b.widgetName + '.preventClickEvent'), c.stopImmediatePropagation(), !1) : void 0;
      }), this.started = !1;
    },
    _mouseDestroy: function () {
      this.element.unbind('.' + this.widgetName), this._mouseMoveDelegate && a(document).unbind('mousemove.' + this.widgetName, this._mouseMoveDelegate).unbind('mouseup.' + this.widgetName, this._mouseUpDelegate);
    },
    _mouseDown: function (b) {
      if (!c) {
        this._mouseStarted && this._mouseUp(b), this._mouseDownEvent = b;
        var d = this, e = 1 == b.which, f = 'string' == typeof this.options.cancel && b.target.nodeName ? a(b.target).closest(this.options.cancel).length : !1;
        return e && !f && this._mouseCapture(b) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
          d.mouseDelayMet = !0;
        }, this.options.delay)), this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(b) !== !1, !this._mouseStarted) ? (b.preventDefault(), !0) : (!0 === a.data(b.target, this.widgetName + '.preventClickEvent') && a.removeData(b.target, this.widgetName + '.preventClickEvent'), this._mouseMoveDelegate = function (a) {
          return d._mouseMove(a);
        }, this._mouseUpDelegate = function (a) {
          return d._mouseUp(a);
        }, a(document).bind('mousemove.' + this.widgetName, this._mouseMoveDelegate).bind('mouseup.' + this.widgetName, this._mouseUpDelegate), b.preventDefault(), c = !0, !0)) : !0;
      }
    },
    _mouseMove: function (b) {
      return !a.browser.msie || document.documentMode >= 9 || b.button ? this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted) : this._mouseUp(b);
    },
    _mouseUp: function (b) {
      return a(document).unbind('mousemove.' + this.widgetName, this._mouseMoveDelegate).unbind('mouseup.' + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, b.target == this._mouseDownEvent.target && a.data(b.target, this.widgetName + '.preventClickEvent', !0), this._mouseStop(b)), !1;
    },
    _mouseDistanceMet: function (a) {
      return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance;
    },
    _mouseDelayMet: function () {
      return this.mouseDelayMet;
    },
    _mouseStart: function () {
    },
    _mouseDrag: function () {
    },
    _mouseStop: function () {
    },
    _mouseCapture: function () {
      return !0;
    }
  });
}(jQuery), function (a) {
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
      'original' == this.options.helper && !/^(?:r|a|f)/.test(this.element.css('position')) && (this.element[0].style.position = 'relative'), this.options.addClasses && this.element.addClass('ui-draggable'), this.options.disabled && this.element.addClass('ui-draggable-disabled'), this._mouseInit();
    },
    destroy: function () {
      return this.element.data('draggable') ? (this.element.removeData('draggable').unbind('.draggable').removeClass('ui-draggable ui-draggable-dragging ui-draggable-disabled'), this._mouseDestroy(), this) : void 0;
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
      if (this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo('absolute'), !c) {
        var d = this._uiHash();
        if (this._trigger('drag', b, d) === !1)
          return this._mouseUp({}), !1;
        this.position = d.position;
      }
      return this.options.axis && 'y' == this.options.axis || (this.helper[0].style.left = this.position.left + 'px'), this.options.axis && 'x' == this.options.axis || (this.helper[0].style.top = this.position.top + 'px'), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), !1;
    },
    _mouseStop: function (b) {
      var c = !1;
      a.ui.ddmanager && !this.options.dropBehaviour && (c = a.ui.ddmanager.drop(this, b)), this.dropped && (c = this.dropped, this.dropped = !1);
      for (var d = this.element[0], e = !1; d && (d = d.parentNode);)
        d == document && (e = !0);
      if (!e && 'original' === this.options.helper)
        return !1;
      if ('invalid' == this.options.revert && !c || 'valid' == this.options.revert && c || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, c)) {
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
      var c = this.options.handle && a(this.options.handle, this.element).length ? !1 : !0;
      return a(this.options.handle, this.element).find('*').andSelf().each(function () {
        this == b.target && (c = !0);
      }), c;
    },
    _createHelper: function (b) {
      var c = this.options, d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b])) : 'clone' == c.helper ? this.element.clone().removeAttr('id') : this.element;
      return d.parents('body').length || d.appendTo('parent' == c.appendTo ? this.element[0].parentNode : c.appendTo), d[0] != this.element[0] && !/(fixed|absolute)/.test(d.css('position')) && d.css('position', 'absolute'), d;
    },
    _adjustOffsetFromHelper: function (b) {
      'string' == typeof b && (b = b.split(' ')), a.isArray(b) && (b = {
        left: +b[0],
        top: +b[1] || 0
      }), 'left' in b && (this.offset.click.left = b.left + this.margins.left), 'right' in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), 'top' in b && (this.offset.click.top = b.top + this.margins.top), 'bottom' in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top);
    },
    _getParentOffset: function () {
      this.offsetParent = this.helper.offsetParent();
      var b = this.offsetParent.offset();
      return 'absolute' == this.cssPosition && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop()), (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && 'html' == this.offsetParent[0].tagName.toLowerCase() && a.browser.msie) && (b = {
        top: 0,
        left: 0
      }), {
        top: b.top + (parseInt(this.offsetParent.css('borderTopWidth'), 10) || 0),
        left: b.left + (parseInt(this.offsetParent.css('borderLeftWidth'), 10) || 0)
      };
    },
    _getRelativeOffset: function () {
      if ('relative' == this.cssPosition) {
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
      if ('parent' == b.containment && (b.containment = this.helper[0].parentNode), ('document' == b.containment || 'window' == b.containment) && (this.containment = [
          'document' == b.containment ? 0 : a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
          'document' == b.containment ? 0 : a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top,
          ('document' == b.containment ? 0 : a(window).scrollLeft()) + a('document' == b.containment ? document : window).width() - this.helperProportions.width - this.margins.left,
          ('document' == b.containment ? 0 : a(window).scrollTop()) + (a('document' == b.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
        ]), /^(document|window|parent)$/.test(b.containment) || b.containment.constructor == Array)
        b.containment.constructor == Array && (this.containment = b.containment);
      else {
        var c = a(b.containment), d = c[0];
        if (!d)
          return;
        var f = (c.offset(), 'hidden' != a(d).css('overflow'));
        this.containment = [
          (parseInt(a(d).css('borderLeftWidth'), 10) || 0) + (parseInt(a(d).css('paddingLeft'), 10) || 0),
          (parseInt(a(d).css('borderTopWidth'), 10) || 0) + (parseInt(a(d).css('paddingTop'), 10) || 0),
          (f ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(a(d).css('borderLeftWidth'), 10) || 0) - (parseInt(a(d).css('paddingRight'), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right,
          (f ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(a(d).css('borderTopWidth'), 10) || 0) - (parseInt(a(d).css('paddingBottom'), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom
        ], this.relative_container = c;
      }
    },
    _convertPositionTo: function (b, c) {
      c || (c = this.position);
      var d = 'absolute' == b ? 1 : -1, f = (this.options, 'absolute' != this.cssPosition || this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent), g = /(html|body)/i.test(f[0].tagName);
      return {
        top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (a.browser.safari && a.browser.version < 526 && 'fixed' == this.cssPosition ? 0 : ('fixed' == this.cssPosition ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()) * d),
        left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (a.browser.safari && a.browser.version < 526 && 'fixed' == this.cssPosition ? 0 : ('fixed' == this.cssPosition ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft()) * d)
      };
    },
    _generatePosition: function (b) {
      var c = this.options, d = 'absolute' != this.cssPosition || this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, e = /(html|body)/i.test(d[0].tagName), f = b.pageX, g = b.pageY;
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
          g = h && (j - this.offset.click.top < h[1] || j - this.offset.click.top > h[3]) ? j - this.offset.click.top < h[1] ? j + c.grid[1] : j - c.grid[1] : j;
          var k = c.grid[0] ? this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0] : this.originalPageX;
          f = h && (k - this.offset.click.left < h[0] || k - this.offset.click.left > h[2]) ? k - this.offset.click.left < h[0] ? k + c.grid[0] : k - c.grid[0] : k;
        }
      }
      return {
        top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && a.browser.version < 526 && 'fixed' == this.cssPosition ? 0 : 'fixed' == this.cssPosition ? -this.scrollParent.scrollTop() : e ? 0 : d.scrollTop()),
        left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && a.browser.version < 526 && 'fixed' == this.cssPosition ? 0 : 'fixed' == this.cssPosition ? -this.scrollParent.scrollLeft() : e ? 0 : d.scrollLeft())
      };
    },
    _clear: function () {
      this.helper.removeClass('ui-draggable-dragging'), this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1;
    },
    _trigger: function (b, c, d) {
      return d = d || this._uiHash(), a.ui.plugin.call(this, b, [
        c,
        d
      ]), 'drag' == b && (this.positionAbs = this._convertPositionTo('absolute')), a.Widget.prototype._trigger.call(this, b, c, d);
    },
    plugins: {},
    _uiHash: function () {
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
        this.instance.isOver ? (this.instance.isOver = 0, d.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(b), this.instance.options.helper = this.instance.options._helper, 'original' == d.options.helper && this.instance.currentItem.css({
          top: 'auto',
          left: 'auto'
        })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger('deactivate', b, e));
      });
    },
    drag: function (b, c) {
      var d = a(this).data('draggable'), e = this;
      a.each(d.sortables, function () {
        this.instance.positionAbs = d.positionAbs, this.instance.helperProportions = d.helperProportions, this.instance.offset.click = d.offset.click, this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = a(e).clone().removeAttr('id').appendTo(this.instance.element).data('sortable-item', !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function () {
          return c.helper[0];
        }, b.target = this.instance.currentItem[0], this.instance._mouseCapture(b, !0), this.instance._mouseStart(b, !0, !0), this.instance.offset.click.top = d.offset.click.top, this.instance.offset.click.left = d.offset.click.left, this.instance.offset.parent.left -= d.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= d.offset.parent.top - this.instance.offset.parent.top, d._trigger('toSortable', b), d.dropped = this.instance.element, d.currentItem = d.element, this.instance.fromOutside = d), this.instance.currentItem && this.instance._mouseDrag(b)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger('out', b, this.instance._uiHash(this.instance)), this.instance._mouseStop(b, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), d._trigger('fromSortable', b), d.dropped = !1);
      });
    }
  }), a.ui.plugin.add('draggable', 'cursor', {
    start: function () {
      var d = a('body'), e = a(this).data('draggable').options;
      d.css('cursor') && (e._cursor = d.css('cursor')), d.css('cursor', e.cursor);
    },
    stop: function () {
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
    start: function () {
      var d = a(this).data('draggable');
      d.scrollParent[0] != document && 'HTML' != d.scrollParent[0].tagName && (d.overflowOffset = d.scrollParent.offset());
    },
    drag: function (b) {
      var d = a(this).data('draggable'), e = d.options, f = !1;
      d.scrollParent[0] != document && 'HTML' != d.scrollParent[0].tagName ? (e.axis && 'x' == e.axis || (d.overflowOffset.top + d.scrollParent[0].offsetHeight - b.pageY < e.scrollSensitivity ? d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop + e.scrollSpeed : b.pageY - d.overflowOffset.top < e.scrollSensitivity && (d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop - e.scrollSpeed)), e.axis && 'y' == e.axis || (d.overflowOffset.left + d.scrollParent[0].offsetWidth - b.pageX < e.scrollSensitivity ? d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft + e.scrollSpeed : b.pageX - d.overflowOffset.left < e.scrollSensitivity && (d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft - e.scrollSpeed))) : (e.axis && 'x' == e.axis || (b.pageY - a(document).scrollTop() < e.scrollSensitivity ? f = a(document).scrollTop(a(document).scrollTop() - e.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < e.scrollSensitivity && (f = a(document).scrollTop(a(document).scrollTop() + e.scrollSpeed))), e.axis && 'y' == e.axis || (b.pageX - a(document).scrollLeft() < e.scrollSensitivity ? f = a(document).scrollLeft(a(document).scrollLeft() - e.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < e.scrollSensitivity && (f = a(document).scrollLeft(a(document).scrollLeft() + e.scrollSpeed)))), f !== !1 && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(d, b);
    }
  }), a.ui.plugin.add('draggable', 'snap', {
    start: function () {
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
      for (var d = a(this).data('draggable'), e = d.options, f = e.snapTolerance, g = c.offset.left, h = g + d.helperProportions.width, i = c.offset.top, j = i + d.helperProportions.height, k = d.snapElements.length - 1; k >= 0; k--) {
        var l = d.snapElements[k].left, m = l + d.snapElements[k].width, n = d.snapElements[k].top, o = n + d.snapElements[k].height;
        if (g > l - f && m + f > g && i > n - f && o + f > i || g > l - f && m + f > g && j > n - f && o + f > j || h > l - f && m + f > h && i > n - f && o + f > i || h > l - f && m + f > h && j > n - f && o + f > j) {
          if ('inner' != e.snapMode) {
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
          if ('outer' != e.snapMode) {
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
        } else
          d.snapElements[k].snapping && d.options.snap.release && d.options.snap.release.call(d.element, b, a.extend(d._uiHash(), { snapItem: d.snapElements[k].item })), d.snapElements[k].snapping = !1;
      }
    }
  }), a.ui.plugin.add('draggable', 'stack', {
    start: function () {
      var d = a(this).data('draggable').options, e = a.makeArray(a(d.stack)).sort(function (b, c) {
          return (parseInt(a(b).css('zIndex'), 10) || 0) - (parseInt(a(c).css('zIndex'), 10) || 0);
        });
      if (e.length) {
        var f = parseInt(e[0].style.zIndex) || 0;
        a(e).each(function (a) {
          this.style.zIndex = f + a;
        }), this[0].style.zIndex = f + e.length;
      }
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
}(jQuery), function (a) {
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
      for (var b = a.ui.ddmanager.droppables[this.options.scope], c = 0; c < b.length; c++)
        b[c] == this && b.splice(c, 1);
      return this.element.removeClass('ui-droppable ui-droppable-disabled').removeData('droppable').unbind('.droppable'), this;
    },
    _setOption: function (b, c) {
      'accept' == b && (this.accept = a.isFunction(c) ? c : function (a) {
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
      c && (c.currentItem || c.element)[0] != this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger('over', b, this.ui(c)));
    },
    _out: function (b) {
      var c = a.ui.ddmanager.current;
      c && (c.currentItem || c.element)[0] != this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger('out', b, this.ui(c)));
    },
    _drop: function (b, c) {
      var d = c || a.ui.ddmanager.current;
      if (!d || (d.currentItem || d.element)[0] == this.element[0])
        return !1;
      var e = !1;
      return this.element.find(':data(droppable)').not('.ui-draggable-dragging').each(function () {
        var b = a.data(this, 'droppable');
        return b.options.greedy && !b.options.disabled && b.options.scope == d.options.scope && b.accept.call(b.element[0], d.currentItem || d.element) && a.ui.intersect(d, a.extend(b, { offset: b.element.offset() }), b.options.tolerance) ? (e = !0, !1) : void 0;
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
      return e >= i && j >= f && g >= k && l >= h;
    case 'intersect':
      return i < e + b.helperProportions.width / 2 && f - b.helperProportions.width / 2 < j && k < g + b.helperProportions.height / 2 && h - b.helperProportions.height / 2 < l;
    case 'pointer':
      var m = (b.positionAbs || b.position.absolute).left + (b.clickOffset || b.offset.click).left, n = (b.positionAbs || b.position.absolute).top + (b.clickOffset || b.offset.click).top, o = a.ui.isOver(n, m, k, i, c.proportions.height, c.proportions.width);
      return o;
    case 'touch':
      return (g >= k && l >= g || h >= k && l >= h || k > g && h > l) && (e >= i && j >= e || f >= i && j >= f || i > e && f > j);
    default:
      return !1;
    }
  }, a.ui.ddmanager = {
    current: null,
    droppables: { 'default': [] },
    prepareOffsets: function (b, c) {
      var d = a.ui.ddmanager.droppables[b.options.scope] || [], e = c ? c.type : null, f = (b.currentItem || b.element).find(':data(droppable)').andSelf();
      g:
        for (var h = 0; h < d.length; h++)
          if (!(d[h].options.disabled || b && !d[h].accept.call(d[h].element[0], b.currentItem || b.element))) {
            for (var i = 0; i < f.length; i++)
              if (f[i] == d[h].element[0]) {
                d[h].proportions.height = 0;
                continue g;
              }
            d[h].visible = 'none' != d[h].element.css('display'), d[h].visible && ('mousedown' == e && d[h]._activate.call(d[h], c), d[h].offset = d[h].element.offset(), d[h].proportions = {
              width: d[h].element[0].offsetWidth,
              height: d[h].element[0].offsetHeight
            });
          }
    },
    drop: function (b, c) {
      var d = !1;
      return a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function () {
        this.options && (!this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance) && (d = this._drop.call(this, c) || d), !this.options.disabled && this.visible && this.accept.call(this.element[0], b.currentItem || b.element) && (this.isout = 1, this.isover = 0, this._deactivate.call(this, c)));
      }), d;
    },
    dragStart: function (b, c) {
      b.element.parents(':not(body,html)').bind('scroll.droppable', function () {
        b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c);
      });
    },
    drag: function (b, c) {
      b.options.refreshPositions && a.ui.ddmanager.prepareOffsets(b, c), a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function () {
        if (!this.options.disabled && !this.greedyChild && this.visible) {
          var d = a.ui.intersect(b, this, this.options.tolerance), e = d || 1 != this.isover ? d && 0 == this.isover ? 'isover' : null : 'isout';
          if (e) {
            var f;
            if (this.options.greedy) {
              var g = this.element.parents(':data(droppable):eq(0)');
              g.length && (f = a.data(g[0], 'droppable'), f.greedyChild = 'isover' == e ? 1 : 0);
            }
            f && 'isover' == e && (f.isover = 0, f.isout = 1, f._out.call(f, c)), this[e] = 1, this['isout' == e ? 'isover' : 'isout'] = 0, this['isover' == e ? '_over' : '_out'].call(this, c), f && 'isout' == e && (f.isout = 0, f.isover = 1, f._over.call(f, c));
          }
        }
      });
    },
    dragStop: function (b, c) {
      b.element.parents(':not(body,html)').unbind('scroll.droppable'), b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c);
    }
  };
}(jQuery), function (a) {
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
      if (this.element.addClass('ui-resizable'), a.extend(this, {
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
        } : 'e,s,se'), this.handles.constructor == String) {
        'all' == this.handles && (this.handles = 'n,e,s,w,se,sw,ne,nw');
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
          if (this.handles[c].constructor == String && (this.handles[c] = a(this.handles[c], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
            var d = a(this.handles[c], this.element), e = 0;
            e = /sw|ne|nw|se|n|s/.test(c) ? d.outerHeight() : d.outerWidth();
            var f = [
                'padding',
                /ne|nw|n/.test(c) ? 'Top' : /se|sw|s/.test(c) ? 'Bottom' : /^e$/.test(c) ? 'Right' : 'Left'
              ].join('');
            b.css(f, e), this._proportionallyResize();
          }
          a(this.handles[c]).length;
        }
      }, this._renderAxis(this.element), this._handles = a('.ui-resizable-handle', this.element).disableSelection(), this._handles.mouseover(function () {
        if (!b.resizing) {
          if (this.className)
            var a = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
          b.axis = a && a[1] ? a[1] : 'se';
        }
      }), c.autoHide && (this._handles.hide(), a(this.element).addClass('ui-resizable-autohide').hover(function () {
        c.disabled || (a(this).removeClass('ui-resizable-autohide'), b._handles.show());
      }, function () {
        c.disabled || b.resizing || (a(this).addClass('ui-resizable-autohide'), b._handles.hide());
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
      }, this.aspectRatio = 'number' == typeof d.aspectRatio ? d.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
      var i = a('.ui-resizable-' + this.axis).css('cursor');
      return a('body').css('cursor', 'auto' == i ? this.axis + '-resize' : i), f.addClass('ui-resizable-resizing'), this._propagate('start', b), !0;
    },
    _mouseDrag: function (b) {
      var c = this.helper, g = (this.options, this.originalMousePosition), h = this.axis, i = b.pageX - g.left || 0, j = b.pageY - g.top || 0, k = this._change[h];
      if (!k)
        return !1;
      {
        var l = k.apply(this, [
            b,
            i,
            j
          ]);
        a.browser.msie && a.browser.version < 7, this.sizeDiff;
      }
      return this._updateVirtualBoundaries(b.shiftKey), (this._aspectRatio || b.shiftKey) && (l = this._updateRatio(l, b)), l = this._respectSize(l, b), this._propagate('resize', b), c.css({
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
      var c, e, f, g, h, b = this.options;
      h = {
        minWidth: d(b.minWidth) ? b.minWidth : 0,
        maxWidth: d(b.maxWidth) ? b.maxWidth : 1 / 0,
        minHeight: d(b.minHeight) ? b.minHeight : 0,
        maxHeight: d(b.maxHeight) ? b.maxHeight : 1 / 0
      }, (this._aspectRatio || a) && (c = h.minHeight * this.aspectRatio, f = h.minWidth / this.aspectRatio, e = h.maxHeight * this.aspectRatio, g = h.maxWidth / this.aspectRatio, c > h.minWidth && (h.minWidth = c), f > h.minHeight && (h.minHeight = f), e < h.maxWidth && (h.maxWidth = e), g < h.maxHeight && (h.maxHeight = g)), this._vBoundaries = h;
    },
    _updateCache: function (a) {
      this.options;
      this.offset = this.helper.offset(), d(a.left) && (this.position.left = a.left), d(a.top) && (this.position.top = a.top), d(a.height) && (this.size.height = a.height), d(a.width) && (this.size.width = a.width);
    },
    _updateRatio: function (a) {
      var e = (this.options, this.position), f = this.size, g = this.axis;
      return d(a.height) ? a.width = a.height * this.aspectRatio : d(a.width) && (a.height = a.width / this.aspectRatio), 'sw' == g && (a.left = e.left + (f.width - a.width), a.top = null), 'nw' == g && (a.top = e.top + (f.height - a.height), a.left = e.left + (f.width - a.width)), a;
    },
    _respectSize: function (a, b) {
      var e = (this.helper, this._vBoundaries), g = (this._aspectRatio || b.shiftKey, this.axis), h = d(a.width) && e.maxWidth && e.maxWidth < a.width, i = d(a.height) && e.maxHeight && e.maxHeight < a.height, j = d(a.width) && e.minWidth && e.minWidth > a.width, k = d(a.height) && e.minHeight && e.minHeight > a.height;
      j && (a.width = e.minWidth), k && (a.height = e.minHeight), h && (a.width = e.maxWidth), i && (a.height = e.maxHeight);
      var l = this.originalPosition.left + this.originalSize.width, m = this.position.top + this.size.height, n = /sw|nw|w/.test(g), o = /nw|ne|n/.test(g);
      j && n && (a.left = l - e.minWidth), h && n && (a.left = l - e.maxWidth), k && o && (a.top = m - e.minHeight), i && o && (a.top = m - e.maxHeight);
      var p = !a.width && !a.height;
      return p && !a.left && a.top ? a.top = null : p && !a.top && a.left && (a.left = null), a;
    },
    _proportionallyResize: function () {
      this.options;
      if (this._proportionallyResizeElements.length)
        for (var c = this.helper || this.element, d = 0; d < this._proportionallyResizeElements.length; d++) {
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
          a.browser.msie && (a(c).is(':hidden') || a(c).parents(':hidden').length) || e.css({
            height: c.height() - this.borderDif[0] - this.borderDif[2] || 0,
            width: c.width() - this.borderDif[1] - this.borderDif[3] || 0
          });
        }
    },
    _renderProxy: function () {
      var b = this.element, c = this.options;
      if (this.elementOffset = b.offset(), this._helper) {
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
      e: function (a, b) {
        return { width: this.originalSize.width + b };
      },
      w: function (a, b) {
        var e = (this.options, this.originalSize), f = this.originalPosition;
        return {
          left: f.left + b,
          width: e.width - b
        };
      },
      n: function (a, b, c) {
        var e = (this.options, this.originalSize), f = this.originalPosition;
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
      ]), 'resize' != b && this._trigger(b, c, this.ui());
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
    start: function () {
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
      'object' != typeof e.alsoResize || e.alsoResize.parentNode ? f(e.alsoResize) : e.alsoResize.length ? (e.alsoResize = e.alsoResize[0], f(e.alsoResize)) : a.each(e.alsoResize, function (a) {
        f(a);
      });
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
      'object' != typeof e.alsoResize || e.alsoResize.nodeType ? i(e.alsoResize) : a.each(e.alsoResize, function (a, b) {
        i(a, b);
      });
    },
    stop: function () {
      a(this).removeData('resizable-alsoresize');
    }
  }), a.ui.plugin.add('resizable', 'animate', {
    stop: function (b) {
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
    start: function () {
      var e = a(this).data('resizable'), f = e.options, g = e.element, h = f.containment, i = h instanceof a ? h.get(0) : /parent/.test(h) ? g.parent().get(0) : h;
      if (i)
        if (e.containerElement = a(i), /document/.test(h) || h == document)
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
    resize: function (b) {
      var d = a(this).data('resizable'), e = d.options, g = (d.containerSize, d.containerOffset), i = (d.size, d.position), j = d._aspectRatio || b.shiftKey, k = {
          top: 0,
          left: 0
        }, l = d.containerElement;
      l[0] != document && /static/.test(l.css('position')) && (k = g), i.left < (d._helper ? g.left : 0) && (d.size.width = d.size.width + (d._helper ? d.position.left - g.left : d.position.left - k.left), j && (d.size.height = d.size.width / d.aspectRatio), d.position.left = e.helper ? g.left : 0), i.top < (d._helper ? g.top : 0) && (d.size.height = d.size.height + (d._helper ? d.position.top - g.top : d.position.top), j && (d.size.width = d.size.height * d.aspectRatio), d.position.top = d._helper ? g.top : 0), d.offset.left = d.parentData.left + d.position.left, d.offset.top = d.parentData.top + d.position.top;
      var m = Math.abs((d._helper ? d.offset.left - k.left : d.offset.left - k.left) + d.sizeDiff.width), n = Math.abs((d._helper ? d.offset.top - k.top : d.offset.top - g.top) + d.sizeDiff.height), o = d.containerElement.get(0) == d.element.parent().get(0), p = /relative|absolute/.test(d.containerElement.css('position'));
      o && p && (m -= d.parentData.left), m + d.size.width >= d.parentData.width && (d.size.width = d.parentData.width - m, j && (d.size.height = d.size.width / d.aspectRatio)), n + d.size.height >= d.parentData.height && (d.size.height = d.parentData.height - n, j && (d.size.width = d.size.height * d.aspectRatio));
    },
    stop: function () {
      var d = a(this).data('resizable'), e = d.options, g = (d.position, d.containerOffset), h = d.containerPosition, i = d.containerElement, j = a(d.helper), k = j.offset(), l = j.outerWidth() - d.sizeDiff.width, m = j.outerHeight() - d.sizeDiff.height;
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
    start: function () {
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
      }).addClass('ui-resizable-ghost').addClass('string' == typeof e.ghost ? e.ghost : ''), d.ghost.appendTo(d.helper);
    },
    resize: function () {
      {
        var d = a(this).data('resizable');
        d.options;
      }
      d.ghost && d.ghost.css({
        position: 'relative',
        height: d.size.height,
        width: d.size.width
      });
    },
    stop: function () {
      {
        var d = a(this).data('resizable');
        d.options;
      }
      d.ghost && d.helper && d.helper.get(0).removeChild(d.ghost.get(0));
    }
  }), a.ui.plugin.add('resizable', 'grid', {
    resize: function (b) {
      {
        var d = a(this).data('resizable'), e = d.options, f = d.size, g = d.originalSize, h = d.originalPosition, i = d.axis;
        e._aspectRatio || b.shiftKey;
      }
      e.grid = 'number' == typeof e.grid ? [
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
}(jQuery), function (a) {
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
      if (this.opos = [
          b.pageX,
          b.pageY
        ], !this.options.disabled) {
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
      }
    },
    _mouseDrag: function (b) {
      var c = this;
      if (this.dragged = !0, !this.options.disabled) {
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
          if (i && i.element != c.element[0]) {
            var j = !1;
            'touch' == d.tolerance ? j = !(i.left > g || i.right < e || i.top > h || i.bottom < f) : 'fit' == d.tolerance && (j = i.left > e && i.right < g && i.top > f && i.bottom < h), j ? (i.selected && (i.$element.removeClass('ui-selected'), i.selected = !1), i.unselecting && (i.$element.removeClass('ui-unselecting'), i.unselecting = !1), i.selecting || (i.$element.addClass('ui-selecting'), i.selecting = !0, c._trigger('selecting', b, { selecting: i.element }))) : (i.selecting && ((b.metaKey || b.ctrlKey) && i.startselected ? (i.$element.removeClass('ui-selecting'), i.selecting = !1, i.$element.addClass('ui-selected'), i.selected = !0) : (i.$element.removeClass('ui-selecting'), i.selecting = !1, i.startselected && (i.$element.addClass('ui-unselecting'), i.unselecting = !0), c._trigger('unselecting', b, { unselecting: i.element }))), i.selected && !b.metaKey && !b.ctrlKey && !i.startselected && (i.$element.removeClass('ui-selected'), i.selected = !1, i.$element.addClass('ui-unselecting'), i.unselecting = !0, c._trigger('unselecting', b, { unselecting: i.element })));
          }
        }), !1;
      }
    },
    _mouseStop: function (b) {
      var c = this;
      this.dragged = !1;
      this.options;
      return a('.ui-unselecting', this.element[0]).each(function () {
        var d = a.data(this, 'selectable-item');
        d.$element.removeClass('ui-unselecting'), d.unselecting = !1, d.startselected = !1, c._trigger('unselected', b, { unselected: d.element });
      }), a('.ui-selecting', this.element[0]).each(function () {
        var d = a.data(this, 'selectable-item');
        d.$element.removeClass('ui-selecting').addClass('ui-selected'), d.selecting = !1, d.selected = !0, d.startselected = !0, c._trigger('selected', b, { selected: d.element });
      }), this._trigger('stop', b), this.helper.remove(), !1;
    }
  }), a.extend(a.ui.selectable, { version: '1.8.23' });
}(jQuery), function (a) {
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
      this.containerCache = {}, this.element.addClass('ui-sortable'), this.refresh(), this.floating = this.items.length ? 'x' === a.axis || /left|right/.test(this.items[0].item.css('float')) || /inline|table-cell/.test(this.items[0].item.css('display')) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0;
    },
    destroy: function () {
      a.Widget.prototype.destroy.call(this), this.element.removeClass('ui-sortable ui-sortable-disabled'), this._mouseDestroy();
      for (var b = this.items.length - 1; b >= 0; b--)
        this.items[b].item.removeData(this.widgetName + '-item');
      return this;
    },
    _setOption: function (b, c) {
      'disabled' === b ? (this.options[b] = c, this.widget()[c ? 'addClass' : 'removeClass']('ui-sortable-disabled')) : a.Widget.prototype._setOption.apply(this, arguments);
    },
    _mouseCapture: function (b, c) {
      var d = this;
      if (this.reverting)
        return !1;
      if (this.options.disabled || 'static' == this.options.type)
        return !1;
      this._refreshItems(b);
      {
        var e = null, f = this;
        a(b.target).parents().each(function () {
          return a.data(this, d.widgetName + '-item') == f ? (e = a(this), !1) : void 0;
        });
      }
      if (a.data(b.target, d.widgetName + '-item') == f && (e = a(b.target)), !e)
        return !1;
      if (this.options.handle && !c) {
        var h = !1;
        if (a(this.options.handle, e).find('*').andSelf().each(function () {
            this == b.target && (h = !0);
          }), !h)
          return !1;
      }
      return this.currentItem = e, this._removeCurrentsFromItems(), !0;
    },
    _mouseStart: function (b, c, d) {
      var e = this.options, f = this;
      if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(b), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
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
        }, this.helper[0] != this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), e.containment && this._setContainment(), e.cursor && (a('body').css('cursor') && (this._storedCursor = a('body').css('cursor')), a('body').css('cursor', e.cursor)), e.opacity && (this.helper.css('opacity') && (this._storedOpacity = this.helper.css('opacity')), this.helper.css('opacity', e.opacity)), e.zIndex && (this.helper.css('zIndex') && (this._storedZIndex = this.helper.css('zIndex')), this.helper.css('zIndex', e.zIndex)), this.scrollParent[0] != document && 'HTML' != this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger('start', b, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !d)
        for (var g = this.containers.length - 1; g >= 0; g--)
          this.containers[g]._trigger('activate', b, f._uiHash(this));
      return a.ui.ddmanager && (a.ui.ddmanager.current = this), a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this.dragging = !0, this.helper.addClass('ui-sortable-helper'), this._mouseDrag(b), !0;
    },
    _mouseDrag: function (b) {
      if (this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo('absolute'), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll) {
        var c = this.options, d = !1;
        this.scrollParent[0] != document && 'HTML' != this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - b.pageY < c.scrollSensitivity ? this.scrollParent[0].scrollTop = d = this.scrollParent[0].scrollTop + c.scrollSpeed : b.pageY - this.overflowOffset.top < c.scrollSensitivity && (this.scrollParent[0].scrollTop = d = this.scrollParent[0].scrollTop - c.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - b.pageX < c.scrollSensitivity ? this.scrollParent[0].scrollLeft = d = this.scrollParent[0].scrollLeft + c.scrollSpeed : b.pageX - this.overflowOffset.left < c.scrollSensitivity && (this.scrollParent[0].scrollLeft = d = this.scrollParent[0].scrollLeft - c.scrollSpeed)) : (b.pageY - a(document).scrollTop() < c.scrollSensitivity ? d = a(document).scrollTop(a(document).scrollTop() - c.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < c.scrollSensitivity && (d = a(document).scrollTop(a(document).scrollTop() + c.scrollSpeed)), b.pageX - a(document).scrollLeft() < c.scrollSensitivity ? d = a(document).scrollLeft(a(document).scrollLeft() - c.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < c.scrollSensitivity && (d = a(document).scrollLeft(a(document).scrollLeft() + c.scrollSpeed))), d !== !1 && a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b);
      }
      this.positionAbs = this._convertPositionTo('absolute'), this.options.axis && 'y' == this.options.axis || (this.helper[0].style.left = this.position.left + 'px'), this.options.axis && 'x' == this.options.axis || (this.helper[0].style.top = this.position.top + 'px');
      for (var e = this.items.length - 1; e >= 0; e--) {
        var f = this.items[e], g = f.item[0], h = this._intersectsWithPointer(f);
        if (h && g != this.currentItem[0] && this.placeholder[1 == h ? 'next' : 'prev']()[0] != g && !a.ui.contains(this.placeholder[0], g) && ('semi-dynamic' == this.options.type ? !a.ui.contains(this.element[0], g) : !0)) {
          if (this.direction = 1 == h ? 'down' : 'up', 'pointer' != this.options.tolerance && !this._intersectsWithSides(f))
            break;
          this._rearrange(b, f), this._trigger('change', b, this._uiHash());
          break;
        }
      }
      return this._contactContainers(b), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), this._trigger('sort', b, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1;
    },
    _mouseStop: function (b, c) {
      if (b) {
        if (a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, b), this.options.revert) {
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
      }
    },
    cancel: function () {
      var b = this;
      if (this.dragging) {
        this._mouseUp({ target: null }), 'original' == this.options.helper ? this.currentItem.css(this._storedCSS).removeClass('ui-sortable-helper') : this.currentItem.show();
        for (var c = this.containers.length - 1; c >= 0; c--)
          this.containers[c]._trigger('deactivate', null, b._uiHash(this)), this.containers[c].containerCache.over && (this.containers[c]._trigger('out', null, b._uiHash(this)), this.containers[c].containerCache.over = 0);
      }
      return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), 'original' != this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), a.extend(this, {
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
      var b = this.positionAbs.left, c = b + this.helperProportions.width, d = this.positionAbs.top, e = d + this.helperProportions.height, f = a.left, g = f + a.width, h = a.top, i = h + a.height, j = this.offset.click.top, k = this.offset.click.left, l = d + j > h && i > d + j && b + k > f && g > b + k;
      return 'pointer' == this.options.tolerance || this.options.forcePointerForContainers || 'pointer' != this.options.tolerance && this.helperProportions[this.floating ? 'width' : 'height'] > a[this.floating ? 'width' : 'height'] ? l : f < b + this.helperProportions.width / 2 && c - this.helperProportions.width / 2 < g && h < d + this.helperProportions.height / 2 && e - this.helperProportions.height / 2 < i;
    },
    _intersectsWithPointer: function (b) {
      var c = 'x' === this.options.axis || a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, b.top, b.height), d = 'y' === this.options.axis || a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, b.left, b.width), e = c && d, f = this._getDragVerticalDirection(), g = this._getDragHorizontalDirection();
      return e ? this.floating ? g && 'right' == g || 'down' == f ? 2 : 1 : f && ('down' == f ? 2 : 1) : !1;
    },
    _intersectsWithSides: function (b) {
      var c = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, b.top + b.height / 2, b.height), d = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, b.left + b.width / 2, b.width), e = this._getDragVerticalDirection(), f = this._getDragHorizontalDirection();
      return this.floating && f ? 'right' == f && d || 'left' == f && !d : e && ('down' == e && c || 'up' == e && !c);
    },
    _getDragVerticalDirection: function () {
      var a = this.positionAbs.top - this.lastPositionAbs.top;
      return 0 != a && (a > 0 ? 'down' : 'up');
    },
    _getDragHorizontalDirection: function () {
      var a = this.positionAbs.left - this.lastPositionAbs.left;
      return 0 != a && (a > 0 ? 'right' : 'left');
    },
    refresh: function (a) {
      return this._refreshItems(a), this.refreshPositions(), this;
    },
    _connectWith: function () {
      var a = this.options;
      return a.connectWith.constructor == String ? [a.connectWith] : a.connectWith;
    },
    _getItemsAsjQuery: function (b) {
      var d = [], e = [], f = this._connectWith();
      if (f && b)
        for (var g = f.length - 1; g >= 0; g--)
          for (var h = a(f[g]), i = h.length - 1; i >= 0; i--) {
            var j = a.data(h[i], this.widgetName);
            j && j != this && !j.options.disabled && e.push([
              a.isFunction(j.options.items) ? j.options.items.call(j.element) : a(j.options.items, j.element).not('.ui-sortable-helper').not('.ui-sortable-placeholder'),
              j
            ]);
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
      for (var a = this.currentItem.find(':data(' + this.widgetName + '-item)'), b = 0; b < this.items.length; b++)
        for (var c = 0; c < a.length; c++)
          a[c] == this.items[b].item[0] && this.items.splice(b, 1);
    },
    _refreshItems: function (b) {
      this.items = [], this.containers = [this];
      var c = this.items, e = [[
            a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, { item: this.currentItem }) : a(this.options.items, this.element),
            this
          ]], f = this._connectWith();
      if (f && this.ready)
        for (var g = f.length - 1; g >= 0; g--)
          for (var h = a(f[g]), i = h.length - 1; i >= 0; i--) {
            var j = a.data(h[i], this.widgetName);
            j && j != this && !j.options.disabled && (e.push([
              a.isFunction(j.options.items) ? j.options.items.call(j.element[0], b, { item: this.currentItem }) : a(j.options.items, j.element),
              j
            ]), this.containers.push(j));
          }
      for (var g = e.length - 1; g >= 0; g--)
        for (var k = e[g][1], l = e[g][0], i = 0, m = l.length; m > i; i++) {
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
    },
    refreshPositions: function (b) {
      this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
      for (var c = this.items.length - 1; c >= 0; c--) {
        var d = this.items[c];
        if (d.instance == this.currentContainer || !this.currentContainer || d.item[0] == this.currentItem[0]) {
          var e = this.options.toleranceElement ? a(this.options.toleranceElement, d.item) : d.item;
          b || (d.width = e.outerWidth(), d.height = e.outerHeight());
          var f = e.offset();
          d.left = f.left, d.top = f.top;
        }
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
            (!e || d.forcePlaceholderSize) && (b.height() || b.height(c.currentItem.innerHeight() - parseInt(c.currentItem.css('paddingTop') || 0, 10) - parseInt(c.currentItem.css('paddingBottom') || 0, 10)), b.width() || b.width(c.currentItem.innerWidth() - parseInt(c.currentItem.css('paddingLeft') || 0, 10) - parseInt(c.currentItem.css('paddingRight') || 0, 10)));
          }
        };
      }
      c.placeholder = a(d.placeholder.element.call(c.element, c.currentItem)), c.currentItem.after(c.placeholder), d.placeholder.update(c, c.placeholder);
    },
    _contactContainers: function (b) {
      for (var c = null, d = null, e = this.containers.length - 1; e >= 0; e--)
        if (!a.ui.contains(this.currentItem[0], this.containers[e].element[0]))
          if (this._intersectsWith(this.containers[e].containerCache)) {
            if (c && a.ui.contains(this.containers[e].element[0], c.element[0]))
              continue;
            c = this.containers[e], d = e;
          } else
            this.containers[e].containerCache.over && (this.containers[e]._trigger('out', b, this._uiHash(this)), this.containers[e].containerCache.over = 0);
      if (c)
        if (1 === this.containers.length)
          this.containers[d]._trigger('over', b, this._uiHash(this)), this.containers[d].containerCache.over = 1;
        else if (this.currentContainer != this.containers[d]) {
          for (var f = 10000, g = null, h = this.positionAbs[this.containers[d].floating ? 'left' : 'top'], i = this.items.length - 1; i >= 0; i--)
            if (a.ui.contains(this.containers[d].element[0], this.items[i].item[0])) {
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
        ])) : 'clone' == c.helper ? this.currentItem.clone() : this.currentItem;
      return d.parents('body').length || a('parent' != c.appendTo ? c.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]), d[0] == this.currentItem[0] && (this._storedCSS = {
        width: this.currentItem[0].style.width,
        height: this.currentItem[0].style.height,
        position: this.currentItem.css('position'),
        top: this.currentItem.css('top'),
        left: this.currentItem.css('left')
      }), ('' == d[0].style.width || c.forceHelperSize) && d.width(this.currentItem.width()), ('' == d[0].style.height || c.forceHelperSize) && d.height(this.currentItem.height()), d;
    },
    _adjustOffsetFromHelper: function (b) {
      'string' == typeof b && (b = b.split(' ')), a.isArray(b) && (b = {
        left: +b[0],
        top: +b[1] || 0
      }), 'left' in b && (this.offset.click.left = b.left + this.margins.left), 'right' in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), 'top' in b && (this.offset.click.top = b.top + this.margins.top), 'bottom' in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top);
    },
    _getParentOffset: function () {
      this.offsetParent = this.helper.offsetParent();
      var b = this.offsetParent.offset();
      return 'absolute' == this.cssPosition && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop()), (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && 'html' == this.offsetParent[0].tagName.toLowerCase() && a.browser.msie) && (b = {
        top: 0,
        left: 0
      }), {
        top: b.top + (parseInt(this.offsetParent.css('borderTopWidth'), 10) || 0),
        left: b.left + (parseInt(this.offsetParent.css('borderLeftWidth'), 10) || 0)
      };
    },
    _getRelativeOffset: function () {
      if ('relative' == this.cssPosition) {
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
      if ('parent' == b.containment && (b.containment = this.helper[0].parentNode), ('document' == b.containment || 'window' == b.containment) && (this.containment = [
          0 - this.offset.relative.left - this.offset.parent.left,
          0 - this.offset.relative.top - this.offset.parent.top,
          a('document' == b.containment ? document : window).width() - this.helperProportions.width - this.margins.left,
          (a('document' == b.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
        ]), !/^(document|window|parent)$/.test(b.containment)) {
        var c = a(b.containment)[0], d = a(b.containment).offset(), e = 'hidden' != a(c).css('overflow');
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
      var d = 'absolute' == b ? 1 : -1, f = (this.options, 'absolute' != this.cssPosition || this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent), g = /(html|body)/i.test(f[0].tagName);
      return {
        top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (a.browser.safari && 'fixed' == this.cssPosition ? 0 : ('fixed' == this.cssPosition ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()) * d),
        left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (a.browser.safari && 'fixed' == this.cssPosition ? 0 : ('fixed' == this.cssPosition ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft()) * d)
      };
    },
    _generatePosition: function (b) {
      var c = this.options, d = 'absolute' != this.cssPosition || this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, e = /(html|body)/i.test(d[0].tagName);
      'relative' == this.cssPosition && (this.scrollParent[0] == document || this.scrollParent[0] == this.offsetParent[0]) && (this.offset.relative = this._getRelativeOffset());
      var f = b.pageX, g = b.pageY;
      if (this.originalPosition && (this.containment && (b.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), b.pageY - this.offset.click.top < this.containment[1] && (g = this.containment[1] + this.offset.click.top), b.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), b.pageY - this.offset.click.top > this.containment[3] && (g = this.containment[3] + this.offset.click.top)), c.grid)) {
        var h = this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1];
        g = this.containment && (h - this.offset.click.top < this.containment[1] || h - this.offset.click.top > this.containment[3]) ? h - this.offset.click.top < this.containment[1] ? h + c.grid[1] : h - c.grid[1] : h;
        var i = this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0];
        f = this.containment && (i - this.offset.click.left < this.containment[0] || i - this.offset.click.left > this.containment[2]) ? i - this.offset.click.left < this.containment[0] ? i + c.grid[0] : i - c.grid[0] : i;
      }
      return {
        top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && 'fixed' == this.cssPosition ? 0 : 'fixed' == this.cssPosition ? -this.scrollParent.scrollTop() : e ? 0 : d.scrollTop()),
        left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && 'fixed' == this.cssPosition ? 0 : 'fixed' == this.cssPosition ? -this.scrollParent.scrollLeft() : e ? 0 : d.scrollLeft())
      };
    },
    _rearrange: function (a, b, c, d) {
      c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0], 'down' == this.direction ? b.item[0] : b.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
      var e = this, f = this.counter;
      window.setTimeout(function () {
        f == e.counter && e.refreshPositions(!d);
      }, 0);
    },
    _clear: function (b, c) {
      this.reverting = !1;
      var d = [];
      if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] == this.currentItem[0]) {
        for (var f in this._storedCSS)
          ('auto' == this._storedCSS[f] || 'static' == this._storedCSS[f]) && (this._storedCSS[f] = '');
        this.currentItem.css(this._storedCSS).removeClass('ui-sortable-helper');
      } else
        this.currentItem.show();
      if (this.fromOutside && !c && d.push(function (a) {
          this._trigger('receive', a, this._uiHash(this.fromOutside));
        }), (this.fromOutside || this.domPosition.prev != this.currentItem.prev().not('.ui-sortable-helper')[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !c && d.push(function (a) {
          this._trigger('update', a, this._uiHash());
        }), !a.ui.contains(this.element[0], this.currentItem[0])) {
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
      if (this._storedCursor && a('body').css('cursor', this._storedCursor), this._storedOpacity && this.helper.css('opacity', this._storedOpacity), this._storedZIndex && this.helper.css('zIndex', 'auto' == this._storedZIndex ? '' : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
        if (!c) {
          this._trigger('beforeStop', b, this._uiHash());
          for (var f = 0; f < d.length; f++)
            d[f].call(this, b);
          this._trigger('stop', b, this._uiHash());
        }
        return this.fromOutside = !1, !1;
      }
      if (c || this._trigger('beforeStop', b, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] != this.currentItem[0] && this.helper.remove(), this.helper = null, !c) {
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
    return b && b.constructor == Array && 3 == b.length ? b : (c = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b)) ? [
      parseInt(c[1], 10),
      parseInt(c[2], 10),
      parseInt(c[3], 10)
    ] : (c = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b)) ? [
      2.55 * parseFloat(c[1]),
      2.55 * parseFloat(c[2]),
      2.55 * parseFloat(c[3])
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
      if (e = (a.curCSS || a.css)(b, d), '' != e && 'transparent' != e || a.nodeName(b, 'body'))
        break;
      d = 'backgroundColor';
    } while (b = b.parentNode);
    return c(e);
  }
  function h() {
    var c, d, a = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle, b = {};
    if (a && a.length && a[0] && a[a[0]])
      for (var e = a.length; e--;)
        c = a[e], 'string' == typeof a[c] && (d = c.replace(/\-(\w)/g, function (a, b) {
          return b.toUpperCase();
        }), b[d] = a[c]);
    else
      for (c in a)
        'string' == typeof a[c] && (b[c] = a[c]);
    return b;
  }
  function i(b) {
    var c, d;
    for (c in b)
      d = b[c], (null == d || a.isFunction(d) || c in g || /scrollbar/.test(c) || !/color/i.test(c) && isNaN(parseFloat(d))) && delete b[c];
    return b;
  }
  function j(a, b) {
    var d, c = { _: 0 };
    for (d in b)
      a[d] != b[d] && (c[d] = b[d]);
    return c;
  }
  function k(b, c, d, e) {
    return 'object' == typeof b && (e = c, d = null, c = b, b = c.effect), a.isFunction(c) && (e = c, d = null, c = {}), ('number' == typeof c || a.fx.speeds[c]) && (e = d, d = c, c = {}), a.isFunction(d) && (e = d, d = null), c = c || {}, d = d || c.duration, d = a.fx.off ? 0 : 'number' == typeof d ? d : d in a.fx.speeds ? a.fx.speeds[d] : a.fx.speeds._default, e = e || c.complete, [
      b,
      c,
      d,
      e
    ];
  }
  function l(b) {
    return !b || 'number' == typeof b || a.fx.speeds[b] ? !0 : 'string' != typeof b || a.effects[b] ? !1 : !0;
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
      var m, g = a(this), k = g.attr('style') || ' ', l = i(h.call(this)), n = g.attr('class') || '';
      a.each(f, function (a, c) {
        b[c] && g[c + 'Class'](b[c]);
      }), m = i(h.call(this)), g.attr('class', n), g.animate(j(l, m), {
        queue: !1,
        duration: c,
        easing: d,
        complete: function () {
          a.each(f, function (a, c) {
            b[c] && g[c + 'Class'](b[c]);
          }), 'object' == typeof g.attr('style') ? (g.attr('style').cssText = '', g.attr('style').cssText = k) : g.attr('style', k), e && e.apply(this, arguments), a.dequeue(this);
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
      return 'boolean' == typeof d || d === b ? e ? a.effects.animateClass.apply(this, [
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
        null !== b[c] && a.data('ec.storage.' + b[c], a[0].style[b[c]]);
    },
    restore: function (a, b) {
      for (var c = 0; c < b.length; c++)
        null !== b[c] && a.css(b[c], a.data('ec.storage.' + b[c]));
    },
    setMode: function (a, b) {
      return 'toggle' == b && (b = a.is(':hidden') ? 'show' : 'hide'), b;
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
      return b.wrap(d), (b[0] === e || a.contains(b[0], e)) && a(e).focus(), d = b.parent(), 'static' == b.css('position') ? (d.css({ position: 'relative' }), b.css({ position: 'relative' })) : (a.extend(c, {
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
    effect: function (b) {
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
      if (l(b) || 'boolean' == typeof b || a.isFunction(b))
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
      return 0 === a || 1 === a ? a : -Math.pow(2, 8 * (a - 1)) * Math.sin((80 * (a - 1) - 7.5) * Math.PI / 15);
    },
    Back: function (a) {
      return a * a * (3 * a - 2);
    },
    Bounce: function (a) {
      for (var b, c = 4; a < ((b = Math.pow(2, --c)) - 1) / 11;);
      return 1 / Math.pow(4, 3 - c) - 7.5625 * Math.pow((3 * b - 2) / 22 - a, 2);
    }
  }), a.each(m, function (b, c) {
    a.easing['easeIn' + b] = c, a.easing['easeOut' + b] = function (a) {
      return 1 - c(1 - a);
    }, a.easing['easeInOut' + b] = function (a) {
      return 0.5 > a ? c(2 * a) / 2 : c(-2 * a + 2) / -2 + 1;
    };
  });
}(jQuery), function (a) {
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
      var g = a.effects.createWrapper(c).css({ overflow: 'hidden' }), h = 'vertical' == f ? 'height' : 'width', i = 'vertical' == f ? g.height() : g.width();
      'show' == e && g.css(h, 0);
      var j = {};
      j[h] = 'show' == e ? i : 0, g.animate(j, b.duration, b.options.easing, function () {
        'hide' == e && c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(c[0], arguments), c.dequeue();
      });
    });
  };
}(jQuery), function (a) {
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
      var j = 'up' == f || 'down' == f ? 'top' : 'left', k = 'up' == f || 'left' == f ? 'pos' : 'neg', g = b.options.distance || ('top' == j ? c.outerHeight(!0) / 3 : c.outerWidth(!0) / 3);
      if ('show' == e && c.css('opacity', 0).css(j, 'pos' == k ? -g : g), 'hide' == e && (g /= 2 * h), 'hide' != e && h--, 'show' == e) {
        var l = { opacity: 1 };
        l[j] = ('pos' == k ? '+=' : '-=') + g, c.animate(l, i / 2, b.options.easing), g /= 2, h--;
      }
      for (var m = 0; h > m; m++) {
        var n = {}, p = {};
        n[j] = ('pos' == k ? '-=' : '+=') + g, p[j] = ('pos' == k ? '+=' : '-=') + g, c.animate(n, i / 2, b.options.easing).animate(p, i / 2, b.options.easing), g = 'hide' == e ? 2 * g : g / 2;
      }
      if ('hide' == e) {
        var l = { opacity: 0 };
        l[j] = ('pos' == k ? '-=' : '+=') + g, c.animate(l, i / 2, b.options.easing, function () {
          c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments);
        });
      } else {
        var n = {}, p = {};
        n[j] = ('pos' == k ? '-=' : '+=') + g, p[j] = ('pos' == k ? '+=' : '-=') + g, c.animate(n, i / 2, b.options.easing).animate(p, i / 2, b.options.easing, function () {
          a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments);
        });
      }
      c.queue('fx', function () {
        c.dequeue();
      }), c.dequeue();
    });
  };
}(jQuery), function (a) {
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
      var g = a.effects.createWrapper(c).css({ overflow: 'hidden' }), h = 'IMG' == c[0].tagName ? g : c, i = {
          size: 'vertical' == f ? 'height' : 'width',
          position: 'vertical' == f ? 'top' : 'left'
        }, j = 'vertical' == f ? h.height() : h.width();
      'show' == e && (h.css(i.size, 0), h.css(i.position, j / 2));
      var k = {};
      k[i.size] = 'show' == e ? j : 0, k[i.position] = 'show' == e ? 0 : j / 2, h.animate(k, {
        queue: !1,
        duration: b.duration,
        easing: b.options.easing,
        complete: function () {
          'hide' == e && c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(c[0], arguments), c.dequeue();
        }
      });
    });
  };
}(jQuery), function (a) {
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
      var g = 'up' == f || 'down' == f ? 'top' : 'left', h = 'up' == f || 'left' == f ? 'pos' : 'neg', i = b.options.distance || ('top' == g ? c.outerHeight(!0) / 2 : c.outerWidth(!0) / 2);
      'show' == e && c.css('opacity', 0).css(g, 'pos' == h ? -i : i);
      var j = { opacity: 'show' == e ? 1 : 0 };
      j[g] = ('show' == e ? 'pos' == h ? '+=' : '-=' : 'pos' == h ? '-=' : '+=') + i, c.animate(j, {
        queue: !1,
        duration: b.duration,
        easing: b.options.easing,
        complete: function () {
          'hide' == e && c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments), c.dequeue();
        }
      });
    });
  };
}(jQuery), function (a) {
  a.effects.explode = function (b) {
    return this.queue(function () {
      var c = b.options.pieces ? Math.round(Math.sqrt(b.options.pieces)) : 3, d = b.options.pieces ? Math.round(Math.sqrt(b.options.pieces)) : 3;
      b.options.mode = 'toggle' == b.options.mode ? a(this).is(':visible') ? 'hide' : 'show' : b.options.mode;
      var e = a(this).show().css('visibility', 'hidden'), f = e.offset();
      f.top -= parseInt(e.css('marginTop'), 10) || 0, f.left -= parseInt(e.css('marginLeft'), 10) || 0;
      for (var g = e.outerWidth(!0), h = e.outerHeight(!0), i = 0; c > i; i++)
        for (var j = 0; d > j; j++)
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
            left: f.left + j * (g / d) + ('show' == b.options.mode ? (j - Math.floor(d / 2)) * (g / d) : 0),
            top: f.top + i * (h / c) + ('show' == b.options.mode ? (i - Math.floor(c / 2)) * (h / c) : 0),
            opacity: 'show' == b.options.mode ? 0 : 1
          }).animate({
            left: f.left + j * (g / d) + ('show' == b.options.mode ? 0 : (j - Math.floor(d / 2)) * (g / d)),
            top: f.top + i * (h / c) + ('show' == b.options.mode ? 0 : (i - Math.floor(c / 2)) * (h / c)),
            opacity: 'show' == b.options.mode ? 1 : 0
          }, b.duration || 500);
      setTimeout(function () {
        'show' == b.options.mode ? e.css({ visibility: 'visible' }) : e.css({ visibility: 'visible' }).hide(), b.callback && b.callback.apply(e[0]), e.dequeue(), a('div.ui-effects-explode').remove();
      }, b.duration || 500);
    });
  };
}(jQuery), function (a) {
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
}(jQuery), function (a) {
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
      var i = a.effects.createWrapper(c).css({ overflow: 'hidden' }), j = 'show' == e != g, k = j ? [
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
      m && (f = parseInt(m[1], 10) / 100 * l['hide' == e ? 0 : 1]), 'show' == e && i.css(g ? {
        height: 0,
        width: f
      } : {
        height: f,
        width: 0
      });
      var n = {}, p = {};
      n[k[0]] = 'show' == e ? l[0] : f, p[k[1]] = 'show' == e ? l[1] : 0, i.animate(n, h, b.options.easing).animate(p, h, b.options.easing, function () {
        'hide' == e && c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(c[0], arguments), c.dequeue();
      });
    });
  };
}(jQuery), function (a) {
  a.effects.highlight = function (b) {
    return this.queue(function () {
      var c = a(this), d = [
          'backgroundImage',
          'backgroundColor',
          'opacity'
        ], e = a.effects.setMode(c, b.options.mode || 'show'), f = { backgroundColor: c.css('backgroundColor') };
      'hide' == e && (f.opacity = 0), a.effects.save(c, d), c.show().css({
        backgroundImage: 'none',
        backgroundColor: b.options.color || '#ffff99'
      }).animate(f, {
        queue: !1,
        duration: b.duration,
        easing: b.options.easing,
        complete: function () {
          'hide' == e && c.hide(), a.effects.restore(c, d), 'show' == e && !a.support.opacity && this.style.removeAttribute('filter'), b.callback && b.callback.apply(this, arguments), c.dequeue();
        }
      });
    });
  };
}(jQuery), function (a) {
  a.effects.pulsate = function (b) {
    return this.queue(function () {
      var c = a(this), d = a.effects.setMode(c, b.options.mode || 'show'), e = 2 * (b.options.times || 5) - 1, f = b.duration ? b.duration / 2 : a.fx.speeds._default / 2, g = c.is(':visible'), h = 0;
      g || (c.css('opacity', 0).show(), h = 1), ('hide' == d && g || 'show' == d && !g) && e--;
      for (var i = 0; e > i; i++)
        c.animate({ opacity: h }, f, b.options.easing), h = (h + 1) % 2;
      c.animate({ opacity: h }, f, b.options.easing, function () {
        0 == h && c.hide(), b.callback && b.callback.apply(this, arguments);
      }), c.queue('fx', function () {
        c.dequeue();
      }).dequeue();
    });
  };
}(jQuery), function (a) {
  a.effects.puff = function (b) {
    return this.queue(function () {
      var c = a(this), d = a.effects.setMode(c, b.options.mode || 'hide'), e = parseInt(b.options.percent, 10) || 150, f = e / 100, g = {
          height: c.height(),
          width: c.width()
        };
      a.extend(b.options, {
        fade: !0,
        mode: d,
        percent: 'hide' == d ? e : 100,
        from: 'hide' == d ? g : {
          height: g.height * f,
          width: g.width * f
        }
      }), c.effect('scale', b.options, b.duration, b.callback), c.dequeue();
    });
  }, a.effects.scale = function (b) {
    return this.queue(function () {
      var c = a(this), d = a.extend(!0, {}, b.options), e = a.effects.setMode(c, b.options.mode || 'effect'), f = parseInt(b.options.percent, 10) || (0 == parseInt(b.options.percent, 10) ? 0 : 'hide' == e ? 0 : 100), g = b.options.direction || 'both', h = b.options.origin;
      'effect' != e && (d.origin = h || [
        'middle',
        'center'
      ], d.restore = !0);
      var i = {
          height: c.height(),
          width: c.width()
        };
      c.from = b.options.from || ('show' == e ? {
        height: 0,
        width: 0
      } : i);
      var j = {
          y: 'horizontal' != g ? f / 100 : 1,
          x: 'vertical' != g ? f / 100 : 1
        };
      c.to = {
        height: i.height * j.y,
        width: i.width * j.x
      }, b.options.fade && ('show' == e && (c.from.opacity = 0, c.to.opacity = 1), 'hide' == e && (c.from.opacity = 1, c.to.opacity = 0)), d.from = c.from, d.to = c.to, d.mode = e, c.effect('size', d, b.duration, b.callback), c.dequeue();
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
      if (c.from = b.options.from || n, c.to = b.options.to || n, m) {
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
      ('box' == l || 'both' == l) && (q.from.y != q.to.y && (d = d.concat(h), c.from = a.effects.setTransition(c, h, q.from.y, c.from), c.to = a.effects.setTransition(c, h, q.to.y, c.to)), q.from.x != q.to.x && (d = d.concat(i), c.from = a.effects.setTransition(c, i, q.from.x, c.from), c.to = a.effects.setTransition(c, i, q.to.x, c.to))), ('content' == l || 'both' == l) && q.from.y != q.to.y && (d = d.concat(g), c.from = a.effects.setTransition(c, g, q.from.y, c.from), c.to = a.effects.setTransition(c, g, q.to.y, c.to)), a.effects.save(c, k ? d : e), c.show(), a.effects.createWrapper(c), c.css('overflow', 'hidden').css(c.from), ('content' == l || 'both' == l) && (h = h.concat([
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
      })), c.animate(c.to, {
        queue: !1,
        duration: b.duration,
        easing: b.options.easing,
        complete: function () {
          0 === c.to.opacity && c.css('opacity', c.from.opacity), 'hide' == j && c.hide(), a.effects.restore(c, k ? d : e), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments), c.dequeue();
        }
      });
    });
  };
}(jQuery), function (a) {
  a.effects.shake = function (b) {
    return this.queue(function () {
      var c = a(this), d = [
          'position',
          'top',
          'bottom',
          'left',
          'right'
        ], f = (a.effects.setMode(c, b.options.mode || 'effect'), b.options.direction || 'left'), g = b.options.distance || 20, h = b.options.times || 3, i = b.duration || b.options.duration || 140;
      a.effects.save(c, d), c.show(), a.effects.createWrapper(c);
      var j = 'up' == f || 'down' == f ? 'top' : 'left', k = 'up' == f || 'left' == f ? 'pos' : 'neg', l = {}, m = {}, n = {};
      l[j] = ('pos' == k ? '-=' : '+=') + g, m[j] = ('pos' == k ? '+=' : '-=') + 2 * g, n[j] = ('pos' == k ? '-=' : '+=') + 2 * g, c.animate(l, i, b.options.easing);
      for (var p = 1; h > p; p++)
        c.animate(m, i, b.options.easing).animate(n, i, b.options.easing);
      c.animate(m, i, b.options.easing).animate(l, i / 2, b.options.easing, function () {
        a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments);
      }), c.queue('fx', function () {
        c.dequeue();
      }), c.dequeue();
    });
  };
}(jQuery), function (a) {
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
      var g = 'up' == f || 'down' == f ? 'top' : 'left', h = 'up' == f || 'left' == f ? 'pos' : 'neg', i = b.options.distance || ('top' == g ? c.outerHeight(!0) : c.outerWidth(!0));
      'show' == e && c.css(g, 'pos' == h ? isNaN(i) ? '-' + i : -i : i);
      var j = {};
      j[g] = ('show' == e ? 'pos' == h ? '+=' : '-=' : 'pos' == h ? '-=' : '+=') + i, c.animate(j, {
        queue: !1,
        duration: b.duration,
        easing: b.options.easing,
        complete: function () {
          'hide' == e && c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments), c.dequeue();
        }
      });
    });
  };
}(jQuery), function (a) {
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
}(jQuery), function (a) {
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
      if (b.running = 0, b.element.addClass('ui-accordion ui-widget ui-helper-reset').children('li').addClass('ui-accordion-li-fix'), b.headers = b.element.find(c.header).addClass('ui-accordion-header ui-helper-reset ui-state-default ui-corner-all').bind('mouseenter.accordion', function () {
          c.disabled || a(this).addClass('ui-state-hover');
        }).bind('mouseleave.accordion', function () {
          c.disabled || a(this).removeClass('ui-state-hover');
        }).bind('focus.accordion', function () {
          c.disabled || a(this).addClass('ui-state-focus');
        }).bind('blur.accordion', function () {
          c.disabled || a(this).removeClass('ui-state-focus');
        }), b.headers.next().addClass('ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom'), c.navigation) {
        var d = b.element.find('a').filter(c.navigationFilter).eq(0);
        if (d.length) {
          var e = d.closest('.ui-accordion-header');
          b.active = e.length ? e : d.closest('.ui-accordion-content').prev();
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
      a.Widget.prototype._setOption.apply(this, arguments), 'active' == b && this.activate(c), 'icons' == b && (this._destroyIcons(), c && this._createIcons()), 'disabled' == b && this.headers.add(this.headers.next())[c ? 'addClass' : 'removeClass']('ui-accordion-disabled ui-state-disabled');
    },
    _keydown: function (b) {
      if (!(this.options.disabled || b.altKey || b.ctrlKey)) {
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
      }
    },
    resize: function () {
      var c, b = this.options;
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
      return b ? 'number' == typeof b ? this.headers.filter(':eq(' + b + ')') : this.headers.not(this.headers.not(b)) : b === !1 ? a([]) : this.headers.filter(':eq(0)');
    },
    _clickHandler: function (b, c) {
      var d = this.options;
      if (!d.disabled) {
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
          return void this._toggle(g, e, f);
        }
        var h = a(b.currentTarget || c), i = h[0] === this.active[0];
        if (d.active = d.collapsible && i ? !1 : this.headers.index(h), !(this.running || !d.collapsible && i)) {
          var j = this.active, g = h.next(), e = this.active.next(), f = {
              options: d,
              newHeader: i && d.collapsible ? a([]) : h,
              oldHeader: this.active,
              newContent: i && d.collapsible ? a([]) : g,
              oldContent: e
            }, k = this.headers.index(this.active[0]) > this.headers.index(h[0]);
          this.active = i ? a([]) : h, this._toggle(g, e, f, i, k), j.removeClass('ui-state-active ui-corner-top').addClass('ui-state-default ui-corner-all').children('.ui-icon').removeClass(d.icons.headerSelected).addClass(d.icons.header), i || (h.removeClass('ui-state-default ui-corner-all').addClass('ui-state-active ui-corner-top').children('.ui-icon').removeClass(d.icons.header).addClass(d.icons.headerSelected), h.next().addClass('ui-accordion-content-active'));
        }
      }
    },
    _toggle: function (b, c, d, e, f) {
      var g = this, h = g.options;
      g.toShow = b, g.toHide = c, g.data = d;
      var i = function () {
        return g ? g._completed.apply(g, arguments) : void 0;
      };
      if (g._trigger('changestart', null, g.data), g.running = 0 === c.size() ? b.size() : c.size(), h.animated) {
        var j = {};
        j = h.collapsible && e ? {
          toShow: a([]),
          toHide: c,
          complete: i,
          down: f,
          autoHeight: h.autoHeight || h.fillSpace
        } : {
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
      this.running = a ? 0 : --this.running, this.running || (this.options.clearStyle && this.toShow.add(this.toHide).css({
        height: '',
        overflow: ''
      }), this.toHide.removeClass('ui-accordion-content-active'), this.toHide.length && (this.toHide.parent()[0].className = this.toHide.parent()[0].className), this._trigger('change', null, this.data));
    }
  }), a.extend(a.ui.accordion, {
    version: '1.8.23',
    animations: {
      slide: function (b, c) {
        if (b = a.extend({
            easing: 'swing',
            duration: 300
          }, b, c), !b.toHide.size())
          return void b.toShow.animate({
            height: 'show',
            paddingTop: 'show',
            paddingBottom: 'show'
          }, b);
        if (!b.toShow.size())
          return void b.toHide.animate({
            height: 'hide',
            paddingTop: 'hide',
            paddingBottom: 'hide'
          }, b);
        var i, d = b.toShow.css('overflow'), e = 0, f = {}, g = {}, h = [
            'height',
            'paddingTop',
            'paddingBottom'
          ], j = b.toShow;
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
            'height' == c.prop && (e = c.end - c.start === 0 ? 0 : (c.now - c.start) / (c.end - c.start)), b.toShow[0].style[c.prop] = e * f[c.prop].value + f[c.prop].unit;
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
}(jQuery), function (a) {
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
      var d, b = this, c = this.element[0].ownerDocument;
      this.isMultiLine = this.element.is('textarea'), this.element.addClass('ui-autocomplete-input').attr('autocomplete', 'off').attr({
        role: 'textbox',
        'aria-autocomplete': 'list',
        'aria-haspopup': 'true'
      }).bind('keydown.autocomplete', function (c) {
        if (!b.options.disabled && !b.element.propAttr('readOnly')) {
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
        }
      }).bind('keypress.autocomplete', function (a) {
        d && (d = !1, a.preventDefault());
      }).bind('focus.autocomplete', function () {
        b.options.disabled || (b.selectedItem = null, b.previous = b.element.val());
      }).bind('blur.autocomplete', function (a) {
        b.options.disabled || (clearTimeout(b.searching), b.closing = setTimeout(function () {
          b.close(a), b._change(a);
        }, 150));
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
        blur: function () {
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
      a.Widget.prototype._setOption.apply(this, arguments), 'source' === b && this._initSource(), 'appendTo' === b && this.menu.element.appendTo(a(c || 'body', this.element[0].ownerDocument)[0]), 'disabled' === b && c && this.xhr && this.xhr.abort();
    },
    _initSource: function () {
      var c, d, b = this;
      a.isArray(this.options.source) ? (c = this.options.source, this.source = function (b, d) {
        d(a.ui.autocomplete.filter(c, b.term));
      }) : 'string' == typeof this.options.source ? (d = this.options.source, this.source = function (c, e) {
        b.xhr && b.xhr.abort(), b.xhr = a.ajax({
          url: d,
          data: c,
          dataType: 'json',
          success: function (a) {
            e(a);
          },
          error: function () {
            e([]);
          }
        });
      }) : this.source = this.options.source;
    },
    search: function (a, b) {
      return a = null != a ? a : this.element.val(), this.term = this.element.val(), a.length < this.options.minLength ? this.close(b) : (clearTimeout(this.closing), this._trigger('search', b) !== !1 ? this._search(a) : void 0);
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
        return 'string' == typeof b ? {
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
      return this.menu.element.is(':visible') ? this.menu.first() && /^previous/.test(a) || this.menu.last() && /^next/.test(a) ? (this.element.val(this.term), void this.menu.deactivate()) : void this.menu[a](b) : void this.search(null, b);
    },
    widget: function () {
      return this.menu.element;
    },
    _keyEvent: function (a, b) {
      (!this.isMultiLine || this.menu.element.is(':visible')) && (this._move(a, b), b.preventDefault());
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
        a(c.target).closest('.ui-menu-item a').length && (c.preventDefault(), b.select(c));
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
      if (this.deactivate(), this.hasScroll()) {
        var c = b.offset().top - this.element.offset().top, d = this.element.scrollTop(), e = this.element.height();
        0 > c ? this.element.scrollTop(d + c) : c >= e && this.element.scrollTop(d + c - e + b.height());
      }
      this.active = b.eq(0).children('a').addClass('ui-state-hover').attr('id', 'ui-active-menuitem').end(), this._trigger('focus', a, { item: b });
    },
    deactivate: function () {
      this.active && (this.active.children('a').removeClass('ui-state-hover').removeAttr('id'), this._trigger('blur'), this.active = null);
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
      if (!this.active)
        return void this.activate(c, this.element.children(b));
      var d = this.active[a + 'All']('.ui-menu-item').eq(0);
      d.length ? this.activate(c, d) : this.activate(c, this.element.children(b));
    },
    nextPage: function (b) {
      if (this.hasScroll()) {
        if (!this.active || this.last())
          return void this.activate(b, this.element.children('.ui-menu-item:first'));
        var c = this.active.offset().top, d = this.element.height(), e = this.element.children('.ui-menu-item').filter(function () {
            var b = a(this).offset().top - c - d + a(this).height();
            return 10 > b && b > -10;
          });
        e.length || (e = this.element.children('.ui-menu-item:last')), this.activate(b, e);
      } else
        this.activate(b, this.element.children('.ui-menu-item').filter(!this.active || this.last() ? ':first' : ':last'));
    },
    previousPage: function (b) {
      if (this.hasScroll()) {
        if (!this.active || this.first())
          return void this.activate(b, this.element.children('.ui-menu-item:last'));
        var c = this.active.offset().top, d = this.element.height(), e = this.element.children('.ui-menu-item').filter(function () {
            var b = a(this).offset().top - c + d - a(this).height();
            return 10 > b && b > -10;
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
}(jQuery), function (a) {
  var c, d, e, f, g = 'ui-button ui-widget ui-state-default ui-corner-all', h = 'ui-state-hover ui-state-active ', i = 'ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only', j = function () {
      var b = a(this).find(':ui-button');
      setTimeout(function () {
        b.button('refresh');
      }, 1);
    }, k = function (b) {
      var c = b.name, d = b.form, e = a([]);
      return c && (e = d ? a(d).find('[name=\'' + c + '\']') : a('[name=\'' + c + '\']', b.ownerDocument).filter(function () {
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
      this.element.closest('form').unbind('reset.button').bind('reset.button', j), 'boolean' != typeof this.options.disabled ? this.options.disabled = !!this.element.propAttr('disabled') : this.element.propAttr('disabled', this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr('title');
      var b = this, h = this.options, i = 'checkbox' === this.type || 'radio' === this.type, l = 'ui-state-hover' + (i ? '' : ' ui-state-active'), m = 'ui-state-focus';
      null === h.label && (h.label = this.buttonElement.html()), this.buttonElement.addClass(g).attr('role', 'button').bind('mouseenter.button', function () {
        h.disabled || (a(this).addClass('ui-state-hover'), this === c && a(this).addClass('ui-state-active'));
      }).bind('mouseleave.button', function () {
        h.disabled || a(this).removeClass(l);
      }).bind('click.button', function (a) {
        h.disabled && (a.preventDefault(), a.stopImmediatePropagation());
      }), this.element.bind('focus.button', function () {
        b.buttonElement.addClass(m);
      }).bind('blur.button', function () {
        b.buttonElement.removeClass(m);
      }), i && (this.element.bind('change.button', function () {
        f || b.refresh();
      }), this.buttonElement.bind('mousedown.button', function (a) {
        h.disabled || (f = !1, d = a.pageX, e = a.pageY);
      }).bind('mouseup.button', function (a) {
        h.disabled || (d !== a.pageX || e !== a.pageY) && (f = !0);
      })), 'checkbox' === this.type ? this.buttonElement.bind('click.button', function () {
        return h.disabled || f ? !1 : (a(this).toggleClass('ui-state-active'), void b.buttonElement.attr('aria-pressed', b.element[0].checked));
      }) : 'radio' === this.type ? this.buttonElement.bind('click.button', function () {
        if (h.disabled || f)
          return !1;
        a(this).addClass('ui-state-active'), b.buttonElement.attr('aria-pressed', 'true');
        var c = b.element[0];
        k(c).not(c).map(function () {
          return a(this).button('widget')[0];
        }).removeClass('ui-state-active').attr('aria-pressed', 'false');
      }) : (this.buttonElement.bind('mousedown.button', function () {
        return h.disabled ? !1 : (a(this).addClass('ui-state-active'), c = this, a(document).one('mouseup', function () {
          c = null;
        }), void 0);
      }).bind('mouseup.button', function () {
        return h.disabled ? !1 : void a(this).removeClass('ui-state-active');
      }).bind('keydown.button', function (b) {
        return h.disabled ? !1 : void ((b.keyCode == a.ui.keyCode.SPACE || b.keyCode == a.ui.keyCode.ENTER) && a(this).addClass('ui-state-active'));
      }).bind('keyup.button', function () {
        a(this).removeClass('ui-state-active');
      }), this.buttonElement.is('a') && this.buttonElement.keyup(function (b) {
        b.keyCode === a.ui.keyCode.SPACE && a(this).click();
      })), this._setOption('disabled', h.disabled), this._resetButton();
    },
    _determineButtonType: function () {
      if (this.type = this.element.is(':checkbox') ? 'checkbox' : this.element.is(':radio') ? 'radio' : this.element.is('input') ? 'input' : 'button', 'checkbox' === this.type || 'radio' === this.type) {
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
      return a.Widget.prototype._setOption.apply(this, arguments), 'disabled' === b ? void (c ? this.element.propAttr('disabled', !0) : this.element.propAttr('disabled', !1)) : void this._resetButton();
    },
    refresh: function () {
      var b = this.element.is(':disabled');
      b !== this.options.disabled && this._setOption('disabled', b), 'radio' === this.type ? k(this.element[0]).each(function () {
        a(this).is(':checked') ? a(this).button('widget').addClass('ui-state-active').attr('aria-pressed', 'true') : a(this).button('widget').removeClass('ui-state-active').attr('aria-pressed', 'false');
      }) : 'checkbox' === this.type && (this.element.is(':checked') ? this.buttonElement.addClass('ui-state-active').attr('aria-pressed', 'true') : this.buttonElement.removeClass('ui-state-active').attr('aria-pressed', 'false'));
    },
    _resetButton: function () {
      if ('input' === this.type)
        return void (this.options.label && this.element.val(this.options.label));
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
      'disabled' === b && this.buttons.button('option', b, c), a.Widget.prototype._setOption.apply(this, arguments);
    },
    refresh: function () {
      var b = 'rtl' === this.element.css('direction');
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
      c.length && c.removeClass('ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover');
    }).bind('mouseover', function (c) {
      var d = $(c.target).closest(b);
      !$.datepicker._isDisabledDatepicker(instActive.inline ? a.parent()[0] : instActive.input[0]) && d.length && (d.parents('.ui-datepicker-calendar').find('a').removeClass('ui-state-hover'), d.addClass('ui-state-hover'), d.hasClass('ui-datepicker-prev') && d.addClass('ui-datepicker-prev-hover'), d.hasClass('ui-datepicker-next') && d.addClass('ui-datepicker-next-hover'));
    });
  }
  function extendRemove(a, b) {
    $.extend(a, b);
    for (var c in b)
      (null == b[c] || b[c] == undefined) && (a[c] = b[c]);
    return a;
  }
  function isArray(a) {
    return a && ($.browser.safari && 'object' == typeof a && a.length || a.constructor && a.constructor.toString().match(/\Array\(\)/));
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
      var nodeName = target.nodeName.toLowerCase(), inline = 'div' == nodeName || 'span' == nodeName;
      target.id || (this.uuid += 1, target.id = 'dp' + this.uuid);
      var inst = this._newInst($(target), inline);
      inst.settings = $.extend({}, settings || {}, inlineSettings || {}), 'input' == nodeName ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst);
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
      b.append = $([]), b.trigger = $([]), c.hasClass(this.markerClassName) || (this._attachments(c, b), c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind('setData.datepicker', function (a, c, d) {
        b.settings[c] = d;
      }).bind('getData.datepicker', function (a, c) {
        return this._get(b, c);
      }), this._autoSize(b), $.data(a, PROP_NAME, b), b.settings.disabled && this._disableDatepicker(a));
    },
    _attachments: function (a, b) {
      var c = this._get(b, 'appendText'), d = this._get(b, 'isRTL');
      b.append && b.append.remove(), c && (b.append = $('<span class="' + this._appendClass + '">' + c + '</span>'), a[d ? 'before' : 'after'](b.append)), a.unbind('focus', this._showDatepicker), b.trigger && b.trigger.remove();
      var e = this._get(b, 'showOn');
      if (('focus' == e || 'both' == e) && a.focus(this._showDatepicker), 'button' == e || 'both' == e) {
        var f = this._get(b, 'buttonText'), g = this._get(b, 'buttonImage');
        b.trigger = $(this._get(b, 'buttonImageOnly') ? $('<img/>').addClass(this._triggerClass).attr({
          src: g,
          alt: f,
          title: f
        }) : $('<button type="button"></button>').addClass(this._triggerClass).html('' == g ? f : $('<img/>').attr({
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
            for (var b = 0, c = 0, d = 0; d < a.length; d++)
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
      c.hasClass(this.markerClassName) || (c.addClass(this.markerClassName).append(b.dpDiv).bind('setData.datepicker', function (a, c, d) {
        b.settings[c] = d;
      }).bind('getData.datepicker', function (a, c) {
        return this._get(b, c);
      }), $.data(a, PROP_NAME, b), this._setDate(b, this._getDefaultDate(b), !0), this._updateDatepicker(b), this._updateAlternate(b), b.settings.disabled && this._disableDatepicker(a), b.dpDiv.css('display', 'block'));
    },
    _dialogDatepicker: function (a, b, c, d, e) {
      var f = this._dialogInst;
      if (!f) {
        this.uuid += 1;
        var g = 'dp' + this.uuid;
        this._dialogInput = $('<input type="text" id="' + g + '" style="position: absolute; top: -100px; width: 0px;"/>'), this._dialogInput.keydown(this._doKeyDown), $('body').append(this._dialogInput), f = this._dialogInst = this._newInst(this._dialogInput, !1), f.settings = {}, $.data(this._dialogInput[0], PROP_NAME, f);
      }
      if (extendRemove(f.settings, d || {}), b = b && b.constructor == Date ? this._formatDate(f, b) : b, this._dialogInput.val(b), this._pos = e ? e.length ? e : [
          e.pageX,
          e.pageY
        ] : null, !this._pos) {
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
      if (b.hasClass(this.markerClassName)) {
        var d = a.nodeName.toLowerCase();
        $.removeData(a, PROP_NAME), 'input' == d ? (c.append.remove(), c.trigger.remove(), b.removeClass(this.markerClassName).unbind('focus', this._showDatepicker).unbind('keydown', this._doKeyDown).unbind('keypress', this._doKeyPress).unbind('keyup', this._doKeyUp)) : ('div' == d || 'span' == d) && b.removeClass(this.markerClassName).empty();
      }
    },
    _enableDatepicker: function (a) {
      var b = $(a), c = $.data(a, PROP_NAME);
      if (b.hasClass(this.markerClassName)) {
        var d = a.nodeName.toLowerCase();
        if ('input' == d)
          a.disabled = !1, c.trigger.filter('button').each(function () {
            this.disabled = !1;
          }).end().filter('img').css({
            opacity: '1.0',
            cursor: ''
          });
        else if ('div' == d || 'span' == d) {
          var e = b.children('.' + this._inlineClass);
          e.children().removeClass('ui-state-disabled'), e.find('select.ui-datepicker-month, select.ui-datepicker-year').removeAttr('disabled');
        }
        this._disabledInputs = $.map(this._disabledInputs, function (b) {
          return b == a ? null : b;
        });
      }
    },
    _disableDatepicker: function (a) {
      var b = $(a), c = $.data(a, PROP_NAME);
      if (b.hasClass(this.markerClassName)) {
        var d = a.nodeName.toLowerCase();
        if ('input' == d)
          a.disabled = !0, c.trigger.filter('button').each(function () {
            this.disabled = !0;
          }).end().filter('img').css({
            opacity: '0.5',
            cursor: 'default'
          });
        else if ('div' == d || 'span' == d) {
          var e = b.children('.' + this._inlineClass);
          e.children().addClass('ui-state-disabled'), e.find('select.ui-datepicker-month, select.ui-datepicker-year').attr('disabled', 'disabled');
        }
        this._disabledInputs = $.map(this._disabledInputs, function (b) {
          return b == a ? null : b;
        }), this._disabledInputs[this._disabledInputs.length] = a;
      }
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
      if (2 == arguments.length && 'string' == typeof b)
        return 'defaults' == b ? $.extend({}, $.datepicker._defaults) : d ? 'all' == b ? $.extend({}, d.settings) : this._get(d, b) : null;
      var e = b || {};
      if ('string' == typeof b && (e = {}, e[b] = c), d) {
        this._curInst == d && this._hideDatepicker();
        var f = this._getDateDatepicker(a, !0), g = this._getMinMaxDate(d, 'min'), h = this._getMinMaxDate(d, 'max');
        extendRemove(d.settings, e), null !== g && e.dateFormat !== undefined && e.minDate === undefined && (d.settings.minDate = this._formatDate(d, g)), null !== h && e.dateFormat !== undefined && e.maxDate === undefined && (d.settings.maxDate = this._formatDate(d, h)), this._attachments($(a), d), this._autoSize(d), this._setDate(d, f), this._updateAlternate(d), this._updateDatepicker(d);
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
      if (b._keyEvent = !0, $.datepicker._datepickerShowing)
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
        36 == a.keyCode && a.ctrlKey ? $.datepicker._showDatepicker(this) : c = !1;
      c && (a.preventDefault(), a.stopPropagation());
    },
    _doKeyPress: function (a) {
      var b = $.datepicker._getInst(a.target);
      if ($.datepicker._get(b, 'constrainInput')) {
        var c = $.datepicker._possibleChars($.datepicker._get(b, 'dateFormat')), d = String.fromCharCode(a.charCode == undefined ? a.keyCode : a.charCode);
        return a.ctrlKey || a.metaKey || ' ' > d || !c || c.indexOf(d) > -1;
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
      if (a = a.target || a, 'input' != a.nodeName.toLowerCase() && (a = $('input', a.parentNode)[0]), !$.datepicker._isDisabledDatepicker(a) && $.datepicker._lastInput != a) {
        var b = $.datepicker._getInst(a);
        $.datepicker._curInst && $.datepicker._curInst != b && ($.datepicker._curInst.dpDiv.stop(!0, !0), b && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0]));
        var c = $.datepicker._get(b, 'beforeShow'), d = c ? c.apply(a, [
            a,
            b
          ]) : {};
        if (d !== !1) {
          extendRemove(b.settings, d), b.lastVal = null, $.datepicker._lastInput = a, $.datepicker._setDateFromField(b), $.datepicker._inDialog && (a.value = ''), $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(a), $.datepicker._pos[1] += a.offsetHeight);
          var e = !1;
          $(a).parents().each(function () {
            return e |= 'fixed' == $(this).css('position'), !e;
          }), e && $.browser.opera && ($.datepicker._pos[0] -= document.documentElement.scrollLeft, $.datepicker._pos[1] -= document.documentElement.scrollTop);
          var f = {
              left: $.datepicker._pos[0],
              top: $.datepicker._pos[1]
            };
          if ($.datepicker._pos = null, b.dpDiv.empty(), b.dpDiv.css({
              position: 'absolute',
              display: 'block',
              top: '-1000px'
            }), $.datepicker._updateDatepicker(b), f = $.datepicker._checkOffset(b, f, e), b.dpDiv.css({
              position: $.datepicker._inDialog && $.blockUI ? 'static' : e ? 'fixed' : 'absolute',
              display: 'none',
              left: f.left + 'px',
              top: f.top + 'px'
            }), !b.inline) {
            var g = $.datepicker._get(b, 'showAnim'), h = $.datepicker._get(b, 'duration'), i = function () {
                var a = b.dpDiv.find('iframe.ui-datepicker-cover');
                if (a.length) {
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
        }
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
      if (a.dpDiv.removeClass('ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4').width(''), f > 1 && a.dpDiv.addClass('ui-datepicker-multi-' + f).css('width', g * f + 'em'), a.dpDiv[(1 != e[0] || 1 != e[1] ? 'add' : 'remove') + 'Class']('ui-datepicker-multi'), a.dpDiv[(this._get(a, 'isRTL') ? 'add' : 'remove') + 'Class']('ui-datepicker-rtl'), a == $.datepicker._curInst && $.datepicker._datepickerShowing && a.input && a.input.is(':visible') && !a.input.is(':disabled') && a.input[0] != document.activeElement && a.input.focus(), a.yearshtml) {
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
      for (var b = this._getInst(a), c = this._get(b, 'isRTL'); a && ('hidden' == a.type || 1 != a.nodeType || $.expr.filters.hidden(a));)
        a = a[c ? 'previousSibling' : 'nextSibling'];
      var d = $(a).offset();
      return [
        d.left,
        d.top
      ];
    },
    _hideDatepicker: function (a) {
      var b = this._curInst;
      if (b && (!a || b == $.data(a, PROP_NAME)) && this._datepickerShowing) {
        var c = this._get(b, 'showAnim'), d = this._get(b, 'duration'), e = function () {
            $.datepicker._tidyDialog(b);
          };
        $.effects && $.effects[c] ? b.dpDiv.hide(c, $.datepicker._get(b, 'showOptions'), d, e) : b.dpDiv['slideDown' == c ? 'slideUp' : 'fadeIn' == c ? 'fadeOut' : 'hide'](c ? d : null, e), c || e(), this._datepickerShowing = !1;
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
      if ($.datepicker._curInst) {
        var b = $(a.target), c = $.datepicker._getInst(b[0]);
        (b[0].id != $.datepicker._mainDivId && 0 == b.parents('#' + $.datepicker._mainDivId).length && !b.hasClass($.datepicker.markerClassName) && !b.closest('.' + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && (!$.datepicker._inDialog || !$.blockUI) || b.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != c) && $.datepicker._hideDatepicker();
      }
    },
    _adjustDate: function (a, b, c) {
      var d = $(a), e = this._getInst(d[0]);
      this._isDisabledDatepicker(d[0]) || (this._adjustInstDate(e, b + ('M' == c ? this._get(e, 'showCurrentAtPos') : 0), c), this._updateDatepicker(e));
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
      e['selected' + ('M' == c ? 'Month' : 'Year')] = e['draw' + ('M' == c ? 'Month' : 'Year')] = parseInt(b.options[b.selectedIndex].value, 10), this._notifyChange(e), this._adjustDate(d);
    },
    _selectDay: function (a, b, c, d) {
      var e = $(a);
      if (!$(d).hasClass(this._unselectableClass) && !this._isDisabledDatepicker(e[0])) {
        var f = this._getInst(e[0]);
        f.selectedDay = f.currentDay = $('a', d).html(), f.selectedMonth = f.currentMonth = b, f.selectedYear = f.currentYear = c, this._selectDate(a, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear));
      }
    },
    _clearDate: function (a) {
      {
        var b = $(a);
        this._getInst(b[0]);
      }
      this._selectDate(b, '');
    },
    _selectDate: function (a, b) {
      var c = $(a), d = this._getInst(c[0]);
      b = null != b ? b : this._formatDate(d), d.input && d.input.val(b), this._updateAlternate(d);
      var e = this._get(d, 'onSelect');
      e ? e.apply(d.input ? d.input[0] : null, [
        b,
        d
      ]) : d.input && d.input.trigger('change'), d.inline ? this._updateDatepicker(d) : (this._hideDatepicker(), this._lastInput = d.input[0], 'object' != typeof d.input[0] && d.input.focus(), this._lastInput = null);
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
        b > 0 && 6 > b,
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
      if (null == a || null == b)
        throw 'Invalid arguments';
      if (b = 'object' == typeof b ? b.toString() : b + '', '' == b)
        return null;
      var d = (c ? c.shortYearCutoff : null) || this._defaults.shortYearCutoff;
      d = 'string' != typeof d ? d : new Date().getFullYear() % 100 + parseInt(d, 10);
      for (var e = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort, f = (c ? c.dayNames : null) || this._defaults.dayNames, g = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort, h = (c ? c.monthNames : null) || this._defaults.monthNames, i = -1, j = -1, k = -1, l = -1, m = !1, n = function (b) {
            var c = s + 1 < a.length && a.charAt(s + 1) == b;
            return c && s++, c;
          }, o = function (a) {
            var c = n(a), d = '@' == a ? 14 : '!' == a ? 20 : 'y' == a && c ? 4 : 'o' == a ? 3 : 2, e = new RegExp('^\\d{1,' + d + '}'), f = b.substring(r).match(e);
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
            if ($.each(e, function (a, c) {
                var d = c[1];
                return b.substr(r, d.length).toLowerCase() == d.toLowerCase() ? (f = c[0], r += d.length, !1) : void 0;
              }), -1 != f)
              return f + 1;
            throw 'Unknown name at position ' + r;
          }, q = function () {
            if (b.charAt(r) != a.charAt(s))
              throw 'Unexpected literal at position ' + r;
            r++;
          }, r = 0, s = 0; s < a.length; s++)
        if (m)
          '\'' != a.charAt(s) || n('\'') ? q() : m = !1;
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
      if (-1 == i ? i = new Date().getFullYear() : 100 > i && (i += new Date().getFullYear() - new Date().getFullYear() % 100 + (d >= i ? 0 : -100)), l > -1)
        for (j = 1, k = l;;) {
          var u = this._getDaysInMonth(i, j - 1);
          if (u >= k)
            break;
          j++, k -= u;
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
    _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 10000000,
    formatDate: function (a, b, c) {
      if (!b)
        return '';
      var d = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort, e = (c ? c.dayNames : null) || this._defaults.dayNames, f = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort, g = (c ? c.monthNames : null) || this._defaults.monthNames, h = function (b) {
          var c = m + 1 < a.length && a.charAt(m + 1) == b;
          return c && m++, c;
        }, i = function (a, b, c) {
          var d = '' + b;
          if (h(a))
            for (; d.length < c;)
              d = '0' + d;
          return d;
        }, j = function (a, b, c, d) {
          return h(a) ? d[b] : c[b];
        }, k = '', l = !1;
      if (b)
        for (var m = 0; m < a.length; m++)
          if (l)
            '\'' != a.charAt(m) || h('\'') ? k += a.charAt(m) : l = !1;
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
              k += 10000 * b.getTime() + this._ticksTo1970;
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
      for (var b = '', c = !1, d = function (b) {
            var c = e + 1 < a.length && a.charAt(e + 1) == b;
            return c && e++, c;
          }, e = 0; e < a.length; e++)
        if (c)
          '\'' != a.charAt(e) || d('\'') ? b += a.charAt(e) : c = !1;
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
      if (a.input.val() != a.lastVal) {
        var e, f, c = this._get(a, 'dateFormat'), d = a.lastVal = a.input ? a.input.val() : null;
        e = f = this._getDefaultDate(a);
        var g = this._getFormatConfig(a);
        try {
          e = this.parseDate(c, d, g) || f;
        } catch (h) {
          this.log(h), d = b ? '' : d;
        }
        a.selectedDay = e.getDate(), a.drawMonth = a.selectedMonth = e.getMonth(), a.drawYear = a.selectedYear = e.getFullYear(), a.currentDay = d ? e.getDate() : 0, a.currentMonth = d ? e.getMonth() : 0, a.currentYear = d ? e.getFullYear() : 0, this._adjustInstDate(a);
      }
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
          for (var d = (b.toLowerCase().match(/^c/) ? $.datepicker._getDate(a) : null) || new Date(), e = d.getFullYear(), f = d.getMonth(), g = d.getDate(), h = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, i = h.exec(b); i;) {
            switch (i[2] || 'd') {
            case 'd':
            case 'D':
              g += parseInt(i[1], 10);
              break;
            case 'w':
            case 'W':
              g += 7 * parseInt(i[1], 10);
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
        }, f = null == b || '' === b ? c : 'string' == typeof b ? e(b) : 'number' == typeof b ? isNaN(b) ? c : d(b) : new Date(b.getTime());
      return f = f && 'Invalid Date' == f.toString() ? c : f, f && (f.setHours(0), f.setMinutes(0), f.setSeconds(0), f.setMilliseconds(0)), this._daylightSavingAdjust(f);
    },
    _daylightSavingAdjust: function (a) {
      return a ? (a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0), a) : null;
    },
    _setDate: function (a, b, c) {
      var d = !b, e = a.selectedMonth, f = a.selectedYear, g = this._restrictMinMax(a, this._determineDate(a, b, new Date()));
      a.selectedDay = a.currentDay = g.getDate(), a.drawMonth = a.selectedMonth = a.currentMonth = g.getMonth(), a.drawYear = a.selectedYear = a.currentYear = g.getFullYear(), (e != a.selectedMonth || f != a.selectedYear) && !c && this._notifyChange(a), this._adjustInstDate(a), a.input && a.input.val(d ? '' : this._formatDate(a));
    },
    _getDate: function (a) {
      var b = !a.currentYear || a.input && '' == a.input.val() ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
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
      var c = this._get(a, 'isRTL'), d = this._get(a, 'showButtonPanel'), e = this._get(a, 'hideIfNoPrevNext'), f = this._get(a, 'navigationAsDateFormat'), g = this._getNumberOfMonths(a), h = this._get(a, 'showCurrentAtPos'), i = this._get(a, 'stepMonths'), j = 1 != g[0] || 1 != g[1], k = this._daylightSavingAdjust(a.currentDay ? new Date(a.currentYear, a.currentMonth, a.currentDay) : new Date(9999, 9, 9)), l = this._getMinMaxDate(a, 'min'), m = this._getMinMaxDate(a, 'max'), n = a.drawMonth - h, o = a.drawYear;
      if (0 > n && (n += 12, o--), m) {
        var p = this._daylightSavingAdjust(new Date(m.getFullYear(), m.getMonth() - g[0] * g[1] + 1, m.getDate()));
        for (p = l && l > p ? l : p; this._daylightSavingAdjust(new Date(o, n, 1)) > p;)
          n--, 0 > n && (n = 11, o--);
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
      for (var z = this._get(a, 'showWeek'), A = this._get(a, 'dayNames'), C = (this._get(a, 'dayNamesShort'), this._get(a, 'dayNamesMin')), D = this._get(a, 'monthNames'), E = this._get(a, 'monthNamesShort'), F = this._get(a, 'beforeShowDay'), G = this._get(a, 'showOtherMonths'), H = this._get(a, 'selectOtherMonths'), J = (this._get(a, 'calculateWeek') || this.iso8601Week, this._getDefaultDate(a)), K = '', L = 0; L < g[0]; L++) {
        var M = '';
        this.maxRows = 4;
        for (var N = 0; N < g[1]; N++) {
          var O = this._daylightSavingAdjust(new Date(o, n, a.selectedDay)), P = ' ui-corner-all', Q = '';
          if (j) {
            if (Q += '<div class="ui-datepicker-group', g[1] > 1)
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
          Q += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + P + '">' + (/all|left/.test(P) && 0 == L ? c ? t : r : '') + (/all|right/.test(P) && 0 == L ? c ? r : t : '') + this._generateMonthYearHeader(a, n, o, l, m, L > 0 || N > 0, D, E) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
          for (var R = z ? '<th class="ui-datepicker-week-col">' + this._get(a, 'weekHeader') + '</th>' : '', S = 0; 7 > S; S++) {
            var T = (S + y) % 7;
            R += '<th' + ((S + y + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : '') + '><span title="' + A[T] + '">' + C[T] + '</span></th>';
          }
          Q += R + '</tr></thead><tbody>';
          var U = this._getDaysInMonth(o, n);
          o == a.selectedYear && n == a.selectedMonth && (a.selectedDay = Math.min(a.selectedDay, U));
          var V = (this._getFirstDayOfMonth(o, n) - y + 7) % 7, W = Math.ceil((V + U) / 7), X = j && this.maxRows > W ? this.maxRows : W;
          this.maxRows = X;
          for (var Y = this._daylightSavingAdjust(new Date(o, n, 1 - V)), Z = 0; X > Z; Z++) {
            Q += '<tr>';
            for (var _ = z ? '<td class="ui-datepicker-week-col">' + this._get(a, 'calculateWeek')(Y) + '</td>' : '', S = 0; 7 > S; S++) {
              var ba = F ? F.apply(a.input ? a.input[0] : null, [Y]) : [
                  !0,
                  ''
                ], bb = Y.getMonth() != n, bc = bb && !H || !ba[0] || l && l > Y || m && Y > m;
              _ += '<td class="' + ((S + y + 6) % 7 >= 5 ? ' ui-datepicker-week-end' : '') + (bb ? ' ui-datepicker-other-month' : '') + (Y.getTime() == O.getTime() && n == a.selectedMonth && a._keyEvent || J.getTime() == Y.getTime() && J.getTime() == O.getTime() ? ' ' + this._dayOverClass : '') + (bc ? ' ' + this._unselectableClass + ' ui-state-disabled' : '') + (bb && !G ? '' : ' ' + ba[1] + (Y.getTime() == k.getTime() ? ' ' + this._currentClass : '') + (Y.getTime() == b.getTime() ? ' ui-datepicker-today' : '')) + '"' + (bb && !G || !ba[2] ? '' : ' title="' + ba[2] + '"') + (bc ? '' : ' data-handler="selectDay" data-event="click" data-month="' + Y.getMonth() + '" data-year="' + Y.getFullYear() + '"') + '>' + (bb && !G ? '&#xa0;' : bc ? '<span class="ui-state-default">' + Y.getDate() + '</span>' : '<a class="ui-state-default' + (Y.getTime() == b.getTime() ? ' ui-state-highlight' : '') + (Y.getTime() == k.getTime() ? ' ui-state-active' : '') + (bb ? ' ui-priority-secondary' : '') + '" href="#">' + Y.getDate() + '</a>') + '</td>', Y.setDate(Y.getDate() + 1), Y = this._daylightSavingAdjust(Y);
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
        for (var p = 0; 12 > p; p++)
          (!n || p >= d.getMonth()) && (!o || p <= e.getMonth()) && (m += '<option value="' + p + '"' + (p == b ? ' selected="selected"' : '') + '>' + h[p] + '</option>');
        m += '</select>';
      }
      if (k || (l += m + (!f && i && j ? '' : '&#xa0;')), !a.yearshtml)
        if (a.yearshtml = '', f || !j)
          l += '<span class="ui-datepicker-year">' + c + '</span>';
        else {
          var q = this._get(a, 'yearRange').split(':'), r = new Date().getFullYear(), s = function (a) {
              var b = a.match(/c[+-].*/) ? c + parseInt(a.substring(1), 10) : a.match(/[+-].*/) ? r + parseInt(a, 10) : parseInt(a, 10);
              return isNaN(b) ? r : b;
            }, t = s(q[0]), u = Math.max(t, s(q[1] || ''));
          for (t = d ? Math.max(t, d.getFullYear()) : t, u = e ? Math.min(u, e.getFullYear()) : u, a.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">'; u >= t; t++)
            a.yearshtml += '<option value="' + t + '"' + (t == c ? ' selected="selected"' : '') + '>' + t + '</option>';
          a.yearshtml += '</select>', l += a.yearshtml, a.yearshtml = null;
        }
      return l += this._get(a, 'yearSuffix'), k && (l += (!f && i && j ? '' : '&#xa0;') + m), l += '</div>';
    },
    _adjustInstDate: function (a, b, c) {
      var d = a.drawYear + ('Y' == c ? b : 0), e = a.drawMonth + ('M' == c ? b : 0), f = Math.min(a.selectedDay, this._getDaysInMonth(d, e)) + ('D' == c ? b : 0), g = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(d, e, f)));
      a.selectedDay = g.getDate(), a.drawMonth = a.selectedMonth = g.getMonth(), a.drawYear = a.selectedYear = g.getFullYear(), ('M' == c || 'Y' == c) && this._notifyChange(a);
    },
    _restrictMinMax: function (a, b) {
      var c = this._getMinMaxDate(a, 'min'), d = this._getMinMaxDate(a, 'max'), e = c && c > b ? c : b;
      return e = d && e > d ? d : e;
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
      return null == b ? [
        1,
        1
      ] : 'number' == typeof b ? [
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
      var e = this._getNumberOfMonths(a), f = this._daylightSavingAdjust(new Date(c, d + (0 > b ? b : e[0] * e[1]), 1));
      return 0 > b && f.setDate(this._getDaysInMonth(f.getFullYear(), f.getMonth())), this._isInRange(a, f);
    },
    _isInRange: function (a, b) {
      var c = this._getMinMaxDate(a, 'min'), d = this._getMinMaxDate(a, 'max');
      return (!c || b.getTime() >= c.getTime()) && (!d || b.getTime() <= d.getTime());
    },
    _getFormatConfig: function (a) {
      var b = this._get(a, 'shortYearCutoff');
      return b = 'string' != typeof b ? b : new Date().getFullYear() % 100 + parseInt(b, 10), {
        shortYearCutoff: b,
        dayNamesShort: this._get(a, 'dayNamesShort'),
        dayNames: this._get(a, 'dayNames'),
        monthNamesShort: this._get(a, 'monthNamesShort'),
        monthNames: this._get(a, 'monthNames')
      };
    },
    _formatDate: function (a, b, c, d) {
      b || (a.currentDay = a.selectedDay, a.currentMonth = a.selectedMonth, a.currentYear = a.selectedYear);
      var e = b ? 'object' == typeof b ? b : this._daylightSavingAdjust(new Date(d, c, b)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
      return this.formatDate(this._get(a, 'dateFormat'), e, this._getFormatConfig(a));
    }
  }), $.fn.datepicker = function (a) {
    if (!this.length)
      return this;
    $.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick).find('body').append($.datepicker.dpDiv), $.datepicker.initialized = !0);
    var b = Array.prototype.slice.call(arguments, 1);
    return 'string' != typeof a || 'isDisabled' != a && 'getDate' != a && 'widget' != a ? 'option' == a && 2 == arguments.length && 'string' == typeof arguments[1] ? $.datepicker['_' + a + 'Datepicker'].apply($.datepicker, [this[0]].concat(b)) : this.each(function () {
      'string' == typeof a ? $.datepicker['_' + a + 'Datepicker'].apply($.datepicker, [this].concat(b)) : $.datepicker._attachDatepicker(this, a);
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
          0 > c && a(this).css('top', b.top - c);
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
      this.originalTitle = this.element.attr('title'), 'string' != typeof this.originalTitle && (this.originalTitle = ''), this.options.title = this.options.title || this.originalTitle;
      {
        var b = this, d = b.options, e = d.title || '&#160;', f = a.ui.dialog.getTitleId(b.element), g = (b.uiDialog = a('<div></div>')).appendTo(document.body).hide().addClass(c + d.dialogClass).css({ zIndex: d.zIndex }).attr('tabIndex', -1).css('outline', 0).keydown(function (c) {
            d.closeOnEscape && !c.isDefaultPrevented() && c.keyCode && c.keyCode === a.ui.keyCode.ESCAPE && (b.close(c), c.preventDefault());
          }).attr({
            role: 'dialog',
            'aria-labelledby': f
          }).mousedown(function (a) {
            b.moveToTop(!1, a);
          }), i = (b.element.show().removeAttr('title').addClass('ui-dialog-content ui-widget-content').appendTo(g), (b.uiDialogTitlebar = a('<div></div>')).addClass('ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix').prependTo(g)), j = a('<a href="#"></a>').addClass('ui-dialog-titlebar-close ui-corner-all').attr('role', 'button').hover(function () {
            j.addClass('ui-state-hover');
          }, function () {
            j.removeClass('ui-state-hover');
          }).focus(function () {
            j.addClass('ui-state-focus');
          }).blur(function () {
            j.removeClass('ui-state-focus');
          }).click(function (a) {
            return b.close(a), !1;
          }).appendTo(i);
        (b.uiDialogTitlebarCloseText = a('<span></span>')).addClass('ui-icon ui-icon-closethick').text(d.closeText).appendTo(j), a('<span></span>').addClass('ui-dialog-title').attr('id', f).html(e).prependTo(i);
      }
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
      var d, e, c = this;
      if (!1 !== c._trigger('beforeClose', b))
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
      var f, d = this, e = d.options;
      return e.modal && !b || !e.stack && !e.modal ? d._trigger('focus', c) : (e.zIndex > a.ui.dialog.maxZ && (a.ui.dialog.maxZ = e.zIndex), d.overlay && (a.ui.dialog.maxZ += 1, d.overlay.$el.css('z-index', a.ui.dialog.overlay.maxZ = a.ui.dialog.maxZ)), f = {
        scrollTop: d.element.scrollTop(),
        scrollLeft: d.element.scrollLeft()
      }, a.ui.dialog.maxZ += 1, d.uiDialog.css('z-index', a.ui.dialog.maxZ), d.element.attr(f), d._trigger('focus', c), d);
    },
    open: function () {
      if (!this._isOpen) {
        var b = this, c = b.options, d = b.uiDialog;
        return b.overlay = c.modal ? new a.ui.dialog.overlay(b) : null, b._size(), b._position(c.position), d.show(c.show), b.moveToTop(!0), c.modal && d.bind('keydown.ui-dialog', function (b) {
          if (b.keyCode === a.ui.keyCode.TAB) {
            var c = a(':tabbable', this), d = c.filter(':first'), e = c.filter(':last');
            return b.target !== e[0] || b.shiftKey ? b.target === d[0] && b.shiftKey ? (e.focus(1), !1) : void 0 : (d.focus(1), !1);
          }
        }), a(b.element.find(':tabbable').get().concat(d.find('.ui-dialog-buttonpane :tabbable').get().concat(d.get()))).eq(0).focus(), b._isOpen = !0, b._trigger('open'), b;
      }
    },
    _createButtons: function (b) {
      var c = this, d = !1, e = a('<div></div>').addClass('ui-dialog-buttonpane ui-widget-content ui-helper-clearfix'), f = a('<div></div>').addClass('ui-dialog-buttonset').appendTo(e);
      c.uiDialog.find('.ui-dialog-buttonpane').remove(), 'object' == typeof b && null !== b && a.each(b, function () {
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
          'click' !== a && (a in e ? e[a](b) : e.attr(a, b));
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
      var e, b = this, c = b.options, d = a(document);
      b.uiDialog.draggable({
        cancel: '.ui-dialog-content, .ui-dialog-titlebar-close',
        handle: '.ui-dialog-titlebar',
        containment: 'document',
        start: function (d, g) {
          e = 'auto' === c.height ? 'auto' : a(this).height(), a(this).height(a(this).height()).addClass('ui-dialog-dragging'), b._trigger('dragStart', d, f(g));
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
      var d = this, e = d.options, f = d.uiDialog.css('position'), g = 'string' == typeof c ? c : 'n,e,s,w,se,sw,ne,nw';
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
      return 'auto' === a.height ? a.minHeight : Math.min(a.minHeight, a.height);
    },
    _position: function (b) {
      var e, c = [], d = [
          0,
          0
        ];
      b ? (('string' == typeof b || 'object' == typeof b && '0' in b) && (c = b.split ? b.split(' ') : [
        b[0],
        b[1]
      ], 1 === c.length && (c[1] = c[0]), a.each([
        'left',
        'top'
      ], function (a, b) {
        +c[a] === c[a] && (d[a] = c[a], c[a] = b);
      }), b = {
        my: c.join(' '),
        at: c.join(' '),
        offset: d.join(' ')
      }), b = a.extend({}, a.ui.dialog.prototype.options.position, b)) : b = a.ui.dialog.prototype.options.position, e = this.uiDialog.is(':visible'), e || this.uiDialog.show(), this.uiDialog.css({
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
        h && !d && f.resizable('destroy'), h && 'string' == typeof d && f.resizable('option', 'handles', d), !h && d !== !1 && e._makeResizable(d);
        break;
      case 'title':
        a('.ui-dialog-title', e.uiDialogTitlebar).html('' + (d || '&#160;'));
      }
      a.Widget.prototype._setOption.apply(e, arguments);
    },
    _size: function () {
      var c, d, b = this.options, e = this.uiDialog.is(':visible');
      if (this.element.show().css({
          width: 'auto',
          minHeight: 0,
          height: 0
        }), b.minWidth > b.width && (b.width = b.minWidth), c = this.uiDialog.css({
          height: 'auto',
          width: b.width
        }).height(), d = Math.max(0, b.minHeight - c), 'auto' === b.height)
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
      0 === this.instances.length && (setTimeout(function () {
        a.ui.dialog.overlay.instances.length && a(document).bind(a.ui.dialog.overlay.events, function (b) {
          return a(b.target).zIndex() < a.ui.dialog.overlay.maxZ ? !1 : void 0;
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
      -1 != c && this.oldInstances.push(this.instances.splice(c, 1)[0]), 0 === this.instances.length && a([
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
      return a.browser.msie && a.browser.version < 7 ? (b = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), c = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight), c > b ? a(window).height() + 'px' : b + 'px') : a(document).height() + 'px';
    },
    width: function () {
      var b, c;
      return a.browser.msie ? (b = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), c = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth), c > b ? a(window).width() + 'px' : b + 'px') : a(document).width() + 'px';
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
}(jQuery), function (a) {
  a.ui = a.ui || {};
  var c = /left|center|right/, d = /top|center|bottom/, e = 'center', f = {}, g = a.fn.position, h = a.fn.offset;
  a.fn.position = function (b) {
    if (!b || !b.of)
      return g.apply(this, arguments);
    b = a.extend({}, b);
    var l, m, n, h = a(b.of), i = h[0], j = (b.collision || 'flip').split(' '), k = b.offset ? b.offset.split(' ') : [
        0,
        0
      ];
    return 9 === i.nodeType ? (l = h.width(), m = h.height(), n = {
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
      1 === a.length && (a = c.test(a[0]) ? a.concat([e]) : d.test(a[0]) ? [e].concat(a) : [
        e,
        e
      ]), a[0] = c.test(a[0]) ? a[0] : e, a[1] = d.test(a[1]) ? a[1] : e, b[this] = a;
    }), 1 === j.length && (j[1] = j[0]), k[0] = parseInt(k[0], 10) || 0, 1 === k.length && (k[1] = k[0]), k[1] = parseInt(k[1], 10) || 0, 'right' === b.at[0] ? n.left += l : b.at[0] === e && (n.left += l / 2), 'bottom' === b.at[1] ? n.top += m : b.at[1] === e && (n.top += m / 2), n.left += k[0], n.top += k[1], this.each(function () {
      var r, c = a(this), d = c.outerWidth(), g = c.outerHeight(), h = parseInt(a.curCSS(this, 'marginLeft', !0)) || 0, i = parseInt(a.curCSS(this, 'marginTop', !0)) || 0, o = d + h + (parseInt(a.curCSS(this, 'marginRight', !0)) || 0), p = g + i + (parseInt(a.curCSS(this, 'marginBottom', !0)) || 0), q = a.extend({}, n);
      'right' === b.my[0] ? q.left -= d : b.my[0] === e && (q.left -= d / 2), 'bottom' === b.my[1] ? q.top -= g : b.my[1] === e && (q.top -= g / 2), f.fractions || (q.left = Math.round(q.left), q.top = Math.round(q.top)), r = {
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
        if (c.at[0] !== e) {
          var d = a(window), f = c.collisionPosition.left + c.collisionWidth - d.width() - d.scrollLeft(), g = 'left' === c.my[0] ? -c.elemWidth : 'right' === c.my[0] ? c.elemWidth : 0, h = 'left' === c.at[0] ? c.targetWidth : -c.targetWidth, i = -2 * c.offset[0];
          b.left += c.collisionPosition.left < 0 ? g + h + i : f > 0 ? g + h + i : 0;
        }
      },
      top: function (b, c) {
        if (c.at[1] !== e) {
          var d = a(window), f = c.collisionPosition.top + c.collisionHeight - d.height() - d.scrollTop(), g = 'top' === c.my[1] ? -c.elemHeight : 'bottom' === c.my[1] ? c.elemHeight : 0, h = 'top' === c.at[1] ? c.targetHeight : -c.targetHeight, i = -2 * c.offset[1];
          b.top += c.collisionPosition.top < 0 ? g + h + i : f > 0 ? g + h + i : 0;
        }
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
    return c && c.ownerDocument ? b ? this.each(a.isFunction(b) ? function (c) {
      a(this).offset(b.call(this, c, a(this).offset()));
    } : function () {
      a.offset.setOffset(this, b);
    }) : h.call(this) : null;
  }), a.curCSS || (a.curCSS = a.css), function () {
    var d, e, g, h, i, b = document.getElementsByTagName('body')[0], c = document.createElement('div');
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
    }).offset(), d.innerHTML = '', e.removeChild(d), i = h.top + h.left + (b ? 2000 : 0), f.fractions = i > 21 && 22 > i;
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
      'value' === b && (this.options.value = c, this._refreshValue(), this._value() === this.options.max && this._trigger('complete')), a.Widget.prototype._setOption.apply(this, arguments);
    },
    _value: function () {
      var a = this.options.value;
      return 'number' != typeof a && (a = 0), Math.min(this.options.max, Math.max(this.min, a));
    },
    _percentage: function () {
      return 100 * this._value() / this.options.max;
    },
    _refreshValue: function () {
      var a = this.value(), b = this._percentage();
      this.oldValue !== a && (this.oldValue = a, this._trigger('change')), this.valueDiv.toggle(a > this.min).toggleClass('ui-corner-right', a === this.options.max).width(b.toFixed(0) + '%'), this.element.attr('aria-valuenow', a);
    }
  }), a.extend(a.ui.progressbar, { version: '1.8.23' });
}(jQuery), function (a) {
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
      this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass('ui-slider ui-slider-' + this.orientation + ' ui-widget ui-widget-content ui-corner-all' + (d.disabled ? ' ui-slider-disabled ui-disabled' : '')), this.range = a([]), d.range && (d.range === !0 && (d.values || (d.values = [
        this._valueMin(),
        this._valueMin()
      ]), d.values.length && 2 !== d.values.length && (d.values = [
        d.values[0],
        d.values[0]
      ])), this.range = a('<div></div>').appendTo(this.element).addClass('ui-slider-range ui-widget-header' + ('min' === d.range || 'max' === d.range ? ' ui-slider-range-' + d.range : '')));
      for (var i = e.length; g > i; i += 1)
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
        var f, g, h, i, e = a(this).data('index.ui-slider-handle');
        if (!b.options.disabled) {
          switch (d.keyCode) {
          case a.ui.keyCode.HOME:
          case a.ui.keyCode.END:
          case a.ui.keyCode.PAGE_UP:
          case a.ui.keyCode.PAGE_DOWN:
          case a.ui.keyCode.UP:
          case a.ui.keyCode.RIGHT:
          case a.ui.keyCode.DOWN:
          case a.ui.keyCode.LEFT:
            if (d.preventDefault(), !b._keySliding && (b._keySliding = !0, a(this).addClass('ui-state-active'), f = b._start(d, e), f === !1))
              return;
          }
          switch (i = b.options.step, g = h = b.options.values && b.options.values.length ? b.values(e) : b.value(), d.keyCode) {
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
        }
      }).keyup(function (c) {
        var d = a(this).data('index.ui-slider-handle');
        b._keySliding && (b._keySliding = !1, b._stop(c, d), b._change(c, d), a(this).removeClass('ui-state-active'));
      }), this._refreshValue(), this._animateOff = !1;
    },
    destroy: function () {
      return this.handles.remove(), this.range.remove(), this.element.removeClass('ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all').removeData('slider').unbind('.slider'), this._mouseDestroy(), this;
    },
    _mouseCapture: function (b) {
      var d, e, f, g, h, i, j, k, l, c = this.options;
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
    _mouseStart: function () {
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
      this.orientation = 'vertical' === this.options.orientation ? 'vertical' : 'horizontal';
    },
    _normValueFromMouse: function (a) {
      var b, c, d, e, f;
      return 'horizontal' === this.orientation ? (b = this.elementSize.width, c = a.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (b = this.elementSize.height, c = a.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), d = c / b, d > 1 && (d = 1), 0 > d && (d = 0), 'vertical' === this.orientation && (d = 1 - d), e = this._valueMax() - this._valueMin(), f = this._valueMin() + d * e, this._trimAlignValue(f);
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
      this.options.values && this.options.values.length ? (d = this.values(b ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === b && c > d || 1 === b && d > c) && (c = d), c !== this.values(b) && (e = this.values(), e[b] = c, f = this._trigger('slide', a, {
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
      return arguments.length ? (this.options.value = this._trimAlignValue(a), this._refreshValue(), this._change(null, 0), void 0) : this._value();
    },
    values: function (b, c) {
      var d, e, f;
      if (arguments.length > 1)
        return this.options.values[b] = this._trimAlignValue(c), this._refreshValue(), this._change(null, b), void 0;
      if (!arguments.length)
        return this._values();
      if (!a.isArray(arguments[0]))
        return this.options.values && this.options.values.length ? this._values(b) : this.value();
      for (d = this.options.values, e = arguments[0], f = 0; f < d.length; f += 1)
        d[f] = this._trimAlignValue(e[f]), this._change(null, f);
      this._refreshValue();
    },
    _setOption: function (b, c) {
      var d, e = 0;
      switch (a.isArray(this.options.values) && (e = this.options.values.length), a.Widget.prototype._setOption.apply(this, arguments), b) {
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
        for (this._animateOff = !0, this._refreshValue(), d = 0; e > d; d += 1)
          this._change(null, d);
        this._animateOff = !1;
      }
    },
    _value: function () {
      var a = this.options.value;
      return a = this._trimAlignValue(a);
    },
    _values: function (a) {
      var b, c, d;
      if (arguments.length)
        return b = this.options.values[a], b = this._trimAlignValue(b);
      for (c = this.options.values.slice(), d = 0; d < c.length; d += 1)
        c[d] = this._trimAlignValue(c[d]);
      return c;
    },
    _trimAlignValue: function (a) {
      if (a <= this._valueMin())
        return this._valueMin();
      if (a >= this._valueMax())
        return this._valueMax();
      var b = this.options.step > 0 ? this.options.step : 1, c = (a - this._valueMin()) % b, d = a - c;
      return 2 * Math.abs(c) >= b && (d += c > 0 ? b : -b), parseFloat(d.toFixed(5));
    },
    _valueMin: function () {
      return this.options.min;
    },
    _valueMax: function () {
      return this.options.max;
    },
    _refreshValue: function () {
      var f, h, i, j, k, b = this.options.range, c = this.options, d = this, e = this._animateOff ? !1 : c.animate, g = {};
      this.options.values && this.options.values.length ? this.handles.each(function (b) {
        f = (d.values(b) - d._valueMin()) / (d._valueMax() - d._valueMin()) * 100, g['horizontal' === d.orientation ? 'left' : 'bottom'] = f + '%', a(this).stop(1, 1)[e ? 'animate' : 'css'](g, c.animate), d.options.range === !0 && ('horizontal' === d.orientation ? (0 === b && d.range.stop(1, 1)[e ? 'animate' : 'css']({ left: f + '%' }, c.animate), 1 === b && d.range[e ? 'animate' : 'css']({ width: f - h + '%' }, {
          queue: !1,
          duration: c.animate
        })) : (0 === b && d.range.stop(1, 1)[e ? 'animate' : 'css']({ bottom: f + '%' }, c.animate), 1 === b && d.range[e ? 'animate' : 'css']({ height: f - h + '%' }, {
          queue: !1,
          duration: c.animate
        }))), h = f;
      }) : (i = this.value(), j = this._valueMin(), k = this._valueMax(), f = k !== j ? (i - j) / (k - j) * 100 : 0, g['horizontal' === d.orientation ? 'left' : 'bottom'] = f + '%', this.handle.stop(1, 1)[e ? 'animate' : 'css'](g, c.animate), 'min' === b && 'horizontal' === this.orientation && this.range.stop(1, 1)[e ? 'animate' : 'css']({ width: f + '%' }, c.animate), 'max' === b && 'horizontal' === this.orientation && this.range[e ? 'animate' : 'css']({ width: 100 - f + '%' }, {
        queue: !1,
        duration: c.animate
      }), 'min' === b && 'vertical' === this.orientation && this.range.stop(1, 1)[e ? 'animate' : 'css']({ height: f + '%' }, c.animate), 'max' === b && 'vertical' === this.orientation && this.range[e ? 'animate' : 'css']({ height: 100 - f + '%' }, {
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
      if ('selected' == a) {
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
        var i, g = a(c).attr('href'), h = g.split('#')[0];
        if (h && (h === location.toString().split('#')[0] || (i = a('base')[0]) && h === i.href) && (g = c.hash, c.href = g), f.test(g))
          d.panels = d.panels.add(d.element.find(d._sanitizeSelector(g)));
        else if (g && '#' !== g) {
          a.data(c, 'href.tabs', g), a.data(c, 'load.tabs', g.replace(/#.*$/, ''));
          var j = d._tabId(c);
          c.href = '#' + j;
          var k = d.element.find('#' + j);
          k.length || (k = a(e.panelTemplate).attr('id', j).addClass('ui-tabs-panel ui-widget-content ui-corner-bottom').insertAfter(d.panels[b - 1] || d.list), k.data('destroy.tabs', !0)), d.panels = d.panels.add(k);
        } else
          e.disabled.push(b);
      }), c ? (this.element.addClass('ui-tabs ui-widget ui-widget-content ui-corner-all'), this.list.addClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all'), this.lis.addClass('ui-state-default ui-corner-top'), this.panels.addClass('ui-tabs-panel ui-widget-content ui-corner-bottom'), e.selected === b ? (location.hash && this.anchors.each(function (a, b) {
        return b.hash == location.hash ? (e.selected = a, !1) : void 0;
      }), 'number' != typeof e.selected && e.cookie && (e.selected = parseInt(d._cookie(), 10)), 'number' != typeof e.selected && this.lis.filter('.ui-tabs-selected').length && (e.selected = this.lis.index(this.lis.filter('.ui-tabs-selected'))), e.selected = e.selected || (this.lis.length ? 0 : -1)) : null === e.selected && (e.selected = -1), e.selected = e.selected >= 0 && this.anchors[e.selected] || e.selected < 0 ? e.selected : 0, e.disabled = a.unique(e.disabled.concat(a.map(this.lis.filter('.ui-state-disabled'), function (a) {
        return d.lis.index(a);
      }))).sort(), -1 != a.inArray(e.selected, e.disabled) && e.disabled.splice(a.inArray(e.selected, e.disabled), 1), this.panels.addClass('ui-tabs-hide'), this.lis.removeClass('ui-tabs-selected ui-state-active'), e.selected >= 0 && this.anchors.length && (d.element.find(d._sanitizeSelector(d.anchors[e.selected].hash)).removeClass('ui-tabs-hide'), this.lis.eq(e.selected).addClass('ui-tabs-selected ui-state-active'), d.element.queue('tabs', function () {
        d._trigger('show', null, d._ui(d.anchors[e.selected], d.element.find(d._sanitizeSelector(d.anchors[e.selected].hash))[0]));
      }), this.load(e.selected)), a(window).bind('unload', function () {
        d.lis.add(d.anchors).unbind('.tabs'), d.lis = d.anchors = d.panels = null;
      })) : e.selected = this.lis.index(this.lis.filter('.ui-tabs-selected')), this.element[e.collapsible ? 'addClass' : 'removeClass']('ui-tabs-collapsible'), e.cookie && this._cookie(e.selected, e.cookie);
      for (var h, g = 0; h = this.lis[g]; g++)
        a(h)[-1 == a.inArray(g, e.disabled) || a(h).hasClass('ui-tabs-selected') ? 'removeClass' : 'addClass']('ui-state-disabled');
      if (e.cache === !1 && this.anchors.removeData('cache.tabs'), this.lis.add(this.anchors).unbind('.tabs'), 'mouseover' !== e.event) {
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
        } : function (a, b) {
          d.lis.removeClass('ui-tabs-selected ui-state-active'), b.addClass('ui-tabs-hide'), d.element.dequeue('tabs');
        };
      this.anchors.bind(e.event + '.tabs', function () {
        var b = this, c = a(b).closest('li'), f = d.panels.filter(':not(.ui-tabs-hide)'), g = d.element.find(d._sanitizeSelector(b.hash));
        if (c.hasClass('ui-tabs-selected') && !e.collapsible || c.hasClass('ui-state-disabled') || c.hasClass('ui-state-processing') || d.panels.filter(':animated').length || d._trigger('select', null, d._ui(this, g[0])) === !1)
          return this.blur(), !1;
        if (e.selected = d.anchors.index(this), d.abort(), e.collapsible) {
          if (c.hasClass('ui-tabs-selected'))
            return e.selected = -1, e.cookie && d._cookie(e.selected, e.cookie), d.element.queue('tabs', function () {
              o(b, f);
            }).dequeue('tabs'), this.blur(), !1;
          if (!f.length)
            return e.cookie && d._cookie(e.selected, e.cookie), d.element.queue('tabs', function () {
              n(b, g);
            }), d.load(d.anchors.index(this)), this.blur(), !1;
        }
        if (e.cookie && d._cookie(e.selected, e.cookie), !g.length)
          throw 'jQuery UI Tabs: Mismatching fragment identifier.';
        f.length && d.element.queue('tabs', function () {
          o(b, f);
        }), d.element.queue('tabs', function () {
          n(b, g);
        }), d.load(d.anchors.index(this)), a.browser.msie && this.blur();
      }), this.anchors.bind('click.tabs', function () {
        return !1;
      });
    },
    _getIndex: function (a) {
      return 'string' == typeof a && (a = this.anchors.index(this.anchors.filter('[href$=\'' + a + '\']'))), a;
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
      return j.length || (j = a(g.panelTemplate).attr('id', i).data('destroy.tabs', !0)), j.addClass('ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide'), e >= this.lis.length ? (h.appendTo(this.list), j.appendTo(this.list[0].parentNode)) : (h.insertBefore(this.lis[e]), j.insertBefore(this.panels[e])), g.disabled = a.map(g.disabled, function (a) {
        return a >= e ? ++a : a;
      }), this._tabify(), 1 == this.anchors.length && (g.selected = 0, h.addClass('ui-tabs-selected ui-state-active'), j.removeClass('ui-tabs-hide'), this.element.queue('tabs', function () {
        f._trigger('show', null, f._ui(f.anchors[0], f.panels[0]));
      }), this.load(0)), this._trigger('add', null, this._ui(this.anchors[e], this.panels[e])), this;
    },
    remove: function (b) {
      b = this._getIndex(b);
      var c = this.options, d = this.lis.eq(b).remove(), e = this.panels.eq(b).remove();
      return d.hasClass('ui-tabs-selected') && this.anchors.length > 1 && this.select(b + (b + 1 < this.anchors.length ? 1 : -1)), c.disabled = a.map(a.grep(c.disabled, function (a) {
        return a != b;
      }), function (a) {
        return a >= b ? --a : a;
      }), this._tabify(), this._trigger('remove', null, this._ui(d.find('a')[0], e[0])), this;
    },
    enable: function (b) {
      b = this._getIndex(b);
      var c = this.options;
      if (-1 != a.inArray(b, c.disabled))
        return this.lis.eq(b).removeClass('ui-state-disabled'), c.disabled = a.grep(c.disabled, function (a) {
          return a != b;
        }), this._trigger('enable', null, this._ui(this.anchors[b], this.panels[b])), this;
    },
    disable: function (a) {
      a = this._getIndex(a);
      var c = this.options;
      return a != c.selected && (this.lis.eq(a).addClass('ui-state-disabled'), c.disabled.push(a), c.disabled.sort(), this._trigger('disable', null, this._ui(this.anchors[a], this.panels[a]))), this;
    },
    select: function (a) {
      if (a = this._getIndex(a), -1 == a) {
        if (!this.options.collapsible || -1 == this.options.selected)
          return this;
        a = this.options.selected;
      }
      return this.anchors.eq(a).trigger(this.options.event + '.tabs'), this;
    },
    load: function (b) {
      b = this._getIndex(b);
      var c = this, d = this.options, e = this.anchors.eq(b)[0], f = a.data(e, 'load.tabs');
      if (this.abort(), !f || 0 !== this.element.queue('tabs').length && a.data(e, 'cache.tabs'))
        return void this.element.dequeue('tabs');
      if (this.lis.eq(b).addClass('ui-state-processing'), d.spinner) {
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
        error: function (a, f) {
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
        }), f = c._unrotate || (c._unrotate = b ? function () {
          e();
        } : function (a) {
          a.clientX && c.rotate(null);
        });
      return a ? (this.element.bind('tabsshow', e), this.anchors.bind(d.event + '.tabs', f), e()) : (clearTimeout(c.rotation), this.element.unbind('tabsshow', e), this.anchors.unbind(d.event + '.tabs', f), delete this._rotate, delete this._unrotate), this;
    }
  });
}(jQuery), function (window, document, undefined) {
  'use strict';
  function isArrayLike(obj) {
    return obj && 'number' == typeof obj.length ? 'function' != typeof obj.hasOwnProperty && 'function' != typeof obj.constructor ? !0 : obj instanceof JQLite || jQuery && obj instanceof jQuery || '[object Object]' !== toString.call(obj) || 'function' == typeof obj.callee : !1;
  }
  function forEach(obj, iterator, context) {
    var key;
    if (obj)
      if (isFunction(obj))
        for (key in obj)
          'prototype' != key && 'length' != key && 'name' != key && obj.hasOwnProperty(key) && iterator.call(context, obj[key], key);
      else if (obj.forEach && obj.forEach !== forEach)
        obj.forEach(iterator, context);
      else if (isArrayLike(obj))
        for (key = 0; key < obj.length; key++)
          iterator.call(context, obj[key], key);
      else
        for (key in obj)
          obj.hasOwnProperty(key) && iterator.call(context, obj[key], key);
    return obj;
  }
  function sortedKeys(obj) {
    var keys = [];
    for (var key in obj)
      obj.hasOwnProperty(key) && keys.push(key);
    return keys.sort();
  }
  function forEachSorted(obj, iterator, context) {
    for (var keys = sortedKeys(obj), i = 0; i < keys.length; i++)
      iterator.call(context, obj[keys[i]], keys[i]);
    return keys;
  }
  function reverseParams(iteratorFn) {
    return function (value, key) {
      iteratorFn(key, value);
    };
  }
  function nextUid() {
    for (var digit, index = uid.length; index;) {
      if (index--, digit = uid[index].charCodeAt(0), 57 == digit)
        return uid[index] = 'A', uid.join('');
      if (90 != digit)
        return uid[index] = String.fromCharCode(digit + 1), uid.join('');
      uid[index] = '0';
    }
    return uid.unshift('0'), uid.join('');
  }
  function setHashKey(obj, h) {
    h ? obj.$$hashKey = h : delete obj.$$hashKey;
  }
  function extend(dst) {
    var h = dst.$$hashKey;
    return forEach(arguments, function (obj) {
      obj !== dst && forEach(obj, function (value, key) {
        dst[key] = value;
      });
    }), setHashKey(dst, h), dst;
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
  function identity($) {
    return $;
  }
  function valueFn(value) {
    return function () {
      return value;
    };
  }
  function isUndefined(value) {
    return 'undefined' == typeof value;
  }
  function isDefined(value) {
    return 'undefined' != typeof value;
  }
  function isObject(value) {
    return null != value && 'object' == typeof value;
  }
  function isString(value) {
    return 'string' == typeof value;
  }
  function isNumber(value) {
    return 'number' == typeof value;
  }
  function isDate(value) {
    return '[object Date]' == toString.apply(value);
  }
  function isArray(value) {
    return '[object Array]' == toString.apply(value);
  }
  function isFunction(value) {
    return 'function' == typeof value;
  }
  function isRegExp(value) {
    return '[object RegExp]' == toString.apply(value);
  }
  function isWindow(obj) {
    return obj && obj.document && obj.location && obj.alert && obj.setInterval;
  }
  function isScope(obj) {
    return obj && obj.$evalAsync && obj.$watch;
  }
  function isFile(obj) {
    return '[object File]' === toString.apply(obj);
  }
  function isElement(node) {
    return node && (node.nodeName || node.bind && node.find);
  }
  function map(obj, iterator, context) {
    var results = [];
    return forEach(obj, function (value, index, list) {
      results.push(iterator.call(context, value, index, list));
    }), results;
  }
  function includes(array, obj) {
    return -1 != indexOf(array, obj);
  }
  function indexOf(array, obj) {
    if (array.indexOf)
      return array.indexOf(obj);
    for (var i = 0; i < array.length; i++)
      if (obj === array[i])
        return i;
    return -1;
  }
  function arrayRemove(array, value) {
    var index = indexOf(array, value);
    return index >= 0 && array.splice(index, 1), value;
  }
  function copy(source, destination) {
    if (isWindow(source) || isScope(source))
      throw Error('Can\'t copy Window or Scope');
    if (destination) {
      if (source === destination)
        throw Error('Can\'t copy equivalent objects or arrays');
      if (isArray(source)) {
        destination.length = 0;
        for (var i = 0; i < source.length; i++)
          destination.push(copy(source[i]));
      } else {
        var h = destination.$$hashKey;
        forEach(destination, function (value, key) {
          delete destination[key];
        });
        for (var key in source)
          destination[key] = copy(source[key]);
        setHashKey(destination, h);
      }
    } else
      destination = source, source && (isArray(source) ? destination = copy(source, []) : isDate(source) ? destination = new Date(source.getTime()) : isRegExp(source) ? destination = new RegExp(source.source) : isObject(source) && (destination = copy(source, {})));
    return destination;
  }
  function shallowCopy(src, dst) {
    dst = dst || {};
    for (var key in src)
      src.hasOwnProperty(key) && '$$' !== key.substr(0, 2) && (dst[key] = src[key]);
    return dst;
  }
  function equals(o1, o2) {
    if (o1 === o2)
      return !0;
    if (null === o1 || null === o2)
      return !1;
    if (o1 !== o1 && o2 !== o2)
      return !0;
    var length, key, keySet, t1 = typeof o1, t2 = typeof o2;
    if (t1 == t2 && 'object' == t1) {
      if (!isArray(o1)) {
        if (isDate(o1))
          return isDate(o2) && o1.getTime() == o2.getTime();
        if (isRegExp(o1) && isRegExp(o2))
          return o1.toString() == o2.toString();
        if (isScope(o1) || isScope(o2) || isWindow(o1) || isWindow(o2) || isArray(o2))
          return !1;
        keySet = {};
        for (key in o1)
          if ('$' !== key.charAt(0) && !isFunction(o1[key])) {
            if (!equals(o1[key], o2[key]))
              return !1;
            keySet[key] = !0;
          }
        for (key in o2)
          if (!keySet[key] && '$' !== key.charAt(0) && o2[key] !== undefined && !isFunction(o2[key]))
            return !1;
        return !0;
      }
      if (!isArray(o2))
        return !1;
      if ((length = o1.length) == o2.length) {
        for (key = 0; length > key; key++)
          if (!equals(o1[key], o2[key]))
            return !1;
        return !0;
      }
    }
    return !1;
  }
  function concat(array1, array2, index) {
    return array1.concat(slice.call(array2, index));
  }
  function sliceArgs(args, startIndex) {
    return slice.call(args, startIndex || 0);
  }
  function bind(self, fn) {
    var curryArgs = arguments.length > 2 ? sliceArgs(arguments, 2) : [];
    return !isFunction(fn) || fn instanceof RegExp ? fn : curryArgs.length ? function () {
      return arguments.length ? fn.apply(self, curryArgs.concat(slice.call(arguments, 0))) : fn.apply(self, curryArgs);
    } : function () {
      return arguments.length ? fn.apply(self, arguments) : fn.call(self);
    };
  }
  function toJsonReplacer(key, value) {
    var val = value;
    return /^\$+/.test(key) ? val = undefined : isWindow(value) ? val = '$WINDOW' : value && document === value ? val = '$DOCUMENT' : isScope(value) && (val = '$SCOPE'), val;
  }
  function toJson(obj, pretty) {
    return 'undefined' == typeof obj ? undefined : JSON.stringify(obj, toJsonReplacer, pretty ? '  ' : null);
  }
  function fromJson(json) {
    return isString(json) ? JSON.parse(json) : json;
  }
  function toBoolean(value) {
    if (value && 0 !== value.length) {
      var v = lowercase('' + value);
      value = !('f' == v || '0' == v || 'false' == v || 'no' == v || 'n' == v || '[]' == v);
    } else
      value = !1;
    return value;
  }
  function startingTag(element) {
    element = jqLite(element).clone();
    try {
      element.html('');
    } catch (e) {
    }
    var TEXT_NODE = 3, elemHtml = jqLite('<div>').append(element).html();
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
    var key_value, key, obj = {};
    return forEach((keyValue || '').split('&'), function (keyValue) {
      keyValue && (key_value = keyValue.split('='), key = tryDecodeURIComponent(key_value[0]), isDefined(key) && (obj[key] = isDefined(key_value[1]) ? tryDecodeURIComponent(key_value[1]) : !0));
    }), obj;
  }
  function toKeyValue(obj) {
    var parts = [];
    return forEach(obj, function (value, key) {
      parts.push(encodeUriQuery(key, !0) + (value === !0 ? '' : '=' + encodeUriQuery(value, !0)));
    }), parts.length ? parts.join('&') : '';
  }
  function encodeUriSegment(val) {
    return encodeUriQuery(val, !0).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
  }
  function encodeUriQuery(val, pctEncodeSpaces) {
    return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, pctEncodeSpaces ? '%20' : '+');
  }
  function angularInit(element, bootstrap) {
    function append(element) {
      element && elements.push(element);
    }
    var appElement, module, elements = [element], names = [
        'ng:app',
        'ng-app',
        'x-ng-app',
        'data-ng-app'
      ], NG_APP_CLASS_REGEXP = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
    forEach(names, function (name) {
      names[name] = !0, append(document.getElementById(name)), name = name.replace(':', '\\:'), element.querySelectorAll && (forEach(element.querySelectorAll('.' + name), append), forEach(element.querySelectorAll('.' + name + '\\:'), append), forEach(element.querySelectorAll('[' + name + ']'), append));
    }), forEach(elements, function (element) {
      if (!appElement) {
        var className = ' ' + element.className + ' ', match = NG_APP_CLASS_REGEXP.exec(className);
        match ? (appElement = element, module = (match[2] || '').replace(/\s+/g, ',')) : forEach(element.attributes, function (attr) {
          !appElement && names[attr.name] && (appElement = element, module = attr.value);
        });
      }
    }), appElement && bootstrap(appElement, module ? [module] : []);
  }
  function bootstrap(element, modules) {
    var doBootstrap = function () {
        element = jqLite(element), modules = modules || [], modules.unshift([
          '$provide',
          function ($provide) {
            $provide.value('$rootElement', element);
          }
        ]), modules.unshift('ng');
        var injector = createInjector(modules);
        return injector.invoke([
          '$rootScope',
          '$rootElement',
          '$compile',
          '$injector',
          function (scope, element, compile, injector) {
            scope.$apply(function () {
              element.data('$injector', injector), compile(element)(scope);
            });
          }
        ]), injector;
      }, NG_DEFER_BOOTSTRAP = /^NG_DEFER_BOOTSTRAP!/;
    return window && !NG_DEFER_BOOTSTRAP.test(window.name) ? doBootstrap() : (window.name = window.name.replace(NG_DEFER_BOOTSTRAP, ''), void (angular.resumeBootstrap = function (extraModules) {
      forEach(extraModules, function (module) {
        modules.push(module);
      }), doBootstrap();
    }));
  }
  function snake_case(name, separator) {
    return separator = separator || '_', name.replace(SNAKE_CASE_REGEXP, function (letter, pos) {
      return (pos ? separator : '') + letter.toLowerCase();
    });
  }
  function bindJQuery() {
    jQuery = window.jQuery, jQuery ? (jqLite = jQuery, extend(jQuery.fn, {
      scope: JQLitePrototype.scope,
      controller: JQLitePrototype.controller,
      injector: JQLitePrototype.injector,
      inheritedData: JQLitePrototype.inheritedData
    }), JQLitePatchJQueryRemove('remove', !0, !0, !1), JQLitePatchJQueryRemove('empty', !1, !1, !1), JQLitePatchJQueryRemove('html', !1, !1, !0)) : jqLite = JQLite, angular.element = jqLite;
  }
  function assertArg(arg, name, reason) {
    if (!arg)
      throw new Error('Argument \'' + (name || '?') + '\' is ' + (reason || 'required'));
    return arg;
  }
  function assertArgFn(arg, name, acceptArrayAnnotation) {
    return acceptArrayAnnotation && isArray(arg) && (arg = arg[arg.length - 1]), assertArg(isFunction(arg), name, 'not a function, got ' + (arg && 'object' == typeof arg ? arg.constructor.name || 'Object' : typeof arg)), arg;
  }
  function getter(obj, path, bindFnToScope) {
    if (!path)
      return obj;
    for (var key, keys = path.split('.'), lastInstance = obj, len = keys.length, i = 0; len > i; i++)
      key = keys[i], obj && (obj = (lastInstance = obj)[key]);
    return !bindFnToScope && isFunction(obj) ? bind(lastInstance, obj) : obj;
  }
  function setupModuleLoader(window) {
    function ensure(obj, name, factory) {
      return obj[name] || (obj[name] = factory());
    }
    return ensure(ensure(window, 'angular', Object), 'module', function () {
      var modules = {};
      return function (name, requires, configFn) {
        return requires && modules.hasOwnProperty(name) && (modules[name] = null), ensure(modules, name, function () {
          function invokeLater(provider, method, insertMethod) {
            return function () {
              return invokeQueue[insertMethod || 'push']([
                provider,
                method,
                arguments
              ]), moduleInstance;
            };
          }
          if (!requires)
            throw Error('No module: ' + name);
          var invokeQueue = [], runBlocks = [], config = invokeLater('$injector', 'invoke'), moduleInstance = {
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
                return runBlocks.push(block), this;
              }
            };
          return configFn && config(configFn), moduleInstance;
        });
      };
    });
  }
  function publishExternalAPI(angular) {
    extend(angular, {
      bootstrap: bootstrap,
      copy: copy,
      extend: extend,
      equals: equals,
      element: jqLite,
      forEach: forEach,
      injector: createInjector,
      noop: noop,
      bind: bind,
      toJson: toJson,
      fromJson: fromJson,
      identity: identity,
      isUndefined: isUndefined,
      isDefined: isDefined,
      isString: isString,
      isFunction: isFunction,
      isObject: isObject,
      isNumber: isNumber,
      isElement: isElement,
      isArray: isArray,
      version: version,
      isDate: isDate,
      lowercase: lowercase,
      uppercase: uppercase,
      callbacks: { counter: 0 }
    }), angularModule = setupModuleLoader(window);
    try {
      angularModule('ngLocale');
    } catch (e) {
      angularModule('ngLocale', []).provider('$locale', $LocaleProvider);
    }
    angularModule('ng', ['ngLocale'], [
      '$provide',
      function ($provide) {
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
        }).directive(ngAttributeAliasDirectives).directive(ngEventDirectives), $provide.provider({
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
  function jqNextId() {
    return ++jqId;
  }
  function camelCase(name) {
    return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
  }
  function JQLitePatchJQueryRemove(name, dispatchThis, filterElems, getterIfNoArguments) {
    function removePatch(param) {
      var set, setIndex, setLength, element, childIndex, childLength, children, list = filterElems && param ? [this.filter(param)] : [this], fireEvent = dispatchThis;
      if (!getterIfNoArguments || null != param)
        for (; list.length;)
          for (set = list.shift(), setIndex = 0, setLength = set.length; setLength > setIndex; setIndex++)
            for (element = jqLite(set[setIndex]), fireEvent ? element.triggerHandler('$destroy') : fireEvent = !fireEvent, childIndex = 0, childLength = (children = element.children()).length; childLength > childIndex; childIndex++)
              list.push(jQuery(children[childIndex]));
      return originalJqFn.apply(this, arguments);
    }
    var originalJqFn = jQuery.fn[name];
    originalJqFn = originalJqFn.$original || originalJqFn, removePatch.$original = originalJqFn, jQuery.fn[name] = removePatch;
  }
  function JQLite(element) {
    if (element instanceof JQLite)
      return element;
    if (!(this instanceof JQLite)) {
      if (isString(element) && '<' != element.charAt(0))
        throw Error('selectors not implemented');
      return new JQLite(element);
    }
    if (isString(element)) {
      var div = document.createElement('div');
      div.innerHTML = '<div>&#160;</div>' + element, div.removeChild(div.firstChild), JQLiteAddNodes(this, div.childNodes), this.remove();
    } else
      JQLiteAddNodes(this, element);
  }
  function JQLiteClone(element) {
    return element.cloneNode(!0);
  }
  function JQLiteDealoc(element) {
    JQLiteRemoveData(element);
    for (var i = 0, children = element.childNodes || []; i < children.length; i++)
      JQLiteDealoc(children[i]);
  }
  function JQLiteUnbind(element, type, fn) {
    var events = JQLiteExpandoStore(element, 'events'), handle = JQLiteExpandoStore(element, 'handle');
    handle && (isUndefined(type) ? forEach(events, function (eventHandler, type) {
      removeEventListenerFn(element, type, eventHandler), delete events[type];
    }) : isUndefined(fn) ? (removeEventListenerFn(element, type, events[type]), delete events[type]) : arrayRemove(events[type] || [], fn));
  }
  function JQLiteRemoveData(element) {
    var expandoId = element[jqName], expandoStore = jqCache[expandoId];
    expandoStore && (expandoStore.handle && (expandoStore.events.$destroy && expandoStore.handle({}, '$destroy'), JQLiteUnbind(element)), delete jqCache[expandoId], element[jqName] = undefined);
  }
  function JQLiteExpandoStore(element, key, value) {
    var expandoId = element[jqName], expandoStore = jqCache[expandoId || -1];
    return isDefined(value) ? (expandoStore || (element[jqName] = expandoId = jqNextId(), expandoStore = jqCache[expandoId] = {}), void (expandoStore[key] = value)) : expandoStore && expandoStore[key];
  }
  function JQLiteData(element, key, value) {
    var data = JQLiteExpandoStore(element, 'data'), isSetter = isDefined(value), keyDefined = !isSetter && isDefined(key), isSimpleGetter = keyDefined && !isObject(key);
    if (data || isSimpleGetter || JQLiteExpandoStore(element, 'data', data = {}), isSetter)
      data[key] = value;
    else {
      if (!keyDefined)
        return data;
      if (isSimpleGetter)
        return data && data[key];
      extend(data, key);
    }
  }
  function JQLiteHasClass(element, selector) {
    return (' ' + element.className + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + selector + ' ') > -1;
  }
  function JQLiteRemoveClass(element, cssClasses) {
    cssClasses && forEach(cssClasses.split(' '), function (cssClass) {
      element.className = trim((' ' + element.className + ' ').replace(/[\n\t]/g, ' ').replace(' ' + trim(cssClass) + ' ', ' '));
    });
  }
  function JQLiteAddClass(element, cssClasses) {
    cssClasses && forEach(cssClasses.split(' '), function (cssClass) {
      JQLiteHasClass(element, cssClass) || (element.className = trim(element.className + ' ' + trim(cssClass)));
    });
  }
  function JQLiteAddNodes(root, elements) {
    if (elements) {
      elements = elements.nodeName || !isDefined(elements.length) || isWindow(elements) ? [elements] : elements;
      for (var i = 0; i < elements.length; i++)
        root.push(elements[i]);
    }
  }
  function JQLiteController(element, name) {
    return JQLiteInheritedData(element, '$' + (name || 'ngController') + 'Controller');
  }
  function JQLiteInheritedData(element, name, value) {
    for (element = jqLite(element), 9 == element[0].nodeType && (element = element.find('html')); element.length;) {
      if (value = element.data(name))
        return value;
      element = element.parent();
    }
  }
  function getBooleanAttrName(element, name) {
    var booleanAttr = BOOLEAN_ATTR[name.toLowerCase()];
    return booleanAttr && BOOLEAN_ELEMENTS[element.nodeName] && booleanAttr;
  }
  function createEventHandler(element, events) {
    var eventHandler = function (event, type) {
      if (event.preventDefault || (event.preventDefault = function () {
          event.returnValue = !1;
        }), event.stopPropagation || (event.stopPropagation = function () {
          event.cancelBubble = !0;
        }), event.target || (event.target = event.srcElement || document), isUndefined(event.defaultPrevented)) {
        var prevent = event.preventDefault;
        event.preventDefault = function () {
          event.defaultPrevented = !0, prevent.call(event);
        }, event.defaultPrevented = !1;
      }
      event.isDefaultPrevented = function () {
        return event.defaultPrevented;
      }, forEach(events[type || event.type], function (fn) {
        fn.call(element, event);
      }), 8 >= msie ? (event.preventDefault = null, event.stopPropagation = null, event.isDefaultPrevented = null) : (delete event.preventDefault, delete event.stopPropagation, delete event.isDefaultPrevented);
    };
    return eventHandler.elem = element, eventHandler;
  }
  function hashKey(obj) {
    var key, objType = typeof obj;
    return 'object' == objType && null !== obj ? 'function' == typeof (key = obj.$$hashKey) ? key = obj.$$hashKey() : key === undefined && (key = obj.$$hashKey = nextUid()) : key = obj, objType + ':' + key;
  }
  function HashMap(array) {
    forEach(array, this.put, this);
  }
  function HashQueueMap() {
  }
  function annotate(fn) {
    var $inject, fnText, argDecl, last;
    return 'function' == typeof fn ? ($inject = fn.$inject) || ($inject = [], fnText = fn.toString().replace(STRIP_COMMENTS, ''), argDecl = fnText.match(FN_ARGS), forEach(argDecl[1].split(FN_ARG_SPLIT), function (arg) {
      arg.replace(FN_ARG, function (all, underscore, name) {
        $inject.push(name);
      });
    }), fn.$inject = $inject) : isArray(fn) ? (last = fn.length - 1, assertArgFn(fn[last], 'fn'), $inject = fn.slice(0, last)) : assertArgFn(fn, 'fn', !0), $inject;
  }
  function createInjector(modulesToLoad) {
    function supportObject(delegate) {
      return function (key, value) {
        return isObject(key) ? void forEach(key, reverseParams(delegate)) : delegate(key, value);
      };
    }
    function provider(name, provider_) {
      if ((isFunction(provider_) || isArray(provider_)) && (provider_ = providerInjector.instantiate(provider_)), !provider_.$get)
        throw Error('Provider ' + name + ' must define $get factory method.');
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
      providerCache[name] = value, instanceCache[name] = value;
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
      return forEach(modulesToLoad, function (module) {
        if (!loadedModules.get(module))
          if (loadedModules.put(module, !0), isString(module)) {
            var moduleFn = angularModule(module);
            runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks);
            try {
              for (var invokeQueue = moduleFn._invokeQueue, i = 0, ii = invokeQueue.length; ii > i; i++) {
                var invokeArgs = invokeQueue[i], provider = '$injector' == invokeArgs[0] ? providerInjector : providerInjector.get(invokeArgs[0]);
                provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
              }
            } catch (e) {
              throw e.message && (e.message += ' from ' + module), e;
            }
          } else if (isFunction(module))
            try {
              runBlocks.push(providerInjector.invoke(module));
            } catch (e) {
              throw e.message && (e.message += ' from ' + module), e;
            }
          else if (isArray(module))
            try {
              runBlocks.push(providerInjector.invoke(module));
            } catch (e) {
              throw e.message && (e.message += ' from ' + String(module[module.length - 1])), e;
            }
          else
            assertArgFn(module, 'module');
      }), runBlocks;
    }
    function createInternalInjector(cache, factory) {
      function getService(serviceName) {
        if ('string' != typeof serviceName)
          throw Error('Service name expected');
        if (cache.hasOwnProperty(serviceName)) {
          if (cache[serviceName] === INSTANTIATING)
            throw Error('Circular dependency: ' + path.join(' <- '));
          return cache[serviceName];
        }
        try {
          return path.unshift(serviceName), cache[serviceName] = INSTANTIATING, cache[serviceName] = factory(serviceName);
        } finally {
          path.shift();
        }
      }
      function invoke(fn, self, locals) {
        var length, i, key, args = [], $inject = annotate(fn);
        for (i = 0, length = $inject.length; length > i; i++)
          key = $inject[i], args.push(locals && locals.hasOwnProperty(key) ? locals[key] : getService(key));
        switch (fn.$inject || (fn = fn[length]), self ? -1 : args.length) {
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
        var instance, returnedValue, Constructor = function () {
          };
        return Constructor.prototype = (isArray(Type) ? Type[Type.length - 1] : Type).prototype, instance = new Constructor(), returnedValue = invoke(Type, instance, locals), isObject(returnedValue) ? returnedValue : instance;
      }
      return {
        invoke: invoke,
        instantiate: instantiate,
        get: getService,
        annotate: annotate
      };
    }
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
    return forEach(loadModules(modulesToLoad), function (fn) {
      instanceInjector.invoke(fn || noop);
    }), instanceInjector;
  }
  function $AnchorScrollProvider() {
    var autoScrollingEnabled = !0;
    this.disableAutoScrolling = function () {
      autoScrollingEnabled = !1;
    }, this.$get = [
      '$window',
      '$location',
      '$rootScope',
      function ($window, $location, $rootScope) {
        function getFirstAnchor(list) {
          var result = null;
          return forEach(list, function (element) {
            result || 'a' !== lowercase(element.nodeName) || (result = element);
          }), result;
        }
        function scroll() {
          var elm, hash = $location.hash();
          hash ? (elm = document.getElementById(hash)) ? elm.scrollIntoView() : (elm = getFirstAnchor(document.getElementsByName(hash))) ? elm.scrollIntoView() : 'top' === hash && $window.scrollTo(0, 0) : $window.scrollTo(0, 0);
        }
        var document = $window.document;
        return autoScrollingEnabled && $rootScope.$watch(function () {
          return $location.hash();
        }, function () {
          $rootScope.$evalAsync(scroll);
        }), scroll;
      }
    ];
  }
  function Browser(window, document, $log, $sniffer) {
    function completeOutstandingRequest(fn) {
      try {
        fn.apply(null, sliceArgs(arguments, 1));
      } finally {
        if (outstandingRequestCount--, 0 === outstandingRequestCount)
          for (; outstandingRequestCallbacks.length;)
            try {
              outstandingRequestCallbacks.pop()();
            } catch (e) {
              $log.error(e);
            }
      }
    }
    function startPoller(interval, setTimeout) {
      !function check() {
        forEach(pollFns, function (pollFn) {
          pollFn();
        }), pollTimeout = setTimeout(check, interval);
      }();
    }
    function fireUrlChange() {
      lastBrowserUrl != self.url() && (lastBrowserUrl = self.url(), forEach(urlChangeListeners, function (listener) {
        listener(self.url());
      }));
    }
    var self = this, rawDocument = document[0], location = window.location, history = window.history, setTimeout = window.setTimeout, clearTimeout = window.clearTimeout, pendingDeferIds = {};
    self.isMock = !1;
    var outstandingRequestCount = 0, outstandingRequestCallbacks = [];
    self.$$completeOutstandingRequest = completeOutstandingRequest, self.$$incOutstandingRequestCount = function () {
      outstandingRequestCount++;
    }, self.notifyWhenNoOutstandingRequests = function (callback) {
      forEach(pollFns, function (pollFn) {
        pollFn();
      }), 0 === outstandingRequestCount ? callback() : outstandingRequestCallbacks.push(callback);
    };
    var pollTimeout, pollFns = [];
    self.addPollFn = function (fn) {
      return isUndefined(pollTimeout) && startPoller(100, setTimeout), pollFns.push(fn), fn;
    };
    var lastBrowserUrl = location.href, baseElement = document.find('base'), replacedUrl = null;
    self.url = function (url, replace) {
      if (url) {
        if (lastBrowserUrl == url)
          return;
        return lastBrowserUrl = url, $sniffer.history ? replace ? history.replaceState(null, '', url) : (history.pushState(null, '', url), baseElement.attr('href', baseElement.attr('href'))) : replace ? (location.replace(url), replacedUrl = url) : (location.href = url, replacedUrl = null), self;
      }
      return replacedUrl || location.href.replace(/%27/g, '\'');
    };
    var urlChangeListeners = [], urlChangeInit = !1;
    self.onUrlChange = function (callback) {
      return urlChangeInit || ($sniffer.history && jqLite(window).bind('popstate', fireUrlChange), $sniffer.hashchange ? jqLite(window).bind('hashchange', fireUrlChange) : self.addPollFn(fireUrlChange), urlChangeInit = !0), urlChangeListeners.push(callback), callback;
    }, self.baseHref = function () {
      var href = baseElement.attr('href');
      return href ? href.replace(/^https?\:\/\/[^\/]*/, '') : '';
    };
    var lastCookies = {}, lastCookieString = '', cookiePath = self.baseHref();
    self.cookies = function (name, value) {
      var cookieLength, cookieArray, cookie, i, index;
      if (!name) {
        if (rawDocument.cookie !== lastCookieString)
          for (lastCookieString = rawDocument.cookie, cookieArray = lastCookieString.split('; '), lastCookies = {}, i = 0; i < cookieArray.length; i++)
            if (cookie = cookieArray[i], index = cookie.indexOf('='), index > 0) {
              var name = unescape(cookie.substring(0, index));
              lastCookies[name] === undefined && (lastCookies[name] = unescape(cookie.substring(index + 1)));
            }
        return lastCookies;
      }
      value === undefined ? rawDocument.cookie = escape(name) + '=;path=' + cookiePath + ';expires=Thu, 01 Jan 1970 00:00:00 GMT' : isString(value) && (cookieLength = (rawDocument.cookie = escape(name) + '=' + escape(value) + ';path=' + cookiePath).length + 1, cookieLength > 4096 && $log.warn('Cookie \'' + name + '\' possibly not set or overflowed because it was too large (' + cookieLength + ' > 4096 bytes)!'));
    }, self.defer = function (fn, delay) {
      var timeoutId;
      return outstandingRequestCount++, timeoutId = setTimeout(function () {
        delete pendingDeferIds[timeoutId], completeOutstandingRequest(fn);
      }, delay || 0), pendingDeferIds[timeoutId] = !0, timeoutId;
    }, self.defer.cancel = function (deferId) {
      return pendingDeferIds[deferId] ? (delete pendingDeferIds[deferId], clearTimeout(deferId), completeOutstandingRequest(noop), !0) : !1;
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
      function cacheFactory(cacheId, options) {
        function refresh(entry) {
          entry != freshEnd && (staleEnd ? staleEnd == entry && (staleEnd = entry.n) : staleEnd = entry, link(entry.n, entry.p), link(entry, freshEnd), freshEnd = entry, freshEnd.n = null);
        }
        function link(nextEntry, prevEntry) {
          nextEntry != prevEntry && (nextEntry && (nextEntry.p = prevEntry), prevEntry && (prevEntry.n = nextEntry));
        }
        if (cacheId in caches)
          throw Error('cacheId ' + cacheId + ' taken');
        var size = 0, stats = extend({}, options, { id: cacheId }), data = {}, capacity = options && options.capacity || Number.MAX_VALUE, lruHash = {}, freshEnd = null, staleEnd = null;
        return caches[cacheId] = {
          put: function (key, value) {
            var lruEntry = lruHash[key] || (lruHash[key] = { key: key });
            refresh(lruEntry), isUndefined(value) || (key in data || size++, data[key] = value, size > capacity && this.remove(staleEnd.key));
          },
          get: function (key) {
            var lruEntry = lruHash[key];
            if (lruEntry)
              return refresh(lruEntry), data[key];
          },
          remove: function (key) {
            var lruEntry = lruHash[key];
            lruEntry && (lruEntry == freshEnd && (freshEnd = lruEntry.p), lruEntry == staleEnd && (staleEnd = lruEntry.n), link(lruEntry.n, lruEntry.p), delete lruHash[key], delete data[key], size--);
          },
          removeAll: function () {
            data = {}, size = 0, lruHash = {}, freshEnd = staleEnd = null;
          },
          destroy: function () {
            data = null, stats = null, lruHash = null, delete caches[cacheId];
          },
          info: function () {
            return extend({}, stats, { size: size });
          }
        };
      }
      var caches = {};
      return cacheFactory.info = function () {
        var info = {};
        return forEach(caches, function (cache, cacheId) {
          info[cacheId] = cache.info();
        }), info;
      }, cacheFactory.get = function (cacheId) {
        return caches[cacheId];
      }, cacheFactory;
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
  function $CompileProvider($provide) {
    var hasDirectives = {}, Suffix = 'Directive', COMMENT_DIRECTIVE_REGEXP = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/, CLASS_DIRECTIVE_REGEXP = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/, MULTI_ROOT_TEMPLATE_ERROR = 'Template must have exactly one root element. was: ', urlSanitizationWhitelist = /^\s*(https?|ftp|mailto|file):/;
    this.directive = function registerDirective(name, directiveFactory) {
      return isString(name) ? (assertArg(directiveFactory, 'directive'), hasDirectives.hasOwnProperty(name) || (hasDirectives[name] = [], $provide.factory(name + Suffix, [
        '$injector',
        '$exceptionHandler',
        function ($injector, $exceptionHandler) {
          var directives = [];
          return forEach(hasDirectives[name], function (directiveFactory) {
            try {
              var directive = $injector.invoke(directiveFactory);
              isFunction(directive) ? directive = { compile: valueFn(directive) } : !directive.compile && directive.link && (directive.compile = valueFn(directive.link)), directive.priority = directive.priority || 0, directive.name = directive.name || name, directive.require = directive.require || directive.controller && directive.name, directive.restrict = directive.restrict || 'A', directives.push(directive);
            } catch (e) {
              $exceptionHandler(e);
            }
          }), directives;
        }
      ])), hasDirectives[name].push(directiveFactory)) : forEach(name, reverseParams(registerDirective)), this;
    }, this.urlSanitizationWhitelist = function (regexp) {
      return isDefined(regexp) ? (urlSanitizationWhitelist = regexp, this) : urlSanitizationWhitelist;
    }, this.$get = [
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
        function compile($compileNodes, transcludeFn, maxPriority) {
          $compileNodes instanceof jqLite || ($compileNodes = jqLite($compileNodes)), forEach($compileNodes, function (node, index) {
            3 == node.nodeType && node.nodeValue.match(/\S+/) && ($compileNodes[index] = jqLite(node).wrap('<span></span>').parent()[0]);
          });
          var compositeLinkFn = compileNodes($compileNodes, transcludeFn, $compileNodes, maxPriority);
          return function (scope, cloneConnectFn) {
            assertArg(scope, 'scope');
            for (var $linkNode = cloneConnectFn ? JQLitePrototype.clone.call($compileNodes) : $compileNodes, i = 0, ii = $linkNode.length; ii > i; i++) {
              var node = $linkNode[i];
              (1 == node.nodeType || 9 == node.nodeType) && $linkNode.eq(i).data('$scope', scope);
            }
            return safeAddClass($linkNode, 'ng-scope'), cloneConnectFn && cloneConnectFn($linkNode, scope), compositeLinkFn && compositeLinkFn(scope, $linkNode, $linkNode), $linkNode;
          };
        }
        function safeAddClass($element, className) {
          try {
            $element.addClass(className);
          } catch (e) {
          }
        }
        function compileNodes(nodeList, transcludeFn, $rootElement, maxPriority) {
          function compositeLinkFn(scope, nodeList, $rootElement, boundTranscludeFn) {
            var nodeLinkFn, childLinkFn, node, childScope, childTranscludeFn, i, ii, n, stableNodeList = [];
            for (i = 0, ii = nodeList.length; ii > i; i++)
              stableNodeList.push(nodeList[i]);
            for (i = 0, n = 0, ii = linkFns.length; ii > i; n++)
              node = stableNodeList[n], nodeLinkFn = linkFns[i++], childLinkFn = linkFns[i++], nodeLinkFn ? (nodeLinkFn.scope ? (childScope = scope.$new(isObject(nodeLinkFn.scope)), jqLite(node).data('$scope', childScope)) : childScope = scope, childTranscludeFn = nodeLinkFn.transclude, childTranscludeFn || !boundTranscludeFn && transcludeFn ? nodeLinkFn(childLinkFn, childScope, node, $rootElement, function (transcludeFn) {
                return function (cloneFn) {
                  var transcludeScope = scope.$new();
                  return transcludeScope.$$transcluded = !0, transcludeFn(transcludeScope, cloneFn).bind('$destroy', bind(transcludeScope, transcludeScope.$destroy));
                };
              }(childTranscludeFn || transcludeFn)) : nodeLinkFn(childLinkFn, childScope, node, undefined, boundTranscludeFn)) : childLinkFn && childLinkFn(scope, node.childNodes, undefined, boundTranscludeFn);
          }
          for (var nodeLinkFn, childLinkFn, directives, attrs, linkFnFound, linkFns = [], i = 0; i < nodeList.length; i++)
            attrs = new Attributes(), directives = collectDirectives(nodeList[i], [], attrs, maxPriority), nodeLinkFn = directives.length ? applyDirectivesToNode(directives, nodeList[i], attrs, transcludeFn, $rootElement) : null, childLinkFn = nodeLinkFn && nodeLinkFn.terminal || !nodeList[i].childNodes || !nodeList[i].childNodes.length ? null : compileNodes(nodeList[i].childNodes, nodeLinkFn ? nodeLinkFn.transclude : transcludeFn), linkFns.push(nodeLinkFn), linkFns.push(childLinkFn), linkFnFound = linkFnFound || nodeLinkFn || childLinkFn;
          return linkFnFound ? compositeLinkFn : null;
        }
        function collectDirectives(node, directives, attrs, maxPriority) {
          var match, className, nodeType = node.nodeType, attrsMap = attrs.$attr;
          switch (nodeType) {
          case 1:
            addDirective(directives, directiveNormalize(nodeName_(node).toLowerCase()), 'E', maxPriority);
            for (var attr, name, nName, value, nAttrs = node.attributes, j = 0, jj = nAttrs && nAttrs.length; jj > j; j++)
              attr = nAttrs[j], (!msie || msie >= 8 || attr.specified) && (name = attr.name, nName = directiveNormalize(name.toLowerCase()), attrsMap[nName] = name, attrs[nName] = value = trim(msie && 'href' == name ? decodeURIComponent(node.getAttribute(name, 2)) : attr.value), getBooleanAttrName(node, nName) && (attrs[nName] = !0), addAttrInterpolateDirective(node, directives, value, nName), addDirective(directives, nName, 'A', maxPriority));
            if (className = node.className, isString(className) && '' !== className)
              for (; match = CLASS_DIRECTIVE_REGEXP.exec(className);)
                nName = directiveNormalize(match[2]), addDirective(directives, nName, 'C', maxPriority) && (attrs[nName] = trim(match[3])), className = className.substr(match.index + match[0].length);
            break;
          case 3:
            addTextInterpolateDirective(directives, node.nodeValue);
            break;
          case 8:
            try {
              match = COMMENT_DIRECTIVE_REGEXP.exec(node.nodeValue), match && (nName = directiveNormalize(match[1]), addDirective(directives, nName, 'M', maxPriority) && (attrs[nName] = trim(match[2])));
            } catch (e) {
            }
          }
          return directives.sort(byPriority), directives;
        }
        function applyDirectivesToNode(directives, compileNode, templateAttrs, transcludeFn, jqCollection) {
          function addLinkFns(pre, post) {
            pre && (pre.require = directive.require, preLinkFns.push(pre)), post && (post.require = directive.require, postLinkFns.push(post));
          }
          function getControllers(require, $element) {
            var value, retrievalMethod = 'data', optional = !1;
            if (isString(require)) {
              for (; '^' == (value = require.charAt(0)) || '?' == value;)
                require = require.substr(1), '^' == value && (retrievalMethod = 'inheritedData'), optional = optional || '?' == value;
              if (value = $element[retrievalMethod]('$' + require + 'Controller'), !value && !optional)
                throw Error('No controller: ' + require);
              return value;
            }
            return isArray(require) && (value = [], forEach(require, function (require) {
              value.push(getControllers(require, $element));
            })), value;
          }
          function nodeLinkFn(childLinkFn, scope, linkNode, $rootElement, boundTranscludeFn) {
            var attrs, $element, i, ii, linkFn, controller;
            if (attrs = compileNode === linkNode ? templateAttrs : shallowCopy(templateAttrs, new Attributes(jqLite(linkNode), templateAttrs.$attr)), $element = attrs.$$element, newIsolateScopeDirective) {
              var LOCAL_REGEXP = /^\s*([@=&])\s*(\w*)\s*$/, parentScope = scope.$parent || scope;
              forEach(newIsolateScopeDirective.scope, function (definiton, scopeName) {
                var lastValue, parentGet, parentSet, match = definiton.match(LOCAL_REGEXP) || [], attrName = match[2] || scopeName, mode = match[1];
                switch (scope.$$isolateBindings[scopeName] = mode + attrName, mode) {
                case '@':
                  attrs.$observe(attrName, function (value) {
                    scope[scopeName] = value;
                  }), attrs.$$observers[attrName].$$scope = parentScope;
                  break;
                case '=':
                  parentGet = $parse(attrs[attrName]), parentSet = parentGet.assign || function () {
                    throw lastValue = scope[scopeName] = parentGet(parentScope), Error(NON_ASSIGNABLE_MODEL_EXPRESSION + attrs[attrName] + ' (directive: ' + newIsolateScopeDirective.name + ')');
                  }, lastValue = scope[scopeName] = parentGet(parentScope), scope.$watch(function () {
                    var parentValue = parentGet(parentScope);
                    return parentValue !== scope[scopeName] && (parentValue !== lastValue ? lastValue = scope[scopeName] = parentValue : parentSet(parentScope, parentValue = lastValue = scope[scopeName])), parentValue;
                  });
                  break;
                case '&':
                  parentGet = $parse(attrs[attrName]), scope[scopeName] = function (locals) {
                    return parentGet(parentScope, locals);
                  };
                  break;
                default:
                  throw Error('Invalid isolate scope definition for directive ' + newIsolateScopeDirective.name + ': ' + definiton);
                }
              });
            }
            for (controllerDirectives && forEach(controllerDirectives, function (directive) {
                var locals = {
                    $scope: scope,
                    $element: $element,
                    $attrs: attrs,
                    $transclude: boundTranscludeFn
                  };
                controller = directive.controller, '@' == controller && (controller = attrs[directive.name]), $element.data('$' + directive.name + 'Controller', $controller(controller, locals));
              }), i = 0, ii = preLinkFns.length; ii > i; i++)
              try {
                linkFn = preLinkFns[i], linkFn(scope, $element, attrs, linkFn.require && getControllers(linkFn.require, $element));
              } catch (e) {
                $exceptionHandler(e, startingTag($element));
              }
            for (childLinkFn && childLinkFn(scope, linkNode.childNodes, undefined, boundTranscludeFn), i = 0, ii = postLinkFns.length; ii > i; i++)
              try {
                linkFn = postLinkFns[i], linkFn(scope, $element, attrs, linkFn.require && getControllers(linkFn.require, $element));
              } catch (e) {
                $exceptionHandler(e, startingTag($element));
              }
          }
          for (var directive, directiveName, $template, transcludeDirective, controllerDirectives, linkFn, directiveValue, terminalPriority = -Number.MAX_VALUE, preLinkFns = [], postLinkFns = [], newScopeDirective = null, newIsolateScopeDirective = null, templateDirective = null, $compileNode = templateAttrs.$$element = jqLite(compileNode), childTranscludeFn = transcludeFn, i = 0, ii = directives.length; ii > i && (directive = directives[i], $template = undefined, !(terminalPriority > directive.priority)); i++) {
            if ((directiveValue = directive.scope) && (assertNoDuplicate('isolated scope', newIsolateScopeDirective, directive, $compileNode), isObject(directiveValue) && (safeAddClass($compileNode, 'ng-isolate-scope'), newIsolateScopeDirective = directive), safeAddClass($compileNode, 'ng-scope'), newScopeDirective = newScopeDirective || directive), directiveName = directive.name, (directiveValue = directive.controller) && (controllerDirectives = controllerDirectives || {}, assertNoDuplicate('\'' + directiveName + '\' controller', controllerDirectives[directiveName], directive, $compileNode), controllerDirectives[directiveName] = directive), (directiveValue = directive.transclude) && (assertNoDuplicate('transclusion', transcludeDirective, directive, $compileNode), transcludeDirective = directive, terminalPriority = directive.priority, 'element' == directiveValue ? ($template = jqLite(compileNode), $compileNode = templateAttrs.$$element = jqLite(document.createComment(' ' + directiveName + ': ' + templateAttrs[directiveName] + ' ')), compileNode = $compileNode[0], replaceWith(jqCollection, jqLite($template[0]), compileNode), childTranscludeFn = compile($template, transcludeFn, terminalPriority)) : ($template = jqLite(JQLiteClone(compileNode)).contents(), $compileNode.html(''), childTranscludeFn = compile($template, transcludeFn))), directiveValue = directive.template)
              if (assertNoDuplicate('template', templateDirective, directive, $compileNode), templateDirective = directive, directiveValue = denormalizeTemplate(directiveValue), directive.replace) {
                if ($template = jqLite('<div>' + trim(directiveValue) + '</div>').contents(), compileNode = $template[0], 1 != $template.length || 1 !== compileNode.nodeType)
                  throw new Error(MULTI_ROOT_TEMPLATE_ERROR + directiveValue);
                replaceWith(jqCollection, $compileNode, compileNode);
                var newTemplateAttrs = { $attr: {} };
                directives = directives.concat(collectDirectives(compileNode, directives.splice(i + 1, directives.length - (i + 1)), newTemplateAttrs)), mergeTemplateAttributes(templateAttrs, newTemplateAttrs), ii = directives.length;
              } else
                $compileNode.html(directiveValue);
            if (directive.templateUrl)
              assertNoDuplicate('template', templateDirective, directive, $compileNode), templateDirective = directive, nodeLinkFn = compileTemplateUrl(directives.splice(i, directives.length - i), nodeLinkFn, $compileNode, templateAttrs, jqCollection, directive.replace, childTranscludeFn), ii = directives.length;
            else if (directive.compile)
              try {
                linkFn = directive.compile($compileNode, templateAttrs, childTranscludeFn), isFunction(linkFn) ? addLinkFns(null, linkFn) : linkFn && addLinkFns(linkFn.pre, linkFn.post);
              } catch (e) {
                $exceptionHandler(e, startingTag($compileNode));
              }
            directive.terminal && (nodeLinkFn.terminal = !0, terminalPriority = Math.max(terminalPriority, directive.priority));
          }
          return nodeLinkFn.scope = newScopeDirective && newScopeDirective.scope, nodeLinkFn.transclude = transcludeDirective && childTranscludeFn, nodeLinkFn;
        }
        function addDirective(tDirectives, name, location, maxPriority) {
          var match = !1;
          if (hasDirectives.hasOwnProperty(name))
            for (var directive, directives = $injector.get(name + Suffix), i = 0, ii = directives.length; ii > i; i++)
              try {
                directive = directives[i], (maxPriority === undefined || maxPriority > directive.priority) && -1 != directive.restrict.indexOf(location) && (tDirectives.push(directive), match = !0);
              } catch (e) {
                $exceptionHandler(e);
              }
          return match;
        }
        function mergeTemplateAttributes(dst, src) {
          var srcAttr = src.$attr, dstAttr = dst.$attr, $element = dst.$$element;
          forEach(dst, function (value, key) {
            '$' != key.charAt(0) && (src[key] && (value += ('style' === key ? ';' : ' ') + src[key]), dst.$set(key, value, !0, srcAttr[key]));
          }), forEach(src, function (value, key) {
            'class' == key ? (safeAddClass($element, value), dst['class'] = (dst['class'] ? dst['class'] + ' ' : '') + value) : 'style' == key ? $element.attr('style', $element.attr('style') + ';' + value) : '$' == key.charAt(0) || dst.hasOwnProperty(key) || (dst[key] = value, dstAttr[key] = srcAttr[key]);
          });
        }
        function compileTemplateUrl(directives, beforeTemplateNodeLinkFn, $compileNode, tAttrs, $rootElement, replace, childTranscludeFn) {
          var afterTemplateNodeLinkFn, afterTemplateChildLinkFn, linkQueue = [], beforeTemplateCompileNode = $compileNode[0], origAsyncDirective = directives.shift(), derivedSyncDirective = extend({}, origAsyncDirective, {
              controller: null,
              templateUrl: null,
              transclude: null,
              scope: null
            });
          return $compileNode.html(''), $http.get(origAsyncDirective.templateUrl, { cache: $templateCache }).success(function (content) {
            var compileNode, tempTemplateAttrs, $template;
            if (content = denormalizeTemplate(content), replace) {
              if ($template = jqLite('<div>' + trim(content) + '</div>').contents(), compileNode = $template[0], 1 != $template.length || 1 !== compileNode.nodeType)
                throw new Error(MULTI_ROOT_TEMPLATE_ERROR + content);
              tempTemplateAttrs = { $attr: {} }, replaceWith($rootElement, $compileNode, compileNode), collectDirectives(compileNode, directives, tempTemplateAttrs), mergeTemplateAttributes(tAttrs, tempTemplateAttrs);
            } else
              compileNode = beforeTemplateCompileNode, $compileNode.html(content);
            for (directives.unshift(derivedSyncDirective), afterTemplateNodeLinkFn = applyDirectivesToNode(directives, compileNode, tAttrs, childTranscludeFn), afterTemplateChildLinkFn = compileNodes($compileNode[0].childNodes, childTranscludeFn); linkQueue.length;) {
              var controller = linkQueue.pop(), linkRootElement = linkQueue.pop(), beforeTemplateLinkNode = linkQueue.pop(), scope = linkQueue.pop(), linkNode = compileNode;
              beforeTemplateLinkNode !== beforeTemplateCompileNode && (linkNode = JQLiteClone(compileNode), replaceWith(linkRootElement, jqLite(beforeTemplateLinkNode), linkNode)), afterTemplateNodeLinkFn(function () {
                beforeTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, linkNode, $rootElement, controller);
              }, scope, linkNode, $rootElement, controller);
            }
            linkQueue = null;
          }).error(function (response, code, headers, config) {
            throw Error('Failed to load template: ' + config.url);
          }), function (ignoreChildLinkFn, scope, node, rootElement, controller) {
            linkQueue ? (linkQueue.push(scope), linkQueue.push(node), linkQueue.push(rootElement), linkQueue.push(controller)) : afterTemplateNodeLinkFn(function () {
              beforeTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, node, rootElement, controller);
            }, scope, node, rootElement, controller);
          };
        }
        function byPriority(a, b) {
          return b.priority - a.priority;
        }
        function assertNoDuplicate(what, previousDirective, directive, element) {
          if (previousDirective)
            throw Error('Multiple directives [' + previousDirective.name + ', ' + directive.name + '] asking for ' + what + ' on: ' + startingTag(element));
        }
        function addTextInterpolateDirective(directives, text) {
          var interpolateFn = $interpolate(text, !0);
          interpolateFn && directives.push({
            priority: 0,
            compile: valueFn(function (scope, node) {
              var parent = node.parent(), bindings = parent.data('$binding') || [];
              bindings.push(interpolateFn), safeAddClass(parent.data('$binding', bindings), 'ng-binding'), scope.$watch(interpolateFn, function (value) {
                node[0].nodeValue = value;
              });
            })
          });
        }
        function addAttrInterpolateDirective(node, directives, value, name) {
          var interpolateFn = $interpolate(value, !0);
          interpolateFn && directives.push({
            priority: 100,
            compile: valueFn(function (scope, element, attr) {
              var $$observers = attr.$$observers || (attr.$$observers = {});
              'class' === name && (interpolateFn = $interpolate(attr[name], !0)), attr[name] = undefined, ($$observers[name] || ($$observers[name] = [])).$$inter = !0, (attr.$$observers && attr.$$observers[name].$$scope || scope).$watch(interpolateFn, function (value) {
                attr.$set(name, value);
              });
            })
          });
        }
        function replaceWith($rootElement, $element, newNode) {
          var i, ii, oldNode = $element[0], parent = oldNode.parentNode;
          if ($rootElement)
            for (i = 0, ii = $rootElement.length; ii > i; i++)
              if ($rootElement[i] == oldNode) {
                $rootElement[i] = newNode;
                break;
              }
          parent && parent.replaceChild(newNode, oldNode), newNode[jqLite.expando] = oldNode[jqLite.expando], $element[0] = newNode;
        }
        var Attributes = function (element, attr) {
          this.$$element = element, this.$attr = attr || {};
        };
        Attributes.prototype = {
          $normalize: directiveNormalize,
          $set: function (key, value, writeAttr, attrName) {
            var normalizedVal, booleanKey = getBooleanAttrName(this.$$element[0], key), $$observers = this.$$observers;
            booleanKey && (this.$$element.prop(key, value), attrName = booleanKey), this[key] = value, attrName ? this.$attr[key] = attrName : (attrName = this.$attr[key], attrName || (this.$attr[key] = attrName = snake_case(key, '-'))), 'A' === nodeName_(this.$$element[0]) && 'href' === key && (urlSanitizationNode.setAttribute('href', value), normalizedVal = urlSanitizationNode.href, '' === normalizedVal || normalizedVal.match(urlSanitizationWhitelist) || (this[key] = value = 'unsafe:' + normalizedVal)), writeAttr !== !1 && (null === value || value === undefined ? this.$$element.removeAttr(attrName) : this.$$element.attr(attrName, value)), $$observers && forEach($$observers[key], function (fn) {
              try {
                fn(value);
              } catch (e) {
                $exceptionHandler(e);
              }
            });
          },
          $observe: function (key, fn) {
            var attrs = this, $$observers = attrs.$$observers || (attrs.$$observers = {}), listeners = $$observers[key] || ($$observers[key] = []);
            return listeners.push(fn), $rootScope.$evalAsync(function () {
              listeners.$$inter || fn(attrs[key]);
            }), fn;
          }
        };
        var urlSanitizationNode = $document[0].createElement('a'), startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol(), denormalizeTemplate = '{{' == startSymbol || '}}' == endSymbol ? identity : function (template) {
            return template.replace(/\{\{/g, startSymbol).replace(/}}/g, endSymbol);
          };
        return compile;
      }
    ];
  }
  function directiveNormalize(name) {
    return camelCase(name.replace(PREFIX_REGEXP, ''));
  }
  function $ControllerProvider() {
    var controllers = {};
    this.register = function (name, constructor) {
      isObject(name) ? extend(controllers, name) : controllers[name] = constructor;
    }, this.$get = [
      '$injector',
      '$window',
      function ($injector, $window) {
        return function (constructor, locals) {
          if (isString(constructor)) {
            var name = constructor;
            constructor = controllers.hasOwnProperty(name) ? controllers[name] : getter(locals.$scope, name, !0) || getter($window, name, !0), assertArgFn(constructor, name, !0);
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
        return function () {
          $log.error.apply($log, arguments);
        };
      }
    ];
  }
  function $InterpolateProvider() {
    var startSymbol = '{{', endSymbol = '}}';
    this.startSymbol = function (value) {
      return value ? (startSymbol = value, this) : startSymbol;
    }, this.endSymbol = function (value) {
      return value ? (endSymbol = value, this) : endSymbol;
    }, this.$get = [
      '$parse',
      function ($parse) {
        function $interpolate(text, mustHaveExpression) {
          for (var startIndex, endIndex, fn, exp, index = 0, parts = [], length = text.length, hasInterpolation = !1, concat = []; length > index;)
            -1 != (startIndex = text.indexOf(startSymbol, index)) && -1 != (endIndex = text.indexOf(endSymbol, startIndex + startSymbolLength)) ? (index != startIndex && parts.push(text.substring(index, startIndex)), parts.push(fn = $parse(exp = text.substring(startIndex + startSymbolLength, endIndex))), fn.exp = exp, index = endIndex + endSymbolLength, hasInterpolation = !0) : (index != length && parts.push(text.substring(index)), index = length);
          return (length = parts.length) || (parts.push(''), length = 1), !mustHaveExpression || hasInterpolation ? (concat.length = length, fn = function (context) {
            for (var part, i = 0, ii = length; ii > i; i++)
              'function' == typeof (part = parts[i]) && (part = part(context), null == part || part == undefined ? part = '' : 'string' != typeof part && (part = toJson(part))), concat[i] = part;
            return concat.join('');
          }, fn.exp = text, fn.parts = parts, fn) : void 0;
        }
        var startSymbolLength = startSymbol.length, endSymbolLength = endSymbol.length;
        return $interpolate.startSymbol = function () {
          return startSymbol;
        }, $interpolate.endSymbol = function () {
          return endSymbol;
        }, $interpolate;
      }
    ];
  }
  function encodePath(path) {
    for (var segments = path.split('/'), i = segments.length; i--;)
      segments[i] = encodeUriSegment(segments[i]);
    return segments.join('/');
  }
  function matchUrl(url, obj) {
    var match = URL_MATCH.exec(url);
    return match = {
      protocol: match[1],
      host: match[3],
      port: int(match[5]) || DEFAULT_PORTS[match[1]] || null,
      path: match[6] || '/',
      search: match[8],
      hash: match[10]
    }, obj && (obj.$$protocol = match.protocol, obj.$$host = match.host, obj.$$port = match.port), match;
  }
  function composeProtocolHostPort(protocol, host, port) {
    return protocol + '://' + host + (port == DEFAULT_PORTS[protocol] ? '' : ':' + port);
  }
  function pathPrefixFromBase(basePath) {
    return basePath.substr(0, basePath.lastIndexOf('/'));
  }
  function convertToHtml5Url(url, basePath, hashPrefix) {
    var match = matchUrl(url);
    return decodeURIComponent(match.path) != basePath || isUndefined(match.hash) || 0 !== match.hash.indexOf(hashPrefix) ? url : composeProtocolHostPort(match.protocol, match.host, match.port) + pathPrefixFromBase(basePath) + match.hash.substr(hashPrefix.length);
  }
  function convertToHashbangUrl(url, basePath, hashPrefix) {
    var match = matchUrl(url);
    if (decodeURIComponent(match.path) != basePath || isUndefined(match.hash) || 0 !== match.hash.indexOf(hashPrefix)) {
      var search = match.search && '?' + match.search || '', hash = match.hash && '#' + match.hash || '', pathPrefix = pathPrefixFromBase(basePath), path = match.path.substr(pathPrefix.length);
      if (0 !== match.path.indexOf(pathPrefix))
        throw Error('Invalid url "' + url + '", missing path prefix "' + pathPrefix + '" !');
      return composeProtocolHostPort(match.protocol, match.host, match.port) + basePath + '#' + hashPrefix + path + search + hash;
    }
    return url;
  }
  function LocationUrl(url, pathPrefix, appBaseUrl) {
    pathPrefix = pathPrefix || '', this.$$parse = function (newAbsoluteUrl) {
      var match = matchUrl(newAbsoluteUrl, this);
      if (0 !== match.path.indexOf(pathPrefix))
        throw Error('Invalid url "' + newAbsoluteUrl + '", missing path prefix "' + pathPrefix + '" !');
      this.$$path = decodeURIComponent(match.path.substr(pathPrefix.length)), this.$$search = parseKeyValue(match.search), this.$$hash = match.hash && decodeURIComponent(match.hash) || '', this.$$compose();
    }, this.$$compose = function () {
      var search = toKeyValue(this.$$search), hash = this.$$hash ? '#' + encodeUriSegment(this.$$hash) : '';
      this.$$url = encodePath(this.$$path) + (search ? '?' + search : '') + hash, this.$$absUrl = composeProtocolHostPort(this.$$protocol, this.$$host, this.$$port) + pathPrefix + this.$$url;
    }, this.$$rewriteAppUrl = function (absoluteLinkUrl) {
      return 0 == absoluteLinkUrl.indexOf(appBaseUrl) ? absoluteLinkUrl : void 0;
    }, this.$$parse(url);
  }
  function LocationHashbangUrl(url, hashPrefix, appBaseUrl) {
    var basePath;
    this.$$parse = function (url) {
      var match = matchUrl(url, this);
      if (match.hash && 0 !== match.hash.indexOf(hashPrefix))
        throw Error('Invalid url "' + url + '", missing hash prefix "' + hashPrefix + '" !');
      basePath = match.path + (match.search ? '?' + match.search : ''), match = HASH_MATCH.exec((match.hash || '').substr(hashPrefix.length)), this.$$path = match[1] ? ('/' == match[1].charAt(0) ? '' : '/') + decodeURIComponent(match[1]) : '', this.$$search = parseKeyValue(match[3]), this.$$hash = match[5] && decodeURIComponent(match[5]) || '', this.$$compose();
    }, this.$$compose = function () {
      var search = toKeyValue(this.$$search), hash = this.$$hash ? '#' + encodeUriSegment(this.$$hash) : '';
      this.$$url = encodePath(this.$$path) + (search ? '?' + search : '') + hash, this.$$absUrl = composeProtocolHostPort(this.$$protocol, this.$$host, this.$$port) + basePath + (this.$$url ? '#' + hashPrefix + this.$$url : '');
    }, this.$$rewriteAppUrl = function (absoluteLinkUrl) {
      return 0 == absoluteLinkUrl.indexOf(appBaseUrl) ? absoluteLinkUrl : void 0;
    }, this.$$parse(url);
  }
  function LocationHashbangInHtml5Url(url, hashPrefix, appBaseUrl, baseExtra) {
    LocationHashbangUrl.apply(this, arguments), this.$$rewriteAppUrl = function (absoluteLinkUrl) {
      return 0 == absoluteLinkUrl.indexOf(appBaseUrl) ? appBaseUrl + baseExtra + '#' + hashPrefix + absoluteLinkUrl.substr(appBaseUrl.length) : void 0;
    };
  }
  function locationGetter(property) {
    return function () {
      return this[property];
    };
  }
  function locationGetterSetter(property, preprocess) {
    return function (value) {
      return isUndefined(value) ? this[property] : (this[property] = preprocess(value), this.$$compose(), this);
    };
  }
  function $LocationProvider() {
    var hashPrefix = '', html5Mode = !1;
    this.hashPrefix = function (prefix) {
      return isDefined(prefix) ? (hashPrefix = prefix, this) : hashPrefix;
    }, this.html5Mode = function (mode) {
      return isDefined(mode) ? (html5Mode = mode, this) : html5Mode;
    }, this.$get = [
      '$rootScope',
      '$browser',
      '$sniffer',
      '$rootElement',
      function ($rootScope, $browser, $sniffer, $rootElement) {
        function afterLocationChange(oldUrl) {
          $rootScope.$broadcast('$locationChangeSuccess', $location.absUrl(), oldUrl);
        }
        var $location, basePath, pathPrefix, appBaseUrl, initUrl = $browser.url(), initUrlParts = matchUrl(initUrl);
        html5Mode ? (basePath = $browser.baseHref() || '/', pathPrefix = pathPrefixFromBase(basePath), appBaseUrl = composeProtocolHostPort(initUrlParts.protocol, initUrlParts.host, initUrlParts.port) + pathPrefix + '/', $location = $sniffer.history ? new LocationUrl(convertToHtml5Url(initUrl, basePath, hashPrefix), pathPrefix, appBaseUrl) : new LocationHashbangInHtml5Url(convertToHashbangUrl(initUrl, basePath, hashPrefix), hashPrefix, appBaseUrl, basePath.substr(pathPrefix.length + 1))) : (appBaseUrl = composeProtocolHostPort(initUrlParts.protocol, initUrlParts.host, initUrlParts.port) + (initUrlParts.path || '') + (initUrlParts.search ? '?' + initUrlParts.search : '') + '#' + hashPrefix + '/', $location = new LocationHashbangUrl(initUrl, hashPrefix, appBaseUrl)), $rootElement.bind('click', function (event) {
          if (!event.ctrlKey && !event.metaKey && 2 != event.which) {
            for (var elm = jqLite(event.target); 'a' !== lowercase(elm[0].nodeName);)
              if (elm[0] === $rootElement[0] || !(elm = elm.parent())[0])
                return;
            var absHref = elm.prop('href'), rewrittenUrl = $location.$$rewriteAppUrl(absHref);
            absHref && !elm.attr('target') && rewrittenUrl && ($location.$$parse(rewrittenUrl), $rootScope.$apply(), event.preventDefault(), window.angular['ff-684208-preventDefault'] = !0);
          }
        }), $location.absUrl() != initUrl && $browser.url($location.absUrl(), !0), $browser.onUrlChange(function (newUrl) {
          if ($location.absUrl() != newUrl) {
            if ($rootScope.$broadcast('$locationChangeStart', newUrl, $location.absUrl()).defaultPrevented)
              return void $browser.url($location.absUrl());
            $rootScope.$evalAsync(function () {
              var oldUrl = $location.absUrl();
              $location.$$parse(newUrl), afterLocationChange(oldUrl);
            }), $rootScope.$$phase || $rootScope.$digest();
          }
        });
        var changeCounter = 0;
        return $rootScope.$watch(function () {
          var oldUrl = $browser.url(), currentReplace = $location.$$replace;
          return changeCounter && oldUrl == $location.absUrl() || (changeCounter++, $rootScope.$evalAsync(function () {
            $rootScope.$broadcast('$locationChangeStart', $location.absUrl(), oldUrl).defaultPrevented ? $location.$$parse(oldUrl) : ($browser.url($location.absUrl(), currentReplace), afterLocationChange(oldUrl));
          })), $location.$$replace = !1, changeCounter;
        }), $location;
      }
    ];
  }
  function $LogProvider() {
    this.$get = [
      '$window',
      function ($window) {
        function formatError(arg) {
          return arg instanceof Error && (arg.stack ? arg = arg.message && -1 === arg.stack.indexOf(arg.message) ? 'Error: ' + arg.message + '\n' + arg.stack : arg.stack : arg.sourceURL && (arg = arg.message + '\n' + arg.sourceURL + ':' + arg.line)), arg;
        }
        function consoleLog(type) {
          var console = $window.console || {}, logFn = console[type] || console.log || noop;
          return logFn.apply ? function () {
            var args = [];
            return forEach(arguments, function (arg) {
              args.push(formatError(arg));
            }), logFn.apply(console, args);
          } : function (arg1, arg2) {
            logFn(arg1, arg2);
          };
        }
        return {
          log: consoleLog('log'),
          warn: consoleLog('warn'),
          info: consoleLog('info'),
          error: consoleLog('error')
        };
      }
    ];
  }
  function lex(text, csp) {
    function is(chars) {
      return -1 != chars.indexOf(ch);
    }
    function was(chars) {
      return -1 != chars.indexOf(lastCh);
    }
    function peek() {
      return index + 1 < text.length ? text.charAt(index + 1) : !1;
    }
    function isNumber(ch) {
      return ch >= '0' && '9' >= ch;
    }
    function isWhitespace(ch) {
      return ' ' == ch || '\r' == ch || '\t' == ch || '\n' == ch || '\x0B' == ch || '\xa0' == ch;
    }
    function isIdent(ch) {
      return ch >= 'a' && 'z' >= ch || ch >= 'A' && 'Z' >= ch || '_' == ch || '$' == ch;
    }
    function isExpOperator(ch) {
      return '-' == ch || '+' == ch || isNumber(ch);
    }
    function throwError(error, start, end) {
      throw end = end || index, Error('Lexer Error: ' + error + ' at column' + (isDefined(start) ? 's ' + start + '-' + index + ' [' + text.substring(start, end) + ']' : ' ' + end) + ' in expression [' + text + '].');
    }
    function readNumber() {
      for (var number = '', start = index; index < text.length;) {
        var ch = lowercase(text.charAt(index));
        if ('.' == ch || isNumber(ch))
          number += ch;
        else {
          var peekCh = peek();
          if ('e' == ch && isExpOperator(peekCh))
            number += ch;
          else if (isExpOperator(ch) && peekCh && isNumber(peekCh) && 'e' == number.charAt(number.length - 1))
            number += ch;
          else {
            if (!isExpOperator(ch) || peekCh && isNumber(peekCh) || 'e' != number.charAt(number.length - 1))
              break;
            throwError('Invalid exponent');
          }
        }
        index++;
      }
      number = 1 * number, tokens.push({
        index: start,
        text: number,
        json: !0,
        fn: function () {
          return number;
        }
      });
    }
    function readIdent() {
      for (var lastDot, peekIndex, methodName, ch, ident = '', start = index; index < text.length && (ch = text.charAt(index), '.' == ch || isIdent(ch) || isNumber(ch));)
        '.' == ch && (lastDot = index), ident += ch, index++;
      if (lastDot)
        for (peekIndex = index; peekIndex < text.length;) {
          if (ch = text.charAt(peekIndex), '(' == ch) {
            methodName = ident.substr(lastDot - start + 1), ident = ident.substr(0, lastDot - start), index = peekIndex;
            break;
          }
          if (!isWhitespace(ch))
            break;
          peekIndex++;
        }
      var token = {
          index: start,
          text: ident
        };
      if (OPERATORS.hasOwnProperty(ident))
        token.fn = token.json = OPERATORS[ident];
      else {
        var getter = getterFn(ident, csp);
        token.fn = extend(function (self, locals) {
          return getter(self, locals);
        }, {
          assign: function (self, value) {
            return setter(self, ident, value);
          }
        });
      }
      tokens.push(token), methodName && (tokens.push({
        index: lastDot,
        text: '.',
        json: !1
      }), tokens.push({
        index: lastDot + 1,
        text: methodName,
        json: !1
      }));
    }
    function readString(quote) {
      var start = index;
      index++;
      for (var string = '', rawString = quote, escape = !1; index < text.length;) {
        var ch = text.charAt(index);
        if (rawString += ch, escape) {
          if ('u' == ch) {
            var hex = text.substring(index + 1, index + 5);
            hex.match(/[\da-f]{4}/i) || throwError('Invalid unicode escape [\\u' + hex + ']'), index += 4, string += String.fromCharCode(parseInt(hex, 16));
          } else {
            var rep = ESCAPE[ch];
            string += rep ? rep : ch;
          }
          escape = !1;
        } else if ('\\' == ch)
          escape = !0;
        else {
          if (ch == quote)
            return index++, void tokens.push({
              index: start,
              text: rawString,
              string: string,
              json: !0,
              fn: function () {
                return string;
              }
            });
          string += ch;
        }
        index++;
      }
      throwError('Unterminated quote', start);
    }
    for (var token, ch, tokens = [], index = 0, json = [], lastCh = ':'; index < text.length;) {
      if (ch = text.charAt(index), is('"\''))
        readString(ch);
      else if (isNumber(ch) || is('.') && isNumber(peek()))
        readNumber();
      else if (isIdent(ch))
        readIdent(), was('{,') && '{' == json[0] && (token = tokens[tokens.length - 1]) && (token.json = -1 == token.text.indexOf('.'));
      else if (is('(){}[].,;:'))
        tokens.push({
          index: index,
          text: ch,
          json: was(':[,') && is('{[') || is('}]:,')
        }), is('{[') && json.unshift(ch), is('}]') && json.shift(), index++;
      else {
        if (isWhitespace(ch)) {
          index++;
          continue;
        }
        var ch2 = ch + peek(), fn = OPERATORS[ch], fn2 = OPERATORS[ch2];
        fn2 ? (tokens.push({
          index: index,
          text: ch2,
          fn: fn2
        }), index += 2) : fn ? (tokens.push({
          index: index,
          text: ch,
          fn: fn,
          json: was('[,:') && is('+-')
        }), index += 1) : throwError('Unexpected next character ', index, index + 1);
      }
      lastCh = ch;
    }
    return tokens;
  }
  function parser(text, json, $filter, csp) {
    function throwError(msg, token) {
      throw Error('Syntax Error: Token \'' + token.text + '\' ' + msg + ' at column ' + (token.index + 1) + ' of the expression [' + text + '] starting at [' + text.substring(token.index) + '].');
    }
    function peekToken() {
      if (0 === tokens.length)
        throw Error('Unexpected end of expression: ' + text);
      return tokens[0];
    }
    function peek(e1, e2, e3, e4) {
      if (tokens.length > 0) {
        var token = tokens[0], t = token.text;
        if (t == e1 || t == e2 || t == e3 || t == e4 || !e1 && !e2 && !e3 && !e4)
          return token;
      }
      return !1;
    }
    function expect(e1, e2, e3, e4) {
      var token = peek(e1, e2, e3, e4);
      return token ? (json && !token.json && throwError('is not valid json', token), tokens.shift(), token) : !1;
    }
    function consume(e1) {
      expect(e1) || throwError('is unexpected, expecting [' + e1 + ']', peek());
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
      for (var statements = [];;)
        if (tokens.length > 0 && !peek('}', ')', ';', ']') && statements.push(filterChain()), !expect(';'))
          return 1 == statements.length ? statements[0] : function (self, locals) {
            for (var value, i = 0; i < statements.length; i++) {
              var statement = statements[i];
              statement && (value = statement(self, locals));
            }
            return value;
          };
    }
    function _filterChain() {
      for (var token, left = expression();;) {
        if (!(token = expect('|')))
          return left;
        left = binaryFn(left, token.fn, filter());
      }
    }
    function filter() {
      for (var token = expect(), fn = $filter(token.text), argsFn = [];;) {
        if (!(token = expect(':'))) {
          var fnInvoke = function (self, locals, input) {
            for (var args = [input], i = 0; i < argsFn.length; i++)
              args.push(argsFn[i](self, locals));
            return fn.apply(self, args);
          };
          return function () {
            return fnInvoke;
          };
        }
        argsFn.push(expression());
      }
    }
    function expression() {
      return assignment();
    }
    function _assignment() {
      var right, token, left = logicalOR();
      return (token = expect('=')) ? (left.assign || throwError('implies assignment but [' + text.substring(0, token.index) + '] can not be assigned to', token), right = logicalOR(), function (scope, locals) {
        return left.assign(scope, right(scope, locals), locals);
      }) : left;
    }
    function logicalOR() {
      for (var token, left = logicalAND();;) {
        if (!(token = expect('||')))
          return left;
        left = binaryFn(left, token.fn, logicalAND());
      }
    }
    function logicalAND() {
      var token, left = equality();
      return (token = expect('&&')) && (left = binaryFn(left, token.fn, logicalAND())), left;
    }
    function equality() {
      var token, left = relational();
      return (token = expect('==', '!=')) && (left = binaryFn(left, token.fn, equality())), left;
    }
    function relational() {
      var token, left = additive();
      return (token = expect('<', '>', '<=', '>=')) && (left = binaryFn(left, token.fn, relational())), left;
    }
    function additive() {
      for (var token, left = multiplicative(); token = expect('+', '-');)
        left = binaryFn(left, token.fn, multiplicative());
      return left;
    }
    function multiplicative() {
      for (var token, left = unary(); token = expect('*', '/', '%');)
        left = binaryFn(left, token.fn, unary());
      return left;
    }
    function unary() {
      var token;
      return expect('+') ? primary() : (token = expect('-')) ? binaryFn(ZERO, token.fn, unary()) : (token = expect('!')) ? unaryFn(token.fn, unary()) : primary();
    }
    function primary() {
      var primary;
      if (expect('('))
        primary = filterChain(), consume(')');
      else if (expect('['))
        primary = arrayDeclaration();
      else if (expect('{'))
        primary = object();
      else {
        var token = expect();
        primary = token.fn, primary || throwError('not a primary expression', token);
      }
      for (var next, context; next = expect('(', '[', '.');)
        '(' === next.text ? (primary = functionCall(primary, context), context = null) : '[' === next.text ? (context = primary, primary = objectIndex(primary)) : '.' === next.text ? (context = primary, primary = fieldAccess(primary)) : throwError('IMPOSSIBLE');
      return primary;
    }
    function _fieldAccess(object) {
      var field = expect().text, getter = getterFn(field, csp);
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
      return consume(']'), extend(function (self, locals) {
        var v, p, o = obj(self, locals), i = indexFn(self, locals);
        return o ? (v = o[i], v && v.then && (p = v, '$$v' in v || (p.$$v = undefined, p.then(function (val) {
          p.$$v = val;
        })), v = v.$$v), v) : undefined;
      }, {
        assign: function (self, value, locals) {
          return obj(self, locals)[indexFn(self, locals)] = value;
        }
      });
    }
    function _functionCall(fn, contextGetter) {
      var argsFn = [];
      if (')' != peekToken().text)
        do
          argsFn.push(expression());
        while (expect(','));
      return consume(')'), function (scope, locals) {
        for (var args = [], context = contextGetter ? contextGetter(scope, locals) : scope, i = 0; i < argsFn.length; i++)
          args.push(argsFn[i](scope, locals));
        var fnPtr = fn(scope, locals, context) || noop;
        return fnPtr.apply ? fnPtr.apply(context, args) : fnPtr(args[0], args[1], args[2], args[3], args[4]);
      };
    }
    function arrayDeclaration() {
      var elementFns = [];
      if (']' != peekToken().text)
        do
          elementFns.push(expression());
        while (expect(','));
      return consume(']'), function (self, locals) {
        for (var array = [], i = 0; i < elementFns.length; i++)
          array.push(elementFns[i](self, locals));
        return array;
      };
    }
    function object() {
      var keyValues = [];
      if ('}' != peekToken().text)
        do {
          var token = expect(), key = token.string || token.text;
          consume(':');
          var value = expression();
          keyValues.push({
            key: key,
            value: value
          });
        } while (expect(','));
      return consume('}'), function (self, locals) {
        for (var object = {}, i = 0; i < keyValues.length; i++) {
          var keyValue = keyValues[i];
          object[keyValue.key] = keyValue.value(self, locals);
        }
        return object;
      };
    }
    var value, ZERO = valueFn(0), tokens = lex(text, csp), assignment = _assignment, functionCall = _functionCall, fieldAccess = _fieldAccess, objectIndex = _objectIndex, filterChain = _filterChain;
    return json ? (assignment = logicalOR, functionCall = fieldAccess = objectIndex = filterChain = function () {
      throwError('is not valid json', {
        text: text,
        index: 0
      });
    }, value = primary()) : value = statements(), 0 !== tokens.length && throwError('is an unexpected token', tokens[0]), value;
  }
  function setter(obj, path, setValue) {
    for (var element = path.split('.'), i = 0; element.length > 1; i++) {
      var key = element.shift(), propertyObj = obj[key];
      propertyObj || (propertyObj = {}, obj[key] = propertyObj), obj = propertyObj;
    }
    return obj[element.shift()] = setValue, setValue;
  }
  function cspSafeGetterFn(key0, key1, key2, key3, key4) {
    return function (scope, locals) {
      var promise, pathVal = locals && locals.hasOwnProperty(key0) ? locals : scope;
      return null === pathVal || pathVal === undefined ? pathVal : (pathVal = pathVal[key0], pathVal && pathVal.then && ('$$v' in pathVal || (promise = pathVal, promise.$$v = undefined, promise.then(function (val) {
        promise.$$v = val;
      })), pathVal = pathVal.$$v), key1 && null !== pathVal && pathVal !== undefined ? (pathVal = pathVal[key1], pathVal && pathVal.then && ('$$v' in pathVal || (promise = pathVal, promise.$$v = undefined, promise.then(function (val) {
        promise.$$v = val;
      })), pathVal = pathVal.$$v), key2 && null !== pathVal && pathVal !== undefined ? (pathVal = pathVal[key2], pathVal && pathVal.then && ('$$v' in pathVal || (promise = pathVal, promise.$$v = undefined, promise.then(function (val) {
        promise.$$v = val;
      })), pathVal = pathVal.$$v), key3 && null !== pathVal && pathVal !== undefined ? (pathVal = pathVal[key3], pathVal && pathVal.then && ('$$v' in pathVal || (promise = pathVal, promise.$$v = undefined, promise.then(function (val) {
        promise.$$v = val;
      })), pathVal = pathVal.$$v), key4 && null !== pathVal && pathVal !== undefined ? (pathVal = pathVal[key4], pathVal && pathVal.then && ('$$v' in pathVal || (promise = pathVal, promise.$$v = undefined, promise.then(function (val) {
        promise.$$v = val;
      })), pathVal = pathVal.$$v), pathVal) : pathVal) : pathVal) : pathVal) : pathVal);
    };
  }
  function getterFn(path, csp) {
    if (getterFnCache.hasOwnProperty(path))
      return getterFnCache[path];
    var fn, pathKeys = path.split('.'), pathKeysLength = pathKeys.length;
    if (csp)
      fn = 6 > pathKeysLength ? cspSafeGetterFn(pathKeys[0], pathKeys[1], pathKeys[2], pathKeys[3], pathKeys[4]) : function (scope, locals) {
        var val, i = 0;
        do
          val = cspSafeGetterFn(pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++])(scope, locals), locals = undefined, scope = val;
        while (pathKeysLength > i);
        return val;
      };
    else {
      var code = 'var l, fn, p;\n';
      forEach(pathKeys, function (key, index) {
        code += 'if(s === null || s === undefined) return s;\nl=s;\ns=' + (index ? 's' : '((k&&k.hasOwnProperty("' + key + '"))?k:s)') + '["' + key + '"];\nif (s && s.then) {\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n';
      }), code += 'return s;', fn = Function('s', 'k', code), fn.toString = function () {
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
            return cache.hasOwnProperty(exp) ? cache[exp] : cache[exp] = parser(exp, !1, $filter, $sniffer.csp);
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
    function defaultCallback(value) {
      return value;
    }
    function defaultErrback(reason) {
      return reject(reason);
    }
    function all(promises) {
      var deferred = defer(), counter = promises.length, results = [];
      return counter ? forEach(promises, function (promise, index) {
        ref(promise).then(function (value) {
          index in results || (results[index] = value, --counter || deferred.resolve(results));
        }, function (reason) {
          index in results || deferred.reject(reason);
        });
      }) : deferred.resolve(results), deferred.promise;
    }
    var defer = function () {
        var value, deferred, pending = [];
        return deferred = {
          resolve: function (val) {
            if (pending) {
              var callbacks = pending;
              pending = undefined, value = ref(val), callbacks.length && nextTick(function () {
                for (var callback, i = 0, ii = callbacks.length; ii > i; i++)
                  callback = callbacks[i], value.then(callback[0], callback[1]);
              });
            }
          },
          reject: function (reason) {
            deferred.resolve(reject(reason));
          },
          promise: {
            then: function (callback, errback) {
              var result = defer(), wrappedCallback = function (value) {
                  try {
                    result.resolve((callback || defaultCallback)(value));
                  } catch (e) {
                    result.reject(e), exceptionHandler(e);
                  }
                }, wrappedErrback = function (reason) {
                  try {
                    result.resolve((errback || defaultErrback)(reason));
                  } catch (e) {
                    result.reject(e), exceptionHandler(e);
                  }
                };
              return pending ? pending.push([
                wrappedCallback,
                wrappedErrback
              ]) : value.then(wrappedCallback, wrappedErrback), result.promise;
            }
          }
        };
      }, ref = function (value) {
        return value && value.then ? value : {
          then: function (callback) {
            var result = defer();
            return nextTick(function () {
              result.resolve(callback(value));
            }), result.promise;
          }
        };
      }, reject = function (reason) {
        return {
          then: function (callback, errback) {
            var result = defer();
            return nextTick(function () {
              result.resolve((errback || defaultErrback)(reason));
            }), result.promise;
          }
        };
      }, when = function (value, callback, errback) {
        var done, result = defer(), wrappedCallback = function (value) {
            try {
              return (callback || defaultCallback)(value);
            } catch (e) {
              return exceptionHandler(e), reject(e);
            }
          }, wrappedErrback = function (reason) {
            try {
              return (errback || defaultErrback)(reason);
            } catch (e) {
              return exceptionHandler(e), reject(e);
            }
          };
        return nextTick(function () {
          ref(value).then(function (value) {
            done || (done = !0, result.resolve(ref(value).then(wrappedCallback, wrappedErrback)));
          }, function (reason) {
            done || (done = !0, result.resolve(wrappedErrback(reason)));
          });
        }), result.promise;
      };
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
      if (routes[path] = extend({ reloadOnSearch: !0 }, route), path) {
        var redirectPath = '/' == path[path.length - 1] ? path.substr(0, path.length - 1) : path + '/';
        routes[redirectPath] = { redirectTo: path };
      }
      return this;
    }, this.otherwise = function (params) {
      return this.when(null, params), this;
    }, this.$get = [
      '$rootScope',
      '$location',
      '$routeParams',
      '$q',
      '$injector',
      '$http',
      '$templateCache',
      function ($rootScope, $location, $routeParams, $q, $injector, $http, $templateCache) {
        function switchRouteMatcher(on, when) {
          when = '^' + when.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '$';
          for (var paramMatch, regex = '', params = [], dst = {}, re = /:(\w+)/g, lastMatchedIndex = 0; null !== (paramMatch = re.exec(when));)
            regex += when.slice(lastMatchedIndex, paramMatch.index), regex += '([^\\/]*)', params.push(paramMatch[1]), lastMatchedIndex = re.lastIndex;
          regex += when.substr(lastMatchedIndex);
          var match = on.match(new RegExp(regex));
          return match && forEach(params, function (name, index) {
            dst[name] = match[index + 1];
          }), match ? dst : null;
        }
        function updateRoute() {
          var next = parseRoute(), last = $route.current;
          next && last && next.$$route === last.$$route && equals(next.pathParams, last.pathParams) && !next.reloadOnSearch && !forceReload ? (last.params = next.params, copy(last.params, $routeParams), $rootScope.$broadcast('$routeUpdate', last)) : (next || last) && (forceReload = !1, $rootScope.$broadcast('$routeChangeStart', next, last), $route.current = next, next && next.redirectTo && (isString(next.redirectTo) ? $location.path(interpolate(next.redirectTo, next.params)).search(next.params).replace() : $location.url(next.redirectTo(next.pathParams, $location.path(), $location.search())).replace()), $q.when(next).then(function () {
            if (next) {
              var template, keys = [], values = [];
              return forEach(next.resolve || {}, function (value, key) {
                keys.push(key), values.push(isString(value) ? $injector.get(value) : $injector.invoke(value));
              }), isDefined(template = next.template) || isDefined(template = next.templateUrl) && (template = $http.get(template, { cache: $templateCache }).then(function (response) {
                return response.data;
              })), isDefined(template) && (keys.push('$template'), values.push(template)), $q.all(values).then(function (values) {
                var locals = {};
                return forEach(values, function (value, index) {
                  locals[keys[index]] = value;
                }), locals;
              });
            }
          }).then(function (locals) {
            next == $route.current && (next && (next.locals = locals, copy(next.params, $routeParams)), $rootScope.$broadcast('$routeChangeSuccess', next, last));
          }, function (error) {
            next == $route.current && $rootScope.$broadcast('$routeChangeError', next, last, error);
          }));
        }
        function parseRoute() {
          var params, match;
          return forEach(routes, function (route, path) {
            !match && (params = switchRouteMatcher($location.path(), path)) && (match = inherit(route, {
              params: extend({}, $location.search(), params),
              pathParams: params
            }), match.$$route = route);
          }), match || routes[null] && inherit(routes[null], {
            params: {},
            pathParams: {}
          });
        }
        function interpolate(string, params) {
          var result = [];
          return forEach((string || '').split(':'), function (segment, i) {
            if (0 == i)
              result.push(segment);
            else {
              var segmentMatch = segment.match(/(\w+)(.*)/), key = segmentMatch[1];
              result.push(params[key]), result.push(segmentMatch[2] || ''), delete params[key];
            }
          }), result.join('');
        }
        var forceReload = !1, $route = {
            routes: routes,
            reload: function () {
              forceReload = !0, $rootScope.$evalAsync(updateRoute);
            }
          };
        return $rootScope.$on('$locationChangeSuccess', updateRoute), $route;
      }
    ];
  }
  function $RouteParamsProvider() {
    this.$get = valueFn({});
  }
  function $RootScopeProvider() {
    var TTL = 10;
    this.digestTtl = function (value) {
      return arguments.length && (TTL = value), TTL;
    }, this.$get = [
      '$injector',
      '$exceptionHandler',
      '$parse',
      function ($injector, $exceptionHandler, $parse) {
        function Scope() {
          this.$id = nextUid(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this['this'] = this.$root = this, this.$$destroyed = !1, this.$$asyncQueue = [], this.$$listeners = {}, this.$$isolateBindings = {};
        }
        function beginPhase(phase) {
          if ($rootScope.$$phase)
            throw Error($rootScope.$$phase + ' already in progress');
          $rootScope.$$phase = phase;
        }
        function clearPhase() {
          $rootScope.$$phase = null;
        }
        function compileToFn(exp, name) {
          var fn = $parse(exp);
          return assertArgFn(fn, name), fn;
        }
        function initWatchVal() {
        }
        Scope.prototype = {
          $new: function (isolate) {
            var Child, child;
            if (isFunction(isolate))
              throw Error('API-CHANGE: Use $controller to instantiate controllers.');
            return isolate ? (child = new Scope(), child.$root = this.$root) : (Child = function () {
            }, Child.prototype = this, child = new Child(), child.$id = nextUid()), child['this'] = child, child.$$listeners = {}, child.$parent = this, child.$$asyncQueue = [], child.$$watchers = child.$$nextSibling = child.$$childHead = child.$$childTail = null, child.$$prevSibling = this.$$childTail, this.$$childHead ? (this.$$childTail.$$nextSibling = child, this.$$childTail = child) : this.$$childHead = this.$$childTail = child, child;
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
            return array || (array = scope.$$watchers = []), array.unshift(watcher), function () {
              arrayRemove(array, watcher);
            };
          },
          $digest: function () {
            var watch, value, last, watchers, asyncQueue, length, dirty, next, current, logIdx, logMsg, ttl = TTL, target = this, watchLog = [];
            beginPhase('$digest');
            do {
              dirty = !1, current = target;
              do {
                for (asyncQueue = current.$$asyncQueue; asyncQueue.length;)
                  try {
                    current.$eval(asyncQueue.shift());
                  } catch (e) {
                    $exceptionHandler(e);
                  }
                if (watchers = current.$$watchers)
                  for (length = watchers.length; length--;)
                    try {
                      watch = watchers[length], watch && (value = watch.get(current)) !== (last = watch.last) && !(watch.eq ? equals(value, last) : 'number' == typeof value && 'number' == typeof last && isNaN(value) && isNaN(last)) && (dirty = !0, watch.last = watch.eq ? copy(value) : value, watch.fn(value, last === initWatchVal ? value : last, current), 5 > ttl && (logIdx = 4 - ttl, watchLog[logIdx] || (watchLog[logIdx] = []), logMsg = isFunction(watch.exp) ? 'fn: ' + (watch.exp.name || watch.exp.toString()) : watch.exp, logMsg += '; newVal: ' + toJson(value) + '; oldVal: ' + toJson(last), watchLog[logIdx].push(logMsg)));
                    } catch (e) {
                      $exceptionHandler(e);
                    }
                if (!(next = current.$$childHead || current !== target && current.$$nextSibling))
                  for (; current !== target && !(next = current.$$nextSibling);)
                    current = current.$parent;
              } while (current = next);
              if (dirty && !ttl--)
                throw clearPhase(), Error(TTL + ' $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: ' + toJson(watchLog));
            } while (dirty || asyncQueue.length);
            clearPhase();
          },
          $destroy: function () {
            if ($rootScope != this && !this.$$destroyed) {
              var parent = this.$parent;
              this.$broadcast('$destroy'), this.$$destroyed = !0, parent.$$childHead == this && (parent.$$childHead = this.$$nextSibling), parent.$$childTail == this && (parent.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
            }
          },
          $eval: function (expr, locals) {
            return $parse(expr)(this, locals);
          },
          $evalAsync: function (expr) {
            this.$$asyncQueue.push(expr);
          },
          $apply: function (expr) {
            try {
              return beginPhase('$apply'), this.$eval(expr);
            } catch (e) {
              $exceptionHandler(e);
            } finally {
              clearPhase();
              try {
                $rootScope.$digest();
              } catch (e) {
                throw $exceptionHandler(e), e;
              }
            }
          },
          $on: function (name, listener) {
            var namedListeners = this.$$listeners[name];
            return namedListeners || (this.$$listeners[name] = namedListeners = []), namedListeners.push(listener), function () {
              namedListeners[indexOf(namedListeners, listener)] = null;
            };
          },
          $emit: function (name) {
            var namedListeners, i, length, empty = [], scope = this, stopPropagation = !1, event = {
                name: name,
                targetScope: scope,
                stopPropagation: function () {
                  stopPropagation = !0;
                },
                preventDefault: function () {
                  event.defaultPrevented = !0;
                },
                defaultPrevented: !1
              }, listenerArgs = concat([event], arguments, 1);
            do {
              for (namedListeners = scope.$$listeners[name] || empty, event.currentScope = scope, i = 0, length = namedListeners.length; length > i; i++)
                if (namedListeners[i])
                  try {
                    if (namedListeners[i].apply(null, listenerArgs), stopPropagation)
                      return event;
                  } catch (e) {
                    $exceptionHandler(e);
                  }
                else
                  namedListeners.splice(i, 1), i--, length--;
              scope = scope.$parent;
            } while (scope);
            return event;
          },
          $broadcast: function (name) {
            var listeners, i, length, target = this, current = target, next = target, event = {
                name: name,
                targetScope: target,
                preventDefault: function () {
                  event.defaultPrevented = !0;
                },
                defaultPrevented: !1
              }, listenerArgs = concat([event], arguments, 1);
            do {
              for (current = next, event.currentScope = current, listeners = current.$$listeners[name] || [], i = 0, length = listeners.length; length > i; i++)
                if (listeners[i])
                  try {
                    listeners[i].apply(null, listenerArgs);
                  } catch (e) {
                    $exceptionHandler(e);
                  }
                else
                  listeners.splice(i, 1), i--, length--;
              if (!(next = current.$$childHead || current !== target && current.$$nextSibling))
                for (; current !== target && !(next = current.$$nextSibling);)
                  current = current.$parent;
            } while (current = next);
            return event;
          }
        };
        var $rootScope = new Scope();
        return $rootScope;
      }
    ];
  }
  function $SnifferProvider() {
    this.$get = [
      '$window',
      function ($window) {
        var eventSupport = {}, android = int((/android (\d+)/.exec(lowercase($window.navigator.userAgent)) || [])[1]);
        return {
          history: !(!$window.history || !$window.history.pushState || 4 > android),
          hashchange: 'onhashchange' in $window && (!$window.document.documentMode || $window.document.documentMode > 7),
          hasEvent: function (event) {
            if ('input' == event && 9 == msie)
              return !1;
            if (isUndefined(eventSupport[event])) {
              var divElm = $window.document.createElement('div');
              eventSupport[event] = 'on' + event in divElm;
            }
            return eventSupport[event];
          },
          csp: !1
        };
      }
    ];
  }
  function $WindowProvider() {
    this.$get = valueFn(window);
  }
  function parseHeaders(headers) {
    var key, val, i, parsed = {};
    return headers ? (forEach(headers.split('\n'), function (line) {
      i = line.indexOf(':'), key = lowercase(trim(line.substr(0, i))), val = trim(line.substr(i + 1)), key && (parsed[key] ? parsed[key] += ', ' + val : parsed[key] = val);
    }), parsed) : parsed;
  }
  function headersGetter(headers) {
    var headersObj = isObject(headers) ? headers : undefined;
    return function (name) {
      return headersObj || (headersObj = parseHeaders(headers)), name ? headersObj[lowercase(name)] || null : headersObj;
    };
  }
  function transformData(data, headers, fns) {
    return isFunction(fns) ? fns(data, headers) : (forEach(fns, function (fn) {
      data = fn(data, headers);
    }), data);
  }
  function isSuccess(status) {
    return status >= 200 && 300 > status;
  }
  function $HttpProvider() {
    var JSON_START = /^\s*(\[|\{[^\{])/, JSON_END = /[\}\]]\s*$/, PROTECTION_PREFIX = /^\)\]\}',?\n/, $config = this.defaults = {
        transformResponse: [function (data) {
            return isString(data) && (data = data.replace(PROTECTION_PREFIX, ''), JSON_START.test(data) && JSON_END.test(data) && (data = fromJson(data, !0))), data;
          }],
        transformRequest: [function (d) {
            return isObject(d) && !isFile(d) ? toJson(d) : d;
          }],
        headers: {
          common: {
            Accept: 'application/json, text/plain, */*',
            'X-Requested-With': 'XMLHttpRequest'
          },
          post: { 'Content-Type': 'application/json;charset=utf-8' },
          put: { 'Content-Type': 'application/json;charset=utf-8' }
        }
      }, providerResponseInterceptors = this.responseInterceptors = [];
    this.$get = [
      '$httpBackend',
      '$browser',
      '$cacheFactory',
      '$rootScope',
      '$q',
      '$injector',
      function ($httpBackend, $browser, $cacheFactory, $rootScope, $q, $injector) {
        function $http(config) {
          function transformResponse(response) {
            var resp = extend({}, response, { data: transformData(response.data, response.headers, respTransformFn) });
            return isSuccess(response.status) ? resp : $q.reject(resp);
          }
          config.method = uppercase(config.method);
          var reqData, defHeaderName, lowercaseDefHeaderName, headerName, promise, reqTransformFn = config.transformRequest || $config.transformRequest, respTransformFn = config.transformResponse || $config.transformResponse, reqHeaders = extend({}, config.headers), defHeaders = extend({ 'X-XSRF-TOKEN': $browser.cookies()['XSRF-TOKEN'] }, $config.headers.common, $config.headers[lowercase(config.method)]);
          defaultHeadersIteration:
            for (defHeaderName in defHeaders) {
              lowercaseDefHeaderName = lowercase(defHeaderName);
              for (headerName in config.headers)
                if (lowercase(headerName) === lowercaseDefHeaderName)
                  continue defaultHeadersIteration;
              reqHeaders[defHeaderName] = defHeaders[defHeaderName];
            }
          if (isUndefined(config.data))
            for (var header in reqHeaders)
              if ('content-type' === lowercase(header)) {
                delete reqHeaders[header];
                break;
              }
          return reqData = transformData(config.data, headersGetter(reqHeaders), reqTransformFn), promise = sendReq(config, reqData, reqHeaders), promise = promise.then(transformResponse, transformResponse), forEach(responseInterceptors, function (interceptor) {
            promise = interceptor(promise);
          }), promise.success = function (fn) {
            return promise.then(function (response) {
              fn(response.data, response.status, response.headers, config);
            }), promise;
          }, promise.error = function (fn) {
            return promise.then(null, function (response) {
              fn(response.data, response.status, response.headers, config);
            }), promise;
          }, promise;
        }
        function createShortMethods() {
          forEach(arguments, function (name) {
            $http[name] = function (url, config) {
              return $http(extend(config || {}, {
                method: name,
                url: url
              }));
            };
          });
        }
        function createShortMethodsWithData() {
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
          function done(status, response, headersString) {
            cache && (isSuccess(status) ? cache.put(url, [
              status,
              response,
              parseHeaders(headersString)
            ]) : cache.remove(url)), resolvePromise(response, status, headersString), $rootScope.$apply();
          }
          function resolvePromise(response, status, headers) {
            status = Math.max(status, 0), (isSuccess(status) ? deferred.resolve : deferred.reject)({
              data: response,
              status: status,
              headers: headersGetter(headers),
              config: config
            });
          }
          function removePendingReq() {
            var idx = indexOf($http.pendingRequests, config);
            -1 !== idx && $http.pendingRequests.splice(idx, 1);
          }
          var cache, cachedResp, deferred = $q.defer(), promise = deferred.promise, url = buildUrl(config.url, config.params);
          if ($http.pendingRequests.push(config), promise.then(removePendingReq, removePendingReq), config.cache && 'GET' == config.method && (cache = isObject(config.cache) ? config.cache : defaultCache), cache)
            if (cachedResp = cache.get(url)) {
              if (cachedResp.then)
                return cachedResp.then(removePendingReq, removePendingReq), cachedResp;
              isArray(cachedResp) ? resolvePromise(cachedResp[1], cachedResp[0], copy(cachedResp[2])) : resolvePromise(cachedResp, 200, {});
            } else
              cache.put(url, promise);
          return cachedResp || $httpBackend(config.method, url, reqData, done, reqHeaders, config.timeout, config.withCredentials), promise;
        }
        function buildUrl(url, params) {
          if (!params)
            return url;
          var parts = [];
          return forEachSorted(params, function (value, key) {
            null != value && value != undefined && (isObject(value) && (value = toJson(value)), parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(value)));
          }), url + (-1 == url.indexOf('?') ? '?' : '&') + parts.join('&');
        }
        var defaultCache = $cacheFactory('$http'), responseInterceptors = [];
        return forEach(providerResponseInterceptors, function (interceptor) {
          responseInterceptors.push(isString(interceptor) ? $injector.get(interceptor) : $injector.invoke(interceptor));
        }), $http.pendingRequests = [], createShortMethods('get', 'delete', 'head', 'jsonp'), createShortMethodsWithData('post', 'put'), $http.defaults = $config, $http;
      }
    ];
  }
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
    function jsonpReq(url, done) {
      var script = rawDocument.createElement('script'), doneWrapper = function () {
          rawDocument.body.removeChild(script), done && done();
        };
      script.type = 'text/javascript', script.src = url, msie ? script.onreadystatechange = function () {
        /loaded|complete/.test(script.readyState) && doneWrapper();
      } : script.onload = script.onerror = doneWrapper, rawDocument.body.appendChild(script);
    }
    return function (method, url, post, callback, headers, timeout, withCredentials) {
      function completeRequest(callback, status, response, headersString) {
        var protocol = (url.match(URL_MATCH) || [
            '',
            locationProtocol
          ])[1];
        status = 'file' == protocol ? response ? 200 : 404 : status, status = 1223 == status ? 204 : status, callback(status, response, headersString), $browser.$$completeOutstandingRequest(noop);
      }
      if ($browser.$$incOutstandingRequestCount(), url = url || $browser.url(), 'jsonp' == lowercase(method)) {
        var callbackId = '_' + (callbacks.counter++).toString(36);
        callbacks[callbackId] = function (data) {
          callbacks[callbackId].data = data;
        }, jsonpReq(url.replace('JSON_CALLBACK', 'angular.callbacks.' + callbackId), function () {
          callbacks[callbackId].data ? completeRequest(callback, 200, callbacks[callbackId].data) : completeRequest(callback, -2), delete callbacks[callbackId];
        });
      } else {
        var xhr = new XHR();
        xhr.open(method, url, !0), forEach(headers, function (value, key) {
          value && xhr.setRequestHeader(key, value);
        });
        var status;
        xhr.onreadystatechange = function () {
          if (4 == xhr.readyState) {
            var responseHeaders = xhr.getAllResponseHeaders(), simpleHeaders = [
                'Cache-Control',
                'Content-Language',
                'Content-Type',
                'Expires',
                'Last-Modified',
                'Pragma'
              ];
            responseHeaders || (responseHeaders = '', forEach(simpleHeaders, function (header) {
              var value = xhr.getResponseHeader(header);
              value && (responseHeaders += header + ': ' + value + '\n');
            })), completeRequest(callback, status || xhr.status, xhr.responseText, responseHeaders);
          }
        }, withCredentials && (xhr.withCredentials = !0), xhr.send(post || ''), timeout > 0 && $browserDefer(function () {
          status = -1, xhr.abort();
        }, timeout);
      }
    };
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
          'short': 'M/d/yy h:mm a',
          fullDate: 'EEEE, MMMM d, y',
          longDate: 'MMMM d, y',
          mediumDate: 'MMM d, y',
          shortDate: 'M/d/yy',
          mediumTime: 'h:mm:ss a',
          shortTime: 'h:mm a'
        },
        pluralCat: function (num) {
          return 1 === num ? 'one' : 'other';
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
        function timeout(fn, delay, invokeApply) {
          var timeoutId, deferred = $q.defer(), promise = deferred.promise, skipApply = isDefined(invokeApply) && !invokeApply;
          return timeoutId = $browser.defer(function () {
            try {
              deferred.resolve(fn());
            } catch (e) {
              deferred.reject(e), $exceptionHandler(e);
            } finally {
              delete deferreds[promise.$$timeoutId];
            }
            skipApply || $rootScope.$apply();
          }, delay), promise.$$timeoutId = timeoutId, deferreds[timeoutId] = deferred, promise;
        }
        var deferreds = {};
        return timeout.cancel = function (promise) {
          return promise && promise.$$timeoutId in deferreds ? (deferreds[promise.$$timeoutId].reject('canceled'), delete deferreds[promise.$$timeoutId], $browser.defer.cancel(promise.$$timeoutId)) : !1;
        }, timeout;
      }
    ];
  }
  function $FilterProvider($provide) {
    function register(name, factory) {
      return $provide.factory(name + suffix, factory);
    }
    var suffix = 'Filter';
    this.register = register, this.$get = [
      '$injector',
      function ($injector) {
        return function (name) {
          return $injector.get(name + suffix);
        };
      }
    ], register('currency', currencyFilter), register('date', dateFilter), register('filter', filterFilter), register('json', jsonFilter), register('limitTo', limitToFilter), register('lowercase', lowercaseFilter), register('number', numberFilter), register('orderBy', orderByFilter), register('uppercase', uppercaseFilter);
  }
  function filterFilter() {
    return function (array, expression) {
      if (!isArray(array))
        return array;
      var predicates = [];
      predicates.check = function (value) {
        for (var j = 0; j < predicates.length; j++)
          if (!predicates[j](value))
            return !1;
        return !0;
      };
      var search = function (obj, text) {
        if ('!' === text.charAt(0))
          return !search(obj, text.substr(1));
        switch (typeof obj) {
        case 'boolean':
        case 'number':
        case 'string':
          return ('' + obj).toLowerCase().indexOf(text) > -1;
        case 'object':
          for (var objKey in obj)
            if ('$' !== objKey.charAt(0) && search(obj[objKey], text))
              return !0;
          return !1;
        case 'array':
          for (var i = 0; i < obj.length; i++)
            if (search(obj[i], text))
              return !0;
          return !1;
        default:
          return !1;
        }
      };
      switch (typeof expression) {
      case 'boolean':
      case 'number':
      case 'string':
        expression = { $: expression };
      case 'object':
        for (var key in expression)
          '$' == key ? !function () {
            var text = ('' + expression[key]).toLowerCase();
            text && predicates.push(function (value) {
              return search(value, text);
            });
          }() : !function () {
            var path = key, text = ('' + expression[key]).toLowerCase();
            text && predicates.push(function (value) {
              return search(getter(value, path), text);
            });
          }();
        break;
      case 'function':
        predicates.push(expression);
        break;
      default:
        return array;
      }
      for (var filtered = [], j = 0; j < array.length; j++) {
        var value = array[j];
        predicates.check(value) && filtered.push(value);
      }
      return filtered;
    };
  }
  function currencyFilter($locale) {
    var formats = $locale.NUMBER_FORMATS;
    return function (amount, currencySymbol) {
      return isUndefined(currencySymbol) && (currencySymbol = formats.CURRENCY_SYM), formatNumber(amount, formats.PATTERNS[1], formats.GROUP_SEP, formats.DECIMAL_SEP, 2).replace(/\u00A4/g, currencySymbol);
    };
  }
  function numberFilter($locale) {
    var formats = $locale.NUMBER_FORMATS;
    return function (number, fractionSize) {
      return formatNumber(number, formats.PATTERNS[0], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize);
    };
  }
  function formatNumber(number, pattern, groupSep, decimalSep, fractionSize) {
    if (isNaN(number) || !isFinite(number))
      return '';
    var isNegative = 0 > number;
    number = Math.abs(number);
    var numStr = number + '', formatedText = '', parts = [], hasExponent = !1;
    if (-1 !== numStr.indexOf('e')) {
      var match = numStr.match(/([\d\.]+)e(-?)(\d+)/);
      match && '-' == match[2] && match[3] > fractionSize + 1 ? numStr = '0' : (formatedText = numStr, hasExponent = !0);
    }
    if (hasExponent)
      fractionSize > 0 && number > -1 && 1 > number && (formatedText = number.toFixed(fractionSize));
    else {
      var fractionLen = (numStr.split(DECIMAL_SEP)[1] || '').length;
      isUndefined(fractionSize) && (fractionSize = Math.min(Math.max(pattern.minFrac, fractionLen), pattern.maxFrac));
      var pow = Math.pow(10, fractionSize);
      number = Math.round(number * pow) / pow;
      var fraction = ('' + number).split(DECIMAL_SEP), whole = fraction[0];
      fraction = fraction[1] || '';
      var pos = 0, lgroup = pattern.lgSize, group = pattern.gSize;
      if (whole.length >= lgroup + group) {
        pos = whole.length - lgroup;
        for (var i = 0; pos > i; i++)
          (pos - i) % group === 0 && 0 !== i && (formatedText += groupSep), formatedText += whole.charAt(i);
      }
      for (i = pos; i < whole.length; i++)
        (whole.length - i) % lgroup === 0 && 0 !== i && (formatedText += groupSep), formatedText += whole.charAt(i);
      for (; fraction.length < fractionSize;)
        fraction += '0';
      fractionSize && '0' !== fractionSize && (formatedText += decimalSep + fraction.substr(0, fractionSize));
    }
    return parts.push(isNegative ? pattern.negPre : pattern.posPre), parts.push(formatedText), parts.push(isNegative ? pattern.negSuf : pattern.posSuf), parts.join('');
  }
  function padNumber(num, digits, trim) {
    var neg = '';
    for (0 > num && (neg = '-', num = -num), num = '' + num; num.length < digits;)
      num = '0' + num;
    return trim && (num = num.substr(num.length - digits)), neg + num;
  }
  function dateGetter(name, size, offset, trim) {
    return offset = offset || 0, function (date) {
      var value = date['get' + name]();
      return (offset > 0 || value > -offset) && (value += offset), 0 === value && -12 == offset && (value = 12), padNumber(value, size, trim);
    };
  }
  function dateStrGetter(name, shortForm) {
    return function (date, formats) {
      var value = date['get' + name](), get = uppercase(shortForm ? 'SHORT' + name : name);
      return formats[get][value];
    };
  }
  function timeZoneGetter(date) {
    var zone = -1 * date.getTimezoneOffset(), paddedZone = zone >= 0 ? '+' : '';
    return paddedZone += padNumber(Math[zone > 0 ? 'floor' : 'ceil'](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2);
  }
  function ampmGetter(date, formats) {
    return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1];
  }
  function dateFilter($locale) {
    function jsonStringToDate(string) {
      var match;
      if (match = string.match(R_ISO8601_STR)) {
        var date = new Date(0), tzHour = 0, tzMin = 0;
        return match[9] && (tzHour = int(match[9] + match[10]), tzMin = int(match[9] + match[11])), date.setUTCFullYear(int(match[1]), int(match[2]) - 1, int(match[3])), date.setUTCHours(int(match[4] || 0) - tzHour, int(match[5] || 0) - tzMin, int(match[6] || 0), int(match[7] || 0)), date;
      }
      return string;
    }
    var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
    return function (date, format) {
      var fn, match, text = '', parts = [];
      if (format = format || 'mediumDate', format = $locale.DATETIME_FORMATS[format] || format, isString(date) && (date = NUMBER_STRING.test(date) ? int(date) : jsonStringToDate(date)), isNumber(date) && (date = new Date(date)), !isDate(date))
        return date;
      for (; format;)
        match = DATE_FORMATS_SPLIT.exec(format), match ? (parts = concat(parts, match, 1), format = parts.pop()) : (parts.push(format), format = null);
      return forEach(parts, function (value) {
        fn = DATE_FORMATS[value], text += fn ? fn(date, $locale.DATETIME_FORMATS) : value.replace(/(^'|'$)/g, '').replace(/''/g, '\'');
      }), text;
    };
  }
  function jsonFilter() {
    return function (object) {
      return toJson(object, !0);
    };
  }
  function limitToFilter() {
    return function (array, limit) {
      if (!(array instanceof Array))
        return array;
      limit = int(limit);
      var i, n, out = [];
      if (!(array && array instanceof Array))
        return out;
      for (limit > array.length ? limit = array.length : limit < -array.length && (limit = -array.length), limit > 0 ? (i = 0, n = limit) : (i = array.length + limit, n = array.length); n > i; i++)
        out.push(array[i]);
      return out;
    };
  }
  function orderByFilter($parse) {
    return function (array, sortPredicate, reverseOrder) {
      function comparator(o1, o2) {
        for (var i = 0; i < sortPredicate.length; i++) {
          var comp = sortPredicate[i](o1, o2);
          if (0 !== comp)
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
        var t1 = typeof v1, t2 = typeof v2;
        return t1 == t2 ? ('string' == t1 && (v1 = v1.toLowerCase(), v2 = v2.toLowerCase()), v1 === v2 ? 0 : v2 > v1 ? -1 : 1) : t2 > t1 ? -1 : 1;
      }
      if (!isArray(array))
        return array;
      if (!sortPredicate)
        return array;
      sortPredicate = isArray(sortPredicate) ? sortPredicate : [sortPredicate], sortPredicate = map(sortPredicate, function (predicate) {
        var descending = !1, get = predicate || identity;
        return isString(predicate) && (('+' == predicate.charAt(0) || '-' == predicate.charAt(0)) && (descending = '-' == predicate.charAt(0), predicate = predicate.substring(1)), get = $parse(predicate)), reverseComparator(function (a, b) {
          return compare(get(a), get(b));
        }, descending);
      });
      for (var arrayCopy = [], i = 0; i < array.length; i++)
        arrayCopy.push(array[i]);
      return arrayCopy.sort(reverseComparator(comparator, reverseOrder));
    };
  }
  function ngDirective(directive) {
    return isFunction(directive) && (directive = { link: directive }), directive.restrict = directive.restrict || 'AC', valueFn(directive);
  }
  function FormController(element, attrs) {
    function toggleValidCss(isValid, validationErrorKey) {
      validationErrorKey = validationErrorKey ? '-' + snake_case(validationErrorKey, '-') : '', element.removeClass((isValid ? INVALID_CLASS : VALID_CLASS) + validationErrorKey).addClass((isValid ? VALID_CLASS : INVALID_CLASS) + validationErrorKey);
    }
    var form = this, parentForm = element.parent().controller('form') || nullFormCtrl, invalidCount = 0, errors = form.$error = {};
    form.$name = attrs.name || attrs.ngForm, form.$dirty = !1, form.$pristine = !0, form.$valid = !0, form.$invalid = !1, parentForm.$addControl(form), element.addClass(PRISTINE_CLASS), toggleValidCss(!0), form.$addControl = function (control) {
      control.$name && !form.hasOwnProperty(control.$name) && (form[control.$name] = control);
    }, form.$removeControl = function (control) {
      control.$name && form[control.$name] === control && delete form[control.$name], forEach(errors, function (queue, validationToken) {
        form.$setValidity(validationToken, !0, control);
      });
    }, form.$setValidity = function (validationToken, isValid, control) {
      var queue = errors[validationToken];
      if (isValid)
        queue && (arrayRemove(queue, control), queue.length || (invalidCount--, invalidCount || (toggleValidCss(isValid), form.$valid = !0, form.$invalid = !1), errors[validationToken] = !1, toggleValidCss(!0, validationToken), parentForm.$setValidity(validationToken, !0, form)));
      else {
        if (invalidCount || toggleValidCss(isValid), queue) {
          if (includes(queue, control))
            return;
        } else
          errors[validationToken] = queue = [], invalidCount++, toggleValidCss(!1, validationToken), parentForm.$setValidity(validationToken, !1, form);
        queue.push(control), form.$valid = !1, form.$invalid = !0;
      }
    }, form.$setDirty = function () {
      element.removeClass(PRISTINE_CLASS).addClass(DIRTY_CLASS), form.$dirty = !0, form.$pristine = !1, parentForm.$setDirty();
    };
  }
  function isEmpty(value) {
    return isUndefined(value) || '' === value || null === value || value !== value;
  }
  function textInputType(scope, element, attr, ctrl, $sniffer, $browser) {
    var listener = function () {
      var value = trim(element.val());
      ctrl.$viewValue !== value && scope.$apply(function () {
        ctrl.$setViewValue(value);
      });
    };
    if ($sniffer.hasEvent('input'))
      element.bind('input', listener);
    else {
      var timeout, deferListener = function () {
          timeout || (timeout = $browser.defer(function () {
            listener(), timeout = null;
          }));
        };
      element.bind('keydown', function (event) {
        var key = event.keyCode;
        91 === key || key > 15 && 19 > key || key >= 37 && 40 >= key || deferListener();
      }), element.bind('change', listener), $sniffer.hasEvent('paste') && element.bind('paste cut', deferListener);
    }
    ctrl.$render = function () {
      element.val(isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue);
    };
    var patternValidator, pattern = attr.ngPattern, validate = function (regexp, value) {
        return isEmpty(value) || regexp.test(value) ? (ctrl.$setValidity('pattern', !0), value) : (ctrl.$setValidity('pattern', !1), undefined);
      };
    if (pattern && (pattern.match(/^\/(.*)\/$/) ? (pattern = new RegExp(pattern.substr(1, pattern.length - 2)), patternValidator = function (value) {
        return validate(pattern, value);
      }) : patternValidator = function (value) {
        var patternObj = scope.$eval(pattern);
        if (!patternObj || !patternObj.test)
          throw new Error('Expected ' + pattern + ' to be a RegExp but was ' + patternObj);
        return validate(patternObj, value);
      }, ctrl.$formatters.push(patternValidator), ctrl.$parsers.push(patternValidator)), attr.ngMinlength) {
      var minlength = int(attr.ngMinlength), minLengthValidator = function (value) {
          return !isEmpty(value) && value.length < minlength ? (ctrl.$setValidity('minlength', !1), undefined) : (ctrl.$setValidity('minlength', !0), value);
        };
      ctrl.$parsers.push(minLengthValidator), ctrl.$formatters.push(minLengthValidator);
    }
    if (attr.ngMaxlength) {
      var maxlength = int(attr.ngMaxlength), maxLengthValidator = function (value) {
          return !isEmpty(value) && value.length > maxlength ? (ctrl.$setValidity('maxlength', !1), undefined) : (ctrl.$setValidity('maxlength', !0), value);
        };
      ctrl.$parsers.push(maxLengthValidator), ctrl.$formatters.push(maxLengthValidator);
    }
  }
  function numberInputType(scope, element, attr, ctrl, $sniffer, $browser) {
    if (textInputType(scope, element, attr, ctrl, $sniffer, $browser), ctrl.$parsers.push(function (value) {
        var empty = isEmpty(value);
        return empty || NUMBER_REGEXP.test(value) ? (ctrl.$setValidity('number', !0), '' === value ? null : empty ? value : parseFloat(value)) : (ctrl.$setValidity('number', !1), undefined);
      }), ctrl.$formatters.push(function (value) {
        return isEmpty(value) ? '' : '' + value;
      }), attr.min) {
      var min = parseFloat(attr.min), minValidator = function (value) {
          return !isEmpty(value) && min > value ? (ctrl.$setValidity('min', !1), undefined) : (ctrl.$setValidity('min', !0), value);
        };
      ctrl.$parsers.push(minValidator), ctrl.$formatters.push(minValidator);
    }
    if (attr.max) {
      var max = parseFloat(attr.max), maxValidator = function (value) {
          return !isEmpty(value) && value > max ? (ctrl.$setValidity('max', !1), undefined) : (ctrl.$setValidity('max', !0), value);
        };
      ctrl.$parsers.push(maxValidator), ctrl.$formatters.push(maxValidator);
    }
    ctrl.$formatters.push(function (value) {
      return isEmpty(value) || isNumber(value) ? (ctrl.$setValidity('number', !0), value) : (ctrl.$setValidity('number', !1), undefined);
    });
  }
  function urlInputType(scope, element, attr, ctrl, $sniffer, $browser) {
    textInputType(scope, element, attr, ctrl, $sniffer, $browser);
    var urlValidator = function (value) {
      return isEmpty(value) || URL_REGEXP.test(value) ? (ctrl.$setValidity('url', !0), value) : (ctrl.$setValidity('url', !1), undefined);
    };
    ctrl.$formatters.push(urlValidator), ctrl.$parsers.push(urlValidator);
  }
  function emailInputType(scope, element, attr, ctrl, $sniffer, $browser) {
    textInputType(scope, element, attr, ctrl, $sniffer, $browser);
    var emailValidator = function (value) {
      return isEmpty(value) || EMAIL_REGEXP.test(value) ? (ctrl.$setValidity('email', !0), value) : (ctrl.$setValidity('email', !1), undefined);
    };
    ctrl.$formatters.push(emailValidator), ctrl.$parsers.push(emailValidator);
  }
  function radioInputType(scope, element, attr, ctrl) {
    isUndefined(attr.name) && element.attr('name', nextUid()), element.bind('click', function () {
      element[0].checked && scope.$apply(function () {
        ctrl.$setViewValue(attr.value);
      });
    }), ctrl.$render = function () {
      var value = attr.value;
      element[0].checked = value == ctrl.$viewValue;
    }, attr.$observe('value', ctrl.$render);
  }
  function checkboxInputType(scope, element, attr, ctrl) {
    var trueValue = attr.ngTrueValue, falseValue = attr.ngFalseValue;
    isString(trueValue) || (trueValue = !0), isString(falseValue) || (falseValue = !1), element.bind('click', function () {
      scope.$apply(function () {
        ctrl.$setViewValue(element[0].checked);
      });
    }), ctrl.$render = function () {
      element[0].checked = ctrl.$viewValue;
    }, ctrl.$formatters.push(function (value) {
      return value === trueValue;
    }), ctrl.$parsers.push(function (value) {
      return value ? trueValue : falseValue;
    });
  }
  function classDirective(name, selector) {
    return name = 'ngClass' + name, ngDirective(function (scope, element, attr) {
      function ngClassWatchAction(newVal) {
        (selector === !0 || scope.$index % 2 === selector) && (oldVal && !equals(newVal, oldVal) && removeClass(oldVal), addClass(newVal)), oldVal = copy(newVal);
      }
      function removeClass(classVal) {
        isObject(classVal) && !isArray(classVal) && (classVal = map(classVal, function (v, k) {
          return v ? k : void 0;
        })), element.removeClass(isArray(classVal) ? classVal.join(' ') : classVal);
      }
      function addClass(classVal) {
        isObject(classVal) && !isArray(classVal) && (classVal = map(classVal, function (v, k) {
          return v ? k : void 0;
        })), classVal && element.addClass(isArray(classVal) ? classVal.join(' ') : classVal);
      }
      var oldVal = undefined;
      scope.$watch(attr[name], ngClassWatchAction, !0), attr.$observe('class', function () {
        var ngClass = scope.$eval(attr[name]);
        ngClassWatchAction(ngClass, ngClass);
      }), 'ngClass' !== name && scope.$watch('$index', function ($index, old$index) {
        var mod = 1 & $index;
        mod !== old$index & 1 && (mod === selector ? addClass(scope.$eval(attr[name])) : removeClass(scope.$eval(attr[name])));
      });
    });
  }
  var lowercase = function (string) {
      return isString(string) ? string.toLowerCase() : string;
    }, uppercase = function (string) {
      return isString(string) ? string.toUpperCase() : string;
    }, manualLowercase = function (s) {
      return isString(s) ? s.replace(/[A-Z]/g, function (ch) {
        return String.fromCharCode(32 | ch.charCodeAt(0));
      }) : s;
    }, manualUppercase = function (s) {
      return isString(s) ? s.replace(/[a-z]/g, function (ch) {
        return String.fromCharCode(-33 & ch.charCodeAt(0));
      }) : s;
    };
  'i' !== 'I'.toLowerCase() && (lowercase = manualLowercase, uppercase = manualUppercase);
  var jqLite, jQuery, angularModule, nodeName_, msie = int((/msie (\d+)/.exec(lowercase(navigator.userAgent)) || [])[1]), slice = [].slice, push = [].push, toString = Object.prototype.toString, angular = window.angular || (window.angular = {}), uid = [
      '0',
      '0',
      '0'
    ];
  noop.$inject = [], identity.$inject = [];
  var trim = function () {
      return String.prototype.trim ? function (value) {
        return isString(value) ? value.trim() : value;
      } : function (value) {
        return isString(value) ? value.replace(/^\s*/, '').replace(/\s*$/, '') : value;
      };
    }();
  nodeName_ = 9 > msie ? function (element) {
    return element = element.nodeName ? element : element[0], element.scopeName && 'HTML' != element.scopeName ? uppercase(element.scopeName + ':' + element.nodeName) : element.nodeName;
  } : function (element) {
    return element.nodeName ? element.nodeName : element[0].nodeName;
  };
  var SNAKE_CASE_REGEXP = /[A-Z]/g, version = {
      full: '1.0.8',
      major: 1,
      minor: 0,
      dot: 8,
      codeName: 'bubble-burst'
    }, jqCache = JQLite.cache = {}, jqName = JQLite.expando = 'ng-' + new Date().getTime(), jqId = 1, addEventListenerFn = window.document.addEventListener ? function (element, type, fn) {
      element.addEventListener(type, fn, !1);
    } : function (element, type, fn) {
      element.attachEvent('on' + type, fn);
    }, removeEventListenerFn = window.document.removeEventListener ? function (element, type, fn) {
      element.removeEventListener(type, fn, !1);
    } : function (element, type, fn) {
      element.detachEvent('on' + type, fn);
    }, SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g, MOZ_HACK_REGEXP = /^moz([A-Z])/, JQLitePrototype = JQLite.prototype = {
      ready: function (fn) {
        function trigger() {
          fired || (fired = !0, fn());
        }
        var fired = !1;
        this.bind('DOMContentLoaded', trigger), JQLite(window).bind('load', trigger);
      },
      toString: function () {
        var value = [];
        return forEach(this, function (e) {
          value.push('' + e);
        }), '[' + value.join(', ') + ']';
      },
      eq: function (index) {
        return jqLite(index >= 0 ? this[index] : this[this.length + index]);
      },
      length: 0,
      push: push,
      sort: [].sort,
      splice: [].splice
    }, BOOLEAN_ATTR = {};
  forEach('multiple,selected,checked,disabled,readOnly,required'.split(','), function (value) {
    BOOLEAN_ATTR[lowercase(value)] = value;
  });
  var BOOLEAN_ELEMENTS = {};
  forEach('input,select,option,textarea,button,form'.split(','), function (value) {
    BOOLEAN_ELEMENTS[uppercase(value)] = !0;
  }), forEach({
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
      if (name = camelCase(name), !isDefined(value)) {
        var val;
        return 8 >= msie && (val = element.currentStyle && element.currentStyle[name], '' === val && (val = 'auto')), val = val || element.style[name], 8 >= msie && (val = '' === val ? undefined : val), val;
      }
      element.style[name] = value;
    },
    attr: function (element, name, value) {
      var lowercasedName = lowercase(name);
      if (BOOLEAN_ATTR[lowercasedName]) {
        if (!isDefined(value))
          return element[name] || (element.attributes.getNamedItem(name) || noop).specified ? lowercasedName : undefined;
        value ? (element[name] = !0, element.setAttribute(name, lowercasedName)) : (element[name] = !1, element.removeAttribute(lowercasedName));
      } else if (isDefined(value))
        element.setAttribute(name, value);
      else if (element.getAttribute) {
        var ret = element.getAttribute(name, 2);
        return null === ret ? undefined : ret;
      }
    },
    prop: function (element, name, value) {
      return isDefined(value) ? void (element[name] = value) : element[name];
    },
    text: extend(9 > msie ? function (element, value) {
      if (1 == element.nodeType) {
        if (isUndefined(value))
          return element.innerText;
        element.innerText = value;
      } else {
        if (isUndefined(value))
          return element.nodeValue;
        element.nodeValue = value;
      }
    } : function (element, value) {
      return isUndefined(value) ? element.textContent : void (element.textContent = value);
    }, { $dv: '' }),
    val: function (element, value) {
      if (isUndefined(value)) {
        if ('SELECT' === nodeName_(element) && element.multiple) {
          var result = [];
          return forEach(element.options, function (option) {
            option.selected && result.push(option.value || option.text);
          }), 0 === result.length ? null : result;
        }
        return element.value;
      }
      element.value = value;
    },
    html: function (element, value) {
      if (isUndefined(value))
        return element.innerHTML;
      for (var i = 0, childNodes = element.childNodes; i < childNodes.length; i++)
        JQLiteDealoc(childNodes[i]);
      element.innerHTML = value;
    }
  }, function (fn, name) {
    JQLite.prototype[name] = function (arg1, arg2) {
      var i, key;
      if ((2 == fn.length && fn !== JQLiteHasClass && fn !== JQLiteController ? arg1 : arg2) !== undefined) {
        for (i = 0; i < this.length; i++)
          fn(this[i], arg1, arg2);
        return this;
      }
      if (isObject(arg1)) {
        for (i = 0; i < this.length; i++)
          if (fn === JQLiteData)
            fn(this[i], arg1);
          else
            for (key in arg1)
              fn(this[i], key, arg1[key]);
        return this;
      }
      return this.length ? fn(this[0], arg1, arg2) : fn.$dv;
    };
  }), forEach({
    removeData: JQLiteRemoveData,
    dealoc: JQLiteDealoc,
    bind: function bindFn(element, type, fn) {
      var events = JQLiteExpandoStore(element, 'events'), handle = JQLiteExpandoStore(element, 'handle');
      events || JQLiteExpandoStore(element, 'events', events = {}), handle || JQLiteExpandoStore(element, 'handle', handle = createEventHandler(element, events)), forEach(type.split(' '), function (type) {
        var eventFns = events[type];
        if (!eventFns) {
          if ('mouseenter' == type || 'mouseleave' == type) {
            var contains = document.body.contains || document.body.compareDocumentPosition ? function (a, b) {
                var adown = 9 === a.nodeType ? a.documentElement : a, bup = b && b.parentNode;
                return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)));
              } : function (a, b) {
                if (b)
                  for (; b = b.parentNode;)
                    if (b === a)
                      return !0;
                return !1;
              };
            events[type] = [];
            var eventmap = {
                mouseleave: 'mouseout',
                mouseenter: 'mouseover'
              };
            bindFn(element, eventmap[type], function (event) {
              var target = this, related = event.relatedTarget;
              (!related || related !== target && !contains(target, related)) && handle(event, type);
            });
          } else
            addEventListenerFn(element, type, handle), events[type] = [];
          eventFns = events[type];
        }
        eventFns.push(fn);
      });
    },
    unbind: JQLiteUnbind,
    replaceWith: function (element, replaceNode) {
      var index, parent = element.parentNode;
      JQLiteDealoc(element), forEach(new JQLite(replaceNode), function (node) {
        index ? parent.insertBefore(node, index.nextSibling) : parent.replaceChild(node, element), index = node;
      });
    },
    children: function (element) {
      var children = [];
      return forEach(element.childNodes, function (element) {
        1 === element.nodeType && children.push(element);
      }), children;
    },
    contents: function (element) {
      return element.childNodes || [];
    },
    append: function (element, node) {
      forEach(new JQLite(node), function (child) {
        1 === element.nodeType && element.appendChild(child);
      });
    },
    prepend: function (element, node) {
      if (1 === element.nodeType) {
        var index = element.firstChild;
        forEach(new JQLite(node), function (child) {
          element.insertBefore(child, index);
        });
      }
    },
    wrap: function (element, wrapNode) {
      wrapNode = jqLite(wrapNode)[0];
      var parent = element.parentNode;
      parent && parent.replaceChild(wrapNode, element), wrapNode.appendChild(element);
    },
    remove: function (element) {
      JQLiteDealoc(element);
      var parent = element.parentNode;
      parent && parent.removeChild(element);
    },
    after: function (element, newElement) {
      var index = element, parent = element.parentNode;
      forEach(new JQLite(newElement), function (node) {
        parent.insertBefore(node, index.nextSibling), index = node;
      });
    },
    addClass: JQLiteAddClass,
    removeClass: JQLiteRemoveClass,
    toggleClass: function (element, selector, condition) {
      isUndefined(condition) && (condition = !JQLiteHasClass(element, selector)), (condition ? JQLiteAddClass : JQLiteRemoveClass)(element, selector);
    },
    parent: function (element) {
      var parent = element.parentNode;
      return parent && 11 !== parent.nodeType ? parent : null;
    },
    next: function (element) {
      if (element.nextElementSibling)
        return element.nextElementSibling;
      for (var elm = element.nextSibling; null != elm && 1 !== elm.nodeType;)
        elm = elm.nextSibling;
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
      for (var value, i = 0; i < this.length; i++)
        value == undefined ? (value = fn(this[i], arg1, arg2), value !== undefined && (value = jqLite(value))) : JQLiteAddNodes(value, fn(this[i], arg1, arg2));
      return value == undefined ? this : value;
    };
  }), HashMap.prototype = {
    put: function (key, value) {
      this[hashKey(key)] = value;
    },
    get: function (key) {
      return this[hashKey(key)];
    },
    remove: function (key) {
      var value = this[key = hashKey(key)];
      return delete this[key], value;
    }
  }, HashQueueMap.prototype = {
    push: function (key, value) {
      var array = this[key = hashKey(key)];
      array ? array.push(value) : this[key] = [value];
    },
    shift: function (key) {
      var array = this[key = hashKey(key)];
      return array ? 1 == array.length ? (delete this[key], array[0]) : array.shift() : void 0;
    },
    peek: function (key) {
      var array = this[hashKey(key)];
      return array ? array[0] : void 0;
    }
  };
  var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m, FN_ARG_SPLIT = /,/, FN_ARG = /^\s*(_?)(\S+?)\1\s*$/, STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, NON_ASSIGNABLE_MODEL_EXPRESSION = 'Non-assignable model expression: ';
  $CompileProvider.$inject = ['$provide'];
  var PREFIX_REGEXP = /^(x[\:\-_]|data[\:\-_])/i, URL_MATCH = /^([^:]+):\/\/(\w+:{0,1}\w*@)?(\{?[\w\.-]*\}?)(:([0-9]+))?(\/[^\?#]*)?(\?([^#]*))?(#(.*))?$/, PATH_MATCH = /^([^\?#]*)?(\?([^#]*))?(#(.*))?$/, HASH_MATCH = PATH_MATCH, DEFAULT_PORTS = {
      http: 80,
      https: 443,
      ftp: 21
    };
  LocationUrl.prototype = {
    $$replace: !1,
    absUrl: locationGetter('$$absUrl'),
    url: function (url, replace) {
      if (isUndefined(url))
        return this.$$url;
      var match = PATH_MATCH.exec(url);
      return match[1] && this.path(decodeURIComponent(match[1])), (match[2] || match[1]) && this.search(match[3] || ''), this.hash(match[5] || '', replace), this;
    },
    protocol: locationGetter('$$protocol'),
    host: locationGetter('$$host'),
    port: locationGetter('$$port'),
    path: locationGetterSetter('$$path', function (path) {
      return '/' == path.charAt(0) ? path : '/' + path;
    }),
    search: function (search, paramValue) {
      return isUndefined(search) ? this.$$search : (isDefined(paramValue) ? null === paramValue ? delete this.$$search[search] : this.$$search[search] = paramValue : this.$$search = isString(search) ? parseKeyValue(search) : search, this.$$compose(), this);
    },
    hash: locationGetterSetter('$$hash', identity),
    replace: function () {
      return this.$$replace = !0, this;
    }
  }, LocationHashbangUrl.prototype = inherit(LocationUrl.prototype), LocationHashbangInHtml5Url.prototype = inherit(LocationHashbangUrl.prototype);
  var OPERATORS = {
      'null': function () {
        return null;
      },
      'true': function () {
        return !0;
      },
      'false': function () {
        return !1;
      },
      undefined: noop,
      '+': function (self, locals, a, b) {
        return a = a(self, locals), b = b(self, locals), isDefined(a) ? isDefined(b) ? a + b : a : isDefined(b) ? b : undefined;
      },
      '-': function (self, locals, a, b) {
        return a = a(self, locals), b = b(self, locals), (isDefined(a) ? a : 0) - (isDefined(b) ? b : 0);
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
    }, ESCAPE = {
      n: '\n',
      f: '\f',
      r: '\r',
      t: '\t',
      v: '\x0B',
      '\'': '\'',
      '"': '"'
    }, getterFnCache = {}, XHR = window.XMLHttpRequest || function () {
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
  $FilterProvider.$inject = ['$provide'], currencyFilter.$inject = ['$locale'], numberFilter.$inject = ['$locale'];
  var DECIMAL_SEP = '.', DATE_FORMATS = {
      yyyy: dateGetter('FullYear', 4),
      yy: dateGetter('FullYear', 2, 0, !0),
      y: dateGetter('FullYear', 1),
      MMMM: dateStrGetter('Month'),
      MMM: dateStrGetter('Month', !0),
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
      EEE: dateStrGetter('Day', !0),
      a: ampmGetter,
      Z: timeZoneGetter
    }, DATE_FORMATS_SPLIT = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/, NUMBER_STRING = /^\d+$/;
  dateFilter.$inject = ['$locale'];
  var lowercaseFilter = valueFn(lowercase), uppercaseFilter = valueFn(uppercase);
  orderByFilter.$inject = ['$parse'];
  var htmlAnchorDirective = valueFn({
      restrict: 'E',
      compile: function (element, attr) {
        return 8 >= msie && (attr.href || attr.name || attr.$set('href', ''), element.append(document.createComment('IE fix'))), function (scope, element) {
          element.bind('click', function (event) {
            element.attr('href') || event.preventDefault();
          });
        };
      }
    }), ngAttributeAliasDirectives = {};
  forEach(BOOLEAN_ATTR, function (propName, attrName) {
    var normalized = directiveNormalize('ng-' + attrName);
    ngAttributeAliasDirectives[normalized] = function () {
      return {
        priority: 100,
        compile: function () {
          return function (scope, element, attr) {
            scope.$watch(attr[normalized], function (value) {
              attr.$set(attrName, !!value);
            });
          };
        }
      };
    };
  }), forEach([
    'src',
    'href'
  ], function (attrName) {
    var normalized = directiveNormalize('ng-' + attrName);
    ngAttributeAliasDirectives[normalized] = function () {
      return {
        priority: 99,
        link: function (scope, element, attr) {
          attr.$observe(normalized, function (value) {
            value && (attr.$set(attrName, value), msie && element.prop(attrName, attr[attrName]));
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
                        event.preventDefault ? event.preventDefault() : event.returnValue = !1;
                      };
                      addEventListenerFn(formElement[0], 'submit', preventDefaultListener), formElement.bind('$destroy', function () {
                        $timeout(function () {
                          removeEventListenerFn(formElement[0], 'submit', preventDefaultListener);
                        }, 0, !1);
                      });
                    }
                    var parentFormCtrl = formElement.parent().controller('form'), alias = attr.name || attr.ngForm;
                    alias && (scope[alias] = controller), parentFormCtrl && formElement.bind('$destroy', function () {
                      parentFormCtrl.$removeControl(controller), alias && (scope[alias] = undefined), extend(controller, nullFormCtrl);
                    });
                  }
                };
              }
            };
          return isNgForm ? extend(copy(formDirective), { restrict: 'EAC' }) : formDirective;
        }
      ];
    }, formDirective = formDirectiveFactory(), ngFormDirective = formDirectiveFactory(!0), URL_REGEXP = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/, NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/, inputType = {
      text: textInputType,
      number: numberInputType,
      url: urlInputType,
      email: emailInputType,
      radio: radioInputType,
      checkbox: checkboxInputType,
      hidden: noop,
      button: noop,
      submit: noop,
      reset: noop
    }, inputDirective = [
      '$browser',
      '$sniffer',
      function ($browser, $sniffer) {
        return {
          restrict: 'E',
          require: '?ngModel',
          link: function (scope, element, attr, ctrl) {
            ctrl && (inputType[lowercase(attr.type)] || inputType.text)(scope, element, attr, ctrl, $sniffer, $browser);
          }
        };
      }
    ], VALID_CLASS = 'ng-valid', INVALID_CLASS = 'ng-invalid', PRISTINE_CLASS = 'ng-pristine', DIRTY_CLASS = 'ng-dirty', NgModelController = [
      '$scope',
      '$exceptionHandler',
      '$attrs',
      '$element',
      '$parse',
      function ($scope, $exceptionHandler, $attr, $element, $parse) {
        function toggleValidCss(isValid, validationErrorKey) {
          validationErrorKey = validationErrorKey ? '-' + snake_case(validationErrorKey, '-') : '', $element.removeClass((isValid ? INVALID_CLASS : VALID_CLASS) + validationErrorKey).addClass((isValid ? VALID_CLASS : INVALID_CLASS) + validationErrorKey);
        }
        this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$name = $attr.name;
        var ngModelGet = $parse($attr.ngModel), ngModelSet = ngModelGet.assign;
        if (!ngModelSet)
          throw Error(NON_ASSIGNABLE_MODEL_EXPRESSION + $attr.ngModel + ' (' + startingTag($element) + ')');
        this.$render = noop;
        var parentForm = $element.inheritedData('$formController') || nullFormCtrl, invalidCount = 0, $error = this.$error = {};
        $element.addClass(PRISTINE_CLASS), toggleValidCss(!0), this.$setValidity = function (validationErrorKey, isValid) {
          $error[validationErrorKey] !== !isValid && (isValid ? ($error[validationErrorKey] && invalidCount--, invalidCount || (toggleValidCss(!0), this.$valid = !0, this.$invalid = !1)) : (toggleValidCss(!1), this.$invalid = !0, this.$valid = !1, invalidCount++), $error[validationErrorKey] = !isValid, toggleValidCss(isValid, validationErrorKey), parentForm.$setValidity(validationErrorKey, isValid, this));
        }, this.$setViewValue = function (value) {
          this.$viewValue = value, this.$pristine && (this.$dirty = !0, this.$pristine = !1, $element.removeClass(PRISTINE_CLASS).addClass(DIRTY_CLASS), parentForm.$setDirty()), forEach(this.$parsers, function (fn) {
            value = fn(value);
          }), this.$modelValue !== value && (this.$modelValue = value, ngModelSet($scope, value), forEach(this.$viewChangeListeners, function (listener) {
            try {
              listener();
            } catch (e) {
              $exceptionHandler(e);
            }
          }));
        };
        var ctrl = this;
        $scope.$watch(function () {
          var value = ngModelGet($scope);
          if (ctrl.$modelValue !== value) {
            var formatters = ctrl.$formatters, idx = formatters.length;
            for (ctrl.$modelValue = value; idx--;)
              value = formatters[idx](value);
            ctrl.$viewValue !== value && (ctrl.$viewValue = value, ctrl.$render());
          }
        });
      }
    ], ngModelDirective = function () {
      return {
        require: [
          'ngModel',
          '^?form'
        ],
        controller: NgModelController,
        link: function (scope, element, attr, ctrls) {
          var modelCtrl = ctrls[0], formCtrl = ctrls[1] || nullFormCtrl;
          formCtrl.$addControl(modelCtrl), element.bind('$destroy', function () {
            formCtrl.$removeControl(modelCtrl);
          });
        }
      };
    }, ngChangeDirective = valueFn({
      require: 'ngModel',
      link: function (scope, element, attr, ctrl) {
        ctrl.$viewChangeListeners.push(function () {
          scope.$eval(attr.ngChange);
        });
      }
    }), requiredDirective = function () {
      return {
        require: '?ngModel',
        link: function (scope, elm, attr, ctrl) {
          if (ctrl) {
            attr.required = !0;
            var validator = function (value) {
              return attr.required && (isEmpty(value) || value === !1) ? void ctrl.$setValidity('required', !1) : (ctrl.$setValidity('required', !0), value);
            };
            ctrl.$formatters.push(validator), ctrl.$parsers.unshift(validator), attr.$observe('required', function () {
              validator(ctrl.$viewValue);
            });
          }
        }
      };
    }, ngListDirective = function () {
      return {
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
          var match = /\/(.*)\//.exec(attr.ngList), separator = match && new RegExp(match[1]) || attr.ngList || ',', parse = function (viewValue) {
              var list = [];
              return viewValue && forEach(viewValue.split(separator), function (value) {
                value && list.push(trim(value));
              }), list;
            };
          ctrl.$parsers.push(parse), ctrl.$formatters.push(function (value) {
            return isArray(value) ? value.join(', ') : undefined;
          });
        }
      };
    }, CONSTANT_VALUE_REGEXP = /^(true|false|\d+)$/, ngValueDirective = function () {
      return {
        priority: 100,
        compile: function (tpl, tplAttr) {
          return CONSTANT_VALUE_REGEXP.test(tplAttr.ngValue) ? function (scope, elm, attr) {
            attr.$set('value', scope.$eval(attr.ngValue));
          } : function (scope, elm, attr) {
            scope.$watch(attr.ngValue, function (value) {
              attr.$set('value', value);
            });
          };
        }
      };
    }, ngBindDirective = ngDirective(function (scope, element, attr) {
      element.addClass('ng-binding').data('$binding', attr.ngBind), scope.$watch(attr.ngBind, function (value) {
        element.text(value == undefined ? '' : value);
      });
    }), ngBindTemplateDirective = [
      '$interpolate',
      function ($interpolate) {
        return function (scope, element, attr) {
          var interpolateFn = $interpolate(element.attr(attr.$attr.ngBindTemplate));
          element.addClass('ng-binding').data('$binding', interpolateFn), attr.$observe('ngBindTemplate', function (value) {
            element.text(value);
          });
        };
      }
    ], ngBindHtmlUnsafeDirective = [function () {
        return function (scope, element, attr) {
          element.addClass('ng-binding').data('$binding', attr.ngBindHtmlUnsafe), scope.$watch(attr.ngBindHtmlUnsafe, function (value) {
            element.html(value || '');
          });
        };
      }], ngClassDirective = classDirective('', !0), ngClassOddDirective = classDirective('Odd', 0), ngClassEvenDirective = classDirective('Even', 1), ngCloakDirective = ngDirective({
      compile: function (element, attr) {
        attr.$set('ngCloak', undefined), element.removeClass('ng-cloak');
      }
    }), ngControllerDirective = [function () {
        return {
          scope: !0,
          controller: '@'
        };
      }], ngCspDirective = [
      '$sniffer',
      function ($sniffer) {
        return {
          priority: 1000,
          compile: function () {
            $sniffer.csp = !0;
          }
        };
      }
    ], ngEventDirectives = {};
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
          terminal: !0,
          compile: function (element, attr) {
            var srcExp = attr.ngInclude || attr.src, onloadExp = attr.onload || '', autoScrollExp = attr.autoscroll;
            return function (scope, element) {
              var childScope, changeCounter = 0, clearContent = function () {
                  childScope && (childScope.$destroy(), childScope = null), element.html('');
                };
              scope.$watch(srcExp, function (src) {
                var thisChangeId = ++changeCounter;
                src ? $http.get(src, { cache: $templateCache }).success(function (response) {
                  thisChangeId === changeCounter && (childScope && childScope.$destroy(), childScope = scope.$new(), element.html(response), $compile(element.contents())(childScope), !isDefined(autoScrollExp) || autoScrollExp && !scope.$eval(autoScrollExp) || $anchorScroll(), childScope.$emit('$includeContentLoaded'), scope.$eval(onloadExp));
                }).error(function () {
                  thisChangeId === changeCounter && clearContent();
                }) : clearContent();
              });
            };
          }
        };
      }
    ], ngInitDirective = ngDirective({
      compile: function () {
        return {
          pre: function (scope, element, attrs) {
            scope.$eval(attrs.ngInit);
          }
        };
      }
    }), ngNonBindableDirective = ngDirective({
      terminal: !0,
      priority: 1000
    }), ngPluralizeDirective = [
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
            }), scope.$watch(function () {
              var value = parseFloat(scope.$eval(numberExp));
              return isNaN(value) ? '' : (value in whens || (value = $locale.pluralCat(value - offset)), whensExpFns[value](scope, element, !0));
            }, function (newVal) {
              element.text(newVal);
            });
          }
        };
      }
    ], ngRepeatDirective = ngDirective({
      transclude: 'element',
      priority: 1000,
      terminal: !0,
      compile: function (element, attr, linker) {
        return function (scope, iterStartElement, attr) {
          var lhs, rhs, valueIdent, keyIdent, expression = attr.ngRepeat, match = expression.match(/^\s*(.+)\s+in\s+(.*)\s*$/);
          if (!match)
            throw Error('Expected ngRepeat in form of \'_item_ in _collection_\' but got \'' + expression + '\'.');
          if (lhs = match[1], rhs = match[2], match = lhs.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/), !match)
            throw Error('\'item\' in \'item in collection\' should be identifier or (key, value) but got \'' + lhs + '\'.');
          valueIdent = match[3] || match[1], keyIdent = match[2];
          var lastOrder = new HashQueueMap();
          scope.$watch(function (scope) {
            var index, length, arrayBound, childScope, key, value, array, last, collection = scope.$eval(rhs), cursor = iterStartElement, nextOrder = new HashQueueMap();
            if (isArray(collection))
              array = collection || [];
            else {
              array = [];
              for (key in collection)
                collection.hasOwnProperty(key) && '$' != key.charAt(0) && array.push(key);
              array.sort();
            }
            for (arrayBound = array.length - 1, index = 0, length = array.length; length > index; index++)
              key = collection === array ? index : array[index], value = collection[key], last = lastOrder.shift(value), last ? (childScope = last.scope, nextOrder.push(value, last), index === last.index ? cursor = last.element : (last.index = index, cursor.after(last.element), cursor = last.element)) : childScope = scope.$new(), childScope[valueIdent] = value, keyIdent && (childScope[keyIdent] = key), childScope.$index = index, childScope.$first = 0 === index, childScope.$last = index === arrayBound, childScope.$middle = !(childScope.$first || childScope.$last), last || linker(childScope, function (clone) {
                cursor.after(clone), last = {
                  scope: childScope,
                  element: cursor = clone,
                  index: index
                }, nextOrder.push(value, last);
              });
            for (key in lastOrder)
              if (lastOrder.hasOwnProperty(key))
                for (array = lastOrder[key]; array.length;)
                  value = array.pop(), value.element.remove(), value.scope.$destroy();
            lastOrder = nextOrder;
          });
        };
      }
    }), ngShowDirective = ngDirective(function (scope, element, attr) {
      scope.$watch(attr.ngShow, function (value) {
        element.css('display', toBoolean(value) ? '' : 'none');
      });
    }), ngHideDirective = ngDirective(function (scope, element, attr) {
      scope.$watch(attr.ngHide, function (value) {
        element.css('display', toBoolean(value) ? 'none' : '');
      });
    }), ngStyleDirective = ngDirective(function (scope, element, attr) {
      scope.$watch(attr.ngStyle, function (newStyles, oldStyles) {
        oldStyles && newStyles !== oldStyles && forEach(oldStyles, function (val, style) {
          element.css(style, '');
        }), newStyles && element.css(newStyles);
      }, !0);
    }), ngSwitchDirective = valueFn({
      restrict: 'EA',
      require: 'ngSwitch',
      controller: [
        '$scope',
        function () {
          this.cases = {};
        }
      ],
      link: function (scope, element, attr, ctrl) {
        var selectedTransclude, selectedElement, selectedScope, watchExpr = attr.ngSwitch || attr.on;
        scope.$watch(watchExpr, function (value) {
          selectedElement && (selectedScope.$destroy(), selectedElement.remove(), selectedElement = selectedScope = null), (selectedTransclude = ctrl.cases['!' + value] || ctrl.cases['?']) && (scope.$eval(attr.change), selectedScope = scope.$new(), selectedTransclude(selectedScope, function (caseElement) {
            selectedElement = caseElement, element.append(caseElement);
          }));
        });
      }
    }), ngSwitchWhenDirective = ngDirective({
      transclude: 'element',
      priority: 500,
      require: '^ngSwitch',
      compile: function (element, attrs, transclude) {
        return function (scope, element, attr, ctrl) {
          ctrl.cases['!' + attrs.ngSwitchWhen] = transclude;
        };
      }
    }), ngSwitchDefaultDirective = ngDirective({
      transclude: 'element',
      priority: 500,
      require: '^ngSwitch',
      compile: function (element, attrs, transclude) {
        return function (scope, element, attr, ctrl) {
          ctrl.cases['?'] = transclude;
        };
      }
    }), ngTranscludeDirective = ngDirective({
      controller: [
        '$transclude',
        '$element',
        function ($transclude, $element) {
          $transclude(function (clone) {
            $element.append(clone);
          });
        }
      ]
    }), ngViewDirective = [
      '$http',
      '$templateCache',
      '$route',
      '$anchorScroll',
      '$compile',
      '$controller',
      function ($http, $templateCache, $route, $anchorScroll, $compile, $controller) {
        return {
          restrict: 'ECA',
          terminal: !0,
          link: function (scope, element, attr) {
            function destroyLastScope() {
              lastScope && (lastScope.$destroy(), lastScope = null);
            }
            function clearContent() {
              element.html(''), destroyLastScope();
            }
            function update() {
              var locals = $route.current && $route.current.locals, template = locals && locals.$template;
              if (template) {
                element.html(template), destroyLastScope();
                var controller, link = $compile(element.contents()), current = $route.current;
                lastScope = current.scope = scope.$new(), current.controller && (locals.$scope = lastScope, controller = $controller(current.controller, locals), element.children().data('$ngControllerController', controller)), link(lastScope), lastScope.$emit('$viewContentLoaded'), lastScope.$eval(onloadExp), $anchorScroll();
              } else
                clearContent();
            }
            var lastScope, onloadExp = attr.onload || '';
            scope.$on('$routeChangeSuccess', update), update();
          }
        };
      }
    ], scriptDirective = [
      '$templateCache',
      function ($templateCache) {
        return {
          restrict: 'E',
          terminal: !0,
          compile: function (element, attr) {
            if ('text/ng-template' == attr.type) {
              var templateUrl = attr.id, text = element[0].text;
              $templateCache.put(templateUrl, text);
            }
          }
        };
      }
    ], ngOptionsDirective = valueFn({ terminal: !0 }), selectDirective = [
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
              var nullOption, unknownOption, self = this, optionsMap = {}, ngModelCtrl = nullModelCtrl;
              self.databound = $attrs.ngModel, self.init = function (ngModelCtrl_, nullOption_, unknownOption_) {
                ngModelCtrl = ngModelCtrl_, nullOption = nullOption_, unknownOption = unknownOption_;
              }, self.addOption = function (value) {
                optionsMap[value] = !0, ngModelCtrl.$viewValue == value && ($element.val(value), unknownOption.parent() && unknownOption.remove());
              }, self.removeOption = function (value) {
                this.hasOption(value) && (delete optionsMap[value], ngModelCtrl.$viewValue == value && this.renderUnknownOption(value));
              }, self.renderUnknownOption = function (val) {
                var unknownVal = '? ' + hashKey(val) + ' ?';
                unknownOption.val(unknownVal), $element.prepend(unknownOption), $element.val(unknownVal), unknownOption.prop('selected', !0);
              }, self.hasOption = function (value) {
                return optionsMap.hasOwnProperty(value);
              }, $scope.$on('$destroy', function () {
                self.renderUnknownOption = noop;
              });
            }
          ],
          link: function (scope, element, attr, ctrls) {
            function Single(scope, selectElement, ngModelCtrl, selectCtrl) {
              ngModelCtrl.$render = function () {
                var viewValue = ngModelCtrl.$viewValue;
                selectCtrl.hasOption(viewValue) ? (unknownOption.parent() && unknownOption.remove(), selectElement.val(viewValue), '' === viewValue && emptyOption.prop('selected', !0)) : isUndefined(viewValue) && emptyOption ? selectElement.val('') : selectCtrl.renderUnknownOption(viewValue);
              }, selectElement.bind('change', function () {
                scope.$apply(function () {
                  unknownOption.parent() && unknownOption.remove(), ngModelCtrl.$setViewValue(selectElement.val());
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
              }, scope.$watch(function () {
                equals(lastView, ctrl.$viewValue) || (lastView = copy(ctrl.$viewValue), ctrl.$render());
              }), selectElement.bind('change', function () {
                scope.$apply(function () {
                  var array = [];
                  forEach(selectElement.find('option'), function (option) {
                    option.selected && array.push(option.value);
                  }), ctrl.$setViewValue(array);
                });
              });
            }
            function Options(scope, selectElement, ctrl) {
              function render() {
                var optionGroupName, optionGroup, option, existingParent, existingOptions, existingOption, groupLength, length, groupIndex, index, selected, lastElement, element, label, optionGroups = { '': [] }, optionGroupNames = [''], modelValue = ctrl.$modelValue, values = valuesFn(scope) || [], keys = keyName ? sortedKeys(values) : values, locals = {}, selectedSet = !1;
                for (multiple && (selectedSet = new HashMap(modelValue)), index = 0; length = keys.length, length > index; index++)
                  locals[valueName] = values[keyName ? locals[keyName] = keys[index] : index], optionGroupName = groupByFn(scope, locals) || '', (optionGroup = optionGroups[optionGroupName]) || (optionGroup = optionGroups[optionGroupName] = [], optionGroupNames.push(optionGroupName)), multiple ? selected = selectedSet.remove(valueFn(scope, locals)) != undefined : (selected = modelValue === valueFn(scope, locals), selectedSet = selectedSet || selected), label = displayFn(scope, locals), label = label === undefined ? '' : label, optionGroup.push({
                    id: keyName ? keys[index] : index,
                    label: label,
                    selected: selected
                  });
                for (multiple || (nullOption || null === modelValue ? optionGroups[''].unshift({
                    id: '',
                    label: '',
                    selected: !selectedSet
                  }) : selectedSet || optionGroups[''].unshift({
                    id: '?',
                    label: '',
                    selected: !0
                  })), groupIndex = 0, groupLength = optionGroupNames.length; groupLength > groupIndex; groupIndex++) {
                  for (optionGroupName = optionGroupNames[groupIndex], optionGroup = optionGroups[optionGroupName], optionGroupsCache.length <= groupIndex ? (existingParent = {
                      element: optGroupTemplate.clone().attr('label', optionGroupName),
                      label: optionGroup.label
                    }, existingOptions = [existingParent], optionGroupsCache.push(existingOptions), selectElement.append(existingParent.element)) : (existingOptions = optionGroupsCache[groupIndex], existingParent = existingOptions[0], existingParent.label != optionGroupName && existingParent.element.attr('label', existingParent.label = optionGroupName)), lastElement = null, index = 0, length = optionGroup.length; length > index; index++)
                    option = optionGroup[index], (existingOption = existingOptions[index + 1]) ? (lastElement = existingOption.element, existingOption.label !== option.label && lastElement.text(existingOption.label = option.label), existingOption.id !== option.id && lastElement.val(existingOption.id = option.id), lastElement[0].selected !== option.selected && lastElement.prop('selected', existingOption.selected = option.selected)) : ('' === option.id && nullOption ? element = nullOption : (element = optionTemplate.clone()).val(option.id).attr('selected', option.selected).text(option.label), existingOptions.push(existingOption = {
                      element: element,
                      label: option.label,
                      id: option.id,
                      selected: option.selected
                    }), lastElement ? lastElement.after(element) : existingParent.element.append(element), lastElement = element);
                  for (index++; existingOptions.length > index;)
                    existingOptions.pop().element.remove();
                }
                for (; optionGroupsCache.length > groupIndex;)
                  optionGroupsCache.pop()[0].element.remove();
              }
              var match;
              if (!(match = optionsExp.match(NG_OPTIONS_REGEXP)))
                throw Error('Expected ngOptions in form of \'_select_ (as _label_)? for (_key_,)?_value_ in _collection_\' but got \'' + optionsExp + '\'.');
              var displayFn = $parse(match[2] || match[1]), valueName = match[4] || match[6], keyName = match[5], groupByFn = $parse(match[3] || ''), valueFn = $parse(match[2] ? match[1] : valueName), valuesFn = $parse(match[7]), optionGroupsCache = [[{
                      element: selectElement,
                      label: ''
                    }]];
              nullOption && ($compile(nullOption)(scope), nullOption.removeClass('ng-scope'), nullOption.remove()), selectElement.html(''), selectElement.bind('change', function () {
                scope.$apply(function () {
                  var optionGroup, key, value, optionElement, index, groupIndex, length, groupLength, collection = valuesFn(scope) || [], locals = {};
                  if (multiple)
                    for (value = [], groupIndex = 0, groupLength = optionGroupsCache.length; groupLength > groupIndex; groupIndex++)
                      for (optionGroup = optionGroupsCache[groupIndex], index = 1, length = optionGroup.length; length > index; index++)
                        (optionElement = optionGroup[index].element)[0].selected && (key = optionElement.val(), keyName && (locals[keyName] = key), locals[valueName] = collection[key], value.push(valueFn(scope, locals)));
                  else
                    key = selectElement.val(), '?' == key ? value = undefined : '' == key ? value = null : (locals[valueName] = collection[key], keyName && (locals[keyName] = key), value = valueFn(scope, locals));
                  ctrl.$setViewValue(value);
                });
              }), ctrl.$render = render, scope.$watch(render);
            }
            if (ctrls[1]) {
              for (var emptyOption, selectCtrl = ctrls[0], ngModelCtrl = ctrls[1], multiple = attr.multiple, optionsExp = attr.ngOptions, nullOption = !1, optionTemplate = jqLite(document.createElement('option')), optGroupTemplate = jqLite(document.createElement('optgroup')), unknownOption = optionTemplate.clone(), i = 0, children = element.children(), ii = children.length; ii > i; i++)
                if ('' == children[i].value) {
                  emptyOption = nullOption = children.eq(i);
                  break;
                }
              if (selectCtrl.init(ngModelCtrl, nullOption, unknownOption), multiple && (attr.required || attr.ngRequired)) {
                var requiredValidator = function (value) {
                  return ngModelCtrl.$setValidity('required', !attr.required || value && value.length), value;
                };
                ngModelCtrl.$parsers.push(requiredValidator), ngModelCtrl.$formatters.unshift(requiredValidator), attr.$observe('required', function () {
                  requiredValidator(ngModelCtrl.$viewValue);
                });
              }
              optionsExp ? Options(scope, element, ngModelCtrl) : multiple ? Multiple(scope, element, ngModelCtrl) : Single(scope, element, ngModelCtrl, selectCtrl);
            }
          }
        };
      }
    ], optionDirective = [
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
              var interpolateFn = $interpolate(element.text(), !0);
              interpolateFn || attr.$set('value', element.text());
            }
            return function (scope, element, attr) {
              var selectCtrlName = '$selectController', parent = element.parent(), selectCtrl = parent.data(selectCtrlName) || parent.parent().data(selectCtrlName);
              selectCtrl && selectCtrl.databound ? element.prop('selected', !1) : selectCtrl = nullSelectCtrl, interpolateFn ? scope.$watch(interpolateFn, function (newVal, oldVal) {
                attr.$set('value', newVal), newVal !== oldVal && selectCtrl.removeOption(oldVal), selectCtrl.addOption(newVal);
              }) : selectCtrl.addOption(attr.value), element.bind('$destroy', function () {
                selectCtrl.removeOption(attr.value);
              });
            };
          }
        };
      }
    ], styleDirective = valueFn({
      restrict: 'E',
      terminal: !0
    });
  bindJQuery(), publishExternalAPI(angular), jqLite(document).ready(function () {
    angularInit(document, bootstrap);
  });
}(window, document), angular.element(document).find('head').append('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak{display:none !important;}ng\\:form{display:block;}</style>'), angular.module('ui.config', []).value('ui.config', {}), angular.module('ui.filters', ['ui.config']), angular.module('ui.directives', ['ui.config']), angular.module('ui', [
  'ui.filters',
  'ui.directives',
  'ui.config'
]), angular.module('ui.directives').directive('uiAnimate', [
  'ui.config',
  '$timeout',
  function (uiConfig, $timeout) {
    var options = {};
    return angular.isString(uiConfig.animate) ? options['class'] = uiConfig.animate : uiConfig.animate && (options = uiConfig.animate), {
      restrict: 'A',
      link: function ($scope, element, attrs) {
        var opts = {};
        attrs.uiAnimate && (opts = $scope.$eval(attrs.uiAnimate), angular.isString(opts) && (opts = { 'class': opts })), opts = angular.extend({ 'class': 'ui-animate' }, options, opts), element.addClass(opts['class']), $timeout(function () {
          element.removeClass(opts['class']);
        }, 20, !1);
      }
    };
  }
]), angular.module('ui.directives').directive('uiCalendar', [
  'ui.config',
  '$parse',
  function (uiConfig) {
    return uiConfig.uiCalendar = uiConfig.uiCalendar || {}, {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, elm, attrs) {
        function update() {
          scope.calendar = elm.html('');
          var view = scope.calendar.fullCalendar('getView');
          view && (view = view.name);
          var expression, options = {
              defaultView: view,
              eventSources: sources
            };
          expression = attrs.uiCalendar ? scope.$eval(attrs.uiCalendar) : {}, angular.extend(options, uiConfig.uiCalendar, expression), scope.calendar.fullCalendar(options);
        }
        var sources = scope.$eval(attrs.ngModel), tracker = 0, getSources = function () {
            var equalsTracker = scope.$eval(attrs.equalsTracker);
            return tracker = 0, angular.forEach(sources, function (value) {
              angular.isArray(value) && (tracker += value.length);
            }), angular.isNumber(equalsTracker) ? tracker + sources.length + equalsTracker : tracker + sources.length;
          };
        update(), scope.$watch(getSources, function () {
          update();
        });
      }
    };
  }
]), angular.module('ui.directives').directive('uiCodemirror', [
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
        if ('textarea' !== elm[0].type)
          throw new Error('uiCodemirror3 can only be applied to a textarea element');
        options = uiConfig.codemirror || {}, opts = angular.extend({}, options, scope.$eval(attrs.uiCodemirror)), onChange = function (aEvent) {
          return function (instance, changeObj) {
            var newValue = instance.getValue();
            newValue !== ngModel.$viewValue && (ngModel.$setViewValue(newValue), scope.$apply()), 'function' == typeof aEvent && aEvent(instance, changeObj);
          };
        }, deferCodeMirror = function () {
          codeMirror = CodeMirror.fromTextArea(elm[0], opts), codeMirror.on('change', onChange(opts.onChange));
          for (var aEvent, i = 0, n = events.length; n > i; ++i)
            aEvent = opts['on' + events[i].charAt(0).toUpperCase() + events[i].slice(1)], void 0 !== aEvent && 'function' == typeof aEvent && codeMirror.on(events[i], aEvent);
          ngModel.$formatters.push(function (value) {
            if (angular.isUndefined(value) || null === value)
              return '';
            if (angular.isObject(value) || angular.isArray(value))
              throw new Error('ui-codemirror cannot use an object or an array as a model');
            return value;
          }), ngModel.$render = function () {
            codeMirror.setValue(ngModel.$viewValue);
          }, attrs.uiRefresh && scope.$watch(attrs.uiRefresh, function (newVal, oldVal) {
            newVal !== oldVal && $timeout(codeMirror.refresh);
          });
        }, $timeout(deferCodeMirror);
      }
    };
  }
]), angular.module('ui.directives').directive('uiCurrency', [
  'ui.config',
  'currencyFilter',
  function (uiConfig, currencyFilter) {
    var options = {
        pos: 'ui-currency-pos',
        neg: 'ui-currency-neg',
        zero: 'ui-currency-zero'
      };
    return uiConfig.currency && angular.extend(options, uiConfig.currency), {
      restrict: 'EAC',
      require: 'ngModel',
      link: function (scope, element, attrs, controller) {
        var opts, renderview, value;
        opts = angular.extend({}, options, scope.$eval(attrs.uiCurrency)), renderview = function (viewvalue) {
          var num;
          return num = 1 * viewvalue, element.toggleClass(opts.pos, num > 0), element.toggleClass(opts.neg, 0 > num), element.toggleClass(opts.zero, 0 === num), element.text('' === viewvalue ? '' : currencyFilter(num, opts.symbol)), !0;
        }, controller.$render = function () {
          value = controller.$viewValue, element.val(value), renderview(value);
        };
      }
    };
  }
]), angular.module('ui.directives').directive('uiDate', [
  'ui.config',
  function (uiConfig) {
    'use strict';
    var options;
    return options = {}, angular.isObject(uiConfig.date) && angular.extend(options, uiConfig.date), {
      require: '?ngModel',
      link: function (scope, element, attrs, controller) {
        var getOptions = function () {
            return angular.extend({}, uiConfig.date, scope.$eval(attrs.uiDate));
          }, initDateWidget = function () {
            var opts = getOptions();
            if (controller) {
              var updateModel = function () {
                scope.$apply(function () {
                  var date = element.datepicker('getDate');
                  element.datepicker('setDate', element.val()), controller.$setViewValue(date), element.blur();
                });
              };
              if (opts.onSelect) {
                var userHandler = opts.onSelect;
                opts.onSelect = function (value, picker) {
                  updateModel(), scope.$apply(function () {
                    userHandler(value, picker);
                  });
                };
              } else
                opts.onSelect = updateModel;
              element.bind('change', updateModel), controller.$render = function () {
                var date = controller.$viewValue;
                if (angular.isDefined(date) && null !== date && !angular.isDate(date))
                  throw new Error('ng-Model value must be a Date object - currently it is a ' + typeof date + ' - use ui-date-format to convert it from a string');
                element.datepicker('setDate', date);
              };
            }
            element.datepicker('destroy'), element.datepicker(opts), controller && controller.$render();
          };
        scope.$watch(getOptions, initDateWidget, !0);
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
          dateFormat ? (modelCtrl.$formatters.push(function (value) {
            return angular.isString(value) ? $.datepicker.parseDate(dateFormat, value) : void 0;
          }), modelCtrl.$parsers.push(function (value) {
            return value ? $.datepicker.formatDate(dateFormat, value) : void 0;
          })) : (modelCtrl.$formatters.push(function (value) {
            return angular.isString(value) ? new Date(value) : void 0;
          }), modelCtrl.$parsers.push(function (value) {
            return value ? value.toISOString() : void 0;
          }));
        }
      };
    return directive;
  }
]), angular.module('ui.directives').directive('uiEvent', [
  '$parse',
  function ($parse) {
    return function (scope, elm, attrs) {
      var events = scope.$eval(attrs.uiEvent);
      angular.forEach(events, function (uiEvent, eventName) {
        var fn = $parse(uiEvent);
        elm.bind(eventName, function (evt) {
          var params = Array.prototype.slice.call(arguments);
          params = params.splice(1), scope.$apply(function () {
            fn(scope, {
              $event: evt,
              $params: params
            });
          });
        });
      });
    };
  }
]), angular.module('ui.directives').directive('uiIf', [function () {
    return {
      transclude: 'element',
      priority: 1000,
      terminal: !0,
      restrict: 'A',
      compile: function (element, attr, transclude) {
        return function (scope, element, attr) {
          var childElement, childScope;
          scope.$watch(attr.uiIf, function (newValue) {
            childElement && (childElement.remove(), childElement = void 0), childScope && (childScope.$destroy(), childScope = void 0), newValue && (childScope = scope.$new(), transclude(childScope, function (clone) {
              childElement = clone, element.after(clone);
            }));
          });
        };
      }
    };
  }]), angular.module('ui.directives').directive('uiJq', [
  'ui.config',
  '$timeout',
  function (uiConfig, $timeout) {
    return {
      restrict: 'A',
      compile: function (tElm, tAttrs) {
        if (!angular.isFunction(tElm[tAttrs.uiJq]))
          throw new Error('ui-jq: The "' + tAttrs.uiJq + '" function does not exist');
        var options = uiConfig.jq && uiConfig.jq[tAttrs.uiJq];
        return function (scope, elm, attrs) {
          function callPlugin() {
            $timeout(function () {
              elm[attrs.uiJq].apply(elm, linkOptions);
            }, 0, !1);
          }
          var linkOptions = [];
          attrs.uiOptions ? (linkOptions = scope.$eval('[' + attrs.uiOptions + ']'), angular.isObject(options) && angular.isObject(linkOptions[0]) && (linkOptions[0] = angular.extend({}, options, linkOptions[0]))) : options && (linkOptions = [options]), attrs.ngModel && elm.is('select,input,textarea') && elm.on('change', function () {
            elm.trigger('input');
          }), attrs.uiRefresh && scope.$watch(attrs.uiRefresh, function () {
            callPlugin();
          }), callPlugin();
        };
      }
    };
  }
]), angular.module('ui.directives').factory('keypressHelper', [
  '$parse',
  function ($parse) {
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
      }, capitaliseFirstLetter = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };
    return function (mode, scope, elm, attrs) {
      var params, combinations = [];
      params = scope.$eval(attrs['ui' + capitaliseFirstLetter(mode)]), angular.forEach(params, function (v, k) {
        var combination, expression;
        expression = $parse(v), angular.forEach(k.split(' '), function (variation) {
          combination = {
            expression: expression,
            keys: {}
          }, angular.forEach(variation.split('-'), function (value) {
            combination.keys[value] = !0;
          }), combinations.push(combination);
        });
      }), elm.bind(mode, function (event) {
        var altPressed = event.metaKey || event.altKey, ctrlPressed = event.ctrlKey, shiftPressed = event.shiftKey, keyCode = event.keyCode;
        'keypress' === mode && !shiftPressed && keyCode >= 97 && 122 >= keyCode && (keyCode -= 32), angular.forEach(combinations, function (combination) {
          var mainKeyPressed = combination.keys[keysByCode[event.keyCode]] || combination.keys[event.keyCode.toString()] || !1, altRequired = combination.keys.alt || !1, ctrlRequired = combination.keys.ctrl || !1, shiftRequired = combination.keys.shift || !1;
          mainKeyPressed && altRequired == altPressed && ctrlRequired == ctrlPressed && shiftRequired == shiftPressed && scope.$apply(function () {
            combination.expression(scope, { $event: event });
          });
        });
      });
    };
  }
]), angular.module('ui.directives').directive('uiKeydown', [
  'keypressHelper',
  function (keypressHelper) {
    return {
      link: function (scope, elm, attrs) {
        keypressHelper('keydown', scope, elm, attrs);
      }
    };
  }
]), angular.module('ui.directives').directive('uiKeypress', [
  'keypressHelper',
  function (keypressHelper) {
    return {
      link: function (scope, elm, attrs) {
        keypressHelper('keypress', scope, elm, attrs);
      }
    };
  }
]), angular.module('ui.directives').directive('uiKeyup', [
  'keypressHelper',
  function (keypressHelper) {
    return {
      link: function (scope, elm, attrs) {
        keypressHelper('keyup', scope, elm, attrs);
      }
    };
  }
]), function () {
  function bindMapEvents(scope, eventsStr, googleObject, element) {
    angular.forEach(eventsStr.split(' '), function (eventName) {
      var $event = { type: 'map-' + eventName };
      google.maps.event.addListener(googleObject, eventName, function (evt) {
        element.triggerHandler(angular.extend({}, $event, evt)), scope.$$phase || scope.$apply();
      });
    });
  }
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
  var app = angular.module('ui.directives');
  app.directive('uiMap', [
    'ui.config',
    '$parse',
    function (uiConfig, $parse) {
      var mapEvents = 'bounds_changed center_changed click dblclick drag dragend dragstart heading_changed idle maptypeid_changed mousemove mouseout mouseover projection_changed resize rightclick tilesloaded tilt_changed zoom_changed', options = uiConfig.map || {};
      return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
          var opts = angular.extend({}, options, scope.$eval(attrs.uiOptions)), map = new google.maps.Map(elm[0], opts), model = $parse(attrs.uiMap);
          model.assign(scope, map), bindMapEvents(scope, mapEvents, map, elm);
        }
      };
    }
  ]), app.directive('uiMapInfoWindow', [
    'ui.config',
    '$parse',
    '$compile',
    function (uiConfig, $parse, $compile) {
      var infoWindowEvents = 'closeclick content_change domready position_changed zindex_changed', options = uiConfig.mapInfoWindow || {};
      return {
        link: function (scope, elm, attrs) {
          var opts = angular.extend({}, options, scope.$eval(attrs.uiOptions));
          opts.content = elm[0];
          var model = $parse(attrs.uiMapInfoWindow), infoWindow = model(scope);
          infoWindow || (infoWindow = new google.maps.InfoWindow(opts), model.assign(scope, infoWindow)), bindMapEvents(scope, infoWindowEvents, infoWindow, elm), elm.replaceWith('<div></div>');
          var _open = infoWindow.open;
          infoWindow.open = function (a1, a2, a3, a4, a5, a6) {
            $compile(elm.contents())(scope), _open.call(infoWindow, a1, a2, a3, a4, a5, a6);
          };
        }
      };
    }
  ]), mapOverlayDirective('uiMapMarker', 'animation_changed click clickable_changed cursor_changed dblclick drag dragend draggable_changed dragstart flat_changed icon_changed mousedown mouseout mouseover mouseup position_changed rightclick shadow_changed shape_changed title_changed visible_changed zindex_changed'), mapOverlayDirective('uiMapPolyline', 'click dblclick mousedown mousemove mouseout mouseover mouseup rightclick'), mapOverlayDirective('uiMapPolygon', 'click dblclick mousedown mousemove mouseout mouseover mouseup rightclick'), mapOverlayDirective('uiMapRectangle', 'bounds_changed click dblclick mousedown mousemove mouseout mouseover mouseup rightclick'), mapOverlayDirective('uiMapCircle', 'center_changed click dblclick mousedown mousemove mouseout mouseover mouseup radius_changed rightclick'), mapOverlayDirective('uiMapGroundOverlay', 'click dblclick');
}(), angular.module('ui.directives').directive('uiMask', [function () {
    return {
      require: 'ngModel',
      link: function ($scope, element, attrs, controller) {
        controller.$render = function () {
          var value = controller.$viewValue || '';
          element.val(value), element.mask($scope.$eval(attrs.uiMask));
        }, controller.$parsers.push(function (value) {
          var isValid = element.isMaskValid() || angular.isUndefined(element.isMaskValid()) && element.val().length > 0;
          return controller.$setValidity('mask', isValid), isValid ? value : void 0;
        }), element.bind('keyup', function () {
          $scope.$apply(function () {
            controller.$setViewValue(element.mask());
          });
        });
      }
    };
  }]), angular.module('ui.directives').directive('uiReset', [
  'ui.config',
  function (uiConfig) {
    var resetValue = null;
    return void 0 !== uiConfig.reset && (resetValue = uiConfig.reset), {
      require: 'ngModel',
      link: function (scope, elm, attrs, ctrl) {
        var aElement;
        aElement = angular.element('<a class="ui-reset" />'), elm.wrap('<span class="ui-resetwrap" />').after(aElement), aElement.bind('click', function (e) {
          e.preventDefault(), scope.$apply(function () {
            ctrl.$setViewValue(attrs.uiReset ? scope.$eval(attrs.uiReset) : resetValue), ctrl.$render();
          });
        });
      }
    };
  }
]), angular.module('ui.directives').directive('uiRoute', [
  '$location',
  '$parse',
  function ($location, $parse) {
    return {
      restrict: 'AC',
      compile: function (tElement, tAttrs) {
        var useProperty;
        if (tAttrs.uiRoute)
          useProperty = 'uiRoute';
        else if (tAttrs.ngHref)
          useProperty = 'ngHref';
        else {
          if (!tAttrs.href)
            throw new Error('uiRoute missing a route or href property on ' + tElement[0]);
          useProperty = 'href';
        }
        return function ($scope, elm, attrs) {
          function staticWatcher(newVal) {
            (hash = newVal.indexOf('#')) > -1 && (newVal = newVal.substr(hash + 1)), (watcher = function () {
              modelSetter($scope, $location.path().indexOf(newVal) > -1);
            })();
          }
          function regexWatcher(newVal) {
            (hash = newVal.indexOf('#')) > -1 && (newVal = newVal.substr(hash + 1)), (watcher = function () {
              var regexp = new RegExp('^' + newVal + '$', ['i']);
              modelSetter($scope, regexp.test($location.path()));
            })();
          }
          var modelSetter = $parse(attrs.ngModel || attrs.routeModel || '$uiRoute').assign, watcher = angular.noop;
          switch (useProperty) {
          case 'uiRoute':
            attrs.uiRoute ? regexWatcher(attrs.uiRoute) : attrs.$observe('uiRoute', regexWatcher);
            break;
          case 'ngHref':
            attrs.ngHref ? staticWatcher(attrs.ngHref) : attrs.$observe('ngHref', staticWatcher);
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
]), angular.module('ui.directives').directive('uiScrollfix', [
  '$window',
  function ($window) {
    'use strict';
    return {
      link: function (scope, elm, attrs) {
        var top = elm.offset().top;
        attrs.uiScrollfix ? '-' === attrs.uiScrollfix.charAt(0) ? attrs.uiScrollfix = top - attrs.uiScrollfix.substr(1) : '+' === attrs.uiScrollfix.charAt(0) && (attrs.uiScrollfix = top + parseFloat(attrs.uiScrollfix.substr(1))) : attrs.uiScrollfix = top, angular.element($window).on('scroll.ui-scrollfix', function () {
          var offset;
          if (angular.isDefined($window.pageYOffset))
            offset = $window.pageYOffset;
          else {
            var iebody = document.compatMode && 'BackCompat' !== document.compatMode ? document.documentElement : document.body;
            offset = iebody.scrollTop;
          }
          !elm.hasClass('ui-scrollfix') && offset > attrs.uiScrollfix ? elm.addClass('ui-scrollfix') : elm.hasClass('ui-scrollfix') && offset < attrs.uiScrollfix && elm.removeClass('ui-scrollfix');
        });
      }
    };
  }
]), angular.module('ui.directives').directive('uiSelect2', [
  'ui.config',
  '$timeout',
  function (uiConfig, $timeout) {
    var options = {};
    return uiConfig.select2 && angular.extend(options, uiConfig.select2), {
      require: '?ngModel',
      compile: function (tElm, tAttrs) {
        var watch, repeatOption, repeatAttr, isSelect = tElm.is('select'), isMultiple = void 0 !== tAttrs.multiple;
        return tElm.is('select') && (repeatOption = tElm.find('option[ng-repeat], option[data-ng-repeat]'), repeatOption.length && (repeatAttr = repeatOption.attr('ng-repeat') || repeatOption.attr('data-ng-repeat'), watch = jQuery.trim(repeatAttr.split('|')[0]).split(' ').pop())), function (scope, elm, attrs, controller) {
          var opts = angular.extend({}, options, scope.$eval(attrs.uiSelect2));
          if (isSelect ? (delete opts.multiple, delete opts.initSelection) : isMultiple && (opts.multiple = !0), controller && (controller.$render = function () {
              isSelect ? elm.select2('val', controller.$modelValue) : isMultiple ? controller.$modelValue ? angular.isArray(controller.$modelValue) ? elm.select2('data', controller.$modelValue) : elm.select2('val', controller.$modelValue) : elm.select2('data', []) : angular.isObject(controller.$modelValue) ? elm.select2('data', controller.$modelValue) : elm.select2('val', controller.$modelValue);
            }, watch && scope.$watch(watch, function (newVal) {
              newVal && $timeout(function () {
                elm.select2('val', controller.$viewValue), elm.trigger('change');
              });
            }), !isSelect && (elm.bind('change', function () {
              scope.$apply(function () {
                controller.$setViewValue(elm.select2('data'));
              });
            }), opts.initSelection))) {
            var initSelection = opts.initSelection;
            opts.initSelection = function (element, callback) {
              initSelection(element, function (value) {
                controller.$setViewValue(value), callback(value);
              });
            };
          }
          attrs.$observe('disabled', function (value) {
            elm.select2(value && 'disable' || 'enable');
          }), attrs.ngMultiple && scope.$watch(attrs.ngMultiple, function () {
            elm.select2(opts);
          }), elm.val(scope.$eval(attrs.ngModel)), $timeout(function () {
            elm.select2(opts), opts.initSelection || isSelect || controller.$setViewValue(elm.select2('data'));
          });
        };
      }
    };
  }
]), angular.module('ui.directives').directive('uiShow', [function () {
    return function (scope, elm, attrs) {
      scope.$watch(attrs.uiShow, function (newVal) {
        newVal ? elm.addClass('ui-show') : elm.removeClass('ui-show');
      });
    };
  }]).directive('uiHide', [function () {
    return function (scope, elm, attrs) {
      scope.$watch(attrs.uiHide, function (newVal) {
        newVal ? elm.addClass('ui-hide') : elm.removeClass('ui-hide');
      });
    };
  }]).directive('uiToggle', [function () {
    return function (scope, elm, attrs) {
      scope.$watch(attrs.uiToggle, function (newVal) {
        newVal ? elm.removeClass('ui-hide').addClass('ui-show') : elm.removeClass('ui-show').addClass('ui-hide');
      });
    };
  }]), angular.module('ui.directives').directive('uiSortable', [
  'ui.config',
  function (uiConfig) {
    return {
      require: '?ngModel',
      link: function (scope, element, attrs, ngModel) {
        var onReceive, onRemove, onStart, onUpdate, opts, _receive, _remove, _start, _update;
        opts = angular.extend({}, uiConfig.sortable, scope.$eval(attrs.uiSortable)), ngModel && (ngModel.$render = function () {
          element.sortable('refresh');
        }, onStart = function (e, ui) {
          ui.item.sortable = { index: ui.item.index() };
        }, onUpdate = function (e, ui) {
          ui.item.sortable.resort = ngModel;
        }, onReceive = function (e, ui) {
          ui.item.sortable.relocate = !0, ngModel.$modelValue.splice(ui.item.index(), 0, ui.item.sortable.moved);
        }, onRemove = function (e, ui) {
          ui.item.sortable.moved = 1 === ngModel.$modelValue.length ? ngModel.$modelValue.splice(0, 1)[0] : ngModel.$modelValue.splice(ui.item.sortable.index, 1)[0];
        }, onStop = function (e, ui) {
          if (ui.item.sortable.resort && !ui.item.sortable.relocate) {
            var end, start;
            start = ui.item.sortable.index, end = ui.item.index(), end > start && end--, ui.item.sortable.resort.$modelValue.splice(end, 0, ui.item.sortable.resort.$modelValue.splice(start, 1)[0]);
          }
          (ui.item.sortable.resort || ui.item.sortable.relocate) && scope.$apply();
        }, _start = opts.start, opts.start = function (e, ui) {
          onStart(e, ui), 'function' == typeof _start && _start(e, ui);
        }, _stop = opts.stop, opts.stop = function (e, ui) {
          onStop(e, ui), 'function' == typeof _stop && _stop(e, ui);
        }, _update = opts.update, opts.update = function (e, ui) {
          onUpdate(e, ui), 'function' == typeof _update && _update(e, ui);
        }, _receive = opts.receive, opts.receive = function (e, ui) {
          onReceive(e, ui), 'function' == typeof _receive && _receive(e, ui);
        }, _remove = opts.remove, opts.remove = function (e, ui) {
          onRemove(e, ui), 'function' == typeof _remove && _remove(e, ui);
        }), element.sortable(opts);
      }
    };
  }
]), angular.module('ui.directives').directive('uiTinymce', [
  'ui.config',
  function (uiConfig) {
    return uiConfig.tinymce = uiConfig.tinymce || {}, {
      require: 'ngModel',
      link: function (scope, elm, attrs, ngModel) {
        var expression, options = {
            onchange_callback: function (inst) {
              inst.isDirty() && (inst.save(), ngModel.$setViewValue(elm.val()), scope.$$phase || scope.$apply());
            },
            handle_event_callback: function () {
              return this.isDirty() && (this.save(), ngModel.$setViewValue(elm.val()), scope.$$phase || scope.$apply()), !0;
            },
            setup: function (ed) {
              ed.onSetContent.add(function (ed) {
                ed.isDirty() && (ed.save(), ngModel.$setViewValue(elm.val()), scope.$$phase || scope.$apply());
              });
            }
          };
        expression = attrs.uiTinymce ? scope.$eval(attrs.uiTinymce) : {}, angular.extend(options, uiConfig.tinymce, expression), setTimeout(function () {
          elm.tinymce(options);
        });
      }
    };
  }
]), angular.module('ui.directives').directive('uiValidate', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
      var validateFn, watch, validators = {}, validateExpr = scope.$eval(attrs.uiValidate);
      validateExpr && (angular.isString(validateExpr) && (validateExpr = { validator: validateExpr }), angular.forEach(validateExpr, function (expression, key) {
        validateFn = function (valueToValidate) {
          return scope.$eval(expression, { $value: valueToValidate }) ? (ctrl.$setValidity(key, !0), valueToValidate) : void ctrl.$setValidity(key, !1);
        }, validators[key] = validateFn, ctrl.$formatters.push(validateFn), ctrl.$parsers.push(validateFn);
      }), attrs.uiValidateWatch && (watch = scope.$eval(attrs.uiValidateWatch), angular.isString(watch) ? scope.$watch(watch, function () {
        angular.forEach(validators, function (validatorFn) {
          validatorFn(ctrl.$modelValue);
        });
      }) : angular.forEach(watch, function (expression, key) {
        scope.$watch(expression, function () {
          validators[key](ctrl.$modelValue);
        });
      })));
    }
  };
}), angular.module('ui.filters').filter('format', function () {
  return function (value, replace) {
    if (!value)
      return value;
    var token, target = value.toString();
    return void 0 === replace ? target : angular.isArray(replace) || angular.isObject(replace) ? (token = angular.isArray(replace) && '$' || ':', angular.forEach(replace, function (value, key) {
      target = target.split(token + key).join(value);
    }), target) : target.split('$0').join(replace);
  };
}), angular.module('ui.filters').filter('highlight', function () {
  return function (text, search, caseSensitive) {
    return search || angular.isNumber(search) ? (text = text.toString(), search = search.toString(), caseSensitive ? text.split(search).join('<span class="ui-match">' + search + '</span>') : text.replace(new RegExp(search, 'gi'), '<span class="ui-match">$&</span>')) : text;
  };
}), angular.module('ui.filters').filter('inflector', function () {
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
        return value = value.substr(0, 1).toLowerCase() + ucwords(value.split('_').join(' ')).substr(1).split(' ').join('');
      }
    };
  return function (text, inflector) {
    return inflector !== !1 && angular.isString(text) ? (inflector = inflector || 'humanize', inflectors[inflector](text)) : text;
  };
}), angular.module('ui.filters').filter('unique', function () {
  return function (items, filterOn) {
    if (filterOn === !1)
      return items;
    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
      var newItems = [], extractValueToCompare = function (item) {
          return angular.isObject(item) && angular.isString(filterOn) ? item[filterOn] : item;
        };
      angular.forEach(items, function (item) {
        for (var isDuplicate = !1, i = 0; i < newItems.length; i++)
          if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
            isDuplicate = !0;
            break;
          }
        isDuplicate || newItems.push(item);
      }), items = newItems;
    }
    return items;
  };
}), angular.module('ui.bootstrap', [
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
]), angular.module('ui.bootstrap.tpls', [
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
]), angular.module('ui.bootstrap.accordion', ['ui.bootstrap.collapse']).constant('accordionConfig', { closeOthers: !0 }).controller('AccordionController', [
  '$scope',
  '$attrs',
  'accordionConfig',
  function ($scope, $attrs, accordionConfig) {
    this.groups = [], this.closeOthers = function (openGroup) {
      var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
      closeOthers && angular.forEach(this.groups, function (group) {
        group !== openGroup && (group.isOpen = !1);
      });
    }, this.addGroup = function (groupScope) {
      var that = this;
      this.groups.push(groupScope), groupScope.$on('$destroy', function () {
        that.removeGroup(groupScope);
      });
    }, this.removeGroup = function (group) {
      var index = this.groups.indexOf(group);
      -1 !== index && this.groups.splice(this.groups.indexOf(group), 1);
    };
  }
]).directive('accordion', function () {
  return {
    restrict: 'EA',
    controller: 'AccordionController',
    transclude: !0,
    replace: !1,
    templateUrl: 'template/accordion/accordion.html'
  };
}).directive('accordionGroup', [
  '$parse',
  '$transition',
  '$timeout',
  function ($parse) {
    return {
      require: '^accordion',
      restrict: 'EA',
      transclude: !0,
      replace: !0,
      templateUrl: 'template/accordion/accordion-group.html',
      scope: { heading: '@' },
      controller: [
        '$scope',
        function () {
          this.setHeading = function (element) {
            this.heading = element;
          };
        }
      ],
      link: function (scope, element, attrs, accordionCtrl) {
        var getIsOpen, setIsOpen;
        accordionCtrl.addGroup(scope), scope.isOpen = !1, attrs.isOpen && (getIsOpen = $parse(attrs.isOpen), setIsOpen = getIsOpen.assign, scope.$watch(function () {
          return getIsOpen(scope.$parent);
        }, function (value) {
          scope.isOpen = value;
        }), scope.isOpen = getIsOpen ? getIsOpen(scope.$parent) : !1), scope.$watch('isOpen', function (value) {
          value && accordionCtrl.closeOthers(scope), setIsOpen && setIsOpen(scope.$parent, value);
        });
      }
    };
  }
]).directive('accordionHeading', function () {
  return {
    restrict: 'E',
    transclude: !0,
    template: '',
    replace: !0,
    require: '^accordionGroup',
    compile: function (element, attr, transclude) {
      return function (scope, element, attr, accordionGroupCtrl) {
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
        heading && (element.html(''), element.append(heading));
      });
    }
  };
}), angular.module('ui.bootstrap.alert', []).directive('alert', function () {
  return {
    restrict: 'EA',
    templateUrl: 'template/alert/alert.html',
    transclude: !0,
    replace: !0,
    scope: {
      type: '=',
      close: '&'
    }
  };
}), angular.module('ui.bootstrap.buttons', []).constant('buttonConfig', {
  activeClass: 'active',
  toggleEvent: 'click'
}).directive('btnRadio', [
  'buttonConfig',
  function (buttonConfig) {
    var activeClass = buttonConfig.activeClass || 'active', toggleEvent = buttonConfig.toggleEvent || 'click';
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
        var value = scope.$eval(attrs.btnRadio);
        scope.$watch(function () {
          return ngModelCtrl.$modelValue;
        }, function (modelValue) {
          angular.equals(modelValue, value) ? element.addClass(activeClass) : element.removeClass(activeClass);
        }), element.bind(toggleEvent, function () {
          element.hasClass(activeClass) || scope.$apply(function () {
            ngModelCtrl.$setViewValue(value);
          });
        });
      }
    };
  }
]).directive('btnCheckbox', [
  'buttonConfig',
  function (buttonConfig) {
    var activeClass = buttonConfig.activeClass || 'active', toggleEvent = buttonConfig.toggleEvent || 'click';
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
        var trueValue = scope.$eval(attrs.btnCheckboxTrue), falseValue = scope.$eval(attrs.btnCheckboxFalse);
        trueValue = angular.isDefined(trueValue) ? trueValue : !0, falseValue = angular.isDefined(falseValue) ? falseValue : !1, scope.$watch(function () {
          return ngModelCtrl.$modelValue;
        }, function (modelValue) {
          angular.equals(modelValue, trueValue) ? element.addClass(activeClass) : element.removeClass(activeClass);
        }), element.bind(toggleEvent, function () {
          scope.$apply(function () {
            ngModelCtrl.$setViewValue(element.hasClass(activeClass) ? falseValue : trueValue);
          });
        });
      }
    };
  }
]), angular.module('ui.bootstrap.carousel', ['ui.bootstrap.transition']).controller('CarouselController', [
  '$scope',
  '$timeout',
  '$transition',
  '$q',
  function ($scope, $timeout, $transition) {
    function restartTimer() {
      function go() {
        isPlaying ? ($scope.next(), restartTimer()) : $scope.pause();
      }
      currentTimeout && $timeout.cancel(currentTimeout);
      var interval = +$scope.interval;
      !isNaN(interval) && interval >= 0 && (currentTimeout = $timeout(go, interval));
    }
    var currentTimeout, isPlaying, self = this, slides = self.slides = [], currentIndex = -1;
    self.currentSlide = null, self.select = function (nextSlide, direction) {
      function goNext() {
        self.currentSlide && angular.isString(direction) && !$scope.noTransition && nextSlide.$element ? (nextSlide.$element.addClass(direction), nextSlide.$element[0].offsetWidth = nextSlide.$element[0].offsetWidth, angular.forEach(slides, function (slide) {
          angular.extend(slide, {
            direction: '',
            entering: !1,
            leaving: !1,
            active: !1
          });
        }), angular.extend(nextSlide, {
          direction: direction,
          active: !0,
          entering: !0
        }), angular.extend(self.currentSlide || {}, {
          direction: direction,
          leaving: !0
        }), $scope.$currentTransition = $transition(nextSlide.$element, {}), function (next, current) {
          $scope.$currentTransition.then(function () {
            transitionDone(next, current);
          }, function () {
            transitionDone(next, current);
          });
        }(nextSlide, self.currentSlide)) : transitionDone(nextSlide, self.currentSlide), self.currentSlide = nextSlide, currentIndex = nextIndex, restartTimer();
      }
      function transitionDone(next, current) {
        angular.extend(next, {
          direction: '',
          active: !0,
          leaving: !1,
          entering: !1
        }), angular.extend(current || {}, {
          direction: '',
          active: !1,
          leaving: !1,
          entering: !1
        }), $scope.$currentTransition = null;
      }
      var nextIndex = slides.indexOf(nextSlide);
      void 0 === direction && (direction = nextIndex > currentIndex ? 'next' : 'prev'), nextSlide && nextSlide !== self.currentSlide && ($scope.$currentTransition ? ($scope.$currentTransition.cancel(), $timeout(goNext)) : goNext());
    }, self.indexOfSlide = function (slide) {
      return slides.indexOf(slide);
    }, $scope.next = function () {
      var newIndex = (currentIndex + 1) % slides.length;
      return self.select(slides[newIndex], 'next');
    }, $scope.prev = function () {
      var newIndex = 0 > currentIndex - 1 ? slides.length - 1 : currentIndex - 1;
      return self.select(slides[newIndex], 'prev');
    }, $scope.select = function (slide) {
      self.select(slide);
    }, $scope.isActive = function (slide) {
      return self.currentSlide === slide;
    }, $scope.slides = function () {
      return slides;
    }, $scope.$watch('interval', restartTimer), $scope.play = function () {
      isPlaying || (isPlaying = !0, restartTimer());
    }, $scope.pause = function () {
      isPlaying = !1, currentTimeout && $timeout.cancel(currentTimeout);
    }, self.addSlide = function (slide, element) {
      slide.$element = element, slides.push(slide), 1 === slides.length || slide.active ? (self.select(slides[slides.length - 1]), 1 == slides.length && $scope.play()) : slide.active = !1;
    }, self.removeSlide = function (slide) {
      var index = slides.indexOf(slide);
      slides.splice(index, 1), slides.length > 0 && slide.active && self.select(index >= slides.length ? slides[index - 1] : slides[index]);
    };
  }
]).directive('carousel', [function () {
    return {
      restrict: 'EA',
      transclude: !0,
      replace: !0,
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
      transclude: !0,
      replace: !0,
      templateUrl: 'template/carousel/slide.html',
      scope: { active: '=' },
      link: function (scope, element, attrs, carouselCtrl) {
        carouselCtrl.addSlide(scope, element), scope.$on('$destroy', function () {
          carouselCtrl.removeSlide(scope);
        }), scope.$watch('active', function (active) {
          active && carouselCtrl.select(scope);
        });
      }
    };
  }]), angular.module('ui.bootstrap.collapse', ['ui.bootstrap.transition']).directive('collapse', [
  '$transition',
  function ($transition) {
    var fixUpHeight = function (scope, element, height) {
      element.removeClass('collapse'), element.css({ height: height });
      element[0].offsetWidth;
      element.addClass('collapse');
    };
    return {
      link: function (scope, element, attrs) {
        var isCollapsed, initialAnimSkip = !0;
        scope.$watch(function () {
          return element[0].scrollHeight;
        }, function () {
          0 !== element[0].scrollHeight && (isCollapsed || (initialAnimSkip ? fixUpHeight(scope, element, element[0].scrollHeight + 'px') : fixUpHeight(scope, element, 'auto')));
        }), scope.$watch(attrs.collapse, function (value) {
          value ? collapse() : expand();
        });
        var currentTransition, doTransition = function (change) {
            return currentTransition && currentTransition.cancel(), currentTransition = $transition(element, change), currentTransition.then(function () {
              currentTransition = void 0;
            }, function () {
              currentTransition = void 0;
            }), currentTransition;
          }, expand = function () {
            initialAnimSkip ? (initialAnimSkip = !1, isCollapsed || fixUpHeight(scope, element, 'auto')) : doTransition({ height: element[0].scrollHeight + 'px' }).then(function () {
              isCollapsed || fixUpHeight(scope, element, 'auto');
            }), isCollapsed = !1;
          }, collapse = function () {
            isCollapsed = !0, initialAnimSkip ? (initialAnimSkip = !1, fixUpHeight(scope, element, 0)) : (fixUpHeight(scope, element, element[0].scrollHeight + 'px'), doTransition({ height: '0' }));
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
    $scope.title = model.title, $scope.message = model.message, $scope.buttons = model.buttons, $scope.close = function (res) {
      dialog.close(res);
    };
  }
]), dialogModule.provider('$dialog', function () {
  var defaults = {
      backdrop: !0,
      dialogClass: 'modal',
      backdropClass: 'modal-backdrop',
      transitionClass: 'fade',
      triggerClass: 'in',
      dialogOpenClass: 'modal-open',
      resolve: {},
      backdropFade: !1,
      dialogFade: !1,
      keyboard: !0,
      backdropClick: !0
    }, globalOptions = {}, activeBackdrops = { value: 0 };
  this.options = function (value) {
    globalOptions = value;
  }, this.$get = [
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
      function createElement(clazz) {
        var el = angular.element('<div>');
        return el.addClass(clazz), el;
      }
      function Dialog(opts) {
        var self = this, options = this.options = angular.extend({}, defaults, globalOptions, opts);
        this.backdropEl = createElement(options.backdropClass), options.backdropFade && (this.backdropEl.addClass(options.transitionClass), this.backdropEl.removeClass(options.triggerClass)), this.modalEl = createElement(options.dialogClass), options.dialogFade && (this.modalEl.addClass(options.transitionClass), this.modalEl.removeClass(options.triggerClass)), this.handledEscapeKey = function (e) {
          27 === e.which && (self.close(), e.preventDefault(), self.$scope.$apply());
        }, this.handleBackDropClick = function (e) {
          self.close(), e.preventDefault(), self.$scope.$apply();
        };
      }
      var body = $document.find('body');
      return Dialog.prototype.isOpen = function () {
        return this._open;
      }, Dialog.prototype.open = function (templateUrl, controller) {
        var self = this, options = this.options;
        if (templateUrl && (options.templateUrl = templateUrl), controller && (options.controller = controller), !options.template && !options.templateUrl)
          throw new Error('Dialog.open expected template or templateUrl, neither found. Use options or open method to specify them.');
        return this._loadResolves().then(function (locals) {
          var $scope = locals.$scope = self.$scope = locals.$scope ? locals.$scope : $rootScope.$new();
          if (self.modalEl.html(locals.$template), self.options.controller) {
            var ctrl = $controller(self.options.controller, locals);
            self.modalEl.contents().data('ngControllerController', ctrl);
          }
          $compile(self.modalEl)($scope), self._addElementsToDom(), body.addClass(self.options.dialogOpenClass), setTimeout(function () {
            self.options.dialogFade && self.modalEl.addClass(self.options.triggerClass), self.options.backdropFade && self.backdropEl.addClass(self.options.triggerClass);
          }), self._bindEvents();
        }), this.deferred = $q.defer(), this.deferred.promise;
      }, Dialog.prototype.close = function (result) {
        function removeTriggerClass(el) {
          el.removeClass(self.options.triggerClass);
        }
        function onCloseComplete() {
          self._open && self._onCloseComplete(result);
        }
        var self = this, fadingElements = this._getFadingElements();
        if (body.removeClass(self.options.dialogOpenClass), fadingElements.length > 0)
          for (var i = fadingElements.length - 1; i >= 0; i--)
            $transition(fadingElements[i], removeTriggerClass).then(onCloseComplete);
        else
          this._onCloseComplete(result);
      }, Dialog.prototype._getFadingElements = function () {
        var elements = [];
        return this.options.dialogFade && elements.push(this.modalEl), this.options.backdropFade && elements.push(this.backdropEl), elements;
      }, Dialog.prototype._bindEvents = function () {
        this.options.keyboard && body.bind('keydown', this.handledEscapeKey), this.options.backdrop && this.options.backdropClick && this.backdropEl.bind('click', this.handleBackDropClick);
      }, Dialog.prototype._unbindEvents = function () {
        this.options.keyboard && body.unbind('keydown', this.handledEscapeKey), this.options.backdrop && this.options.backdropClick && this.backdropEl.unbind('click', this.handleBackDropClick);
      }, Dialog.prototype._onCloseComplete = function (result) {
        this._removeElementsFromDom(), this._unbindEvents(), this.deferred.resolve(result);
      }, Dialog.prototype._addElementsToDom = function () {
        body.append(this.modalEl), this.options.backdrop && (0 === activeBackdrops.value && body.append(this.backdropEl), activeBackdrops.value++), this._open = !0;
      }, Dialog.prototype._removeElementsFromDom = function () {
        this.modalEl.remove(), this.options.backdrop && (activeBackdrops.value--, 0 === activeBackdrops.value && this.backdropEl.remove()), this._open = !1;
      }, Dialog.prototype._loadResolves = function () {
        var templatePromise, values = [], keys = [], self = this;
        return this.options.template ? templatePromise = $q.when(this.options.template) : this.options.templateUrl && (templatePromise = $http.get(this.options.templateUrl, { cache: $templateCache }).then(function (response) {
          return response.data;
        })), angular.forEach(this.options.resolve || [], function (value, key) {
          keys.push(key), values.push(angular.isString(value) ? $injector.get(value) : $injector.invoke(value));
        }), keys.push('$template'), values.push(templatePromise), $q.all(values).then(function (values) {
          var locals = {};
          return angular.forEach(values, function (value, index) {
            locals[keys[index]] = value;
          }), locals.dialog = self, locals;
        });
      }, {
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
}), angular.module('ui.bootstrap.dropdownToggle', []).directive('dropdownToggle', [
  '$document',
  '$location',
  '$window',
  function ($document, $location) {
    var close, openElement = null;
    return {
      restrict: 'CA',
      link: function (scope, element) {
        scope.$watch(function () {
          return $location.path();
        }, function () {
          close && close();
        }), element.parent().bind('click', function () {
          close && close();
        }), element.bind('click', function (event) {
          event.preventDefault(), event.stopPropagation();
          var iWasOpen = !1;
          openElement && (iWasOpen = openElement === element, close()), iWasOpen || (element.parent().addClass('open'), openElement = element, close = function (event) {
            event && (event.preventDefault(), event.stopPropagation()), $document.unbind('click', close), element.parent().removeClass('open'), close = null, openElement = null;
          }, $document.bind('click', close));
        });
      }
    };
  }
]), angular.module('ui.bootstrap.modal', ['ui.bootstrap.dialog']).directive('modal', [
  '$parse',
  '$dialog',
  function ($parse, $dialog) {
    angular.element(document.getElementsByTagName('body')[0]);
    return {
      restrict: 'EA',
      terminal: !0,
      link: function (scope, elm, attrs) {
        var setClosed, opts = angular.extend({}, scope.$eval(attrs.uiOptions || attrs.bsOptions || attrs.options)), shownExpr = attrs.modal || attrs.show;
        opts = angular.extend(opts, {
          template: elm.html(),
          resolve: {
            $scope: function () {
              return scope;
            }
          }
        });
        var dialog = $dialog.dialog(opts);
        elm.remove(), setClosed = attrs.close ? function () {
          $parse(attrs.close)(scope);
        } : function () {
          angular.isFunction($parse(shownExpr).assign) && $parse(shownExpr).assign(scope, !1);
        }, scope.$watch(shownExpr, function (isShown) {
          isShown ? dialog.open().then(function () {
            setClosed();
          }) : dialog.isOpen() && dialog.close();
        });
      }
    };
  }
]), angular.module('ui.bootstrap.pagination', []).constant('paginationConfig', {
  boundaryLinks: !1,
  directionLinks: !0,
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
      replace: !0,
      link: function (scope, element, attrs) {
        function makePage(number, text, isActive, isDisabled) {
          return {
            number: number,
            text: text,
            active: isActive,
            disabled: isDisabled
          };
        }
        var boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$eval(attrs.boundaryLinks) : paginationConfig.boundaryLinks, directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$eval(attrs.directionLinks) : paginationConfig.directionLinks, firstText = angular.isDefined(attrs.firstText) ? attrs.firstText : paginationConfig.firstText, previousText = angular.isDefined(attrs.previousText) ? attrs.previousText : paginationConfig.previousText, nextText = angular.isDefined(attrs.nextText) ? attrs.nextText : paginationConfig.nextText, lastText = angular.isDefined(attrs.lastText) ? attrs.lastText : paginationConfig.lastText;
        scope.$watch('numPages + currentPage + maxSize', function () {
          scope.pages = [];
          var maxSize = scope.maxSize && scope.maxSize < scope.numPages ? scope.maxSize : scope.numPages, startPage = scope.currentPage - Math.floor(maxSize / 2);
          1 > startPage && (startPage = 1), startPage + maxSize - 1 > scope.numPages && (startPage -= startPage + maxSize - 1 - scope.numPages);
          for (var number = startPage, max = startPage + maxSize; max > number; number++) {
            var page = makePage(number, number, scope.isActive(number), !1);
            scope.pages.push(page);
          }
          if (directionLinks) {
            var previousPage = makePage(scope.currentPage - 1, previousText, !1, scope.noPrevious());
            scope.pages.unshift(previousPage);
            var nextPage = makePage(scope.currentPage + 1, nextText, !1, scope.noNext());
            scope.pages.push(nextPage);
          }
          if (boundaryLinks) {
            var firstPage = makePage(1, firstText, !1, scope.noPrevious());
            scope.pages.unshift(firstPage);
            var lastPage = makePage(scope.numPages, lastText, !1, scope.noNext());
            scope.pages.push(lastPage);
          }
          scope.currentPage > scope.numPages && scope.selectPage(scope.numPages);
        }), scope.noPrevious = function () {
          return 1 === scope.currentPage;
        }, scope.noNext = function () {
          return scope.currentPage === scope.numPages;
        }, scope.isActive = function (page) {
          return scope.currentPage === page;
        }, scope.selectPage = function (page) {
          !scope.isActive(page) && page > 0 && page <= scope.numPages && (scope.currentPage = page, scope.onSelectPage({ page: page }));
        };
      }
    };
  }
]), angular.module('ui.bootstrap.popover', []).directive('popoverPopup', function () {
  return {
    restrict: 'EA',
    replace: !0,
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
    var template = '<popover-popup popover-title="{{tt_title}}" popover-content="{{tt_popover}}" placement="{{tt_placement}}" animation="tt_animation()" is-open="tt_isOpen"></popover-popup>';
    return {
      scope: !0,
      link: function (scope, element, attr) {
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
          switch (transitionTimeout && $timeout.cancel(transitionTimeout), popover.css({
              top: 0,
              left: 0,
              display: 'block'
            }), element.after(popover), position = getPosition(), ttWidth = popover.prop('offsetWidth'), ttHeight = popover.prop('offsetHeight'), scope.tt_placement) {
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
          }
          popover.css(ttPosition), scope.tt_isOpen = !0;
        }
        function hide() {
          scope.tt_isOpen = !1, angular.isDefined(scope.tt_animation) && scope.tt_animation() ? transitionTimeout = $timeout(function () {
            popover.remove();
          }, 500) : popover.remove();
        }
        var transitionTimeout, popover = $compile(template)(scope);
        attr.$observe('popover', function (val) {
          scope.tt_popover = val;
        }), attr.$observe('popoverTitle', function (val) {
          scope.tt_title = val;
        }), attr.$observe('popoverPlacement', function (val) {
          scope.tt_placement = val || 'top';
        }), attr.$observe('popoverAnimation', function (val) {
          scope.tt_animation = $parse(val);
        }), scope.tt_isOpen = !1, element.bind('click', function () {
          scope.$apply(scope.tt_isOpen ? hide : show);
        });
      }
    };
  }
]), angular.module('ui.bootstrap.tabs', []).controller('TabsController', [
  '$scope',
  '$element',
  function ($scope) {
    var panes = $scope.panes = [];
    this.select = $scope.select = function (pane) {
      angular.forEach(panes, function (pane) {
        pane.selected = !1;
      }), pane.selected = !0;
    }, this.addPane = function (pane) {
      panes.length || $scope.select(pane), panes.push(pane);
    }, this.removePane = function (pane) {
      var index = panes.indexOf(pane);
      panes.splice(index, 1), pane.selected && panes.length > 0 && $scope.select(panes[index < panes.length ? index : index - 1]);
    };
  }
]).directive('tabs', function () {
  return {
    restrict: 'EA',
    transclude: !0,
    scope: {},
    controller: 'TabsController',
    templateUrl: 'template/tabs/tabs.html',
    replace: !0
  };
}).directive('pane', [
  '$parse',
  function ($parse) {
    return {
      require: '^tabs',
      restrict: 'EA',
      transclude: !0,
      scope: { heading: '@' },
      link: function (scope, element, attrs, tabsCtrl) {
        var getSelected, setSelected;
        scope.selected = !1, attrs.active && (getSelected = $parse(attrs.active), setSelected = getSelected.assign, scope.$watch(function () {
          return getSelected(scope.$parent);
        }, function (value) {
          scope.selected = value;
        }), scope.selected = getSelected ? getSelected(scope.$parent) : !1), scope.$watch('selected', function (selected) {
          selected && tabsCtrl.select(scope), setSelected && setSelected(scope.$parent, selected);
        }), tabsCtrl.addPane(scope), scope.$on('$destroy', function () {
          tabsCtrl.removePane(scope);
        });
      },
      templateUrl: 'template/tabs/pane.html',
      replace: !0
    };
  }
]), angular.module('ui.bootstrap.tooltip', []).directive('tooltipPopup', function () {
  return {
    restrict: 'EA',
    replace: !0,
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
    var template = '<tooltip-popup tooltip-title="{{tt_tooltip}}" placement="{{tt_placement}}" animation="tt_animation()" is-open="tt_isOpen"></tooltip-popup>';
    return {
      scope: !0,
      link: function (scope, element, attr) {
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
          if (scope.tt_tooltip) {
            switch (transitionTimeout && $timeout.cancel(transitionTimeout), tooltip.css({
                top: 0,
                left: 0,
                display: 'block'
              }), element.after(tooltip), position = getPosition(), ttWidth = tooltip.prop('offsetWidth'), ttHeight = tooltip.prop('offsetHeight'), scope.tt_placement) {
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
            }
            tooltip.css(ttPosition), scope.tt_isOpen = !0;
          }
        }
        function hide() {
          scope.tt_isOpen = !1, angular.isDefined(scope.tt_animation) && scope.tt_animation() ? transitionTimeout = $timeout(function () {
            tooltip.remove();
          }, 500) : tooltip.remove();
        }
        var transitionTimeout, tooltip = $compile(template)(scope);
        attr.$observe('tooltip', function (val) {
          scope.tt_tooltip = val;
        }), attr.$observe('tooltipPlacement', function (val) {
          scope.tt_placement = val || 'top';
        }), attr.$observe('tooltipAnimation', function (val) {
          scope.tt_animation = $parse(val);
        }), scope.tt_isOpen = !1, element.bind('mouseenter', function () {
          scope.$apply(show);
        }), element.bind('mouseleave', function () {
          scope.$apply(hide);
        });
      }
    };
  }
]), angular.module('ui.bootstrap.transition', []).factory('$transition', [
  '$q',
  '$timeout',
  '$rootScope',
  function ($q, $timeout, $rootScope) {
    function findEndEventName(endEventNames) {
      for (var name in endEventNames)
        if (void 0 !== transElement.style[name])
          return endEventNames[name];
    }
    var $transition = function (element, trigger, options) {
        options = options || {};
        var deferred = $q.defer(), endEventName = $transition[options.animation ? 'animationEndEventName' : 'transitionEndEventName'], transitionEndHandler = function () {
            $rootScope.$apply(function () {
              element.unbind(endEventName, transitionEndHandler), deferred.resolve(element);
            });
          };
        return endEventName && element.bind(endEventName, transitionEndHandler), $timeout(function () {
          angular.isString(trigger) ? element.addClass(trigger) : angular.isFunction(trigger) ? trigger(element) : angular.isObject(trigger) && element.css(trigger), endEventName || deferred.resolve(element);
        }), deferred.promise.cancel = function () {
          endEventName && element.unbind(endEventName, transitionEndHandler), deferred.reject('Transition cancelled');
        }, deferred.promise;
      }, transElement = document.createElement('trans'), transitionEndEventNames = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd',
        msTransition: 'MSTransitionEnd',
        transition: 'transitionend'
      }, animationEndEventNames = {
        WebkitTransition: 'webkitAnimationEnd',
        MozTransition: 'animationend',
        OTransition: 'oAnimationEnd',
        msTransition: 'MSAnimationEnd',
        transition: 'animationend'
      };
    return $transition.transitionEndEventName = findEndEventName(transitionEndEventNames), $transition.animationEndEventName = findEndEventName(animationEndEventNames), $transition;
  }
]), angular.module('ui.bootstrap.typeahead', []).factory('typeaheadParser', [
  '$parse',
  function ($parse) {
    var TYPEAHEAD_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;
    return {
      parse: function (input) {
        var match = input.match(TYPEAHEAD_REGEXP);
        if (!match)
          throw new Error('Expected typeahead specification in form of \'_modelValue_ (as _label_)? for _item_ in _collection_\' but got \'' + input + '\'.');
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
        var selected = modelCtrl.$modelValue, minSearch = originalScope.$eval(attrs.typeaheadMinLength) || 1, parserResult = typeaheadParser.parse(attrs.typeahead), scope = originalScope.$new();
        originalScope.$on('$destroy', function () {
          scope.$destroy();
        });
        var resetMatches = function () {
            scope.matches = [], scope.activeIdx = -1;
          }, getMatchesAsync = function (inputValue) {
            var locals = { $viewValue: inputValue };
            $q.when(parserResult.source(scope, locals)).then(function (matches) {
              if (inputValue === modelCtrl.$viewValue)
                if (matches.length > 0) {
                  scope.activeIdx = 0, scope.matches.length = 0;
                  for (var i = 0; i < matches.length; i++)
                    locals[parserResult.itemName] = matches[i], scope.matches.push({
                      label: parserResult.viewMapper(scope, locals),
                      model: matches[i]
                    });
                  scope.query = inputValue;
                } else
                  resetMatches();
            }, resetMatches);
          };
        resetMatches(), scope.query = void 0, modelCtrl.$parsers.push(function (inputValue) {
          return resetMatches(), selected ? inputValue : void (inputValue && inputValue.length >= minSearch && getMatchesAsync(inputValue));
        }), modelCtrl.$render = function () {
          var locals = {};
          locals[parserResult.itemName] = selected, element.val(parserResult.viewMapper(scope, locals) || modelCtrl.$viewValue), selected = void 0;
        }, scope.select = function (activeIdx) {
          var locals = {};
          locals[parserResult.itemName] = selected = scope.matches[activeIdx].model, modelCtrl.$setViewValue(parserResult.modelMapper(scope, locals)), modelCtrl.$render();
        }, element.bind('keydown', function (evt) {
          0 !== scope.matches.length && -1 !== HOT_KEYS.indexOf(evt.which) && (evt.preventDefault(), 40 === evt.which ? (scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length, scope.$digest()) : 38 === evt.which ? (scope.activeIdx = (scope.activeIdx ? scope.activeIdx : scope.matches.length) - 1, scope.$digest()) : 13 === evt.which || 9 === evt.which ? scope.$apply(function () {
            scope.select(scope.activeIdx);
          }) : 27 === evt.which && (scope.matches = [], scope.$digest()));
        });
        var tplElCompiled = $compile('<typeahead-popup matches=\'matches\' active=\'activeIdx\' select=\'select(activeIdx)\' query=\'query\'></typeahead-popup>')(scope);
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
    replace: !0,
    templateUrl: 'template/typeahead/typeahead.html',
    link: function (scope) {
      scope.isOpen = function () {
        return scope.matches.length > 0;
      }, scope.isActive = function (matchIdx) {
        return scope.active == matchIdx;
      }, scope.selectActive = function (matchIdx) {
        scope.active = matchIdx;
      }, scope.selectMatch = function (activeIdx) {
        scope.select({ activeIdx: activeIdx });
      };
    }
  };
}).filter('typeaheadHighlight', function () {
  return function (matchItem, query) {
    return query ? matchItem.replace(new RegExp(query, 'gi'), '<strong>$&</strong>') : query;
  };
}), angular.module('template/accordion/accordion-group.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/accordion/accordion-group.html', '<div class="accordion-group">  <div class="accordion-heading" ><a class="accordion-toggle" ng-click="isOpen = !isOpen" accordion-transclude="heading">{{heading}}</a></div>  <div class="accordion-body" collapse="!isOpen">    <div class="accordion-inner" ng-transclude></div>  </div></div>');
  }
]), angular.module('template/accordion/accordion.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/accordion/accordion.html', '<div class="accordion" ng-transclude></div>');
  }
]), angular.module('template/alert/alert.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/alert/alert.html', '<div class=\'alert\' ng-class=\'type && "alert-" + type\'>    <button type=\'button\' class=\'close\' ng-click=\'close()\'>&times;</button>    <div ng-transclude></div></div>');
  }
]), angular.module('template/carousel/carousel.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/carousel/carousel.html', '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel">    <ol class="carousel-indicators">        <li ng-repeat="slide in slides()" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>    </ol>    <div class="carousel-inner" ng-transclude></div>    <a ng-click="prev()" class="carousel-control left">&lsaquo;</a>    <a ng-click="next()" class="carousel-control right">&rsaquo;</a></div>');
  }
]), angular.module('template/carousel/slide.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/carousel/slide.html', '<div ng-class="{    \'active\': leaving || (active && !entering),    \'prev\': (next || active) && direction==\'prev\',    \'next\': (next || active) && direction==\'next\',    \'right\': direction==\'prev\',    \'left\': direction==\'next\'  }" class="item" ng-transclude></div>');
  }
]), angular.module('template/dialog/message.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/dialog/message.html', '<div class="modal-header">\t<h1>{{ title }}</h1></div><div class="modal-body">\t<p>{{ message }}</p></div><div class="modal-footer">\t<button ng-repeat="btn in buttons" ng-click="close(btn.result)" class=btn ng-class="btn.cssClass">{{ btn.label }}</button></div>');
  }
]), angular.module('template/pagination/pagination.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/pagination/pagination.html', '<div class="pagination"><ul>  <li ng-repeat="page in pages" ng-class="{active: page.active, disabled: page.disabled}"><a ng-click="selectPage(page.number)">{{page.text}}</a></li>  </ul></div>');
  }
]), angular.module('template/popover/popover.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/popover/popover.html', '<div class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">  <div class="arrow"></div>  <div class="popover-inner">      <h3 class="popover-title" ng-bind="popoverTitle" ng-show="popoverTitle"></h3>      <div class="popover-content" ng-bind="popoverContent"></div>  </div></div>');
  }
]), angular.module('template/tabs/pane.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/tabs/pane.html', '<div class="tab-pane" ng-class="{active: selected}" ng-show="selected" ng-transclude></div>');
  }
]), angular.module('template/tabs/tabs.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/tabs/tabs.html', '<div class="tabbable">  <ul class="nav nav-tabs">    <li ng-repeat="pane in panes" ng-class="{active:pane.selected}">      <a href="" ng-click="select(pane)">{{pane.heading}}</a>    </li>  </ul>  <div class="tab-content" ng-transclude></div></div>');
  }
]), angular.module('template/tooltip/tooltip-popup.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/tooltip/tooltip-popup.html', '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">  <div class="tooltip-arrow"></div>  <div class="tooltip-inner" ng-bind="tooltipTitle"></div></div>');
  }
]), angular.module('template/typeahead/typeahead.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/typeahead/typeahead.html', '<div class="dropdown clearfix" ng-class="{open: isOpen()}">    <ul class="typeahead dropdown-menu">        <li ng-repeat="match in matches" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)">            <a tabindex="-1" ng-click="selectMatch($index)" ng-bind-html-unsafe="match.label | typeaheadHighlight:query"></a>        </li>    </ul></div>');
  }
]), function (window, angular, undefined) {
  'use strict';
  angular.module('ngCookies', ['ng']).factory('$cookies', [
    '$rootScope',
    '$browser',
    function ($rootScope, $browser) {
      function push() {
        var name, value, browserCookies, updated;
        for (name in lastCookies)
          isUndefined(cookies[name]) && $browser.cookies(name, undefined);
        for (name in cookies)
          value = cookies[name], angular.isString(value) ? value !== lastCookies[name] && ($browser.cookies(name, value), updated = !0) : angular.isDefined(lastCookies[name]) ? cookies[name] = lastCookies[name] : delete cookies[name];
        if (updated) {
          updated = !1, browserCookies = $browser.cookies();
          for (name in cookies)
            cookies[name] !== browserCookies[name] && (isUndefined(browserCookies[name]) ? delete cookies[name] : cookies[name] = browserCookies[name], updated = !0);
        }
      }
      var lastBrowserCookies, cookies = {}, lastCookies = {}, runEval = !1, copy = angular.copy, isUndefined = angular.isUndefined;
      return $browser.addPollFn(function () {
        var currentCookies = $browser.cookies();
        lastBrowserCookies != currentCookies && (lastBrowserCookies = currentCookies, copy(currentCookies, lastCookies), copy(currentCookies, cookies), runEval && $rootScope.$apply());
      })(), runEval = !0, $rootScope.$watch(push), cookies;
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
}(window, window.angular), function (window, angular, undefined) {
  'use strict';
  angular.module('ngResource', ['ng']).factory('$resource', [
    '$http',
    '$parse',
    function ($http, $parse) {
      function encodeUriSegment(val) {
        return encodeUriQuery(val, !0).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
      }
      function encodeUriQuery(val, pctEncodeSpaces) {
        return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, pctEncodeSpaces ? '%20' : '+');
      }
      function Route(template, defaults) {
        this.template = template += '#', this.defaults = defaults || {};
        var urlParams = this.urlParams = {};
        forEach(template.split(/\W/), function (param) {
          param && new RegExp('(^|[^\\\\]):' + param + '\\W').test(template) && (urlParams[param] = !0);
        }), this.template = template.replace(/\\:/g, ':');
      }
      function ResourceFactory(url, paramDefaults, actions) {
        function extractParams(data, actionParams) {
          var ids = {};
          return actionParams = extend({}, paramDefaults, actionParams), forEach(actionParams, function (value, key) {
            ids[key] = value.charAt && '@' == value.charAt(0) ? getter(data, value.substr(1)) : value;
          }), ids;
        }
        function Resource(value) {
          copy(value || {}, this);
        }
        var route = new Route(url);
        return actions = extend({}, DEFAULT_ACTIONS, actions), forEach(actions, function (action, name) {
          action.method = angular.uppercase(action.method);
          var hasBody = 'POST' == action.method || 'PUT' == action.method || 'PATCH' == action.method;
          Resource[name] = function (a1, a2, a3, a4) {
            var data, params = {}, success = noop, error = null;
            switch (arguments.length) {
            case 4:
              error = a4, success = a3;
            case 3:
            case 2:
              if (!isFunction(a2)) {
                params = a1, data = a2, success = a3;
                break;
              }
              if (isFunction(a1)) {
                success = a1, error = a2;
                break;
              }
              success = a2, error = a3;
            case 1:
              isFunction(a1) ? success = a1 : hasBody ? data = a1 : params = a1;
              break;
            case 0:
              break;
            default:
              throw 'Expected between 0-4 arguments [params, data, success, error], got ' + arguments.length + ' arguments.';
            }
            var value = this instanceof Resource ? this : action.isArray ? [] : new Resource(data);
            return $http({
              method: action.method,
              url: route.url(extend({}, extractParams(data, action.params || {}), params)),
              data: data
            }).then(function (response) {
              var data = response.data;
              data && (action.isArray ? (value.length = 0, forEach(data, function (item) {
                value.push(new Resource(item));
              })) : copy(data, value)), (success || noop)(value, response.headers);
            }, error), value;
          }, Resource.prototype['$' + name] = function (a1, a2, a3) {
            var error, params = extractParams(this), success = noop;
            switch (arguments.length) {
            case 3:
              params = a1, success = a2, error = a3;
              break;
            case 2:
            case 1:
              isFunction(a1) ? (success = a1, error = a2) : (params = a1, success = a2 || noop);
            case 0:
              break;
            default:
              throw 'Expected between 1-3 arguments [params, success, error], got ' + arguments.length + ' arguments.';
            }
            var data = hasBody ? this : undefined;
            Resource[name].call(this, params, data, success, error);
          };
        }), Resource.bind = function (additionalParamDefaults) {
          return ResourceFactory(url, extend({}, paramDefaults, additionalParamDefaults), actions);
        }, Resource;
      }
      var DEFAULT_ACTIONS = {
          get: { method: 'GET' },
          save: { method: 'POST' },
          query: {
            method: 'GET',
            isArray: !0
          },
          remove: { method: 'DELETE' },
          'delete': { method: 'DELETE' }
        }, noop = angular.noop, forEach = angular.forEach, extend = angular.extend, copy = angular.copy, isFunction = angular.isFunction, getter = function (obj, path) {
          return $parse(path)(obj);
        };
      return Route.prototype = {
        url: function (params) {
          var val, encodedVal, self = this, url = this.template;
          params = params || {}, forEach(this.urlParams, function (_, urlParam) {
            val = params.hasOwnProperty(urlParam) ? params[urlParam] : self.defaults[urlParam], angular.isDefined(val) && null !== val ? (encodedVal = encodeUriSegment(val), url = url.replace(new RegExp(':' + urlParam + '(\\W)', 'g'), encodedVal + '$1')) : url = url.replace(new RegExp('(/?):' + urlParam + '(\\W)', 'g'), function (match, leadingSlashes, tail) {
              return '/' == tail.charAt(0) ? tail : leadingSlashes + tail;
            });
          }), url = url.replace(/\/?#$/, '');
          var query = [];
          return forEach(params, function (value, key) {
            self.urlParams[key] || query.push(encodeUriQuery(key) + '=' + encodeUriQuery(value));
          }), query.sort(), url = url.replace(/\/*$/, ''), url + (query.length ? '?' + query.join('&') : '');
        }
      }, ResourceFactory;
    }
  ]);
}(window, window.angular), function (window, angular) {
  'use strict';
  function makeMap(str) {
    var i, obj = {}, items = str.split(',');
    for (i = 0; i < items.length; i++)
      obj[items[i]] = !0;
    return obj;
  }
  function htmlParser(html, handler) {
    function parseStartTag(tag, tagName, rest, unary) {
      if (tagName = angular.lowercase(tagName), blockElements[tagName])
        for (; stack.last() && inlineElements[stack.last()];)
          parseEndTag('', stack.last());
      optionalEndTagElements[tagName] && stack.last() == tagName && parseEndTag('', tagName), unary = voidElements[tagName] || !!unary, unary || stack.push(tagName);
      var attrs = {};
      rest.replace(ATTR_REGEXP, function (match, name, doubleQuotedValue, singleQuotedValue, unquotedValue) {
        var value = doubleQuotedValue || singleQuotedValue || unquotedValue || '';
        attrs[name] = decodeEntities(value);
      }), handler.start && handler.start(tagName, attrs, unary);
    }
    function parseEndTag(tag, tagName) {
      var i, pos = 0;
      if (tagName = angular.lowercase(tagName))
        for (pos = stack.length - 1; pos >= 0 && stack[pos] != tagName; pos--);
      if (pos >= 0) {
        for (i = stack.length - 1; i >= pos; i--)
          handler.end && handler.end(stack[i]);
        stack.length = pos;
      }
    }
    var index, chars, match, stack = [], last = html;
    for (stack.last = function () {
        return stack[stack.length - 1];
      }; html;) {
      if (chars = !0, stack.last() && specialElements[stack.last()])
        html = html.replace(new RegExp('(.*)<\\s*\\/\\s*' + stack.last() + '[^>]*>', 'i'), function (all, text) {
          return text = text.replace(COMMENT_REGEXP, '$1').replace(CDATA_REGEXP, '$1'), handler.chars && handler.chars(decodeEntities(text)), '';
        }), parseEndTag('', stack.last());
      else if (0 === html.indexOf('<!--') ? (index = html.indexOf('-->'), index >= 0 && (handler.comment && handler.comment(html.substring(4, index)), html = html.substring(index + 3), chars = !1)) : BEGING_END_TAGE_REGEXP.test(html) ? (match = html.match(END_TAG_REGEXP), match && (html = html.substring(match[0].length), match[0].replace(END_TAG_REGEXP, parseEndTag), chars = !1)) : BEGIN_TAG_REGEXP.test(html) && (match = html.match(START_TAG_REGEXP), match && (html = html.substring(match[0].length), match[0].replace(START_TAG_REGEXP, parseStartTag), chars = !1)), chars) {
        index = html.indexOf('<');
        var text = 0 > index ? html : html.substring(0, index);
        html = 0 > index ? '' : html.substring(index), handler.chars && handler.chars(decodeEntities(text));
      }
      if (html == last)
        throw 'Parse Error: ' + html;
      last = html;
    }
    parseEndTag();
  }
  function decodeEntities(value) {
    return hiddenPre.innerHTML = value.replace(/</g, '&lt;'), hiddenPre.innerText || hiddenPre.textContent || '';
  }
  function encodeEntities(value) {
    return value.replace(/&/g, '&amp;').replace(NON_ALPHANUMERIC_REGEXP, function (value) {
      return '&#' + value.charCodeAt(0) + ';';
    }).replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function htmlSanitizeWriter(buf) {
    var ignore = !1, out = angular.bind(buf, buf.push);
    return {
      start: function (tag, attrs, unary) {
        tag = angular.lowercase(tag), !ignore && specialElements[tag] && (ignore = tag), ignore || 1 != validElements[tag] || (out('<'), out(tag), angular.forEach(attrs, function (value, key) {
          var lkey = angular.lowercase(key);
          1 != validAttrs[lkey] || uriAttrs[lkey] === !0 && !value.match(URI_REGEXP) || (out(' '), out(key), out('="'), out(encodeEntities(value)), out('"'));
        }), out(unary ? '/>' : '>'));
      },
      end: function (tag) {
        tag = angular.lowercase(tag), ignore || 1 != validElements[tag] || (out('</'), out(tag), out('>')), tag == ignore && (ignore = !1);
      },
      chars: function (chars) {
        ignore || out(encodeEntities(chars));
      }
    };
  }
  var $sanitize = function (html) {
      var buf = [];
      return htmlParser(html, htmlSanitizeWriter(buf)), buf.join('');
    }, START_TAG_REGEXP = /^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/, END_TAG_REGEXP = /^<\s*\/\s*([\w:-]+)[^>]*>/, ATTR_REGEXP = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g, BEGIN_TAG_REGEXP = /^</, BEGING_END_TAGE_REGEXP = /^<\s*\//, COMMENT_REGEXP = /<!--(.*?)-->/g, CDATA_REGEXP = /<!\[CDATA\[(.*?)]]>/g, URI_REGEXP = /^((ftp|https?):\/\/|mailto:|#)/i, NON_ALPHANUMERIC_REGEXP = /([^\#-~| |!])/g, voidElements = makeMap('area,br,col,hr,img,wbr'), optionalEndTagBlockElements = makeMap('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'), optionalEndTagInlineElements = makeMap('rp,rt'), optionalEndTagElements = angular.extend({}, optionalEndTagInlineElements, optionalEndTagBlockElements), blockElements = angular.extend({}, optionalEndTagBlockElements, makeMap('address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul')), inlineElements = angular.extend({}, optionalEndTagInlineElements, makeMap('a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var')), specialElements = makeMap('script,style'), validElements = angular.extend({}, voidElements, blockElements, inlineElements, optionalEndTagElements), uriAttrs = makeMap('background,cite,href,longdesc,src,usemap'), validAttrs = angular.extend({}, uriAttrs, makeMap('abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,span,start,summary,target,title,type,valign,value,vspace,width')), hiddenPre = document.createElement('pre');
  angular.module('ngSanitize', []).value('$sanitize', $sanitize), angular.module('ngSanitize').directive('ngBindHtml', [
    '$sanitize',
    function ($sanitize) {
      return function (scope, element, attr) {
        element.addClass('ng-binding').data('$binding', attr.ngBindHtml), scope.$watch(attr.ngBindHtml, function (value) {
          value = $sanitize(value), element.html(value || '');
        });
      };
    }
  ]), angular.module('ngSanitize').filter('linky', function () {
    var LINKY_URL_REGEXP = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s\.\;\,\(\)\{\}\<\>]/, MAILTO_REGEXP = /^mailto:/;
    return function (text) {
      if (!text)
        return text;
      for (var match, url, i, raw = text, html = [], writer = htmlSanitizeWriter(html); match = raw.match(LINKY_URL_REGEXP);)
        url = match[0], match[2] == match[3] && (url = 'mailto:' + url), i = match.index, writer.chars(raw.substr(0, i)), writer.start('a', { href: url }), writer.chars(match[0].replace(MAILTO_REGEXP, '')), writer.end('a'), raw = raw.substring(i + match[0].length);
      return writer.chars(raw), html.join('');
    };
  });
}(window, window.angular), function () {
  var n = this, t = n._, r = {}, e = Array.prototype, u = Object.prototype, i = Function.prototype, a = e.push, o = e.slice, c = e.concat, l = u.toString, f = u.hasOwnProperty, s = e.forEach, p = e.map, h = e.reduce, v = e.reduceRight, g = e.filter, d = e.every, m = e.some, y = e.indexOf, b = e.lastIndexOf, x = Array.isArray, w = Object.keys, _ = i.bind, j = function (n) {
      return n instanceof j ? n : this instanceof j ? void (this._wrapped = n) : new j(n);
    };
  'undefined' != typeof exports ? ('undefined' != typeof module && module.exports && (exports = module.exports = j), exports._ = j) : n._ = j, j.VERSION = '1.5.2';
  var A = j.each = j.forEach = function (n, t, e) {
      if (null != n)
        if (s && n.forEach === s)
          n.forEach(t, e);
        else if (n.length === +n.length) {
          for (var u = 0, i = n.length; i > u; u++)
            if (t.call(e, n[u], u, n) === r)
              return;
        } else
          for (var a = j.keys(n), u = 0, i = a.length; i > u; u++)
            if (t.call(e, n[a[u]], a[u], n) === r)
              return;
    };
  j.map = j.collect = function (n, t, r) {
    var e = [];
    return null == n ? e : p && n.map === p ? n.map(t, r) : (A(n, function (n, u, i) {
      e.push(t.call(r, n, u, i));
    }), e);
  };
  var E = 'Reduce of empty array with no initial value';
  j.reduce = j.foldl = j.inject = function (n, t, r, e) {
    var u = arguments.length > 2;
    if (null == n && (n = []), h && n.reduce === h)
      return e && (t = j.bind(t, e)), u ? n.reduce(t, r) : n.reduce(t);
    if (A(n, function (n, i, a) {
        u ? r = t.call(e, r, n, i, a) : (r = n, u = !0);
      }), !u)
      throw new TypeError(E);
    return r;
  }, j.reduceRight = j.foldr = function (n, t, r, e) {
    var u = arguments.length > 2;
    if (null == n && (n = []), v && n.reduceRight === v)
      return e && (t = j.bind(t, e)), u ? n.reduceRight(t, r) : n.reduceRight(t);
    var i = n.length;
    if (i !== +i) {
      var a = j.keys(n);
      i = a.length;
    }
    if (A(n, function (o, c, l) {
        c = a ? a[--i] : --i, u ? r = t.call(e, r, n[c], c, l) : (r = n[c], u = !0);
      }), !u)
      throw new TypeError(E);
    return r;
  }, j.find = j.detect = function (n, t, r) {
    var e;
    return O(n, function (n, u, i) {
      return t.call(r, n, u, i) ? (e = n, !0) : void 0;
    }), e;
  }, j.filter = j.select = function (n, t, r) {
    var e = [];
    return null == n ? e : g && n.filter === g ? n.filter(t, r) : (A(n, function (n, u, i) {
      t.call(r, n, u, i) && e.push(n);
    }), e);
  }, j.reject = function (n, t, r) {
    return j.filter(n, function (n, e, u) {
      return !t.call(r, n, e, u);
    }, r);
  }, j.every = j.all = function (n, t, e) {
    t || (t = j.identity);
    var u = !0;
    return null == n ? u : d && n.every === d ? n.every(t, e) : (A(n, function (n, i, a) {
      return (u = u && t.call(e, n, i, a)) ? void 0 : r;
    }), !!u);
  };
  var O = j.some = j.any = function (n, t, e) {
      t || (t = j.identity);
      var u = !1;
      return null == n ? u : m && n.some === m ? n.some(t, e) : (A(n, function (n, i, a) {
        return u || (u = t.call(e, n, i, a)) ? r : void 0;
      }), !!u);
    };
  j.contains = j.include = function (n, t) {
    return null == n ? !1 : y && n.indexOf === y ? -1 != n.indexOf(t) : O(n, function (n) {
      return n === t;
    });
  }, j.invoke = function (n, t) {
    var r = o.call(arguments, 2), e = j.isFunction(t);
    return j.map(n, function (n) {
      return (e ? t : n[t]).apply(n, r);
    });
  }, j.pluck = function (n, t) {
    return j.map(n, function (n) {
      return n[t];
    });
  }, j.where = function (n, t, r) {
    return j.isEmpty(t) ? r ? void 0 : [] : j[r ? 'find' : 'filter'](n, function (n) {
      for (var r in t)
        if (t[r] !== n[r])
          return !1;
      return !0;
    });
  }, j.findWhere = function (n, t) {
    return j.where(n, t, !0);
  }, j.max = function (n, t, r) {
    if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535)
      return Math.max.apply(Math, n);
    if (!t && j.isEmpty(n))
      return -1 / 0;
    var e = {
        computed: -1 / 0,
        value: -1 / 0
      };
    return A(n, function (n, u, i) {
      var a = t ? t.call(r, n, u, i) : n;
      a > e.computed && (e = {
        value: n,
        computed: a
      });
    }), e.value;
  }, j.min = function (n, t, r) {
    if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535)
      return Math.min.apply(Math, n);
    if (!t && j.isEmpty(n))
      return 1 / 0;
    var e = {
        computed: 1 / 0,
        value: 1 / 0
      };
    return A(n, function (n, u, i) {
      var a = t ? t.call(r, n, u, i) : n;
      a < e.computed && (e = {
        value: n,
        computed: a
      });
    }), e.value;
  }, j.shuffle = function (n) {
    var t, r = 0, e = [];
    return A(n, function (n) {
      t = j.random(r++), e[r - 1] = e[t], e[t] = n;
    }), e;
  }, j.sample = function (n, t, r) {
    return arguments.length < 2 || r ? n[j.random(n.length - 1)] : j.shuffle(n).slice(0, Math.max(0, t));
  };
  var k = function (n) {
    return j.isFunction(n) ? n : function (t) {
      return t[n];
    };
  };
  j.sortBy = function (n, t, r) {
    var e = k(t);
    return j.pluck(j.map(n, function (n, t, u) {
      return {
        value: n,
        index: t,
        criteria: e.call(r, n, t, u)
      };
    }).sort(function (n, t) {
      var r = n.criteria, e = t.criteria;
      if (r !== e) {
        if (r > e || void 0 === r)
          return 1;
        if (e > r || void 0 === e)
          return -1;
      }
      return n.index - t.index;
    }), 'value');
  };
  var F = function (n) {
    return function (t, r, e) {
      var u = {}, i = null == r ? j.identity : k(r);
      return A(t, function (r, a) {
        var o = i.call(e, r, a, t);
        n(u, o, r);
      }), u;
    };
  };
  j.groupBy = F(function (n, t, r) {
    (j.has(n, t) ? n[t] : n[t] = []).push(r);
  }), j.indexBy = F(function (n, t, r) {
    n[t] = r;
  }), j.countBy = F(function (n, t) {
    j.has(n, t) ? n[t]++ : n[t] = 1;
  }), j.sortedIndex = function (n, t, r, e) {
    r = null == r ? j.identity : k(r);
    for (var u = r.call(e, t), i = 0, a = n.length; a > i;) {
      var o = i + a >>> 1;
      r.call(e, n[o]) < u ? i = o + 1 : a = o;
    }
    return i;
  }, j.toArray = function (n) {
    return n ? j.isArray(n) ? o.call(n) : n.length === +n.length ? j.map(n, j.identity) : j.values(n) : [];
  }, j.size = function (n) {
    return null == n ? 0 : n.length === +n.length ? n.length : j.keys(n).length;
  }, j.first = j.head = j.take = function (n, t, r) {
    return null == n ? void 0 : null == t || r ? n[0] : o.call(n, 0, t);
  }, j.initial = function (n, t, r) {
    return o.call(n, 0, n.length - (null == t || r ? 1 : t));
  }, j.last = function (n, t, r) {
    return null == n ? void 0 : null == t || r ? n[n.length - 1] : o.call(n, Math.max(n.length - t, 0));
  }, j.rest = j.tail = j.drop = function (n, t, r) {
    return o.call(n, null == t || r ? 1 : t);
  }, j.compact = function (n) {
    return j.filter(n, j.identity);
  };
  var M = function (n, t, r) {
    return t && j.every(n, j.isArray) ? c.apply(r, n) : (A(n, function (n) {
      j.isArray(n) || j.isArguments(n) ? t ? a.apply(r, n) : M(n, t, r) : r.push(n);
    }), r);
  };
  j.flatten = function (n, t) {
    return M(n, t, []);
  }, j.without = function (n) {
    return j.difference(n, o.call(arguments, 1));
  }, j.uniq = j.unique = function (n, t, r, e) {
    j.isFunction(t) && (e = r, r = t, t = !1);
    var u = r ? j.map(n, r, e) : n, i = [], a = [];
    return A(u, function (r, e) {
      (t ? e && a[a.length - 1] === r : j.contains(a, r)) || (a.push(r), i.push(n[e]));
    }), i;
  }, j.union = function () {
    return j.uniq(j.flatten(arguments, !0));
  }, j.intersection = function (n) {
    var t = o.call(arguments, 1);
    return j.filter(j.uniq(n), function (n) {
      return j.every(t, function (t) {
        return j.indexOf(t, n) >= 0;
      });
    });
  }, j.difference = function (n) {
    var t = c.apply(e, o.call(arguments, 1));
    return j.filter(n, function (n) {
      return !j.contains(t, n);
    });
  }, j.zip = function () {
    for (var n = j.max(j.pluck(arguments, 'length').concat(0)), t = new Array(n), r = 0; n > r; r++)
      t[r] = j.pluck(arguments, '' + r);
    return t;
  }, j.object = function (n, t) {
    if (null == n)
      return {};
    for (var r = {}, e = 0, u = n.length; u > e; e++)
      t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
    return r;
  }, j.indexOf = function (n, t, r) {
    if (null == n)
      return -1;
    var e = 0, u = n.length;
    if (r) {
      if ('number' != typeof r)
        return e = j.sortedIndex(n, t), n[e] === t ? e : -1;
      e = 0 > r ? Math.max(0, u + r) : r;
    }
    if (y && n.indexOf === y)
      return n.indexOf(t, r);
    for (; u > e; e++)
      if (n[e] === t)
        return e;
    return -1;
  }, j.lastIndexOf = function (n, t, r) {
    if (null == n)
      return -1;
    var e = null != r;
    if (b && n.lastIndexOf === b)
      return e ? n.lastIndexOf(t, r) : n.lastIndexOf(t);
    for (var u = e ? r : n.length; u--;)
      if (n[u] === t)
        return u;
    return -1;
  }, j.range = function (n, t, r) {
    arguments.length <= 1 && (t = n || 0, n = 0), r = arguments[2] || 1;
    for (var e = Math.max(Math.ceil((t - n) / r), 0), u = 0, i = new Array(e); e > u;)
      i[u++] = n, n += r;
    return i;
  };
  var R = function () {
  };
  j.bind = function (n, t) {
    var r, e;
    if (_ && n.bind === _)
      return _.apply(n, o.call(arguments, 1));
    if (!j.isFunction(n))
      throw new TypeError();
    return r = o.call(arguments, 2), e = function () {
      if (!(this instanceof e))
        return n.apply(t, r.concat(o.call(arguments)));
      R.prototype = n.prototype;
      var u = new R();
      R.prototype = null;
      var i = n.apply(u, r.concat(o.call(arguments)));
      return Object(i) === i ? i : u;
    };
  }, j.partial = function (n) {
    var t = o.call(arguments, 1);
    return function () {
      return n.apply(this, t.concat(o.call(arguments)));
    };
  }, j.bindAll = function (n) {
    var t = o.call(arguments, 1);
    if (0 === t.length)
      throw new Error('bindAll must be passed function names');
    return A(t, function (t) {
      n[t] = j.bind(n[t], n);
    }), n;
  }, j.memoize = function (n, t) {
    var r = {};
    return t || (t = j.identity), function () {
      var e = t.apply(this, arguments);
      return j.has(r, e) ? r[e] : r[e] = n.apply(this, arguments);
    };
  }, j.delay = function (n, t) {
    var r = o.call(arguments, 2);
    return setTimeout(function () {
      return n.apply(null, r);
    }, t);
  }, j.defer = function (n) {
    return j.delay.apply(j, [
      n,
      1
    ].concat(o.call(arguments, 1)));
  }, j.throttle = function (n, t, r) {
    var e, u, i, a = null, o = 0;
    r || (r = {});
    var c = function () {
      o = r.leading === !1 ? 0 : new Date(), a = null, i = n.apply(e, u);
    };
    return function () {
      var l = new Date();
      o || r.leading !== !1 || (o = l);
      var f = t - (l - o);
      return e = this, u = arguments, 0 >= f ? (clearTimeout(a), a = null, o = l, i = n.apply(e, u)) : a || r.trailing === !1 || (a = setTimeout(c, f)), i;
    };
  }, j.debounce = function (n, t, r) {
    var e, u, i, a, o;
    return function () {
      i = this, u = arguments, a = new Date();
      var c = function () {
          var l = new Date() - a;
          t > l ? e = setTimeout(c, t - l) : (e = null, r || (o = n.apply(i, u)));
        }, l = r && !e;
      return e || (e = setTimeout(c, t)), l && (o = n.apply(i, u)), o;
    };
  }, j.once = function (n) {
    var t, r = !1;
    return function () {
      return r ? t : (r = !0, t = n.apply(this, arguments), n = null, t);
    };
  }, j.wrap = function (n, t) {
    return function () {
      var r = [n];
      return a.apply(r, arguments), t.apply(this, r);
    };
  }, j.compose = function () {
    var n = arguments;
    return function () {
      for (var t = arguments, r = n.length - 1; r >= 0; r--)
        t = [n[r].apply(this, t)];
      return t[0];
    };
  }, j.after = function (n, t) {
    return function () {
      return --n < 1 ? t.apply(this, arguments) : void 0;
    };
  }, j.keys = w || function (n) {
    if (n !== Object(n))
      throw new TypeError('Invalid object');
    var t = [];
    for (var r in n)
      j.has(n, r) && t.push(r);
    return t;
  }, j.values = function (n) {
    for (var t = j.keys(n), r = t.length, e = new Array(r), u = 0; r > u; u++)
      e[u] = n[t[u]];
    return e;
  }, j.pairs = function (n) {
    for (var t = j.keys(n), r = t.length, e = new Array(r), u = 0; r > u; u++)
      e[u] = [
        t[u],
        n[t[u]]
      ];
    return e;
  }, j.invert = function (n) {
    for (var t = {}, r = j.keys(n), e = 0, u = r.length; u > e; e++)
      t[n[r[e]]] = r[e];
    return t;
  }, j.functions = j.methods = function (n) {
    var t = [];
    for (var r in n)
      j.isFunction(n[r]) && t.push(r);
    return t.sort();
  }, j.extend = function (n) {
    return A(o.call(arguments, 1), function (t) {
      if (t)
        for (var r in t)
          n[r] = t[r];
    }), n;
  }, j.pick = function (n) {
    var t = {}, r = c.apply(e, o.call(arguments, 1));
    return A(r, function (r) {
      r in n && (t[r] = n[r]);
    }), t;
  }, j.omit = function (n) {
    var t = {}, r = c.apply(e, o.call(arguments, 1));
    for (var u in n)
      j.contains(r, u) || (t[u] = n[u]);
    return t;
  }, j.defaults = function (n) {
    return A(o.call(arguments, 1), function (t) {
      if (t)
        for (var r in t)
          void 0 === n[r] && (n[r] = t[r]);
    }), n;
  }, j.clone = function (n) {
    return j.isObject(n) ? j.isArray(n) ? n.slice() : j.extend({}, n) : n;
  }, j.tap = function (n, t) {
    return t(n), n;
  };
  var S = function (n, t, r, e) {
    if (n === t)
      return 0 !== n || 1 / n == 1 / t;
    if (null == n || null == t)
      return n === t;
    n instanceof j && (n = n._wrapped), t instanceof j && (t = t._wrapped);
    var u = l.call(n);
    if (u != l.call(t))
      return !1;
    switch (u) {
    case '[object String]':
      return n == String(t);
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
    var a = n.constructor, o = t.constructor;
    if (a !== o && !(j.isFunction(a) && a instanceof a && j.isFunction(o) && o instanceof o))
      return !1;
    r.push(n), e.push(t);
    var c = 0, f = !0;
    if ('[object Array]' == u) {
      if (c = n.length, f = c == t.length)
        for (; c-- && (f = S(n[c], t[c], r, e)););
    } else {
      for (var s in n)
        if (j.has(n, s) && (c++, !(f = j.has(t, s) && S(n[s], t[s], r, e))))
          break;
      if (f) {
        for (s in t)
          if (j.has(t, s) && !c--)
            break;
        f = !c;
      }
    }
    return r.pop(), e.pop(), f;
  };
  j.isEqual = function (n, t) {
    return S(n, t, [], []);
  }, j.isEmpty = function (n) {
    if (null == n)
      return !0;
    if (j.isArray(n) || j.isString(n))
      return 0 === n.length;
    for (var t in n)
      if (j.has(n, t))
        return !1;
    return !0;
  }, j.isElement = function (n) {
    return !(!n || 1 !== n.nodeType);
  }, j.isArray = x || function (n) {
    return '[object Array]' == l.call(n);
  }, j.isObject = function (n) {
    return n === Object(n);
  }, A([
    'Arguments',
    'Function',
    'String',
    'Number',
    'Date',
    'RegExp'
  ], function (n) {
    j['is' + n] = function (t) {
      return l.call(t) == '[object ' + n + ']';
    };
  }), j.isArguments(arguments) || (j.isArguments = function (n) {
    return !(!n || !j.has(n, 'callee'));
  }), 'function' != typeof /./ && (j.isFunction = function (n) {
    return 'function' == typeof n;
  }), j.isFinite = function (n) {
    return isFinite(n) && !isNaN(parseFloat(n));
  }, j.isNaN = function (n) {
    return j.isNumber(n) && n != +n;
  }, j.isBoolean = function (n) {
    return n === !0 || n === !1 || '[object Boolean]' == l.call(n);
  }, j.isNull = function (n) {
    return null === n;
  }, j.isUndefined = function (n) {
    return void 0 === n;
  }, j.has = function (n, t) {
    return f.call(n, t);
  }, j.noConflict = function () {
    return n._ = t, this;
  }, j.identity = function (n) {
    return n;
  }, j.times = function (n, t, r) {
    for (var e = Array(Math.max(0, n)), u = 0; n > u; u++)
      e[u] = t.call(r, u);
    return e;
  }, j.random = function (n, t) {
    return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1));
  };
  var I = {
      escape: {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#x27;'
      }
    };
  I.unescape = j.invert(I.escape);
  var T = {
      escape: new RegExp('[' + j.keys(I.escape).join('') + ']', 'g'),
      unescape: new RegExp('(' + j.keys(I.unescape).join('|') + ')', 'g')
    };
  j.each([
    'escape',
    'unescape'
  ], function (n) {
    j[n] = function (t) {
      return null == t ? '' : ('' + t).replace(T[n], function (t) {
        return I[n][t];
      });
    };
  }), j.result = function (n, t) {
    if (null == n)
      return void 0;
    var r = n[t];
    return j.isFunction(r) ? r.call(n) : r;
  }, j.mixin = function (n) {
    A(j.functions(n), function (t) {
      var r = j[t] = n[t];
      j.prototype[t] = function () {
        var n = [this._wrapped];
        return a.apply(n, arguments), z.call(this, r.apply(j, n));
      };
    });
  };
  var N = 0;
  j.uniqueId = function (n) {
    var t = ++N + '';
    return n ? n + t : t;
  }, j.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };
  var q = /(.)^/, B = {
      '\'': '\'',
      '\\': '\\',
      '\r': 'r',
      '\n': 'n',
      '\t': 't',
      '\u2028': 'u2028',
      '\u2029': 'u2029'
    }, D = /\\|'|\r|\n|\t|\u2028|\u2029/g;
  j.template = function (n, t, r) {
    var e;
    r = j.defaults({}, r, j.templateSettings);
    var u = new RegExp([
        (r.escape || q).source,
        (r.interpolate || q).source,
        (r.evaluate || q).source
      ].join('|') + '|$', 'g'), i = 0, a = '__p+=\'';
    n.replace(u, function (t, r, e, u, o) {
      return a += n.slice(i, o).replace(D, function (n) {
        return '\\' + B[n];
      }), r && (a += '\'+\n((__t=(' + r + '))==null?\'\':_.escape(__t))+\n\''), e && (a += '\'+\n((__t=(' + e + '))==null?\'\':__t)+\n\''), u && (a += '\';\n' + u + '\n__p+=\''), i = o + t.length, t;
    }), a += '\';\n', r.variable || (a = 'with(obj||{}){\n' + a + '}\n'), a = 'var __t,__p=\'\',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,\'\');};\n' + a + 'return __p;\n';
    try {
      e = new Function(r.variable || 'obj', '_', a);
    } catch (o) {
      throw o.source = a, o;
    }
    if (t)
      return e(t, j);
    var c = function (n) {
      return e.call(this, n, j);
    };
    return c.source = 'function(' + (r.variable || 'obj') + '){\n' + a + '}', c;
  }, j.chain = function (n) {
    return j(n).chain();
  };
  var z = function (n) {
    return this._chain ? j(n).chain() : n;
  };
  j.mixin(j), A([
    'pop',
    'push',
    'reverse',
    'shift',
    'sort',
    'splice',
    'unshift'
  ], function (n) {
    var t = e[n];
    j.prototype[n] = function () {
      var r = this._wrapped;
      return t.apply(r, arguments), 'shift' != n && 'splice' != n || 0 !== r.length || delete r[0], z.call(this, r);
    };
  }), A([
    'concat',
    'join',
    'slice'
  ], function (n) {
    var t = e[n];
    j.prototype[n] = function () {
      return z.call(this, t.apply(this._wrapped, arguments));
    };
  }), j.extend(j.prototype, {
    chain: function () {
      return this._chain = !0, this;
    },
    value: function () {
      return this._wrapped;
    }
  });
}.call(this), function (t, e) {
  'object' == typeof exports ? module.exports = e() : 'function' == typeof define && define.amd ? define(e) : t.Spinner = e();
}(this, function () {
  'use strict';
  function o(t, e) {
    var o, i = document.createElement(t || 'div');
    for (o in e)
      i[o] = e[o];
    return i;
  }
  function n(t) {
    for (var e = 1, i = arguments.length; i > e; e++)
      t.appendChild(arguments[e]);
    return t;
  }
  function s(t, o, n, s) {
    var a = [
        'opacity',
        o,
        ~~(100 * t),
        n,
        s
      ].join('-'), f = 0.01 + n / s * 100, l = Math.max(1 - (1 - t) / o * (100 - f), t), u = i.substring(0, i.indexOf('Animation')).toLowerCase(), d = u && '-' + u + '-' || '';
    return e[a] || (r.insertRule('@' + d + 'keyframes ' + a + '{0%{opacity:' + l + '}' + f + '%{opacity:' + t + '}' + (f + 0.01) + '%{opacity:1}' + (f + o) % 100 + '%{opacity:' + t + '}100%{opacity:' + l + '}}', r.cssRules.length), e[a] = 1), a;
  }
  function a(e, i) {
    var n, r, o = e.style;
    for (i = i.charAt(0).toUpperCase() + i.slice(1), r = 0; r < t.length; r++)
      if (n = t[r] + i, void 0 !== o[n])
        return n;
    return void 0 !== o[i] ? i : void 0;
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
        void 0 === t[o] && (t[o] = i[o]);
    }
    return t;
  }
  function u(t) {
    for (var e = {
          x: t.offsetLeft,
          y: t.offsetTop
        }; t = t.offsetParent;)
      e.x += t.offsetLeft, e.y += t.offsetTop;
    return e;
  }
  function d(t, e) {
    return 'string' == typeof t ? t : t[e % t.length];
  }
  function c(t) {
    return 'undefined' == typeof this ? new c(t) : void (this.opts = l(t || {}, c.defaults, p));
  }
  function h() {
    function t(t, e) {
      return o('<' + t + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', e);
    }
    r.addRule('.spin-vml', 'behavior:url(#default#VML)'), c.prototype.lines = function (e, i) {
      function s() {
        return f(t('group', {
          coordsize: r + ' ' + r,
          coordorigin: -o + ' ' + -o
        }), {
          width: r,
          height: r
        });
      }
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
      var u, o = i.length + i.width, r = 2 * o, a = 2 * -(i.width + i.length) + 'px', l = f(s(), {
          position: 'absolute',
          top: a,
          left: a
        });
      if (i.shadow)
        for (u = 1; u <= i.lines; u++)
          p(u, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)');
      for (u = 1; u <= i.lines; u++)
        p(u);
      return n(e, l);
    }, c.prototype.opacity = function (t, e, i, o) {
      var n = t.firstChild;
      o = o.shadow && o.lines || 0, n && e + o < n.childNodes.length && (n = n.childNodes[e + o], n = n && n.firstChild, n = n && n.firstChild, n && (n.opacity = i));
    };
  }
  var i, t = [
      'webkit',
      'Moz',
      'ms',
      'O'
    ], e = {}, r = function () {
      var t = o('style', { type: 'text/css' });
      return n(document.getElementsByTagName('head')[0], t), t.sheet || t.styleSheet;
    }(), p = {
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
      opacity: 0.25,
      fps: 20,
      zIndex: 2000000000,
      className: 'spinner',
      top: 'auto',
      left: 'auto',
      position: 'relative'
    };
  c.defaults = {}, l(c.prototype, {
    spin: function (t) {
      this.stop();
      var a, l, e = this, n = e.opts, r = e.el = f(o(0, { className: n.className }), {
          position: n.position,
          width: 0,
          zIndex: n.zIndex
        }), s = n.radius + n.length + n.width;
      if (t && (t.insertBefore(r, t.firstChild || null), l = u(t), a = u(r), f(r, {
          left: ('auto' == n.left ? l.x - a.x + (t.offsetWidth >> 1) : parseInt(n.left, 10) + s) + 'px',
          top: ('auto' == n.top ? l.y - a.y + (t.offsetHeight >> 1) : parseInt(n.top, 10) + s) + 'px'
        })), r.setAttribute('role', 'progressbar'), e.lines(r, e.opts), !i) {
        var c, d = 0, p = (n.lines - 1) * (1 - n.direction) / 2, h = n.fps, m = h / n.speed, y = (1 - n.opacity) / (m * n.trail / 100), g = m / n.lines;
        !function v() {
          d++;
          for (var t = 0; t < n.lines; t++)
            c = Math.max(1 - (d + (n.lines - t) * g) % m * y, n.opacity), e.opacity(r, t * n.direction + p, c, n);
          e.timeout = e.el && setTimeout(v, ~~(1000 / h));
        }();
      }
      return e;
    },
    stop: function () {
      var t = this.el;
      return t && (clearTimeout(this.timeout), t.parentNode && t.parentNode.removeChild(t), this.el = void 0), this;
    },
    lines: function (t, e) {
      function u(t, i) {
        return f(o(), {
          position: 'absolute',
          width: e.length + e.width + 'px',
          height: e.width + 'px',
          background: t,
          boxShadow: i,
          transformOrigin: 'left',
          transform: 'rotate(' + ~~(360 / e.lines * r + e.rotate) + 'deg) translate(' + e.radius + 'px,0)',
          borderRadius: (e.corners * e.width >> 1) + 'px'
        });
      }
      for (var l, r = 0, a = (e.lines - 1) * (1 - e.direction) / 2; r < e.lines; r++)
        l = f(o(), {
          position: 'absolute',
          top: 1 + ~(e.width / 2) + 'px',
          transform: e.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: e.opacity,
          animation: i && s(e.opacity, e.trail, a + r * e.direction, e.lines) + ' ' + 1 / e.speed + 's linear infinite'
        }), e.shadow && n(l, f(u('#000', '0 0 4px #000'), { top: '2px' })), n(t, n(l, u(d(e.color, r), '0 0 1px rgba(0,0,0,.1)')));
      return t;
    },
    opacity: function (t, e, i) {
      e < t.childNodes.length && (t.childNodes[e].style.opacity = i);
    }
  });
  var m = f(o('group'), { behavior: 'url(#default#VML)' });
  return !a(m, 'transform') && m.adj ? h() : i = a(m, 'animation'), c;
});
var thotpod = function () {
    function isArray(value) {
      return '[object Array]' == toString.apply(value);
    }
    function isDate(value) {
      return '[object Date]' == toString.apply(value);
    }
    function isObject(value) {
      return null != value && 'object' == typeof value;
    }
    function copy(source, destination) {
      if (destination) {
        if (source === destination)
          throw Error('Can\'t copy equivalent objects or arrays');
        if (isArray(source)) {
          for (; destination.length;)
            destination.pop();
          for (var i = 0; i < source.length; i++)
            destination.push(copy(source[i]));
        } else {
          _.forEach(destination, function (value, key) {
            delete destination[key];
          });
          for (var key in source)
            destination[key] = copy(source[key]);
        }
      } else
        destination = source, source && (isArray(source) ? destination = copy(source, []) : isDate(source) ? destination = new Date(source.getTime()) : isObject(source) && (destination = copy(source, {})));
      return destination;
    }
    function setBit(idPos, bitSet) {
      var bitSetIndex = parseInt(idPos / 32, 10);
      for (bitSet = bitSet || []; bitSet.length <= bitSetIndex;)
        bitSet.push(0);
      return bitSet[bitSetIndex] = bitSet[bitSetIndex] | 1 << idPos % 32, bitSet;
    }
    function popcount(x) {
      var m1 = 1431655765, m2 = 858993459, m4 = 252645135;
      return x -= x >> 1 & m1, x = (x & m2) + (x >> 2 & m2), x = x + (x >> 4) & m4, x += x >> 8, x += x >> 16, 127 & x;
    }
    function Dimensions(dimensions) {
      var defaults = _.extend({
          title: '',
          discrete: {},
          range: {},
          visibleIds: [],
          idMap: [],
          excludedRangeMask: []
        }), discreteDefaults = {
          values: {},
          selected: 0,
          visibleIds: []
        }, rangeDefaults = {
          excludeNA: !1,
          high: null,
          low: null
        }, self = this;
      copy(defaults, this);
      for (var attrID in dimensions.discrete)
        if (dimensions.discrete.hasOwnProperty(attrID)) {
          var _attr = dimensions.discrete[attrID], _discrete = _.extend(_attr, discreteDefaults);
          self.discrete[attrID] = {}, copy(_discrete, self.discrete[attrID]);
        }
      for (var attrID in dimensions.range)
        if (dimensions.range.hasOwnProperty(attrID)) {
          var _attr = dimensions.range[attrID], _range = _.extend(_attr, rangeDefaults);
          self.range[attrID] = {}, copy(_range, self.range[attrID]);
        }
    }
    function Market(Model, opts) {
      var activeItem = null, prevActive = null;
      _.extend(this, { sortBy: {} }, opts), this.Model = Model, this.dimensions = {}, this.items = {}, this.visibleIds = [], this.visibleItems = [], this.subsetIds = [], this.initialized = !1, this.populated = !1, this.getActive = function () {
        return activeItem;
      }, this.getItems = function () {
        return _.map(this.items, function (val) {
          return val;
        });
      }, this.setActive = function (id) {
        return _.isObject(id) ? (prevActive = activeItem, activeItem = id, activeItem.isActive = !0) : this.items[id] ? (prevActive = activeItem, activeItem = this.items[id], activeItem.isActive = !0) : activeItem = null, prevActive && (prevActive.isActive = !1), activeItem;
      }, this.getDimensions = function () {
        return this.dimensions;
      }, this.load = function (search) {
        return this.dimensions.load(search), this;
      };
    }
    var toString = Object.prototype.toString;
    return Dimensions.prototype.pushDiscreteId = function (attrID, idPosition, value) {
      var _discrete = this.discrete[attrID];
      _discrete && (value = value || 'Unknown', _discrete.values.hasOwnProperty(value) ? _discrete.values[value].ids = setBit(idPosition, _discrete.values[value].ids) : (_discrete.values[value] = {
        ids: [0],
        title: value,
        isSelected: !1
      }, _discrete.values[value].ids = setBit(idPosition, _discrete.values[value].ids)));
    }, Dimensions.prototype.load = function (search) {
      var self = this, _search = _.extend({
          title: '',
          discrete: {},
          range: {}
        }, search);
      self.id = _search.id || void 0, self.title = _search.title || '';
      for (var rangeID in self.range)
        if (_search.range.hasOwnProperty(rangeID)) {
          var withinLowBound = _search.range[rangeID].lowSelected >= self.range[rangeID].low, withinHighBound = _search.range[rangeID].highSelected <= self.range[rangeID].high;
          withinLowBound && withinHighBound ? (self.range[rangeID].lowSelected = _search.range[rangeID].lowSelected, self.range[rangeID].highSelected = _search.range[rangeID].highSelected) : !withinLowBound && withinHighBound ? (self.range[rangeID].lowSelected = self.range[rangeID].low, self.range[rangeID].highSelected = _search.range[rangeID].highSelected) : withinLowBound && !withinHighBound ? (self.range[rangeID].lowSelected = _search.range[rangeID].lowSelected, self.range[rangeID].highSelected = self.range[rangeID].high) : (self.range[rangeID].lowSelected = self.range[rangeID].low, self.range[rangeID].highSelected = self.range[rangeID].high);
        } else
          self.range.hasOwnProperty(rangeID) && (self.range[rangeID].lowSelected = self.range[rangeID].low, self.range[rangeID].highSelected = self.range[rangeID].high);
      for (var discreteID in self.discrete)
        if (_search.discrete.hasOwnProperty(discreteID))
          for (var attrID in _search.discrete[discreteID].values)
            self.discrete[discreteID].values.hasOwnProperty(attrID) && (_search.discrete[discreteID].values[attrID].isSelected && !self.discrete[discreteID].values[attrID].isSelected ? (self.discrete[discreteID].values[attrID].isSelected = !0, self.discrete[discreteID].selected++) : !_search.discrete[discreteID].values[attrID].isSelected && self.discrete[discreteID].values[attrID].isSelected && (self.discrete[discreteID].values[attrID].isSelected = !1, self.discrete[discreteID].selected--));
        else if (self.discrete.hasOwnProperty(discreteID))
          for (var attrID in self.discrete[discreteID].values)
            self.discrete[discreteID].values.hasOwnProperty(attrID) && self.discrete[discreteID].values[attrID].isSelected && (self.discrete[discreteID].values[attrID].isSelected = !1, self.discrete[discreteID].selected--);
    }, Dimensions.prototype.toArray = function () {
      var dimensionsArr = _.extend({}, this, {
          discrete: _.map(this.discrete, function (val) {
            return val;
          }),
          range: _.map(this.range, function (val) {
            return val;
          })
        });
      return dimensionsArr;
    }, Dimensions.prototype.getDiscrete = function () {
      return _.map(this.discrete, function (val) {
        return val;
      });
    }, Dimensions.prototype.getRange = function () {
      return _.map(this.range, function (val) {
        return val;
      });
    }, Dimensions.prototype.reset = function () {
      return this.title = '', this.id = void 0, this.discrete = {}, this.range = {}, this;
    }, Market.prototype.addModels = function (models) {
      for (var _model in models)
        if (models.hasOwnProperty(_model)) {
          var model = models[_model];
          try {
            this.mapModel(model);
          } catch (e) {
            console.log(e.message);
          }
        }
    }, Market.prototype.mapModel = function (model) {
      var self = this, _item = self.items[model.id] = self.Model ? new self.Model(model) : model, idPosition = self.dimensions.idMap.length, dimensions = self.dimensions;
      dimensions.idMap.push(model.id);
      for (var _discreteKey in dimensions.discrete)
        if (dimensions.discrete.hasOwnProperty(_discreteKey)) {
          var _discreteAttr = dimensions.discrete[_discreteKey];
          if ('undefined' == typeof _item[_discreteKey])
            throw new Error('Cannot find discrete attribute: ' + _discreteKey);
          if (_discreteAttr.multi)
            if (_item[_discreteKey].length)
              for (var i = 0; i < _item[_discreteKey].length; i++) {
                var _discreteVal, _itemAttr = _item[_discreteKey][i] = _item[_discreteKey][i] || 'Unknown';
                _discreteVal = _discreteAttr.restrict ? _.contains(_discreteAttr.restrict, _itemAttr) ? _itemAttr : 'Other' : _itemAttr, self.dimensions.pushDiscreteId(_discreteKey, idPosition, _discreteVal);
              }
            else
              self.dimensions.pushDiscreteId(_discreteKey, idPosition, 'None');
          else {
            var _discreteVal;
            _item[_discreteKey] = _item[_discreteKey] || 'Unknown', _discreteVal = _discreteAttr.restrict ? _.contains(_discreteAttr.restrict, _item[_discreteKey]) ? _item[_discreteKey] : 'Other' : _item[_discreteKey], self.dimensions.pushDiscreteId(_discreteKey, idPosition, _discreteVal);
          }
        }
      for (var _rangeKey in dimensions.range)
        if (dimensions.range.hasOwnProperty(_rangeKey)) {
          var _itemAttr, _rangeAttr = self.dimensions.range[_rangeKey];
          if ('undefined' == typeof _item[_rangeKey])
            throw new Error('Cannot find range attribute: ' + _rangeKey);
          _itemAttr = _item[_rangeKey] = isNaN(parseFloat(_item[_rangeKey])) ? 'NA' : parseFloat(_item[_rangeKey]), _rangeAttr.highBound ? _rangeAttr.high = _rangeAttr.highSelected = _rangeAttr.highBound : (_itemAttr >= _rangeAttr.high || null == _rangeAttr.high) && 'NA' !== _itemAttr && (_rangeAttr.high = _rangeAttr.highSelected = _itemAttr), _rangeAttr.lowBound ? _rangeAttr.low = _rangeAttr.lowSelected = _rangeAttr.lowBound : (_itemAttr <= _rangeAttr.low || null == _rangeAttr.low) && 'NA' !== _itemAttr && (_rangeAttr.low = _rangeAttr.lowSelected = _itemAttr);
        }
    }, Market.prototype.initialize = function (dimensions, models) {
      if (!dimensions && !this.dimensions)
        throw new Error('Dimensions must be defined in order to initialize Marketplace');
      return this.items = {}, this.dimensions = dimensions ? new Dimensions(dimensions) : this.dimensions, models && (this.addModels(models), this.populated = !0, this.apply(), this.predict()), this.initialized = !0, this.items;
    }, Market.prototype.apply = function () {
      var dimensions = this.dimensions, items = this.items;
      this.subsetIds = [], this.visibleIds = [], this.visibleItems = [], dimensions.visibleIds = [], dimensions.excludedRangeMask = [];
      var i, BIT_SET_LENGTH = Math.ceil(dimensions.idMap.length / 32), bitSet = [];
      for (i = 0; BIT_SET_LENGTH > i; i++) {
        bitSet.push(-1), dimensions.excludedRangeMask.push(-1);
        for (var attrId in dimensions.discrete)
          if (dimensions.discrete.hasOwnProperty(attrId)) {
            var _discrete = dimensions.discrete[attrId], union = _discrete.multi ? -1 : 0;
            for (var valueId in _discrete.values)
              if (_discrete.values.hasOwnProperty(valueId)) {
                var _value = _discrete.values[valueId];
                if (_discrete.multi) {
                  if (0 === _discrete.selected)
                    break;
                  _value.isSelected && (union &= _value.ids[i]);
                } else
                  (_value.isSelected || 0 === _discrete.selected) && (union |= _value.ids[i]);
              }
            _discrete.visibleIds[i] = union, bitSet[i] = bitSet[i] & union;
          }
        for (var p = 0; 32 > p; p++) {
          var itemIndex = 32 * i + p;
          if (dimensions.idMap[itemIndex]) {
            var _currItem = items[dimensions.idMap[itemIndex]];
            if (_.isEmpty(dimensions.range))
              _currItem.isVisible = !!(1 & bitSet[i]), _currItem.isVisible && (dimensions.visibleIds = setBit(itemIndex, dimensions.visibleIds), this.visibleIds.push(dimensions.idMap[itemIndex]), this.visibleItems.push(_currItem));
            else {
              for (var _rangeKey in dimensions.range)
                if (dimensions.range.hasOwnProperty(_rangeKey)) {
                  var _rangeAttr = dimensions.range[_rangeKey], _currItemAttr = _currItem[_rangeKey], _isWithinLow = _currItemAttr >= _rangeAttr.lowSelected || _rangeAttr.lowSelected == _rangeAttr.lowBound, _isWithinHigh = _currItemAttr <= _rangeAttr.highSelected || _rangeAttr.highSelected == _rangeAttr.highBound;
                  if (!(_isWithinLow && _isWithinHigh || 'NA' === _currItemAttr && !_rangeAttr.excludeNA)) {
                    _currItem.isVisible = !1, dimensions.excludedRangeMask[i] = dimensions.excludedRangeMask[i] & ~(1 << p);
                    break;
                  }
                  _currItem.isVisible = !!(1 & bitSet[i]);
                }
              this.subset && 'all' !== this.subset ? (_currItem.isVisible = _currItem.isVisible && _currItem[this.subset], _currItem[this.subset] && (this.subsetIds = setBit(itemIndex, this.subsetIds))) : (_currItem.isVisible = _currItem.isVisible && !_currItem.hidden, _currItem.hidden || (this.subsetIds = setBit(itemIndex, this.subsetIds))), _currItem.isVisible && (dimensions.visibleIds = setBit(itemIndex, dimensions.visibleIds), this.visibleIds.push(dimensions.idMap[itemIndex]), this.visibleItems.push(_currItem));
            }
          }
          bitSet[i] = bitSet[i] >> 1;
        }
      }
      return this.sortVisibleItems();
    }, Market.prototype.predict = function () {
      var dimensions = this.dimensions, BIT_SET_LENGTH = Math.ceil(dimensions.idMap.length / 32);
      for (var attrId in dimensions.discrete)
        if (dimensions.discrete.hasOwnProperty(attrId)) {
          var _discrete = dimensions.discrete[attrId];
          for (var valueId in _discrete.values)
            if (_discrete.values.hasOwnProperty(valueId)) {
              var _value = _discrete.values[valueId];
              if (!_value.isSelected && _discrete.selected > 0) {
                for (var predictLength = 0, predictBitSet = [], i = 0; BIT_SET_LENGTH > i; i++) {
                  var predictedUnion = _discrete.visibleIds[i] | _value.ids[i];
                  predictBitSet.push(-1);
                  for (var predictAttrId in dimensions.discrete)
                    if (dimensions.discrete.hasOwnProperty(predictAttrId)) {
                      var _predictDiscrete = dimensions.discrete[predictAttrId];
                      predictBitSet[i] = predictAttrId === attrId ? predictBitSet[i] & predictedUnion : predictBitSet[i] & _predictDiscrete.visibleIds[i];
                    }
                  predictLength += popcount(predictBitSet[i] & _value.ids[i] & this.subsetIds[i] & dimensions.excludedRangeMask[i]);
                }
                predictLength ? (_value.badge = 'success', _value.predict = '+' + predictLength) : (_value.badge = null, _value.predict = 0);
              } else {
                _value.predict = 0;
                for (var i = 0; BIT_SET_LENGTH > i; i++)
                  _value.predict += popcount(dimensions.visibleIds[i] & _value.ids[i]);
                _value.badge = _value.predict ? 'info' : '';
              }
            }
        }
    }, Market.prototype.sortVisibleItems = function (predicate, reverse) {
      function compare(a, b) {
        var v1 = a[_predicate] || a[_predicate] || null, v2 = b[_predicate] || b[_predicate] || null, t1 = typeof v1, t2 = typeof v2;
        return t1 == t2 ? ('string' == t1 && (v1 = v1.toLowerCase()), 'string' == t1 && (v2 = v2.toLowerCase()), v1 === v2 ? 0 : v2 > v1 ? -1 : 1) : v2 > v1 ? -1 : 1;
      }
      var _predicate = predicate || this.sortBy.predicate, _reverse = 'undefined' == typeof reverse ? this.sortBy.reverse : reverse, _items = [], _naItems = [];
      if (!_predicate)
        return this.visibleItems;
      for (var i = this.visibleItems.length - 1; i >= 0; i--) {
        var _item = this.visibleItems[i], _attr = _item[_predicate] || _item[_predicate] || null;
        'NA' == _attr ? _naItems.push(_item) : _items.push(_item);
      }
      return _items.sort(_reverse ? compare : function (a, b) {
        return compare(b, a);
      }), this.visibleItems = _items.concat(_naItems), this.sortBy = {
        predicate: _predicate,
        reverse: _reverse
      }, this.visibleItems;
    }, Market.prototype.toggleDiscrete = function (discrete, value) {
      return discrete && value && (value.isSelected = !value.isSelected, value.isSelected ? discrete.selected++ : discrete.selected--), this;
    }, Market.prototype.applyRange = function (rangeKey, low, high) {
      if (!this.dimensions.range.hasOwnProperty(rangeKey))
        throw new Error('Cannot find range dimension ' + rangeKey);
      var _range = this.dimensions.range[rangeKey];
      return _range.lowSelected = _.isNumber(low) ? low : _range.low, _range.highSelected = _.isNumber(high) ? high : _range.high, this;
    }, Market.prototype.excludeNA = function (rangeKey) {
      return this.dimensions.range[rangeKey].excludeNA = !0, this;
    }, Market.prototype.includeNA = function (rangeKey) {
      return this.dimensions.range[rangeKey].excludeNA = !1, this;
    }, { Marketplace: Market };
  }();
angular.module('segmentio', ['ng']).factory('segmentio', [
  '$rootScope',
  '$window',
  '$location',
  '$log',
  function ($rootScope, $window, $location, $log) {
    var service = {};
    $window.analytics = $window.analytics || [];
    for (var methodFactory = function (type) {
          return function () {
            var args = Array.prototype.slice.call(arguments, 0);
            $log.info('Call segmentio API with', type, args), $window.analytics.initialized ? ($log.info('Segmentio API initialized, calling API'), $window.analytics[type].apply($window.analytics, args)) : ($log.info('Segmentio API not yet initialized, queueing call'), $window.analytics.push([type].concat(args)));
          };
        }, methods = [
          'identify',
          'track',
          'trackLink',
          'trackForm',
          'trackClick',
          'trackSubmit',
          'page',
          'pageview',
          'ab',
          'alias',
          'ready',
          'group'
        ], i = 0; i < methods.length; i++)
      service[methods[i]] = methodFactory(methods[i]);
    return $rootScope.$on('$viewContentLoaded', function () {
      service.location != $location.path() && (service.location = $location.path(), service.pageview(service.location));
    }), service.load = function (apiKey) {
      var script = document.createElement('script');
      script.type = 'text/javascript', script.async = !0, script.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'd2dq2ahtl5zl1z.cloudfront.net/analytics.js/v1/' + apiKey + '/analytics.js';
      var firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    }, service;
  }
]), angular.module('rescour.user', ['ngCookies']).service('User', [
  '$http',
  '$q',
  '$_api',
  'segmentio',
  function ($http, $q, $_api, segmentio) {
    this.profile = {}, this.billing = {}, this.get = function () {
      var defer = $q.defer(), self = this, path = $_api.path + '/auth/user/', config = angular.extend({}, $_api.config);
      return $http.get(path, config).then(function (response) {
        segmentio.identify(response.data[0].id, {
          email: response.data[0].email,
          firstName: response.data[0].firstName,
          lastName: response.data[0].lastName
        }), self.id = response.data[0].id, angular.copy(response.data[0], self.profile), _.contains(self.profile.roles, 'admin') && (self.isAdmin = !0), defer.resolve(self);
      }, function (response) {
        defer.reject(response);
      }), defer.promise;
    }, this.saveProfile = function () {
      var defer = $q.defer(), self = this, path = $_api.path + '/auth/user/' + self.id, config = angular.extend({
          transformRequest: function (data) {
            return data;
          }
        }, $_api.config), body = JSON.stringify(this.profile);
      if (!this.id)
        throw new Error('Could not save profile, id not specified');
      return $http.put(path, body, config).then(function (response) {
        defer.resolve(response);
      }, function (response) {
        throw self.getProfile(), new Error('Error updating profile');
      }), defer.promise;
    }, this.addStripe = function (tok) {
      var defer = $q.defer(), self = this, path = $_api.path + '/auth/user/' + self.id + '/payment/', config = angular.extend({
          transformRequest: function (data) {
            return data;
          }
        }, $_api.config), body = JSON.stringify({
          card: tok,
          plan: 'one_license',
          description: 'One Seat License'
        });
      return $http.put(path, body, config).then(function (response) {
        defer.resolve(response);
      }, function (response) {
        defer.reject(response);
      }), defer.promise;
    }, this.getBilling = function () {
      var defer = $q.defer(), self = this, path = $_api.path + '/auth/user/' + self.id + '/payment/', config = angular.extend({
          transformRequest: function (data) {
            return data;
          }
        }, $_api.config);
      return $http.get(path, config).then(function (response) {
        angular.copy(response.data, self.billing), defer.resolve(response);
      }, function (response) {
        defer.reject(response);
      }), defer.promise;
    }, this.cancelSubscription = function (reason, transformFn) {
      var defer = $q.defer(), path = $_api.path + '/email/', config = angular.extend({ transformRequest: transformFn }, $_api.config), body = JSON.stringify({ text: reason });
      return $http.post(path, body, config).then(function (response) {
        defer.resolve(response);
      }, function (response) {
        defer.reject(response);
      }), defer.promise;
    };
  }
]).service('Users', [
  '$q',
  '$http',
  '$_api',
  function ($q, $http, $_api) {
    this.users = null, this.init = function () {
      var self = this, defer = $q.defer();
      return this.users = {}, this.fetch().then(function (users) {
        for (var i = users.length - 1; i >= 0; i--) {
          var user = users[i];
          self.users[user.id] = {
            name: user.firstName + ' ' + user.lastName,
            listings: {
              count: 0,
              lastActivity: null,
              items: []
            },
            news: {
              count: 0,
              lastActivity: null,
              items: []
            }
          };
        }
        defer.resolve(self.users);
      }), defer.promise;
    }, this.generateStats = function (key, models) {
      for (var self = this, i = models.length - 1; i >= 0; i--) {
        var model = models[i], user = self.users[model._updatedBy], lastUpdated = model._updatedTs;
        user && (user[key].count += 1, user[key].items.push(model), lastUpdated > user[key].lastActivity && (user[key].lastActivity = lastUpdated));
      }
      return self.users;
    }, this.fetch = function () {
      var items = [], defer = $q.defer(), config = angular.extend({
          transformRequest: function (data) {
            return data;
          }
        }, $_api.config), batchLimit = 500, rootPath = $_api.path + '/auth/users/';
      return function batchItems(limit, offset) {
        var path = rootPath + '?limit=' + limit + (offset ? '&offset=' + offset : '');
        $http.get(path, config).then(function (response) {
          items = items.concat(response.data), response.data.length < limit || 0 === response.data.length ? defer.resolve(items) : batchItems(limit, response.data[response.data.length - 1].id);
        }, function (response) {
          defer.reject(response);
        });
      }(batchLimit), defer.promise;
    };
  }
]), angular.module('rescour.utility', []).filter('limitVisible', [
  '$document',
  function () {
    return function (input) {
      var visibleItems = [];
      return _.each(input, function (item) {
        item.isVisible && visibleItems.push(item);
      }), visibleItems;
    };
  }
]).filter('ellipsis', function () {
  return function (input, limit) {
    return 'No description provided' !== input && input.length > limit ? input.substr(0, limit) + '...' : input;
  };
}).filter('percentage', function () {
  return function (input) {
    var num = parseFloat(input);
    return num.toFixed(3) + ' %';
  };
}).directive('passwordVerify', function () {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ctrl) {
      scope.$watch(function () {
        return scope.$eval(attrs.passwordVerify);
      }, function () {
        ctrl.$viewValue = '', ctrl.$modelValue = '', ctrl.$render(), ctrl.$setValidity('passwordMatch', !1);
      }), ctrl.$parsers.unshift(function (viewValue) {
        var origin = scope.$eval(attrs.passwordVerify);
        return viewValue === origin ? (ctrl.$setValidity('passwordMatch', !0), viewValue) : void ctrl.$setValidity('passwordMatch', !1);
      });
    }
  };
}).directive('passwordValidate', function () {
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function (viewValue) {
        return scope.pwdValidLength = viewValue && viewValue.length >= 8 ? 'valid' : void 0, scope.pwdHasLetter = viewValue && /[A-z]/.test(viewValue) ? 'valid' : void 0, scope.pwdHasNumber = viewValue && /\d/.test(viewValue) ? 'valid' : void 0, scope.pwdValidLength && scope.pwdHasLetter && scope.pwdHasNumber ? (ctrl.$setValidity('passwordValid', !0), viewValue) : void ctrl.$setValidity('passwordValid', !1);
      });
    }
  };
}).directive('ngBlur', [
  '$parse',
  function ($parse) {
    return function (scope, element, attr) {
      var fn = $parse(attr.ngBlur);
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
      scope: !0,
      link: function (scope, element, attr) {
        var fn = $parse(attr.autoSave);
        element.bind('blur', function (event) {
          scope.$apply(function () {
            fn(scope, { $event: event });
          });
        }), scope.$on('autoSaveSuccess', function () {
          element.addClass('auto-save-success'), $timeout(function () {
            element.removeClass('auto-save-success');
          }, 400);
        }), element.addClass('auto-save');
      }
    };
  }
]).directive('fadeAfter', [
  '$timeout',
  function ($timeout) {
    return {
      link: function (scope, element, attrs) {
        parseInt(attrs.fadeAfter, 10) && $timeout(function () {
          element.fadeOut(700);
        }, attrs.fadeAfter);
      }
    };
  }
]).directive('fade', function () {
  return function (scope, element, attr) {
    scope.$watch(attr.fade, function (value) {
      value ? element.fadeIn(700) : element.fadeOut(700);
    });
  };
}).directive('fadeIn', function () {
  return function (scope, element, attr) {
    scope.$watch(attr.fadeIn, function (value) {
      value ? element.fadeIn(500) : element.hide();
    });
  };
}).directive('chunk', [
  '$timeout',
  function () {
    return {
      link: function (scope, element, attrs) {
        function initChunk() {
          scope.visibleItems = scope.$eval(attrs.chunk), currentSlice = chunkSize, scope.chunk = scope.visibleItems.slice(0, chunkSize);
        }
        var currentSlice, raw = element[0], chunkSize = parseInt(attrs.chunkSize, 10) || 10;
        element.bind('scroll', function () {
          raw.scrollTop + raw.offsetHeight >= raw.scrollHeight && scope.$apply(function () {
            scope.chunk = scope.chunk.concat(scope.visibleItems.slice(currentSlice, currentSlice += chunkSize));
          });
        }), scope.$watch(function (newScope) {
          angular.equals(scope.$eval(attrs.chunk), newScope.visibleItems) || (raw.scrollTop = 0, initChunk());
        });
      }
    };
  }
]).directive('formatInput', [
  '$filter',
  '$timeout',
  '$parse',
  function ($filter, $timeout) {
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ctrl) {
        function applyFilter(formatInput) {
          formatInput = formatInput || attrs.formatInput, ctrl.$modelValue ? (ctrl.$viewValue = $filter(formatInput)(ctrl.$modelValue), ctrl.$render()) : (ctrl.$viewValue = void 0, ctrl.$render());
        }
        elm.bind('blur', function () {
          scope.$apply(function () {
            applyFilter(attrs.formatInput);
          });
        }), ctrl.$parsers.push(function (viewVal) {
          return viewVal.replace(/\,/g, '');
        }), elm.bind('focus', function () {
          scope.$apply(function () {
            ctrl.$viewValue = ctrl.$modelValue, ctrl.$render();
          });
        }), attrs.$observe('formatInput', function (val) {
          val && (ctrl.$viewValue = $filter(val)(ctrl.$modelValue), ctrl.$render());
        }), $timeout(function () {
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
      link: function (scope, element) {
        function calcElementHeight(e) {
          for (var _siblings = $(e).siblings(), _siblingsHeight = 0, _windowHeight = $window.innerHeight, _headerHeight = $document.find('header')[0].clientHeight, i = 0; i < _siblings.length; i++)
            _siblingsHeight += $(_siblings[i]).height();
          return _windowHeight - _siblingsHeight - _headerHeight + 'px';
        }
        angular.element($window).bind('resize', _.debounce(function () {
          element.css({ height: calcElementHeight(element) });
        }, 300)), $timeout(function () {
          element.css({ height: calcElementHeight(element) });
        }, 0);
      }
    };
  }
]).directive('inputDropdown', [
  '$document',
  function ($document) {
    return {
      restrict: 'C',
      link: function (scope, element) {
        function open(e) {
          e && (e.stopPropagation(), e.preventDefault()), console.log('hi'), scope.$broadcast('destroyDropdowns'), scope.$broadcast('destroyTooltips'), scope.isOpen ? close() : scope.$apply(function () {
            ddMenu.show(), scope.isOpen = !0, $document.bind('click', close), ddBtn.unbind('click', open);
          });
        }
        function close() {
          scope.$apply(function () {
            scope.isOpen && (ddMenu.hide(), scope.isOpen = !1, $document.unbind('click', close), ddBtn.bind('click', open));
          });
        }
        var ddBtn = element.find('.input-dropdown-btn'), ddMenu = element.find('.input-dropdown-menu');
        scope.$on('destroyDropdowns', close), ddBtn.bind('click', open);
      }
    };
  }
]), angular.module('thotpod.spinner', []).factory('$spinner', function () {
  function createEl(tag, prop) {
    var n, el = document.createElement(tag || 'div');
    for (n in prop)
      el[n] = prop[n];
    return el;
  }
  function ins(parent) {
    for (var i = 1, n = arguments.length; n > i; i++)
      parent.appendChild(arguments[i]);
    return parent;
  }
  function addAnimation(alpha, trail, i, lines) {
    var name = [
        'opacity',
        trail,
        ~~(100 * alpha),
        i,
        lines
      ].join('-'), start = 0.01 + i / lines * 100, z = Math.max(1 - (1 - alpha) / trail * (100 - start), alpha), prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase(), pre = prefix && '-' + prefix + '-' || '';
    return animations[name] || (sheet.insertRule('@' + pre + 'keyframes ' + name + '{0%{opacity:' + z + '}' + start + '%{opacity:' + alpha + '}' + (start + 0.01) + '%{opacity:1}' + (start + trail) % 100 + '%{opacity:' + alpha + '}100%{opacity:' + z + '}}', sheet.cssRules.length), animations[name] = 1), name;
  }
  function vendor(el, prop) {
    var pp, i, s = el.style;
    if (void 0 !== s[prop])
      return prop;
    for (prop = prop.charAt(0).toUpperCase() + prop.slice(1), i = 0; i < prefixes.length; i++)
      if (pp = prefixes[i] + prop, void 0 !== s[pp])
        return pp;
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
        void 0 === obj[n] && (obj[n] = def[n]);
    }
    return obj;
  }
  function pos(el) {
    for (var o = {
          x: el.offsetLeft,
          y: el.offsetTop
        }; el = el.offsetParent;)
      o.x += el.offsetLeft, o.y += el.offsetTop;
    return o;
  }
  function Spinner(o) {
    return 'undefined' == typeof this ? new Spinner(o) : void (this.opts = merge(o || {}, Spinner.defaults, defaults));
  }
  function initVML() {
    function vml(tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr);
    }
    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)'), Spinner.prototype.lines = function (el, o) {
      function grp() {
        return css(vml('group', {
          coordsize: s + ' ' + s,
          coordorigin: -r + ' ' + -r
        }), {
          width: s,
          height: s
        });
      }
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
      var i, r = o.length + o.width, s = 2 * r, margin = 2 * -(o.width + o.length) + 'px', g = css(grp(), {
          position: 'absolute',
          top: margin,
          left: margin
        });
      if (o.shadow)
        for (i = 1; i <= o.lines; i++)
          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)');
      for (i = 1; i <= o.lines; i++)
        seg(i);
      return ins(el, g);
    }, Spinner.prototype.opacity = function (el, i, val, o) {
      var c = el.firstChild;
      o = o.shadow && o.lines || 0, c && i + o < c.childNodes.length && (c = c.childNodes[i + o], c = c && c.firstChild, c = c && c.firstChild, c && (c.opacity = val));
    };
  }
  var useCssAnimations, prefixes = [
      'webkit',
      'Moz',
      'ms',
      'O'
    ], animations = {}, sheet = function () {
      var el = createEl('style', { type: 'text/css' });
      return ins(document.getElementsByTagName('head')[0], el), el.sheet || el.styleSheet;
    }(), defaults = {
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
      opacity: 0.25,
      fps: 20,
      zIndex: 2000000000,
      className: 'spinner',
      top: 'auto',
      left: 'auto',
      position: 'relative'
    };
  Spinner.defaults = {}, merge(Spinner.prototype, {
    spin: function (target) {
      this.stop();
      var ep, tp, self = this, o = self.opts, el = self.el = css(createEl(0, { className: o.className }), {
          position: o.position,
          width: 0,
          zIndex: o.zIndex
        }), mid = o.radius + o.length + o.width;
      if (target && (target.insertBefore(el, target.firstChild || null), tp = pos(target), ep = pos(el), css(el, {
          left: ('auto' == o.left ? tp.x - ep.x + (target.offsetWidth >> 1) : parseInt(o.left, 10) + mid) + 'px',
          top: ('auto' == o.top ? tp.y - ep.y + (target.offsetHeight >> 1) : parseInt(o.top, 10) + mid) + 'px'
        })), el.setAttribute('role', 'progressbar'), self.lines(el, self.opts), !useCssAnimations) {
        var alpha, i = 0, start = (o.lines - 1) * (1 - o.direction) / 2, fps = o.fps, f = fps / o.speed, ostep = (1 - o.opacity) / (f * o.trail / 100), astep = f / o.lines;
        !function anim() {
          i++;
          for (var j = 0; j < o.lines; j++)
            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity), self.opacity(el, j * o.direction + start, alpha, o);
          self.timeout = self.el && setTimeout(anim, ~~(1000 / fps));
        }();
      }
      return self;
    },
    stop: function () {
      var el = this.el;
      return el && (clearTimeout(this.timeout), el.parentNode && el.parentNode.removeChild(el), this.el = void 0), this;
    },
    lines: function (el, o) {
      function fill(color, shadow) {
        return css(createEl(), {
          position: 'absolute',
          width: o.length + o.width + 'px',
          height: o.width + 'px',
          background: color,
          boxShadow: shadow,
          transformOrigin: 'left',
          transform: 'rotate(' + ~~(360 / o.lines * i + o.rotate) + 'deg) translate(' + o.radius + 'px,0)',
          borderRadius: (o.corners * o.width >> 1) + 'px'
        });
      }
      for (var seg, i = 0, start = (o.lines - 1) * (1 - o.direction) / 2; i < o.lines; i++)
        seg = css(createEl(), {
          position: 'absolute',
          top: 1 + ~(o.width / 2) + 'px',
          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: o.opacity,
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1 / o.speed + 's linear infinite'
        }), o.shadow && ins(seg, css(fill('#000', '0 0 4px #000'), { top: '2px' })), ins(el, ins(seg, fill(o.color, '0 0 1px rgba(0,0,0,.1)')));
      return el;
    },
    opacity: function (el, i, val) {
      i < el.childNodes.length && (el.childNodes[i].style.opacity = val);
    }
  });
  var probe = css(createEl('group'), { behavior: 'url(#default#VML)' });
  return !vendor(probe, 'transform') && probe.adj ? initVML() : useCssAnimations = vendor(probe, 'animation'), Spinner;
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
              shadow: !1,
              hwaccel: !0,
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
              shadow: !1,
              hwaccel: !0,
              className: 'spinner',
              zIndex: 2000000000,
              top: 'auto',
              left: 'auto'
            }
          }, ele = element[0], userOpts = scope.$eval(attrs.spinnerOptions) || {}, spinner = new $spinner(angular.extend({}, opts[attrs.spinnerSize || 'small'], userOpts)), isSpinning = !1;
        scope.$watch(function () {
          scope.$eval(attrs.spinner) && isSpinning === !1 ? (spinner.spin(ele), isSpinning = !0) : scope.$eval(attrs.spinner) || (spinner.stop(), isSpinning = !1);
        });
      }
    };
  }
]), angular.module('rescour.auth', []).config([
  '$httpProvider',
  '$routeProvider',
  function ($httpProvider, $routeProvider) {
    $httpProvider.defaults.useXDomain = !0, $httpProvider.defaults.withCredentials = !0, $routeProvider.when('/logout', {
      resolve: {
        checkUser: function ($rootScope) {
          $rootScope.$broadcast('auth#logoutRequest');
        }
      }
    }), $httpProvider.responseInterceptors.push('AuthInterceptor');
  }
]).run([
  '$rootScope',
  '$_api',
  '$location',
  '$q',
  '$http',
  function ($rootScope, $_api, $location, $q, $http) {
    $rootScope.requests401 = [], $http.defaults.useXDomain = !0, $rootScope.ping = function () {
      var defer = $q.defer(), path = $_api.path + '/auth/check/', config = angular.extend({
          transformRequest: function (data) {
            return data;
          }
        }, $_api.config);
      return $http.get(path, config).then(function (response) {
        response.data.user ? defer.resolve(response) : ($rootScope.$broadcast('auth#loginRequired'), defer.reject(response));
      }, function (response) {
        defer.reject(response);
      }), defer.promise;
    }, $rootScope.$on('auth#resendRequests', function () {
      function retry(req) {
        $http(req.config).then(function (response) {
          req.deferred.resolve(response);
        });
      }
      var i, requests = $rootScope.requests401;
      for (i = 0; i < requests.length; i++)
        retry(requests[i]);
      $rootScope.requests401 = [];
    }), $rootScope.$on('auth#paymentRequired', function () {
      $location.path('/account/activate/');
    }), $rootScope.$on('auth#paymentConfirmed', function () {
      $location.path('/account/welcome');
    }), $rootScope.$on('auth#loginRequest', function (event, creds) {
      $_api.auth.login(creds, function () {
        $rootScope.$broadcast('auth#loginConfirmed'), $location.path('/');
      }, function () {
        $rootScope.$broadcast('auth#loginRequired');
      });
    }), $rootScope.$on('auth#loginRequired', function () {
      $location.path('/login');
    }), $rootScope.$on('auth#logoutRequest', function () {
      var path = $_api.path + '/auth/logout/', config = angular.extend({
          transformRequest: function (data) {
            return data;
          }
        }, $_api.config), body = JSON.stringify({});
      $http.get(path, body, config).then(function () {
        $location.path('/login');
      }, function () {
        $location.path('/login');
      });
    });
  }
]).factory('AuthInterceptor', [
  '$q',
  '$rootScope',
  '$timeout',
  function ($q, $rootScope) {
    return function (promise) {
      var resolve = function () {
        }, reject = function (response) {
          var status = response.status, message = response.data.status_message;
          switch (status) {
          case 401:
            var defer = $q.defer(), req = {
                config: response.config,
                deferred: defer
              };
            return $rootScope.requests401.push(req), $rootScope.$broadcast('auth#loginRequired'), defer.promise;
          case 201:
            $rootScope.$broadcast('auth#loginRequired');
            break;
          case 402:
            var defer = $q.defer(), req = {
                config: response.config,
                deferred: defer
              };
            return $rootScope.requests401.push(req), 'payment required' === message ? $rootScope.$broadcast('auth#paymentRequired') : 'payment authorizing' === message && $rootScope.$broadcast('auth#paymentAuthorizing'), defer.promise;
          case 403:
            $rootScope.$broadcast('auth#logoutRequest');
          }
          return $q.reject(response);
        };
      return promise.then(resolve, reject), promise;
    };
  }
]), angular.module('rescour.browserDetect', []).provider('BrowserDetect', function () {
  var BrowserDetect = {
      init: function () {
        this.browser = this.searchString(this.dataBrowser) || 'An unknown browser', this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || 'an unknown version', this.OS = this.searchString(this.dataOS) || 'an unknown OS', this.platform = null != navigator.userAgent.match(/iPad/i) ? 'tablet' : 'desktop';
      },
      searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
          var dataString = data[i].string, dataProp = data[i].prop;
          if (this.versionSearchString = data[i].versionSearch || data[i].identity, dataString) {
            if (-1 != dataString.indexOf(data[i].subString))
              return data[i].identity;
          } else if (dataProp)
            return data[i].identity;
        }
      },
      searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (-1 != index)
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
  return BrowserDetect.init(), {
    platform: BrowserDetect.platform,
    $get: function () {
      return BrowserDetect;
    }
  };
}), angular.module('rescour.config', []).factory('$_api', function () {
  var url = { prod: 'https://api.maasive.net/v2/52956bfdc3034e4a0fe22ef9' }, stripeTokens = {
      test: 'pk_test_wSAqQNQKI7QqPmBpDcQLgGM7',
      prod: 'pk_live_4TLhgO3Pp1gOdWWmvLVK1PG3'
    }, config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: !0
    }, loading = {
      none: function (data) {
        return data;
      }
    };
  return {
    config: config,
    path: url.prod,
    loading: loading,
    stripeToken: stripeTokens.prod
  };
}), window.console || (window.console = {}), window.console.log || (window.console.log = function () {
}), angular.module('roomba.app', [
  'ui.bootstrap',
  'rescour.config',
  'rescour.auth',
  'rescour.user',
  'rescour.utility',
  'thotpod.spinner',
  'segmentio',
  'ui'
]).value('States', {
  AL: 'Alabama',
  AK: 'Alaska',
  AS: 'American Samoa',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District Of Columbia',
  FM: 'Federated States Of Micronesia',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MH: 'Marshall Islands',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  MP: 'Northern Mariana Islands',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PW: 'Palau',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VI: 'Virgin Islands',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming'
}).factory('Item', [
  '$_api',
  '$q',
  '$http',
  'States',
  '$rootScope',
  'segmentio',
  function ($_api, $q, $http, States, $rootScope, segmentio) {
    function ItemFactory(collection) {
      var Item = function (data, defaults) {
        var _defaults = defaults || {
            title: 'New ' + collection.title,
            _updatedBy: 'newUser',
            tags: [],
            isVisible: !0
          }, opts = angular.extend({}, _defaults, data), self = this;
        angular.copy(opts, this), 'listings' === collection.key || 'contacts' === collection.key ? (self.raw = self.raw || {}, self.edited = self.edited || {}, angular.forEach(collection.fields, function (fieldConfig) {
          var rawDefault = {
              value: null,
              status: null
            };
          if (fieldConfig.fields)
            for (var _rawField = self.raw[fieldConfig.key] = self.raw[fieldConfig.key] || {}, _editedField = self.edited[fieldConfig.key] = self.edited[fieldConfig.key] || {}, i = 0; i < fieldConfig.fields.length; i++) {
              var subFieldConfig = fieldConfig.fields[i];
              _rawField[subFieldConfig.key] = _rawField[subFieldConfig.key] || rawDefault, _editedField[subFieldConfig.key] = _editedField[subFieldConfig.key] || fieldConfig.placeholder || null, 2 == _rawField[subFieldConfig.key].status && (self.isConflict = !0), 'date' === subFieldConfig.type && (_editedField[subFieldConfig.key] = _editedField[subFieldConfig.key] ? new Date(_editedField[subFieldConfig.key]) : null, _rawField[subFieldConfig.key].value = _rawField[subFieldConfig.key].value ? new Date(_rawField[subFieldConfig.key].value) : null);
            }
          else
            self.raw[fieldConfig.key] = self.raw[fieldConfig.key] || rawDefault, self.edited[fieldConfig.key] = self.edited[fieldConfig.key] || fieldConfig.placeholder || null, 2 == self.raw[fieldConfig.key].status && 'page' !== fieldConfig.key ? self.isConflict = !0 : 3 == self.raw[fieldConfig.key].status && (self.isRemoved = !0), 'date' === fieldConfig.type && (self.edited[fieldConfig.key] = Date.parse(self.edited[fieldConfig.key]) ? new Date(self.edited[fieldConfig.key]) : self.edited[fieldConfig.key] ? new Date(parseInt(self.edited[fieldConfig.key], 10)) : null, self.raw[fieldConfig.key].value = Date.parse(self.raw[fieldConfig.key].value) ? new Date(self.raw[fieldConfig.key].value) : self.raw[fieldConfig.key].value ? new Date(parseInt(self.raw[fieldConfig.key].value, 10)) : null);
        }), angular.forEach(collection.models, function (modelConfig) {
          self.raw[modelConfig.key] = self.raw[modelConfig.key] || [], self.edited[modelConfig.key] = self.edited[modelConfig.key] || [];
          for (var i = 0; i < self.raw[modelConfig.key].length; i++)
            for (var modelInstance = self.raw[modelConfig.key][i], j = 0; j < modelConfig.fields.length; j++) {
              var modelFieldConfig = modelConfig.fields[j];
              modelInstance[modelFieldConfig.key] = modelInstance[modelFieldConfig.key] || {
                value: null,
                status: null
              }, 2 == modelInstance[modelFieldConfig.key].status && 'pages' != modelConfig.key && (self.isConflict = !0), 'date' === modelFieldConfig.type && (modelInstance[modelFieldConfig.key].value = modelInstance[modelFieldConfig.key].value ? new Date(modelInstance[modelFieldConfig.key]) : null);
            }
          for (var i = 0; i < self.edited[modelConfig.key].length; i++)
            for (var modelInstance = self.edited[modelConfig.key][i], j = 0; j < modelConfig.fields.length; j++) {
              var modelFieldConfig = modelConfig.fields[j];
              modelInstance[modelFieldConfig.key] = modelInstance[modelFieldConfig.key] || modelFieldConfig.placeholder || '', 'date' === modelFieldConfig.type && (modelInstance[modelFieldConfig.key] = modelInstance[modelFieldConfig.key] ? new Date(modelInstance[modelFieldConfig.key]) : null);
            }
        }), angular.forEach(collection.dimensions.discrete, function (attr, attrID) {
          if (attr.nested) {
            if (!self.raw.hasOwnProperty(attr.nested))
              throw new Error(attr.nested + ' is not defined in $collection');
            if (!self.raw[attr.nested].hasOwnProperty(attrID))
              throw new Error(attr.nested + ' has no property ' + attrID);
            self[attrID] = self.edited[attr.nested][attrID] || self.raw[attr.nested][attrID].value || attr.placeholder || '';
          } else if (self.hasOwnProperty(attrID))
            self[attrID] = self[attrID] || self.edited[attrID] || self.raw[attrID].value || attr.placeholder || '';
          else {
            if (!self.raw.hasOwnProperty(attrID))
              throw new Error(attrID + ' is not defined in $collection');
            self[attrID] = self.edited[attrID] || self.raw[attrID].value || attr.placeholder || '';
          }
        }), angular.forEach(collection.dimensions.range, function (attr, attrID) {
          self[attrID] = parseFloat(self.edited[attrID]) || parseFloat(self.raw[attrID].value);
        })) : (angular.forEach(collection.fields, function (fieldConfig) {
          if (fieldConfig.fields)
            for (var _field = self[fieldConfig.key] = self[fieldConfig.key] || {}, i = 0; i < fieldConfig.fields.length; i++) {
              var subFieldConfig = fieldConfig.fields[i];
              _field[subFieldConfig.key] = _field[subFieldConfig.key] || fieldConfig.placeholder || null, 'date' === subFieldConfig.type && (_field[subFieldConfig.key] = _field[subFieldConfig.key] ? new Date(_field[subFieldConfig.key]) : null);
            }
          else
            self[fieldConfig.key] = self[fieldConfig.key] || fieldConfig.placeholder || null, 'date' === fieldConfig.type && (self[fieldConfig.key] = self[fieldConfig.key] ? new Date(self[fieldConfig.key]) : null);
        }), angular.forEach(collection.models, function (modelConfig) {
          self[modelConfig.key] = self[modelConfig.key] || [];
        }), angular.forEach(collection.dimensions.discrete, function (attr, attrID) {
          if (attr.nested) {
            if (!self.hasOwnProperty(attr.nested))
              throw new Error(attr.nested + ' is not defined in $collection');
            if (!self[attr.nested].hasOwnProperty(attrID))
              throw new Error(attr.nested + ' has no property ' + attrID);
            self[attrID] = self[attr.nested][attrID] || attr.placeholder || '';
          } else {
            if (!self.hasOwnProperty(attrID))
              throw new Error(attrID + ' is not defined in $collection');
            self[attrID] = self[attrID] || attr.placeholder || '';
          }
        }), angular.forEach(collection.dimensions.range, function (attr, attrID) {
          self[attrID] = parseFloat(self[attrID]);
        })), 'listings' === collection.key ? (self.checkStateAbbreviation(), this.title = this.edited.title ? this.edited.title : this.raw.title.value || 'Untitled', self.pageUrl = self.edited.page || self.raw.page.value, self.prodId = self.prodId || null) : 'contacts' === collection.key ? this.title = this.edited.name ? this.edited.name : this.raw.name.value || 'Unnamed' : 'news' === collection.key && (self.age = Date.parse(self.date) ? Math.ceil(Math.abs(Date.now() - new Date(self.date)) / 86400000) : self.id ? new Date(self.date ? parseInt(this.date, 10) : 1000 * parseInt(this.id.toString().slice(0, 8), 16)) : 0, self.datePosted = self.date, self.checkStateAbbreviation(), self.checkSource());
      };
      return Item.collection = collection, Item.dimensions = collection.dimensions, Item.path = collection.path, Item.query = function (tag) {
        var items = [], defer = $q.defer(), config = angular.extend({
            transformRequest: function (data) {
              return data;
            }
          }, $_api.config), batchLimit = 500;
        return function batchItems(limit, offset) {
          var path = tag ? $_api.path + Item.path + tag : $_api.path + Item.path + '?limit=' + limit + (offset ? '&offset=' + offset : '');
          $http.get(path, config).then(function (response) {
            items = items.concat(response.data), response.data.length < limit ? defer.resolve(items) : batchItems(limit, response.data[response.data.length - 1].id);
          }, function (response) {
            defer.reject(response);
          });
        }(batchLimit), defer.promise;
      }, Item.prototype.$get = function () {
        var self = this, defer = $q.defer(), config = angular.extend({
            transformRequest: function (data) {
              return self.$spinner = !0, data;
            }
          }, $_api.config);
        return $http.get($_api.path + Item.path + '/' + this.id, config).then(function (response) {
          angular.extend(self, {}, response.data), self.$spinner = !1, defer.resolve(self);
        }, function (response) {
          self.$spinner = !1, defer.reject(response);
        }), defer.promise;
      }, Item.prototype.$geocode = function () {
        var defer = $q.defer(), self = this, geocoder = new google.maps.Geocoder(), address = self.edited ? self.edited.address : self.address;
        return address.street1 && address.city && address.state ? geocoder.geocode({ address: address.street1 + ',' + address.city + ',' + address.state }, function (results, status) {
          if ($rootScope.$$phase)
            if (results) {
              var _location = results[0].geometry.location;
              if ('listings' == collection.key) {
                var _county = null;
                if (results[0].address_components)
                  for (var i = 0; i < results[0].address_components.length; i++) {
                    var component = results[0].address_components[i];
                    if ('administrative_area_level_2' == component.types[0]) {
                      _county = component.long_name;
                      break;
                    }
                  }
                _location && _county ? (self.edited.county = _county.substr(0, _county.indexOf(' ')), address.latitude = _location.lat(), address.longitude = _location.lng(), defer.resolve({ status: 'success' })) : defer.reject(_location && !_county ? { message: 'Could not find county.' } : !_location && _county ? { message: 'Could not find location.' } : { message: 'Could not find location and county.' });
              } else
                _location ? (address.latitude = _location.lat(), address.longitude = _location.lng(), defer.resolve({ status: 'success' })) : defer.reject({ message: 'Could not find location.' });
            } else
              defer.resolve({
                message: status,
                status: 0
              });
          else
            $rootScope.$apply(function () {
              if (results && results[0]) {
                var _location = results[0].geometry.location;
                if ('listings' == collection.key) {
                  var _county = null;
                  if (results[0].address_components)
                    for (var i = 0; i < results[0].address_components.length; i++) {
                      var component = results[0].address_components[i];
                      if ('administrative_area_level_2' == component.types[0]) {
                        _county = component.long_name, console.log(_county);
                        break;
                      }
                    }
                  _location && _county ? (self.edited.county = _county.substr(0, _county.indexOf(' ')), address.latitude = _location.lat(), address.longitude = _location.lng(), defer.resolve({ status: 'success' })) : defer.reject(_location && !_county ? { message: 'Could not find county.' } : !_location && _county ? { message: 'Could not find location.' } : { message: 'Could not find location and county.' });
                } else
                  _location ? (address.latitude = _location.lat(), address.longitude = _location.lng(), defer.resolve({ status: 'success' })) : defer.reject({ message: 'Could not find location.' });
              } else
                defer.resolve({
                  message: status,
                  status: 0
                });
            });
        }) : defer.resolve({
          status: 0,
          message: 'No address provided.'
        }), console.log(self), defer.promise;
      }, Item.prototype.$getResources = function () {
        for (var self = this, promises = [], config = angular.extend({
              transformRequest: function (data) {
                return self.$spinner = !0, data;
              }
            }, $_api.config), i = collection.resources.length - 1; i >= 0; i--) {
          var _resource = collection.resources[i];
          !function (resourceKey) {
            var _defer = $q.defer(), resourcePath = _resource.path;
            self.resources[resourceKey] && $http.get($_api.path + Item.path + self.id + '/resources' + resourcePath, config).then(function (response) {
              self.$spinner = !1;
              var _resources = {};
              _resources[resourceKey] = response.data, _defer.resolve(_resources);
            }, function (response) {
              self.$spinner = !1, _defer.reject(response);
            }), promises.push(_defer.promise);
          }(_resource.key);
        }
        return $q.all(promises);
      }, Item.prototype.$saveResources = function (resources) {
        var self = this, promises = [], config = angular.extend({
            transformRequest: function (data) {
              return self.$spinner = !0, data;
            }
          }, $_api.config);
        self.resources = self.resources || {};
        for (var i = 0; i < collection.resources.length; i++)
          for (var _resource = collection.resources[i], _resourcePath = _resource.path, j = 0; j < resources[_resource.key].length; j++) {
            var _resourceInstance = resources[_resource.key][j], _defer = $q.defer(), body = angular.toJson(_resourceInstance);
            self.resources[_resource.key] = self.resources[_resource.key] || [], _resourceInstance.id ? !function (defer) {
              $http.put($_api.path + _resourcePath + _resourceInstance.id, body, config).then(function () {
                self.$spinner = !1, defer.resolve();
              }, function () {
                self.$spinner = !1, defer.reject();
              }), promises.push(_defer.promise);
            }(_defer) : !function (defer, resourceKey, resourceInstance) {
              $http.post($_api.path + _resourcePath, body, config).then(function (response) {
                self.$spinner = !1;
                var _id = response.data.id;
                resourceInstance.id = _id, self.resources[resourceKey].push(_id), defer.resolve(response.data.id);
              }, function () {
                self.$spinner = !1, defer.reject();
              }), promises.push(_defer.promise);
            }(_defer, _resource.key, _resourceInstance);
          }
        return $q.all(promises);
      }, Item.prototype.$update = function () {
        var self = this, defer = $q.defer(), config = angular.extend({
            transformRequest: function (data) {
              return self.$spinner = !0, data;
            }
          }, $_api.config), body = angular.toJson(self);
        return self.id ? $http.put($_api.path + Item.path + self.id, body, config).then(function (response) {
          self.$spinner = !1, defer.resolve(response);
        }, function (response) {
          self.$spinner = !1, defer.reject(response);
        }) : $http.post($_api.path + Item.path, body, config).then(function (response) {
          self.$spinner = !1, self.id = response.data.id, defer.resolve(response);
        }, function (response) {
          self.$spinner = !1, defer.reject(response);
        }), defer.promise;
      }, Item.prototype.$updateTags = function () {
        var self = this, defer = $q.defer(), config = angular.extend({
            transformRequest: function (data) {
              return self.$spinner = !0, data;
            }
          }, $_api.config), body = angular.toJson({ tags: self.tags });
        return $http.put($_api.path + Item.path + self.id, body, config).then(function (response) {
          self.$spinner = !1, defer.resolve(response);
        }, function (response) {
          self.$spinner = !1, defer.reject(response);
        }), defer.promise;
      }, Item.prototype.$delete = function () {
        var self = this, defer = $q.defer(), config = angular.extend({
            transformRequest: function (data) {
              return self.$spinner = !0, data;
            }
          }, $_api.config);
        return $http.delete($_api.path + Item.path + self.id, config).then(function (response) {
          self.$spinner = !1, defer.resolve(response);
        }, function (response) {
          self.$spinner = !1, defer.reject(response);
        }), defer.promise;
      }, Item.prototype.$save = function () {
        return this.tags = _.without(this.tags, 'edited', 'raw'), this.tags.push('edited'), this.$update().then(function () {
          segmentio.track('Saved ' + collection.key);
        });
      }, Item.prototype.$publish = function () {
        return this.tags = _.without(this.tags, 'published', 'unpublished'), this.tags.push('published'), this.$updateTags().then(function () {
          segmentio.track('Published ' + collection.key);
        });
      }, Item.prototype.$unpublish = function () {
        return this.tags = _.without(this.tags, 'published', 'unpublished'), this.tags.push('unpublished'), this.$updateTags().then(function () {
          segmentio.track('Unpublished ' + collection.key);
        });
      }, Item.prototype.$flag = function () {
        return _.contains(this.tags, 'flagged') ? this.tags = _.without(this.tags, 'flagged') : this.tags.push('flagged'), this.$updateTags().then(function () {
          segmentio.track('Flagged ' + collection.key);
        });
      }, Item.prototype.$join = function (selectedItem) {
        function isNull(obj) {
          var _isNull = !0;
          return function recursive(obj) {
            if (angular.isObject(obj))
              angular.forEach(obj, function (value) {
                recursive(value);
              });
            else if (null != obj && '' != obj && !angular.isArray(obj) && !angular.isObject(obj))
              return void (_isNull = !1);
          }(obj), _isNull;
        }
        var defer = $q.defer();
        if (!selectedItem)
          throw new Error('No Item to join with');
        var _oldItem = null, _newItem = null;
        return isNull(this.raw) && isNull(selectedItem.edited) ? (_oldItem = this, _newItem = selectedItem) : isNull(this.edited) && isNull(selectedItem.raw) && (_oldItem = selectedItem, _newItem = this), _oldItem && _newItem ? (_newItem.tags = _oldItem.tags, _newItem.edited = _oldItem.edited, _newItem.resources = _oldItem.resources, _newItem.prodId = _oldItem.prodId, _newItem.$save().then(function () {
          return _oldItem.$delete();
        }, function (response) {
          defer.reject(response);
        }).then(function () {
          segmentio.track('Joined ' + collection.key), defer.resolve(_oldItem);
        }, function (response) {
          defer.reject(response);
        })) : (console.log('Old: ', _oldItem, this), console.log('New: ', _newItem, selectedItem), defer.reject({ message: 'Items are not compatible to join' })), defer.promise;
      }, Item.prototype.calcFillPercent = function () {
        var self = this, _edited = self.edited, _raw = self.raw, hasEdited = !1, fieldCounter = {
            total: 0,
            filled: 0
          };
        return _edited && _raw ? (angular.forEach(_edited, function (editedField) {
          angular.isArray(editedField) ? angular.forEach(editedField, function (editedModel) {
            angular.forEach(editedModel, function (editedModelField) {
              editedModelField && (hasEdited = !0, fieldCounter.filled++), fieldCounter.total++;
            });
          }) : angular.isObject(editedField) ? angular.forEach(editedField, function (editedSubField) {
            editedSubField && (hasEdited = !0, fieldCounter.filled++), fieldCounter.total++;
          }) : (editedField && (hasEdited = !0, fieldCounter.filled++), fieldCounter.total++);
        }), hasEdited ? self.progressClass = self.isRemoved ? 'progress-bar-danger' : self.isConflict ? 'progress-bar-warning' : 'progress-bar-info' : (fieldCounter.total = 0, fieldCounter.filled = 0, angular.forEach(_raw, function (rawField) {
          if (rawField.hasOwnProperty('value') && rawField.hasOwnProperty('status'))
            rawField.value && fieldCounter.filled++, fieldCounter.total++;
          else if (angular.isArray(rawField))
            angular.forEach(rawField, function (rawModel) {
              angular.forEach(rawModel, function (rawModelField) {
                rawModelField.value && fieldCounter.filled++, fieldCounter.total++;
              });
            });
          else {
            if (!angular.isObject(rawField))
              throw new Error('Raw field is not in recognized format');
            angular.forEach(rawField, function (rawSubField) {
              rawSubField.value && fieldCounter.filled++, fieldCounter.total++;
            });
          }
        }), self.progressClass = self.isRemoved ? 'progress-bar-danger' : self.isConflict ? 'progress-bar-warning' : 'progress-bar-success')) : (fieldCounter.total = 0, fieldCounter.filled = 0, angular.forEach(collection.fields, function (fieldConfig) {
          fieldConfig.fields ? angular.forEach(fieldConfig.fields, function (subFieldConfig) {
            self[fieldConfig.key][subFieldConfig.key] && fieldCounter.filled++, fieldCounter.total++;
          }) : (self[fieldConfig.key] && fieldCounter.filled++, fieldCounter.total++);
        }), self.progressClass = ''), this.completion = parseInt(fieldCounter.filled / fieldCounter.total * 100, 10), this.completion + '%';
      }, Item.prototype.checkStateAbbreviation = function () {
        if (this.address) {
          var state = this.address.state ? this.address.state.replace(/\s+/g, '').toUpperCase() : null;
          States.hasOwnProperty(state) && (this.address.state = States[state]);
        } else if (this.hasOwnProperty('raw') && this.raw.address.state.value) {
          var state = this.raw.address.state.value ? this.raw.address.state.value.replace(/\s+/g, '').toUpperCase() : null;
          States.hasOwnProperty(state) && (this.raw.address.state.value = States[state]);
        }
      }, Item.prototype.checkSource = function () {
        var sources = {
            'www.bizjournals.com': 'The Business Journals',
            'bizjournals.com': 'The Business Journals',
            'www.rebusinessonline.com': 'REBusiness Online',
            'rebusinessonline.com': 'REBusiness Online',
            'www.globest.com': 'GlobeSt.com',
            'globest.com': 'GlobeSt.com',
            'www.multifamilybiz.com': 'MultifamilyBiz.com',
            'multifamilybiz.com': 'MultifamilyBiz.com',
            'www.multihousingnews.com': 'Multi-Housing News',
            'multihousingnews.com': 'Multi-Housing News'
          };
        if (this.url && !this.source) {
          var sourceUrl = this.url.split(/^http:\/\//)[1];
          this.source = sourceUrl ? sources[sourceUrl.split(/\//)[0]] || '' : sources[this.url.split(/\//)[0]] || '';
        }
      }, Item.prototype.hasPageConflict = function () {
        return this.raw && this.raw.page ? 2 == this.raw.page.status : !1;
      }, Item;
    }
    return ItemFactory;
  }
]).config([
  '$routeProvider',
  '$locationProvider',
  '$httpProvider',
  function ($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = !0, $httpProvider.defaults.withCredentials = !0, $locationProvider.html5Mode(!0), $routeProvider.when('/', { redirectTo: '/market/' }).otherwise({ redirectTo: '/' });
  }
]).run([
  'segmentio',
  function (segmentio) {
    segmentio.load('qeyja0akdl');
  }
]).controller('AppController', [
  '$scope',
  '$rootScope',
  '$location',
  '$_api',
  '$http',
  function ($scope, $rootScope) {
    $rootScope.$on('$routeChangeStart', function () {
      $scope.loading = !0, $scope.failure = !1;
    }), $rootScope.$on('$routeChangeSuccess', function () {
      $scope.loading = !1, $scope.failure = !1;
    }), $rootScope.$on('$routeChangeError', function () {
      $scope.loading = !1, $scope.failure = !0;
    }), $scope.globalAlerts = [], $scope.setGlobalAlert = function (alert) {
      $scope.globalAlerts = angular.isArray(alert) ? alert : [alert];
    }, $scope.addGlobalAlert = function (alert) {
      $scope.globalAlerts.push(alert);
    }, $scope.closeGlobalAlert = function (alert) {
      $scope.globalAlerts = _.reject($scope.globalAlerts, function (val) {
        return angular.equals(alert, val);
      });
    }, $scope.clearGlobalAlerts = function () {
      $scope.globalAlerts = [];
    };
  }
]), angular.module('roomba.app').config([
  '$routeProvider',
  '$provide',
  function ($routeProvider) {
    $routeProvider.when('/market', { redirectTo: '/market/listings' }).when('/market/:collection', {
      templateUrl: '/app/market/views/market.html?v=' + Date.now(),
      controller: 'CollectionCtrl',
      reloadOnSearch: !1,
      resolve: {
        init: function ($q, $http, User, Users) {
          var defer = $q.defer();
          return User.get().then(function (user) {
            defer.resolve(User.isAdmin ? Users.init() : user);
          }), defer.promise;
        },
        Market: function ($route, $q, Models) {
          var _Item, defer = $q.defer();
          return Models.request().then(function (models) {
            return _Item = models[$route.current.params.collection], _Item && Models.setActive($route.current.params.collection), _Item.query();
          }).then(function (response) {
            var Market = new thotpod.Marketplace(_Item);
            Market.initialize(_Item.dimensions, response), defer.resolve(Market);
          }), defer.promise;
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
  'Users',
  'User',
  '$window',
  function ($scope, Market, $routeParams, $location, $q, $dialog, Users, User, $window) {
    function setActiveItem(id) {
      id && ($scope.selectItem(id), $scope.activeItem && $scope.activeItem.$getResources().then(function (results) {
        for (var i = results.length - 1; i >= 0; i--)
          for (var _resource in results[i])
            results[i].hasOwnProperty(_resource) && ($scope.activeItemResources[_resource] = [], angular.copy(results[i][_resource], $scope.activeItemResources[_resource]));
      }));
    }
    var Model = Market.Model;
    $scope.items = Market.visibleItems, $scope.dimensions = Market.dimensions, $scope.activeItem = Market.getActive(), $scope.activeItemResources = {}, $scope.collectionID = $routeParams.collection, $scope.collection = Model.collection, $scope.srcListingDetails = '/app/market/partials/' + $scope.collection.key + '-details.html?v=' + Date.now(), $scope.searchBy = { $: '' }, $scope.marketView = { collapseFilters: !0 }, $scope.activeSearch = {
      title: 'Any',
      key: '$'
    }, User.isAdmin && ($scope.users = Users.generateStats($scope.collectionID, Market.getItems())), $scope.joinDialog = $dialog.dialog({
      templateUrl: '/app/market/partials/join-dialog.html?v=' + Date.now(),
      controller: 'JoinDialogCtrl',
      backdrop: !0,
      keyboard: !0,
      backdropClick: !0,
      dialogFade: !0,
      backdropFade: !0,
      resolve: {
        Market: function () {
          return Market;
        }
      }
    }), $scope.userDialog = $dialog.dialog({
      templateUrl: '/app/market/partials/user-dialog.html?v=' + Date.now(),
      controller: 'UserDialogCtrl',
      resolve: {
        user: function () {
          return $scope.users[$scope.activeItem._updatedBy];
        },
        collection: function () {
          return $scope.collectionID;
        }
      }
    }), $scope.openUserDialog = function () {
      $scope.userDialog.open().then(function (item) {
        item && $location.search('id', item.id);
      });
    }, $scope.applyFilters = function () {
      $scope.items = Market.apply();
    }, $scope.selectItem = function (item) {
      Market.setActive(item) && ($scope.previousActive = $scope.activeItem, $scope.activeItem = Market.getActive(), $scope.activeItem.isActive = !0, $scope.activeItemResources = {}, $scope.previousActive && ($scope.previousActive.isActive = !1));
    }, $location.search().id && setActiveItem($location.search().id), $scope.$on('$locationChangeSuccess', function () {
      $location.search().id && setActiveItem($location.search().id);
    }), $scope.getStatusBg = function (status, type) {
      switch (type = type || 'solid', status) {
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
    }, $scope.newItem = function () {
      var _newItem = new Model();
      $scope.items.unshift(_newItem), $scope.selectItem(_newItem);
    }, $scope.duplicateNewsItem = function (newsItem) {
      var _dupe = new Model();
      'New News' == _dupe.title ? (_dupe.address = newsItem.address, _dupe.body = newsItem.body, _dupe.category = newsItem.category, _dupe.city = newsItem.city, _dupe.date = newsItem.date, _dupe.datePosted = newsItem.datePosted, _dupe.site = newsItem.site, _dupe.source = newsItem.source, _dupe.state = newsItem.state, _dupe.tags = newsItem.tags, _dupe.title = newsItem.title, _dupe.url = newsItem.url, $scope.items.unshift(_dupe), $scope.selectItem(_dupe)) : console.log('Cannot currently duplicated other item types');
    }, $scope.findMyAssessor = function (activeItem) {
      var _county = activeItem.edited.county.toLowerCase(), url = 'http://publicrecords.netronline.com/state/GA/county/' + _county + '/';
      $window.open(url);
    }, $scope.visitMyAssessor = function (activeItem) {
      $window.open(activeItem.edited.assessorUrl);
    }, $scope.classRawField = function (field) {
      return field ? field.copied ? 'status-btn-success' : $scope.getStatusBg(field.status, 'btn') : void 0;
    }, $scope.isRawNull = function (field) {
      return field ? '' === field.value || null == field.value : !0;
    }, $scope.hasTag = function (item, tag) {
      return _.contains(item.tags, tag);
    }, $scope.setSearchCriteria = function (field) {
      $scope.activeSearch = {}, $scope.activeSearch = field ? field : {
        title: 'Any',
        key: '$'
      }, $scope.searchBy[$scope.activeSearch.key] = '';
    }, $scope.flagSelected = function () {
      for (var successes = 0, i = $scope.items.length - 1; i >= 0; i--) {
        var _item = $scope.items[i];
        _item.isSelected && (_item.$flag().then(function () {
          successes++, $scope.setGlobalAlert({
            type: 'success',
            text: successes + ' items flagged.'
          });
        }), _item.isSelected = !1);
      }
    }, $scope.publishSelected = function () {
      for (var successes = 0, i = $scope.items.length - 1; i >= 0; i--) {
        var _item = $scope.items[i];
        _item.isSelected && (_item.$publish().then(function () {
          successes++, $scope.setGlobalAlert({
            type: 'success',
            text: successes + ' items published.'
          });
        }), _item.isSelected = !1);
      }
    }, $scope.unpublishSelected = function () {
      for (var successes = 0, i = $scope.items.length - 1; i >= 0; i--) {
        var _item = $scope.items[i];
        _item.isSelected && (_item.$unpublish().then(function () {
          successes++, $scope.setGlobalAlert({
            type: 'success',
            text: successes + ' items unpublished.'
          });
        }), _item.isSelected = !1);
      }
    }, $scope.saveSelected = function () {
      function saveAll() {
        for (var promises = [], i = $scope.items.length - 1; i >= 0; i--) {
          var _item = $scope.items[i];
          if (_item.isSelected) {
            var defer = $q.defer();
            !function (defer, saveStats, _item) {
              _item.$geocode().then(function (response) {
                return response.status ? saveStats.geoSuccesses++ : (console.log(response), saveStats.geoFails++), _item.$save();
              }, function (response) {
                console.log(response), saveStats.geoFails++;
              }).then(function () {
                saveStats.saveSuccesses++, defer.resolve();
              }, function () {
                defer.reject(), saveStats.saveFails++;
              });
            }(defer, saveStats, _item), promises.push(defer.promise), _item.isSelected = !1;
          }
        }
        return $q.all(promises);
      }
      var saveStats = {
          saveSuccesses: 0,
          saveFails: 0,
          geoSuccesses: 0,
          geoFails: 0
        };
      saveAll().then(function () {
        $scope.setGlobalAlert(saveStats.geoFails || saveStats.saveFails ? [
          {
            type: 'success',
            text: saveStats.geoSuccesses + ' items geocoded. ' + saveStats.saveSuccesses + ' items saved.'
          },
          {
            type: 'danger',
            text: saveStats.geoFails + ' geocode fails.' + saveStats.saveFails + ' save fails.  '
          }
        ] : {
          type: 'success',
          text: saveStats.geoSuccesses + ' items geocoded. ' + saveStats.saveSuccesses + ' items saved.'
        });
      });
    }, $scope.openJoinDialog = function () {
      $scope.joinDialog.open().then(function (response) {
        response && $scope.setGlobalAlert({
          type: response.status,
          text: response.message
        });
      });
    }, $scope.noop = function () {
      return null;
    }, $scope.toggleDiscrete = function (discrete, value) {
      $scope.items = Market.toggleDiscrete(discrete, value).apply(), Market.predict();
    };
  }
]).controller('MarketListCtrl', [
  '$scope',
  '$location',
  function ($scope, $location) {
    var selectToggle = !0;
    $scope.openDetails = function (item) {
      item.id ? $location.search('id', item.id) : ($location.search('id', ''), $scope.selectItem(item));
    }, $scope.sortFields = {
      title: !1,
      completion: !1,
      state: !1,
      datePosted: !1
    }, $scope.setSortField = function (sortField) {
      angular.forEach($scope.sortFields, function (value, key) {
        $scope.sortFields[key] = !1;
      }), $scope.sortBy = sortField, $scope.sortFields[sortField] = !0;
    }, $scope.toggleSelectAll = function () {
      angular.forEach($scope.filteredItems, function (value) {
        value.isSelected = selectToggle;
      }), selectToggle = !selectToggle;
    };
  }
]).controller('DetailsCtrl', [
  '$scope',
  '$routeParams',
  function ($scope) {
    function copyRaw(obj) {
      angular.forEach(obj.raw, function (rawValue, key) {
        rawValue.hasOwnProperty('status') && rawValue.hasOwnProperty('value') ? obj.edited[key] || null == rawValue.value || $scope.copyFromRaw(obj, key) : rawValue.length ? !obj.edited[key].length && angular.isArray(obj.edited[key]) && angular.forEach(rawValue, function (rawModel) {
          $scope.copyModelFromRaw(obj, key, rawModel);
        }) : angular.isArray(rawValue) || angular.forEach(rawValue, function (rawSubValue, subKey) {
          rawSubValue.hasOwnProperty('status') && rawSubValue.hasOwnProperty('value') && rawSubValue.value && $scope.copySubfieldFromRaw(obj, key, subKey);
        });
      });
    }
    $scope.notPublished = function (item) {
      return !_.contains(item.tags, 'published');
    }, $scope.copyAllRaw = function (item, itemResources) {
      item.hasOwnProperty('raw') && item.hasOwnProperty('edited') && copyRaw(item), angular.forEach(itemResources, function (subresources) {
        angular.forEach(subresources, function (subresource) {
          subresource.hasOwnProperty('raw') && subresource.hasOwnProperty('edited') && copyRaw(subresource);
        });
      });
    }, $scope.copyModelFromRaw = function (item, modelKey, rawModel) {
      var _modelConfig = _.find($scope.collection.models, function (val) {
          return val.key === modelKey;
        }), _editedModel = {};
      angular.forEach(_modelConfig.fields, function (modelField) {
        _editedModel[modelField.key] = rawModel[modelField.key].value || '';
      }), item.edited[modelKey].push(_editedModel), rawModel.copied = !0;
    }, $scope.copyFromRaw = function (item, fieldKey) {
      item.edited[fieldKey] = item.raw[fieldKey].value, item.raw[fieldKey].copied = !0;
    }, $scope.copySubfieldFromRaw = function (item, fieldKey, subfieldKey) {
      item.edited[fieldKey][subfieldKey] = item.raw[fieldKey][subfieldKey].value, item.raw[fieldKey][subfieldKey].copied = !0;
    }, $scope.saveItem = function (item) {
      $scope.clearGlobalAlerts(), _.isEmpty($scope.activeItemResources) ? item.$geocode().then(function (response) {
        return $scope.addGlobalAlert(response.status ? {
          type: 'success',
          text: item.title + ' successfully geocoded.'
        } : {
          type: 'warning',
          text: item.title + ' did not geocode: ' + response.message
        }), item.$save();
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
      }) : item.$geocode().then(function (response) {
        return $scope.addGlobalAlert(response.status ? {
          type: 'success',
          text: item.title + ' successfully geocoded.'
        } : {
          type: 'warning',
          text: item.title + ' did not geocode: ' + response.message
        }), item.$saveResources($scope.activeItemResources);
      }, function (response) {
        $scope.addGlobalAlert({
          type: 'danger',
          text: 'Error during geocoding: ' + response.message || ''
        });
      }).then(function () {
        return $scope.addGlobalAlert({
          type: 'success',
          text: 'Resources successfully saved.'
        }), item.$save();
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
      }, function () {
        $scope.addGlobalAlert({
          type: 'danger',
          text: 'Failed to save ' + item.title + '.'
        });
      });
    };
  }
]).controller('ResourceCtrl', [
  '$scope',
  function ($scope) {
    $scope.newResource = {}, $scope.resourceView = {}, $scope.addResource = function (resourceKey, resource) {
      _.isEmpty(resource) ? console.log('empty!') : ($scope.activeItemResources[resourceKey] = $scope.activeItemResources[resourceKey] || [], $scope.activeItemResources[resourceKey].push(angular.extend({}, { edited: resource })), $scope.newResource = {}, $scope.$broadcast('ResourceAdded'));
    }, $scope.removeResource = function (resourceKey, itemResource) {
      $scope.activeItem.resources[resourceKey] = _.reject($scope.activeItem.resources[resourceKey], function (val) {
        return val === itemResource.id;
      }), $scope.activeItemResources[resourceKey] = _.reject($scope.activeItemResources[resourceKey], function (val) {
        return val.$$hashKey === itemResource.$$hashKey;
      });
    };
  }
]).controller('ModelCtrl', [
  '$scope',
  function ($scope) {
    $scope.newModel = {}, $scope.modelView = {}, $scope.addModel = function (item, modelKey, model) {
      _.isEmpty(model) || (item.edited[modelKey].push(model), $scope.newModel = {}, $scope.$broadcast('ModelAdded'));
    }, $scope.removeModel = function (item, modelKey, model) {
      item.edited[modelKey] = _.reject(item.edited[modelKey], function (val) {
        return val.$$hashKey === model.$$hashKey;
      });
    }, $scope.showRaw = function () {
      $scope.modelView.showRaw = !$scope.modelView.showRaw;
    };
  }
]).controller('JoinDialogCtrl', [
  '$scope',
  'Market',
  'dialog',
  'Models',
  function ($scope, Market, dialog, Models) {
    $scope.activeItem = Market.getActive(), $scope.joinItems = _.without(Market.getItems(), $scope.activeItem), $scope.selectedItem = {}, $scope.collection = Models.getActive().collection, $scope.searchBy = {}, $scope.join = function (selectedItem) {
      $scope.activeItem.$join(selectedItem).then(function () {
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
    }, $scope.selectItem = function (item) {
      $scope.selectedItem = item;
    }, $scope.close = function () {
      dialog.close();
    }, $scope.hasTag = function (item, tag) {
      return _.contains(item.tags, tag);
    };
  }
]).controller('UserDialogCtrl', [
  '$scope',
  'user',
  'dialog',
  'collection',
  function ($scope, user, dialog, collection) {
    $scope.user = user, $scope.collection = collection, $scope.close = function () {
      dialog.close();
    }, $scope.openItem = function (item) {
      dialog.close(item);
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
        return $http.get('/app-config/market.json', $_api.config).success(function (response) {
          angular.forEach(response, function (value, key) {
            models[key] = Item(value);
          }), defer.resolve(models);
        }).error(function () {
          console.log('error');
        }), defer.promise;
      }
    };
  }
]).directive('focusFirstOn', function () {
  return {
    link: function (scope, element, attrs) {
      scope.$on(attrs.focusFirstOn, function () {
        0 === scope.$index && element[0].focus();
      });
    }
  };
}).directive('slider', [
  '$timeout',
  function () {
    return {
      restrict: 'A',
      link: function (scope, element) {
        function setupSlider() {
          $(element).slider({
            range: !0,
            min: 0,
            max: 100,
            values: [
              parseInt((scope.range.lowSelected - scope.range.low) / (scope.range.high - scope.range.low) * 100, 10),
              parseInt((scope.range.highSelected - scope.range.low) / (scope.range.high - scope.range.low) * 100, 10)
            ],
            step: 1,
            slide: function (event, ui) {
              scope.$apply(function () {
                scope.range.lowSelected = parseInt(ui.values[0] / 100 * (scope.range.high - scope.range.low) + scope.range.low, 10), scope.range.highSelected = parseInt(ui.values[1] / 100 * (scope.range.high - scope.range.low) + scope.range.low, 10);
              });
            },
            stop: function () {
              scope.$apply(function () {
                scope.applyFilters();
              }), scope.$apply();
            }
          });
        }
        setupSlider();
      }
    };
  }
]).filter('checkHighBound', function () {
  return function (input, limit) {
    return input == limit ? input + '+' : input;
  };
}).filter('checkLowBound', function () {
  return function (input, limit) {
    return input == limit ? '< ' + input : input;
  };
}), angular.module('roomba.app').config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: '/app/login/views/login.html?' + Date.now(),
      controller: 'LoginController',
      resolve: {
        checkUser: function () {
        }
      }
    }), $routeProvider.when('/login/forgot-password', {
      templateUrl: '/app/login/views/forgot-password.html?v=' + Date.now(),
      controller: 'ForgotPasswordController'
    }), $routeProvider.when('/login/reset-password', {
      templateUrl: '/app/login/views/reset-password.html?v=' + Date.now(),
      controller: 'ResetPasswordController',
      resolve: {
        checkToken: function ($location) {
          $location.search().token || $location.path('/login/forgot-password');
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
    $scope.creds = {}, $scope.loginAlerts = [];
    var loginFailAlert = {
        type: 'danger',
        msg: 'Incorrect email password combination.  Please try again.'
      }, loginAuthenticatingAlert = {
        type: 'info',
        msg: 'Authenticating'
      };
    $scope.login = function () {
      var path = $_api.path + '/auth/login/', config = angular.extend({
          transformRequest: function (data) {
            return $scope.loginAlerts = [loginAuthenticatingAlert], data;
          }
        }, $_api.config), body = JSON.stringify($scope.creds);
      $http.post(path, body, config).then(function () {
        $scope.loginAlerts = [], $scope.$broadcast('auth#resendRequests'), $location.path('/');
      }, function (response) {
        $scope.loginAlerts = [loginFailAlert], console.log(response), $scope.creds.password = '';
      });
    }, $scope.forgotPassword = function () {
      $location.path('/login/forgot-password');
    };
  }
]).controller('ForgotPasswordController', [
  '$scope',
  '$location',
  '$http',
  '$_api',
  function ($scope, $location, $http, $_api) {
    $scope.creds = {}, $scope.forgotPasswordAlerts = [], $scope.emailInstructions = function () {
      var path = $_api.path + '/auth/reset/', config = angular.extend({
          transformRequest: function (data) {
            return $scope.forgotPasswordAlerts = [{
                type: 'info',
                msg: 'Sending email...'
              }], data;
          }
        }, $_api.config), body = JSON.stringify($scope.creds);
      $http.post(path, body, config).then(function () {
        $scope.creds = {}, $scope.forgotPasswordAlerts = [{
            type: 'success',
            msg: 'Please check your email!'
          }];
      }, function () {
        $scope.forgotPasswordAlerts = [{
            type: 'danger',
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
    $scope.creds = {}, $scope.resetPasswordAlerts = [], $scope.resetPassword = function () {
      if ($scope.formResetPassword.$valid) {
        var path = $_api.path + '/auth/reset/', config = angular.extend({
            transformRequest: function (data) {
              return $scope.resetPasswordAlerts = [{
                  type: 'info',
                  msg: 'Resetting password...'
                }], data;
            }
          }, $_api.config), body = JSON.stringify({
            token: $location.search().token,
            newPassword: $scope.creds.newPassword,
            verifyPassword: $scope.creds.verifyPassword
          });
        $http.post(path, body, config).then(function () {
          $scope.resetPasswordAlerts = [{
              type: 'success',
              msg: 'Password changed!  Redirecting to login..'
            }], $timeout(function () {
            $location.path('/login');
          }, 1000);
        }, function (response) {
          $scope.resetPasswordAlerts = [{
              type: 'danger',
              msg: response.data.status_message
            }];
        });
      }
    };
  }
]), angular.bootstrap(document, ['roomba.app']);