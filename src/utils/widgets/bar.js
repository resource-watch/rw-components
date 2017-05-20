const bar = {
  axes: [
    {
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
    },
    {
      type: 'y',
      scale: 'y',
      ticks: 5,
      tickSize: 5,
      format: 's',
      properties: { axis: { stroke: { value: '#9BA2AA' } } }
    }
  ],
  data: [
    {
      url: "https://api.resourcewatch.org/v1/query/d02df2f6-d80c-4274-bb6f-f062061655c4?sql=SELECT iso3 as x, total as y FROM estimated_co2_emission_filtered WHERE iso3 IN ('ALB', 'ASM', 'ARE', 'ARG', 'ARM', 'ATA', 'AGO', 'ATG', 'AUS', 'AUT', 'AZE', 'AFG', 'BDI', 'BEL')",
      name: 'table',
      format: { type: 'json', property: 'data' }
    }
  ],
  marks: [
    {
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
    }
  ],
  width: 1010,
  height: 350,
  scales: [
    {
      name: 'x',
      type: 'ordinal',
      range: 'width',
      domain: { data: 'table', field: 'x' }
    },
    {
      name: 'y',
      nice: true,
      type: 'linear',
      range: 'height',
      domain: { data: 'table', field: 'y' }
    },
    {
      name: 'color',
      type: 'ordinal',
      range: 'colorRange1'
    }
  ],
  padding: 'strict'
};

export default bar;
