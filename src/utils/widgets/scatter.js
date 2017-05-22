const scatter = {
  name: 'Vega Visualization',
  height: 450,
  padding: 'strict',
  marks: [
    {
      properties: {
        enter: {
          shape: { value: 'circle' },
          x: { field: 'x', scale: 'x' },
          size: { value: 50 },
          fill: { field: 'group', scale: 'group' },
          y: { field: 'y', scale: 'y' }
        }
      },
      from: { data: 'table' },
      type: 'symbol'
    }
  ],
  axes: [
    {
      type: 'x',
      scale: 'x',
      ticks: 5,
      tickSize: 3,
      format: 's',
      properties: { axis: { stroke: { value: '#9BA2AA' } } }
    },
    {
      type: 'y',
      scale: 'y',
      ticks: 5,
      tickSize: 3,
      format: 's',
      properties: { axis: { stroke: { value: '#9BA2AA' } } }

    }
  ],
  data: [
    {
      name: 'table'
    }
  ],
  scales: [
    {
      name: 'x',
      range: 'width',
      domain: { data: 'table', field: 'x' },
      type: 'linear',
      "zero": false
    },
    {
      name: 'y',
      range: 'height',
      domain: { data: 'table', field: 'y' },
      type: 'linear',
      "zero": false
    },
    {
      name: 'group',
      range: 'colorRange1',
      domain: { data: 'table', field: 'group' },
      type: 'ordinal'
    }
  ],
  width: 450
};

export default scatter;
