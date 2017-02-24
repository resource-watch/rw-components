import React from 'react';

function Dataset(props) {
  return (
    <div>
      <h2>{props.dataset.title}</h2>
      <p>{props.dataset.description}</p>
    </div>
  );
}
