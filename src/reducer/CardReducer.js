/* eslint-disable import/no-anonymous-default-export */
export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'MOVE_CARD':
      // Finds current dropped card index
      var cIndex = state.findIndex((c) => c.id === payload.cardId);
      var insertIndex;
      // If closest element is provided
      if (payload.closestId) {
        // Get its index
        insertIndex = state.findIndex((c) => c.id === payload.closestId);
        // If isn't the first elemnt subtracts one
        insertIndex = insertIndex > 1 ? insertIndex - 1 : insertIndex;
      } else {
        // if there isn't any element close then gets last possible index
        insertIndex = state.length;
      }
      // Copies current state
      var newCards = Array.from(state);
      // removes dropped card from array
      const cCard = newCards.splice(cIndex, 1)[0];
      // Assigns to new list (regardless if it was moved)
      cCard.list = payload.toId;
      // Add droped card after insertIndex (implicit "+ 1")
      newCards.splice(Number(insertIndex), 0, cCard);
      // return updated state
      return newCards;
    default:
      return state;
  }
};
