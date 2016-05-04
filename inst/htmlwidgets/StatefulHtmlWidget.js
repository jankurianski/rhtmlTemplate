// Generated by CoffeeScript 1.8.0
var StatefulHtmlWidget;

StatefulHtmlWidget = (function() {
  function StatefulHtmlWidget() {}

  StatefulHtmlWidget.prototype._initializeState = function(newState) {
    return this.state = newState;
  };

  StatefulHtmlWidget.prototype._redraw = function() {
    throw new Error('Must override _redraw');
  };

  StatefulHtmlWidget.prototype._putState = function(newState) {
    this.state = newState;
    this._updateStateListeners();
    return this._redraw();
  };

  StatefulHtmlWidget.prototype._updateState = function(k, v) {
    this.state[k] = v;
    this._updateStateListeners();
    return this._redraw();
  };

  StatefulHtmlWidget.prototype.getState = function() {
    return this.state;
  };

  StatefulHtmlWidget.prototype.setState = function(newState) {
    var err;
    if (_.isString(newState)) {
      try {
        this.state = JSON.parse(newState);
      } catch (_error) {
        err = _error;
        throw new Error('json parse error in setState(#newState): ' + err);
      }
    } else {
      this.state = newState;
    }
    this._updateStateListeners();
    return this._redraw();
  };

  StatefulHtmlWidget.prototype.registerStateListener = function(listener) {
    if (!_.isArray(this.stateListeners)) {
      this.stateListeners = [];
    }
    return this.stateListeners.push(listener);
  };

  StatefulHtmlWidget.prototype._updateStateListeners = function() {
    if (!_.isArray(this.stateListeners)) {
      this.stateListeners = [];
    }
    return _.forEach(this.stateListeners, (function(_this) {
      return function(listener) {
        return listener(_this.state);
      };
    })(this));
  };

  return StatefulHtmlWidget;

})();