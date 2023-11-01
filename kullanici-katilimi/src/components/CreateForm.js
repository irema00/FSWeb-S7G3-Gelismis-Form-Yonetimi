import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as yup from "yup";
import { userSchema } from "./UserValidation";

function CreateForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    console.log(name, email, password, checkbox);
  };

  const handleCheck = () => setCheckbox(!checkbox);
  return (
    <>
      <h3>Registration Form</h3>

      <Form onSubmit={submitForm}>
        <Form.Group className="mb-3">
          <Form.Label> Name Surname </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="name surname"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Enter e-mail </Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Password </Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Terms Of Service </Form.Label>
          <Form.Check
            required
            type="checkbox"
            checked={checkbox}
            onClick={handleCheck}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default CreateForm;
