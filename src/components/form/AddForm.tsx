import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import TextField from "@mui/material/TextField";
import AddItem from "./AddItem";
import { useFormStore } from "../../store/useFormStore";
import { ItemDetailsType } from "../../types/types";
import FormDetails from "./FormDetails";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function AddForm() {
  const [open, setOpen] = React.useState(false);
  const { setFormData } = useFormStore();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getItem = (itemDetails: ItemDetailsType, options: string[]) => {
    if (itemDetails.type !== "text") {
      itemDetails.options = options;
    }
    setFormData(itemDetails);
  };

  return (
    <div>
      <Button
        variant='contained'
        onClick={handleClickOpen}
        style={{ textTransform: "none" }}
      >
        Create a new Form
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleClose}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, textAlign: "center" }}
              variant='h6'
              component='div'
            >
              Add Options for the form
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ textAlign: "center", paddingTop: "40px" }}>
          <div>
            <TextField
              style={{ width: "400px" }}
              id='outlined-required'
              label='Form name'
              variant='outlined'
            />
          </div>
          <div>
            <AddItem getItem={getItem} />
          </div>
        </div>
        <div style={{ margin: "0 auto", width: "500px", textAlign: "center" }}>
          <FormDetails />
        </div>
      </Dialog>
    </div>
  );
}
