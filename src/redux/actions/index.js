export const submitLogin = (name, gravatarEmail) => ({
  type: 'LOGIN',
  name,
  gravatarEmail,
});

export const setScore = (payload) => ({
  type: 'SET_SCORE',
  payload,
});
