import React, { useState, useEffect } from "react";
import { report } from "../Helper/Tables";
import deleteIcon from "../assets/delete-icon.svg";
import blockIcon from "../assets/block-icon.svg";
// import { books } from "../Helper/Ntable";
import axios from "axios";
import { Config } from "../Config/Config";
import { Navigate, useNavigate } from "react-router-dom";

function YourBooks() {
  const [id, setId] = useState();
  const [books, setBooks] = useState([]);
  const Navigate = useNavigate();
  const fetchuserbooks = async () => {
    const Book = await axios.post(`${Config.api}/books/collections`, id);
    setBooks(Book.data.collections);
  };
  const Returned = () => {
    alert("retrun options can be enabledd in future, sorry for that");
  };
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role == "admin") {
      Navigate("/");
      console.error("Not Authorized");
    }
    const iD = localStorage.getItem("id");
    setId(iD);
    fetchuserbooks();
  }, []);

  return (
    <>
      <div className="all-books-right">
        <div className="allbooks-head">
          <h2>Your Book Lists</h2>
          <div className="table-head2">
            <table>
              <tr>
                <th>Student id</th>
                <th>Book Name</th>
                <th>Title</th>
                {/* <th>Author</th> */}
                <th>Actions</th>
              </tr>
              {books.map((x) => {
                return (
                  <>
                    <tr>
                      <td>{x.sId}</td>
                      <td>{x.bId}</td>
                      <td>{x.bname}</td>
                      {/* <td>{x.author}</td> */}
                      <td>
                        <button className="sub-btn" onClick={() => Returned(x)}>
                          Retrun
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default YourBooks;
