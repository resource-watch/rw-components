const scatter = {
  name: 'Vega Visualization',
  height: 350,
  padding: 'auto',
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
      url: "https://api.resourcewatch.org/v1/query/d02df2f6-d80c-4274-bb6f-f062061655c4?sql=SELECT rank as x, total as y FROM estimated_co2_emission_filtered WHERE iso3 IN ('AGO', 'ARG', 'ALB', 'ARE', 'ARM', 'ASM', 'AFG')",
      name: 'table',
      format: { type: 'json', property: 'data' }
    }
  ],
  scales: [
    {
      name: 'x',
      range: 'width',
      domain: { data: 'table', field: 'x' },
      type: 'linear'
    },
    {
      name: 'y',
      range: 'height',
      domain: { data: 'table', field: 'y' },
      type: 'linear'
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
