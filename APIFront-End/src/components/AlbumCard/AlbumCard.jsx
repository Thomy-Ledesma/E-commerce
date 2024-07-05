import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./AlbumCard.css";

const AlbumCard = (props) => {
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
        <Button className="button-buy" variant="warning" size="sm">
          <Link to={`/album/${props.album["id"]}`}>Buy</Link>
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

/* 
version anterior sin Card de react-bootstrap

<div key={props.album["id"]} className="">
<img src={`Covers/${props.album["photoURL"]}`} height={220} width={220}/> 
<h2>{props.album["name"]}</h2>
<h3>${props.album["price"]}</h3>
<h3>rating: {props.album["reviews"].length > 0 ? props.album["reviews"].reduce((sum, obj) => sum + obj.rating, 0) / props.album["reviews"].length : "No reviews yet"}</h3>
</div>
*/
