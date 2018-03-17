var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import WebMercatorViewport, { normalizeViewportProps } from 'viewport-mercator-project';
import assert from 'assert';

// MAPBOX LIMITS
export var MAPBOX_LIMITS = {
  minZoom: 0,
  maxZoom: 20,
  minPitch: 0,
  maxPitch: 60
};

var DEFAULT_STATE = {
  pitch: 0,
  bearing: 0,
  altitude: 1.5
};

/* Utils */
function clamp(value, min, max) {
  return value < min ? min : value > max ? max : value;
}

var MapState = function () {
  function MapState() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        width = _ref.width,
        height = _ref.height,
        latitude = _ref.latitude,
        longitude = _ref.longitude,
        zoom = _ref.zoom,
        _ref$bearing = _ref.bearing,
        bearing = _ref$bearing === undefined ? DEFAULT_STATE.bearing : _ref$bearing,
        _ref$pitch = _ref.pitch,
        pitch = _ref$pitch === undefined ? DEFAULT_STATE.pitch : _ref$pitch,
        _ref$altitude = _ref.altitude,
        altitude = _ref$altitude === undefined ? DEFAULT_STATE.altitude : _ref$altitude,
        _ref$maxZoom = _ref.maxZoom,
        maxZoom = _ref$maxZoom === undefined ? MAPBOX_LIMITS.maxZoom : _ref$maxZoom,
        _ref$minZoom = _ref.minZoom,
        minZoom = _ref$minZoom === undefined ? MAPBOX_LIMITS.minZoom : _ref$minZoom,
        _ref$maxPitch = _ref.maxPitch,
        maxPitch = _ref$maxPitch === undefined ? MAPBOX_LIMITS.maxPitch : _ref$maxPitch,
        _ref$minPitch = _ref.minPitch,
        minPitch = _ref$minPitch === undefined ? MAPBOX_LIMITS.minPitch : _ref$minPitch,
        startPanLngLat = _ref.startPanLngLat,
        startZoomLngLat = _ref.startZoomLngLat,
        startBearing = _ref.startBearing,
        startPitch = _ref.startPitch,
        startZoom = _ref.startZoom;

    _classCallCheck(this, MapState);

    assert(Number.isFinite(width), '`width` must be supplied');
    assert(Number.isFinite(height), '`height` must be supplied');
    assert(Number.isFinite(longitude), '`longitude` must be supplied');
    assert(Number.isFinite(latitude), '`latitude` must be supplied');
    assert(Number.isFinite(zoom), '`zoom` must be supplied');

    this._viewportProps = this._applyConstraints({
      width: width,
      height: height,
      latitude: latitude,
      longitude: longitude,
      zoom: zoom,
      bearing: bearing,
      pitch: pitch,
      altitude: altitude,
      maxZoom: maxZoom,
      minZoom: minZoom,
      maxPitch: maxPitch,
      minPitch: minPitch
    });

    this._interactiveState = {
      startPanLngLat: startPanLngLat,
      startZoomLngLat: startZoomLngLat,
      startBearing: startBearing,
      startPitch: startPitch,
      startZoom: startZoom
    };
  }

  /* Public API */

  _createClass(MapState, [{
    key: 'getViewportProps',
    value: function getViewportProps() {
      return this._viewportProps;
    }
  }, {
    key: 'getInteractiveState',
    value: function getInteractiveState() {
      return this._interactiveState;
    }

    /**
     * Start panning
     * @param {[Number, Number]} pos - position on screen where the pointer grabs
     */

  }, {
    key: 'panStart',
    value: function panStart(_ref2) {
      var pos = _ref2.pos;

      return this._getUpdatedMapState({
        startPanLngLat: this._unproject(pos)
      });
    }

    /**
     * Pan
     * @param {[Number, Number]} pos - position on screen where the pointer is
     * @param {[Number, Number], optional} startPos - where the pointer grabbed at
     *   the start of the operation. Must be supplied of `panStart()` was not called
     */

  }, {
    key: 'pan',
    value: function pan(_ref3) {
      var pos = _ref3.pos,
          startPos = _ref3.startPos;

      var startPanLngLat = this._interactiveState.startPanLngLat || this._unproject(startPos);

      if (!startPanLngLat) {
        return this;
      }

      var _calculateNewLngLat2 = this._calculateNewLngLat({ startPanLngLat: startPanLngLat, pos: pos }),
          _calculateNewLngLat3 = _slicedToArray(_calculateNewLngLat2, 2),
          longitude = _calculateNewLngLat3[0],
          latitude = _calculateNewLngLat3[1];

      return this._getUpdatedMapState({
        longitude: longitude,
        latitude: latitude
      });
    }

    /**
     * End panning
     * Must call if `panStart()` was called
     */

  }, {
    key: 'panEnd',
    value: function panEnd() {
      return this._getUpdatedMapState({
        startPanLngLat: null
      });
    }

    /**
     * Start rotating
     * @param {[Number, Number]} pos - position on screen where the center is
     */

  }, {
    key: 'rotateStart',
    value: function rotateStart(_ref4) {
      var pos = _ref4.pos;

      return this._getUpdatedMapState({
        startBearing: this._viewportProps.bearing,
        startPitch: this._viewportProps.pitch
      });
    }

    /**
     * Rotate
     * @param {Number} deltaScaleX - a number between [-1, 1] specifying the
     *   change to bearing.
     * @param {Number} deltaScaleY - a number between [-1, 1] specifying the
     *   change to pitch. -1 sets to minPitch and 1 sets to maxPitch.
     */

  }, {
    key: 'rotate',
    value: function rotate(_ref5) {
      var _ref5$deltaScaleX = _ref5.deltaScaleX,
          deltaScaleX = _ref5$deltaScaleX === undefined ? 0 : _ref5$deltaScaleX,
          _ref5$deltaScaleY = _ref5.deltaScaleY,
          deltaScaleY = _ref5$deltaScaleY === undefined ? 0 : _ref5$deltaScaleY;
      var _interactiveState = this._interactiveState,
          startBearing = _interactiveState.startBearing,
          startPitch = _interactiveState.startPitch;


      if (!Number.isFinite(startBearing) || !Number.isFinite(startPitch)) {
        return this;
      }

      var _calculateNewPitchAnd = this._calculateNewPitchAndBearing({
        deltaScaleX: deltaScaleX,
        deltaScaleY: deltaScaleY,
        startBearing: startBearing,
        startPitch: startPitch
      }),
          pitch = _calculateNewPitchAnd.pitch,
          bearing = _calculateNewPitchAnd.bearing;

      return this._getUpdatedMapState({
        bearing: bearing,
        pitch: pitch
      });
    }

    /**
     * End rotating
     * Must call if `rotateStart()` was called
     */

  }, {
    key: 'rotateEnd',
    value: function rotateEnd() {
      return this._getUpdatedMapState({
        startBearing: null,
        startPitch: null
      });
    }

    /**
     * Start zooming
     * @param {[Number, Number]} pos - position on screen where the center is
     */

  }, {
    key: 'zoomStart',
    value: function zoomStart(_ref6) {
      var pos = _ref6.pos;

      return this._getUpdatedMapState({
        startZoomLngLat: this._unproject(pos),
        startZoom: this._viewportProps.zoom
      });
    }

    /**
     * Zoom
     * @param {[Number, Number]} pos - position on screen where the current center is
     * @param {[Number, Number]} startPos - the center position at
     *   the start of the operation. Must be supplied of `zoomStart()` was not called
     * @param {Number} scale - a number between [0, 1] specifying the accumulated
     *   relative scale.
     */

  }, {
    key: 'zoom',
    value: function zoom(_ref7) {
      var pos = _ref7.pos,
          startPos = _ref7.startPos,
          scale = _ref7.scale;

      assert(scale > 0, '`scale` must be a positive number');

      // Make sure we zoom around the current mouse position rather than map center
      var _interactiveState2 = this._interactiveState,
          startZoom = _interactiveState2.startZoom,
          startZoomLngLat = _interactiveState2.startZoomLngLat;


      if (!Number.isFinite(startZoom)) {
        // We have two modes of zoom:
        // scroll zoom that are discrete events (transform from the current zoom level),
        // and pinch zoom that are continuous events (transform from the zoom level when
        // pinch started).
        // If startZoom state is defined, then use the startZoom state;
        // otherwise assume discrete zooming
        startZoom = this._viewportProps.zoom;
        startZoomLngLat = this._unproject(startPos) || this._unproject(pos);
      }

      // take the start lnglat and put it where the mouse is down.
      assert(startZoomLngLat, '`startZoomLngLat` prop is required ' + 'for zoom behavior to calculate where to position the map.');

      var zoom = this._calculateNewZoom({ scale: scale, startZoom: startZoom });

      var zoomedViewport = new WebMercatorViewport(Object.assign({}, this._viewportProps, { zoom: zoom }));

      var _zoomedViewport$getLo = zoomedViewport.getLocationAtPoint({ lngLat: startZoomLngLat, pos: pos }),
          _zoomedViewport$getLo2 = _slicedToArray(_zoomedViewport$getLo, 2),
          longitude = _zoomedViewport$getLo2[0],
          latitude = _zoomedViewport$getLo2[1];

      return this._getUpdatedMapState({
        zoom: zoom,
        longitude: longitude,
        latitude: latitude
      });
    }

    /**
     * End zooming
     * Must call if `zoomStart()` was called
     */

  }, {
    key: 'zoomEnd',
    value: function zoomEnd() {
      return this._getUpdatedMapState({
        startZoomLngLat: null,
        startZoom: null
      });
    }

    /* Private methods */

  }, {
    key: '_getUpdatedMapState',
    value: function _getUpdatedMapState(newProps) {
      // Update _viewportProps
      return new MapState(Object.assign({}, this._viewportProps, this._interactiveState, newProps));
    }

    // Apply any constraints (mathematical or defined by _viewportProps) to map state

  }, {
    key: '_applyConstraints',
    value: function _applyConstraints(props) {
      // Ensure zoom is within specified range
      var maxZoom = props.maxZoom,
          minZoom = props.minZoom,
          zoom = props.zoom;

      props.zoom = clamp(zoom, minZoom, maxZoom);

      // Ensure pitch is within specified range
      var maxPitch = props.maxPitch,
          minPitch = props.minPitch,
          pitch = props.pitch;

      props.pitch = clamp(pitch, minPitch, maxPitch);

      Object.assign(props, normalizeViewportProps(props));

      return props;
    }
  }, {
    key: '_unproject',
    value: function _unproject(pos) {
      var viewport = new WebMercatorViewport(this._viewportProps);
      return pos && viewport.unproject(pos);
    }

    // Calculate a new lnglat based on pixel dragging position

  }, {
    key: '_calculateNewLngLat',
    value: function _calculateNewLngLat(_ref8) {
      var startPanLngLat = _ref8.startPanLngLat,
          pos = _ref8.pos;

      var viewport = new WebMercatorViewport(this._viewportProps);
      return viewport.getMapCenterByLngLatPosition({ lngLat: startPanLngLat, pos: pos });
    }

    // Calculates new zoom

  }, {
    key: '_calculateNewZoom',
    value: function _calculateNewZoom(_ref9) {
      var scale = _ref9.scale,
          startZoom = _ref9.startZoom;
      var _viewportProps = this._viewportProps,
          maxZoom = _viewportProps.maxZoom,
          minZoom = _viewportProps.minZoom;

      var zoom = startZoom + Math.log2(scale);
      return clamp(zoom, minZoom, maxZoom);
    }

    // Calculates a new pitch and bearing from a position (coming from an event)

  }, {
    key: '_calculateNewPitchAndBearing',
    value: function _calculateNewPitchAndBearing(_ref10) {
      var deltaScaleX = _ref10.deltaScaleX,
          deltaScaleY = _ref10.deltaScaleY,
          startBearing = _ref10.startBearing,
          startPitch = _ref10.startPitch;

      // clamp deltaScaleY to [-1, 1] so that rotation is constrained between minPitch and maxPitch.
      // deltaScaleX does not need to be clamped as bearing does not have constraints.
      deltaScaleY = clamp(deltaScaleY, -1, 1);

      var _viewportProps2 = this._viewportProps,
          minPitch = _viewportProps2.minPitch,
          maxPitch = _viewportProps2.maxPitch;


      var bearing = startBearing + 180 * deltaScaleX;
      var pitch = startPitch;
      if (deltaScaleY > 0) {
        // Gradually increase pitch
        pitch = startPitch + deltaScaleY * (maxPitch - startPitch);
      } else if (deltaScaleY < 0) {
        // Gradually decrease pitch
        pitch = startPitch - deltaScaleY * (minPitch - startPitch);
      }

      return {
        pitch: pitch,
        bearing: bearing
      };
    }
  }]);

  return MapState;
}();

