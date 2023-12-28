import { useState } from "react";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";

import iconPaper from "./assets/icon-paper.svg";
import iconScissor from "./assets/icon-scissors.svg";
import iconRock from "./assets/icon-rock.svg";
import iconClose from "./assets/icon-close.svg";
import rules from "./assets/image-rules.svg";

interface Choice {
  name: string;
  beats: string;
}

function App() {
  const [score, setScore] = useState<number>(0);
  const [resultsVisible, setResultsVisible] = useState<boolean>(false);
  const [winnerVisible, setWinnerVisible] = useState<boolean>(false);
  const [resultText, setResultText] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [userChoice, setUserChoice] = useState<Choice | null>(null);
  const [aiChoice, setAiChoice] = useState<Choice | null>(null);

  const CHOICES = [
    { name: "paper", beats: "rock" },
    { name: "scissors", beats: "paper" },
    { name: "rock", beats: "scissors" },
  ];

  const handlePlayAgain = () => {
    setResultsVisible(false);
    setWinnerVisible(false);
    setUserChoice(null);
    setAiChoice(null);
  };

  const toggleRules = () => {
    setModalVisible(!modalVisible);
  };

  const choose = (choice: Choice) => {
    const aiChoice = aiChoose();
    setUserChoice(choice);
    setAiChoice(aiChoice);
    displayResults([choice, aiChoice]);
    displayWinner([choice, aiChoice]);
  };

  const aiChoose = (): Choice => {
    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
  };

  const displayResults = (results: Choice[]) => {
    setResultsVisible(true);
  };

  const displayWinner = (results: Choice[]) => {
    setTimeout(() => {
      const userWins = isWinner(results);
      const aiWins = isWinner(results.reverse());

      if (userWins) {
        setResultText("you win");
        setScore((prevScore) => prevScore + 1);
      } else if (aiWins) {
        setResultText("you lose");
        setScore((prevScore) => prevScore - 1);
      } else {
        setResultText("draw");
      }

      setWinnerVisible(true);
    }, 1000);
  };

  const isWinner = (results: Choice[]): boolean => {
    return results[0].beats === results[1].name;
  };

  return (
    <>
      <div className={"container"}>
        {/* Header */}
        <Header score={score} />

        {/* Game Section */}
        <section className={`game ${resultsVisible ? "hidden" : ""}`}>
          <button
            className="choice-btn"
            data-choice="paper"
            onClick={() => choose(CHOICES[0])}
          >
            <div className="choice paper">
              <img src={iconPaper} alt="Paper" />
            </div>
          </button>
          <button
            className="choice-btn"
            data-choice="scissors"
            onClick={() => choose(CHOICES[1])}
          >
            <div className="choice scissors">
              <img src={iconScissor} alt="Scissors" />
            </div>
          </button>
          <button
            className="choice-btn"
            data-choice="rock"
            onClick={() => choose(CHOICES[2])}
          >
            <div className="choice rock">
              <img src={iconRock} alt="Rock" />
            </div>
          </button>
        </section>

        {/* Results Section */}
        <section className={`results ${resultsVisible ? "" : "hidden"}`}>
          <h2 className="results__heading">you picked {userChoice?.name}</h2>
          <h2 className="results__heading">
            the house picked {aiChoice?.name}
          </h2>
          <div className="results__result">
            {userChoice && (
              <div className={`choice ${userChoice.name}`}>
                <img
                  src={
                    userChoice.name === "paper"
                      ? iconPaper
                      : userChoice.name === "scissors"
                      ? iconScissor
                      : iconRock
                  }
                  alt={userChoice.name}
                />
              </div>
            )}
          </div>
          <div className={`results__winner ${winnerVisible ? "" : "hidden"}`}>
            <h3 className="results__text">{resultText}</h3>
            <button className="play-again" onClick={handlePlayAgain}>
              play again
            </button>
          </div>
          <div className="results__result">
            {aiChoice && (
              <div className={`choice ${aiChoice.name}`}>
                <img
                  src={
                    aiChoice.name === "paper"
                      ? iconPaper
                      : aiChoice.name === "scissors"
                      ? iconScissor
                      : iconRock
                  }
                  alt={aiChoice.name}
                />
              </div>
            )}
          </div>
        </section>
      </div>
      {/* Rules Button */}
      <button className="rules-btn" onClick={toggleRules}>
        rules
      </button>

      {/* Rules Modal */}
      <div className={`modal ${modalVisible ? "show-modal" : ""}`}>
        <div className="modal__container">
          <header className="modal__header">
            <h2 className="modal__heading">rules</h2>
            <button className="close-btn" onClick={toggleRules}>
              <img src={iconClose} alt="Close Button" />
            </button>
          </header>
          <img src={rules} alt="Rules Image" className="rules-img" />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
