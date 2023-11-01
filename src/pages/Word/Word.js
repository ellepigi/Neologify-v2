import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllCards } from "../../services/CardService";
import { Link } from "react-router-dom";
import { Spinner } from "../../components/Spinner/Spinner"
import { Comments } from "../../components/Comments/Comments";

export const Word = () => {
  
  //Cards
  const { cardId } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    async function fetchCard() {
      try {
        const cards = await getAllCards();
        const selectedCard = cards.find((c) => c.id === cardId);
        setCard(selectedCard);
        console.log(selectedCard)
      } catch (error) {
        console.error("Errore nel recupero dei dati della carta:", error);
      }
    }

    fetchCard();
  }, [cardId]);

  //Comments



  return (
    <div className="min-h-screen flex flex-col items-center text-center mt-12">
    {card? (
      <div className="w-2/4 mb-16">
        <h1 className="font-bold text-xl mb-4">{card.title}</h1>
        <p className="text-sm mb-8">{card.language}</p>

        <p className="text-md italic mb-8">"{card.comment}"</p>
        <div className="tags flex justify-center gap-2">
        {card.tags &&
          card.tags.map((tag, index) => (
            <Link key={index} to={`/tag/${tag}`}>
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-300 mb-2">
                {tag}
              </span>
            </Link>
          ))}
          </div>
          <div className="comments mt-4">
          <Comments cardId={cardId} />
          </div>
      </div>


    ) : (
      <div>
         <Spinner />
      </div>
    )}
    </div>
      
  )
}
