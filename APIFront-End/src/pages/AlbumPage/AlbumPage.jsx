import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./AlbumPage.css";
import Button from 'react-bootstrap/Button';
import { Context } from '../../context';
import usePurchaseAlbum from '../../hooks/usePurchaseAlbum';

const URL = "https://localhost:7051/products/GetAlbum?id=";

function AlbumPage() {
  const navigate = useNavigate();
  const { loggedUser } = useContext(Context);
  const params = useParams();
  const [albumInfo, setAlbumInfo] = useState({
    tracklist: [],
    reviews: []
  });

  const [purchaseData, loading, purchaseError, purchaseAlbum] = usePurchaseAlbum();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL + params.albumId)
        .then(response => response.json());
      setAlbumInfo(result[0]);
      console.log(result);
    };
    fetchData();
  }, [params.albumId]);

  const handlePurchase = () => {
    if (!loggedUser) {
      navigate("/login");
    } else {
      purchaseAlbum(albumInfo.id, loggedUser.id);
    }
  };

  const listatemas = albumInfo.tracklist.map((track, index) => <li key={index}>{track}</li>);
  const rating = albumInfo.reviews.length > 0 ? albumInfo.reviews.reduce((sum, obj) => sum + obj.rating, 0) / albumInfo.reviews.length : "No reviews yet";

  return (
    <>
      <div className='product-container row'>
        <div className='product'>
          <div className='col-5' style={{ margin: '2em' }}>
            <img src={albumInfo.photoURL} alt="" className='album-cover' />
            <h1>{albumInfo.name}</h1>
            <h2>{albumInfo.band}</h2>
          </div>
          <div className='col-7'>
            <div className='tracklist'>
              <h2>Tracks:</h2>
              <ol>{listatemas}</ol>
            </div>
            <h2 className='rating'>{rating}</h2>
            <h2>${albumInfo.price}</h2>
            <Button 
              className='custom-button' 
              variant="warning" 
              onClick={handlePurchase}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Buy'}
            </Button>
            {purchaseError && <p className="text-danger">{purchaseError}</p>}
            {purchaseData && <p className="text-success">Purchase successful!</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default AlbumPage;