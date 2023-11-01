import React, { useState, useEffect } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as yup from "yup";
import axios from "axios";

const emptyForm = {
  name: "",
  email: "",
  password: "",
  checkbox: false,
};

function CreateForm(formData = emptyForm) {
  const [data, setData] = useState(formData);
  const { name, email, password, checkbox } = data;
  const [formValid, setFormValid] = useState(true);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    checkbox: "",
  });

  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const validationSchema = yup.object().shape({
    name: yup.string().min(2).required("Name Surname is required!"),
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

  const submitForm = (e) => {
    e.preventDefault();
    for (let key in data) {
      checkValidationFor(key, data[key]);
    }

    if (formValid) {
      const endpoint = "https://reqres.in/api/users";

      axios
        .post("https://reqres.in/api/users", data)
        .then((res) => {
          console.log("POST success!", res);
          setSubmissionSuccess(true);
          setTimeout(() => setSubmissionSuccess(false), 5000);
        })
        .catch((err) => {
          console.error("POST error!", err);
        });
    }
  };
  const checkValidationFor = (field, value) => {
    console.log("Validating field:", field, "Value:", value);

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
        console.log("Validation error for", field, ":", err.errors[0]);
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
          <Form.Label> Name Surname </Form.Label>
          <Form.Control
            required
            name="name"
            type="text"
            value={name}
            placeholder="name surname"
            onChange={onChange}
            isInvalid={!!formErrors.name}
          />{" "}
          <Form.Control.Feedback type="invalid">
            {formErrors.name}
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
      </Form>
    </>
  );
}

export default CreateForm;
