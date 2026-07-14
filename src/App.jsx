import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Link,
  useLocation,
} from "react-router-dom";
import StartPage from "./components/StartPage/StartPage";
import GamePage from "./components/GamePage/GamePage";
import "./App.css";
import { HomeIcon } from "raster-react";

function AppLayout({ score, setScore, bestScore, setBestScore }) {
  const location = useLocation();

  return (
    <div className="main-container">
      <header>
        <div className="top-section">
          <div className="left-section">
            {location.pathname === "/" ? null : (
              <Link to="/" className="start-page-link">
                <HomeIcon
                  size={35}
                  color="#ffffff"
                  strokeWidth={0.85}
                  radius={0}
                />
              </Link>
            )}
          </div>
          <h1 className="logo">PokéMatch</h1>
        </div>
        <div className="bottom-section">
          <div className="score-container">
            <h3>Score: {score}</h3>
            <h3>BestScore: {bestScore}</h3>
          </div>
        </div>
      </header>
      <Outlet context={{ score, setScore, bestScore, setBestScore }} />
    </div>
  );
}

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <AppLayout
              score={score}
              setScore={setScore}
              bestScore={bestScore}
              setBestScore={setBestScore}
            />
          }
        >
          <Route path="/" element={<StartPage />} />
          <Route path="/GamePage" element={<GamePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
