import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

let intialstate = {
  email1: "",
  password1: "",
};

function Login_page({
  loginfunction,
  admin_login_function,
  student_register_form_fun,
}) {
  const [email_onchange, set_email_onchange] = useState(intialstate);
  let nav = useNavigate();
  let { admin } = useParams();

  let get_admin_login_details = window.localStorage.getItem(
    "admin_login_details"
  );
  let convert_obj_admin_login_details = JSON.parse(get_admin_login_details);
  let get_student_register_details = window.localStorage.getItem(
    "student_register_details"
  );
  let convert_obj_student_register_details = JSON.parse(
    get_student_register_details
  );

  const details_onChange = (event) => {
    const { value, id } = event.target;
    set_email_onchange({ ...email_onchange, [id]: value });
  };

  const dont_account = () => {
    student_register_form_fun(true);
    nav(`/register/${admin}`);
  };

  const [err_msg, set_err_msg] = useState(false);
  const [succes_msg, set_success_msg] = useState(false);
  const sumbit_btn = () => {
    if (admin === "admin_1") {
      convert_obj_admin_login_details.forEach((ele) => {
        if (ele.admin_email == email_onchange.email1) {
          if (ele.admin_pass == email_onchange.password1) {
            admin_login_function(true);
            alert("login succesully");
            nav("/home/admin");
          } else {
            alert("password is wrong");
          }
        } else {
          alert("email id is wrong");
        }
      });
    } else if (admin === "student_1") {
      switch (true) {
        case email_onchange.email1.trim() === "":
          set_err_msg("please enter the email id");
          break;
        case email_onchange.password1.trim() === "":
          set_err_msg("please enter the password");
          break;
        case true:
          if (email_onchange.email1 || email_onchange.password1) {
            convert_obj_student_register_details.find((ele) => {
              switch (true) {
                case ele.email_id === email_onchange.email1 &&
                  ele.password === email_onchange.password1:
                  loginfunction(true);
                  nav(`/home/student/${ele.id1}`);
                case ele.password !== email_onchange.password1:
                  set_err_msg("wrong password");
                  break;
                case ele.email_id !== email_onchange.email1:
                  set_err_msg("wrong email id");
                  break;
              }
            });
          }
      }
    }
  };

  useEffect(() => {
    if (err_msg.length) {
      console.log("err_msg", err_msg);
      alert(err_msg);
      set_err_msg("");
    }
  }, [err_msg]);

 

  return (
    <div
      style={{
        border: "1px solid",
        marginTop: "200px",
        marginLeft: "500px",
        marginRight: "500px",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginLeft: "20px" }}>
        <i class="fa-solid fa-door-open"></i> LOGIN
      </h1>
      <div>
        <i
          class="fa-solid fa-envelope fa-2xl"
          style={{ marginTop: "25px" }}
        ></i>
        <TextField
          placeholder="enter the Email id"
          onChange={details_onChange}
          id="email1"
        />
        <br></br>
        <br></br>
        <i
          class="fa-sharp fa-solid fa-key fa-2xl"
          style={{ marginTop: "25px" }}
        ></i>
        <TextField
          placeholder="enter the password"
          onChange={details_onChange}
          id="password1"
        />
        <br></br>
        <br></br>
        <br></br>
        <Button variant="contained" onClick={sumbit_btn}>
          SuMBIT
        </Button>
        <br></br>
        <br></br>
        <h4 onClick={dont_account}>
          {admin == "student_1" ? "you haven't account ?" : ""}
        </h4>
      </div>
    </div>
  );
}

export default Login_page;
