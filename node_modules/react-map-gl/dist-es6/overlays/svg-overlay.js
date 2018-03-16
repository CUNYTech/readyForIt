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

var SVGOverlay = function (_BaseControl) {
  _inherits(SVGOverlay, _BaseControl);

  function SVGOverlay() {
    _classCallCheck(this, SVGOverlay);

    return _possibleConstructorReturn(this, (SVGOverlay.__proto__ || Object.getPrototypeOf(SVGOverlay)).apply(this, arguments));
  }

  _createClass(SVGOverlay, [{
    key: 'render',
    value: function render() {
      var _context = this.context,
          viewport = _context.viewport,
          isDragging = _context.isDragging;

      var style = Object.assign({
        pointerEvents: 'none',
        position: 'absolute',
        left: 0,
        top: 0
      }, this.props.style);

      return createElement('svg', {
        width: viewport.width,
        height: viewport.height,
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

  return SVGOverlay;
}(BaseControl);

export default SVGOverlay;


SVGOverlay.displayName = 'SVGOverlay';
SVGOverlay.propTypes = propTypes;
SVGOverlay.defaultProps = defaultProps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vdmVybGF5cy9zdmctb3ZlcmxheS5qcyJdLCJuYW1lcyI6WyJjcmVhdGVFbGVtZW50IiwiUHJvcFR5cGVzIiwiQmFzZUNvbnRyb2wiLCJwcm9wVHlwZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJyZWRyYXciLCJmdW5jIiwiaXNSZXF1aXJlZCIsInN0eWxlIiwib2JqZWN0IiwiZGVmYXVsdFByb3BzIiwiY2FwdHVyZVNjcm9sbCIsImNhcHR1cmVEcmFnIiwiY2FwdHVyZUNsaWNrIiwiY2FwdHVyZURvdWJsZUNsaWNrIiwiU1ZHT3ZlcmxheSIsImNvbnRleHQiLCJ2aWV3cG9ydCIsImlzRHJhZ2dpbmciLCJwb2ludGVyRXZlbnRzIiwicG9zaXRpb24iLCJsZWZ0IiwidG9wIiwicHJvcHMiLCJ3aWR0aCIsImhlaWdodCIsInJlZiIsIl9vbkNvbnRhaW5lckxvYWQiLCJwcm9qZWN0IiwiYmluZCIsInVucHJvamVjdCIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVFBLGFBQVIsUUFBNEIsT0FBNUI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsV0FBUCxNQUF3Qiw0QkFBeEI7O0FBRUEsSUFBTUMsWUFBWUMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JILFlBQVlDLFNBQTlCLEVBQXlDO0FBQ3pERyxVQUFRTCxVQUFVTSxJQUFWLENBQWVDLFVBRGtDO0FBRXpEQyxTQUFPUixVQUFVUztBQUZ3QyxDQUF6QyxDQUFsQjs7QUFLQSxJQUFNQyxlQUFlO0FBQ25CQyxpQkFBZSxLQURJO0FBRW5CQyxlQUFhLEtBRk07QUFHbkJDLGdCQUFjLEtBSEs7QUFJbkJDLHNCQUFvQjtBQUpELENBQXJCOztJQU9xQkMsVTs7Ozs7Ozs7Ozs7NkJBQ1Y7QUFBQSxxQkFDd0IsS0FBS0MsT0FEN0I7QUFBQSxVQUNBQyxRQURBLFlBQ0FBLFFBREE7QUFBQSxVQUNVQyxVQURWLFlBQ1VBLFVBRFY7O0FBRVAsVUFBTVYsUUFBUUwsT0FBT0MsTUFBUCxDQUFjO0FBQzFCZSx1QkFBZSxNQURXO0FBRTFCQyxrQkFBVSxVQUZnQjtBQUcxQkMsY0FBTSxDQUhvQjtBQUkxQkMsYUFBSztBQUpxQixPQUFkLEVBS1gsS0FBS0MsS0FBTCxDQUFXZixLQUxBLENBQWQ7O0FBT0EsYUFDRVQsY0FBYyxLQUFkLEVBQXFCO0FBQ25CeUIsZUFBT1AsU0FBU08sS0FERztBQUVuQkMsZ0JBQVFSLFNBQVNRLE1BRkU7QUFHbkJDLGFBQUssS0FBS0MsZ0JBSFM7QUFJbkJuQjtBQUptQixPQUFyQixFQU1FLEtBQUtlLEtBQUwsQ0FBV2xCLE1BQVgsQ0FBa0I7QUFDaEJtQixlQUFPUCxTQUFTTyxLQURBO0FBRWhCQyxnQkFBUVIsU0FBU1EsTUFGRDtBQUdoQlAsOEJBSGdCO0FBSWhCVSxpQkFBU1gsU0FBU1csT0FBVCxDQUFpQkMsSUFBakIsQ0FBc0JaLFFBQXRCLENBSk87QUFLaEJhLG1CQUFXYixTQUFTYSxTQUFULENBQW1CRCxJQUFuQixDQUF3QlosUUFBeEI7QUFMSyxPQUFsQixDQU5GLENBREY7QUFnQkQ7Ozs7RUExQnFDaEIsVzs7ZUFBbkJjLFU7OztBQTZCckJBLFdBQVdnQixXQUFYLEdBQXlCLFlBQXpCO0FBQ0FoQixXQUFXYixTQUFYLEdBQXVCQSxTQUF2QjtBQUNBYSxXQUFXTCxZQUFYLEdBQTBCQSxZQUExQiIsImZpbGUiOiJzdmctb3ZlcmxheS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7Y3JlYXRlRWxlbWVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBCYXNlQ29udHJvbCBmcm9tICcuLi9jb21wb25lbnRzL2Jhc2UtY29udHJvbCc7XG5cbmNvbnN0IHByb3BUeXBlcyA9IE9iamVjdC5hc3NpZ24oe30sIEJhc2VDb250cm9sLnByb3BUeXBlcywge1xuICByZWRyYXc6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XG59KTtcblxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xuICBjYXB0dXJlU2Nyb2xsOiBmYWxzZSxcbiAgY2FwdHVyZURyYWc6IGZhbHNlLFxuICBjYXB0dXJlQ2xpY2s6IGZhbHNlLFxuICBjYXB0dXJlRG91YmxlQ2xpY2s6IGZhbHNlXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTVkdPdmVybGF5IGV4dGVuZHMgQmFzZUNvbnRyb2wge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3ZpZXdwb3J0LCBpc0RyYWdnaW5nfSA9IHRoaXMuY29udGV4dDtcbiAgICBjb25zdCBzdHlsZSA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgcG9pbnRlckV2ZW50czogJ25vbmUnLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgdG9wOiAwXG4gICAgfSwgdGhpcy5wcm9wcy5zdHlsZSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgY3JlYXRlRWxlbWVudCgnc3ZnJywge1xuICAgICAgICB3aWR0aDogdmlld3BvcnQud2lkdGgsXG4gICAgICAgIGhlaWdodDogdmlld3BvcnQuaGVpZ2h0LFxuICAgICAgICByZWY6IHRoaXMuX29uQ29udGFpbmVyTG9hZCxcbiAgICAgICAgc3R5bGVcbiAgICAgIH0sXG4gICAgICAgIHRoaXMucHJvcHMucmVkcmF3KHtcbiAgICAgICAgICB3aWR0aDogdmlld3BvcnQud2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiB2aWV3cG9ydC5oZWlnaHQsXG4gICAgICAgICAgaXNEcmFnZ2luZyxcbiAgICAgICAgICBwcm9qZWN0OiB2aWV3cG9ydC5wcm9qZWN0LmJpbmQodmlld3BvcnQpLFxuICAgICAgICAgIHVucHJvamVjdDogdmlld3BvcnQudW5wcm9qZWN0LmJpbmQodmlld3BvcnQpXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgKTtcbiAgfVxufVxuXG5TVkdPdmVybGF5LmRpc3BsYXlOYW1lID0gJ1NWR092ZXJsYXknO1xuU1ZHT3ZlcmxheS5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5TVkdPdmVybGF5LmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcbiJdfQ==