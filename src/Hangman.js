import React, { Component } from "react";
import "./Hangman.css";
import { randomWord } from "./words";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord(evt) {
    return this.state.answer
      .split("")
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  handleReset(evt) {
    this.setState((currState) => ({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    }));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState((currState) => ({
      guessed: currState.guessed.add(ltr),
      nWrong: currState.nWrong + (this.state.answer.includes(ltr) ? 0 : 1),
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons(evt) {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, idx) => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        className="Hangman-btn"
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
    const gameOver = this.state.nWrong >= this.props.maxWrong;
    const altText = `${this.state.nWrong} / ${this.props.maxWrong} guesses`;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    let generator = this.generateButtons();
    if (isWinner) {
      generator = (
        <h2 className="Hangman-endResult-win">
          You Win!!!
          <span role="img" aria-label="img">
            😍😎
          </span>
        </h2>
      );
    }
    if (gameOver) {
      generator = <h2 className="Hangman-endResult-lose">You Lose!</h2>;
    }
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        {this.guessedWord().join("") === this.state.answer && <h1>You Win</h1>}

        <img src={this.props.images[this.state.nWrong]} alt={altText} />
        <p>Guessed Wrong : {this.state.nWrong}</p>
        <p className="Hangman-word">
          {!gameOver ? this.guessedWord() : this.state.answer}
        </p>
        <p className="Hangman-btns-div">{generator}</p>
        <br />
        <button className="Hangman-reset-btn" onClick={this.handleReset}>
          Restart?
        </button>
      </div>
    );
  }
}

export default Hangman;
