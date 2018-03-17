var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import assert from 'assert';
import TransitionInterpolator from './transition-interpolator';

import { isValid, lerp, getEndValueByShortestPath } from './transition-utils';

var VIEWPORT_TRANSITION_PROPS = ['longitude', 'latitude', 'zoom', 'bearing', 'pitch'];

/**
 * Performs linear interpolation of two viewports.
*/

var LinearInterpolator = function (_TransitionInterpolat) {
  _inherits(LinearInterpolator, _TransitionInterpolat);

  /**
   * @param {Array} transitionProps - list of props to apply linear transition to.
   */
  function LinearInterpolator() {
    var transitionProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : VIEWPORT_TRANSITION_PROPS;

    _classCallCheck(this, LinearInterpolator);

    var _this = _possibleConstructorReturn(this, (LinearInterpolator.__proto__ || Object.getPrototypeOf(LinearInterpolator)).call(this));

    _this.propNames = transitionProps;
    return _this;
  }

  _createClass(LinearInterpolator, [{
    key: 'initializeProps',
    value: function initializeProps(startProps, endProps) {
      var startViewportProps = {};
      var endViewportProps = {};

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.propNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

      return {
        start: startViewportProps,
        end: endViewportProps
      };
    }
  }, {
    key: 'interpolateProps',
    value: function interpolateProps(startProps, endProps, t) {
      var viewport = {};
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.propNames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var key = _step2.value;

          viewport[key] = lerp(startProps[key], endProps[key], t);
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

      return viewport;
    }
  }]);

  return LinearInterpolator;
}(TransitionInterpolator);

