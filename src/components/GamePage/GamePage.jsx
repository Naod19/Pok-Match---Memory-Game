import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Cards from "./Cards";
import AnimatedPage from "../AnimatedPage";
import "./GamePage.css";

export default function GamePage() {
  const { setScore, bestScore, setBestScore } = useOutletContext();
  const [cards, setCards] = useState([]);
  const [clickedCardId, setClickedCardId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    const data = await response.json();

    return {
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
    };
  }

  async function fetchPokemonList() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=16");
    const data = await response.json();
    return data.results;
  }

  async function fetchAllPokemonDetails(results) {
    const promises = results.map((pokemon) => fetchPokemonDetails(pokemon.url));
    const allDetails = await Promise.all(promises);
    return allDetails;
  }

  useEffect(() => {
    const loadCards = async () => {
      try {
        setLoading(true);
        const results = await fetchPokemonList();
        const cardData = await fetchAllPokemonDetails(results);

        setCards(cardData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadCards();
  }, []);

  const shuffleCards = (cardsArray) => {
    const shuffled = [...cardsArray];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));

      [shuffled[i], shuffled[random]] = [shuffled[random], shuffled[i]];
    }

    return shuffled;
  };

  const handleCardClick = (cardId) => {
    if (!clickedCardId.includes(cardId)) {
      setClickedCardId((prevClicked) => [...prevClicked, cardId]);
      setScore((prevScore) => {
        const newScore = prevScore + 1;

        if (newScore > bestScore) {
          setBestScore(newScore);
        }
        return newScore;
      });

      setCards((prevCards) => shuffleCards(prevCards));
    } else {
      alert("Game Over!");
      setScore(0);
      setClickedCardId([]);
      setCards((prevCards) => shuffleCards(prevCards));
    }
  };

  return (
    <AnimatedPage>
      {!error ? (
        <div className="game-container">
          <h3>
            Click a card to earn a point, game ends if you click the same cards
            twice
          </h3>
          <div className="card-grid">
            <Cards data={cards} isLoading={loading} onClick={handleCardClick} />
          </div>
        </div>
      ) : (
        <p className="err-message">Error: {error}. Refresh to retry</p>
      )}
    </AnimatedPage>
  );
}
