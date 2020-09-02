import React, { useState } from "react";
import useAxios from "axios-hooks";
import config from "../../config";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";

import { Droppable, DragDropContext, Draggable } from "react-beautiful-dnd";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  CardHeader,
} from "@material-ui/core";
import { useEffect } from "react";
import useContentItemQueries from "../../hooks/useContentItemQueries";

const ContentItemList = ({ model }) => {
  const [draggableItems, setDraggableItems] = useState([]);
  const [isReordered, setIsReordered] = useState(false);
  const [{ data, loading, error }] = useAxios(
    `${config.apiUrl}/api/${model.resourceName}?orderby=pagenumber`,
    { useCache: false } // we want the latest, not matter what.
  );

  const history = useHistory();
  const { executeOrderPost } = useContentItemQueries(model);

  useEffect(() => {
    setDraggableItems(data?.data || []);
    setIsReordered(false);
  }, [data]);

  useEffect(() => {
    if (!data?.data || !draggableItems.length) {
      return;
    }
    const draggedOrder = draggableItems.map((d) => d.id).join(",");
    const loadedOrder = data?.data.map((d) => d.id).join(",");

    if (loadedOrder !== draggedOrder) {
      setIsReordered(true);
      executeOrderPost({
        data: { itemOrder: draggableItems.map((d) => d.id) },
      }).then(() => {
        setIsReordered(false);
      });
    }
  }, [data, draggableItems, executeOrderPost]);

  // TODO: make this better
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const makeOnRowClick = (contentItem) => (evt) => {
    history.push(`/${model.resourceName}/edit/${contentItem.id}`);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {isReordered && <p>ReOrdered!</p>}
        <Button
          component={Link}
          to={`/${model.resourceName}/edit/`}
          variant="outlined"
        >
          New {model.info.singular}
        </Button>
      </Grid>
      <DragDropContext
        onDragEnd={({ source, destination, draggableId }) => {
          const reOrdered = [...draggableItems];
          const [itm] = reOrdered.splice(source.index, 1);
          reOrdered.splice(destination.index, 0, itm);
          setDraggableItems(reOrdered);
        }}
      >
        <Grid item xs={8}>
          <Droppable droppableId="pagesColumn">
            {(provided) => (
              <Grid
                ref={provided.innerRef}
                container
                spacing={3}
                {...provided.droppableProps}
              >
                {draggableItems.map((contentItem, i) => (
                  <Draggable
                    draggableId={`card-${contentItem.id}`}
                    index={i}
                    key={`card-${contentItem.slug}`}
                  >
                    {(provided2) => (
                      <Grid
                        item
                        xs={12}
                        {...provided2.draggableProps}
                        {...provided2.dragHandleProps}
                      >
                        <Card variant="outlined">
                          <CardHeader>
                            <Button
                              onClick={makeOnRowClick(contentItem)}
                              variant="outlined"
                            >
                              edit
                            </Button>
                          </CardHeader>

                          <CardContent ref={provided2.innerRef}>
                            <Typography variant="h6">
                              {contentItem.title}
                            </Typography>
                            <Typography variant="h6">
                              {contentItem.subheading}
                            </Typography>
                            <Typography>
                              {contentItem.bodycopy.substring(0, 40)}...
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </Grid>
      </DragDropContext>
    </Grid>
  );
};

export default ContentItemList;
