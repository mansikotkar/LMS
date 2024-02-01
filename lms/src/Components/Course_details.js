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

export default function Course_details({
  course_details_page,
  course_details_close,
  course_name,
}) {
  let subject_details = window.localStorage.getItem("subject_details");
  subject_details = JSON.parse(subject_details);
  const [course_info, set_course_info] = React.useState("");
  React.useEffect(() => {
    subject_details.map((ele) => {
      if (ele.subject_name === course_name) {
        set_course_info(ele.details);
      }
    });
  }, [course_details_page]);


  return (
    <div>
      <Dialog
        open={course_details_page}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{course_name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {course_info}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={course_details_close}>DONE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
