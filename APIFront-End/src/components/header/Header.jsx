import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useContext, useState } from "react";
import { Context } from "../../context";
import { CartContext } from "../../components/cart/CartContext";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
  const { loggedUser, setLoggedUser, productList, setFilteredProductList } = useContext(Context);
  const { cart } = useContext(CartContext);
  const userName = loggedUser?.name || "";
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate("/");
    if (searchTerm !== "") {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = productList.filter(
        (album) =>
          album.name.toLowerCase().includes(lowercasedSearchTerm) ||
          album.band.toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredProductList(filtered);
    }
  };

  const handleCategory = (category) => {
    const filtered = productList.filter((album) =>
      album.category.includes(category)
    );
    setFilteredProductList(filtered);
  };

  const handleLogOut = () => {
    setLoggedUser(null);
    sessionStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="container">
      <Navbar expand="lg" sticky="top" className="text-white navbar" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" onClick={() => setFilteredProductList(productList)}>
            <img src="public/src/logo-discomaniacos.jpeg" alt="Logo" height="100" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
              <NavDropdown title="Categorias" id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={() => handleCategory("Electronica")}>
                  Electrónica
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleCategory("Hip Hop")}>
                  Hip Hop
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleCategory("Pop")}>
                  Pop
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleCategory("Rock")}>
                  Rock
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleCategory("Otros")}>
                  Otros
                </NavDropdown.Item>
              </NavDropdown>
              <Form className="d-flex" onSubmit={handleSubmit}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="warning" type="submit">
                  Search
                </Button>
              </Form>
            </Nav>
          </Navbar.Collapse>
          <Button
            as={Link}
            to="/cart"
            variant="warning"
            className="custom-button-cart"
            style={{ paddingRight: "20px" }}
          >
            Cart ({cart.length})
          </Button>
          {loggedUser ? (
            <div className="custom-button">
              <div className="d-flex gap-2">
                <Button variant="warning" onClick={handleLogOut}>
                  Log Out
                </Button>
                {(loggedUser.userType === 2 || loggedUser.userType === 1) && (
                  <Button
                  as={Link}
                  to="/adminPage"
                  variant="warning"
                  className="custom-button-cart"
                  style={{ paddingRight: "20px" }}
                >
                  Admin
                </Button>
                )}
                <h3>{userName}</h3>
              </div>
            </div>
          ) : (
            <div className="custom-button">
              <div className="d-flex gap-2">
                <Button as={Link} to="/Login" variant="warning" className="custom-button">
                  Login
                </Button>
                <Button as={Link} to="/Registrarse" variant="warning" className="custom-button">
                  Registrarse
                </Button>
              </div>
            </div>
          )}
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
