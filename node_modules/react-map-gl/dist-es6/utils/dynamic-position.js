
export var ANCHOR_POSITION = {
  top: { x: 0.5, y: 0 },
  'top-left': { x: 0, y: 0 },
  'top-right': { x: 1, y: 0 },
  bottom: { x: 0.5, y: 1 },
  'bottom-left': { x: 0, y: 1 },
  'bottom-right': { x: 1, y: 1 },
  left: { x: 0, y: 0.5 },
  right: { x: 1, y: 0.5 }
};

/**
 * Calculate the dynamic position for a popup to fit in a container.
 * @param {Number} x - x position of the anchor on screen
 * @param {Number} y - y position of the anchor on screen
 * @param {Number} width - width of the container
 * @param {Number} height - height of the container
 * @param {Number} padding - extra space from the edge in pixels
 * @param {Number} selfWidth - width of the popup
 * @param {Number} selfHeight - height of the popup
 * @param {String} anchor - type of the anchor, one of 'top', 'bottom',
    'left', 'right', 'top-left', 'top-right', 'bottom-left' , and  'bottom-right'
 * @returns {String} position - one of 'top', 'bottom',
    'left', 'right', 'top-left', 'top-right', 'bottom-left' , and  'bottom-right'
 */
export function getDynamicPosition(_ref) {
  var x = _ref.x,
      y = _ref.y,
      width = _ref.width,
      height = _ref.height,
      selfWidth = _ref.selfWidth,
      selfHeight = _ref.selfHeight,
      anchor = _ref.anchor,
      _ref$padding = _ref.padding,
      padding = _ref$padding === undefined ? 0 : _ref$padding;
  var _ANCHOR_POSITION$anch = ANCHOR_POSITION[anchor],
      anchorX = _ANCHOR_POSITION$anch.x,
      anchorY = _ANCHOR_POSITION$anch.y;

  // anchorY: top - 0, center - 0.5, bottom - 1

  var top = y - anchorY * selfHeight;
  var bottom = top + selfHeight;
  // If needed, adjust anchorY at 0.5 step between [0, 1]
  var yStep = 0.5;

  if (top < padding) {
    // Top edge is outside, try move down
    while (top < padding && anchorY >= yStep) {
      anchorY -= yStep;
      top += yStep * selfHeight;
    }
  } else if (bottom > height - padding) {
    // bottom edge is outside, try move up
    while (bottom > height - padding && anchorY <= 1 - yStep) {
      anchorY += yStep;
      bottom -= yStep * selfHeight;
    }
  }

  // anchorX: left - 0, center - 0.5, right - 1
  var left = x - anchorX * selfWidth;
  var right = left + selfWidth;

  // If needed, adjust anchorX at 0.5 step between [0, 1]
  var xStep = 0.5;
  if (anchorY === 0.5) {
    // If y is centered, then x cannot also be centered
    anchorX = Math.floor(anchorX);
    xStep = 1;
  }

  if (left < padding) {
    // Left edge is outside, try move right
    while (left < padding && anchorX >= xStep) {
      anchorX -= xStep;
      left += xStep * selfWidth;
    }
  } else if (right > width - padding) {
    // Right edge is outside, try move left
    while (right > width - padding && anchorX <= 1 - xStep) {
      anchorX += xStep;
      right -= xStep * selfWidth;
    }
  }

  // Find the name of the new anchor position
  return Object.keys(ANCHOR_POSITION).find(function (positionType) {
    var anchorPosition = ANCHOR_POSITION[positionType];
    return anchorPosition.x === anchorX && anchorPosition.y === anchorY;
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9keW5hbWljLXBvc2l0aW9uLmpzIl0sIm5hbWVzIjpbIkFOQ0hPUl9QT1NJVElPTiIsInRvcCIsIngiLCJ5IiwiYm90dG9tIiwibGVmdCIsInJpZ2h0IiwiZ2V0RHluYW1pY1Bvc2l0aW9uIiwid2lkdGgiLCJoZWlnaHQiLCJzZWxmV2lkdGgiLCJzZWxmSGVpZ2h0IiwiYW5jaG9yIiwicGFkZGluZyIsImFuY2hvclgiLCJhbmNob3JZIiwieVN0ZXAiLCJ4U3RlcCIsIk1hdGgiLCJmbG9vciIsIk9iamVjdCIsImtleXMiLCJmaW5kIiwicG9zaXRpb25UeXBlIiwiYW5jaG9yUG9zaXRpb24iXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLElBQU1BLGtCQUFrQjtBQUM3QkMsT0FBSyxFQUFDQyxHQUFHLEdBQUosRUFBU0MsR0FBRyxDQUFaLEVBRHdCO0FBRTdCLGNBQVksRUFBQ0QsR0FBRyxDQUFKLEVBQU9DLEdBQUcsQ0FBVixFQUZpQjtBQUc3QixlQUFhLEVBQUNELEdBQUcsQ0FBSixFQUFPQyxHQUFHLENBQVYsRUFIZ0I7QUFJN0JDLFVBQVEsRUFBQ0YsR0FBRyxHQUFKLEVBQVNDLEdBQUcsQ0FBWixFQUpxQjtBQUs3QixpQkFBZSxFQUFDRCxHQUFHLENBQUosRUFBT0MsR0FBRyxDQUFWLEVBTGM7QUFNN0Isa0JBQWdCLEVBQUNELEdBQUcsQ0FBSixFQUFPQyxHQUFHLENBQVYsRUFOYTtBQU83QkUsUUFBTSxFQUFDSCxHQUFHLENBQUosRUFBT0MsR0FBRyxHQUFWLEVBUHVCO0FBUTdCRyxTQUFPLEVBQUNKLEdBQUcsQ0FBSixFQUFPQyxHQUFHLEdBQVY7QUFSc0IsQ0FBeEI7O0FBV1A7Ozs7Ozs7Ozs7Ozs7O0FBY0EsT0FBTyxTQUFTSSxrQkFBVCxPQU1KO0FBQUEsTUFMREwsQ0FLQyxRQUxEQSxDQUtDO0FBQUEsTUFMRUMsQ0FLRixRQUxFQSxDQUtGO0FBQUEsTUFKREssS0FJQyxRQUpEQSxLQUlDO0FBQUEsTUFKTUMsTUFJTixRQUpNQSxNQUlOO0FBQUEsTUFIREMsU0FHQyxRQUhEQSxTQUdDO0FBQUEsTUFIVUMsVUFHVixRQUhVQSxVQUdWO0FBQUEsTUFGREMsTUFFQyxRQUZEQSxNQUVDO0FBQUEsMEJBRERDLE9BQ0M7QUFBQSxNQUREQSxPQUNDLGdDQURTLENBQ1Q7QUFBQSw4QkFDOEJiLGdCQUFnQlksTUFBaEIsQ0FEOUI7QUFBQSxNQUNPRSxPQURQLHlCQUNJWixDQURKO0FBQUEsTUFDbUJhLE9BRG5CLHlCQUNnQlosQ0FEaEI7O0FBR0Q7O0FBQ0EsTUFBSUYsTUFBTUUsSUFBSVksVUFBVUosVUFBeEI7QUFDQSxNQUFJUCxTQUFTSCxNQUFNVSxVQUFuQjtBQUNBO0FBQ0EsTUFBTUssUUFBUSxHQUFkOztBQUVBLE1BQUlmLE1BQU1ZLE9BQVYsRUFBbUI7QUFDakI7QUFDQSxXQUFPWixNQUFNWSxPQUFOLElBQWlCRSxXQUFXQyxLQUFuQyxFQUEwQztBQUN4Q0QsaUJBQVdDLEtBQVg7QUFDQWYsYUFBT2UsUUFBUUwsVUFBZjtBQUNEO0FBQ0YsR0FORCxNQU1PLElBQUlQLFNBQVNLLFNBQVNJLE9BQXRCLEVBQStCO0FBQ3BDO0FBQ0EsV0FBT1QsU0FBU0ssU0FBU0ksT0FBbEIsSUFBNkJFLFdBQVcsSUFBSUMsS0FBbkQsRUFBMEQ7QUFDeERELGlCQUFXQyxLQUFYO0FBQ0FaLGdCQUFVWSxRQUFRTCxVQUFsQjtBQUNEO0FBQ0Y7O0FBRUQ7QUFDQSxNQUFJTixPQUFPSCxJQUFJWSxVQUFVSixTQUF6QjtBQUNBLE1BQUlKLFFBQVFELE9BQU9LLFNBQW5COztBQUVBO0FBQ0EsTUFBSU8sUUFBUSxHQUFaO0FBQ0EsTUFBSUYsWUFBWSxHQUFoQixFQUFxQjtBQUNuQjtBQUNBRCxjQUFVSSxLQUFLQyxLQUFMLENBQVdMLE9BQVgsQ0FBVjtBQUNBRyxZQUFRLENBQVI7QUFDRDs7QUFFRCxNQUFJWixPQUFPUSxPQUFYLEVBQW9CO0FBQ2xCO0FBQ0EsV0FBT1IsT0FBT1EsT0FBUCxJQUFrQkMsV0FBV0csS0FBcEMsRUFBMkM7QUFDekNILGlCQUFXRyxLQUFYO0FBQ0FaLGNBQVFZLFFBQVFQLFNBQWhCO0FBQ0Q7QUFDRixHQU5ELE1BTU8sSUFBSUosUUFBUUUsUUFBUUssT0FBcEIsRUFBNkI7QUFDbEM7QUFDQSxXQUFPUCxRQUFRRSxRQUFRSyxPQUFoQixJQUEyQkMsV0FBVyxJQUFJRyxLQUFqRCxFQUF3RDtBQUN0REgsaUJBQVdHLEtBQVg7QUFDQVgsZUFBU1csUUFBUVAsU0FBakI7QUFDRDtBQUNGOztBQUVEO0FBQ0EsU0FBT1UsT0FBT0MsSUFBUCxDQUFZckIsZUFBWixFQUE2QnNCLElBQTdCLENBQWtDLFVBQUNDLFlBQUQsRUFBa0I7QUFDekQsUUFBTUMsaUJBQWlCeEIsZ0JBQWdCdUIsWUFBaEIsQ0FBdkI7QUFDQSxXQUFPQyxlQUFldEIsQ0FBZixLQUFxQlksT0FBckIsSUFBZ0NVLGVBQWVyQixDQUFmLEtBQXFCWSxPQUE1RDtBQUNELEdBSE0sQ0FBUDtBQUlEIiwiZmlsZSI6ImR5bmFtaWMtcG9zaXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBjb25zdCBBTkNIT1JfUE9TSVRJT04gPSB7XG4gIHRvcDoge3g6IDAuNSwgeTogMH0sXG4gICd0b3AtbGVmdCc6IHt4OiAwLCB5OiAwfSxcbiAgJ3RvcC1yaWdodCc6IHt4OiAxLCB5OiAwfSxcbiAgYm90dG9tOiB7eDogMC41LCB5OiAxfSxcbiAgJ2JvdHRvbS1sZWZ0Jzoge3g6IDAsIHk6IDF9LFxuICAnYm90dG9tLXJpZ2h0Jzoge3g6IDEsIHk6IDF9LFxuICBsZWZ0OiB7eDogMCwgeTogMC41fSxcbiAgcmlnaHQ6IHt4OiAxLCB5OiAwLjV9XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZSB0aGUgZHluYW1pYyBwb3NpdGlvbiBmb3IgYSBwb3B1cCB0byBmaXQgaW4gYSBjb250YWluZXIuXG4gKiBAcGFyYW0ge051bWJlcn0geCAtIHggcG9zaXRpb24gb2YgdGhlIGFuY2hvciBvbiBzY3JlZW5cbiAqIEBwYXJhbSB7TnVtYmVyfSB5IC0geSBwb3NpdGlvbiBvZiB0aGUgYW5jaG9yIG9uIHNjcmVlblxuICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIC0gd2lkdGggb2YgdGhlIGNvbnRhaW5lclxuICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodCAtIGhlaWdodCBvZiB0aGUgY29udGFpbmVyXG4gKiBAcGFyYW0ge051bWJlcn0gcGFkZGluZyAtIGV4dHJhIHNwYWNlIGZyb20gdGhlIGVkZ2UgaW4gcGl4ZWxzXG4gKiBAcGFyYW0ge051bWJlcn0gc2VsZldpZHRoIC0gd2lkdGggb2YgdGhlIHBvcHVwXG4gKiBAcGFyYW0ge051bWJlcn0gc2VsZkhlaWdodCAtIGhlaWdodCBvZiB0aGUgcG9wdXBcbiAqIEBwYXJhbSB7U3RyaW5nfSBhbmNob3IgLSB0eXBlIG9mIHRoZSBhbmNob3IsIG9uZSBvZiAndG9wJywgJ2JvdHRvbScsXG4gICAgJ2xlZnQnLCAncmlnaHQnLCAndG9wLWxlZnQnLCAndG9wLXJpZ2h0JywgJ2JvdHRvbS1sZWZ0JyAsIGFuZCAgJ2JvdHRvbS1yaWdodCdcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHBvc2l0aW9uIC0gb25lIG9mICd0b3AnLCAnYm90dG9tJyxcbiAgICAnbGVmdCcsICdyaWdodCcsICd0b3AtbGVmdCcsICd0b3AtcmlnaHQnLCAnYm90dG9tLWxlZnQnICwgYW5kICAnYm90dG9tLXJpZ2h0J1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RHluYW1pY1Bvc2l0aW9uKHtcbiAgeCwgeSxcbiAgd2lkdGgsIGhlaWdodCxcbiAgc2VsZldpZHRoLCBzZWxmSGVpZ2h0LFxuICBhbmNob3IsXG4gIHBhZGRpbmcgPSAwXG59KSB7XG4gIGxldCB7eDogYW5jaG9yWCwgeTogYW5jaG9yWX0gPSBBTkNIT1JfUE9TSVRJT05bYW5jaG9yXTtcblxuICAvLyBhbmNob3JZOiB0b3AgLSAwLCBjZW50ZXIgLSAwLjUsIGJvdHRvbSAtIDFcbiAgbGV0IHRvcCA9IHkgLSBhbmNob3JZICogc2VsZkhlaWdodDtcbiAgbGV0IGJvdHRvbSA9IHRvcCArIHNlbGZIZWlnaHQ7XG4gIC8vIElmIG5lZWRlZCwgYWRqdXN0IGFuY2hvclkgYXQgMC41IHN0ZXAgYmV0d2VlbiBbMCwgMV1cbiAgY29uc3QgeVN0ZXAgPSAwLjU7XG5cbiAgaWYgKHRvcCA8IHBhZGRpbmcpIHtcbiAgICAvLyBUb3AgZWRnZSBpcyBvdXRzaWRlLCB0cnkgbW92ZSBkb3duXG4gICAgd2hpbGUgKHRvcCA8IHBhZGRpbmcgJiYgYW5jaG9yWSA+PSB5U3RlcCkge1xuICAgICAgYW5jaG9yWSAtPSB5U3RlcDtcbiAgICAgIHRvcCArPSB5U3RlcCAqIHNlbGZIZWlnaHQ7XG4gICAgfVxuICB9IGVsc2UgaWYgKGJvdHRvbSA+IGhlaWdodCAtIHBhZGRpbmcpIHtcbiAgICAvLyBib3R0b20gZWRnZSBpcyBvdXRzaWRlLCB0cnkgbW92ZSB1cFxuICAgIHdoaWxlIChib3R0b20gPiBoZWlnaHQgLSBwYWRkaW5nICYmIGFuY2hvclkgPD0gMSAtIHlTdGVwKSB7XG4gICAgICBhbmNob3JZICs9IHlTdGVwO1xuICAgICAgYm90dG9tIC09IHlTdGVwICogc2VsZkhlaWdodDtcbiAgICB9XG4gIH1cblxuICAvLyBhbmNob3JYOiBsZWZ0IC0gMCwgY2VudGVyIC0gMC41LCByaWdodCAtIDFcbiAgbGV0IGxlZnQgPSB4IC0gYW5jaG9yWCAqIHNlbGZXaWR0aDtcbiAgbGV0IHJpZ2h0ID0gbGVmdCArIHNlbGZXaWR0aDtcblxuICAvLyBJZiBuZWVkZWQsIGFkanVzdCBhbmNob3JYIGF0IDAuNSBzdGVwIGJldHdlZW4gWzAsIDFdXG4gIGxldCB4U3RlcCA9IDAuNTtcbiAgaWYgKGFuY2hvclkgPT09IDAuNSkge1xuICAgIC8vIElmIHkgaXMgY2VudGVyZWQsIHRoZW4geCBjYW5ub3QgYWxzbyBiZSBjZW50ZXJlZFxuICAgIGFuY2hvclggPSBNYXRoLmZsb29yKGFuY2hvclgpO1xuICAgIHhTdGVwID0gMTtcbiAgfVxuXG4gIGlmIChsZWZ0IDwgcGFkZGluZykge1xuICAgIC8vIExlZnQgZWRnZSBpcyBvdXRzaWRlLCB0cnkgbW92ZSByaWdodFxuICAgIHdoaWxlIChsZWZ0IDwgcGFkZGluZyAmJiBhbmNob3JYID49IHhTdGVwKSB7XG4gICAgICBhbmNob3JYIC09IHhTdGVwO1xuICAgICAgbGVmdCArPSB4U3RlcCAqIHNlbGZXaWR0aDtcbiAgICB9XG4gIH0gZWxzZSBpZiAocmlnaHQgPiB3aWR0aCAtIHBhZGRpbmcpIHtcbiAgICAvLyBSaWdodCBlZGdlIGlzIG91dHNpZGUsIHRyeSBtb3ZlIGxlZnRcbiAgICB3aGlsZSAocmlnaHQgPiB3aWR0aCAtIHBhZGRpbmcgJiYgYW5jaG9yWCA8PSAxIC0geFN0ZXApIHtcbiAgICAgIGFuY2hvclggKz0geFN0ZXA7XG4gICAgICByaWdodCAtPSB4U3RlcCAqIHNlbGZXaWR0aDtcbiAgICB9XG4gIH1cblxuICAvLyBGaW5kIHRoZSBuYW1lIG9mIHRoZSBuZXcgYW5jaG9yIHBvc2l0aW9uXG4gIHJldHVybiBPYmplY3Qua2V5cyhBTkNIT1JfUE9TSVRJT04pLmZpbmQoKHBvc2l0aW9uVHlwZSkgPT4ge1xuICAgIGNvbnN0IGFuY2hvclBvc2l0aW9uID0gQU5DSE9SX1BPU0lUSU9OW3Bvc2l0aW9uVHlwZV07XG4gICAgcmV0dXJuIGFuY2hvclBvc2l0aW9uLnggPT09IGFuY2hvclggJiYgYW5jaG9yUG9zaXRpb24ueSA9PT0gYW5jaG9yWTtcbiAgfSk7XG59XG4iXX0=