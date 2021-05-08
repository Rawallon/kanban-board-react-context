import { createContext, useContext, useReducer } from 'react';
import CardReducer from '../reducer/CardReducer';

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
  const [cardReducer, cardDispatch] = useReducer(
    CardReducer,
    cardsInitialState,
  );

  function moveCard(cardId, toId, closestId) {
    cardDispatch({
      type: 'MOVE_CARD',
      payload: { cardId, toId, closestId },
    });
  }

  return (
    <CardsContext.Provider
      value={{
        currentCards: cardReducer,
        moveCard,
      }}>
      {children}
    </CardsContext.Provider>
  );
}

export const useCards = () => {
  return useContext(CardsContext);
};
