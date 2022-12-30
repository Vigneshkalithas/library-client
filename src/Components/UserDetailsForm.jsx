import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Config } from "../Config/Config";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import "../Styles/Register.css";
import { useNavigate } from "react-router-dom";

const formValidationSchema = yup.object({
  stname: yup.string("Enter Name").required("Name is required"),
  mail: yup
    .string("Enter email")
    .email("Enter valid email")
    .required("Mail is required"),
  regno: yup
    .string("Enter your register number")
    .required("Reg no is required"),
  dept: yup.string("Enter your department").required("Department is required"),
});

function UserDetailsForm() {
  const navigate = useNavigate();
  useEffect(() => {
    const verification = localStorage.getItem("verifieduser");
    if (!verification == true) {
      navigate("/register");
    }
  }, []);

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
      stname: "",
      mail: "",
      regno: "",
      dept: "",
    },

    validationSchema: formValidationSchema,

    onSubmit: async (values) => {
      try {
        console.log(values);
        const Datas = await axios.post(
          `${Config.api}/user/userdetails`,
          values
        );
        toast.success(Datas.data.message);
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <>
      <div className="student-details-head">
        <div className="student-details">
          <h5>Fill Student Details</h5>
          <form onSubmit={handleSubmit}>
            <div className="label-input-head">
              <label>Name</label>
              <input
                type="text"
                name="stname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.stname}
              />
              <small>
                {errors.stname && touched.stname ? errors.stname : null}
              </small>
            </div>
            <div className="label-input-head">
              <label>Email</label>
              <input
                type="email"
                name="mail"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.mail}
              />
              <small>{errors.mail && touched.mail ? errors.mail : null}</small>
            </div>
            <div className="label-input-head">
              <label>Reg No</label>
              <input
                type="text"
                name="regno"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.regno}
              />
              <small>
                {errors.regno && touched.regno ? errors.regno : null}
              </small>
            </div>
            <div className="label-input-head">
              <label>Department</label>
              <input
                type="text"
                name="dept"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.dept}
              />
              <small>{errors.dept && touched.dept ? errors.dept : null}</small>
            </div>
            <div className="modal-footer-student">
              <button variant="secondary">Close</button>
              <button variant="primary" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserDetailsForm;
