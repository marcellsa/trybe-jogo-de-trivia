import React from 'react';
import { screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';

describe('Testa pagina de Login', () => {
  test('Verifica se os campos de feedback estão presentes na tela', () => {
    renderWithRouterAndRedux(<Feedback />, { player: { name: 'rafael', assertions: 2 , score: 100 } });
    const headerScore = screen.getByTestId('header-score');
    const headerplayerName = screen.getByText('rafael');
    const picture = screen.getByTestId('header-profile-picture');
    const feedbackMessage = screen.getByText('Could be better...');
    const score = screen.getByTestId('feedback-total-score');
    const assertions = screen.getByTestId('feedback-total-question');
    expect(headerScore).toBeInTheDocument();
    expect(headerplayerName).toBeInTheDocument();
    expect(picture).toBeInTheDocument();
    expect(feedbackMessage).toBeInTheDocument();
    expect(score).toBeInTheDocument();
    expect(assertions).toBeInTheDocument();
  })
  test('Se a mensagem Well Done! aparece quando há mais de 3 acertos', () => {
    renderWithRouterAndRedux(<Feedback />, { player: { name: 'rafael', assertions: 3 , score: 100 } });
    const feedbackMessage = screen.getByText('Well Done!');
    expect(feedbackMessage).toBeInTheDocument();
  })
})
