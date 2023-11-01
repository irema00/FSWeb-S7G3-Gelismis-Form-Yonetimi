import React, { useState, useEffect } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as yup from "yup";
import axios from "axios";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  checkbox: false,
};

function CreateForm(formData = emptyForm) {
  const [data, setData] = useState(formData);
  const { firstName, lastName, email, password, checkbox } = data;
  const [formValid, setFormValid] = useState(true);
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    checkbox: "",
  });
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [users, setUsers] = useState([]);

  const validationSchema = yup.object().shape({
    firstName: yup.string().min(2).required("First Name is required!"),
    lastName: yup.string().min(2).required("Last Name is required!"),
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .min(4, "Password should include 4-8 characters")
      .max(8, "Password should include 4-8 characters")
      .required("Password is requires"),
    checkbox: yup.boolean().oneOf([true], "Terms must be accepted!"),
  });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({ ...data, [name]: type === "checkbox" ? checked : value });
    checkValidationFor(name, type === "checkbox" ? checked : value);
  };

  useEffect(() => {
    axios
      .get("https://reqres.in/api/users")
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => console.error("API error:", error));
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    for (let key in data) {
      checkValidationFor(key, data[key]);
    }

    if (formValid) {
      const endpoint = "https://reqres.in/api/users";

      axios
        .post(endpoint, data)
        .then((res) => {
          const newUser = {
            ...res.data,
            first_name: res.data.firstName,
            last_name: res.data.lastName,
            email: res.data.email,
          };
          setSubmissionSuccess(true);
          setTimeout(() => setSubmissionSuccess(false), 5000);
          setUsers((prevUsers) => [...prevUsers, newUser]);
          setData(emptyForm);
          setFormErrors({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            checkbox: "",
          });
        })
        .catch((err) => {
          console.error("POST error!", err);
        });
    }
  };
  const checkValidationFor = (field, value) => {
    yup
      .reach(validationSchema, field)
      .validate(value)
      .then(() => {
        setFormErrors((prevFormErrors) => ({
          ...prevFormErrors,
          [field]: "",
        }));
      })
      .catch((err) => {
        setFormErrors((prevFormErrors) => ({
          ...prevFormErrors,
          [field]: err.errors[0],
        }));
      });
  };
  useEffect(() => {
    validationSchema.isValid(data).then((valid) => setFormValid(valid));
  }, [data]);

  return (
    <>
      <h3>Registration Form</h3>

      <Form onSubmit={submitForm}>
        <Form.Group className="mb-3">
          <Form.Label> First Name </Form.Label>
          <Form.Control
            required
            name="firstName"
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={onChange}
            isInvalid={!!formErrors.firstName}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.firstName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            required
            name="lastName"
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={onChange}
            isInvalid={!!formErrors.lastName}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.lastName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> Enter e-mail </Form.Label>
          <Form.Control
            required
            name="email"
            type="email"
            placeholder="example@example.com"
            value={email}
            onChange={onChange}
            isInvalid={!!formErrors.email}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Password </Form.Label>
          <Form.Control
            required
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={onChange}
            isInvalid={!!formErrors.password}
          />{" "}
          <Form.Control.Feedback type="invalid">
            {formErrors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Terms Of Service </Form.Label>
          <Form.Check
            required
            name="checkbox"
            type="checkbox"
            checked={checkbox}
            onChange={onChange}
            isInvalid={!!formErrors.checkbox}
          />{" "}
          <Form.Control.Feedback type="invalid">
            {formErrors.checkbox}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        {submissionSuccess && (
          <Alert variant="success">Form successfully submitted!</Alert>
        )}

        <h4>Users:</h4>
        <ol>
          {users.map((user) => (
            <li key={user.id}>
              {user.first_name} - {user.email}
            </li>
          ))}
        </ol>
      </Form>
    </>
  );
}

export default CreateForm;
