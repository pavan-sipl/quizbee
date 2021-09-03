
import { Component } from 'react';
import ReactDOM from 'react-dom';
import "./assets/style.css";
import QuestionBox from './components/QuestionBox';
import quizService from "./quizService"
import Result from './components/Result';


class Quizbee extends Component {
  state = {
    questionBank: [],
    score:0,
    responses:0
  };

  getQuetions = () => {
    quizService().then(question => {
      this.setState({
        questionBank: question
      });
    });
  };

  computeAnswer = (answer, correctAnswer) => {
   if (answer === correctAnswer){
    this.setState({
      score: this.state.score + 1
    })
   }
   this.setState({
     responses: this.state.responses<5 ? this.state.responses + 1 :5
   })
  }

  playAgain = () => {
    this.getQuetions();
    this.setState({
      score:0,
      responses:0
    })
  }

  componentDidMount(){
    this.getQuetions();
  }

  render() {
    return (
      <div className="container">
        <div className="title">Quizbee</div>
        {this.state.questionBank.length>0 && this.state.responses<5 && this.state.questionBank.map(({question, answers, correct, questionId}) => (<QuestionBox question={question} options={answers} key={questionId} 
        selected={answer => this.computeAnswer(answer, correct)}/>))}

        {this.state.responses === 5 ? (<Result score={this.state.score} playAgain={this.playAgain} />) :null}
      </div>
    );
  }
}

ReactDOM.render(<Quizbee />, document.getElementById("root"));


