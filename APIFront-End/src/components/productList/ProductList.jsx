import { useState } from "react";
import useProductsList from "../../hooks/useProductsList";
import { Button, Modal, Form } from "react-bootstrap";
import "./ProductList.css";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: "",
    name: "",
    band: "",
    price: 0,
    amount: 0
  });

  useProductsList(setProducts, setLoading, setError);

  const handleEdit = (product) => {
  setCurrentProduct({
    id: product.id,
    name: product.name || "",
    band: product.band || "",
    price: product.price || 0,
    amount: product.amount || 0,
    // Add other fields as necessary
  });
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
      console.log("Deleted product with ID:", productId);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentProduct({
      id: "",
      name: "",
      band: "",
      price: 0,
      amount: 0
    });
  };

  const handleSaveChanges = async () => {
    try {
      console.log("Saving changes for:", currentProduct);
  
      if (!currentProduct || !currentProduct.id) {
        throw new Error('Invalid product data');
      }
  
      const response = await fetch('https://localhost:7051/products/updateProduct', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentProduct),
      });
  
      console.log("Response status:", response.status);
      const responseBody = await response.text();
      console.log("Response body:", responseBody);
  
      if (!response.ok) {
        throw new Error('Error updating product');
      }
  
      const updatedProduct = JSON.parse(responseBody).product;
      console.log("Updated product response:", updatedProduct);
  
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === currentProduct.id ? updatedProduct : product
        )
      );
  
      handleCloseModal();
      console.log("Updated product with ID:", currentProduct.id);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: name === "price" || name === "amount" ? parseFloat(value) : value,
    });
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
            <Button variant="danger" onClick={() => handleDelete(product.id)}>
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
          <Form>
            <Form.Group controlId="formProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentProduct.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductBand">
              <Form.Label>Band</Form.Label>
              <Form.Control
                type="text"
                name="band"
                value={currentProduct.band}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={currentProduct.price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={currentProduct.amount}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
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