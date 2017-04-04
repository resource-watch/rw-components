import React from 'react';
import classnames from 'classnames';

class ButtonContainer extends React.Component {
  render() {
    const containerClassName = classnames({ [this.props.className]: !!this.props.className });

    return (
      <div className={`c-button-container ${containerClassName}`}>
        <ul>
          {this.props.buttons.map((button) => {
            const buttonClassName = classnames({ [button.className]: !!button.className });
            return (
              <a
                className={`c-button ${buttonClassName}`}
                href={button.path}
              >
                {button.label}
              </a>
            );
          })}
        </ul>
      </div>
    );
  }
}


ButtonContainer.propTypes = {
  buttons: React.PropTypes.array.isRequired,
  className: React.PropTypes.string
};

export default ButtonContainer;
