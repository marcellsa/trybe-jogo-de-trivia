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

  handlePlayAgainBtn = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { score, assertions } = this.props;
    const feedbackMessage = this.displayFeeback(assertions);
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">{ feedbackMessage }</h1>
        <h2>
          Pontução:
          {' '}
          <span data-testid="feedback-total-score">{ score }</span>
        </h2>
        <h2>
          Numero de acertos:
          {' '}
          <span data-testid="feedback-total-question">{ assertions }</span>
        </h2>

        <button
          data-testid="btn-play-again"
          onClick={ this.handlePlayAgainBtn }
          type="button"
        >
          Play Again
        </button>
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
