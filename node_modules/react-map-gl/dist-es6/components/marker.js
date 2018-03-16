var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
import BaseControl from './base-control';

var propTypes = Object.assign({}, BaseControl.propTypes, {
  // Custom className
  className: PropTypes.string,
  // Longitude of the anchor point
  longitude: PropTypes.number.isRequired,
  // Latitude of the anchor point
  latitude: PropTypes.number.isRequired,
  // Offset from the left
  offsetLeft: PropTypes.number,
  // Offset from the top
  offsetTop: PropTypes.number
});

var defaultProps = Object.assign({}, BaseControl.defaultProps, {
  className: '',
  offsetLeft: 0,
  offsetTop: 0
});

/*
 * PureComponent doesn't update when context changes.
 * The only way is to implement our own shouldComponentUpdate here. Considering
 * the parent component (StaticMap or InteractiveMap) is pure, and map re-render
 * is almost always triggered by a viewport change, we almost definitely need to
 * recalculate the marker's position when the parent re-renders.
 */

var Marker = function (_BaseControl) {
  _inherits(Marker, _BaseControl);

  function Marker() {
    _classCallCheck(this, Marker);

    return _possibleConstructorReturn(this, (Marker.__proto__ || Object.getPrototypeOf(Marker)).apply(this, arguments));
  }

  _createClass(Marker, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          longitude = _props.longitude,
          latitude = _props.latitude,
          offsetLeft = _props.offsetLeft,
          offsetTop = _props.offsetTop;

      var _context$viewport$pro = this.context.viewport.project([longitude, latitude]),
          _context$viewport$pro2 = _slicedToArray(_context$viewport$pro, 2),
          x = _context$viewport$pro2[0],
          y = _context$viewport$pro2[1];

      var containerStyle = {
        position: 'absolute',
        left: x + offsetLeft,
        top: y + offsetTop
      };

      return createElement('div', {
        className: 'mapboxgl-marker ' + className,
        ref: this._onContainerLoad,
        style: containerStyle,
        children: this.props.children
      });
    }
  }]);

  return Marker;
}(BaseControl);

export default Marker;


