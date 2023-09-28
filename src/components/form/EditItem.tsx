import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TextField from "@mui/material/TextField";
import { ItemDetailsType } from "../../types/types";
import { useFormStore } from "../../store/useFormStore";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";

interface EditItemProps {
  item: ItemDetailsType;
}
export default function EditItem(props: EditItemProps) {
  const { setUpdateData, removeOption, addOption } = useFormStore();

  const [open, setOpen] = React.useState(false);
  const [newOption, setNewOption] = React.useState("");
  const [options, setOptions] = React.useState<string[]>(
    props.item.options || []
  );
  const [title, setTitle] = React.useState(props.item.title);

  useEffect(() => {
    setOptions(props.item.options || []);
  }, [props.item.options]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateParent = (i: any, val: any) => {
    const newArr = [...options];
    newArr[i] = val;
    setOptions(newArr);
  };

  const handleSave = () => {
    setUpdateData(props.item.id, { title, options });
    setOpen(false);
  };

  const deleteOption = (option: string) => {
    setOptions([]);
    removeOption(props.item.id, option);
  };

  const addAnOption = () => {
    if (newOption && newOption.trim() !== "") {
      addOption(props.item.id, newOption);
      setOptions((names) => [...names, newOption]);
      setNewOption("");
    }
  };

  return (
    <div>
      <IconButton
        style={{ padding: "0px", margin: "0px" }}
        size='small'
        aria-label='add-item'
        onClick={handleClickOpen}
      >
        <SettingsOutlinedIcon />
      </IconButton>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Type : {props?.item.type}
        </DialogTitle>
        <DialogContent>
          <TextField
            id={props?.item?.id}
            label='Title'
            value={title}
            variant='outlined'
            style={{ width: "100%", marginTop: "10px" }}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div style={{ display: "flex" }}>
            <div style={{ flex: "4" }}>
              <TextField
                label='Add New Option'
                value={newOption}
                variant='outlined'
                style={{ width: "100%", marginTop: "10px" }}
                onChange={(e) => setNewOption(e.target.value)}
              />
            </div>
            <div style={{ flex: "1", alignSelf: "center" }}>
              <IconButton
                aria-label='delete'
                size='small'
                onClick={addAnOption}
              >
                <AddIcon />
              </IconButton>
            </div>
          </div>
          <Divider style={{ paddingTop: "10px" }} />
          {options?.map((option, index) => (
            <div key={index} style={{ paddingTop: "8px" }}>
              <InputOption
                option={option}
                index={index}
                updateParent={updateParent}
              />
              <IconButton
                onClick={() => deleteOption(option)}
                aria-label='delete'
                size='large'
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            autoFocus
            style={{ textTransform: "none" }}
            variant='contained'
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const InputOption = ({
  index,
  option,
  updateParent,
}: {
  index: any;
  option: any;
  updateParent: any;
}) => {
  const [val, setVal] = useState(option);

  return (
    <TextField
      type='text'
      value={val}
      onChange={(e) => {
        updateParent(index, e.target.value);
        setVal(e.target.value);
      }}
    />
  );
};
