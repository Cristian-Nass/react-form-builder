import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";

interface RadioButtonProps {
  lable?: string;
  options?: string[];
  control: Control<any>;
}

export default function RadioButton(props: RadioButtonProps) {
  return (
    <FormControl style={{ width: "100%" }}>
      <FormLabel id='demo-row-radio-buttons-group-label'>
        {props.lable}
      </FormLabel>
      <Controller
        defaultValue={""}
        render={({ field }) => (
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            {...field}
          >
            {props.options?.map((option) => (
              <FormControlLabel
                key={option}
                value={option ? option : " "}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        )}
        name={props.lable ?? ""}
        control={props.control}
      />
    </FormControl>
  );
}
