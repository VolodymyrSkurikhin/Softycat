import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllImages } from '../Service/axiosFns';

interface IImage {
  _id: string,
  cat: string,
  catDetailedImageURL: string
}

export const Images: React.FC = () => {
  const [images, setImages] = useState<IImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { ownerId, catId } = useParams();

  useEffect(() => {
    (async () => {
      if (ownerId && catId) {
        const result = await getAllImages(catId);
        if (result.success) {
          setImages(result.cats)
        }
        else { setError(result.errorReason) }
      }
    })()
  }, [ownerId, catId])
}