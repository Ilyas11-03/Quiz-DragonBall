import React from "react";
import { Link } from "react-router-dom";

const Home = () => {

    return (
        <div>

  <header>
    <div className="title-container">
      <div className="title-aura"></div>
      <h1>DRAGON BALL Z QUIZ</h1>
    </div>
    <p className="subtitle">Test your knowledge of the Z Fighters!</p>
  </header>


  <main>
    <div className="quiz-card">
      <h2 className="quiz-title">Are You a True DBZ Fan?</h2>
      <p className="quiz-description">
        Challenge yourself with this ultimate Dragon Ball Z quiz covering characters, battles, 
        transformations, and more from the iconic anime series.
      </p>
      
      <h3 className="features-title">Quiz Features:</h3>
      <ul className="features-list">
        <li>20 challenging questions</li>
        <li>Multiple difficulty levels</li>
        <li>Character recognition tests</li>
        <li>Battle scenario questions</li>
        <li>Power level estimations</li>
      </ul>
      
      <Link to={"/quiz"} className="start-button">Start Quiz</Link>
    </div>

  
    <div className="character-silhouettes">
      <div className="silhouette"></div>
      <div className="silhouette"></div>
      <div className="silhouette"></div>
      <div className="silhouette"></div>
    </div>
  </main>


  <footer>
    <p className="copyright">© <span id="year"></span> Dragon Ball Quiz - Not affiliated with Toei Animation</p>
    <p className="stats">Test your might! Over 9000 fans have taken this quiz!</p>
  </footer>

        </div>
    )
}
export default Home;