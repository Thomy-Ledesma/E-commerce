import PropTypes from "prop-types";


const ProductItem = ({name, description, reviews, photoURL, category, price}) => {

  const renderReviews = (reviews) => {
    return reviews.map((review, index) => <p key={index}>{review}</p>);
  };


  return (
    <div className="product-item">
      <img src={photoURL} alt={`$name`}/>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>{category}</p>
      <p>{price}</p>
      <div className="reviews-list">
        <h3 className="reviews-encabezado">Reviews</h3>
        {renderReviews(reviews)}
      </div>


    </div>
  )
}

ProductItem.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  reviews: PropTypes.array,
  category: PropTypes.string,
  photoURL: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.number,
};


export default ProductItem