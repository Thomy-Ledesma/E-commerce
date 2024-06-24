import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const API_URL = "https://localhost:7051/users/addUser";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      name: name,
      password: password,
      email: email
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${response.status} ${response.statusText}, Details: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      console.log('User added:', data);
      window.location.reload();
    } catch (error) {
      console.error("There was an error adding the user!", error);
    }
  };

  return (
    <div className="upload-page d-flex justify-content-center align-items-center">
      <Form className="upload-form" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4 text-white">Sign up to DiscoManiacos</h2>
        <Form.Group className="mb-3" controlId="formUserName">
          <Form.Label className="form-title">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label className="form-title">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label className="form-title">Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        
        <Button variant="warning" type="submit" size="sm">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;