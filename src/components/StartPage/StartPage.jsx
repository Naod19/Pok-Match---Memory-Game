import "./StartPage.css";
import { Link } from "react-router-dom";
import AnimatedPage from "../AnimatedPage";
export default function StartPage() {
  return (
    <AnimatedPage>
      <div className="start-container">
        <h1 className="start-logo">Memory Card Game</h1>
        <div className="start-btns">
          <button className="start-btn">
            <Link to="/GamePage" className="start-btn">
              Start
            </Link>
          </button>

          {/* <button>See Highest Score</button> */}
        </div>
      </div>
    </AnimatedPage>
  );
}
