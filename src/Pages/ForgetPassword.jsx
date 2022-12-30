import React from "react";
import LeftScreen from "../Components/LeftScreen";
import { useFormik } from "formik";
import * as yup from "yup";
import { Config } from "../Config/Config";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

const formValidationSchema = yup.object({
  email: yup
    .string("Enter email")
    .email("Enter valid email")
    .required("Enter email"),
});

function ForgetPassword() {
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
      email: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const data = await axios.post(
          `${Config.api}/user/forgetpassword`,
          values
        );
        toast.success(data.data.message);
        Navigate("/otp");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        Navigate("/signin");
      }
    },
  });
  return (
    <div className="head-home">
      <LeftScreen
        headline={"Don’t worry!"}
        paragraph={"Enter the email to get OTP"}
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
                // placeholder="johnmerv321@gmail.com"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <small>
                {errors.email && touched.email ? errors.email : null}
              </small>
            </div>

            <div>
              <button className="login-btn" type="submit">
                SEND
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
