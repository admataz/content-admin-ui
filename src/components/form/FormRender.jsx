import React from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import StyledInputBlock from './StyledInputBlock'


const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;


const FormRender = ({ handleSubmit, validationSchema, model }) => {
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={document || {}}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <StyledForm>

            {/* render for fields here */}

          <StyledInputBlock>
            <button disabled={isSubmitting} type="submit">
              Save
            </button>
          </StyledInputBlock>
        </StyledForm>
      )}
    </Formik>
  );
};

export default FormRender;
