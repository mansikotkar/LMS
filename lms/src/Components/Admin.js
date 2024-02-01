import { Button, Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Student_details_admin from "./student_details_admin";
function Admin({ admin_login_function }) {
  const subject_details = [
    {
      subject_name: "GIT",
      id: "1",
      details:
        "Git is an open-source distributed version control system. It is designed to handle minor to major projects with high speed and efficiency. It is developed to co-ordinate the work among the developers. The version control allows us to track and work together with our team members at the same workspace.",
    },
    {
      subject_name: "LINUX",
      id: "2",
      details:
        "Linux® is an open source operating system (OS). An operating system is the software that directly manages a system's hardware and resources, like CPU, memory, and storage. The OS sits between applications and hardware and makes the connections between all of your software and the physical resources that do the work.",
    },
    {
      subject_name: "REACT",
      id: "3",
      details:
        "ReactJS is a declarative, efficient, and flexible JavaScript library for building reusable UI components. It is an open-source, component-based front end library responsible only for the view layer of the application. It was created by Jordan Walke, who was a software engineer at Facebook. It was initially developed and maintained by Facebook and was later used in its products like WhatsApp & Instagram. Facebook developed ReactJS in 2011 in its newsfeed section, but it was released to the public in the month of May 2013.",
    },
    {
      subject_name: "JAVASCRIPT",
      id: "4",
      details:
        "JavaScript is a cross-platform, object-oriented scripting language used to make webpages interactive (e.g., having complex animations, clickable buttons, popup menus, etc.). There are also more advanced server side versions of JavaScript such as Node.",
    },
  ];
  window.localStorage.setItem(
    "subject_details",
    JSON.stringify(subject_details)
  );
  let get_student_data = window.localStorage.getItem(
    "student_register_details"
  );
  let student_list = JSON.parse(get_student_data);
  const [student_list_state, set_student_list_state] = useState(student_list);
  const [extra_render, set_extra_render] = useState(false);
  const [student_details, set_student_details] = useState(false);
  const [studentid, set_student_id] = useState("");
  let nav = useNavigate();
  const checkbox_onChange = (event) => {
    if (event.target.checked) {
      student_list.filter((ele) => {
        if (ele.id1 === event.target.value) {
          ele.subject.push(event.target.id);
        } else {
          ele.subject = [...ele.subject];
        }
      });
    } else {
      student_list.filter((ele) => {
        if (ele.id1 === event.target.value) {
          ele.subject = ele.subject.filter(
            (ele) => !event.target.id.includes(ele)
          );
        }
      });
    }
    window.localStorage.setItem(
      "student_register_details",
      JSON.stringify(student_list)
    );
    set_student_list_state(student_list);
    console.log("student_list", student_list_state);
    console.log(student_list);
    set_extra_render(true);
  };

  useEffect(() => {}, [extra_render]);

  const logout = () => {
    admin_login_function(false);
    nav("/");
  };

  const student_details_fun = (event, studentid1) => {
    set_student_details(true);
    set_student_id(studentid1);
  };

  const student_details_ppage_close = () => {
    set_student_details(false);
  };

  return (
    <>
      <h1>Hello ADMIN</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {student_list ? (
          <h3>Student Name</h3>
        ) : (
          <h3>No any Student Register</h3>
        )}
        <span>
          {student_list_state?.map((ele) => {
            return (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span>
                  <i
                    class="fa-solid fa-user-plus"
                    style={{ marginTop: "25px", marginLeft: "15px" }}
                    onClick={(event) => student_details_fun(event, ele.id1)}
                  ></i>
                </span>
                <span>
                  <h2 style={{ marginLeft: "6px" }}>{ele.firstname}</h2>
                </span>
                <span
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "20px",
                  }}
                >
                  {subject_details.map((sub_ele) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginTop: "8px",
                        }}
                      >
                        <span style={{ display: "flex", flexDirection: "row" }}>
                          <Checkbox
                            checked={ele.subject.includes(sub_ele.subject_name)}
                            color="primary"
                            value={ele.id1}
                            id={sub_ele.subject_name}
                            label={sub_ele.subject_name}
                            onChange={checkbox_onChange}
                          />
                        </span>
                        <span style={{ display: "flex", flexDirection: "row" }}>
                          <h5>{sub_ele.subject_name}</h5>
                        </span>
                      </div>
                    );
                  })}
                </span>
              </div>
            );
          })}
        </span>
      </div>
      <br></br>
      <Button
        onClick={logout}
        variant="contained"
        style={{ marginTop: "50px" }}
      >
        LOGOUT
      </Button>

      <Student_details_admin
        student_details={student_details}
        studentid={studentid}
        student_details_ppage_close={student_details_ppage_close}
      />
    </>
  );
}

export default Admin;
