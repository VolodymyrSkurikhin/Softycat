import React from 'react';
import { StyledList } from './OwnerList.styled';
import { StyledCard } from './Card.Styled';
import { StyledImage } from './Image.styled';
import { StyledCardContainer } from './StyledCardContainer.styled';
import { StyledTitle } from './StyledTitle.styled';

interface IItem {
  id: string;
  url: string;
  title: string;
}

interface IProps {
  owners: IItem[];
}

const OwnerList: React.FC<IProps> = ({ owners }: IProps) => {
  return (
    <StyledList>
      {owners.map(item => {
        return (
          <StyledCard key={item.id}>
            <StyledCardContainer>
              <StyledImage src={item.url} alt={item.title} width="100%" />
              <StyledTitle>{item.title}</StyledTitle>
            </StyledCardContainer>
          </StyledCard>
        );
      })}
    </StyledList>
  );
};

export default OwnerList;
