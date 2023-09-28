import React, { useState, useEffect } from "react";
import { useFormStore } from "../../store/useFormStore";
import RadioButton from "./details/RadioButton";
import Selector from "./details/Selector";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { ReactSortable } from "react-sortablejs";
import "../../style/style.css";
import EditItem from "./EditItem";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function FormDetails() {
  const { formData, deleteFormItem } = useFormStore();
  const { register, handleSubmit, control } = useForm();

  const registerData = (dataForm: any) => {
    console.log(dataForm);
  };

  const [list, setList] = useState(formData);
  const animation = 200;

  useEffect(() => {
    setList(formData);
  }, [formData]);

  return (
    <Box
      component='form'
      onSubmit={handleSubmit((dataForm) => registerData(dataForm))}
    >
      <ReactSortable
        filter='.addImageButtonContainer'
        list={list}
        setList={setList}
        animation={animation}
        easing='ease-out'
      >
        {list.map((data) => (
          <div key={data.id}>
            {data.type === "text" && (
              <div className='form-item-container'>
                <div style={{ width: "100%" }}>
                  <TextField
                    {...register(data.title)}
                    id={data.id}
                    label={data.title}
                    variant='outlined'
                    style={{ width: "100%" }}
                  />
                </div>
                <div>
                  <EditItem item={data} />
                  <IconButton
                    onClick={() => deleteFormItem(data.id)}
                    aria-label='delete'
                    size='large'
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            )}
            {data.type === "radio" && (
              <div className='form-item-container'>
                <div style={{ width: "100%" }}>
                  <RadioButton
                    control={control}
                    lable={data.title}
                    options={data.options}
                  />
                </div>
                <div>
                  <EditItem item={data} />
                  <IconButton
                    onClick={() => deleteFormItem(data.id)}
                    aria-label='delete'
                    size='large'
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            )}
            {data.type === "selector" && (
              <div className='form-item-container'>
                <div style={{ width: "100%" }}>
                  <Selector
                    control={control}
                    lable={data.title}
                    options={data.options}
                  />
                </div>
                <div>
                  <EditItem item={data} />
                  <IconButton
                    onClick={() => deleteFormItem(data.id)}
                    aria-label='delete'
                    size='large'
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            )}
          </div>
        ))}
      </ReactSortable>
      <Button
        style={{ textTransform: "none" }}
        variant='contained'
        type='submit'
        disabled={!formData.length}
      >
        Submit
      </Button>
    </Box>
  );
}
