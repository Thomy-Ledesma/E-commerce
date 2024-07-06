import { useContext, useState } from "react";
import { Card, Button, Row, Col, Modal } from "react-bootstrap";
import { CartContext } from "./CartContext";
import { Context } from "../../context";
import usePurchaseAlbums from "../../hooks/usePurchaseAlbum";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { loggedUser } = useContext(Context);
  const [data, loading, error, purchaseAlbums] = usePurchaseAlbums();
  const [showCashModal, setShowCashModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);

  const totalAmount = cart.reduce(
    (sum, album) => sum + album.price * album.amount,
    0
  );

  const handlePurchase = async (cashMethod) => {
    const albumIds = cart.map((album) => album.id);
    const userId = loggedUser.id;
    console.log("Album IDs:", albumIds);
    console.log("User ID:", userId);

    await purchaseAlbums(albumIds, userId);

    if (!error) {
      if (cashMethod) {
        setShowCashModal(true);
      } else {
        setShowTransferModal(true);
      }
    }
  };

  const handleCloseCashModal = () => {
    setShowCashModal(false);
    clearCart();
  };

  const handleCloseTransferModal = () => {
    setShowTransferModal(false);
    clearCart();
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
          </div>
          {error && <p className="text-danger">Error: {error}</p>}
          {data && <p className="text-success">Purchase successful!</p>}

          <Row className="payment-options">
            <Col>
              <h4 className="text-white">1st Option: CASH PAYMENT</h4>
              <p className="text-white">Direccion Mitre 415</p>
              <Button
                variant="primary"
                onClick={() => handlePurchase(true)}
                disabled={loading}
              >
                {loading ? "Purchasing..." : "Pay in Cash"}
              </Button>
              <Modal
                show={showCashModal}
                onHide={handleCloseCashModal}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Cash Payment Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  You can pick up your purchase from Monday to Friday from 09:00
                  to 18:00 at the address provided. Thank you!
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={handleCloseCashModal}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
            <Col>
              <h4 className="text-white">2nd Option: BANK TRANSFER</h4>
              <p className="text-white">CBU: 12344567891012345</p>
              <Button
                variant="info"
                onClick={() => handlePurchase(false)}
                disabled={loading}
              >
                {loading ? "Purchasing..." : "Pay by Transfer"}
              </Button>
              <Modal
                show={showTransferModal}
                onHide={handleCloseTransferModal}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Bank Transfer Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Please send the payment confirmation to
                  discomaniacos@gmail.com. We will confirm your payment by
                  email. Thank you!
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={handleCloseTransferModal}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Cart;