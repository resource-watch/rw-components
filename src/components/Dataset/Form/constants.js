export const APPLICATIONS = [
  { label: 'Resource Watch', value: 'rw' },
  { label: 'Aqueduct', value: 'aqueduct' }
];

export const TOPICS = [
  { label: 'Cities', value: 'cities' },
  { label: 'Climate', value: 'climate' },
  { label: 'Energy', value: 'energy' },
  { label: 'Forests', value: 'forests' },
  { label: 'Food', value: 'food' },
  { label: 'Land classification', value: 'land_classification' },
  { label: 'Society', value: 'society' },
  { label: 'Supply chain', value: 'supply_chain' },
  { label: 'Water', value: 'water' }
];

export const CONNECTOR_TYPES = [
  { label: 'REST', value: 'rest' },
  { label: 'Document', value: 'document' },
  { label: 'WMS', value: 'wms' }
];

export const CONNECTOR_TYPES_DICTIONARY = {
  rest: {
    cartodb: {
      label: 'CartoDB',
      value: 'cartodb',
      connectorUrlHint: 'Example: https://wri-01.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20combined01_prepared%20where%20impactparameter=%27Food Demand%27'
    },
    gee: {
      label: 'GEE',
      value: 'gee',
      connectorUrlHint: 'Example: https://wri-01.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20combined01_prepared%20where%20impactparameter=%27Food Demand%27'
    },
    featureservice: {
      value: 'featureservice',
      label: 'Feature Service'
    }
  },
  document: {
    csv: {
      label: 'CSV',
      value: 'csv',
      connectorUrlHint: 'Example: https://wri-01.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20combined01_prepared%20where%20impactparameter=%27Food Demand%27'
    },
    json: {
      label: 'JSON',
      value: 'json',
      connectorUrlHint: 'Example: https://wri-01.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20combined01_prepared%20where%20impactparameter=%27Food Demand%27'
    },
    tsv: {
      label: 'TSV',
      value: 'tsv',
      connectorUrlHint: 'Example: https://wri-01.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20combined01_prepared%20where%20impactparameter=%27Food Demand%27'
    },
    xml: {
      label: 'XML',
      value: 'xml',
      connectorUrlHint: 'Example: https://wri-01.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20combined01_prepared%20where%20impactparameter=%27Food Demand%27'
    }
  },
  wms: {
    wms: {
      label: 'WMS',
      value: 'wms',
      connectorUrlHint: 'Example: https://wri-01.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20combined01_prepared%20where%20impactparameter=%27Food Demand%27'
    }
  }
};

export const STATE_DEFAULT = {
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
    legend: {
      lat: null,
      long: null,
      date: [],
      country: []
    }
  }
};
