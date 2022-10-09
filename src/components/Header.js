import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, score } = this.props;

    return (
      <section>
        <img data-testid="header-profile-picture" src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc" alt={ name } />
        <div data-testid="header-player-name">
          { name }
        </div>
        <div data-testid="header-score">
          Pontos:
          {' '}
          {score}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
