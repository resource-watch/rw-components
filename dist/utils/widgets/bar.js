'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var bar = {
  axes: [{
    type: 'x',
    scale: 'x',
    ticks: 5,
    tickSize: 3,
    format: 's',
    properties: {
      axis: { stroke: { value: '#9BA2AA' } },
      labels: {
        angle: { value: -90 },
        align: { value: 'right' },
        baseline: { value: 'middle' }
      }
    }
  }, {
    type: 'y',
    scale: 'y',
    ticks: 5,
    tickSize: 5,
    format: 's',
    properties: { axis: { stroke: { value: '#9BA2AA' } } }
  }],
  data: [{
    name: 'table'
  }],
  marks: [{
    from: { data: 'table' },
    type: 'rect',
    properties: {
      enter: {
        x: { field: 'x', scale: 'x' },
        y: { field: 'y', scale: 'y' },
        y2: { scale: 'y', value: 0 },
        width: { band: true, scale: 'x', offset: -1 }
      },
      hover: { fill: { scale: 'color' } },
      update: { fill: { scale: 'color' } }
    }
  }],
  width: 1010,
  height: 450,
  scales: [{
    name: 'x',
    type: 'ordinal',
    range: 'width',
    domain: { data: 'table', field: 'x' }
  }, {
    name: 'y',
    nice: true,
    type: 'linear',
    range: 'height',
    domain: { data: 'table', field: 'y' }
  }, {
    name: 'color',
    type: 'ordinal',
    range: 'colorRange1'
  }],
  padding: 'strict'
};

exports.default = bar;