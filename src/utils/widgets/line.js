const line = {
  "name": "lineplot",
  "height": 450,
  "padding": "strict",
  "marks": [
    {
      "marks": [
        {
          "properties": {
            "enter": {
              "stroke": {"field": "group","scale": "group"},
              "x": {"field": "x","scale": "x"},
              "strokeWidth": {"value": 2},
              "y": {"field": "y","scale": "y"}
            }
          },
          "type": "line"
        }
      ],
      "from": {
        "data": "table",
        "transform": [{"groupby": ["group"],"type": "facet"}]
      },
      "type": "group"
    }
  ],
  "axes": [
    {
      "layer": "front",
      "grid": false,
      "type": "x",
      "scale": "x",
      "ticks": 10,
      "tickSize": 3,
      "format": "s",
      "properties": {
        "axis": {"stroke": {"value": "#9BA2AA"}},
        "labels": {
          "angle": {"value": -90},
          "align": {"value": "right"},
          "baseline": {"value": "middle"}
        }
      }
    },
    {
      "layer": "front",
      "grid": false,
      "type": "y",
      "scale": "y",
      "tickSize": 3,
      "format": "s",
      "properties": {"axis": {"stroke": {"value": "#9BA2AA"}}}
    }
  ],
  "data": [
    {
      "name": "table"
    }
  ],
  "scales": [
    {
      "name": "x",
      "range": "width",
      "domain": {"sort": true,"data": "table","field": "x"},
      "type": "linear",
      "zero": false
    },
    {
      "name": "y",
      "range": "height",
      "domain": {"data": "table","field": "y"},
      "type": "linear",
      "zero": false
    },
    {
      "name": "group",
      "range": "colorRange1",
      "domain": {"data": "table","field": "group"},
      "type": "ordinal"
    }
  ],
  "width": 450
};

export default line;
