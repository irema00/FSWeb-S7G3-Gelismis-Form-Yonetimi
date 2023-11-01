import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function CreateForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState("");

  return (
    <>
      <h3>Sign Up</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label> Name Surname </Form.Label>
          <Form.Control type="text" placeholder="name surname" value={name} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Enter e-mail </Form.Label>
          <Form.Control
            type="email"
            placeholder="example@example.com"
            value={email}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Password </Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            value={password}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Terms Of Service </Form.Label>
          <Form.Check type="checkbox" checked={checkbox} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </>
  );
}

export default CreateForm;
