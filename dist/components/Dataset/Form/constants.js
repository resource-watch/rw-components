'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var APPLICATIONS = exports.APPLICATIONS = [{ label: 'Resource Watch', value: 'rw' }, { label: 'Aqueduct', value: 'aqueduct' }];

var TOPICS = exports.TOPICS = [{ label: 'Cities', value: 'cities' }, { label: 'Climate', value: 'climate' }, { label: 'Energy', value: 'energy' }, { label: 'Forests', value: 'forests' }, { label: 'Food', value: 'food' }, { label: 'Land classification', value: 'land_classification' }, { label: 'Society', value: 'society' }, { label: 'Supply chain', value: 'supply_chain' }, { label: 'Water', value: 'water' }];

var CONNECTOR_TYPES = exports.CONNECTOR_TYPES = [{ label: 'REST', value: 'rest' }, { label: 'Document', value: 'document' }, { label: 'WMS', value: 'wms' }];

var CONNECTOR_TYPES_DICTIONARY = exports.CONNECTOR_TYPES_DICTIONARY = {
  rest: {
    cartodb: {
      label: 'CartoDB',
      value: 'cartodb',
      connectorUrlHint: 'Example: https://wri-01.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20combined01_prepared%20where%20impactparameter=%27Food Demand%27'
    },
    gee: {
      label: 'GEE',
      value: 'gee',
      connectorUrlHint: 'Example: projects/wri-datalab/HansenComposite_14-15'
    },
    featureservice: {
      value: 'featureservice',
      label: 'Feature Service (Arcgis)',
      connectorUrlHint: 'Example: http://gis-gfw.wri.org/arcgis/rest/services/prep/nex_gddp_indicators/MapServer/6?f=pjson'
    }
  },
  document: {
    csv: {
      label: 'CSV',
      value: 'csv',
      connectorUrlHint: 'Format specification: https://en.wikipedia.org/wiki/Comma-separated_values'
    },
    json: {
      label: 'JSON',
      value: 'json',
      connectorUrlHint: 'Format specification: http://www.json.org/'
    },
    tsv: {
      label: 'TSV',
      value: 'tsv',
      connectorUrlHint: 'Format specification: https://en.wikipedia.org/wiki/Tab-separated_values'
    },
    xml: {
      label: 'XML',
      value: 'xml',
      connectorUrlHint: 'Format specification: https://www.w3.org/TR/REC-xml/'
    }
  },
  wms: {
    wms: {
      label: 'WMS',
      value: 'wms',
      connectorUrlHint: ''
    }
  }
};

var STATE_DEFAULT = exports.STATE_DEFAULT = {
  step: 1,
  stepLength: 2,
  submitting: false,
  loading: false,
  dataset: {},
  form: {
    authorization: '',
    // STEP 1
    name: '',
    subtitle: '',
    application: [],
    topics: [],
    tags: [],
    provider: '',
    connectorProvider: '',
    connectorType: '',
    connectorUrlHint: '',

    // STEP 2
    connectorUrl: '',
    dataPath: '',
    legend: {
      lat: null,
      long: null,
      date: [],
      country: []
    }
  }
};