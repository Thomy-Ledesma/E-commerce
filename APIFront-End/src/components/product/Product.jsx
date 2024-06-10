import ProductItem from "../productItem/ProductItem";
import PropTypes from "prop-types";

const Product = ({products}) => {

    products = [
        
    ]


 return (

    <div className="product-container">
        {products.length > 0 ? (
            products.map((product) => (
                <ProductItem
                key ={product.id}
                id = {product.id}
                name = {product.name}
                description={product.description}
                category={product.category}
                price={product.price}
                reviews={product.reviews}
                photoURL={product.photoURL}
                />
            ))
        ) : (
            <p>No hay productos</p>
        )}
    </div>
    
  );
};


Product.propTypes = {
    products: PropTypes.array,

  };

export default Product