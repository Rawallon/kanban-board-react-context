import React, { useState } from 'react';
import { useCards } from '../../context/CardContext';
import Card from '../Card';
import styles from './column.module.css';

export default function Column({ id, title }) {
  const { currentCards, moveCard } = useCards();
  // Only used for styling
  const [isBegingDraggedOver, setIsBegingDraggedOver] = useState(false);

  const onDrop = (e) => {
    e.preventDefault();

    // Gets the dragged card node id
    const card_id = e.dataTransfer.getData('card_id');
    // If no card id/no column id then return void
    if (!card_id || !e.target.id) return;
    // Gets nearest card
    const afterElement = getDragAfterElement(e.target, e.clientY);
    // Dispatch action
    moveCard(card_id, e.target.id, afterElement?.id);
    // Disable style
    setIsBegingDraggedOver(false);
  };

  const dragOver = (e) => {
    e.preventDefault();
    // Enable style
    setIsBegingDraggedOver(true);
  };

  function getDragAfterElement(container, y) {
    // Gets all columns child
    const draggableElements = [...container.querySelectorAll('div')];

    // Loops through it
    return draggableElements.reduce(
      (closest, child) => {
        // Gets element size
        const box = child.getBoundingClientRect();
        // Calculates dragged element offset
        //  using client mouse height - top half of element
        const offset = y - box.top - box.height;
        // Returns an node based of how close it is to the mouse
        if (offset < 0 && offset > closest.offset) {
          return child;
        } else {
          return closest;
        }
        // If there isn't anyone closeby it'll return -Infinity
      },
      { offset: Number.NEGATIVE_INFINITY },
    );
  }

  // To add styling
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