Marker.displayName = 'Marker';
Marker.propTypes = propTypes;
Marker.defaultProps = defaultProps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21hcmtlci5qcyJdLCJuYW1lcyI6WyJjcmVhdGVFbGVtZW50IiwiUHJvcFR5cGVzIiwiQmFzZUNvbnRyb2wiLCJwcm9wVHlwZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJjbGFzc05hbWUiLCJzdHJpbmciLCJsb25naXR1ZGUiLCJudW1iZXIiLCJpc1JlcXVpcmVkIiwibGF0aXR1ZGUiLCJvZmZzZXRMZWZ0Iiwib2Zmc2V0VG9wIiwiZGVmYXVsdFByb3BzIiwiTWFya2VyIiwicHJvcHMiLCJjb250ZXh0Iiwidmlld3BvcnQiLCJwcm9qZWN0IiwieCIsInkiLCJjb250YWluZXJTdHlsZSIsInBvc2l0aW9uIiwibGVmdCIsInRvcCIsInJlZiIsIl9vbkNvbnRhaW5lckxvYWQiLCJzdHlsZSIsImNoaWxkcmVuIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVFBLGFBQVIsUUFBNEIsT0FBNUI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsV0FBUCxNQUF3QixnQkFBeEI7O0FBRUEsSUFBTUMsWUFBWUMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JILFlBQVlDLFNBQTlCLEVBQXlDO0FBQ3pEO0FBQ0FHLGFBQVdMLFVBQVVNLE1BRm9DO0FBR3pEO0FBQ0FDLGFBQVdQLFVBQVVRLE1BQVYsQ0FBaUJDLFVBSjZCO0FBS3pEO0FBQ0FDLFlBQVVWLFVBQVVRLE1BQVYsQ0FBaUJDLFVBTjhCO0FBT3pEO0FBQ0FFLGNBQVlYLFVBQVVRLE1BUm1DO0FBU3pEO0FBQ0FJLGFBQVdaLFVBQVVRO0FBVm9DLENBQXpDLENBQWxCOztBQWFBLElBQU1LLGVBQWVWLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCSCxZQUFZWSxZQUE5QixFQUE0QztBQUMvRFIsYUFBVyxFQURvRDtBQUUvRE0sY0FBWSxDQUZtRDtBQUcvREMsYUFBVztBQUhvRCxDQUE1QyxDQUFyQjs7QUFNQTs7Ozs7Ozs7SUFPcUJFLE07Ozs7Ozs7Ozs7OzZCQUVWO0FBQUEsbUJBQ3lELEtBQUtDLEtBRDlEO0FBQUEsVUFDQVYsU0FEQSxVQUNBQSxTQURBO0FBQUEsVUFDV0UsU0FEWCxVQUNXQSxTQURYO0FBQUEsVUFDc0JHLFFBRHRCLFVBQ3NCQSxRQUR0QjtBQUFBLFVBQ2dDQyxVQURoQyxVQUNnQ0EsVUFEaEM7QUFBQSxVQUM0Q0MsU0FENUMsVUFDNENBLFNBRDVDOztBQUFBLGtDQUdRLEtBQUtJLE9BQUwsQ0FBYUMsUUFBYixDQUFzQkMsT0FBdEIsQ0FBOEIsQ0FBQ1gsU0FBRCxFQUFZRyxRQUFaLENBQTlCLENBSFI7QUFBQTtBQUFBLFVBR0FTLENBSEE7QUFBQSxVQUdHQyxDQUhIOztBQUlQLFVBQU1DLGlCQUFpQjtBQUNyQkMsa0JBQVUsVUFEVztBQUVyQkMsY0FBTUosSUFBSVIsVUFGVztBQUdyQmEsYUFBS0osSUFBSVI7QUFIWSxPQUF2Qjs7QUFNQSxhQUFPYixjQUFjLEtBQWQsRUFBcUI7QUFDMUJNLHdDQUE4QkEsU0FESjtBQUUxQm9CLGFBQUssS0FBS0MsZ0JBRmdCO0FBRzFCQyxlQUFPTixjQUhtQjtBQUkxQk8sa0JBQVUsS0FBS2IsS0FBTCxDQUFXYTtBQUpLLE9BQXJCLENBQVA7QUFNRDs7OztFQWxCaUMzQixXOztlQUFmYSxNOzs7QUFzQnJCQSxPQUFPZSxXQUFQLEdBQXFCLFFBQXJCO0FBQ0FmLE9BQU9aLFNBQVAsR0FBbUJBLFNBQW5CO0FBQ0FZLE9BQU9ELFlBQVAsR0FBc0JBLFlBQXRCIiwiZmlsZSI6Im1hcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5pbXBvcnQge2NyZWF0ZUVsZW1lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQmFzZUNvbnRyb2wgZnJvbSAnLi9iYXNlLWNvbnRyb2wnO1xuXG5jb25zdCBwcm9wVHlwZXMgPSBPYmplY3QuYXNzaWduKHt9LCBCYXNlQ29udHJvbC5wcm9wVHlwZXMsIHtcbiAgLy8gQ3VzdG9tIGNsYXNzTmFtZVxuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIC8vIExvbmdpdHVkZSBvZiB0aGUgYW5jaG9yIHBvaW50XG4gIGxvbmdpdHVkZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAvLyBMYXRpdHVkZSBvZiB0aGUgYW5jaG9yIHBvaW50XG4gIGxhdGl0dWRlOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIC8vIE9mZnNldCBmcm9tIHRoZSBsZWZ0XG4gIG9mZnNldExlZnQ6IFByb3BUeXBlcy5udW1iZXIsXG4gIC8vIE9mZnNldCBmcm9tIHRoZSB0b3BcbiAgb2Zmc2V0VG9wOiBQcm9wVHlwZXMubnVtYmVyXG59KTtcblxuY29uc3QgZGVmYXVsdFByb3BzID0gT2JqZWN0LmFzc2lnbih7fSwgQmFzZUNvbnRyb2wuZGVmYXVsdFByb3BzLCB7XG4gIGNsYXNzTmFtZTogJycsXG4gIG9mZnNldExlZnQ6IDAsXG4gIG9mZnNldFRvcDogMFxufSk7XG5cbi8qXG4gKiBQdXJlQ29tcG9uZW50IGRvZXNuJ3QgdXBkYXRlIHdoZW4gY29udGV4dCBjaGFuZ2VzLlxuICogVGhlIG9ubHkgd2F5IGlzIHRvIGltcGxlbWVudCBvdXIgb3duIHNob3VsZENvbXBvbmVudFVwZGF0ZSBoZXJlLiBDb25zaWRlcmluZ1xuICogdGhlIHBhcmVudCBjb21wb25lbnQgKFN0YXRpY01hcCBvciBJbnRlcmFjdGl2ZU1hcCkgaXMgcHVyZSwgYW5kIG1hcCByZS1yZW5kZXJcbiAqIGlzIGFsbW9zdCBhbHdheXMgdHJpZ2dlcmVkIGJ5IGEgdmlld3BvcnQgY2hhbmdlLCB3ZSBhbG1vc3QgZGVmaW5pdGVseSBuZWVkIHRvXG4gKiByZWNhbGN1bGF0ZSB0aGUgbWFya2VyJ3MgcG9zaXRpb24gd2hlbiB0aGUgcGFyZW50IHJlLXJlbmRlcnMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcmtlciBleHRlbmRzIEJhc2VDb250cm9sIHtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2NsYXNzTmFtZSwgbG9uZ2l0dWRlLCBsYXRpdHVkZSwgb2Zmc2V0TGVmdCwgb2Zmc2V0VG9wfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBbeCwgeV0gPSB0aGlzLmNvbnRleHQudmlld3BvcnQucHJvamVjdChbbG9uZ2l0dWRlLCBsYXRpdHVkZV0pO1xuICAgIGNvbnN0IGNvbnRhaW5lclN0eWxlID0ge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBsZWZ0OiB4ICsgb2Zmc2V0TGVmdCxcbiAgICAgIHRvcDogeSArIG9mZnNldFRvcFxuICAgIH07XG5cbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgY2xhc3NOYW1lOiBgbWFwYm94Z2wtbWFya2VyICR7Y2xhc3NOYW1lfWAsXG4gICAgICByZWY6IHRoaXMuX29uQ29udGFpbmVyTG9hZCxcbiAgICAgIHN0eWxlOiBjb250YWluZXJTdHlsZSxcbiAgICAgIGNoaWxkcmVuOiB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgfSk7XG4gIH1cblxufVxuXG5NYXJrZXIuZGlzcGxheU5hbWUgPSAnTWFya2VyJztcbk1hcmtlci5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5NYXJrZXIuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuIl19