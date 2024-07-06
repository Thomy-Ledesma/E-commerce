import { useState } from 'react';

const usePurchaseAlbums = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const purchaseAlbums = async (albumIds, userId) => {
    setLoading(true);
    try {
      const response = await fetch('https://localhost:7051/users/purchaseAlbums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ProductIds: albumIds, UserId: userId }),
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

  return [data, loading, error, purchaseAlbums];
};

export default usePurchaseAlbums;