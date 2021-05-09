import { createContext, useContext, useState } from 'react';

const cardsInitialState = [
  {
    id: '1-card',
    name: 'Text 1',
    list: '1',
  },
  {
    id: '2-card',
    name: 'Text 2',
    list: '2',
  },
  {
    id: '3-card',
    name: 'Text 3',
    list: '1',
  },
  {
    id: '4-card',
    name: 'Text 4',
    list: '1',
  },
];

export const CardsContext = createContext({});

export function CardsContextProvider({ children }) {
  const [currentCards, setCurrentCards] = useState(cardsInitialState);

  function moveCard(cardId, toId, closestId) {
    // Finds current dropped card index
    var cIndex = currentCards.findIndex((c) => c.id === cardId);
    var insertIndex;
    // If closest element is provided
    if (closestId) {
      // Get its index
      insertIndex = currentCards.findIndex((c) => c.id === closestId);
      // If isn't the first elemnt subtracts one
      insertIndex = insertIndex > 1 ? insertIndex - 1 : insertIndex;
    } else {
      // if there isn't any element close then gets last possible index
      insertIndex = currentCards.length;
    }
    // Copies current state
    var newCards = Array.from(currentCards);
    // removes dropped card from array
    const cCard = newCards.splice(cIndex, 1)[0];
    // Assigns to new list (regardless if it was moved)
    cCard.list = toId;
    // Add droped card after insertIndex (implicit "+ 1")
    newCards.splice(Number(insertIndex), 0, cCard);
    setCurrentCards(newCards);
  }
  return (
    <CardsContext.Provider
      value={{
        currentCards,
        moveCard,
      }}>
      {children}
    </CardsContext.Provider>
  );
}

export const useCards = () => {
  return useContext(CardsContext);
};
