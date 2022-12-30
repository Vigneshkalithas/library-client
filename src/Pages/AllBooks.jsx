import React, { useState, useEffect } from "react";
import "../Styles/AllBooks.css";
// import { books } from "../Helper/Ntable";
import axios from "axios";
import { Config } from "../Config/Config";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

function AllBooks() {
  const [books, setBooks] = useState([]);
  const Navigate = useNavigate();
  const fetchBooks = async () => {
    try {
      const Datas = await axios.get(`${Config.api}/books/allbooks`);
      setBooks(Datas.data.books);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role == "admin") {
      Navigate("/");
      console.error("Not Authorized");
    }
    fetchBooks();
  }, []);
  const Request = async (id) => {
    const values = {
      sId: localStorage.getItem("id"),
      bId: id,
    };
    const Request = await axios.post(`${Config.api}/books/request`, values);
    toast.success(Request.data.message);
  };

  return (
    <>
      <div className="all-books-right">
        <div className="allbooks-head">
          <div>
            <h2>All Available Books In Library</h2>
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
                  <tr key={x.index}>
                    <td>{x.sno}</td>
                    <td>{x.title}</td>
                    <td>{x.author}</td>
                    <td>{x.copies}</td>
                    <td>
                      <button
                        className="req-btn"
                        onClick={() => Request(x.bookId)}
                      >
                        Request
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllBooks;
