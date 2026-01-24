import React, { useRef, useState, useEffect } from 'react';
import './Quiz.css';
import { data } from '../../assets/data'; // Contient les 30 questions avec difficulty

/**
 * Composant principal du quiz Dragon Ball Z
 * Fonctionnalités :
 * - Choix de difficulté (easy / medium / hard)
 * - Timer de 10 secondes par question
 * - Bonus de points selon la rapidité
 * - Affichage d’un message personnalisé à la fin
 */
function Quiz() {
  // État : niveau de difficulté sélectionné (null = écran de choix)
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  
  // État : liste des questions filtrées selon la difficulté
  const [questions, setQuestions] = useState([]);
  
  // État : index de la question actuelle
  const [index, setIndex] = useState(0);
  
  // État : verrouillage après réponse (évite les clics multiples)
  const [lock, setLock] = useState(false);
  
  // État : score du joueur
  const [score, setScore] = useState(0);
  
  // État : temps restant pour la question en cours
  const [timeLeft, setTimeLeft] = useState(10);
  
  // État : fin du quiz (affiche le résultat)
  const [result, setResult] = useState(false);

  // Références aux options HTML pour appliquer des classes CSS dynamiquement
  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);
  const option_array = [Option1, Option2, Option3, Option4];

  /**
   * Démarre le quiz avec un niveau de difficulté donné
   * @param {string} level - "easy", "medium" ou "hard"
   */
  const startQuiz = (level) => {
    // Filtre les questions par difficulté
    const filtered = data.filter(q => q.difficulty === level);
    
    // On limite à 10 questions par niveau (ajustable)
    const selectedQuestions = filtered.slice(0, 10);
    
    // Mise à jour des états
    setQuestions(selectedQuestions);
    setSelectedDifficulty(level);
    setIndex(0);
    setScore(0);
    setResult(false);
    setTimeLeft(10); // Réinitialise le timer
  };

  /**
   * Réinitialise complètement le quiz (retour à l’écran de choix)
   */
  const reset = () => {
    setSelectedDifficulty(null);
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  /**
   * Effet : gère le décompte du timer toutes les secondes
   * S’arrête si le quiz est terminé, verrouillé ou s’il n’y a plus de questions
   */
  useEffect(() => {
    if (result || lock || questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeOut(); // Temps écoulé → mauvaise réponse
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Nettoyage de l’intervalle à chaque changement
    return () => clearInterval(timer);
  }, [timeLeft, lock, result, questions.length]);

  /**
   * Gère le cas où le temps s’écoule
   * - Affiche la bonne réponse en vert
   * - Passe à la question suivante après 1 seconde
   */
  const handleTimeOut = () => {
    setLock(true);
    const currentQ = questions[index];
    // Met en surbrillance la bonne réponse
    if (option_array[currentQ.ans - 1]?.current) {
      option_array[currentQ.ans - 1].current.classList.add("correct");
    }
    setTimeout(nextQuestion, 1000);
  };

  /**
   * Passe à la question suivante ou termine le quiz
   */
  const nextQuestion = () => {
    if (index < questions.length - 1) {
      // Prochaine question
      setIndex(prev => prev + 1);
      setLock(false);
      setTimeLeft(10);
      // Nettoie les classes CSS des anciennes réponses
      option_array.forEach(opt => {
        if (opt.current) {
          opt.current.classList.remove("correct", "wrong");
        }
      });
    } else {
      // Fin du quiz
      setResult(true);
    }
  };

  /**
   * Vérifie la réponse cliquée par l’utilisateur
   * @param {Event} e - Événement de clic
   * @param {number} ans - Numéro de l’option choisie (1 à 4)
   */
  const checkAns = (e, ans) => {
    if (lock || result || questions.length === 0) return;

    setLock(true);
    const currentQ = questions[index];
    const isCorrect = currentQ.ans === ans;
    const timeUsed = 10 - timeLeft; // Temps utilisé en secondes

    // Calcul du bonus de rapidité
    let bonus = 0;
    if (timeUsed <= 3) bonus = 2;     // Très rapide
    else if (timeUsed <= 6) bonus = 1; // Rapide

    if (isCorrect) {
      e.target.classList.add("correct");
      setScore(prev => prev + 1 + bonus); // +1 pour bonne réponse + bonus
    } else {
      e.target.classList.add("wrong");
      // Affiche la bonne réponse
      if (option_array[currentQ.ans - 1]?.current) {
        option_array[currentQ.ans - 1].current.classList.add("correct");
      }
    }

    // Passe à la question suivante après une courte pause
    setTimeout(nextQuestion, 1000);
  };

  /**
   * Retourne un message personnalisé selon le score final
   * Adapté au nombre total de questions (pas toujours 30 !)
   */
  const getFinalMessage = () => {
    const max = questions.length;
    if (score >= Math.ceil(0.7 * max)) return "Tu es un Super Saiyan Légendaire ! 💥";
    if (score >= Math.ceil(0.35 * max)) return "Tu mérites une capsule de Saiyan ! 🚀";
    return "Tu es un Terrien ordinaire ! 😅";
  };

  // ───────────────────────────────────────
  // AFFICHAGE CONDITIONNEL
  // ───────────────────────────────────────

  // Si aucune difficulté n’a été choisie → affiche l’écran de sélection
  if (!selectedDifficulty) {
    return (
      <div className="container">
        <h1>Quiz Dragon Ball Z</h1>
        <hr />
        <h2>Choisis ton niveau de puissance :</h2>
        <div className="difficulty-buttons">
          <button onClick={() => startQuiz('easy')}>🟢 Facile</button>
          <button onClick={() => startQuiz('medium')}>🟡 Moyen</button>
          <button onClick={() => startQuiz('hard')}>🔴 Difficile</button>
        </div>
      </div>
    );
  }

  // Question actuelle (sécurité au cas où)
  const currentQuestion = questions[index] || {};

  // Affichage du quiz ou du résultat final
  return (
    <div className="container">
      <h1>Quiz Dragon Ball Z</h1>
      <hr />
      {result ? (
        // Écran de fin
        <div className="final-result">
          <h2>You scored: {score} out of {questions.length}</h2>
          <p className="final-message">{getFinalMessage()}</p>
          <button onClick={reset}>Play Again</button>
        </div>
      ) : (
        // Écran de question
        <>
          <div className="timer">⏳ {timeLeft}s</div>
          <h2>{index + 1}. {currentQuestion.questions}</h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{currentQuestion.option1}</li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{currentQuestion.option2}</li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{currentQuestion.option3}</li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{currentQuestion.option4}</li>
          </ul>
          <div className="index">{index + 1} of {questions.length} questions</div>
        </>
      )}
    </div>
  );
}

export default Quiz;