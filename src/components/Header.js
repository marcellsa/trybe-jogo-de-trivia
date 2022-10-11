import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    const emailHash = MD5(gravatarEmail).toString();

    return (
      <section>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${emailHash}` } alt={ name } />
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
  gravatarEmail: state.player.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
