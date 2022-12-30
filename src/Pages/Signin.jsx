import React, { useState, useContext, useEffect } from "react";
import LeftScreen from "../Components/LeftScreen";
import "../Styles/Signin.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Config } from "../Config/Config";
import axios from "axios";
import { MyContext } from "../context";

const formValidationSchema = yup.object({
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
});

function Signin() {
  const { setToken, setIsAuthenticated } = useContext(MyContext);
  const navigate = useNavigate();
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
      email: "",
      password: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: async (values) => {
      try {
        const data = await axios.post(`${Config.api}/user/signin`, values);
        toast.success(data.data.message);
        localStorage.setItem("token", data.data.sessionData.token);
        localStorage.setItem("role", data.data.sessionData.role);
        localStorage.setItem("id", data.data.sessionData.userId);
        setToken(data.data.sessionData.token);
        setIsAuthenticated(true);
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    },
  });
  return (
    <div className="head-home">
      <LeftScreen
        headline={"Welcome back!"}
        paragraph={"Sign In & start to explore!"}
      />
      <div className="Right">
        <div className="form-head">
          <form onSubmit={handleSubmit}>
            <div className="label-input-head">
              <label htmlFor="email" className="login-label">
                Email
              </label>
              <input
                type="text"
                className="login-inputs"
                name="email"
                id="email"
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
                id="password"
                className="login-inputs"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <small>
                {errors.password && touched.password ? errors.password : null}
              </small>
              <div
                className="forget-navigate"
                onClick={() => navigate("/forgetpassword")}
              >
                <p>Forget Password</p>
              </div>
            </div>
            <div>
              <button className="sign-btn" type="submit">
                SIGNIN
              </button>
              {/* <div className="border-head">
                <img src={border} alt="border" className="border" />
              </div>
              <div className="gl-btn-head">
                <button className="gl-btn">
                  <span>
                    <img src={googleLogo} alt="goole-logo" />
                  </span>
                  <span>Continue with Google</span>
                </button>
              </div> */}
            </div>
          </form>
        </div>

        <div className="login-footer">
          <p onClick={() => navigate("/register")}>
            Don’t have an account ?<span> Register</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
