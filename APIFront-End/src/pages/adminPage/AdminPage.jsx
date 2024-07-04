import { useState } from "react";
import "./AdminPage.css";
import UsersList from "../../components/userList/UserList";
import ProductsList from "../../components/productList/ProductList";
import { Button } from "react-bootstrap";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("");

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleBack = () => {
    setActiveSection("");
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
                <UsersList />
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
