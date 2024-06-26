import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllImages, removeCat } from '../Service/axiosFns';
import { useUser } from '../components/userContext';
import { Container, StyledList, StyledCard, StyledCardContainer, StyledTitle, StyledImgContainer, Image } from '../components/cards';
import { Modal } from '../components/Modal/Modal';
import { AddImageForm } from '../components/forms/AddImageForm';

interface IImage {
  _id: string,
  cat: { _id: string, name: string },
  catDetailedImageURL: string
}

export const Images: React.FC = () => {
  const [images, setImages] = useState<IImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { ownerId, catId } = useParams() as { ownerId: string, catId: string };
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(0);
  const { token, _id, logOut } = useUser();
  console.log("Images", catId);
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
  }, [ownerId, catId, updating])
  const closeOpenModal = () => { setShowModal(prev => !prev) };
  const update = () => { setUpdating(prev => { return (prev + 1) }) };
  const onRemove = async (id: string) => {
    // eslint-disable-next-line no-restricted-globals
    const approve = confirm("You are removing cat from list. Are you sure?");
    if (!approve) {
      return;
    };
    const res = await removeCat("image", id);
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
    update();
    // navigate(`/home/${ownerId}`)
    // }
    // navigate(`/home/${ownerId}`);
    // return;
  };


  if (!error) {
    if (images.length === 0) {
      return <>{token && _id === ownerId && <button type="button" onClick={closeOpenModal} style={{ float: "right" }}>Add image</button>}
        <h1>No images yet</h1>
        {token && showModal && _id === ownerId && <Modal onClose={closeOpenModal}>
          <AddImageForm updateImages={update} catId={catId} />
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
                  <Image src={item.catDetailedImageURL} alt={item.cat.name} width="100%" />
                </StyledImgContainer>
              </StyledCardContainer>
              {token && _id === ownerId && <button type="button" onClick={() => onRemove(item._id)} style={{ float: "right" }}>Remove</button>}
            </StyledCard>
          );
        })}
      </StyledList>
      {token && _id === ownerId && <button type="button" onClick={closeOpenModal} style={{ float: "right" }}>Add image of {images[0].cat.name}</button>}
      {token && showModal && _id === ownerId && <Modal onClose={closeOpenModal}>
        <AddImageForm updateImages={update} catId={catId} />
      </Modal>}
    </Container>
    )
  }
  return (<h1>{error}</h1>)
}