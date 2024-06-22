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
  const { loggedUser, productList, setFilteredProductList } = useContext(Context);
  const userName = loggedUser?.name || "Guest";
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (searchTerm !== '') {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = productList.filter(album =>
        album.name.toLowerCase().includes(lowercasedSearchTerm) ||
        album.band.toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredProductList(filtered);
    }
  }

  return (
    <div className="container">
      <Navbar expand="lg" className="bg-black text-white" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" onClick={() => setFilteredProductList(productList)}>
            <img
              src="public\src\logo-discomaniacos.jpeg"
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
                <NavDropdown.Item as={Link} to="/categoria/rock">
                  Electrónica
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/categoria/hip-hop">
                  Hip Hop
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/categoria/hip-hop">
                  Pop
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/categoria/hip-hop">
                  Rock
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/categoria/pop">
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
                <Button variant="outline-success" type="submit">Search</Button>
              </Form>
              <Nav.Link as={Link} to="/uploadAlbum">
                Subir Album
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className="custom-button">
            <div className="d-flex gap-2">
              <Button as={Link} to="/Login" variant="outline-primary">
                Login
              </Button>
              <Button as={Link} to="/Registrarse" variant="outline-primary">
                Registrarse
              </Button>
              <h3>{userName}</h3>
            </div>
          </div>
        </Container>
      </Navbar>

      {/*
          <li>
            <Link to="/login">Sign in</Link>
          </li>
        </ul>
        <h2>{userName}</h2>
      </nav> */}
    </div>
  );
};

export default Header;
