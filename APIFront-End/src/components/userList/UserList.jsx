import useUsersList from '../../hooks/useUsersList';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SignUp from '../../pages/SignUp/SignUp';

const UserList = ({ activeUserSection }) => {
  const { users, loading, error, deleteUser, fetchUsers } = useUsersList();

  const handleUserAdded = () => {
    fetchUsers(); // Refetch users after adding a new user
  };

  const handleDeleteUser = (userId) => {
    deleteUser(userId);
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      {activeUserSection === "addUser" && <SignUp onSuccess={handleUserAdded} />}
      
      {activeUserSection === "listUsers" && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
              <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user.id)}>
                Delete
              </Button>
              {/* Agregar botón para editar aquí */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

UserList.propTypes = {
  activeUserSection: PropTypes.string.isRequired,
};

export default UserList;
