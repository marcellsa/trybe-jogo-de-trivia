import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MainPage extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    return (
      <button
        type="button"
        data-testid="btn-settings"
        onClick={ this.handleClick }
      >
        Configurações
      </button>
    );
  }
}

MainPage.propTypes = {
  history: PropTypes.string,
  push: PropTypes.string,
}.isRequired;

export default MainPage;
