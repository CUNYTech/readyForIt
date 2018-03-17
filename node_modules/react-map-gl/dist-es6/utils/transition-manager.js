var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global requestAnimationFrame, cancelAnimationFrame */
import assert from 'assert';
import { LinearInterpolator } from './transition';
import MapState from './map-state';

var noop = function noop() {};

export var TRANSITION_EVENTS = {
  BREAK: 1,
  SNAP_TO_END: 2,
  IGNORE: 3
};

var DEFAULT_PROPS = {
  transitionDuration: 0,
  transitionEasing: function transitionEasing(t) {
    return t;
  },
  transitionInterpolator: new LinearInterpolator(),
  transitionInterruption: TRANSITION_EVENTS.BREAK,
  onTransitionStart: noop,
  onTransitionInterrupt: noop,
  onTransitionEnd: noop
};

var DEFAULT_STATE = {
  animation: null,
  propsInTransition: null,
  startProps: null,
  endProps: null
};

var TransitionManager = function () {
  function TransitionManager(props) {
    _classCallCheck(this, TransitionManager);

    this.props = props;
    this.state = DEFAULT_STATE;

    this._onTransitionFrame = this._onTransitionFrame.bind(this);
  }

  // Returns current transitioned viewport.


  _createClass(TransitionManager, [{
    key: 'getViewportInTransition',
    value: function getViewportInTransition() {
      return this.state.propsInTransition;
    }

    // Process the viewport change, either ignore or trigger a new transiton.
    // Return true if a new transition is triggered, false otherwise.

  }, {
    key: 'processViewportChange',
    value: function processViewportChange(nextProps) {
      var transitionTriggered = false;
      var currentProps = this.props;
      // Set this.props here as '_triggerTransition' calls '_updateViewport' that uses this.props.
      this.props = nextProps;

      // NOTE: Be cautious re-ordering statements in this function.
      if (this._shouldIgnoreViewportChange(currentProps, nextProps)) {
        return transitionTriggered;
      }

      var isTransitionInProgress = this._isTransitionInProgress();

      if (this._isTransitionEnabled(nextProps)) {
        var startProps = Object.assign({}, currentProps, this.state.interruption === TRANSITION_EVENTS.SNAP_TO_END ? this.state.endProps : this.state.propsInTransition);

        if (isTransitionInProgress) {
          currentProps.onTransitionInterrupt();
        }
        nextProps.onTransitionStart();

        this._triggerTransition(startProps, nextProps);

        transitionTriggered = true;
      } else if (isTransitionInProgress) {
        currentProps.onTransitionInterrupt();
        this._endTransition();
      }

      return transitionTriggered;
    }

    // Helper methods

  }, {
    key: '_isTransitionInProgress',
    value: function _isTransitionInProgress() {
      return Boolean(this.state.propsInTransition);
    }
  }, {
    key: '_isTransitionEnabled',
    value: function _isTransitionEnabled(props) {
      return props.transitionDuration > 0 && Boolean(props.transitionInterpolator);
    }
  }, {
    key: '_isUpdateDueToCurrentTransition',
    value: function _isUpdateDueToCurrentTransition(props) {
      if (this.state.propsInTransition) {
        return this.state.interpolator.arePropsEqual(props, this.state.propsInTransition);
      }
      return false;
    }
  }, {
    key: '_shouldIgnoreViewportChange',
    value: function _shouldIgnoreViewportChange(currentProps, nextProps) {
      if (this._isTransitionInProgress()) {
        // Ignore update if it is requested to be ignored
        return this.state.interruption === TRANSITION_EVENTS.IGNORE ||
        // Ignore update if it is due to current active transition.
        this._isUpdateDueToCurrentTransition(nextProps);
      } else if (this._isTransitionEnabled(nextProps)) {
        // Ignore if none of the viewport props changed.
        return nextProps.transitionInterpolator.arePropsEqual(currentProps, nextProps);
      }
      return true;
    }
  }, {
    key: '_triggerTransition',
    value: function _triggerTransition(startProps, endProps) {
      assert(this._isTransitionEnabled(endProps), 'Transition is not enabled');

      cancelAnimationFrame(this.state.animation);

      var initialProps = endProps.transitionInterpolator.initializeProps(startProps, endProps);

      this.state = {
        // Save current transition props
        duration: endProps.transitionDuration,
        easing: endProps.transitionEasing,
        interpolator: endProps.transitionInterpolator,
        interruption: endProps.transitionInterruption,

        startTime: Date.now(),
        startProps: initialProps.start,
        endProps: initialProps.end,
        animation: null,
        propsInTransition: {}
      };

      this._onTransitionFrame();
    }
  }, {
    key: '_onTransitionFrame',
    value: function _onTransitionFrame() {
      // _updateViewport() may cancel the animation
      this.state.animation = requestAnimationFrame(this._onTransitionFrame);
      this._updateViewport();
    }
  }, {
    key: '_endTransition',
    value: function _endTransition() {
      cancelAnimationFrame(this.state.animation);
      this.state = DEFAULT_STATE;
    }
  }, {
    key: '_updateViewport',
    value: function _updateViewport() {
      // NOTE: Be cautious re-ordering statements in this function.
      var currentTime = Date.now();
      var _state = this.state,
          startTime = _state.startTime,
          duration = _state.duration,
          easing = _state.easing,
          interpolator = _state.interpolator,
          startProps = _state.startProps,
          endProps = _state.endProps;


      var shouldEnd = false;
      var t = (currentTime - startTime) / duration;
      if (t >= 1) {
        t = 1;
        shouldEnd = true;
      }
      t = easing(t);

      var viewport = interpolator.interpolateProps(startProps, endProps, t);
      // Normalize viewport props
      var mapState = new MapState(Object.assign({}, this.props, viewport));
      this.state.propsInTransition = mapState.getViewportProps();

      if (this.props.onViewportChange) {
        this.props.onViewportChange(this.state.propsInTransition);
      }

      if (shouldEnd) {
        this._endTransition();
        this.props.onTransitionEnd();
      }
    }
  }]);

  return TransitionManager;
}();

