import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends Component {
  state = {
    // listOfQuestions: [],
    questionIndex: 0,
    fetching: true,
    selectedQuestion: {},
    answers: [],
  };

  async componentDidMount() {
    const GET_TOKEN_ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
    const tokenResponse = await fetch(GET_TOKEN_ENDPOINT);
    const { response_code: tokenResponseCode, token } = await tokenResponse.json();

    if (tokenResponseCode === 0) {
      localStorage.setItem('token', token);
      const GET_QUESTIONS_ENDPOINT = `https://opentdb.com/api.php?amount=5&token=${token}`;
      const questionResponse = await fetch(GET_QUESTIONS_ENDPOINT);
      const {
        results,
        response_code: questionResponseCode,
      } = await questionResponse.json();
      if (questionResponseCode === 0) {
        const { questionIndex } = this.state;
        const selectedQuestion = results[questionIndex];

        const {
          incorrect_answers: incorrectAnswers,
          correct_answer: correctAnswer,
        } = selectedQuestion;

        const answers = [...incorrectAnswers, correctAnswer];
        this.shuffleAnswers(answers);
        this.setState({
          // listOfQuestions: results,
          fetching: false,
          selectedQuestion,
          answers,
        });
      } else {
        this.badRequest();
      }
    } else {
      this.badRequest();
    }
  }

  badRequest = () => {
    localStorage.removeItem('token');
    const { history } = this.props;
    history.push('/');
  };

  shuffleAnswers = (array) => {
    // ref https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    for (let index = array.length - 1; index > 0; index -= index) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    }
  };

  render() {
    const { selectedQuestion, fetching, answers } = this.state;
    const { category, question } = selectedQuestion;
    if (fetching) {
      return <h1>Loading...</h1>;
    }
    return (
      <section>
        <Header />
        <div>
          <p data-testid="question-category">{category}</p>
          <p data-testid="question-text">{question}</p>
          <div data-testid="answer-options">
            {
              answers.map((answer, index) => (
                <button
                  key={ index }
                  type="button"
                  data-testid={
                    answer === selectedQuestion.correct_answer
                      ? 'correct-answer'
                      : `wrong-answer-${index}`
                  }
                >
                  {answer}
                </button>
              ))
            }
          </div>
        </div>
      </section>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
