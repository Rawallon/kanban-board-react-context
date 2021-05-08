import React from 'react';
import Column from '../components/Column';

export default function Board() {
  return (
    <div style={{ display: 'inline-flex' }}>
      {Array(3)
        .fill()
        .map((_, index) => (
          <Column
            key={index + 1}
            title={'List ' + (index + 1)}
            id={index + 1}
          />
        ))}
    </div>
  );
}