export default TransitionManager;


TransitionManager.defaultProps = DEFAULT_PROPS;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy90cmFuc2l0aW9uLW1hbmFnZXIuanMiXSwibmFtZXMiOlsiYXNzZXJ0IiwiTGluZWFySW50ZXJwb2xhdG9yIiwiTWFwU3RhdGUiLCJub29wIiwiVFJBTlNJVElPTl9FVkVOVFMiLCJCUkVBSyIsIlNOQVBfVE9fRU5EIiwiSUdOT1JFIiwiREVGQVVMVF9QUk9QUyIsInRyYW5zaXRpb25EdXJhdGlvbiIsInRyYW5zaXRpb25FYXNpbmciLCJ0IiwidHJhbnNpdGlvbkludGVycG9sYXRvciIsInRyYW5zaXRpb25JbnRlcnJ1cHRpb24iLCJvblRyYW5zaXRpb25TdGFydCIsIm9uVHJhbnNpdGlvbkludGVycnVwdCIsIm9uVHJhbnNpdGlvbkVuZCIsIkRFRkFVTFRfU1RBVEUiLCJhbmltYXRpb24iLCJwcm9wc0luVHJhbnNpdGlvbiIsInN0YXJ0UHJvcHMiLCJlbmRQcm9wcyIsIlRyYW5zaXRpb25NYW5hZ2VyIiwicHJvcHMiLCJzdGF0ZSIsIl9vblRyYW5zaXRpb25GcmFtZSIsImJpbmQiLCJuZXh0UHJvcHMiLCJ0cmFuc2l0aW9uVHJpZ2dlcmVkIiwiY3VycmVudFByb3BzIiwiX3Nob3VsZElnbm9yZVZpZXdwb3J0Q2hhbmdlIiwiaXNUcmFuc2l0aW9uSW5Qcm9ncmVzcyIsIl9pc1RyYW5zaXRpb25JblByb2dyZXNzIiwiX2lzVHJhbnNpdGlvbkVuYWJsZWQiLCJPYmplY3QiLCJhc3NpZ24iLCJpbnRlcnJ1cHRpb24iLCJfdHJpZ2dlclRyYW5zaXRpb24iLCJfZW5kVHJhbnNpdGlvbiIsIkJvb2xlYW4iLCJpbnRlcnBvbGF0b3IiLCJhcmVQcm9wc0VxdWFsIiwiX2lzVXBkYXRlRHVlVG9DdXJyZW50VHJhbnNpdGlvbiIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiaW5pdGlhbFByb3BzIiwiaW5pdGlhbGl6ZVByb3BzIiwiZHVyYXRpb24iLCJlYXNpbmciLCJzdGFydFRpbWUiLCJEYXRlIiwibm93Iiwic3RhcnQiLCJlbmQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJfdXBkYXRlVmlld3BvcnQiLCJjdXJyZW50VGltZSIsInNob3VsZEVuZCIsInZpZXdwb3J0IiwiaW50ZXJwb2xhdGVQcm9wcyIsIm1hcFN0YXRlIiwiZ2V0Vmlld3BvcnRQcm9wcyIsIm9uVmlld3BvcnRDaGFuZ2UiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBLE9BQU9BLE1BQVAsTUFBbUIsUUFBbkI7QUFDQSxTQUFRQyxrQkFBUixRQUFpQyxjQUFqQztBQUNBLE9BQU9DLFFBQVAsTUFBcUIsYUFBckI7O0FBRUEsSUFBTUMsT0FBTyxTQUFQQSxJQUFPLEdBQU0sQ0FBRSxDQUFyQjs7QUFFQSxPQUFPLElBQU1DLG9CQUFvQjtBQUMvQkMsU0FBTyxDQUR3QjtBQUUvQkMsZUFBYSxDQUZrQjtBQUcvQkMsVUFBUTtBQUh1QixDQUExQjs7QUFNUCxJQUFNQyxnQkFBZ0I7QUFDcEJDLHNCQUFvQixDQURBO0FBRXBCQyxvQkFBa0I7QUFBQSxXQUFLQyxDQUFMO0FBQUEsR0FGRTtBQUdwQkMsMEJBQXdCLElBQUlYLGtCQUFKLEVBSEo7QUFJcEJZLDBCQUF3QlQsa0JBQWtCQyxLQUp0QjtBQUtwQlMscUJBQW1CWCxJQUxDO0FBTXBCWSx5QkFBdUJaLElBTkg7QUFPcEJhLG1CQUFpQmI7QUFQRyxDQUF0Qjs7QUFVQSxJQUFNYyxnQkFBZ0I7QUFDcEJDLGFBQVcsSUFEUztBQUVwQkMscUJBQW1CLElBRkM7QUFHcEJDLGNBQVksSUFIUTtBQUlwQkMsWUFBVTtBQUpVLENBQXRCOztJQU9xQkMsaUI7QUFDbkIsNkJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFDakIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsS0FBTCxHQUFhUCxhQUFiOztBQUVBLFNBQUtRLGtCQUFMLEdBQTBCLEtBQUtBLGtCQUFMLENBQXdCQyxJQUF4QixDQUE2QixJQUE3QixDQUExQjtBQUNEOztBQUVEOzs7Ozs4Q0FDMEI7QUFDeEIsYUFBTyxLQUFLRixLQUFMLENB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LGdCQUFmLEVBQWlDO0FBQy9CLGFBQUt0QyxLQUFMLENBQVdzQyxnQkFBWCxDQUE0QixLQUFLckMsS0FBTCxDQUFXTCxpQkFBdkM7QUFDRDs7QUFFRCxVQUFJcUMsU0FBSixFQUFlO0FBQ2IsYUFBS2xCLGNBQUw7QUFDQSxhQUFLZixLQUFMLENBQVdQLGVBQVg7QUFDRDtBQUNGOzs7Ozs7ZUFoSmtCTSxpQjs7O0FBbUpyQkEsa0JBQWtCd0MsWUFBbEIsR0FBaUN0RCxhQUFqQyIsImZpbGUiOiJ0cmFuc2l0aW9uLW1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWwgcmVxdWVzdEFuaW1hdGlvbkZyYW1lLCBjYW5jZWxBbmltYXRpb25GcmFtZSAqL1xuaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IHtMaW5lYXJJbnRlcnBvbGF0b3J9IGZyb20gJy4vdHJhbnNpdGlvbic7XG5pbXBvcnQgTWFwU3RhdGUgZnJvbSAnLi9tYXAtc3RhdGUnO1xuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5cbmV4cG9ydCBjb25zdCBUUkFOU0lUSU9OX0VWRU5UUyA9IHtcbiAgQlJFQUs6IDEsXG4gIFNOQVBfVE9fRU5EOiAyLFxuICBJR05PUkU6IDNcbn07XG5cbmNvbnN0IERFRkFVTFRfUFJPUFMgPSB7XG4gIHRyYW5zaXRpb25EdXJhdGlvbjogMCxcbiAgdHJhbnNpdGlvbkVhc2luZzogdCA9PiB0LFxuICB0cmFuc2l0aW9uSW50ZXJwb2xhdG9yOiBuZXcgTGluZWFySW50ZXJwb2xhdG9yKCksXG4gIHRyYW5zaXRpb25JbnRlcnJ1cHRpb246IFRSQU5TSVRJT05fRVZFTlRTLkJSRUFLLFxuICBvblRyYW5zaXRpb25TdGFydDogbm9vcCxcbiAgb25UcmFuc2l0aW9uSW50ZXJydXB0OiBub29wLFxuICBvblRyYW5zaXRpb25FbmQ6IG5vb3Bcbn07XG5cbmNvbnN0IERFRkFVTFRfU1RBVEUgPSB7XG4gIGFuaW1hdGlvbjogbnVsbCxcbiAgcHJvcHNJblRyYW5zaXRpb246IG51bGwsXG4gIHN0YXJ0UHJvcHM6IG51bGwsXG4gIGVuZFByb3BzOiBudWxsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmFuc2l0aW9uTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHRoaXMuc3RhdGUgPSBERUZBVUxUX1NUQVRFO1xuXG4gICAgdGhpcy5fb25UcmFuc2l0aW9uRnJhbWUgPSB0aGlzLl9vblRyYW5zaXRpb25GcmFtZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgLy8gUmV0dXJucyBjdXJyZW50IHRyYW5zaXRpb25lZCB2aWV3cG9ydC5cbiAgZ2V0Vmlld3BvcnRJblRyYW5zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUucHJvcHNJblRyYW5zaXRpb247XG4gIH1cblxuICAvLyBQcm9jZXNzIHRoZSB2aWV3cG9ydCBjaGFuZ2UsIGVpdGhlciBpZ25vcmUgb3IgdHJpZ2dlciBhIG5ldyB0cmFuc2l0b24uXG4gIC8vIFJldHVybiB0cnVlIGlmIGEgbmV3IHRyYW5zaXRpb24gaXMgdHJpZ2dlcmVkLCBmYWxzZSBvdGhlcndpc2UuXG4gIHByb2Nlc3NWaWV3cG9ydENoYW5nZShuZXh0UHJvcHMpIHtcbiAgICBsZXQgdHJhbnNpdGlvblRyaWdnZXJlZCA9IGZhbHNlO1xuICAgIGNvbnN0IGN1cnJlbnRQcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgLy8gU2V0IHRoaXMucHJvcHMgaGVyZSBhcyAnX3RyaWdnZXJUcmFuc2l0aW9uJyBjYWxscyAnX3VwZGF0ZVZpZXdwb3J0JyB0aGF0IHVzZXMgdGhpcy5wcm9wcy5cbiAgICB0aGlzLnByb3BzID0gbmV4dFByb3BzO1xuXG4gICAgLy8gTk9URTogQmUgY2F1dGlvdXMgcmUtb3JkZXJpbmcgc3RhdGVtZW50cyBpbiB0aGlzIGZ1bmN0aW9uLlxuICAgIGlmICh0aGlzLl9zaG91bGRJZ25vcmVWaWV3cG9ydENoYW5nZShjdXJyZW50UHJvcHMsIG5leHRQcm9wcykpIHtcbiAgICAgIHJldHVybiB0cmFuc2l0aW9uVHJpZ2dlcmVkO1xuICAgIH1cblxuICAgIGNvbnN0IGlzVHJhbnNpdGlvbkluUHJvZ3Jlc3MgPSB0aGlzLl9pc1RyYW5zaXRpb25JblByb2dyZXNzKCk7XG5cbiAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uRW5hYmxlZChuZXh0UHJvcHMpKSB7XG4gICAgICBjb25zdCBzdGFydFByb3BzID0gT2JqZWN0LmFzc2lnbih7fSwgY3VycmVudFByb3BzLFxuICAgICAgICB0aGlzLnN0YXRlLmludGVycnVwdGlvbiA9PT0gVFJBTlNJVElPTl9FVkVOVFMuU05BUF9UT19FTkQgP1xuICAgICAgICB0aGlzLnN0YXRlLmVuZFByb3BzIDogdGhpcy5zdGF0ZS5wcm9wc0luVHJhbnNpdGlvblxuICAgICAgKTtcblxuICAgICAgaWYgKGlzVHJhbnNpdGlvbkluUHJvZ3Jlc3MpIHtcbiAgICAgICAgY3VycmVudFByb3BzLm9uVHJhbnNpdGlvbkludGVycnVwdCgpO1xuICAgICAgfVxuICAgICAgbmV4dFByb3BzLm9uVHJhbnNpdGlvblN0YXJ0KCk7XG5cbiAgICAgIHRoaXMuX3RyaWdnZXJUcmFuc2l0aW9uKHN0YXJ0UHJvcHMsIG5leHRQcm9wcyk7XG5cbiAgICAgIHRyYW5zaXRpb25UcmlnZ2VyZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoaXNUcmFuc2l0aW9uSW5Qcm9ncmVzcykge1xuICAgICAgY3VycmVudFByb3BzLm9uVHJhbnNpdGlvbkludGVycnVwdCgpO1xuICAgICAgdGhpcy5fZW5kVHJhbnNpdGlvbigpO1xuICAgIH1cblxuICAgIHJldHVybiB0cmFuc2l0aW9uVHJpZ2dlcmVkO1xuICB9XG5cbiAgLy8gSGVscGVyIG1ldGhvZHNcblxuICBfaXNUcmFuc2l0aW9uSW5Qcm9ncmVzcygpIHtcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLnN0YXRlLnByb3BzSW5UcmFuc2l0aW9uKTtcbiAgfVxuXG4gIF9pc1RyYW5zaXRpb25FbmFibGVkKHByb3BzKSB7XG4gICAgcmV0dXJuIHByb3BzLnRyYW5zaXRpb25EdXJhdGlvbiA+IDAgJiYgQm9vbGVhbihwcm9wcy50cmFuc2l0aW9uSW50ZXJwb2xhdG9yKTtcbiAgfVxuXG4gIF9pc1VwZGF0ZUR1ZVRvQ3VycmVudFRyYW5zaXRpb24ocHJvcHMpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5wcm9wc0luVHJhbnNpdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaW50ZXJwb2xhdG9yLmFyZVByb3BzRXF1YWwocHJvcHMsIHRoaXMuc3RhdGUucHJvcHNJblRyYW5zaXRpb24pO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBfc2hvdWxkSWdub3JlVmlld3BvcnRDaGFuZ2UoY3VycmVudFByb3BzLCBuZXh0UHJvcHMpIHtcbiAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uSW5Qcm9ncmVzcygpKSB7XG4gICAgICAvLyBJZ25vcmUgdXBkYXRlIGlmIGl0IGlzIHJlcXVlc3RlZCB0byBiZSBpZ25vcmVkXG4gICAgICByZXR1cm4gdGhpcy5zdGF0ZS5pbnRlcnJ1cHRpb24gPT09IFRSQU5TSVRJT05fRVZFTlRTLklHTk9SRSB8fFxuICAgICAgICAvLyBJZ25vcmUgdXBkYXRlIGlmIGl0IGlzIGR1ZSB0byBjdXJyZW50IGFjdGl2ZSB0cmFuc2l0aW9uLlxuICAgICAgICB0aGlzLl9pc1VwZGF0ZUR1ZVRvQ3VycmVudFRyYW5zaXRpb24obmV4dFByb3BzKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2lzVHJhbnNpdGlvbkVuYWJsZWQobmV4dFByb3BzKSkge1xuICAgICAgLy8gSWdub3JlIGlmIG5vbmUgb2YgdGhlIHZpZXdwb3J0IHByb3BzIGNoYW5nZWQuXG4gICAgICByZXR1cm4gbmV4dFByb3BzLnRyYW5zaXRpb25JbnRlcnBvbGF0b3IuYXJlUHJvcHNFcXVhbChjdXJyZW50UHJvcHMsIG5leHRQcm9wcyk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgX3RyaWdnZXJUcmFuc2l0aW9uKHN0YXJ0UHJvcHMsIGVuZFByb3BzKSB7XG4gICAgYXNzZXJ0KHRoaXMuX2lzVHJhbnNpdGlvbkVuYWJsZWQoZW5kUHJvcHMpLCAnVHJhbnNpdGlvbiBpcyBub3QgZW5hYmxlZCcpO1xuXG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5zdGF0ZS5hbmltYXRpb24pO1xuXG4gICAgY29uc3QgaW5pdGlhbFByb3BzID0gZW5kUHJvcHMudHJhbnNpdGlvbkludGVycG9sYXRvci5pbml0aWFsaXplUHJvcHMoXG4gICAgICBzdGFydFByb3BzLFxuICAgICAgZW5kUHJvcHNcbiAgICApO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIC8vIFNhdmUgY3VycmVudCB0cmFuc2l0aW9uIHByb3BzXG4gICAgICBkdXJhdGlvbjogZW5kUHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uLFxuICAgICAgZWFzaW5nOiBlbmRQcm9wcy50cmFuc2l0aW9uRWFzaW5nLFxuICAgICAgaW50ZXJwb2xhdG9yOiBlbmRQcm9wcy50cmFuc2l0aW9uSW50ZXJwb2xhdG9yLFxuICAgICAgaW50ZXJydXB0aW9uOiBlbmRQcm9wcy50cmFuc2l0aW9uSW50ZXJydXB0aW9uLFxuXG4gICAgICBzdGFydFRpbWU6IERhdGUubm93KCksXG4gICAgICBzdGFydFByb3BzOiBpbml0aWFsUHJvcHMuc3RhcnQsXG4gICAgICBlbmRQcm9wczogaW5pdGlhbFByb3BzLmVuZCxcbiAgICAgIGFuaW1hdGlvbjogbnVsbCxcbiAgICAgIHByb3BzSW5UcmFuc2l0aW9uOiB7fVxuICAgIH07XG5cbiAgICB0aGlzLl9vblRyYW5zaXRpb25GcmFtZSgpO1xuICB9XG5cbiAgX29uVHJhbnNpdGlvbkZyYW1lKCkge1xuICAgIC8vIF91cGRhdGVWaWV3cG9ydCgpIG1heSBjYW5jZWwgdGhlIGFuaW1hdGlvblxuICAgIHRoaXMuc3RhdGUuYW5pbWF0aW9uID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX29uVHJhbnNpdGlvbkZyYW1lKTtcbiAgICB0aGlzLl91cGRhdGVWaWV3cG9ydCgpO1xuICB9XG5cbiAgX2VuZFRyYW5zaXRpb24oKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5zdGF0ZS5hbmltYXRpb24pO1xuICAgIHRoaXMuc3RhdGUgPSBERUZBVUxUX1NUQVRFO1xuICB9XG5cbiAgX3VwZGF0ZVZpZXdwb3J0KCkge1xuICAgIC8vIE5PVEU6IEJlIGNhdXRpb3VzIHJlLW9yZGVyaW5nIHN0YXRlbWVudHMgaW4gdGhpcyBmdW5jdGlvbi5cbiAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XG4gICAgY29uc3Qge3N0YXJ0VGltZSwgZHVyYXRpb24sIGVhc2luZywgaW50ZXJwb2xhdG9yLCBzdGFydFByb3BzLCBlbmRQcm9wc30gPSB0aGlzLnN0YXRlO1xuXG4gICAgbGV0IHNob3VsZEVuZCA9IGZhbHNlO1xuICAgIGxldCB0ID0gKGN1cnJlbnRUaW1lIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uO1xuICAgIGlmICh0ID49IDEpIHtcbiAgICAgIHQgPSAxO1xuICAgICAgc2hvdWxkRW5kID0gdHJ1ZTtcbiAgICB9XG4gICAgdCA9IGVhc2luZyh0KTtcblxuICAgIGNvbnN0IHZpZXdwb3J0ID0gaW50ZXJwb2xhdG9yLmludGVycG9sYXRlUHJvcHMoc3RhcnRQcm9wcywgZW5kUHJvcHMsIHQpO1xuICAgICAgLy8gTm9ybWFsaXplIHZpZXdwb3J0IHByb3BzXG4gICAgY29uc3QgbWFwU3RhdGUgPSBuZXcgTWFwU3RhdGUoT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcywgdmlld3BvcnQpKTtcbiAgICB0aGlzLnN0YXRlLnByb3BzSW5UcmFuc2l0aW9uID0gbWFwU3RhdGUuZ2V0Vmlld3BvcnRQcm9wcygpO1xuXG4gICAgaWYgKHRoaXMucHJvcHMub25WaWV3cG9ydENoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vblZpZXdwb3J0Q2hhbmdlKHRoaXMuc3RhdGUucHJvcHNJblRyYW5zaXRpb24pO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRFbmQpIHtcbiAgICAgIHRoaXMuX2VuZFRyYW5zaXRpb24oKTtcbiAgICAgIHRoaXMucHJvcHMub25UcmFuc2l0aW9uRW5kKCk7XG4gICAgfVxuICB9XG59XG5cblRyYW5zaXRpb25NYW5hZ2VyLmRlZmF1bHRQcm9wcyA9IERFRkFVTFRfUFJPUFM7XG4iXX0=