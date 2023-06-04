import React from 'react';
import { StyledList } from './OwnerList.styled';
import { StyledCard } from './StyledCard.styled.tsx';
import { StyledImage } from './Image.styled';
import { StyledCardContainer } from './StyledCardContainer.styled';
import { StyledTitle } from './StyledTitle.styled';
import { StyledImgContainer } from './StyledImgContainer.styled';

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
              <StyledImgContainer>
                <StyledImage src={item.url} alt={item.title} width="100%" />
              </StyledImgContainer>
              <StyledTitle>{item.title}</StyledTitle>
            </StyledCardContainer>
          </StyledCard>
        );
      })}
    </StyledList>
  );
};

export default OwnerList;
