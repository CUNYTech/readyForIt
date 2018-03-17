var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Copyright (c) 2015 Uber Technologies, Inc.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import { createElement } from 'react';
import PropTypes from 'prop-types';
import BaseControl from '../components/base-control';

var propTypes = Object.assign({}, BaseControl.propTypes, {
  redraw: PropTypes.func.isRequired,
  style: PropTypes.object
});

var defaultProps = {
  captureScroll: false,
  captureDrag: false,
  captureClick: false,
  captureDoubleClick: false
};

var HTMLOverlay = function (_BaseControl) {
  _inherits(HTMLOverlay, _BaseControl);

  function HTMLOverlay() {
    _classCallCheck(this, HTMLOverlay);

    return _possibleConstructorReturn(this, (HTMLOverlay.__proto__ || Object.getPrototypeOf(HTMLOverlay)).apply(this, arguments));
  }

  _createClass(HTMLOverlay, [{
    key: 'render',
    value: function render() {
      var _context = this.context,
          viewport = _context.viewport,
          isDragging = _context.isDragging;

      var style = Object.assign({
        position: 'absolute',
        pointerEvents: 'none',
        left: 0,
        top: 0,
        width: viewport.width,
        height: viewport.height
      }, this.props.style);

      return createElement('div', {
        ref: this._onContainerLoad,
        style: style
      }, this.props.redraw({
        width: viewport.width,
        height: viewport.height,
        isDragging: isDragging,
        project: viewport.project.bind(viewport),
        unproject: viewport.unproject.bind(viewport)
      }));
    }
  }]);

  return HTMLOverlay;
}(BaseControl);

export default HTMLOverlay;


