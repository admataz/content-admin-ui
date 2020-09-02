import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import ContentItemField from "../ContentItemField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useContentItemQueries from "../../hooks/useContentItemQueries";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

const ContentItemForm = ({ validationSchema, model }) => {
  const { fields } = model;
  const [savedStatus, setSavedStatus] = useState();
  const [savedAlertOpen, setSavedAlertOpen] = useState();
  const history = useHistory();


  useEffect(() => {
    if (savedStatus) {
      setSavedAlertOpen(true);
    }
  }, [savedStatus]);

  const {
    loadingStatus,
    errorStatus,
    contentItem,
    executePost,
    executePut,
  } = useContentItemQueries(model);


  const handleSubmit = async (data, { setSubmitting }) => {
    setSavedStatus(false);
    if (data.id) {
      await executePut({ data });
    } else {
      await executePost({ data });
    }
    setSavedStatus(true);
    setSubmitting(false);
  };

  const onCancelEdit = (dirty) => {
    if (dirty) {
      if (window.confirm("discard changes?")) {
        history.goBack();
      }
    } else {
      history.goBack();
    }
  };

  return (
    <>
      <Snackbar open={!!errorStatus} autoHideDuration={6000}>
        <Alert severity="error">ERROR {errorStatus?.message}...</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={savedAlertOpen}
        autoHideDuration={3000}
        onClose={() => setSavedAlertOpen(false)}
      >
        <Alert severity="success">Saved!</Alert>
      </Snackbar>

      {contentItem && (
        <Formik
          onSubmit={handleSubmit || (() => {})}
          initialValues={contentItem}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {({ isSubmitting, dirty }) => (
            <Form>
              <Typography variant="h5">
                Edit {model.info.singular}{" "}
                <Button onClick={() => onCancelEdit(dirty)}>Back</Button>
              </Typography>
              <Box m={3}>
                <Grid container spacing={3}>
                  {fields.map((field) => (
                    <Grid item xs={12} key={field.name}>
                      <ContentItemField
                        contentField={field}
                        name={field.name}
                        label={field.label}
                      />
                    </Grid>
                  ))}

                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <Button
                          disabled={isSubmitting}
                          type="submit"
                          variant="contained"
                        >
                          Save
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          disabled={isSubmitting}
                          onClick={() => onCancelEdit(dirty)}
                          variant="outlined"
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default ContentItemForm;
