import React from 'react';
import { StyledList } from './OwnerList.styled';

interface IItem {
  id: string;
  url: string;
  title: string;
}

interface IProps {
  owners: IItem[];
}

const OwnerList: React.FC<IProps> = ({ owners }) => {
  return (
    <StyledList>
      {owners.map(item => {
        return (
          <li key={item.id}>
            <div>{item.title}</div>
          </li>
        );
      })}
    </StyledList>
  );
};

export default OwnerList;
