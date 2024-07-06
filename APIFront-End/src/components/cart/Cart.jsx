import { useContext } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { CartContext } from "./CartContext";
import { Context } from "../../context";
import usePurchaseAlbums from "../../hooks/usePurchaseAlbum";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { loggedUser } = useContext(Context);
  const [data, loading, error, purchaseAlbums] = usePurchaseAlbums();

  const totalAmount = cart.reduce((sum, album) => sum + album.price * album.amount, 0);

  const handlePurchase = async () => {
    const albumIds = cart.map(album => album.id);
    const userId = loggedUser.id;
    console.log('Album IDs:', albumIds);
    console.log('User ID:', userId);
    await purchaseAlbums(albumIds, userId);
    if (!error) {
      clearCart(); // Clear the cart if the purchase is successful
    }
  };

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
          <div className="cart-actions">
            <Button variant="danger" onClick={clearCart}>
              Clear Cart
            </Button>
            <Button variant="success" onClick={handlePurchase} disabled={loading}>
              {loading ? 'Purchasing...' : 'Purchase'}
            </Button>
          </div>
          {error && <p className="text-danger">Error: {error}</p>}
          {data && <p className="text-success">Purchase successful!</p>}
        </>
      )}
    </div>
  );
};

export default Cart;