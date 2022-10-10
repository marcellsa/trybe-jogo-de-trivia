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
    countdown: 30,

  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
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
      this.startTimer();
      this.setState({
      // listOfQuestions: results,
        fetching: false,
        selectedQuestion,
        answers,
      });
    } else {
      this.badRequest();
    }
  }

  badRequest = () => {
    localStorage.removeItem('token');
    const { history } = this.props;
    history.push('/');
  };

  startTimer = () => {
    const ONE_SECOND = 1000;

    setInterval(() => {
      this.setState((prevState) => {
        const { countdown } = prevState;
        if (countdown - 1 >= 0) {
          return {
            countdown: countdown - 1,
          };
        }
      });
    }, ONE_SECOND);
  };

  shuffleAnswers = (array) => {
    // ref https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    for (let index = array.length - 1; index > 0; index -= index) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    }
  };

  render() {
    const {
      selectedQuestion,
      fetching,
      answers,
      countdown,
    } = this.state;
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
                  disabled={ countdown === 0 }
                >
                  {answer}
                </button>
              ))
            }
          </div>
          <div>
            <p>Tempo restante:</p>
            <span>{countdown}</span>
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
