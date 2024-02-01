import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Course_details from "./Course_details";

function Student({loginfunction}) {
  const [login_student_details, set_login_student_details] = useState([]);
  const [course_details_page, set_course_details_page] = useState(false);
  const [course_name, set_course_name] = useState();
  let { studentid } = useParams();
  let nav = useNavigate();

  useEffect(() => {
    let get_student_data = window.localStorage.getItem(
      "student_register_details"
    );
    let convert_string_to_obj = JSON.parse(get_student_data);
    convert_string_to_obj.filter((ele) => {
      if (ele.id1 == studentid) {
        set_login_student_details(ele);
      }
    });
  }, []);

  const logout = () => {
    loginfunction(false)
    nav("/");
  };

  const course_details = (event, ele) => {
    set_course_details_page(true);
    set_course_name(ele);
  };

  const course_details_close = () => {
    set_course_details_page(false);
  };


  return (
    <>
      <h1>Hello,</h1>
      <h3>
        {login_student_details.firstname + " " + login_student_details.lastname}
      </h3>
      {!login_student_details?.subject?.length
        ? "you haven't assigned any course yet ,ENJOY "
        : login_student_details?.subject?.map((ele) => {
            return (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <span style={{ display: "flex", flexDirection: "row" }}>
                    <h1 style={{ marginLeft: "9px" }}>{ele}</h1>
                  </span>
                  <span
                    id={ele.id}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "20px",
                      marginTop: "30px",
                    }}
                  >
                    {course_details_page ? (
                      <i class="fa-sharp fa-solid fa-minus"></i>
                    ) : (
                      <i
                        class="fa-sharp fa-solid fa-plus"
                        onClick={(evnt) => {
                          course_details(evnt, ele);
                        }}
                      ></i>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
      <br></br>
      <br></br>
      <br></br>

      <Button variant="contained" onClick={logout}>
        LOGOUT
      </Button>
      <Course_details
        course_details_page={course_details_page}
        course_details_close={course_details_close}
        course_name={course_name}
      />
    </>
  );
}

export default Student;
