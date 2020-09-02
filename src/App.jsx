import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppNav from "./components/AppNav";
import { ThemeProvider } from "@material-ui/core/styles";
import useAxios from "axios-hooks";
import config from "./config";
import ContentItemForm from "./components/ContentItemForm";
import ContentItemList from "./components/ContentItemList";
import ContentCards from "./components/ContentCards";
import { Grid, Toolbar, AppBar, Typography, Box } from "@material-ui/core";

export default function App() {
  // load all models info up front
  const [{ data: models, loading, error }] = useAxios(
    `${config.apiUrl}/api/models-info`
  );

  // TODO: make this better!
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  
  return (
    // <ThemeProvider>
    <Router>
      <AppBar  position="static">
          <Toolbar>
            <Typography variant="h6" noWrap>
              Content Items
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={3}>
          
          <AppNav models={models} />
         
          
          </Grid>
          <Grid item xs={12} sm={9}>
          <Box m={3}>
            <Switch>

            {
                // add a route for each model cards view
                models.map((m) => (
                  <Route
                    path={`/cards/${m.resourceName}`}
                    exact
                    key={`cards-${m.resourceName}`}
                  >
                    <ContentCards model={m} />
                  </Route>
                ))
              }


              {
                // add a route for each model list
                models.map((m) => (
                  <Route
                    path={`/${m.resourceName}`}
                    exact
                    key={`list-${m.resourceName}`}
                  >
                    <ContentItemList model={m} />
                  </Route>
                ))
              }

              {
                // add a route for each model item
                models.map((m) => (
                  <Route
                    path={`/${m.resourceName}/edit/:contentItemId?`}
                    exact
                    key={`edit-${m.resourceName}`}
                  >
                    <ContentItemForm model={m} />
                  </Route>
                ))
              }
            </Switch>
            </Box>
          </Grid>
        </Grid>
    </Router>
    // </ThemeProvider>
  );
}
