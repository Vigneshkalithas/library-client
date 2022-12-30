import React, { useState, useContext, useEffect } from "react";
import LeftScreen from "../Components/LeftScreen";
import { useFormik } from "formik";
import * as yup from "yup";
import { Config } from "../Config/Config";
import axios from "axios";
import toast from "react-hot-toast";
import { MyContext } from "../context";
import { Navigate, useNavigate } from "react-router-dom";

const formValidationSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "password must contain 8 or more characters")
    .matches(/[0-9]/, "password must contain at least 1 number")
    .matches(/[a-z]/, "password must contain at least 1 lower case letter")
    .matches(/[A-Z]/, "password must contain at least 1 upper case letter")
    .matches(/[^\w]/, "password must contain at least 1 special character"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

function NewPassword() {
  const { adminID, setAdminID } = useContext(MyContext);
  const [id, setID] = useState();
  const Navigate = useNavigate();

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
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: async (values) => {
      const objects = { ...values, userId: id };
      try {
        const data = await axios.post(
          `${Config.api}/user/changepassword`,
          objects
        );
        toast.success(data.data.message);
        const Token = data.data.token;
        localStorage.setItem("token", Token);
        Navigate("/");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        Navigate("/signin");
      }
    },
  });
  useEffect(() => {
    const VerifyID = localStorage.getItem("id");
    if (!VerifyID) {
      toast.error("Not Authorized");
      Navigate("/");
    } else {
      setID(VerifyID);
    }
  }, []);
  return (
    <div className="head-home">
      <LeftScreen
        headline={"Make strong"}
        paragraph={"Create a strong password"}
      />
      <div className="Right">
        <div className="form-head">
          <form onSubmit={handleSubmit}>
            <div className="label-input-head">
              <label htmlFor="password" className="login-label">
                New Password
              </label>
              <input
                type="password"
                className="login-inputs"
                name="password"
                id="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <small>
                {errors.password && touched.password ? errors.password : null}
              </small>
            </div>
            <div className="label-input-head">
              <label htmlFor="passwordConfirmation" className="login-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="login-inputs"
                name="passwordConfirmation"
                id="passwordConfirmation"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.passwordConfirmation}
              />
            </div>
            <small>
              {errors.passwordConfirmation && touched.passwordConfirmation
                ? errors.passwordConfirmation
                : null}
            </small>
            <div>
              <button className="login-btn" type="submit">
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
