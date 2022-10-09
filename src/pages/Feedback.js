import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  displayFeeback = () => {
    const { assertions } = this.props;
    if (assertions > 2) {
      return 'Well Done!';
    }
    return 'Could be better...';
  };

  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">{ this.displayFeeback }</h1>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
