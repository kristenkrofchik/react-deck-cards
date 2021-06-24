import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";

const CardDeck = () => {
    const [deck, setDeck] = useState(null);
    //use state to keep track of the cards that have been drawn
    const [drawn, setDrawn] = useState([]); 
    const [autoDraw, setAutoDraw] = useState(false);
    const timerRef = useRef(null);
    
    //fetch deck data from API and load into state
    useEffect(() => {
        async function loadDeck() {
          let res = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
          setDeck(res.data);
        }
        loadDeck();
      }, [setDeck])
    
    //pick a card from the deck (using the deck_id)
    //draw a card every second if auto-draw functionality is toggled on
    useEffect(() => {
        async function drawCard() {
            let { deck_id } = deck;

            try {
                let drawRes = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);

                //throw an error if there are no cards left in the deck
                if(drawRes.data.remaining === 0) {
                    setAutoDraw(false);
                    throw new Error('Error: no cards remaining!');
                }
                
                //add card and its data to the drawn array
                const card = drawRes.data.cards[0];

                setDrawn(d => [
                    ...d,
                    {
                    id: card.code,
                    name: card.suit + " " + card.value,
                    image: card.image
                    }
                ]);
            } catch (e) {
                alert(e)
            };
        };

        if (autoDraw && !timerRef.current) {
            timerRef.current = setInterval(async () => {
              await drawCard();
            }, 1000);
          }
    }, [autoDraw, setAutoDraw, deck]);

    const toggleAutoDraw = () => {
        setAutoDraw(auto => !auto);
      };

    const cards = drawn.map(c => (
        <Card key={c.id} name={c.name} image={c.image} />
      ));

    return (
        <div className="Deck">
          {deck ? (
            <button className="Deck-gimme" onClick={toggleAutoDraw}>
              {autoDraw ? "STOP" : "KEEP"} DRAWING FOR ME!
            </button>
          ) : null}
          <div className="Deck-cardarea">{cards}</div>
        </div>
      );
}

export default CardDeck;