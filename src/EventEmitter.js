// The 'EventEmitter' base class implements the 'Observer Pattern'.
//
// Borrowed mostly from NodeJS's 'EventEmitter' class.  Origin:
//   https://github.com/joyent/node/blob/master/lib/events.js

var isArray = Array.isArray || function(a) { return Object.prototype.toString.call(a) === '[object Array]'; };

function EventEmitter() {
}
module.exports = EventEmitter;


EventEmitter.prototype['emit'] = function(type) {
  // If there is no 'error' event listener then throw.
  // TODO: Either remove this logic entirely, or have it be
  // emitted on the 'Game' instance instead.
  if (type === 'error') {
    if (!this._events || !this._events['error'] ||
        (isArray(this._events['error']) && !this._events['error'].length))
    {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
    }
  }

  if (!this._events) return false;
  var handler = this._events[type];
  if (!handler) return false;

  if (typeof handler == 'function') {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        var args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
    return true;

  } else if (isArray(handler)) {
    var args = Array.prototype.slice.call(arguments, 1);

    var listeners = handler.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
      listeners[i].apply(this, args);
    }
    return true;

  } else {
    return false;
  }
}


EventEmitter.prototype['on'] = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('"addListener" only takes instances of Function');
  }

  if (!this._events) this._events = {};

  // To avoid recursion in the case that type == "newListeners"! Before
  // adding it to the listeners, first emit "newListeners".
  this['emit']('newListener', type, listener);

  if (!this._events[type]) {
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;

  } else if (isArray(this._events[type])) {
    // If we've already got an array, just append.
    this._events[type].push(listener);

  } else {
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];
  }

  return this;
}
EventEmitter.prototype['addListener'] = EventEmitter.prototype['on'];


EventEmitter.prototype['once'] = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('"once" only takes instances of Function');
  }

  var self = this;
  function g() {
    self['removeListener'](type, g);
    listener.apply(this, arguments);
  };

  g.listener = listener;
  self.on(type, g);

  return this;
}


EventEmitter.prototype['removeListener'] = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('"removeListener" only takes instances of Function');
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (!this._events || !this._events[type]) return this;

  var list = this._events[type];

  if (isArray(list)) {
    var position = -1;
    for (var i = 0, length = list.length; i < length; i++) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener))
      {
        position = i;
        break;
      }
    }

    if (position < 0) return this;
    list.splice(position, 1);
    if (list.length == 0)
      delete this._events[type];
  } else if (list === listener ||
             (list.listener && list.listener === listener))
  {
    delete this._events[type];
  }

  return this;
}


EventEmitter.prototype['removeAllListeners'] = function(type) {
  // does not use listeners(), so no side effect of creating _events[type]
  if (type && this._events && this._events[type]) this._events[type] = null;
  return this;
}


EventEmitter.prototype['listeners'] = function(type) {
  if (!this._events) this._events = {};
  if (!this._events[type]) this._events[type] = [];
  if (!isArray(this._events[type])) {
    this._events[type] = [this._events[type]];
  }
  return this._events[type];
}