export default MapState;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9tYXAtc3RhdGUuanMiXSwibmFtZXMiOlsiV2ViTWVyY2F0b3JWaWV3cG9ydCIsIm5vcm1hbGl6ZVZpZXdwb3J0UHJvcHMiLCJhc3NlcnQiLCJNQVBCT1hfTElNSVRTIiwibWluWm9vbSIsIm1heFpvb20iLCJtaW5QaXRjaCIsIm1heFBpdGNoIiwiREVGQVVMVF9TVEFURSIsInBpdGNoIiwiYmVhcmluZyIsImFsdGl0dWRlIiwiY2xhbXAiLCJ2YWx1ZSIsIm1pbiIsIm1heCIsIk1hcFN0YXRlIiwid2lkdGgiLCJoZWlnaHQiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsInpvb20iLCJzdGFydFBhbkxuZ0xhdCIsInN0YXJ0Wm9vbUxuZ0xhdCIsInN0YXJ0QmVhcmluZyIsInN0YXJ0UGl0Y2giLCJzdGFydFpvb20iLCJOdW1iZXIiLCJpc0Zpbml0ZSIsIl92aWV3cG9ydFByb3BzIiwiX2FwcGx5Q29uc3RyYWludHMiLCJfaW50ZXJhY3RpdmVTdGF0ZSIsInBvcyIsIl9nZXRVcGRhdGVkTWFwU3RhdGUiLCJfdW5wcm9qZWN0Iiwic3RhcnRQb3MiLCJfY2FsY3VsYXRlTmV3TG5nTGF0IiwiZGVsdGFTY2FsZVgiLCJkZWx0YVNjYWxlWSIsIl9jYWxjdWxhdGVOZXdQaXRjaEFuZEJlYXJpbmciLCJzY2FsZSIsIl9jYWxjdWxhdGVOZXdab29tIiwiem9vbWVkVmlld3BvcnQiLCJPYmplY3QiLCJhc3NpZ24iLCJnZXRMb2NhdGlvbkF0UG9pbnQiLCJsbmdMYXQiLCJuZXdQcm9wcyIsInByb3BzIiwidmlld3BvcnQiLCJ1bnByb2plY3QiLCJnZXRNYXBDZW50ZXJCeUxuZ0xhdFBvc2l0aW9uIiwiTWF0aCIsImxvZzIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU9BLG1CQUFQLElBQTZCQyxzQkFBN0IsUUFBMEQsMkJBQTFEO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixRQUFuQjs7QUFFQTtBQUNBLE9BQU8sSUFBTUMsZ0JBQWdCO0FBQzNC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QSxVQUNwQkQsT0FEb0Isa0JBQ3BCQSxPQURvQjs7QUFFcEMsVUFBTWlCLE9BQU9LLFlBQVkwQixLQUFLQyxJQUFMLENBQVViLEtBQVYsQ0FBekI7QUFDQSxhQUFPNUIsTUFBTVMsSUFBTixFQUFZakIsT0FBWixFQUFxQkMsT0FBckIsQ0FBUDtBQUNEOztBQUVEOzs7O3lEQUNtRjtBQUFBLFVBQXJEZ0MsV0FBcUQsVUFBckRBLFdBQXFEO0FBQUEsVUFBeENDLFdBQXdDLFVBQXhDQSxXQUF3QztBQUFBLFVBQTNCZCxZQUEyQixVQUEzQkEsWUFBMkI7QUFBQSxVQUFiQyxVQUFhLFVBQWJBLFVBQWE7O0FBQ2pGO0FBQ0E7QUFDQWEsb0JBQWMxQixNQUFNMEIsV0FBTixFQUFtQixDQUFDLENBQXBCLEVBQXVCLENBQXZCLENBQWQ7O0FBSGlGLDRCQUtwRCxLQUFLVCxjQUwrQztBQUFBLFVBSzFFdkIsUUFMMEUsbUJBSzFFQSxRQUwwRTtBQUFBLFVBS2hFQyxRQUxnRSxtQkFLaEVBLFFBTGdFOzs7QUFPakYsVUFBTUcsVUFBVWMsZUFBZSxNQUFNYSxXQUFyQztBQUNBLFVBQUk1QixRQUFRZ0IsVUFBWjtBQUNBLFVBQUlhLGNBQWMsQ0FBbEIsRUFBcUI7QUFDbkI7QUFDQTdCLGdCQUFRZ0IsYUFBYWEsZUFBZS9CLFdBQVdrQixVQUExQixDQUFyQjtBQUNELE9BSEQsTUFHTyxJQUFJYSxjQUFjLENBQWxCLEVBQXFCO0FBQzFCO0FBQ0E3QixnQkFBUWdCLGFBQWFhLGVBQWVoQyxXQUFXbUIsVUFBMUIsQ0FBckI7QUFDRDs7QUFFRCxhQUFPO0FBQ0xoQixvQkFESztBQUVMQztBQUZLLE9BQVA7QUFJRDs7Ozs7O2VBN1NrQk0sUSIsImZpbGUiOiJtYXAtc3RhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV2ViTWVyY2F0b3JWaWV3cG9ydCwge25vcm1hbGl6ZVZpZXdwb3J0UHJvcHN9IGZyb20gJ3ZpZXdwb3J0LW1lcmNhdG9yLXByb2plY3QnO1xuaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuXG4vLyBNQVBCT1ggTElNSVRTXG5leHBvcnQgY29uc3QgTUFQQk9YX0xJTUlUUyA9IHtcbiAgbWluWm9vbTogMCxcbiAgbWF4Wm9vbTogMjAsXG4gIG1pblBpdGNoOiAwLFxuICBtYXhQaXRjaDogNjBcbn07XG5cbmNvbnN0IERFRkFVTFRfU1RBVEUgPSB7XG4gIHBpdGNoOiAwLFxuICBiZWFyaW5nOiAwLFxuICBhbHRpdHVkZTogMS41XG59O1xuXG4vKiBVdGlscyAqL1xuZnVuY3Rpb24gY2xhbXAodmFsdWUsIG1pbiwgbWF4KSB7XG4gIHJldHVybiB2YWx1ZSA8IG1pbiA/IG1pbiA6ICh2YWx1ZSA+IG1heCA/IG1heCA6IHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwU3RhdGUge1xuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICAvKiogTWFwYm94IHZpZXdwb3J0IHByb3BlcnRpZXMgKi9cbiAgICAvKiogVGhlIHdpZHRoIG9mIHRoZSB2aWV3cG9ydCAqL1xuICAgIHdpZHRoLFxuICAgIC8qKiBUaGUgaGVpZ2h0IG9mIHRoZSB2aWV3cG9ydCAqL1xuICAgIGhlaWdodCxcbiAgICAvKiogVGhlIGxhdGl0dWRlIGF0IHRoZSBjZW50ZXIgb2YgdGhlIHZpZXdwb3J0ICovXG4gICAgbGF0aXR1ZGUsXG4gICAgLyoqIFRoZSBsb25naXR1ZGUgYXQgdGhlIGNlbnRlciBvZiB0aGUgdmlld3BvcnQgKi9cbiAgICBsb25naXR1ZGUsXG4gICAgLyoqIFRoZSB0aWxlIHpvb20gbGV2ZWwgb2YgdGhlIG1hcC4gKi9cbiAgICB6b29tLFxuICAgIC8qKiBUaGUgYmVhcmluZyBvZiB0aGUgdmlld3BvcnQgaW4gZGVncmVlcyAqL1xuICAgIGJlYXJpbmcgPSBERUZBVUxUX1NUQVRFLmJlYXJpbmcsXG4gICAgLyoqIFRoZSBwaXRjaCBvZiB0aGUgdmlld3BvcnQgaW4gZGVncmVlcyAqL1xuICAgIHBpdGNoID0gREVGQVVMVF9TVEFURS5waXRjaCxcbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHRoZSBhbHRpdHVkZSBvZiB0aGUgdmlld3BvcnQgY2FtZXJhXG4gICAgICogVW5pdDogbWFwIGhlaWdodHMsIGRlZmF1bHQgMS41XG4gICAgICogTm9uLXB1YmxpYyBBUEksIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbWFwYm94L21hcGJveC1nbC1qcy9pc3N1ZXMvMTEzN1xuICAgICAqL1xuICAgIGFsdGl0dWRlID0gREVGQVVMVF9TVEFURS5hbHRpdHVkZSxcblxuICAgIC8qKiBWaWV3cG9ydCBjb25zdHJhaW50cyAqL1xuICAgIG1heFpvb20gPSBNQVBCT1hfTElNSVRTLm1heFpvb20sXG4gICAgbWluWm9vbSA9IE1BUEJPWF9MSU1JVFMubWluWm9vbSxcbiAgICBtYXhQaXRjaCA9IE1BUEJPWF9MSU1JVFMubWF4UGl0Y2gsXG4gICAgbWluUGl0Y2ggPSBNQVBCT1hfTElNSVRTLm1pblBpdGNoLFxuXG4gICAgLyoqIEludGVyYWN0aW9uIHN0YXRlcywgcmVxdWlyZWQgdG8gY2FsY3VsYXRlIGNoYW5nZSBkdXJpbmcgdHJhbnNmb3JtICovXG4gICAgLyogVGhlIHBvaW50IG9uIG1hcCBiZWluZyBncmFiYmVkIHdoZW4gdGhlIG9wZXJhdGlvbiBmaXJzdCBzdGFydGVkICovXG4gICAgc3RhcnRQYW5MbmdMYXQsXG4gICAgLyogQ2VudGVyIG9mIHRoZSB6b29tIHdoZW4gdGhlIG9wZXJhdGlvbiBmaXJzdCBzdGFydGVkICovXG4gICAgc3RhcnRab29tTG5nTGF0LFxuICAgIC8qKiBCZWFyaW5nIHdoZW4gY3VycmVudCBwZXJzcGVjdGl2ZSByb3RhdGUgb3BlcmF0aW9uIHN0YXJ0ZWQgKi9cbiAgICBzdGFydEJlYXJpbmcsXG4gICAgLyoqIFBpdGNoIHdoZW4gY3VycmVudCBwZXJzcGVjdGl2ZSByb3RhdGUgb3BlcmF0aW9uIHN0YXJ0ZWQgKi9cbiAgICBzdGFydFBpdGNoLFxuICAgIC8qKiBab29tIHdoZW4gY3VycmVudCB6b29tIG9wZXJhdGlvbiBzdGFydGVkICovXG4gICAgc3RhcnRab29tXG4gIH0gPSB7fSkge1xuICAgIGFzc2VydChOdW1iZXIuaXNGaW5pdGUod2lkdGgpLCAnYHdpZHRoYCBtdXN0IGJlIHN1cHBsaWVkJyk7XG4gICAgYXNzZXJ0KE51bWJlci5pc0Zpbml0ZShoZWlnaHQpLCAnYGhlaWdodGAgbXVzdCBiZSBzdXBwbGllZCcpO1xuICAgIGFzc2VydChOdW1iZXIuaXNGaW5pdGUobG9uZ2l0dWRlKSwgJ2Bsb25naXR1ZGVgIG11c3QgYmUgc3VwcGxpZWQnKTtcbiAgICBhc3NlcnQoTnVtYmVyLmlzRmluaXRlKGxhdGl0dWRlKSwgJ2BsYXRpdHVkZWAgbXVzdCBiZSBzdXBwbGllZCcpO1xuICAgIGFzc2VydChOdW1iZXIuaXNGaW5pdGUoem9vbSksICdgem9vbWAgbXVzdCBiZSBzdXBwbGllZCcpO1xuXG4gICAgdGhpcy5fdmlld3BvcnRQcm9wcyA9IHRoaXMuX2FwcGx5Q29uc3RyYWludHMoe1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICBsYXRpdHVkZSxcbiAgICAgIGxvbmdpdHVkZSxcbiAgICAgIHpvb20sXG4gICAgICBiZWFyaW5nLFxuICAgICAgcGl0Y2gsXG4gICAgICBhbHRpdHVkZSxcbiAgICAgIG1heFpvb20sXG4gICAgICBtaW5ab29tLFxuICAgICAgbWF4UGl0Y2gsXG4gICAgICBtaW5QaXRjaFxuICAgIH0pO1xuXG4gICAgdGhpcy5faW50ZXJhY3RpdmVTdGF0ZSA9IHtcbiAgICAgIHN0YXJ0UGFuTG5nTGF0LFxuICAgICAgc3RhcnRab29tTG5nTGF0LFxuICAgICAgc3RhcnRCZWFyaW5nLFxuICAgICAgc3RhcnRQaXRjaCxcbiAgICAgIHN0YXJ0Wm9vbVxuICAgIH07XG4gIH1cblxuICAvKiBQdWJsaWMgQVBJICovXG5cbiAgZ2V0Vmlld3BvcnRQcm9wcygpIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld3BvcnRQcm9wcztcbiAgfVxuXG4gIGdldEludGVyYWN0aXZlU3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludGVyYWN0aXZlU3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnQgcGFubmluZ1xuICAgKiBAcGFyYW0ge1tOdW1iZXIsIE51bWJlcl19IHBvcyAtIHBvc2l0aW9uIG9uIHNjcmVlbiB3aGVyZSB0aGUgcG9pbnRlciBncmFic1xuICAgKi9cbiAgcGFuU3RhcnQoe3Bvc30pIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0VXBkYXRlZE1hcFN0YXRlKHtcbiAgICAgIHN0YXJ0UGFuTG5nTGF0OiB0aGlzLl91bnByb2plY3QocG9zKVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhblxuICAgKiBAcGFyYW0ge1tOdW1iZXIsIE51bWJlcl19IHBvcyAtIHBvc2l0aW9uIG9uIHNjcmVlbiB3aGVyZSB0aGUgcG9pbnRlciBpc1xuICAgKiBAcGFyYW0ge1tOdW1iZXIsIE51bWJlcl0sIG9wdGlvbmFsfSBzdGFydFBvcyAtIHdoZXJlIHRoZSBwb2ludGVyIGdyYWJiZWQgYXRcbiAgICogICB0aGUgc3RhcnQgb2YgdGhlIG9wZXJhdGlvbi4gTXVzdCBiZSBzdXBwbGllZCBvZiBgcGFuU3RhcnQoKWAgd2FzIG5vdCBjYWxsZWRcbiAgICovXG4gIHBhbih7cG9zLCBzdGFydFBvc30pIHtcbiAgICBjb25zdCBzdGFydFBhbkxuZ0xhdCA9IHRoaXMuX2ludGVyYWN0aXZlU3RhdGUuc3RhcnRQYW5MbmdMYXQgfHwgdGhpcy5fdW5wcm9qZWN0KHN0YXJ0UG9zKTtcblxuICAgIGlmICghc3RhcnRQYW5MbmdMYXQpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNvbnN0IFtsb25naXR1ZGUsIGxhdGl0dWRlXSA9IHRoaXMuX2NhbGN1bGF0ZU5ld0xuZ0xhdCh7c3RhcnRQYW5MbmdMYXQsIHBvc30pO1xuXG4gICAgcmV0dXJuIHRoaXMuX2dldFVwZGF0ZWRNYXBTdGF0ZSh7XG4gICAgICBsb25naXR1ZGUsXG4gICAgICBsYXRpdHVkZVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuZCBwYW5uaW5nXG4gICAqIE11c3QgY2FsbCBpZiBgcGFuU3RhcnQoKWAgd2FzIGNhbGxlZFxuICAgKi9cbiAgcGFuRW5kKCkge1xuICAgIHJldHVybiB0aGlzLl9nZXRVcGRhdGVkTWFwU3RhdGUoe1xuICAgICAgc3RhcnRQYW5MbmdMYXQ6IG51bGxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydCByb3RhdGluZ1xuICAgKiBAcGFyYW0ge1tOdW1iZXIsIE51bWJlcl19IHBvcyAtIHBvc2l0aW9uIG9uIHNjcmVlbiB3aGVyZSB0aGUgY2VudGVyIGlzXG4gICAqL1xuICByb3RhdGVTdGFydCh7cG9zfSkge1xuICAgIHJldHVybiB0aGlzLl9nZXRVcGRhdGVkTWFwU3RhdGUoe1xuICAgICAgc3RhcnRCZWFyaW5nOiB0aGlzLl92aWV3cG9ydFByb3BzLmJlYXJpbmcsXG4gICAgICBzdGFydFBpdGNoOiB0aGlzLl92aWV3cG9ydFByb3BzLnBpdGNoXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUm90YXRlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YVNjYWxlWCAtIGEgbnVtYmVyIGJldHdlZW4gWy0xLCAxXSBzcGVjaWZ5aW5nIHRoZVxuICAgKiAgIGNoYW5nZSB0byBiZWFyaW5nLlxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVsdGFTY2FsZVkgLSBhIG51bWJlciBiZXR3ZWVuIFstMSwgMV0gc3BlY2lmeWluZyB0aGVcbiAgICogICBjaGFuZ2UgdG8gcGl0Y2guIC0xIHNldHMgdG8gbWluUGl0Y2ggYW5kIDEgc2V0cyB0byBtYXhQaXRjaC5cbiAgICovXG4gIHJvdGF0ZSh7ZGVsdGFTY2FsZVggPSAwLCBkZWx0YVNjYWxlWSA9IDB9KSB7XG5cbiAgICBjb25zdCB7c3RhcnRCZWFyaW5nLCBzdGFydFBpdGNofSA9IHRoaXMuX2ludGVyYWN0aXZlU3RhdGU7XG5cbiAgICBpZiAoIU51bWJlci5pc0Zpbml0ZShzdGFydEJlYXJpbmcpIHx8ICFOdW1iZXIuaXNGaW5pdGUoc3RhcnRQaXRjaCkpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNvbnN0IHtwaXRjaCwgYmVhcmluZ30gPSB0aGlzLl9jYWxjdWxhdGVOZXdQaXRjaEFuZEJlYXJpbmcoe1xuICAgICAgZGVsdGFTY2FsZVgsXG4gICAgICBkZWx0YVNjYWxlWSxcbiAgICAgIHN0YXJ0QmVhcmluZyxcbiAgICAgIHN0YXJ0UGl0Y2hcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLl9nZXRVcGRhdGVkTWFwU3RhdGUoe1xuICAgICAgYmVhcmluZyxcbiAgICAgIHBpdGNoXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRW5kIHJvdGF0aW5nXG4gICAqIE11c3QgY2FsbCBpZiBgcm90YXRlU3RhcnQoKWAgd2FzIGNhbGxlZFxuICAgKi9cbiAgcm90YXRlRW5kKCkge1xuICAgIHJldHVybiB0aGlzLl9nZXRVcGRhdGVkTWFwU3RhdGUoe1xuICAgICAgc3RhcnRCZWFyaW5nOiBudWxsLFxuICAgICAgc3RhcnRQaXRjaDogbnVsbFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0IHpvb21pbmdcbiAgICogQHBhcmFtIHtbTnVtYmVyLCBOdW1iZXJdfSBwb3MgLSBwb3NpdGlvbiBvbiBzY3JlZW4gd2hlcmUgdGhlIGNlbnRlciBpc1xuICAgKi9cbiAgem9vbVN0YXJ0KHtwb3N9KSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldFVwZGF0ZWRNYXBTdGF0ZSh7XG4gICAgICBzdGFydFpvb21MbmdMYXQ6IHRoaXMuX3VucHJvamVjdChwb3MpLFxuICAgICAgc3RhcnRab29tOiB0aGlzLl92aWV3cG9ydFByb3BzLnpvb21cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBab29tXG4gICAqIEBwYXJhbSB7W051bWJlciwgTnVtYmVyXX0gcG9zIC0gcG9zaXRpb24gb24gc2NyZWVuIHdoZXJlIHRoZSBjdXJyZW50IGNlbnRlciBpc1xuICAgKiBAcGFyYW0ge1tOdW1iZXIsIE51bWJlcl19IHN0YXJ0UG9zIC0gdGhlIGNlbnRlciBwb3NpdGlvbiBhdFxuICAgKiAgIHRoZSBzdGFydCBvZiB0aGUgb3BlcmF0aW9uLiBNdXN0IGJlIHN1cHBsaWVkIG9mIGB6b29tU3RhcnQoKWAgd2FzIG5vdCBjYWxsZWRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIC0gYSBudW1iZXIgYmV0d2VlbiBbMCwgMV0gc3BlY2lmeWluZyB0aGUgYWNjdW11bGF0ZWRcbiAgICogICByZWxhdGl2ZSBzY2FsZS5cbiAgICovXG4gIHpvb20oe3Bvcywgc3RhcnRQb3MsIHNjYWxlfSkge1xuICAgIGFzc2VydChzY2FsZSA+IDAsICdgc2NhbGVgIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcblxuICAgIC8vIE1ha2Ugc3VyZSB3ZSB6b29tIGFyb3VuZCB0aGUgY3VycmVudCBtb3VzZSBwb3NpdGlvbiByYXRoZXIgdGhhbiBtYXAgY2VudGVyXG4gICAgbGV0IHtzdGFydFpvb20sIHN0YXJ0Wm9vbUxuZ0xhdH0gPSB0aGlzLl9pbnRlcmFjdGl2ZVN0YXRlO1xuXG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUoc3RhcnRab29tKSkge1xuICAgICAgLy8gV2UgaGF2ZSB0d28gbW9kZXMgb2Ygem9vbTpcbiAgICAgIC8vIHNjcm9sbCB6b29tIHRoYXQgYXJlIGRpc2NyZXRlIGV2ZW50cyAodHJhbnNmb3JtIGZyb20gdGhlIGN1cnJlbnQgem9vbSBsZXZlbCksXG4gICAgICAvLyBhbmQgcGluY2ggem9vbSB0aGF0IGFyZSBjb250aW51b3VzIGV2ZW50cyAodHJhbnNmb3JtIGZyb20gdGhlIHpvb20gbGV2ZWwgd2hlblxuICAgICAgLy8gcGluY2ggc3RhcnRlZCkuXG4gICAgICAvLyBJZiBzdGFydFpvb20gc3RhdGUgaXMgZGVmaW5lZCwgdGhlbiB1c2UgdGhlIHN0YXJ0Wm9vbSBzdGF0ZTtcbiAgICAgIC8vIG90aGVyd2lzZSBhc3N1bWUgZGlzY3JldGUgem9vbWluZ1xuICAgICAgc3RhcnRab29tID0gdGhpcy5fdmlld3BvcnRQcm9wcy56b29tO1xuICAgICAgc3RhcnRab29tTG5nTGF0ID0gdGhpcy5fdW5wcm9qZWN0KHN0YXJ0UG9zKSB8fCB0aGlzLl91bnByb2plY3QocG9zKTtcbiAgICB9XG5cbiAgICAvLyB0YWtlIHRoZSBzdGFydCBsbmdsYXQgYW5kIHB1dCBpdCB3aGVyZSB0aGUgbW91c2UgaXMgZG93bi5cbiAgICBhc3NlcnQoc3RhcnRab29tTG5nTGF0LCAnYHN0YXJ0Wm9vbUxuZ0xhdGAgcHJvcCBpcyByZXF1aXJlZCAnICtcbiAgICAgICdmb3Igem9vbSBiZWhhdmlvciB0byBjYWxjdWxhdGUgd2hlcmUgdG8gcG9zaXRpb24gdGhlIG1hcC4nKTtcblxuICAgIGNvbnN0IHpvb20gPSB0aGlzLl9jYWxjdWxhdGVOZXdab29tKHtzY2FsZSwgc3RhcnRab29tfSk7XG5cbiAgICBjb25zdCB6b29tZWRWaWV3cG9ydCA9IG5ldyBXZWJNZXJjYXRvclZpZXdwb3J0KFxuICAgICAgT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fdmlld3BvcnRQcm9wcywge3pvb219KVxuICAgICk7XG4gICAgY29uc3QgW2xvbmdpdHVkZSwgbGF0aXR1ZGVdID0gem9vbWVkVmlld3BvcnQuZ2V0TG9jYXRpb25BdFBvaW50KHtsbmdMYXQ6IHN0YXJ0Wm9vbUxuZ0xhdCwgcG9zfSk7XG5cbiAgICByZXR1cm4gdGhpcy5fZ2V0VXBkYXRlZE1hcFN0YXRlKHtcbiAgICAgIHpvb20sXG4gICAgICBsb25naXR1ZGUsXG4gICAgICBsYXRpdHVkZVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuZCB6b29taW5nXG4gICAqIE11c3QgY2FsbCBpZiBgem9vbVN0YXJ0KClgIHdhcyBjYWxsZWRcbiAgICovXG4gIHpvb21FbmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldFVwZGF0ZWRNYXBTdGF0ZSh7XG4gICAgICBzdGFydFpvb21MbmdMYXQ6IG51bGwsXG4gICAgICBzdGFydFpvb206IG51bGxcbiAgICB9KTtcbiAgfVxuXG4gIC8qIFByaXZhdGUgbWV0aG9kcyAqL1xuXG4gIF9nZXRVcGRhdGVkTWFwU3RhdGUobmV3UHJvcHMpIHtcbiAgICAvLyBVcGRhdGUgX3ZpZXdwb3J0UHJvcHNcbiAgICByZXR1cm4gbmV3IE1hcFN0YXRlKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3ZpZXdwb3J0UHJvcHMsIHRoaXMuX2ludGVyYWN0aXZlU3RhdGUsIG5ld1Byb3BzKSk7XG4gIH1cblxuICAvLyBBcHBseSBhbnkgY29uc3RyYWludHMgKG1hdGhlbWF0aWNhbCBvciBkZWZpbmVkIGJ5IF92aWV3cG9ydFByb3BzKSB0byBtYXAgc3RhdGVcbiAgX2FwcGx5Q29uc3RyYWludHMocHJvcHMpIHtcbiAgICAvLyBFbnN1cmUgem9vbSBpcyB3aXRoaW4gc3BlY2lmaWVkIHJhbmdlXG4gICAgY29uc3Qge21heFpvb20sIG1pblpvb20sIHpvb219ID0gcHJvcHM7XG4gICAgcHJvcHMuem9vbSA9IGNsYW1wKHpvb20sIG1pblpvb20sIG1heFpvb20pO1xuXG4gICAgLy8gRW5zdXJlIHBpdGNoIGlzIHdpdGhpbiBzcGVjaWZpZWQgcmFuZ2VcbiAgICBjb25zdCB7bWF4UGl0Y2gsIG1pblBpdGNoLCBwaXRjaH0gPSBwcm9wcztcbiAgICBwcm9wcy5waXRjaCA9IGNsYW1wKHBpdGNoLCBtaW5QaXRjaCwgbWF4UGl0Y2gpO1xuXG4gICAgT2JqZWN0LmFzc2lnbihwcm9wcywgbm9ybWFsaXplVmlld3BvcnRQcm9wcyhwcm9wcykpO1xuXG4gICAgcmV0dXJuIHByb3BzO1xuICB9XG5cbiAgX3VucHJvamVjdChwb3MpIHtcbiAgICBjb25zdCB2aWV3cG9ydCA9IG5ldyBXZWJNZXJjYXRvclZpZXdwb3J0KHRoaXMuX3ZpZXdwb3J0UHJvcHMpO1xuICAgIHJldHVybiBwb3MgJiYgdmlld3BvcnQudW5wcm9qZWN0KHBvcyk7XG4gIH1cblxuICAvLyBDYWxjdWxhdGUgYSBuZXcgbG5nbGF0IGJhc2VkIG9uIHBpeGVsIGRyYWdnaW5nIHBvc2l0aW9uXG4gIF9jYWxjdWxhdGVOZXdMbmdMYXQoe3N0YXJ0UGFuTG5nTGF0LCBwb3N9KSB7XG4gICAgY29uc3Qgdmlld3BvcnQgPSBuZXcgV2ViTWVyY2F0b3JWaWV3cG9ydCh0aGlzLl92aWV3cG9ydFByb3BzKTtcbiAgICByZXR1cm4gdmlld3BvcnQuZ2V0TWFwQ2VudGVyQnlMbmdMYXRQb3NpdGlvbih7bG5nTGF0OiBzdGFydFBhbkxuZ0xhdCwgcG9zfSk7XG4gIH1cblxuICAvLyBDYWxjdWxhdGVzIG5ldyB6b29tXG4gIF9jYWxjdWxhdGVOZXdab29tKHtzY2FsZSwgc3RhcnRab29tfSkge1xuICAgIGNvbnN0IHttYXhab29tLCBtaW5ab29tfSA9IHRoaXMuX3ZpZXdwb3J0UHJvcHM7XG4gICAgY29uc3Qgem9vbSA9IHN0YXJ0Wm9vbSArIE1hdGgubG9nMihzY2FsZSk7XG4gICAgcmV0dXJuIGNsYW1wKHpvb20sIG1pblpvb20sIG1heFpvb20pO1xuICB9XG5cbiAgLy8gQ2FsY3VsYXRlcyBhIG5ldyBwaXRjaCBhbmQgYmVhcmluZyBmcm9tIGEgcG9zaXRpb24gKGNvbWluZyBmcm9tIGFuIGV2ZW50KVxuICBfY2FsY3VsYXRlTmV3UGl0Y2hBbmRCZWFyaW5nKHtkZWx0YVNjYWxlWCwgZGVsdGFTY2FsZVksIHN0YXJ0QmVhcmluZywgc3RhcnRQaXRjaH0pIHtcbiAgICAvLyBjbGFtcCBkZWx0YVNjYWxlWSB0byBbLTEsIDFdIHNvIHRoYXQgcm90YXRpb24gaXMgY29uc3RyYWluZWQgYmV0d2VlbiBtaW5QaXRjaCBhbmQgbWF4UGl0Y2guXG4gICAgLy8gZGVsdGFTY2FsZVggZG9lcyBub3QgbmVlZCB0byBiZSBjbGFtcGVkIGFzIGJlYXJpbmcgZG9lcyBub3QgaGF2ZSBjb25zdHJhaW50cy5cbiAgICBkZWx0YVNjYWxlWSA9IGNsYW1wKGRlbHRhU2NhbGVZLCAtMSwgMSk7XG5cbiAgICBjb25zdCB7bWluUGl0Y2gsIG1heFBpdGNofSA9IHRoaXMuX3ZpZXdwb3J0UHJvcHM7XG5cbiAgICBjb25zdCBiZWFyaW5nID0gc3RhcnRCZWFyaW5nICsgMTgwICogZGVsdGFTY2FsZVg7XG4gICAgbGV0IHBpdGNoID0gc3RhcnRQaXRjaDtcbiAgICBpZiAoZGVsdGFTY2FsZVkgPiAwKSB7XG4gICAgICAvLyBHcmFkdWFsbHkgaW5jcmVhc2UgcGl0Y2hcbiAgICAgIHBpdGNoID0gc3RhcnRQaXRjaCArIGRlbHRhU2NhbGVZICogKG1heFBpdGNoIC0gc3RhcnRQaXRjaCk7XG4gICAgfSBlbHNlIGlmIChkZWx0YVNjYWxlWSA8IDApIHtcbiAgICAgIC8vIEdyYWR1YWxseSBkZWNyZWFzZSBwaXRjaFxuICAgICAgcGl0Y2ggPSBzdGFydFBpdGNoIC0gZGVsdGFTY2FsZVkgKiAobWluUGl0Y2ggLSBzdGFydFBpdGNoKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcGl0Y2gsXG4gICAgICBiZWFyaW5nXG4gICAgfTtcbiAgfVxuXG59XG4iXX0=