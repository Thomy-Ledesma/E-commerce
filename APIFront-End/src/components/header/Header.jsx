import { Link, useNavigate, redirect } from "react-router-dom";
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
  const { loggedUser, setLoggedUser, productList, setFilteredProductList } =
    useContext(Context);
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
      <Navbar
        expand="lg"
        sticky="top"
        className="text-white navbar"
        data-bs-theme="dark"
      >
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
              {loggedUser ? (
                <Nav.Link as={Link} to="/uploadAlbum">
                  Subir Album
                </Nav.Link>
              ) : null}
            </Nav>
          </Navbar.Collapse>
          {loggedUser ? (
            <div className="custom-button">
              <div className="d-flex gap-2">
                <Button variant="warning" onClick={handleLogOut}>
                  Log Out
                </Button>
                <h3>{userName}</h3>
              </div>
            </div>
          ) : (
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi-bi-app-indicator"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1z" />
                  <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                </svg>
              </div>
            </div>
          )}
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
