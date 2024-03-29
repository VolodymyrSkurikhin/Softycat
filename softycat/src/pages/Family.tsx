import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, StyledList, StyledCard, StyledCardContainer, StyledTitle, StyledImgContainer, Image } from '../components/cards';
import { LinkToFamily } from '../components/common/Common.styled';
import { getAllCats, removeCat } from '../Service/axiosFns';
import { Modal } from '../components/Modal/Modal';
import { useUser } from '../components/userContext';
import { AddCatForm } from '../components/forms/AddCatForm';



interface ICat {
  _id: string,
  catImageURL: string,
  name: string,
  birthday: string,
  breed: string,
  forSale: boolean
}


export const Family: React.FC = () => {
  const [cats, setCats] = useState<ICat[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(0);
  const { name, token } = useUser();
  const { ownerId } = useParams();
  const navigate = useNavigate();
  const { logOut } = useUser();
  const closeOpenModal = () => { setShowModal(prev => !prev) };
  const update = () => { setUpdating(prev => { return (prev + 1) }) };
  const onRemove = async (id: string) => {
    // eslint-disable-next-line no-restricted-globals
    const approve = confirm("You are removing cat from list. Are you sure?");
    if (approve) {
      const res = await removeCat(id);
      if (res.response.status === 401) {
        alert("You should login first!");
        logOut();
        navigate(`/home/${ownerId}`);
        return;
      }
      update();
      navigate(`/home/${ownerId}`)
    }
    return;
  };
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
  }, [ownerId, updating]);
  if (!error) {
    if (cats.length === 0) {
      return <>{token && <button type="button" onClick={closeOpenModal} style={{ float: "right" }}>Add cat to {name}'s family</button>}
        <h1>No cats yet</h1>
        {token && showModal && <Modal onClose={closeOpenModal}>
          <AddCatForm updateFamily={update} />
        </Modal >}
      </>
    }
    return (<Container>
      <StyledList>
        {cats.map(item => {
          return (
            <StyledCard key={item._id}>
              <LinkToFamily to={`${item._id}`}>
                <StyledCardContainer>
                  <StyledImgContainer>
                    <Image src={item.catImageURL} alt={item.name} width="100%" />
                  </StyledImgContainer>
                  <StyledTitle>{item.name}</StyledTitle>
                  <StyledTitle>{item.breed}</StyledTitle>
                  <StyledTitle>{item.birthday}</StyledTitle>
                  <StyledTitle>{item.forSale}</StyledTitle>
                  {token && <button type="button" onClick={() => onRemove(item._id)} style={{ float: "right" }}>Remove</button>}
                </StyledCardContainer>
              </LinkToFamily>
            </StyledCard>
          );
        })}
      </StyledList>
      {token && <button type="button" onClick={closeOpenModal} style={{ float: "right" }}>Add cat to {name}'s family</button>}
      {token && showModal && <Modal onClose={closeOpenModal}>
        <AddCatForm updateFamily={update} />
      </Modal>}
    </Container>
    )
  }
  return (<h1>{error}</h1>)
}