import "./App.css";
import Main from "./Components/Main";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Admin from "./Components/Admin";
import Student from "./Components/Student";
import Login_page from "./Components/Login_page";
import WildCard from "./Components/WildCard";
import Student_Register from "./Components/Student_Register";
import { useState } from "react";

function App() {
  const [loginvalue_student, setloginvalue_student] = useState(
    localStorage.getItem("loginvalue_student")
      ? JSON.parse(localStorage.getItem("loginvalue_student"))
      : false
  );

  const loginfunction = (value) => {
    setloginvalue_student(value);
    window.localStorage.setItem("loginvalue_student", loginvalue_student);
    console.log("loginvalue_student", loginvalue_student);
  };
  window.localStorage.setItem("loginvalue_student", loginvalue_student);

  const [admin_login_value, setadmin_login_value] = useState(
    localStorage.getItem("admin_login_value")
      ? JSON.parse(localStorage.getItem("admin_login_value"))
      : false
  );

  const admin_login_function = (value) => {
    setadmin_login_value(value);
    window.localStorage.setItem("admin_login_value", admin_login_value);
    console.log("admin_login_value", admin_login_value);
  };
  window.localStorage.setItem("admin_login_value", admin_login_value);

  const [student_register_form, setstudent_register_form] = useState(
    localStorage.getItem("student_register_form")
      ? JSON.parse(localStorage.getItem("student_register_form"))
      : false
  );

  const student_register_form_fun = (value) => {
    setstudent_register_form(value);
    window.localStorage.setItem("student_register_form", student_register_form);
    console.log("student_register_form", student_register_form);
  };
  window.localStorage.setItem("student_register_form", student_register_form);

  console.log("loginvalue_student", loginvalue_student);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/login/:admin"
            element={
              loginvalue_student || student_register_form ? (
                <Navigate to="*" />
              ) : (
                <Login_page
                  loginfunction={loginfunction}
                  admin_login_function={admin_login_function}
                  student_register_form_fun={student_register_form_fun}
                />
              )
            }
          />
          <Route
            path="/home/admin"
            element={
              loginvalue_student || student_register_form ? (
                <Navigate to="*" />
              ) : (
                <Admin admin_login_function={admin_login_function} />
              )
            }
          />
          <Route
            path="/login/:student"
            element={
              loginvalue_student || student_register_form ? (
                <Navigate to="*" />
              ) : (
                <Login_page loginfunction={loginfunction} />
              )
            }
          />
          <Route
            path="/register/:student"
            element={
              student_register_form ? <Student_Register student_register_form_fun={student_register_form_fun}/> : <Navigate to="*" />
            }
          />
          <Route
            path="/home/student/:studentid"
            element={
              admin_login_value || student_register_form ? (
                <Navigate to="*"></Navigate>
              ) : (
                <Student loginfunction={loginfunction} />
              )
            }
          />
          <Route
            path="*"
            element={
              <WildCard
                loginfunction={loginfunction}
                admin_login_function={admin_login_function}
                student_register_form_fun={student_register_form_fun}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
