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
    var cIndex = currentCards.findIndex((c) => c.id === cardId);
    var insertIndex;
    if (closestId) {
      insertIndex = currentCards.findIndex((c) => c.id === closestId);
      insertIndex = insertIndex > 1 ? insertIndex - 1 : insertIndex;
    } else {
      insertIndex = currentCards.length - 1;
    }
    var newCards = Array.from(currentCards);
    const cCard = newCards.splice(cIndex, 1)[0];
    cCard.list = toId;
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
