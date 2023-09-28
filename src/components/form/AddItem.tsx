import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { ItemDetailsType } from "../../types/types";
import Tooltip from "@mui/material/Tooltip";
import { useFormStore } from "../../store/useFormStore";
import Snackbar from "@mui/material/Snackbar";

interface AddItemProps {
  getItem: any;
}

export default function AddItem(props: AddItemProps) {
  const smallScreen = useMediaQuery("(min-width:900px)");
  const { formData } = useFormStore();
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [option, setOption] = useState("");
  const [options, setOptions] = useState<string[]>([]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    const id = uuidv4();
    setItemDetails(() => ({
      ...itemDetails,
      id: id,
    }));

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [itemDetails, setItemDetails] = useState<ItemDetailsType>({
    id: "",
    title: "",
    type: "",
  });

  const typeHandleChange = (event: SelectChangeEvent) => {
    const type = event.target.value as string;
    setItemDetails(() => ({
      ...itemDetails,
      type,
    }));
  };

  const saveItem = () => {
    const repeatedName = formData
      .map((d) => d.title)
      .includes(itemDetails.title);
    if (repeatedName || itemDetails.title.trim() === "") {
      setSnackbarOpen(true);
    } else {
      setOpen(false);
      props.getItem(itemDetails, options);
      setItemDetails({
        id: "",
        title: "",
        type: "",
      });
      setOptions([]);
    }
  };

  const handleOption = () => {
    setOptions((names) => [...names, option]);
    setOption("");
  };

  return (
    <div>
      <IconButton
        size='large'
        aria-label='add-item'
        onClick={handleClickOpen}
        style={{ margin: "20px 0px" }}
      >
        <Tooltip title='Add Item'>
          <AddBoxIcon />
        </Tooltip>
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          {"Select the form item"}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              minWidth: smallScreen ? "500px" : "100%",
              paddingTop: "10px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Item Type</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={itemDetails.type}
                label='Item type'
                onChange={typeHandleChange}
              >
                <MenuItem value='text'>Text input</MenuItem>
                <MenuItem value='radio'>Radio button</MenuItem>
                <MenuItem value='selector'>Selectors</MenuItem>
              </Select>
              <TextField
                style={{ marginTop: "30px" }}
                id='outlined-required'
                label='Item Title'
                required
                variant='outlined'
                onChange={(e) =>
                  setItemDetails({
                    ...itemDetails,
                    title: e.target.value,
                  })
                }
              />
            </FormControl>
            {itemDetails.type === "radio" || itemDetails.type === "selector" ? (
              <div>
                <div style={{ display: "flex", alignItems: "end" }}>
                  <TextField
                    style={{ marginTop: "30px", width: "460px" }}
                    id='option'
                    label='Option'
                    variant='outlined'
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                  />
                  <IconButton
                    size='large'
                    aria-label='add-item'
                    onClick={handleOption}
                  >
                    <AddBoxIcon />
                  </IconButton>
                </div>
                <div>
                  {options.map((option) => (
                    <div key={option}>{option}</div>
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}
          </Box>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            message='Select The Unique Title'
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            style={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            onClick={saveItem}
            autoFocus
            style={{ textTransform: "none" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
