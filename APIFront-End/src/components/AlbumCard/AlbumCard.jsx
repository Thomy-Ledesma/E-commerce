import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
// import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { CartContext } from "../../components/cart/CartContext";
import "./AlbumCard.css";

const AlbumCard = (props) => {
  // const { setAlbumToAdd } = useContext(CartContext);
  const navigate = useNavigate();

  const handleBuyClick = () => {
    // setAlbumToAdd(props.album);
    navigate(`/album/${props.album["id"]}`);
  };

  return (
    <Card className="album-card" style={{ width: "14rem", height: "24rem" }}>
      <Card.Img variant="top" src={`${props.album["photoURL"]}`} />
      <Card.Body>
        <Card.Title className="album-card-title">{props.album.band}</Card.Title>
        <Card.Subtitle className="album-card-title color-black">
          {props.album.name}
        </Card.Subtitle>
        <Card.Subtitle>
          {props.album["reviews"].length > 0
            ? props.album["reviews"].reduce((sum, obj) => sum + obj.rating, 0) /
              props.album["reviews"].length
            : "No reviews yet"}
        </Card.Subtitle>
        <Card.Text className="album-card-text">${props.album.price}</Card.Text>
        <Button
          className="button-buy"
          variant="warning"
          size="sm"
          onClick={handleBuyClick}
        >
          Buy
        </Button>
      </Card.Body>
    </Card>
  );
};

AlbumCard.propTypes = {
  album: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    reviews: PropTypes.array.isRequired,
    photoURL: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    band: PropTypes.string.isRequired,
  }).isRequired,
};

export default AlbumCard;
