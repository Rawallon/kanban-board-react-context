import React, { useState } from 'react';
import { useCards } from '../../context/CardContext';
import Card from '../Card';
import styles from './column.module.css';

export default function Column({ id, title }) {
  const { currentCards, moveCard } = useCards();
  const [isBegingDraggedOver, setIsBegingDraggedOver] = useState(false);

  const onDrop = (e) => {
    e.preventDefault();
    const card_id = e.dataTransfer.getData('card_id');
    if (!card_id || !e.target.id) return;
    const card = document.getElementById(card_id);
    card.style.display = 'block';
    const afterElement = getDragAfterElement(e.target, e.clientY);
    moveCard(card_id, e.target.id, afterElement?.id);
    setIsBegingDraggedOver(false);
  };

  const dragOver = (e) => {
    e.preventDefault();
    setIsBegingDraggedOver(true);
  };

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('div')];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY },
    ).element;
  }

  function toggleDraggingOver(e) {
    if (e.type === 'dragenter') {
      setIsBegingDraggedOver(true);
    }
    if (e.type === 'dragleave') {
      setIsBegingDraggedOver(false);
    }
  }

  return (
    <div
      id={id}
      onDragOver={dragOver}
      draggable={false}
      className={styles.column}>
      <div id={id} className={styles.title}>
        {title}
      </div>
      <div
        id={id}
        onDragEnter={toggleDraggingOver}
        onDragLeave={toggleDraggingOver}
        onDrop={onDrop}
        className={`${styles.droppable} ${
          isBegingDraggedOver ? styles.columnDraggingOver : ''
        }`}>
        {currentCards
          .filter((item) => item.list === String(id))
          .map((item) => (
            <Card key={item.id} id={item.id}>
              {item.name}
            </Card>
          ))}
      </div>
    </div>
  );
}
