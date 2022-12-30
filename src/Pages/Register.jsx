import React, { useState, useContext, useEffect } from "react";
import LeftScreen from "../Components/LeftScreen";
import "../Styles/Register.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Config } from "../Config/Config";
import toast, { Toaster } from "react-hot-toast";
import { MyContext } from "../context";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const formValidationSchema = yup.object({
  name: yup.string("Enter user name").required("name is required"),
  email: yup
    .string("Enter email")
    .email("Enter a valid email")
    .required("email is requiured"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "password must contain 8 or more characters")
    .matches(/[0-9]/, "password must contain at least 1 number")
    .matches(/[a-z]/, "password must contain at least 1 lower case letter")
    .matches(/[A-Z]/, "password must contain at least 1 upper case letter")
    .matches(/[^\w]/, "password must contain at least 1 special character"),
  role: yup.string().required("Choose anyone"),
});

function Register() {
  const navigate = useNavigate();
  const { setToken, setIsAuthenticated } = useContext(MyContext);
  const {
    values,
    handleChange,
    handleBlur,
    resetForm,
    touched,
    handleSubmit,
    errors,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: async (values) => {
      try {
        if (values.role == "admin") {
          const data = await axios.post(`${Config.api}/user/register`, values);
          toast.success(data.data.message);
          localStorage.setItem("token", data.data.sessionData.token);
          localStorage.setItem("role", data.data.sessionData.role);
          localStorage.setItem("id", data.data.sessionData.userId);
          navigate("/");
          setToken(data.data.sessionData.token);
          setIsAuthenticated(true);
        } else {
          const data = await axios.post(`${Config.api}/user/register`, values);
          localStorage.setItem("token", data.data.sessionData.token);
          localStorage.setItem("role", data.data.sessionData.role);
          localStorage.setItem("verifieduser", "true");
          localStorage.setItem("id", data.data.sessionData.userId);
          setToken(data.data.sessionData.token);
          setIsAuthenticated(true);
          navigate("/studentdetails");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <div className="head-home">
      <LeftScreen headline={"Hello!"} paragraph={"Want to explore? Register"} />
      <div className="Right">
        <div className="form-head">
          <form onSubmit={handleSubmit}>
            <div className="label-input-head">
              <label htmlFor="name" className="login-label">
                Name
              </label>
              <input
                className="login-inputs"
                type="text"
                name="name"
                // id="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <small>{errors.name && touched.name ? errors.name : null}</small>
            </div>
            <div className="label-input-head">
              <label htmlFor="email" className="login-label">
                Email
              </label>
              <input
                type="text"
                className="login-inputs"
                name="email"
                // id="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <small>
                {errors.email && touched.email ? errors.email : null}
              </small>
            </div>
            <div className="label-input-head">
              <label htmlFor="password" className="login-label">
                Paasword
              </label>
              <input
                type="password"
                name="password"
                // id="password"
                className="login-inputs"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <small>
                {errors.password && touched.password ? errors.password : null}
              </small>
            </div>
            <div className="radio-head">
              <div className="radio-btn-head">
                <label htmlFor="admin" className="login-label">
                  Admin
                </label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="admin"
                />
              </div>

              <div className="radio-btn-head">
                <label htmlFor="user" className="login-label">
                  User
                </label>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="user"
                />
              </div>
            </div>

            <div>
              <button className="login-btn" type="submit">
                REGISTER
              </button>
            </div>
          </form>
        </div>
        <div className="login-footer">
          <p onClick={() => navigate("/signin")}>
            Do you have an account ? <span>Sign In</span>
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Register;
