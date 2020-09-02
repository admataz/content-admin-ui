import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EditIcon from "@material-ui/icons/Edit";
import SortIcon from "@material-ui/icons/Sort";
import { Link, useLocation } from "react-router-dom";
import { Box } from "@material-ui/core";

export default function AppNav({ models }) {
  const location = useLocation();
  return (
    <>
      <List>
        {models.map((model) => (
          <Box key={model.info.plural}>
            <ListItem
              button
              selected={location.pathname === `/${model.resourceName}`}
              component={Link}
              to={`/${model.resourceName}`}
            >
              <ListItemIcon>
                <EditIcon />{" "}
              </ListItemIcon>
              <ListItemText primary={model.info.plural} />
            </ListItem>

            {model.fields.find((f) => f.name === "pagenumber") && (
              <ListItem
                button
                selected={location.pathname === `/${model.resourceName}`}
                component={Link}
                to={`/cards/${model.resourceName}`}
              >
                <ListItemIcon>
                  <SortIcon />{" "}
                </ListItemIcon>
                <ListItemText secondary={`Order ${model.info.plural}`} />
              </ListItem>
            )}
          </Box>
        ))}
      </List>
    </>
  );
}
