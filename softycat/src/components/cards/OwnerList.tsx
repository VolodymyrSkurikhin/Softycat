import React from 'react';
import { StyledList, StyledCard, StyledCardContainer, StyledTitle, StyledImgContainer, Image } from '../cards';
// import { StyledCard } from './StyledCard.styled';
// import { StyledImage } from './Image.styled';
// import { StyledCardContainer } from './StyledCardContainer.styled';
// import { StyledTitle } from './StyledTitle.styled';
// import { StyledImgContainer } from './StyledImgContainer.styled';
// import { Image } from './Image';

interface IItem {
  id: string;
  url?: string;
  title: string;
}

interface IProps {
  owners: IItem[];
}

export const OwnerList: React.FC<IProps> = ({ owners }: IProps) => {
  return (
    <StyledList>
      {owners.map(item => {
        return (
          <StyledCard key={item.id}>
            <StyledCardContainer>
              <StyledImgContainer>
                <Image src={item.url} alt={item.title} width="100%" />
              </StyledImgContainer>
              <StyledTitle>{item.title}</StyledTitle>
            </StyledCardContainer>
          </StyledCard>
        );
      })}
    </StyledList>
  );
};

// export default OwnerList;
