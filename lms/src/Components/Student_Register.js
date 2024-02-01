import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { json, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

let intialstate = {
  firstname: "",
  lastname: "",
  gender: "",
  email_id: "",
  password: "",
  Confirm_password: "",
  subject: [],
};
let store_student_deatails = [];
export default function Student_Register({student_register_form_fun}) {
  const [student_details, set_studentdetails] = React.useState(intialstate);
  let nav = useNavigate();
  let get_student_register_details = window.localStorage.getItem(
    "student_register_details"
  );
  let string_to_obj_student_register_details = JSON.parse(
    get_student_register_details
  );

  const Cancel = () => {
    student_register_form_fun(false)
    nav(`/login/student_1`);
  };

  const student_details_OnChange = (event) => {
    const { value, id } = event.target;
    set_studentdetails({ ...student_details, [id]: value, id1: uuidv4() });
  };

  const Sumbit_details = () => {
    if (string_to_obj_student_register_details) {
      string_to_obj_student_register_details.push(student_details);
      let c = JSON.stringify(string_to_obj_student_register_details);
      window.localStorage.setItem("student_register_details", c);
      alert("your data added succesfully....");
      set_studentdetails(intialstate);
      student_register_form_fun(false)
      Cancel();
    } else {
      store_student_deatails.push(student_details);
      window.localStorage.setItem(
        "student_register_details",
        JSON.stringify(store_student_deatails)
      );
      alert("your data added succesfully....");
      student_register_form_fun(false)
      Cancel();
    }
  };

  const final_data_Sumbit = () => {
    switch (true) {
      case student_details.firstname.trim() === "":
        alert("please enter the firstName");
        break;
      case student_details.lastname.trim() === "":
        alert("please enter the lastName");
        break;
      case student_details.gender.trim() === "":
        alert("please Select the gender");
        break;
      case student_details.email_id.trim() === "":
        alert("please enter the email");
        break;
      case student_details.password.trim() === "":
        alert("please enter the password ");
        break;
      case student_details.Confirm_password.trim() === "":
        alert("please enter the Confirm_password");
        break;
      case student_details.password !== student_details.Confirm_password:
        alert("your confirmpassword doesnt match with password ");
        break;
      default:
        Sumbit_details();
        break;
    }
  };

  return (
    <div>
      <Dialog
        open
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{"Register Form"}</DialogTitle>
        <DialogContent>
          <TextField
            placeholder="Enter your First name"
            label="First Name"
            fullWidth
            id="firstname"
            onChange={student_details_OnChange}
          />
          <br></br>
          <br></br>
          <TextField
            placeholder="Enter your Last name"
            label="Last Name"
            fullWidth
            id="lastname"
            onChange={student_details_OnChange}
          />
          <br></br>
          <br></br>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) => {
                student_details_OnChange(e);
              }}
              value={student_details.gender}
            >
              <FormControlLabel
                value="female"
                control={<Radio id="gender" />}
                label="Female"
              />
              <FormControlLabel
                value="male"
                control={<Radio id="gender" />}
                label="Male"
              />
              <FormControlLabel
                value="Others"
                control={<Radio id="gender" />}
                label="others"
              />
            </RadioGroup>
          </FormControl>

          <br></br>
          <br></br>
          <TextField
            placeholder="Enter your Email id"
            label="Email id"
            fullWidth
            id="email_id"
            onChange={student_details_OnChange}
          />
          <br></br>
          <br></br>
          <TextField
            placeholder="Enter your Password"
            label="Password"
            fullWidth
            id="password"
            onChange={student_details_OnChange}
          />
          <br></br>
          <br></br>
          <TextField
            placeholder="Enter your  Confirm Password"
            label="Confirm Password"
            fullWidth
            id="Confirm_password"
            onChange={student_details_OnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={final_data_Sumbit}>
            SUMBIT
          </Button>
          <Button variant="contained" onClick={Cancel}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
