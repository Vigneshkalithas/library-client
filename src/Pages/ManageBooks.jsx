import React, { useState, useEffect } from "react";
import "../Styles/ManageBooks.css";
// import { books } from "../Helper/Ntable";
import { MdModeEditOutline, MdAddCircle } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Config } from "../Config/Config";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const formValidationSchema = yup.object({
  sno: yup.string("Enter Serial Number").required("Serial number is required"),
  title: yup.string("Enter Title").required("Title is required"),
  author: yup.string("Enter Author Name").required("Author is required"),
  copies: yup.number("Enter Available Copies").required("Copie count required"),
});

function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentBook, setCurrentBook] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [Id, setID] = useState("");
  const Navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      sno: "",
      title: "",
      author: "",
      copies: "",
    },
    validationSchema: formValidationSchema,

    onSubmit: async (values) => {
      try {
        if (isEdit) {
          const EditData = await axios.put(
            `${Config.api}/books/editbook/${currentBook._id}`,
            values
          );
          formik.resetForm();
          setIsEdit(false);
          toast.success(EditData.data.message);
          handleClose();
          fetchBooks();
        } else {
          const Datas = await axios.post(
            `${Config.api}/books/addBooks`,
            values
          );
          toast.success(Datas.data.message);
          handleClose();
          formik.resetForm();
          fetchBooks();
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    },
  });
  const fetchBooks = async () => {
    try {
      const Datas = await axios.get(`${Config.api}/books/allbooks`);
      setBooks(Datas.data.books);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (id) => {
    try {
      setIsEdit(true);
      handleShow();
      const Datas = await axios.get(`${Config.api}/books/singlebook/${id}`);
      formik.setValues(Datas.data.singleBook);
      setCurrentBook(Datas.data.singleBook);
    } catch (error) {
      console.log(error);
    }
  };
  const DeleteBook = async (id) => {
    try {
      if (window.confirm("Confirm to Delete the item?")) {
        const Datas = await axios.delete(
          `${Config.api}/books/deletebook/${id}`
        );
        // alert("sorry you wont delete");
        toast.success(Datas.data.message);
        fetchBooks();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role == "user") {
      Navigate("/");
    } else {
      fetchBooks();
    }
  }, []);

  return (
    <>
      <div className="manage-books-right">
        <div className="manage-books-head">
          <div className="head-manageBooks">
            <h2>ManageBooks</h2>
            <button onClick={handleShow}>
              <MdAddCircle />
            </button>
          </div>
          <div className="table-head">
            <table>
              <tr>
                <th>S.No</th>
                <th>Title</th>
                <th>Author</th>
                <th>Copies</th>
                <th>Actions</th>
              </tr>
              {books.map((x) => {
                return (
                  <>
                    <tr>
                      <td>{x.sno}</td>
                      <td>{x.title}</td>
                      <td>{x.author}</td>
                      <td>{x.copies}</td>

                      <td className="edit-del-head">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(x._id)}
                        >
                          <MdModeEditOutline />
                        </button>
                        <button
                          className="del-btn"
                          onClick={() => DeleteBook(x._id)}
                        >
                          <RiDeleteBin6Fill />
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </table>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Body>
              <h4>Add Books</h4>
              <form onSubmit={formik.handleSubmit}>
                <div className="label-input-head">
                  <label>S.No</label>
                  <input
                    type="text"
                    name="sno"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.sno}
                  />
                  <small>
                    {formik.errors.sno && formik.touched.sno
                      ? formik.errors.sno
                      : null}
                  </small>
                </div>
                <div className="label-input-head">
                  <label>Author</label>
                  <input
                    type="text"
                    name="author"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.author}
                  />
                  <small>
                    {formik.errors.author && formik.touched.author
                      ? formik.errors.author
                      : null}
                  </small>
                </div>
                <div className="label-input-head">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                  />
                  <small>
                    {formik.errors.title && formik.touched.title
                      ? formik.errors.title
                      : null}
                  </small>
                </div>
                <div className="label-input-head">
                  <label>No of Copies</label>
                  <input
                    type="text"
                    name="copies"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.copies}
                  />
                  <small>
                    {formik.errors.copies && formik.touched.copies
                      ? formik.errors.copies
                      : null}
                  </small>
                </div>
                <div className="modal-footer">
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default ManageBooks;
