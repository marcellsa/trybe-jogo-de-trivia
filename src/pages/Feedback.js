import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
          >
            Play Again
          </button>
        </Link>
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            type="button"
          >
            Ranking
          </button>
        </Link>
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
