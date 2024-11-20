import "../../styles/quotes.css";
import { quotes } from "./quotelist";

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

function Quoteoftheday() {
  const randomQuote = getRandomQuote();

  return (
    <div className="quote_container">
      <h3 className="quote_heading">Random Quotes</h3>
      <h4 className="quote_text">
        <em>&quot;{randomQuote.quote}&quot;</em>
      </h4>
      <p className="quote_author">- {randomQuote.author}</p>
    </div>
  );
}

export default Quoteoftheday;
