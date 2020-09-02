import React from "react";
import { useField } from "formik";
import styled from "styled-components";

import StyledInputBlock from './StyledInputBlock'

const Input = styled('input')`

`

const Label = styled('label')`
  font-weight:bold;
`

const TextArea = styled('textarea')`

`

const TextField = ({
  label,
  multiline,
  ...props
}) => { 
  const [field, meta] = useField(props);
  return (
    <StyledInputBlock>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      {multiline ? (
        <TextArea className="text-input multiline" {...field} {...props} />
      ) : (
        <Input className="text-input" {...field} {...props} />
      )}

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </StyledInputBlock>
  );
};

export default TextField;
