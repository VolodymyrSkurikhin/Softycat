import React, { useState, useEffect } from 'react';
import { Container, StyledList, StyledCard, StyledCardContainer, StyledTitle, StyledImgContainer, Image } from '../components/cards';
import { LinkToFamily } from '../components/common/Common.styled';
import { getAllCats } from '../Service/axiosFns';
import { useParams } from 'react-router-dom';

interface ICat {
  _id: string,
  imageURL: string,
  name: string,
  birthday: string,
  breed: string,
  forSale: boolean
}


export const Family: React.FC = () => {
  const [cats, setCats] = useState<ICat[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { ownerId } = useParams();
  useEffect(() => {
    (async () => {
      if (ownerId) {
        const result = await getAllCats(ownerId);
        if (result.success) {
          setCats(result.cats)
        }
        else { setError(result.errorReason) }
      }
    })()
  }, [ownerId]);
  if (!error) {
    if (cats.length === 0) { return <h1>No cats yet</h1> }
    return (<Container>
      <StyledList>
        {cats.map(item => {
          return (
            <StyledCard key={item._id}>
              <LinkToFamily to={`${item._id}`}>
                <StyledCardContainer>
                  <StyledImgContainer>
                    <Image src={item.imageURL} alt={item.name} width="100%" />
                  </StyledImgContainer>
                  <StyledTitle>{item.name}</StyledTitle>
                  <StyledTitle>{item.breed}</StyledTitle>
                  <StyledTitle>{item.birthday}</StyledTitle>
                  <StyledTitle>{item.forSale}</StyledTitle>
                </StyledCardContainer>
              </LinkToFamily>
            </StyledCard>
          );
        })}
      </StyledList>
    </Container>)

  }
  return (<h1>{error}</h1>)
}