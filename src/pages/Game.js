import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends Component {
  state = {
    listOfQuestions: [],
    questionIndex: 0,
    fetching: true,
    selectedQuestion: {},
    answers: [],
    countdown: 30,
    answerTriggered: false,
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
      this.startTimer();
      const answers = this.shuffleAnswers(selectedQuestion);

      this.setState({
        listOfQuestions: results,
        fetching: false,
        selectedQuestion,
        answers,
      });
    } else {
      this.badRequest();
    }
  }

  changeQuestion = () => {
    const { listOfQuestions, questionIndex } = this.state;
    if (questionIndex + 1 < listOfQuestions.length) {
      this.setState((prevState) => {
        const { questionIndex: prevQuestionIndex } = prevState;
        const nextQuestionIndex = prevQuestionIndex + 1;
        const nextQuestion = listOfQuestions[nextQuestionIndex];
        const answers = this.shuffleAnswers(nextQuestion);
        return {
          answerTriggered: false,
          questionIndex: nextQuestionIndex,
          selectedQuestion: nextQuestion,
          answers,
        };
      });
    }
  };

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

  shuffleAnswers = (question) => {
    const {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
    } = question;
    const answers = [...incorrectAnswers, correctAnswer];

    // ref https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    for (let index = answers.length - 1; index > 0; index -= index) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [answers[index], answers[randomIndex]] = [answers[randomIndex], answers[index]];
    }

    return answers;
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
                  onClick={ () => this.setState({ answerTriggered: true }) }

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
          {
            answerTriggered && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.changeQuestion }
              >
                Next
              </button>
            )
          }
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
