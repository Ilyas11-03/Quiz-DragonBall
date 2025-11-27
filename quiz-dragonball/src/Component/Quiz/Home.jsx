import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="home">
      <section className="home__card" role="region" aria-label="Accueil">
        <h1 className="home__title">Quiz Dragon Ball</h1>
        <p className="home__subtitle">Teste tes connaissances sur Dragon Ball — commence le quiz et amuse-toi !</p>

        <div className="home__actions">
          <button
            className="btn btn--primary"
            onClick={() => navigate('/quiz')}
            type="button"
          >
            Commencer le quiz
          </button>

          <button
            className="btn btn--ghost"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            type="button"
          >
            En savoir plus
          </button>
        </div>

        <p className="home__meta">Bonne chance — que le meilleur gagne !</p>
      </section>
    </main>
  );
};

export default Home;