/* eslint-disable import/no-anonymous-default-export */
export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'MOVE_CARD':
      var cIndex = state.findIndex((c) => c.id === payload.cardId);
      var insertIndex;
      if (payload.closestId) {
        insertIndex = state.findIndex((c) => c.id === payload.closestId);
        insertIndex = insertIndex > 1 ? insertIndex - 1 : insertIndex;
      } else {
        insertIndex = state.length - 1;
      }
      var newCards = Array.from(state);
      const cCard = newCards.splice(cIndex, 1)[0];
      cCard.list = payload.toId;
      newCards.splice(Number(insertIndex), 0, cCard);
      return newCards;
    default:
      return state;
  }
};
