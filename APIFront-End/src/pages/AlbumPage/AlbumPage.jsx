import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./AlbumPage.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const URL = "https://localhost:7051/products/GetAlbum?id=";

function AlbumPage() {
  const params = useParams();
  const [albumInfo, setAlbumInfo] = useState({
    tracklist: [], // Inicializando como un arreglo vacío
    reviews: {}
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL + params.albumId)
        .then(response => response.json());
      setAlbumInfo(result[0]);
      console.log(result);
    };
    fetchData();
  }, [params.albumId]); // Adding params.albumId to the dependency array

  const listatemas = albumInfo.tracklist.map((track, index) => <li key={index}>{track}</li>);
  const rating = albumInfo["reviews"].length > 0 ? albumInfo["reviews"].reduce((sum, obj) => sum + obj.rating, 0) / albumInfo["reviews"].length : "No reviews yet"
  return (
    <>
    <div className='product-container row'>
      <div className='product'>
        <div className='col-5' style={{margin:'2em'}}>
          <img src={albumInfo.photoURL} alt="" className='album-cover'/>
          <h1>{albumInfo.name}</h1>
          <h2>{albumInfo.band}</h2>
        </div>
        <div className='col-7'>
        <div className='tracklist'>
          <h2>tracks:</h2>
          <ol>{listatemas}</ol>
        </div>
        <h2 className='rating'>{rating}</h2>
        <h2>${albumInfo.price}</h2>
        <Button>Buy</Button>
        </div>
      </div>
    </div>
    </>
  );
}

export default AlbumPage;

