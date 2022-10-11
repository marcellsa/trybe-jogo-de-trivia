import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  displayFeeback = (assertions) => {
    if (assertions > 2) {
      return 'Well Done!';
    }
    return 'Could be better...';
  };

  render() {
    const { score, assertions } = this.props;
    const feedbackMessage = this.displayFeeback(assertions);
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">{ feedbackMessage }</h1>
        <h2 data-testid="feedback-total-score">
          Pontução:
          {' '}
          { score }
        </h2>
        <h2 data-testid="feedback-total-question">
          Numero de acertos:
          {' '}
          { assertions }
        </h2>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
