import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  state = {
    num1: Math.ceil(Math.random() * 10),
    num2: Math.ceil(Math.random() * 10),
    score: 5,
    response: "",
    start: Date.now(),
    correct: true
  };

  render() {
    if (this.state.score > 0) {
      return this.renderProblem();
    } else {
      return this.renderWin();
    }
  }

  renderProblem() {
    return (
      <div>
        <h1 className={!this.state.correct ? "incorrect" : ""}>
          {this.state.num1} + {this.state.num2}
        </h1>
        <input
          onKeyPress={this.inputKeyPress}
          onChange={this.updateResponse}
          value={this.state.response}
        />
        <h4>Solve {this.state.score} more sums to finish...</h4>
      </div>
    );
  }

  renderWin() {
    return (
      <div>
        <h2> Challenge completed! </h2>
        <h4>
          You took{" "}
          <i>
            {Math.abs(Math.round((Date.now() - this.state.start) / 1000))}{" "}
            seconds
          </i>{" "}
          to finish
        </h4>
      </div>
    );
  }

  updateResponse = (event) => {
    this.setState({ response: event.target.value });
  };

  inputKeyPress = (event) => {
    if (event.key === "Enter") {
      const answer = parseInt(this.state.response);
      if (answer === this.state.num1 + this.state.num2) {
        this.setState((state) => ({
          score: state.score - 1,
          num1: Math.ceil(Math.random() * 10) + this.state.num1,
          num2: Math.ceil(Math.random() * 10) + this.state.num2,
          response: "",
          correct: true
        }));
      } else {
        this.setState({ response: "", correct: false });
      }
    }
  };
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
