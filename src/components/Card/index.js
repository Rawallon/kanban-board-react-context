import React from 'react';
import styles from './card.module.css';

export default function Card({ id, children }) {
  const dragStart = (e) => {
    const target = e.target;
    // Saves the node id using dataTransfer
    e.dataTransfer.setData('card_id', target.id);
    // This style will be applied to the dragged node
    target.style = `background: red;`;
    setTimeout(() => {
      // This style is applied to the non-dragged node
      target.style = `background: yellow;`;
    }, 0);
  };

  const dragEnd = (e) => {
    // Removes the applied style on dragStart
    e.target.style = null;
  };

  const onDragOver = (e) => {
    // Avoids a card being dropped on current node
    e.stopPropagation();
  };

  return (
    <div
      className={styles.body}
      id={id}
      onDragStart={dragStart}
      onDragOver={onDragOver}
      onDragEnd={dragEnd}
      draggable="true">
      {children}
    </div>
  );
}
