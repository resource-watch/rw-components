import React from 'react';
import DatasetCard from './Card';

function List(props) {
  const datasets = props.datasets.map((dataset) => {
    return (<DatasetCard dataset={dataset} />);
  });

  return (
    <div>
      {datasets}
    </div>
  );
}
