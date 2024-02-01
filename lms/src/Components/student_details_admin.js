import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Student_details_admin({
  student_details,
  studentid,
  student_details_ppage_close,
}) {
  let student_register_details = window.localStorage.getItem(
    "student_register_details"
  );
  student_register_details = JSON.parse(student_register_details);
  const [student_info, set_student_info] = React.useState("");

  React.useEffect(() => {
    student_register_details.map((ele) => {
      if (ele.id1 === studentid) {
        set_student_info(ele);
      }
    });
  }, [student_details]);
  console.log("studentele", student_info);

  return (
    <div>
      <Dialog
        open={student_details}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle> Student Information</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
          NAME: {student_info.firstname + " " + student_info.lastname}
          <br></br>
          <br></br>
          EMAIL: {student_info.email_id}
          <br></br>
          <br></br>
          GENDER: {student_info.gender}
          <br></br>
          <br></br>
          ID:{student_info.id1}
          <br></br>
          <br></br>
          ASSIGNED COURSE: {student_info.subject}
          <br></br>
        </DialogContent>
        <DialogActions>
          <Button onClick={student_details_ppage_close}>DONE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
