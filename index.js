//! frum
// module template from moment.js

(function (global, factory) {
  let define
  typeof exports === 'object' && typeof module !== 'undefined'
    ? module.exports = factory()
    : typeof define === 'function' && define.amd
      ? define(factory)
      : global.frum = factory()
}(this, function () { // ----------------------------
  function assert (condition, errorMessage = 'error') {
    if (!condition) {
      throw new Error('frum.js: ' + errorMessage)
    }
  }

  function FrumNumber (n) {
    assert(true, 'accepted types will be implemented later')
    this.n = n
    return this
  }

  FrumNumber.prototype.count = function (
    callback,
    target = undefined,
    step = 1
  ) {
    assert(typeof callback === 'function', 'frum.count - invalid callback')
    if (target === undefined) {
      for (var i = 0; i < this.n; i += step) {
        callback(i)
      }
    } else {
      this.to(target).by(step, callback)
    }
  }

  FrumNumber.prototype.to = function (target) {
    return new Interval(this.n, FrumNumber(target).n)
  }

  function Interval (start, stop) {
    assert(
      typeof start === typeof stop,
      'invalid Interval parameters: ' + start + ', ' + stop
    )
    this.start = start
    this.stop = stop
    return this
  }

  // internal functions _____________
  Interval.prototype.toString = function () {
    // return 'frum.js.Interval('+this.start+','+this.stop+')'
    return 'Interval ' +
      '[' +
      this.start +
      '->' +
      this.stop +
      ']'
  }

  Interval.prototype.reversed = function () {
    return this.start > this.stop
  }
  Interval.prototype.low = function () {
    return this.reversed() ? this.stop : this.start
  }
  Interval.prototype.up = function () {
    return this.reversed() ? this.start : this.stop
  }

  Interval.prototype.length = function () {
    return this.up - this.low
  }

  Interval.prototype.by = function (step = 1, mappingCallback) {
    // loops through the range and returns an Array
    assert(
      step < 0 || step > 0,
      'parameter step must be a non zero number (' + step + ')'
    )
    if (step < 0) {
      step = -step
    }
    if (typeof mappingCallback !== 'function') {
      mappingCallback = function (x) { return x }
    }
    var array = []
    var mapped = false
    var sense = this.reversed() ? -1 : 1
    for (var i = this.start;
      sense * i <= sense * this.stop;
      i += sense * step
    ) {
      var v = mappingCallback(i)
      array.push(v)
      mapped = v === undefined ? mapped : true
    }
    if (mapped) { return array }
  }

  Interval.prototype.contains = function (set) {
    assert(
      typeof set === typeof this.start ||
      set instanceof Interval,
      'invalid set parameter for .contains'
    )
    if (set instanceof Interval) {
      return this.low() <= set.low() && this.up() >= set.up()
    } else {
      return set <= this.up() && set >= this.low()
    }
  }

  Interval.prototype.intersects = function (set) {
    assert(
      typeof set === typeof this.start ||
      set instanceof Interval,
      'invalid set parameter for .contains'
    )
    if (set instanceof Interval) {
      return this.up() >= set.low() && this.low() <= set.up()
    } else {
      return set <= this.up() && set >= this.low()
    }
  }

  function frum (n) {
    return new FrumNumber(n)
  }
  frum.FrumNumber = FrumNumber
  frum.Interval = Interval
  // ------------------------------------------------
  return frum
}))
