import { Link } from "react-router-dom";
import "./Header.css";
import { useContext, useState } from "react";
import { Context } from "../../context";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
  const { loggedUser, productList, setFilteredProductList } =
    useContext(Context);
  const userName = loggedUser?.name || "Guest";
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      album.category.includes(category.toLowerCase())
    );
    setFilteredProductList(filtered);
  };

  return (
    <div className="container">
      <Navbar expand="lg" className="bg-black text-white" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand
            as={Link}
            to="/"
            onClick={() => setFilteredProductList(productList)}
          >
            <img
              src="public/src/logo-discomaniacos.jpeg"
              alt="Logo"
              height="100"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavDropdown title="Categorias" id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={() => handleCategory("electronica")}>
                  Electrónica
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleCategory("hip-hop")}>
                  Hip Hop
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleCategory("pop")}>
                  Pop
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleCategory("rock")}>
                  Rock
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleCategory("otros")}>
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
              <Nav.Link as={Link} to="/uploadAlbum">
                Subir Album
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className="custom-button">
            <div className="d-flex gap-2">
              <Button
                as={Link}
                to="/Login"
                variant="warning"
                className="custom-button"
              >
                Login
              </Button>
              <Button
                as={Link}
                to="/Registrarse"
                variant="warning"
                className="custom-button"
              >
                Registrarse
              </Button>
              <h3>{userName}</h3>
            </div>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
