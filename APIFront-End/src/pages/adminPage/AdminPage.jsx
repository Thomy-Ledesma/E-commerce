import { useState } from "react";
import "./AdminPage.css";
import UserList from "../../components/userList/UserList";
import ProductsList from "../../components/productList/ProductList";
import { Button } from "react-bootstrap";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("");
  const [activeUserSection, setActiveUserSection] = useState("");

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

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      {activeSection === "" ? (
        <div className="admin-buttons">
          <Button
            variant="warning"
            size="lg"
            onClick={() => handleSectionChange("users")}
          >
            Users
          </Button>
          <Button
            variant="warning"
            size="lg"
            onClick={() => handleSectionChange("products")}
          >
            Products
          </Button>
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
  );
};

export default AdminPage;
