import React from 'react';
import './style.scss';

export default function Icon({ name, className }) {
  return (
    <svg className={`c-icon ${className || ''}`}>
      <use xlinkHref={`#${name}`} />
    </svg>
  );
}

Icon.propTypes = {
  name: React.PropTypes.string,
  className: React.PropTypes.string
};
