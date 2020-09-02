import React, { useMemo } from "react";
import { useField } from "formik";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Ajv from 'ajv';

const MULTILINE_ROWS_COUNT = 5;
function isMultiline(inputType) {
  return ["textarea", "richtext"].includes(inputType);
}

const ContentItemField = ({ contentField = {}, ...props }) => {
  const {
    inputType = "textfield",
    name,
    label,
    helperText, 
    nullable = true,
    schemaType,
  } = contentField;
  

    const doValidate = useMemo(() => {
     const ajv =  new Ajv()
     return ajv.compile(schemaType)
    }, [schemaType])

    const validate =  value => {
      const isValid = doValidate(value)
      return !isValid ? doValidate.errors: ''
    }

  

  const [field, meta, helpers] = useField({ ...props, validate, name, label });
  
  const textFieldProps = {
    name,
    label,
    helperText: helperText || (meta.error && meta.error[0]?.message),
    variant: "outlined",
    required: !nullable,
    error: meta.touched && meta.error,
  };

  if (isMultiline(inputType)) {
    textFieldProps.multiline = true;
    textFieldProps.rows = props.rows || MULTILINE_ROWS_COUNT;
  }

if(inputType === 'number'){
  textFieldProps.type = 'number'
}

  return (
    <Box mb={1}>
      <TextField fullWidth {...field} {...textFieldProps}  />
    </Box>
  );
};

export default ContentItemField;
