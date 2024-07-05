import { useContext } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { CartContext } from "./CartContext";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const totalAmount = cart.reduce((sum, album) => sum + album.price * album.amount, 0);

  return (
    <div className="cart-page">
      <h2 className="text-center mb-4 text-white">Cart</h2>
      {cart.length === 0 ? (
        <p className="text-white text-center">Your cart is empty</p>
      ) : (
        <>
          <Row>
            {cart.map((album) => (
              <Col key={album.id} sm={6} md={4} lg={3} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                    <Card.Subtitle>{album.band}</Card.Subtitle>
                    <Card.Text>Price: ${album.price}</Card.Text>
                    <Card.Text>Amount: {album.amount}</Card.Text>
                    <Button
                      variant="danger"
                      onClick={() => removeFromCart(album.id)}
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <h3 className="white-text">Total: ${totalAmount.toFixed(2)}</h3>
          <Button variant="danger" onClick={clearCart}>
            Clear Cart
          </Button>
        </>
      )}
    </div>
  );
};

export default Cart;
