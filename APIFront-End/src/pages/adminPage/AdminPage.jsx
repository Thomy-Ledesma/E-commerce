import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../context";
import "./AdminPage.css";
import UserList from "../../components/userList/UserList";
import ProductsList from "../../components/productList/ProductList";
import { Button } from "react-bootstrap";

const AdminPage = () => {
  const { loggedUser } = useContext(Context);
  const [activeSection, setActiveSection] = useState("");
  const [activeUserSection, setActiveUserSection] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUser) {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [loggedUser, navigate]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setActiveUserSection(""); // Reset user section
  };

  const handleUserSectionChange = (section) => {
    setActiveUserSection(section);
  };

  const handleBack = () => {
    setActiveSection("");
    setActiveUserSection("");
  };

  if (!loggedUser) {
    return null; // or a loading spinner, or a redirect component
  }

  return (
    (loggedUser.userType === 1 || loggedUser.userType === 2) && (
      <div className="admin-page">
        <h1>Admin Dashboard</h1>

        {activeSection === "" ? (
          <div className="admin-buttons">
            <Button
              variant="warning"
              size="lg"
              onClick={() => handleSectionChange("products")}
            >
              Products
            </Button>
            <Button as={Link} to="/uploadAlbum" variant="warning" size="lg">
              Subir Album
            </Button>
            {loggedUser.userType === 2 && (
              <>
                <Button
                  variant="warning"
                  size="lg"
                  onClick={() => handleSectionChange("users")}
                >
                  Users
                </Button>
                <Button as={Link} to="/Registrarse" variant="warning" size="lg">
                  Create New Admin
                </Button>
              </>
            )}
          </div>
        ) : (
          <>
            <Button variant="warning" size="lg" onClick={handleBack}>
              Back to Dashboard
            </Button>
            <div className="admin-section">
              {activeSection === "users" && (
                <>
                  <h2>Users</h2>
                  {activeUserSection === "" ? (
                    <div className="admin-buttons">
                      <Button
                        variant="warning"
                        size="lg"
                        onClick={() => handleUserSectionChange("addUser")}
                      >
                        Alta de Usuario
                      </Button>
                      <Button
                        variant="warning"
                        size="lg"
                        onClick={() => handleUserSectionChange("listUsers")}
                      >
                        Listado de Usuarios
                      </Button>
                    </div>
                  ) : (
                    <UserList activeUserSection={activeUserSection} />
                  )}
                </>
              )}
              {activeSection === "products" && (
                <>
                  <h2>Products</h2>
                  <ProductsList />
                </>
              )}
            </div>
          </>
        )}
      </div>
    )
  );
};

export default AdminPage;