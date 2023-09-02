// import { Container } from "../components/cards/Container.styled";
// import { OwnerList, Container } from "../components/cards";
// import list from "../Service/list.json";
import React, { useState, useEffect } from 'react';
import { Container, StyledList, StyledCard, StyledCardContainer, StyledTitle, StyledImgContainer, Image } from '../components/cards';
import { getAllUsers, IUser } from '../Service/axiosFns';


// interface IItem {
//   id: string;
//   url?: string;
//   title: string;
// }

// interface IProps {
//   owners: IItem[];
// }

// export const Home: React.FC = () => {
//   return (<Container>
//     <OwnerList owners={list} />
//   </Container>)
// }
export const Home: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      const result = await getAllUsers();
      if (result.success) {
        const visibleUsers = result.users.filter(user => user.isShown);
        setUsers(visibleUsers)
      }
      else { setError(result.errorReason) }
    })()
  });
  if (!error) {
    if (users.length === 0) { return <h1>No users yet</h1> }
    return (<Container>
      <StyledList>
        {users.map(item => {
          return (
            <StyledCard key={item._id}>
              <StyledCardContainer>
                <StyledImgContainer>
                  <Image src={item.avatarURL} alt={item.name} width="100%" />
                </StyledImgContainer>
                <StyledTitle>{item.name}</StyledTitle>
              </StyledCardContainer>
            </StyledCard>
          );
        })}
      </StyledList>
    </Container>)
  }
  return (<h1>{error}</h1>)
}
