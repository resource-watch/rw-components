"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var line = {
  "width": 500,
  "height": 200,
  "padding": { "top": 10, "left": 30, "bottom": 30, "right": 10 },
  "data": [{
    "name": "table"
  }],
  "scales": [{
    "name": "x",
    "type": "linear",
    "range": "width",
    "zero": false,
    "domain": { "data": "table", "field": "x" }
  }, {
    "name": "y",
    "type": "linear",
    "range": "height",
    "nice": true,
    "domain": { "data": "table", "field": "y" }
  }],
  "axes": [{ "type": "x", "scale": "x", "ticks": 20 }, { "type": "y", "scale": "y" }],
  "marks": [{
    "type": "line",
    "from": { "data": "table" },
    "properties": {
      "enter": {
        "interpolate": { "value": "monotone" },
        "x": { "scale": "x", "field": "x" },
        "y": { "scale": "y", "field": "y" },
        "y2": { "scale": "y", "value": 0 },
        "fill": { "value": "transparent" },
        "stroke": { "value": "steelblue" }
      },
      "update": {
        "fillOpacity": { "value": 1 }
      },
      "hover": {
        "fillOpacity": { "value": 0.5 }
      }
    }
  }]
};

exports.default = line;