export default LinearInterpolator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy90cmFuc2l0aW9uL2xpbmVhci1pbnRlcnBvbGF0b3IuanMiXSwibmFtZXMiOlsiYXNzZXJ0IiwiVHJhbnNpdGlvbkludGVycG9sYXRvciIsImlzVmFsaWQiLCJsZXJwIiwiZ2V0RW5kVmFsdWVCeVNob3J0ZXN0UGF0aCIsIlZJRVdQT1JUX1RSQU5TSVRJT05fUFJPUFMiLCJMaW5lYXJJbnRlcnBvbGF0b3IiLCJ0cmFuc2l0aW9uUHJvcHMiLCJwcm9wTmFtZXMiLCJzdGFydFByb3BzIiwiZW5kUHJvcHMiLCJzdGFydFZpZXdwb3J0UHJvcHMiLCJlbmRWaWV3cG9ydFByb3BzIiwia2V5Iiwic3RhcnRWYWx1ZSIsImVuZFZhbHVlIiwic3RhcnQiLCJlbmQiLCJ0Iiwidmlld3BvcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBT0EsTUFBUCxNQUFtQixRQUFuQjtBQUNBLE9BQU9DLHNCQUFQLE1BQW1DLDJCQUFuQzs7QUFFQSxTQUFRQyxPQUFSLEVBQWlCQyxJQUFqQixFQUF1QkMseUJBQXZCLFFBQXVELG9CQUF2RDs7QUFFQSxJQUFNQyw0QkFBNEIsQ0FBQyxXQUFELEVBQWMsVUFBZCxFQUEwQixNQUExQixFQUFrQyxTQUFsQyxFQUE2QyxPQUE3QyxDQUFsQzs7QUFFQTs7OztJQUdxQkMsa0I7OztBQUVuQjs7O0FBR0EsZ0NBQXlEO0FBQUEsUUFBN0NDLGVBQTZDLHVFQUEzQkYseUJBQTJCOztBQUFBOztBQUFBOztBQUV2RCxVQUFLRyxTQUFMLEdBQWlCRCxlQUFqQjtBQUZ1RDtBQUd4RDs7OztvQ0FFZUUsVSxFQUFZQyxRLEVBQVU7QUFDcEMsVUFBTUMscUJBQXFCLEVBQTNCO0FBQ0EsVUFBTUMsbUJBQW1CLEVBQXpCOztBQUZvQztBQUFBO0FBQUE7O0FBQUE7QUFJcEMsNkJBQWtCLEtBQUtKLFNBQXZCLDhIQUFrQztBQUFBLGNBQXZCSyxHQUF1Qjs7QUFDaEMsY0FBTUMsYUFBYUwsV0FBV0ksR0FBWCxDQUFuQjtBQUNBLGNBQU1FLFdBQVdMLFNBQVNHLEdBQVQsQ0FBakI7QUFDQWIsaUJBQU9FLFFBQVFZLFVBQVIsS0FBdUJaLFFBQVFhLFFBQVIsQ0FBOUIsRUFBb0RGLEdBQXBEOztBQUVBRiw2QkFBbUJFLEdBQW5CLElBQTBCQyxVQUExQjtBQUNBRiwyQkFBaUJDLEdBQWpCLElBQXdCVCwwQkFBMEJTLEdBQTFCLEVBQStCQyxVQUEvQixFQUEyQ0MsUUFBM0MsQ0FBeEI7QUFDRDtBQVhtQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWFwQyxhQUFPO0FBQ0xDLGVBQU9MLGtCQURGO0FBRUxNLGFBQUtMO0FBRkEsT0FBUDtBQUlEOzs7cUNBRWdCSCxVLEVBQVlDLFEsRUFBVVEsQyxFQUFHO0FBQ3hDLFVBQU1DLFdBQVcsRUFBakI7QUFEd0M7QUFBQTtBQUFBOztBQUFBO0FBRXhDLDhCQUFrQixLQUFLWCxTQUF2QixtSUFBa0M7QUFBQSxjQUF2QkssR0FBdUI7O0FBQ2hDTSxtQkFBU04sR0FBVCxJQUFnQlYsS0FBS00sV0FBV0ksR0FBWCxDQUFMLEVBQXNCSCxTQUFTRyxHQUFULENBQXRCLEVBQXFDSyxDQUFyQyxDQUFoQjtBQUNEO0FBSnVDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBS3hDLGFBQU9DLFFBQVA7QUFDRDs7OztFQW5DNkNsQixzQjs7ZUFBM0JLLGtCIiwiZmlsZSI6ImxpbmVhci1pbnRlcnBvbGF0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgVHJhbnNpdGlvbkludGVycG9sYXRvciBmcm9tICcuL3RyYW5zaXRpb24taW50ZXJwb2xhdG9yJztcblxuaW1wb3J0IHtpc1ZhbGlkLCBsZXJwLCBnZXRFbmRWYWx1ZUJ5U2hvcnRlc3RQYXRofSBmcm9tICcuL3RyYW5zaXRpb24tdXRpbHMnO1xuXG5jb25zdCBWSUVXUE9SVF9UUkFOU0lUSU9OX1BST1BTID0gWydsb25naXR1ZGUnLCAnbGF0aXR1ZGUnLCAnem9vbScsICdiZWFyaW5nJywgJ3BpdGNoJ107XG5cbi8qKlxuICogUGVyZm9ybXMgbGluZWFyIGludGVycG9sYXRpb24gb2YgdHdvIHZpZXdwb3J0cy5cbiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5lYXJJbnRlcnBvbGF0b3IgZXh0ZW5kcyBUcmFuc2l0aW9uSW50ZXJwb2xhdG9yIHtcblxuICAvKipcbiAgICogQHBhcmFtIHtBcnJheX0gdHJhbnNpdGlvblByb3BzIC0gbGlzdCBvZiBwcm9wcyB0byBhcHBseSBsaW5lYXIgdHJhbnNpdGlvbiB0by5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHRyYW5zaXRpb25Qcm9wcyA9IFZJRVdQT1JUX1RSQU5TSVRJT05fUFJPUFMpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucHJvcE5hbWVzID0gdHJhbnNpdGlvblByb3BzO1xuICB9XG5cbiAgaW5pdGlhbGl6ZVByb3BzKHN0YXJ0UHJvcHMsIGVuZFByb3BzKSB7XG4gICAgY29uc3Qgc3RhcnRWaWV3cG9ydFByb3BzID0ge307XG4gICAgY29uc3QgZW5kVmlld3BvcnRQcm9wcyA9IHt9O1xuXG4gICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5wcm9wTmFtZXMpIHtcbiAgICAgIGNvbnN0IHN0YXJ0VmFsdWUgPSBzdGFydFByb3BzW2tleV07XG4gICAgICBjb25zdCBlbmRWYWx1ZSA9IGVuZFByb3BzW2tleV07XG4gICAgICBhc3NlcnQoaXNWYWxpZChzdGFydFZhbHVlKSAmJiBpc1ZhbGlkKGVuZFZhbHVlKSwgYCR7a2V5fSBtdXN0IGJlIHN1cHBsaWVkIGZvciB0cmFuc2l0aW9uYCk7XG5cbiAgICAgIHN0YXJ0Vmlld3BvcnRQcm9wc1trZXldID0gc3RhcnRWYWx1ZTtcbiAgICAgIGVuZFZpZXdwb3J0UHJvcHNba2V5XSA9IGdldEVuZFZhbHVlQnlTaG9ydGVzdFBhdGgoa2V5LCBzdGFydFZhbHVlLCBlbmRWYWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXJ0OiBzdGFydFZpZXdwb3J0UHJvcHMsXG4gICAgICBlbmQ6IGVuZFZpZXdwb3J0UHJvcHNcbiAgICB9O1xuICB9XG5cbiAgaW50ZXJwb2xhdGVQcm9wcyhzdGFydFByb3BzLCBlbmRQcm9wcywgdCkge1xuICAgIGNvbnN0IHZpZXdwb3J0ID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5wcm9wTmFtZXMpIHtcbiAgICAgIHZpZXdwb3J0W2tleV0gPSBsZXJwKHN0YXJ0UHJvcHNba2V5XSwgZW5kUHJvcHNba2V5XSwgdCk7XG4gICAgfVxuICAgIHJldHVybiB2aWV3cG9ydDtcbiAgfVxuXG59XG4iXX0=