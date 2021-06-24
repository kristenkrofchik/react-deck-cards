import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";

const CardDeck = () => {
    const [deck, setDeck] = useState(null);
    
    //fetch deck data from API and load into state
    useEffect(() => {
        async function loadDeck() {
          const res = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
          setDeck(res.data);
        }
        loadDeck();
      }, [setDeck])


}

export default CardDeck;