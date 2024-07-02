import { useState } from 'react';

const useReview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const purchaseAlbum = async (albumId, userId, rating, comments) => {
    setLoading(true);
    try {
      const response = await fetch('https://localhost:7051/products/addReview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: albumId, userId: userId, rating: rating, comments: comments}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return [data, loading, error, purchaseAlbum];
};

export default useReview;