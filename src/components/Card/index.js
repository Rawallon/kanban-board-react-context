import React from 'react';
import styles from './card.module.css';

export default function Card({ id, children }) {
  const dragStart = (e) => {
    const target = e.target;
    e.dataTransfer.setData('card_id', target.id);
    target.style = `background: red;`;
    setTimeout(() => {
      target.style = `background: yellow;`;
    }, 0);
  };

  const dragEnd = (e) => {
    e.target.style = null;
  };
  const onDragOver = (e) => {
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
