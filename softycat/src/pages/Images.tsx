import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllImages } from '../Service/axiosFns';
import { useUser } from '../components/userContext';
import { Container, StyledList, StyledCard, StyledCardContainer, StyledTitle, StyledImgContainer, Image } from '../components/cards';
import { Modal } from '../components/Modal/Modal';

interface IImage {
  _id: string,
  cat: { _id: string, name: string },
  catDetailedImageURL: string
}

export const Images: React.FC = () => {
  const [images, setImages] = useState<IImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { ownerId, catId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(0);
  const { name, token, _id, logOut } = useUser();
  const closeOpenModal = () => { setShowModal(prev => !prev) };
  const update = () => { setUpdating(prev => { return (prev + 1) }) };
  const onRemove = async (id: string) => {
    // eslint-disable-next-line no-restricted-globals
    const approve = confirm("You are removing cat from list. Are you sure?");
    if (!approve) {
      return;
    };
    const res = await removeCat(id);
    if (res.success === false) {
      if (res.status === 401) {
        alert("You should login first!");
        logOut();
        // localStorage.removeItem("user");
        update();
        // navigate(`/home/${ownerId}`);
        return;
      }
      alert("Something wrong. Please,try later");
      return;
    }
    // update();
    // navigate(`/home/${ownerId}`)
    // }
    // navigate(`/home/${ownerId}`);
    // return;
  };

  useEffect(() => {
    (async () => {
      if (ownerId && catId) {
        const result = await getAllImages(catId);
        if (result.success) {
          setImages(result.images)
        }
        else { setError(result.errorReason) }
      }
    })()
  }, [ownerId, catId, images, updating])
  if (!error) {
    if (images.length === 0) {
      return <>{token && _id === ownerId && <button type="button" onClick={closeOpenModal} style={{ float: "right" }}>Add image to {images[0].cat.name}'s family</button>}
        <h1>No images yet</h1>
        {token && showModal && _id === ownerId && <Modal onClose={closeOpenModal}>
          <AddCatForm updateFamily={update} />
        </Modal >}
      </>
    }
    return (<Container>
      <StyledCardContainer>
        <StyledTitle>{images[0].cat.name}</StyledTitle>
      </StyledCardContainer>
      <StyledList>
        {images.map(item => {
          return (
            <StyledCard key={item._id}>
              <StyledCardContainer>
                <StyledImgContainer>
                  <Image src={item.catImageURL} alt={item.name} width="100%" />
                </StyledImgContainer>
              </StyledCardContainer>
              {token && <button type="button" onClick={() => onRemove(item._id)} style={{ float: "right" }}>Remove</button>}
            </StyledCard>
          );
        })}
      </StyledList>
      {token && _id === ownerId && <button type="button" onClick={closeOpenModal} style={{ float: "right" }}>Add cat to {name}'s family</button>}
      {token && showModal && _id === ownerId && <Modal onClose={closeOpenModal}>
        <AddCatForm updateFamily={update} />
      </Modal>}
    </Container>
    )
  }
  return (<h1>{error}</h1>)
}