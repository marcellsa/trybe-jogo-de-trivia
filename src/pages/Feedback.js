import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitLogin } from '../redux/actions';

class Feedback extends React.Component {
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

  render() {
    const { isDisabled } = this.state;
    return (
      <div className="App">
        
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

export default connect()(Feedback);
