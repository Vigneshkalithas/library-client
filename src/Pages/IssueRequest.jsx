import React, { useEffect, useState } from "react";
import { books } from "../Helper/Ntable";
import { TiTick } from "react-icons/ti";
import { RiCloseLine } from "react-icons/ri";
import axios from "axios";
import { Config } from "../Config/Config";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function IssueRequest() {
  const [req, setReq] = useState([]);
  const Navigate = useNavigate();
  const fetchRequsts = async () => {
    try {
      const Datas = await axios.get(`${Config.api}/books/userreqBooks`);
      const result = Datas.data.allRequests.filter(
        (x) => x.acceptance == false
      );
      console.log(result);
      setReq(result);
    } catch (error) {
      console.log(error);
    }
  };
  const DeleteRequests = async (id) => {
    try {
      if (window.confirm("Confirm to Delete the item?")) {
        const DelRequests = await axios.delete(
          `${Config.api}/books/delrequests/${id}`
        );
        console.log(DelRequests);
        toast.error(DelRequests.data.message);
        alert("delete system disabled  default");
      }
      fetchRequsts();
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  };
  const accepted = async (x) => {
    const Datas = await axios.post(`${Config.api}/books/acceptrequests`, x);

    if (Datas.data.error == false) {
      const update = await axios.put(
        `${Config.api}/books/updaterequests/${x._id}`
      );
      console.log(update);
      fetchRequsts();
    } else {
      console.log("sorry");
    }
  };
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role == "user") {
      Navigate("/");
    } else {
      fetchRequsts();
    }
  }, []);

  return (
    <>
      <div className="all-books-right">
        <div className="allbooks-head">
          <div>
            <h2>Issue Request</h2>
          </div>
          <div className="table-head">
            <table>
              <tr>
                <th>Student Name</th>
                <th>Reg No</th>
                <th>Department</th>
                <th>Book Name</th>
                <th>Availabe Copies</th>
                <th>Actions</th>
              </tr>
              {req.map((x, index) => {
                return (
                  <>
                    <tr key={x.index}>
                      <td>{x.sname}</td>
                      <td>{x.regno}</td>
                      <td>{x.dept}</td>
                      <td>{x.bname}</td>
                      <td>{x.availabecopies}</td>
                      <td className="edit-del-head">
                        <button
                          className="edit-btn"
                          onClick={() => accepted(x)}
                        >
                          <TiTick />
                        </button>
                        <button
                          className="del-btn"
                          onClick={() => DeleteRequests(x._id)}
                        >
                          <RiCloseLine />
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

export default IssueRequest;
