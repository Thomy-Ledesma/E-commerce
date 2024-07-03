// import { useContext } from 'react';
// import { Context } from '../../context';
import './AdminPage.css';
import UsersList from '../../components/userList/UserList';
import ProductsList from '../../components/productList/ProductList';

const AdminPage = () => {
  // const { loggedUser } = useContext(Context);

  // if (!loggedUser || !loggedUser.isSuperAdmin) {
  //   return <p>You do not have access to this page.</p>;
  // }

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      <div className="admin-section">
        <h2>Users</h2>
        <UsersList />
      </div>

      <div className="admin-section">
        <h2>Products</h2>
        <ProductsList />
      </div>
    </div>
  );
};

export default AdminPage;
