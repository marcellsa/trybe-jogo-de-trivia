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

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { name, gravatarEmail } = this.state;
    dispatch(submitLogin(name, gravatarEmail));
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
