import { useContext, useState } from 'react';
import { Context } from '../../context';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
  const {loggedUser, setLoggedUser} = useContext(Context);
  const URL = "https://localhost:7051/users/login";
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const params = new URLSearchParams({ userEmail: name, userPass: password });

    try {
      const response = await fetch(`${URL}?${params.toString()}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${response.status} ${response.statusText}, Details: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      sessionStorage.setItem('user', JSON.stringify(data));
      console.log('User logged in:', data); // Debugging log
      setLoggedUser(JSON.parse(sessionStorage.getItem('user')));
    } catch (error) {
      console.log('Error during login:', error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUserName">
          <Form.Label>User</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email or username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Login;