HTMLOverlay.displayName = 'HTMLOverlay';
HTMLOverlay.propTypes = propTypes;
HTMLOverlay.defaultProps = defaultProps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vdmVybGF5cy9odG1sLW92ZXJsYXkuanMiXSwibmFtZXMiOlsiY3JlYXRlRWxlbWVudCIsIlByb3BUeXBlcyIsIkJhc2VDb250cm9sIiwicHJvcFR5cGVzIiwiT2JqZWN0IiwiYXNzaWduIiwicmVkcmF3IiwiZnVuYyIsImlzUmVxdWlyZWQiLCJzdHlsZSIsIm9iamVjdCIsImRlZmF1bHRQcm9wcyIsImNhcHR1cmVTY3JvbGwiLCJjYXB0dXJlRHJhZyIsImNhcHR1cmVDbGljayIsImNhcHR1cmVEb3VibGVDbGljayIsIkhUTUxPdmVybGF5IiwiY29udGV4dCIsInZpZXdwb3J0IiwiaXNEcmFnZ2luZyIsInBvc2l0aW9uIiwicG9pbnRlckV2ZW50cyIsImxlZnQiLCJ0b3AiLCJ3aWR0aCIsImhlaWdodCIsInByb3BzIiwicmVmIiwiX29uQ29udGFpbmVyTG9hZCIsInByb2plY3QiLCJiaW5kIiwidW5wcm9qZWN0IiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUUEsYUFBUixRQUE0QixPQUE1QjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxXQUFQLE1BQXdCLDRCQUF4Qjs7QUFFQSxJQUFNQyxZQUFZQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkgsWUFBWUMsU0FBOUIsRUFBeUM7QUFDekRHLFVBQVFMLFVBQVVNLElBQVYsQ0FBZUMsVUFEa0M7QUFFekRDLFNBQU9SLFVBQVVTO0FBRndDLENBQXpDLENBQWxCOztBQUtBLElBQU1DLGVBQWU7QUFDbkJDLGlCQUFlLEtBREk7QUFFbkJDLGVBQWEsS0FGTTtBQUduQkMsZ0JBQWMsS0FISztBQUluQkMsc0JBQW9CO0FBSkQsQ0FBckI7O0lBT3FCQyxXOzs7Ozs7Ozs7Ozs2QkFDVjtBQUFBLHFCQUN3QixLQUFLQyxPQUQ3QjtBQUFBLFVBQ0FDLFFBREEsWUFDQUEsUUFEQTtBQUFBLFVBQ1VDLFVBRFYsWUFDVUEsVUFEVjs7QUFFUCxVQUFNVixRQUFRTCxPQUFPQyxNQUFQLENBQWM7QUFDMUJlLGtCQUFVLFVBRGdCO0FBRTFCQyx1QkFBZSxNQUZXO0FBRzFCQyxjQUFNLENBSG9CO0FBSTFCQyxhQUFLLENBSnFCO0FBSzFCQyxlQUFPTixTQUFTTSxLQUxVO0FBTTFCQyxnQkFBUVAsU0FBU087QUFOUyxPQUFkLEVBT1gsS0FBS0MsS0FBTCxDQUFXakIsS0FQQSxDQUFkOztBQVNBLGFBQ0VULGNBQWMsS0FBZCxFQUFxQjtBQUNuQjJCLGFBQUssS0FBS0MsZ0JBRFM7QUFFbkJuQjtBQUZtQixPQUFyQixFQUlFLEtBQUtpQixLQUFMLENBQVdwQixNQUFYLENBQWtCO0FBQ2hCa0IsZUFBT04sU0FBU00sS0FEQTtBQUVoQkMsZ0JBQVFQLFNBQVNPLE1BRkQ7QUFHaEJOLDhCQUhnQjtBQUloQlUsaUJBQVNYLFNBQVNXLE9BQVQsQ0FBaUJDLElBQWpCLENBQXNCWixRQUF0QixDQUpPO0FBS2hCYSxtQkFBV2IsU0FBU2EsU0FBVCxDQUFtQkQsSUFBbkIsQ0FBd0JaLFFBQXhCO0FBTEssT0FBbEIsQ0FKRixDQURGO0FBY0Q7Ozs7RUExQnNDaEIsVzs7ZUFBcEJjLFc7OztBQTZCckJBLFlBQVlnQixXQUFaLEdBQTBCLGFBQTFCO0FBQ0FoQixZQUFZYixTQUFaLEdBQXdCQSxTQUF4QjtBQUNBYSxZQUFZTCxZQUFaLEdBQTJCQSxZQUEzQiIsImZpbGUiOiJodG1sLW92ZXJsYXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTUgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cblxuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge2NyZWF0ZUVsZW1lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQmFzZUNvbnRyb2wgZnJvbSAnLi4vY29tcG9uZW50cy9iYXNlLWNvbnRyb2wnO1xuXG5jb25zdCBwcm9wVHlwZXMgPSBPYmplY3QuYXNzaWduKHt9LCBCYXNlQ29udHJvbC5wcm9wVHlwZXMsIHtcbiAgcmVkcmF3OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBzdHlsZTogUHJvcFR5cGVzLm9iamVjdFxufSk7XG5cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcbiAgY2FwdHVyZVNjcm9sbDogZmFsc2UsXG4gIGNhcHR1cmVEcmFnOiBmYWxzZSxcbiAgY2FwdHVyZUNsaWNrOiBmYWxzZSxcbiAgY2FwdHVyZURvdWJsZUNsaWNrOiBmYWxzZVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFRNTE92ZXJsYXkgZXh0ZW5kcyBCYXNlQ29udHJvbCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7dmlld3BvcnQsIGlzRHJhZ2dpbmd9ID0gdGhpcy5jb250ZXh0O1xuICAgIGNvbnN0IHN0eWxlID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHBvaW50ZXJFdmVudHM6ICdub25lJyxcbiAgICAgIGxlZnQ6IDAsXG4gICAgICB0b3A6IDAsXG4gICAgICB3aWR0aDogdmlld3BvcnQud2lkdGgsXG4gICAgICBoZWlnaHQ6IHZpZXdwb3J0LmhlaWdodFxuICAgIH0sIHRoaXMucHJvcHMuc3R5bGUpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgcmVmOiB0aGlzLl9vbkNvbnRhaW5lckxvYWQsXG4gICAgICAgIHN0eWxlXG4gICAgICB9LFxuICAgICAgICB0aGlzLnByb3BzLnJlZHJhdyh7XG4gICAgICAgICAgd2lkdGg6IHZpZXdwb3J0LndpZHRoLFxuICAgICAgICAgIGhlaWdodDogdmlld3BvcnQuaGVpZ2h0LFxuICAgICAgICAgIGlzRHJhZ2dpbmcsXG4gICAgICAgICAgcHJvamVjdDogdmlld3BvcnQucHJvamVjdC5iaW5kKHZpZXdwb3J0KSxcbiAgICAgICAgICB1bnByb2plY3Q6IHZpZXdwb3J0LnVucHJvamVjdC5iaW5kKHZpZXdwb3J0KVxuICAgICAgICB9KVxuICAgICAgKVxuICAgICk7XG4gIH1cbn1cblxuSFRNTE92ZXJsYXkuZGlzcGxheU5hbWUgPSAnSFRNTE92ZXJsYXknO1xuSFRNTE92ZXJsYXkucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuSFRNTE92ZXJsYXkuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuIl19