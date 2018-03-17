var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import assert from 'assert';
import TransitionInterpolator from './transition-interpolator';

import { flyToViewport } from 'viewport-mercator-project';
import { isValid, lerp, getEndValueByShortestPath } from './transition-utils';

var VIEWPORT_TRANSITION_PROPS = ['longitude', 'latitude', 'zoom', 'bearing', 'pitch'];
var REQUIRED_PROPS = ['latitude', 'longitude', 'zoom', 'width', 'height'];
var LINEARLY_INTERPOLATED_PROPS = ['bearing', 'pitch'];

/**
 * This class adapts mapbox-gl-js Map#flyTo animation so it can be used in
 * react/redux architecture.
 * mapbox-gl-js flyTo : https://www.mapbox.com/mapbox-gl-js/api/#map#flyto.
 * It implements “Smooth and efficient zooming and panning.” algorithm by
 * "Jarke J. van Wijk and Wim A.A. Nuij"
*/

var ViewportFlyToInterpolator = function (_TransitionInterpolat) {
  _inherits(ViewportFlyToInterpolator, _TransitionInterpolat);

  function ViewportFlyToInterpolator() {
    _classCallCheck(this, ViewportFlyToInterpolator);

    var _this = _possibleConstructorReturn(this, (ViewportFlyToInterpolator.__proto__ || Object.getPrototypeOf(ViewportFlyToInterpolator)).call(this));

    _this.propNames = VIEWPORT_TRANSITION_PROPS;
    return _this;
  }

  _createClass(ViewportFlyToInterpolator, [{
    key: 'initializeProps',
    value: function initializeProps(startProps, endProps) {
      var startViewportProps = {};
      var endViewportProps = {};

      // Check minimum required props
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = REQUIRED_PROPS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          var startValue = startProps[key];
          var endValue = endProps[key];
          assert(isValid(startValue) && isValid(endValue), key + ' must be supplied for transition');
          startViewportProps[key] = startValue;
          endViewportProps[key] = getEndValueByShortestPath(key, startValue, endValue);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = LINEARLY_INTERPOLATED_PROPS[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _key = _step2.value;

          var _startValue = startProps[_key] || 0;
          var _endValue = endProps[_key] || 0;
          startViewportProps[_key] = _startValue;
          endViewportProps[_key] = getEndValueByShortestPath(_key, _startValue, _endValue);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return {
        start: startViewportProps,
        end: endViewportProps
      };
    }
  }, {
    key: 'interpolateProps',
    value: function interpolateProps(startProps, endProps, t) {
      var viewport = flyToViewport(startProps, endProps, t);

      // Linearly interpolate 'bearing' and 'pitch' if exist.
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = LINEARLY_INTERPOLATED_PROPS[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var key = _step3.value;

          viewport[key] = lerp(startProps[key], endProps[key], t);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return viewport;
    }
  }]);

  return ViewportFlyToInterpolator;
}(TransitionInterpolator);

export default ViewportFlyToInterpolator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy90cmFuc2l0aW9uL3ZpZXdwb3J0LWZseS10by1pbnRlcnBvbGF0b3IuanMiXSwibmFtZXMiOlsiYXNzZXJ0IiwiVHJhbnNpdGlvbkludGVycG9sYXRvciIsImZseVRvVmlld3BvcnQiLCJpc1ZhbGlkIiwibGVycCIsImdldEVuZFZhbHVlQnlTaG9ydGVzdFBhdGgiLCJWSUVXUE9SVF9UUkFOU0lUSU9OX1BST1BTIiwiUkVRVUlSRURfUFJPUFMiLCJMSU5FQVJMWV9JTlRFUlBPTEFURURfUFJPUFMiLCJWaWV3cG9ydEZseVRvSW50ZXJwb2xhdG9yIiwicHJvcE5hbWVzIiwic3RhcnRQcm9wcyIsImVuZFByb3BzIiwic3RhcnRWaWV3cG9ydFByb3BzIiwiZW5kVmlld3BvcnRQcm9wcyIsImtleSIsInN0YXJ0VmFsdWUiLCJlbmRWYWx1ZSIsInN0YXJ0IiwiZW5kIiwidCIsInZpZXdwb3J0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLE9BQU9BLE1BQVAsTUFBbUIsUUFBbkI7QUFDQSxPQUFPQyxzQkFBUCxNQUFtQywyQkFBbkM7O0FBRUEsU0FBUUMsYUFBUixRQUE0QiwyQkFBNUI7QUFDQSxTQUFRQyxPQUFSLEVBQWlCQyxJQUFqQixFQUF1QkMseUJBQXZCLFFBQXVELG9CQUF2RDs7QUFFQSxJQUFNQyw0QkFBNEIsQ0FBQyxXQUFELEVBQWMsVUFBZCxFQUEwQixNQUExQixFQUFrQyxTQUFsQyxFQUE2QyxPQUE3QyxDQUFsQztBQUNBLElBQU1DLGlCQUFpQixDQUFDLFVBQUQsRUFBYSxXQUFiLEVBQTBCLE1BQTFCLEVBQWtDLE9BQWxDLEVBQTJDLFFBQTNDLENBQXZCO0FBQ0EsSUFBTUMsOEJBQThCLENBQUMsU0FBRCxFQUFZLE9BQVosQ0FBcEM7O0FBRUE7Ozs7Ozs7O0lBT3FCQyx5Qjs7O0FBRW5CLHVDQUFjO0FBQUE7O0FBQUE7O0FBRVosVUFBS0MsU0FBTCxHQUFpQkoseUJBQWpCO0FBRlk7QUFHYjs7OztvQ0FFZUssVSxFQUFZQyxRLEVBQVU7QUFDcEMsVUFBTUMscUJBQXFCLEVBQTNCO0FBQ0EsVUFBTUMsbUJBQW1CLEVBQXpCOztBQUVBO0FBSm9DO0FBQUE7QUFBQTs7QUFBQTtBQUtwQyw2QkFBa0JQLGNBQWxCLDhIQUFrQztBQUFBLGNBQXZCUSxHQUF1Qjs7QUFDaEMsY0FBTUMsYUFBYUwsV0FBV0ksR0FBWCxDQUFuQjtBQUNBLGNBQU1FLFdBQVdMLFNBQVNHLEdBQVQsQ0FBakI7QUFDQWYsaUJBQU9HLFFBQVFhLFVBQVIsS0FBdUJiLFFBQVFjLFFBQVIsQ0FBOUIsRUFBb0RGLEdBQXBEO0FBQ0FGLDZCQUFtQkUsR0FBbkIsSUFBMEJDLFVBQTFCO0FBQ0FGLDJCQUFpQkMsR0FBakIsSUFBd0JWLDBCQUEwQlUsR0FBMUIsRUFBK0JDLFVBQS9CLEVBQTJDQyxRQUEzQyxDQUF4QjtBQUNEO0FBWG1DO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBYXBDLDhCQUFrQlQsMkJBQWxCLG1JQUErQztBQUFBLGNBQXBDTyxJQUFvQzs7QUFDN0MsY0FBTUMsY0FBYUwsV0FBV0ksSUFBWCxLQUFtQixDQUF0QztBQUNBLGNBQU1FLFlBQVdMLFNBQVNHLElBQVQsS0FBaUIsQ0FBbEM7QUFDQUYsNkJBQW1CRSxJQUFuQixJQUEwQkMsV0FBMUI7QUFDQUYsMkJBQWlCQyxJQUFqQixJQUF3QlYsMEJBQTBCVSxJQUExQixFQUErQkMsV0FBL0IsRUFBMkNDLFNBQTNDLENBQXhCO0FBQ0Q7QUFsQm1DO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBb0JwQyxhQUFPO0FBQ0xDLGVBQU9MLGtCQURGO0FBRUxNLGFBQUtMO0FBRkEsT0FBUDtBQUlEOzs7cUNBRWdCSCxVLEVBQVlDLFEsRUFBVVEsQyxFQUFHO0FBQ3hDLFVBQU1DLFdBQVduQixjQUFjUyxVQUFkLEVBQTBCQyxRQUExQixFQUFvQ1EsQ0FBcEMsQ0FBakI7O0FBRUE7QUFId0M7QUFBQTtBQUFBOztBQUFBO0FBSXhDLDhCQUFrQlosMkJBQWxCLG1JQUErQztBQUFBLGNBQXBDTyxHQUFvQzs7QUFDN0NNLG1CQUFTTixHQUFULElBQWdCWCxLQUFLTyxXQUFXSSxHQUFYLENBQUwsRUFBc0JILFNBQVNHLEdBQVQsQ0FBdEIsRUFBcUNLLENBQXJDLENBQWhCO0FBQ0Q7QUFOdUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFReEMsYUFBT0MsUUFBUDtBQUNEOzs7O0VBMUNvRHBCLHNCOztlQUFsQ1EseUIiLCJmaWxlIjoidmlld3BvcnQtZmx5LXRvLWludGVycG9sYXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCBUcmFuc2l0aW9uSW50ZXJwb2xhdG9yIGZyb20gJy4vdHJhbnNpdGlvbi1pbnRlcnBvbGF0b3InO1xuXG5pbXBvcnQge2ZseVRvVmlld3BvcnR9IGZyb20gJ3ZpZXdwb3J0LW1lcmNhdG9yLXByb2plY3QnO1xuaW1wb3J0IHtpc1ZhbGlkLCBsZXJwLCBnZXRFbmRWYWx1ZUJ5U2hvcnRlc3RQYXRofSBmcm9tICcuL3RyYW5zaXRpb24tdXRpbHMnO1xuXG5jb25zdCBWSUVXUE9SVF9UUkFOU0lUSU9OX1BST1BTID0gWydsb25naXR1ZGUnLCAnbGF0aXR1ZGUnLCAnem9vbScsICdiZWFyaW5nJywgJ3BpdGNoJ107XG5jb25zdCBSRVFVSVJFRF9QUk9QUyA9IFsnbGF0aXR1ZGUnLCAnbG9uZ2l0dWRlJywgJ3pvb20nLCAnd2lkdGgnLCAnaGVpZ2h0J107XG5jb25zdCBMSU5FQVJMWV9JTlRFUlBPTEFURURfUFJPUFMgPSBbJ2JlYXJpbmcnLCAncGl0Y2gnXTtcblxuLyoqXG4gKiBUaGlzIGNsYXNzIGFkYXB0cyBtYXBib3gtZ2wtanMgTWFwI2ZseVRvIGFuaW1hdGlvbiBzbyBpdCBjYW4gYmUgdXNlZCBpblxuICogcmVhY3QvcmVkdXggYXJjaGl0ZWN0dXJlLlxuICogbWFwYm94LWdsLWpzIGZseVRvIDogaHR0cHM6Ly93d3cubWFwYm94LmNvbS9tYXBib3gtZ2wtanMvYXBpLyNtYXAjZmx5dG8uXG4gKiBJdCBpbXBsZW1lbnRzIOKAnFNtb290aCBhbmQgZWZmaWNpZW50IHpvb21pbmcgYW5kIHBhbm5pbmcu4oCdIGFsZ29yaXRobSBieVxuICogXCJKYXJrZSBKLiB2YW4gV2lqayBhbmQgV2ltIEEuQS4gTnVpalwiXG4qL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld3BvcnRGbHlUb0ludGVycG9sYXRvciBleHRlbmRzIFRyYW5zaXRpb25JbnRlcnBvbGF0b3Ige1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5wcm9wTmFtZXMgPSBWSUVXUE9SVF9UUkFOU0lUSU9OX1BST1BTO1xuICB9XG5cbiAgaW5pdGlhbGl6ZVByb3BzKHN0YXJ0UHJvcHMsIGVuZFByb3BzKSB7XG4gICAgY29uc3Qgc3RhcnRWaWV3cG9ydFByb3BzID0ge307XG4gICAgY29uc3QgZW5kVmlld3BvcnRQcm9wcyA9IHt9O1xuXG4gICAgLy8gQ2hlY2sgbWluaW11bSByZXF1aXJlZCBwcm9wc1xuICAgIGZvciAoY29uc3Qga2V5IG9mIFJFUVVJUkVEX1BST1BTKSB7XG4gICAgICBjb25zdCBzdGFydFZhbHVlID0gc3RhcnRQcm9wc1trZXldO1xuICAgICAgY29uc3QgZW5kVmFsdWUgPSBlbmRQcm9wc1trZXldO1xuICAgICAgYXNzZXJ0KGlzVmFsaWQoc3RhcnRWYWx1ZSkgJiYgaXNWYWxpZChlbmRWYWx1ZSksIGAke2tleX0gbXVzdCBiZSBzdXBwbGllZCBmb3IgdHJhbnNpdGlvbmApO1xuICAgICAgc3RhcnRWaWV3cG9ydFByb3BzW2tleV0gPSBzdGFydFZhbHVlO1xuICAgICAgZW5kVmlld3BvcnRQcm9wc1trZXldID0gZ2V0RW5kVmFsdWVCeVNob3J0ZXN0UGF0aChrZXksIHN0YXJ0VmFsdWUsIGVuZFZhbHVlKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGtleSBvZiBMSU5FQVJMWV9JTlRFUlBPTEFURURfUFJPUFMpIHtcbiAgICAgIGNvbnN0IHN0YXJ0VmFsdWUgPSBzdGFydFByb3BzW2tleV0gfHwgMDtcbiAgICAgIGNvbnN0IGVuZFZhbHVlID0gZW5kUHJvcHNba2V5XSB8fCAwO1xuICAgICAgc3RhcnRWaWV3cG9ydFByb3BzW2tleV0gPSBzdGFydFZhbHVlO1xuICAgICAgZW5kVmlld3BvcnRQcm9wc1trZXldID0gZ2V0RW5kVmFsdWVCeVNob3J0ZXN0UGF0aChrZXksIHN0YXJ0VmFsdWUsIGVuZFZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3RhcnQ6IHN0YXJ0Vmlld3BvcnRQcm9wcyxcbiAgICAgIGVuZDogZW5kVmlld3BvcnRQcm9wc1xuICAgIH07XG4gIH1cblxuICBpbnRlcnBvbGF0ZVByb3BzKHN0YXJ0UHJvcHMsIGVuZFByb3BzLCB0KSB7XG4gICAgY29uc3Qgdmlld3BvcnQgPSBmbHlUb1ZpZXdwb3J0KHN0YXJ0UHJvcHMsIGVuZFByb3BzLCB0KTtcblxuICAgIC8vIExpbmVhcmx5IGludGVycG9sYXRlICdiZWFyaW5nJyBhbmQgJ3BpdGNoJyBpZiBleGlzdC5cbiAgICBmb3IgKGNvbnN0IGtleSBvZiBMSU5FQVJMWV9JTlRFUlBPTEFURURfUFJPUFMpIHtcbiAgICAgIHZpZXdwb3J0W2tleV0gPSBsZXJwKHN0YXJ0UHJvcHNba2V5XSwgZW5kUHJvcHNba2V5XSwgdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZpZXdwb3J0O1xuICB9XG5cbn1cbiJdfQ==