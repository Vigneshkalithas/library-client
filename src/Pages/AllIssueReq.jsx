import React, { useState, useEffect } from "react";
import { books } from "../Helper/Ntable";
import { TiTick } from "react-icons/ti";
import { RiCloseLine } from "react-icons/ri";
import axios from "axios";
import { Config } from "../Config/Config";
import { useNavigate } from "react-router-dom";

function AllIssueReq() {
  const [detail, setDetail] = useState([]);
  const Navigate = useNavigate();
  const fetchIssuedBooks = async () => {
    try {
      const Datas = await axios.get(`${Config.api}/books/issuedbooksdetails`);
      setDetail(Datas.data.details);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role == "user") {
      Navigate("/");
    } else {
      fetchIssuedBooks();
    }
  }, []);

  return (
    <>
      <div className="all-books-right">
        <div className="allbooks-head">
          <div>
            <h2>All issued Books</h2>
          </div>
          <div className="table-head">
            <table className="table-long">
              <tr>
                {/* <th>Student Id</th> */}
                <th>Student Name</th>
                <th>Department</th>
                <th>Reg No</th>
                <th>Book Id</th>
                <th>Book Name</th>
                {/* <th>Availble Copies</th> */}
              </tr>
              {detail.map((x) => {
                return (
                  <>
                    <tr>
                      {/* <td>{x.sId}</td> */}
                      <td>{x.sname}</td>
                      <td>{x.dept}</td>
                      <td>{x.regno}</td>
                      <td>{x.bId}</td>
                      <td>{x.bname}</td>
                      {/* <td>{x.balancecopies}</td> */}
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

export default AllIssueReq;
