import React, { useState } from 'react';

export default function FruitFilter() {
  const fruits = [
    { id: 1, name: 'Orange', type: 'Citrus' },
    { id: 2, name: 'Strawberry', type: 'Berry' },
    { id: 3, name: 'Mango', type: 'Tropical' },
    { id: 4, name: 'Lime', type: 'Citrus' },
    { id: 5, name: 'Blueberry', type: 'Berry' }
  ];

  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleCheckboxChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const filteredFruits =
    selectedTypes.length === 0
      ? fruits
      : fruits.filter(fruit => selectedTypes.includes(fruit.type));

  return (
    <div>
      <h2>Fruit Filter</h2>

      <label>
        <input
          type="checkbox"
          value="Citrus"
          onChange={() => handleCheckboxChange('Citrus')}
          checked={selectedTypes.includes('Citrus')}
        />
        Citrus
      </label>

      <label>
        <input
          type="checkbox"
          value="Berry"
          onChange={() => handleCheckboxChange('Berry')}
          checked={selectedTypes.includes('Berry')}
        />
        Berry
      </label>

      <label>
        <input
          type="checkbox"
          value="Tropical"
          onChange={() => handleCheckboxChange('Tropical')}
          checked={selectedTypes.includes('Tropical')}
        />
        Tropical
      </label>

      <ul>
        {filteredFruits.map(fruit => (
          <li key={fruit.id}>{fruit.name} ({fruit.type})</li>
        ))}
      </ul>
    </div>
  );
}
