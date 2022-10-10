import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Login from '../pages/Login';

describe('Testa pagina de Login', () => {
  test('Verifica se a tela inicial é renderizada corretamente.', () => {
    renderWithRouterAndRedux(<Login />);
    const inputEmail = screen.getByPlaceholderText(/Email/i);
    const inputName = screen.getByPlaceholderText(/name/i);
    const btnLogin = screen.getByTestId('btn-play');
    const btnSettings = screen.getByTestId('btn-settings');
    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();
    expect(btnSettings).toBeInTheDocument();
  })
  test('Testa se é possível digitar nos inputs e habilitar o botão de "Play" e se ao clicar em "Play" muda para a url "/game"', () => {
  const { history } = renderWithRouterAndRedux(<Login />);
  const emailTest = 'email@email.com';
  const name = 'nameTeste'
  const btnLogin = screen.getByTestId('btn-play');
  expect(btnLogin).toBeDisabled;
  const inputEmail = screen.getByPlaceholderText(/Email/i);
  const inputName = screen.getByPlaceholderText(/name/i);
  userEvent.type(inputEmail, emailTest);
  userEvent.type(inputName, name);
  expect(btnLogin).toBeEnabled;
  userEvent.click(btnLogin);
  const { location: { pathname } } = history;
  setTimeout(() => {
    expect(pathname).toBe('/game');
  }, 3000);
  })
  test('Testa se ao clicar em "Configurações", muda para a url "/settings"', () => {
  const { history } = renderWithRouterAndRedux(<App />);
  const btnSettings = screen.getByRole('button', {
    name: /configurações/i,
  });
  userEvent.click(btnSettings);
  const { location: { pathname } } = history;
    expect(pathname).toBe('/settings');
  })
  test('testa o funcionamento do localStorage', () => {

})
})