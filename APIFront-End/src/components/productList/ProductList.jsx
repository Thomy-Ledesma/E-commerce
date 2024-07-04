import { useState } from "react";
import useProductsList from "../../hooks/useProductsList";
import { Button, Modal, Form } from "react-bootstrap";
import "./ProductList.css";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useProductsList(setProducts, setLoading, setError);

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch('https://localhost:7051/products/deleteProduct', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: productId }),
      });
      if (!response.ok) {
        throw new Error('Error deleting product');
      }
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      console.log("Deleted album with ID:", productId);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentProduct(null);
  };

  const handleSaveChanges = () => {
    console.log("Saving changes for:", currentProduct);
    handleCloseModal();
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <div className="products-list">
        {products.map((product) => (
          <div key={product.id} className="admin-product-item">
            <h3>{product.name}</h3>
            <p>Band: {product.band}</p>
            <p>Price: ${product.price}</p>
            <p>Amount: {product.amount}</p>
            <Button variant="warning" onClick={() => handleEdit(product)}>
              Edit
            </Button>
            <Button variant="warning" onClick={() => handleDelete(product.id)}>
              Delete
            </Button>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentProduct && (
            <Form>
              <Form.Group controlId="formProductName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={String(currentProduct.name)}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formProductBand">
                <Form.Label>Band</Form.Label>
                <Form.Control
                  type="text"
                  value={String(currentProduct.band)}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      band: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formProductPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={String(currentProduct.price)}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      price: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formProductAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={String(currentProduct.amount)}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      amount: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="warning" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductsList;
