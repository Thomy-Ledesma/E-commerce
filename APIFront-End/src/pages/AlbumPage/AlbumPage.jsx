import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const URL = "https://localhost:7051/products/GetAlbum?id=";

function AlbumPage() {
  const params = useParams();
  const [albumInfo, setAlbumInfo] = useState({}); // Initialized as an object

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL + params.albumId)
        .then(response => response.json());
      setAlbumInfo(result[0]);
      console.log(result);
    };
    fetchData();
  }, [params.albumId]); // Adding params.albumId to the dependency array

  return (
    <div>
      <h1>{albumInfo.name}</h1>
      <h2>${albumInfo.price}</h2>
    </div>
  );
}

export default AlbumPage;
