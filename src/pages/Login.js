import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitLogin } from '../redux/actions';

class Login extends React.Component {
  state = {
    name: '',
    gravatarEmail: '',
    // emailInvalid: true,
    // passwordInvalid: true,
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.verifyBtn());
  };

  verifyBtn = () => {
    const { gravatarEmail, name } = this.state;
    this.setState({ isDisabled: !(name.length > 0 && gravatarEmail.length > 0) });
  };

  handleSubmit = async () => {
    const { dispatch, history } = this.props;
    const { name, gravatarEmail } = this.state;
    dispatch(submitLogin(name, gravatarEmail));
    const GET_TOKEN_ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
    const tokenResponse = await fetch(GET_TOKEN_ENDPOINT);
    const { response_code: tokenResponseCode, token } = await tokenResponse.json();
    if (tokenResponseCode === 0) {
      localStorage.setItem('token', token);
      history.push('/game');
    } else {
      this.badRequest();
    }
  };

  badRequest = () => {
    localStorage.removeItem('token');
    const { history } = this.props;
    history.push('/');
  };

  handleSettingsBtn = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <div className="App">
        <form>
          <input
            type="name"
            name="name"
            data-testid="input-player-name"
            placeholder="name"
            onChange={ this.handleChange }
          />
          <input
            type="email"
            name="gravatarEmail"
            data-testid="input-gravatar-email"
            placeholder="Email"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.handleSubmit }
          >
            Play
          </button>

          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleSettingsBtn }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
