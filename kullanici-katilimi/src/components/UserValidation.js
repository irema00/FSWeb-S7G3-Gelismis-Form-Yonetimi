import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(4)
    .max(8)
    .required("Password should include 4-8 characters"),
});
