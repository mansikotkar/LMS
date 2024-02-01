import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function WildCard({loginfunction,admin_login_function,student_register_form_fun}) {
  let nav = useNavigate();
  const go_back = () => {
    loginfunction(false)
    admin_login_function(false)
    student_register_form_fun(false)
    nav("/");
  };
  return (
    <div>
      <h1>SOMTHING IS WRONG</h1>
      <br></br>
      <Button variant="contained" onClick={go_back}>
        GO Back
      </Button>
    </div>
  );
}

export default WildCard;
