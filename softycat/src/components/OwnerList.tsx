import React from 'react';

interface IItem {
  id: string;
  title: string;
}

interface IProps {
  owners: IItem[];
}

const OwnerList: React.FC<IProps> = ({ owners }) => {
  return (
    <ul>
      {owners.map(item => {
        return (
          <li key={item.id}>
            <div>{item.title}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default OwnerList;
