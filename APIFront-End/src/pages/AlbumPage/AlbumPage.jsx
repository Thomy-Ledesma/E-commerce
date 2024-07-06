import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./AlbumPage.css";
import ReviewList from '../../components/reviewList/ReviewList';
import Button from 'react-bootstrap/Button';
import { Context } from '../../context';
import { CartContext } from '../../components/cart/CartContext';

const URL = "https://localhost:7051/products/GetAlbum?id=";

function AlbumPage() {
  const navigate = useNavigate();
  const { addToCart, albumToAdd, setAlbumToAdd } = useContext(CartContext);
  const { loggedUser } = useContext(Context);
  const params = useParams();
  const [albumInfo, setAlbumInfo] = useState({
    tracklist: [],
    reviews: []
  });
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL + params.albumId)
        .then(response => response.json());
      setAlbumInfo(result[0]);
      console.log(result);
    };
    fetchData();
  }, [params.albumId]);

  useEffect(() => {
    if (albumToAdd && albumToAdd.id === params.albumId) {
      addToCart(albumToAdd);
      setAlbumToAdd(null); // Clear the albumToAdd after adding to cart
    }
  }, [albumToAdd, addToCart, params.albumId, setAlbumToAdd]);

  const handlePurchase = () => {
    if (!loggedUser) {
      navigate("/login");
    } else {
      setAlbumToAdd(albumInfo);
      // purchaseAlbum(albumInfo.id, loggedUser.id); /usar en Cart
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
            <div className='rating-container' style={{ display: 'flex', alignItems: 'center' }}>
              <h2 onClick={() => setModalShow(true)} className='rating'>{rating}☆</h2>
              <ReviewList
                show={modalShow}
                onHide={() => setModalShow(false)}
                reviews={albumInfo.reviews}
              />
            </div>
            <h2>${albumInfo.price}</h2>
            <Button
              className='custom-button'
              variant="warning"
              onClick={handlePurchase}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}



export default AlbumPage;
