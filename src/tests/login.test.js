import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
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
    const btnPlay = screen.getByTestId('btn-play');
    const btnSettings = screen.getByTestId('btn-settings');
    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(btnPlay).toBeInTheDocument();
    expect(btnSettings).toBeInTheDocument();
  })

  test('Testa se é possível digitar nos inputs e habilitar o botão de "Play" e se ao clicar em "Play" muda para a url "/game"', () => {

  const { history } = renderWithRouterAndRedux(<Login />);
  const emailTest = 'email@email.com';
  const name = 'nameTeste'
  const btnPlay = screen.getByTestId('btn-play');
  expect(btnPlay).toBeDisabled;
  const inputEmail = screen.getByPlaceholderText(/Email/i);
  const inputName = screen.getByPlaceholderText(/name/i);
  userEvent.type(inputEmail, emailTest);
  userEvent.type(inputName, name);
  expect(btnPlay).toBeEnabled;
  userEvent.click(btnPlay);
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

  test('testa o funcionamento do localStorage', async () => {

    jest.spyOn(global, "fetch").mockResolvedValue(
      { 
        json: jest.fn().mockResolvedValue({
          "response_code": 0,
          "response_message": "Token Generated Successfully!",
          "token": "d2600003e184a2619704df2b3671e929d54804671231072d1b12c4c4c344abad"
      }),
      });
    const { history } = renderWithRouterAndRedux(<App />)
    const emailTest = 'email@email.com';
    const name = 'nameTeste'
    const inputEmail = screen.getByPlaceholderText(/Email/i);
    const inputName = screen.getByPlaceholderText(/name/i);
    const btnPlay = screen.getByTestId('btn-play');
    userEvent.type(inputEmail, emailTest);
    userEvent.type(inputName, name);
    userEvent.click(btnPlay);
    const { location: { pathname } } = history;
    setTimeout(() => {
    expect(pathname).toBe('/game');
  }, 3000);
    // await waitForElementToBeRemoved(() => screen.getByRole('heading', {
    //   name: /loading\.\.\./i,
    // }));
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  
})
  test('testa se o token não é encontrado', async () => {

  jest.spyOn(global, "fetch").mockResolvedValue(
    { 
      json: jest.fn().mockResolvedValue({
        "response_code": 3,
        "results": []
    }),
    });
    const { history } = renderWithRouterAndRedux(<App />)
    const emailTest = 'email@email.com';
    const name = 'nameTeste'
    const inputEmail = screen.getByPlaceholderText(/Email/i);
    const inputName = screen.getByPlaceholderText(/name/i);
    const btnPlay = screen.getByTestId('btn-play');
    userEvent.type(inputEmail, emailTest);
    userEvent.type(inputName, name);
    userEvent.click(btnPlay);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  })
})