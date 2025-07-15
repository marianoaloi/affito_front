import React from 'react';

interface ObjectListProps {
  items: object[];
}

const ObjectList: React.FC<ObjectListProps> = ({ items }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {JSON.stringify(item)}
        </li>
      ))}
    </ul>
  );
};

export default ObjectList;