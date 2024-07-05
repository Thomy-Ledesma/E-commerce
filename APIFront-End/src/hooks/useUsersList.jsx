import { useState, useEffect } from 'react';

const useUsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://localhost:7051/users/listUsers');
      if (!response.ok) {
        throw new Error('Error fetching users');
      }
      const usersData = await response.json();
      setUsers(usersData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (user) => {
    try {
      const response = await fetch('https://localhost:7051/users/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error('Error adding user');
      }
      const newUser = await response.json();
      setUsers((prevUsers) => [...prevUsers, newUser]);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`https://localhost:7051/users/deleteUser?id=${userId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        throw new Error('Error deleting user');
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      setError(error.message);
    }
  };

  return { users, loading, error, addUser, deleteUser, fetchUsers };
};

export default useUsersList;
