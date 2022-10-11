const INITIAL_STATE_LOGIN = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',

};

function player(state = INITIAL_STATE_LOGIN, action) {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.gravatarEmail,
    };
  case 'SET_SCORE':
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
}

export default player;
