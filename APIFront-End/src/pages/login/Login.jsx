import { useContext, useState, useEffect } from 'react';
import { Context } from '../../context';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useUser from '../../hooks/useUser';

const Login = () => {
  const { setLoggedUser } = useContext(Context);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loginRequest, setLoginRequest] = useState({ userEmail: '', userPass: '' });
  const [data, loading, error, loginUser] = useUser();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoginRequest({ userEmail: name, userPass: password });
  };

  useEffect(() => {
    if (loginRequest.userEmail && loginRequest.userPass) {
      loginUser(loginRequest);
    }
  }, [loginRequest]);

  useEffect(() => {
    if (data) {
      sessionStorage.setItem('user', JSON.stringify(data));
      setLoggedUser(data);
    }
  }, [data, setLoggedUser]);

  return (
    <div className="upload-page d-flex justify-content-center align-items-center">
      <Form className="upload-form" onSubmit={handleSubmit}>
      <h2 className="text-center mb-4 text-white">Log In</h2>
        <Form.Group className="mb-3" controlId="formUserName">
          <Form.Label className="form-title">User</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email or username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label className="form-title">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </Button>
        {error && <p className="text-danger">{error}</p>}
      </Form>
    </div>
  );
};

export default Login;