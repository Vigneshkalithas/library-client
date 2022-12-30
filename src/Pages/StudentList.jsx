import React, { useEffect, useState } from "react";
import { books } from "../Helper/Ntable";
import { Config } from "../Config/Config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentList() {
  const [students, setStudents] = useState([]);
  const Navigate = useNavigate();
  const fetchStudents = async () => {
    try {
      const Datas = await axios.get(`${Config.api}/user/allstudents`);
      setStudents(Datas.data.students);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role == "user") {
      Navigate("/");
    } else {
      fetchStudents();
    }
  }, []);
  return (
    <>
      <div className="all-books-right">
        <div className="allbooks-head">
          <div>
            <h2>Student Lists</h2>
          </div>
          <div className="table-head">
            <table>
              <tr>
                <th>id_no</th>
                <th>Name</th>
                <th>Department</th>
                <th>Register no</th>
                {/* <th>Actions</th> */}
              </tr>
              {students.map((x) => {
                return (
                  <>
                    <tr>
                      <td>{x.userId}</td>
                      <td>{x.stname}</td>
                      <td>{x.dept}</td>
                      <td>{x.regno}</td>

                      {/* <td className="edit-del-head">
                        <button className="edit-btn"></button>
                        <button className="del-btn"></button>
                      </td> */}
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

export default StudentList;
