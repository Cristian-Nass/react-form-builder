import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";

interface SelectorProps {
  lable?: string;
  options?: string[];
  control: Control<any>;
}

export default function Selector(props: SelectorProps) {
  if (!props.options) return <>Need options</>;

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>{props.lable}</InputLabel>
        <Controller
          defaultValue={""}
          render={({ field }) => (
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label={props.lable}
              {...field}
            >
              {props.options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          )}
          name={props.lable ?? ""}
          control={props.control}
        />
      </FormControl>
    </Box>
  );
}
