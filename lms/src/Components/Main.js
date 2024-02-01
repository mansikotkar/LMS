import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  let nav = useNavigate();
  let admin_id = "admin_1";
  let student_id = "student_1";
  const [admin_details, set_admin_details] = useState([
    { admin_email: "admin@gmail.com", admin_pass: "admin" },
  ]);
  let admin_details_string = JSON.stringify(admin_details);
  const admin_login = () => {
    window.localStorage.setItem("admin_login_details", admin_details_string);
    nav(`/login/${admin_id}`);
  };
  const student_click = () => {
    nav(`/login/${student_id}`);
  };

  return (
    <>
      <div
        style={{ marginLeft: "850px", marginRight: "500px", marginTop: "50px" }}
      >
        <h1>
          <i class="fa-sharp fa-solid fa-building-columns"> LMS</i>
        </h1>
      </div>
      <div
        style={{
          marginLeft: "500px",
          border: "2px solid",
          marginRight: "500px",
          textAlign: "center",
          marginTop: "80px",
        }}
      >
        <h2>ARE YOU?</h2>
        <h3 onClick={admin_login}>
          <i class="fa-sharp fa-solid fa-user-tie"> ADMIN</i>
        </h3>
        <h3 onClick={student_click}>
          <i class="fa-sharp fa-solid fa-user-pen"> STUDENT</i>
        </h3>
      </div>
    </>
  );
}

export default Main;
