import React, { useState, useEffect } from "react";
import "../Styles/AllBooks.css";
import { Config } from "../Config/Config";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function BooksList() {
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
    if (role == "user") {
      Navigate("/");
    }
    fetchBooks();
  }, []);
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
                <th>Status</th>
              </tr>
              {books.map((x) => {
                return (
                  <>
                    <tr>
                      <td>{x.sno}</td>
                      <td>{x.title}</td>
                      <td>{x.author}</td>
                      <td>{x.copies}</td>
                      {parseInt(x.copies) !== 0 ? (
                        <td>Available</td>
                      ) : (
                        <td>Not avilable</td>
                      )}
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

export default BooksList;
