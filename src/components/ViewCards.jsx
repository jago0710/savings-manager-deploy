import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/database";
import CardBank from "./CardBank";

export default function ViewCards({ email }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const q = query(collection(db, "ACCOUNTS"), where("owners", "==", email));
      const querySnapshot = await getDocs(q);
      const cardsData = querySnapshot.docs.map(doc => doc.data());
      setCards(cardsData);
    };

    fetchCards();
  }, [email]);

  return (
    <div className="flex flex-wrap gap-4">
      {cards.map((card, index) => (
        <CardBank key={index} number={card.number} />
      ))}
    </div>
  );
};
