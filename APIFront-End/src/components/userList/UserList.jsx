import useUsersList from '../../hooks/useUsersList';

const UsersList = () => {
  const { users, loading, error } = useUsersList();

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name} ({user.email})</li>
      ))}
    </ul>
  );
};

export default UsersList;
