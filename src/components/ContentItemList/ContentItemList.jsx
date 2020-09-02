import React from "react";
import useAxios from "axios-hooks";
import config from "../../config";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Paper, Grid} from "@material-ui/core";

const ContentItemList = ({ model }) => {
  const [{ data, loading, error }] = useAxios(
    `${config.apiUrl}/api/${model.resourceName}`,
    { useCache: false } // we want the latest, not matter what.
  );
  const history = useHistory()

  // TODO: make this better
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const makeOnRowClick = (contentItem) => (evt) => {
    history.push(`/${model.resourceName}/edit/${contentItem.id}`)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} spacing={3}>
        <Button
          component={Link}
          to={`/${model.resourceName}/edit/`}
          variant="outlined"
        >
          New {model.info.singular}
        </Button>
      </Grid>

      <Grid item xs={12}>

        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((contentItem, i) => (
                <TableRow hover onClick={makeOnRowClick(contentItem)}>
                  <TableCell>{contentItem.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ContentItemList;
